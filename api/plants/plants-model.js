const db = require('../data/db-config')

function get() {
  return db('plants')
}

function getBy(filter) {
  return db('plants').where(filter).orderBy("plant_id")
}

function getById(plant_id) {
  return db('plants').where('plant_id', plant_id).first()
}

function update(plant_id, changes) {
  return db('plants').where('plant_id', plant_id).first().update(changes)
}

function remove(plant_id) {
  return db('plants').where('plant_id', plant_id).first().del()
}

async function add(newPlant) {
  const [plant] = await db('plants').insert(newPlant, ['plant_id', 'nickname', 'species', 'h2oFrequency', 'image', 'user_id'])
  return plant;
}

module.exports = {
  get,
  getBy,
  getById,
  add,
  update,
  remove,
}