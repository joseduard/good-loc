const request = require("supertest");
const app = require("../../../app.js"); // this is your express app

describe("GET /", () => {
  it("responds with a json message", function () {
    return request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
