/** get request url, point to controller where db work is done */

const userController = require('../controllers/user.controller')
const express = require('express');
const router = express.Router();

// register/signup, so user can login
router.route('/signup').post(userController.add);
router.route('/login').post(userController.login); /** nurse and patient */
router.route('/all').get(userController.all); /** for admin user */
router.route('/allNurses').get(userController.allNurses); /** for admin user */
router.route('/allPatients').get(userController.allPatients); /** for admin user */
router.route('/get').get(userController.getById); /** */

router.route('/searchPatient').post(userController.searchPatient); /** */

router.route('/checkTipChanged/:patient').get(userController.checkTipChanged); /** */
router.route('/getMyTips/:patient').get(userController.getMyTips); /** */

router.route('/sendTip').post(userController.sendTip); /** for nurse send tips (content ready) to patient */

router.route('/alert').post(userController.alert); /** for nurse send tips (content ready) to patient */



router.route('/debug').get((req,res)=>{
    res.json({"debug":"OK"})
})

module.exports = router; 