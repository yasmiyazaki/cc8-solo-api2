exports.up = function(knex, Promise) {
  return knex.schema.createTable("pirates", t => {
    t.string("pirate_name", 50)
      .primary()
      .unique()
      .notNullable()
      .index();

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("pirates");
};
