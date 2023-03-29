const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", function() {
    console.log("saucisson");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    request("http://localhost:5678/api/users/login", {
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
            console.log(response);
            if(response.token) {
                sessionStorage.setItem('token', response.token);
                location.href = "index.html";
                document.getElementById("top-bar").style.display = "flex";
            }
            else {
                display("E-mail ou mot de passe incorrect.")
            }
        })
        .catch(error => {
            console.error("Erreur : ", error);
            display("Erreur de connection.")
        });
});

