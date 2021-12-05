const bcrypt = require("bcrypt");
const db = require("../models");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const createUser = async ({
  username,
  email,
  password,
  firstName,
  lastName,
}) => {
  try {
    const user1 = await db.User.findOne({
      where: {
        username,
      },
    });

    const user2 = await db.User.findOne({
      where: {
        email,
      },
    });

    if (user1 || user2) {
      return {
        message: "A user with the existing username or email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await db.User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return {
      message: "Successfully created the user",
    };
  } catch (err) {
    console.error("Error @registerHandler:", err);
    return { message: err.message };
  }
};

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    console.error("Something went wrong in Users controller", error);
    return null;
  }
};

const getUsersPurchasesById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await db.User.findAll({
      where: {
        id: userId,
      },
      include: [
        {
          model: db.Purchase,
          include: [db.Game],
        },
      ],
    });
    if (!user) {
      throw new Error(`No user with id ${userId} was found`);
    }
    res.send(user);
  } catch (error) {
    console.error("Something went wrong in Users controller", error);
    res.send({
      error: "Something went wrong in Users controller",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUsersPurchasesById,
};
