const router = require('express').Router();
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
const { 
    checkUsernameExists,
    checkUsernameFree,
    noMissingInformation,
    noMissingCredentials,
    checkPhoneNumberFree,
    checkPhoneNumberLength 
} = require('./auth-middleware');


router.post("/register",
noMissingInformation,
checkUsernameFree, checkPhoneNumberLength,
checkPhoneNumberFree,
(req, res, next) => {
    const user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
  
    Users.add(user)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(next);
});

router.post("/login",
noMissingCredentials,
checkUsernameExists,
(req, res) => {
    const { username, password } = req.body;
    if (bcrypt.compareSync(password, req.user.password)) {
        const token = tokenBuilder(req.user)
        req.session.user = req.user
        const { user_id } = req.user;
        res.status(200).json({message: `Welcome ${username}!`, user_id, token})
    } else {
        res.status(401).json({message: "Invalid credentials"})
    }
}) 

router.get("/logout", (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(error => {
          if (error) {
            res.status(200).json({message: "Error logging out."})
          } else {
            res.status(200).json({message: "Logged out."})
          }
        });
      } else {
        res.status(200).json({message: "There was no session to begin with."})
    }
})

module.exports = router;