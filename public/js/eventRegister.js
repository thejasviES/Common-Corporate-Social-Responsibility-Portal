const register = async (email, name, place) => {
    try {
        // console.log(name, email, phone, password, confirmPassword);
        const res = await axios({
            method: 'POST',
            url: '/api/v1/service/register',
            data: {
                email, name, place
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
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const place = document.getElementById('place').value;

    register(email, name, place);

});