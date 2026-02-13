const express = require('express');
const app = express();
const port = 3005; // Le port sur lequel votre serveur écoutera
const mysql = require('mysql2');


// Pour ce connectés à la base :
const connection = mysql.createConnection({
  host: '172.29.18.113',
  user: 'Poll Fictions',
  password: 'Poll Fictions',
  database: 'Poll Fictions'
});

//MORELLE Geoffrey :
/*const connection = mysql.createConnection({
  host: '172.29.18.115',
  user: 'accessNodeServerDemo',
  password: 'accessNodeServerDemo',
  database: 'Poll Fictions'
});*/

// pour ce connectés a la maison (Baptiste)
//const connection = mysql.createConnection({
//host: '192.168.1.45',
//user: 'Poll Fictions',
//password: 'Poll Fictions',
//database: 'Poll Fictions'
//});
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

app.use(express.static('public'));
app.use(express.json());


// Permet de se connectés 
app.post('/connexion', (req, res) => {
  console.log(req.body);
  //on récupère le login et le password
  const { login, password } = req.body;
  connection.query('SELECT * FROM Users WHERE login = ? AND password = ?', [login, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification des identifiants :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: 'Identifiants invalides' });
      return;
    }
    // Identifiants valides 
    //renvoi les informations du user
    res.json({ message: 'Connexion réussie !', user: results[0] });
  });
});

app.get('/info', (req, res) => {
  res.json({ cle1: 'toujour pas Connecter', cle2: 'Connecter' });
});

// récupérer les Users 
app.get('/Users', (req, res) => {
  connection.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});


// Insérer de nouveux Users dans la base 
app.post('/register', (req, res) => {

  connection.query(
    'INSERT INTO Users (Login, password) VALUES (?, ?)',
    [req.body.inputValue, req.body.inputValue2],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Insertion réussie, ID utilisateur :', results.insertId);
      res.json({ message: 'Inscription réussie !', userId: results.insertId });

    }
  );
})

// Pour voter :
app.post('/vote', (req, res) => {

  connection.query(
    'INSERT INTO vote (Note, Avis, IdUser, IdOeuvres, Date) VALUES (?, ?, ?, ?, NOW())',
    [req.body.insertValue1, req.body.insertValue2, req.body.IdUser, req.body.IdOeuvres],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion du vote dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Vote enregistré avec succès, ID du vote :', results.insertId);
      res.json({ message: 'Vote enregistré avec succès !', voteId: results.insertId });
    }
  );
});


// Pour récupérer les oeuvres :
app.get('/Oeuvres', (req, res) => {
  connection.query('SELECT * FROM Oeuvres', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des Oeuvres :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});




// Démarrer le serveur
app.listen(port, () => {
  let Ip = require("ip").address();
  console.log(`Le serveur est en http://${Ip}:${port}`);
})