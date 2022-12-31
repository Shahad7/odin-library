let myLibrary = [];
let currentTitle,currentAuthor,currentPages,currentStatus=false;
let found=0;

const form = document.querySelector('form');
const body = document.querySelector('body');
const formAndWarn = document.querySelector('.formAndWarn');
const warning = document.querySelector('.warn');
const grid = document.querySelector('.grid')

function Book(title,author,pages,status) {
  this.pages = pages;
  this.author = author;
  this.title = title;
  this.status = status;
}

function bookExists(book){
    let found = false;
    for(item of myLibrary)
    {
        if(item.title==book)
        {
            found =  true;
            break;
        }
    }
    return found;
}

function addBookToLibrary(title,author,pages,status) {
    book = new Book(title,author,pages,status);
    myLibrary.push(book);
}

function deleteCard(key){
    let card = document.querySelector(`#${key}`);
    grid.removeChild(card);
    myLibrary.splice(card.getAttribute('data-key'),1);

}

function updateReadStatus(index){
    let book = myLibrary[index];
    book.status = !book.status;
    console.log(book);
}
function makeACard(){
    if(myLibrary.length==0)
        return;
    else{
        let currentBook = myLibrary[myLibrary.length-1];
        let cardTitle = document.createElement('div');
        let cardAuthor = document.createElement('div');
        let cardPages = document.createElement('div');
        let cardStatus = document.createElement('input');
        let checkAndLabel = document.createElement('div');
        let label = document.createElement('label');
        label.textContent = "already read?";
        cardStatus.type = 'checkbox';
        let remove = document.createElement('button');
        let card = document.createElement('div');
        cardTitle.textContent = currentBook.title;
        cardAuthor.textContent = currentBook.author;
        cardPages.textContent = currentBook.pages;
        let readStatus = currentBook.status;
        card.setAttribute('data-key',(myLibrary.length-1));
        card.setAttribute('id',`c${myLibrary.length-1}`);
        cardStatus.setAttribute('id',`r${myLibrary.length-1}`);
        label.setAttribute('for',`r${myLibrary.length-1}`);
        remove.textContent = 'Remove book';
        remove.classList.add('remove');
        remove.addEventListener('click',()=>{deleteCard(card.getAttribute('id'))});
        cardStatus.addEventListener('click',()=>{updateReadStatus(myLibrary.length-1)})
        if(readStatus)
            cardStatus.setAttribute('checked',null);

        checkAndLabel.appendChild(label);
        checkAndLabel.appendChild(cardStatus);
        [cardTitle,cardAuthor,cardPages,checkAndLabel,remove].forEach((item)=>{
            card.appendChild(item);
        })
        card.classList.add('card');
        checkAndLabel.classList.add('checkbox');
        grid.appendChild(card);

    }
}

const add = document.querySelector('#add');
add.addEventListener('click',(e)=>{
    formAndWarn.classList.add('show');
    e.stopPropagation();
})

body.addEventListener('click',()=>{
    formAndWarn.classList.remove('show');
    warning.textContent = "";
    form.reset();
})

formAndWarn.addEventListener('click',(e)=>{
    formAndWarn.classList.add('show');
    e.stopPropagation();
})

const checkbox = document.querySelector('#status');
checkbox.addEventListener('click',()=>{
    currentStatus = !(currentStatus);
pars
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    warning.textContent = "";
    currentTitle = document.querySelector('#title').value;
    currentAuthor = document.querySelector('#author').value;
    currentPages = document.querySelector('#pages').value;
    if((currentAuthor&&currentPages&&currentTitle))
    {
        if(isNaN(parseInt(currentPages)))
        {
            warning.textContent = "pages must be a number";
            warning.style.color = 'red';
            return;
        }
        if(bookExists(currentTitle))
        {
            warning.textContent = "book already exists";
            warning.style.color = 'red';
            return;

        }
        addBookToLibrary(currentTitle,currentAuthor,currentPages,currentStatus);
        form.reset();
        formAndWarn.classList.remove('show')
        makeACard();
        
    }
    else
    {
        warning.textContent = "all fields must be filled";
        warning.style.color = 'red';
    }
});

