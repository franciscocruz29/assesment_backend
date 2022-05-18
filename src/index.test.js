const req = require("supertest");
const jwt = require("jsonwebtoken");
const User = require("./api/user/user.model");
const FavList = require("./api/fav-list/models/fav-list.model");
const mongoose = require("mongoose");
const { disconnectDB, connectDB, cleanupDB } = require("./config/database");
const { app } = require("./index");

const userId = mongoose.Types.ObjectId();
const favListId = mongoose.Types.ObjectId();
const user = {
  userId,
  email: "test@gmail.com",
  password: "12345678",
  token: jwt.sign({ userId, email: "test@gmail.com" }, process.env.TOKEN_KEY),
};

describe("User", () => {
  beforeAll(async () => {
    await connectDB();
    await cleanupDB();

    const defaultUser = new User(user);
    await defaultUser.save();
    const favList = new FavList({
      _id: favListId,
      name: "Test Favorites",
      favs: [
        {
          title: "Test Favorite",
          description: "this is a description favorite",
          link: "https://google.com",
        },
      ],
    });
    await favList.save();
  });
  afterAll(async () => {
    await cleanupDB();
    await disconnectDB();
  });
  it("should log in user", async () => {
    const res = await req(app)
      .post("/auth/local/login")
      .send({ email: "test@gmail.com", password: "12345678" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBe(null);
  });
  it("should get fav lists", async () => {
    const res = await req(app)
      .get("/api/favs")
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  it("should get fav list by id", async () => {
    const res = await req(app)
      .get(`/api/favs/${favListId.toString()}`)
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).not.toBe(null);
  });
  it("should create fav list", async () => {
    const favList = {
      name: "Fav List test",
      favs: [
        {
          title: "Fav test",
          description: "Description fav test",
          link: "https://google.com",
        },
      ],
    };
    const res = await req(app)
      .post("/api/favs")
      .set("Authorization", `Bearer ${user.token}`)
      .send(favList);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).not.toBe(null);
  });
  it("should delete fav list by id", async () => {
    const res = await req(app)
      .delete(`/api/favs/${favListId.toString()}`)
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.statusCode).toBe(200);
  });
});
