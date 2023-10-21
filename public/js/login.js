


const login = async (email, password) => {
    try {
        console.log(email, password);
        const res = await axios({

            method: 'POST',
            url: '/api/v1/user/login',
            data: {
                email, password
            }
        })

        if (res.data.status === "success") {
            window.alert("login successfull")
            window.setTimeout(() => {
                location.assign('/home')
            }, 500)
        }

    } catch (err) {
        console.log(err);
        window.alert("login failed")
    }
}

const logginbutton = document.querySelector('form.rounded.bg-white.shadow.py-5.px-4');
if (logginbutton) {
    logginbutton.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        //console.log(req);
        login(email, password)

    })
};

