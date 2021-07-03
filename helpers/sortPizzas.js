import renderCard from "../renders/renderCard.js";

const menuList = document.getElementById('menu-list')

export default {
    heat: () => {
        let allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
        allPizzas.sort((a, b) => a.heat - b.heat);
        menuList.innerHTML = ''
        renderCard(allPizzas)
    },
    price: () => {
        let allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
        allPizzas.sort((a, b) => a.price - b.price);
        menuList.innerHTML = ''
        renderCard(allPizzas)
    }
}