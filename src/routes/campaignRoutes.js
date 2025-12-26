const express = require("express");
const router = express.Router();
const controller = require("../controllers/campaignController");

router.post("/schedule", controller.updateCampaignSchedule);
router.get("/schedules", controller.fetchSchedules);

module.exports = router;
