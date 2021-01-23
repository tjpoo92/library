//Array
let myLibrary = [];

//Constructor
function Book(title, author, numberOfPages, readStatus) {
  this.bookTitle = title;
  this.bookAuthor = author;
  this.bookNumberOfPages = numberOfPages;
  this.bookReadStatus = readStatus;
  this.bookArrayPosition = NaN;
}

//Add Book Function
function addBookToLibrary() {
  myLibrary.push(newBook);
  clearForm();
  newBook.bookArrayPosition = myLibrary.indexOf(newBook);
  console.table(myLibrary);
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  collectFormInfo();
  event.preventDefault();
});

function toggleForm() {
  document.getElementById("bookForm").classList.toggle("display");
}

let newBook;
function collectFormInfo() {
  const formAuthor = document.querySelector("#author").value;
  const formTitle = document.querySelector("#title").value;
  const formNumberOfPages = document.querySelector("#numberOfPages").value;
  const formReadStatus = document.querySelector("#read").checked;
  newBook = new Book(
    `${formTitle}`,
    `${formAuthor}`,
    `${formNumberOfPages}`,
    `${formReadStatus}`
  );
  addBookToLibrary();
}

function clearForm() {
  form.reset();
}
