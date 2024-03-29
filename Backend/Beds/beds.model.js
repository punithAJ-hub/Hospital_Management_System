const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    bed_id: {
      type: String,
      unique: true,
    },
    occupied: {
      type: Boolean,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
// userSchema.virtual('snippets', {
//     ref: 'Snippet',
//     localField: '_id',
//     foreignField: 'user_id'
// });

// userSchema.virtual('bookmarks', {
//     ref: 'Bookmark',
//     localField: '_id',
//     foreignField: 'user_id'
// });

const Bed = mongoose.model("Bed", bedSchema);

module.exports = Bed;
