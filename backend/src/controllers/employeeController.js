const employeeModel = require("../models/employeeModel");
const {
  verifyPassword,
  encrptyPassword,
  generateToken,
} = require("../services/authService");

exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await employeeModel.findOne({ email: email }).exec();
    if (employee) {
      const verifyEmployee = await verifyPassword(password, employee.password);
      if (verifyEmployee) {
        try {
          const token = await generateToken(employee._id, employee.name);
          res
            .status(201)
            .cookie("token", token, {
              httpOnly: true, // This makes the cookie HttpOnly
              secure: true,
              signed: true,
              maxAge: 3 * 24 * 60 * 60 * 1000, // Expiration time in milliseconds
              // sameSite: "strict", // You can adjust SameSite as needed
            })
            .json({
              success: true,
              employee: {
                name: employee.name,
                email: employee.email,
                employeeID: employee.employeeID,
                designation: employee.designation,
                address: employee.address,
                workingStatus: employee.workingStatus,
                breakStatus: employee.breakStatus,
                checkInTime: employee.checkInTime,
                checkOutTime: employee.checkOutTime,
                shiftStartTime: employee.shiftStartTime,
                shiftEndTime: employee.shiftEndTime,
                totalLeaveAvailable: employee.totalLeaveAvailable,
                totalLeaveTaken: employee.totalLeaveTaken,
                leaveTakenDates: employee.leaveTakenDates,
                totalDaysWorked: employee.totalDaysWorked,
                isAdmin: employee.isAdmin,
              },
            });
        } catch (error) {
          throw new Error("Token Generation Failed");
        }
      } else {
        throw new Error("Wrong credentials");
      }
    } else throw new Error("Employee not found");
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.getEmployeeDeatils = async (req, res) => {
  const { email, password } = req.employee;

  try {
    const employee = await employeeModel.findOne({ email: email }).exec();
    if (employee) {
      res.status(201).json({
        success: true,
        employee: {
          name: employee.name,
          email: employee.email,
          employeeID: employee.employeeID,
          designation: employee.designation,
          address: employee.address,
          workingStatus: employee.workingStatus,
          breakStatus: employee.breakStatus,
          checkInTime: employee.checkInTime,
          checkOutTime: employee.checkOutTime,
          shiftStartTime: employee.shiftStartTime,
          shiftEndTime: employee.shiftEndTime,
          totalLeaveAvailable: employee.totalLeaveAvailable,
          totalLeaveTaken: employee.totalLeaveTaken,
          leaveTakenDates: employee.leaveTakenDates,
          totalDaysWorked: employee.totalDaysWorked,
          isAdmin: employee.isAdmin,
        },
      });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.getEmployeeDeatilsById = async (req, res) => {
  const { employeeID } = req.params;

  console.log(employeeID);

  try {
    const employee = await employeeModel
      .findOne({ employeeID: employeeID })
      .exec();
    if (employee) {
      res.status(201).json({
        success: true,
        employee: {
          name: employee.name,
          email: employee.email,
          employeeID: employee.employeeID,
          designation: employee.designation,
          address: employee.address,
          employmentStatus: employee.employmentStatus,
          workingStatus: employee.workingStatus,
          breakStatus: employee.breakStatus,
          checkInTime: employee.checkInTime,
          checkOutTime: employee.checkOutTime,
          shiftStartTime: employee.shiftStartTime,
          shiftEndTime: employee.shiftEndTime,
          totalLeaveAvailable: employee.totalLeaveAvailable,
          totalLeaveTaken: employee.totalLeaveTaken,
          leaveTakenDates: employee.leaveTakenDates,
          totalDaysWorked: employee.totalDaysWorked,
          isAdmin: employee.isAdmin,
        },
      });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  const { empID } = req.params;

  try {
    const employee = await employeeModel.findOne({ employeeID: empID }).exec();
    if (employee) {
      const deletedEmployee = await employeeModel
        .updateOne({ employeeID: empID }, { employmentStatus: "inactive" })
        .exec();
      if (deletedEmployee) {
        res.status(201).json({
          success: true,
          message: "Employee has been deleted",
        });
      }
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.getAllEmployeeDeatils = async (req, res) => {
  const { email, password } = req.employee;
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
  const skip = (page - 1) * limit;

  try {
    const employees = await employeeModel
      .find({ employmentStatus: "active" }, { _id: 0, password: 0 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEmployee = await employeeModel.countDocuments({});

    if (employees != null) {
      res.status(201).json({
        success: true,
        employees: employees,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalPages: Math.ceil(totalEmployee / limit), // Calculate total pages
        },
      });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").json({ success: true });
  } catch (error) {}
};
