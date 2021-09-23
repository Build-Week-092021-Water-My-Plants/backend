
exports.up = async function(knex) {
  await knex.schema
    .createTable('users', (users)=>{
        users.increments('user_id')
        users.string('username', 200).notNullable().unique()
        users.string('password', 200).notNullable()
        users.string('phone_number', 10).notNullable().unique()
        users.timestamps(false, true)

    })
    .createTable('plants', (plants)=>{
        plants.increments('plant_id')
        plants.string('nickname', 200).notNullable()
        plants.string('species', 200).notNullable()
        plants.decimal('h2oFrequency', 255).notNullable()
        plants.string('image')
        plants
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
}
