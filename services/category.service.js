const {
  invalidError,
  alreadyExistsError,
  unprocessableError,
  invalidIdError,
  unauthorizedError,
  itemNotFoundError,
} = require("../errors/db.errors");
const Category = require("../models/category.model");

const createCategory = async (data) => {
  try {
    const category = new Category(data);
    const result = await category.save();
    return result;
  } catch (error) {
    throw unprocessableError(error.message);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw itemNotFoundError(error.message);
  }
};

const getCategoryByName = async (data) => {
  try {
    const category = await Category.find(data.name);
    return category;
  } catch (error) {
    throw itemNotFoundError(error.message);
  }
};

const updateCategory = async (data) => {
  try {
    const result = await Category.findByIdAndUpdate(data.id, data);
    return result;
  } catch (error) {
    throw unprocessableError("Failed to update category!");
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByName,
  updateCategory,
};
