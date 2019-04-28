const { users, lectures, comments } = require("./data");
const express = require("express");

const config = require("../config");
const knex = require("knex")(config.db);

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.get("/", (req, res) => {
    res.sendfile(__dirname + "/index.html");
  });
  app.get("/users", (req, res) => {
    const num = req.query.limit ? req.query.limit : Infinity;
    knex("users")
      .select()
      .limit(num)
      .then(result => {
        res.send(result);
      });
  });
  app.get("/users/:name", (req, res) => {
    const { name } = req.params;
    knex("users")
      .where({ username: name })
      .select()
      .then(result => {
        if (result[0]) {
          res.send(result);
        } else {
          res.sendStatus(404);
        }
      });
  });
  app.post("/users/", (req, res) => {
    const incomingUser = req.body.username;

    if (!incomingUser) {
      return res.sendStatus(404);
    }

    knex("users")
      .returning("username")
      .insert({ username: incomingUser })
      .then(user => {
        return res.send(user);
      });
  });
  app.patch("/users/", (req, res) => {
    const changeThisUser = req.body.changeThisUser;
    const intoThisUser = req.body.intoThisUser;

    knex("users")
      .where({ username: changeThisUser })
      .update({ username: intoThisUser })
      .then(() => res.send(intoThisUser));
  });
  app.delete("/users/", (req, res) => {
    const deleteThisUser = req.body.username;

    knex("users")
      .where({ username: deleteThisUser })
      .del()
      .then(() => res.send(deleteThisUser));
  });
  app.get("/pirates/:p_name/users", (req, res) => {
    const pirate = req.params.p_name;
    knex("users")
      .where({ pirate })
      .select()
      .then(result => {
        if (result) {
          res.send(result);
        } else {
          res.sendStatus(404);
        }
      });
  });

  return app;
};

module.exports = { createServer };
