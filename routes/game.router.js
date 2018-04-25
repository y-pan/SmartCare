/** get request url, point to controller where db work is done */

const gameController = require('../controllers/game.controller')
const express = require('express');
const router = express.Router();

// register/signup, so user can login
router.route('/add').post(gameController.add);
router.route('/all').get(gameController.all); /** for nurse to get all, and selectively send some to patient (user.router) */

router.route('/debug').get((req,res)=>{
    res.json({"debug":"OK"})
})

module.exports = router; 