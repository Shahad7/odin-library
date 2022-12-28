let myLibrary = [];
let currentTitle,currentAuthor,currentPages,currentStatus=false;
let found=0;

const form = document.querySelector('form');
const body = document.querySelector('body');
const formAndWarn = document.querySelector('.formAndWarn');
const warning = document.querySelector('.warn');


function Book(title,author,pages,status) {
  this.pages = pages;
  this.author = author;
  this.title = title;
  this.status = status;
}

function addBookToLibrary(title,author,pages,status) {
    book = new Book(title,author,pages,status);
    myLibrary.push(book);
}

function displayBook(book){
    alert(book.author);
}

const add = document.querySelector('#add');
add.addEventListener('click',()=>{
    formAndWarn.classList.add('show');

})


const checkbox = document.querySelector('#status');
checkbox.addEventListener('click',()=>{
    currentStatus = !(currentStatus);

})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    warning.textContent = "";
    currentTitle = document.querySelector('#title').value;
    currentAuthor = document.querySelector('#author').value;
    currentPages = document.querySelector('#pages').value;
    if(currentAuthor&&currentPages&&currentTitle)
    {
        addBookToLibrary(currentTitle,currentAuthor,currentPages,currentStatus);
        form.reset();
        formAndWarn.classList.remove('show')
    }
    else
    {
        warning.textContent = "all fields must be filled";
        warning.style.color = 'red';
    }
});

