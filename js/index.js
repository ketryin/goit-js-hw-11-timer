class CountdownTimer {
   constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    
       this.init();
       this.start();
  }

  init() {
    const time = this.getTimeComponents(this.targetDate - Date.now());
    this.onTick(time);
  }

  start() {
      
    this.intervalId = setInterval(function () {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }.bind(this), 1000);
  }

    onTick({days, hours, mins, secs}) {
        const timer = document.querySelector(this.selector);

        const refs = {
            days: timer.querySelector('[data-value="days"]'),
            hours: timer.querySelector('[data-value="hours"]'),
            mins: timer.querySelector('[data-value="mins"]'),
            secs: timer.querySelector('[data-value="secs"]')
        };
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.mins.textContent = mins;
        refs.secs.textContent = secs;
    }


  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs};
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 01, 2021'),
});