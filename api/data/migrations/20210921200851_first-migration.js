
exports.up = async function(knex) {
  await knex.schema
    .createTable('users', (users)=>{
        users.increments('user_id')
        users.string('username', 200).notNullable().unique()
        users.string('password', 200).notNullable()
        users.string('phone', 320).notNullable().unique()
        users.timestamps(false, true)

    })
    .createTable('plants', (plants)=>{
        plants.increments('plant_id')
        plants.string('nickname', 200).notNullable()
        plants.string('species', 200).notNullable()
        plants.string('h2oFrequency', 255).notNullable()
        plants.binary('image')
        plants
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')
    })
    .createTable('users_plants', (users_plants)=>{
        users_plants.increments('users_plants_id')
        users_plants
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')
        users_plants
            .integer('plant_id')
            .unsigned()
            .notNullable()
            .references('plant_id')
            .inTable('plants')
            .onDelete('CASCADE')
    })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users_plants')
  await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
};
