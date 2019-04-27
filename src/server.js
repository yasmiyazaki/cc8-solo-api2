const { users, lectures, comments } = require("./data");
const express = require("express");

const config = require("../config");
const knex = require("knex")(config.db);

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.get("/users", (req, res) => {
    const num = req.query.limit ? req.query.limit : Infinity;
    knex("users")
      .select()
      .limit(num)
      .then(result => {
        res.send(result);
      });
  });
  app.post("/users/", (req, res) => {
    const incomingUser = req.body.username;

    knex("users")
      .returning("username")
      .insert({ username: incomingUser })
      .then(user => res.send(user));
  });
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
