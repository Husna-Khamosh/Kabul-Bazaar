let cart = JSON.parse(localStorage.getItem("cart")) || [];

const uniqueCart = [];

cart.forEach(function(product) {

    const quantity = Number(product.quantity) || 1;

    const existingProduct = uniqueCart.find(function(item) {
        return item.name === product.name;
    });

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        uniqueCart.push({
            ...product,
            quantity: quantity
        });
    }

});

cart = uniqueCart;

localStorage.setItem("cart", JSON.stringify(cart));

document.addEventListener("click", function(event) {

    const button = event.target.closest(".add-to-cart");

    if (!button) {
        return;
    }

    const product = button.closest(
        ".popluar-week-cart, .popular-week-cart, .product-cart, .product-details-container"
    );

    if (!product) {
        alert("Product card not found!");
        return;
    }

    const productNameElement = product.querySelector(".product-name");
    const productPriceElement = product.querySelector(".product-price");
    const productImageElement = product.querySelector("img");

    if (!productNameElement || !productPriceElement || !productImageElement) {
        alert("Product information not found!");
        return;
    }

    const productName = productNameElement.textContent.trim();

    const productPrice = Number(
        productPriceElement.textContent.replace(/[^\d.]/g, "")
    );

    const productImage = productImageElement.src;

    const existingProduct = cart.find(function(item) {
        return item.name === productName;
    });

    if (existingProduct) {

        existingProduct.quantity = (Number(existingProduct.quantity) || 1) + 1;

        alert(productName + " quantity increased in cart!");

    } else {

        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            description: "",
            quantity: 1
        });

        alert(productName + " added to cart!");

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();

});

function showCart() {

    const cartContainer = document.querySelector(".kabul-items");
    const productTemplate = document.querySelector("#cart-product-template");

    if (!cartContainer || !productTemplate) {
        updateSummary();
        return;
    }

    cartContainer.querySelectorAll(".cart-product").forEach(function(product) {
        product.remove();
    });

    cart.forEach(function(product, index) {

        const productElement = productTemplate.content.cloneNode(true);
        const productCard = productElement.querySelector(".cart-product");

        const productImage = productCard.querySelector(".product-small-image img");

        productImage.src = product.image;
        productImage.alt = product.name;

        productCard.querySelector(".cart-product-info h4").textContent =
            product.name;

        productCard.querySelector(".cart-product-info p").textContent =
            product.description || "";

        const quantity = Number(product.quantity) || 1;

        productCard.dataset.index = index;

        productCard.querySelector(".quantity span").textContent = quantity;

        productCard.querySelector(".cart-product > strong").textContent =
            "AFN " + (Number(product.price) * quantity).toLocaleString();

        const removeButton = productCard.querySelector(".remove-cart-product");

        if (removeButton) {
            removeButton.dataset.index = index;
        }

        cartContainer.appendChild(productElement);

    });

    updateSummary();
}


document.addEventListener("click", function(event) {

    const removeButton = event.target.closest(".remove-cart-product");

    if (!removeButton) {
        return;
    }

    const index = Number(removeButton.dataset.index);

    if (!Number.isInteger(index) || index < 0 || index >= cart.length) {
        return;
    }

    const removedProduct = cart[index];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();

    alert(removedProduct.name + " removed from cart!");

});


document.addEventListener("click", function(event) {

    const qtyButton = event.target.closest(".quantity button");

    if (!qtyButton) {
        return;
    }

    const card = qtyButton.closest(".cart-product");

    if (!card) {
        return;
    }

    const index = Number(card.dataset.index);
    const item = cart[index];

    if (!item) {
        return;
    }

    item.quantity = Number(item.quantity) || 1;

    if (qtyButton.textContent.trim() === "+") {

        item.quantity++;

    } else if (item.quantity > 1) {

        item.quantity--;

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();

});

function updateSummary() {
const DELIVERY = 400;
const count = cart.reduce(function (sum, p) {
return sum + (p.quantity || 1);
}, 0);
const itemsPrice = cart.reduce(function (sum, p) {
return sum + Number(p.price) * (p.quantity || 1);
}, 0);
const total = count > 0 ? itemsPrice + DELIVERY : 0;
const money = function (n) { return "AFN " + n.toLocaleString(); };
document.querySelectorAll(".cart-amount").forEach(function (el) {
el.textContent = count;
});
const title = document.querySelector("#cart-title");
if (title) title.textContent = "Your Cart. " + count + " items";
const label = document.querySelector("#items-label");
if (label) label.textContent = "Items (" + count + ")";
const price = document.querySelector("#items-price");
if (price) price.textContent = money(itemsPrice);
const shopTotal = document.querySelector("#shop-total");
if (shopTotal) shopTotal.textContent = money(itemsPrice);
const totalEl = document.querySelector("#cart-total");
if (totalEl) totalEl.textContent = money(total);
}



showCart();


// product json file codes
const productContainer = document.querySelector(".product-carts");

if (productContainer) {

    // this section is belong to category menu 
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");
    console.log(selectedCategory);

    //this section is belong to getting data from json file
    
fetch("products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {

        productContainer.innerHTML = "";

        const filteredProducts = products.filter(function(product) {
            return selectedCategory === product.category;
        });

        filteredProducts.forEach(function(product) {

            productContainer.innerHTML += `
                <div class="product-cart">

                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <button type="button" class="wishlist-btn">♡</button>
                    </div>

                    <h5>${product.shop}</h5>

                    <h4 class="product-name">${product.name}</h4>

                    <div class="rating">
                        ⭐ ${product.rating}
                    </div>

                    <div class="price-row">
                        <strong class="product-price">
                            AFN ${product.price}
                        </strong>
                    </div>

                    <button type="button" class="add-to-cart">+</button>

                </div>
            `;

        });

    })
    .catch(function(error) {
        console.error("Error loading products:", error);
    });
}


//product details ... showing details of products

const productList = document.querySelector(".product-carts");

if (productList) {

    productList.addEventListener("click", function(event) {

        if (event.target.closest(".add-to-cart, .wishlist-btn")) {
            return;
        }

        const productCard = event.target.closest(".product-cart");

        if (!productCard) {
            return;
        }

        const nameElement = productCard.querySelector(".product-name");
        const priceElement = productCard.querySelector(".product-price");
        const imageElement = productCard.querySelector("img");

        if (!nameElement || !priceElement || !imageElement) {
            return;
        }

        const selectedProduct = {
        name: nameElement.textContent.trim(),
        price: priceElement.textContent.trim(),
        image: imageElement.getAttribute("src")
        };

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(selectedProduct)
        );

        window.location.href = "product-Details.html";

    });

}


//details product showing of popular this week (store.html)
const popularProducts = document.querySelector(".Popular-week");

if (popularProducts) {

    popularProducts.addEventListener("click", function(event) {

        if (event.target.closest(".add-to-cart, .wishlist-btn")) {
            return;
        }

        const productCard = event.target.closest(
            ".popluar-week-cart, .popular-week-cart"
        );

        if (!productCard) {
            return;
        }

        const nameElement = productCard.querySelector(".product-name");
        const priceElement = productCard.querySelector(".product-price");
        const imageElement = productCard.querySelector("img");

        if (!nameElement || !priceElement || !imageElement) {
            alert("Product information not found!");
            return;
        }

        const selectedProduct = {
            name: nameElement.textContent.trim(),
            price: priceElement.textContent.trim(),
            image: imageElement.src
        };

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(selectedProduct)
        );

        window.location.href = "product-details.html";

    });

}