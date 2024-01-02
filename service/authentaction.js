const jwt = require('jsonwebtoken');
const key ="!@#$%^&*()_+";

function createTokenForUser(user){
 
    const palyload={
        name:user.fullName,
        id:user._id,
        email:user.email,
        profileImageURl:user.profileImageURl,
        role:user.role,
    };

    const token = jwt.sign(palyload,key);

    return token;
}

function validateToken(token){

    const playload = jwt.verify(token,key); 
    return playload;
}


module.exports={
    createTokenForUser,
    validateToken,
}