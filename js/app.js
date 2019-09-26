// Variables
const container = document.querySelector('.container')
const winMessage = document.querySelector('.win-message')
const reset = document.querySelector('#reset')
const winReset = document.querySelector('#win_reset')
const time = document.querySelector('#time')
const score = document.querySelector('#score')
const cardsNumber = 12
let timerSeconds = 0
let timerMinutes = 0
let timerHours = 0
let win = 0
let cards = []
let cardsToCompare = []
// Genera un numero random
function getRandomNumber() {
     const randomNumber = Math.floor(Math.random() * ((cardsNumber + 1) - 1)) + 1
     return randomNumber
}
// quitar opacidad
function quitOpacity(element) {
     element.style.opacity = '1'
}
// poner opacidad
function addOpacity(element) {
     element.style.opacity = '0'
}
// reseteo del juego
function resetGame() {
     clearInterval(interval);
     cardsToCompare = []
     timerSeconds = 0
     timerMinutes = 0
     timerHours = 0
     win = 0
     for (let i = 0; i < cardsNumber; i++) {
          container.removeChild(container.firstChild)
     }
     showCards()
}
// Tiempo que transcurre hasta ganar
function scoore() {
     time.textContent = '00:00:00'
     interval = setInterval(() => {
          if (timerSeconds === 60) {
               timerSeconds = 0
               timerMinutes++
               if (timerMinutes === 60) {
                    timerMinutes = 0
                    timerHours++
               }
          }
          timerSeconds++
          if (timerSeconds < 10) { timerSeconds = `0${timerSeconds}` }
          if (timerMinutes < 10) { time.textContent = `0${timerHours}:0${timerMinutes}:${timerSeconds}` }
          else { time.textContent = `0${timerHours}:${timerMinutes}:${timerSeconds}` }
     }, 1000)
     return interval
}
// 
function winGame() {
     clearInterval(interval);
     let scoreTime = time.innerText
     score.textContent = `${scoreTime}`
     winMessage.classList.remove('none')
}
// Agrega la carta a un objeto que contendra todas
function addCardsObject(randomNumber) {
     return cards[randomNumber] = {
          id: randomNumber,
          elementId: `card_${randomNumber}`,
          img: `./img/${randomNumber}.jpg`,
          active: false
     }
}
// Muestra las tarjetas en un orden random
function showCards() {
     scoore()
     let cardsRandomNumbers = []
     while (cardsRandomNumbers.length < cardsNumber) {
          const randomNumber = getRandomNumber()
          if (cardsRandomNumbers.length <= 0 || cardsRandomNumbers.indexOf(randomNumber) === -1) {
               cardsRandomNumbers.push(randomNumber)
               const card = addCardsObject(randomNumber)
               createElement(card.elementId, card.img)
          }
     }
}
// Crea los elementos en el DOM
function createElement(elementId, imgSrc) {
     const div = document.createElement('div')
     const img = document.createElement('img')
     div.classList = 'cardContainer'
     img.classList = 'card'
     img.src = imgSrc
     img.id = elementId
     div.appendChild(img)
     container.appendChild(div)
}
// Compara las cartas seleccionadas
function compareCards(element) {
     const split = element.id.split('_')
     const id = split[1]
     quitOpacity(element)
     if (cardsToCompare.length <= 0 || cardsToCompare.length < 2) {
          cardsToCompare.push(id)
     }
     if (cardsToCompare.length > 1) {
          const firstCardId = parseInt(cardsToCompare[0])
          const firstCard = cards[firstCardId]
          const secondCardId = parseInt(cardsToCompare[1])
          const secondCard = cards[secondCardId]
          if (firstCard.id + 6 === secondCard.id || firstCard.id - 6 === secondCard.id) {
               firstCard.active = true
               secondCard.active = true
               cardsToCompare = []
               win = win + 2
               if (win === cardsNumber) { winGame() }
          }
          else {
               if (firstCard.id === secondCard.id) {
                    if (!firstCard.active) {
                         const element = document.querySelector(`#${firstCard.elementId}`)
                         addOpacity(element)
                    }
                    cardsToCompare = []
               }
               else if (firstCard.active && secondCard.active) {
                    cardsToCompare = []
               }
               else if (firstCard.active && !secondCard.active) {
                    setTimeout(function () {
                         const element = document.querySelector(`#${secondCard.elementId}`)
                         addOpacity(element)
                    }, 200)
                    cardsToCompare = []
               }
               else if (!firstCard.active && secondCard.active) {
                    setTimeout(function () {
                         const element = document.querySelector(`#${firstCard.elementId}`)
                         addOpacity(element)
                    }, 200)
                    cardsToCompare = []
               }
               else {
                    setTimeout(function () {
                         const firstElement = document.querySelector(`#${firstCard.elementId}`)
                         addOpacity(firstElement)
                         const secondElement = document.querySelector(`#${secondCard.elementId}`)
                         addOpacity(secondElement)
                    }, 500)
                    cardsToCompare = []
               }
          }
     }
}
document.addEventListener('DOMContentLoaded', showCards)
container.addEventListener('click', e => {
     if (e.target.classList[0] !== 'card') { console.log('No es una carta') }
     else { compareCards(e.target) }
})
reset.addEventListener('click', () => {
     resetGame()
})
winReset.addEventListener('click', () => {
     winMessage.classList.add('none')
     resetGame()
})
