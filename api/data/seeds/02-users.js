exports.seed = async function (knex) {
    await knex("users").insert([
      {
        username: "PETE BEN",
        password: "summertime90",
        phone_number: "911",
      },
      {
        username: "Anthony Spikes",
        password: "FreeWWorld",
        phone_number: "123344",
      },
    ])
  } 