/** get request url, point to controller where db work is done */

const tipController = require('../controllers/tip.controller')
const express = require('express');
const router = express.Router();

// register/signup, so user can login
router.route('/add').post(tipController.add);
router.route('/all').get(tipController.all); /** for nurse to get all, and selectively send some to patient (user.router) */


router.route('/getTips').post(tipController.getTips); /** get tips by an array of tip _id */

router.route('/debug').get((req,res)=>{
    res.json({"debug":"OK"})
})


module.exports = router; 