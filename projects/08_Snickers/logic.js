/* Project: Snickers | Developer: Neptali Calonge | Date: Jun 27, 2018 */
(function () {

var TXConfig = (function () {
		// ADD INITIAL IMAGES HERE [GIF,PNG,JPG]:
	var init_Images = [		
        'src/logo.png', //logo
		'src/spr_social.png', //spr_social
		'src/spr_char.jpg', //spr_chars
		'src/spr_snickers.png', //spr_snickers
		'src/_glow.png', //_glow
		'src/spr_chili.png', //spr_chili
		'src/spr_bean.png', //spr_bean
		'src/spr_caramel.png', //spr_caramel
		'src/instruction.png', //instruction
		'src/copy.png', //copy
		'src/_trynow.png', //_trynow
		'src/char_bg.jpg', //char_bg
		'src/spr_message.png' //spr_message
	],
			
		// ADD EXTERNAL JAVSCRIPTS HERE [JS]:
        init_JS = [
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/CustomEase.min.js'
	],
        loadedAssets = 0,
        totalAssets = init_Images.length + init_JS.length,
		
		is_mobile = /Mobi/.test(navigator.userAgent),		
		is_chrome = navigator.userAgent.indexOf('Chrome') > -1,
		is_firefox = navigator.userAgent.indexOf('Firefox') > -1,
		is_safari = navigator.userAgent.indexOf("Safari") > -1,
		is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1,
		is_android = navigator.userAgent.toLowerCase().indexOf("android") > -1,
		is_explorer;
		
	if ((is_chrome)&&(is_safari)) 
		is_safari = false;
	
	if ((is_chrome)&&(is_opera)) 
		is_chrome = false;	
	
	// IE10 || IE11 || IE EDGE
	if (navigator.userAgent.indexOf('MSIE') > -1 ||
		navigator.userAgent.indexOf('Trident/') > -1 || 
		navigator.userAgent.indexOf('Edge/') > -1)
		is_explorer = true;	
	
	return {
		loadedAssets              	: loadedAssets,
		totalAssets               	: totalAssets,
		init_Images            		: init_Images,
		init_JS           			: init_JS,
		is_mobile					: is_mobile,
		is_safari					: is_safari
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
	
	return {
		init : init
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
		AD.mainPanel		= $( '#mainPanel' );
		AD.confetti			= $( '#confetti' );
		AD.highlight		= $( '#highlight' );
		AD.btn_snickers0	= $( '#btn_snickers0' );
		AD.btn_snickers1	= $( '#btn_snickers1' );
		AD.btn_snickers2	= $( '#btn_snickers2' );
		AD.char0			= $( '#char0' );
		AD.char1			= $( '#char1' );
		AD.char2			= $( '#char2' );
		AD._char0			= $( '#_char0' );
		AD._char1			= $( '#_char1' );
		AD._char2			= $( '#_char2' );
		AD.instruction		= $( '#instruction' );
		AD.copy				= $( '#copy' );
		AD.btn_trynow		= $( '#btn_trynow' );
		AD.spr_message		= $( '#spr_message' );
		
		// ADD VARIABLES FOR HTML CLASS ELEMENTS HERE [.class]:
		AD.button			= $( '.button' );
		AD.snickers			= $( '.snickers' );
		AD.crosshair		= $( '#crosshair' );
		AD.target			= $( '.target' );
		AD.characters		= $( '.characters' );
		AD.spr_chars		= $( '.spr_chars' );
		AD.cir_char			= $( '.cir_char' );
		
		// ADD OTHER VARIABLES HERE: 
		AD.timer			= null;
		AD.timer_2sec		= null;
		AD.userInit			= false;
		AD.snickersNum		= [0, 1, 2];
		AD.gametime			= false;
		AD.wiggle 			= 15;
		AD.zero				= 0;
		AD.is_step1			= true;
		
		AD.incorrect		= [false, false, false];
		AD.correct			= false;
		
		AD.initHover		= [false, false, false];

		AD.scale			= 1;
				
		/* TXCreative.fn_scaling();		
		$( window ).resize(TXCreative.fn_scaling); */
		
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
		AD.button.on( 'click', fn_buttons);
		AD.button.css('cursor','pointer');
		TXAudio.init();
		fn_STEP2();
	}
	
	function fn_STEP2 () {
		AD.is_step1 = false;
		clearTimeout(AD.timer_2sec);
		
		shuffle(AD.snickersNum);
		
		gsap.set($('#btn_snickers'+AD.snickersNum[0]), {left: 99});
		gsap.set($('#btn_snickers'+AD.snickersNum[1]), {left: 295});
		gsap.set($('#btn_snickers'+AD.snickersNum[2]), {left: 491});
		
		AD.mouseIsDown = false;

		AD.mainPanel.on('mousemove', fn_onSnickersMove);
		AD.snickers.on('mousedown', fn_onSnickersDown);
		AD.snickers.on('mouseover', fn_onSnickersOver);
		$(window).on('mouseup', fn_onSnickersUp);
		
		AD.gametime = true;
		
		gsap.to(AD.copy, 0.2, {delay:0.3, autoAlpha:1, onComplete: fn_animate2});
		
		CustomEase.create("hop", "M0,0,C0,0,0.052,1.264,0.204,1.264,0.302,1.264,0.344,0.934,0.458,0.934,0.61,0.934,0.59,1.122,0.646,1.122,0.704,1.122,0.682,0.98,0.758,0.98,0.85,0.98,0.858,1.058,0.902,1.022,0.964,0.97,1,1,1,1");
		
		function fn_animate2 () {
			gsap.fromTo(AD.characters, 0.5, {scale:0.6, autoAlpha:0}, {scale:1, autoAlpha:1, stagger:0.25, ease:'hop'});
					
			gsap.to($('#btn_snickers'+AD.snickersNum[0]), 0.2, {delay: 0.9, top: 418, onComplete: function(){
				wiggle($('#btn_snickers'+AD.snickersNum[0]));
			}});
			
			gsap.to($('#btn_snickers'+AD.snickersNum[1]), 0.2, {delay: 1.3, top: 418, onComplete: function(){
				AD.wiggle = 15;
				wiggle($('#btn_snickers'+AD.snickersNum[1]));
			}});
			
			gsap.to($('#btn_snickers'+AD.snickersNum[2]), 0.2, {delay: 1.7, top: 418, onComplete: function(){
				AD.wiggle = 15;
				wiggle($('#btn_snickers'+AD.snickersNum[2]));
				gsap.to(AD.instruction,0.3,{delay:0.3,autoAlpha:1, onComplete: allowButton});
			}});
		}
		
		function allowButton () {
			gsap.set(AD.snickers,{'pointer-events':'auto'});
		}
		
		AD.gameInterval = setInterval(fn_checkHover, 100);
		
	}
	
	function fn_STEP3 () {
		AD.btn_trynow.show();
		clearInterval(AD.gameInterval);
	}
	
	function fn_buttons () {

		if(AD.initSound) {
			AD.initSound = false;
			AD.sndURL[0].play();
		}
		
		switch (this.id) {
			case 'btn_fb':
				window.open("https://www.facebook.com/snickers/", "_blank");
				break;
			case 'btn_tw':
				window.open("https://twitter.com/SNICKERS", "_blank");
				break;
			case 'btn_in':
				window.open("https://www.instagram.com/snickers/", "_blank");
				break;
			case 'btn_yt':
				window.open("https://www.youtube.com/c/SnickersBrand", "_blank");
				break;
			case 'btn_trynow':	
				window.open("https://www.snickers.com/", "_blank");
				break;
		}
	}
	
	function fn_checkEnd() {		
		if(!AD.btn_snickers0.is(':visible') && !AD.btn_snickers1.is(':visible') && !AD.btn_snickers2.is(':visible')){
			AD.gametime	= false;
			gsap.set(AD.snickers, {display:'block', 'pointer-events':'none', scale:0.86, top:410, x:0,y:0});
			gsap.set(AD.btn_snickers0, { left: 77 });
			gsap.set(AD.btn_snickers1, { left: 295 });
			gsap.set(AD.btn_snickers2, { left: 512 });
			
			gsap.to(AD.instruction, 0.2, {autoAlpha:0});
			
			gsap.set(AD.copy, {backgroundPositionY: '-85px'});
			
			gsap.to(AD.characters, 0.2, { scale:0.9, top:203});
			gsap.to(AD.char0, 0.2, { left: 66 });
			gsap.to(AD.char2, 0.2, { left: 502 });
			gsap.set(AD.spr_chars, { backgroundPositionX: '-826px'});
			fn_STEP3 ();
			AD.sndURL[1].play();
		}
	}
	
	function fn_onSnickersMove (e) {
		
		if(AD.mouseIsDown){
			var parentOffset = $(this).parent().offset(),
				relX = (e.pageX - parentOffset.left)/AD.scale,
   				relY = (e.pageY - parentOffset.top)/AD.scale,
				crossX = AD.crosshair.position().left / AD.scale,
				crossY = AD.crosshair.position().top / AD.scale;
			
			gsap.set('#'+AD.activeSnicker,{left:relX-280,top:relY-25});
			gsap.set(AD.crosshair,{left:relX-200,top:relY-8});
			
			if(AD.incorrect[0]){
				if(crossX < 65 || crossX > 218 || crossY < 173 || crossY > 324 ) fn_hoverOut();
			}
			
			if(AD.incorrect[1]){
				if(crossX < 305 || crossX > 460 || crossY < 173 || crossY > 324 ) fn_hoverOut();
			}
			
			if(AD.incorrect[2]){
				if(crossX < 552 || crossX > 704 || crossY < 173 || crossY > 324 ) fn_hoverOut();
			}
			
		}
		
	}
	
	function fn_onSnickersDown (e) {
		e.preventDefault();
		AD.mouseIsDown = true;
		AD.activeSnicker = this.id;
		
		gsap.to(AD.instruction, 0.2, {autoAlpha:0});
		gsap.set(AD.snickers,{zIndex:0});
		gsap.set(this,{zIndex:1, scale:0.8});
		
	}
	
	function fn_onSnickersUp (e) {
		if(AD.gametime){
			AD.mouseIsDown = false;
			if(AD.correct) {
				AD.incorrect = [false, false, false];
			} else {
				fn_resetSnickers();
			}
			AD.correct = false;			
			fn_checkHit();
			fn_hoverOut();
		}
	}
	
	function fn_onSnickersOver (e) {
		AD.wiggle = 10;
		wiggle(this);
	}
	
	function fn_checkHit() {
		var n = 0;
		while(n < 3){
			if( collision(AD.crosshair, $('#target0')) && AD.activeSnicker == 'btn_snickers0' ) {
				fn_result(AD._char0, '-561px');
				fn_confetti ('spr_chili');
				gsap.fromTo(AD.highlight, 0.2, {left:10, autoAlpha:0}, {autoAlpha:1});
				$('#target0').hide();
			}
			if( collision(AD.crosshair, $('#target1')) && AD.activeSnicker == 'btn_snickers1' ) {
				fn_result(AD._char1, '-561px');
				fn_confetti ('spr_bean');
				gsap.fromTo(AD.highlight, 0.2, {left:252, autoAlpha:0}, {autoAlpha:1});
				$('#target1').hide();
			}
			
			if( collision(AD.crosshair, $('#target2')) && AD.activeSnicker == 'btn_snickers2' ) {
				fn_result(AD._char2, '-561px');
				fn_confetti ('spr_caramel');
				gsap.fromTo(AD.highlight, 0.2, {left:496, autoAlpha:0}, {autoAlpha:1});
				$('#target2').hide();
			}		
		n++;
		}
		
		gsap.set(AD.crosshair,{left: 0, top:0, x:0,y:0 });
	}
	
	function fn_checkHover() {
		if(AD.mouseIsDown){
			var n = 0;
			while(n < 3){
				if(collision(AD.crosshair, $('#target'+n))){

					if( collision(AD.crosshair, $('#target0')) && !AD.incorrect[0]) {
						if(AD.activeSnicker == 'btn_snickers0'){
							fn_result(AD._char0, '-561px');
							AD.correct = true;
						} 
						else {
							fn_result(AD._char0, '-296px');
							fn_checkEnd();
							AD.sndURL[4].currentTime = 0;
							AD.sndURL[4].play();
							AD.wiggle = 20;
							wiggle(AD.char0);
						}
						AD.incorrect[0] = true;
					} 
					
					if( collision(AD.crosshair, $('#target1')) && !AD.incorrect[1]) {
						if(AD.activeSnicker == 'btn_snickers1'){
							fn_result(AD._char1, '-561px');
							AD.correct = true;
						} 
						else {
							fn_result(AD._char1, '-296px');
							fn_checkEnd();
							AD.sndURL[3].currentTime = 0;
							AD.sndURL[3].play();
							AD.wiggle = 20;
							wiggle(AD.char1);
							
						}
						
						AD.incorrect[1] = true;
						
					}

					if( collision(AD.crosshair, $('#target2')) && !AD.incorrect[2]) {
						if(AD.activeSnicker == 'btn_snickers2'){
							fn_result(AD._char2, '-561px');
							AD.correct = true;
						} 
						else {
							fn_result(AD._char2, '-296px');
							fn_checkEnd();
							AD.sndURL[2].currentTime = 0;
							AD.sndURL[2].play();
							AD.wiggle = 20;
							wiggle(AD.char2);
						}
						AD.incorrect[2] = true;
					}
				}	
			n++;
			}
		}
	}
	
	function fn_hoverOut() {
		AD.correct = false;
		if(AD.incorrect[0]) {
			fn_result(AD._char0, '-31px');
			AD.incorrect[0] = false;
		}
		if(AD.incorrect[1]) {
			fn_result(AD._char1, '-31px');  
			AD.incorrect[1] = false;
		}
		if(AD.incorrect[2]) {
			fn_result(AD._char2, '-31px'); 
			AD.incorrect[2] = false;
		}
	}
	
	function fn_result(char, xPos) {
		gsap.set(char,{backgroundPositionX: xPos});
	}
	
	function fn_resetSnickers() {
		gsap.set(AD.snickers, {top:418, x:0,y:0, scale:1});
		
		gsap.set($('#btn_snickers'+AD.snickersNum[0]), {left: 99});
		gsap.set($('#btn_snickers'+AD.snickersNum[1]), {left: 295});
		gsap.set($('#btn_snickers'+AD.snickersNum[2]), {left: 491});
	}
	
	function fn_confetti (e) {
		$('#'+AD.activeSnicker).hide();
		
		var content = document.getElementById('confetti'),
    		images = [],
			total_image = 30,
            w = -100 ,
            h = 2600;
		
		if(e == 'spr_chili'){
			images = ['chili_0','chili_1','chili_2','chili_3','chili_4','chili_5'];
			gsap.set(AD.spr_message, {backgroundPositionY:'0px'});
		}
			
		else if(e == 'spr_bean'){
			images = ['bean_0','bean_1','bean_2','bean_3','bean_4','bean_5'];
			gsap.set(AD.spr_message, {backgroundPositionY:'-36px'});
		}
			
		else{
			images = ['caramel_0','caramel_1','caramel_2','caramel_3','caramel_4','caramel_5'];
			gsap.set(AD.spr_message, {backgroundPositionY:'-72px'});
		}
			
		
        for (i=0; i<total_image; i++){
             if (total_image === 0) { break; }
           var Div = document.createElement('div');
           var random_image = images[Math.floor(Math.random() * images.length)];
           gsap.set(Div,{
				className: e + ' ' + random_image,
		   		scale: R(0.5,1),
			   	left: R(-50,680),
			    top: R(-700,-50),
			   	rotation: R(-360,360)
		   });
           content.appendChild(Div);
           animm(Div);
        }

         function animm(elm){
           gsap.to(elm,R(1.8,5),{y:h,ease:'none'});
           gsap.to(elm,R(2,4),{x:'+=100', rotationZ:R(-360,360),repeat:-1,yoyo:true,ease:'sine.inOut'});
           gsap.to(
               elm,R(2,5),{
                   repeat:1,
                   yoyo:true,
                   ease:'sine.inOut',
                   delay:-5});
         }

        function R(min,max) {return min+Math.random()*(max-min);}

        setTimeout(evt_content,3500);
        
        function evt_content() {
            for (i=0; i<images.length; i++){
				
				gsap.to(AD.confetti, 0.2,{alpha:0, onComplete: end});
            }
							
			function end () {
				AD.confetti.hide();
				AD.confetti.html('');
			}
        }
		
		gsap.set([AD.confetti,AD.spr_message], {autoAlpha:1, display:'block'});		
		gsap.to([AD.highlight,AD.spr_message], 0.2, {delay:3.5,autoAlpha:0, onComplete: fn_checkEnd});
		AD.sndURL[5].play();
	}
	
	function collision($div1, $div2) {
		var x1 = $div1.offset().left / AD.scale,
			y1 = $div1.offset().top / AD.scale,
			h1 = $div1.outerHeight(true),
			w1 = $div1.outerWidth(true),
			b1 = y1 + h1,
			r1 = x1 + w1,
			x2 = $div2.offset().left / AD.scale,
			y2 = $div2.offset().top / AD.scale,
			h2 = $div2.outerHeight(true),
			w2 = $div2.outerWidth(true),
			b2 = y2 + h2,
			r2 = x2 + w2;

		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
		return true;
	}
	
	function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
	
	function wiggle(selector){
	 	$(selector).each(function() {
		wiggleProp(this, 'rotation', -5, 5);
		wiggleProp(this, 'x', -5, 5);
		wiggleProp(this, 'y', -5, 5);
	 });
	}
	
	function wiggleProp(element, prop, min, max) {

		if(AD.wiggle == AD.zero) {
			gsap.set(element, {rotation:0,x:0,y:0});
		} else {
			AD.wiggle--;
			var tweenProps = {
				ease: 'power1.inOut',
				onComplete: wiggleProp,
				onCompleteParams: [element, prop, min, max]
			};

			tweenProps[prop] = Math.random() * (max - min) + min;

			gsap.to(element, 0.04, tweenProps);
		}
	
	}
	
	/* function fn_scaling() {
		var transform = $('#ad_container').css('transform');
		if(transform != 'none' ){
			var values = transform.split('(')[1],
				values = values.split(')')[0],
				values = values.split(',');
			var a = values[0];
			var b = values[1];
			AD.scale = Math.sqrt(a*a + b*b);
		}
		else
			AD.scale = 1;
	} */
			
	return {
		fn_STEP1 	: fn_STEP1,
		fn_STEP2 	: fn_STEP2,
		/* fn_scaling	: fn_scaling */
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
		/*AD.btn_sound	= $( '#btn_sound' );
		AD.sound		= $( '#sound' );*/
		AD.initSound	= true;
		
		AD.sndURL = [
			new Audio('src/audio/bgm.mp3'),
			new Audio('src/audio/sfx_AllCorrect.mp3'),
			new Audio('src/audio/sfx_IndecisiveIncorrect.mp3'),
			new Audio('src/audio/sfx_IrritableIncorrect.mp3'),
			new Audio('src/audio/sfx_WimpyIncorrect.mp3'),
			new Audio('src/audio/sfx_CorrectSound.mp3')
		];
		
		AD.sndURL[0].volume = 0.2;
		AD.sndURL[0].loop = true;
		
		/* AD.sndURL[0].muted = false;
		AD.sndURL[0].play();
		AD.initSound = false; */
		
		for (let i = 1; i < AD.sndURL.length; i++) { 
			AD.sndURL[i].volume = 0.7;
		}
	}
	
	function fn_sound () {		
		var isMuted = AD.sound.hasClass( 'mute' );
		if ( isMuted ) {
			AD.sound.removeClass('mute');
			AD.sndURL[0].muted = false;
		}
		else {
			AD.sound.addClass('mute');
			AD.sndURL[0].muted = true;
		}
	}
	
	// public
	return {
		init : init
	};

})();

TXAd.init();

})();