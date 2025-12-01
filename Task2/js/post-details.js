const main = document.getElementsByTagName('main')[0]

const url = new URL(window.location)

const postId = +url.searchParams.get('postId')

function initialRender() {
    const post = fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res=>res.json())

    const comments = fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res=>res.json())

    Promise.all([post, comments])
        .then(value => {
            appendPost(value[0])
            appendComments(value[1])
        })
        .catch(err=> console.log(err))
}

function appendPost(post) {
    const postInfoList = document.createElement('ul')
    postInfoList.id = 'postInfoList'

    for (const key in post) {
        const li = document.createElement('li')
        const keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1,)
        li.innerText = `${keyCapitalized}: ${post[key]}`
        postInfoList.appendChild(li)
    }
    main.appendChild(postInfoList)
}

function appendComments(comments) {
    const h2 = document.createElement('h2')
    h2.innerText='Post`s comments'
    const commentsList = document.createElement('ul')
    commentsList.id='commentsList'
    for (const comment of comments) {
        const li = document.createElement('li')
        li.innerText=comment.body

        commentsList.appendChild(li)
    }
    main.append(h2, commentsList)
}
initialRender()
