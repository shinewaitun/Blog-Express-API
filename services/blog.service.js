const {
  invalidError,
  alreadyExistsError,
  unprocessableError,
  invalidIdError,
  unauthorizedError,
  itemNotFoundError,
} = require("../errors/db.errors");
const mongoose = require("mongoose");
const Blog = require("../models/blog.model");
const Category = require("../models/category.model");

const createBlog = async (data) => {
  try {
    const blog = new Blog(data);
    const result = await blog.save();
    return result;
  } catch (error) {
    throw unprocessableError(error.message);
  }
};

const getBlog = async (data) => {
  try {
    const result = await Blog.findById(data.id);
    return result;
  } catch (error) {
    throw itemNotFoundError(error.message);
  }
};

const getBlogs = async (query) => {
  try {
    const paginate = {
      limit: parseInt(query.limit),
      skip: parseInt(query.skip),
      sort: query.sort ? query.sort : "createdAt",
      order: query.order ? parseInt(query.order) : -1,
    };
    let criteria = {};
    criteria = addConditionToCriteria(
      criteria,
      "title",
      query.title ? { $regex: new RegExp(`.*${query.title}.*`, "i") } : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "status",
      query.status ? query.status : null
    );
    const categories = await Category.find({
      name: { $in: query.categories },
    });
    if (categories.length !== 0) {
      criteria = addConditionToCriteria(criteria, "categoryList", {
        $in: categories.map((category) => category._id),
      });
    }

    const isCriteriaEmpty = Object.values(criteria).every(
      (value) => value === ""
    );

    let criteriaQuery = {};

    if (!isCriteriaEmpty) {
      criteriaQuery = {
        $and: [criteria],
      };
    }

    const result = {
      blogs: await Blog.find(criteriaQuery)
        .skip((paginate.skip - 1) * paginate.limit)
        .limit(paginate.limit)
        .sort({ [paginate.sort]: paginate.order })
        .populate({ path: "categoryList", select: "name" }),
      totalCount: await Blog.countDocuments(criteriaQuery),
    };
    return result;
  } catch (error) {
    throw itemNotFoundError(error.message);
  }
};

const updateBlog = async (data) => {
  try {
    const result = await Blog.findByIdAndUpdate(data.id, data, { new: true });
    return result;
  } catch (error) {
    throw unprocessableError("Failed to update blog!");
  }
};

const deleteBlog = async (id) => {
  try {
    const result = await Blog.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw unprocessableError("Failed to delete blog!");
  }
};

const addConditionToCriteria = (criteria, key, value) => {
  if (value) {
    return { ...criteria, [key]: value };
  }
  return criteria;
};

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
