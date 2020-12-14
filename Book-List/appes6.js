class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        // console.log(book);
        
        const list = document.getElementById('book-list');

        // Create tr element
        const row = document.createElement('tr');

        // insert cols into the 'row', we can use book.title, author and isbn as we have passes the book object
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>    
        `;

        list.appendChild(row);
    }
     
     showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        
        // Add className, adding two class name first one is alert and the second one is the className which is passed
        div.className = `alert ${className}`;

        // Add Text
        div.appendChild(document.createTextNode(message));

        // Insert into the DOM

        // Get Parent
        const container = document.querySelector('.container');

        // Get form
        const form = document.querySelector('#book-form');

        // insert alert before 'form'
        container.insertBefore(div, form);

        // Timeout, takes two parameter first one is the function and the second one is the timelimit
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 1500);
    }
     
     deleteBook(target) {
        if(target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }
     
     clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Event-Listenner for ADD-BOOK
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get 'form' values, after submit is pressed
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;


    // Instantiating a Book, from the submitted values
    const book = new Book(title, author, isbn);
    // console.log(book);

    // Instantiate UI
    const ui = new UI();
    // console.log(ui);

    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        
        // Add book to list, passing the book object
        ui.addBookToList(book);

        // Show Success alert
        ui.showAlert('Book Added', 'success');

        // Clear fields
        ui.clearFields();
    }


    
    e.preventDefault();
});

// Event Listner for DELETE using event-delegation
document.getElementById('book-list').addEventListener('click', function(e) {
    // we need to instantiate the UI
    
    // Instantiate UI
    const ui = new UI()

    // Delete the book
    ui.deleteBook(e.target);
    
    // Show Alert
    ui.showAlert('Book Removed', 'success');
    
    
    e.preventDefault();
});