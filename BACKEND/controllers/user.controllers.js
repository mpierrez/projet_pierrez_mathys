const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

const db = require("../models");
const Users = db.users;

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
    .then(data => {
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
        res.status(404).send("Login ou mot de passe incorrect");
      }
    })
    .catch(err => {
      res.status(400).send("Login ou mot de passe incorrect");
    });
  } else {
    res.status(400).send("Login ou mot de passe incorrect");
  }
};

exports.register = (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
  };

  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(user.login) && pattern.test(user.password)) {
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
      message: "Login ou mot de passe incorrect" 
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

exports.updateUser = (req, res) => {
  const id = req.user.id;
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