const db = require("../models");
const Cards = db.cards;

exports.getCardsOfUser = (req, res) => {
    const userId = req.user.id;
    Cards.findAll({ 
        where: { userId: userId },
        order: [['id', 'ASC']]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(400).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des cartes."
        });
    });
};

exports.getCardWithId = (req, res) => {
    const id = req.params.id;

    Cards.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouver la carte avec l'id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(402).send({
                message: err.message || "Une erreur s'est produite lors de la récupération de la carte avec l'id=" + id
            });
        });
};

exports.addCard = (req, res) => {
    const card = {
        userId: req.user.id,
        number: req.body.number,
        holderName: req.body.holderName,
        type: req.body.type,
        expirationDate: new Date(req.body.expirationDate),
        cvv: req.body.cvv
    };

    if (!card.number || !card.holderName || !card.type || !card.expirationDate || !card.cvv) {
        res.status(401).send({
            message: "Informations de la carte manquantes"
        });
        return;
    }

    Cards.findOne({ where: { userId: card.userId, number: card.number } })
        .then(existingCard => {
            if (existingCard) {
                res.status(402).send({
                    message: "La carte existe déjà."
                });
                return;
            }

            Cards.create(card)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(403).send({
                        message: err.message || "Une erreur s'est produite lors de la création de la carte."
                    });
                });
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || "Une erreur s'est produite lors de la vérification de l'existence de la carte."
            });
        });
};

exports.updateCard = (req, res) => {
    const id = req.params.id;
    const card = {
        number: req.body.number,
        holderName: req.body.holderName,
        type: req.body.type,
        expirationDate: new Date(req.body.expirationDate),
        cvv: req.body.cvv
    };

    if (!card.number || !card.holderName || !card.type || !card.expirationDate || !card.cvv) {
        res.status(401).send({
            message: "Informations de la carte manquantes"
        });
        return;
    }

    Cards.update(card, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La carte a été mise à jour avec succès."
                });
            } else {
                res.send({
                    message: `Impossible de mettre à jour la carte avec l'id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(402).send({
                message: err.message || "Une erreur s'est produite lors de la mise à jour de la carte avec l'id=" + id
            });
        });
};

exports.deleteCard = (req, res) => {
    const id = req.params.id;

    Cards.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La carte a été supprimée avec succès!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer la carte avec l'id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(402).send({
                message: err.message || "Une erreur s'est produite lors de la suppression de la carte avec l'id=" + id
            });
        });
};