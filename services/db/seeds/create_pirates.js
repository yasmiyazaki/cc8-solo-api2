exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("pirates")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("pirates").insert([
        { pirate_name: "Straw Hat Pirates" },
        { pirate_name: "Arlong Pirates" },
        { pirate_name: "Blackbeard Pirates" },
        { pirate_name: "Buggy's Band of Pirates" },
        { pirate_name: "Don Quixote Pirates" },
        { pirate_name: "Red-Haired Pirates" },
        { pirate_name: "Whitebeard Pirates" }
      ]);
    });
};
