const mongoose = require('mongoose') // importing mongoose
require('dotenv').config();
// const mongoUrl = 'mongodb://127.0.0.1:27017/people'  // mongo url please avoid localhost and put this one
// const mongoUrl = process.env.DB_URL;
const mongoUrl = process.env.MONGODB_URL_LOCAL; //For local mongo db 

//some parameters !important
mongoose.connect(mongoUrl , {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// mongoose.connect('mongodb://127.0.0.1:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

//mongoose connection establish
const db = mongoose.connection;


//event listeners
db.on('connected' , ()=>{
    console.log('Database connected')
})

db.on('error' , (err)=>{
    console.error('Database error ' , err)
})

db.on('disconnected' , ()=>{
    console.log('Database disconnected')
})


//exporting db
module.exports = db;


//comment added for testing
