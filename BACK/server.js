const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

// INITIALISATION DE L'APPLICATION EXPRESS
const app = express();
app.use(bodyParser.json()); // Utilisation de body-parser pour parser les requêtes JSON
app.use(cors()); // Middleware CORS pour les requêtes cross-origin
const port = process.env.PORT || 3000; // Définition du port

// CONNEXION À LA BASE DE DONNÉES
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Foabgu!',
  database: 'LawrenceGPS'
});

// GESTION DES ERREURS DE CONNEXION À LA BASE DE DONNÉES
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // Arrêter l'exécution du programme en cas d'erreur de connexion
  }
  console.log('Connecté à la base de données MySQL');
});

// GESTION DU FORMAT JSON INVALIDE
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Format JSON invalide' });
  } else {
    next();
  }
});

// ROUTE POUR L'ENREGISTREMENT D'UN UTILISATEUR
app.post('/register', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Format JSON invalide' });
    }
    const { identifiant, password } = req.body;
    if (!identifiant || !password) {
      return res.status(400).json({ error: 'Les champs identifiant et password sont requis.' });
    }

    const userExistsQuery = 'SELECT * FROM User WHERE identifiant = ?';
    db.query(userExistsQuery, [identifiant], async (err, results) => {
      if (err) {
        console.error('Erreur lors de la vérification de l\'existence de l\'utilisateur :', err);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userUUID = uuidv4();

      const insertUserQuery = 'INSERT INTO User (identifiant, password, uuid) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [identifiant, hashedPassword, userUUID], (insertErr) => {
        if (insertErr) {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', insertErr);
          return res.status(500).json({ error: 'Erreur interne du serveur.' });
        }

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
        console.log("Création d'un utilisateur.");
      });
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// ROUTE POUR LA CONNEXION D'UN UTILISATEUR
app.post('/login', async (req, res) => {
  try {
    const { identifiant, password } = req.body;

    const query = 'SELECT * FROM User WHERE identifiant = ?';
    db.query(query, [identifiant], async (err, results) => {
      if (err) {
        console.error('Erreur lors de la requête à la base de données :', err);
        return res.status(500).json({ message: 'Erreur du serveur' });
      }

      if (results.length > 0) {
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          const userUUID = user.uuid;

          res.cookie('userUUID', userUUID, { httpOnly: true });
          res.status(200).json({ message: 'Connexion réussie', userUUID });
          console.log("Connexion à un compte effectuée");
        } else {
          res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
        }
      } else {
        res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

  //GetUser

  app.get('/getUsername', (req, res) => {
    const uuid = req.cookies.UUID;
  
    // Requête SQL pour récupérer l'identifiant à partir de l'UUID
    const sql = `SELECT identifiant FROM User WHERE uuid = ?`;
    connection.query(sql, [uuid], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête SQL :', err);
        res.status(500).send('Une erreur s\'est produite lors de la récupération de l\'identifiant');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Aucun utilisateur trouvé pour cet UUID');
        return;
      }
      const username = result[0].identifiant;
      res.send({ username });
    });
  });
  
// LANCEMENT DU SERVEUR
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});


