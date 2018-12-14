class CountdownTimer {
  /**
   * @constructor
   *
   * @param {HTMLElement} element HTML Element to attach the timer on
   * @param {string} endTime The end time
   */
  constructor(element, endTime) {
    this.clock = element;
    this.updateClock(endTime);
    this.interval = setInterval(() => {
      this.updateClock(endTime);
    }, 1000);
  }

  /**
   * Calculates remaining time from the present moment to `endDate`
   *
   * @static
   * @param {string} endTime The end time
   * @returns {{total: number, days: number, hours: number, minutes: number, seconds: number}} Total time remaining
   */
  static getRemainingTime = endTime => {
    const t = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      total: t,
      days: days <= 0 ? 0 : days,
      hours: hours <= 0 ? 0 : hours,
      minutes: minutes <= 0 ? 0 : minutes,
      seconds: seconds <= 0 ? 0 : seconds,
    };
  };

  /**
   * Updates the HTML element
   *
   * @param {string} endTime The end time
   * @returns {undefined}
   * @returns {undefined}
   */
  updateClock(endTime) {
    const daysSpan = this.clock.querySelector('.gutenbee-countdown-days');
    const hoursSpan = this.clock.querySelector('.gutenbee-countdown-hours');
    const minutesSpan = this.clock.querySelector('.gutenbee-countdown-minutes');
    const secondsSpan = this.clock.querySelector('.gutenbee-countdown-seconds');
    const t = CountdownTimer.getRemainingTime(endTime);

    if (daysSpan) {
      daysSpan.innerHTML = t.days;
    }

    if (hoursSpan) {
      hoursSpan.innerHTML = `0${t.hours}`.slice(-2);
    }

    if (minutesSpan) {
      minutesSpan.innerHTML = `0${t.minutes}`.slice(-2);
    }

    if (secondsSpan) {
      secondsSpan.innerHTML = `0${t.seconds}`.slice(-2);
    }

    if (t.total <= 0) {
      this.stop();
    }
  }

  /**
   * Stops the countdown
   *
   * @returns {undefined}
   */
  stop() {
    clearInterval(this.interval);
  }

  /**
   * "Destroys" the instance
   *
   * @returns {undefined}
   */
  destroy() {
    this.stop();
    this.clock = null;
    this.interval = null;
  }
}

export default CountdownTimer;
