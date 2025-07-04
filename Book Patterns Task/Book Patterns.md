# 📚 Book Object – Multiple JavaScript Patterns

This task implements a `Book` object that models a book in a **personal library system**, demonstrating **4 different JavaScript patterns**:

- Object Literal
- Factory Function
- Constructor Function
- ES6 Class

---

## 📝 **Requirements**

### 📖 **Properties**
- `title` – Book name *(string)*
- `author` – Author name *(string)*
- `isRead` – Has the book been read? *(boolean)*

### ⚙️ **Methods**
- `toggleReadStatus()` – Switches `isRead` between `true` and `false`
- `describe()` – Returns `"[Title] by [Author] is [Read/Unread]"`

---

## ✨ **Implemented Patterns**

### 1️⃣ **Object Literal**

```javascript
const Book = {
    title: "The Man in the High Castle",
    author: "Philip K. Dick",
    isRead: false,
    toggleReadStatus() {
        this.isRead = !this.isRead;
    },
    describe() {
        return `${this.title} by ${this.author} is ${this.isRead ? "Read" : "Unread"}`;
    }
};
```
---

### 2️⃣ **Factory Function**

```javascript
function createBook(title, author, isRead = false) {
    return {
        title,
        author,
        isRead,
        toggleReadStatus() {
            this.isRead = !this.isRead;
        },
        describe() {
            return `${this.title} by ${this.author} is ${this.isRead ? "Read" : "Unread"}`;
        }
    };
}
```
---

### 3️⃣ **Constructor Function**

```javascript
function BookConstructor(title, author, isRead = false) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;

    this.toggleReadStatus = () => {
        this.isRead = !this.isRead;
    };

    this.describe = () => {
        return `${this.title} by ${this.author} is ${this.isRead ? "Read" : "Unread"}`;
    };
}
```
---

### 4️⃣ **ES6 Class**

```javascript
class BookClass {
    constructor(title, author, isRead = false) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }

    toggleReadStatus() {
        this.isRead = !this.isRead;
    }

    describe() {
        return `${this.title} by ${this.author} is ${this.isRead ? "Read" : "Unread"}`;
    }
}
```
---

### 🧪 **Usage Example**

```javascript
// Object Literal
console.log(Book.describe());
Book.toggleReadStatus();
console.log(Book.describe());

// Factory Function
const myBook = createBook("FactoryFunction", "Jad Atout");
console.log(myBook.describe());
myBook.toggleReadStatus();
console.log(myBook.describe());

// Constructor Function
const myBook2 = new BookConstructor("Constructor", "Jad Atout");
console.log(myBook2.describe());
myBook2.toggleReadStatus();
console.log(myBook2.describe());

// ES6 Class
const myBook3 = new BookClass("Class", "Jad Atout");
console.log(myBook3.describe());
myBook3.toggleReadStatus();
console.log(myBook3.describe());
```
---

## ✅ Summary

---

This task demonstrates how the same object behavior can be implemented using **multiple design patterns** in JavaScript, highlighting their differences and similarities.

**Happy Coding!** 🚀✨
