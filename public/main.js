const connection = document.getElementById("button_connection");
if (localStorage.getItem("IdUsers") !== null) {
    fetch('/info')
        .then(responsebrute => responsebrute.json())
        .then(
            responsejson => {
                document.getElementById('reponse').innerHTML = responsejson.cle2;
                connection.innerHTML = responsejson.cle1;
            });
}
connection.addEventListener('click', () => {

    if (localStorage.getItem("IdUsers") !== null) {
        // Déconnexion
        localStorage.removeItem('IdUsers');
        location.reload();
    } else {
        // Connexion
        const login = document.getElementById('login').value;
        const password = document.getElementById('Password').value;

        fetch('/connexion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: login, password: password })

        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("IdUsers", data.user.Id);
                location.reload();
            });
    }
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

                //Trouver l'oeuvre correspondant à l'ID du bouton
                let oeuvre = null;

                for (let i = 0; i < data.length; i++) {
                    if (data[i].Id == idBouton) {
                        oeuvre = data[i];
                        break;
                    }
                }

                if (oeuvre == null) {
                    alert("Oeuvre introuvable !");
                    return;
                }

                // supprime l'ancien contenu
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
                    if (localStorage.getItem("IdUsers") !== null) {
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
                    } else {
                        alert('Connectez-vous pour pouvoir voter');
                    }
                });

                const boutton_voir_vote = document.createElement("button");
                boutton_voir_vote.textContent = "Voir les votes";
                boutton_voir_vote.id = "boutton_voir_vote";

                boutton_voir_vote.addEventListener("click", function () {

                    const A_N = document.getElementById("A_N");
                    A_N.innerHTML = ""; // on vide avant affichage

                    fetch('/Votes')
                        .then(response => response.json())
                        .then(votes => {

                            fetch('/Users')
                                .then(response => response.json())
                                .then(users => {
                                    const Q_O = document.createElement("h3");
                                    Q_O.id = "titre";
                                    Q_O.textContent = oeuvre.Titre;
                                    A_N.appendChild(Q_O);
                                    for (let i = 0; i < votes.length; i++) {

                                        // On vérifie si le vote correspond à l'œuvre cliquée
                                        if (votes[i].IdOeuvres == oeuvre.Id) {

                                            let nomUser = "Utilisateur inconnu";

                                            for (let j = 0; j < users.length; j++) {
                                                if (users[j].Id == votes[i].IdUsers) {
                                                    nomUser = users[j].Login;
                                                }
                                            }

                                            const bloc = document.createElement("div");

                                            // étoiles
                                            for (let t = 0; t < 5; t++) {
                                                const etoile = document.createElement("span");
                                                etoile.textContent = "★";
                                                etoile.className = "star";

                                                if (t < votes[i].Note) {
                                                    etoile.classList.add("active");
                                                }

                                                bloc.appendChild(etoile);
                                            }

                                            const texte = document.createElement("p");
                                            texte.textContent = "Avis de " + nomUser + " : " + votes[i].Avis;


                                            bloc.appendChild(texte);
                                            A_N.appendChild(bloc);
                                        }
                                    }

                                });

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
                div.appendChild(boutton_voir_vote);
                v++;

            })
    });
}