
const API = `https://api.escuelajs.co/api/v1/products`

let previousPageButton = document.querySelector('.previousPage')
let nextPageButton = document.querySelector('.nextPage')
let div = document.querySelector('.products')
const cartContainer = document.getElementById('cartContainer')

let pageCounter = 10
let cart = []

function fetchData(urlApi){
    return fetch(urlApi)
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
        const item = products.find((product) => product.id === productId)
        cart.push(item)  
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
        div.innerHTML = `<h2>You can't go back any more. There is nothing to show here</h2>`
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




const updateCart = ()=>{

    cart.map((product) =>{
        const div = document.createElement('div')
        div.className.add('cartProduct')
        div.innerHTML = `
            <h2>Title: ${product.title}</h2>
            <p>Category: ${product.category.name}</p>
            <p>Price: $${product.price}</p>
            <p>Amount: <span id="Amount">${product.amount}</span></p>
            <button onclick="eliminarDelCarrito(${product.id})" class="deleteButton"></button>
        `
    })
}