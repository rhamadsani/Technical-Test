const shipment = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ a: 1 }));
};

module.exports = shipment;
