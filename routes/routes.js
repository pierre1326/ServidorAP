//Routes

module.exports = function(app) {

  //CRUD Schemas

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
    produccion.find({}).toArray((err, result) => {
      if(err) {
        res.send({status: "Error with database"});
      }
      else {
        res.send({result: result});
      }
    });
  });

  app.get('/reportOrden', (req, res) => {
    let orden = models['Orden'];
    orden.find({}).toArray((err, result) => {
      if(err) {
        res.send({status: "Error with database"});
      }
      else {
        res.send({result: result});
      }
    });
  });

  app.get('/reportPaquete', (req, res) => {
    let paquete = models['Paquete'];
    paquete.find({}).toArray((err, result) => {
      if(err) {
        res.send({status: "Error with database"});
      }
      else {
        res.send({result: result});
      }
    });
  });

};
