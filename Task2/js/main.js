const usersContainer = document.getElementById('usersList')

fetch('https://jsonplaceholder.typicode.com/users')
.then(res=>res.json())
.then(users=>{
    users.forEach(user=>{
        const li = document.createElement('li')

        const userInfo = document.createElement('div')
        userInfo.classList.add('userInfo')
        userInfo.innerText=`${user.id} - ${user.name}`

        const a = document.createElement('a')
        a.href=`user-details.html?userId=${user.id}`
        a.innerText='User details'

        li.append(userInfo, a)
        usersContainer.appendChild(li)
    })
})