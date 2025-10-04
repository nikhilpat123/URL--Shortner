const mongoose = require('mongoose');


//Schema
const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },

  visitHistory: [{ timestamp: { type: Number } }], //its an array which tells us kiyne baje click hua tha
    
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,   //im saying that ill give u  id of type object id which will refer to  a user
    ref: "user",  //reference to user model
  }
},{ timestamps: true }   //created at and updated at
);


//Model
const URL =mongoose.model("url", urlSchema);

module.exports = URL;

