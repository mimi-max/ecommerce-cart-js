export function insertProducts(products) {
    //console.log(products)
    const productContainerElement = document.querySelector(".product-items");
    products.forEach((product) => {
        productContainerElement.innerHTML += `
        <div class="product">
            <div class="product-image-container">
                <img class="product-image" src=${product.image} alt="">
                <button class="add-btn" id=${product.id}>Add to cart</button>
            </div>
            <div class="product-down-description">
                <h1 class="product-name"> ${product.nom}<br /> <span class="vignoble"> Family
                        Vignards</span>
                </h1>
                <span class="separator"></span>
                <h3 class="item-price"> ${product.prix}€ TTC</h3>
            </div>
        </div>`
    })
    
}