const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const postsRoute = require('./routes/postsRoute')

const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: false }))

userRoute(app);
postsRoute(app);

app.get("/", (req, res) => res.json({message : "Welcome to home."}))

app.listen(port, () => {console.log(`Runniing .... ${port}`)})