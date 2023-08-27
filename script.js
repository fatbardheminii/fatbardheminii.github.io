// not FINAL --- TESTED WITH ADDEVENTLISTENER FROM LINE 14 TO 31 !!
//! if the last digit is a dot then you need to type neccessarily a NUMBER.
//we get userInput through its id
const userInput = document.getElementById("userInput");
//creats an array of operators
let operator = [...document.querySelectorAll(".operator")].map(
  (el) => el.textContent
);
//it creats an array of dot-- to check when it is present in expression--very important
let dot = [...document.getElementsByClassName("dot")].map(
  (el) => el.textContent
);

// Add an event listener for keydown event
userInput.addEventListener("keydown", function (event) {
  let pressedKey = event.key;
  let expression = userInput.value;
  const allowedPattern = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "/",
    "*",
    ".",
    "=",
  ];
  const patternOperators = ["+", "-", "/", "*"];
  let operators = "+-/*";
  const dotKeydownEvent = ["."];

  let operatorIndexes = [];
  let dotIndexes = [];
  let enterKey = ['Enter'];

  $.each(expression.split(""), function (i, v) {
    if (operators.includes(v)) {
      operatorIndexes.push(i);
     //console.log(operatorIndexes);
    }
  });
  
  $.each(expression.split(""), function (i, v) {
    if (dotKeydownEvent.includes(v)) {
      dotIndexes.push(i);
    }
  });

  // Check if the pressed key is not in the allowed pattern
  if (!allowedPattern.includes(pressedKey)) {
    event.preventDefault(); // Prevent the key from being entered
  }
  // the following else if - doesn't allow operators to be repeated.
  else if (
    patternOperators.includes(pressedKey) &&
    patternOperators.includes(expression.charAt(expression.length - 1))
  ) {
    //if both true then overwrite the last digit with the new num that is clicked.
    //overwrite it through substring.(0, exp,length -1)--> last digit deleted
    userInput.value = expression.substring(0, expression.length - 1);
  }
  // the following else if - doesn't allow dot to be repeated.
  /*if pressed key is a dot ==TRUE
    and if last character of the expression is a dot ==TRUE
    than the code will delete the second dot(expression.length -1)--> so only one dot in a row will be displayed */
  else if (
    dotKeydownEvent.includes(pressedKey) &&
    dotKeydownEvent.includes(expression.charAt(expression.length - 1))
  ) {
    userInput.value = expression.substring(0, expression.length - 1);
  }
  // from 0 to operator only one dot allowed
  /*if expression from 0 to first substring includes a dot == TRUE
    if operatorIndexes length is less than 1(==0) == TRUE
    and if pressed Key is dot == TRUE 
    than the second dot will not be displayed(within the number from START to FIRST OPERATOR)
    !!VERY IMPORTANT the length of operatorIndexes to be 0 (< 1) -- because without it the else if will allways evaluate to true
    and you couldn't display a second dot in the whole expression
    !! if there is no conditional about the length of operatorIndexes-- the conditional code would be still valid for the part after
    the first operator to the end */
  else if(
    expression.substring(0, operatorIndexes[0]).includes(dotKeydownEvent) &&
    operatorIndexes.length < 1) {
        if(dotKeydownEvent.includes(pressedKey)) {
            //userInput.value = expression.slice(0, expression.length);
            event.preventDefault();
            console.log("first dot is there");
            console.log(operatorIndexes);
        } 
  } 
  //From LAST OPERATOR to the END of Expression
  /*if expression from the LAST OPERATOR to the END of expression already includes a dot == TRUE
    and if pressed Key is dot == TRUE
    than the second dot will again not be displayed in the expression part from last operator to the end 
    !! in this part from last operator to the end we don't need necessarily to check if the length of operatorIndexes is true
    because the above conditional statement will be valid just until the first operator is displayed and not after that.*/
  else if(
    expression.substring(operatorIndexes[operatorIndexes.length - 1], expression.length).includes(dotKeydownEvent) &&
    dotKeydownEvent.includes(pressedKey)
  ) { 
      event.preventDefault();
      console.log("FINISHEEEED");
      console.log(operatorIndexes);
    
  }
})
//Event Listener only when enter is pressed to evaluate the result of expression
userInput.addEventListener("keydown", (event) => {
  let operators = "+-/*";
  const error = document.getElementById('error');
  if(event.key === 'Enter') {
       expression = userInput.value;
       if(operators.includes(expression.charAt(expression.length - 1))) {
        event.preventDefault();
        alert('You need to add a number or delete the last operator');
        //error.textContent = 'A number must be typed or delete the last operator';
        //alert('Type a number or delete the last operator');
      }
      else {
        error.textContent = '';
      }
  //eval built in method to evaluate the result of a string, but it's not preferred to use..
  userInput.value = eval(expression);
  }
})
//Event Listener only when Backspace is pressed to delete the last digit of expression
userInput.addEventListener("keydown", (event) => {
  if(event.key === 'Backspace') {
    expression = userInput.value;
    //the expresion value always goes - 1 in length if we press backspace
    userInput.value = expression.substring(0, expression.length - 1);
  }
})
//Event Listener when ArrowLeft or ArrowRight are being pressed-- to move the focus to the left or to the right
userInput.addEventListener("keydown", (event) => {
  if(event.key === 'ArrowLeft') {
    
  }
})

//the function that allows us to press buttons and display them in the userInput
function press(num) {
  //we give the expression variable the value of userInput
  let expression = userInput.value;
  //string of operators -- we use it to check if they are displayed in expression and to find their index
  let operators = "+-/*";
  // operator indexes will be added through the push method in the next function
  let operatorIndexes = [];
  //!Difference between variables operator and operators .. operators main purpose is to find the index of an operator inside expression
  //! operator array/variable in line 4 creates an array with the class names of HTML buttons, to stand out from the numbers.

  //JQuery -- we split the expression in single characters... than through the function we check if (V)-current digit is included
  // in operators = it means it is an operator(true)- so it will be pushed to the empty array of operatorIndexes
  // every digit will be checked, and so we get the indexNumber of all displayed operators.
  // We need the indexNumber of operators, to control the conditional statements its begin and end.
  $.each(expression.split(""), function (i, v) {
    if (operators.includes(v)) {
      operatorIndexes.push(i);
    }
  });

  //check if num clicked is operator and last digit(=already clicked before) in expression is operator
  //this part of code doesn't allow operators to repeat many times..one operator is allowed once in a row and always a number between.
  if (
    operator.includes(num) &&
    operator.includes(expression.charAt(expression.length - 1))
  ) {
    //if both true then overwrite the last digit with the new num that is clicked.
    //overwrite it through substring.(0, exp,length -1)--> last digit deleted
    userInput.value = expression.substring(0, expression.length - 1) + num;
  }
  //if num clicked is dot and the last digit in expression is dot... then delete last digit and put the new dot... !! 2 dots are not allowed in row
  else if (
    dot.includes(num) &&
    dot.includes(expression.charAt(expression.length - 1))
  ) {
    userInput.value = expression.substring(0, expression.length - 1) + num;
  }
  //dot is allowed just once in a number!!
  //check if clicked num is dot AND if expression already includes a dot??-- from 0 to first operator valid
  //!! this part of code is valid until an operator is clicked. e.g. 56.78 +
  else if (
    dot.includes(num) &&
    expression.slice(0, operatorIndexes[0]).includes(dot)
  ) {
    //if both true num-clicked==dot and from 0 to first operator already one dot--> than don't change anything just display the full length
    // repeating dot not allowed.
    userInput.value = expression.slice(0, expression.length);
    //this is valid from last operator(.length - 1) to end of expression
    if (
      //if clicked num = dot and expression part from last operator to end of expression includes a dot--than don't change anything
      //!! this code is correct for as many part divided by operators as you want. for example 66.7 + 89.6 (from last operator always)
      //!! same as for 5.67 + 67.88 + 69.06 (from last operator)
      dot.includes(num) &&
      expression
        .slice(operatorIndexes[operatorIndexes.length - 1], expression.length)
        .includes(dot)
    ) {
      //same as line 56
      userInput.value = expression.slice(0, expression.length);
    }
    //!VERY IMPORTANT TO DISPLAY THE DOT AFTER THE FIRST OPERATOR
    // if any of the conditionals above is false it means, either the clicked num isn't a dot(.) or the expression doesn't include a dot.
    else {
      userInput.value += num;
    }
  }
  //if one of the conditions is not true than just insert the new clicked num(value)
  else {
    userInput.value += num;
  }
}
//be careful when you use eval..
function equal() {
  expression = userInput.value;
  //eval built in method to evaluate the result of a string, but it's not preferred to use..
  userInput.value = eval(expression);
}

function erase() {
  //if C is clicked expression value goes to empty and is given to the userInput value.
  expression = "";
  userInput.value = expression;
}
//THE FINAL SCRIPT FILE...
