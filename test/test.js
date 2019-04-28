const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { createServer } = require("../src/server");
chai.should();
const { users } = require("../src/data/users");

const config = require("../config");
const knex = require("knex")(config.db);

const sinon = require("sinon");

const server = createServer();
describe("classManager API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  describe("GET /users", () => {
    it("should return the full list of Users", async () => {
      const res = await request.get("/users");
      const allUsers = JSON.parse(res.text);
      const usersFromFile = users.map(user => user.username);
      allUsers.map(user => user.username).should.deep.equal(usersFromFile);
    });
    it("should return a fake result using sinon", async () => {
      const fakeObj = { text: null };
      const stub = sinon.stub(request, "get").callsFake(() => {
        fakeObj.text = JSON.stringify(users);
        return fakeObj;
      });
      const res = await request.get("/users");
      const allUsers = JSON.parse(res.text);
      const usersFromFile = users.map(user => user.username);
      allUsers.map(user => user.username).should.deep.equal(usersFromFile);
      stub.restore();
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
    it("should get user data based on provided username", async () => {
      const res = await request.get("/users/Usoppu");
      const result = JSON.parse(res.text);
      result[0].username.should.eql("Usoppu");
    });
    it("should return error if user does not exist", async () => {
      const res = await request.get("/users/Pikachu");
      res.should.have.status(404);
    });
  });

  describe("POST /users/add", () => {
    it("should add a user.", async () => {
      const user = { username: "Shanks" };
      const res = await request.post("/users").send(user);
      const addedUser = JSON.parse(res.text).pop();
      knex("users")
        .where("users.username", "Shanks")
        .del()
        .then();
      addedUser.should.eql(user.username);
    });
    it("should return status code 404 if username not provided properly", async () => {
      const user = { name: "Shanks" };
      const res = await request.post("/users").send(user);
      res.should.have.status(404);
    });
  });

  describe("GET /pirates/:p_name/users", () => {
    it("should return all users that belong to Straw Hat", async () => {
      const res = await request.get("/pirates/Straw Hat Pirates/users/");
      const crews = JSON.parse(res.text);
      crews.map(crew => crew.username).length.should.equal(10);
    });
  });
});
