
var crashList = [];
var pageHeight = 0;


document.addEventListener('DOMContentLoaded', function() {
	prepareCrashList();
	crashAnim();
	window.setTimeout(crashElement, 5000);
	window.setTimeout(createMarquee, 10500);
});


function prepareCrashList() {
	objectsList = document.querySelectorAll('*');
	for(let i = 1; i < objectsList.length; i++)
		crashList.push({
			'object':     objectsList[i],
			'left':       objectsList[i].offsetLeft,
			'top':        objectsList[i].offsetTop,
			'rotation':   0,
			'opacity':    1.0,
			'speedRight': Math.random()*.5-2.5,
			'speedDown':  Math.random()*.2,
			'active':     false
		});
	
	pageHeight = document.querySelector('html').offsetHeight;
}


function crashElement() {
	
	let num = parseInt(Math.random()*crashList.length);
	if(crashList[num]['object'].tagName != 'BODY')
		crashList[num]['active'] = true;
	
	window.setTimeout(crashElement, Math.random()*150);
}


function crashAnim() {
	
	for(let i = 0; i < crashList.length; i++) {
		if(crashList[i]['active']) {
			crashList[i]['left'] *= 1.1;
			crashList[i]['top'] *= 1.1;
			crashList[i]['opacity'] -= .05;
			crashList[i]['rotation'] += crashList[i]['left']/500;
			crashList[i]['object'].style.position = 'fixed';
			crashList[i]['object'].style.transform = `
				rotate(` + crashList[i]['rotation'] + `deg)
			`;
			crashList[i]['object'].style.left = crashList[i]['left'] + 'px';
			crashList[i]['object'].style.top = crashList[i]['top'] + 'px';
			crashList[i]['object'].style.opacity = crashList[i]['opacity'];
			if(crashList[i]['opacity'] < 0) {
				crashList[i]['object'].style.display = 'none';
				crashList[i]['active'] = false;
			}
		}
	}
	
	window.setTimeout(crashAnim, 40);
}


function createMarquee() {
	let text = 'ОСТОРОЖНО, ЗЛОСТНЫЕ НЕПЛАТЕЛЬЩИКИ.';
	let speed = 10;

	let marquee = document.createElement('marquee');
	marquee.innerHTML = text;
	marquee.setAttribute('scrollamount', speed);
	marquee.style.position = 'fixed';
	marquee.style.left = '0';
	marquee.style.top = '0';
	marquee.style.width = '100%';
	marquee.style.height = '100%';
	marquee.style.zIndex = '999999999';
	marquee.style.fontFamily = 'sans-serif';
	marquee.style.textShadow = '0 0 10px #000';
	marquee.style.fontSize = '100px';
	marquee.style.paddingTop = '100px';
	document.body.insertBefore(marquee, null);
}

