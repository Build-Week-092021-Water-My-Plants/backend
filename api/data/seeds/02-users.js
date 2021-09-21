exports.seed = async function (knex) {
    await knex("users").insert([
      {
        username: "PETE BEN",
        password: "summertime90",
        phone: "911",
      },
      {
        username: "Anthony Spikes",
        password: "FreeWWorld",
        phone: "123344",
      },
    ])
  } 