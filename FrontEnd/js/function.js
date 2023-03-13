let urlAPI = "http://localhost:5678/api/works";
let works;

//Creation des different travaux
const createDOM = (works) => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    works.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.setAttribute("src", work.imageUrl);
        img.setAttribute("alt", work.title);
        img.setAttribute("cross-origin", "anonymous");
    
        figcaption.innerHTML = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
        console.log(figure);
    })
};

//Partie filtre
const filterDataByAll = (data) => {
    return data.filter(work => work.categoryId === 1 || work.categoryId === 2 || work.categoryId === 3)
};

const filterDataByObject = (data) => {
    return data.filter(work => work.categoryId === 1)
};

const filterDataByApartment = (data) => {
    return data.filter(work => work.categoryId === 2)
};

const filterDataByHotel = (data) => {
    return data.filter(work => work.categoryId === 3)
};

const filterByAll = (works) => {
    console.log(works);
    document.querySelector(".filterAll").addEventListener("click",  () => {
        const worksFiltered = filterDataByAll(works);
        createDOM(worksFiltered);
    });
};

const filterByObject = (works) => {
    document.querySelector(".filterObject").addEventListener("click",  () => {
        const worksFiltered = filterDataByObject(works);
        createDOM(worksFiltered);
    });
};

const filterByApartment = (works) => {
    document.querySelector(".filterAppart").addEventListener("click",  () => {
        const worksFiltered = filterDataByApartment(works);
        createDOM(worksFiltered);
    });
};

const filterByHotel = (works) => {
    document.querySelector(".filterHotel").addEventListener("click",  () => {
        const worksFiltered = filterDataByHotel(works);
        createDOM(worksFiltered);
    });
};

//Partie Authentification
if(localStorage[1] == Response.token) {
    document.getElementById("all-filter").style.display = "none";
    document.getElementById("button-modal").style.display = "flex";
    console.log("oui");
}else {
    console.log("saucisson");
}

console.log(localStorage);

//Partie Modale

let modal = null;
const focusableSelector= "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal.querySelector(focusableSelector));
    previouslyFocusedElement = document.querySelector(":focus")
    modal.style.display = null;
    focusables[0].focus();
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault();
    modal.addEventListener('animationend', function () {
        modal.style.display = "none" 
        modal = null;
    })
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal);
        modal = null;
    }
    modal.addEventListener('animationend', hideModal);
   
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
    if (e.shiftKey === true) {
        index--
    } else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
})