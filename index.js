const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const { apiRouter } = require("./src/api");
const { userRouter } = require("./src/userRoute");
const { User } = require("./src/model/userModel");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const protect = async (req, res, next) => {
  const headerToken = req.headers["authorization"];
  if (!headerToken) {
    res.status(403).send("Not Auth");
  }
  const token = headerToken.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(403).send("Not Auth");
  }
  const data = jwt.decode(token);
  // console.log(data);
  const user = await User.findById(data.userId);
  if (!user) {
    res.status(403).send("User not found");
  }
  req.userId = user._id;
  next();
};

// use api router
app.use("/api", protect, apiRouter);
app.use("/user", userRouter);

// basic route
app.get("/", (req, res) => {
  console.log("Hi from /");
  res.send("Hello World");
});

app.all("*", (req, res) => {
  res.send("404 not found na Mr John");
});

// start app

const port = process.env.PORT || 4000;

mongoose
  .connect(
    "mongodb+srv://JohnTik:lovetik123@cluster0.m71y0.mongodb.net/mern_course?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connect mongodb success");
    //const port = 3000;
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log("Run server on port: ", port);
    });
  })
  .catch(() => {
    console.log("Connect mongodb error");
  });
