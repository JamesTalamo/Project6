let cookie = document.cookie
let auth = cookie.split(' ')

let index = auth.findIndex(iteration => iteration.includes('cookieId'))
let cookieCheck = auth[index].split('=')[1]


let userInfo

let fetchData = async () => {
    let URL = `http://localhost:6969/api/${cookieCheck}`

    try {
        let res = await fetch(URL)
        if (!res.ok) {
            let errorMes = res.json()
            throw new Error(errorMes.message)
        }
        let data = await res.json()
        userInfo = data
    } catch (error) {
        console.log(error)
    }
}
fetchData()

setTimeout(() => {
    let infoName = document.querySelector('#infoName')
    infoName.innerText = userInfo.success.username

}, 1000)

//Logout 
let logout = document.querySelector('#logout')

logout.addEventListener('click', (e) => {
    e.preventDefault();

    let fetchLogout = async () => {
        let URL = 'http://localhost:6969/api/logout';

        try {
            let res = await fetch(URL, {
                method: 'GET',
                credentials: 'include' // This is important to include cookies
            });

            if (!res.ok) {
                let errorMes = await res.json();
                throw new Error(errorMes.message);
            }

            let logoutData = await res.json();

            window.location.href = 'http://localhost:7979'// babalik sa main page!

        } catch (error) {
            console.log(error.message);
        }
    };

    fetchLogout();
});
