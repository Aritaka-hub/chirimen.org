'use strict';

var ax, ay, az;
window.addEventListener('load', function (){
	ax = document.querySelector('#ax');
	ay = document.querySelector('#ay');
	az = document.querySelector('#az');
	
	mainFunction();
	
}, false);


async mainFunction(){
	var i2cAccess = await navigator.requestI2CAccess();
	var port = i2cAccess.ports.get(1);
	var groveaccelerometer = new GROVEACCELEROMETER(port,0x53);
	await groveaccelerometer.init();
	
	while(1){
		try {
			var values = await roveaccelerometer.read();
			ax.innerHTML = values.x ? values.x : ax.innerHTML;
			ay.innerHTML = values.y ? values.y : ay.innerHTML;
			az.innerHTML = values.z ? values.z : az.innerHTML;
		} catch ( err ){
			console.log("READ ERROR:" + err);
		}
		
		await sleep(1000);
	}
}

function sleep(ms){
	return new Promise( function(resolve) {
		setTimeout(resolve, ms);
	});
}