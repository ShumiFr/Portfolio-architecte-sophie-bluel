let urlAPI = "http://localhost:5678/api/works";
let works;

const createDOM = (works) => {
    const gallery = document.querySelector(".gallery");

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
    })
}

const filterDataByAll = (data) => {
    return data.filter(work => work.categoryId === 1 || work.categoryId === 2 || work.categoryId === 3)
}

const filterDataByObject = (data) => {
    return data.filter(work => work.categoryId === 1)
}

const filterDataByApartment = (data) => {
    return data.filter(work => work.categoryId === 2)
}

const filterDataByHotel = (data) => {
    return data.filter(work => work.categoryId === 3)
}

window.addEventListener('DOMContentLoaded', (event) => {
    const filterByAll = (works) => {
        document.querySelector(".filterAll").addEventListener("click",  () => {
            const worksFiltered = filterDataByAll(works);
            createDOM(worksFiltered);
        });
    }

    const filterByObject = (works) => {
        document.querySelector(".filterObject").addEventListener("click",  () => {
            const worksFiltered = filterDataByObject(works);
            createDOM(worksFiltered);
        });
    }

    const filterByApartment = (works) => {
        document.querySelector(".filterAppart").addEventListener("click",  () => {
            const worksFiltered = filterDataByApartment(works);
            createDOM(worksFiltered);
        });
    }
    const filterByHotel = (works) => {
        document.querySelector(".filterHotel").addEventListener("click",  () => {
            const worksFiltered = filterDataByHotel(works);
            createDOM(worksFiltered);
        });
    }
})
