var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(mongoose) {
  var productorSchema = new mongoose.Schema({
  	user : String,
  	password : String,
  	idProductor : String
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
  var vuelosSchema = new mongoose.Schema({
    nombre: String,
    origen: String,
    destino: String,
    idEstado: String
  });
  var boletosSchema = new mongoose.Schema({
    origen: String,
    destino: String,
    idVuelo: ObjectId,
    FechaInicial: Number,
    FechaFinal: Number
  });
  var ordenCompraSchema = new mongoose.Schema({
    cedulaPasajero: String,
    idBoleto: ObjectId
  });
  var models = {
    Productor : mongoose.model('Productor', productorSchema),
    Orden: mongoose.model('Orden', ordenSchema),
    Paquete: mongoose.model('Paquete', paqueteSchema),
    Produccion: mongoose.model('Produccion', produccionSchema),
    Vuelos: mongoose.model('vuelos', vuelosSchema),
    Boletos: mongoose.model('boletos', boletosSchema),
    OrdenCompra: mongoose.model('ordenCompra', ordenCompraSchema)
  };
  return models;
}
