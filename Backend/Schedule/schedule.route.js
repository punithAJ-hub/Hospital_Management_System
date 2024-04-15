const router = require("express").Router();
const controller = require("./schedule.controller");
var bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/add", jsonParser, controller.createSchedule);
router.get("/getAvailability/:email", jsonParser, controller.getAvailabilty);
router.post("/appointment", jsonParser, controller.scheduleAppointment);
router.get(
  "/myappointment/:email",
  jsonParser,
  controller.getMyScheduleMeetings
);
router.get("/myschedule/:email", jsonParser, controller.getMyScheduleMeetings);
module.exports = router;
