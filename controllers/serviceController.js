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
        const id = req.parms.slug;
        console.log(id);
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