const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const baseMarco = "http://localhost:3000/marco";//click here

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

  describe("GET /marco", () => {

    it("should return status code 200 and the string 'polo' ", (done) => {
     
      request.get(baseMarco, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe("polo");
        done();
      });
    });
  });
});

