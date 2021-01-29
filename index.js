//Array
let myLibrary = [
  {
    bookTitle: "Where the Wild Things Are",
    bookAuthor: "MS",
    bookNumberOfPages: 15,
    bookReadStatus: false,
    bookArrayPosition: 0,
  },
];

//Constructor
function Book(title, author, numberOfPages, readStatus) {
  this.bookTitle = title;
  this.bookAuthor = author;
  this.bookNumberOfPages = numberOfPages;
  this.bookReadStatus = readStatus;
  this.bookArrayPosition = NaN;
}

//TODO: Duplicate checking on book creation, need to refactor into own function

//Add Book Function
function addBookToLibrary() {
  const allTitles = document.querySelectorAll("h4");

  //Error check for matching entries
  for (let i = 0; i < allTitles.length; i++) {
    if (
      //Catch regardless of casing
      allTitles[i].textContent.toLowerCase() == newBook.bookTitle.toLowerCase()
    ) {
      window.alert("This entry has already been added");
      clearForm();
      continue;
    } else {
      myLibrary.push(newBook);
      clearForm();
      newBook.bookArrayPosition = myLibrary.indexOf(newBook);
      console.table(myLibrary);
      createBookCards();
    }
  }
}
const bodyContainer = document.querySelector(".body");
function createBookCards() {
  myLibrary.forEach((element) => {
    //Create the nodes
    const divCard = document.createElement("div");
    const divCardContainer = document.createElement("div");
    const button = document.createElement("button");
    const h4 = document.createElement("h4");
    const br = document.createElement("br");
    const paraAuthor = document.createElement("p");
    const paraPages = document.createElement("p");
    const formCard = document.createElement("form");
    const label = document.createElement("label");

    //Give the nodes text from the form
    h4.textContent = element.bookTitle;
    paraAuthor.textContent = element.bookAuthor;
    paraPages.textContent = `${element.bookNumberOfPages} pages`;

    //Give classes to all nodes
    divCard.classList.add("card");
    button.classList.add("delete");
    button.setAttribute("value", element.bookArrayPosition);
    button.textContent = "X";
    divCardContainer.classList.add("card-container");
    h4.classList.add("title");
    paraAuthor.classList.add("author");
    paraPages.classList.add("pages");
    formCard.setAttribute("action", "#");
    //Issues with simply adding the node and text content, innerHTML resolved the issue
    label.innerHTML = '<input type="checkbox" name="read" value="Read" />Read';

    //Build out the book card
    bodyContainer
      .appendChild(divCard)
      .appendChild(button)
      .insertAdjacentElement("afterend", divCardContainer)
      .appendChild(h4)
      .insertAdjacentElement("afterend", br)
      .insertAdjacentElement("afterend", paraAuthor)
      .insertAdjacentElement("afterend", paraPages)
      .insertAdjacentElement("afterend", formCard)
      .appendChild(label);
  });
  addDeleteListener();
}

//Stop form default behavior and send to function
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  collectFormInfo();
  event.preventDefault();
});

//Show/hide add book form
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

function addDeleteListener() {
  const deleteButtons = document.querySelectorAll(".delete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
      myLibrary.pop(e.target.value);
      clearBooks();
      createBookCards();
      console.table(myLibrary);
    });
  }
}

function clearBooks() {
  while (bodyContainer.hasChildNodes()) {
    bodyContainer.removeChild(bodyContainer.firstChild);
  }
}

function clearForm() {
  form.reset();
}
