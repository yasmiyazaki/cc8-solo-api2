const { users } = require("./data/users.json");
const { lectures } = require("./data/lectures.json");
const express = require("express");

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.get("/users", (req, res) => {
    const { limit } = req.query;
    if (limit) {
      const userList = [];
      for (let i = 0; i < limit; i++) {
        userList.push(users[i]);
      }
      res.send(userList);
    } else {
      res.send(users);
    }
  });
  app.post("/users/", (req, res) => {
    users.push(req.body);
    res.send(users);
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
