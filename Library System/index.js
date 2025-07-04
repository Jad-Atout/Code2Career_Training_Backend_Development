class LibraryItem{
    constructor(title, year){
        this.title = title;
        this.year = year;

    }
    describe(){
        return `${this.title}  (${this.year})`
    }

}

class Book extends LibraryItem{
    #author
    constructor(title, year, author) {
        super(title, year);
        this.#author=author;
    }
    getAuthor(){
        return this.#author;
    }
    describe(){
        return `${super.describe()} by ${this.#author}`
    }

}


const myBook = new Book("The Great Gatsby", 1925, "F. Scott Fitzgerald");

console.log(myBook.describe());

console.log(myBook.getAuthor());

const genericItem = new LibraryItem("Encyclopedia", 2000);

console.log(genericItem.describe());
