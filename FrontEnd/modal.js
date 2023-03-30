//Déclarations des variables

// Variables login, logout & mode edition
const userToken = sessionStorage.getItem("token");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const hiddenElements = document.querySelectorAll(".hidden");

// Variables pour les modales :
const modalContainer = document.querySelector(".modal-container");
const triggerButtons = document.querySelectorAll(".modal-trigger");
const deleteWorksModal = document.querySelector(".delete-works-modal");
const addWorksModal = document.querySelector(".add-works-modal");
const allowedExtensions = ["jpg", ".jpeg", ".png"];
const maxFileSize = 4 * 1024 * 1024; //4Mo

//Variables gestion des travaux
const modalGallery = document.querySelector(".modal-gallery");
const addWorksButton = document.querySelector(".add-works-button");
const deleteAllWorksButton = document.querySelector(".delete-all-works-button");

//========================================================================

//Identification du token pour afficher le mode édition
if (userToken) {
  for (let element of hiddenElements) {
    element.classList.remove("hidden");
  }
  login.style.display = "none";
}

//  Modale de déconnexion
logout.addEventListener("click", function () {
  if (confirm("Êtes-vous sûr(e) de vouloir vous deconnecter ?")) {
    sessionStorage.removeItem("token");
    for (let element of hiddenElements) {
      element.classList.add("hidden");
    }
    login.style.display = "block";
    location.href = "index.html";
  } 
});

// Faire apparaître et disparaitre les modales grâce aux boutons déclencheurs
for (let button of triggerButtons) {
  button.addEventListener("click", function () {
    if (modalContainer.classList.contains("modal-active")) {
      modalContainer.classList.remove("modal-active");
    } else {
      modalContainer.classList.add("modal-active");
    }
  });
}

// Faire apparaitre les projet dans la gallerie de la modale

async function getWorksInModal() {
  try {
    const response = await fetch(getWorksApi); //Travaux virtuel
    const data = await response.json(); // Travaux sous forme d'objets manipulables

    for (let i in data) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const trashIconZone = document.createElement("div")
      const trashIcon = document.createElement("i");

      figure.setAttribute("data-category-id", data[i].category.id);
      figure.setAttribute("data-id", data[i].id);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = "Editer";
      trashIconZone.classList.add("trash-zone")
      trashIcon.classList.add("fa-solid", "fa-trash-can", "trash-icon");

      trashIconZone.append(trashIcon)
      figure.append(img, figcaption, trashIconZone);
      modalGallery.append(figure);

      figures.push(figure); //On push chaque figure dans le tableau figures de manière à pouvoir utiliser chaque figure à l'exterieur de la boucle
    }
  } catch (error) {}
}
getWorksInModal();
