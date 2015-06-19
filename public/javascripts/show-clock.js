
function showClock() {
	var Digital = new Date();
	var hours = Digital.getHours();
	var minutes = Digital.getMinutes();
	var seconds = Digital.getSeconds();
/*
	var dn="AM";

	if (hours>12){
		dn="PM";
		hours=hours-12;
	}
	if (hours === 0)
		hours = 12;
*/


	if (hours <= 9)
		hours = "0" + hours;

	if (minutes <= 9)
		minutes = "0" + minutes;

	if (seconds <= 9)
		seconds = "0" + seconds;

	myclock = hours + ":" + minutes + ":" + seconds; // + " " + dn;
	if (document.layers){
		document.layers.liveclock.document.write(myclock);
		document.layers.liveclock.document.close();
	}
	else if (document.all)
		liveclock.innerHTML=myclock;
	else if (document.getElementById)
		document.getElementById("liveclock").innerHTML=myclock;

	document.getElementById("liveclock").innerHTML=myclock
	//document.liveclock.value = hours + ":" + minutes + ":" + seconds + " " + dn
	setTimeout(showClock,1000);
}


