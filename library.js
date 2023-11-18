
const submitButton = document.querySelector(".submitButton");
const titleField = document.querySelector("#Title");
const authorField = document.querySelector("#Author");
const pagesField = document.querySelector("#Pages");
const readField = document.querySelector("#Read");
const bookInfo = document.querySelector(".bookInfo");

const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addText() {
    if (readField.checked) {
        return "Read";
    } else {
        return "Not read"
    }
}

function addBook() {
    library.push(new Book(titleField.value, authorField.value, pagesField.value, addText()));
    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    readField.checked = false;
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".showButton");

const darken = document.createElement("div");

showButton.addEventListener('click', () => {
    dialog.showModal();
    darken.setAttribute("id", "pageMask")
    const wholePage= document.querySelector("body")
    wholePage.appendChild(darken);
});

function changeColor(div, j) {
    if (library[j].read == "Read") {
        div.classList.add("read");
    } else {
        div.classList.add("notRead");
    }
}

function displayBook() {
    bookInfo.innerHTML = '';
    for(let i = 0; i < library.length; i++) {

        const bookDiv = document.createElement("div");
        
        const titleInfo = document.createElement("p");
        titleInfo.textContent = `\"${library[i].title}\"`;

        const authorInfo = document.createElement("p");
        authorInfo.textContent = library[i].author;

        const pagesInfo = document.createElement("p");
        pagesInfo.textContent = `${library[i].pages} pages`;

        const readInfo = document.createElement("button");
        readInfo.setAttribute("data-value", i)
        readInfo.textContent = library[i].read;
        changeColor(readInfo, i);
       
        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";

        bookInfo.appendChild(bookDiv);
        bookDiv.append(titleInfo, authorInfo, pagesInfo, readInfo, removeButton);   
    
        bookDiv.classList.add('bookDiv');
        titleInfo.classList.add('infocard');
        authorInfo.classList.add('infocard');
        pagesInfo.classList.add('infocard');
        readInfo.classList.add('readInfo');
        removeButton.classList.add('removeButton');
        
        bookDiv.dataset.lib = i;

        function removeBook() {
            const x = Number(bookDiv.dataset.lib)
            library.splice(x, 1);
        }
        const l = readInfo.dataset.value;

        readInfo.addEventListener('click', function () {
            if (readInfo.textContent == "Read") {
                library[l].read = "Not read"
                readInfo.textContent = "Not Read";
                readInfo.classList.add("notRead");
                readInfo.classList.remove("read")
            } else {
                library[l].read = "Read";
                readInfo.textContent = "Read";
                readInfo.classList.add("read");
                readInfo.classList.remove("notRead");
            } 
        });

        removeButton.addEventListener('click', function () {
            removeBook();
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










