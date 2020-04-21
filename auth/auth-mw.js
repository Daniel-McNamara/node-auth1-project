module.exports = (req, res, next) => {
    // check that we remember the client,
    // and that the client is already logged in
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  };