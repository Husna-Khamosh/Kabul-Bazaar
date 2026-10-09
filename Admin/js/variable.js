
// // let favoritFruite ="Apple";
// // let favoritIceCream ="choclate";
// // let favoriteLaunguage ="JavaScript";

// // let numOfDonates = 12;
// // let pie = 3.14;
// // let verLargeNum = 2345545463545;
// // let lovesCoding = true;

// // let favoriteColor;

// // console.log(favoriteColor);

// // const uniqueKey = Symbol();


// // //object
// // let course = {
// //     name: 'Javascript Beginners',
// //     hourse : 3
// // };
// // console.log(course.name);
// // course.name ='Java Advance';
// // console.log(course['name']);

// // //array
// // let colores = ['blue', 'green', 'red'];
// // console.log(colores);
// // console.log(colores[0]);

// // colores[0] = 'yellow';
// // colores[1] = 32;


// // //functions

// // function sayHi(){
// //     console.log('Hi Husna');

// // }
// // sayHi();

// // function sayHello(name){
// //     console.log('hello' + name);
// // }

// // sayHello('Husna Jan');

// // //types of functions

// // function multiply(num1, num2){
// //     return num1 * num2;
// // }
// // console.log(multiply(2, 2));



// // //comparision operators
// // let num1 = 14;
// // let num2 = 10;

// // const isNumGreater = num1 <= num2;
// // console.log(isNumGreater);


// // //equality operators

// // let a = 2;
// // let b = 2;

// // console.log (a == b);


// // //trenary operators
// // let age = 18;
// // const canDrive = age >= 18 ? true : false;
// // console.log(canDrive);

// // //second ex

// // let score = 74;

// // const studentResult = score >= 75 ? 'Student Passed' : 'Faild';

// // console.log(studentResult);

// // //third ex

// // let isloggedIn = false;
// // const loginMsg = isloggedIn == true ? 'Welcome to your page ' : 'You must to be log in first';
// // console.log(loginMsg);


// // //conditional statments 

// // let priceOfChocolate = 1.99;
// // let hasAmountInCash = 9;
// // const canBuyChocolate = hasAmountInCash >= priceOfChocolate;

// // if(canBuyChocolate){
// //     console.log('enjoy your chocolate');
// // }else{
// //     console.log('sorry you have no money');
// // }


// // //second ex
// // let hour = 10;
// // if(hour >=6 && hour < 12){
// //     console.log("Serving Breakfast!");
// // }
// // else if(hour >=12 && hour <14){
// //     console.log("serving Luanch");
// // }
// // else{
// //     console.log("serving dinner")
// // }


// // //switch
// //  let job = 'Software Developer';
// // // if(job == 'Software Developer'){
// // //     console.log('write the codes');
// // // }else if (job =='designer'){
// // //     console.log('make user interface documents ')
// // // }else if (job == 'Cloud engineer'){
// // //     console.log("manage and deploys cloud resources")
// // // }else{
// // //     console.log('write directly with customers')
// // // }

// // // switch(job){
// // //     case 'software developer':
// // //         console.log('write codes');
// // //     case 'Designer' :
// // //         console.log('make user interface documnets');
// // //     case 'cloud engineer':
// // //         console.log('manage and deploys cloud resourse');
// // //     break;
// // //     default : console.log('write directoly with customers');
// // // }


// //for Loops

// let numbers = [1,2,3,4,5,6,7];
// // let idx = 0;
// // let lengthOfArray = numbers.length;

// // for(idx = 0 ; idx <= numbers.length ; idx++){
// //     console.log(numbers[idx]);
// // }

// // //sec ex 
// // for(let num = 0; num <= 100; num++){
// //     console.log(num);
// // }

// //while loop
// let idx =0;
// while(idx <= numbers.length){
//     console.log(numbers[idx]);
//     idx++;
// }


پیج استور :

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = button.closest(".popluar-week-cart, .popular-week-cart");

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

        const productImg = productImageElement.src;

        const existingProduct = cart.find(function(item) {
            return item.name === productName;
        });

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                name: productName,
                price: productPrice,
                image: productImg,
                description: "",
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(productName + " added to cart!");

        showCart();
    });

});


function showCart() {

    const cartContainer = document.querySelector(".kabul-items");

    if (!cartContainer) {
        return;
    }

    const oldProducts = cartContainer.querySelectorAll(".cart-product");

    oldProducts.forEach(function(product) {
        product.remove();
    });


    cart.forEach(function(product, index) {

        if (!product.quantity) {
            product.quantity = 1;
        }

        const productCart = document.createElement("div");

        productCart.classList.add("cart-product");

        productCart.innerHTML = `
            <div class="product-small-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="cart-product-info">
                <h4>${product.name}</h4>
                <p>${product.description || ""}</p>
                <span>Remove · Save for later</span>
            </div>

            <div class="quantity">

                <button class="minus-btn" data-index="${index}">
                    −
                </button>

                <span>${product.quantity}</span>

                <button class="plus-btn" data-index="${index}">
                    +
                </button>

            </div>

            <strong>
                AFN ${(Number(product.price) * product.quantity).toLocaleString()}
            </strong>
        `;

        cartContainer.append(productCart);
    });


    const plusButtons = document.querySelectorAll(".plus-btn");

    plusButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index = Number(button.dataset.index);

            cart[index].quantity += 1;

            localStorage.setItem("cart", JSON.stringify(cart));

            showCart();
        });
    });


    const minusButtons = document.querySelectorAll(".minus-btn");

    minusButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index = Number(button.dataset.index);

            if (cart[index].quantity > 1) {

                cart[index].quantity -= 1;

            } else {

                cart.splice(index, 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            showCart();
        });
    });


    updateSummary();
}


function updateSummary() {

    let totalItems = 0;
    let itemsPrice = 0;

    cart.forEach(function(product) {

        if (!product.quantity) {
            product.quantity = 1;
        }

        totalItems += product.quantity;

        itemsPrice += Number(product.price) * product.quantity;
    });


    const shopDiscount = 6485;
    const delivery = 400;
    const platformFee = 0;

    const totalPrice =
        itemsPrice -
        shopDiscount +
        delivery +
        platformFee;


    const itemsText = document.querySelector(".items-list-left li");
    const itemsPriceText = document.querySelector(".items-list-right li");
    const cartAmount = document.querySelector(".cart-amount");
    const cartTitle = document.querySelector(".yourCart-left > h3");
    const totalPriceText = document.querySelector(".total-price h3");


    if (itemsText) {
        itemsText.textContent = `Items (${totalItems})`;
    }

    if (itemsPriceText) {
        itemsPriceText.textContent =
            `AFN ${itemsPrice.toLocaleString()}`;
    }

    if (cartAmount) {
        cartAmount.textContent = totalItems;
    }

    if (cartTitle) {
        cartTitle.textContent =
            `Your Cart. ${totalItems} items from 2 shops`;
    }

    if (totalPriceText) {
        totalPriceText.textContent =
            `AFN ${totalPrice.toLocaleString()}`;
    }
}


showCart();