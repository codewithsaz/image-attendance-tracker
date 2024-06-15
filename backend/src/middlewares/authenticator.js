const saltRounds = Number(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");
const employeeModel = require("../models/employeeModel");
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (token) {
      const employeeID = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      ).employeeId;
      if (!employeeID) throw new Error("Token expired or bad token");

      const employee = await employeeModel
        .findOne({
          _id: employeeID,
        })
        .exec();
      if (!employee) throw new Error("No user found");
      req.employee = employee;
      next();
    } else throw new Error("No token in request");
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Your not authorized",
      reason: err.message,
    });
  }
};

exports.verfiyAdminRights = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (token) {
      const employeeID = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      ).employeeId;
      if (!employeeID) throw new Error("Token expired or bad token");

      const employee = await employeeModel
        .findOne({
          _id: employeeID,
        })
        .exec();
      console.log(employee);
      if (!employee) throw new Error("No user found");
      if (employee.isAdmin) {
        req.employee = employee;
        next();
      } else {
        throw new Error("Your not authorized");
      }
    } else throw new Error("No token in request");
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Your not authorized" });
  }
};

// exports.verifyPremiumMembership = async (req, res, next) => {
//   try {
//     // console.log(req.cookies);
//     const token = req.cookies.token;
//     if (token) {
//       const userID = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;
//       const user = await UserModel.findOne({ _id: userID }).exec();
//       if (user.isPremium) {
//         req.user = user;
//         next();
//       } else {
//         return res
//           .status(403)
//           .json({ success: false, message: "Your not authorized" });
//       }
//     } else throw new Error("No token in request");
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(401)
//       .json({ success: false, message: "Your not authorized" });
//   }
// };
