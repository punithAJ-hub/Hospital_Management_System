const router = require("express").Router();
const controller = require("../Beds/beds.controller");

var bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/createBed", jsonParser, controller.createBed);
router.get("/vacant", jsonParser, controller.getVacantBeds);
router.put("/assign/:bedId", jsonParser, controller.updateBed);
router.get("/all", jsonParser, controller.getAllBeds);

// router.get('/:id',urlencodedParser, controller.getUserWithDetails);

module.exports = router;
