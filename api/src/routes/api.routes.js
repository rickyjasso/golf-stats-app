const { Router } = require('express');

const router = Router();

// HOME PAGE
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// TODO: VIEW PLAYER STATS

// TODO: GET GOLF BAG
// TODO: POST NEW GOLF BAG TO PLAYER

// TODO: POST, EDIT, DELETE CLUB TO GOLF BAG

// TODO: GET PLAYER GOLF ROUNDS
// TODO: POST NEW GOLF ROUND

// TODO: POST HOLE

// TODO: POST SHOT



module.exports = router;