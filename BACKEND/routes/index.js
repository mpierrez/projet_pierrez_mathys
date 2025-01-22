module.exports = app => {  
  require("./cake.routes")(app);
  require("./cakeType.routes")(app);
  require("./user.routes")(app);
  require("./card.routes")(app);
}
