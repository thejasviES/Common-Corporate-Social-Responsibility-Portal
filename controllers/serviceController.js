const Service = require('./../models/serviceModel')



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

// const serviceId = 'your-service-id'; // Replace with the actual service's _id you want to update.

// Service.findById(serviceId, (err, service) => {
//     if (err) {
//         // Handle the error, e.g., return an error response.
//         console.error(err);
//         return;
//     }

//     // Now, you can push a new registration object to the registeredFolks array.
//     const newRegistration = {
//         name: 'John Doe',
//         city: 'New York',
//         email: 'john@example.com',
//     };
//     service.registeredFolks.push(newRegistration);

//     // Save the updated document.
//     service.save((err, updatedService) => {
//         if (err) {
//             // Handle the error, e.g., return an error response.
//             console.error(err);
//         } else {
//             // The registration has been added, and the updated service is available as "updatedService".
//             // You can respond with the updated service or perform any other necessary actions.
//             console.log('Registration added:', newRegistration);
//             console.log('Updated service:', updatedService);
//         }
//     });
// });

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

            const duplicateReview = service.registeredFolks.some(rev => rev.email === req.body.email);
            if (duplicateReview) {
                return res.status(400).json({
                    status: "Bad Request",
                });
            }

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




