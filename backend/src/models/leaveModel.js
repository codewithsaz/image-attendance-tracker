const mongoose = require("mongoose");
const db = require("../utils/database");

const { Schema } = mongoose;

const leaveSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  approverID: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  status: {
    type: String,
    default: "pending",
  },
});

const leaveModel = db.model("Leave", leaveSchema);

module.exports = leaveModel;
