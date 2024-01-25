const {
  invalidError,
  alreadyExistsError,
  unprocessableError,
  invalidIdError,
  unauthorizedError,
  itemNotFoundError,
} = require("../errors/db.errors");
const { getBcryptPassword, validatePassword } = require("../utils/bcrypt");
const User = require("../models/user.model");

const createUser = async (data) => {
  try {
    data.password = await getBcryptPassword(data.password);
    const user = new User(data);
    const result = await user.save();
    return result;
  } catch (error) {
    throw unprocessableError(error.message);
  }
};

const getUsers = async (query) => {
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
      "username",
      query.username
        ? { $regex: new RegExp(`.*${query.username}.*`, "i") }
        : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "email",
      query.email ? query.email : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "phoneNumber",
      query.phoneNumber ? query.phoneNumber : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "role",
      query.role ? query.role : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "status",
      query.status ? query.status : null
    );

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
      users: await User.find(criteriaQuery)
        .skip((paginate.skip - 1) * paginate.limit)
        .limit(paginate.limit)
        .sort({ [paginate.sort]: paginate.order }),
      totalCount: await User.countDocuments(criteriaQuery),
    };
    return result;
  } catch (error) {
    throw itemNotFoundError(error.message);
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw itemNotFoundError(error.message);
  }
};

const updateUser = async (data) => {
  try {
    const result = await User.findByIdAndUpdate(data.id, data, { new: true });
    return result;
  } catch (error) {
    throw unprocessableError("Failed to update user!");
  }
};

const changePassword = async (data) => {
  try {
    data.password = await getBcryptPassword(data.password);
    const result = await User.findByIdAndUpdate(data.id, data, { new: true });
    return result;
  } catch (error) {
    throw unprocessableError("Failed changing password!");
  }
};

const changeStatus = async (data) => {
  try {
    const result = await User.findByIdAndUpdate(data.id, data, { new: true });
    return result;
  } catch (error) {
    throw unprocessableError("Failed changing status!");
  }
};

const validateUser = async (data) => {
  try {
    const user = await User.findOne({ email: data.email });
    const isValid = await validatePassword(data.password, user.password);
    if (isValid) {
      return user;
    }
    return isValid;
  } catch (error) {
    throw invalidError("Wrong credentials!");
  }
};

const addConditionToCriteria = (criteria, key, value) => {
  if (value) {
    return { ...criteria, [key]: value };
  }
  return criteria;
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  changePassword,
  changeStatus,
  validateUser,
};
