const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8081

const cors = require("cors");
const { CORS_ORIGIN } = process.env;

app.use(express.json())
app.use(express.static('public'))

app.use(cors({origin: CORS_ORIGIN}));
//
//remove cors origin if you want to check the api on thunderclient or postman (Reviewer note)

const userRoute = require('./routes/userRoute.js');
app.use('/user', userRoute);

const doggoRoute = require('./routes/doggoRoute');
app.use('/doggo', doggoRoute);

const postRoute = require('./routes/postRoute');
app.use('/pawpost', postRoute);


app.listen(PORT, () => {
    console.log("listening on port 8080")
})