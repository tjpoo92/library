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
  createBookCards();
}

function createBookCards() {
  for (let i = 0; i < myLibrary.length; i++) {
    h4.textContent = myLibrary[i].bookTitle;
    paraAuthor.textContent = myLibrary[i].bookAuthor;
    paraPages.textContent = myLibrary[i].bookNumberOfPages;
  }
  document
    .querySelector(".body")
    .appendChild(divCard)
    .appendChild(button)
    .insertAdjacentElement("afterend", divCardContainer)
    .appendChild(h4)
    .insertAdjacentElement("afterend", br)
    .insertAdjacentElement("afterend", paraAuthor)
    .insertAdjacentElement("afterend", paraPages)
    .insertAdjacentElement("afterend", formCard)
    .appendChild(label);
}

//Book Cards
const divCard = document.createElement("div");
const divCardContainer = document.createElement("div");
const button = document.createElement("button");
const h4 = document.createElement("h4");
const br = document.createElement("br");
const paraAuthor = document.createElement("p");
const paraPages = document.createElement("p");
const formCard = document.createElement("form");
const label = document.createElement("label");

divCard.classList.add("card");
button.classList.add("delete");
button.textContent = "X";
divCardContainer.classList.add("card-container");
h4.classList.add("title");
h4.textContent = "Where the Wild Things Are";
paraAuthor.classList.add("author");
paraAuthor.textContent = "Maurice Sendak";
paraPages.classList.add("pages");
paraPages.textContent = "15 pages";
formCard.setAttribute("action", "#");
label.innerHTML = '<input type="checkbox" name="read" value="Read" />Read';

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
