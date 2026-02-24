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
            const h2 = document.createElement("h3");
            h2.id = "titre";
            h2.textContent = data[0].Titre;

            //Type
            const type = document.createElement("p");
            type.id = "infos";
            type.textContent = data[0].Type;

            //Durée
            const Durée = document.createElement("p");
            Durée.id = "infos";
            Durée.textContent = data[0].Durée;

            //Description
            const Description = document.createElement("p");
            Description.id = "description";
            Description.textContent = data[0].Description;

            // Avis
            const Avis = document.createElement("input");
            Avis.type = "text";
            Avis.id = "Avis";
            Avis.placeholder = "Donner vos avis sur l'oeuvre.";

            // Note
            const Note = document.createElement("div");
            Note.className = "stars";

            let noteActuelle = 0;
            for (let i = 1; i <= 5; i++) {

                let etoile = document.createElement("span");
                etoile.className = "star";
                etoile.textContent = "★";

                etoile.onclick = function () {

                    let toutesLesEtoiles = Note.getElementsByClassName("star");

                    // si on clique sur la même note
                    if (noteActuelle === i) {

                        // on enlève tout
                        for (let j = 0; j < toutesLesEtoiles.length; j++) {
                            toutesLesEtoiles[j].classList.remove("active"); //nom de classe CSS
                        }

                        noteActuelle = 0;

                    } else {

                        // on enlève tout d'abord
                        for (let j = 0; j < toutesLesEtoiles.length; j++) {
                            toutesLesEtoiles[j].classList.remove("active");
                        }

                        // on colore jusqu'à l'étoile cliquée
                        for (let j = 0; j < i; j++) {
                            toutesLesEtoiles[j].classList.add("active");
                        }

                        noteActuelle = i; // on mémorise la nouvelle note
                    }
                };

                Note.appendChild(etoile);
            }

            // Bouton vote
            const boutton_vote = document.createElement("button");
            boutton_vote.textContent = "Vote";
            boutton_vote.id = "button_vote";

            boutton_vote.addEventListener("click", () => {

                // On récupère les VALEURS
                let IdOeuvres = data[0].Id;
                let IdUsers = localStorage.getItem("IdUsers");
                let valeurNote = noteActuelle;
                let valeurAvis = Avis.value;

                fetch('/Votes', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        IdUsers: IdUsers,
                        IdOeuvres: IdOeuvres,
                        Note: valeurNote,
                        Avis: valeurAvis
                    })

                })
                    .then(response => response.text())
                    .then(data => {
                        alert("Utilisateur " + IdUsers + " a voté pour l'oeuvre " + IdOeuvres);
                    });
            });

            //Affichage
            if (v != 1) {
                div.appendChild(h2);
                div.appendChild(type);
                div.appendChild(Durée);
                div.appendChild(Description);
                div.appendChild(Avis);
                div.appendChild(Note);
                div.appendChild(boutton_vote);
                v++;
            } else {
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                div.removeChild(div.firstChild);
                v--;
            }

        })
});