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
UI.prototype.deleteBook= function(target){
    if (target.className = 'delete'){
        target.parentElement.parentElement.remove();
    }
}
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
UI.prototype.showAlert = function(msg, className){
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    container.insertBefore(div, form);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//for adding a book
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;
    //to instantiate a book object based on the data from text input
    const book = new Book(title, author, isbn);
    //instantiate the UI to populate the list on page
    const ui = new UI();
    //validate input
    if(title === '' || author ==='' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }else{
    ui.addBookToList(book);
    ui.showAlert('Book Added', 'success');
    ui.clearFields();
    }
    e.preventDefault();
});

//for deleting a book
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("Book removed!", 'success');
    e.preventDefault();
})