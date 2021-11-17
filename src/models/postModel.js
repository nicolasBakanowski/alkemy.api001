const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../connection')

class Post extends Model {}

Post.init({

      // Model attributes are defined here

  id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
  }, 
  title: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  
  categories_id:{
    type: Sequelize.INTEGER
  }
  
}, //end first param for init

{     // Other model options go here
  sequelize: sequelize , // We need to pass the connection instance
  modelName: 'post' // We need to choose the model name
},
  {timestamps:true},
);

// `sequelize.define` also returns the model


module.exports = Post 