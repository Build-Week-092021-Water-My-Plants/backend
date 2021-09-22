const Users = require('../users/users-model')

const checkUsernameExists = (req, res, next) => {
    const { username } = req.body
    Users.getBy({ username })
        .then(exists => {
            if (!exists.length) {
                res.status(401).json({message: "Invalid credentials"})
            } else {
                req.user = exists[0]
                next();
            }
        })
        .catch(next);
}

function checkUsernameFree(req, res, next) {
    const { username } = req.body
    Users.getBy({ username })
        .then(exists => {
            if (exists.length) {
                res.status(422).json({message: "Username taken"})
            } else {
                next();
            }
        })
        .catch(next)
}

const noMissingInformation = (req, res, next) => {
    const { username, password, phone_number } = req.body
    if (!username || !password || !phone_number) {
        res.status(422).json({message: "Username, password, and mobile number are required."})
    } else {
        next()
    }
}

const noMissingCredentials = (req, res, next) => {
    const { username, password} = req.body;
    if (!username || !password) {
        res.status(422).json({message: "Both username and password are required."})
    } else {
        next()
    }
}

function checkPhoneNumberFree(req, res, next) {
    const { phone_number } = req.body;
    Users.getBy({ phone_number })
        .then(exists => {
            if (exists.length) {
                res.status(422).json({message: "Phone number already in use."})
            } else {
                next();
            }
        })
        .catch(next)
}

function checkPhoneNumberLength(req, res, next) {
    const { phone_number } = req.body;
    if(phone_number.length !== 10) {
      res.status(422).json({message: "Please enter a valid phone number (10 digits)."})
    } else {
      next();
    }
  }

module.exports = {
    checkUsernameExists,
    checkUsernameFree,
    noMissingInformation,
    noMissingCredentials,
    checkPhoneNumberFree,
    checkPhoneNumberLength
}