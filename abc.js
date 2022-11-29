'use strict';

//////////////////DEFAULT PARAMETERS/////////////////////////
// const bookings=[];
// const createBooking=function(flightNum,numPassengers=1,price=199*numPassengers){  //we can set default parameters in the brackets itself

//     // create an object and push it in the bookings array
//     const booking={
//         flightNum,
//         numPassengers,
//         price,
//     }

//     console.log(booking);
//     bookings.push(booking);
// }

// // we cannot skip the number of passengers
// createBooking('LH232',3,800);
// createBooking('lh2424',7,1999);

////////////////ARGUMENT PASSING->PRIMITIVES VS REFERENCE TYPES///////////////////////////
/*
->Note an important thing that javascript does not have pass by reference. Only Pass by Value is allowed
*/
// const flight='LH234';
// const iftikar={
//     name:'Iftikar Jahan',
//     age:22
// }

// const checkIn=function(flightNum,object){
//     flightNum='0000';
//     object.name="Haramkhor";

// }

// /*
// ->Primitives and reference types in javascript behave diffrently. In case of primitivres a completely new variable is
// assigned during the function call. So any changes done in the new variable is not reflected in the original variable

// ->But in case of the objects, the parameter gets the value of the address of the object. So here any changes done
// is refelected in the main object
// */ 
// checkIn(flight,iftikar);
// console.log(flight);
// console.log(iftikar.name);


/////////////////FIRST CLASS FUCTIONS and HIGHER ORDER FUNCTIONS/////////////////////////////////
/*
->In javascript, fuctions are treated as objects and objects are just another values that can be reeived in any 
variable. Hence functions are also called first class citizens.ALL FUNCTIONS ARE VALUES. AS A RESULT OF THIS WE CAN
CREATE HIGHER ORDER FUNCTIONS
*/ 

/*
->A function that receives another function as an argument or return a new function or both is called 
higher order functions
*/ 

//////////////FUNCTIONS ACCEPTING CALLBACK FUNCTIONS/////////////////////
// const upperFirstWord=function(str){
//     const[first,...others]=str.split(' ');
//     return [first.toUpperCase(),...others].join(' ');
// };


// //creating a higher order function->because it would take a function as a parameter
// // here the fn function acts as the callback function that javascript calls later whenever required
// //JS uses callback function everywhere because it is used to acheive a great level of abstraction
// // Thats why they are called higher order function because they uses abstraction
// const transformer=function(str,fn){
//     console.log(`Original String: ${str}`);
//     console.log(`Transformed String: ${fn(str)}`);
//     console.log(`Transformed By: ${fn.name}`);
// };

// transformer("Javascript is the best!",upperFirstWord);


/////////////FUNCTIONS RETURNING FUNCTIONS->used in functional programming/////////////////////
// const greet=function(greeting){
//     return function(name){
//         console.log(`${greeting},${name}`);
//     }
// }

// greet("Hey")("Iftikar");

// const greetArrow=greeting=>name=>console.log(`${greeting},${name}`);

// greetArrow("hi")("hafiz")

//////////////////////CALL AND APPLY METHODS//////////////////////////
// const lufthansa={
//     airline:"Lufthansa",
//     iataCode:"LH",
//     bookings:[],
//     book(flightNum,name){
//         console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
//         this.bookings.push({flight:`${this.iataCode}${flightNum}`,name})
//     }
// }

// lufthansa.book(239,"Iftikar");
// lufthansa.book(452,"Rahul");
// console.log(lufthansa.bookings);


// const euroWings={
//     airline:"EuroWings",
//     iataCode:"EW",
//     bookings:[]
// }


/*
->When we have created the book function by assigning it to a variable outside the object, then its no longer
a method. Its rather a regular function call. Hence the this keyword has been assigned to undefined and hence we get an
error
->So in order to tell the function to what object should the this keyword point to, we use the call, apply or bind
method
*/ 
// const book=lufthansa.book;
// book.call(euroWings,666,"Ramesh");   //here the this keyword has been set to euroWings object
// book.call(lufthansa,999,"Iftikar")   //here the this keyword points to lufthansa object
// console.log(euroWings.bookings);
// console.log(lufthansa.bookings);


// //apply Method->does not receive a list of arguments but instead uses an array->not that used in modern javascipt
// const fd=[1001,"Papa"];
// book.apply(euroWings,fd);

// const fd2=[1002,"Mummy"];
// book.call(euroWings,...fd2);

////////////////BIND METHOD//////////////////
/*
->when we write book.bind(euroWings), it returns a new function whose this keyword points to the euroWings 
obect.
*/

// const bookEW22=book.bind(euroWings,22); //making it more specific
// const bookLH=book.bind(lufthansa);

// bookEW22("Rahul");
// bookEW22("Jaadooooo");
// bookLH(111,"Dilhon");


// Partial application
// const addTax=(rate,value)=>value+rate*value;
// console.log(addTax(0.1,100));
/*
->Now if we want to create a more specific function in which the rate is fixed, we can use the bind method
*/

// const addVat=addTax.bind(null,0.23);       //so here rate is now fixed to 0.23
// console.log(addVat(100));

//////////////////////IIFE->Immediately Invoked Function Expression/////////////////////////////
// Functions that are only executed once and never run again

// (function(){
//     console.log("This function will only be executed once");
// })();

/*
->reason to use IIFE: Functions create scoope. So all data inside the function are private
*/ 


////////////////////CLOSURES//////////////////////////////////////////////
/*
->A closure is something that we dont have to explicitly use. It just simply happens in certain situations.
We just need to recognise those situations

->Note an important thing that any function has access to the variable environment in which the execution
context was created
->So even though the scope has already been destroyed, the scope chain is already preserved using the
closure
->The closure has priority over the scope chain. So even before looking at the scope chain, it would look at the 
closure

-> In other words, a closure gives a function access to all the variables of its parent function even though
the parent function has returned. The function keeps a reference of its outer scope which preserves the 
scope chain throughout

->A closure can be reassigned as the variables are reassigned

*/ 

// const secureBooking=function(){
//     let passengerCount=0;

//     return function(){
//         passengerCount++;
//         console.log(`${passengerCount} passengers`);
//     }
// }

// const booker=secureBooking();
// booker();
// booker();


///////////////////Example2-closure///////////////////
// let f;
// let g=function(){
//     const a=23;
//     f=function(){
//         console.log(a*2);
//     }
// }

// g();
// f();

//////////////Example3-closure/////////////////

const boardPassengers=function(n,wait){
    const perGroup=n/3;

    setTimeout(function(){
        console.log(`We are now boarding all the ${n} passengers`);
        console.log(`There are 3 groups each with ${perGroup} passengers`);
    },wait*1000);    

    console.log(`Will start boarding in ${wait} seconds`);
}

// boardPassengers(180,3);

/////////////Example3-closure///////////////////////
const exp=function(){
    let a=10;
    console.log("The EC for the exp function has been made and all its varibles are given values");;
    console.log("The exp function has been called and is going to finish executing by putting all its variables in its EC");
    console.log("Once it finishes executing, it would wipe itself out of the call stack");

    setTimeout(function(){
        console.log(`The value of a from the parent EC id ${a}`);
        console.log(`Note that although the EC has been wiped out from the EC but still the value of  a i.e ${a} is still accessible because of closure where the variables and functions from the parent scope are still accessible`);
    },30000);

}

exp();

