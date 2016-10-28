// para enviar y guardar datos y mostrarlos a la ves
function GuardarDatos(){
	this.users = [];
}
GuardarDatos.prototype.setDatos = function(correo, usuario){
	this.correo = correo;
	this.usuario = usuario;
}

GuardarDatos.prototype.getEnviar = function(){
	var _this = this;

	var datosBox = {};
		datosBox.correo = this.correo;
		datosBox.usuario = this.usuario;
	var datosBoxJson = JSON.stringify(datosBox);

	$.ajax ({
		url : 'controlador.php',
		type : 'GET',
		data : {'datosBox' : datosBoxJson},
		success : function(data){
			//alert(data);
			var getConvertir = $.parseJSON(data);
			//alert(getConvertir);
			_this.users.push(getConvertir);
			showMostrar();
		}
	})
	alert("Guardado Exitosamente");
}

//==========================================================================================
//******************************************************************************************

//para mostrar datos de la base de datos
GuardarDatos.prototype.MostrarTodo = function() {
	var _this = this;
	$.ajax ({
		url : 'controlador.php',
		type : 'GET',
		data : {'MostrarTodo' : true},
		success : function(data){
			var getdatos = $.parseJSON(data);
			//alert(data);
			for(var i in getdatos){
				_this.users.push(getdatos[i]);
			}
			showMostrar();
		}
	})
//alert("hola mundasxcasco");
}

//==============================================================================================================
//*************************************************************************************************************

// para buscar datos de la base de datos
GuardarDatos.prototype.SearchData = function(concidencia){
	var _this = this;
	$.ajax ({
		url : 'controlador.php',
		type : 'GET',
		data : {'SearchData' : concidencia},
		success : function(data){
		_this.users = [];
			var getConvert = $.parseJSON(data);
			for(var i in getConvert){
				_this.users.push(getConvert[i]);
			}
			showBuscar(getConvert);
		}
	})
}

//=================================================================================================================
//*****************************************************************************************************************

// para eliminar datos de la base de datos
GuardarDatos.prototype.dropUser = function(noUser){
	var _this = this;
	$.ajax({
		url : 'controlador.php',
		type : 'GET',
		data : {'dropUser' : _this.users[noUser]["Id_Usuario"]},
		success : function(data){
			if (data == "1") {
				_this.users.splice(noUser,1);
				showMostrar(_this.users);
			}
			else
				resultDropUser(false);
		}
	})
}

//*****************************************************************************************************************
// para editar datos de la base de datos
GuardarDatos.prototype.UpdateData = function(newMail, newNameUser, idUser){

	var _this = this;

	var updateBox = {};
		updateBox.mail = newMail;
		updateBox.user = newNameUser;
		updateBox.idUser = idUser;
	var updateBoxJSON = JSON.stringify(updateBox);

	$.ajax ({
		url : 'controlador.php',
		type : 'GET',
		data : {'updateBox' : updateBoxJSON},
		success : function(data){
			alert(data);
			/*var Convertidor = $.parseJSON(data);
			showConvertido(Convertidor);*/
		}
	})
}