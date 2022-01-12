const db = require("../models");

const grantAdminRole = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user)
      return {
        message: `User with ID ${id} does not exist`,
      };

    if (user.RoleId == 1) {
      return {
        message: `User with ID ${id} is already and admin`,
      };
    }

    user.RoleId = 1;
    const res = await user.save();
    return {
      message: `Success`,
    };
  } catch (err) {
    console.error("Error @grantAdminRole:", err);
    return null;
  }
};

const revokeAdminRole = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user)
      return {
        message: `User with ID ${id} does not exist`,
      };

    if (user.RoleId == 0) {
      return {
        message: `User with ID ${id} is already not and admin`,
      };
    }

    user.RoleId = 0;
    const res = await user.save();
    return {
      message: `Success`,
    };
  } catch (err) {
    console.error("Error @revokeAdminRole:", err);
    return null;
  }
};

module.exports = { grantAdminRole, revokeAdminRole };
