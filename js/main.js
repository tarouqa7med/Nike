
let carousel = document.querySelector(".my-carousel"),
        carousel_inner = document.querySelector(".my-carousel .my-carousel-inner"),
        nextBtn = carousel.querySelector("button.next"),
        prevBtn = carousel.querySelector("button.prev"),
        html = document.querySelector("html"),
        navbar=document.querySelector("nav.navbar");

nextBtn.addEventListener("click", function () {

        let currentCarouselItem = carousel.querySelector(".my-carousel .my-carousel-inner .my-carousel-item.active"),
                nextCarouselItem = currentCarouselItem.nextElementSibling ?? carousel_inner.querySelector(".my-carousel-item:first-child"),
                dataColor = nextCarouselItem.dataset.color;
                
                currentCarouselItem.classList.remove("active");
                nextCarouselItem.classList.add("active");

        colorChanger(dataColor);
        logoChanger(dataColor);
})

prevBtn.addEventListener("click", function () {
        let currentCarouselItem = carousel.querySelector(".my-carousel .my-carousel-inner .my-carousel-item.active"),
                prevCarouselItem = currentCarouselItem.previousElementSibling ?? carousel_inner.querySelector(".my-carousel-item:last-child"),
                dataColor = prevCarouselItem.dataset.color;

        currentCarouselItem.classList.remove("active");
        prevCarouselItem.classList.add("active");
        
        colorChanger(dataColor);
        logoChanger(dataColor);
})

window.addEventListener("scroll", function () {
        
})