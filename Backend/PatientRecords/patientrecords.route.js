const router = require("express").Router();

const controller = require("./patientrecords.controller");
var bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/addpatientdata", jsonParser, controller.createPatientRecord);
router.get("/all", jsonParser, controller.getAllPatients);
router.put("/updateRecord", jsonParser, controller.updatePatientRecord);
router.delete(
  "/deleteRecord/:month/:day/:year",
  jsonParser,
  controller.deletePatientRecord
);

// router.get('/:id',urlencodedParser, controller.getUserWithDetails);

module.exports = router;
