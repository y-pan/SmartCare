const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const lib = require('../lib/lib');

const schema = mongoose.Schema;

const userschema = new schema({
    usertype: {
        type:Number,
        default:0  /* 0-nurse, 1-patient */
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true, /* built in validator  */
        minlength: 1/* built in validator  */
    },
    lastname: {
        type: String,
        required: true,/* built in validator  */
        minlength: 1, /* built in validator  */
        // uppercase:true, /* schema modifier */
    },
    healthcard: {
        type: String,
        required: true, /* built in validator  */
        minlength: 1/* built in validator  */
    },
    phone: {
        type: String,
        minlength: 1/* built in validator  */
    },
    email: {
        type: String,
        required: true,/* built in validator  */
        unique: true, /* index */
        validate: [lib.validateEmail, 'Invalid email format']  /* custome email format validation function */
    },
    responder:{
        type:String  /*patient's first responder's email*/
    },
    tips:{
        type:[String]  /* nurse will send tips' _id to patient */ 
    },
    tipChanged:{
        type:Number,
        default:0  /** 0 means no need for user to reload data, >0 means nurse pushed some data, so user need to reload tips */
    },
    date:{
        /** creation date */
        type:Date, default:Date.now
    }
}, { collection: 'user' });


/* method that will be used as static method - without having instance of the model */

userschema.statics.all = () => {
    return new Promise((res, rej) => {
        self.find({}, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

userschema.statics.allPatients = () => {
    return new Promise((res, rej) => {
        self.find({"usertype":1}, (err, data) => {
            if (err) rej(err);
            else { 
                res(data);
            }
        });
    });
}


userschema.statics.allNurses = () => {
    return new Promise((res, rej) => {
        self.find({"usertype":0}, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

userschema.statics.add = (user) => { // user is mongose instance(object). so add new user entity
    return new Promise((resolve, reject) => {
        if(!user.validatePassword()){
            /** validatePassword() is instance method to validate password format, to enforce user to use strong password */
            reject("Weak password. Make sure it is 6 ~ 18 length, including at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character(!@#$%^&*])")
            return;
        }
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB, to replace plain text.
                user.password = hash; 
                user.save((err, data) => {
                    if (err) {reject(err);}
                    else {

                        if(!data){
                            reject("Unknow Error!");
                        }else{
                            resolve(data);
                        }
                    }
                })
            });
        });
    })
}

userschema.statics.getById = (id) => {
    return new Promise((res, rej) => {
        self.findOne({ "_id": id }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

/**testing method for bcrypt. incomming password is always plain text, with/without encrpyted
 * just the if pass is encrpyted in db, the you have to match using bcrypt
 */
userschema.statics.getByEmailPasswordEncrypted= (email, password) => {
    return new Promise((res, rej) => {
        self.findOne({ "email": email}, (err, data) => {
            if (err) {
                 rej(err); 
                }
            else {
                if (!data) { 
                    rej("No such user number"); }
                else {
                    /** compare incomming plain pass & encrypted pass in db */
                    
                    bcrypt.compare(password, data.password, function(err, isMath){
                        if(err) { rej(err);return; }//throw err; /** throw will break down server? */
                        if(isMath){
                            res(data);
                        }else{
                            rej("Wrong password!");
                        }
                    });
                }
            }
        })
    });
}

userschema.statics.getPatientById = (id) => {
    return new Promise((res, rej) => {
        self.findOne({ "_id": id, "usertype":1 }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

userschema.statics.searchPatient = (searchJson) => {
    return new Promise((res, rej) => {
        /** email */
        searchJson.usertype = 1;

        self.find(searchJson, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

userschema.statics.getNurseById = (id) => {
    return new Promise((res, rej) => {
        self.findOne({ "_id": id, "usertype":0 }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

userschema.statics.getByEmail = (email) =>{
    return new Promise((res, rej) => {
        self.findOne({ "email": email}, (err, data) => {
            if (err) {
                 rej(err); 
                }
            else {
                res(data); // let outside to determine behavior for data not found/data found
            }
        })
    });
}



userschema.statics.checkTipChanged = (patient) =>{ /** patient is patient's _id, tips are tips' _id */
    return new Promise((resolve, reject) => {
        self.findOne({ "_id": patient}, (err, data) => {
            if (err) {
                reject(err); 
            } else {
                if(data){
                    resolve(data['tipChanged']);
                }else{
                    reject("Unknow err");
                }
            }
        })
    });
}

userschema.statics.getMyTips = (patient) =>{ /** patient is patient's _id, tips are tips' _id */
    return new Promise((resolve, reject) => {
        self.findOne({ "_id": patient}, (err, data) => {
            if (err) {
                reject(err); 
            } else {
                if(data){
                    data['tipChanged'] = 0; /** set it back to 0, save it, send back */
                    data.save((err, data2)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(data2['tips']);
                        }
                    })
                }else{
                    reject("Unknow err");
                }
            }
        })
    });
}

userschema.statics.setTips = (patient, tips, isSet) =>{ /** patient is patient's _id, tips are tips' _id */
    return new Promise((resolve, reject) => {
        self.findOne({ "_id": patient}, (err, data) => {
            if (err) {
                reject(err); 
                }
            else {
                if(isSet == 1){
                    data.tips = tips; /** overwrite whole array */
                }else{
                    if(!data.tips){
                        data.tips = []
                    }
                    /** make sure no duplicates */

                    for(var i=0, len=tips.length; i<len; i++){
                        if(data.tips.indexOf(tips[i])<0){
                            data.tips.unshift(tips[i]); // tip _id, 
                        }
                    }
                }

                data.tipChanged = 1; /** so when patient switching nav, will check if tipChanged is 0, if not 0, then trigger reload tips only */
                /** now save data */
                data.save((err, data) => {
                    if (err) {reject(err);}
                    else {
                        if(!data){
                            reject("Unknow Error!");
                        }else{
                            resolve("OK");
                        }
                    }
                });
            }
        })
    });
}

/* schema instance method, available for returned object, like you insert/find data, and you get the data back which is an instance, then you have all instance methods like this */
userschema.methods.validateSelf = function () {
    // console.log("validateSelf: " + this.firstname + " from instance method");
}

// same with module.exports.comparePassword = function(xxx){}  userschema.methods.comparePassword
userschema.methods.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMath){

        callback(err, isMath);
    });
}
userschema.methods.verifyPassword = function(candidatePassword){
    bcrypt.compare(candidatePassword, this.password, function(err, isMath){
        if(err) throw err; /** would this break down server? */
        callback(null, isMath);
    });
}


userschema.methods.validatePassword = function () {
    if(lib.validatePassword(this.password)){
        return true; /** password format is qualified */
    }else{
        return false; /** format is not qualified, weak password */
    }
    
}


userschema.methods.getFullName = function () {
    return this.firstname + " " + this.lastname
}


//'user' will relate to 'user' collection 
const self = module.exports = mongoose.model("user", userschema);
