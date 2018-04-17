/** do db work here */
const TipModel = require('../models/tip.model');

const lib = require('../lib/lib');


const add = (req, res) => {
    let tipJson = {};
    tipJson.content = req.body.content;
    
    let tip = new TipModel(tipJson); // mongoose instance

    TipModel.add(tip)  // call for TipModel static methods
        .then(data =>{
            if(!data){
                res.json({"err":"Error in creating tip"})
            }else{
                res.json({data:data})
            }
        })
        .catch(err =>{
            res.json({"err":err})
        })        
}

const all = (req, res) =>{
    TipModel.all().then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}
 
const getTips = (req, res) =>{
    let ids = req.body.tips;
    TipModel.getTips(ids).then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}


module.exports = {
    "add":add, /** create is only for admin, not for student */
    "all":all
    // "getById":getById  /** all records */
    ,"getTips":getTips
}

