const authControllers = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

/* 
POST /api/auth/register
POST /api/auth/login 
*/

// routes
router.post("/register", authControllers.registerStudent);
router.post("/login", authControllers.login);
router.get("/check-auth",authMiddleware, authControllers.checkAuth);

module.exports = router;
