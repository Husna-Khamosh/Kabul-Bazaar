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


const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = button.closest(
            ".popluar-week-cart, .popular-week-cart"
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