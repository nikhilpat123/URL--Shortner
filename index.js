const express = require('express');
const { connectToMongoDB } = require('./connection');
const path = require('path');
const cookiesParser = require('cookie-parser');
const app = express();
const URL = require("./models/url");
const { restrictToLoggedinUserOnly,checkAuth } = require("./middlewares/auth");

const staticRoute = require("./routes/staticRouter"); 
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

connectToMongoDB("mongodb://localhost:27017/url-shortner").then(() => {
    console.log("Connected to MongoDB");
})

app.set('view engine', 'ejs');
app.set('views', path.resolve( "./views" )); //it tells us the patha jaha mene apne templating engine ko rakha hai 

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //to handle form data
app.use(cookiesParser()); //to handle cookies

  
app.get("/test",async (req, res) => {
    const allUrls = await URL.find({});
  return res.render("home", {
    urls:allUrls,
  });            //home.ejs 
});
const PORT = 8001;


app.use("/url",restrictToLoggedinUserOnly, urlRoute);  //now i passed middleware restrictToLoggedinUserOnly now u can go on url only if u r logged in  and ye middle ware tab hi run hoga ]jab rewuest meri /usrl pe ayegi
app.use("/",checkAuth, staticRoute);  //if anything starts from / we use satic route
app.use("/user", userRoute); //if anything starts from /user we use user route

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})