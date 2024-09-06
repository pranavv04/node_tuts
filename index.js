const express = require('express');
const db = require('./db'); // Ensure this is the correct relative path to your `db.js`

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json()); //req.boy







//using express router
const personRoutes = require('./routes/personRoutes');
app.use('/person' , personRoutes)



//For menu

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu' , menuRoutes)

app.listen(3000, () => console.log("Server started"));


// C => create => POST
// R => read => GET
// U => update =>put/patch
// D => delete => delete
