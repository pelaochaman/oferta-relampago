import React, { useState } from 'react'
import moment from 'moment';//https://momentjs.com/docs/
import { useEffect } from 'react'
import Timer from 'react-compound-timer'
const Countdown2 = ({ inicio,termino,setHide,setTerminado }) => {
  //const [diferencia, setDiferencia] = useState(0);
  //var horaA = moment();
  console.log("mostrando inicio desde componente 2", inicio);
  console.log("mostrando termino desde componente 2", termino);
 console.log("mostrando",termino.diff(inicio));
 //var diferenciaActual = horaA.diff(inicio);
 //console.log("diferenciaActual 1",diferenciaActual)
 var diferencia = termino.diff(inicio);
 console.log("diferencia 2",diferencia);
  //let duration = moment.duration(diferencia * 1000, 'milliseconds');
  const handleStop = () => {
    console.log("HANDLE STOP 2");
    setTerminado(true);
    setHide("none");
  } 
  /*useEffect(()=>{
      console.log("ENTRO USEEFFECT")
      duration = moment.duration(duration - interval, 'milliseconds');
      setCountdown(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
  },[countdown])*/
if(diferencia){
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
            <Timer.Seconds /> oferta 2
        </React.Fragment>
    )}
</Timer>
  )
}else{
  return null
}
}

export default Countdown2;