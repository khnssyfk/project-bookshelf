const bookshelfKey ="BOOK_DATA";

let books = [];

function isStorageExist(){
    if(typeof(Storage) == undefined){
        alert("Browser tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(bookshelfKey, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(bookshelfKey);

    let data = JSON.parse(serializedData);

    if (data !== null)
            books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}
function updateDataToStorage(){
    if (isStorageExist())
        saveData();
}
function composeBookObject (title, author, year, isCompleted){
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    }

}

function findBook(bookId){
    for (book of books){
        if (book.id === bookId)
                return book;
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for (book of books){
        if (book.id === bookId)
            return index;
    index++;
    }
    return -1;
}

function refreshDataFromBooks(){
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_ID_BOOK);
    const completedBookList = document.getElementById(COMPLETED_LIST_ID_BOOK);

    for(book of books){
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            completedBookList.append(newBook);
        }else{
            uncompletedBookList.append(newBook);

        }
    }
}