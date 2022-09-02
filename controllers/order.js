const dbo = require("../db/connection");
const order = (req, res) => {
  let status = req.query.status ? req.query.status : req.body.status;
  let city = req.query.city ? req.query.city : req.body.city;
  let start_date = req.query.start_date ? req.query.start_date : req.body.start_date;
  let end_date = req.query.end_date ? req.query.end_date : req.body.end_date;
  const dbConnect = dbo.getDb();
  let query = {};

  if (status) {
    query.status = new RegExp("" + status.join("|") + "");
  }
  if(start_date && end_date){
    query.created_at = {$gte: new Date(dateToString(start_date)) , $lt: new Date(dateToString(end_date))};
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
                pipeline: [
                  {
                    $match: { address: RegExp(".*" + city + ".*") },
                  },
                ],
              },
            },
          ],
          localField: "order_id",
          foreignField: "_id",
          as: "orders",
        },
      },
      { $group: { _id: null, count: { $sum: 1 } } },
    ])
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


function dateToString(datetime) {
  let start = new Date(datetime);
  dateParts = datetime.split("-");
  y = parseInt(dateParts[0], 10);
  m = parseInt(dateParts[1], 10);
  d = parseInt(dateParts[2], 10);
  return start.toISOString();
}
module.exports = order;
