//Declaration des variables
let getWorksApi = "http://localhost:5678/api/works";

//Variables Travaux
const gallery = document.querySelector(".gallery");
const figures = [];

//=======================================================================

//Variables Filtres
const filterAll = document.querySelector(".filterAll")
const AllFilter = document.querySelectorAll(".filter ul li")

//Fonctions pour récupérer les travaux de l'Api
async function getWorks() {
    try {
        const response = await fetch(getWorksApi); //Travaux virtuel
        const data = await response.json(); // Travaux sous forme d'objets manipulables

        for (let i in data) {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");

            figure.setAttribute("data-category-id", data[i].category.id)
            figure.setAttribute("data-id", data[i].id)
            img.setAttribute("src", data[i].imageUrl);
            img.setAttribute("alt", data[i].title);
            img.setAttribute("crossorigin", "anonymous");
            figcaption.innerHTML = data[i].title;

            figure.append(img, figcaption);
            gallery.append(figure);

            figures.push(figure); //On push chaque figure dans le tableau figures de manière à pouvoir utiliser chaque figure à l'exterieur de la boucle
        }
    }
    catch (error) {

    }
}

getWorks();