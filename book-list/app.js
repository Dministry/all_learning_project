function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI(){}

//Event listeners
document.getElementById('book-form').addEventListener(submit, 
    function(e){
        const title = document.getElementById('title').value,
                author = document.getElementById('author').value,
                isbn = document.getElementById('isbn').value;
    })