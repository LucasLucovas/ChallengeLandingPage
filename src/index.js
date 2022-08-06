import {API,cards,items,footer,table,cartCounter,btnNextPage,btnCart,templateCard,templateFooter,templateCart,fragment} from "./modules/const.js"


let pageCounter = 20
let cart ={}



document.addEventListener('DOMContentLoaded',()=>{
    fetchData()
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
        paintCart()
    }
})

cards.addEventListener('click', e => {
    addToCart(e)
})

items.addEventListener('click', e =>{
    btnAction(e)
})



   
   

const fetchData = async ()=>{
    try {

        let res = await fetch(`${API}offset=20&limit=9`)
        let data = await res.json()

        window.addEventListener('scroll',()=>{
           
            if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
                btnNextPage.addEventListener('click',async ()=>{
                    let res = await fetch(`${API}offset=${pageCounter}&limit=9`)
                    let data = await res.json()
                    paintCards(data)
                },{once:true}) 
                // console.log(pageCounter)
                // console.log('estoy en el final del scroll')
             }
        })
         paintCards(data)
    } catch (error) {
        console.error(error)
    }
}

const paintCards = data => {
    pageCounter+= 10
    data.forEach(product => {
        //pintando en pantalla la informacion requerida
       templateCard.querySelector('h5').textContent = product.title
       templateCard.querySelector('.price').textContent = product.price
       templateCard.querySelector('.desc').textContent = product.description
       templateCard.querySelector('img').setAttribute('src', product.images)

       //capturando id en boton
       templateCard.querySelector('.btn').dataset.id = product.id

       //clonando el template
       const clone = templateCard.cloneNode(true)
       //agregandole al fragment el clon
       fragment.appendChild(clone)
    })
    //agregandole el fragment a cards para finalmente pintar en el div en cuestion
    cards.appendChild(fragment)
}

const addToCart = e =>{


    //indica si el objeto al que le hacemos click contiene la clase btn-dark(true or false)
    if(e.target.classList.contains('btn-dark')){
        //accede al elemento padre que en este caso es el elemento div con clase "card-body" y luego lo aniade al objeto
        setCart(e.target.parentElement)

    }
    //evitar que los eventos que se heredan del contenedor padre se propagen
    e.stopPropagation()
}

const setCart = object =>{
    const product = {
        id: object.querySelector('.btn-dark').dataset.id,
        name: object.querySelector('h5').textContent,
        price: object.querySelector('.price').textContent,
        description: object.querySelector('.desc').textContent,
        quantity: 1
    }

    if (cart.hasOwnProperty(product.id)) {
        product.quantity = cart[product.id].quantity + 1
    }

    cart[product.id] = {...product}//adquirimos la info de product y le hacemos una copia
    //con esto lo que hacemos es crear el index con su product.id si no existe lo crea y si existe lo sobreescribe
    paintCart()
}

const paintCart = () => {
    items.innerHTML = ''
    Object.values(cart).forEach(product => {
        //esto ya no viene de la base de datos o de la API sino de el objeto template que creamos en setCart
        templateCart.querySelector('th').textContent = product.id
        templateCart.querySelectorAll('td')[0].textContent = product.name
        templateCart.querySelectorAll('td')[1].textContent = product.quantity
        templateCart.querySelector('.btn-info').dataset.id = product.id
        templateCart.querySelector('.btn-danger').dataset.id = product.id
        templateCart.querySelector('span').textContent = product.quantity * product.price
        

        const clone = templateCart.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    paintFooter()

    localStorage.setItem('cart',JSON.stringify(cart))
}


const paintFooter = () =>{
    footer.innerHTML = ''

    //si esto es igual a cero quiere decir que nuestro carrito esta vacio
    if(Object.keys(cart).length === 0){
        footer.innerHTML = `<th scope="row" colspan="5">Empty cart</th>`
        return
    }
    
    const nQuantity = Object.values(cart).reduce((acc,{quantity}) => acc + quantity,0)
    const nPrice = Object.values(cart).reduce((acc,{quantity,price}) => acc + quantity * price ,0)

    templateFooter.querySelectorAll('td')[0].textContent = nQuantity
    templateFooter.querySelector('span').textContent = nPrice
    cartCounter.textContent = nQuantity

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnEmpty = document.getElementById('empty-cart')
    btnEmpty.addEventListener('click',() => {
        cart = {}
        paintCart()
    })
}

const btnAction = e =>{

    if(e.target.classList.contains('btn-info')){
        const product = cart[e.target.dataset.id]
        product.quantity++
        cart[e.target.dataset.id] = {...product}
        paintCart()
    }

    if(e.target.classList.contains('btn-danger')){
        const product = cart[e.target.dataset.id]
        product.quantity--
        if(product.quantity === 0){
            delete cart[e.target.dataset.id]
        }
        paintCart()
    }

    e.stopPropagation()
}

btnCart.addEventListener('click',()=>{

    table.classList.toggle('active')
    items.classList.toggle('active')

})