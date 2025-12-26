const cron = require("node-cron");

class SchedulerManager {
  constructor() {
    this.schedules = new Map(); 
  }

  createOrUpdateSchedule({ campaignId, cronExpression }) {
    
    if (this.schedules.has(campaignId)) {
      this.stopSchedule(campaignId);
    }

    const job = cron.schedule(cronExpression, () => {

      console.log(`Executing campaign ${campaignId} at ${new Date()}`);
      
    });

    const scheduleObj = {
      campaignId,
      cronExpression,
      job,
      status: "running",
      nextRunTime: job.nextDates().toDate()
    };

    this.schedules.set(campaignId, scheduleObj);
    job.start();

    return scheduleObj;
  }

  stopSchedule(campaignId) {
    const schedule = this.schedules.get(campaignId);
    if (!schedule) return false;

    schedule.job.stop();
    schedule.status = "stopped";
    this.schedules.delete(campaignId);
    return true;
  }

  getSchedules(filters = {}) {
    let result = Array.from(this.schedules.values());

    if (filters.campaignId) {
      result = result.filter(
        s => s.campaignId === filters.campaignId
      );
    }

    if (filters.status) {
      result = result.filter(
        s => s.status === filters.status
      );
    }

    return result;
  }
}

module.exports = new SchedulerManager();
