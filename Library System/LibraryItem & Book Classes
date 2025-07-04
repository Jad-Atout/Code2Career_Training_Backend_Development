# 📚 Library System – Class-Based Example

This task implements a simple **class-based system** for a library using modern JavaScript (ES6+).

---

## 🎓 **Classes**

### ✅ `LibraryItem` (Base Class)

Represents a generic item in the library.

**Properties:**
- `title` — Title of the item.
- `year` — Publication year.

**Methods:**
- `describe()` — Returns a string description.

```javascript
class LibraryItem {
  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

  describe() {
    return `${this.title} (${this.year})`;
  }
}
```
---
### ✅ `Book ` (Base Subclass)

Represents a Book, extending `LibraryItem`. Adds an author as a private field.

**Additional:**
- `#author` — Private field for the author’s name.
- `getAuthor()` —  Public getter for the author.
- `describe()` — Extends base `describe()` with author info.


```javascript
class Book extends LibraryItem {
  #author;

  constructor(title, year, author) {
    super(title, year);
    this.#author = author;
  }

  getAuthor() {
    return this.#author;
  }

  describe() {
    return `${super.describe()} by ${this.#author}`;
  }
}
```
---
### 🧪  `Book `  Usage Example

```javascript
const myBook = new Book("The Great Gatsby", 1925, "F. Scott Fitzgerald");

console.log(myBook.describe()); // The Great Gatsby (1925) by F. Scott Fitzgerald
console.log(myBook.getAuthor()); // F. Scott Fitzgerald

```
---
### ✅  Features

- Demonstrates **inheritance** using `extends` and `super()`.
- Uses **private fields** with `#` syntax.
- Overrides methods (`describe()`).

---
### Happy Coding! ✨📚🚀

