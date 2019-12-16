const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dataBase = require("./knex/models/register");

router.post("/register", (req, res) => {
  // implement registration
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  dataBase
    .add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the hub"
      });
    });
});

router.post("/login", (req, res) => {
  // implement login
  dataBase
    .findBy(req.body.username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unexpected error" });
    });
});

function generateToken(user) {
  const payload = {
    user: user.username,
    subject: user.id
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

const secret = "easy password";

module.exports = router;
