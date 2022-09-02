const dbo = require("../db/connection");
const customer = (req, res) => {
    let city = req.query.city ? req.query.city : req.body.city;
    const dbConnect = dbo.getDb();
    let query = {};

    if(city){
        query.address = new RegExp(".*" + city + ".*");
    }

    dbConnect
      .collection("customers")
      .find(query)
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(err));
        } else {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        }
      });
};

module.exports = customer;
