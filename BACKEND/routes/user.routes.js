const { checkJwt } = require("./jwtMiddleware.js");

module.exports = app => {
    const user = require("../controllers/user.controllers.js");
  
    let router = require("express").Router();

    //router.get("/", checkJwt, user.getAllUsers);
    router.get("/", checkJwt, user.getUserFromToken);
    router.put("/", checkJwt, user.updateUser);
    router.post("/login", user.login);
    router.post("/register", user.register);
  
    app.use('/api/user', router);
  };
