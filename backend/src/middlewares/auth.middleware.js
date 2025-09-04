const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model");
const facultyModel = require("../models/faculty.model");
const adminModel = require("../models/admin.model");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try finding in each model
    let user;
    if (decoded.role === "STUDENT") user = await studentModel.findById(decoded.id);
    else if (decoded.role === "FACULTY") user = await facultyModel.findById(decoded.id);
    else if (decoded.role === "ADMIN") user = await adminModel.findById(decoded.id);

    // Attach user
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired",
    });
  }
};

module.exports = authMiddleware;
