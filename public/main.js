const connection = document.getElementById("button_connection");
connection.addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const password = document.getElementById('Password').value;

    fetch('/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: login, password: password })
    }).then(response => response.json())
        .then(data => {
            alert(data.message);
            alert('ID utilisateur : ' + data.user.Id);
            localStorage.setItem("IdUsers", data.user.Id);
        });

    fetch('/info')
        .then(responsebrute => responsebrute.json())
        .then(
            responsejson => {
                document.getElementById('reponse').innerHTML = responsejson.cle2;
            });
});

const button_sign_up = document.getElementById('button_sign_up');
button_sign_up.addEventListener('click', () => {
    const Password = document.getElementById('Password');
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: login.value, inputValue2: Password.value })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
});

const contenue_oeuvre = document.getElementById("contenue_oeuvre");
let v = 0;
contenue_oeuvre.addEventListener('click', () => {

    fetch('/Oeuvres', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            const div = document.getElementById("gen_contenue_oeuvre");

            //Titre
            const h2 = document.createElement("titre");
            h2.textContent = data[0].Titre;

            //Type
            const type = document.createElement("infos");
            type.textContent = data[0].Type;

            //Durée
            const Durée = document.createElement("infos");
            Durée.textContent = data[0].Durée;

            //Description
            const Description = document.createElement("description");
            Description.textContent = data[0].Description;

            //boutton vote
            const boutton_vote = document.createElement("button");
            boutton_vote.textContent = "Clique-moi !";
            //boutton_vote.id = "boutonDynamique";
            //boutton_vote.className = "btn";
            boutton_vote.addEventListener("click", () => {

                let IdOeuvres = data[0].Id;
                let IdUsers = localStorage.getItem("IdUsers");
                let Note = "0";
                let Avis = "0";

                //const newDiv = document.createElement("p");
                //const newContent = document.createTextNode("L'id Utilisateur " +
                    //idElecteur + "  voter pour l'id " + idUser);

                //const currentDiv = document.getElementById("div");

                fetch('/Votes', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ IdUsers: IdUsers, IdOeuvres: IdOeuvres, Note: Note, Avis: Avis})
                }).then(response => response.text())
                    .then(data => {
                        alert("L'id Utilisateur " + IdOeuvres + "  voter pour l'id " + IdUsers);
                    });
                //newDiv.appendChild(newContent);

                //document.body.insertBefore(newDiv, currentDiv);


            });

            //Affichage
            if (v != 1) {
                div.appendChild(h2);
                div.appendChild(type);
                div.appendChild(Durée);
                div.appendChild(Description);
                div.appendChild(boutton_vote);
                v++;
            } else {
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                v--;
            }

        })
});