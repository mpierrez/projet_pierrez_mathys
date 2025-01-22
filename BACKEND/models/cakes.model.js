module.exports = (sequelize, DataTypes) => {
    const Cakes = sequelize.define('cakes', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      recipeUrl: {
        type: DataTypes.STRING(512),
        allowNull: true
      },
      imageUrl: {
        type: DataTypes.STRING(512),
        allowNull: true
      }
    });
  
    return Cakes;
  };
  