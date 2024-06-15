const mongoose = require("mongoose");
const db = require("../utils/database");
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    day: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  referencID: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: String,
    required: true,
  },
  checkOutTime: {
    type: String,
    default: "nil",
  },
  totalWorkingTime: {
    type: String,
    default: "nil",
  },
  breakInTime: {
    type: String,
    default: "nil",
  },
  breakOutTime: {
    type: String,
    default: "nil",
  },
  totalBreakTime: {
    type: String,
    default: "nil",
  },
});

const attendanceModel = db.model("Attendance", attendanceSchema);

module.exports = attendanceModel;
