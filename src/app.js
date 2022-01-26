const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
//!toJSON is like middleware for every time JSON.stringify is called
// it is called by default with res.send()
// since we set up toJSON as an instance method
// const pet = {
//   name: "pet",
//   password: "abc123",
// };
// pet.toJSON = function () {
//   console.log(this);
//   delete this.password;
//   return this;
// };
// console.log(JSON.stringify(pet));

//!connecting collections using refs in the schema, virtual properties, and the populate method
//!the tasks property on the user is a VIRTUAL property and doesn't actually exist on the user itself.
// const Task = require("./models/task");
// const User = require("./models/user");

// const findOwner = async () => {
//   const task = await Task.findById("61eef3124f585125e8df1ee1").populate(
//     "owner"
//   );
//   // console.log("task owner", task.owner);
//   // await task.populate("owner");
// };

// const findTask = async () => {
//   const user = await User.findById("61eef10bcdcc764808cf9640").populate(
//     "tasks"
//   );
//   // await user.populate("tasks");
//   console.log("user", user, "user tasks", user.tasks);
// };
// findOwner();
// findTask();
