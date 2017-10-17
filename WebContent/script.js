function getHTTPObject() {
	var xhr = false;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xhr = false;
			}
		}
	}
	return xhr;
}

function getCar(id){
	var request = getHTTPObject();
	var id = id;
	if(request){
		var url= "http://localhost:8080/Car-Trading-Webpage/rest/cars/"+id;
		request.onreadystatechange = function() {
			showCar(request);
		}
		request.open("GET", url, true);
		request.setRequestHeader("Accept", "application/json");
		request.send(null);
	}
}

function grabFile(file) {
	var request = getHTTPObject();
	if (request) {
		request.onreadystatechange = function() {
			parseResponse(request);
		};
		request.open("GET", file, true);
		request.setRequestHeader("Accept", "application/json");
		request.send(null);
	}
}

function parseResponse(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			var Carhref = [];
			var data = JSON.parse(request.responseText);
			var main = document.getElementById("main");
			for (var i = 0; i < data.car.length; i++) {
				var url = "http://localhost:8080/Car-Trading-Webpage/rest/cars/"
						+ data.car[i].id;
				var item = document.createElement("li");

				Carhref[i] = "<a id='" + data.car[i].id
						+ "' href='#' title='click' onclick='getCar(this.id);return false;'>" 
						+ data.car[i].make + ", " + data.car[i].model + "</a>";

				item.innerHTML = Carhref[i];
				main.appendChild(item);
			}
		}
	}
}

function showCar(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			var data = JSON.parse(request.responseText);
			
			var info= document.getElementById("displayInfo");
			var disImage= document.getElementById("displayImage");
			var id = data.id;
			var make =data.make;
			var model = data.model;
			var year = data.year;
			var engine = data.engine;
			var fuel = data.fuel;
			var price = data.price;
			
			var a="<h3>Make: " + make + "</h3>";
			var b="<h3>Model: " + model + "</h3>";
			var c="<h3>Year: " + year + "</h3>";
			var d="<h3>Engine: " + engine + ", " + fuel + "</h3>";
			var e="<h3>Asking Price: " + price + "</h3>";
			
			var m="<h3>Car: <a href=http://www."+make+".com>"+make+"</a></h3>";
			var newMake= make;


			if (newMake=="BMW"){
				var image= "/Car-Trading-Webpage/images/bmw5.png";
				var v = "<img src="+image+">"
			}	
			else if (newMake=="Porsche"){
				var image= "/Car-Trading-Webpage/images/porsche911.png";
				var v = "<img src="+image+">"
			}
			else if (newMake=="Audi"){
				var image= "/Car-Trading-Webpage/images/audiA5.png";
				var v = "<img src="+image+">"
			}
			else if (newMake=="Tesla"){
				var image= "/Car-Trading-Webpage/images/tesla.png";
				var v = "<img src="+image+">"
			}
			else if (newMake=="Mercedes-Benz"){
				var image= "/Car-Trading-Webpage/images/mercSL.png";
				var v = "<img src="+image+">"
			}
			else{
				var image= "/Car-Trading-Webpage/images/noupload.jpg";
				var v = "<img src="+image+">"
			}
			info.innerHTML=a+b+c+d+e;
			disImage.innerHTML=v;		
}}}

function AddCar() {
	var request = getHTTPObject();
	if (request) {
		var id = document.getElementById("id").value;
		var make = document.getElementById("make").value;
		var model = document.getElementById("model").value;
		var year = document.getElementById("year").value;
		var engine = document.getElementById("engine").value;
		var fuel = document.getElementById("fuel").value;
		var price = document.getElementById("price").value;
		var add = "id="+id+"&make="+make+"&model="+model+"&year="+year+"&engine="+engine+"&fuel="+fuel+"&price="+price+"";
		
		var url="http://localhost:8080/Car-Trading-Webpage/rest/cars";
		request.onreadystatechange = function() {
		doCreate(request);
		};
		alert("Your " + make + " has been added successfully");
		request.open("POST", url, true);
		request.setRequestHeader("Content-type",
		"application/x-www-form-urlencoded");
		request.send(add);
}}

function doCreate(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
}}}

function DeleteCar(){
	var request = getHTTPObject();
	if(request){
		var deleted = document.getElementById("delId").value;
		var url= "http://localhost:8080/Car-Trading-Webpage/rest/cars/"+deleted;
		request.open("DELETE", url, false);
		request.setRequestHeader("Accept", "application/json");
		request.send(null);
		alert("Id: "+deleted+". Successfully Deleted");
}}