/* eslint-disable no-console */
import React from 'react'
import { injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { MyComponentProps } from './typings/global'
import { Progress } from 'vtex.styleguide'
const CSS_HANDLES = [
  'countdownheader',
  'countdownbody',
  'days',
  'hours',
  'minutes',
  'seconds',
  'daystext',
  'hourstext',
  'minutestext',
  'secondstext',
  'daysnum',
  'hoursnum',
  'minutesnum',
  'secondsnum',
  'message',
  'outlinecountdown',
  'separatorone',
  'separatortwo',
  'separatorthree'
] 

const countdown = (props) => {

const count = useCssHandles(CSS_HANDLES)

var countDownDate = new Date(props.startdate).getTime();


  var x = setInterval(function() {
    
    var now = new Date().getTime();
    
    var distance = countDownDate - now;
      
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //dias
    document.getElementById("days-num").innerHTML = days;
    //horas
    document.getElementById("hours-num").innerHTML = hours;
    //minutos
    document.getElementById("minutes-num").innerHTML = minutes;
    //segundos
    document.getElementById("seconds-num").innerHTML = seconds;
    //mensaje
    document.getElementById("message").innerHTML = "¡Quedan pocos días para el inicio del cyber!";

    if (distance < 0) {
      clearInterval(x);
      var countDownDatetwo = new Date(props.enddate).getTime();

      var x = setInterval(function() {
    
        var now = new Date().getTime();
        
        var distancetwo = countDownDatetwo - now;
          
        var days = Math.floor(distancetwo / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distancetwo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distancetwo % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distancetwo % (1000 * 60)) / 1000);
        //dias
        document.getElementById("days-num").innerHTML = days;
        //horas
        document.getElementById("hours-num").innerHTML = hours;
        //minutos
        document.getElementById("minutes-num").innerHTML = minutes;
        //segundos
        document.getElementById("seconds-num").innerHTML = seconds;
        //mensaje
        document.getElementById("message").innerHTML = "¡Quedan pocos días para finalizar el cyber!";
        if (distancetwo < 0) {
          clearInterval(x);
          document.getElementById("countdown-body").innerHTML = "";
          document.getElementById("message").innerHTML = "¡Ha finalizado el cyber!";
        }
      }, 1000);
    }
  }, 1000);

  return (
    
    <div>
      <h1>Ofertas Relampago</h1>
    <div id="countdown-header" className={`${count.countdownheader}`}>
      <h2>CONTADOR CYBER</h2>
      <p id="message" className={`${count.message}`}></p>
    </div>
    <div id="countdown-body" className={`${count.countdownbody}`}>
    <div id="outline-countdown" className={`${count.outlinecountdown}`}>
            <div id="days" className={`${count.days}`}>
                <div id="days-num" className={`${count.daysnum}`}></div>
                <div id="days-text" className={`${count.daystext}`}>dias</div>
            </div>
            <div id="separator-one" className={`${count.separatorone}`}>:</div>
            <div id="hours" className={`${count.hours}`}>
                <div id="hours-num" className={`${count.hoursnum}`}></div>
                <div id="hours-text" className={`${count.hourstext}`}>horas</div>
            </div>
            <div id="separator-two" className={`${count.separatortwo}`}>:</div>
            <div id="minutes" className={`${count.minutes}`}>
                <div id="minutes-num" className={`${count.minutesnum}`}></div>
                <div id="minutes-text" className={`${count.minutestext}`}>min</div>
            </div>
            <div id="separator-three" className={`${count.separatorthree}`}>:</div>
            <div id="seconds" className={`${count.seconds}`}>
                <div id="seconds-num" className={`${count.secondsnum}`}></div>
                <div id="seconds-text" className={`${count.secondstext}`}>seg</div>
            </div>
    </div>
    </div>
    </div>
  )
}

export default countdown