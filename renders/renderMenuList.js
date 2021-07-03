import helpers from "../helpers/helpers.js";
import renderCard from "./renderCard.js";

const sortBox = document.getElementsByClassName('sort-box')

const menuList = document.getElementById('menu-list')
const sortByName = document.getElementById('sort-by-name')
const sortByPrice = document.getElementById('sort-by-price')
const sortByHeat = document.getElementById('sort-by-heat')

function renderMenuList() {
    let allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
    allPizzas.sort((a, b) => a.name.localeCompare(b.name));
    menuList.innerHTML = ''

    if(allPizzas.length === 0) {
        sortBox[0].style.display = 'none'
        menuList.innerHTML += `<div class="empty-list">Menu list is empty.</div>`
    } else {
        sortBox[0].style.display = 'block'
        renderCard(allPizzas)
        helpers.sortBtnColor(sortByName, sortByHeat, sortByPrice)
    }
}

export default renderMenuList