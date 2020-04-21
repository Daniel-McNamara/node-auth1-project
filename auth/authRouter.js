const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("../users/users-model");

router.post("/register", async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: req.body.password
    };
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
    userInfo.password = hash;
    const newUser = await Users.add(userInfo);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "there was an error", error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = {
        id: user.id,
        username: user.username
      };
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "there was an error", error: err.message });
  }
});

module.exports = router;