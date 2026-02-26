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

// On récupère tous les boutons avec la classe "contenue_oeuvre"
const contenue_oeuvre = document.getElementsByClassName("contenue_oeuvre");
let v = 0;

// On boucle sur tous les boutons
for (let i = 0; i < contenue_oeuvre.length; i++) {

    // On ajoute un événement au clic sur chaque bouton
    contenue_oeuvre[i].addEventListener("click", function () {

        // 'this' fait référence au bouton cliqué
        const idBouton = this.id;
        console.log("Le bouton cliqué a l'ID :", idBouton);

        // On récupère toutes les oeuvres
        fetch('/Oeuvres', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {

                const div = document.getElementById("gen_contenue_oeuvre");

                // On trouve l'oeuvre correspondant à l'ID du bouton
                const oeuvre = data.find(item => item.Id.toString() === idBouton);
                if (!oeuvre) {
                    alert("Oeuvre introuvable !");
                    return;
                }

                // On supprime l'ancien contenu
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }

                // Création des éléments
                const h2 = document.createElement("h3");
                h2.id = "titre";
                h2.textContent = oeuvre.Titre;

                const type = document.createElement("p");
                type.className = "infos";
                type.textContent = oeuvre.Type;

                const Durée = document.createElement("p");
                Durée.className = "infos";
                Durée.textContent = oeuvre.Durée;

                const Description = document.createElement("p");
                Description.id = "description";
                Description.textContent = oeuvre.Description;

                const Avis = document.createElement("textarea");
                Avis.type = "text";
                Avis.id = "Avis";
                Avis.placeholder = "Donner vos avis sur l'oeuvre.";

                const Note = document.createElement("div");
                Note.className = "stars";

                let noteActuelle = 0;
                for (let j = 1; j <= 5; j++) {
                    const etoile = document.createElement("span");
                    etoile.className = "star";
                    etoile.textContent = "★";

                    etoile.onclick = function () {
                        const toutesLesEtoiles = Note.getElementsByClassName("star");

                        if (noteActuelle === j) {
                            for (let k = 0; k < toutesLesEtoiles.length; k++) {
                                toutesLesEtoiles[k].classList.remove("active");
                            }
                            noteActuelle = 0;
                        } else {
                            for (let k = 0; k < toutesLesEtoiles.length; k++) {
                                toutesLesEtoiles[k].classList.remove("active");
                            }
                            for (let k = 0; k < j; k++) {
                                toutesLesEtoiles[k].classList.add("active");
                            }
                            noteActuelle = j;
                        }
                    };

                    Note.appendChild(etoile);
                }

                const boutton_vote = document.createElement("button");
                boutton_vote.textContent = "Vote";
                boutton_vote.id = "button_vote";

                boutton_vote.addEventListener("click", function () {

                    const IdOeuvres = oeuvre.Id;
                    const IdUsers = localStorage.getItem("IdUsers");
                    const valeurNote = noteActuelle;
                    const valeurAvis = Avis.value;

                    fetch('/Votes', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            IdUsers: IdUsers,
                            IdOeuvres: IdOeuvres,
                            Note: valeurNote,
                            Avis: valeurAvis
                        })
                    })
                        .then(response => response.text())
                        .then(msg => {
                            alert("Utilisateur " + IdUsers + " a voté pour l'oeuvre " + IdOeuvres);
                        });
                });

                // On ajoute tout à la div
                div.appendChild(h2);
                div.appendChild(type);
                div.appendChild(Durée);
                div.appendChild(Description);
                div.appendChild(Avis);
                div.appendChild(Note);
                div.appendChild(boutton_vote);
                v++;

            })
    });
}