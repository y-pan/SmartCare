/** get request url, point to controller where db work is done */

const vitalsignController = require('../controllers/vitalsign.controller')
let passport = require('passport')

const express = require('express');

const router = express.Router();

router.route('/add').post(vitalsignController.add)
router.route('/all').get(vitalsignController.all);
router.route('/getByPatient/:patient').get(vitalsignController.getByPatient);


router.route('/debug').get((req,res)=>{
    res.json({"debug":"OK"})
})
module.exports = router;