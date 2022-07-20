const API = `https://api.escuelajs.co/api/v1/products?offset=0&limit=10`

function fetchData(urlApi){
    return fetch(urlApi)
}



fetchData(API)
.then(response => response.json())
.then(products => {
    let div = document.querySelector('.product')
    console.log(products)
    products.map((product)=>{
        div.innerHTML += `
        <div class="product">
            <h2>Title: ${product.title}</h2>
            <p>Category: ${product.category.name}</p>
            <p>Price: $${product.price}</p>
            <p>Description: ${product.description}</p>
            <img src=" ${product.images}" alt="">
        </div>
        `
    })
})