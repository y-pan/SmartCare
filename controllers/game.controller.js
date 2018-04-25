/** do db work here */
const GameModel = require('../models/game.model');

const lib = require('../lib/lib');


const add = (req, res) => {
    let gameJson = {};
    gameJson.name = req.body.name;
    gameJson.link = req.body.link;
    gameJson.description = req.body.description;

    let game = new GameModel(gameJson); // mongoose instance

    GameModel.add(game)  // call for GameModel static methods
        .then(data =>{
            if(!data){
                res.json({"err":"Error in creating game"})
            }else{
                res.json({data:data})
            }
        })
        .catch(err =>{
            res.json({"err":err})
        })        
}

const all = (req, res) =>{
    GameModel.all().then(data =>{
        res.json({data:data});
    }).catch(err =>{
        res.json({err:err});
    })
}
 

module.exports = {
    "add":add,
    "all":all
}

