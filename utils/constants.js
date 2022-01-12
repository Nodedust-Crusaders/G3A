module.exports.platforms = [
  "Windows",
  "Linux",
  "OSX",
  "PlayStation 3",
  "PlayStation 4",
  "PlayStation 5",
  "XBOX 360",
  "XBOX One",
  "Nintendo Switch",
  "Android",
  "iOS",
];

module.exports.NUMBER_OF_USERS = 50;

module.exports.NUMBER_OF_PURCHASES = 100;

module.exports.NUMBER_OF_REVIEWS = 100;

module.exports.prices = [0.0, 10.0, 15.0, 30.0, 60.0];

module.exports.UserPermissions = {
  BASIC_ACCESS: "BASIC_ACCESS",
};

module.exports.AdminPermissions = {
  ...this.UserPermissions,
  UPDATE_ROLE: "UPDATE_ROLE",

  CREATE_GAME: "CREATE_GAME",
  UPDATE_GAME: "UPDATE_GAME",
  DELETE_GAME: "DELETE_GAME",

  CREATE_PUBLISHER: "CREATE_PUBLISHER",
  UPDATE_PUBLISHER: "UPDATE_PUBLISHER",
  DELETE_PUBLISHER: "DELETE_PUBLISHER",

  CREATE_PLATFORM: "CREATE_PLATFORM",
  UPDATE_PLATFORM: "UPDATE_PLATFORM",
  DELETE_PLATFORM: "DELETE_PLATFORM",

  CREATE_CATEGORY: "CREATE_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
};
