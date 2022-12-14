class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

class UI {
    //Add Book to list
    addBookToList(book) {
        const list = document.getElementById('book-list');
        //Create element
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }
    //Show Alert
    showAlert(message, className) {
        //Create element
        const div = document.createElement('div');
        //Add class
        div.className = `alert ${className}`;
        //Create text node
        const text = document.createTextNode(message);
        div.appendChild(text);
        //Get parent
        const container = document.querySelector('.container');
        //Get form
        const form = document.querySelector('#book-form');
        //Insert alert
        container.insertBefore(div, form);
        //Set time out 3 secs
        setTimeout(function () { document.querySelector('.alert').remove() }, 3000)
    }

    //Delete book
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    //Clear fields
    clearFields() {
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
};

//Local StorageClass
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI;
            ui.addBookToList(book)
        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Create event listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if (title === '' || author === '' || isbn === '') {
        //Error
        ui.showAlert('Please Fill All Fields!', 'error')

    } else {
        //Add book to list
        ui.addBookToList(book);
        //Add to LS
        Store.addBook(book);

        ui.showAlert('Book Added!', 'success')

        ui.clearFields();
    }

    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    //Instantiate UI
    const ui = new UI();
    //Delete book
    ui.deleteBook(e.target);
    //Delete fro LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    //Show alert
    ui.showAlert('Book deleted!', 'del')

    e.preventDefault();
})