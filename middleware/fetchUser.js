var jwt = require("jsonwebtoken");
const JWT_SECRET = "PrakharCanDoAnything";

const fetchUser = (req, res, next) => {
  // get the user from the jwt token and add id req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    console.log(data.user);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
