/** do db work here */
const DiseaseModel = require('../models/disease.model');

const lib = require('../lib/lib');


const add = (req, res) => {
    let diseaseJson = {};
    diseaseJson.name = req.body.name;
    diseaseJson.symptoms = req.body.symptoms;

    let disease = new DiseaseModel(diseaseJson); // mongoose instance
    console.log(diseaseJson)
    DiseaseModel.add(disease)  // call for DiseaseModel static methods
        .then(data =>{
            if(!data){
                res.json({"err":"Error in creating disease"})
            }else{
                res.json({data:data})
            }
        })
        .catch(err =>{
            res.json({"err":err})
        })        
}

const all = (req, res) =>{
    DiseaseModel.all().then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}
 
const getDiseasesBySymptom = (req, res) =>{ 
    let symptom = req.body.symptom; /** symptom id */
    if(!symptom){ res.json({err:"Invalid symptom!"}); return; }
    DiseaseModel.getDiseasesBySymptom(symptom).then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}

const getOneBestMatch = (req, res) =>{
    let symptoms = req.body.symptoms; /** symptoms ids */
    if(symptoms == undefined || !(symptoms instanceof Array) || symptoms.length == 0 ){
        res.json({err:"Invalid symptoms."});
        return;
    }
    // /** symptoms has to be an array, even it cound be single element */
    // if(symptoms.length == 1){
    //     req.body.symptom = symptoms[0];
    //     getDiseasesBySymptom(req, res);
    //     return;
    // }
    /** now multi symptoms here */
    DiseaseModel.getOneBestMatch(symptoms).then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}


module.exports = {
    "add":add, /** create is only for admin, not for student */
    "all":all
    // "getById":getById  /** all records */
    ,"getDiseasesBySymptom":getDiseasesBySymptom
    ,"getOneBestMatch":getOneBestMatch
}

