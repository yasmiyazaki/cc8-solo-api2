const config = require("../config");
const knex = require("knex")(config.db);
const { users } = require("../src/data/users");

const ignoreError = () => {
  // do nothing
};

const clearTable = tableName =>
  knex(tableName)
    .del()
    .catch(ignoreError);

const tables = ["users"];

Promise.all(tables.map(clearTable)).then();

Promise.resolve(
  knex("users")
    .insert(users)
    .then(process.exit)
);
