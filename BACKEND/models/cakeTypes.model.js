module.exports = (sequelize, DataTypes) => {
    const CakeTypes = sequelize.define('cakeTypes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    return CakeTypes;
};