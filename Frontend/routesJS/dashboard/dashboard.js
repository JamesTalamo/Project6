let cookie = document.cookie
let auth = cookie.split(' ')

let index = auth.findIndex(iteration => iteration.includes('cookieId'))
let cookieCheck = auth[index].split('=')[1]

console.log(cookieCheck)

let fetchData = async () => {
    let URL = `http://localhost:6969/api/${cookieCheck}`
   
    try {
        let res = await fetch(URL)
        if (!res.ok) {
            let errorMes = res.json()
            throw new Error(errorMes.message)
        }
        let data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

fetchData()