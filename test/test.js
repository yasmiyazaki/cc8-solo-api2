const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { createServer } = require("../src/server");
chai.should();
const { users } = require("../src/data/users");

const config = require("../config");
const knex = require("knex")(config.db);

const server = createServer();
describe("classManager API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
    Promise.resolve(
      knex("users")
        .insert(users)
        .then(console.log("seed data inserted"))
    );
  });
  describe("GET /users", () => {
    it("should return the full list of Users", async () => {
      const res = await request.get("/users");
      const allUsers = JSON.parse(res.text);
      const usersFromFile = users.map(user => user.username);
      allUsers.map(user => user.username).should.deep.equal(usersFromFile);
    });
    it("should be able to take a query parameter 'limit=n'", async () => {
      const res = await request.get("/users/").query({ limit: 3 });
      const threeUsers = [];
      for (let i = 0; i < 3; i++) {
        threeUsers.push(users[i]);
      }
      res.should.be.json;
      const usersFromFile = threeUsers.map(user => user.username);
      const limitedUsers = JSON.parse(res.text);
      limitedUsers.map(user => user.username).should.eql(usersFromFile);
    });
  });
  describe("POST /users/add", () => {
    it("should add a user.", async () => {
      const user = { username: "JINS" };
      const res = await request.post("/users").send(user);
      const addedUser = JSON.parse(res.text).pop();
      addedUser.should.eql(user.username);
    });
  });
});
