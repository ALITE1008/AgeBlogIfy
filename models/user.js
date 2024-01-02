const mongoose = require('mongoose');
const {createHmac,randomBytes} = require('crypto');
const { createTokenForUser } = require('../service/authentaction');

const UserSchema  = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    Salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURl:{
        type:String,
        default:"/images/profile.jpg",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",

    },

},{timestamp:true}); 

UserSchema.pre('save', function (next){
    const user = this;
    
    if(!user.isModified("password"))return;

    const Salt = randomBytes(16).toString();

    const hashPassword = createHmac('sha256',Salt)
    .update(user.password)
    .digest('hex');
 
    this.Salt = Salt;
    this.password = hashPassword;

    next();
});

UserSchema.static('matchPasswordAndGentrateToken', async function (email,password){

    const user = await this.findOne({email}); 

    if(!user) throw new error("Invaid Email or Password") ;

    const Salt =  user.Salt;
    const hasedpassword = user.password;
    
    const userProvidedPassToHash =  createHmac('sha256',Salt)
    .update(password)
    .digest('hex');
    
    if(hasedpassword===userProvidedPassToHash){
        
       const token =  createTokenForUser(user);
       return token;

    }else{
        throw new error("Invaid Email or Password") ;
    };
});


const User = mongoose.model('user',UserSchema);

module.exports = User;