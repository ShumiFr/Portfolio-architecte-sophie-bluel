let urlAPI = "http://localhost:5678/api/works";
let works;
let token =  sessionStorage.getItem("token");


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

if(token) {
    const modalLinks = document.querySelectorAll(".js-modal")
    document.getElementById("all-filter").style.display = "none";
    modalLinks.forEach((link) => {
        link.style.display = "flex";

        let modal = null;

        const openModal = function (e) {
            e.preventDefault();
            modal = document.querySelector(e.target.getAttribute('href'));
            modal.style.display = "flex";
            modal.removeAttribute('aria-hidden');
            modal.setAttribute('aria-modal', 'true');
            modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
        }

        link.addEventListener('click', openModal);

        const closeModal = function (e) {
            if (modal === null) return;
            if (e) {
                e.preventDefault();
            }
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'true');
            modal.removeAttribute('aria-modal');
        }
    });

}else {
    console.log("saucisson");
}

console.log(sessionStorage);