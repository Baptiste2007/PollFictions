const connection = document.getElementById("button_connection");
if (localStorage.getItem("IdUsers") !== null) {
    fetch('/info')
        .then(responsebrute => responsebrute.json())
        .then(
            responsejson => {
                document.getElementById('reponse').innerHTML = localStorage.getItem("Nom_Users") + " " + responsejson.cle2;
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
                localStorage.setItem("Nom_Users", data.user.Login);
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

//moyenne
let sauve = 0;
let erre = Array(sauve).fill(0);

let tab_sauv_nbt = Array(sauve).fill(0);

//récupérer tout les votes des users
fetch('/Votes')
    .then(response => response.json())
    .then(data => {
        //max votes
        let max_votes = data.length;
        sauve = max_votes;

        //récupe id des oeuvre
        const oeuvres = document.getElementsByClassName("B_image_car");
        let max_oeuvre = oeuvres.length;

        // Initialisation des tableaux
        let sauve_note = Array(max_oeuvre).fill(0);
        let nbtvote = Array(max_oeuvre).fill(0);

        // Comparer les id des oeuvres avec les id vote (bdd)
        for (let i = 0; i < max_votes; i++) {
            let oeuvre_ctl = data[i].IdOeuvres;

            for (let j = 0; j < max_oeuvre; j++) {
                if (oeuvre_ctl == oeuvres[j].id) {
                    sauve_note[j] += data[i].Note;
                    nbtvote[j] += 1;
                    tab_sauv_nbt[j] = nbtvote[j];
                }
            }
        }

        // Moyenne
        let moyenne = Array(max_oeuvre).fill(0);
        for (let m = 0; m < max_oeuvre; m++) {
            if (nbtvote[m] > 0) {
                moyenne[m] = sauve_note[m] / nbtvote[m];
                moyenne[m] = Math.floor(moyenne[m]); //prendre uniquemment les chiffres avent la virgule
            } else {
                moyenne[m] = 0; // si null alors indiquer "pas de vote"
            }
        }

        // création des étoiles
        const B_image_car = document.getElementsByClassName("B_image_car");

        for (let v = 0; v < B_image_car.length; v++) {
            const container = B_image_car[v];

            // Création du paragraphe pour afficher la valeur max
            const max = document.createElement("p");
            max.id = "max_vote";

            const nbVotes = tab_sauv_nbt[v];
            let valeur = 0;

            if (nbVotes !== undefined) {
                valeur = nbVotes;
            }
            max.textContent = "Vote de " + valeur + " utilisateur(s)";

            const bloc = document.createElement("div");

            // Génération des étoiles
            for (let t = 0; t < 5; t++) {
                const etoile = document.createElement("span");
                etoile.textContent = "★";
                etoile.className = "star";

                if (t < moyenne[v]) {
                    etoile.classList.add("active");
                }

                bloc.appendChild(etoile);
            }

            container.appendChild(bloc);
            container.appendChild(max);

        }


        //voir doublon vote user
        const user = localStorage.getItem("IdUsers");
        for (let o = 0; o < max_oeuvre; o++) {
            for (let v = 0; v < max_votes; v++) {
                if (user == data[v].IdUsers && oeuvres[o].id == data[v].IdOeuvres) {
                    erre[o] = 975;
                }

            }
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

                    //étoile
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

                        if (erre[idBouton - 1] != 975) {
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
                                    .then(response => response.json())
                                    .then(bdd => {
                                        alert("Vote entregistrer");
                                    });
                            } else {
                                alert('Connectez-vous pour pouvoir voter');
                            }
                            location.reload();
                        } else {
                            alert("Vous ne pouver pas voter deux foit pour la méme oeuvre");
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