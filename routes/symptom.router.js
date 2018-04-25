/** get request url, point to controller where db work is done */

const symptomController = require('../controllers/symptom.controller')
const express = require('express');
const router = express.Router();

// register/signup, so user can login
router.route('/add').post(symptomController.add);
router.route('/all').get(symptomController.all); 


router.route('/debug').get((req,res)=>{
    res.json({"debug":"symptomController OK"})
})

module.exports = router; 