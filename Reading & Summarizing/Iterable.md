# The iterable Protocol #

Iterable is a protocol in javaScript allows Objects to define and customize their iteration behavior  
object must implement the `[Symbol.iterator]()` — in another way, the object must have it in his prototype — and it is  
a zero argument function returns an object comply with the iterator protocol  
when the object needs to be iterated this methode is called and an iterator is returned  
inside the function we can use the `this` keyword to access properties of the iterable object to decide what to provide during the iteration

---

# code #

```js
const myIterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const value of myIterable) {
  console.log(value); 
}

```
---

# Usage #
when we need to create an object that needs to be iterated over and be compatible with JavaScript loops and spread operator `...`

---


# Generators #

generators in JavaScript are functions that cna pause or resume their exexutions, they return generator object of both types iterator and iterable
it can pause the execution using `yield` or it can resume the execution using `next()`
methode 

---

# Code #
```js
function* greetUser() {
  const name = yield "What is your name?";
  yield `Hello, ${name}!`;
}

const greeter = greetUser();
console.log(greeter.next().value);     // Output: "What is your name?"
console.log(greeter.next("Jad").value); // Output: "Hello, Ahmad!"

```
---

# Usage #
generators are used for working with Asynchronous code, and offer better replacement for the callbacks or channing `then()` 