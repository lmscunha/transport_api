const request = require("supertest");
const { app, server } = require("../../../../server");

describe("Automobiles Resource", () => {
  afterAll(() => {
    server.close();
  });

  describe("GET /automobiles", () => {
    test("should list all automobiles", async () => {
      const autoCreated1 = await request(app).post("/automobiles").send({
        licensePlate: "ABC1",
        color: "Red",
        brand: "Foo",
      });

      const autoCreated2 = await request(app).post("/automobiles").send({
        licensePlate: "ABC2",
        color: "Blue",
        brand: "Baa",
      });

      const autoCreated3 = await request(app).post("/automobiles").send({
        licensePlate: "ABC3",
        color: "Yellow",
        brand: "Foo Baa",
      });

      const res = await request(app).get(`/automobiles`);

      expect(res.statusCode).toBe(200);
      expect(res.body.automobiles.length).toEqual(3);
      expect(res.body.automobiles[0].id).toEqual(
        autoCreated1.body.automobile.id,
      );
      expect(res.body.automobiles[1].id).toEqual(
        autoCreated2.body.automobile.id,
      );
      expect(res.body.automobiles[2].id).toEqual(
        autoCreated3.body.automobile.id,
      );
    });

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

  describe("DELETE /automobiles", () => {
    test("should remove the automobile by ID", async () => {
      const autoCreated = await request(app).post("/automobiles").send({
        licensePlate: "ABC",
        color: "Red",
        brand: "Foo",
      });

      const autoId = autoCreated.body.automobile.id;
      const res = await request(app).delete(`/automobiles/${autoId}`);

      expect(res.statusCode).toBe(204);
    });

    test("should not featch a deleted automobile", async () => {
      const autoCreated = await request(app).post("/automobiles").send({
        licensePlate: "ABC",
        color: "Red",
        brand: "Foo",
      });

      const autoId = autoCreated.body.automobile.id;
      await request(app).delete(`/automobiles/${autoId}`);
      const res = await request(app).get(`/automobiles/${autoId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toEqual("Automobile not found.");
    });
  });
});
