const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    availability: {
      type: [{ type: Object }],
    },
    meetings: {
      type: [{ type: Object }],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
