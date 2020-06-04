const Sequelize = require('sequelize');
const sequelize = require('../../utils/database/sequelize_init');

const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_type: {
        type: Sequelize.ENUM('teacher', 'ta', 'student'),
        allowNull: false
    }
});

module.exports = User;