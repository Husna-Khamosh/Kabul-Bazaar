
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
            alert("This product is already in your cart!");
            return;
        }

        const productData = {
            name: productName,
            price: productPrice,
            image: productImage,
            description: ""
        };

        cart.push(productData);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(productName + " added to cart!");

        showCart();

    });

});


function showCart() {

    const cartContainer = document.querySelector(".kabul-items");
    const productTemplate = document.querySelector("#cart-product-template");

    if (!cartContainer || !productTemplate) {
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

        productCard.querySelector(".cart-product > strong").textContent =
            "AFN " + Number(product.price).toLocaleString();

        const removeButton = productCard.querySelector(".remove-cart-product");

        if (removeButton) {
            removeButton.dataset.index = index;
        }

        cartContainer.appendChild(productElement);

    });

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


showCart();