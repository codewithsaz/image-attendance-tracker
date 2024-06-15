const employeeModel = require("../models/employeeModel");
const leaveModel = require("../models/leaveModel");
const { sendMail } = require("../services/mailService");

exports.createNewLeave = async (req, res) => {
  const { leaveDate, leaveReason } = req.body;
  console.log(req.body);

  console.log(req.employee);

  try {
    const createLeave = await leaveModel.create({
      employeeId: req.employee._id,
      name: req.employee.name,
      employeeID: req.employee.employeeID,
      reason: leaveReason,
      date: leaveDate,
    });
    if (createLeave) {
      res
        .status(201)
        .json({ success: true, message: "Leave Application Send" });
    } else {
      throw new Error("Leave Application Failed");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Leave Application Failed" });
  }
};

exports.getEmployeeLeave = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
  const skip = (page - 1) * limit;
  try {
    const leaves = await leaveModel
      .find(
        { employeeId: req.employee._id },
        {
          // Projection to exclude unwanted fields
          _id: 0,
          employeeId: 0,
        }
      )
      .skip(skip)
      .limit(limit)
      .exec();

    const totalLeave = await leaveModel.countDocuments({});

    if (leaves) {
      res.status(201).json({
        success: true,
        leaves: leaves,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalPages: Math.ceil(totalLeave / limit),
          totalLeave: Number(totalLeave), // Calculate total pages
        },
      });
    } else {
      throw new Error("Leave Application Failed");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Fetching Leave Application Failed" });
  }
};
exports.getEmployeeLeaveById = async (req, res) => {
  const { empID } = req.params;
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
  const skip = (page - 1) * limit;
  try {
    const employee = await employeeModel.findOne({ employeeID: empID });
    const leaves = await leaveModel
      .find(
        { employeeId: employee._id },
        {
          // Projection to exclude unwanted fields
          _id: 0,
          employeeId: 0,
        }
      )
      .skip(skip)
      .limit(limit)
      .exec();

    const totalLeave = await leaveModel.countDocuments({});

    if (leaves) {
      res.status(201).json({
        success: true,
        leaves: leaves,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalPages: Math.ceil(totalLeave / limit),
          totalLeave: Number(totalLeave), // Calculate total pages
        },
      });
    } else {
      throw new Error("Leave Application Failed");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Fetching Leave Application Failed" });
  }
};
exports.getAllPastEmployeeLeave = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
  const skip = (page - 1) * limit;
  try {
    const leaves = await leaveModel
      .find(
        { status: { $in: ["approved", "rejected"] } },
        {
          employeeId: 0,
        }
      )
      .skip(skip)
      .limit(limit)
      .exec();
    const totalLeave = await leaveModel.countDocuments({
      status: { $in: ["approved", "rejected"] },
    });
    if (leaves) {
      res.status(201).json({
        success: true,
        leaves: leaves,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalPages: Math.ceil(totalLeave / limit),
          totalLeave: Number(totalLeave), // Calculate total pages
        },
      });
    } else {
      throw new Error("Leave Application Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Fetching All Leave Application Failed",
    });
  }
};

exports.getPendingLeave = async (req, res) => {
  try {
    const pendingLeaves = await leaveModel.find(
      { status: "pending" },
      {
        employeeId: 0,
      }
    );

    if (pendingLeaves) {
      res.status(201).json({ success: true, leaves: pendingLeaves });
    } else {
      throw new Error("Leave Application Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Fetching Pending Leave Application Failed",
    });
  }
};

exports.approveLeave = async (req, res) => {
  const { leaveID } = req.body;
  try {
    const pendingLeaves = await leaveModel.findOne({
      _id: leaveID,
      status: "pending",
    });

    if (pendingLeaves) {
      const ifUpdated = await leaveModel.updateOne(
        { _id: leaveID },
        {
          status: "approved",
        }
      );
      if (ifUpdated) {
        console.log("ifUpdated", ifUpdated);
        const employee = await employeeModel.findOne({
          employeeID: pendingLeaves.employeeID,
        });
        await employeeModel.updateOne(
          { _id: employee._id },
          { $inc: { totalLeaveTaken: 1 } }
        );

        console.log("employee", employee.email);
        const mailOption = {
          from: {
            name: "Image Notification",
            address: process.env.NODE_MAILER_EMAIL,
          },
          to: employee.email,
          subject: "Your leave has been Aproved",
          text: `Hi ${employee.name}, your leave for ${pendingLeaves.date} for the reason " ${pendingLeaves.reason} " has been approved `,
        };
        sendMail(mailOption);
        res.status(201).json({ success: true, message: " Leave Approved" });
      } else throw new Error("Leave Approval  Failed");
    } else {
      throw new Error("Cant Find leave Application ");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Leave Approval Failed",
    });
  }
};
exports.rejectLeave = async (req, res) => {
  const { leaveID } = req.body;
  try {
    const pendingLeaves = await leaveModel.findOne({
      _id: leaveID,
      status: "pending",
    });

    if (pendingLeaves) {
      const ifUpdated = await leaveModel.updateOne(
        { _id: leaveID },
        {
          status: "rejected",
        }
      );
      if (ifUpdated)
        res.status(201).json({ success: true, message: " Leave Rejected" });
      else throw new Error("Leave Approval  Failed");
    } else {
      throw new Error("Cant Find leave Application ");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Leave Approval Failed",
    });
  }
};
