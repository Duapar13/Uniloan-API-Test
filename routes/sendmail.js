const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { db } = require('../app');

router.post('/:id', async (req, res, next) => {
    const clientId = req.params.id;

    if (!clientId) {
        return res.status(400).json({ message: 'ID du client manquant dans la requête' });
    }

    const selectClientQuery = 'SELECT * FROM clients WHERE id = ?';

    db.query(selectClientQuery, [clientId], async (error, results) => {
        if (error) {
            return next(error);
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé avec cet ID' });
        }

        const { nom, prenom, email, numero } = results[0];

        try {
            const transporter = nodemailer.createTransport({
                host: "pro3.mail.ovh.net",
                port: 587,
                secure: false,
                auth: {
                    user: "contact@epitech.fun",
                    pass: ""
                }
            });

            const mailOptions = {
                from: 'contact@epitech.fun',
                to: email,
                subject: 'Nouveau client ajouté',
                text: `Bonjour ${prenom} ${nom}, ${email}, ${numero} .`
            };

            await transporter.sendMail(mailOptions);
            console.log('E-mail envoyé avec succès');

            res.status(200).json({ message: 'E-mail envoyé avec succès' });
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', emailError);
            res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail' });
        }
    });
});

module.exports = router;
