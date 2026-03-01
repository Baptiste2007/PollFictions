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
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('Password').value.trim();

    if (login !== "" && password !== "") {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputValue: login,
                inputValue2: password
            })
        })
            // La requête a échoué (400, 500...)
            .then(response => {
                // si la requête échoue (login déjà existant)
                if (!response.ok) {
                    alert("Ne pas dupliquer les identifiants");
                } else {
                    // La requête a réussi
                    alert("Compte créé !");
                }
            });
    } else {
        alert('Votre identifiant et votre mot de passe ne doivent pas être vides ou contenir uniquement des espaces.');
    }
});

// récupère tous les boutons avec la classe "contenue_oeuvre"
const contenue_oeuvre = document.getElementsByClassName("contenue_oeuvre");

// boucle sur tous les boutons
for (let i = 0; i < contenue_oeuvre.length; i++) {
    let bouton = contenue_oeuvre[i];

    bouton.addEventListener("click", function () {
        const idBouton = bouton.id;

        fetch('/Oeuvres', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then(response => response.json())
            .then(data => {
                let oeuvre = null;

                for (let k = 0; k < data.length; k++) {
                    if (data[k].Id == idBouton) {
                        oeuvre = data[k];
                        break;
                    }
                }

                if (oeuvre == null) {
                    alert("Oeuvre introuvable !");
                } else {
                    const div = document.getElementById("gen_contenue_oeuvre");

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

                    const duree = document.createElement("p");
                    duree.className = "infos";
                    duree.textContent = oeuvre.Durée;

                    const description = document.createElement("p");
                    description.id = "description";
                    description.textContent = oeuvre.Description;

                    const avis = document.createElement("textarea");
                    avis.type = "text";
                    avis.id = "Avis";
                    avis.placeholder = "Donner vos avis sur l'oeuvre.";

                    const noteDiv = document.createElement("div");
                    noteDiv.className = "stars";
                    let noteActuelle = 0;

                    for (let s = 1; s <= 5; s++) {
                        const etoile = document.createElement("span");
                        etoile.className = "star";
                        etoile.textContent = "★";

                        etoile.onclick = function () {
                            const toutesLesEtoiles = noteDiv.getElementsByClassName("star");

                            if (noteActuelle === s) {
                                for (let k = 0; k < toutesLesEtoiles.length; k++) {
                                    toutesLesEtoiles[k].classList.remove("active");
                                }
                                noteActuelle = 0;
                            } else {
                                for (let k = 0; k < toutesLesEtoiles.length; k++) {
                                    toutesLesEtoiles[k].classList.remove("active");
                                }
                                for (let k = 0; k < s; k++) {
                                    toutesLesEtoiles[k].classList.add("active");
                                }
                                noteActuelle = s;
                            }
                        };

                        noteDiv.appendChild(etoile);
                    }

                    const boutonVote = document.createElement("button");
                    boutonVote.textContent = "Vote";
                    boutonVote.id = "button_vote";

                    boutonVote.addEventListener("click", function () {
                        const IdOeuvres = oeuvre.Id;
                        const IdUsers = localStorage.getItem("IdUsers");
                        const valeurNote = noteActuelle;
                        const valeurAvis = avis.value;

                        if (IdUsers !== null) {
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

                    const boutonVoirVote = document.createElement("button");
                    boutonVoirVote.textContent = "Voir les votes";
                    boutonVoirVote.id = "bouton_voir_vote";

                    boutonVoirVote.addEventListener("click", function () {
                        const A_N = document.getElementById("A_N");
                        A_N.innerHTML = ""; // vide avant affichage

                        fetch('/Votes')
                            .then(response => response.json())
                            .then(votes => {
                                fetch('/Users')
                                    .then(response => response.json())
                                    .then(users => {
                                        const titreOeuvre = document.createElement("h3");
                                        titreOeuvre.id = "titre";
                                        titreOeuvre.textContent = oeuvre.Titre;
                                        A_N.appendChild(titreOeuvre);

                                        for (let v = 0; v < votes.length; v++) {
                                            if (votes[v].IdOeuvres == oeuvre.Id) {
                                                let nomUser = "Utilisateur inconnu";
                                                for (let u = 0; u < users.length; u++) {
                                                    if (users[u].Id == votes[v].IdUsers) {
                                                        nomUser = users[u].Login;
                                                    }
                                                }

                                                const bloc = document.createElement("div");

                                                for (let t = 0; t < 5; t++) {
                                                    const etoile = document.createElement("span");
                                                    etoile.textContent = "★";
                                                    etoile.className = "star";
                                                    if (t < votes[v].Note) {
                                                        etoile.classList.add("active");
                                                    }
                                                    bloc.appendChild(etoile);
                                                }

                                                const texte = document.createElement("p");
                                                texte.textContent = "Avis de " + nomUser + " : " + votes[v].Avis;
                                                bloc.appendChild(texte);

                                                A_N.appendChild(bloc);
                                            }
                                        }
                                    });
                            });
                    });

                    // On ajoute tous les éléments à la div
                    div.appendChild(h2);
                    div.appendChild(type);
                    div.appendChild(duree);
                    div.appendChild(description);
                    div.appendChild(avis);
                    div.appendChild(noteDiv);
                    div.appendChild(boutonVote);
                    div.appendChild(boutonVoirVote);
                }
            })
    })
};