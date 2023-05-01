/* Project: Simple Mobile | Developer: Neptali Calonge | Date: May 23, 2018 */
(function () {

var TXConfig = (function () {
		// ADD INITIAL IMAGES HERE [GIF,PNG,JPG]:
	var init_Images = [
		'src/cursor.png', //cursor
		'src/cursor2.png', //cursor2
		'src/spr_logo.png', //logo
		'src/bg_intro.jpg', //bg_intro
        'src/txt_intro.png', //txt_intro
		'src/intro_string.png', //intro_string
		'src/spr_disclaimer.png' //spr_disclaimer
	],
		// ADD OTHER IMAGES HERE [GIF,PNG,JPG]:
		other_Images = [		
        'src/spr_cheer.png', //spr_cheer
		'src/instruction.png', //instruction
		'src/sandtimer.png', //img_timer
		'src/replay.png', //_replay
		'src/sandtimer.png', //img_timer
		'src/bg_end.jpg', //bg_end
		'src/learnmore.png', //_learnmore
		'src/spr_copy.png', //spr_copy
		'src/spr_legal.png', //spr_legal
		'src/spr_message.png', //spr_message
		'src/spr_strings.png', //spr_strings
		'src/greenglow.png' //greenglow
	],
		// ADD EXTERNAL JAVSCRIPTS HERE [JS]:
        init_JS = [
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js' //howler
	],
	
        loadedAssets = 0,
		otherAssets = 0,
        totalAssets = init_Images.length + init_JS.length,
		
		is_mobile = ("ontouchstart" in document.documentElement) ? true : false;
	
	return {
		loadedAssets              	: loadedAssets,
		totalAssets               	: totalAssets,
		init_Images            		: init_Images,
		init_JS           			: init_JS,
		other_Images				: other_Images,
		otherAssets				 	: otherAssets,
		is_mobile					: is_mobile
	};

})();


var TXAd = (function () {
    
	function init () {
		loadImages ( TXConfig.init_Images );
		loadScripts( TXConfig.init_JS );
	}

	function loadImages ( urls ) {
		for ( let i = 0; i < urls.length; i++ ) {
			let url = urls[i];
			$( '<img />' ).attr( 'src', url ).on('load', updateAssetsLoaded);
		}
	}
	
	function loadotherImages ( urls ) {
		for ( let i = 0; i < urls.length; i++ ) {
			let url = urls[i];
			$( '<img />' ).attr( 'src', url ).on('load', otherImagesLoaded);
		}
	}
    
	function loadScripts ( urls ) {
		for ( let i = 0; i < urls.length; i++ ) {
			let url = urls[i];
			$.getScript( url, updateAssetsLoaded);
		}
	}

	function updateAssetsLoaded () {
		TXConfig.loadedAssets += 1;
		if ( TXConfig.loadedAssets == TXConfig.totalAssets ) TXVariables.init();
	}
	
	function otherImagesLoaded () {
		TXConfig.otherAssets += 1;
	}

	return {
		init : init,
		loadotherImages : loadotherImages
	};

})();

/**###################################################
 * SET UP GLOBAL VARIABLES HERE
 * ###################################################
 */
var AD = {};

var TXVariables = (function () {

	function init () {

		// ADD VARIABLES FOR HTML ID ELEMENTS HERE [#id]:
		AD.introPanel		= $( '#introPanel' );
		AD.stringPanel		= $( '#stringPanel' );
		AD.cheerPanel		= $( '#cheerPanel' );
		AD.sandTimer		= $( '#sandTimer' );
		AD.topSand			= $( '#topSand' );
		AD.midSand			= $( '#midSand' );
		AD.hidSand			= $( '#hidSand' );
		AD.botSand			= $( '#botSand' );
		AD.crosshair		= $( '#crosshair' );
		AD.canvasHolder		= $( '#canvasHolder' );
		AD.txt_cheer		= $( '#txt_cheer' );
		AD.btn_replay		= $( '#btn_replay' );
		AD.instruction		= $( '#instruction' );
		AD.canvasHolder 	= $( '#canvasHolder' );
		AD.cursorHolder 	= $( '#cursorHolder' );
		AD.bg_end			= $( '#bg_end' );
		AD.txt_message		= $( '#txt_message' );
		AD.spr_copy			= $( '#spr_copy' );
		AD.spr_legal		= $( '#spr_legal' );
		AD.intro_string		= $( '#intro_string' );
		AD.left_string		= $( '#left_string' );
		AD.right_string		= $( '#right_string' );
		AD.cursorHolder2 	= $( '#cursorHolder2' );
		AD.sidePanel 		= $( '#sidePanel' );
		AD.greenglow 		= $( '#greenglow' );
		AD.dim		 		= $( '#dim' );
		AD.simcard			= $( '#simcard' );
		AD.spr_disclaimer	= $( '#spr_disclaimer' );
		
		// ADD VARIABLES FOR HTML CLASS ELEMENTS HERE [.class]:
		AD.button			= $( '.button' );
		AD.s1				= $( '.s1' );
		AD.s3				= $( '.s3' );
		
		// ADD OTHER VARIABLES HERE: 
		AD.timer			= null;
		AD.status			= null;
		AD.initBGM			= true;
		AD.strings			= [];
		AD.stringID			= null;
		AD.zero				= 0;
		AD.gametime			= false;
		AD.targetCount		= 30;
		AD.readytocut		= false;
		AD.stringPosY		= ['-240px','-360px','-480px','-600px','-720px','-840px'];
		AD.wiggle			= 15;
		AD.initMobile		= true;
		AD.mouseIsDown 		= false;
		AD.hitInterval		= null;
		AD.step_1			= true;
		AD.cheerInterval	= null;
		AD.cuts				= 0;
		AD.time				= 20;
		AD.timeInterval		= null;
		
		gsap.ticker.lagSmoothing(false); //continues animation when a tab is inactive
		
		if(TXConfig.is_mobile) {
			$('#txt_intro').css('background-image', 'url(src/txt_intro_mob.png)');
			$('#instruction').css('background-image', 'url(src/instruction_mob.png)');
			AD.spr_legal.addClass('mobile');
			AD.spr_disclaimer.addClass('mobile');
			$('#ie_cursor').hide();
		} else {
			$('#ie_cursor').css('background-image', 'url(' + TXConfig.init_Images[1] + ')');
		}
		
		TXCreative.fn_STEP1();
	}
	
	return {
		init : init,
	};

})();

/**###################################################
 * SET UP CREATIVE HERE
 * ###################################################
 */		  
var TXCreative = (function () {

	function fn_STEP1 () {
		var tl = gsap.timeline({onComplete:function(){
			gsap.set( AD.simcard, { background: 'url('+TXConfig.init_Images[1]+') no-repeat'});
			introCut();
		}});

		AD.button.on( 'click', fn_buttons);
		
		// LOAD SOUNDEFFECT:
		TXAudio.init();
		
		// LOAD OTHER IMAGES:
		TXAd.loadotherImages(TXConfig.other_Images);
		
		AD.button.css('cursor','pointer');
		
		tl.to( AD.s1, 0.5, {delay: 0.1, alpha:1})
		.to(AD.intro_string, 0.1, {rotation: random(-1,1), x:random(-5,5), y:random(-3,3)})
		.to(AD.intro_string, 0.1, {rotation: random(-1,1), x:random(-5,5), y:random(-3,3)})
		.to(AD.intro_string, 0.1, {rotation: random(-1,1), x:random(-5,5), y:random(-3,3)})
		.to(AD.intro_string, 0.1, {rotation: random(-1,1), x:random(-5,5), y:random(-3,3)});
		
		//gsap.to(AD.intro_string, 1, {rotation: random(-1,1)})
		function introCut(){	
		 	gsap.to( AD.simcard, 0.5, { delay: 0.1, left:335, top: 325, ease:'back.in', 
				onComplete: function(){		
					gsap.set(AD.left_string, {width:400});
					gsap.set(AD.right_string, {left:400});
					gsap.to( AD.left_string, 0.2, {left:-400, scaleX:0.5} );
					gsap.to( AD.right_string, 0.2, {left:1000, scaleX:0.5, onComplete: function(){
					// LOAD SLASH TRAIL
					
					setTimeout(function(){
						TXCursor.init();
						gsap.to(AD.introPanel, 0.2, {autoAlpha:0});
						gsap.fromTo(AD.sidePanel, 0.2, {left:-161, display:'block'}, {left:0, onComplete: fn_STEP2});
					}, 3000);
				}});
			}});
		}

		function random(min, max) { // min and max included 
			return Math.random() * (max - min + 1) + min
		}
		
	}
	
	function fn_STEP2 () {
		AD.gametime = true;
		
		AD.introPanel.hide();
		gsap.killTweensOf([AD.s3,AD.spr_disclaimer]);
		
		gsap.set(
			[ AD.s3, AD.btn_replay ],
		{ display:'none', autoAlpha:0 });
		
		gsap.set(
			[ AD.cheerPanel, AD.stringPanel, AD.instruction, AD.canvasHolder ],
		{ display:'block', autoAlpha:1 });
		
		AD.canvasHolder.css({'cursor':'none'}); 
		
		gsap.set([AD.spr_copy, AD.bg_end], {alpha:0, backgroundPositionY: '0'});
		gsap.set(AD.spr_disclaimer, {left:294, autoAlpha:1});
		
		TXStrings.init();
		TXTimer.start();
		AD.readytocut = true;
		AD.cuts = 0;
		AD.time	= 20;
		
		AD.hitInterval = setInterval(fn_checkHit, 1);
		
		AD.timeInterval = setInterval(fn_checkTime, 1000);
			
		if(AD.initBGM){
			AD.initBGM = false;
			AD.sndURL[0].play();
		}
		
	}
	
	function fn_STEP3 () {
		var tl = gsap.timeline();
		AD.gametime = false;
		clearTimeout(AD.timer);
		clearInterval(AD.hitInterval);
		clearInterval(AD.cheerInterval);
		clearInterval(AD.timeInterval);
		gsap.killTweensOf('*');
	
		if(AD.strings.length == AD.zero) gsap.set(AD.txt_message, {backgroundPositionY: '0'});
		else gsap.set(AD.txt_message, {backgroundPositionY: '-36px'});

		tl.set([ AD.cheerPanel, AD.stringPanel, AD.instruction, AD.canvasHolder, AD.sandTimer ], {display:'none'})
		.set(AD.bg_end,{ display:'block', autoAlpha:1 })
		.fromTo(AD.greenglow, 1, {scale:0, autoAlpha:0},{scale:1, autoAlpha:1})
		.set(AD.spr_copy, {autoAlpha:1, backgroundPositionY: '-532px'})
		.to(AD.greenglow, 1, {autoAlpha:0})
		.set(AD.spr_disclaimer, {autoAlpha:0},'+=1')
		.set(AD.btn_replay,{ display:'block', autoAlpha:1 })
		.fromTo(AD.s3, 0.5, {display:'block', autoAlpha:0},{autoAlpha:1});
		
		TXTimer.reset();		
	}
	
	function fn_buttons () {
		switch (this.id) {
			case 'btn_replay':
				if(AD.strings != AD.zero) TXStrings.remove();
				fn_STEP2();
				break;
			case 'btn_findfreedom':
				window.open("https://www.simplemobile.com/", "_blank");
				break;
		}
	}
	
	function collision($div1, $div2) {
		var x1 = $div1.offset().left,
			y1 = $div1.offset().top,
			h1 = $div1.outerHeight(true),
			w1 = $div1.outerWidth(true),
			b1 = y1 + h1,
			r1 = x1 + w1,
			x2 = $div2.offset().left,
			y2 = $div2.offset().top,
			h2 = $div2.outerHeight(true),
			w2 = $div2.outerWidth(true),
			b2 = y2 + h2,
			r2 = x2 + w2;

		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
		return true;
	}
	
	function fn_checkHit() {
		// Cut String
		if(AD.mouseIsDown && AD.readytocut && AD.gametime){
			var n = 0;
			while(n < AD.targetCount){
				if(collision(AD.crosshair, $('#'+AD.strings[AD.strings.length-1] +' .target'+n)) && AD.strings.length > AD.zero){
					AD.readytocut = false;
					TXStrings.cut($('#'+AD.strings[AD.strings.length-1] +' .target'+n).offset().left);
				}			
			n++;
			}
		}
	}
	
	function fn_checkTime () {
		if(AD.time == AD.zero)
			clearInterval(AD.timeInterval);
		else if(AD.time <=5 && AD.cuts != AD.zero){
			gsap.set(AD.txt_cheer, {backgroundPositionY:-168});
			gsap.set(AD.cheerPanel, {autoAlpha:1, display: 'block'});	
		}
		AD.time--;
	}
	
	return {
		fn_STEP1 : fn_STEP1,
		fn_STEP2 : fn_STEP2,
		fn_STEP3 : fn_STEP3
	};

})();

/**###################################################
 * SET UP TIMER
 * ###################################################
 */	
var TXTimer = (function () {
	// private
	function start () {
		
		var totalsec = 20;

		gsap.to(AD.sandTimer ,0.5, {rotation:0, onComplete: function(){
			gsap.to(AD.topSand, 0.1,{top:10, ease:'none', onComplete: function(){
				gsap.fromTo(AD.midSand, 0.1,{autoAlpha:1}, {top:52,ease:'none', onComplete: fn_animateSand});
			}});
		}});
		
		AD.cheerInterval = setInterval(function(){
			gsap.set(AD.txt_cheer, {alpha:0});
			gsap.set(AD.txt_cheer, {delay:0.5, alpha:1});
		}, 3000);
		
		function fn_animateSand() {
			gsap.to(AD.hidSand, totalsec-0.25,{top:-25, ease:'power2.in', onComplete: function(){
				gsap.to(AD.hidSand, 0.25,{top:0, ease:'none', onComplete: end});
			}});
			gsap.fromTo(AD.botSand, totalsec, {autoAlpha:1},{top:71, ease:'none'});
		}
		
		AD.sandTimer.show();
	}
	
	function reset () {
		gsap.set(AD.txt_cheer, {backgroundPositionY:0});
		gsap.set(AD.sandTimer ,{rotation:180});
		gsap.set(AD.topSand ,{top:-15});
		gsap.set(AD.botSand ,{top:128, autoAlpha:0});
		gsap.set(AD.midSand ,{top:-9, autoAlpha:0});
		gsap.set(AD.hidSand ,{top:-56});
	}
	
	function end () {
		if(AD.gametime) TXCreative.fn_STEP3();
	}
	
	// public
	return {
		start : start,
		reset : reset
	};

})();


/**###################################################
 * SET UP STRINGS
 * ###################################################
 */	
var TXStrings = (function () {
	// private
	function init () {
		for (let s = 0; s < 20; s++) {
			createString();
		}
	}
		
	function createString() {
		var n = 60,
			stringPosY = AD.stringPosY[randomInt(0, 6)],
			_rotate = randomInt(-90, 90);
		
		AD.stringID = 'string_' + AD.strings.length;			
		AD.stringPanel.append('<div id='+AD.stringID+' class="strings"><div class="string"></div></div>');
			
		gsap.set('#'+AD.stringID, {
			width: 1020,
			height: 50, 
			rotation: _rotate,
			background: 'transparent'
			/*filter: 'drop-shadow(0px 5px 30px black)'*/
		});
		
		if(_rotate >= -20 && _rotate <= 20)	{
			// HORIZONTAL
			gsap.set('#'+AD.stringID, { left: randomInt(-150, -70), top: randomInt(145, 310) });	
		}	
					
		else if(_rotate <= -60 || _rotate >= 60) {
			// VERTICAL
			gsap.set('#'+AD.stringID, { left: randomInt(-322, 70), top: randomInt(100, 300) });
		}			
		else {
			// IN BETWEEN
			gsap.set('#'+AD.stringID, { left: -110, top: randomInt(160, 290) });
		}
		
		gsap.set('#'+AD.stringID + ' .string', {
			backgroundPositionY: stringPosY
		});
		
		for (let i = 0; i < AD.targetCount; i++) { 
			$('#'+AD.stringID).append('<div class="target target'+i+'" style="left:'+n+'px"></div>');
			n = n + 30;
		}
		
		AD.strings.push(AD.stringID);
		update_endPanel();
		
	}
	
	function removeString () {
		for (let i = AD.strings.length-1; i > -1 ; i--) {
			$("#"+AD.strings[i]).remove();
			AD.strings.pop();			
		}
	}
	
	function cutString (mark) {
		var tl = gsap.timeline({onComplete: complete});

		$('#'+AD.strings[AD.strings.length-1]).append('<div class="cut_left spr_strings"></div><div class="cut_right spr_strings"></div>');		
		
		tl.set($('#'+AD.strings[AD.strings.length-1] +' .string') ,{alpha:0})
		.fromTo($('#'+AD.strings[AD.strings.length-1] +' .cut_left'), 0.14,
			{force3D:true, alpha:1, left: mark-1020},{alpha:1, left: -760, scaleX:0.5, ease:'power1.in'})
		.fromTo($('#'+AD.strings[AD.strings.length-1] +' .cut_right'), 0.14,
			{force3D:true, alpha:1, left: mark-20},{alpha:1, left: 770, scaleX:0.5, ease:'power1.in'},'<');
		
		function complete () {
			$("#"+AD.strings[AD.strings.length-1]).remove();
			AD.strings.pop();
			update_endPanel();
			AD.readytocut = true;
		}
		
		if(AD.cuts == AD.zero){
			clearInterval(AD.cheerInterval);
			AD.cheerPanel.hide();
		} 
		else if (AD.cuts == 1){
			if(AD.time >= 15) {
				gsap.set(AD.txt_cheer, {backgroundPositionY:-56});
				gsap.to(AD.cheerPanel, 0.2, {delay:3,autoAlpha:0});
			}
				
			else {
				gsap.set(AD.txt_cheer, {backgroundPositionY:-112});
				gsap.to(AD.cheerPanel, 0.2, {delay:3,autoAlpha:0});
			}
				
			gsap.set(AD.cheerPanel, {autoAlpha:1, display: 'block'});
		}
		
		AD.cuts++;
		
		var woosh = randomInt(1,6);
		
		AD.sndURL[woosh].currentTime = 0;
		AD.sndURL[woosh].play();
		
	}
		
	function randomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	function update_endPanel() {
		var currentString = AD.strings.length-1;
		
		if(AD.strings.length <=20){
			var n = AD.strings.length / 20;
			gsap.to([AD.bg_end, AD.spr_copy], 0.2,{alpha: 1 - n.toFixed(1) });
			
			if(n == AD.zero){
				TXCreative.fn_STEP3();
			}
			else {
				if(!AD.gametime) return;
				
				if (AD.strings.length == 1){
					gsap.set(AD.spr_copy, {backgroundPositionY: '-266px'});
				} else {
					gsap.set(AD.spr_copy, {backgroundPositionY: '0'});
				}

				gsap.set('.strings', {zIndex: 0});
				gsap.set(AD.dim, {zIndex: 1});
				gsap.set('#string_'+currentString, {zIndex: 2});
			}

		}
	}
	
	// public
	return {
		init 		: init,
		remove		: removeString,
		cut			: cutString,
		randomInt	: randomInt
	};

})();

/**###################################################
 * SET UP SLASH TRAIL & MOUSE CURSOR
 * ###################################################
 */	
var TXCursor = (function () {
	// private
	function init () {
		var fps = 60,
			canvas_trail,
			ctx_trail,
			canvas_cursor,
			ctx_cursor,

			mouseX = 0,
			mouseY = 0,
			mouseXOld = 0,
			mouseYOld = 0,

			alphaFadeRate = 0.05,
			radiusShrinkRate = 0.8,
			particles = [],
			particleCount = 0,

			fpsInterval, now, then, elapsed,
			
			transform, values, a, b, scale,

			gameShieldCorner, gameShieldLeft, gameShieldTop,
			
			transformExists = false,		
			
			cursor = new Image();
		
		cursor.src = TXConfig.init_Images[0];
		
		canvas_trail = document.getElementById('trailHolder');
		ctx_trail = canvas_trail.getContext('2d');
		
		canvas_cursor = document.getElementById('cursorHolder');
		ctx_cursor = canvas_cursor.getContext('2d');
				
		transform = $('#container').css('transform');
			
		if (transform != 'none') {
			transformExists = true;	
			try{
				values = transform.split('(')[1];
				values = values.split(')')[0];
				values = values.split(',');
				a = values[0];
				b = values[1];
				scale = Math.sqrt(a*a + b*b);
			}
			catch(error) {
				scale = 1;
			}
		}
		else {			
			transformExists = false;
			scale = 1;
		}
		
		gameShieldCorner = AD.canvasHolder.offset(); // Upper left hand corner of gameShield
		gameShieldLeft = gameShieldCorner.left;
		gameShieldTop = gameShieldCorner.top;
		
		// Add listeners
		if(AD.is_mobile) {
			$(window).on('touchend', onCanvasHolderUp);
			AD.canvasHolder.on('touchstart', onCanvasHolderDown);		
			AD.canvasHolder.on('touchmove', onCanvasHolderMove);
		} else {
			$(window).on('mousedown', onCanvasHolderDown);
			$(window).on('mouseup', onCanvasHolderUp);
			AD.canvasHolder.on('mousemove', onCanvasHolderMove);
		}
		
		
		$(window).on("blur", onCanvasHolderUp);

		startAnimating();

		// Particle class
		function Particle() {
			this.x1 = 0;
			this.y1 = 0;
			this.x2 = 0;
			this.y2 = 0;
			this.width = 15;
			this.height = 15;
			this.alpha = 1;
			this.radius = 15;
		}

		// Mouse functions
		function onCanvasHolderDown(e) {
			
			// Get mouse coords
			if ( TXConfig.is_mobile ) {
				e.preventDefault();
				if (e.touches) {
					if (transformExists) {
						mouseX = (e.touches[0].offsetX) / scale; // get scaled coordinates
						mouseY = (e.touches[0].offsetY) / scale;
					}
					else {
						mouseX = e.touches[0].offsetX / scale;
						mouseY = e.touches[0].offsetY / scale;
					}
				}
				else {
					if (transformExists) {
						mouseX = (e.originalEvent.touches[0].offsetX) / scale; // get scaled coordinates
						mouseY = (e.originalEvent.touches[0].offsetY) / scale;
					}
					else {
						mouseX = e.originalEvent.touches[0].clientX;
						mouseY = e.originalEvent.touches[0].clientY;
					}
				}
			} else {
				if (transformExists) {
					mouseX = (e.pageX - gameShieldLeft) / scale; // get scaled coordinates
					mouseY = (e.pageY - gameShieldTop) / scale;
				}
				else {
					mouseX = e.clientX - gameShieldLeft;
					mouseY = e.clientY - gameShieldTop;
				}
			}
			
			mouseXOld = mouseX;
			mouseYOld = mouseY;
			
			// Update Cursor
			cursor.src = TXConfig.init_Images[1];
			drawCursor();		
			AD.mouseIsDown = true;
			
		}
		
		function onCanvasHolderUp(e) {
			
			// Update Cursor
			cursor.src = TXConfig.init_Images[0];
			ctx_cursor.shadowBlur = 0;
			drawCursor();
			
			AD.mouseIsDown = false;
		}
		
		function onCanvasHolderMove(e) {
			
			mouseXOld = mouseX;
			mouseYOld = mouseY;
			
			if ( TXConfig.is_mobile ) {
				
				e.preventDefault();
				
				if (e.touches) {
					if (transformExists) {
						mouseX = (e.touches[0].pageX - gameShieldLeft) / scale; // get scaled coordinates
						mouseY = (e.touches[0].pageY - gameShieldTop) / scale;
					}
					else {
						mouseX = e.touches[0].clientX;
						mouseY = e.touches[0].clientY;
					}
				}
				else {
					if (transformExists) {
						mouseX = (e.originalEvent.touches[0].pageX - gameShieldLeft) / scale; // get scaled coordinates
						mouseY = (e.originalEvent.touches[0].pageY - gameShieldTop) / scale;
					}
					else {
						mouseX = e.originalEvent.touches[0].clientX;
						mouseY = e.originalEvent.touches[0].clientY;
					}
				}
			}
			else {
				if (transformExists) {
					mouseX = (e.pageX - gameShieldLeft) / scale; // get scaled coordinates
					mouseY = (e.pageY - gameShieldTop) / scale;
				}
				else {
					mouseX = e.clientX - gameShieldLeft;
					mouseY = e.clientY - gameShieldTop;
				}
			}
			
			if (AD.mouseIsDown) {
				particles[particleCount] = new Particle();
				particles[particleCount].x1 = mouseXOld;
				particles[particleCount].y1 = mouseYOld;
				particles[particleCount].x2 = mouseX;
				particles[particleCount].y2 = mouseY;
				particleCount ++;
			}
			
			drawCursor();		
			gsap.set(AD.crosshair,{left:mouseX,top:mouseY});			
		}
		
		// draw cursor
		function drawCursor() {
			if(TXConfig.is_mobile) {
				ctx_cursor.clearRect(0,0, 960, 500);
				ctx_cursor.drawImage(cursor,mouseX-10,mouseY-54,cursorWidth,cursorHeight);
			} else {
				$('#ie_cursor').css({left:mouseX-10 + 'px', top: mouseY-54 + 'px'});
			}
		}

		// start animations
		function startAnimating() {
			fpsInterval = 1000 / fps;
			then = Date.now();
			startTime = then;
			animate();
		}

		// the animation loop calculates time elapsed since the last loop
		// and only draws if your specified fps interval is achieved
		function animate() {
			var i = 0;

			// request another frame
			requestAnimationFrame(animate);

			// calc elapsed time since last loop
			now = Date.now();
			elapsed = now - then;

			// if enough time has elapsed, draw the next frame
			if (elapsed > fpsInterval) {

				// Get ready for next frame by setting then=now, but also adjust for your
				// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
				then = now - (elapsed % fpsInterval);

				// Put your drawing code here
				ctx_trail.clearRect(0, 0, 960, 500);

				for (i = 0; i < particleCount; i ++) {
					particles[i].alpha -= alphaFadeRate; // fade particle
					particles[i].radius -= radiusShrinkRate; // shrink particle
					if (particles[i].alpha <= 0) {
						particles.splice(i, 1);
						particleCount --;
					}
					else if (particles[i].radius <= 0) {
						particles.splice(i, 1);
						particleCount --;
					}
					else {
						ctx_trail.globalAlpha = particles[i].alpha;

						// Draw outer glow
						ctx_trail.lineWidth = particles[i].radius;
						ctx_trail.strokeStyle = '#54dd07';
						ctx_trail.beginPath();
						ctx_trail.moveTo(particles[i].x1, particles[i].y1);
						ctx_trail.lineTo(particles[i].x2, particles[i].y2);
						ctx_trail.stroke();

						// Draw inner glow
						ctx_trail.lineWidth = particles[i].radius * 0.35;
						ctx_trail.strokeStyle = 'white';
						ctx_trail.beginPath();
						ctx_trail.moveTo(particles[i].x1, particles[i].y1);
						ctx_trail.lineTo(particles[i].x2, particles[i].y2);
						ctx_trail.stroke();

					}
				}
			}
		}
		
	}
	
	// public
	return {
		init : init
	};

})();

/**###################################################
 * SET UP AUDIO
 * ###################################################
 */
var TXAudio = (function () {
	// private
	function init () {
		
		//*** AUDIO VARS ***//
		AD.btn_sound	= $( '#btn_sound' );
		AD.sound		= $( '#sound' );
		
		AD.sndURL = [
			new Howl({src:['src/audio/bgm.mp3'], loop:true, volume:1}), //bgm
			new Howl({src:['src/audio/sfx_woosh1.mp3'], loop:false, volume:1}), //sfx_woosh1
			new Howl({src:['src/audio/sfx_woosh2.mp3'], loop:false, volume:1}), //sfx_woosh2
			new Howl({src:['src/audio/sfx_woosh3.mp3'], loop:false, volume:1}), //sfx_woosh3
			new Howl({src:['src/audio/sfx_woosh4.mp3'], loop:false, volume:1}), //sfx_woosh4
			new Howl({src:['src/audio/sfx_woosh5.mp3'], loop:false, volume:1}), //sfx_woosh5
			new Howl({src:['src/audio/sfx_woosh6.mp3'], loop:false, volume:1}) //sfx_woosh6
		];

		AD.btn_sound.on( 'click', fn_sound);

	}
	
	function fn_sound () {		
		var isMuted = AD.sound.hasClass( 'mute' );
		if ( isMuted ) {
			Howler.volume(1);
			AD.sound.removeClass('mute');
		}
		else {
			Howler.volume(0);
			AD.sound.addClass('mute');
		}
	}
	
	// public
	return {
		init : init
	};

})();

TXAd.init();

})();