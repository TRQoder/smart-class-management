const authControllers = require("../controllers/auth.controllers");

const router = require("express").Router();

/* 
POST /api/auth/register
POST /api/auth/login 
*/

// routes
router.post("/register", authControllers.registerStudent);
router.post("/login", authControllers.login);

module.exports = router;
