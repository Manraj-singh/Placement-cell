const passport = require("passport");
const router = require("express").Router();
const { studentController } = require("../controllers");

const { studentRegisterPrechecks } = require("../middlewares");

// router.get(
//   "/dashboard",
//   passport.checkAuthentication,
//   employeeController.viewDashboard
// );

//for registering employee , does prechecks in custom middle ware
router.post("/add", studentRegisterPrechecks, studentController.addStudent);
router.post("/remove", studentController.removeStudent);

module.exports = router;
