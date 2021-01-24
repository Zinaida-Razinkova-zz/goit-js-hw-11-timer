// Timer через класс
const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
  timerFace: document.getElementById('timer-1'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      this.updateTimer(0);

      const time = this.targetDate - currentTime;
      this.updateTimer(time);

      if (time <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.updateTimer(0);
  }

  updateTimer(time) {
    const secondDays = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const secondHours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const secondMins = this.pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    );

    const secondSecs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return secondDays, secondHours, secondMins, secondSecs;
  }

  refsTextContent() {
    let newTime = this.updateTimer();

    refs.days.textContent = `${newTime.secondDays}`;
    refs.hours.textContent = `${newTime.secondHours}`;
    refs.mins.textContent = `${newTime.secondMins}`;
    refs.secs.textContent = `${newTime.secondSecs}`;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const Timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2021, 2, 22, 0, 0, 0),
});

// Начало работы таймера
Timer.start();
