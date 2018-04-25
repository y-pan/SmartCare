const mongoose = require('mongoose');
const lib = require('../lib/lib');

const schema = mongoose.Schema;

const gameSchema = new schema({

    name: { type: String, required:true },
    link: { type: String, required:true },
    description: { type: String, required:true },
    img: {type:String, default:"http://pancodes.net/media/images/noPic.png"},
    date:{ type: Date, default: Date.now }

}, { collection: 'game' });

/* method that will be used as static method - without having instance of the model */

gameSchema.statics.all = () => {
    return new Promise((res, rej) => {
        self.find({}, null, {sort: {'date': 1}}, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

gameSchema.statics.add = (game) => { // game is mongose instance(object). so add new game entity
    return new Promise((res, rej) => {
        game.save((err, data) => {
            if (err) rej(err);
            res(data);
        })
    })
}


gameSchema.statics.getById = (id) => {
    return new Promise((res, rej) => {
        self.findOne({ "_id": id }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}



//'game' will relate to 'game' collection 
const self = module.exports = mongoose.model("game", gameSchema);



