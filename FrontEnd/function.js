
//Fonction qui crée le DOM pour les projets filtrés
const createDOM = (projects) => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    projects.forEach((project) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.setAttribute("src", project.imageUrl);
        img.setAttribute("alt", project.title);
        img.setAttribute("cross-origin", "anonymous");
    
        figcaption.innerHTML = project.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
        figure.classList.add(`project-${project.id}`);
    })
};

//Fonction de filtres pour les projets
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

//Fonction de filtrage pour chaque catégorie
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
