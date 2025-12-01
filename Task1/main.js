// pair = {name, value} //

// load stored pairs if exist
let currentPairs = JSON.parse(localStorage.getItem('currentPairs')) || []

// get needed elements
const ul = document.getElementById('pairList')
const form = document.forms['inputForm']
const errorP = document.getElementById('errorP')

// Initial render if there are pairs stored in local storage
if (currentPairs.length>0) renderPairsArray(currentPairs)

// updating ls after every add/delete action
function updateLocalStorage () {
    localStorage.setItem('currentPairs', JSON.stringify(currentPairs))
}

// hide error message on input
const pairInput = form.pair
pairInput.oninput = ()=>errorP.innerText=''

//adding (validation, pushing to array, appending) new pair//
form.onsubmit = function (e) {
    e.preventDefault()
    errorP.innerText=''
    const stringPair = this.pair.value
    const {isValid, name, value, error} = pairValidation(stringPair)
    if (!isValid) {
        errorP.innerText=error
        return
    }

    const pair = {name, value}

    currentPairs.push(pair)
    updateLocalStorage()
    appendSinglePair(pair)

    this.pair.value = '' // reset input
}

// validate new pair, return {isValid, name, value, error}
function pairValidation(pair) {
    const regex = /^\s*[A-Za-z0-9]+\s*=\s*[A-Za-z0-9]+\s*$/g
    const isValid = regex.test(pair)
    if (!isValid) return {isValid: false, error: 'NAME=VALUE format should be used'}
    const [name, value] = pair.split('=').map(item => item.trim())
    const existingPair = currentPairs.find(pair=>pair.name===name)
    if (existingPair) return {isValid: false, error: `A pair with a name "${name}" already exists`}
    return {isValid: true, name, value}
}

// create and return li element for a pair
function createLiElement(pair) {
    const {name, value} = pair
    const li = document.createElement('li')
    li.innerText=`${name}=${value}`

    // select functionality
    li.onclick = function () {
        this.classList.toggle('selected')
    }
    return li
}

// remove all existing lis, append instead new lis (stored, sorted)
function renderPairsArray(pairsArray) {
    ul.replaceChildren()
    for (const pair of pairsArray) {
        const li = createLiElement(pair)
        ul.appendChild(li)
    }
}

// append LI to ul for a single pair
function appendSinglePair(pair) {
    const li = createLiElement(pair)
    ul.appendChild(li)
}

// -------SORT------------//
const sortByNameAscBtn = document.getElementById('sortByNameAscBtn')
sortByNameAscBtn.onclick = function () {
    const sortedPairsByName = [...currentPairs].sort((a, b) => a.name.localeCompare(b.name))
    renderPairsArray(sortedPairsByName)
}

const sortByNameDescBtn = document.getElementById('sortByNameDescBtn')
sortByNameDescBtn.onclick = function () {
    const sortedPairsByName = [...currentPairs].sort((a, b) => b.name.localeCompare(a.name))
    renderPairsArray(sortedPairsByName)
}

const sortByValueDescBtn = document.getElementById('sortByValueDescBtn')
sortByValueDescBtn.onclick = function () {
    const sortedPairsByName = [...currentPairs].sort((a, b) => b.value.localeCompare(a.value))
    renderPairsArray(sortedPairsByName)
}

const sortByValueAscBtn = document.getElementById('sortByValueAscBtn')
sortByValueAscBtn.onclick = function () {
    const sortedPairsByName = [...currentPairs].sort((a, b) => a.value.localeCompare(b.value))
    renderPairsArray(sortedPairsByName)
}

//---delete selected---//
const deleteBtn = document.getElementById('deleteBtn')
deleteBtn.onclick = function () {
    const selected = document.getElementsByClassName('selected')
    if (selected.length === 0) return
    for (const li of selected) {
        const name = li.innerHTML.split('=')[0]
        currentPairs = currentPairs.filter(pair => pair.name !== name)
    }
    renderPairsArray(currentPairs)
    updateLocalStorage()
}

// ---select all---//
const selectAllBtn = document.getElementById('selectAllBtn')
selectAllBtn.onclick = function () {
    const lis = document.getElementsByTagName('li')
    for (const li of lis) {
        li.classList.add('selected')
    }
}

// ---deselect all---//
const deselectAllBtn = document.getElementById('deselectAllBtn')
deselectAllBtn.onclick = function () {
    const lis = document.getElementsByTagName('li')
    for (const li of lis) {
        li.classList.remove('selected')
    }
}




