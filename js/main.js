
let carousel = document.querySelector(".my-carousel"),
        carousel_inner = document.querySelector(".my-carousel .my-carousel-inner"),
        nextBtn = carousel.querySelector("button.next"),
        prevBtn = carousel.querySelector("button.prev"),
        html = document.querySelector("html"),
        navbar = document.querySelector("nav.navbar"),
        navLinks = navbar.querySelectorAll(".nav-item a"),
        latestLayout = document.querySelector(".latest .layout"),
        latestImages = latestLayout.querySelectorAll(".products-imgs .row img"),
        featuredLayout = document.querySelector(".featured .layout"),
        sections = document.querySelectorAll("section, header"),
        loadingPage = document.querySelector(".loadingPage");


checkScrolled();
getLatestShoesData()

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

window.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
                loadingPage.classList.add("hide");
        }, 1500);
        setTimeout(() => {
                loadingPage.classList.add("d-none");
        }, 2501);
})