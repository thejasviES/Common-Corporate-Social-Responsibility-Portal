const review = async (email, description) => {

    var currentURL = window.location.href;
    var urlParts = currentURL.split('/');
    var parameterValue = urlParts[urlParts.length - 1];

    console.log(parameterValue);
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/service/review',
            data: {
                email, description, parameterValue
            }
        })
        // console.log(res.data.status);
        if (res.data.status === "success") {
            window.alert("Thank you for your review")
            window.setTimeout(() => {
                location.assign('/home')
            }, 500)
        }

    } catch (err) {
        // console.log(res);
        window.alert("unauthorized")
    }
}

document.querySelector('form.rounded.bg-white.shadow.p-5').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;

    console.log(email);
    review(email, description);
});
