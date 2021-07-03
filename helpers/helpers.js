export default {
    changeWindow: (close, open) => {
        close[0].style.display = 'none'
        open[0].style.display = 'flex'
    },
    sortBtnColor: (pressed, unpressed, unpressed2) => {
        pressed.style.color = '#f67171'
        unpressed.style.color = '#000000'
        unpressed2.style.color = '#000000'
    }
}