const connectToMongo = require('./db.js');
const express = require('express')
const cors = require('cors');
require("dotenv").config();


connectToMongo()
const app = express()
app.use(cors())

app.use(express.json())   // to request and send data(and data will be in json format)
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/assesment', require('./Routes/assesment'));
app.use('/api/sendsms', require('./sendsms'));
app.use('/api/preData', require('./Routes/preData'));


app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(5000, ()=>{
    console.log('App is running successfully on port 5000.');
})