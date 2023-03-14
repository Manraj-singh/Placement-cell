const passport = require("passport");
const router = require("express").Router();
const { interviewController } = require("../controllers");

//renders employee dashboard
router.get(
  "/dashboard",
  passport.checkAuthentication,
  interviewController.viewDashboard
);

router.get("/company/:companyName", interviewController.companyDashboard);
router.get("/external-jobs", interviewController.externalJobs);
router.post("/add", interviewController.addInterview);
router.post("/updateStatus", interviewController.updateStatus);

module.exports = router;
