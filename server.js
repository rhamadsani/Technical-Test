const express = require('express');

const app = express();

const routes = require("./routes");

const notFound = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: 'not found' }));
  res.status(404);
};

app.use("/", routes);
app.use(notFound);

app.listen(4000, function() {
    console.log('Listening on Port:3000');
});