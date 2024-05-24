//ITO YUNG DYNAMIC PAGE AREA! DITO MO LAGAY YUNG MGA DIFFERENT PAGES NG APPLICATION MO, SO INSTEAD OF LINKING HTML TO OTHER HTML,
//DYNAMICALLY NA SILA MAG RERENDER, SO ISANG HTML LANG ANG GAMIT NATIN!
//!!!Mas efficient kung nag framework ako like REACT, but I'd like to challenge myself building fully dynamic webapp by just vanillas HTML,CSS,JS


//After mage register ni user! ibabalik yung login form
let registerToLoginFormTransition = () => {
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
}

//Ito yung maglalagay ng mainPage sa may Application ko! pag nakalogin na!
let mainPage = () => {
    console.log("Logged in!")


    window.location.href = 'http://localhost:7979/auth';

}



let registerForm = document.querySelector('#registerForm')
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let username = document.getElementById('usernameRegister').value
    let password = document.getElementById('passwordRegister').value
    let confirmPassword = document.getElementById('cPasswordRegister').value
    if (password !== confirmPassword) {
        alert("Password is not the same")
        document.getElementById('passwordRegister').value = ''
        document.getElementById('cPasswordRegister').value = ''
        return
    }

    let fetchRegister = async () => {
        let URL = "http://localhost:6969/api/register"

        let obj = {
            "user": username,
            "pass": password
        }

        let req = new Request(URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj)

        })

        try {
            let res = await fetch(req)

            if (!res.ok) {
                let errorData = await res.json()
                throw new Error(errorData.error)
            }

            registerToLoginFormTransition()


        } catch (error) {
            alert(error.message)
        }
    }

    fetchRegister()


})

let loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let username = document.getElementById('usernameLogin').value;
    let password = document.getElementById('passwordLogin').value;

    let obj = {
        user: username,
        pass: password
    }

    let fetchLogin = async () => {
        let URL = "http://localhost:6969/api/login"

        let req = new Request(URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj),
            credentials: 'include' // This is important to include cookies
        })

        try {
            let res = await fetch(req)

            if (!res.ok) {
                let errorData = await res.json()
                throw new Error(errorData.error)
            }

            let data = await res.json()

            mainPage()

        } catch (error) {
            alert(error.message)
        }
    }

    fetchLogin()
})