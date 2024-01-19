const { ok, created, updated, retrieved } = require("./base.controller");
const {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../services/blog.service");

const addBlog = async (req, res, next) => {
  try {
    const result = await createBlog(req.body);
    return created(res, "Created successfully!", { content: result });
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const result = await getBlog(req.params.id);
    return retrieved(res, "Blog retrieved!", { content: result });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await getBlogs(req.query);
    return retrieved(res, "Retrieved", { content: result });
  } catch (error) {
    next(error);
  }
};

const updateBlogDetails = async (req, res, next) => {
  try {
    const result = await updateBlog(req.body);
    return updated(res, "Updated!", { content: result });
  } catch (error) {
    next(error);
  }
};

const removeBlog = async (req, res, next) => {
  try {
    const result = await deleteBlog(req.id);
    return ok(res, "Deleted!", { content: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBlog,
  findById,
  findAll,
  updateBlogDetails,
  removeBlog,
};
