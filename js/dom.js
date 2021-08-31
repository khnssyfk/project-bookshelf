const UNCOMPLETED_LIST_ID_BOOK = "incompleteBookshelfList";
const COMPLETED_LIST_ID_BOOK = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

// addBook
function addBook(){
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_ID_BOOK);
    const completedBookList = document.getElementById(COMPLETED_LIST_ID_BOOK);
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    
    
    const checkButton = document.getElementById("inputBookIsComplete");
    
    if (checkButton.checked){
        isCompleted = true;

    }else{
        isCompleted = false;   
    }
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, isCompleted);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, isCompleted);

    newBook[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    
    if(isCompleted){
        completedBookList.append(newBook);
    }else{
        uncompletedBookList.append(newBook);
    }

    updateDataToStorage();
}
// makeBook
function makeBook(bookTitle, bookAuthor, bookYear, isCompleted){
    const textTitle = document.createElement("h2");
    textTitle.innerText = bookTitle;

    const labelAuthor = document.createElement("label");
    labelAuthor.classList = ("label_author")
    labelAuthor.innerText =("Penulis: ");
    const authorName = document.createElement("p")
    authorName.innerText = bookAuthor;

    labelAuthor.append(authorName);

    const labelYear = document.createElement("label");
    labelYear.classList = ("label_year")
    labelYear.innerText =("tahun: ");
    const yearNum = document.createElement("p")
    yearNum.innerText = bookYear;

    labelYear.append(yearNum);
 

    const container = document.createElement("article");
    container.classList.add("book_item");

    const btn_container = document.createElement("div");
    btn_container.classList.add("action");
    
    container.append(textTitle, labelAuthor, labelYear, btn_container);
    

    if (isCompleted){
        btn_container.append(createUndoButton(), createDeleteButton())

    }else{
        btn_container.append(createDoneButton(), createDeleteButton())
    }

    return container;
    
}
// addBookToCompleted
function addBookToCompleted(bookElement){
   const bookElement_title = bookElement.querySelector(".book_item > h2").innerText;
   const bookElement_author = bookElement.querySelector(".label_author > p").innerText;
   const bookElement_year = bookElement.querySelector(".label_year > p").innerText;
   
   const newBook = makeBook(bookElement_title, bookElement_author, bookElement_year, true);
   const bookCompleted = document.getElementById(COMPLETED_LIST_ID_BOOK);

   const book = findBook(bookElement[BOOK_ITEMID]);
   book.isCompleted = true;
   newBook[BOOK_ITEMID] = book.id;

   bookCompleted.append(newBook);
   bookElement.remove();
   updateDataToStorage();
}
// undoBookFromCompleted
function undoBookFromCompleted(bookElement){
const bookElement_title = bookElement.querySelector(".book_item > h2").innerText;
   const bookElement_author = bookElement.querySelector(".label_author > p").innerText;
   const bookElement_year = bookElement.querySelector(".label_year > p").innerText;
   
   const newBook = makeBook(bookElement_title, bookElement_author, bookElement_year, false);
   const bookUncompleted = document.getElementById(UNCOMPLETED_LIST_ID_BOOK);

   const book = findBook(bookElement[BOOK_ITEMID]);
   book.isCompleted = false;
   newBook[BOOK_ITEMID] = book.id;

   bookUncompleted.append(newBook);
   bookElement.remove();
   updateDataToStorage();
}
// removeBookFromCompleted
function removeBookFromCompleted(bookElement){
    var dialog = confirm ("Apakah anda yakin ingin menghapus?");
    if (dialog){
        const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
        books.splice(bookPosition,1);
        bookElement.remove();
        updateDataToStorage();
    }

}
// createButton
function createButton(buttonTypeClass, buttonText, eventListener){
    const button = document.createElement("button");
    button.innerText = (buttonText);
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

// createDeleteButton
function createDeleteButton(){
    return createButton("red", "Hapus Buku", function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement);

    });
}
// createUndoButton
function createUndoButton(){
    return createButton("green", "Belum Selesai Dibaca", function(event){
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}
// createDoneButton
function createDoneButton(){
    return createButton("green", "Selesai Dibaca", function(event){
        addBookToCompleted(event.target.parentElement.parentElement);        
    });
}