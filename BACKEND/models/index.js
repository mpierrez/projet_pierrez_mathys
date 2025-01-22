const { Sequelize } = require ("sequelize");
const { BDD }  = require ('../config');

const sequelize = new Sequelize(`postgres://${BDD.user}:${BDD.password}@${BDD.host}/${BDD.bdname}`
,{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
      native:true
    },
    define:  {
    	timestamps:false
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import des models
db.users = require("./users.model.js")(sequelize, Sequelize);
db.cards = require("./cards.model.js")(sequelize, Sequelize);
db.cakes = require("./cakes.model.js")(sequelize, Sequelize);
db.cakeTypes = require("./cakeTypes.model.js")(sequelize, Sequelize);

// Définition relations
db.users.hasMany(db.cards, { foreignKey: 'userId', as: "cards" });
db.cards.belongsTo(db.users, { foreignKey: "userId", as: "user" });

db.cakeTypes.hasOne(db.cakes, { foreignKey: 'cakeTypeId', as: 'cake' });
db.cakes.belongsTo(db.cakeTypes, { foreignKey: 'cakeTypeId', as: 'cakeType' });

module.exports = db;
