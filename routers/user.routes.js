const router = require("express").Router();
const {
  findAll,
  findById,
  signIn,
  signUp,
  updatePassword,
  updateStatus,
  updateUserDetails,
} = require("../controllers/user.controller");
const { checkValidUser, checkUser } = require("../middlewares/user.auth");
const { schemaValidator } = require("../middlewares/schema.validator");

router.get("/findAll", checkValidUser, findAll);
router.get("/findById/:id", findById);

router.post("/signIn", schemaValidator("signin"), signIn);
router.post("/signUp", schemaValidator("signup"), signUp);

router.patch("/changePassword/:id", checkValidUser, updatePassword);
router.patch("/changeStatus/:id", checkValidUser, updateStatus);

router.patch(
  "/update/:id",
  checkValidUser,
  schemaValidator("signup"),
  updateUserDetails
);

module.exports = router;
