const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model");
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

    let user = null;

    // Try finding in each model
    user = await studentModel.findById(decoded.id).select("-password");
    if (!user)
      user = await facultyModel.findById(decoded.id).select("-password");
    if (!user) user = await adminModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found, authorization denied",
      });
    }

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
