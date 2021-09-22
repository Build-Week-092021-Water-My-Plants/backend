const db = require("../data/db-config")

function getUsers() {
    return db("users")
}

function getBy(filter) {
    return db("users").where(filter).orderBy('user_id')
  }

async function createUser(user) {
    const [id] = await db("users").insert(user)
    return getUsers().where({ id }).first();
}

module.exports = {
    getUsers,
    getBy,
    createUser
} 