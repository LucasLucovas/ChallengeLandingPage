const API = `https://api.escuelajs.co/api/v1/products?`
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const table = document.querySelector('.table')
const cartCounter = document.getElementById('cartCounter')
const btnNextPage = document.querySelector('.nextPage')
const btnCart = document.getElementById('cartButton')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCart = document.getElementById('template-cart').content
const fragment = document.createDocumentFragment()



export {API,cards,items,footer,table,cartCounter,btnNextPage,btnCart,templateCard,templateFooter,templateCart,fragment}