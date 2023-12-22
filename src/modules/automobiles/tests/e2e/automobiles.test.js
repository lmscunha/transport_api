const request = require("supertest");
const { app, server } = require("../../../../server");

describe("Automobiles Resource", () => {
  afterAll(() => {
    server.close();
  });

  describe("POST /automobiles", () => {
    test("should register automobile with license plate ABC", async () => {
      const res = await request(app)
        .post("/automobiles")
        .send({
          automobile: {
            licensePlate: "ABC",
            color: "Green",
            brand: "Foo",
          },
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.result).toHaveProperty("id");
      expect(res.body.result.licensePlate).toEqual("ABC");
      expect(res.body.result.color).toEqual("Green");
      expect(res.body.result.brand).toEqual("Foo");
    });

    test("should register automobile with license plate XYZ", async () => {
      const res = await request(app)
        .post("/automobiles")
        .send({
          automobile: {
            licensePlate: "XYZ",
            color: "Blue",
            brand: "Baa",
          },
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.result).toHaveProperty("id");
      expect(res.body.result.licensePlate).toEqual("XYZ");
      expect(res.body.result.color).toEqual("Blue");
      expect(res.body.result.brand).toEqual("Baa");
    });
  });

  describe("GET by ID /automobiles", () => {
    test("should get the automobile with license plate ABC by ID", async () => {
      const autoCreated = await request(app)
        .post("/automobiles")
        .send({
          automobile: {
            licensePlate: "ABC",
            color: "Red",
            brand: "Foo",
          },
        });

      const autoId = autoCreated.body.result.id;
      const res = await request(app).get(`/automobiles/${autoId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.result.id).toEqual(autoId);
      expect(res.body.result.licensePlate).toEqual("ABC");
      expect(res.body.result.color).toEqual("Red");
      expect(res.body.result.brand).toEqual("Foo");
    });

    test("should get the automobile with license plate XYZ by ID", async () => {
      const autoCreated = await request(app)
        .post("/automobiles")
        .send({
          automobile: {
            licensePlate: "XYZ",
            color: "Yellow",
            brand: "Foo",
          },
        });

      const autoId = autoCreated.body.result.id;
      const res = await request(app).get(`/automobiles/${autoId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.result.id).toEqual(autoId);
      expect(res.body.result.licensePlate).toEqual("XYZ");
      expect(res.body.result.color).toEqual("Yellow");
      expect(res.body.result.brand).toEqual("Foo");
    });
  });
});
