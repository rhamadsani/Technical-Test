
const dbo = require("../db/connection");
var ObjectId = require("mongodb").ObjectID;
const blocks = (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
      .collection("blocks")
      .aggregate([
        {
          $lookup: {
            from: "slots",
            localField: "_id",
            foreignField: "block_id",
            as: "slots",
          },
        },
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

parkingRegist = (req, res) => {
  const dbConnect = dbo.getDb();
    let slot_id = ((req.query.slot_id) ? req.query.slot_id : req.body.slot_id);
    let description = req.query.description ? req.query.description : req.body.description;
    let reg = req.query.reg ? req.query.reg : req.body.reg;

  if (!req.query.slot_id && !req.body.slot_id) {
        res.setHeader("Content-Type", "application/json");
        res.end(
        JSON.stringify({
            status: "error",
            message: "slot id required",
        })
        );
        return;
  }
    if (req.query.reg == '' && !req.body.reg == '') {
        res.setHeader("Content-Type", "application/json");
        res.end(
            JSON.stringify({
            status: "error",
            message: "reg id required",
            })
        );
        return;
    }

  //check existence
  const query = { _id: ObjectId(slot_id) };
  dbConnect
    .collection("slots")
    .findOne(query, function(err, slot) {
        if(err){
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(err));
            return;
        }else{
            //check status avail
                const newvalues = {
                  $set: { status: (reg) ? "filled" : "empty", description: (reg) ? "Tidak Kosong" : "Sedang Kosong" },
                };
                dbConnect.collection("slots").updateOne(query, newvalues, function(err, result){
                    if(err){
                        res.setHeader("Content-Type", "application/json");
                        res.end(
                            JSON.stringify({
                                status: "error",
                                message: "Parking is Canceled",
                            })
                        );
                        return;
                    }else{
                         res.setHeader("Content-Type", "application/json");
                         res.end(
                           JSON.stringify({
                             status: "success",
                             message: "Parking is Success",
                           })
                         );
                         return;
                    }
                });
        }
    })
};

module.exports = { blocks, parkingRegist };
