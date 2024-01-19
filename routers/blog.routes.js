const router = require("express").Router();
const {
  addBlog,
  findById,
  findAll,
  updateBlogDetails,
  removeBlog,
} = require("../controllers/blog.controller");

router.get("/findById/:id", findById);
router.get("/findAll", findAll);

router.post("/add", addBlog);

router.patch("/update/:id", updateBlogDetails);

router.delete("/remove/:id", removeBlog);

module.exports = router;
