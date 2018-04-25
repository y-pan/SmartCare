const mongoose = require('mongoose');
const lib = require('../lib/lib');

const schema = mongoose.Schema;

const diseaseSchema = new schema({

    name: { type: String, required:true },
    symptoms:{type: [String], default:[]} /** symptom is the symptom id */
    
}, { collection: 'disease' });

/* method that will be used as static method - without having instance of the model */

diseaseSchema.statics.all = () => {
    return new Promise((res, rej) => {
        Self.find({}, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

/** get all dieases that has that kind of symptom */
diseaseSchema.statics.getDiseasesBySymptom = (symptom) => { /** symptom is the symptom id */
    return new Promise((resolve, reject)=>{
        Self.find({symptoms:symptom}, (err, data)=> {
            if(err) { reject(err); }
            else{ 
                // console.log(data);
                resolve(data.map(d => d._id)); 
                // resolve(data); 

            } /** only return the id */
        });
    });
}



diseaseSchema.statics.getOneBestMatch = (symptoms)=>{  
/* problem, ONLY first disease returned, no compare!!!!!*/    
    let allPromises = symptoms.map( sym => Self.getDiseasesBySymptom(sym));
    // console.log("allPromises.length = " + allPromises.length);
    return new Promise((resolve, reject) => { /** [ [d1,d2], [d1,d4,d5], ...  ] */
        Promise.all(allPromises).then(data => {
            // console.log(data)
            // console.log("===>darray===>")
            let diseaseIds = [];
            let counts = [];
            data.forEach(arr => {
                arr.forEach(id => {
                    let index = diseaseIds.indexOf(""+id);
                    console.log(id + " index => " + index)
                    if(index * 1 < 0){
                        // not have it yet, push
                        diseaseIds.push(""+id);
                        counts.push(1);
                    }else{
                        counts[index]++;
                    }
                })
            });

            let max = counts.reduce((m, c) => { return (m < c) ? c : m}, 0);
            let _id = diseaseIds[counts.indexOf(max)];

            Self.findById(_id, (__err, __data)=>{
                if(__err){ reject(__err);}
                else{ resolve(__data); } /* top 1 disease matched most symstons returned */ 
            })
        }).catch(err =>{
            reject(err);
        })

    });
}

diseaseSchema.statics.add = (disease) => { // disease is mongose instance(object). so add new disease entity
    return new Promise((res, rej) => {
        disease.save((err, data) => {
            if (err) rej(err);
            res(data);
        })
    })
}


diseaseSchema.statics.getById = (id) => {
    return new Promise((res, rej) => {
        Self.findOne({ "_id": id }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}


//'disease' will relate to 'disease' collection 
const Self = module.exports = mongoose.model("disease", diseaseSchema);



