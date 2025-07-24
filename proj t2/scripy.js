const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');

let startTime=0, elapsed=0, rafId=null;
let laps = [], lastLapTime=0;

function format(ms) {
  const totalCs = Math.floor(ms/10);        // centiseconds
  const cs = totalCs % 100;
  const totalSec = Math.floor(totalCs/100);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec/60);
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
}

function update() {
  elapsed = performance.now() - startTime;
  display.textContent = format(elapsed);
  rafId = requestAnimationFrame(update);
}

startBtn.addEventListener('click', () => {
  if (!rafId) {
    startTime = performance.now() - elapsed;
    rafId = requestAnimationFrame(update);
    startBtn.textContent='Pause';
    lapBtn.disabled=false;
    resetBtn.disabled=false;
  } else {
    cancelAnimationFrame(rafId);
    rafId = null;
    startBtn.textContent='Start';
  }
});

lapBtn.addEventListener('click', () => {
  const now = elapsed;
  const lapTime = now - lastLapTime;
  lastLapTime = now;
  laps.unshift(lapTime);
  renderLaps();
});

resetBtn.addEventListener('click', () => {
  cancelAnimationFrame(rafId);
  rafId=null;
  elapsed=0;
  lastLapTime=0;
  laps=[];
  display.textContent='00:00.00';
  renderLaps();
  startBtn.textContent='Start';
  lapBtn.disabled=true;
  resetBtn.disabled=true;
});

function renderLaps() {
  lapsList.innerHTML='';
  laps.forEach((lp,i) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length - i}: ${format(lp)}`;
    lapsList.appendChild(li);
  });
}