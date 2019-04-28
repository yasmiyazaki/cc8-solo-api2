exports.up = function(knex, Promise) {
  return knex.schema.table("users", t => {
    t.string("pirate");
    t.foreign("pirate").references("pirates.pirate_name");
  });
};

exports.down = function(knex, Promise) {};
