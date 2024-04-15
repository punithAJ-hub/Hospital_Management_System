const router = require("express").Router();
const controller = require("../CaseDiseases/diseases.controller");

var bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get(
  "/:disease/:county",
  jsonParser,
  controller.getDataByDiseaseAndCounty
);

module.exports = router;
