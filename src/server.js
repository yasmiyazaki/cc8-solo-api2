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

    knex("users")
      .returning("username")
      .insert({ username: incomingUser })
      .then(user => res.send(user));
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

  // Lecture API **does not update database**
  app.get("/lectures", (req, res) => {
    const { limit } = req.query;
    if (limit) {
      const lectureList = [];
      for (let i = 0; i < limit; i++) {
        lectureList.push(lectures[i]);
      }
      res.send(lectureList);
    } else {
      res.send(lectures);
    }
  });
  app.post("/lectures/", (req, res) => {
    lectures.push(req.body);
    res.send(lectures);
  });
  return app;
};

module.exports = { createServer };
