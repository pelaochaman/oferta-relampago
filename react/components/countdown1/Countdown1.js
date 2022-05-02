import React, { useState } from 'react'
import moment from 'moment';//https://momentjs.com/docs/
import { useEffect } from 'react'
import Timer from 'react-compound-timer'

const Countdown = ({ inicio,termino,setHide,setTerminado,dif }) => {
  //const [diferencia, setDiferencia] = useState(0);

  console.log("mostrando inicio desde componente 1", inicio);
  console.log("mostrando termino desde componente 1", termino);
  //console.log("mostrando hora actual", horaA);
 console.log("mostrando",parseInt(termino.diff(inicio)));
 //var diferenciaActual = horaA.diff(inicio);
 //console.log("diferenciaActual 1",diferenciaActual)
 var diferencia = parseInt(termino.diff(inicio)) + dif;
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
          <div></div>
            <Timer.Days /> :
            <Timer.Hours /> :
            <Timer.Minutes /> :
            <Timer.Seconds /> oferta 1
        </React.Fragment>
    )}
</Timer>
  )
}else{
  return null
}
}

export default Countdown;