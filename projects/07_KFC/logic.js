/* Project: KFC | Developer: Neptali Calonge | Date: Mar 01, 2018 */
(function () {

var TXConfig = (function () {
		// ADD INITIAL IMAGES HERE [GIF,PNG,JPG]:
	var init_Images = [		
        'src/logo.png', //logo
		'src/scoreboard.png', //scoreboard
		'src/cta.png', //cta
		'src/btn_play.png', //btn_play
		'src/btn_replay.png', //btn_replay
		'src/colonel.png', //colonel
		'src/ball.png', //ball
		'src/bg_instruction.png', //bg_instruction
		'src/field.png', //field
        'src/crowd.png'  //crowd
	],
		// ADD OTHER IMAGES HERE [GIF,PNG,JPG]:
		other_Images = [
		'src/sprite.png', //sprite
		'src/touchdown.png', //touchdown
		'src/confetti.png', //confetti
		'src/bigbucket.png'  //bigbucket
	],		
		// ADD EXTERNAL JAVSCRIPTS HERE [JS]:
        init_JS = [
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
        	'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/Draggable.min.js'
			
	],
        loadedAssets = 0,
		otherAssets = 0,
        totalAssets = init_Images.length + init_JS.length,
		stageScale = 1,
		is_mobile = ("ontouchstart" in document.documentElement) ? true : false;	
	
	return {
		loadedAssets    : loadedAssets,
		totalAssets     : totalAssets,
		init_Images     : init_Images,
		init_JS			: init_JS,
		other_Images	: other_Images,
		otherAssets		: otherAssets,
		is_mobile		: is_mobile,
		stageScale		: stageScale
	};

})();

/**SET UP ACTUAL CREATIVE HERE:
 * @adStart() - Your ad should begin here.
 * @adEnd() - Stop any running videos, sounds, etc.
 */
var TXAd = (function () {
    
	function init () {

		loadImages ( TXConfig.init_Images );
		loadScripts( TXConfig.init_JS );
	}

	function loadImages ( urls ) {
		for ( let i = 0; i < urls.length; i++ ) {
			var url = urls[i];
			$( '<img />' ).attr( 'src', url ).on('load', updateAssetsLoaded);
		}
	}
	
	function loadotherImages ( urls ) {
		for ( let i = 0; i < urls.length; i++ ) {
			var url = urls[i];
			$( '<img />' ).attr( 'src', url ).on('load', otherImagesLoaded);
		}
	}
    
	function loadScripts ( urls ) {
		for ( let i = 0; i < urls.length; i++ ) {
			var url = urls[i];
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
		//*** VIDEO VARS ***//
		AD.currentVideo	= 0;
		AD.videoStatus	= [ false, false, false, false ]; // [ start, 25%, 50%, 75% ]
		AD.replay		= false;
		AD.videoHolder	= $( '#videoHolder' );
		AD.videoPlayer	= $( '#videoPlayer' );
		AD.video		= $( '#video1' );
		AD.vidInit		= true;
		AD.vidURL	= [
			'src/video/badcall.mp4', //Bad Call
			'src/video/slap.mp4', //Slap
			'src/video/icebath.mp4'  //Ice Bath
		];

		// ADD VARIABLES FOR HTML ID ELEMENTS HERE [#id]:
		AD.btn_videosound	= $( '#btn_videosound' );
		AD.btn_videoplay	= $( '#btn_videoplay' );
		AD.txt_usearrowkeys	= $( '#txt_usearrowkeys' );
		AD.txt_tomove		= $( '#txt_tomove' );
		AD.colonel			= $( '#colonel' );
		AD.ball				= $( '#ball' );
		AD.txt_headline		= $( '#txt_headline' );
		AD.txt_title		= $( '#txt_title' );
		AD.instruction		= $( '#instruction' );
		AD.btn_play			= $( '#btn_play' );
		AD.STEP_1			= $( '#STEP_1' );
		AD.STEP_3			= $( '#STEP_3' );
		AD.confetti1		= $( '#confetti1' );
		AD.confetti2		= $( '#confetti2' );
		AD.btn_playagain	= $( '#btn_playagain' );
		
		// TXGAME:
		AD.field 			= $('#field');
		AD.crowd 			= $('#crowd');
		AD.player 			= $('#player');
		AD.character 		= $('#character');
		AD.stars 			= $('#stars');
		AD.plus 			= $('#plus');
		AD.touchdown 		= $('#touchdown');		
		AD.items 			= $('.items');
		AD.itemInterval 	= null;
		AD.endInterval 		= null;
		AD.currentItem		= 4;
		AD.currentPlayer	= 263;
		AD.currentItems 	= [];	
		AD.options	 		= [0,1,2,3,4,5];
		AD.ready			= true;		
		AD.itemSpeed 		= 1.961;
		
		// ADD VARIABLES FOR HTML CLASS ELEMENTS HERE [.class]:
		AD.button			= $( '.button' );
		
		// ADD OTHER VARIABLES HERE: 
		AD.timer		= null;
		AD.userInit		= false;
		AD.zero			= 0;
		
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
		var rand = Math.random();
		
		if (rand < 1/3){
			AD.videoHolder.addClass('IceBath');
			AD.currentVideo = 2;
		}			
		else if (rand < 2/3){
			AD.videoHolder.addClass('Slap');
			AD.currentVideo = 1;
		}
		else 
			AD.currentVideo = 0;
		
		AD.button.on( 'click', fn_buttons);	
		
		// LOAD OTHER IMAGES:
		TXAd.loadotherImages(TXConfig.other_Images);
		
		TX_Game.INIT();
		TX_Controller.INIT();
		TXVideo.init();
		TXAudio.init();	
		
		fn_headline();
	}
	
	function fn_STEP2 () {
		// LOAD GAME
		gsap.set('#game_container', {top:0});
		TX_Game.START();
	}
	
	function fn_STEP3 () {
		gsap.set(AD.STEP_3,{zIndex:3});
		AD.STEP_3.show();
		AD.confetti1.show();
		AD.confetti1.addClass('animate');
		gsap.fromTo(AD.confetti1,0.8,{top:-680},{top:0, ease:'none', onComplete: function(){
			gsap.delayedCall(15, fn_outconfetti12);
		}});
		
		function fn_outconfetti12 () {
			
			AD.confetti2.addClass('animate');			
			gsap.fromTo(AD.confetti1,1,{top:0},{top:680});
			gsap.fromTo(AD.confetti2,2,{top:-680},{top:680, onComplete: function(){
				AD.confetti1.removeClass('animate');
				AD.confetti2.removeClass('animate');
				AD.crowd.removeClass('animate');
				AD.character.removeClass('dance');
			}});
		}
	}
	
	function fn_buttons () {
		switch (this.id) {
			case 'btn_videoplay':
				AD.userInit = true;
				AD.video.get(0).muted = false;
                AD.video.get(0).volume = 1;
                AD.video.get(0).removeAttribute('muted');
                TXVideo.playVideo();
				break;
			case 'btn_videosound':	
				AD.btn_videosound.hide();
				AD.userInit = true;
				AD.video.get(0).muted = false;
				AD.video.get(0).volume = 1;
				AD.video.get(0).removeAttribute('muted');
				break;
			case 'btn_play':
				AD.sndURL[0].play();
				AD.STEP_1.hide();
				fn_STEP2();
				break;	
			case 'btn_playagain':
				AD.sndURL[4].play();
				AD.STEP_3.hide();
				TX_Game.RESET();
				fn_STEP2();								
				break;
			case 'LOGOPANEL':
				window.open("https://www.kfc.com/", "_blank");
				break;
			case 'btn_cta':
				window.open("https://www.kfc.com/store-locator/", "_blank");			
				break;
			case 'btn_fb':
				window.open("https://www.facebook.com/KFC/", "_blank");
				break;
			case 'btn_tw':
				window.open("https://twitter.com/kfc/", "_blank");
				break;
			case 'btn_in':
				window.open("https://www.instagram.com/kfc/", "_blank");
				break;
		}
	}
		
	function fn_headline () {
		gsap.fromTo(AD.ball,1,{left:660, rotation:20},{left:-124, rotation:-20, ease:'none'});
		gsap.fromTo(AD.ball,0.5,{top:160},{top:40, ease:Power1.easeOut, onComplete: function(){
			gsap.fromTo(AD.ball,0.5,{top:40},{top:160, ease:Power1.easeIn, onComplete: fn_complete});
		}});
		
		function fn_complete () {
			gsap.delayedCall(1, fn_instruction);
		}
		
	}
	
	function fn_instruction () {
		AD.txt_headline.hide();
		gsap.fromTo([AD.txt_title, AD.instruction, AD.btn_play],0.5,{display:'block', alpha:0},{alpha:1});
		gsap.fromTo(AD.colonel,0.5,{display:'block',left:-196},{left:0, onComplete: fn_speak});
		
		function fn_complete() {
			AD.colonel.removeClass('speak');
			gsap.delayedCall(2, function () {
				AD.colonel.addClass('speak');
				gsap.delayedCall(0.5, function () {
					AD.colonel.removeClass('speak');
				});
			});
		}
		
		function fn_speak () {
			var tl = new TimelineLite({onComplete: fn_complete});
			// letter animation
			tl.set(AD.txt_usearrowkeys, { width: 18 })
			  .set(AD.txt_usearrowkeys, { width: 36 }, 1)
			  .set(AD.txt_usearrowkeys, { width: 54 }, 2)
			  .set(AD.txt_usearrowkeys, { width: 67 }, 3)
			  .set(AD.txt_usearrowkeys, { width: 86 }, 4)	
			  .set(AD.txt_usearrowkeys, { width: 105}, 5)	
			  .set(AD.txt_usearrowkeys, { width: 123}, 6)
			  .set(AD.txt_usearrowkeys, { width: 142}, 7)
			  .set(AD.txt_usearrowkeys, { width: 170}, 8)
			  .set(AD.txt_usearrowkeys, { width: 182}, 9)
			  .set(AD.txt_usearrowkeys, { width: 201}, 10)
			  .set(AD.txt_usearrowkeys, { width: 220}, 11)
			  .set(AD.txt_usearrowkeys, { width: 239}, 12)
			  .set(AD.txt_usearrowkeys, { width: 270}, 13)	  
			  .set(AD.txt_tomove, { width: 18}, 14)
			  .set(AD.txt_tomove, { width: 37}, 15)
			  .set(AD.txt_tomove, { width: 48}, 16)
			  .set(AD.txt_tomove, { width: 76}, 17)
			  .set(AD.txt_tomove, { width: 95}, 18)
			  .set(AD.txt_tomove, { width: 114}, 19)
			  .set(AD.txt_tomove, { width: 270}, 20);
			AD.colonel.addClass('speak');
			tl.duration(0.7).play();
		}
		
	}
			
	return {
		fn_STEP1 : fn_STEP1,
		fn_STEP3 : fn_STEP3
	};

})();

/********************************************************************** CONTROLLER
	 * TX_Controller.INIT();			- create controller
	 * TX_Controller.START();			- start controller
	 * TX_Controller.RESET();			- reset controller
	 */
var TX_Controller = (function() {
		
	var script = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/Draggable.min.js',

	container 			= '#container #controller_container',
	mid_btn 			= '#container #controller_mid_btn',
	up_btn 				= '#container #controller_up_btn',
	down_btn 			= '#container #controller_down_btn',
	player				= '#container #player',
	btn					= '#container .controller_btn',

	active				= false,
	keymoveup			= null,
	currentLane			= 1,
	keyReady			= true,
		
	INIT = function() {
		$.getScript(script, CONFIG);
	},

	CONFIG = function() {
		let _containerLeft          = 0,
			_containerTop        	= 0,
			_containerWidth         = 660,
			_containerHeight        = 500,
			_containerColor         = 'rgba(0,0,255,0)',
			_thumbWidth         	= 660,
			_thumbHeight        	= 500,
			_playerPosition			= gsap.getProperty(player, 'top');

		$('#MAINPANEL').append(
			"<div id='controller_container'>" +
				"<div id='controller_mid_btn'></div>" +
				"<div id='controller_up_btn' class='controller_btn'></div>" +
				"<div id='controller_down_btn' class='controller_btn'></div>" +
			"</div>"			
		);

		$(container).css({
			left: _containerLeft,
			top: _containerTop,
			width: _containerWidth,
			height: _containerHeight,
			backgroundColor: _containerColor,
			display: 'none'
		});

		$(mid_btn).css({
			top: 0,
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(255,0,255,0)'
		});
		
		$(up_btn).css({
			top: _playerPosition - _thumbHeight - 40,
			width: _thumbWidth,
			height: _thumbHeight,
			backgroundColor: 'rgba(0,0,255,0)'
		});

		$(down_btn).css({
			top: _playerPosition + 20,
			width: _thumbWidth,
			height: _thumbHeight,
			backgroundColor: 'rgba(255,0,0,0)'
		});

		ADD_EVENTS();
	},

	ADD_EVENTS = function() {
		if(!TXConfig.is_mobile) {
			$(container).hide();
			$(document).keydown(KEYPRESS_ON);
			$(document).keyup(KEYPRESS_OFF);
		} else {
			$(btn).bind('touchstart mousedown', KEYPRESS_ON);
			$(btn).bind('touchend mouseup', KEYPRESS_OFF);
			Draggable.create(mid_btn, {
				zIndexBoost:false,
				type:"y",
				onDrag: function() { 
					if(this.y < 0) MOVE_UP();
					else if(this.y > 0) MOVE_DOWN();
				},
				onDragEnd: function() {
					KEYPRESS_OFF();
				  	gsap.set(mid_btn, {y:0}); 
				}
			});
		}
	},

	KEYPRESS_ON = function(e) {
		if(e.keyCode == 38 || this.id == 'controller_up_btn') {
			e.preventDefault();
			MOVE_UP();
		}
		else if(e.keyCode == 40 || this.id == 'controller_down_btn') {
			e.preventDefault();
			MOVE_DOWN();
		}
	},

	MOVE_UP = function () {
		active = true;
		keymoveup = true;
	},

	MOVE_DOWN = function () {
		active = true;
		keymoveup = false;
	},

	ON_KEYMOVE = function(e) {
		if(active) {
			let lanes		= [132,263,394],
				contentPosY	= [-125,0,125],
				speed		= 0.3;
				
			if(keymoveup) {
				if(currentLane !== 0 && keyReady) {
					keyReady = false;
					currentLane--;
					gsap.to(container, speed,{top:contentPosY[currentLane], ease:'none'});
					gsap.to(player, speed,{top:lanes[currentLane], ease:'none', onComplete: ()=> keyReady = true });
				}
			}
			else {
				if(currentLane < (lanes.length-1) && keyReady) {
					keyReady = false;
					currentLane++;
					gsap.to(container, speed,{top:contentPosY[currentLane], ease:'none'});
					gsap.to(player, speed,{top:lanes[currentLane], ease:'none', onComplete: ()=> keyReady = true});
				}
			}
		}		
	},

	KEYPRESS_OFF = function(e) {
		active = false;
	},

	START = function(e) {
		if(!TXConfig.is_mobile) {
			$(container).hide();
			$(document).keydown(KEYPRESS_ON);
			$(document).keyup(KEYPRESS_OFF);
		} else {
			$(container).show();
			$(btn).bind('touchstart mousedown', KEYPRESS_ON);
			$(btn).bind('touchend mouseup', KEYPRESS_OFF);
		}
		gsap.ticker.add(ON_KEYMOVE);
	},

	RESET = function(e) {
		active = false;
		currentLane = 1;

		$(container).css({top: 0});

		if(!TXConfig.is_mobile) {
			$(document).off('keydown');
			$(document).off('keyup');
		} else {
			$(container).hide();
			$(btn).unbind('touchstart mousedown');
			$(btn).unbind('touchend mouseup');
			
		}
		gsap.ticker.remove(ON_KEYMOVE);
	},

	STOP = function(e) {
		active = false;
		if(!TXConfig.is_mobile) {
			$(document).off('keydown');
			$(document).off('keyup');
		} else {
			$(container).hide();
			$(btn).unbind('touchstart mousedown');
			$(btn).unbind('touchend mouseup');
			
		}
		gsap.ticker.remove(ON_KEYMOVE);
	};
		
	return {
		INIT 	: INIT,
		START	: START,
		RESET	: RESET,
		STOP	: STOP
	};
	
})();

var TX_Game = (function() {

	var script = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/TextPlugin.min.js',

	content		= '#game_content',
	lanes		= [150,282,416],
	score		= 0,
	npc			= {
				origin: 660,
				width: 50,
				height: 60,
				positions: [0,2,1,0,1,2,0,2,1,0,1,2,1,0,1,2,0,2,1,0,1,2,1,0,1,2,0,2,1,0,1,2,1,0,1,2,0,2,1,0],
				speed: 1.82,
				interval: 0.6,
				current_count: 0,
				max_count: 40,
				url: 'src/sprite.png'
			},

	INIT = function() {
		$.getScript(script);
		//gsap.ticker.lagSmoothing(false); //continues animation when a tab is inactive
	},

	START = function() {
		ANIMATE_BG();
		ANIMATE_PLAYER();
		ANIMATE_NPC();
		TX_Controller.START();
	},

	RESET = function() {
		let player 	= '#player';

		npc.current_count = 0;
		score = 0;

		STOP();
		UPDATE_SCORE(score);
		TX_Controller.RESET();

		$("div.npc").remove();
		gsap.set(player, {top:263, left:80});
		gsap.set(AD.touchdown, {right:-360});
		AD.character.removeClass('dance');
	},

	STOP = function() {
		TX_Controller.STOP();
		gsap.killTweensOf('.npc, .npc div');
		gsap.killTweensOf(ANIMATE_NPC);
	},

	CREATE_NPC = function(n) {
		let id 		= '#npc_' + n,
			items	= ['bucket', 'chicken', 'opponent1', 'opponent2'];

		$(content).prepend(
			"<div id='npc_" + n + "' class='npc' >" +
				"<div class='sprite shadow'></div>" +
				"<div class='items sprite'></div>" +
			"</div>"			
		);

		$(id).css({
			left: npc.origin,
			top: lanes[npc.positions[n]],
			width: npc.width,
			height: npc.height-2
		});

		if(npc.positions[n]==2) gsap.set(id,{zIndex:1});

		$(id + ' div').css({
			left: -40,
			top: -130
		});

		$(id + ' .items').addClass(items[Math.floor(Math.random()*items.length)]);

		switch (npc.positions[n]) {
			case 0: $(id).addClass('top'); break;
			case 1: $(id).addClass('mid'); break;
			case 2: $(id).addClass('bot');  break;
		}
	},

	ANIMATE_BG = function() {
		gsap.fromTo(AD.field,0.8,{left:0},{left:-355, ease:'none', repeat:-1});
		gsap.fromTo(AD.crowd,0.9,{left:0},{left:-353, ease:'none', repeat:-1});
		AD.crowd.addClass('animate');
	},

	ANIMATE_PLAYER = function() {
		AD.character.addClass('run');
		AD.player.show();
	},

	ANIMATE_HIT = function(npc) {
		var currentitem = npc + ' .items';

		if($(currentitem).hasClass('bucket')) {			
			AD.sndURL[1].currentTime = 0;
			AD.sndURL[1].play();
			score +=10;
			document.getElementById('plus').innerHTML = '+10';
			gsap.fromTo(AD.plus,0.4,{alpha:1, top: -20},{alpha:0, top: -100, ease:'power2.in'});
			UPDATE_SCORE(score);
			$(npc).hide();
		} else if($(currentitem).hasClass('chicken')) {
			AD.sndURL[2].currentTime = 0;
			AD.sndURL[2].play();
			score +=5;
			document.getElementById('plus').innerHTML = '+5';				
			gsap.fromTo(AD.plus,0.4,{alpha:1, top: -20},{alpha:0, top: -100, ease:'power2.in'});
			UPDATE_SCORE(score);
			$(npc).hide();
		} else if ($(currentitem).hasClass('opponent1') || $(currentitem).hasClass('opponent2')) {
			AD.sndURL[3].currentTime = 0;
			AD.sndURL[3].play();
			AD.ready = false;
			gsap.fromTo(AD.character,2.8,{alpha:0.5},{alpha:0.5, onComplete: fn_ready});		
			AD.stars.addClass('animate');
		}

		function fn_ready () {
			gsap.set(AD.character,{alpha:1});
			AD.ready = true;
			AD.stars.removeClass('animate');
		}
	},

	ANIMATE_NPC = function() {
		let count 		= npc.current_count,
			max_count 	= npc.max_count,
			speed 		= npc.speed,
			width 		= npc.width,
			interval	= npc.interval,
			$npc		= '#npc_'+count;

		CREATE_NPC(count);

		gsap.to($npc, {
			duration:speed,
			left:-Math.abs(width+100), 
			ease:'none',
			onUpdate: ()=> HITCHECK(count),
			onComplete: ()=> ENDCHECK(count)
		});

		if($($npc+' .items').hasClass("chicken") || $($npc+' .items').hasClass("bucket")) $($npc+' .shadow').show();

		if(count < max_count-1) gsap.delayedCall(interval, ANIMATE_NPC);

		npc.current_count +=1;
	},

	HITCHECK = function(n) {
		let player 		= '#crosshair',
			id			= '#npc_'+n,
			playerPosY	= $('#player').offset().top / TXConfig.stageScale;
			
		if(COLLISION($(player), $(id))){
			if(AD.ready) {
				$(id).removeClass('ready');
				ANIMATE_HIT(id);
			}
			//ENDCHECK(n);
		}

		if(playerPosY <= 253){
			//TOP
			if($(id).hasClass('top')) $(id).css('z-index', 0);
			$(player).css('z-index', 1);
			if($(id).hasClass('mid')) $(id).css('z-index', 2);
		}
		else if(playerPosY >= 273){
			//TOP
			if($(id).hasClass('mid')) $(id).css('z-index', 0);
			if($(id).hasClass('top')) $(id).css('z-index', 0);
			$(player).css('z-index', 1);
		}

	},

	UPDATE_SCORE = function(n) {
		let txt_score= '#score';
		if(n <=9) gsap.set(txt_score, {text:'00' + n});
		else if(score <=99) gsap.set(txt_score, {text:'0' + n});
		else gsap.set(txt_score, {text:n});
	},

	ENDCHECK = function(n) {
		let max_count 	= npc.max_count-1;

		$('#npc_'+n).remove();
		
		if(n === max_count-1) {
			TX_Controller.STOP();
			ENDGAME();
		}
	},

	ENDGAME = function() {
		gsap.fromTo(AD.touchdown,0.81,{right:-360},{/* delay:0.22, */ delay:0.14, right:0, ease: 'none', onComplete: function(){
			gsap.killTweensOf(AD.field);
			/* gsap.set(AD.field,{left:-89}); */
			gsap.killTweensOf(AD.crowd);
			gsap.fromTo(AD.player,1,{left: 80},{left:580, ease: 'none', onComplete: fn_dance});
		}});
		
		function fn_dance () {
			AD.character.removeClass('run');			
			AD.character.addClass('dance');
			AD.stars.removeClass('animate');
			gsap.set(AD.character,{alpha:1});
			document.getElementById('txt_points').innerHTML = 'You got ' + AD.score + ' points. Nice job!';
			TXCreative.fn_STEP3();
		}
	},

	COLLISION = function($div1, $div2) {
		var x1 = $div1.offset().left / TXConfig.stageScale,
			y1 = $div1.offset().top / TXConfig.stageScale,
			h1 = $div1.outerHeight(true),
			w1 = $div1.outerWidth(true),
			b1 = y1 + h1,
			r1 = x1 + w1,
			x2 = $div2.offset().left / TXConfig.stageScale,
			y2 = $div2.offset().top / TXConfig.stageScale,
			h2 = $div2.outerHeight(true),
			w2 = $div2.outerWidth(true),
			b2 = y2 + h2,
			r2 = x2 + w2;

		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
		else return true;
	},

	R = function(min,max) {return min+Math.random()*(max-min);};

	return {
		INIT 	: INIT,
		START	: START,
		RESET	: RESET,
		STOP	: STOP
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
		AD.initSound	= false;
		AD.sndURL		= [
			new Audio('src/audio/bgm.mp3'),
			new Audio('src/audio/chickenbucket.mp3'),
			new Audio('src/audio/chickenpiece.mp3'),
			new Audio('src/audio/hurt.mp3'),
			new Audio('src/audio/playagain.mp3')
		];
		
		AD.sndURL[0].loop = true;
		
		/** AUDIO CONTROLS:
		 * CHANGE VOLUME [0-1]: 	AD.sndURL[0].volume = 0.5;
		 * SET LOOP [true/false]: 	AD.sndURL[0].loop = true;
		 * PLAY AUDIO:				AD.sndURL[0].play();
		 */
		
		AD.btn_sound.on( 'click', fn_sound);
		if(TXConfig.is_safari) AD.sound.addClass( 'mute' );
	}
	
	function fn_sound () {	
		var isMuted = AD.sound.hasClass( 'mute' );
		if ( isMuted ) {
			AD.sound.removeClass('mute');			
			if(AD.btn_videoplay.is(':visible')){
				for(let i=0; i <=4; i++) {
					AD.sndURL[i].muted = false;
				}
			}
			AD.video.get(0).muted = false;
			AD.btn_videosound.hide();
			AD.video.get(0).muted = false;
			AD.video.get(0).volume = 1;
				AD.video.get(0).removeAttribute('muted');
		}
		else {
			AD.sound.addClass('mute');
			for(let i=0; i <=4; i++) {
				AD.sndURL[i].muted = true;
			}
			AD.video.get(0).muted = true;
		}
	}
	
	// public
	return {
		init : init
	};

})();

/**###################################################
 * SET UP VIDEO HERE
 * ###################################################
 */
var	TXVideo = (function () {

	function init () {
		AD.sound = $( '#sound' );
		AD.video.on( 'play', videoStarted );
		AD.video.on( 'ended', videoEnded );
		AD.video.on( 'timeupdate', videoProgress );
		AD.video.on( 'error', videoError);
		
		if(!TXConfig.is_safari) AD.video.on( 'playing', videoPlaying);

		if ( AD.video.attr( 'autoplay' ) ) AD.videoPlayer.show();

		AD.video.get(0).src = AD.vidURL[AD.currentVideo];
		AD.video.get(0).load();		
		AD.video.get(0).volume = 0;		
		
		if(!AD.userInit) AD.timer = setTimeout(function() { AD.btn_videoplay.show(); }, 4000);
		
	}
	
	function videoPlaying () {
		AD.video.off( 'playing' );
		AD.video.get(0).removeAttribute('autoplay');
		AD.video.get(0).removeAttribute('muted');
		
		if(AD.sound.hasClass('mute')){
			AD.video.get(0).muted = true;
		} else {
			AD.video.get(0).muted = false;
			AD.video.get(0).volume = 1;
		}
	}
	
	function videoError () {
		AD.video.get(0).src = AD.vidURL[0];
		AD.video.get(0).load();
		AD.video.get(0).volume = 0;	
		playVideo();
	}

	function destroy () {

		var videoPlayerMarkup = AD.videoPlayer.html();
		videoPlayerMarkup = $( videoPlayerMarkup ).removeAttr( 'autoplay' );

		AD.video.off( 'play' );
		AD.video.off( 'ended' );
		AD.video.off( 'timeupdate' );
		AD.video.on( 'error' );

		AD.videoPlayer.html('');
	}

	function playVideo () {
		AD.videoHolder.show();
		AD.btn_videoplay.hide();
		
		if (AD.replay){
			AD.userInit = true;
			AD.replay = false;
		}
		
		AD.video.get(0).play();
	}

    function pauseVideo () {
		AD.btn_videoplay.show();
		AD.video.get(0).pause();
	}
  
	function videoStarted () {
		
		if ( AD.videoStatus[0] ) return;
		
		if( !AD.videoStatus[0] && !AD.btn_videoplay.is(":visible") ) AD.videoStatus[0] = true;
		
		// MUTE BGM & SFX
		if(!AD.sndURL[0].muted){
			for(let i=0; i <=4; i++) {
				AD.sndURL[i].muted = true;
			}
		}
		
		if(AD.sound.hasClass('mute')) AD.video.get(0).muted = true;
	}
	
	function videoProgress (e) {
		
		var progress = e.currentTarget.currentTime / e.currentTarget.duration;

		if( !AD.videoStatus[1] && progress >= 0.25 ) AD.videoStatus[1] = true;
		else if ( !AD.videoStatus[2] && progress >= 0.50 ) AD.videoStatus[2] = true;
		else if ( !AD.videoStatus[3] && progress >= 0.75 ) AD.videoStatus[3] = true;
		
		// UPON USER INTERACTION
		if( AD.userInit && !AD.sound.hasClass('mute') ){
			AD.userInit = false;
			AD.video.get(0).muted = false;
			AD.video.get(0).volume = 1;
			AD.video.get(0).removeAttribute('muted');
		}
		
		// UPON VIDEO START PLAYING
		if(e.currentTarget.currentTime >= 0.1 && AD.btn_videoplay.hasClass('init')){
			AD.btn_videoplay.removeClass('init');
			clearTimeout(AD.timer);
			AD.btn_videoplay.hide();
			if(TXConfig.is_mobile && AD.video.prop('muted') || TXConfig.is_safari) AD.btn_videosound.show();
		}

	}

	function videoEnded () {

        AD.video.get(0).removeAttribute('autoplay');
		AD.video.get(0).pause();
		AD.video.get(0).currentTime = 0;
		//AD.videoHolder.hide();
		AD.btn_videosound.hide();
		AD.btn_videoplay.show();
       
		AD.videoStatus	= [false, false, false, false];
		AD.replay = true;
		
		if(!AD.sound.hasClass('mute')){
			for(let i=0; i <=4; i++) {
				AD.sndURL[i].muted = false;
			}
		}
	}
	
	return {
		init		: init,
		destroy		: destroy,
		playVideo	: playVideo,
		pauseVideo	: pauseVideo
	};

})();

TXAd.init();

})();