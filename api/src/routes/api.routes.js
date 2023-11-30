const { Router } = require('express');
const { getGolfBag } = require('../controllers/api.controllers');

const router = Router();

// HOME PAGE
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// TODO: VIEW PLAYER STATS

// TODO: GET GOLF BAG
router.get('/golfbag/:id', getGolfBag);

// TODO: POST NEW GOLF BAG TO PLAYER

// TODO: POST, EDIT, DELETE CLUB TO GOLF BAG

// TODO: GET PLAYER GOLF ROUNDS
// TODO: POST NEW GOLF ROUND

// TODO: POST HOLE

// TODO: POST SHOT



module.exports = router;