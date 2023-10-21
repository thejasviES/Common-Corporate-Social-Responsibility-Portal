

const createEvent = async (event, description, startDate, endDate, startTime, endTime) => {
    try {
        // console.log(name, email, phone, password, confirmPassword);
        const res = await axios({

            method: 'POST',
            url: '/api/v1/service/event',
            data: {
                event, description, startDate, endDate, startTime, endTime
            }
        })

        if (res.data.status === "success") {
            window.alert("event created successfull")
            window.setTimeout(() => {
                location.assign('/home')
            }, 100)
        }
    } catch (err) {
        // console.log(res);
        window.alert("failed")
    }
}

document.querySelector('form.rounded.bg-white.shadow.p-5').addEventListener('submit', e => {
    e.preventDefault();
    const event = document.getElementById('event').value;
    const description = document.getElementById('description').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    createEvent(event, description, startDate, endDate, startTime, endTime)

});
