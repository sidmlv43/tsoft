const express = require('express')
const router = express.Router();

const {signup,getUser, getUserById, putScore, getAllUserScore, getHighestScorer} = require('../controllers/user');

// create user route
router.post('/signup', signup);

router.param('userId', getUserById);

// router to get user by id
router.get('/user/:userId', getUser);

// route to save score in the DB
router.post('/score/:userId',putScore);


// Router to get All users
router.get('/scores/all-user', getAllUserScore);

// route to get user having highest Avg score
router.get('/scores/high-score', getHighestScorer);

module.exports = router;
