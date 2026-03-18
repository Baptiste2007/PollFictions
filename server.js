import 'dotenv/config';
import mysql from 'mysql2';
import express from 'express';
import ip from 'ip';
import jwt from "jsonwebtoken";

const app = express();
const port = 3005;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

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

  const { login, password } = req.body;

  connection.query(
    'SELECT * FROM Users WHERE login = ? AND password = ?',
    [login, password],
    (err, results) => {

      if (err) {
        console.error('Erreur lors de la vérification des identifiants :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }

      const user = results[0];
/*
      // Génération du token
      const token = jwt.sign(
        { id: user.id, login: user.login },
        "MA_CLE_SECRETE",
        { expiresIn: "2h" }
      );*/

      // Réponse finale (unique)
      return res.json({
        message: "Connexion réussie",
        //token,
        user: {
          id: user.id,
          login: user.login,
          role: user.role
        }
      });
    }
  );
});

app.get('/info', (req, res) => {
  res.json({ cle1: 'Déconnecter', cle2: 'Connecté' });
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
app.post('/Votes', (req, res) => {

  connection.query(
    'INSERT INTO Votes (Note, Avis, IdUsers, IdOeuvres, Date) VALUES (?, ?, ?, ?, NOW())',
    [req.body.Note, req.body.Avis, req.body.IdUsers, req.body.IdOeuvres],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion du vote :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Vote enregistré avec succès, ID du vote :', results.insertId);
      res.json({ message: 'Vote enregistré avec succès !', voteId: results.insertId });
    }
  );
});

//Récup vote
app.get('/Votes', (req, res) => {
  connection.query('SELECT * FROM Votes', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
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
  let Ip = ip.address();
  console.log(`Le serveur est en http://${Ip}:${port}`);
})