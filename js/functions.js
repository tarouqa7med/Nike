
function openModal(modalName) {

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        let modal = document.querySelector(`div[data-modal-name="${modalName}"]`),
                modalContainer = modal.firstElementChild;
        
        document.body.classList.add("no-scroll");
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        navbar.style.paddingRight = `${scrollbarWidth}px`;
        modal.style.paddingRight = `${scrollbarWidth}px`;
        
        modal.classList.add("active"); // firstly, show modal.

        setTimeout(function () {
                modal.classList.add("show");
        }, 1) // wait 1ms to show modal after activating it.
        setTimeout(function() {
                modalContainer.classList.add("show");
        }, 500) // wait another 500ms to show modalContainer after activating modal.
}

function closeModal() {

        let modal = document.querySelector("div.modal.active"),
                modalContainer = modal.firstElementChild;

        modalContainer.classList.remove("show"); //firstly, remove show modalContainer.

        setTimeout(() => {
                modal.classList.remove("show");
                document.body.classList.remove("no-scroll");
                document.body.style.paddingRight = '0px';
                navbar.style.paddingRight = '0px';        
                modal.style.paddingRight = '0px';
        }, 500); // wait 1s to remove show modal.
        setTimeout(() => {
                modal.classList.remove("active");
        }, 1001); // wait another 1s to set modal inactive after hiding it.  
}

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
                li_Images += `<li class="mainBorder rounded-2 p-2 cursorPointer ${(index == 0) ? 'mainBGColoropacity15' : ''}" style="position: relative; width: 75px; height: 75px;"><img class="img-fluid" style="padding: 5px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%;" src="./images/products/${image}" alt="" onclick="changeSelectedImage('${image}', this); changeActiveLiOfImage(this)"></li>`;
        })
        return li_Images;
}

function loadingPrices(price, discount, isProduct) {
        return `<p class="m-auto column-gap-2 ${isProduct ? '' : 'text-center'}">
                        <span class="price mainColor ${(discount == 0) ? 'd-none' : 'text-decoration-line-through'}">${price} <sup>$</sup></span>
                        <span class="newPrice fw-bold">${(price * (1 - discount)).toFixed(2)} <sup>$</sup></span>
                </p>`
}

function loadingSizes(sizesList, isProductInCart = null) {
        
        let li_Sizes = "";

        sizesList.forEach(function (size, index) {
                if (isProductInCart == null) {
                        li_Sizes += `<li class="mainBorder mainColor rounded-2 ${(index == 0) ? 'active' : ''}" onclick="changeActive(this); updateSize('${size}', this)">${size}</li>`;
                } else if (isProductInCart != null) {
                        li_Sizes += `<li class="mainBorder mainColor rounded-2 ${(isProductInCart.size) == size ? 'active' : ''}" onclick="changeActive(this); updateSize('${size}', this)">${size}</li>`;
                }
        })
        return li_Sizes;
}

function loadingColors(colorsList, isProductInCart = null) {

        let li_Colors = "";
        colorsList.forEach(function (color, index) {
                if (isProductInCart == null) {
                        li_Colors += `<li class="mainBorder mainColor rounded-circle ${(index == 0) ? 'active' : ''}"  style="background-color: ${color};" onclick="changeActive(this); updateColor('${color}', this)"></li>`;
                } else if (isProductInCart != null) {
                        li_Colors += `<li class="mainBorder mainColor rounded-circle ${(isProductInCart.color) == color ? 'active' : ''}"  style="background-color: ${color};" onclick="changeActive(this); updateColor('${color}', this)"></li>`;
                }
        })
        return li_Colors;
}

function loadingLi(LiList) {
        
        let li_Buttons = "";
        LiList.forEach(function (li, index) {
                li_Buttons += `<li class="mainButton rounded-circle cursorPointer ${(index == 0) ? 'active' : ''}" onclick="changeSelectedImage('${li}', this); changeActive(this);"></li>`;
        })
        return li_Buttons;
}

function changeActiveLiOfImage(that) {

        ul = that.closest("ul");
        ul.querySelector("li.mainBGColoropacity15").classList.remove("mainBGColoropacity15");
        that.parentElement.classList.add("mainBGColoropacity15")

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

function getProduct(product_id) {
        return products.filter(function (product) {
                return product.id == product_id;
        })[0];
}

function openProduct(product_id) {

        let product = getProduct(product_id),
                productModal = document.querySelector(".dataOfProduct .container"),
                isProductInCart = checkProductInCart(product.id);

        productModal.innerHTML = `
                <div class="product row" data-selected-size="${(isProductInCart?.size) ?? product.sizes[0]}" data-selected-color="${(isProductInCart?.color) ?? product.colors[0]}">
                        <div class="col-lg-6">
                                <div class="item">
                                        <div class="selected-image mainBorder rounded-circle mb-3 mainBGColoropacity05">
                                                <img class="img-fluid" style="display: block; margin: auto" src="./images/products/${product.images[0]}" alt="">
                                        </div>
                                        <ul class="d-flex justify-content-center list-unstyled column-gap-2">
                                                ${loadingImages(product.images)}
                                        </ul>
                                </div>
                        </div>
                        <div class="col-lg-6">
                                <div class="item">
                                        <h3>${product.name}</h3>
                                        <p class="price">
                                                ${loadingPrices(product.price, product.discount, true)}
                                        </p>
                                        <hr>
                                        <p class="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, aspernatur. Eveniet, fugiat recusandae voluptatum odio placeat aperiam impedit architecto quod modi, possimus qui doloremque, vel aut! Eius totam sed numquam.</p>
                                        <div class="size d-flex align-items-center mb-4">
                                                <div class="label fw-bolder fs-6 me-3">Size :</div>
                                                <div class="value">
                                                        <ul class="list-unstyled d-flex column-gap-2 m-auto">
                                                                ${loadingSizes(product.sizes, isProductInCart)}
                                                        </ul>
                                                </div>
                                        </div>
                                        <div class="color d-flex align-items-center mb-4">
                                                <div class="label fw-bolder fs-6 me-3">Color :</div>
                                                <div class="value">
                                                        <ul class="list-unstyled d-flex column-gap-2 m-auto">
                                                                ${loadingColors(product.colors, isProductInCart)}
                                                        </ul>
                                                </div>
                                        </div>
                                        ${(isProductInCart == null) ? `<button class="btn addToCartBtn" onclick="addToCart(${product.id}, this)">Add To Cart</button>` : `<button class="btn addToCartBtn remove" onclick="removeFromCart(${product.id}, this)">Remove From Cart</button>`}
                                </div>
                        </div>
                </div>`;
}

function addToCart(product_id, that) {
        let product = that.closest(".product"),
                newOrder = {
                        id: product_id,
                        size: product.dataset.selectedSize,
                        color: product.dataset.selectedColor
                }
        
        cartArr.push(newOrder);
        updateLocalStorage();
        toggleOrderBtn("remove", that);
        that.setAttribute("onclick", `removeFromCart(${product_id}, this)`);
}

function removeFromCart(product_id, that) {

        cartArr = cartArr.filter(function (product) {
                return product.id != product_id;
        })

        updateLocalStorage();

        if (that != null) {
                toggleOrderBtn("add", that);
                that.setAttribute("onclick", `addToCart(${product_id}, this)`);
        }

}

function toggleOrderBtn(status, btn) {
        if (status == 'add') {
                btn.classList.remove("remove");
                btn.textContent = "Add To Cart";
        } else if (status == 'remove') {
                btn.classList.add("remove");
                btn.textContent = "Remove From Cart";
        }
}

function updateSize(size, that) {
        let product = that.closest(".product");

        product.dataset.selectedSize = size;
}

function updateColor(color, that) {
        let product = that.closest(".product");

        product.dataset.selectedColor = color;
}

function updateLocalStorage() {
        localStorage.setItem("cartArr", JSON.stringify(cartArr));
}

function checkProductInCart(product_id) {
        let result;
        result = cartArr.filter(function (product) {
                return product.id == product_id;
        });
        return result.length == 1 ? result[0] : null;
}

function showCart() {

        let cartContainer = document.querySelector(".modal.shopping-cart .container .content");

        if (cartArr.length == 0) {
                cartContainer.innerHTML = `<p class="alert alert-warning w-100 text-center fs-6 m-auto" style="max-width: 95%">There are no products</p>`;
                document.querySelector(".buyNow").classList.add("d-none");
        } else if (cartArr.length != 0) {
                cartContainer.innerHTML = ``;
                cartArr.forEach(function (cartProduct) {
                        let product = getProduct(cartProduct.id);
                        cartContainer.innerHTML += `
                                <div class="col-lg-4 mb-3">
                                        <div class="item">
                                                <div class="product bg-light rounded-3 px-3" data-product-id="${product.id}">
                                                        <img class="img-fluid d-block m-auto" src="./images/products/${product.images[0]}" alt="">
                                                        <h2 class="name">${product.name.slice(0, 12)}...</h2>
                                                        <div class="price d-flex align-items-center mb-3">
                                                                <div class="label fw-bolder fs-6 me-3">Price :</div>
                                                                <div class="value">
                                                                        ${loadingPrices(product.price, product.discount)}
                                                                </div>
                                                        </div>
                                                        <div class="size d-flex align-items-center mb-3">
                                                                <div class="label fw-bolder fs-6 me-3">Size :</div>
                                                                <div class="value">
                                                                        <ul class="list-unstyled d-flex column-gap-2 m-auto">
                                                                                ${loadingSizes([cartProduct.size])}
                                                                        </ul>
                                                                </div>
                                                        </div>
                                                        <div class="color d-flex align-items-center mb-3">
                                                                <div class="label fw-bolder fs-6 me-3">Color :</div>
                                                                <div class="value">
                                                                        <ul class="list-unstyled d-flex column-gap-2 m-auto">
                                                                                ${loadingColors([cartProduct.color])}
                                                                        </ul>
                                                                </div>
                                                        </div>
                                                        <button class="btn btn-danger mb-3 w-100" onclick="removeFromShop('${product.id}')">Remove</button>
                                                </div>
                                        </div>
                                </div>
                        `
                })
                document.querySelector(".buyNow").classList.remove("d-none");
        }


        openModal('shopping-cart');
}

function removeFromShop(product_id) {
        let productElement = document.querySelector(`.modal.shopping-cart .container .content .product[data-product-id='${product_id}']`);

        productElement.closest(".col-lg-4").remove();
        cartArr = cartArr.filter(function (product) {
                return product.id != product_id;
        })

        let btnOfLatest = document.querySelector(`#Latest .product[data-product-id='${product_id}'] button`);

        removeFromCart(product_id, btnOfLatest)

        if (cartArr.length == 0) {
                let cartContainer = document.querySelector(".modal.shopping-cart .container .content");
                cartContainer.innerHTML = `<p class="alert alert-warning w-100 text-center fs-6 m-auto" style="max-width: 95%">There are no products</p>`;
                document.querySelector(".buyNow").classList.add("d-none");
        }

}