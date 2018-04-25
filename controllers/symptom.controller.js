/** do db work here */
const SymptomModel = require('../models/symptom.model');

const lib = require('../lib/lib');


const add = (req, res) => {
    let symptomJson = {};
    symptomJson.name = req.body.name;
    
    let symptom = new SymptomModel(symptomJson); // mongoose instance

    SymptomModel.add(symptom)  // call for SymptomModel static methods
        .then(data =>{
            if(!data){
                res.json({"err":"Error in creating symptom"})
            }else{
                res.json({data:data})
            }
        })
        .catch(err =>{
            res.json({"err":err})
        })        
}

const all = (req, res) =>{
    SymptomModel.all().then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}
 

module.exports = {
    "add":add, /** create is only for admin, not for student */
    "all":all
}

