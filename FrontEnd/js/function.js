//window.addEventListener('DOMContentLoaded', (event) => {
    //request(urlAPI, { }).then(response => {
        //createDOM(response);
        //filterByApartment(response);
        //filterByObject(response);
        //filterByAll(response);
        //filterByHotel(response);
    //})

    request("http://localhost:5678/api/users/login", {
        method: 'POST',
        body: JSON.stringify({
            email: "sophie.bluel@test.tld",
            password: "S0phie"
        })
    }).then(response => {
        if(response.status && response.status === 'ok') {
            location.href = "index.html";
        }
    }).catch(error => {
        console.error(error.message);
        document.getElementById("errors").innerHTML = "Error: " + error.message;
    })