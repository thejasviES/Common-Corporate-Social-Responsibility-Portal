
const logout = async () => {
    try {

        const res = await axios({
            method: "GET",
            url: "/api/v1/user/logout",

        });
        console.log(res);
        if (res.data.status === "success") {
            window.alert("logedout successfully")
            window.setTimeout(() => {
                location.assign('/home')
            }, 100)
        }
    } catch (err) {
        console.log(err);
        window.alert("error logging out")
    }
}

const logoutButton = document.querySelector('.logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', e => {
        e.preventDefault();
        logout();
    });
}
