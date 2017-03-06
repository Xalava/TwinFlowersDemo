// Web3js
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());
var twinSpirit = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contributors","outputs":[{"name":"addr","type":"address"},{"name":"amount","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getContributor","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"donatorName","type":"string"}],"name":"openDonation","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]).at("0x8be41da759e242fdf3a01029ef113d3282d7a6c5");

function donatorsList(){
    var donators = twinSpirit.contributors;
    var dolist ="";
    for (var i = donators.length - 1; i >= 0; i--) {
        dolist = dolist +"<li>" + i +" "+	 donators[i].name + " " + donators[i].amount + " ETH </li>";
    };
    return  dolist;
};


window.onload = function() {
    document.getElementById("sculptureName").innerHTML = twinSpirit.getContributor(0);
}


// us.wio interaction

// Setup 
var humidityPrec = 30;
var temperaturePrec = 30;
var sonPrec = 30;
var wioToken = "?access_token=13f643a259dfd43388885f7220aa1b91";
var serverURL = "https://us.wio.seeed.io/v1/node/"

// update values
setInterval(
	function(){ 
    
		$.get(serverURL + "GroveTempHumD0/humidity" + wioToken, function(data, status){
        	// alert("Data: " + data + "\nStatus: " + status);
        	var hum = (data.humidity+humidityPrec)/2;

        	$(".hum").html(hum.toString());

			// var valeur&Percent = valeur;
			$('.humidity-bar').css('width',hum +'%');
				if (hum<40){
					$('.humidity-bar').css('background-color',"red");

				}
			humidityPrec = data.humidity;
		
    	});

		$.get(serverURL + "GroveTempHumD0/temperature" + wioToken, function(data, status){
    		var temp = (data.celsius_degree+temperaturePrec)/2-2;

			$(".temp").html(temp.toString());

    		$('.temperature-bar').css('width', temp*3+'%');
    		if (temp>30){
					$('.temperature-bar').css('background-color',"red");
				}
			temperaturePrec = data.celsius_degree;	

    	});

			$.get(serverURL + "GroveSoundA0/sound_level" + wioToken, function(data, status){
    		var son = (data.sound_level+sonPrec)/2;

			$(".son").html(son.toString());

    		$('.son-bar').css('width', son+'%');
    		if (son>200){
					$('.son-bar').css('background-color',"red");
				}
			sonPrec = data.sound_level;	

    	});

			
	 }

, 1500);

window.onload = function() {

			
};


// library
function lacouleurRouge(){
	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/250/0/0" + wioToken)


}
function lacouleurBlanche(){
	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/250/250/250" + wioToken)


}

function lacouleurVerte(){
	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/0/250/0" + wioToken)


}

function lacouleurBleu(){
	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/0/0/250" + wioToken)


}


function sendText() {
	// body...
	var m = $("#msgInput").value;
	letexte ( m);
	$("#msgInput").val("");
	// alert("kmkmk");

}

function letexte(s){
		$.post(serverURL + "GroveLCDRGBI2C0/string/0/0/"+ s + wioToken)
}

function vibration(t){
	$.post(serverURL + "GenericDOutD2/onoff/1" + wioToken)
	//end vibration
 	setTimeout(function(){$.post(serverURL + "GenericDOutD2/onoff/0" + wioToken)
	}, t);
}

function vibrationSafe(t){
		setTimeout(function(){$.post(serverURL + "GenericDOutD2/onoff/0" + wioToken)
	}, t+4000);
	$.post(serverURL + "GenericDOutD2/onoff/1" + wioToken)
	//end vibration
 	setTimeout(function(){$.post(serverURL + "GenericDOutD2/onoff/0" + wioToken)
	}, t);
	setTimeout(function(){$.post(serverURL + "GenericDOutD2/onoff/0" + wioToken)
	}, t+500);
	setTimeout(function(){$.post(serverURL + "GenericDOutD2/onoff/0" + wioToken)
	}, t+1000);

}

function vibrationOff(){
	//end vibration
 	$.post(serverURL + "GenericDOutD2/onoff/0" + wioToken);
}



	//strombo
	// $.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/250/10/10" + wioToken)
	// setTimeout(function(){	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/10/250/10" + wioToken)
	// }, 600);
	// setTimeout(function(){	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/10/10/250" + wioToken)
	// }, 1200);


	// setTimeout(function(){
	// 	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/250/10/10" + wioToken)
	// 	setTimeout(function(){	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/10/250/10" + wioToken)
	// 	}, 400);
	// 	setTimeout(function(){	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/10/10/250" + wioToken)
	// 	}, 800);
	// 	setTimeout(function(){	$.post(serverURL + "GroveLCDRGBI2C0/backlight_color_rgb/0/0/0" + wioToken)
	// 	}, 1200);

	// },1800);
