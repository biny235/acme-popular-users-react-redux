const conn =  require('./conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0 
  }
})

module.exports = User;