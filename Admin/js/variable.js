
// let favoritFruite ="Apple";
// let favoritIceCream ="choclate";
// let favoriteLaunguage ="JavaScript";

// let numOfDonates = 12;
// let pie = 3.14;
// let verLargeNum = 2345545463545;
// let lovesCoding = true;

// let favoriteColor;

// console.log(favoriteColor);

// const uniqueKey = Symbol();


// //object
// let course = {
//     name: 'Javascript Beginners',
//     hourse : 3
// };
// console.log(course.name);
// course.name ='Java Advance';
// console.log(course['name']);

// //array
// let colores = ['blue', 'green', 'red'];
// console.log(colores);
// console.log(colores[0]);

// colores[0] = 'yellow';
// colores[1] = 32;


// //functions

// function sayHi(){
//     console.log('Hi Husna');

// }
// sayHi();

// function sayHello(name){
//     console.log('hello' + name);
// }

// sayHello('Husna Jan');

// //types of functions

// function multiply(num1, num2){
//     return num1 * num2;
// }
// console.log(multiply(2, 2));



// //comparision operators
// let num1 = 14;
// let num2 = 10;

// const isNumGreater = num1 <= num2;
// console.log(isNumGreater);


// //equality operators

// let a = 2;
// let b = 2;

// console.log (a == b);


// //trenary operators
// let age = 18;
// const canDrive = age >= 18 ? true : false;
// console.log(canDrive);

// //second ex

// let score = 74;

// const studentResult = score >= 75 ? 'Student Passed' : 'Faild';

// console.log(studentResult);

// //third ex

// let isloggedIn = false;
// const loginMsg = isloggedIn == true ? 'Welcome to your page ' : 'You must to be log in first';
// console.log(loginMsg);


// //conditional statments 

// let priceOfChocolate = 1.99;
// let hasAmountInCash = 9;
// const canBuyChocolate = hasAmountInCash >= priceOfChocolate;

// if(canBuyChocolate){
//     console.log('enjoy your chocolate');
// }else{
//     console.log('sorry you have no money');
// }


// //second ex
// let hour = 10;
// if(hour >=6 && hour < 12){
//     console.log("Serving Breakfast!");
// }
// else if(hour >=12 && hour <14){
//     console.log("serving Luanch");
// }
// else{
//     console.log("serving dinner")
// }


// //switch
//  let job = 'Software Developer';
// // if(job == 'Software Developer'){
// //     console.log('write the codes');
// // }else if (job =='designer'){
// //     console.log('make user interface documents ')
// // }else if (job == 'Cloud engineer'){
// //     console.log("manage and deploys cloud resources")
// // }else{
// //     console.log('write directly with customers')
// // }

// // switch(job){
// //     case 'software developer':
// //         console.log('write codes');
// //     case 'Designer' :
// //         console.log('make user interface documnets');
// //     case 'cloud engineer':
// //         console.log('manage and deploys cloud resourse');
// //     break;
// //     default : console.log('write directoly with customers');
// // }


//for Loops

let numbers = [1,2,3,4,5,6,7];
// let idx = 0;
// let lengthOfArray = numbers.length;

// for(idx = 0 ; idx <= numbers.length ; idx++){
//     console.log(numbers[idx]);
// }

// //sec ex 
// for(let num = 0; num <= 100; num++){
//     console.log(num);
// }

//while loop
let idx =0;
while(idx <= numbers.length){
    console.log(numbers[idx]);
    idx++;
}