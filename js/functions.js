
function colorChanger(color) {

        let currentColor = getComputedStyle(html).getPropertyValue(`--${color}Color`);

        html.style.setProperty("--mainColor", currentColor);

        // navbarLogoImage.setAttribute("src", `./images/${color}-logo.png`);
        // logoIcon.setAttribute("src", `./images/${color}-logo.png`);
}

function logoChanger(logo) {

        let navbarLogoImage = document.querySelector(".navbar-brand img"),
                navbarLogoImageSrc = navbarLogoImage.src;
        
        let navbarLogoImageArr = navbarLogoImageSrc.split('/');

        navbarLogoImageArr[navbarLogoImageArr.length - 1] = `${logo}-logo.png`;
        
        newImageSrc = navbarLogoImageArr.join("/");
        
        navbarLogoImage.setAttribute("src", newImageSrc);
}

function correctLogoChanger(correct) {

        let correctLogoImage = document.querySelector(".heading img"),
                correctLogoImageSrc = correctLogoImage.src;
        
        let correctLogoImageArr = correctLogoImageSrc.split('/');

        correctLogoImageArr[correctLogoImageArr.length - 1] = `${correct}-correct.png`;
        
        newImageSrc = correctLogoImageArr.join("/");
        
        correctLogoImage.setAttribute("src", newImageSrc);

}

function themeChanger(color, logo, correct) {

        colorChanger(color);
        logoChanger(logo);
        correctLogoChanger(correct);

}

function getLatestShoesData() {

        for (let index = 0; index < latest.length; index++) {

                let newPriceAfterDiscount = latest[index].price * (1 - latest[index].discount),
                        imageIndex = 0, sizeIndex = 0;

                latestLayout.innerHTML += `<div class="col">
                                <div class="item p-4">
                                        <div class="div1 w-50 h-100">
                                                <div class="products-imgs">
                                                        <div class="row">
                                                                <img src="./images/Products/${latest[index].images[imageIndex++]}" alt="" data-image-number="1">
                                                        </div>
                                                        <div class="row">
                                                                <img src="./images/Products/${latest[index].images[imageIndex++]}" alt="" data-image-number="2">
                                                        </div>
                                                        <div class="row">
                                                                <img src="./images/Products/${latest[index].images[imageIndex++]}" alt="" data-image-number="3">
                                                        </div>
                                                        <div class="row">
                                                                <img src="./images/Products/${latest[index].images[imageIndex++]}" alt="" data-image-number="4">
                                                        </div>
                                                </div>
                                                <img src="./images/Products/${latest[index].images[0]}" alt="">
                                        </div>
                                        <div class="div2 w-50 h-100">
                                                <h4>${latest[index].name}</h4>
                                                <p class="description">${latest[index].description}</p>
                                                <div class="price">
                                                        <p>Price :</p>
                                                        <p>${latest[index].price} <sup>$</sup></p>
                                                        <p>${newPriceAfterDiscount} <sup>$</sup></p>
                                                </div>
                                                <div class="size">
                                                        <p>Size :</p>
                                                        <ul class="list-unstyled">
                                                                <li>
                                                                        <button>${latest[index].sizes[sizeIndex++]}</button>
                                                                </li>
                                                                <li>
                                                                        <button>${latest[index].sizes[sizeIndex++]}</button>
                                                                </li>
                                                                <li>
                                                                        <button>${latest[index].sizes[sizeIndex++]}</button>
                                                                </li>
                                                                <li>
                                                                        <button>${latest[index].sizes[sizeIndex++]}</button>
                                                                </li>
                                                        </ul>
                                                </div>
                                                <button class="btn py-2 px-3 addToCartBtn">Add To Cart</button>
                                        </div>
                                </div>
                        </div>`;
                imageIndex = 0;
                sizeIndex = 0;
        }
}

function ChangeViewedImage(imageNumber) {
        imageNumber = document.querySelector(`.latest .row img[data-image-number="${imageNumber}"]`);
        console.log(imageNumber)
}

function checkScrolled() {
        if (window.scrollY >= 10) {
                navbar.classList.add("scrolled");
        } else {
                navbar.classList.remove("scrolled");
        }
}

function updateActiveLink() {

        let currentNavLink = navbar.querySelector(".nav-item a.active"),
                currentID = navLink.getAttribute("href"),
                currentSection = document.querySelector(currentID),
                sectionTop = currentSection.offsetTop;
        
        currentNavLink.classList.remove("active");
        navLink.classList.add("active");

        return sectionTop;
}

function updateNavLink(section_ID) {

        let section = document.querySelector(`#${section_ID}`),
                sectionTop = section.offsetTop - navbar.clientHeight,
                sectionHieght = section.clientHeight,
                sectionBTM = sectionTop + sectionHieght;

        if (window.scrollY >= sectionTop && window.scrollY <= sectionBTM) {
                let sectionID = section.getAttribute("id"),
                        navLinkOfSection = document.querySelector(`a[href="#${sectionID}"]`),
                        currentActiveLink=document.querySelector(".nav-item a.active");
                
                currentActiveLink.classList.remove("active");
                navLinkOfSection.classList.add("active");
        }
}