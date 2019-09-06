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
  var contexto = req.body.contextoId; 
  var tipo = req.body.tipoId; 

  //var sql = "INSERT INTO sensores VALUES (DEFAULT, '"+ unidad + "', '"+ tipo + "', '"+ valorMax + "', '"+ valorMin + "')";
  var sql = "INSERT INTO nodos VALUES ('"+ id + "', '"+ descripcion + "', '"+ localizacion + "', '"+ contexto + "', '"+ tipo + "')";
 
  db.query(sql, function(err, result) {
    if(err) {     
      res.status(500).send({ error: 'Algo salió mal' })
    }else{
      //console.log("Se pudo");
      res.send("Se ha creado con exito el nodo");
    } 
    //res.json({'status': 'success'})
  })
});

/* get method for fetch all puppies. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM nodos";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Algo falló' })
    }
    res.json(rows.rows);
  })
});

module.exports = router;