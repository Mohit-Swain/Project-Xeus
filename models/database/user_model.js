const Sequelize = require('sequelize');
const sequelize = require('../../utils/database/sequelize_init');

const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // user_type: {
    //     type: Sequelize.ENUM('teacher', 'ta', 'student')
    // }
});

module.exports = User;