// access //


// access to cart btn
let cartBtn = document.querySelector(".cart");

// access to cartShopping
let cartShopping = document.querySelector(".shopping-cart");

// access to addToCart btns
let addToCart = document.querySelectorAll(".add-to-cart");

// access to cartShopping container
let productContainer = document.querySelector(".product-content");

// access to the all deleteCard btn
let deleteCard;

// access to the clear cart btn
let clearCart = document.querySelector(".clear-cart");







// listeners //


// listener when load page
document.addEventListener("DOMContentLoaded", saveToCartShopping);

// listener click for cartBtn 
cartBtn.addEventListener("click", showCartShopping);

// listener click for every addToCart btn
addToCart.forEach((item,index) => {
    item.addEventListener("click", addCardToCartFn)
})


clearCart.addEventListener("click", clearCartFn)





// function //


// displayCartShopping is none
let  displayCartShopping = "none";
// function show cartShopping when click on cartBtn
function showCartShopping(event) {
    // if displayCartShopping is block
    if (displayCartShopping == "block") {
        displayCartShopping = cartShopping.style.display = "none";

        // if displayCartShopping in none
    }else{
        displayCartShopping = cartShopping.style.display = "block";
    }
}

// get products of local storage function
function getLocalStorageProductsFn() {
    // get local storage products
    let LocalStorageProducts = JSON.parse(localStorage.getItem("products"));

    let products;
    // LocalStorageProducts isn't null
    if (LocalStorageProducts) {
        products = LocalStorageProducts;
    
    // LocalStorageProducts is null
    }else{
        products = [];
    }


    return products;
}



// function add Card To Cart when click on every add to cart btn
function addCardToCartFn(event) {
    // access to event target parent (card)
    let targetClick = event.target.parentElement.parentElement;
    
    // get products of localStorage
    let productsOfLS = getLocalStorageProductsFn();

    // build product for add to local storage
    let product = {
        id: targetClick.dataset.id,
        image: targetClick.querySelector("img").src,
        title: targetClick.querySelector(".card-title").textContent,
        price: targetClick.querySelector(".newPrice span").textContent
    }

    // push product to productsOfLS
    productsOfLS.push(product);

    // save new productsOfLS to local storage
    localStorage.setItem("products", JSON.stringify(productsOfLS));

    
    // call save to cart
    saveToCartShopping();



}

function saveToCartShopping() {
    
    // get products of localStorage
    let productsOfLS = getLocalStorageProductsFn();
    
    // doing null productContainer 
    productContainer.innerHTML = "";

    // loop on all products of localStorage
    productsOfLS.forEach((item, index) => {
        
        // build product for add to productContainer ui
        let product = `
        <tr ${item.id}>
            <td><img src=${item.image} alt=""></td>
            <td>${item.title}</td>
            <td>${item.price} تومان</td>
            <td><a class="delete-card" href="#" data-id="${item.id}">X</a></td>
        </tr>
        `

        // add product to productContainer ui
        productContainer.innerHTML += product;
    })


    // access to the all deleteCard btn
    deleteCard = document.querySelectorAll(".delete-card");
    deleteCard.forEach((item, indexCard) => {
        item.addEventListener("click", function (event) {
            event.target.parentElement.parentElement.remove();
            
            productsOfLS.forEach((item,index) => {
                if (index == indexCard) {
                    productsOfLS.splice(index, 1);
                    
                    localStorage.setItem("products", JSON.stringify(productsOfLS));
                    saveToCartShopping();
                }
            })
        })
    })

}



function clearCartFn(e) {
    productContainer.innerHTML = ""
    localStorage.removeItem("products");
}