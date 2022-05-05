import React, { useState } from 'react'
import moment from 'moment';//https://momentjs.com/docs/
import { useEffect } from 'react'
import Timer from 'react-compound-timer'
import { useCssHandles } from 'vtex.css-handles'
const Countdown = ({ inicio,termino,setHide,setTerminado,dif,handles}) => {
  //const [diferencia, setDiferencia] = useState(0);
const handless = useCssHandles(handles);
  console.log("mostrando inicio desde componente 1", inicio);
  console.log("mostrando termino desde componente 1", termino);
  console.log("mostrando diferencia desde componente 1", dif);
 console.log("mostrando",parseInt(termino.diff(inicio)));
 //var diferenciaActual = horaA.diff(inicio);
 //console.log("diferenciaActual 1",diferenciaActual)
 var diferencia = parseInt(termino.diff(inicio));
 console.log("diferencia 1",diferencia);
  //let duration = moment.duration(diferencia * 1000, 'milliseconds');
const handleStop = () => {
  console.log("HANDLE STOP 1");
  setTerminado(true);
  setHide("none");
} 
  /*useEffect(()=>{
      console.log("ENTRO USEEFFECT")
      duration = moment.duration(duration - interval, 'milliseconds');
      setCountdown(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
  },[countdown])*/
if(diferencia){
  console.log("ENTRO IF CONTADOR 1")
  return (
    <Timer
    initialTime={diferencia}
    direction="backward"
    onStop={() => handleStop()}
>
    {({getTime,stop}) => (
        <React.Fragment>
          {getTime()<0 && stop()}
          <div className={`${handless.hours}`}><Timer.Hours /></div>
          <div className={`${handless.separador}`}>:</div> 
          <div className={`${handless.minutes}`}><Timer.Minutes /></div>
          <div className={`${handless.separador}`}>:</div> 
          <div className={`${handless.seconds}`}><Timer.Seconds /></div>
        </React.Fragment>
    )}
</Timer>
  )
}else{
  return null
}
}

export default Countdown;