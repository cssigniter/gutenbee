class Countdown {
  constructor(element, endTime) {
    this.clock = element;
    this.updateClock(endTime);
    this.interval = setInterval(() => this.updateClock(endTime), 1000);
  }

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

  updateClock(endTime) {
    const daysSpan = this.clock.querySelector('.gutenbee-countdown-days');
    const hoursSpan = this.clock.querySelector('.gutenbee-countdown-hours');
    const minutesSpan = this.clock.querySelector('.gutenbee-countdown-minutes');
    const secondsSpan = this.clock.querySelector('.gutenbee-countdown-seconds');
    const t = Countdown.getRemainingTime(endTime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = `0${t.hours}`.slice(-2);
    minutesSpan.innerHTML = `0${t.minutes}`.slice(-2);
    secondsSpan.innerHTML = `0${t.seconds}`.slice(-2);

    if (t.total <= 0) {
      clearInterval(this.interval);
    }
  }
}

export default Countdown;
