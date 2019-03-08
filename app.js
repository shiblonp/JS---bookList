//constructor for book
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//constructor for UI
function UI() {}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
    list.appendChild(row);
}
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

    //to instantiate a book object based on the data from text input
    const book = new Book(title, author, isbn);
    //instantiate the UI to populate the list on page
    const ui = new UI();

    ui.addBookToList(book);
    ui.clearFields();
    e.preventDefault();
});