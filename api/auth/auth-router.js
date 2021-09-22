const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const tokenBuilder = require('./token-builder')
const { checkCredentials, checkUsernameExists } = require('./auth-middleware')


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

router.post("/login", checkCredentials, checkUsernameExists, (req, res) => {
    const { username, password } = req.body;
    if (bcrypt.compareSync(password, req.user.password)) {
        const token = tokenBuilder(req.user)
      console.log(req.body)
        res.status(200).json({message: `Welcome ${username}!`, token})
    } else {
        res.status(401).json({message: "Invalid credentials"})
    }
}) 

module.exports = router