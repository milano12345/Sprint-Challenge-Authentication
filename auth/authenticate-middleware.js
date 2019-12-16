/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secret = "easy password";

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({ message: error });
    } else {
      res.locals.decodedToken = decodedToken;
      next();
    }
  });
}

module.exports = authenticate;
