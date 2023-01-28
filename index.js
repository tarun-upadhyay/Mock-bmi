const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var cors = require("cors");
const bcrypt = require("bcrypt");
const { UsersModel } = require("./Models/Users.model");
const { connection } = require("./Config/db");
const { UsersprofileModel } = require("./Models/Usersprofile.model");
const { getprofile } = require("./Router/getProfile");
const { auth } = require("./Authentication/Authentication");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to home");
  });

app.post("/signup", async (req, res) => {
    const { email, password ,name} = req.body;
    const check = await UsersModel.findOne({ email });
    if (check) {
      res.send("Already had registerd plz login");
    } else {
      try {
        bcrypt.hash(password, 6, async function (err, hash) {
          const user = new UsersModel({ email, password: hash, name });
          const profile = new UsersprofileModel({email,name})
          await profile.save()
          await user.save();
          res.send("Sign Up Successfull");
        });
      } catch (e) {
        console.log(e);
        res.send({ msg: "Something went wrong contact admin" });
      }
    }
  });

  app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
      const user = await UsersModel.find({ email });
      if (user.length > 0) {
        const h_p = user[0].password;
        bcrypt.compare(password, h_p, function (err, result) {
          if (result) {
            const token = jwt.sign({ userId: user[0]._id }, "MOCK");
            res.send({ msg: "Login Successfull", token: token, email });
          } else {
            res.send({ msg: "Invalid Credentials" });
          }
        });
      } else {
        res.send({ msg: "User Not found Plz Signup First" });
      }
    } catch (er) {
      res.send("Something went wrong, please try again later");
    }
  });

  app.use(auth)

app.use("/getprofile", getprofile)

  
  app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("Connected to DB Successfully");
    } catch (e) {
      console.log("Error to connecting db");
      console.log(e);
    }
    console.log(`listing on ${process.env.PORT}`);
  });
  