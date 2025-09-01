const express = require('express');
const { connectToMongoDB } = require('./connection');
const app = express();
const URL = require("./models/url");

const urlRoute = require("./routes/url");

connectToMongoDB("mongodb://localhost:27017/url-shortner").then(() => {
    console.log("Connected to MongoDB");
})

app.use(express.json());
  
const PORT = 8001;


app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})