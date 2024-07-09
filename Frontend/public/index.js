//sa login to
let register = document.querySelector('#register')
register.addEventListener('click', (e) => {
    let loginPage = document.querySelector('#loginPage')
    loginPage.style.opacity = '0'

    setTimeout(() => {
        loginPage.style.display = 'none'
    }, 200)


    let registerPage = document.querySelector('#registerPage')
    registerPage.style.display = 'flex'

    setTimeout(() => {
        registerPage.style.opacity = '1'
    }, 200)
})

//sa register to
let signin = document.querySelector('#signIn')
signin.addEventListener('click', (e) => {
    e.preventDefault()

    let registerPage = document.querySelector('#registerPage')
    registerPage.style.opacity = '0'

    setTimeout(() => {
        registerPage.style.display = 'none'
    }, 200)


    let loginPage = document.querySelector('#loginPage')
    loginPage.style.display = 'flex'
    setTimeout(() => {
        loginPage.style.opacity = '1'
    }, 200)
})

//After mag login I sesetup na sa screen yung Dashboard