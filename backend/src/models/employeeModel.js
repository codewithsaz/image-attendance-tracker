const mongoose = require("mongoose");
const db = require("../utils/database");

const { Schema } = mongoose;

const employeeSchema = new Schema({
  employeeID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  dateOfBirth: { type: String },

  designation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  joiningDate: { type: String },

  shiftStartTime: {
    type: String,
    required: true,
  },
  shiftEndTime: {
    type: String,
    required: true,
  },

  checkInTime: {
    type: String,
    default: "--:--",
  },
  checkOutTime: {
    type: String,
    default: "--:--",
  },
  employmentStatus: {
    type: String,
    default: "active",
  },

  workingStatus: {
    type: String,
    default: "not-working",
  },
  breakStatus: {
    type: Boolean,
    default: false,
  },
  totalLeaveAvailable: {
    type: Number,
    default: 22,
  },
  totalLeaveTaken: {
    type: Number,
    default: 0,
  },
  leaveTakenDates: {
    type: [String],
    default: 0,
  },

  totalDaysWorked: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const employeeModel = db.model("Employee", employeeSchema);

module.exports = employeeModel;
