let cookie = document.cookie 

let auth = cookie.split(' ')
console.log(cookie)

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
    console.log('press logout')
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

{//MAIN DASHBOARD
    let home = document.querySelector('#home')
    home.addEventListener('click', (e) => {
        e.preventDefault()

        let mainTemplate = document.getElementById('main-template')

        if (mainTemplate.childElementCount !== 0) {

            mainTemplate.innerHTML = ''

        }

        let templateHome = document.createElement('div')
        templateHome.id = 'homeDashboard'
        templateHome.classList.add('btn-main-template')

        {
            let text = document.createElement('text')
            text.innerText = 'News Feed'
            text.classList.add('reg-users-text')
            text.style.position = 'absolute'
            text.style.left = '0'
            text.style.top = '-4%'
            templateHome.appendChild(text)
        }

        {// Add new Post
            let newPost = document.createElement('div')
            newPost.innerText = 'ADD POST'
            newPost.style.width = '200px'
            newPost.style.height = '50px'
            newPost.style.backgroundColor = '#FF8901'
            newPost.style.position = 'absolute'
            newPost.style.right = '5%'
            newPost.style.top = '-3%'
            newPost.style.display = 'flex'
            newPost.style.alignItems = 'center'
            newPost.style.justifyContent = 'center'
            newPost.style.borderRadius = '30px'
            newPost.style.fontWeight = '800'
            newPost.style.color = 'white'
            newPost.style.cursor = 'pointer'
            newPost.id = 'home-newPost'

            templateHome.appendChild(newPost)

            newPost.addEventListener('click', (e) => {
                e.preventDefault()

                let mainTemplate = document.querySelector('#main-template')


                let addPostTemplate = document.createElement('div');
                addPostTemplate.id = 'addPostTemplate';
                addPostTemplate.style.width = '100vw';
                addPostTemplate.style.height = '100vh';
                addPostTemplate.style.backgroundColor = 'green';
                addPostTemplate.style.position = 'absolute';
                addPostTemplate.style.background = 'rgba(255, 255, 255, 0.1)';
                addPostTemplate.style.backdropFilter = 'blur(6px)';
                addPostTemplate.style.display = 'flex'
                addPostTemplate.style.alignItems = 'center'
                addPostTemplate.style.justifyContent = 'center'

                addPostTemplate.addEventListener('click', (e) => {

                    mainTemplate.childNodes.forEach(element => {
                        if (element.id === 'addPostTemplate') {
                            mainTemplate.removeChild(element)
                        }
                    })
                });

                let inputBoxPost = document.createElement('div')
                inputBoxPost.style.width = '700px'
                inputBoxPost.style.height = '500px'
                inputBoxPost.style.backgroundColor = 'white'
                inputBoxPost.style.borderRadius = '20px'
                inputBoxPost.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.2)';
                inputBoxPost.style.display = 'flex'
                inputBoxPost.style.alignItems = 'center'
                inputBoxPost.style.justifyContent = 'center'
                inputBoxPost.style.flexDirection = 'column'
                inputBoxPost.style.position = 'relative'
                inputBoxPost.style.overflow = 'hidden'
                inputBoxPost.addEventListener('click', (e) => {
                    e.stopPropagation()
                })


                let textAboveBoxPost = document.createElement('text')
                textAboveBoxPost.innerText = "CREATE POST"
                textAboveBoxPost.style.position = 'absolute'
                textAboveBoxPost.style.left = '50%'
                textAboveBoxPost.style.transform = 'translateX(-50%)'
                textAboveBoxPost.style.top = '4%'
                textAboveBoxPost.style.fontWeight = '800'


                let form = document.createElement('form')
                form.style.display = 'flex'
                form.style.alignItems = 'center'
                form.style.justifyContent = 'flex-start'
                form.style.width = '100%'
                form.style.height = '100%'
                form.style.flexDirection = 'column'
                form.style.position = 'relative'
                form.style.top = '14%'
                form.style.gap = '1rem'


                let textArea = document.createElement('textarea')
                textArea.style.width = '90%'
                textArea.style.height = '65%'
                textArea.style.fontSize = '24px'
                textArea.style.fontWeight = '600'
                textArea.style.textIndent = '10px'
                textArea.style.border = 'none'
                textArea.placeholder = "What's on your mind?"
                textArea.style.resize = 'none'
                textArea.id = 'textArea'
                textArea.setAttribute('required', 'true');


                let button = document.createElement('button')
                button.style.width = '90%'
                button.innerText = 'SUBMIT'
                button.style.border = 'none'
                button.style.height = '50px'
                button.style.cursor = 'pointer'
                button.style.borderRadius = '15px'
                button.style.backgroundColor = '#FF8901'
                button.style.fontWeight = '800'
                button.style.fontSize = '22px'

                form.appendChild(textArea)
                form.appendChild(button)

                form.addEventListener('keydown', function (e) {
                    console.log(e.key)
                    if (e.key === 'enter' && !e.shiftKey) {
                        if (textArea.value.trim().length === 0) {
                            e.preventDefault();  // Prevent default behavior (adding a newline)
                            alert('Please input something inside');
                        } else {
                            form.dispatchEvent(new Event('submit'));  // Manually trigger the submit event
                        }
                    }
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault()

                    mainTemplate.childNodes.forEach(element => {
                        if (element.id === 'addPostTemplate') {
                            mainTemplate.removeChild(element)
                        }
                    })

                    // console.log(userInfo.success.username) To check sa console kung nagana ba
                    // console.log(textArea.value)

                    let obj = {
                        name: userInfo.success.username,
                        content: textArea.value
                    }

                    let fetchPost = async () => {
                        let url = 'http://localhost:6969/postRoutes/addPost'

                        try {
                            let res = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(obj)
                            })

                            if (!res.ok) throw new error('Error with fetchPost')
                        } catch (error) {
                            console.log(error.message)
                        }
                    }
                    fetchPost()

                    textArea.value = ''
                })

                inputBoxPost.appendChild(form)
                inputBoxPost.appendChild(textAboveBoxPost)

                addPostTemplate.appendChild(inputBoxPost)

                mainTemplate.appendChild(addPostTemplate)


            })
        }

        //Ito naman yung request para makuha yung mga messages ng lahat ng nasa newsfeed



        {//Ito yung template sa loob
            let container = document.createElement('div')
            container.id = 'home-container'
            container.style.display = 'flex'
            container.style.alignItems = 'center'
            container.style.justifyContent = 'center'
            container.style.overflowY = 'auto'

            let innerContainer = document.createElement('div')
            innerContainer.id = 'homeInnerContainer'
            innerContainer.style.display = 'flex'
            innerContainer.style.flexDirection = 'column-reverse'
            innerContainer.style.alignItems = 'center'
            innerContainer.style.justifyContent = 'flex-end'
            innerContainer.style.gap = '1rem'
            innerContainer.style.flexGrow = '1'
            innerContainer.style.overflowY = 'auto'
            innerContainer.style.width = '100%'
            innerContainer.style.marginTop = 'auto'


            container.appendChild(innerContainer)


            let fetchAllPost = async () => {
                let url = 'http://localhost:6969/postRoutes/allPost'

                try {
                    let res = await fetch(url)
                    if (!res.ok) throw new error(error.message)

                    let data = await res.json()
                    return data
                } catch (error) {
                    console.log(error.message)
                }
            }

            let renderPostBox = async () => {
                innerContainer.innerHTML = ''

                let postInfos = await fetchAllPost()

                postInfos.forEach(element => {
                    let postBox = document.createElement('div')
                    postBox.style.height = '650px'
                    postBox.style.width = '650px'
                    postBox.style.backgroundColor = '#F0F2F5'
                    // postBox.style.flexShrink = '0'
                    postBox.style.borderRadius = '15px'
                    postBox.style.position = 'relative'

                    let profileSection = document.createElement('div')
                    profileSection.style.width = '90%'
                    profileSection.style.height = '80px'
                    profileSection.style.position = 'absolute'
                    profileSection.style.top = '4%'
                    profileSection.style.backgroundColor = 'white'
                    profileSection.style.left = '50%'
                    profileSection.style.transform = 'translateX(-50%)'

                    let profileSectionCircle = document.createElement('div')
                    profileSectionCircle.style.height = '50px'
                    profileSectionCircle.style.width = '50px'
                    profileSectionCircle.style.position = 'absolute'
                    profileSectionCircle.style.top = '50%'
                    profileSectionCircle.style.backgroundColor = '#FF8901'
                    profileSectionCircle.style.transform = 'translateY(-50%)'
                    profileSectionCircle.style.borderRadius = '50%'
                    profileSectionCircle.style.left = '3%'

                    let profileSectionName = document.createElement('text')
                    profileSectionName.style.width = '150px'
                    profileSectionName.style.width = '40pz'
                    profileSectionName.style.position = 'absolute'
                    profileSectionName.style.transform = 'translateY(-50%)'
                    profileSectionName.style.top = '50%'
                    profileSectionName.style.left = '20%'
                    profileSectionName.style.fontSize = '24px'
                    profileSectionName.style.fontWeight = '800'
                    profileSectionName.innerText = element.name

                    let dateSection = document.createElement('text')
                    dateSection.style.width = '200px'
                    dateSection.style.position = 'absolute'
                    dateSection.style.transform = 'translateY(-50%)'
                    dateSection.style.top = '50%'
                    dateSection.style.right = '0%'
                    dateSection.style.fontSize = '18px'
                    dateSection.style.fontWeight = '200'
                    dateSection.innerText = element.createdAt

                    profileSection.appendChild(dateSection)
                    profileSection.appendChild(profileSectionName)
                    profileSection.appendChild(profileSectionCircle)



                    let mainSectionBox = document.createElement('div')
                    mainSectionBox.style.width = '90%'
                    mainSectionBox.style.height = '60%'
                    mainSectionBox.style.backgroundColor = 'white'
                    mainSectionBox.style.position = 'absolute'
                    mainSectionBox.style.left = '50%'
                    mainSectionBox.style.transform = 'translateX(-50%)'
                    mainSectionBox.style.top = '20%'
                    mainSectionBox.style.display = 'flex'
                    mainSectionBox.style.alignItems = 'center'
                    mainSectionBox.style.justifyContent = 'center'
                    mainSectionBox.style.fontWeight = '800'
                    mainSectionBox.style.fontSize = '24px'
                    mainSectionBox.innerText = element.content


                    let interactionSection = document.createElement('div')
                    interactionSection.style.width = '90%'
                    interactionSection.style.height = '70px'
                    interactionSection.style.backgroundColor = 'white'
                    interactionSection.style.position = 'absolute'
                    interactionSection.style.left = '50%'
                    interactionSection.style.transform = 'translateX(-50%)'
                    interactionSection.style.bottom = '5%'
                    interactionSection.style.borderRadius = '15px'
                    interactionSection.style.display = 'flex'
                    interactionSection.style.alignItems = 'center'
                    interactionSection.style.justifyContent = 'space-around '

                    {
                        let like = document.createElement('div')
                        like.classList.add('like')
                        like.style.width = '100px'
                        like.style.height = '50px'
                        like.style.backgroundColor = 'lightgrey'
                        like.innerText = 'Like'
                        like.style.display = 'flex'
                        like.style.alignItems = 'center'
                        like.style.justifyContent = 'center'
                        like.style.cursor = 'pointer'
                        like.style.borderRadius = '15px'
                        like.style.fontWeight = '800'

                        like.addEventListener('click', (e) => {
                            e.preventDefault()
                            let para1 = element._id
                            let para2 = element.name

                            let url = `http://localhost:6969/postRoutes/${para1}/${para2}`

                            let sendFetch = async () => {

                                try {
                                    let res = await fetch(url, {
                                        method: 'PATCH',
                                        headers: {
                                            "content-type": 'application/json'
                                        }
                                    })

                                    if (!res.ok) throw new Error('error')
                                    let data = await res.json()
                                    console.log(data)

                                } catch (error) {
                                    console.warn()
                                }
                            }
                            sendFetch()
                            renderPostBox()




                        })

                        let likeCount = document.createElement('text')
                        likeCount.innerText = `${element.likes} People liked this Post`



                        interactionSection.appendChild(like)
                        interactionSection.appendChild(likeCount)
                    }




                    postBox.appendChild(profileSection)
                    postBox.appendChild(mainSectionBox)
                    postBox.appendChild(interactionSection)

                    innerContainer.appendChild(postBox)

                })
            }

            renderPostBox()
            templateHome.appendChild(container)
        }


        mainTemplate.appendChild(templateHome)

    })

}

{//REGISTERED USER
    let registerUser = document.querySelector('#registerUser')
    registerUser.addEventListener('click', async (e) => {
        e.preventDefault()

        let mainTemplate = document.getElementById('main-template')


        if (mainTemplate.childElementCount !== 0) {

            mainTemplate.innerHTML = ''
        }

        let templateRegUser = document.createElement('div')
        templateRegUser.id = 'registerUserDashboard'
        templateRegUser.classList.add('btn-main-template')


        {
            let text = document.createElement('text')
            text.innerText = 'Registered Users'
            text.classList.add('reg-users-text')
            text.style.position = 'absolute'
            text.style.left = '0'
            text.style.top = '-4%'
            templateRegUser.appendChild(text)
        }

        {//Ito yung template sa loob
            let container = document.createElement('div') //Ito yung container sa loob
            container.id = 'regUser-container'

            let topArea = document.createElement('div') // ito yung taas ng container design
            topArea.id = 'top-area'
            { // mga text lang to sa loob ng topArea
                let text1 = document.createElement('text')
                text1.classList.add('top-area-text')
                text1.innerText = 'Name'

                let text2 = document.createElement('text')
                text2.classList.add('top-area-text')
                text2.innerText = 'Date Created'

                let text3 = document.createElement('text')
                text3.classList.add('top-area-text')
                text3.innerText = 'Curerent Status'

                let text4 = document.createElement('text')
                text4.classList.add('top-area-text')
                text4.innerText = 'Message'

                topArea.appendChild(text1)
                topArea.appendChild(text2)
                topArea.appendChild(text3)
                topArea.appendChild(text4)
            }

            let mainArea = document.createElement('div') // ito yung main body kung san nakalagay yung mga user
            mainArea.id = 'main-area'
            {

                let fetchAllUser = async () => {
                    let url = 'http://localhost:6969/api/all'
                    try {
                        let res = await fetch(url)
                        if (!res.ok) throw new error('Error with fetch line 135 dashboard.js')
                        let data = await res.json()
                        return data
                    } catch (error) {
                        console.log(error.message)
                    }
                }
                let data = await fetchAllUser()
                console.log(data)

                data.forEach((element) => {
                    let box = document.createElement('div')
                    box.classList.add('box-regUser')

                    let boxInisde1 = document.createElement('div')
                    boxInisde1.classList.add('box-regUser-inside')
                    boxInisde1.innerText = element.username

                    let boxInisde2 = document.createElement('div')
                    boxInisde2.classList.add('box-regUser-inside')
                    boxInisde2.innerText = element.createdAt.split('T')[0]

                    let boxInisde3 = document.createElement('div')
                    boxInisde3.classList.add('box-regUser-inside')
                    if (element.status === 'online') {
                        boxInisde3.style.color = 'green'
                        boxInisde3.style.fontWeight = '800'
                    } else {
                        boxInisde3.style.color = 'red'
                    }
                    boxInisde3.innerText = element.status


                    let boxInisde4 = document.createElement('div')
                    boxInisde4.classList.add('box-regUser-inside')
                    boxInisde4.style.width = '15%'
                    // boxInisde4.style.backgroundColor = 'red'
                    boxInisde4.style.position = 'relative'
                    boxInisde4.style.display = 'flex'
                    boxInisde4.style.alignItems = 'center'
                    boxInisde4.style.justifyContent = 'center'

                    {

                        if (element.username !== userInfo.success.username) {
                            let boxInisdeBox4 = document.createElement('img')
                            boxInisdeBox4.style.width = '20%'
                            boxInisdeBox4.style.height = '40%'
                            boxInisdeBox4.style.padding = '3%'
                            boxInisdeBox4.style.borderRadius = '15px'
                            boxInisdeBox4.style.cursor = 'pointer'
                            boxInisdeBox4.style.backgroundColor = '#FF8901'
                            boxInisdeBox4.src = './userInfo/img/messageAsset.png'

                            boxInisdeBox4.addEventListener('click', (e) => {
                                e.preventDefault()

                                console.log('i got clicked, dito dapat nakalagay yung message')
                            })

                            boxInisde4.appendChild(boxInisdeBox4)
                        }

                    }


                    box.appendChild(boxInisde1)
                    box.appendChild(boxInisde2)
                    box.appendChild(boxInisde3)
                    box.appendChild(boxInisde4)


                    mainArea.appendChild(box)
                })



            }

            container.appendChild(topArea)
            container.appendChild(mainArea)

            templateRegUser.appendChild(container)
        }






        mainTemplate.appendChild(templateRegUser)
    })
}

{//INFO
    let info = document.querySelector('#info')
    info.addEventListener('click', (e) => {
        e.preventDefault()

        let mainTemplate = document.getElementById('main-template')


        if (mainTemplate.childElementCount !== 0) {

            mainTemplate.innerHTML = ''
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
            boxContainer.style.backgroundColor = 'lightgrey'

            // para sa date created area ko
            let box1 = document.createElement('div')
            box1.classList.add('box')
            let text1 = document.createElement('text')
            text1.innerHTML = 'Date Created'
            text1.classList.add('box-text-grey')
            box1.appendChild(text1)
            let text1Val = document.createElement('text')
            text1Val.innerText = userInfo.success.createdAt.split('T')[0]
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

        {//Ito yung template sa loob
            let container = document.createElement('div')
            container.id = 'info-container'
            container.style.display = 'flex'
            container.style.alignItems = 'center'
            container.style.justifyContent = 'center'
            container.style.overflowY = 'auto'
            container.style.width = '100%'

            let innerContainer = document.createElement('div')
            innerContainer.style.display = 'flex'
            innerContainer.style.flexDirection = 'column-reverse'
            innerContainer.style.alignItems = 'center'
            innerContainer.style.justifyContent = 'flex-end'
            // innerContainer.style.gap = '1rem'
            innerContainer.style.flexGrow = '1'
            innerContainer.style.overflowY = 'auto'
            innerContainer.style.width = '100%'
            innerContainer.style.marginTop = 'auto'


            container.appendChild(innerContainer)


            let fetchAllPost = async () => {
                let url = `http://localhost:6969/postRoutes/${userInfo.success.username}`

                try {
                    let res = await fetch(url, {
                        method: "PUT",
                        headers: {
                            "content-type": "applicaiton/json"
                        }
                    }
                    )
                    if (!res.ok) throw new error(error.message)

                    let data = await res.json()
                    return data.success
                } catch (error) {
                    console.log(error.message)
                }
            }

            let renderPostBox = async () => {
                let postInfos = await fetchAllPost()

                postInfos.forEach(element => {
                    let postBox = document.createElement('div')
                    postBox.style.height = '550px'
                    postBox.style.width = '550px'
                    postBox.style.backgroundColor = '#F0F2F5'
                    // postBox.style.flexShrink = '0'
                    postBox.style.borderRadius = '15px'
                    postBox.style.position = 'relative'
                    postBox.style.marginTop = '50px'
                    postBox.style.marginBottom = '50px'

                    let profileSection = document.createElement('div')
                    profileSection.style.width = '90%'
                    profileSection.style.height = '80px'
                    profileSection.style.position = 'absolute'
                    profileSection.style.top = '4%'
                    profileSection.style.backgroundColor = 'white'
                    profileSection.style.left = '50%'
                    profileSection.style.transform = 'translateX(-50%)'

                    let profileSectionCircle = document.createElement('div')
                    profileSectionCircle.style.height = '70px'
                    profileSectionCircle.style.width = '70px'
                    profileSectionCircle.style.position = 'absolute'
                    profileSectionCircle.style.top = '50%'
                    profileSectionCircle.style.backgroundColor = 'green'
                    profileSectionCircle.style.transform = 'translateY(-50%)'
                    profileSectionCircle.style.borderRadius = '50%'
                    profileSectionCircle.style.left = '3%'

                    let profileSectionName = document.createElement('text')
                    profileSectionName.style.width = '150px'
                    profileSectionName.style.width = '40pz'
                    profileSectionName.style.position = 'absolute'
                    profileSectionName.style.transform = 'translateY(-50%)'
                    profileSectionName.style.top = '50%'
                    profileSectionName.style.left = '20%'
                    profileSectionName.style.fontSize = '24px'
                    profileSectionName.style.fontWeight = '800'
                    profileSectionName.innerText = element.name

                    let dateSection = document.createElement('text')
                    dateSection.style.width = '200px'
                    dateSection.style.position = 'absolute'
                    dateSection.style.transform = 'translateY(-50%)'
                    dateSection.style.top = '50%'
                    dateSection.style.right = '0%'
                    dateSection.style.fontSize = '18px'
                    dateSection.style.fontWeight = '200'
                    dateSection.innerText = element.createdAt

                    profileSection.appendChild(dateSection)
                    profileSection.appendChild(profileSectionName)
                    profileSection.appendChild(profileSectionCircle)



                    let mainSectionBox = document.createElement('div')
                    mainSectionBox.style.width = '90%'
                    mainSectionBox.style.height = '60%'
                    mainSectionBox.style.backgroundColor = 'white'
                    mainSectionBox.style.position = 'absolute'
                    mainSectionBox.style.left = '50%'
                    mainSectionBox.style.transform = 'translateX(-50%)'
                    mainSectionBox.style.top = '20%'
                    mainSectionBox.style.display = 'flex'
                    mainSectionBox.style.alignItems = 'center'
                    mainSectionBox.style.justifyContent = 'center'
                    mainSectionBox.style.fontWeight = '800'
                    mainSectionBox.style.fontSize = '24px'
                    mainSectionBox.innerText = element.content

                    let interactionSection = document.createElement('div')
                    interactionSection.style.width = '90%'
                    interactionSection.style.height = '70px'
                    interactionSection.style.backgroundColor = 'white'
                    interactionSection.style.position = 'absolute'
                    interactionSection.style.left = '50%'
                    interactionSection.style.transform = 'translateX(-50%)'
                    interactionSection.style.bottom = '5%'
                    interactionSection.style.borderRadius = '15px'
                    interactionSection.style.display = 'flex'
                    interactionSection.style.alignItems = 'center'
                    interactionSection.style.justifyContent = 'center'

                    postBox.appendChild(profileSection)
                    postBox.appendChild(mainSectionBox)
                    postBox.appendChild(interactionSection)

                    innerContainer.appendChild(postBox)
                })
            }

            renderPostBox()

            templateInfo.appendChild(container)
        }

        //wag buburahin to, ito nagkakabit ng lahat ng code dun sa main template
        mainTemplate.appendChild(templateInfo)

    })

}


