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