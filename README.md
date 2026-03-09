## 1.What is the difference between var, let, and const?

**Answer:** difference between var, let and const

| Feature | var | let | const |
|--------|-----|-----|------|
| Scope | Function scoped. It is accessible throughout the entire function where it is declared. It does not respect block scope `{}`. | Block scoped. It is only accessible inside the block `{}` where it is declared. | Block scoped like `let`, meaning it can only be used within the block `{}` where it is declared. |
| Redeclare | Variables declared with `var` can be redeclared in the same scope without causing an error. | Variables declared with `let` cannot be redeclared in the same scope. Attempting to do so will cause an error. | Variables declared with `const` also cannot be redeclared in the same scope. |
| Reassign | The value of a `var` variable can be changed or reassigned after declaration. | The value of a `let` variable can also be reassigned after it is declared. | A `const` variable cannot be reassigned after it is declared. However, for objects and arrays, their internal values can still be modified. |
| Hoisting | `var` variables are hoisted and initialized with `undefined`, so they can be accessed before declaration without throwing an error (though the value will be `undefined`). | `let` variables are hoisted but not initialized. Accessing them before declaration results in a ReferenceError due to the Temporal Dead Zone (TDZ). | `const` variables behave like `let` in hoisting. They are hoisted but not initialized, and accessing them before declaration causes a ReferenceError due to the Temporal Dead Zone (TDZ). |
| Initialization | `var` variables can be declared without assigning a value. | `let` variables can also be declared without an initial value. | `const` variables must be initialized at the time of declaration. |
| Use Case | Mostly used in older JavaScript code. Modern JavaScript usually avoids `var` due to scope issues. | Used when a variable value needs to change later in the program. | Used when a variable should remain constant and not be reassigned. It is the preferred default in modern JavaScript. |


## 2.What is the spread operator (...)?

**Answer:** The Spread Operator (...) in JavaScript is used to expand or unpack elements of an array, object, or iterable into individual elements. It makes copying, merging, and passing values much easier.


## 3.What is the difference between map(), filter(), and forEach()?

**Answer:** difference between map(), filter(), and forEach()

| Feature | map() | filter() | forEach() |
|-------|------|---------|----------|
| Purpose | Transforms each element of an array | Selects elements based on a condition | Executes a function for each array element |
| Return Value | Returns a new array with transformed elements | Returns a new array with filtered elements | Returns `undefined` |
| Array Length | Same length as the original array | Can be smaller depending on condition | Same as original but no new array |
| Chainable | Yes | Yes | No (because it returns undefined) |
| Use Case | Modify or transform array values | Get elements that match a condition | Perform actions like logging or updating UI |


## 4.What is an arrow function?

**Answer:** An Arrow Function is a shorter and more concise way to write functions in JavaScript. It was introduced in ES6 (ECMAScript 2015) and uses the => (arrow) syntax.

## 5.What are template literals?

**Answer:** 
Template Literals are a feature in JavaScript (introduced in ES6) that allow you to create strings more easily using backticks ( ` ` ) instead of single (' ') or double (" ") quotes. They support string interpolation, multi-line strings, and embedded expressions.