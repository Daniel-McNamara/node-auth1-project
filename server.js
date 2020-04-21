const express = require("express");
const session = require("express-session");

const authRouter = require("./auth/authRouter");
const usersRouter = require("./users/usersRouter");
const authOnly = require("./auth/auth-mw");

const server = express();

const sessionConfig = {
    secret: "some sort of secret",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // true in production sends only over https
      httpOnly: true // true means no access from JS
    },
    resave: false,
    saveUninitialized: true // GDPR laws require check w/ client
  };
  
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", authOnly, usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is up!" });
});

module.exports = server;