
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

        let correctLogoImages = document.querySelectorAll(".heading img");
        
        correctLogoImages.forEach(function (correctLogoImage) {

                correctLogoImageSrc = correctLogoImage.src;

                let correctLogoImageArr = correctLogoImageSrc.split('/');
        
                correctLogoImageArr[correctLogoImageArr.length - 1] = `${correct}-correct.png`;
                
                newImageSrc = correctLogoImageArr.join("/");
                
                correctLogoImage.setAttribute("src", newImageSrc);
        })

}

function themeChanger(color, logo, correct) {

        colorChanger(color);
        logoChanger(logo);
        correctLogoChanger(correct);

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

function loadingImages(imagesList) {

        let li_Images = "";
        imagesList.forEach(function (image, index) {
                li_Images += `<li class="mainBorder rounded-2 p-2 ${(index == 0) ? 'mainBGColoropacity25' : ''}"><img class="img-fluid" src="./images/products/${image}" alt="" onclick="changeSelectedImage('${image}', this); changeActiveLiOfImage(this)"></li>`;
        })
        return li_Images;
}

function loadingPrices(price, discount) {
        return `<p class="m-auto column-gap-2 text-center">
                        <span class="price mainColor ${(discount == 0) ? 'd-none' : 'text-decoration-line-through'}">${price} <sup>$</sup></span>
                        <span class="newPrice fw-bold">${(price * (1 - discount)).toFixed(2)} <sup>$</sup></span>
                </p>`
}

function loadingSizes(sizesList) {

        let li_Sizes = "";
        sizesList.forEach(function (size, index) {
                li_Sizes += `<li class="mainBorder mainColor rounded-2 ${(index == 0) ? 'active' : ''}">${size}</li>`;
        })
        return li_Sizes;
}

function loadingLi(LiList) {
        
        let li_Buttons = "";
        LiList.forEach(function (li, index) {
                li_Buttons += `<li class="mainButton rounded-circle ${(index == 0) ? 'active' : ''}" onclick="changeSelectedImage('${li}', this); changeActive(this);"></li>`;
        })
        return li_Buttons;
}

function changeActiveLiOfImage(that) {

        ul = that.closest("ul");
        ul.querySelector("li.mainBGColoropacity25").classList.remove("mainBGColoropacity25");
        that.parentElement.classList.add("mainBGColoropacity25")

}

function changeSelectedImage(imageName, that) {

        let selectedImage = that.closest(".product").querySelector(".selected-image img"),
                selectedImageSrc = selectedImage.src;

        let selectedImageSrcArr = selectedImageSrc.split("/");
        selectedImageSrcArr[selectedImageSrcArr.length - 1] = imageName;
        
        let newSelectedImageSrc = selectedImageSrcArr.join("/");

        selectedImage.setAttribute("src", newSelectedImageSrc)
}

function changeActive(that) {

        let liActive = that.parentElement.querySelector("li.active");
        liActive.classList.remove("active");
        that.classList.add("active");
}