const {
  createCategory,
  getAllCategories,
  getCategoryByName,
  updateCategory,
} = require("../services/category.service");
const { ok, created, updated, retrieved } = require("./base.controller");

const addCategory = async (req, res, next) => {
  try {
    const result = await createCategory(req.body);
    return created(res, "Category added!", { content: result });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    return retrieved(res, "Retrieved successfully!", { content: result });
  } catch (error) {
    next(error);
  }
};

const findByName = async (req, res, next) => {
  try {
    const result = await getCategoryByName(req.body);
    return retrieved(res, "Retrieved successfully!", { content: result });
  } catch (error) {
    next(error);
  }
};

const updateCategoryDetails = async (req, res, next) => {
  try {
    const data = { ...req.body, id: req.params.id };
    const result = await updateCategory(data);
    return updated(res, "Updated successfully!", { contents: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCategory,
  findAll,
  findByName,
  updateCategoryDetails,
};
