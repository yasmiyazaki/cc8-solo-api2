const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { createServer } = require("../src/server");
chai.should();
const { users } = require("../src/data/users");

const server = createServer();
describe("classManager API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  describe("GET /users", () => {
    it("should return the full list of Users", async () => {
      const res = await request.get("/users");
      JSON.parse(res.text).should.deep.equal(users);
    });
    it("should b able to take a query parameter 'limit=n'", async () => {
      const res = await request.get("/users/").query({ limit: 3 });
      const threeUsers = [];
      for (let i = 0; i < 3; i++) {
        threeUsers.push(users[i]);
      }
      res.should.be.json;
      JSON.parse(res.text).should.eql(threeUsers);
    });
  });
  describe("POST /users/add", () => {
    it("should add a user.", async () => {
      const user = { id: "999", username: "test" };
      const res = await request.post("/users/add").send(user);
      const addedUser = JSON.parse(res.text).pop();
      addedUser.should.eql(user);
    });
  });
});
