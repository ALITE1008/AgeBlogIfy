const { validateToken } = require("../service/authentaction");

function checkForAuthenticationcookie(cookieName){
          return (req,res,next)=>{
          const token = req.cookies[cookieName];
          if(!token){
           return next();
          }
          try {
            const playload  = validateToken(token);
            req.user=playload;
          } catch (error) { }
          return next();
          }
}

module.exports={
    checkForAuthenticationcookie,
}