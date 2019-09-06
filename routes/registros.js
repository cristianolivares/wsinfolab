var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); //for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/*post method for create product*/
router.post('/create', function (req, res, next) {

  var tiempo = req.body.marcaTiempo;
  var valor = req.body.valor;
  var sensor = req.body.sensorId;

  var sql = "INSERT INTO registros VALUES (DEFAULT, '" + tiempo + "', '" + valor + "', '" + sensor + "')";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Algo salió mal' })
    } else {
      res.send("Se realizó el registro del sensor");
    }
    //res.json({'status': 'success'})
  })
});

/*post method for create product*/
router.post('/registro', function (req, res, next) {

  var marcaTiempo = req.body.marcatiempo
  var valor = req.body.valor;
  var sensorId = req.body.sensorid;

  //var sql = "INSERT INTO registros VALUES (DEFAULT,'"+ marcaTiempo + "' , '" + valor + "' , '" + sensorId + "' );";
  var sql = "INSERT INTO prueba VALUES (DEFAULT, '" + marcaTiempo + "', '" + valor + "')";
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Algo salió mal' })
    } else {
      console.log("Se pudo");
      res.send("Inserta");
    }
    //res.json({'status': 'success'})
  })
});

/*post method for create product*/
router.get('/registro/id', function (req, res, next) {

  var marcaTiempo = req.body.marcatiempo
  var valor = req.body.valor;
  var sensorId = req.body.sensorid;
  var id = req.query.id;

  //var sql = "INSERT INTO registros VALUES (DEFAULT,'"+ marcaTiempo + "' , '" + valor + "' , '" + sensorId + "' );";
  var sql = "SELECT * FROM registros WHERE sensores_id =" + id;

  db.query(sql, function (err, rows, result) {
    if (err) {
      res.status(500).send({ error: 'Algo salió mal' })
    } else {
      console.log("Se pudo");
      //console.log(id);
      //res.json(rows.rows);
      var arreglo = [];
      var split = [];
      for (var i = 0; i < rows.rows.length; i++) {
        let row = rows.rows[i];
        var agregar = row.marcatiempo;
        let fecha = formatDate(agregar);
        //AQUI VA EL SPLI Y LA COMPaRACION
        //var temp = agregar.split('T');
        //split.push(temp);
        console.log(fecha);
        //console.log(temp[i]);
        arreglo.push(agregar);
        console.log(row.marcatiempo);
        //arreglo.push(row.marcatiempo);        
      }
      res.json(agregar);

    }
    //res.json({'status': 'success'})
  })
});

/*Para traer con un GET la fecha*/
router.get('/fecha', function (req, res, next) {

  var marcaTiempo = req.body.marcatiempo
  var valor = req.body.valor;
  var sensorId = req.body.sensorid;
  var id = req.query.id;

  //var sql = "INSERT INTO registros VALUES (DEFAULT,'"+ marcaTiempo + "' , '" + valor + "' , '" + sensorId + "' );";
  var sql = "SELECT * FROM registros";

  db.query(sql, function (err, rows, result) {
    if (err) {
      res.status(500).send({ error: 'Algo salió mal' })
    } else {

      var arreglo = [];
      var split = [];
      for (var i = 0; i < rows.rows.length; i++) {
        let counter = 0;
        let objeto = {};
        let row = rows.rows[i];
        //Setear la zona horaria de la fecha extraida de la BD
        var agregar = row.marcatiempo.toLocaleString('en-GB', {timeZone: "America/Bogota"});
        //Transformar a formato YYYY-MM-DD
        let fecha = formatDate(agregar);
    
        if (fecha == id) {
          objeto.id = row.id;
          //Tranformar al formato requerido YYYY-MM-DD T hh-mm-ss
          let fecha_sinfor = new Date(row.marcatiempo.toLocaleString('en-GB', {timeZone: "America/Bogota"}));        
          let fecha_confor = fecha_sinfor.getFullYear() + "-" + (fecha_sinfor.getMonth() + 1) + "-" + fecha_sinfor.getDate() + "T" + fecha_sinfor.getHours() + ":" + fecha_sinfor.getMinutes() + ":" + fecha_sinfor.getSeconds();   
          objeto.marcatiempo = fecha_confor;
          objeto.valor = row.valor;
          objeto.sensores_id = row.sensores_id;
          counter++;
          arreglo.push(objeto);
        }
      }
      res.json(arreglo);
    }  
  })
});

/*Para traer con un GET un intervalo de fechas*/
router.get('/intervalo', function (req, res, next) {
  var inicio = req.query.inicio;
  var fin = req.query.fin;

  //var sql = "INSERT INTO registros VALUES (DEFAULT,'"+ marcaTiempo + "' , '" + valor + "' , '" + sensorId + "' );";
  var sql = "SELECT * FROM registros";

  db.query(sql, function (err, rows, result) {
    if (err) {
      res.status(500).send({ error: 'Algo salió mal' })
    } else {

      var arreglo = [];
      for (var i = 0; i < rows.rows.length; i++) {
        let objeto = {};
        let row = rows.rows[i];
        var agregar = row.marcatiempo;
        let fecha = formatDate(agregar);
        var fechaConv = Date.parse(fecha);
        var inicioConv = Date.parse(inicio);
        var finConv = Date.parse(fin);
        if (fechaConv >= inicioConv && fechaConv <= finConv) {
          objeto.id = row.id;
          objeto.marcatiempo = row.marcatiempo;
          objeto.valor = parseInt(row.valor);
          objeto.sensores_id = row.sensores_id;
          arreglo.push(objeto);
        }
      }
      res.json(arreglo);
    }
    //res.json({'status': 'success'})
  })
});

/*Para traer con un GET un intervalo de fechas*/
router.get('/lapso', function (req, res, next) {
  var inicio = req.query.inicio;
  var fin = req.query.fin;
  
  //Castear fechas de entrada al formato YYYY-MM-DD hh-mm-ss
  let castInicio = new Date(inicio);
  //let casteoInicio = castInicio.getFullYear() + "-" + (castInicio.getMonth() + 1) + "-" + castInicio.getDate() + " " + castInicio.getHours() + ":" + castInicio.getMinutes() + ":" + castInicio.getSeconds();     
  let casteoInicio = castInicio.getFullYear().toString()+"-"+((castInicio.getMonth()+1).toString().length==2?(castInicio.getMonth()+1).toString():"0"+(castInicio.getMonth()+1).toString())+"-"+(castInicio.getDate().toString().length==2?castInicio.getDate().toString():"0"+castInicio.getDate().toString())+" "+(castInicio.getHours().toString().length==2?castInicio.getHours().toString():"0"+castInicio.getHours().toString())+":"+((parseInt(castInicio.getMinutes()/5)*5).toString().length==2?(parseInt(castInicio.getMinutes()/5)*5).toString():"0"+(parseInt(castInicio.getMinutes()/5)*5).toString())+":00";
  let castFin = new Date(fin);
  //let casteoFin = castFin.getFullYear() + "-" + (castFin.getMonth() + 1) + "-" + castFin.getDate() + " " + castFin.getHours() + ":" + castFin.getMinutes() + ":" + castFin.getSeconds();     
  let casteoFin = castFin.getFullYear().toString()+"-"+((castFin.getMonth()+1).toString().length==2?(castFin.getMonth()+1).toString():"0"+(castFin.getMonth()+1).toString())+"-"+(castFin.getDate().toString().length==2?castFin.getDate().toString():"0"+castFin.getDate().toString())+" "+(castFin.getHours().toString().length==2?castFin.getHours().toString():"0"+castFin.getHours().toString())+":"+((parseInt(castFin.getMinutes()/5)*5).toString().length==2?(parseInt(castFin.getMinutes()/5)*5).toString():"0"+(parseInt(castFin.getMinutes()/5)*5).toString())+":00";
  //var sql = "INSERT INTO registros VALUES (DEFAULT,'"+ marcaTiempo + "' , '" + valor + "' , '" + sensorId + "' );";
  var sql = "SELECT * FROM registros";

  db.query(sql, function (err, rows, result) {
    if (err) {
      res.status(500).send({ error: 'Algo salió mal' })
    } else {

      var arreglo = [];
      for (var i = 0; i < rows.rows.length; i++) {
        let objeto = {};
        let row = rows.rows[i];
        var agregar = row.marcatiempo;
        let fecha = formatDate(agregar);      
        
        //Setear zona horaria a la fecha extraida de la BD
        let fechaEntrada = agregar.toLocaleString('en-GB', {timeZone: "America/Bogota"});
        let casteoFecha = new Date(fechaEntrada);
        //let casteoEntrada = casteoFecha.getFullYear() + "-" + (casteoFecha.getMonth() + 1) + "-" + casteoFecha.getDate() + " " + casteoFecha.getHours() + ":" + casteoFecha.getMinutes() + ":" + casteoFecha.getSeconds();  
        let casteoEntrada = casteoFecha.getFullYear().toString()+"-"+((casteoFecha.getMonth()+1).toString().length==2?(casteoFecha.getMonth()+1).toString():"0"+(casteoFecha.getMonth()+1).toString())+"-"+(casteoFecha.getDate().toString().length==2?casteoFecha.getDate().toString():"0"+casteoFecha.getDate().toString())+" "+(casteoFecha.getHours().toString().length==2?casteoFecha.getHours().toString():"0"+casteoFecha.getHours().toString())+":"+((parseInt(casteoFecha.getMinutes()/5)*5).toString().length==2?(parseInt(casteoFecha.getMinutes()/5)*5).toString():"0"+(parseInt(casteoFecha.getMinutes()/5)*5).toString())+":00";
        //Impresiones de prueba
      /*console.log(casteoEntrada);
        console.log(casteoInicio);
        console.log(casteoFin); */

        //Comparar una por una las fechas extraidas de la BD y si se encuentra en el intervalo
        if (casteoEntrada >= casteoInicio && casteoEntrada <= casteoFin) {
          objeto.id = row.id;
          //Tranformar al formato requerido YYYY-MM-DD T hh-mm-ss
          let fecha_sinfor = new Date(row.marcatiempo.toLocaleString('en-GB', {timeZone: "America/Bogota"}));               
          //let fecha_confor = fecha_sinfor.getFullYear() + "-" + (fecha_sinfor.getMonth() + 1) + "-" + fecha_sinfor.getDate() + "T" + fecha_sinfor.getHours() + ":" + fecha_sinfor.getMinutes() + ":" + fecha_sinfor.getSeconds();   
          let new_fecha = fecha_sinfor.getFullYear().toString()+"-"+((fecha_sinfor.getMonth()+1).toString().length==2?(fecha_sinfor.getMonth()+1).toString():"0"+(fecha_sinfor.getMonth()+1).toString())+"-"+(fecha_sinfor.getDate().toString().length==2?fecha_sinfor.getDate().toString():"0"+fecha_sinfor.getDate().toString())+" "+(fecha_sinfor.getHours().toString().length==2?fecha_sinfor.getHours().toString():"0"+fecha_sinfor.getHours().toString())+":"+((parseInt(fecha_sinfor.getMinutes()/5)*5).toString().length==2?(parseInt(fecha_sinfor.getMinutes()/5)*5).toString():"0"+(parseInt(fecha_sinfor.getMinutes()/5)*5).toString())+":00";
          objeto.marcatiempo = new_fecha;
          //console.log("Esta: " + new_fecha); 
          objeto.valor = parseInt(row.valor);
          objeto.sensores_id = row.sensores_id;
          arreglo.push(objeto);
        }
      }
      res.json(arreglo);
    }
    //res.json({'status': 'success'})
  })
});

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

/*post method for create product*/
router.post('/prueba', function (req, res, next) {

  var tiempo = req.body.tiempo
  var valor = req.body.valor;

  //var sql = "INSERT INTO registros VALUES (DEFAULT,'"+ marcaTiempo + "' , '" + valor + "' , '" + sensorId + "' );";
  var sql = "INSERT INTO registrosPrueba VALUES (DEFAULT, '" + tiempo + "', '" + valor + "')";
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Algo salió mal' })
    } else {
      console.log("Se pudo");
      res.send("Inserta");
    }
    //res.json({'status': 'success'})
  })
});

/* get method for fetch all puppies. */
router.get('/', function (req, res, next) {
  var sql = "SELECT * FROM registros";
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Algo falló' })
    }
    res.json(rows.rows);
  })
});

module.exports = router;