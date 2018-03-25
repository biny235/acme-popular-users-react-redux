const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { User } = db.models;

db.syncAndSeed()
  .then(()=> console.log('seeded'))

app.use(require('body-parser').json())

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(_dirname, 'dist', 'index.html')));

app.get('/api/users', (req, res, next)=>{
  User.findAll()
    .then(users => res.send(users))
    .catch(next)
})

app.post('/api/users', (req, res, next)=>{
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next)
})

app.delete('/api/users/:id', (req, res, next)=>{
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(()=> res.sendStatus(204))
    .catch(next)

})
app.put('/api/users/:id', (req, res, next)=>{
  User.findById(req.params.id)
    .then(user => {
      user = Object.assign(user, req.body)
      return user.save()
    })
    .then((user)=> res.send(user))
    .catch(next)
})

app.use((err, req, res, next)=>{
  const error = err.errors[0]
  res.status(500).send({type: error.type, message: error.message})
})

const port = process.env.PORT || 3000;

app.listen(port , () => console.log(port))