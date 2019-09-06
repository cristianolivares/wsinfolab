var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); //for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/*post method for create product*/
router.post('/create', function (req, res, next) {

  var id = req.body.id;
  var descripcion = req.body.descripcion;  
  var localizacion = req.body.localizacion;
  var mapa = req.body.mapa; 
  var tipo = req.body.tipoId; 

  //var sql = "INSERT INTO sensores VALUES (DEFAULT, '"+ unidad + "', '"+ tipo + "', '"+ valorMax + "', '"+ valorMin + "')";
  var sql = "INSERT INTO contextos VALUES ('"+ id + "', '"+ descripcion + "', '"+ localizacion + "', '"+ mapa + "', '"+ tipo + "')";
 
  db.query(sql, function(err, result) {
    if(err) {     
      res.status(500).send({ error: 'Algo salió mal' })
    }else{
      //console.log("Se pudo");
      res.send("Se ha creado con exito el contexto");
    } 
    //res.json({'status': 'success'})
  })
});

/* get method for fetch all puppies. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM contextos";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Algo falló' })
    }
    res.json(rows.rows);
  })
});

module.exports = router;