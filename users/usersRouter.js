const router = require("express").Router();
const Users = require("./users-model");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "there was an error", error: err });
  }
});

module.exports = router;