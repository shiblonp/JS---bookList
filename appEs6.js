class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addBookToList(book){
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
    deleteBook(target){
        if (target.className = 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    showAlert(msg, className){
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

}
class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;   
            ui.addBookToList(book);
        });
        
    }
    static addBooks(book){
        const books = Store.getBooks();
        books.push(books);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//when document is loaded
document.addEventListener('DOMContentLoader', Store.displayBooks);

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
    //No instantiation because it is a static method
    Store.addBooks(book);
    ui.showAlert('Book Added', 'success');
    ui.clearFields();
    }
    e.preventDefault();
});

//for deleting a book
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    //will target the isbn number since it is unique
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert("Book removed!", 'success');
    e.preventDefault();
})