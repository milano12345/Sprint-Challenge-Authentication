const request = require("supertest"); // calling it "request" is a common practice

const server = require("./api/server"); // this is our first red, file doesn't exist yet

const userModel = require("./database/models/users");

// our connection to the database
const db = require("./database/dbConfig");

// HOME ENDPOINTS //
beforeEach(async () => {
  // this function executes and clears out the table before each test
});

describe("server.js", () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe("index route", () => {
    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;

      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedStatusCode);

      // same test using promise .then() instead of async/await
      // let response;
      // return request(server).get('/').then(res => {
      //   response = res;

      //   expect(response.status).toEqual(expectedStatusCode);
      // })
    });

    it("should return a JSON object fron the index route", async () => {
      const expectedBody = { api: "running" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });

    it("should return a JSON object fron the index route", async () => {
      const response = await request(server).get("/");

      expect(response.type).toEqual("application/json");
    });
  });
  describe("auth route", () => {
    it("should return a 401 from the auth users route", async () => {
      const expectedStatusCode = 401;
      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get("/api/auth/users");

      expect(response.status).toEqual(expectedStatusCode);
    });
  });
  describe("register endpoint", () => {
    it("register endpoint", async () => {
      const expectedStatusCode = 201;
      await db("users").truncate();
      const response = await request(server)
        .post("/api/auth/register")
        .send({
          username: "jimmy",
          password: "password"
        });
      expect(response.status).toEqual(expectedStatusCode);

      //expect(Tester.username).toBe("tim");
    });
  });
  describe("users model", () => {
    it("should insert the provided users into the database", async () => {
      await db("users").truncate();
      let tester = await userModel.add({
        username: "tim",
        password: "password"
      });
      const Tester = await db("users");
      expect(Tester).toHaveLength(1);
      //expect(Tester.username).toBe("tim");
    });
  });
});
