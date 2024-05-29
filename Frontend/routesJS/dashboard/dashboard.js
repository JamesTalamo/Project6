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

// setTimeout(() => {
//     // console.log(userInfo)
//     // let infoName = document.querySelector('#infoName')
//     // infoName.innerText = userInfo.success.username



// }, 1000)


//BUTTONS

//MAIN DASHBOARD
let home = document.querySelector('#home')
home.addEventListener('click', (e) => {
    e.preventDefault()

    let mainTemplate = document.getElementById('main-template')

    if(mainTemplate.childElementCount !== 0){

        mainTemplate.removeChild(mainTemplate.firstElementChild)

    }


    let templateHome = document.createElement('div')
    templateHome.id = 'homeDashboard'
    templateHome.classList.add('btn-main-template')

    mainTemplate.appendChild(templateHome)

})

//REGISTERED USER
let registerUser = document.querySelector('#registerUser')
registerUser.addEventListener('click', (e) => {
    e.preventDefault()

    let mainTemplate = document.getElementById('main-template')


    if(mainTemplate.childElementCount !== 0){

        mainTemplate.removeChild(mainTemplate.firstElementChild)


    }

    let templateRegUser = document.createElement('div')
    templateRegUser.id = 'registerUserDashboard'
    templateRegUser.classList.add('btn-main-template')

    mainTemplate.appendChild(templateRegUser)



})


//INFO
let info = document.querySelector('#info')
info.addEventListener('click', (e) => {
    e.preventDefault()

    let mainTemplate = document.getElementById('main-template')


    if(mainTemplate.childElementCount !== 0){

        mainTemplate.removeChild(mainTemplate.firstElementChild)
    }

    let templateInfo = document.createElement('div')
    templateInfo.id = 'infoDashboard'
    templateInfo.classList.add('btn-main-template')

    mainTemplate.appendChild(templateInfo)

})



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
