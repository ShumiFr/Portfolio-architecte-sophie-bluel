const urlAPI = "http://localhost:5678/api/works"

fetch(urlAPI)
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(value){
        console.log(value);

        for(let i = 0; i < value.length; i++) {
            let gallery = document.querySelector(".gallery");
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");

            img.setAttribute("src", value[i].imageUrl);
            img.setAttribute("alt", value[i].title);
            img.setAttribute ("crossoring", "anonymous");

            figcaption.innerHTML = value[i].title;

            figure.append(img,figcaption);
            gallery.append(figure);
        }
    })
    .catch(function(err){
        console.log("saucisse");
    });

