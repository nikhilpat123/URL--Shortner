const { getUser } = require("../service/auth"); 


async function restrictToLoggedinUserOnly(req, res, next) {
    console.log(req);
    const userid = req.cookies?.uid;
    
    if (!userid) return res.redirect("/login");    //if there is no uuid i will redirect to login page
    
    const user = getUser(userid);
    if (!user) return res.redirect("/login");      //if uuid to haai but usse koi user nhi mila to bhi redirect to login page
    
    req.user = user; //agr user mil gya to usko req ke andar store krdo
    next(); //next means agr ye middleware complete ho gya to agle middleware pe jao

}


async function checkAuth(req,res,next) {
    const userid = req.cookies?.uid;

    const user = getUser(userid);
    req.user = user; 
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};


// //logic for authentication middleware
// function checkForAuthorization(req, res, next) {
//     const authorizationHeaderValue = req.headers['authorization'];
//     req.user = null;

//     if (!authorizationHeaderValue|| !authorizationHeaderValue.startsWith("Bearer")) {  //means we dont have authorization value in Header or it is not starting with bearer
//         return next();
//     }
//     //now i have authorizationValue and i need to validate it 
//     const token = authorizationHeaderValue.split(" ")[1]; //Bearer token me space se split krke second part lelo
//     const user= getUser(token); a
//     req.user = user;
//     return next();
// }