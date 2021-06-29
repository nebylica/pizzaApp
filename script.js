//Buttons
const addBtn = document.getElementById('addBtn')
const menuBtn = document.getElementById('menuBtn')
const formBack = document.getElementById('form-back')
const menuBack = document.getElementById('menu-back')
const submit = document.getElementById('submit')
const addTopping = document.getElementById('add-topping')
const deleteYes = document.getElementById('yes')
const deleteNo = document.getElementById('no')
const sortByName = document.getElementById('sort-by-name')
const sortByPrice = document.getElementById('sort-by-price')
const sortByHeat = document.getElementById('sort-by-heat')

//Windows, boxes
const welcomeContainer = document.getElementsByClassName('welcome-container')
const formContainer = document.getElementsByClassName('form-container')
const menuContainer = document.getElementsByClassName('menu-container')
const deleteModal = document.getElementsByClassName('delete-modal')
const sortBox = document.getElementsByClassName('sort-box')
const menuList = document.getElementById('menu-list')


//Form inputs
const name = document.getElementById('name')
const price = document.getElementById('price')
const heat = document.getElementById('heat')
const topping = document.getElementById('topping')
const showToppings = document.getElementById('show-toppings')
const selectPhoto = document.getElementById('select-photo')
const errorMessage = document.getElementById('errorMessage')

//Helpers
sessionStorage.setItem('pizza', JSON.stringify([]))

let toppings = []
let photo = ''
let allPizzas = []
let deleteName = ''

const changeWindow = (close, open) => {
    close[0].style.display = 'none'
    open[0].style.display = 'flex'
}
const sortBtnColor = (pressed, unpressed, unpressed2) => {
    pressed.style.color = '#f67171'
    unpressed.style.color = '#000000'
    unpressed2.style.color = '#000000'
}

//Change window func
addBtn.onclick = () => {changeWindow(welcomeContainer, formContainer)}
formBack.onclick = () => {changeWindow(formContainer, welcomeContainer)}
menuBtn.onclick = () => {
    changeWindow(welcomeContainer, menuContainer)
    renderMenuList()
}
menuBack.onclick = () => {changeWindow(menuContainer, welcomeContainer)}

//Form submission
addTopping.onclick = () => {
    if(topping.value.length !== 0) {
        toppings.push(topping.value)
        showToppings.innerHTML = ''
        toppings.map(top => {
            showToppings.innerHTML += `<li>${top}</li>`
        })
        topping.value = ''
    }
}
selectPhoto.onclick = e => {
    if(typeof e.target.alt === "string") {
        photo = e.target.alt

        let photoIndex = Number(e.target.alt[e.target.alt.length - 1])
        for (let i = 0; i < 6; i++) {
            if(i === photoIndex) {
                e.path[2].children[i].className = 'select-photo-box'
            } else {
                e.path[2].children[i].className = 'photo-box'
            }
        }
    }
}

submit.addEventListener('click', (e) => addPizza(e))

function addPizza(e) {

    allPizzas = JSON.parse(sessionStorage.getItem('pizza'))

    let uniqueName = true
    allPizzas.map(item => item.name === name.value ? uniqueName = false : null)

    if(!uniqueName) return errorMessage.innerText = 'That name already exist, please try another one.'
    if(name.value.length === 0) return errorMessage.innerText = 'Please fill name input.'
    if(name.value.length > 30) return errorMessage.innerText = 'Name is too long (max 30 characters).'
    if(price.value.length === 0) return errorMessage.innerText = 'Please fill price input.'
    if(price.value < 0) return errorMessage.innerText = 'Price should include only positive value.'
    if(toppings.length < 2) return errorMessage.innerText = 'Please include at least 2 toppings.'
    if(photo.length === 0) return errorMessage.innerText = 'Please select photo.'

    let pizza = {
        name: name.value,
        price: Number(price.value).toFixed(2) ,
        heat: heat.value,
        toppings,
        photo
    }

    allPizzas.push(pizza)
    sessionStorage.setItem('pizza', JSON.stringify(allPizzas));

    name.value = ''
    price.value = ''
    heat.value = 1
    toppings = []
    showToppings.innerHTML = ''
    e.path[3].children[0].children[4].children[0].children[photo[photo.length - 1]].className = 'photo-box'
    photo = ''
    errorMessage.innerText = ''

    changeWindow(formContainer, menuContainer)
    renderMenuList()
}

//Delete modal
deleteYes.onclick = () => {

    allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
    let deletedPizzas = allPizzas.filter(pizza => pizza.name !== deleteName)
    sessionStorage.setItem('pizza', JSON.stringify(deletedPizzas));

    deleteName = ''
    deleteModal[0].style.display = 'none'
    renderMenuList()

}
deleteNo.onclick = () => {
    deleteName = ''
    deleteModal[0].style.display = 'none'
    renderMenuList()
}

//Sort func
sortByName.onclick =() => {
    renderMenuList()
    sortBtnColor(sortByName, sortByHeat, sortByPrice)
}
sortByHeat.onclick = () => {
    allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
    allPizzas.sort((a, b) => a.heat - b.heat);
    menuList.innerHTML = ''
    renderCard(allPizzas)
    sortBtnColor(sortByHeat, sortByName, sortByPrice)
}
sortByPrice.onclick = () => {
    allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
    allPizzas.sort((a, b) => a.price - b.price);
    menuList.innerHTML = ''
    renderCard(allPizzas)
    sortBtnColor(sortByPrice, sortByName, sortByHeat)
}

//Menu renders
function renderCard(data) {

    data.map(item => {

        let peppers = []
        for (let j = 0; j < item.heat; j++) {
            peppers.push('<img src="./style/images/hot-pepper.png" alt="">')
        }

        menuList.innerHTML += `
            <div class="card">
                <img src="./style/images/${item.photo}.jpeg" alt="${item.photo}">
                <div class="card-title-box">
                    <p class="card-title">${item.name}</p>
                    <div class="card-pepper">
                        ${peppers.join(' ')}
                    </div>
                </div>
                <div>Price: ${item.price} Eur</div>
                <p class="card-text">${item.toppings.join(', ')}</p>
                <div class="button-box">
                    <div class="delete">
                        <div class="button delete-btn">Delete</div>
                        <div class="button-hover w-70"></div>
                    </div>
                </div>
            </div>
        `
    })

    let deleteCard = document.getElementsByClassName('delete')
    allPizzas.map((item, i) => {
        deleteCard[i].onclick = (e) => {
            deleteName = e.path[3].children[1].children[0].innerText
            deleteModal[0].style.display = 'flex'
        }
    })
}
function renderMenuList() {

    allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
    allPizzas.sort((a, b) => a.name.localeCompare(b.name));
    menuList.innerHTML = ''

    if(allPizzas.length === 0) {
        sortBox[0].style.display = 'none'
        menuList.innerHTML += `<div class="empty-list">Menu list is empty.</div>`
    } else {
        sortBox[0].style.display = 'block'
        renderCard(allPizzas)
        sortBtnColor(sortByName, sortByHeat, sortByPrice)
    }
}






