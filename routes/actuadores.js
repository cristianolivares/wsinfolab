var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); //for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/*post method for create product*/
router.post('/create', function (req, res, next) {

  var id = req.body.id;
  var unidad = req.body.unidad;  
  var valorMax = req.body.valorMax;
  var valorMin = req.body.valorMin; 
  var nodo = req.body.nodoId
  var tipo = req.body.tipoId; 

  //var sql = "INSERT INTO actuadoresPrueba VALUES (DEFAULT, '"+ unidad + "', '"+ tipo + "', '"+ valorMax + "', '"+ valorMin + "')";
  var sql = "INSERT INTO actuadores VALUES ('"+ id + "', '"+ unidad + "', '"+ valorMax + "', '"+ valorMin + "', '"+ nodo + "', '"+ tipo + "')";

  db.query(sql, function(err, result) {
    if(err) {     
      res.status(500).send({ error: 'Algo salió mal' })
    }else{
      res.send("Se ha creado el actuador con exito");
    } 
    //res.json({'status': 'success'})
  })
});

/* get method for fetch all puppies. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM actuadores";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Algo falló' })
    }
    res.json(rows.rows);
  })
});

module.exports = router;