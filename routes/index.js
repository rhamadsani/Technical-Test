const express = require('express')
const router = express.Router()
const customer = require('../controllers/customer')
const order = require('../controllers/order')
const shipment = require("../controllers/shipment");

router.get('/', (req,res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
        'message': 'Technical Test API'
    }));
});

router.get('/customers', customer)
router.get("/orders", order);
router.get("/shipments", shipment);

module.exports = router