/* Bienvenida */
var BASEURL = "http://lsi.no-ip.org:7777/2018-Banconfidence";

$(function(){
	$.ajax({
		url: BASEURL + "/rest/cliente/1",
		//url: "http://localhost:8080/Banconfidence/rest/cliente/1",
		method: "GET",
		success: function(data) {
			$("#datos").append("Usted es " + data.nombre + ", su id es " + data.id + " y su CUIL es " + data.cuil);
		}
	});

	// Al hacer click en cualquier botón, se crea un link para volver al panel de botones
	// en caso de que se quiera realizar otra operación

	$("#panel-botones").click(function(){
		$("<a/>").attr('href', 'index1.html').attr('id', 'volver').text("Realizar otra operación").appendTo('body');
	});
});

// Variables globales utilizadas para armar una tabla que muestra los datos obtenidos de cada movimiento

var fecha;
var hora;
var fechayhora;
var estado;
var tipo_movimiento;

$.fn.cambiarDatos = function(data, i) {

	// Estos ciclos for iteran sobre el string del campo "creado"
	// "creado":"2018-04-24T00:43:17Z[UTC]"
	// para que quede así: "2018-04-24, 00:43:17"

	for(var j = 0; j < 10; j++){
		fecha += data[i].creado[j];
	}

	for(var k = 11; k < 19; k++){
		hora += data[i].creado[k];
	}

	fechayhora = fecha + ", " + hora;

	switch (data[i].estado) {
		case 1:
			estado = "Pendiente";
			break;
		case 2:
			estado = "En proceso";
			break;
		case 3:
			estado = "Procesado";
			break;
		case 4:
			estado = "Rechazado";
	}

	switch (data[i].tipo) {
		case 1:
			tipo_movimiento = "Extracción";
			break;
		case 2:
			tipo_movimiento = "Depósito";
	}

	return fechayhora;
	return estado;
	return tipo_movimiento;
}

$.fn.llenarTabla1 = function(data, i) {
	$("tbody").append(
		$("<tr/>"),
		$("<td/>", {text: fechayhora}),
		$("<td/>", {text: tipo_movimiento}),
		$("<td/>", {text: estado}),
		$("<td/>", {text: data[i].importe})
	);
}

$.fn.llenarTabla2 = function(data, i) {
	$("tbody").append(
		$("<tr/>"),
		$("<td/>", {text: fechayhora}),
		$("<td/>", {text: estado}),
		$("<td/>", {text: data[i].importe})
	);
}

$.fn.llenarTabla3 = function(data, i) {
	$("tbody").append(
		$("<tr/>"),
		$("<td/>", {text: fechayhora}),
		$("<td/>", {text: tipo_movimiento}),
		$("<td/>", {text: data[i].importe})
	);
}

//

$.fn.esconderBotones = function() {
	$("#panel-botones").hide();
	$("#salir").hide();
	$("h2").hide();
}

// ================================= FUNCIONES DE CADA BOTÓN =================================

/* Todos los movimientos */

$(function(){
	$("#todos").click(function(){
		$.fn.esconderBotones();
		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/todos",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/todos",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estos son todos sus movimientos"});
				$("h1").after(h2);
				$("table").show();

				for(var i in data) {
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla1(data, i);
				}
			}
		});
	});
});

/* Ultimos 10 movimientos */

$(function(){
	$("#ultimos").click(function(){
		$.fn.esconderBotones();
		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/ultimos",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/ultimos",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estos son sus últimos 10 movimientos"});
				$("h1").after(h2);
				$("table").show();
				
				for(var i in data) {
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla1(data, i);
				}
			}
		});
	});
});

/* Consultar saldo */

$(function(){
	$("#saldo").click(function(){
		$.fn.esconderBotones();
		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/saldo",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/saldo",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Su saldo actual es de: $" + data});
				$("h1").after(h2);
			}
		});
	});
});

/* Ver movimientos de deposito */

$(function(){
	$("#depo").click(function(){
		$.fn.esconderBotones();

		// Eliminar columna "Tipo" de la tabla
		$("#tipo").remove();

		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/tipo/2",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/tipo/2",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estos son sus depósitos"});
				$("h1").after(h2);
				$("table").show();
				for(var i in data){
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla2(data, i);
				}
			}
		});
	});
});

/* Ver movimientos de extracción */

$(function(){
	$("#extr").click(function(){
		$.fn.esconderBotones();

		// Eliminar columna "Tipo" de la tabla
		$("#tipo").remove();

		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/tipo/1",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/tipo/1",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estas son sus extracciones"});
				$("h1").after(h2);
				$("table").show();

				for(var i in data){
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla2(data, i);
				}
			}
		});
	});
});

/* Ver movimientos pendientes */

$(function(){
	$("#pend").click(function(){
		$.fn.esconderBotones();

		// Eliminar columna "Estado" de la tabla
		$("#estado").remove();

		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/estado/1",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/estado/1",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estos son sus movimientos pendientes"});
				$("h1").after(h2);
				$("table").show();

				for(var i in data){
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla3(data, i);
				}
			}
		});
	});
});

/* Ver movimientos en proceso */

$(function(){
	$("#enproc").click(function(){
		$.fn.esconderBotones();

		// Eliminar columna "Estado" de la tabla
		$("#estado").remove();

		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/estado/2",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/estado/2",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estos son sus movimientos en proceso"});
				$("h1").after(h2);
				$("table").show();

				for(var i in data){
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla3(data, i);
				}
			}
		});
	});
});

/* Ver movimientos procesados */

$(function(){
	$("#proc").click(function(){
		$.fn.esconderBotones();

		// Eliminar columna "Estado" de la tabla
		$("#estado").remove();

		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/estado/3",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/estado/3",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estos son sus movimientos procesados"});
				$("h1").after(h2);
				$("table").show();

				for(var i in data){
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla3(data, i);
				}
			}
		});
	});
});

/* Ver movimientos rechazados */

$(function(){
	$("#rech").click(function(){
		$.fn.esconderBotones();

		// Eliminar columna "Estado" de la tabla
		$("#estado").remove();

		$.ajax({
			url: BASEURL + "/rest/movimiento/cuenta/1/estado/4",
			//url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/estado/4",
			method: "GET",
			success: function(data){
				var h2 = $("<h2/>", {text: "Estos son sus movimientos rechazados"});
				$("h1").after(h2);
				$("table").show();

				for(var i in data){
					fecha = "";
					hora = "";
					$.fn.cambiarDatos(data, i);
					$.fn.llenarTabla3(data, i);
				}
			}
		});
	});
});

/* Realizar un movimiento */

$(function(){
	$("#realizar").click(function(){
		$.fn.esconderBotones();
		var h2 = $("<h2/>", {text: "Cargue la información del movimiento"});
		$("h1").after(h2);
		$("#prueba").show();

		// Queremos que el movimiento siempre corresponda a la cuenta 1
		var input_idcuenta = $("<input>").attr({
			"type": "hidden",
			"id": "idcuenta",
			"value": "1"
		});

		// Queremos que el estado siempre se cargue como 1
		var input_estado = $("<input>").attr({
			"type": "hidden",
			"id": "estado",
			"value": "1"
		});

		var input_importe = $("<input>").attr({
			"type": "text",
			"id": "importe"
		});

		// 1 o 2 (extracción o depósito)
		var input_tipo = $("<input>").attr({
			"type": "text",
			"id": "tipo"
		});

		var boton_enviar = $("<button>", {text: "Enviar"}).attr({
			"type": "button",
			"id": "enviar"
		});

		//var div = $("<div>").attr({
		//	"id": "nuevo-movimiento"
		//});

		// Agregamos los inputs "Importe" y "Tipo de Movimiento" y el botón para enviar
		// la información del movimiento
		//$("body").append(div);
		//$("#nuevo-movimiento").append(
			//"Importe: ", input_importe, 
			//$("<p/>"), 
			//"Tipo de movimiento: ", input_tipo, 
			//$("<p/>"), 
			//boton_enviar
		//);
	});
});


// Función de prueba para testear el POST
$(function() {
	$("#prueba").click(function() {

		//var params = {};

		// el id se debería autoincrementar, no hace falta especificarlo en el objeto
		//params.creado = "2018-07-07T00:00:00Z[UTC]";
		//params.estado = $("#estado").val();
		//params.idCuenta = $("#idcuenta").val();
		//params.importe = $("#importe").val();
		//params.tipo = $("#tipo").val();

		alert("Clickeaste el boton");

                // {"creado":"2018-06-17T14:17:24Z[UTC]","estado":3,"id":20,"idCuenta":1,"importe":2000.0,"tipo":2}

		$.ajax({
                url: BASEURL + "/rest/movimiento/cuenta/1/todos",
                //url: "http://localhost:8080/Banconfidence/rest/movimiento/cuenta/1/todos",
	    	type: "POST",
	    	data: {"creado":"2018-07-24T14:00:00Z[UTC]","estado":3,"idCuenta":1,"importe":2000.0, "tipo":2},
                contentType: "application/json",
	    	success: function() {
	    		console.log("Movimiento exitoso!");
				$("#panel-botones").show();
				$("#importe").val("");
				$("#tipo").val("");
				$("#nuevo-movimiento").hide();
	    	},
	    	error: function() {
	    		console.log("ERROR");
	    	}
		});
	});
});