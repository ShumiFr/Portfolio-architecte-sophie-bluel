//Déclaration des variables
const postLoginApi="http://localhost:5678/api/users/login";

const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//=======================================================================

//Appel de l'API en POST lors de la validation du formulaire pour assurer la connection de l'utilisateur
form.addEventListener("submit", async function (submitButton){
    submitButton.preventDefault()
    const fetchInit = {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email : emailInput.value,
            password : passwordInput.value,
        }),
    };
    try {
        const response = await fetch(postLoginApi, fetchInit);
        
        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("token", data.token);
            location.href = "../HTML/index.html";
        }else {
            if (response.status === 401) {
                alert( "Mot de passe incorrect");
            } else if (response.status === 404) {
                alert("Erreur dans l’identifiant ou le mot de passe");
            }
        }
    }
    catch (error) {
    }
})
    