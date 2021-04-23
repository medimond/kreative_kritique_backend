require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", (error) => console.log("Connected to Database"));

app.use(express.json());

app.use(function (req, res, next) {
  //Website you wish to allow to connect
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.header({
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  });
  res.header({
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  });
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }
  next();
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Server Started"));
