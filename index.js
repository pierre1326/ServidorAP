//Librerias

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongoURI = "mongodb://proyecto1:proyecto1@ds339458.mlab.com:39458/biomasa";

//Conectar base de datos

//mongoose.connect(mongoURI, { useNewUrlParser: true });

//Esquemas

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

//POST por cada esquema
//GET listado produccion
//GET listado paquetes
//Login

//Configurar servidor

const PORT = process.env.PORT || 5000;

app.use (bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

//Rutas

app.get("/", (req, res) => {
	res.send("Prueba");
});

app.post("/loginProductor", (req, res) => {
	console.log(req.body);
	res.send({"response": true});
});

//TODO rutas

//Iniciar servidor

app.listen(PORT, function(){
	console.log("Servidor iniciado " + PORT);
});
