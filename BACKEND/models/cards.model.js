module.exports = (sequelize, Sequelize) => {
    const Cards = sequelize.define("cards", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true  
        },

        number: {
            type: Sequelize.STRING,
            allowNull: false
        },

        holderName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        type: {
            type: Sequelize.STRING,
            allowNull: false
        },

        expirationDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        cvv: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
return Cards;
};