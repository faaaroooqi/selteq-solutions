const schedulerManager = require("../scheduler/schedulerManager");

exports.updateCampaignSchedule = (req, res) => {
  const { campaignId, cronExpression } = req.body;

  if (!campaignId || !cronExpression) {
    return res.status(400).json({ message: "Missing data" });
  }

  const schedule = schedulerManager.createOrUpdateSchedule({
    campaignId,
    cronExpression
  });

  res.json({
    message: "Schedule updated successfully",
    schedule
  });
};

exports.fetchSchedules = (req, res) => {
  const schedules = schedulerManager.getSchedules(req.query);
  res.json(schedules);
};
