const db = require("../models");
const CakeTypes = db.cakeTypes;

exports.get = (req, res) => {
    CakeTypes.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des types de gâteaux."
            });
        });
};
