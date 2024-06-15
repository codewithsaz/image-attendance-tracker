const attendanceModel = require("../models/attendanceModel");
const employeeModel = require("../models/employeeModel");
const {
  formatDateTime,
  calculateTimeDifference,
  calculateTimeDifferenceWeight,
} = require("../utils/timeFormator");

//checkin - create attendance

exports.checkIn = async (req, res) => {
  const timeOut = formatDateTime(new Date());

  try {
    const ifcheckedIn = await attendanceModel.create({
      employeeId: req.employee._id,
      referencID: `${req.employee._id}_${timeOut.date.day}`,
      date: timeOut.date,
      checkInTime: timeOut.time,
    });

    console.log(ifcheckedIn);

    if (ifcheckedIn) {
      await employeeModel.updateOne(
        {
          _id: req.employee._id,
        },
        {
          workingStatus: "checkedIn",
          checkInTime: timeOut.time,
        }
      );
    }
    res.status(201).json({
      success: true,
      message: "Attendance Marked",
      time: {
        checkInTime: timeOut.time,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .json({ success: false, message: "Attendace cant be marked, Try Again" });
  }
};

//checkout - update
exports.checkOut = async (req, res) => {
  const timeOut = formatDateTime(new Date());

  try {
    const ifcheckoutavaialbale = await attendanceModel.findOne({
      employeeId: req.employee._id,
      referencID: `${req.employee._id}_${timeOut.date.day}`,
    });
    if (ifcheckoutavaialbale == null) {
      throw new Error("No attendace availble to update");
    }
    const totalWorkingTime = calculateTimeDifference(
      ifcheckoutavaialbale.checkInTime,
      timeOut.time
    );
    const totalWorkingTimeInDays = calculateTimeDifferenceWeight(
      ifcheckoutavaialbale.checkInTime,
      timeOut.time
    );
    const ifcheckedIn = await attendanceModel.updateOne(
      {
        _id: ifcheckoutavaialbale._id,
      },
      {
        checkOutTime: timeOut.time,
        totalWorkingTime: totalWorkingTime,
        totalDaysWorked: { $inc: Number(totalWorkingTimeInDays) },
      }
    );

    if (ifcheckedIn) {
      const updateEmployee = await employeeModel.updateOne(
        {
          _id: req.employee._id,
        },
        {
          workingStatus: "checkedOut",
          checkOutTime: timeOut.time,
        }
      );
      if (updateEmployee) console.log(updateEmployee);
      res.status(201).json({
        success: true,
        message: "Checkout Marked",
        time: {
          checkOutTime: timeOut.time,
          totalWorkingTime: totalWorkingTime,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .json({ success: false, message: "Attendace cant be marked, Try Again" });
  }
};

//breakin
exports.breakIn = async (req, res) => {
  const timeOut = formatDateTime(new Date());
  console.log("timeOut", timeOut);
  console.log("Employee", req.employee);

  try {
    const ifcheckoutavaialbale = await attendanceModel.findOne({
      employeeId: req.employee._id,
      referencID: `${req.employee._id}_${timeOut.date.day}`,
    });

    if (ifcheckoutavaialbale == null) {
      throw new Error("No attendace availble to update");
    }
    const ifcheckedIn = await attendanceModel.updateOne(
      {
        _id: ifcheckoutavaialbale._id,
      },
      {
        breakInTime: timeOut.time,
      }
    );

    if (ifcheckedIn) {
      await employeeModel.updateOne(
        {
          _id: req.employee._id,
        },
        {
          breakStatus: true,
        }
      );
    }
    res.status(201).json({ success: true, message: "BreakIn Marked" });
  } catch (error) {
    // console.log(error);
    res
      .status(501)
      .json({ success: false, message: "BreakIn cant be marked, Try Again" });
  }
};

//breakout - update
exports.breakout = async (req, res) => {
  const timeOut = formatDateTime(new Date());
  console.log("timeOut", timeOut);
  console.log("Employee", req.employee);

  try {
    const ifcheckoutavaialbale = await attendanceModel.findOne({
      employeeId: req.employee._id,
      referencID: `${req.employee._id}_${timeOut.date.day}`,
    });

    if (ifcheckoutavaialbale == null) {
      throw new Error("No attendace availble to update");
    }
    const ifcheckedIn = await attendanceModel.updateOne(
      {
        _id: ifcheckoutavaialbale._id,
      },
      {
        breakOutTime: timeOut.time,
        totalBreakTime: calculateTimeDifference(
          ifcheckoutavaialbale.breakInTime,
          timeOut.time
        ),
      }
    );

    if (ifcheckedIn) {
      await employeeModel.updateOne(
        {
          _id: req.employee._id,
        },
        {
          breakStatus: false,
        }
      );
    }
    res.status(201).json({ success: true, message: "Breakout Marked" });
  } catch (error) {
    // console.log(error);
    res
      .status(501)
      .json({ success: false, message: "Attendace cant be marked, Try Again" });
  }
};

//individual employee attendace history

exports.getIndvidualEmployeeAttendanceHistory = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
  const skip = (page - 1) * limit;
  try {
    const attendance = await attendanceModel
      .find(
        {
          employeeId: req.employee._id,
        },
        {
          // Projection to exclude unwanted fields
          _id: 0,
          employeeId: 0,
          referencID: 0,
        }
      )
      .skip(skip)
      .limit(limit);

    const totalAttendance = await attendanceModel.countDocuments({
      employeeId: req.employee._id,
    });

    if (attendance != null) {
      res.status(201).json({
        success: true,
        attendance: attendance,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalPages: Math.ceil(totalAttendance / limit),
          totalAttendance: Number(totalAttendance), // Calculate total pages
        },
      });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
exports.getIndvidualEmployeeAttendanceHistoryById = async (req, res) => {
  const { empID } = req.params;
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
  const skip = (page - 1) * limit;
  try {
    const employee = await employeeModel.findOne({ employeeID: empID });

    const attendance = await attendanceModel
      .find(
        {
          employeeId: employee._id,
        },
        {
          // Projection to exclude unwanted fields
          _id: 0,
          employeeId: 0,
          referencID: 0,
        }
      )
      .skip(skip)
      .limit(limit);

    const totalAttendance = await attendanceModel.countDocuments({
      employeeId: req.employee._id,
    });

    if (attendance != null) {
      res.status(201).json({
        success: true,
        attendance: attendance,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalPages: Math.ceil(totalAttendance / limit),
          totalAttendance: Number(totalAttendance), // Calculate total pages
        },
      });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
