const main = document.getElementsByTagName('main')[0]

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
            const usersList = document.createElement('ul')
            users.forEach(user => {
                const li = document.createElement('li')

                const userInfo = document.createElement('div')
                userInfo.classList.add('userInfo')
                userInfo.innerText = `${user.id} - ${user.name}`

                const a = document.createElement('a')
                a.href = `user-details.html?userId=${user.id}`
                a.innerText = 'User details'

                li.append(userInfo, a)
                usersList.appendChild(li)
            })
        main.appendChild(usersList)
        }
    )
    .catch((err) => console.log(err))