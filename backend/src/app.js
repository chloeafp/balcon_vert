const express = require("express");

const app = express();
app.use(express.json());
const {verifyPassword} = require("./auth")

const cors = require("cors");
const path = require('path');

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));


app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const router = require("./router");

app.use(router);

app.use(router);
app.get("*", (req, res) => {
  console.log("cheming", req.path);
  if (req.path.includes("public")) {
    const urlpath = req.path.split("/");
    res.sendFile(path.join(__dirname, "..", "public", urlpath[2], urlpath[3]));
  } else {
    res.sendFile(
      path.join(__dirname, "..", "..", "frontend", "dist", "index.html")
    );
  }
});

const userController = require("./controllers/userControllers")



app.post(
  "/api/login",
  userController.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword,
);

module.exports = app;
