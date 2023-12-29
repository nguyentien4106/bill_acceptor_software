function scheduleTask(hours, minutes, callBackFunc) {
    const targetTime = new Date();
    targetTime.setHours(hours);
    targetTime.setMinutes(minutes);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);
  
    const now = new Date();
    let timeToWait = targetTime - now;
  
    if (timeToWait < 0) {
      // If the current time is already past 23:15, add one day to the target time
      timeToWait += 24 * 60 * 60 * 1000;
    }
  
    setTimeout(() => {
        callBackFunc();
        // Schedule the task for the next day
        scheduleTask();
    }, timeToWait);
}

module.exports = scheduleTask
