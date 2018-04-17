const mongoose = require('mongoose');
const lib = require('../lib/lib');

const schema = mongoose.Schema;

const tipSchema = new schema({

    content: { type: String, minlength:1, required:true },
    date:{ type: Date, default: Date.now }

}, { collection: 'tip' });

/* method that will be used as static method - without having instance of the model */

tipSchema.statics.all = () => {
    return new Promise((res, rej) => {
        self.find({}, null, {sort: {'date': 1}}, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

tipSchema.statics.add = (tip) => { // tip is mongose instance(object). so add new tip entity
console.log("add tip...")
    return new Promise((res, rej) => {
        tip.save((err, data) => {
            if (err) rej(err);
            res(data);
        })
    })
}


tipSchema.statics.getById = (id) => {
    return new Promise((res, rej) => {
        self.findOne({ "_id": id }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

tipSchema.statics.getTips = (ids) => {
    return new Promise((res, rej) => {
        let m_ids = ids.map( id => mongoose.Types.ObjectId(id));
        self.find({ 
            '_id': { $in:m_ids}
         }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}


//'tip' will relate to 'tip' collection 
const self = module.exports = mongoose.model("tip", tipSchema);



