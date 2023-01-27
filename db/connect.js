const mongoose = require("mongoose");
// const { options } = require("../routes/products");

// uri = "mongodb+srv://AmanAPI:lpLO7QhyGrXm979C@apisbs.srg9ad5.mongodb.net/apisbs?retryWrites=true&w=majority";

const connectDB = (uri) => {
    console.log("connect ds");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
};

module.exports = connectDB;