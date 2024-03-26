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
        return product.name.toLowerCase().startsWith(searchText.toLowerCase());
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
            Prize: ${el.prize.toFixed()} <br>
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
            </select><br>
            <button class = "pro-button">Add to Cart</button>
            </div>
            </div>`
        // ul.append(para);

        const addToCartButton = para.querySelector('.pro-button');
        const quantityDropdown = para.querySelector('.quantity-dropdown');

        const existingCartItem = cart.find(item => item.name === el.name);
        if (existingCartItem) {
            quantityDropdown.value = existingCartItem.quantity;
        } else {
            quantityDropdown.value = 1;
        }
        // console.log(addToCartButton);

        quantityDropdown.addEventListener('change', () => {
            const selectedQuantity = parseInt(quantityDropdown.value);
            updateCartQuantity(el.name, selectedQuantity);
        });

        addToCartButton.addEventListener('click', () => {
            const selectedQuantity = parseInt(quantityDropdown.value);

            if (!isProductInCart(el.name)) {
                alertify.confirm(
                    "Confirmation",
                    "Are you sure you want to add this product to the cart?",
                    function () {
                        addToCart(el, selectedQuantity);
                        alertify.success("Product Added Successfully.");
                    },
                    function () {
                        alertify.error("Product not added to the cart.");
                    }
                );
            } else {
                alertify.dialog('alert').set({transition:'zoom',message: 'Product is Already in the cart'}).show(); 
            }
        });

        ul.append(para);
    });
}

function isProductInCart(productName) {
    return cart.some(item => item.name === productName);
}

let addedCart = document.getElementById("added-cart");

function addToCart(prod, selectedQuantity) {
    const present = cart.some(item => item.name === prod.name)
    if (!present) {
        if (cart.length === 0) {
            addedCart.innerHTML = "Added Products";
        }

        if (typeof prod.quantity === "undefined") {
            prod.quantity = 0;
        }

        prod.quantity = selectedQuantity;
        // prod.prize = selectedQuantity;
        cart.push(prod);
        totPrize += prod.prize;

        prod.imageDis = prod.image;

        count += selectedQuantity;
        updateCounter();

        const totalPrize = document.getElementById("total-prize");
        totalPrize.innerHTML = `Total Prize: ${totPrize.toFixed(2)}`;

        // console.log(`${prod.name} Added...`);       
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML =
            `<div class="cart-item-details">
        <img src="${prod.image}" alt="${prod.name}" class="cart-item-image">
        <div class="cart-item-text">
        <span>${prod.name}</span><br>
        <div class="quantity-counter">
        <button class="decrement-quantity">-</button>
        <span class="item-quantity">${prod.quantity}</span>
        <button class="increment-quantity">+</button>
      </div>
      <span class="item-total">${prod.prize * prod.quantity}</span>
      </div>
        </div>
      <button class="delete-button">Delete</button>`;

        const deleteButton = cartItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            removeFromCart(prod.name);
        });

        const decrementButton = cartItem.querySelector(".decrement-quantity");
        const incrementButton = cartItem.querySelector(".increment-quantity");
        const quantityItem = cartItem.querySelector(".item-quantity");
        const totalItem = cartItem.querySelector(".item-total");

        decrementButton.addEventListener("click", () => {
            if (prod.quantity > 1) {
                prod.quantity -= 1;
                quantityItem.innerHTML = prod.quantity;
                totalItem.innerHTML = prod.prize * prod.quantity;
                updateTotalPrice();
                updateCounter();
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        });

        incrementButton.addEventListener("click", () => {
            prod.quantity += 1;
            quantityItem.innerHTML = prod.quantity;
            totalItem.innerHTML = prod.prize * prod.quantity;
            updateTotalPrice();
            updateCounter();
            localStorage.setItem('cart', JSON.stringify(cart));
        });

        document.getElementById("added-cart").append(cartItem);

        TotalCount();

        updateTotalPrice();
        localStorage.setItem('cart', JSON.stringify(cart));


    } else {
        alert("Product is already in the cart");
    }

    const totalPrize = document.getElementById("total-prize");
    totalPrize.innerHTML = `Total Prize: ${totPrize}`;
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
            cart.forEach((product) => {
                const initialQuantity = product.quantity;
                product.quantity = initialQuantity;
            });
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
          <span>${product.name}</span><br>
          <div class="quantity-counter">
          <button class="decrement-quantity">-</button>
          <span class="item-quantity">${product.quantity}</span>
          <button class="increment-quantity">+</button>
        </div>
        <span class="item-total">${product.prize * product.quantity}</span>
          </div>
          </div>
          <button class="delete-button">Delete</button>`;

            const decrementButton = cartItem.querySelector(".decrement-quantity");
            const incrementButton = cartItem.querySelector(".increment-quantity");
            const quantityItem = cartItem.querySelector(".item-quantity");
            const totalItem = cartItem.querySelector(".item-total");

            decrementButton.addEventListener("click", () => {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                    quantityItem.innerHTML = product.quantity;
                    totalItem.innerHTML = product.prize * product.quantity;
                    updateTotalPrice();
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            });

            incrementButton.addEventListener("click", () => {
                product.quantity += 1;
                quantityItem.innerHTML = product.quantity;
                totalItem.innerHTML = product.prize * product.quantity;
                updateTotalPrice();
                localStorage.setItem('cart', JSON.stringify(cart));
            });

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
    // count = cart.length;
    // updateCounter();
    const counter = document.getElementById("counter");
    count = cart.reduce((total, product) => total + product.quantity, 0);
    counter.innerHTML = `Total Products: ${count}`;
    updateCounter();
}

function updateCounter() {
    count = cart.reduce((total, product) => total + product.quantity, 0);
    const counter = document.getElementById("counter");
    counter.innerHTML = `Total Products: ${count}`;
}

function updateTotalPrice() {
    totPrize = cart.reduce((total, product) => total + (product.prize * product.quantity), 0);
    const totalPrizeEle = document.getElementById("total-prize");
    totalPrizeEle.innerHTML = `Total Prize: ${totPrize}`;
    TotalCount();
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
    addedCart.textContent = "No Products Added";
}