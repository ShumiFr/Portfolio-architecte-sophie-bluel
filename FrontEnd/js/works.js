window.addEventListener('DOMContentLoaded', (event) => {
    request(urlAPI, {}).then(response => {
        createDOM(response);
        filterByApartment(response);
        filterByObject(response);
        filterByAll(response);
        filterByHotel(response);
    })
})


