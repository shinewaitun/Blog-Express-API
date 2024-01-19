const schemas = require("../validators/validate");

const supportedMethods = ["post", "put", "delete", "patch"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (path, useJoiError = true) => {
  const schema = schemas[path];

  if (!schema) {
    throw new Error(`Schema ${path} not found`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();
    if (!supportedMethods.includes(method)) {
      return next();
    }
    const { error, value } = schema.validate(req.body.data, validationOptions);
    if (error) {
      const customError = {
        status: "failed",
        error: "Invalid request. Please review request and try again.",
      };
      const joiError = {
        status: "failed",
        error: {
          original: error._original,
          details: error.details.map(({ message, type }) => ({
            message: message.replace(/['"]/g, ""),
            type,
          })),
        },
      };
      return res.status(422).json(useJoiError ? joiError : customError);
    }
    return next();
  };
};

module.exports = { schemaValidator };