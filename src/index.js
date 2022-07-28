
const API = `https://api.escuelajs.co/api/v1/products`

let previousPageButton = document.querySelector('.previousPage')
let nextPageButton = document.querySelector('.nextPage')
let div = document.querySelector('.products')
let cartContainer = document.getElementById('cartContainer')
let emptyButton = document.getElementById('emptyCart')
let cartCounter = document.getElementById('cartCounter')
let totalAmount = document.getElementById('totalAmount')

let pageCounter = 10
let cart = []

document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
        updateCart()
    }
})




function fetchData(urlApi){
    return fetch(urlApi)
}

emptyButton.addEventListener('click',()=>{
    cart.length = 0
    updateCart()
})

const updateCart = ()=>{
    cartContainer.innerHTML = ""

    cart.map((product) =>{
        const div = document.createElement('div')
        div.className = ('cartProduct')
        div.innerHTML = `
            <h2>Name: ${product.title}</h2>
            <p>Category: ${product.category.name}</p>
            <p>Price: $${product.price}</p>
            <p>Amount: <input type="number" min="1" max="30" value="1" id="Amount"></p>
            <button onclick="deleteCart(${product.id})" class="deleteButton"></button>
        `
        cartContainer.appendChild(div)
        localStorage.setItem('cart',JSON.stringify(cart))
    
    })

    cartCounter.innerText = cart.length
    totalAmount.innerText =  cart.reduce((acc, product) => acc + product.price, 0)
}

const deleteCart = (productId) =>{
    const item = cart.find((product)=> product.id === productId )
    const index = cart.indexOf(item)
    cart.splice(index,1)
    updateCart()
}





fetchData(`${API}?offset=10&limit=10`)
.then(response => response.json())
.then(products => {

    div.innerHTML = ''

    products.map((product)=>{
        const divProduct = document.createElement('div')
        divProduct.classList.add('product')
        divProduct.innerHTML = `
        <h2>Title: ${product.title}</h2>
        <p>Category: ${product.category.name}</p>
        <p>Price: $${product.price}</p>
        <p>Description: ${product.description}</p>
        <img src=" ${product.images}" alt="">
        <button id="add${product.id}" class="cartButton">+ Add to cart</button>
        `
        div.appendChild(divProduct)

        let cartButton = document.getElementById(`add${product.id}`)
        cartButton.addEventListener('click',() => {
            addToCart(product.id)
            console.log(cart)
        })

    })

    const addToCart = (productId)=>{
        const exist = cart.some(product => product.id === productId)

        if(exist){
            
            
        }else{
            const item = products.find((product) => product.id === productId)
            cart.push(item)
        }
        updateCart() 
    }

})
.catch(error => console.error(error))







previousPageButton.addEventListener('click',()=>{
    pageCounter -= 10
    if(pageCounter > 10){
        fetchData(`${API}?offset=${pageCounter}&limit=10`)
        .then(response => response.json())
        .then(products => {

            div.innerHTML = ''

            products.map((product)=>{

                const divProduct = document.createElement('div')
                divProduct.classList.add('product')


                divProduct.innerHTML = `
                <h2>Title: ${product.title}</h2>
                <p>Category: ${product.category.name}</p>
                <p>Price: $${product.price}</p>
                <p>Description: ${product.description}</p>
                <img src=" ${product.images}" alt="">
                <button id="add${product.id}" class="cartButton">+ Add to cart</button>
                `
                div.appendChild(divProduct)
        
                let cartButton = document.getElementById(`add${product.id}`)
                cartButton.addEventListener('click',() => {
                    addToCart(product.id)
                    console.log(cart)
                })
            })
            
            const addToCart = (productId)=>{
                const item = products.find((product) => product.id === productId)
                cart.push(item) 
            }

        })
        .catch(error => console.error(error))

    }else if(pageCounter < 10){
        div.innerHTML = `<h2>You can't go back any more. There is nothing to see here</h2>`
    }
})



nextPageButton.addEventListener('click',()=>{
    pageCounter += 10
    fetchData(`${API}?offset=${pageCounter}&limit=10`)
    .then(response => response.json())
    .then(products => {

        div.innerHTML = ''

        products.map((product)=>{

            const divProduct = document.createElement('div')
            divProduct.classList.add('product')


            divProduct.innerHTML = `
            <h2>Title: ${product.title}</h2>
            <p>Category: ${product.category.name}</p>
            <p>Price: $${product.price}</p>
            <p>Description: ${product.description}</p>
            <img src=" ${product.images}" alt="">
            <button id="add${product.id}" class="cartButton">+ Add to cart</button>
            `
            div.appendChild(divProduct)
    
            let cartButton = document.getElementById(`add${product.id}`)
            cartButton.addEventListener('click',() => {
                addToCart(product.id)
                console.log(cart)
            })
        })

        const addToCart = (productId)=>{
            const item = products.find((product) => product.id === productId)
            cart.push(item)  
        }

    })
    .catch(error => console.error(error))
})



