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
            alert('ID utilisateur : ' + data.user.id);
            localStorage.setItem("idUser", data.user.id);
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
contenue_oeuvre.addEventListener('click', () => {

    fetch('/Oeuvres', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())   // <-- JSON obligatoire
    .then(data => {
        const div = document.getElementById("gen_contenue_oeuvre");
        const h2 = document.createElement("h2");

        h2.textContent = data[0].Titre;  // <-- Premier titre du tableau
        div.appendChild(h2);
    })
    .catch(err => console.error(err));
});