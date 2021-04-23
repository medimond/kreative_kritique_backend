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

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Server Started"));
