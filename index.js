const express = require('express');
const db = require('./db'); // Ensure this is the correct relative path to your `db.js`
const app = express();
require('dotenv').config();
const passport = require('./auth')


const bodyParser = require('body-parser')
app.use(bodyParser.json()); //req.boy    this is also a middleware
const PORT = process.env.PORT || 3000


// Middleware function
const logRequest = (req,res,next) =>{
    console.log(`${new Date().toLocaleString()} Request made to :${req.originalUrl}`)
    next(); //to move in next phase
} 

app.use(logRequest);   // middleware

app.use(passport.initialize());



//to use middleware of passport : passport.authenticate('local' ,{session:false})


const localAuthMiddleware = passport.authenticate('local' , {session: false})

app.get('/'  , localAuthMiddleware ,  (req,res) => {
    res.send('Hey wassup You love pizza i love burger ')
})

//using express router
const personRoutes = require('./routes/personRoutes');
app.use('/person', localAuthMiddleware ,personRoutes)    // this is also a middleware

 

//For menu

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu' ,  menuRoutes)      // this is a middleware




 
app.listen(PORT, () => console.log("Server started"));


// C => create => POST
// R => read => GET
// U => update =>put/patch
// D => delete => delete




//Authentication and authorization
// Authentication => where we need to check person if allowed by checking id, password
// Authorization => Once person is allowed he cant just go to anyone's sit or office person will go to only his office cause he is authorized only at that part.
