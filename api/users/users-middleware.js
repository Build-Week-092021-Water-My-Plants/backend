const Users = require('./users-model')

const checkUserExists = (req, res, next) => {
    const { id } = req.params;
    Users.getById(id)
        .then(exists => {
            if(!exists) {
                res.status(401).json({message: `User does not exist.`})
            } else {
                next();
            }
        })
        .catch(next);
}

module.exports = {
    checkUserExists,
}