const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGODB connection error:'));
db.once('open',function(){
    console.log("data base is connected")
})

module.exports = db;