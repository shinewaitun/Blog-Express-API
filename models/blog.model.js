const mongoose = require("mongoose");
const { requestStatus } = require("../constants/enum");
const { Schema } = require("./base.schema");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    urlList: {
      type: [String],
    },
    categoryList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    urlList: {
      type: [String],
    },
    status: {
      type: String,
      default: requestStatus.PENDING,
      enum: [
        requestStatus.PENDING,
        requestStatus.APPROVED,
        requestStatus.REJECTED,
      ],
    },
  },
  "Blog",
  undefined
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
