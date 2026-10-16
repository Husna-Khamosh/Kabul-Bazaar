
const addProductForm = document.querySelector("#addProductForm");
const productImageInput = document.querySelector("#productImage");

let selectedImage = "";


if (productImageInput) {
    productImageInput.addEventListener("change", function () {

        const file = productImageInput.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            productImageInput.value = "";
            return;
        }
        const reader = new FileReader();

        reader.onload = function () {
            selectedImage = reader.result;

            document.querySelector("#imagePreview").src = selectedImage;
            document.querySelector("#imagePreview").style.display = "block";

            document.querySelector("#imagePlaceholder").style.display = "none";
        };

        reader.readAsDataURL(file);
    });
}



if (addProductForm) {
    addProductForm.addEventListener("submit", function (event) {

        event.preventDefault();

       
        if (!selectedImage) {
            alert("Please select a product image.");
            return;
        }

    
        const newProduct = {
            id: Date.now(),

            name: document.querySelector("#productName").value.trim(),

            category: document.querySelector("#productCategory").value.trim(),

            brand: document.querySelector("#productBrand").value.trim(),

            description: document.querySelector("#productDescription").value.trim(),

            price: Number(document.querySelector("#productPrice").value),

            stock: Number(document.querySelector("#productStock").value),

            image: selectedImage,

            status: "Draft",

            sales: 0
        };

    
        let products = [];

        try {
            products = JSON.parse(
                localStorage.getItem("vendorProducts")
            ) || [];
        } catch (error) {
            alert("Could not read the saved products.");
            return;
        }

     
        products.push(newProduct);

     
        try {
            localStorage.setItem(
                "vendorProducts",
                JSON.stringify(products)
            );
        } catch (error) {
            alert("The image may be too large to save. Please choose a smaller image.");
            return;
        }

        alert("Product saved successfully!");

        
        addProductForm.reset();

        selectedImage = "";

        document.querySelector("#imagePreview").src = "";
        document.querySelector("#imagePreview").style.display = "none";

        document.querySelector("#imagePlaceholder").style.display = "block";
    });
}


const productsTableBody = document.querySelector("#productsTableBody");

if (productsTableBody) {

    let products = [];

    try {
        products = JSON.parse(
            localStorage.getItem("vendorProducts")
        ) || [];
    } catch (error) {
        console.error("Could not read saved products:", error);
    }

    productsTableBody.replaceChildren();

    products.forEach(function (product) {

        const row = document.createElement("tr");


        const productCell = document.createElement("td");

        const productInfo = document.createElement("div");
        productInfo.className = "product-info";

        const imageContainer = document.createElement("div");
        imageContainer.className = "product-img";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        imageContainer.appendChild(image);

        const name = document.createElement("h4");
        name.textContent = product.name;

        productInfo.append(imageContainer, name);
        productCell.appendChild(productInfo);

        
        const priceCell = document.createElement("td");
        priceCell.textContent = "AFN " + product.price.toLocaleString();

       
        const variantsCell = document.createElement("td");
        variantsCell.textContent = "1 variant";

       
        const stockCell = document.createElement("td");
        stockCell.textContent = product.stock;

      
        const statusCell = document.createElement("td");

        const status = document.createElement("span");
        status.className = "status draft";
        status.textContent = product.status;

        statusCell.appendChild(status);

        const salesCell = document.createElement("td");
        salesCell.textContent = product.sales;

     
        row.append(
            productCell,
            priceCell,
            variantsCell,
            stockCell,
            statusCell,
            salesCell
        );
        productsTableBody.appendChild(row);
    });
}