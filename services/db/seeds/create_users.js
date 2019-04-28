exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "Monkey D. Luffy",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Roronoa Zoro",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Nami",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Usoppu",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Vinsmoke Sanji",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Chopper",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Nico Robin",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Franky",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Brook",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Jimbei",
          pirate: "Straw Hat Pirates"
        },
        {
          username: "Nefeltari Vivi"
        },
        {
          username: "Buggy the Clown",
          pirate: "Buggy's Band of Pirates"
        }
      ]);
    });
};
