//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() { }

//Add book to list
UI.prototype.addBookToList = function (book) {
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

//Create error alert
UI.prototype.showAlert = function (message, className) {
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

//Delete
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }

}
//Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}

//Create event listeners for book
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

        ui.clearFields();
        ui.showAlert('Book Added!', 'success')
    }

    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    //Instantiate UI
    const ui = new UI();
    //Delete book
    ui.deleteBook(e.target);
    //Show alert
    ui.showAlert('Book deleted!', 'del')
    e.preventDefault();
})