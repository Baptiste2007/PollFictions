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
    
    //voir servet.js
    let idElecteur = localStorage.getItem("idUser");
    //voir sur index.html
    let idUser = document.getElementById("usersList").value;

    //créer p
    
    const newDiv = document.createElement("p");
    //le contenue de p
    const newContent = document.createTextNode("L'id Utilisateur " +
        idElecteur + "  voter pour l'id " + idUser);
    //créer un nouvelle div
    const currentDiv = document.getElementById("div");

    fetch('/Oeuvres', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idValue: idUser, idElecteur: idElecteur })
    }).then(response => response.text())
        .then(data => {
            alert("L'id Utilisateur " + idElecteur + "  voter pour l'id " + idUser);
        });
        //asemblement de p et du contenu de p
        newDiv.appendChild(newContent);
        //asemblement de la div avec l'asemblement de p et du contenu de p
        document.body.insertBefore(newDiv, currentDiv);
    

});



