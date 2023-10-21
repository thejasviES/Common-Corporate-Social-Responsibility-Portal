const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "username required...!"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email required...!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid email"]
    },
    phone: {
        type: String,
        required: [true, "phone number required...!"],
        unique: true,
        validate: [validator.isMobilePhone, "Invalid phone number"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "password required...!"],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "please confirm a password"],
        validate: {
            validator: function (el) {
                return el === this.password;

            },
            message: "password didnt match"
        }
    },
    photo: {
        type: String,
        default: "/uploads/default.png"
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    status: {
        type: Boolean,
        default: true,
        select: false
    }
})


userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model("User", userSchema);

module.exports = User;