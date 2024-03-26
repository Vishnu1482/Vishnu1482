// Slider 1

const imageSlider = document.querySelector('.image-slider');
const imageItems1 = document.querySelectorAll('.image-slider > *');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const image1Length = imageItems1.length;
let currentIndex = 0;
let perView1 = 4;
let totalScrolling = 0;
const delaying = 2000;
let autoScrolling;

function updatePerView() {
    if (window.innerWidth <= 768) {
        perView1 = 1;
    } else {
        perView1 = 4;
    }
}

updatePerView();

imageSlider.style.setProperty('--per-view1', perView1);

for (let i = 0; i < perView1; i++) {
    imageSlider.insertAdjacentHTML('beforeend', imageItems1[i].outerHTML);
}

function scrollingFun() {
    totalScrolling++;
    if (totalScrolling == image1Length + 1) {
        totalScrolling = 1;
        imageSlider.style.transition = '0s';
        imageSlider.style.left = '0';
    }
    const widthElement = document.querySelector('.image-slider > :first-child').offsetWidth + 24;
    imageSlider.style.left = `-${totalScrolling * widthElement}px`;
    imageSlider.style.transition = '.3s';
    currentIndex = totalScrolling - 1;
}

function updateSliderPosition() {
    const widthElement = imageItems1[0].offsetWidth + 24;
    const newPosition = -currentIndex * widthElement;
    imageSlider.style.left = `${newPosition}px`;
}

autoScrolling = setInterval(scrollingFun, delaying);
window.addEventListener('resize', () => {
    updatePerView();
    imageSlider.style.setProperty('--per-view1', perView1);
});


// Counters

const factItem = document.getElementsByClassName("facts");
const increment = [];

function itemFunction() {
    for (let i = 0; i < factItem.length; i++) {
        increment.push(1);
        // console.log(increment);
        if (increment[i] != factItem[i].getAttribute("max-data")) {
            increment[i]++;
        }
        factItem[i].innerHTML = increment[i];
    }
}
setInterval(itemFunction, 1);

const fun = document.getElementById("page4");
window.onscroll = function () {
    let time = setInterval(() => {
        let topEle = fun.offsetTop;
        let botEle = fun.offsetTop + fun.clientHeight;
        let topScreen = window.scrollY;
        let botScreen = window.scrollY + window.innerHeight;

        if (botScreen > topEle && topScreen < botEle) {
            itemFunction();
        } else {
            clearInterval(time);
        }
    }, 1);
}


// Add to Cart
 
let cartItems = [];
let totalCost = 0;

document.addEventListener('DOMContentLoaded', () => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
  const storedTotalCost = parseFloat(localStorage.getItem('totalCost'));

  if (storedCartItems && !isNaN(storedTotalCost)) {
    cartItems = storedCartItems;
    totalCost = storedTotalCost;
    displayCart();
  }
});

const addToCartButtons = document.querySelectorAll('.book');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.parentElement.parentElement.parentElement.querySelector('#carthead').textContent;
    const itemPrice = parseFloat(button.parentElement.parentElement.parentElement.querySelector('#cartprice').textContent.replace('$', ''));
    addToCart(itemName, itemPrice);
  });
});

function addToCart(itemName, itemPrice) {
  const existingProduct = cartItems.find((product) => product.name === itemName);
  if (existingProduct) {
    const alreadyAddedModal = new bootstrap.Modal(document.getElementById('AlreadyAddedModal'));
    alreadyAddedModal.show();
    return;
  }
  cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
  const productAddedModal = new bootstrap.Modal(document.getElementById('productAddedModal'));
  productAddedModal.show();
  totalCost += itemPrice;
  displayCart();
  updateCartInLocalStorage();
}

function updateCartInLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('totalCost', totalCost.toString());
}

function displayCart() {
  const cartListElement = document.getElementById('addlist');
  const totalItemCountElement = document.getElementById('tcount');
  const totalCostElement = document.getElementById('tcost');

  cartListElement.innerHTML = '';
  let totalCount = 0;

  cartItems.forEach((item, index) => {
    const ditemElement = document.createElement('div');
    const itemElement = document.createElement('li');
    ditemElement.className = 'cartlist';
    itemElement.textContent = `${item.name} - $${item.price}`;
    itemElement.className = 'productname';

    const quantityElement = document.createElement('input');
    quantityElement.type = 'number';
    quantityElement.value = item.quantity;
    quantityElement.min = 1;
    quantityElement.className = 'quantity';
    quantityElement.addEventListener('change', (event) => {
      const newQuantity = parseInt(event.target.value);
      if (!isNaN(newQuantity) && newQuantity >= 0) {
        const priceDifference = (newQuantity - item.quantity) * item.price;
        totalCost += priceDifference;
        cartItems[index].quantity = newQuantity;
        displayCart();
      }
    });

    const delButton = document.createElement('button');
    delButton.textContent = 'Delete';
    delButton.className = 'delbutt';

    delButton.addEventListener('click', () => {
      const itemPrice = cartItems[index].price * cartItems[index].quantity;
      totalCost -= itemPrice;
      cartItems.splice(index, 1);
      displayCart();
    });

    ditemElement.appendChild(itemElement);
    ditemElement.appendChild(quantityElement);
    ditemElement.appendChild(delButton);
    cartListElement.appendChild(ditemElement);

    totalCount += item.quantity;
  });

  totalItemCountElement.textContent = `Total count: ${totalCount}`;
  totalCostElement.textContent = `Total cost: $${totalCost.toFixed(2)}`;

  updateCartInLocalStorage();

  const totalCount1 = cartItems.reduce((total, item) => total + item.quantity, 0);

  totalItemCountElement.textContent = `Total count: ${totalCount1}`;
  totalCostElement.textContent = `Total cost: $${totalCost.toFixed(2)}`;

  updateCartCount(totalCount);
  updateCartInLocalStorage();
}

function updateCartCount(count) {
    const cartCount = document.getElementById("cart-count");

    cartCount.textContent = count.toString();
}

updateCartCount(cartItems.length);

// Slider 2

{
    const sliders = document.querySelectorAll(".slider");

    const interval = 2800;

    const animDuration = 600;

    for (let i = 0; i < sliders.length; i++) {
        const slider = sliders[i];
        const dots = slider.querySelector(".dots");
        const sliderImgs = slider.querySelectorAll(".img");

        let currImg = 0;
        let prevImg = sliderImgs.length - 1;
        let intrvl;
        let timeout;

        for (let i = 0; i < sliderImgs.length; ++i) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dots.appendChild(dot);
            dot.addEventListener("click", dotClick.bind(null, i), false);
        }

        const allDots = dots.querySelectorAll(".dot");
        allDots[0].classList.add("active-dot");

        sliderImgs[0].style.left = "0";
        timeout = setTimeout(() => {
            animateSlider();
            sliderImgs[0].style.left = "";
            intrvl = setInterval(animateSlider, interval);
        }, interval - animDuration);

        function animateSlider(nextImg, right) {
            if (!nextImg)
                nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

            nextImg--;
            sliderImgs[prevImg].style.animationName = "";

            if (!right) {
                sliderImgs[nextImg].style.animationName = "leftNext";
                sliderImgs[currImg].style.animationName = "leftCurr";
            } else {
                sliderImgs[nextImg].style.animationName = "rightNext";
                sliderImgs[currImg].style.animationName = "rightCurr";
            }

            prevImg = currImg;
            currImg = nextImg;

            currDot = allDots[currImg];
            currDot.classList.add("active-dot");
            prevDot = allDots[prevImg];
            prevDot.classList.remove("active-dot");
        }

        function dotClick(num) {
            if (num == currImg)
                return false;

            clearTimeout(timeout);
            clearInterval(intrvl);

            if (num > currImg)
                animateSlider(num + 1);
            else
                animateSlider(num + 1, true);
            // intrvl = setInterval(animateSlider, interval);
        }
    }
}