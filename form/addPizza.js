import helpers from "../helpers/helpers.js";

const formContainer = document.getElementsByClassName('form-container')
const menuContainer = document.getElementsByClassName('menu-container')

const name = document.getElementById('name')
const price = document.getElementById('price')
const heat = document.getElementById('heat')
const topping = document.getElementById('topping')
const showToppings = document.getElementById('show-toppings')
const errorMessage = document.getElementById('errorMessage')

let toppings = []
let photo = ''

export default {
    addToppings: () => {
        if(topping.value.length !== 0) {
            toppings.push(topping.value)
            showToppings.innerHTML = ''
            toppings.map(top => {
                showToppings.innerHTML += `<li>${top}</li>`
            })
            topping.value = ''
        }
    },

    selectPhoto: (e) => {
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
    },

    addPizza: (e) => {

        let allPizzas = JSON.parse(sessionStorage.getItem('pizza'))

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

        helpers.changeWindow(formContainer, menuContainer)
    }
}