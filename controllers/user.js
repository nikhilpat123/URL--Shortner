const User = require('../models/user');
const { v4: uuidv4 } = require('uuid'); 
const{setUser}=require('../service/auth');

async function handleUserSignup(req, res) { 
    const { name, email, password } = req.body;       //user ne jo bhi dala hume vo milega req.body me and usme se we took name email password
    await User.create({ name, email, password });
    return res.redirect("/"); //after signup redirect to login page and we did res.redirect because we r using ejs and not sending json response
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body; //user ne jo bhi dala hume vo milega req.body me and usme se we took name email password
    const user = await User.findOne({ email, password });
    console.log(user);
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
  }
  
     const token = setUser(user.toObject());
      res.cookie("uid", token);
      return res.redirect("/");
  


    // const sessionId = uuidv4();//noe i have to store this sesssioID with a user Object as well  as in jwt tokens i dont need a session id mai setUser me hi user object ko store krdunga
    // setUser(sessionId, user); //it will store in our memory
  // res.cookie("uid", sessionId); //it will store in browser
 
}



module.exports = {
    handleUserSignup,
    handleUserLogin,
};