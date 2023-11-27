const express = require('express');
const router = express.Router();
const { db } = require('../app');

router.get('/', (req, res, next) => {
    const selectClientsQuery = 'SELECT * FROM clients';

    db.query(selectClientsQuery, (error, results) => {
        if (error) {
            return next(error);
        }

        res.status(200).json(results);
    });
});

module.exports = router;
