//Declaration des variables
let urlAPI = "http://localhost:5678/api/works";
let token =  sessionStorage.getItem("token");
let projects;

//Récupération des données depuis l'API
fetch(urlAPI, {
    headers: {
        "Authorization": "Bearer " + token
    }
})
.then(response => response.json())
.then(data => {
    //Assigner les données à la variable projects
    projects = data;
    //Afficher les projets dans la modale
    createProjectModal(projects);
})
.catch(error => console.error(error));

//Fonction pour afficher et supprimer les projets dans la modale
const createProjectModal = (projects) => {
    let modalGallery = document.querySelector(".modal-gallery")
    modalGallery.innerHTML = "";
    projects.forEach((project) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const categoryId = document.createElement("p");
        const deleteWork = document.createElement("i");

        img.setAttribute("src", project.imageUrl);
        figcaption.setAttribute("alt", project.title);
        figcaption.textContent = "Editer";
        categoryId.setAttribute("src", project.id)
        deleteWork.classList.add("fa-solid", "fa-trash-can");
        figure.append(img, figcaption, deleteWork);
        modalGallery.append(figure);

        deleteWork.addEventListener("click", function () {
            fetch(urlAPI + "/" + project.id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(data => 
                {
                    deleteWork.parentNode.remove();
                    document.querySelector(`.project-${project.id}`).remove();
                }) 
            .catch(error => console.error(error));
        })
    })
};

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


// Si l'utilisateur est authentifié, affiche les liens pour ouvrir la modale
if(token) {
    const modalLinks = document.querySelectorAll(".js-modal")
    document.getElementById("all-filter").style.display = "none";
    modalLinks.forEach((link) => {
        link.style.display = "flex";

        let modal = null;
        
        //Fonction pour ouvrir la modale
        const openModal = function (e) {
            e.preventDefault();
            modal = document.querySelector(e.target.getAttribute('href'));
            modal.style.display = "flex";
            modal.removeAttribute('aria-hidden');
            modal.setAttribute('aria-modal', 'true');
            modal.querySelector('.js-modal-close').addEventListener('click', closeModal);

            // Afficher les projets dans la modal
            createProjectModal(projects);
        }

        link.addEventListener('click', openModal);
        
        //Fonction pour fermer la modale
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
    console.log("Vous n'êtes pas admin");
}

console.log(sessionStorage);