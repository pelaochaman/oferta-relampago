/* eslint-disable no-console */
import React, { Component } from "react";
import { injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { MyComponentProps } from './typings/global'
import { Progress } from 'vtex.styleguide'
import axios from 'axios'
import { useMutation } from 'react-apollo'
import MUTATIONS_ADD from './query/addToCart.gql'
import { useQuery } from 'react-apollo'
import { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Slider from "react-slick";
import QUERY_ORDERID from './query/orderId.gql'
import QUERY_TRAT from './query/collectionT.gql'
import { useLazyQuery } from 'react-apollo'
import { OrderFormProvider, useOrderForm } from 'vtex.order-manager/OrderForm'
import { Helmet } from 'vtex.render-runtime'
import { useRuntime } from 'vtex.render-runtime';
import QUERY_SETTINGS from './query/settings.gql'
import { canUseDOM } from 'vtex.render-runtime'
import moment from 'moment';//https://momentjs.com/docs/
import 'moment-timezone';//https://momentjs.com/timezone/
import Countdown from "./components/countdown1/index1";
import Countdown2 from "./components/countdown2/index2";
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
  'separatorthree',
  'title',
  'ofertaContainer',
  'ofertaHeader',
  'botonVariantMobile',
  'ofertaBody',
  'containerProducto',
  'contenedorProducto',
  'contenedorVariants',
  'containerVariants',
  'tituloVariants',
  'variants',
  'containerPrecios',
  'imagen',
  'imagen_img',
  'contenido',
  'nombre',
  'precio',
  'precioReal',
  'rowLeft',
  'verTodo',
  'imgCronometro',
  'rowRight',
  'botonComprar',
  'sliderImage',
  'fuego',
  'imgFuego',
  'separador'
]
const currency = function (number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(number);
};

const countdown = (props) => {
  var collecionProps = new String(props.collection);
  //ARRAY SKUS
  const [arrayElementos, setArray] = useState('');
  const [itemID, setItemID] = useState(0);
  const [arrayColl, setArrayColl] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [settingsP, setSettingsP] = useState({});
  const [hide, setHide] = useState("none");
  const [terminado, setTerminado]  = useState(false);
  // const productosFiltrados = [];
  //const Collect = useQuery(QUERY_TRAT, { variables: { col } })
  //const [ col , setcollection ]=useState('');
  const count = useCssHandles(CSS_HANDLES)
  var idSetInterval;

  /*const { data2 }= canUseDOM
  ? useQuery(QUERY_SETTINGS, { ssr: false })
  : ''
*/
  const { data: data2, loading } = useQuery(QUERY_SETTINGS, { ssr: false, onCompleted: async() => { 
    if(productosFiltrados.length == 0){
    console.log("INFORMACION CARGADA DESDE GRAPHQL 1", data2)
    const result = JSON.parse(data2.appSettings.message);
    console.log("RESULT 1", result);
    const resultado = await axios.get(`/api/catalog_system/pub/products/search?fq=productClusterIds:${result.idCollection1}`);
    const { data } = resultado;
    const arrayAux = [];
    for (const products of data) {
      arrayAux.push({
        sku: products.productId,
        precioReal: products.items[0].sellers[0].commertialOffer.ListPrice,
        nombre: products.productName,
        imagen: products.items[0].images[0].imageUrl,
        precio: products.items[0].sellers[0].commertialOffer.Price,
        link: products.link,
        items: products.items
      });
    }
    console.log("PRODUCTOS FILTRADOS DESPUES PUSH 1",arrayAux);
    setProductosFiltrados(arrayAux);
    console.log("PRODUCTOS FILTRADOS DESPUES SET 1",productosFiltrados);
  }} })

  console.log("PRODUCTOS FILTRADOS 1",productosFiltrados);
  //setTimeout(repetirCadaSegundo,2000);

  useEffect(() => {
    if (data2) {
      setSettingsP(JSON.parse(data2.appSettings.message))
    }
  }, [data2])

  if(loading) return null
  /*console.log("PROPS OFERTA 1")
  console.log("Fecha inicio", settingsP.startdate1)
  console.log("Fecha termino", settingsP.enddate1)
  console.log("ID coleción", settingsP.idCollection1)
  console.log("PROPS OFERTA 2")
  console.log("Fecha inicio", settingsP.startdate2)
  console.log("Fecha termino", settingsP.enddate2)
  console.log("ID coleción", settingsP.idCollection2)
  console.log("PROPS OFERTA 3")
  console.log("Fecha inicio", settingsP.startdate3)
  console.log("Fecha termino", settingsP.enddate3)
  console.log("ID coleción", settingsP.idCollection3)
*/
  var startDate = moment(settingsP.startdate1);
console.log("STARTDATE 1",startDate)
console.log("STARTDATE 1 1",settingsP.startdate1)
  var endDate = moment(settingsP.enddate1);
console.log("ENDDATE 1",endDate)
console.log("ENDDATE 1 1",settingsP.enddate1)
  var horaA = moment().format();
  console.log("HORA ACTUAL", horaA);
  var diferencia = parseInt(startDate.diff(horaA));
  console.log("DIFERENCIA",diferencia);
  console.log("END",endDate.format());
  console.log("ACTUAL",horaA)
  //console.log("diferencia en tiempo", moment(año).to(moment(año2)));
  var horaI = startDate.format();
  var horaF = endDate.format();
function mostrarOferta(){
  //console.log("MOSTRAR OFERTA RELAMPAGO")
  if(hide === "none" && terminado===false && horaF > horaA){
    console.log("MOSTRAR IF 3 CONDICIONES 1")
    setHide("block")
  }
  
}
if(diferencia){
  //console.log("ENTRANDO AL IF SET TIME")
  setTimeout(mostrarOferta, diferencia);
}
function repetirCadaSegundo() {
  horaA = moment().format();
  idSetInterval = setInterval(mostrarPrimeraCargar, 60000);
}
function mostrarPrimeraCargar(){
if(horaA === horaI){
  horaA = moment().format();
  console.log("ENTRO IF MOSTRAR PRIMERA CARGA 1");
  setHide("block");
}else if(horaA < horaI || horaA > horaF){
  console.log("ELSE IF MOSTRAR PRIMERA CARGA 1")
  if(horaA > horaF){
    setHide("none");
  }
 
}
}
  var collect1 = parseInt(settingsP.idCollection1);
  //console.log("Collect", collect1);
  var url = "https://juliolab--kayserltda.myvtex.com/["+collect1+"]?map=productClusterIds";
  
  const { orderForm, setOrderForm } = useOrderForm()

  const addToCart = (itemID) => {
   // console.log("item id", itemID);
    let orderId = orderForm.id;
    let cuerpo = '{"orderItems":['
    cuerpo = cuerpo + '{"quantity":"1" ,"seller":"1","id":"' + itemID + '"}'
    cuerpo = cuerpo + ']}'

    fetch('/api/checkout/pub/orderForm/' + orderId + '/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: cuerpo,
    })
    window.location.reload();
  }

  const ocultarVariantsInicio = { display: 'none' }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    accessibility: true,
    className: count.sliderImage
  };
 
  console.log("HIDE pack1",hide)
    return (
      <div className={`${count.ofertaContainer}`} style={{display: hide}}>
        <Helmet>
          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Helmet>
        <div className={`${count.ofertaHeader}`}>
          <div id="countdown-header" className={`${count.countdownheader}`}>
          </div>
          <div id="countdown-body" className={`${count.countdownbody}`}>
            <div className={`${count.rowLeft}`}>
              <h2 className={`${count.title}`}>SOLO POR POCAS HORAS</h2>
              <a className={`${count.verTodo}`} href={url} target="_blank">ver todo</a>
              <img className={`${count.imgCronometro}`} src="https://cdn-icons-png.flaticon.com/512/6874/6874028.png" />
            </div>
            <div className={`${count.rowRight}`} id="outline-countdown">
              <Countdown inicio={startDate} termino={endDate} setHide={setHide} setTerminado={setTerminado} dif={diferencia} handles={CSS_HANDLES}/>
            </div>
            <p id="message" className={`${count.message}`}></p>
          </div>
        </div>
        <div className={`${count.ofertaBody}`}>
          {
            productosFiltrados ? (
              <div className={`${count.containerProducto}`}>
                <Slider {...settings}>
                  {
                    productosFiltrados.map((prod) => (
                      <div className={`${count.contenedorProducto}`} >
                        <div className={`${count.fuego}`}><img className={`${count.imgFuego}`} src="https://cdn-icons-png.flaticon.com/512/785/785116.png" /></div>
                        <a className={`${count.imagen}`} href={prod.link}>
                          <img className={`${count.imagen_img}`} src={prod.imagen} />
                        </a>
                        <div id={prod.sku} className={`${count.containerVariants}`} >
                          <div className={`${count.contenedorVariants}`}>
                            {prod.items.filter(cat => (cat.sellers[0].commertialOffer.AvailableQuantity > 0)).map((variant) =>
                              <div className={`${count.variants}`} onClick={() => setItemID(parseInt(variant.itemId))} >{variant.Talla[0]} </div>
                            )}</div>
                        </div>
                        <button className={`${count.botonVariantMobile}`} id={"btn" + prod.sku}>Ver Tallas</button>
                        <div className={`${count.contenido}`} id={"prodId" + prod.sku}>
                          <a className={`${count.nombre}`} href={prod.link}>
                            <p className={`${count.nombre}`} >{prod.nombre}</p>
                          </a>
                          <div className={`${count.containerPrecios}`}>
                            <p className={`${count.precioReal}`} >{currency(prod.precioReal)}</p>
                            <p className={`${count.precio}`} >{currency(prod.precio)}</p>
                          </div>
                        </div>
                        <button className={`${count.botonComprar}`} onClick={() => addToCart(itemID)}>Comprar</button>
                      </div>
                    ))
                  }
                </Slider>
              </div>
            ) : (
              <h1>hola mundo!</h1>
            )
          }
        </div>
      </div>
    );
}
export default countdown