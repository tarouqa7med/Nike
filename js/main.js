
let carousel = document.querySelector(".my-carousel"),
        carousel_inner = document.querySelector(".my-carousel .my-carousel-inner"),
        nextBtn = carousel.querySelector("button.next"),
        prevBtn = carousel.querySelector("button.prev"),
        html = document.querySelector("html"),
        navbar = document.querySelector("nav.navbar"),
        navLinks = navbar.querySelectorAll(".nav-item a"),
        sections = document.querySelectorAll("section, header"),
        loadingPage = document.querySelector(".loadingPage"),
        cartArr = [];

if (localStorage.getItem("cartArr") == null) {
        updateLocalStorage();
} else {
        cartArr = JSON.parse(localStorage.getItem("cartArr"));
}

checkScrolled();

nextBtn.addEventListener("click", function () {

        let currentCarouselItem = carousel.querySelector(".my-carousel .my-carousel-inner .my-carousel-item.active"),
                nextCarouselItem = currentCarouselItem.nextElementSibling ?? carousel_inner.querySelector(".my-carousel-item:first-child"),
                dataColor = nextCarouselItem.dataset.color;
                
        currentCarouselItem.classList.remove("active");
        nextCarouselItem.classList.add("active");

        themeChanger(dataColor, dataColor, dataColor);
})

prevBtn.addEventListener("click", function () {
        let currentCarouselItem = carousel.querySelector(".my-carousel .my-carousel-inner .my-carousel-item.active"),
                prevCarouselItem = currentCarouselItem.previousElementSibling ?? carousel_inner.querySelector(".my-carousel-item:last-child"),
                dataColor = prevCarouselItem.dataset.color;

        currentCarouselItem.classList.remove("active");
        prevCarouselItem.classList.add("active");

        themeChanger(dataColor, dataColor, dataColor);
})


window.addEventListener("scroll", function () {
        checkScrolled();

        sections.forEach(function (section) {
                updateNavLink(section.id);
        })
})

navLinks.forEach(function (navLink) {
        navLink.addEventListener("click", function (event) {
                event.preventDefault();

                let currentNavLink = navbar.querySelector(".nav-item a.active"),
                        currentID = navLink.getAttribute("href"),
                        currentSection = document.querySelector(currentID),
                        sectionTop = currentSection.offsetTop;
                
                navLink.classList.add("active")
                currentNavLink.classList.remove("active");

                window.scrollTo(0, sectionTop - navbar.clientHeight);
        })
})

// window.addEventListener("DOMContentLoaded", function () {
//         setTimeout(() => {
//                 loadingPage.classList.add("hide");
//         }, 1500);
//         setTimeout(() => {
//                 loadingPage.classList.add("d-none");
//         }, 2501);
// })

let latestContainer = document.querySelector("#Latest .content");

latest.forEach(function (product) {

        let isProductInCart = checkProductInCart(product.id);
        
        latestContainer.innerHTML += `
                <div class="product mainBorder mb-3 p-4 rounded-3 bg-light" data-selected-size="${(isProductInCart?.size) ?? product.sizes[0]}" data-selected-color="${(isProductInCart?.color) ?? product.colors[0]}" data-product-id='${product.id}'>
                        <div class="row">
                                <div class="col-lg-6 part1 d-flex align-items-center">
                                        <div class="item">
                                                <div class="row">
                                                        <div class="col-lg-2 box1">
                                                                <div class="item">
                                                                        <ul class="list-unstyled d-flex justify-content-center flex-row column-gap-3 flex-lg-column row-gap-lg-2 column-gap -lg-3">
                                                                                ${loadingImages(product.images)}
                                                                        </ul>
                                                                </div>
                                                        </div>
                                                        <div class="col-lg-10 box2">
                                                                <div class="item">
                                                                        <div class="selected-image">
                                                                                <img class="w-100" style="display: block; margin: auto;" src="./images/products/${product.images[0]}" alt="">
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div class="col-lg-6 part2">
                                        <div class="item">
                                                <h2 class="mainColor fs-5">${product.name}</h2>
                                                <p class="fw-light">${product.description}</p>
                                                <div class="price d-flex align-items-center">
                                                        <div class="label fw-bolder fs-6 me-3">Price :</div>
                                                        <div class="value">
                                                                ${loadingPrices(product.price, product.discount, false)}
                                                        </div>
                                                </div>
                                                <div class="size d-flex align-items-center">
                                                        <div class="label fw-bolder fs-6 me-3">Size :</div>
                                                        <div class="value">
                                                                <ul class="list-unstyled d-flex column-gap-2 m-auto">
                                                                        ${loadingSizes(product.sizes, isProductInCart)}
                                                                </ul>
                                                        </div>
                                                </div>
                                                ${(isProductInCart==null) ? `<button class="btn addToCartBtn" onclick="addToCart(${product.id}, this)">Add To Cart</button>` : `<button class="btn addToCartBtn remove" onclick="removeFromCart(${product.id}, this)">Remove From Cart</button>`}
                                        </div>
                                </div>
                        </div>
                </div>
        `;
})

let featuredContainer = document.querySelector("#Featured .content .row");

features.forEach(function (product) {
        featuredContainer.innerHTML += `
                <div class="col-lg-3 mb-4">
                        <div class="item">
                                <div class="product text-center bg-light rounded-3 px-3 py-4">
                                        <p class="discount m-0 w-100 mainBG position-absolute fw-medium ${(product.discount == 0) ? 'd-none' : ''}">${product.discount * -100}%</p>
                                        <div class="head d-flex flex-column justify-content-center align-items-center">
                                                <div class="selected-image">
                                                        <img class="img-fluid" src="./images/products/${product.images[0]}" alt="">
                                                </div>
                                                <i class="fa-solid fa-search cursorPointer search-icon pb-0 mb-3" onclick="openModal('product'); openProduct(${product.id})"></i>
                                                <ul class="list-unstyled d-flex column-gap-2">
                                                        ${loadingLi(product.images)}
                                                </ul>
                                        </div>
                                        <div class="body">
                                                <h4 class="fs-6">Basketball Shoes</h4>
                                                ${loadingPrices(product.price, product.discount, false)}
                                        </div>
                                </div>
                        </div>
                </div>
        `;
})

let modalContainers = document.querySelectorAll(".modal .container");

modalContainers.forEach(function(modalContainer) {
        modalContainer.addEventListener("click", function (event) {
                event.stopPropagation();
        })
})

