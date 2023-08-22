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
    expression
      .slice(0, operatorIndexes[0])
      .includes(dot)
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
        .slice(
          operatorIndexes[
            operatorIndexes.length - 1
          ],
          expression.length
        )
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
