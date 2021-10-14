// we are initiating the countdown to make the interval stop and not running.
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timer (to avoid refresh page everytime we missclick or we want to change the timer)
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it because Interval doesn't stop by themself
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// this function is usefull because the interval is starting with one second late. The set interval does not run immediately.
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
  // console.log(seconds)
}


function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${minutes}`;

  // for canadians or americans :
  // const adjustHour = hour > 12 ? hour - 12 : hour;
  // endTime.textContent = `Be Back At ${adjustHour}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function startTimer() {
  // console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  // console.log(mins);
  timer(mins * 60)
  this.reset();
})
