const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/trello", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  //we're connected!
  console.log("Mongoose online");
});
