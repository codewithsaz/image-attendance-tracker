const employeeModel = require("../models/employeeModel");
const {
  verifyPassword,
  encrptyPassword,
  generateToken,
} = require("../services/authService");

exports.registerEmployee = async (req, res) => {
  const {
    name,
    email,
    phone,
    designation,
    dateOfBirth,
    address,
    shiftEndTime,
    shiftStartTime,
    totalLeaveAvailable,
    isAdmin,
  } = req.body;

  console.log(req.body);

  try {
    const doesEmployeeExists = await employeeModel
      .findOne({ email: email })
      .exec();

    if (doesEmployeeExists) {
      res
        .status(404)
        .json({ success: false, message: "Employee Already Exists" });
    } else {
      const encrptedPass = await encrptyPassword(`IMAGE_${phone}`);
      const createEmployee = await employeeModel.create({
        employeeID: `IMAGE_${phone}`,
        name: name,
        email: email,
        password: encrptedPass,
        phone: phone,
        dateOfBirth: dateOfBirth,
        designation: designation,
        address: address,
        shiftStartTime: shiftStartTime,
        shiftEndTime: shiftEndTime,
        totalLeaveAvailable: totalLeaveAvailable,
        isAdmin: isAdmin,
      });

      if (createEmployee)
        res
          .status(201)
          .json({ success: true, message: "Employee has been Registered" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Employee Creation Failed" });
  }
};

exports.verifyAdmin = (req, res) => {
  res.status(201).json({ success: true, message: "Admin Rights Verified" });
};
