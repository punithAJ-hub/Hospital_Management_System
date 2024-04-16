const Schedule = require("./schedule.model");

const createSchedule = async (req, res) => {
  const email = req.body.email;

  try {
    const schedule = await Schedule.findOne({ email });

    if (schedule) {
      const updatedSchedule = await Schedule.findOneAndUpdate(
        { email: req.body.email },
        { $push: { availability: req.body.availability } },
        { new: true }
      );

      if (updatedSchedule) {
        return res
          .status(200)
          .json({ message: "Successfully updated schedule" });
      } else {
        return res.status(500).json({ message: "Failed to update schedule" });
      }
    } else {
      const scheduleDoc = new Schedule(req.body);
      const newSchedule = await scheduleDoc.save();

      if (newSchedule) {
        return res.status(200).json({ message: "Successfully added schedule" });
      } else {
        return res.status(500).json({ message: "Failed to add schedule" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const scheduleAppointment = async (req, res) => {
  const doctorEmail = req.body.doctorEmail;
  const patientEmail = req.body.patientEmail;
  const patientName = req.body.patientName;
  const date = req.body.date;
  const time = req.body.time;

  const data = {
    doctorEmail: doctorEmail,
    patientEmail: patientEmail,
    patientName: patientName,
    date: date,
    time: time,
  };

  // console.log("Data to schedule appointment : ", data);
  try {
    const schedule = await Schedule.findOne({ email: doctorEmail });
    // console.log(schedule);

    const updatedMeetings = await Schedule.findOneAndUpdate(
      { email: doctorEmail },
      {
        $push: { meetings: data },
        $addToSet: {
          "availability.$[elem].time": time,
        },
      },
      {
        new: true,
        arrayFilters: [{ "elem.date": date }],
      }
    );

    if (updatedMeetings) {
      return res
        .status(200)
        .json({ message: "Successfully scheduled an appointment" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to schedule an appointment" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "error" });
  }
};

const getAvailabilty = async (req, res) => {
  const email = req.params.email;
  // console.log("Email : ", email);
  try {
    const schedule = await Schedule.findOne({ email });
    if (schedule) {
      return res.status(200).json({ schedule: schedule });
    } else {
      return res.status(404).json({ message: "Schedule not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to get schedule" });
  }
};

const getMyScheduleMeetings = async (req, res) => {
  try {
    const email = req.params.email;
    // console.log("Email : ", email);

    const appointments = await Schedule.find({
      "meetings.patientEmail": email,
    });

    if (appointments.length > 0) {
      return res.status(200).json({ schedule: appointments });
    } else {
      return res.status(404).json({ message: "No scheduled Meetings" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch meetings", error: error.message });
  }
};

const getMyMeetings = async (req, res) => {
  try {
    const email = req.params.email;
    // console.log("Email : ", email);

    const appointments = await Schedule.find({
      email,
    });

    // console.log("Appointments : ", appointments);

    if (appointments.length > 0) {
      return res.status(200).json({ meetings: appointments[0].meetings });
    } else {
      return res.status(404).json({ message: "No scheduled Meetings" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch meetings", error: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  const date = req.params.date;
  const time = req.params.time;
  const doctorEmail = req.params.email;

  try {
    const result = await Schedule.findOneAndUpdate(
      { email: doctorEmail },
      {
        $pull: { meetings: { date: date, time: time } },
      },

      { new: true }
    );

    return res.status(200).json({
      message: `Your appointment  ${date} and ${time} has been cancelled.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Unable to cancel your appointment` });
  }
};

module.exports = {
  createSchedule,
  getAvailabilty,
  scheduleAppointment,
  getMyScheduleMeetings,
  getMyMeetings,
  cancelAppointment,
};
