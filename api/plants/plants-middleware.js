const Users = require('../users/users-model')

const noMissingInformation = (req, res, next) => {
    const { nickname, species, h2oFrequency, user_id } = req.body
    if (!nickname || !species || !h2oFrequency || !user_id) {
        res.status(422).json({message: "The following entries: user_id, nickname, species, and h2oFrequency are required."})
    } else {
        next()
    }
}

const checkUserIdExists = (req, res, next) => {
    const { user_id } = req.body;
    Users.getById(user_id)
        .then(exists => {
            if(!exists) {
                res.status(401).json({message: `User with user_id ${user_id} does not exist.`})
            } else {
                next()
            }
        })
        .catch(next)
}

module.exports = {
    noMissingInformation,
    checkUserIdExists,
}