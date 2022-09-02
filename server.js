require("dotenv").config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dbo = require("./db/connection");
const routes = require("./routes");
const PORT = process.env.PORT || 5000;

const notFound = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "not found" }));
  res.status(404);
};


app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use("/", routes);
app.use(notFound);

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

