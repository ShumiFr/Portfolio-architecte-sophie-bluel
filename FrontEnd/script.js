const urlAPI = "http://localhost:5678/api/works";
let works;

fetch(urlAPI)
    .then(function (res) {
    if (res.ok) {
        return res.json();
    }
    throw new Error("Request failed");
  })
    .then(function (data) {
        works = data;
        console.log(works);

        for (let i = 0; i < works.length; i++) {
            let article = works[i];
            let gallery = document.querySelector(".gallery");
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");

            img.setAttribute("src", works[i].imageUrl);
            img.setAttribute("alt", works[i].title);
            img.setAttribute("crossorigin", "anonymous");

            figcaption.innerHTML = works[i].title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }
    })
    .catch(function (err) {
        console.log("Erreur :", err);
    });

    window.addEventListener("DOMContentLoaded", (event) => {

        const filterOverall = document.querySelector(".filterOverall");
        console.log("TRACE", filterOverall);
        filterOverall.addEventListener("click", function () {
            const overallFilter = filterWorksOverall(works);
            console.log(overallFilter);
        });

        const filterObject = document.querySelector(".filterObject");
        console.log("TRACE", filterObject);
        filterObject.addEventListener("click", function () {
            const objectFilter = filterWorksObject(works);
            console.log(objectFilter);
        });

        const filterAppart = document.querySelector(".filterAppart");
        console.log("TRACE", filterAppart);
        filterAppart.addEventListener("click", function () {
            const appartFilter = filterWorksAppart(works);
            console.log(appartFilter);
        });

        const filterHotel = document.querySelector(".filterHotel");
        console.log("TRACE", filterHotel);
        filterHotel.addEventListener("click", function () {
            const hotelFilter = filterWorksHotel(works);
            console.log(hotelFilter);
        });
    });

function filterWorksOverall(works) {
    let filteredWorks = works.filter(function (works) {
        return works.categoryId == "1" || works.categoryId == "2" || works.categoryId == "3";
    });
    
    let gallery = document.querySelector(".gallery");
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
    
    for (let i = 0; i < filteredWorks.length; i++) {
        let article = filteredWorks[i];
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
    
        img.setAttribute("src", filteredWorks[i].imageUrl);
        img.setAttribute("alt", filteredWorks[i].title);
        img.setAttribute("crossorigin", "anonymous");
    
        figcaption.innerHTML = filteredWorks[i].title;
    
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

function filterWorksObject(works) {
    let filteredWorks = works.filter(function (works) {
        return works.categoryId == "1";
    });
    
    let gallery = document.querySelector(".gallery");
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
    
    for (let i = 0; i < filteredWorks.length; i++) {
        let article = filteredWorks[i];
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
    
        img.setAttribute("src", filteredWorks[i].imageUrl);
        img.setAttribute("alt", filteredWorks[i].title);
        img.setAttribute("crossorigin", "anonymous");
    
        figcaption.innerHTML = filteredWorks[i].title;
    
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

function filterWorksAppart(works) {
    let filteredWorks = works.filter(function (works) {
        return works.categoryId == "2";
    });
    
    let gallery = document.querySelector(".gallery");
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
    
    for (let i = 0; i < filteredWorks.length; i++) {
        let article = filteredWorks[i];
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
    
        img.setAttribute("src", filteredWorks[i].imageUrl);
        img.setAttribute("alt", filteredWorks[i].title);
        img.setAttribute("crossorigin", "anonymous");
    
        figcaption.innerHTML = filteredWorks[i].title;
    
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

function filterWorksHotel(works) {
    let filteredWorks = works.filter(function (works) {
        return works.categoryId == "3";
    });
    
    let gallery = document.querySelector(".gallery");
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
    
    for (let i = 0; i < filteredWorks.length; i++) {
        let article = filteredWorks[i];
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
    
        img.setAttribute("src", filteredWorks[i].imageUrl);
        img.setAttribute("alt", filteredWorks[i].title);
        img.setAttribute("crossorigin", "anonymous");
    
        figcaption.innerHTML = filteredWorks[i].title;
    
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}