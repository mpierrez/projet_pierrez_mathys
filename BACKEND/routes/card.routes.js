const { checkJwt } = require("./jwtMiddleware.js");

module.exports = app => {
    const card = require("../controllers/card.controllers.js");
  
    let router = require("express").Router();

    router.get("/", checkJwt, card.getCardsOfUser);
    router.get("/:id", checkJwt, card.getCardWithId);
    router.post("/", checkJwt, card.addCard);
    router.put("/:id", checkJwt, card.updateCard);
    router.delete("/:id", checkJwt, card.deleteCard);
  
    app.use('/api/cards', router);
  };
