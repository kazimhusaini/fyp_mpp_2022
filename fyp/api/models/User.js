const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            default: "",

        },
        gender: {
            type: String,
            default: "",

        },
        city: {
            type: String,
            default: "",

        },
        address: {
            type: String,
            default: "",

        },
        role: {
            type: String,
            default: "",

        },
        number: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        cnic: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        token: {
            type: String,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        },
        verifiedNumber: {
            type: Boolean,
            required: true,
            default: false
        },
        resetLink:{
            data:String,
            default:''
        },  
        friends: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        }],
        isAvatarImageSet: {
            type: Boolean,
            default: false,
          },
          avatarImage: {
            type: String,
            default: "",
          },
    },
    { timestamps: true }
);
UserSchema.methods.generateVerificationToken = function () {
    const user = this;
    const token1 = jwt.sign(
        { ID: user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    return token1;
};
module.exports = mongoose.model("User", UserSchema);