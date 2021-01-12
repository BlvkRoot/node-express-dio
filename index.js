const express = require('express');
const app = express();
const port = 7000;
const userRoute = require("./routes/userRoute")

userRoute(app);

app.get("/", (req, res) => res.json({
    message : "Welcome to home."
}))

app.listen(port, () => {
    console.log(`Runniing .... ${port}`)
})