const {
  addCategory,
  findAll,
  findByName,
  updateCategoryDetails,
} = require("../controllers/category.controller");
const router = require("express").Router();

router.post("/add", addCategory);

router.get("/findAll", findAll);
router.get("/findByName/:name", findByName);

router.patch("/update/:id", updateCategoryDetails);

module.exports = router;
