const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../models");
const Users = db.users;

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

exports.getAllUsers = (req, res) => {
  Users.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des utilisateurs."
      });
    });
};

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  if(!utilisateur.login || !utilisateur.password) {
    res.status(400).send({
      message: "Login ou mot de passe manquant"
    });
    return;
  }

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
     Users.findOne({ where: { login: utilisateur.login } })
    .then(async data => {

      if (!data || !await bcrypt.compare(utilisateur.password, data.password)) {
        return res.status(401).send({ message: "Login ou mot de passe incorrect" });
      }

      if (data) {
        const user = {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email
        };
      
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.send(data);
      } else {
        res.status(404).send({ message: "Login ou mot de passe incorrect" });
      }
    })
    .catch(err => {
      res.status(400).send({ message: "Une erreur est survenue : " + err.message });
    });
  } else {
    res.status(400).send({ message: "Login ou mot de passe incorrect" });
  }
};

exports.register = async (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
  };

  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(user.login) && pattern.test(user.password)) {

    const existingUser = await Users.findOne({ where: { login: user.login } });
    if (existingUser) {
      return res.status(400).send({ message: "Login déjà utilisé" });
    }

    user.password = await bcrypt.hash(user.password, 10);
    Users.create(user)
    .then(data => {
      let accessToken = generateAccessToken(user);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
      });
    });
  } else {
    res.status(400).send({
      message: "Le login et le mot de passe doivent être composés de lettres et de chiffres uniquement." 
    });
  }
}

exports.getUserFromToken = (req, res) => {
  const userId = req.user.id;
  Users.findByPk(userId)
  .then(user => {
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("Utilisateur inexistant");
    }
  })
};

exports.updateUser = async (req, res) => {
  const id = req.user.id;

  req.body.password = await bcrypt.hash(req.body.password, 10);

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur modifié avec succès."
        });
      } else {
        res.status(404).send({
          message: `Impossible de modifier l'utilisateur avec id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || `Une erreur s'est produite lors de la modification de l'utilisateur avec id=${id}.`
      });
    });
};