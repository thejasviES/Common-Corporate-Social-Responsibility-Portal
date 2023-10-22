const Service = require('./../models/serviceModel')
const nodemailer = require('nodemailer');
exports.createEvent = async (req, res) => {
    try {
        const newEvent = await Service.create({
            createdBy: req.user._id,
            serviceName: req.body.event,
            description: req.body.description,
            date: [{
                start: req.body.startDate,
                end: req.body.endDate
            }],
            time: [{
                start: req.body.startTime,
                end: req.body.endTime
            }]
        })

        res.status(200).json({
            status: 'success',
            data: {
                newEvent
            }
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({
            status: "Failed",
            data: {
                error: err
            }
        })
    }
}

exports.registerFolks = async (req, res) => {
    try {
        const service = await Service.findById(req.body.parameterValue);
        if (!service) {
            // Handle the case where the service is not found
            return res.status(404).json({
                status: "Failed",
                data: {
                    error: "Service not found"
                }
            });
        }
        // Create a new registration
        const newRegistration = {
            name: req.body.name,
            city: req.body.city,
            email: req.body.email,
        };
        // Push the new registration
        service.registeredFolks.push(newRegistration);

        // Save the updated service
        const updatedService = await service.save();

        res.status(200).json({
            status: "success",
            data: {
                registration: newRegistration
            }
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "Failed",
            data: {
                error: err.message
            }
        });
    }
};

exports.reviewService = async (req, res) => {
    try {
        const service = await Service.findById(req.body.parameterValue);
        if (!service) {
            console.log('Document not found.');
            return;
        }
        const emailExists = service.registeredFolks.some(person => person.email === req.body.email);
        // console.log(emailExists);
        if (!emailExists) {
            res.status(401).json({
                status: "unauthorized",
            });
        }
        else {
            //to checck for duplicate review
            const duplicateReview = service.registeredFolks.some(rev => rev.email === req.body.email);
            if (duplicateReview) {
                return res.status(400).json({
                    status: "Bad Request",
                });
            }
            //if not
            const newreview = {
                from: req.body.email,
                feedback: req.body.description
            };
            service.reviews.push(newreview);
            const updatedService = await service.save();

            res.status(200).json({
                status: "success",
            })
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "Failed",
            data: {
                error: err.message
            }
        });
    }
}


exports.sendEmailToRegesteredFolks = async (req, res, next) => {
    try {
        const service = await Service.findById(req.body.id);
        const message = req.body.message;

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        if (!service.registeredFolks || service.registeredFolks.length === 0) {
            return res.status(400).json({ message: "No registered folks found" });
        }
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth:
             {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
          });
        for (let i = 0; i < service.registeredFolks.length; i++) {
            const email = service.registeredFolks[i].email;

           
            const mailOptions = {
                from:`${service.createdBy.email}`,
                to: email,
                subject: `Notification for the event ${service.serviceName} from CCSRP`,
                text: message
            };

            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email: ' + error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
        console.error("Error sending emails", error);
        res.status(500).json({ message: "Failed to send emails" });
    }
};
