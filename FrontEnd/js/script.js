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
            console.log(data);
        }
    }
    catch (error) {

    }
}

getWorks();