const jwt = require("jsonwebtoken");
const db = require("../models");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authorizationMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      userToken = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(userToken, JWT_SECRET_KEY);

      const userId = decoded.id;
      const user = await db.User.findByPk(userId);
      if (user) {
        req.user = user;
        next();
      }
    } catch (err) {
      console.error("Error @authorization: ", err);
      next();
    }
  } else {
    next();
  }
};

module.exports = authorizationMiddleware;
