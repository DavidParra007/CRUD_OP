var _id = 0;
var _action = "";
var _vac = []
//class Entrevista
	class Person {
  /**
   *
   * @param {string} name The Product Name
   * @param {string} price The Product Price
   * @param {date} year The year creation of the Product
   * @param {text} year The year creation of the Product
   * @param {boolean} year The year creation of the Product
   */

		constructor(vacante, prospecto, date, note, reclutado, id) {
			this.id = id;
			this.vacante = vacante;
			this.prospecto = prospecto;
			this.fecha_registro = date;
			this.notas = note;
			this.reclutado = reclutado;
		}
	};

//class Prospecto
	class Prospecto {
  /**
   *
   * @param {string} name The Product Name
   * @param {string} price The Product Price
   * @param {date} year The year creation of the Product
   */

		constructor(nombre, correo, date, id) {
			this.nombre = nombre;
			this.correo = correo;
			this.date = fecha;
			this.id = id
		}
	};

//class Vacante
	class Vacante {
  /**
   *
   * @param {string} name The Product Name
   * @param {string} price The Product Price
   * @param {boolean} year The year creation of the Product
   */

		constructor(area, sueldo, activo, id) {
			this.area = area;
			this.sueldo = sueldo;
			this.activo = activo;
			this.id = id
		}
	};

/**
 * Interface Class
 */
class UI {
  /**
   * Add a New Product 
   * @param {Object} product A new person Object
   */
	addPerson(Person) {
		console.log("test: ",Person);
		const PersonList = document.getElementById('infoEntrevista');
		const element = document.createElement("div");
		element.innerHTML = `
		<td>vacante</td>: ${Person.vacante} -
		<strong>prospecto</strong>: ${Person.prospecto} - 
		<strong>date</strong>: ${Person.date} - 
		<strong>note</strong>: ${Person.note} - 
		<strong>reclutado</strong>: ${Person.reclutado}
		<a href="#" class="btn btn-danger" name="delete">Delete</a>
		`;
		console.log(element);
		PersonList.appendChild(element);
	}
};

$(document).ready(function() {
	const PersonList = [];

//CargaDoc
	$(".customlink").click(function(event) {
		var link = $(this).attr('routerLink')+"?"+Math.random(1,1000);
		var fnc = $(this).attr('cfunc');
		$.get(link, function(data) {
			$("#contenedor").empty().append(data);
			if (link.split(["?"])[0] == 'entrevista.html') {
				getTableDataE();
			}
			if(link.split(["?"])[0] == 'vacantes.html'){
				getTableDataV();
			}
			if (link.split(["?"])[0] =='prospectos.html') {
				getTableDataP();
			}
				
		});
	});

//BtonAdd
	$(document).on('click', '.btnaction', function(event) {	
		event.preventDefault();
		var seccion = $(this).attr('section');
		selectsection(seccion);
	});

//fntBtnAdd
	function selectsection(section){
		// document.getElementsByTagName('btnAddP').disabled = true;
		$(".seccion").hide();
		$("."+section).show();
	};

//SwitchAddbtn
	$(this).on('click', '.btnadd', function(event) {
		event.preventDefault();
		_action = "add";
	});

// ================================================================================
//ENTREVISTA

//FillTableEntrevista
	function filltableEntrevista(data){
		var tabla = $("#infoEntrevista");
		tabla.empty();
		$.each(data, function(i, v) {
			tabla.append(
				"<tr>\
					<td class='table-info'>" + v.vacante + "</td>\
					<td class='table-info'>" + v.prospecto + "</td>\
					<td class='table-info'>" + v.date +	"</td>\
					<td class='table-info'>" + v.note +	"</td>\
					<td class='table-info'>" + v.reclutado + "</td>\
					<td class='btn-group d-none d-sm-block' role='group'>\
					   	<button id='btnMEEdit' type='button' class='btn btn-outline-warning m-1 btnEditar'>editar</button>\
				  		<button id='btnMEDelete' type='button' class='btn btn-outline-danger m-1 btnDelete '>delete</button>\
				    </td>\
				</tr>");
		});
	}
	function getTableDataE(){
		let url ='https://localhost:7007/entrevista/all'
		let data = GetItem(url,filltableEntrevista);
	}

//ValidacionBtn
	// var url = "https://localhost:7007/vacante/all";
	// var validacion = new Vacante;
	// function valVac(){
	// 	GetItem(url, function(json){
	// 		$.each(json, function(i,v) {
	// 			console.log(json[i].area)
	// 			validacion.id = json[i].id
	// 			validacion.area = json[i].area;
	// 			validacion.sueldo = json[i].sueldo;
	// 			validacion.activo = json[i].activo;
	// 			_vac.push(validacion)
	// 		});
		
	// 	});
	// }

//btnAddEntrevista
	$(this).on('click', '#btnEntrAdd', function(event) {
		event.preventDefault();
		var url = "https://localhost:7007/vacante/all";
		var validacion = new Vacante;
		var deopdown = $("#vacante");
		GetItem(url, function(json){
			$.each(json, function(i,v) {
				deopdown.append("<option class='dropdown-item' value='"+ json[i].area +"'> " +json[i].area+ "</option>");
			});
		})
		var url = "https://localhost:7007/prospecto/all";
		var validacion = new Prospecto;
		var deopdown = $("#prospecto");
		GetItem(url, function(json){
			$.each(json, function(i,v) {
				deopdown.append("<option class='dropdown-item' value='"+ json[i].nombre +"'> " +json[i].nombre+ "</option>");
			});
		})
	});

//btnAceparEntrevista
	$(this).on('click', '#btnEntrAcep', function(event) {
		event.preventDefault();
		var person = new Person();
		person.id = 0;
		person.vacante = document.getElementById('vacante').value;
		person.prospecto = document.getElementById('prospecto').value;
		person.fecha_registro = document.getElementById('date').value;
		person.notas = document.getElementById('note').value;
		person.reclutado = document.getElementById('reclutado').value;
		if(_action == 'add'){
			var url ="https://localhost:7007/entrevista/add"
			console.log(person);
			AddItem(person,url, filltableEntrevista)
			document.getElementById('prospecto').value = '';
			document.getElementById('date').value = '';
			document.getElementById('note').value = '';
			document.getElementById('reclutado').value = '';
		}else{
			var url ="https://localhost:7007/entrevista/update/"
			prospecto.id = _id;
			UpdateItem(prospecto,url, filltableEntrevista)
		}
	});


//btonDelete
	$(this).on('click','#btnMEDelete',function(event){
		event.preventDefault();
		let id = $(this).parents("tr").attr('rowid');
		var url = "https://localhost:7007/entrevista/del/";
		console.log(url)
		DeleteItem(url, id)
	})

//btonEdit
	$(this).on('click','#btnMEEdit',function(event){
		event.preventDefault();
		_action = "editar";
		selectsection('formulario');
		_id = $(this).parents("tr").attr('rowid');
		var url = "https://localhost:7007/prospecto/" + _id;
		GetItem(url,function(json){
			var date = new Date(json.fecha_registro)
			console.log(date);
			var day = "0"+date.getDate();
			var d = date.getFullYear() +"-"+ (date.getMonth() + 1) + "-" +day.substring(day.length-2);
			
			document.getElementById('nombre').value = json.nombre
			document.getElementById('correo').value = json.correo
			document.getElementById('fecha').value = d//'2022-12-31'
			})
	})

// ================================================================================

//VACANTE

//FillTableVacante
	function filltableVacante(data){
		if (data.length > 0) {
			var tabla = $("#infoProspecto");
			tabla.empty();
			$.each(data, function(i, v) {
				tabla.append(
					"<tr rowid='"+v.id+"'>\
						<td>" + v.area +	"</td>\
						<td>" + v.sueldo +	"</td>\
						<td>" + ((v.activo)?"activo":"Inactivo")              +"</td>\
						<td class='btn-group d-none d-sm-block' role='group'>\
						   	<button id='btnMVEdit' type='button' class='btn btn-outline-warning m-1 btnEditar'>editar</button>\
					  		<button id='btnMVDelet' type='button' class='btn btn-outline-danger m-1 btnDelete '>delete</button>\
					    </td>\
					</tr>");
			});

		} else {
			alert("No hay vacantes...")
		}

	}

	function getTableDataV(){
		let url ='https://localhost:7007/vacante/all'
		let data = GetItem(url,filltableVacante);
	}

//btnFormVacante
	$(this).on('click', '#btnVacAcep', function(event) {
		event.preventDefault();
		const vacante = new Vacante();
		vacante.id = 1;
		vacante.area = document.getElementById('area').value;
		vacante.sueldo = document.getElementById('sueldo').value;
		vacante.activo = (document.getElementById('activo').value)?true:false;

		console.log(vacante.activo);
		// return
		if(_action == 'add'){
			var url ="https://localhost:7007/vacante/add"
			AddItem(vacante,url, getTableDataV)
			document.getElementById('area').value = '';
			document.getElementById('sueldo').value = '';
			document.getElementById('activo').value = '';
		}else{
			var url ="https://localhost:7007/vacante/update"
			vacante.id = _id;
			console.log(vacante)
			UpdateItem(vacante,url, getTableDataV)
		}
	});

//btonDeleteVacante
	$(this).on('click','#btnMVDelet',function(event){
		event.preventDefault();
		let id = $(this).parents("tr").attr('rowid');
		let url = "https://localhost:7007/vacante/del/";
		console.log("ttttttttttttttt",url)
		DeleteItem(url, id, getTableDataV)
	})

//btonEditVacante
	$(this).on('click','#btnMVEdit',function(event){
		event.preventDefault();
		_action = "editar";
		selectsection('formulario');
		_id = $(this).parents("tr").attr('rowid');
		var url = "https://localhost:7007/vacante/" + _id;
		GetItem(url,function(json){
			console.log(json)
			document.getElementById('area').value = json.area;
			document.getElementById('sueldo').value = json.sueldo;
			document.getElementById('activo').value = json.activo;
		})
	})

// ================================================================================
//SHEET PROSPECTO

//FillTableProspecto
	function filltableProspecto(data){
		console.log(data);
		if (data.length > 0) {
			var tabla = $("#infoProspecto");
			tabla.empty();
			$.each(data, function(i, v) {
				tabla.append(
					"<tr rowid='"+v.id+"'>\
						<td>" + v.nombre +	"</td>\
						<td>" + v.correo +	"</td>\
						<td>" + v.fecha_registro +"</td>\
						<td class='btn-group d-none d-sm-block' role='group'>\
						   	<button id='btnMPEdit' type='button' class='btn btn-outline-warning m-1 btnEditar'>editar</button>\
					  		<button id='btnMPDelete' type='button' class='btn btn-outline-danger m-1 btnDelete '>delete</button>\
					    </td>\
					</tr>");
			});

		} else {
			alert("No hay registros...")
		}
		
	}
	function getTableDataP(){
		let url ='https://localhost:7007/prospecto/all'
		let data = GetItem(url,filltableProspecto);
	}

//btnFormProspecto
	$(this).on('click', '#btnProsAcep', function(event) {
		event.preventDefault();
		const prospecto = new Prospecto();
		prospecto.id = 0;
		prospecto.nombre = document.getElementById('nombre').value;
		prospecto.correo = document.getElementById('correo').value;
		prospecto.fecha_registro = document.getElementById('fecha').value;
		if(_action == 'add'){
			var url ="https://localhost:7007/prospecto/add"
			AddItem(prospecto,url, getTableDataP)
			document.getElementById('nombre').value = '';
			document.getElementById('correo').value = '';
			document.getElementById('fecha').value = '';
		}else{
			var url ="https://localhost:7007/prospecto/update"
			prospecto.id = _id;
			UpdateItem(prospecto,url, getTableDataP)
		}
	});

//btonDelete
	$(this).on('click','#btnMPDelete',function(event){
		event.preventDefault();
		let id = $(this).parents("tr").attr('rowid');
		var url = "https://localhost:7007/prospecto/del/";
		console.log(url)
		DeleteItem(url, id, getTableDataP)
	})

//btonEdit
	$(this).on('click','#btnMPEdit',function(event){
		event.preventDefault();
		_action = "editar";
		selectsection('formulario');
		_id = $(this).parents("tr").attr('rowid');
		var url = "https://localhost:7007/prospecto/" + _id;
		GetItem(url,function(json){
			var date = new Date(json.fecha_registro)
			console.log(date);
			var day = "0"+date.getDate();
			var d = date.getFullYear() +"-"+ (date.getMonth() + 1) + "-" +day.substring(day.length-2);
			
			document.getElementById('nombre').value = json.nombre
			document.getElementById('correo').value = json.correo
			document.getElementById('fecha').value = d//'2022-12-31'
			})
	})

///=======================================================

// GET - Obtener
	function GetItem(url,fnc=undefined){
		console.log(url)
		fetch(url)
		.then(response => response.json())
		.then(json => {
			if(fnc != undefined) {fnc(json)}
		})
		//.then(function(json){fnc(json)})
	} 

//POST - Agregar

	function AddItem(data, url, fnc=undefined){
		$.ajax({
			url: url,
			type: 'POST',
			//dataType: 'application/json', //Evalua la respuesta del servidor
			//contentType: "text/plain; charset=utf-8",
			contentType: "application/json",
			data : JSON.stringify(data)
			//data: prospecto
		,success:function(data){
			console.log("Success")
			console.log(data)
			{fnc};}
		,complete:function(){
			console.log("Complete")}	
		,error:function(a,b,c){
			console.log(a,b,c)
			console.log("failed")}
		})

	}
		
//PUT - Actalizar
	function UpdateItem(data, url, fnc=undefined){
		$.ajax({
			url: url,
			type: 'PUT',
			//dataType: 'application/json', //Evalua la respuesta del servidor
			//contentType: "text/plain; charset=utf-8",
			contentType: "application/json",
			data : JSON.stringify(data)
			//data: prospecto
		,success:function(data){
			console.log("Success")
			console.log(data)
			fnc();	
		}
		,complete:function(){
			console.log("Complete")}	
		,error:function(a,b,c){
			console.log(a,b,c)
			console.log("failed")}
		})
	}

//DELETE - Eliminar

    function DeleteItem(url, id, fnc=undefined) {
    	$.ajax({
    		url: url + id,
    		method: 'DELETE',
    		// dataType: 'json',
    		// data:id,
    		success: function (data, textStatus, xhr) {
    			console.log("data...",data);
    			fnc();
    		},
    		error: function (xhr, textStatus, errorThrown) {
    			console.log('Error in Operation');
    			}
        });
    }
    
});
