var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(mongoose) {
  var productorSchema = new mongoose.Schema({
  	user : String,
  	password : String,
  	idProductor : Number
  });
  var ordenSchema = new mongoose.Schema({
  	cantidad: Number,
  	estado: String,
  	nombreProductor: String
  });
  var paqueteSchema = new mongoose.Schema({
  	codigoPaquete: Number,
  	fechaRecibido: Number,
  	fechaEntregado: Number
  });
  var produccionSchema = new mongoose.Schema({
  	cantidadAbono: Number,
  	cantidadEnergia: Number,
  	biomasaUsada: Number,
  	costo: Number
  });
  var models = {
    Productor : mongoose.model('Productor', productorSchema),
    Orden: mongoose.model('Orden', ordenSchema),
    Paquete: mongoose.model('Paquete', paqueteSchema),
    Produccion: mongoose.model('Produccion', produccionSchema)
  };
  return models;
}
