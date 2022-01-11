const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const JWT_SECRET_KEY = process.env.JWT_SECRET_TOKEN;

const loginHandler = async (username, password) => {
  try {
    const user = await db.User.findOne({
      where: {
        username,
      },
    });
    console.log(JWT_SECRET_KEY)
    if (user) {
      const result = await bcrypt.compare(password, user.password);

      return result
        ? jwt.sign(
            {
              id: user.id,
            },
            JWT_SECRET_KEY
          )
        : null;
    }
  } catch (err) {
    console.error("Error @loginHandler:", err);
  }

  return null;
};

module.exports = loginHandler;
