const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../connection')

class Category extends Model {}

Category.init({
      // Model attributes are defined here
  id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
  }, 
  name: {
    type: Sequelize.STRING,
  },
  
}, //end first param for init

{     // Other model options go here
  sequelize: sequelize , // We need to pass the connection instance
  modelName: 'categories' // We need to choose the model name
},
  {timestamps:false},
);

// `sequelize.define` also returns the model


module.exports = Category 