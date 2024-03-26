const output = document.querySelector('.output');
const ul = document.createElement('ul');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

let count = 0;
let totPrize = 0;
let data = [];
// console.log(output);
output.append(ul);

function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then((loadedData) => {
            data = loadedData;
            console.log(data);
            addtoPage(data);
        })
        .catch(err => {
            console.log("an err occured", err);
        })
}

loadData();

function filterProducts(searchText, products) {
    return products.filter(product => {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
    });

}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    const searchProduct = searchInput.value.trim();
    const filteredProducts = filterProducts(searchProduct, data);
    ul.innerHTML = "";

    if (filteredProducts.length === 0) {
        const noProdMess = document.createElement("div");
        noProdMess.textContent = "No Products found";
        noProdMess.classList.add("not-found");
        ul.append(noProdMess);
    } else {
        addtoPage(filteredProducts);
    }
});

function addtoPage(arr) {
    arr.forEach((el) => {
        // console.log(el);
        const para = document.createElement('div');
        para.classList.add("product")
        para.innerHTML =
            `<div class = "pro-container">
            <div class = "pro-image">
            <img src = "${el.image}" alt="${el.image}"     
            </div> <br> 
            <div class = "text">
            Name: ${el.name} <br>
            Prize: ${el.prize} <br>
            Quantity:
            <select class = "quantity-dropdown">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            <button class = "pro-button">Add to Cart</button>
            </div>
            </div>`
        // ul.append(para);

        const addToCartButton = para.querySelector('.pro-button');
        const quantityDropdown = para.querySelector('.quantity-dropdown');


        console.log(addToCartButton);
        addToCartButton.addEventListener('click', () => {
            // alert("Product Added Successfully")
            const selectedQuantity = parseInt(quantityDropdown.value);
            addToCart(el, selectedQuantity);
        });
        ul.append(para);
    });
}

let addedCart = document.getElementById("added-cart");

function addToCart(prod, selectedQuantity) {
    const present = cart.some(item => item.name === prod.name)
    if (!present) {
        if (cart.length === 0) {
            addedCart.innerHTML = "Added Products";
        }

        prod.quantity = selectedQuantity;
        cart.push(prod);
        totPrize += prod.prize * prod.quantity;

        prod.imageDis = prod.image;

        // console.log(`${prod.name} Added...`);      
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML =
            `<div class="cart-item-details">
            <img src="${prod.image}" alt="${prod.name}" class="cart-item-image">
            <div class="cart-item-text">
            <span>${prod.name} (Quantity: ${prod.quantity}) </span><br>
          <span>${prod.prize * prod.quantity}</span>
          </div>
          </div>
          <button class="delete-button">Delete</button>`;

        const deleteButton = cartItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            removeFromCart(prod.name);
        });

        document.getElementById("added-cart").append(cartItem);

        TotalCount();
    } else {
        alert("Product is already in the cart");
    }

    const totalPrize = document.getElementById("total-prize");
    totalPrize.innerHTML = `Total Prize: ${totPrize}`;

    localStorage.setItem('cart', JSON.stringify(cart));

}

function removeFromCart(productName) {
    const remove = cart.findIndex(prod => prod.name === productName);
    if (remove !== -1) {
        const removedProduct = cart.splice(remove, 1)[0];

        if (!isNaN(removedProduct.prize)) {
            totPrize -= removedProduct.prize * removedProduct.quantity;
            // alert(`${removedProduct.name} has been removed from the cart`);
        }
        DisplayCart();
        TotalCount();
    }
    if (cart.length === 0) {
        const addedCart = document.getElementById("added-cart");
        addedCart.textContent = "No Products Added";
    }

    const totalPrize = document.getElementById("total-prize");
    totalPrize.innerHTML = `Total Prize : ${totPrize}`;

    localStorage.setItem('cart', JSON.stringify(cart));
}

const emptyCart = document.createElement("div")
emptyCart.textContent = "No Products Added"

window.addEventListener("load", () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        TotalCount();

        totPrize = savedCart.reduce((total, product) => total + product.prize, 0);
        const totalPrize = document.getElementById("total-prize");
        totalPrize.innerHTML = `Total Prize: ${totPrize}`;

        if (cart.length > 0) {
            DisplayCart();
        } else {
            const addedCart = document.getElementById("added-cart");
            addedCart.textContent = "No Products Added";
        }
    } else {
        const addedCart = document.getElementById("added-cart");
        addedCart.textContent = "No Products Added";
    }

})

function DisplayCart() {
    const addedCart = document.getElementById("added-cart");
    addedCart.innerHTML = "";

    if (cart.length === 0) {
        addedCart.textContent = "No Products Added";
    } else {
        addedCart.textContent = "Added Products";

        cart.forEach((product) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML =
                `<div class="cart-item-details">
            <img src="${product.imageDis}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-text">
          <span>${product.name} (Quantity: ${product.quantity}) </span><br>
          <span>${product.prize * product.quantity}</span>
          </div>
          </div>
          <button class="delete-button">Delete</button>`;

            const deleteButton = cartItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => {
                removeFromCart(product.name);
            });

            addedCart.append(cartItem);
        });
        // addedCart.innerHTML = "Added Products"
    }
}

function TotalCount() {
    const counter = document.getElementById("counter");
    count = cart.reduce((total, product) => total + product.quantity, 0);
    counter.innerHTML = `Total Products: ${count}`;
}

const removeButton = document.getElementById("btn-remove");

removeButton.addEventListener("click", () => {
    // removeFromCart(el.name);
    clearCart();
})

function clearCart() {
    cart = [];
    totPrize = 0;
    DisplayCart();
    TotalCount();

    const totalPrize = document.getElementById("total-prize");
    totalPrize.innerHTML = `Total Prize: ${totPrize}`;

    localStorage.setItem('cart', JSON.stringify(cart));
    const addedCart = document.getElementById("added-cart");
    addedCart.textContent = "No Products Added";
}