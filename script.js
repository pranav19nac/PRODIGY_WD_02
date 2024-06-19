let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 10);
}

function stopStopwatch() {
    clearInterval(timerInterval);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

startStopButton.addEventListener('click', function() {
    if (!running) {
        startStopwatch();
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        stopStopwatch();
        startStopButton.textContent = 'Start';
        running = false;
    }
});

resetButton.addEventListener('click', function() {
    stopStopwatch();
    display.innerHTML = '00:00:00:00';
    startStopButton.textContent = 'Start';
    running = false;
    laps.innerHTML = '';
    lapTimes = [];
});

lapButton.addEventListener('click', function() {
    if (running) {
        lapTimes.push(display.innerHTML);
        const lapItem = document.createElement('li');
        lapItem.textContent = display.innerHTML;
        laps.appendChild(lapItem);
    }
});