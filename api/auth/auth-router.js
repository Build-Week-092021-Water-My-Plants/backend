const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const tokenBuilder = require('./token-builder')
const checkCredentials = require('./auth-middleware')


router.post('/register', checkCredentials, (req, res, next)=>{
    let user = req.body


    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash

    Users.createUser(user)
         .then((saved)=>{
             res.status(201).json({
                 message: `Welcome!! , ${saved.username}`
             })
         })
         .catch(next)
})

router.post('/login', checkCredentials, (req, res, next)=>{
    let { username, password } = req.body

    Users.getBy({ username }) 
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokenBuilder(user)
          res.status(200).json({
            message: `Welcome back ${user.username}!`,
            token
          })
        } else {
          res.status(401).json({ message: "Invalids" })
        }
      })
      .catch(next)
  })
