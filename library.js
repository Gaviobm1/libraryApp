/* Associate the form elements with variables for object creation */
const submitButton = document.querySelector(".submitButton");
const titleField = document.querySelector("#Title");
const authorField = document.querySelector("#Author");
const pagesField = document.querySelector("#Pages");
const readField = document.querySelector("#Read");
const bookInfo = document.querySelector(".bookInfo");

/* Array to contain objects */
const library = [];

/* Object constructor function */
class Book{
    constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
}

/* Function to assign the appropriate value based on whether user has read the book or not */
function addText() {
    if (readField.checked) {
        return "Read";
    } else {
        return "Not read"
    }
}

/* Function to create a book object, push it to the library array and reset the form for the next object */
function addBook() {
    library.push(new Book(titleField.value, authorField.value, pagesField.value, addText()));
    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    readField.checked = false;
}

/* Modal with form to allow user to input book details */
const dialog = document.querySelector("dialog");

/* Button to bring up modal containing book details form */
const showButton = document.querySelector(".showButton");

/* Element to darken the background more than the default while the modal is on screen */
const darken = document.createElement("div");

/* Event listener so that when the button is clicked the element to darken the background and the form appear */
showButton.addEventListener('click', () => {
    dialog.showModal();
    darken.setAttribute("id", "pageMask")
    const wholePage= document.querySelector("body")
    wholePage.appendChild(darken);
});

/* Function to set the initial olor of the button informing the user of the read status of each book */
function setColor(div, j) {
    if (library[j].read == "Read") {
        div.classList.add("read");
    } else {
        div.classList.add("notRead");
    }
}

/* Function to change the colour and text content of the readInfo button and value of the read key in the corresponding object */
function changeReadStatus(div, num) {
    if (div.textContent == "Read") {
        library[num].read = "Not read"
        div.textContent = "Not Read";
        div.classList.add("notRead");
        div.classList.remove("read")
    } else {
        library[num].read = "Read";
        div.textContent = "Read";
        div.classList.add("read");
        div.classList.remove("notRead");
    } 
}

/* Function to create cards to display the book details */
function displayBook() {
    bookInfo.innerHTML = '';
    for(let i = 0; i < library.length; i++) {

        const bookDiv = document.createElement("div"); //container element for cards
        
        /* Elements for the details of the book */
        const titleInfo = document.createElement("p");
        titleInfo.textContent = `\"${library[i].title}\"`;

        const authorInfo = document.createElement("p");
        authorInfo.textContent = library[i].author;

        const pagesInfo = document.createElement("p");
        pagesInfo.textContent = `${library[i].pages} pages`;

        /* Button that displays the read status of the book */
        const readInfo = document.createElement("button"); 
        readInfo.textContent = library[i].read;
        /* Identifying data-attribute to be used in setColour function */
        readInfo.setAttribute("data-value", i) 
        setColor(readInfo, i);
       
        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";

        bookInfo.appendChild(bookDiv);
        bookDiv.append(titleInfo, authorInfo, pagesInfo, readInfo, removeButton);   
        
        /* Add classes for CSS styling */
        bookDiv.classList.add('bookDiv');
        titleInfo.classList.add('infocard');
        authorInfo.classList.add('infocard');
        pagesInfo.classList.add('infocard');
        readInfo.classList.add('readInfo');
        removeButton.classList.add('removeButton');
        
        const l = readInfo.dataset.value;
        readInfo.addEventListener('click', function () {
            changeReadStatus(readInfo, l);
        });
        
        /* Event listener for deleting cards */
        removeButton.addEventListener('click', function () {
            library.splice(i, 1);
            displayBook();
        }); 
    } 
};

submitButton.addEventListener('click', function () {
    addBook();
    displayBook();
    dialog.close();
    darken.remove();
});










