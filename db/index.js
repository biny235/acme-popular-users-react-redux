const conn = require('./conn');
const User = require('./User');
const faker = require('faker');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(()=>{
      return Promise.all([
        User.create({name: faker.name.firstName(), rating: 5}),
        User.create({name: faker.name.firstName(), rating: 4}),
        User.create({name: faker.name.firstName(), rating: 3}),
        User.create({name: faker.name.firstName(), rating: 2}),
        User.create({name: faker.name.firstName(), rating: 1}),
      ])
    })
};

module.exports = {
  syncAndSeed,
  models: {
    User
  }
};