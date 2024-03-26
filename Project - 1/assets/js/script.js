const imageWrapper = document.querySelector('.image-wrapper');
const imageItems = document.querySelectorAll('.image-wrapper > *');
const dots = document.querySelectorAll('.dot');
const imageLength = imageItems.length;
let perView = calculatePerView();
let totalScroll = 0;
const delay = 2000;


function updateActiveDot() {
    dots.forEach((dot, index) => {
        if (index === totalScroll % imageLength) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function scrollToSlide(slideIndex) {
    totalScroll = slideIndex;
    const widthEl = document.querySelector('.image-wrapper > :first-child').offsetWidth + 24;
    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
    imageWrapper.style.transition = '.3s';

    updateActiveDot();
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        scrollToSlide(index);
    });
});

function calculatePerView() {
    if (window.innerWidth <= 768) {
        return 1;
    } else {
        return 3;
    }
}

window.addEventListener('resize', () => {
    perView = calculatePerView();

    imageWrapper.style.setProperty('--per-view', perView);
    scrollToSlide(totalScroll % imageLength);
});

imageWrapper.style.setProperty('--per-view', perView);
for (let i = 0; i < perView; i++) {
    imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML);
}

let autoScroll = setInterval(scrolling, delay);

function scrolling() {
    totalScroll++;
    if (totalScroll == imageLength + 1) {
        clearInterval(autoScroll);
        totalScroll = 1;
        imageWrapper.style.transition = '0s';
        imageWrapper.style.left = '0';
        autoScroll = setInterval(scrolling, delay);
    }
    const widthEl = document.querySelector('.image-wrapper > :first-child').offsetWidth + 24;
    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
    imageWrapper.style.transition = '.3s';

    updateActiveDot();
}
updateActiveDot();

// 

const allCon = document.getElementById("allmoves-content");
const actionCon = document.getElementById("action-content");
const horrorCon = document.getElementById("horror-content");
const romanCon = document.getElementById("romantic-content");
const contentArray = [allCon, actionCon, horrorCon, romanCon];
let currentIndex1 = 0;

function updateActiveContent() {
    contentArray.forEach((content, index) => {
        if (index === currentIndex1) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
}

document.getElementById("prevButton").addEventListener("click", function () {
    currentIndex1 = (currentIndex1 - 1 + contentArray.length) % contentArray.length;
    updateActiveContent();
});

document.getElementById("nextButton").addEventListener("click", function () {
    currentIndex1 = (currentIndex1 + 1) % contentArray.length;
    updateActiveContent();
});

function allmovieFunc() {
    allCon.classList.add("active");
    actionCon.classList.remove("active");
    horrorCon.classList.remove("active");
    romanCon.classList.remove("active");
}

function actionFunc() {
    allCon.classList.remove("active");
    actionCon.classList.add("active");
    horrorCon.classList.remove("active");
    romanCon.classList.remove("active");
}

function horrorFunc() {
    allCon.classList.remove("active");
    actionCon.classList.remove("active");
    horrorCon.classList.add("active");
    romanCon.classList.remove("active");
}

function romanceFunc() {
    allCon.classList.remove("active");
    actionCon.classList.remove("active");
    horrorCon.classList.remove("active");
    romanCon.classList.add("active");
}

document.getElementById("prevButton").addEventListener("click", function (event) {
    event.preventDefault();
    currentIndex = (currentIndex - 1 + contentArray.length) % contentArray.length;
    updateActiveContent();
});

document.getElementById("nextButton").addEventListener("click", function (event) {
    event.preventDefault();
    currentIndex = (currentIndex + 1) % contentArray.length;
    updateActiveContent();
});

// 

const imageSlider = document.querySelector('.image-slider');
const imageItems1 = document.querySelectorAll('.image-slider > *');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const image1Length = imageItems1.length;
let currentIndex = 0;
let perView1 = 3;
let totalScrolling = 0;
const delaying = 2000;
let autoScrolling;

function updatePerView() {
    if (window.innerWidth <= 768) {
        perView1 = 1; 
    } else {
        perView1 = 3;
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

//

const imageCarousel = document.querySelector('.image-carousel')
const imageItems2 = document.querySelectorAll('.image-carousel > *')
const image2 = document.querySelectorAll("image-container")
const imageLength2 = imageItems2.length
let perView2 = 3
let totalScrolled = 0
const delayed = 2000

function updatePerViewMd() {
    if (window.innerWidth <= 768) {
        perView2 = 1;
    } else {
        perView2 = 3;
    }
    imageCarousel.style.setProperty('--per-view2', perView2);
}

updatePerViewMd();

window.addEventListener('resize', updatePerViewMd);

imageCarousel.style.setProperty('--per-view2', perView2)

for (let i = 0; i < perView2; i++) {
    imageCarousel.insertAdjacentHTML('beforeend', imageItems2[i].outerHTML)
}

let autoScrolled = setInterval(scrolledFun, delayed)

function scrolledFun() {
    totalScrolled++
    if (totalScrolled == imageLength2 + 1) {
        clearInterval(autoScrolled)
        totalScrolled = 1
        imageCarousel.style.transition = '0s'
        imageCarousel.style.left = '0'
        autoScrolled = setInterval(scrolledFun, delayed)
    }
    const widthElem = document.querySelector('.image-wrapper > :first-child').offsetWidth + 24
    imageCarousel.style.left = `-${totalScrolled * widthElem}px`
    imageCarousel.style.transition = '.3s'
}

// 

const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById('search-container');

searchButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (searchContainer.style.display === 'none' || searchContainer.style.display === '') {
        searchContainer.style.display = 'block';
    } else {
        searchContainer.style.display = 'none';
    }
});

const bellIcon = document.getElementById('bell-icon');
const notificationMessage = document.getElementById('notification-message');

bellIcon.addEventListener('click', () => {
    console.log('Icon clicked');
    
    if (notificationMessage.style.display === 'block') {
        notificationMessage.style.display = 'none';
    } else {
        notificationMessage.style.display = 'block';
    }
});
