const mongoose = require("mongoose");
const validator = require("validator");

const serviceSchema = new mongoose.Schema({

    serviceName: {
        type: String,
        required: [true, " service name required...!"],

    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'service should belongs to a user']

    },
    description: {
        type: String,
        required: [true, "description required...!"],

    },
    date: [{
        start: String,
        end: String,
    }],
    time: [{
        start: String,
        end: String,
    }],
    registeredFolks: [{
        name: String,
        city: String,
        email: {
            type: String,
            required: [true, "email required...!"],
            lowercase: true,
            validate: [validator.isEmail, "Invalid email"]
        },
    }],
    reviews: [{
        from: String,
        feedback: String
    }]

})


serviceSchema.pre(/^find/, function (next) {


    this.populate({
        path: 'createdBy',
        select: 'name phone email'
    });
    next();
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;