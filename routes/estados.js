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
  var actuador = req.body.actuadorId;

  var sql = "INSERT INTO estados VALUES (DEFAULT, '"+ tiempo + "', '"+ valor + "', '"+ actuador + "')";

  db.query(sql, function(err, result) {
    if(err) {     
      res.status(500).send({ error: 'Algo salió mal' })
    }else{
      res.send("Se realizó un cambio de estado de un actuador");
    } 
    //res.json({'status': 'success'})
  })
});

/* get method for fetch all puppies. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM estados";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Algo fallo' })
    }
    res.json(rows.rows);
  })
});

module.exports = router;