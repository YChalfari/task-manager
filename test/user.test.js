const request = require("supertest");
//!We need the express app but without calling app.listen
//!so we moved the app.listen() call to a seperate file
const app = require("../src/app");
const User = require("../src/models/user");
//!Delete DB before running the tests so it runs on clean slate
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//!Assertions - are expectations or assumptions

//? Create a user after wiping the DB for tests requiring a user in the DB

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "userOne",
  email: "userOne@example.com",
  password: "userOnepw",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany({});
  await new User(userOne).save();
});

afterEach(() => {});

//Test new user creation + that a token is being created and returned
test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "blablah@example.com",
      password: "Coolpw123",
    })
    .expect(201);

  // Assert that new user was actually created
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Andrew",
      email: "blablah@example.com",
    },
    token: user.tokens[0].token,
  });
  //make sure the user password is hashed
  expect(user.password).not.toBe("Coolpw123");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should NOT login a non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "gibberish",
      password: "gibberish",
    })
    .expect(400);
});

//here we need to set the header for authorization of the token
test("Should get profile for user", async () => {
  console.log(
    jwt.verify(userOne.tokens[0].token, process.env.JWT_SECRET),
    userOneId
  );
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should NOT get profile for unauthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete acc for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete acc for not authorized user user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
//we need to set up a "fixture" to set up the test resources
test("Should upload avatar image", async () => {});
