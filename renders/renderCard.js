import renderMenuList from "./renderMenuList.js";

const menuList = document.getElementById('menu-list')
const deleteModal = document.getElementsByClassName('delete-modal')

const deleteYes = document.getElementById('yes')
const deleteNo = document.getElementById('no')

let deleteName = ''

deleteYes.onclick = () => {
    let allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
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

function renderCard(data) {
    data.map(item => {

        let peppers = []
        for (let j = 0; j < item.heat; j++) {
            peppers.push('<img src="./style/images/hot-pepper.png" alt="hot-peppers">')
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
    let allPizzas = JSON.parse(sessionStorage.getItem('pizza'))
    allPizzas.map((item, i) => {
        deleteCard[i].onclick = (e) => {
            deleteName = e.path[3].children[1].children[0].innerText
            deleteModal[0].style.display = 'flex'
        }
    })
}

export default renderCard;