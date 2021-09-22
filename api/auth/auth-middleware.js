const Users = require('../users/users-model')

const checkCredentials = (req, res, next)=>{
    const { username, password } = req.body
    const valid = Boolean(username && password && typeof password === 'string')

    if (valid) {
        next()
    } else {
        res.status(422).json({
            message: 'Username and Password please'
        })
    }
}
const checkUsernameExists = (req, res, next) => {
    
    const { username } = req.body;
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

module.exports = {
    checkCredentials,
    checkUsernameExists
}