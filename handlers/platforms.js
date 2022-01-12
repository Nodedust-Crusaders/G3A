const db = require("../models");

const getPlatforms = async () => {
  try {
    const platforms = await db.Platform.findAll();
    return platforms;
  } catch (err) {
    console.log("Error @handlers/getPlatforms: ", err);
    return null;
  }
};

const getPlatform = async (id) => {
  try {
    const platform = await db.Platform.findByPk(id);
    return platform;
  } catch (err) {
    console.log("Error @handlers/getPlatform: ", err);
    return null;
  }
};

const editPlatform = async (platformId, newPlatformData) => {
  try {
    let platformData = await db.Platform.findByPk(platformId);

    if (!platformData) {
      return {
        message:
          "Platform with id " +
          platformId +
          " does not exist. Nothing to edit.",
      };
    }
    // apparently you can do this in JS
    for (var prop in newPlatformData) {
      if (newPlatformData[prop]) {
        // null here means we don't edit the field.
        platformData[prop] = newPlatformData[prop];
      }
    }

    res = await platformData.save(); // this updates the db.
    return platformData;
  } catch (err) {
    console.log("Error @handlers/editPlatform:", err);
    return {
      message: err,
      obj: null,
    };
  }
};

const createPlatform = async (platformData) => {
  try {
    const platform = await db.Platform.findOne({
      where: {
        name: platformData.name,
      },
    });

    if (platform) {
      return {
        message: "The platform already exists",
      };
    }

    const newPlatform = await db.Platform.create(platformData);
    return newPlatform;
  } catch (err) {
    console.log("Error @handlers/createPlatform:", err);
    return err;
  }
};

const destroyPlatform = async (id) => {
  try {
    const platform = await db.Platform.findByPk(id);
    if (!platform) {
      return {
        message: "Platform does not exist",
      };
    }
    res = await db.Platform.destroy({
      where: {
        id: platform.id,
      },
    });

    return {
      message: "Success",
    };
  } catch (err) {
    console.log("Error @handlers/removePlatform:", err);
    return null;
  }
};

module.exports = {
  getPlatforms,
  getPlatform,
  editPlatform,
  destroyPlatform,
  createPlatform,
};
