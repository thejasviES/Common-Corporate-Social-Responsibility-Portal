

const send = async (id,message) => {
    try {

        const res = await axios({

            method: 'POST',
            url: '/api/v1/service/mail',
            data: {
                id,message
            }
        })

        if (res.data.message === "success") {
            window.alert("email sent  successfully")
            window.setTimeout(() => {
                location.assign('/home')
                
            }, 100)
        }
    } catch (err) {
        // console.log(res);
        window.alert("failed")
    }
}

document.querySelector('.emailMessage').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('EventId').value;
    const message = document.getElementById('message').value;
    send(id,message);

});
