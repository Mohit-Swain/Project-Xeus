const Sequelize = require('sequelize');

const sequelize = require('../../utils/database/sequelize_init');
const User = require('./user_model');
const Teacher = sequelize.define('teacher', {
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false
    }
}, {
    getterMethods: {
        fullName() {
            return this.firstname + ' ' + this.lastname;
        }
    }
});

module.exports = Teacher;