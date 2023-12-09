const { getGolfBag, createGolfBag, addGolfClub, getGolfClubs, deleteGolfClub, updateGolfClub, getGolfCourse, newGolfRound, newGolfHole, finishedHole, newGolfShot, getAllCourses, getGolfRounds } = require('../controllers/api.controllers');
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
    
    router.get('/golfround', getGolfRounds);
    router.post('/golfround', newGolfRound);


    router.post('/golfhole', newGolfHole);
    router.post('/updatescore', finishedHole);
    router.post('/golfshot', newGolfShot);

module.exports = router