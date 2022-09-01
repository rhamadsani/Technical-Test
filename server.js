const express = require('express');

const app = express();

const routes = require("./routes");

app.use("/", routes);

app.listen(4000, function() {
    console.log('Listening on Port:3000');
});