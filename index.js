const express = require("express");
const app = express();
const env = require("dotenv");
const dbconnect = require("./Config/db");
env.config();
const port = process.env.PORT || 6500;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bugUserModel = require("./Models/buguser.model");
const bug = require("./Routes/majorBug.route");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.post("/signup", async (req, res) => {
  try {
    let bugdata = await bugUserModel.find({ email: req.body.email });
    if (bugdata.length > 0) {
      res.status(200).send({ msg: "User Already Exist" });
    } else {
      bcrypt.hash(req.body.password, 4, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        }
        req.body.password = hash;
        await bugUserModel.create(req.body);
        res.status(200).send({ msg: "User registered Successfully" });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to create new user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let data = await bugUserModel.find({ email: req.body.email });
    if (data.length <= 0) {
      res.status(200).send({ msg: "Invalid Credentials" });
    } else {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong" });
        } else if (result) {
          jwt.sign(
            { userID: data[0]._id },
            process.env.SEC_KEY,
            (err, token) => {
              res.status(200).send({
                msg: "Login Successful",
                token: token,
              });
            }
          );
        } else {
          res.status(200).send({ msg: "Invalid Credentials" });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to login" });
  }
});
app.use("/bug",bug);
app.listen(port, () => {
  dbconnect;
  console.log(`listening to ${port}`);
});
