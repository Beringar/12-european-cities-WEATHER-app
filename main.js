var london = 'london';
var barcelona = 'barcelona';
var madrid = 'madrid';
var warsaw = 'warsaw';
var rome = 'rome';
var lisbon = 'lisbon';
var paris = 'paris';
var dublin = 'dublin';
var amsterdam = 'amsterdam';
var berlin = 'berlin';
var brussels = 'brussels';
var vienna = 'vienna';

var whenMsg0 = "I'm travelling today!";
var whenMsg1 = "I will travel tomorrow";
var whenMsg2 = "My travel is in 2 days";
var whenMsg3 = "My travel is in 3 days";
var whenMsg4 = "My travel is in 4 days";


var tempMsg0 = "I like cold weather!";
var tempMsg1 = "I like temperature between 8º and 16º";
var tempMsg2 = "I like temperature between 16º and 23º";
var tempMsg3 = "I like hot weather!";

var skyMsg0 = "I love rain!";
var skyMsg1 = "I like clear sky!";
var skyMsg2 = "I prefer clouds!";
var skyMsg3 = "I want snow!";

var today = false;
var tomorrow = false;
var day2 = false;
var day3 = false;
var day4 = false;


var minus8 = false;
var bet8_16 = false;
var bet16_23 = false;
var plus23 = false;

var rain = false;
var clear = false;
var clouds = false;
var snow = false;

var showCities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var cityMatch = 0;

var globaldata = [];

function ordre(globaldata) {
	for (var i = 0; i < globaldata.length; i++) {
		console.log(globaldata[i].city.name);
	}
}


$(document).ready(function () {

	call12apis();
	$('#userMsg').addClass('blink alert-warning');


	$(".draggable").draggable({
		stack: ".draggable",
		revert: function (dropped) {
			var $draggable = $(this),
				hasBeenDroppedBefore = $draggable.data('hasBeenDropped'),
				wasJustDropped = dropped && dropped[0].id == "droppable";
			if (wasJustDropped) {
				$draggable.animate({
					top: 0,
					left: 0
				}, 'slow');
				return false;
			} else {
				if (hasBeenDroppedBefore) {
					// don't rely on the built in revert, do it yourself
					$draggable.animate({
						top: 0,
						left: 0
					}, 'slow');
					return false;
				} else {
					// just let the build in work, although really, you could animate to 0,0 here as well
					return true;
				}
			}
		}
	});
	$("#droppable").droppable({
		tolerance: "touch",
		classes: {
			"ui-droppable-active": "ui-state-active",
			"ui-droppable-hover": "ui-state-hover"
		},
		drop: function (event, ui) {

			if (ui.draggable.attr("id") == 'when0') {
				$(this)
					.find("#desiredWhenMsg")
					.html(whenMsg0);
				today = true;
				tomorrow = false;
				day3 = false;
				day2 = false;
				day4 = false;
			}
			if (ui.draggable.attr("id") == 'when1') {
				$(this)
					.find("#desiredWhenMsg")
					.html(whenMsg1);
				tomorrow = true;
				today = false;
				day3 = false;
				day2 = false;
				day4 = false;
			}
			if (ui.draggable.attr("id") == 'when2') {
				$(this)
					.find("#desiredWhenMsg")
					.html(whenMsg2);
				day2 = true;
				day3 = false;
				day4 = false;
				today = false;
				tomorrow = false;

			}
			if (ui.draggable.attr("id") == 'when3') {
				$(this)
					.find("#desiredWhenMsg")
					.html(whenMsg3);
				day3 = true;
				day2 = false;
				day4 = false;
				today = false;
				tomorrow = false;

			}
			if (ui.draggable.attr("id") == 'when4') {
				$(this)
					.find("#desiredWhenMsg")
					.html(whenMsg4);
				day4 = true;
				day2= false;
				day3 = false;
				today = false;
				tomorrow = false;

			}
			if (ui.draggable.attr("id") == 'temp0') {
				$(this)
					.find("#desiredTempMsg")
					.html(tempMsg0);
				minus8 = true;
				bet8_16 = false;
				bet16_23 = false;
				plus23 = false;
			}
			if (ui.draggable.attr("id") == 'temp1') {
				$(this)
					.find("#desiredTempMsg")
					.html(tempMsg1);
				bet8_16 = true;
				minus8 = false;
				bet16_23 = false;
				plus23 = false;
			}
			if (ui.draggable.attr("id") == 'temp2') {
				$(this)
					.find("#desiredTempMsg")
					.html(tempMsg2);
				bet16_23 = true;
				minus8 = false;
				bet8_16 = false;
				plus23 = false;
			}
			if (ui.draggable.attr("id") == 'temp3') {
				$(this)
					.find("#desiredTempMsg")
					.html(tempMsg3);
				plus23 = true;
				minus8 = false;
				bet8_16 = false;
				bet16_23 = false;
			}
			if (ui.draggable.attr("id") == 'sky0') {
				$(this)
					.find("#desiredSkyMsg")
					.html(skyMsg0);
				rain = true;
				clear = false;
				clouds = false;
				snow = false;
			}
			if (ui.draggable.attr("id") == 'sky1') {
				$(this)
					.find("#desiredSkyMsg")
					.html(skyMsg1);
				rain = false;
				clear = true;
				clouds = false;
				snow = false;
			}
			if (ui.draggable.attr("id") == 'sky2') {
				$(this)
					.find("#desiredSkyMsg")
					.html(skyMsg2);
				rain = false;
				clear = false;
				clouds = true;
				snow = false;
			}
			if (ui.draggable.attr("id") == 'sky3') {
				$(this)
					.find("#desiredSkyMsg")
					.html(skyMsg3);
				rain = false;
				clear = false;
				clouds = false;
				snow = true;
			}
			$(ui.draggable).data('hasBeenDropped', true);
			if (today && !tomorrow && !day3 && !day2 && !day4) {
				createData(globaldata, 0);
				
			}
			if (tomorrow && !today && !day3 && !day2 && !day4) {
				createData(globaldata, 8);
				
			}
			if (day2 && !today && !tomorrow && !day3 && !day4) {
				createData(globaldata, 16);
				
			}
			if (day3 && !today && !tomorrow && !day2 && !day4) {
				createData(globaldata, 24);
				
			}
			if (day4 && !today && !tomorrow && !day2 && !day3) {
				createData(globaldata, 32);
				
			}

		}


	});

});

function reset() {
	today = false;
	tomorrow = false;
	day2 = false;
	day4 = false;
	day3 = false;
	minus8 = false;
	bet8_16 = false;
	bet16_23 = false;
	plus23 = false;
	rain = false;
	clear = false;
	clouds = false;
	snow = false;
	$('#userMsg').html("Drop your preferences here!");
	$('#userMsg').removeClass('alert-success');
	$('#userMsg').addClass('blink alert-warning');
	$('#desiredWhenMsg').html("?");
	$('#desiredTempMsg').html("?");
	$('#desiredSkyMsg').html("?");
	createData(globaldata, 0);
	console.log("reset");
}



function createData(globaldata, x) {

	cityMatch = 0;
	showCities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var parentElementBack;
	var parentElementFront;
	var parentElementIdBack;
	var parentElementIdFront;
	var weatherInfo;
	var cityId;
	var cityEl;

	for (var i = 0; i < globaldata.length; i++) {

		parentElementIdFront = "cityFront" + [i];
		parentElementFront = document.getElementById(parentElementIdFront);
		while (parentElementFront.firstChild) {
			parentElementFront.firstChild.remove();
		}
		parentElementIdBack = "cityBack" + [i];
		parentElementBack = document.getElementById(parentElementIdBack);
		while (parentElementBack.firstChild) {
			parentElementBack.firstChild.remove();
		}

		switch (globaldata[i].city.name) {
			case "Barcelona":
				parentElementFront.classList.add('barcelonaFront');
				parentElementBack.classList.add('barcelonaBack');
				break;
			case "Madrid":
				parentElementFront.classList.add('madridFront');
				parentElementBack.classList.add('madridBack');
				break;
			case "Berlin":
				parentElementFront.classList.add('berlinFront');
				parentElementBack.classList.add('berlinBack');
				break;
			case "Warsaw":
				parentElementFront.classList.add('warsawFront');
				parentElementBack.classList.add('warsawBack');
				break;
			case "Amsterdam":
				parentElementFront.classList.add('amsterdamFront');
				parentElementBack.classList.add('amsterdamBack');
				break;
			case "London":
				parentElementFront.classList.add('londonFront');
				parentElementBack.classList.add('londonBack');
				break;
			case "Paris":
				parentElementFront.classList.add('parisFront');
				parentElementBack.classList.add('parisBack');
				break;
			case "Rome":
				parentElementFront.classList.add('romeFront');
				parentElementBack.classList.add('romeBack');
				break;
			case "Lisbon":
				parentElementFront.classList.add('lisbonFront');
				parentElementBack.classList.add('lisbonBack');
				break;
			case "Dublin":
				parentElementFront.classList.add('dublinFront');
				parentElementBack.classList.add('dublinBack');
				break;
			case "Vienna":
				parentElementFront.classList.add('viennaFront');
				parentElementBack.classList.add('viennaBack');
				break;
			case "Brussels":
				parentElementFront.classList.add('brusselsFront');
				parentElementBack.classList.add('brusselsBack');

		}


		//		if (globaldata[i].city.name == "Barcelona") {
		//			parentElementFront.classList.add('barcelonaFront');
		//		}

		parentElementFront.insertAdjacentHTML("beforeend", globaldata[i].city.name);


		weatherInfo = "<div class='weatherInfo'><h3 class='titleCityBack'>" + globaldata[i].city.name + "</h3><h5>Temperature: " + globaldata[i].list[x].main.temp + "&deg;" + "<br>min. " + globaldata[i].list[x].main.temp_min + "&deg; - max. " + globaldata[i].list[x].main.temp_max + "&deg;<br>Humidity: " + globaldata[i].list[x].main.humidity + "%</h5><h4 class='weatherDescriptor'>" + globaldata[i].list[x].weather[0].description + "</h4></div>"

		parentElementBack.insertAdjacentHTML("beforeend", weatherInfo);

		if (minus8 && (globaldata[i].list[x].main.temp < 8)) {
			showCities[i]++;
		}
		if (bet8_16 && (globaldata[i].list[x].main.temp >= 8) && (globaldata[i].list[x].main.temp <= 16)) {
			showCities[i]++;
		}
		if (bet16_23 && (globaldata[i].list[x].main.temp >= 16) && (globaldata[i].list[x].main.temp <= 23)) {
			showCities[i]++;
		}
		if (plus23 && (globaldata[i].list[x].main.temp >= 23)) {
			showCities[i]++;
		}

		if (clear && (globaldata[i].list[x].weather[0].main == "Clear")) {
			showCities[i]++;
		}
		if (rain && (globaldata[i].list[x].weather[0].main == "Rain")) {
			showCities[i]++;
		}
		if (clouds && (globaldata[i].list[x].weather[0].main == "Clouds")) {
			showCities[i]++;
		}
		if (snow && (globaldata[i].list[x].weather[0].main == "Snow")) {
			showCities[i]++;
		}

		console.log(globaldata[i].city.name);
		console.log(globaldata[i].list[x].main.temp);
		console.log(globaldata[i].list[x].main.temp_max);
		console.log(globaldata[i].list[x].main.temp_min);
		console.log(globaldata[i].list[x].weather[0].main);
		console.log(globaldata[i].list[x].weather[0].description);


		//	for (var i = 0; i < showCities.length; i++) {
		cityId = "city" + [i];
		cityEl = document.getElementById(cityId);
		cityEl.classList.remove('on');
		cityEl.classList.add('off');
		if (showCities[i] == 2) {

			//			if (!cityEl.classList.contains('on')) {
			cityMatch++;
			cityEl.classList.remove('off');
			cityEl.classList.add('on');
			//			} 
			//			else {
			//				cityEl.classList.remove('on');
			//				cityEl.classList.add('off');
			//			}
		}
	}

	if (((today || tomorrow || day3 || day2 || day4) && (minus8 || bet8_16 || bet16_23 || plus23) && (rain || clear || clouds || snow)) && ($.inArray(2, showCities) == -1)) {

		$('#userMsg').html("No matches found! Change your preferences.");
		$('#userMsg').removeClass('alert-success');
		$('#userMsg').addClass('blink alert-warning');
	}
	if ($.inArray(2, showCities) !== -1) {
		if (cityMatch == 1) {
			$('#userMsg').html("Yeah! 1 city matches your preferences!&nbsp; <input id='resetButton' type='button' value='Reset' onclick='reset();'>");
			$('#userMsg').addClass('alert-success');
			$('#userMsg').removeClass('blink alert-warning');

		} else {
			$('#userMsg').html("Yeah! " + cityMatch + " cities match your preferences!&nbsp; <input id='resetButton' type='button' value='Reset' onclick='reset();'>");
			$('#userMsg').addClass('alert-success');
			$('#userMsg').removeClass('blink alert-warning');
		}

	}


	//	}
}

function callApi(city) {
	var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&APPID=93bd3d955ce90b3ea3717b50dcc80dd9';
	$.ajax({ // OUR AJAX CALL and LOADING PROGRESS BAR
		type: 'GET',
		url: url,
		success: function (data) {
			globaldata.push(data);
			if (globaldata.length == 12) {
				createData(globaldata, 0);
			}

		}
	});
}

function call12apis() {
	callApi(london);
	callApi(barcelona);
	callApi(warsaw);
	callApi(madrid);
	callApi(lisbon);
	callApi(paris);
	callApi(dublin);
	callApi(amsterdam);
	callApi(berlin);
	callApi(brussels);
	callApi(vienna);
	callApi(rome);
	console.log('12 api calls done!');
}
