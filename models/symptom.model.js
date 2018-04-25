const mongoose = require('mongoose');
const lib = require('../lib/lib');

const schema = mongoose.Schema;

const symptomSchema = new schema({
    name: { type: String, minlength:1, required:true, unique:true },
    description:{type:String, maxlength:250}
}, { collection: 'symptom' });

/* method that will be used as static method - without having instance of the model */

symptomSchema.statics.all = () => {
    return new Promise((res, rej) => {
        Self.find({},(err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

symptomSchema.statics.add = (symptom) => { // symptom is mongose instance(object). so add new symptom entity
    return new Promise((res, rej) => {
        symptom.save((err, data) => {
            if (err) rej(err);
            res(data);
        })
    })
}


symptomSchema.statics.getById = (id) => {
    return new Promise((res, rej) => {
        Self.findOne({ "_id": id }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

//'symptom' will relate to 'symptom' collection 
const Self = module.exports = mongoose.model("symptom", symptomSchema);



