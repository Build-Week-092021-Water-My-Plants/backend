const db = require('../data/db-config')

function get() {
  return db('users')
}

function getBy(filter) {
  return db('users').where(filter).orderBy("user_id")
}

function getById(user_id) {
  return db('users').where('user_id', user_id).first()
}

function getUserPlants(user_id) {
  return db("users")
    .leftJoin('plants', 'users.user_id', 'plants.user_id')
    .where("users.user_id", user_id)
    .select('h2oFrequency', 'image', 'nickname', 'plant_id', 'species')
    .orderBy('plant_id')
}


function update(user_id, changes) {
  return db('users').where('user_id', user_id).first().update(changes)
}

async function add(newUser) {
  const [user] = await db('users').insert(newUser, ['user_id', 'username', 'phone_number'])
  return user
}

module.exports = {
  get,
  getBy,
  getById,
  getUserPlants,
  add,
  update,
}