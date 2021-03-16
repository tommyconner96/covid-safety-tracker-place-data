exports.up = async function(knex) {
    await knex.schema.createTable("places", table => {
      table.text("place_id").notNullable().unique()
      table.boolean("masks")
      table.boolean("contact_tracing")
      table.boolean("curbside")
      table.boolean("indoor")
      table.boolean("outdoor")
    })
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("places")
  }
  