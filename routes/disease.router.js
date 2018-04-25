/** get request url, point to controller where db work is done */

const diseaseController = require('../controllers/disease.controller')
const express = require('express');
const router = express.Router();

// register/signup, so user can login
router.route('/add').post(diseaseController.add);
router.route('/all').get(diseaseController.all); 

router.route('/getDiseasesBySymptom').post(diseaseController.getDiseasesBySymptom);
router.route('/getOneBestMatch').post(diseaseController.getOneBestMatch);

router.route('/debug').get((req,res)=>{
    res.json({"debug":"diseaseController OK"})
})


module.exports = router; 