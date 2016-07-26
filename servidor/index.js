var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var bodyParser = require("body-parser");
app.use(bodyParser.json()); //soporte para codificar json
app.use(bodyParser.urlencoded({ extended: true })); //Soporte para decodificar las url


var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: "GabyPetsNotify-27cb0993d1cf.json",
  databaseURL: "https://gabypetsnotify.firebaseio.com"
});

var FCM = require('fcm-push');

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/android', function(request, response) {
  response.render('pages/index');
});

//URL: https://gabypetsnotify.herokuapp.com/registrar-usuario
var uri_servicio = '/registrar-usuario';
//app.post(uri_servicio, function(request, response) 
app.post('/registrar-usuario', function(request, response) {

   // obtiene parametros POST
	var id_dispositivo 	      = request.body.id_dispositivo;
	var id_usuario_instagram 	= request.body.id_usuario_instagram;
   
   // guarda parametros en base de datos
	var db = firebase.database();
	var db_Ref = db.ref(uri_servicio).push();
	db_Ref.set({
		id_dispositivo:         id_dispositivo,
      id_usuario_instagram:   id_usuario_instagram
	});	

  console.log('GABY1 Servicio https://gabypetsnotify.herokuapp.com/registrar-usuario corriendo en puerto', app.get('port'));
  console.log('GABY2 id_dispositivo', id_dispositivo);
  console.log('GABY3 id_usuario_instagram', id_usuario_instagram);
  //response.send(request.body.id_dispositivo);

  // obtiene identificador de registro
 	var path = db_Ref.toString(); //https://project-4284821003924177471.firebaseio.com/id_dispositivo-devices/-KJlTaOQPwP-ssImryV1
	var pathSplit = path.split(uri_servicio + "/")
	var idAutoGenerado = pathSplit[1];

   // regresa respuesta en formato JSON
	var respuesta = generarRespuestaJSON(db, idAutoGenerado);
	response.setHeader("Content-Type", "application/json");
   response.send(JSON.stringify(respuesta));

});

function generarRespuestaJSON(db, idAutoGenerado) {
	var respuesta = {};
	var usuario = "";
	var db_Ref = db.ref(uri_servicio);
   // lee ultimo registro guardado
	db_Ref.on("child_added", function(snapshot, prevChildKey) {
		usuario = snapshot.val();
		respuesta = {
			id_registro: idAutoGenerado,
			id_dispositivo: usuario.id_dispositivo,
			id_usuario_instagram: usuario.id_usuario_instagram
		};
	});
  console.log('GABY4 RESPUESTA', respuesta);
	return respuesta;
}

//URL: https://gabypetsnotify.herokuapp.com/registrar-like
var uri_servicio2 = '/registrar-like';
var user_id = "";
var reg_id 	= "";
var foto_id = "";

//app.get('/registrar-like/:user_id/:reg_id/:foto_id', function(request, response) {
app.post('/registrar-like', function(request, response) {

   // obtiene parametros del URL
	user_id 	   = request.body.user_id; // usuario que envia la notificación
	reg_id   	= request.body.reg_id;  // registro a leer de base de datos
	foto_id 	   = request.body.foto_id; // foto a la que se dio like
   
   // guarda parametros en base de datos
   var db = firebase.database();
   var db_Ref = db.ref(uri_servicio2).push();
   db_Ref.set({
      usuario_emisor:         user_id,
      usuario_receptor_reg:   reg_id,
      foto_con_like:          foto_id
   });	
   
   // lee la base de datos para obtener los datos del usuario que recibira la notificación
	var db = firebase.database();
	var ref = db.ref("registrar-usuario/" + reg_id);
	var usuario = "";
	var respuesta = {};
	
	ref.on("value", function(snapshot) {
		console.log(snapshot.val());
		usuario = snapshot.val();
		var mensaje = user_id + " te dio un like";
		enviarNotificaion(usuario.id_dispositivo, mensaje);
		respuesta = {
			usuario_receptor: usuario.user_id
		};
      
		response.send(JSON.stringify(respuesta));
	}, function (errorObject) {
		console.log("La lectura fallo: " + errorObject.code);
		respuesta = {
			usuario_receptor: ""
		};
		response.send(JSON.stringify(respuesta));

	});
   
});

function enviarNotificaion(tokenDestinatario, mensaje) {
	var serverKey = 'AIzaSyC7W-iupxy2YugaZkVoYIpc7Nm5srB-orQ';
	var fcm = new FCM(serverKey);

	var message = {
	    to: tokenDestinatario, // required
	    collapse_key: '', 
	    data: {},
	    notification: {
	        title: 'Notificacion desde Servidor',
	        body: mensaje,
	        icon: "infopopup48",
	        sound: "default",
	        color: "#00BCD4"
	    }
	};

	fcm.send(message, function(err, response){
	    if (err) {
	        console.log("ERROR Algo salio mal al enviar notificación!");
	    } else {
	        console.log("NOTIFICACION enviada exitosamente: ", response);
	    }
	});
}
app.listen(app.get('port'), function() {
  console.log('GABY5 Node app is running on port', app.get('port'));
});


