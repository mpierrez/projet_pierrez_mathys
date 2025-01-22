const { checkJwt } = require("./jwtMiddleware.js");

module.exports = app => {
    const cakeTypes = require("../controllers/cakeType.controller.js");

    let router = require("express").Router();
    
    router.get("/", checkJwt, cakeTypes.get);
    
    app.use('/api/cakes/types', router);
  };