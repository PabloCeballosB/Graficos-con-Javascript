'use strict'

window.onload = iniciar()

/*Funcion que captura fichero json (Histograma.json) y
llama a la funcion parsear para posteriormente ejecutarlos*/
function iniciar(){
  fetch('../Archivos/histograma.json')
    .then(respuesta => respuesta.json())
    .then(objeto => {
      let datos = parsear(objeto)   //Pasar los datos copilados de la funcion Parsear a la variable datos
      ejecutar(datos)   // Llamar a la funcion que se encarga de rellenar el grafico
    })

  iniciar2()  //Llamar a la funcion que se encarga de rellenar el segundo grafico (Tarta)
}

function parsear(objeto){
  let nombres = []
  for(let i = 0; i < objeto.length; i++)    //Bucle que se encargara de capturar los datos deseados
  {
    let nombre = {}
    nombre.corx = objeto[i].MetaData[2].Nombre    // Capturar datos "nombre" al array Nombre.corx
    nombre.valor = objeto[i].Data[0].Valor    // Capturar datos "Valor" al array Nombre.valor
    nombres.push(nombre)  //Agrega los elementos capturados al array Nombre

  }
  return nombres
}

function ejecutar(datos){
  new Morris.Bar({
    // Identificador del div para conectarlo con html
    element: 'myfirstchart',

    // Pasar la variable con los datos para rellenar el grafico
    data: datos,


    // El nombre del atributo de registro de datos que contiene valores de x.
    xkey: 'corx',
    // Una lista de nombres de atributos de registros de datos que contienen valores y.
    ykeys: ['valor'],
    // Etiquetas para las teclas y: se mostrarán cuando pase el raton sobre el gráfico.
    labels: ['valor'],

    //Funcion que permite asignarle una escala de color rojo al grafico de barras
    barColors: function (row, series, type) {
      if (type === 'bar') {
      var red = Math.ceil(255 * row.y / this.ymax);
      return 'rgb(' + red + ',0,0)';
   }
   else {
     return '#000';
   }
 }
  });
}


/*Funcion que captura fichero json (Histograma.json) y
llama a la funcion parsear para posteriormente ejecutarlos*/
function iniciar2(){
  fetch('../Archivos/tarta.json')
  .then(respuesta1 => respuesta1.json())
  .then(objeto1 => {
    let datos1 = parsear2(objeto1) //Pasar los datos copilados de la funcion Parsear a la variable datos1
    ejecutar2(datos1)   // Llamar a la funcion que se encarga de rellenar la tarta
  })
}

function parsear2(objeto1){
  let tarta = []
  for(let i = 0; i < objeto1.length; i++)    //Bucle que se encargara de capturar los datos deseados
  {
    let nombre1 = {}
        // Capturar datos "ResultadosPorComunidadesAutonomas" al array Nombre1.label
    nombre1.label = objeto1[i].ResultadosPorComunidadesAutonomas

    nombre1.value = objeto1[i].field2    // Capturar datos "field2" al array Nombre1.value
    tarta.push(nombre1)  //Agrega los elementos capturados al array tarta

  }
  return tarta
}

function ejecutar2(datos1){
  Morris.Donut({
      // Identificador del div para conectarlo con html
    element: 'tarta',

    // Pasar la variable con los datos para rellenar el grafico
    data: datos1,

    // Permitir asignarles los colores deseados
    labelColor: '#000000',  // Color para texto que aparece en el medio del grafico
  colors: [ //Array con colores para asignarle a cada campo y repetitivos
    '#212F3C',
    '#273746',
    '#2C3E50',
    '#566573',
    '#ABB2B9'
  ],
    formatter: function (x) { return x + "%"}
  })
}
