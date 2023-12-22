const request = require("supertest");
const { app, server } = require("../../../../server");

describe("Automobiles Resource", () => {
  afterAll(() => {
    server.close();
  });

  describe("POST /automobiles", () => {
    test("should register automobile with license plate ABC", async () => {
      const res = await request(app).post("/automobiles").send({
        licensePlate: "ABC",
        color: "Green",
        brand: "Foo",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.automobile).toHaveProperty("id");
      expect(res.body.automobile.licensePlate).toEqual("ABC");
      expect(res.body.automobile.color).toEqual("Green");
      expect(res.body.automobile.brand).toEqual("Foo");
    });

    test("should register automobile with license plate XYZ", async () => {
      const res = await request(app).post("/automobiles").send({
        licensePlate: "XYZ",
        color: "Blue",
        brand: "Baa",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.automobile).toHaveProperty("id");
      expect(res.body.automobile.licensePlate).toEqual("XYZ");
      expect(res.body.automobile.color).toEqual("Blue");
      expect(res.body.automobile.brand).toEqual("Baa");
    });
  });

  describe("GET by ID /automobiles", () => {
    test("should get the automobile with license plate ABC by ID", async () => {
      const autoCreated = await request(app).post("/automobiles").send({
        licensePlate: "ABC",
        color: "Red",
        brand: "Foo",
      });

      const autoId = autoCreated.body.automobile.id;
      const res = await request(app).get(`/automobiles/${autoId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.automobile.id).toEqual(autoId);
      expect(res.body.automobile.licensePlate).toEqual("ABC");
      expect(res.body.automobile.color).toEqual("Red");
      expect(res.body.automobile.brand).toEqual("Foo");
    });

    test("should get the automobile with license plate XYZ by ID", async () => {
      const autoCreated = await request(app).post("/automobiles").send({
        licensePlate: "XYZ",
        color: "Yellow",
        brand: "Foo",
      });

      const autoId = autoCreated.body.automobile.id;
      const res = await request(app).get(`/automobiles/${autoId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.automobile.id).toEqual(autoId);
      expect(res.body.automobile.licensePlate).toEqual("XYZ");
      expect(res.body.automobile.color).toEqual("Yellow");
      expect(res.body.automobile.brand).toEqual("Foo");
    });
  });

  describe("PUT /automobiles", () => {
    test("should update the automobile color", async () => {
      const autoCreated = await request(app).post("/automobiles").send({
        licensePlate: "ABC",
        color: "Red",
        brand: "Foo",
      });

      const autoId = autoCreated.body.automobile.id;
      const res = await request(app).put(`/automobiles/${autoId}`).send({
        color: "Blue",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.automobile.id).toEqual(autoId);
      expect(res.body.automobile.licensePlate).toEqual("ABC");
      expect(res.body.automobile.color).toEqual("Blue");
      expect(res.body.automobile.brand).toEqual("Foo");
    });

    test("should update the automobile licensePlate", async () => {
      const autoCreated = await request(app).post("/automobiles").send({
        licensePlate: "ABC",
        color: "Red",
        brand: "Foo",
      });

      const autoId = autoCreated.body.automobile.id;
      const res = await request(app).put(`/automobiles/${autoId}`).send({
        licensePlate: "XYZ",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.automobile.id).toEqual(autoId);
      expect(res.body.automobile.licensePlate).toEqual("XYZ");
      expect(res.body.automobile.color).toEqual("Red");
      expect(res.body.automobile.brand).toEqual("Foo");
    });
  });
});
