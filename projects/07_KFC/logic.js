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
		/** SET true IF MOBILE OR false IF DESKTOP [true/false]: */
		is_mobile = false,
		
        loadedAssets = 0,
		otherAssets = 0,
        totalAssets = init_Images.length + init_JS.length,
		
		is_explorer,
		is_chrome = navigator.userAgent.indexOf('Chrome') > -1,
		is_firefox = navigator.userAgent.indexOf('Firefox') > -1,
		is_safari = navigator.userAgent.indexOf("Safari") > -1,
		is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1,
		is_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
		
		if ((is_chrome)&&(is_safari)) is_safari = false;
		if ((is_chrome)&&(is_opera)) is_chrome = false;	
	
		// IE10 || IE11 || IE EDGE
		if (navigator.userAgent.indexOf('MSIE') > -1 ||
			navigator.userAgent.indexOf('Trident/') > -1 || 
			navigator.userAgent.indexOf('Edge/') > -1)
			is_explorer = true;		
	
	return {
		loadedAssets    : loadedAssets,
		totalAssets     : totalAssets,
		init_Images     : init_Images,
		init_JS			: init_JS,
		other_Images	: other_Images,
		otherAssets		: otherAssets,
		is_mobile		: is_mobile,
		is_safari		: is_safari
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
		AD.top_items 		= $('.top_items');
		AD.mid_items 		= $('.mid_items');
		AD.bot_items 		= $('.bot_items');
		AD.itemInterval 	= null;
		AD.endInterval 		= null;
		AD.currentItem		= 4;
		AD.currentPlayer	= 263;
		AD.currentItems 	= [];
		AD.score			= 0;		
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
		
		// LOAD VIDEO:
		TXVideo.init();
		
		// LOAD AUDIO:
		TXAudio.init();	
		
		fn_headline();
	}
	
	function fn_STEP2 () {
		// LOAD GAME
		TXGame.init();
	}
	
	function fn_STEP3 () {
		gsap.set(AD.STEP_3,{zIndex:3});
		AD.STEP_3.show();
		AD.confetti1.show();
		AD.confetti1.addClass('animate');
		gsap.fromTo(AD.confetti1,0.8,{top:-680},{top:0, ease:Power0.easeNone, onComplete: function(){
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
				TXGame.reset();
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
		gsap.fromTo(AD.ball,1,{left:660, rotation:20},{left:-124, rotation:-20, ease:Power0.easeNone});
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

/**###################################################
 * SET UP NEW GAME HERE
 * ###################################################
 */	
var TXGame = (function () {
	
	function init () {
		gsap.fromTo(AD.field,0.8,{left:0},{left:-355, ease:Power0.easeNone, repeat:-1});
		gsap.fromTo(AD.crowd,0.9,{left:0},{left:-353, ease:Power0.easeNone, repeat:-1});

		AD.crowd.addClass('animate');
		AD.character.addClass('run');
		AD.player.show();
		fn_loopitems();		
		window.addEventListener('keydown', fn_keydown, false);
		
		gsap.ticker.add(fn_ticker);
		
		gsap.delayedCall(15, fn_checkendgame);
	}
	
	function fn_ticker () {
		for (var i=0;i<=4;i++){
			fn_checkhit('#top_item' + i);
			fn_checkhit('#mid_item' + i);
			fn_checkhit('#bot_item' + i);
		}
	}
	
	function fn_checkhit(item) {
	  	if(!AD.ready) return;
		var currentitem = item + ' ._items',
			itemhit = Draggable.hitTest(AD.player, $(item));
		if (itemhit && $(item).hasClass('ready') ) {
			$(item).removeClass('ready');
			
			if($(currentitem).hasClass('bucket')) {
				AD.sndURL[1].currentTime = 0;
				AD.sndURL[1].play();
				AD.score +=10;
				document.getElementById('plus').innerHTML = '+10';
				gsap.fromTo(AD.plus,0.4,{alpha:1, top: -20},{alpha:0, top: -100, ease:Power2.easeIn});
				fn_updatescore(item);
			} else if($(currentitem).hasClass('chicken')) {
				AD.sndURL[2].currentTime = 0;
				AD.sndURL[2].play();
				AD.score +=5;
				document.getElementById('plus').innerHTML = '+5';				
				gsap.fromTo(AD.plus,0.4,{alpha:1, top: -20},{alpha:0, top: -100, ease:Power2.easeIn});
				fn_updatescore(item);
			} else if ($(currentitem).hasClass('opponent1') || $(currentitem).hasClass('opponent2')) {
				AD.sndURL[3].currentTime = 0;
				AD.sndURL[3].play();
				AD.ready = false;
				gsap.fromTo(AD.character,2.8,{alpha:0.5},{alpha:0.5, onComplete: fn_ready});		
				AD.stars.addClass('animate');
			}
		}
		
		function fn_ready () {
			gsap.set(AD.character,{alpha:1});
			AD.ready = true;
			AD.stars.removeClass('animate');
		}
	}
	
	function fn_checkendgame () {
		if(AD.field.position().left<= -250){
			fn_endgame();
		} else 
			AD.endInterval = gsap.delayedCall(0.01, fn_checkendgame);
	}
	
	function fn_endgame() {
		AD.itemInterval.kill();
		gsap.fromTo(AD.touchdown,0.8,{right:-360},{delay:1.2, right:0, ease: Power0.easeNone, onComplete: function(){
			gsap.killTweensOf(AD.field);
			gsap.set(AD.field,{left:-89});
			gsap.killTweensOf(AD.crowd);
			gsap.fromTo(AD.player,1,{left: 80},{left:580, ease: Power0.easeNone, onComplete: fn_dance});
			window.removeEventListener('keydown', fn_keydown, false);
		}});
		
		function fn_dance () {
			AD.character.removeClass('run');			
			AD.character.addClass('dance');
			AD.stars.removeClass('animate');
			gsap.set(AD.character,{alpha:1});
			document.getElementById('txt_points').innerHTML = 'You got ' + AD.score + ' points. Nice job!';
			TXCreative.fn_STEP3();
		}
	}

	function fn_keydown (e) {
		switch (e.key) {
			case 'Up': // Up
			case 'ArrowUp':
				e.preventDefault();
				if(AD.currentPlayer !=132) AD.currentPlayer-=131;
				break;
			case 'Down': // Down
			case 'ArrowDown':
				e.preventDefault();
				if(AD.currentPlayer !=394) AD.currentPlayer+=131;
				break;
			default: return;
		}
		gsap.to(AD.player,0.2,{top:AD.currentPlayer,onComplete: function(){
			fn_changeposition(AD.currentPlayer);
		}});
	}
				  
	function fn_changeposition(currentPlayer) {
		gsap.set(AD.top_items,{zIndex:0});
		switch(currentPlayer){
			case 132:
				gsap.set([AD.mid_items,AD.bot_items],{zIndex:2});
				gsap.set(AD.player,{zIndex:1});
			   break;
			case 263:
				gsap.set(AD.mid_items,{zIndex:0});
				gsap.set(AD.bot_items,{zIndex:2});
				gsap.set(AD.player,{zIndex:1});
			   break;
			case 394:
				gsap.set([AD.mid_items,AD.bot_items],{zIndex:1});
				gsap.set(AD.player,{zIndex:2});
			   break;
			
			default: return;
		}
	}
	
	function fn_loopitems () {
		if(AD.currentItem == 4) AD.currentItem = 0;
			else AD.currentItem +=1;

			shuffle(AD.options);
		
			var bot_item = '#bot_item' + AD.currentItem,
				mid_item = '#mid_item' + AD.currentItem,
				top_item = '#top_item' + AD.currentItem;

			fn_changeitem (AD.options[0], bot_item);
			fn_changeitem (AD.options[1], mid_item);
			fn_changeitem (AD.options[2], top_item);

			if(AD.options[0] != 5)
			gsap.fromTo(bot_item, AD.itemSpeed,
				{left:720, display: 'block'},{left:-150, ease:Power0.easeNone});
		
			if(AD.options[1] != 5)
			gsap.fromTo(mid_item, AD.itemSpeed,
				{left:720, display: 'block'},{delay: 0.15, left:-150, ease:Power0.easeNone});
		
			if(AD.options[2] != 5)
			gsap.fromTo(top_item, AD.itemSpeed,
				{left:720, display: 'block'},{delay: 0.35, left:-150, ease:Power0.easeNone});

		AD.itemInterval = gsap.delayedCall( randomNum(0.5, 0.8), fn_loopitems);	
	}
	
	function fn_updatescore(item) {
		$(item).hide();
		if(AD.score <=9)
	  		document.getElementById('score').innerHTML = '00'+ AD.score;
		else if(AD.score <=99)
	  		document.getElementById('score').innerHTML = '0'+ AD.score;
		else
			document.getElementById('score').innerHTML = AD.score;
	}
	
	function fn_changeitem (option,item) {
		var currentitem = item + ' ._items',
			currentshadow = item + ' .shadow';
		
		$(currentitem).removeClass('opponent1');
		$(currentitem).removeClass('opponent2');
		$(currentitem).removeClass('chicken');
		$(currentitem).removeClass('bucket');
		
		$(currentshadow).removeClass('active');
		
		switch(option){
			case 0: // opponent 1
				$(currentitem).addClass('opponent1');
			   break;
			case 1: // opponent 2
				$(currentitem).addClass('opponent2');
			   break;
			case 2:
			case 3: // chicken
				$(currentitem).addClass('chicken');
				$(currentshadow).addClass('active');
			   break;			
			case 4: // bucket
				$(currentitem).addClass('bucket');
				$(currentshadow).addClass('active');
			   break;
		}
		
		$(item).addClass('ready');
	}
	
	function fn_reset () {
		AD.character.removeClass('dance');
		gsap.set(AD.player, {left:80});
		gsap.set(AD.touchdown, {right:-360});
		AD.score = 0;
		AD.ready = true;
		document.getElementById('score').innerHTML = '000';
				
		gsap.ticker.remove(fn_ticker);
	}
	
	function randomNum(min, max) {
		return Math.random() * (max - min) + min;
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

	// public
	return {
		init : init,
		reset : fn_reset
	};

})();

TXAd.init();

})();