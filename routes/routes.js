//Routes

module.exports = function(app, mongoose) {

  //CRUD Schemas

  app.post('/query', (req, res) => {
    let body = req.body;
    let ordenCompra = models['OrdenCompra'];
    ordenCompra.aggregate([
      {
        "$lookup": {
          "from": "boletos",
          "localField": "idBoleto",
          "foreignField": "_id",
          "as": "boletos"
        }
      },
      {
        "$unwind": "$boletos"
      },
      {
        "$lookup": {
          "from": "vuelos",
          "localField": "boletos.idVuelo",
          "foreignField": "_id",
          "as": "boletos.vuelo"
        }
      },
      {
        "$unwind": "$boletos.vuelo"
      },
      {
        "$match": {
          "cedulaPasajero": req.body.cedulaPasajero,
          "boletos.vuelo.idEstado": req.body.idEstado,
          "boletos.FechaInicial": {"$gte": req.body.fechaMinima, "$lt" : req.body.fechaMaxima},
          "boletos.FechaFinal": {"$gte": req.body.fechaMinima, "$lt" : req.body.fechaMaxima}
        }
      },
      {
        "$project": {
          "_id": 0,
          "boletos.vuelo.nombre": 1,
          "boletos.vuelo.origen": 1,
          "boletos.vuelo.destino": 1,
          "boletos.vuelo.itinerario": 1,
          "boletos.vuelo.precio": 1,
          "boletos.vuelo.idEstado": 1,
          "boletos.vuelo.capacidadMaxima": 1,
          "boletos.vuelo.idAerolinea": 1,
          "boletos.vuelo.restricciones": 1,
        }
      },
    ], (err, results) => {
      res.send(results);
    });
  });

  app.get('/insert', (req, res) => {
    let vuelo = models['Vuelos'];
    let newVuelo = new vuelo({
      nombre : "Vuelo 1",
      origen: "Estados Unidos",
      destino: "Japon",
      idEstado: "A tiempo"
    });
    newVuelo.save((err, resp) => {
      let boleto = models['Boletos'];
      let newBoleto = new boleto({
        origen: "Estados Unidos",
        destino: "Japon",
        idVuelo: resp['_id'],
        FechaInicial: 1572933600,
        FechaFinal: 1573815800
      });
      newBoleto.save((err, resp2) => {
        let ordenCompra = models['OrdenCompra'];
        let newOrden = new ordenCompra({
          cedulaPasajero: "1",
          idBoleto: resp2['_id']
        });
        newOrden.save((err, resp3) => {
          res.send(resp3);
        })
      })
    });
  });

  app.post('/date', (req, res) => {
    let body = req.body;
    let stringDate = body.date;
    let date = new Date(stringDate);
    let timeStamp = date.getTime();
    res.send({date: timeStamp});
  });

  app.post('/newProductor', (req, res) => {
    let body = req.body;
    let productor = models['Productor'];
    let newProductor = new productor({
      user: body.user,
      password: body.password,
      idProductor: body.idProductor
    });
    newProductor.save((err, resp) => {
      if(err) {
        res.send({status: false});
      }
      else {
        res.send({status: true});
      }
    });
  });

  app.post('/newOrden', (req, res) => {
    let body = req.body;
    let orden = models['Orden'];
    let newOrden = new orden({
      cantidad: body.cantidad,
      estado: body.estado,
      nombreProductor: body.nombreProductor
    });
    newOrden.save((err, resp) => {
      if(err) {
        res.send({status: false});
      }
      else {
        res.send({status: true});
      }
    });
  });

  app.post('/newPaquete', (req, res) => {
    let body = req.body;
    let paquete = models['Paquete'];
    let newPaquete = new paquete({
      codigoPaquete: body.codigoPaquete,
      fechaRecibido: body.fechaRecibido,
      fechaEntregado: body.fechaEntregado
    });
    newPaquete.save((err, resp) => {
      if(err) {
        res.send({status: false});
      }
      else {
        res.send({status: true});
      }
    });
  });

  app.post('/newProduccion', (req, res) => {
    let body = req.body;
    let produccion = models['Produccion'];
    let newProduccion = new produccion({
      cantidadAbono: body.cantidadAbono,
      cantidadEnergia: body.cantidadEnergia,
      biomasaUsada: body.biomasaUsada,
      costo: body.costo
    });
    newProduccion.save((err, resp) => {
      if(err) {
        res.send({status: false});
      }
      else {
        res.send({status: true});
      }
    });
  });

  //Login

  app.post('/login', (req, res) => {
    let body = req.body;
    let productor = models['Productor'];
    productor.findOne({user: body.user}, (err, result) => {
      if(err) {
        res.send({status: 'Error with database'});
      }
      if(result == null) {
        res.send({status: "User doesn't exists"})
      }
      else if(result['password'] != body.password) {
        res.send({status: "Incorrect password"});
      }
      else {
        res.send({status: true, idProductor: result['idProductor']});
      }
    });
  });

  //Reports

  app.get('/reportProduccion', (req, res) => {
    let produccion = models['Produccion'];
    produccion.find().exec((err, results) => {
      if(err) {
        res.send({status: "Error with database"});
      }
      else {
        res.send(results);
      }
    });
  });

  app.get('/reportOrden', (req, res) => {
    let orden = models['Orden'];
    orden.find().exec((err, results) => {
      if(err) {
        res.send({status: "Error with database"});
      }
      else {
        res.send(results);
      }
    });
  });

  app.get('/reportPaquete', (req, res) => {
    let paquete = models['Paquete'];
    paquete.find().exec((err, results) => {
      if(err) {
        res.send({status: "Error with database"});
      }
      else {
        res.send(results);
      }
    });
  });

};
