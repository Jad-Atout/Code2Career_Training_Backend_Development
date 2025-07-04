//Object Literal

const Book = {
    title:"the man in the high castle",
    author:"Philip K. Dick",
    isRead:false,
    toggleReadStatus(){
        this.isRead=! this.isRead;
    },
    describe(){
        return `${this.title} by ${this.author} is ${this.isRead? "Read":"Unread"}`;
    }

}

//Factory Function

function createBook(title,author,isRead=false) {
    return {
        title, author, isRead,

        toggleReadStatus() {
            this.isRead = !this.isRead;
        },
        describe() {
            return `${this.title} by ${this.author} is ${this.isRead ? "Read" : "Unread"}`;

        }
    }
}

//Constructor Function
function BookConstructor(title,author,isRead=false){
    this.title=title;
    this.author=author;
    this.isRead=isRead;
    this.toggleReadStatus=()=>{
        this.isRead=!this.isRead;
    }
    this.describe=()=>{
        return `${this.title} by ${this.author} is ${this.isRead ? "Read" : "Unread"}`;
    }
}

//Class
class BookClass {
    constructor(title, author, isRead=false) {
        this.title=title;
        this.author=author;
        this.isRead=isRead;
    }
    toggleReadStatus(){
        this.isRead=!this.isRead;
    }
    describe(){
        return `${this.title} by ${this.author} is ${this.isRead ? "Read" : "Unread"}`;

    }
}



// Object Literal
console.log(Book.describe());
Book.toggleReadStatus();
console.log(Book.describe());

// Factory
const myBook = createBook("FactoryFunction", "Jad Atout");
console.log(myBook.describe());
myBook.toggleReadStatus();
console.log(myBook.describe());

// Constructor
const myBook2 = new BookConstructor("Constructor", "Jad Atout");
console.log(myBook2.describe());
myBook2.toggleReadStatus();
console.log(myBook2.describe());

// Class
const myBook3 = new BookClass("Class", "Jad Atout");
console.log(myBook3.describe());
myBook3.toggleReadStatus();
console.log(myBook3.describe());