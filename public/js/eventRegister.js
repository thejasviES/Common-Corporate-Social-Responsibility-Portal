const register = async (email, name, city) => {

    var currentURL = window.location.href;
    var urlParts = currentURL.split('/');
    var parameterValue = urlParts[urlParts.length - 1];

    // console.log(parameterValue);
    try {
        // console.log(name, email, phone, password, confirmPassword);
        const res = await axios({
            method: 'POST',
            url: '/api/v1/service/register',
            data: {
                email, name, city, parameterValue
            }
        })
        if (res.data.status === "success") {
            window.alert("Thank you for registering")
            window.setTimeout(() => {
                location.assign('/home')
            }, 500)
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
    const city = document.getElementById('city').value;
    console.log(email);
    register(email, name, city);
});
