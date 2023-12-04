const { getGolfBag, createGolfBag, addGolfClub, getGolfClubs } = require('../controllers/api.controllers');
const {Router} = require('express');
const router = Router();

    router.get('/golfbag', getGolfBag);
    router.post('/golfbag/new', createGolfBag);
    router.post('/golfclubs/new', addGolfClub);
    router.get('/golfclubs', getGolfClubs);

module.exports = router