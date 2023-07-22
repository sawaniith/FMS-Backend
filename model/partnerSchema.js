const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    //one partner can log in multiple times, so we need to create tokens every time
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


// we are hashing the password
partnerSchema.pre('save', async function(next){
    //this refers to user trying to register
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12); 
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
        next();
    } 
});

// generating token for password
partnerSchema.methods.generateAuthToken = async function() {
    try{
        //this refer to user who is logging in, this._id is the id stored in mongo
       let tokengen = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({token: tokengen});
       await this.save();
       return tokengen;
    }catch (err){ 
        console.log(err);
    }
}

//creating collection 'patrners'
const Partner = mongoose.model('PARTNER', partnerSchema);

//export
module.exports = Partner;