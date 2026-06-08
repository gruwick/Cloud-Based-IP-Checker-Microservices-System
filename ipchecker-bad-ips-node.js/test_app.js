const request = require("supertest");
const app = require("./app");

describe("Bad IP Checker", () => {
  
  test("test_valid_good_ip", async () => {
    const response = await request(app).get("/?items=172.217.23.206");
    expect(response.statusCode).toBe(200);
    expect(response.body.results[0].status).toBe("Good IP");
  });

  test("test_valid_bad_ip", async () => {
    const response = await request(app).get("/?items=101.201.301.401");
    expect(response.statusCode).toBe(200);
    expect(response.body.results[0].status).toBe("Bad IP");
  });

  test("test_multiple_mixed_ips", async () => {
    const response = await request(app).get("/?items=101.201.301.401,1.21.23.206,103.203.303.403");
    expect(response.statusCode).toBe(200);
    const statuses = response.body.results.map(r => r.status);
    expect(statuses).toEqual(["Bad IP", "Good IP", "Bad IP"]);
  });

  test("test_empty_input", async () => {
    const response = await request(app).get("/?items=");
    expect(response.statusCode).toBe(200);
    expect(response.body.results.length).toBe(1);
  });

});
