const main = document.getElementsByTagName('main')[0]

const url = new URL(window.location)

const userId = +url.searchParams.get('userId') //userId = 0 if the param omitted or passed not number-like param

function initialRender() {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(user => appendUser(user))
        .catch((err) => console.log(err))
}

function appendUser(user) {
    const userInfoList = document.createElement('ul')
    userInfoList.id = 'userInfoList'

    for (const key in user) {
        if (typeof user[key] !== 'object') {
            const li = document.createElement('li')
            const keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1,)
            li.innerText = `${keyCapitalized}: ${user[key]}`
            userInfoList.appendChild(li)
        }
    }

    // address block
    const addressLi = document.createElement('li')

    const h3address = document.createElement('h3')
    h3address.innerText='Address'

    const addressLiList = document.createElement('ul')
    for (const key in user.address) {
        if (typeof user.address[key] !== 'object') {
            const li = document.createElement('li')
            const keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1,)
            li.innerText = `${keyCapitalized}: ${user.address[key]}`
            addressLiList.appendChild(li)
        }
    }

    const geo = document.createElement('li')
    geo.innerText = `Geo: lat (${user.address.geo.lat}), lng (${user.address.geo.lng})`
    addressLiList.appendChild(geo)

    addressLi.append(h3address, addressLiList)

    // company block
    const companyLi = document.createElement('li')

    const h3company = document.createElement('h3')
    h3company.innerText='Company'

    const companyLiList = document.createElement('ul')
    for (const key in user.company) {
        const li = document.createElement('li')
        const keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1,)
        li.innerText = `${keyCapitalized}: ${user.company[key]}`
        companyLiList.appendChild(li)
    }
    companyLi.append(h3company, companyLiList)

    userInfoList.append(addressLi, companyLi)

    // post of current user button
    const getPostsButton = createGetPostsBtn()
    userInfoList.appendChild(getPostsButton)

    main.appendChild(userInfoList)
}

function createGetPostsBtn() {
    const button = document.createElement('button')
    button.innerText = 'Posts of current user'
    button.onclick = () => getPosts()
    return button
}

function getPosts() {
    if (document.getElementById('postsList')) return //in case posts are already fetched and appended - just return to prevent refetch
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => appendPosts(posts))
        .catch((err) => console.log(err))
}

function appendPosts(posts) {

    const h2 = document.createElement('h2')
    h2.innerText = 'Posts of current user'

    const postsList = document.createElement('ul')
    postsList.id = 'postsList'
    posts.forEach(({title, id}) => {
        const li = document.createElement('li')

        const titleSpan = document.createElement('span')
        titleSpan.innerText = title

        const postLink = document.createElement('a')
        postLink.innerText = 'Post details'
        postLink.href = `post-details.html?postId=${id}`

        li.append(titleSpan, postLink)
        postsList.appendChild(li)
    })
    main.append(h2, postsList)
}

initialRender()




