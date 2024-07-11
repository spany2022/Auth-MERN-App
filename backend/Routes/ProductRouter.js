const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = new express.Router();

router.get('/',ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000,
        },
        {
            name: "TV",
            price: 30000,
        }
    ])
});

module.exports = router;