const db = require("../models");

const getCategories = async () => {
  try {
    const categories = await db.Category.findAll();
    return categories;
  } catch (err) {
    console.log("Error @handlers/getCategories: ", err);
    return null;
  }
};

const getCategory = async (id) => {
  try {
    const category = await db.Category.findByPk(id);
    return category;
  } catch (err) {
    console.log("Error @handlers/getCategory: ", err);
    return null;
  }
};

const editCategory = async (categoryId, newCategoryData) => {
  try {
    let categoryData = await db.Category.findByPk(categoryId);

    if (!categoryData) {
      return {
        message:
          "Category with id " +
          categoryId +
          " does not exist. Nothing to edit.",
      };
    }
    // apparently you can do this in JS
    for (var prop in newCategoryData) {
      if (newCategoryData[prop]) {
        // null here means we don't edit the field.
        categoryData[prop] = newCategoryData[prop];
      }
    }

    res = await categoryData.save(); // this updates the db.
    return categoryData;
  } catch (err) {
    console.log("Error @handlers/editCategory:", err);
    return {
      message: err,
      obj: null,
    };
  }
};

const createCategory = async (categoryData) => {
  try {
    const category = await db.Category.findOne({
      where: {
        name: categoryData.name,
      },
    });

    if (category) {
      return {
        message: "The category already exists",
      };
    }

    const newCategory = await db.Category.create(categoryData);
    return newCategory;
  } catch (err) {
    console.log("Error @handlers/createCategory:", err);
    return err;
  }
};

const destroyCategory = async (id) => {
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return {
        message: "Category does not exist",
      };
    }
    res = await db.Category.destroy({
      where: {
        id: category.id,
      },
    });

    return {
      message: "Success",
    };
  } catch (err) {
    console.log("Error @handlers/removeCategory:", err);
    return null;
  }
};

module.exports = {
  getCategories,
  getCategory,
  editCategory,
  destroyCategory,
  createCategory,
};
