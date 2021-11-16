require('dotenv')
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERDB , process.env.PASSWORD,{
    host: 'localhost',
    dialect:'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize