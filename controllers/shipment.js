const dbo = require("../db/connection");
var ObjectId = require("mongodb").ObjectID;
const shipment = (req, res) => {
  let status = req.query.status ? req.query.status : req.body.status;
  const dbConnect = dbo.getDb();
  let query = {};

  if (status) {
    query.status = new RegExp(".*" + status + ".*");
  }

  dbConnect
    .collection("shiptments")
    .aggregate([
      { $match: query },
      {
        $lookup: {
          from: "orders",
          pipeline: [
            {
              $lookup: {
                from: "customers",
                localField: "customer_id",
                foreignField: "_id",
                as: "customers",
              },
            },
          ],
          localField: "order_id",
          foreignField: "_id",
          as: "orders",
        },
      },
    ])
    // .find(query)
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

module.exports = shipment;
