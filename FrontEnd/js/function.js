let urlAPI = "http://localhost:5678/api/works";
let works;
let token =  sessionStorage.getItem("token");

const createProjectHTML = (project) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const deleteButton = document.createElement("button");
  
    img.setAttribute("src", project.imageUrl);
    img.setAttribute("alt", project.title);
    img.setAttribute("cross-origin", "anonymous");
  
    deleteButton.innerText = "Supprimer";
    deleteButton.addEventListener("click", () => {
        // Ajouter ici le code pour supprimer le projet (envoi d'une requête DELETE)
    });
  
    figure.appendChild(img);
    figure.appendChild(deleteButton);
  
    return figure;
};

//Creation des different travaux
const createDOM = (projects) => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
  
    projects.forEach((project) => {
        const projectHTML = createProjectHTML(project);
        gallery.appendChild(projectHTML);
    });
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

//Partie Authentification et Modale

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

            // Afficher les projets dans la modal
            showProjectsInModal();
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

    //Mettre les projets dans la modale 

    const showProjectsInModal = () => {
        fetch(urlAPI)
        .then((response) => response.json())
        .then((projects) => {
            const modalContent = document.querySelector(".modal-content");
            modalContent.innerHTML = "";
    
            projects.forEach((project) => {
                const projectHTML = createProjectHTML(project);
                modalContent.appendChild(projectHTML);
            });

            const addProjectButton = document.createElement("button");
            addProjectButton.innerText = "Ajouter projet";
            addProjectButton.addEventListener("click", () => {
                // Ajouter ici le code pour afficher le formulaire d'ajout de projet
            });

            modalContent.appendChild(addProjectButton);
        });
    };

}else {
    console.log("saucisson");
}

console.log(sessionStorage);