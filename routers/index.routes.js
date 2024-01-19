const router = require("express").Router();
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const blogRoutes = require("./blog.routes");

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
