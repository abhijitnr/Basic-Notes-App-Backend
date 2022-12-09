const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers?.token?.split(" ")[1];

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (decoded) {
      const userId = decoded.userId;
      req.body.userId = userId;
      next();
    } else {
      res.send("Please login");
    }
  } else {
    res.send("Login to access the app");
  }
};

module.exports = { authenticateUser };
