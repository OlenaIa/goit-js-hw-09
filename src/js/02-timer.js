import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ++++++++++ Styles ++++++++++++++++

const timerRef = document.querySelector('.timer');
const fieldsRef = document.querySelectorAll('.field');
const valuesRef = document.querySelectorAll('.value');
const labelsRef = document.querySelectorAll('.label');

timerRef.style.cssText = "margin-top: 100px; justify-content: center; display: flex; gap: 30px";
fieldsRef.forEach(field => field.style.cssText = "text-align: center; width: 160px; font-size: 24px; background-color: rgb(55, 184, 201); border: 1px solid rgb(138, 158, 214); border-radius: 5px; padding: 20px;");
valuesRef.forEach(value => value.style.cssText = "display: block; background-color: rgb(122, 236, 192); padding: 16px 12px; border-radius: 5px; font-size: 60px;");
labelsRef.forEach(label => label.style.cssText = "display: block; margin-top: 12px;");

// ++++++++++++ Timer ++++++++++++++++

const startBtnRef = document.querySelector('[data-start]');
const inputRef = document.getElementById('datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtnRef.disabled = true;

// ++++++++++++ Calendar creation ++++++++++++++++

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (startBtnRef.dataset.start === 'active') { 
            startBtnRef.disabled = true;
            Notify.failure('The counter is already active', {
                width: '400px',
                position: 'center-center',
                fontSize: '28px',
                clickToClose: true,
            });
            return;
        }

        const date = Date.now();
        const deltaTime = selectedDates[0].getTime() - date;

        if (deltaTime <= 0) {
            Notify.failure('Please choose a date in the future', {
                width: '400px',
                position: 'center-center',
                fontSize: '28px',
                clickToClose: true,
            });
            return;
        }
        setTheTimer(deltaTime);
        
        startBtnRef.disabled = false;
    },
};
flatpickr(inputRef, options);

startBtnRef.addEventListener('click', onClickStart)

function onClickStart() {
    startBtnRef.disabled = true;
    startBtnRef.dataset.start = 'active';

    const selectedDate = new Date(inputRef.value);
    
    const timerId = setInterval(() => {
        let currentDate = new Date();
        let deltaTime = selectedDate.getTime() - currentDate.getTime();


        if (deltaTime <= 0) {
            clearInterval(timerId);
            startBtnRef.dataset.start = 'not-active';
            Notify.info('Time is up!', {
                width: '500px',
                position: 'center-center',
                fontSize: '40px',
                clickToClose: true,
                background: '#8e1d96',
            })
            return;
        };
        setTheTimer(deltaTime);

        // if (daysRef.textContent === '00') {
        //     if (hoursRef.textContent === '00') {
        //         if (minutesRef.textContent === '00') {
        //             if (secondsRef.textContent === '00') {
        //                 clearInterval(timerId);
        //                 startBtnRef.dataset.start = 'not-active';
        //                 Notify.info('Time is up!', {
        //                     width: '500px',
        //                     position: 'center-center',
        //                     fontSize: '40px',
        //                     clickToClose: true,
        //                     background: '#8e1d96',
        //                 });
        //             }
        //         }
        //     }
        // }
    }, 1000);

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

function setTheTimer(deltaTime) {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysRef.textContent = `${addLeadingZero(days)}`;
    hoursRef.textContent = `${addLeadingZero(hours)}`;
    minutesRef.textContent = `${addLeadingZero(minutes)}`;
    secondsRef.textContent = `${addLeadingZero(seconds)}`;
};

