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
const deleteAllWorksButton = document.querySelector(".button-delete-gallery");
const backButton = document.querySelector(".back-button");
const modalFigures = [];
const trashIcons = [];
const select = document.querySelector("select");
const inputImage = document.querySelector(".image-input");
const inputTitle = document.querySelector("#title-input");
const previewImage = document.querySelector(".preview-image");
const hiddenPreviewElements = document.querySelectorAll(".hidden-to-preview");
const confirmAddWorkButton = document.querySelector(".confirm-add-work-button");
const formAddWorks = document.querySelector(".form-add-works");
//========================================================================

//Identification du token pour afficher le mode édition
if (userToken) {
  for (let element of hiddenElements) {
    element.classList.remove("hidden");
  }
  login.style.display = "none";
  logout.style.display = "block";
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
      addWorksModal.classList.add("modal-hidden");
    } else {
      modalContainer.classList.add("modal-active");
      deleteWorksModal.classList.remove("modal-hidden");
    }
  });
}

// Faire apparaitre les projet dans la gallerie de la modale
async function getWorksInModal() {
  try {
    response = await fetch(getWorksApi); //Travaux virtuel
    data = await response.json(); // Travaux sous forme d'objets manipulables

    for (let i in data) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const trashIconZone = document.createElement("div");
      const trashIcon = document.createElement("i");

      figure.setAttribute("data-category-id", data[i].category.id);
      figure.setAttribute("data-id", data[i].id);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      trashIcon.setAttribute("data-id", data[i].id);
      figcaption.innerHTML = "Editer";
      trashIconZone.classList.add("trash-zone");
      trashIcon.classList.add("fa-solid", "fa-trash-can", "trash-icon");

      trashIconZone.append(trashIcon);
      figure.append(img, figcaption, trashIconZone);
      modalGallery.append(figure);

      trashIcons.push(trashIcon);
      modalFigures.push(figure)
    }
    deleteWorksInit();
  } catch (error) {
    console.error(error);
  }
}

getWorksInModal();

// Supprimer des travaux
async function deleteWorks(workId) {
  const fetchInit = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const response = await fetch(
      `http://localhost:5678/api/works/${workId}`,
      fetchInit
    );

    if (response.ok) {
      console.log("projet supprimé");
    }
  } catch (error) {
    console.error(error);
  }
}

// Pour un travail
function deleteWorksInit() {
  for (let trashIcon of trashIcons) {
    trashIcon.addEventListener("click", function () {
      const workId = trashIcon.getAttribute("data-id");
      deleteWorks(workId);
      for (let figure of modalFigures) {
        if (figure.getAttribute("data-id") === workId) {
          figure.remove();
        }
      }
      for (let figure of figures) {
        if (figure.getAttribute("data-id") === workId) {
          figure.remove();
        }
      }
    });
  }

  // Pour tous les travaux
  deleteAllWorksButton.addEventListener("click", async function () {
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les travaux ?")) {
      for (let i in data) {
        const workId = data[i].id;
        deleteWorks(workId);
      }
      gallery.innerHTML = "";
      modalGallery.innerHTML = "";
    }
  });
}

//Accéder à la modale d'ajout de projets
addWorksButton.addEventListener("click", function () {
  addWorksModal.classList.remove("modal-hidden");
  deleteWorksModal.classList.add("modal-hidden");
});

// Retourner sur la modale de supression de projets
backButton.addEventListener("click", function () {
  addWorksModal.classList.add("modal-hidden");
  deleteWorksModal.classList.remove("modal-hidden");
});

// Ajouter dynamiquement les catégories dans les options de select
async function getCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    for (let i in data) {
      const option = document.createElement("option");

      option.setAttribute("value", data[i].id);
      option.innerHTML = data[i].name;

      select.append(option);
    }
  } catch (error) {
    console.error(error);
  }
}
getCategories();

// Prévisualiser l'image uploadée dans la modale
inputImage.addEventListener("change", function () {
  const file = inputImage.files[0];

  if (!allowedExtensions.some((e) => file.name.toLowerCase().endsWith(e))) {
    alert(`Veuillez mettre une image "jpg" ou "png"`);
    return;
  }

  if (file.size > maxFileSize) {
    alert("Image trop volumineuse !");
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(inputImage.files[0]);
  reader.addEventListener("load", function () {
    previewImage.src = reader.result;
  });

  for (let e of hiddenPreviewElements) {
    e.style.visibility = "hidden";
  }

  previewImage.style.display = "block";
});

// Donner la classe completed lorsque les champs sont remplis
function updateConfirmButton() {
  if (
    inputTitle.value.trim() !== "" &&
    select.value !== "no-value" &&
    inputImage.value !== ""
  ) {
    confirmAddWorkButton.classList.add("completed");
  } else {
    confirmAddWorkButton.classList.remove("completed");
  }
}

inputTitle.addEventListener("input", updateConfirmButton);
inputImage.addEventListener("input", updateConfirmButton);
for (let option of select) {
  option.addEventListener("change", updateConfirmButton);
}

// Création d'un projet lorsqu'on clique sur le bouton de validation
formAddWorks.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (confirmAddWorkButton.classList.contains("completed")) {
    const postWorksApi = "http://localhost:5678/api/works";

    const formData = new FormData();
    formData.append("title", inputTitle.value);
    formData.append("image", inputImage.files[0]);
    formData.append("category", select.value);

    const fetchInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    };
    try {
      const response = await fetch(postWorksApi, fetchInit);
      if (response.ok) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        const reader = new FileReader();
        reader.readAsDataURL(inputImage.files[0]);
        reader.addEventListener("load", function () {
          img.src = reader.result;
        });

        figure.setAttribute("data-category-id", select.value);
        img.setAttribute("alt", inputTitle.value);
        figcaption.innerHTML = inputTitle.value;

        figure.append(img, figcaption);
        gallery.append(figure);

        modalGallery.innerHTML = "";
        getWorksInModal();
        
        inputTitle.value = "";
        inputImage.value = "";
        select.value = "no-value";
        previewImage.src= "";
      
        for (let e of hiddenPreviewElements) {
          e.style.visibility = "visible";
        }

        alert("Le projet a bien été ajouté !");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Veuillez remplir tous les champs");
  }
});
