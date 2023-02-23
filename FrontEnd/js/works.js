window.addEventListener('DOMContentLoaded', (event) => {
    request(urlAPI, {}).then(response => {
        createDOM(response);
        filterByApartment(response);
        filterByObject(response);
        filterByAll(response);
        filterByHotel(response);
    })
})

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", function() {
    console.log("saucisson");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {
                alert("Connexion réussie !");
                location.href = "index.html";

            } else {
                alert("Erreur dans l’identifiant ou le mot de passe");

            }
        })
        .catch(error => {
            console.error("Erreur : ", error);
            alert("Une erreur est survenue lors de la connexion.");
        });
});


