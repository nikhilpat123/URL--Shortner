const { nanoid } = require('nanoid');
const URL = require("../models/url");  

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

   
    const shortID = nanoid(8);  //i also need to push this id inside my database
   
     await URL.create({   //this will create a new entry in my database
        shortId: shortID,
        redirectURL: body.url,
       visitHistory: [],
        createdBy: req.user._id,  //req.user is coming from the middleware where we r setting the user in req object
     });
  //  return res.json({ id:shortID}); earler i was sending json response but now i want to send this response to the frontend
    return res.render("home", { id: shortID }); //so ill return home page with the short id 
}

async function handleGetOriginalUrl(req, res) { 
    const  shortId  = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    ); 
    res.redirect(entry.redirectURL); //now redirecting to the original url
     };


async function handleGetAnalytics(req, res) { 
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}


module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleGetOriginalUrl,
};