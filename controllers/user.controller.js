const jwt = require("jsonwebtoken");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  changeStatus,
  changePassword,
  validateUser,
} = require("../services/user.service");
const { ok, created, updated, retrieved } = require("./base.controller");

const signUp = async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    if (result) {
      return created(res, "User registered!", { contents: result });
    }
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await validateUser(req.body);
    if (result) {
      const token = jwt.sign({ user: result }, process.env.KEY, {
        expiresIn: "1h",
      });
      return ok(res, "Signed in!", { token: token, user: result });
    }
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const result = await getUser(req.params.id);
    return retrieved(res, "Retrieved successfully!", result);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await getUsers(req.query);
    return retrieved(res, "Retrieved successfully", { contents: result });
  } catch (error) {
    next(error);
  }
};

const updateUserDetails = async (req, res, next) => {
  try {
    const data = { ...req.body, id: req.params.id };
    const result = await updateUser(data);
    return updated(res, "Updated successfully!", { contents: result });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const data = { ...req.body, id: req.params.id };
    const result = await changeStatus(data);
    return updated(res, "Updated successfully!", { contents: result });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const data = { ...req.body, id: req.params.id };
    const result = await changePassword(data);
    return updated(res, "Updated successfully!", { contents: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signIn,
  signUp,
  findById,
  findAll,
  updateUserDetails,
  updatePassword,
  updateStatus,
};
