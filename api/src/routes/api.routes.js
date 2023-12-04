const { getGolfBag, createGolfBag, addGolfClub, getGolfClubs, deleteGolfClub, updateGolfClub } = require('../controllers/api.controllers');
const {Router} = require('express');
const router = Router();

    router.get('/golfbag', getGolfBag);
    router.post('/golfbag/new', createGolfBag);
    router.post('/golfclubs/new', addGolfClub);
    router.get('/golfclubs', getGolfClubs);
    router.delete('/golfclubs/:id', deleteGolfClub);
    router.put('/golfclubs/:id', updateGolfClub);

module.exports = router