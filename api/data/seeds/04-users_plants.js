exports.seed = async function (knex) {
    await knex("users_plants").insert([
      { user_id: 1, plant_id: 1 },
      { user_id: 2, plant_id: 2 },
    ])
  }