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
    console.log(userInfo)
    console.log(userInfo.success.createdAt.split('T')[0])
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



//BUTTONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!

//MAIN DASHBOARD
let home = document.querySelector('#home')
home.addEventListener('click', (e) => {
    e.preventDefault()

    let mainTemplate = document.getElementById('main-template')

    if (mainTemplate.childElementCount !== 0) {

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


    if (mainTemplate.childElementCount !== 0) {

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


    if (mainTemplate.childElementCount !== 0) {

        mainTemplate.removeChild(mainTemplate.firstElementChild)
    }
    //ITO yung sa template nung info!
    let templateInfo = document.createElement('div')
    templateInfo.id = 'infoDashboard'
    templateInfo.classList.add('btn-main-template')

    //Ito yung code para sa name dun sa pinakataas
    {
        let customer = document.createElement('div')
        customer.classList.add('customerText')
        customer.innerText = 'User / '

        let customerText = document.createElement('div')
        customerText.innerText = userInfo.success.username
        customerText.classList.add('customerTextName')
        customerText.style.display = 'inline'

        customer.appendChild(customerText)
        templateInfo.appendChild(customer)
    }

    // ito yung container nung 3 box
    {
        let boxContainer = document.createElement('div')
        boxContainer.style.width = '100%'
        boxContainer.style.height = '30%'
        boxContainer.style.display = 'flex'
        boxContainer.style.alignItems = 'center'
        boxContainer.style.justifyContent = 'space-around'
        boxContainer.style.backgroundColor = 'red'

        // para sa date created area ko
        let box1 = document.createElement('div')
        box1.classList.add('box')
        let text1 = document.createElement('text')
        text1.innerHTML='Date Created'
        text1.classList.add('box-text-grey')
        box1.appendChild(text1)
        let text1Val = document.createElement('text')
        text1Val.innerText=userInfo.success.createdAt.split('T')[0]
        text1Val.classList.add('box-text-value')
        box1.appendChild(text1Val)



        let box2 = document.createElement('div')
        box2.classList.add('box')

        let box3 = document.createElement('div')
        box3.classList.add('box')

        boxContainer.appendChild(box1)
        boxContainer.appendChild(box2)
        boxContainer.appendChild(box3)

        templateInfo.appendChild(boxContainer)
    }



    //wag buburahin to, ito nagkakabit ng lahat ng code dun sa main template
    mainTemplate.appendChild(templateInfo)

})




