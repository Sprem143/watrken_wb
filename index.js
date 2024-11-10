const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const connectDb = require('./config/mongoose')
connectDb();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(express.json());
// app.use(bodyParser.json());

app.use('/', require('./router.js'));

app.listen(8050, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on port`)
    }
})