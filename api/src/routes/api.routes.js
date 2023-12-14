const { getGolfBag, createGolfBag, addGolfClub, getGolfClubs, deleteGolfClub, updateGolfClub, getGolfCourse, newGolfRound, newGolfHole, finishedHole, newGolfShot, getAllCourses, getGolfRounds, getGolfRound, getGolfRoundHoles, getGolfHole, getGolfHoleScore, deleteGolfHole, getHoleShots } = require('../controllers/api.controllers');
const {Router} = require('express');
const router = Router();

    router.get('/golfbag', getGolfBag);
    router.post('/golfbag/new', createGolfBag);
    router.post('/golfclubs/new', addGolfClub);
    router.get('/golfclubs', getGolfClubs);
    router.delete('/golfclubs/:id', deleteGolfClub);
    router.put('/golfclubs/:id', updateGolfClub);

    router.get('/golfcourses/:id', getGolfCourse);
    router.get('/golfcourses/', getAllCourses);

    router.get('/golfrounds', getGolfRounds);
    router.get('/golfround/:id', getGolfRound);
    router.get('/golfround/holes/:id', getGolfRoundHoles);
    router.post('/golfround', newGolfRound);


    router.post('/golfhole', newGolfHole);
    router.get('/golfhole/', getGolfHole);
    router.get('/golfholescore', getGolfHoleScore);
    router.put('/updatescore', finishedHole);
    router.post('/golfshot', newGolfShot);
    router.get('/golfshots', getHoleShots);

    router.delete('/golfhole/:id', deleteGolfHole);

module.exports = router