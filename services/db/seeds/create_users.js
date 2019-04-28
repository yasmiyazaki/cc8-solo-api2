exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "Monkey D. Luffy"
        },
        {
          username: "Roronoa Zoro"
        },
        {
          username: "Nami"
        },
        {
          username: "Usoppu"
        },
        {
          username: "Vinsmoke Sanji"
        },
        {
          username: "Chopper"
        },
        {
          username: "Nico Robin"
        },
        {
          username: "Franky"
        },
        {
          username: "Brook"
        },
        {
          username: "Jimbei"
        }
      ]);
    });
};
p;
