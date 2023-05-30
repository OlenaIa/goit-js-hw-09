const bodyRef = document.body;
const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');

startRef.addEventListener('click', onStartClick);
stopRef.addEventListener('click', onStopClick);
let timerId = null;

function onStartClick() {
    if (!timerId) {
        timerId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor();
        }, 1000); 
        // console.log(timerId);    
    }    
};

function onStopClick() {
    if (timerId) {
        clearInterval(timerId);
        // console.log('clear Interval', timerId);
        timerId = null;
    }
    // bodyRef.removeAttribute('style');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

