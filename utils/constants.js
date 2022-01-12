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

  FULL_ACCESS_PURCHASE: "FULL_ACCESS_PURCHASE",
  FULL_ACCESS_REVIEW: "FULL_ACCESS_REVIEW",
  FULL_ACCESS_GAME: "FULL_ACCESS_GAME",
  FULL_ACCESS_PUBLISHER: "FULL_ACCESS_PUBLISHER",
  FULL_ACCESS_PLATFORM: "FULL_ACCESS_PLATFORM",
  FULL_ACCESS_CATEGORY: "FULL_ACCESS_CATEGORY",
};
