// const mongoose = require("mongoose");

// const PostSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     lastname: {
//       type: String,
//       required: false,
//     },
//     address: {
//       type: String,
//       required: false,
//     },
//     city: {
//       type: String,
//       required: false,
//     },
//     missingAge: {
//       type: String,
//       required: false,
//     },
//     gender: {
//       type: String,
//       required: false,
//     },
//     ageType: {
//       type: String,
//       required: false,
//     },
//     missingDate: {
//       type: String,
//       required: false,
//     },
//     role: {
//       type: String,
//       required: false,
//     },
//     photo: {
//       type: String,
//       required: false,
//     },
//     categories: {
//       type: Array,
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Post", PostSchema);






const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      unique: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    missingAge: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    ageType: {
      type: String,
      required: true,
    },
    missingDate: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

