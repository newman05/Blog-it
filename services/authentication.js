const JWT = require('jsonwebtoken') ;

const secret = "superman" ; 

function createtokenforuser(user) {
  const payload = {
    _id : user._id ,
    email : user.email , 
    profileimage : user.profileimage,
    role: user.role ,
  };
  const token = JWT.sign(payload, secret );
  return token ;  
}

function validateToken(token) {
  const payload = JWT.verify(tokem, secret) ; 
  return payload ; 
}

module.exports = {
  createtokenforuser,
  validateToken,
};