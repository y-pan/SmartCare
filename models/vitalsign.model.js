const mongoose = require('mongoose');
const lib = require('../lib/lib');

const schema = mongoose.Schema;

const vitalsignSchema = new schema({
    temperature: { type: Number },
    heartrate: { type: Number },
    bloodpressure: { type: Number },
    respiratory : { type: Number },
    date:{ type: Date, default: Date.now },
    patient:{ type:String } /** patient's _id */
}, { collection: 'vitalsign' });



/* method that will be used as static method - without having instance of the model */


vitalsignSchema.statics.all = () => {
    return new Promise((res, rej) => {
        self.find({}, null, {sort: {'date': 1}}, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

vitalsignSchema.statics.add = (vitalsign) => { // vitalsign is mongose instance(object). so add new vitalsign entity
    return new Promise((res, rej) => {
        vitalsign.save((err, data) => {
            if (err) rej(err);
            res(data);
        })
    })
}


vitalsignSchema.statics.getByPatient = (patient_id) => {
    return new Promise((res, rej) => {
        self.find({ patient: patient_id }, null, {sort: {'date': -1}}, (err, data) => {
                                                    /** att: -1 - desc, from latest to oldest by date */
            if (err) rej(err);
            else res(data);
        });
    });
}

vitalsignSchema.statics.getById = (id) => {
    return new Promise((res, rej) => {
        self.findOne({ "_id": id }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}



//'vitalsign' will relate to 'vitalsign' collection 
const self = module.exports = mongoose.model("vitalsign", vitalsignSchema);