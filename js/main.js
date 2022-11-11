// get books list
const elBooksList = document.querySelector(".books-list");

// get template
const elTemplate = document.querySelector(".books-template").content;

//global fragment
const booksFragment = new DocumentFragment();

function renderBooks(){
    elBooksList.innerHTML = "";
    books.forEach(item => {
        const templateClone = elTemplate.cloneNode(true);

        templateClone.querySelector(".books-img").src = item.imageLink;
        templateClone.querySelector(".books-img").alt = item.title;
        templateClone.querySelector(".books-title").textContent = item.title;
        templateClone.querySelector(".books-author").textContent = item.author;
        templateClone.querySelector(".books-year").textContent = item.year;
        templateClone.querySelector(".books-pages").textContent = item.pages;
        templateClone.querySelector(".books-language").textContent = item.language;
        templateClone.querySelector(".books-link").href = item.link;
        templateClone.querySelector(".books-country").textContent = item.country;

        booksFragment.appendChild(templateClone);
    });
    elBooksList.appendChild(booksFragment)
};

renderBooks()