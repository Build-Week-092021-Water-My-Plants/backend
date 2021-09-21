exports.seed = async function (knex) {
    await knex("plants").insert([
      {
        nickname: "Project Mayhem",
        species: "ivy",
        h2oFrequency: "Once a day",
        user_id: 1,
      },
      {
        nickname: "Happiness Project",
        species: "succulent",
        h2oFrequency: "Once a day",
        user_id: 2,
      },
    ])
  }