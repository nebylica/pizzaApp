//Import helpers
import helpers from './helpers/helpers.js'
import sortPizzas from './helpers/sortPizzas.js'
import form from './form/addPizza.js'
import renderMenuList from "./renders/renderMenuList.js";


//Buttons
const addBtn = document.getElementById('addBtn')
const menuBtn = document.getElementById('menuBtn')
const formBack = document.getElementById('form-back')
const menuBack = document.getElementById('menu-back')
const submit = document.getElementById('submit')
const addTopping = document.getElementById('add-topping')
const sortByName = document.getElementById('sort-by-name')
const sortByPrice = document.getElementById('sort-by-price')
const sortByHeat = document.getElementById('sort-by-heat')
const selectPhoto = document.getElementById('select-photo')

//Windows, boxes
const welcomeContainer = document.getElementsByClassName('welcome-container')
const formContainer = document.getElementsByClassName('form-container')
const menuContainer = document.getElementsByClassName('menu-container')


//Open session
sessionStorage.setItem('pizza', JSON.stringify([]))

//Change window func
addBtn.onclick = () => {helpers.changeWindow(welcomeContainer, formContainer)}
formBack.onclick = () => {helpers.changeWindow(formContainer, welcomeContainer)}
menuBtn.onclick = () => {
    helpers.changeWindow(welcomeContainer, menuContainer)
    renderMenuList()
}
menuBack.onclick = () => {helpers.changeWindow(menuContainer, welcomeContainer)}

//Form submission

addTopping.onclick = () => {form.addToppings()}
selectPhoto.onclick = e => {form.selectPhoto(e)}
submit.onclick = e => {
    form.addPizza(e)
    renderMenuList()
}

//Sort func
sortByName.onclick =() => {
    renderMenuList()
    helpers.sortBtnColor(sortByName, sortByHeat, sortByPrice)
}
sortByHeat.onclick = () => {
    sortPizzas.heat()
    helpers.sortBtnColor(sortByHeat, sortByName, sortByPrice)
}
sortByPrice.onclick = () => {
    sortPizzas.price()
    helpers.sortBtnColor(sortByPrice, sortByName, sortByHeat)
}








