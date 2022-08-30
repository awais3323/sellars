const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // This is a built in module
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [4, "Name must contain atleast 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [6, "Password must contain 8 characters"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    strikes:[
        {
            subject:{
                type:String
            },
            Description:{
                type:String
            }
        }
    ],
    avatar: {
        public_id: {
            type: String,
            required: [true],
        },
        url: {
            type: String,
            required: [true],
        },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
// Securing the password by hashing and salting it.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
//Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// Genrating Password Reset Token
userSchema.methods.getresetPasswordToken = function () {
    //Genrating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and reseting password
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken
};
module.exports = mongoose.model("User", userSchema);
