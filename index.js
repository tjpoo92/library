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
  createBookCards();
}
const bodyContainer = document.querySelector(".body");
function createBookCards() {
  clearBooks();
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
    if (element.bookNumberOfPages == "") {
      paraPages.textContent = "";
    } else {
      paraPages.textContent = `${element.bookNumberOfPages} pages`;
    }
    element.bookArrayPosition = myLibrary.indexOf(element);

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
    if (element.bookReadStatus == "true") {
      label.innerHTML = `<input type="checkbox" name="read" value="${element.bookArrayPosition}"  checked/>Read`;
      divCard.classList.add("read");
    } else {
      label.innerHTML = `<input type="checkbox" name="read" value="${element.bookArrayPosition}" />Read`;
    }
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
  addReadListener();
  setCardBackground();
  saveToLocalStorage();
}

function loadLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary == null) {
    myLibrary = [];
  } else {
    createBookCards();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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
      myLibrary.splice(e.target.value, 1);
      createBookCards();
    });
  }
}

function addReadListener() {
  const readCheckBox = document.querySelectorAll(
    '.card input[type="checkbox"]'
  );
  for (let i = 0; i < readCheckBox.length; i++) {
    readCheckBox[i].addEventListener("click", changeReadStatus);
  }
}

function changeReadStatus(e) {
  if (
    myLibrary[e.target.value].bookReadStatus == "false" ||
    myLibrary[e.target.value].bookReadStatus == false
  ) {
    myLibrary[e.target.value].bookReadStatus = true;
    saveToLocalStorage();
    setCardBackground();
  } else if (
    myLibrary[e.target.value].bookReadStatus == "true" ||
    myLibrary[e.target.value].bookReadStatus == true
  ) {
    myLibrary[e.target.value].bookReadStatus = false;
    saveToLocalStorage();
    setCardBackground();
  }
}

function setCardBackground() {
  let tempCards = document.querySelectorAll(".card");
  let tempCheckBox = document.querySelectorAll('.card input[type="checkbox"]');
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      myLibrary[i].bookReadStatus == "false" ||
      myLibrary[i].bookReadStatus == false
    ) {
      tempCheckBox[i].removeAttribute("checked");
      tempCards[i].style.backgroundColor = "lightgrey";
    } else if (
      myLibrary[i].bookReadStatus == "true" ||
      myLibrary[i].bookReadStatus == true
    ) {
      tempCheckBox[i].setAttribute("checked", null);
      tempCards[i].style.backgroundColor = "grey";
    }
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

loadLocalStorage();
