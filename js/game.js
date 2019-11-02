const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const start = document.querySelector('.start');
const set = document.querySelector('.set_timer_btn');
const set_value = document.querySelector('#set_timer');
const reset = document.querySelector('.reset');


let action_flag = false // Флаг состояния работы секундомера (FALSE - не работает)

let countSec = 0;
let countMin = 0;

const updateText = () =>{ 
  minutes.innerHTML = (0 + String(countMin)).slice(-2);
  seconds.innerHTML = (0 + String(countSec)).slice(-2);
}
updateText();

const countDown = () => { 
  let total = countSec + countMin * 60;
  const timeinterval = setTimeout(countDown, 1000);
  if (action_flag){
    if (total <= 0) {
      clearTimeout(timeinterval);
      timer.style.display = 'none';
      message.innerHTML = '<p>Время вышло!</p>'
    }
    if(countSec > 0) countSec--;
    else{
      countSec = 59;
      countMin--;
    }
  }
  else{
    clearTimeout(timeinterval);
  }
  updateText();
}

plus.onclick = () =>{
  if(countSec < 59) ++countSec;
  else{
    countSec = 0;
    ++countMin;
  }
  updateText()
}

minus.onclick = () =>{
  if(countMin <= 0 && countSec===0){
    countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) --countSec;
  else{
    countSec = 59;
    --countMin;
  }
  updateText();
}

start.onclick = () => {
  if (!action_flag){
    action_flag = true;
    start.innerText = "Пауза";
    message.innerHTML = ''
  }
  else{
    action_flag = false;
    start.innerText = "Старт";
    message.innerHTML = '<p>Секундомер на паузе. Для продолжения - Старт.</p>'
  }
  countDown();
}

set.onclick = () => {
  user_time = set_value.value;
  if (user_time){
    if ((user_time.length == 5) && (user_time.indexOf(':') == 2)){
      a = (user_time.slice(0,2))*1;
      b = (user_time.slice(3,))*1;
      if ((!isNaN(a)) && (!isNaN(b))){
        if ((a < 60) && (b < 60)){
          countMin = a;
          countSec = b;
        }
      } 
    }
  }
  updateText()
}

reset.onclick = () =>{
  countSec = 0;
  countMin = 0;
  action_flag = false
  message.innerHTML = ''
  set_value.value = ''
  updateText();
}
