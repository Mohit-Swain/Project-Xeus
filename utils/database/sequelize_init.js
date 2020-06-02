const Sequelize = require('sequelize');

const sequelize = new Sequelize('xeusdb', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("sucess connected to db");
}).catch((error) => {
    console.log("error: " + error);
});

module.exports = sequelize;