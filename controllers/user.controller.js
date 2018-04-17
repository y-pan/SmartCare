/** do db work here */
const UserModel = require('../models/user.model');
const lib = require('../lib/lib');

let emailCred = {};
if(process.env.heroku_deploy_mark){
    emailCred['user'] = process.env.eu;
    emailCred['pass'] = process.env.ep;
}else{
    const cred = require('../config/cred.json');
    emailCred['user'] = cred.eu;
    emailCred['pass'] = cred.ep;
}

const gSend = require('gmail-send')({
    user:emailCred['user'],
    pass:emailCred['pass']
})


const loginEncrypted = (req, res) => {
    /** This method assumes that password in db was encrypted during signup, 
     * incomming plain password need to compare with hashed password using bcrypt */
    UserModel.getByEmailPasswordEncrypted(req.body.email, req.body.password)
        .then((user)=>{
            if(user.usertype == req.body.usertype ){
                res.json({data:user});
            }else{
                res.json({err:"Invalid credential"});
            }
        })
        .catch((err)=>{
            res.json({err:err});
        })
}

const getById = (req, res) =>{
    let id = req.query.id
    UserModel.getById(id)  // call for UserModel static methods
        .then(user =>{
            res.json({data:user});
        })
        .catch(err =>{
            res.json({err:err});
        })        
}
const getMyTips = (req, res) =>{
    let id = req.params.patient; /** it is _id */
    UserModel.getMyTips(id)  // call for UserModel static methods
        .then(data =>{
            res.json({data:data});
        })
        .catch(err =>{
            res.json({err:err});
        })        
}
const checkTipChanged = (req, res) =>{
    let id = req.params.patient; /** it is _id */
    UserModel.checkTipChanged(id)  // call for UserModel static methods
        .then(data =>{
            res.json({data:data});
        })
        .catch(err =>{
            res.json({err:err});
        })        
}
const searchPatient = (req, res) =>{
    UserModel.searchPatient(req.body)  // call for UserModel static methods
        .then(user =>{
            res.json({data:user});
        })
        .catch(err =>{
            res.json({err:err});
        })        
}

const add = (req, res) => {
    /** register/add user account */
    let userJson = {}
    userJson.usertype = req.body.usertype;
    userJson.email = req.body.email;
    userJson.password = req.body.password;
    userJson.firstname = req.body.firstname;
    userJson.lastname = req.body.lastname;
    userJson.healthcard = req.body.healthcard;
    userJson.phone = req.body.phone;
    userJson.responder = req.body.responder;

    let user = new UserModel(userJson); // mongoose instance
    UserModel.add(user)  // call for UserModel static methods
        .then(user =>{
            res.json({data:user});
        })
        .catch(err =>{
            res.json({err:err});
        })        
}
const all = (req, res) =>{
    UserModel.all()
        .then(data =>{
            res.json({data:data});
        }).catch(err =>{
            res.json({err:err});
        })
}

const allNurses = (req, res) =>{
    UserModel.allNurses()
        .then(data =>{
            res.json({data:data});
        }).catch(err =>{
            res.json({err:err});
        })
}


const allPatients = (req, res) =>{
    UserModel.allPatients()
        .then(data =>{
            res.json({data:data});
        }).catch(err =>{
            res.json({err:err});
        })
}


const sendTip = (req, res) =>{
    let tips = req.body.tips;  /** make it tips' _id, expandable in the future */
    let patient = req.body.patient;
    let isSet = req.body.isSet || 0;  /** default 0 to append, 1 to set(overwrite) the tips array  */

    UserModel.setTips(patient, tips, isSet)
        .then(data =>{
            res.json({data:data}); /** {data:OK} */
        }).catch(err =>{
            res.json({err:err});
        })
}


const alert = (req, res) =>{
    let emailJson = {}
    let senderEmail = req.body.from || "N/A";
    let senderFullname = req.body.fullname || "N/A";
    let senderPhone = req.body.phone || "N/A";
    let senderHealthNum = req.body.healthcard || "N/A";

    let textHead = `Please act on critical alert from: ${senderFullname} (Health card#: ${senderHealthNum} Email: ${senderEmail}, Phone: ${senderPhone})\n`;
    
    emailJson.from = req.body.from || emailJson.from;
    emailJson.to = req.body.to;
    emailJson.subject = req.body.subject || "SmartCare Alert Message From: " + senderFullname;
    if(req.body.text){
        emailJson.text = textHead +"---------- sender message ---------\n"+ req.body.text
    }
    
    
    gSend(emailJson, (err, data)=>{
         if(err){
             res.json({err:err});
         }else{
             res.json({data:data})
         }
     })
}

module.exports = {
     "login":loginEncrypted
    , "add":add   /** just like signup */
    , "all":all
    , "allNurses":allNurses
    , "allPatients":allPatients
    , "sendTip":sendTip
    ,"getById":getById
    , "searchPatient":searchPatient
    ,"getMyTips":getMyTips
    ,"checkTipChanged":checkTipChanged
    ,"alert":alert
}
