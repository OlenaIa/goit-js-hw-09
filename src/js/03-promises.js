import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(event) {
  event.preventDefault();

  const { elements: { delay, step, amount} } = event.currentTarget;
  const dataForm = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value)
  };

  if (dataForm.delay < 0 || dataForm.step < 0 || dataForm.amount < 0) {
    return Notify.failure('Please, enter positive values', {
      width: '400px',
      position: 'center-center',
      fontSize: '28px',
      clickToClose: true
    });
  };

  let delayPromise = dataForm.delay;
  for (let position = 1; position <= dataForm.amount; position++) {
    createPromise(position, delayPromise)
      .then(({ position, delayPromise }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delayPromise}ms`, {
          width: '400px',
          timeout: 4000,
          position: 'center-center',
          fontSize: '28px',
          clickToClose: true
        });
      })
      .catch(({position, delayPromise}) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayPromise}ms`, {
          width: '400px',
          timeout: 4000,
          position: 'center-center',
          fontSize: '28px',
          clickToClose: true
        });
      });
    delayPromise += dataForm.step;
  };   

  event.currentTarget.reset();
};

function createPromise(position, delayPromise) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delayPromise})
        // Fulfill
      } else {
        reject({position, delayPromise})
        // Reject
      }
    }, delayPromise)
  }); 
};


