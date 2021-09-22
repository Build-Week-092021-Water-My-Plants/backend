const db = require("../data/db-config")

function getPlants() {
    return db("plants")
}

function getBy(filter) {
    return db("plants").where(filter).orderBy('plant_id')
  }

async function createPlant(plant) {
    const [plant_id] = await db("plants").insert(plant)
    return getPlants().where({ plant_id }).first()
}

module.exports = {
    getPlants,
    getBy,
    createPlant
} 