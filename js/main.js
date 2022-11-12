//get localStorage data
const bookmarkArr = JSON.parse(localStorage.getItem("savedArr")) || [];

// get books list
const elBooksList = document.querySelector(".books-list");

//get bookmark list
const elBookmarkList = document.querySelector(".bookmark-wrap");

//get find form
const elForm = document.querySelector(".search-form");
const elSearchInput = elForm.querySelector(".search-input");
const elAuthorInput = elForm.querySelector(".input-author");
const elYearInput = elForm.querySelector(".input-year");
const elSortSelect = elForm.querySelector(".sort-select");

//get template
const elTemplate = document.querySelector(".books-template").content;
const elBookmarkTemplate = document.querySelector(".bookmark-template").content;

//global fragment
const booksFragment = new DocumentFragment();

//Sort books
function sortArr(booksArr, selectValue){
    if(selectValue === "a-z"){
        booksArr.sort((a, b) => {
            if(a.title > b.title) return 1
            if(a.title < b.title) return -1
            return 0
        });
    }
    if(selectValue === "z-a"){
        booksArr.sort((a, b) => {
            if(a.title > b.title) return -1
            if(a.title < b.title) return 1
            return 0
        });
    }
    if(selectValue === "start-year"){
        booksArr.sort((a, b) => a.year - b.year);
    }
    if(selectValue === "end-year"){
        booksArr.sort((a, b) => b.year - a.year);
    }
    if(selectValue === "few-sheets"){
        booksArr.sort((a, b) => a.pages - b.pages);
    }
    if(selectValue === "many-sheets"){
        booksArr.sort((a, b) => b.pages - a.pages);
    }
}

//Filter books
function filterArr(inputValue, authorInputValue){
    const yearInputValue = Number(elYearInput.value);
    const filterBooks = books.filter(item => {
        const filteredArr = item.title.match(inputValue) && item.author.match(authorInputValue) && item.year >= yearInputValue;
        return filteredArr
    });
    renderBooks(filterBooks, inputValue, authorInputValue);
}

//Form submit
elForm.addEventListener("submit", function (evt){
   evt.preventDefault();
   const searchInputValue = elSearchInput.value.trim();
   const searchAuthorValue = elAuthorInput.value.trim();
   const regex = new RegExp(searchInputValue, "gi");
   const authorRegex = new RegExp(searchAuthorValue, "gi");
   sortArr(books, elSortSelect.value);
   filterArr(regex, authorRegex);
});

//Render books list
function renderBooks(booksArr, searchRegex = "", authorRegex = ""){
    elBooksList.innerHTML = "";
    booksArr.forEach(item => {
        const templateClone = elTemplate.cloneNode(true);
        templateClone.querySelector(".bookmark-btn").dataset.id = item.id;
        if(item.add_bookmark === true){
            templateClone.querySelector(".bookmark-btn").src = "./icons/star.svg";
        }
        templateClone.querySelector(".books-img").src = item.img;
        templateClone.querySelector(".books-img").alt = item.title;
        if(searchRegex.source !== "(?:)" && searchRegex.source){
            templateClone.querySelector(".books-title").innerHTML = item.title.replace(searchRegex, `<mark class="title-mark">${searchRegex.source.toLowerCase()}</mark>`);
        } else{
        templateClone.querySelector(".books-title").textContent = item.title;
        }
        if(authorRegex.source !== "(?:)" && authorRegex.source){
            templateClone.querySelector(".books-author").innerHTML = item.author.replace(authorRegex, `<mark class="title-mark">${authorRegex.source.toLowerCase()}</mark>`);
        } else{
        templateClone.querySelector(".books-author").textContent = item.author;
        }
        templateClone.querySelector(".books-year").textContent = item.year;
        templateClone.querySelector(".books-pages").textContent = item.pages;
        templateClone.querySelector(".books-language").textContent = item.language;
        templateClone.querySelector(".books-link").href = item.link;
        templateClone.querySelector(".books-country").textContent = item.country;

        booksFragment.appendChild(templateClone);
    });
    elBooksList.appendChild(booksFragment);
};

//Render bookmark list
function renderBookmark(arr){
    elBookmarkList.innerHTML = "";
    arr.forEach(item => {
        const bookmarkTemplateClone = elBookmarkTemplate.cloneNode(true);

        bookmarkTemplateClone.querySelector(".bookmark-img").src = item.img;
        bookmarkTemplateClone.querySelector(".bookmark-title").textContent = item.title;
        bookmarkTemplateClone.querySelector(".books-author").textContent = item.author;
        bookmarkTemplateClone.querySelector(".bookmark-remove-btn").dataset.id = item.id;

        booksFragment.appendChild(bookmarkTemplateClone);
    });
    elBookmarkList.appendChild(booksFragment)
}

//Event delegation books list
elBooksList.addEventListener("click", function (evt){
    if(evt.target.matches(".bookmark-btn")){
        const btnId = Number(evt.target.dataset.id);
       const findObj = books.find(item => {
            return item.id === btnId;
       });
       if(!bookmarkArr.includes(findObj)){
       findObj.add_bookmark = !findObj.add_bookmark;
           bookmarkArr.push(findObj);
           renderBookmark(bookmarkArr);
       }
        localStorage.setItem("savedArr", JSON.stringify(bookmarkArr));
        renderBooks(books);
    }
});

//Event delegation bookmark list
elBookmarkList.addEventListener("click", function (evt){
    if(evt.target.matches(".bookmark-remove-btn")){
        const btnId = Number(evt.target.dataset.id);
        const findObj = books.find(item => item.id === btnId);
        findObj.add_bookmark = !findObj.add_bookmark;
        const findIndexObj = bookmarkArr.findIndex(item => item.id === btnId);
        bookmarkArr.splice(findIndexObj, 1);

        localStorage.setItem("savedArr", JSON.stringify(bookmarkArr));
        renderBookmark(bookmarkArr);
        renderBooks(books);
    }
});

renderBookmark(bookmarkArr);
renderBooks(books);

