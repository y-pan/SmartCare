/** do db work here */
const VitalsignModel = require('../models/vitalsign.model');

const lib = require('../lib/lib');


const add = (req, res) => {
    let vitalsignJson = {};
    vitalsignJson.temperature = req.body.temperature;
    vitalsignJson.heartrate = req.body.heartrate;
    vitalsignJson.bloodpressure = req.body.bloodpressure;
    vitalsignJson.respiratory = req.body.respiratory;
    vitalsignJson.patient = req.body.patient; /** patient is actually the patient_id */

    let vitalsign = new VitalsignModel(vitalsignJson); // mongoose instance

    VitalsignModel.add(vitalsign)  // call for VitalsignModel static methods
        .then(data =>{
            if(!data){
                res.json({"err":"Error in creating vitalsign"})
            }else{
                res.json({data:data})
            }
        })
        .catch(err =>{
            res.json({"err":err})
        })        
}

const all = (req, res) =>{
    VitalsignModel.all().then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}

const getByPatient = (req, res) =>{
    let patient = req.params.patient; /** it is _id */
    console.log("get vitalsigns by patient_id...")
    VitalsignModel.getByPatient(patient)
        .then(vitalsigns =>{
            res.json({data:vitalsigns});
        }).catch(err => {
            res.json({err:err});
        });
}


module.exports = {
    "add":add, /** create is only for admin, not for student */
    "all":all,
    "getByPatient":getByPatient  /** all records */
}

