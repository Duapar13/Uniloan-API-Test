const express = require('express');
const router = express.Router();
const { db } = require('../app');

router.post('/', (req, res, next) => {
    const { nom, prenom, email, numero } = req.body; // Changement ici

    if (!nom || !prenom || !email || !numero) { // Changement ici
        return res.status(400).json({ message: 'Informations client incomplètes' }); // Changement ici
    }

    const insertClientQuery = 'INSERT INTO clients (nom, prenom, email, numero) VALUES (?,?,?,?)'; // Changement ici

    db.query(insertClientQuery, [nom, prenom, email, numero], (error, results) => { // Changement ici
        if (error) {
            return next(error);
        }

        res.status(201).json({ message: 'Données client ajoutées avec succès' }); // Changement ici
    });
});

module.exports = router;
