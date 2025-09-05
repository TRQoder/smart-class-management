const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email & password provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // 2. Find student by email
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 4. Generate token
    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // token expires in 7 days
      }
    );

    // 5. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 6. Response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        registrationNumber: student.registrationNumber,
        phoneNumber: student.phoneNumber,
        department: student.department,
        semester: student.semester,
        batch: student.batch,
        section: student.section,
        role: student.role,
        createdAt: student.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in student login:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      rollNumber,
      registrationNumber,
      phoneNumber,
      department,
      semester,
      batch,
      section,
      password,
    } = req.body;

    // 1. Basic required fields check
    if (
      !name ||
      !email ||
      !rollNumber ||
      !registrationNumber ||
      !phoneNumber ||
      !department ||
      !semester ||
      !batch ||
      !password ||
      !section
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // 2. Check if student already exists
    const orQuery = [{ email }, { registrationNumber }];
    if (phoneNumber) orQuery.push({ phoneNumber });

    const existingStudent = await studentModel.findOne({ $or: orQuery });

    // const existingStudent = await studentModel.findOne({
    //   $or: [{ email }, { registrationNumber }, { phoneNumber }],
    // });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new student
    const newStudent = await studentModel.create({
      name,
      email,
      rollNumber,
      registrationNumber,
      phoneNumber,
      department,
      semester: Number(semester),
      batch,
      section,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newStudent._id, role: newStudent.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // token expires in 7 days
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // use secure cookies in production
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "Student registered successfully!",
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        rollNumber: newStudent.rollNumber,
        registrationNumber: newStudent.registrationNumber,
        phoneNumber: newStudent.phoneNumber,
        department: newStudent.department,
        semester: newStudent.semester,
        batch: newStudent.batch,
        section: newStudent.section,
        role: newStudent.role,
        createdAt: newStudent.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in student registration:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// check auth
const checkAuth = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Authorized user",
    user,
  });
};

module.exports = {
  login,
  registerStudent,
  checkAuth,
};
