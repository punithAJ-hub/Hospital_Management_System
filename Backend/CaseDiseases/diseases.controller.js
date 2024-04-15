const util = require("../util");
const Disease = require("./diseases.model");

const getDataByDiseaseAndCounty = async (req, res) => {
  try {
    const disease = req.params.disease;
    const county = req.params.county;

    const groupedData = await Disease.aggregate([
      {
        $match: {
          Disease: disease,
          County: county,
        },
      },
      {
        $group: {
          _id: "$Year",
          male: {
            $sum: {
              $cond: [{ $eq: ["$Sex", "Male"] }, "$Count", 0],
            },
          },
          female: {
            $sum: {
              $cond: [{ $eq: ["$Sex", "Female"] }, "$Count", 0],
            },
          },
        },
      },
      {
        $project: {
          year: "$_id",
          Total: { $sum: ["$male", "$female"] },
          male: 1,
          female: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          year: 1, // Sort by year in ascending order
        },
      },
    ]);

    if (!groupedData || groupedData.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(200).json({ data: groupedData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllBeds = async (req, res) => {
  try {
    const beds = await Bed.find({});

    return res.status(200).json({ beds: beds });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getDataByDiseaseAndCounty,
};
