/* Project: SunTrust | Developer: Neptali Calonge | Date: Aug 17, 2017 */
(function() {

var TXConfig = (function () {
	
	var creativeImages = [
        'src/bg.jpg',
		'src/img_skater.png',
		'src/spr_banner.png',
		'src/spr_howtoplay.png',
		'src/spr_btn.png',
		'src/spr_audio.png',
		'src/img_chevron.png'
	],
		
		otherImages = [
        'src/spr_skater.png',
		'src/logo.png',
		'src/spr_arw.png',
		'src/spr_callout.png',
		'src/img_targetbox.png',
		'src/img_x.png',
		'src/img_arrowburst.png',
		'src/img_starburst.png',
		'src/img_sparkle.png',
		'src/btn_x.png'
	],
        creativeScripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/CustomEase.min.js'
	],

        loadedAssets = 0,
		otherAssets = 0,
        totalAssets = creativeImages.length + creativeScripts.length;

	return {
		loadedAssets               : loadedAssets,
		totalAssets                : totalAssets,
		creativeImages             : creativeImages,
		creativeScripts            : creativeScripts,
		otherImages				   : otherImages,
		otherAssets				   : otherAssets
	};

})();

/**SET UP ACTUAL CREATIVE HERE:
 * @adStart() - Your ad should begin here.
 * @adEnd() - Stop any running videos, sounds, etc.
 */
var TXAd = (function () {
    
	function init () {
		loadImages ( TXConfig.creativeImages );
		loadScripts( TXConfig.creativeScripts );
	}

	function loadImages ( urls ) {
		for ( var i = 0; i < urls.length; i++ ) {
			var url = urls[i];
			$( '<img />' ).attr( 'src', url ).on('load', updateAssetsLoaded);
		}
	}
	
	function loadotherImages ( urls ) {
		for ( var i = 0; i < urls.length; i++ ) {
			var url = urls[i];
			$( '<img />' ).attr( 'src', url ).on('load', otherImagesLoaded);
		}
	}
    
	function loadScripts ( urls ) {
		for ( var i = 0; i < urls.length; i++ ) {
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
		if ( TXConfig.otherAssets == TXConfig.otherImages.length ){
			gsap.fromTo(AD.txt_howtoplay, 0.3,{autoAlpha:1},{autoAlpha:0});
			TXCreative.fn_STEP2();
		}
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
		
		//all video variables
		AD.currentVideo	= 0;
		AD.videoStatus	= [ false, false, false, false ]; // start, 25%, 50%, 75%, complete
		AD.videoHolder	= $( '#videoHolder' );
		AD.videoPlayer	= $( '#videoPlayer' );
		AD.videoPlay	= $( '#videoPlay' );
		AD.video		= $( '#video1' );
		AD.btn_x		= $( '#btn_x' );
		AD.videoReplay	= false;
		AD.vidURL		= [
						'src/video.mp4'
						];
		
		//all creative variables
		AD.cta				= $( '#cta' );
		AD.logo				= $( '#logo' ); 
		AD.btn_sound		= $( '#sound' );
		AD.btn_play			= $( '#btn_play' );
		AD.btn_playagain	= $( '#btn_playagain' );
		AD.btn_watchthespot	= $( '#btn_watchthespot' );
		AD.btn_letsroll		= $( '#btn_letsroll' );
		
		AD.bgm				= $( '#bgm' );
		AD.sfx_fail			= $( '#sfx_fail' );
		AD.sfx_good1		= $( '#sfx_good1' );
		AD.sfx_good2		= $( '#sfx_good2' );
		AD.sfx_good3		= $( '#sfx_good3' );
		AD.sfx_good4		= $( '#sfx_good4' );
		AD.sfx_good5		= $( '#sfx_good5' );
		
		AD.banner			= $( '#banner' );
		AD.spr_banner		= $( '#spr_banner' );
		AD.img_skater		= $( '#img_skater' );
		AD.img_chevron		= $( '#img_chevron' );		
		AD.txt_howtoplay	= $( '#txt_howtoplay' );
		AD.zero				= 0;
		
		//STEP 2
		AD.arw_pos			= [0,'-102px','-204px','-306px'];
		
		AD.arw_keys			= [];
		AD.pressed			= [];
		
		AD.txt_timer		= document.getElementById("txt_timer");
		AD.txt_timer2		= $( '#txt_timer' );
		AD.box 				= $( '.box' );
		AD.targetbox		= $( '#targetbox' );
		AD._allbox			= $( '#_allbox' );
		AD.allbox			= $( '#allbox' );
		AD.skater			= $( '.skater' );  
		AD.callout			= $( '#callout' );
		AD.arw_y			= $( '.arw_y' );  
		AD.arrowburst		= $( '#img_arrowburst' );
		AD.starburst		= $( '#img_starburst' );	 
		AD.img_sparkle		= $( '.img_sparkle' );
		AD.ss				= $( '.skater.ss' ); 		
		AD.s0				= $( '.skater.s0' );
		AD.s1				= $( '.skater.s1' );
		AD.s2				= $( '.skater.s2' );
		AD.s3				= $( '.skater.s3' );
		AD.s4				= $( '.skater.s4' ); 
		AD.bg2				= $( '.bg2' );
		AD.img_x			= $( '.img_x' );
		AD.bgPosX			= 'background-position-x';
		AD.bgPosY			= 'background-position-y';
		AD.ready			= false;
		AD.end				= false;
		AD.timeupdate		= null;
		AD.currentBox		= 0;
		AD.timeleft 		= 30;		
		AD.totalbox			= 69;
		AD.score			= 0;
		AD.spark			= 0;
		AD.currentSpark		= 0;
		AD.currentPos		= 350;
		AD.combo			= 0;

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
		var n = 0;		
		AD.btn_play.on( 'click', fn_buttons);
		AD.btn_playagain.on( 'click', fn_buttons);
		AD.btn_watchthespot.on( 'click', fn_buttons);
		AD.btn_letsroll.on( 'click', fn_buttons);
		AD.btn_sound.on( 'click', fn_sound);
		var tl = gsap.timeline({repeat:-1, yoyo:true, repeatDelay:1});
		tl.staggerTo ('.flr', 0.3, {opacity: 1, yoyo:true}, 1 );
		AD.sfx_good1.get(0).load();
		AD.sfx_good2.get(0).load();
		AD.sfx_good3.get(0).load();
		AD.sfx_good4.get(0).load();
		AD.sfx_good5.get(0).load();
		AD.sfx_fail.get(0).load();
		
		for ( var i = 0; i < 70; i++ ) {
			gsap.set($( ".box" + i), {left:n});
			n +=171;
		}
		
		AD.video.get(0).src = AD.vidURL[0];
		AD.video.get(0).volume = 0;
		TXVideo.init();

		AD.bgm.get(0).muted = false;
		AD.bgm.get(0).currentTime = 0;
		AD.bgm.get(0).play();
	}
	
	function fn_STEP2 () {
		fn_resetGame ();
		fn_timeUpdate();
		fn_sparkle();
		
		gsap.to([AD.banner,AD.img_chevron], 0.4,{z:0.01, rotation: 0.01, top:-500, ease:Power0.easeNone });
		
		gsap.fromTo(AD.img_skater, 0.2,{ autoAlpha:1 },{autoAlpha:0, ease:Power2.easeIn });
		
		gsap.fromTo(AD.ss, 0.5,{z:0.001, rotation: 0.01, display:'block', left:960 },{delay:0.2,left:206, ease:Power0.easeNone});
		
		gsap.fromTo(AD._allbox, 0.2,{ autoAlpha:1 },{autoAlpha:0, ease:Power0.easeNone});
		
		gsap.fromTo([AD.box,AD.targetbox,AD.logo,AD.txt_timer2,AD.bg2], 0.3,{ display:'block', autoAlpha:0 },{delay:0.3,autoAlpha:1, ease:Power0.easeNone, onComplete:fn_startGame});
		
		gsap.delayedCall(0.6, function(){
			gsap.fromTo(AD.txt_howtoplay, 0.5,{'background-position-y':'-63px', autoAlpha:0, bottom:412, right: -74 },{autoAlpha:1});
		});

		AD.bgm.get(0).currentTime = 0;
		AD.bgm.get(0).play();
		
	}
	
	function fn_STEP3 () {
		fn_result();

		AD.btn_play.hide();
		
		gsap.set([AD.btn_playagain,AD.btn_watchthespot,AD.btn_letsroll], { display:'block' });		
		gsap.fromTo(AD.banner, 0.5,{ display:'block', top:-500 },{top:0, ease:Power2.easeOut });
		gsap.fromTo(AD.img_skater, 0.5,{ display:'block', autoAlpha:0 },{autoAlpha:1, ease:Power2.easeOut });
	}
	
	function fn_buttons () {			
		switch(this.id){
			case 'btn_play':
				AD.btn_play.off( 'click');				
				TXAd.loadotherImages(TXConfig.otherImages);
				break;
			case 'btn_playagain':
				fn_STEP2();
				break;
			case 'btn_watchthespot':
				AD.videoHolder.show();
				AD.video.get(0).play();
				break;
			case 'btn_letsroll':
				window.open("https://suntrust.com/", "_blank");
				break;
		}
			
	}

	function fn_timeUpdate () {
		if(AD.end) return;
		var i =  document.getElementById('allbox');	
		if(i.offsetLeft <= 560 && !AD.ready) AD.ready=true;
		if(i.offsetLeft <= AD.currentPos){
			AD.currentBox+=1;
			AD.currentPos-=171;
			AD.skater.hide();					
			AD.ss.show();
			if(!AD.pressed[AD.currentBox-1])fn_missed();
		}
		
		if(AD.spark==12) fn_sparkle();
		AD.timeupdate = setTimeout(fn_timeUpdate, 100);
	}
	
	function fn_txtTimer () {
		if(AD.timeleft <= AD.zero)fn_endGame();
		if(AD.end) return;
		AD.timeleft--; 
		AD.txt_timer.innerHTML = ':' + AD.timeleft;
		gsap.delayedCall(1,fn_txtTimer);
	}
	
	function fn_resetGame () {
		AD.timeleft	= 30;
		AD.currentBox = 0;
		AD.currentPos = 350;
		AD.score = 0;
		AD.combo = 0;
		AD.arw_keys	= [];
		AD.pressed = [];
		AD.ready = false;
		AD.end = false;
		AD.txt_timer.innerHTML = ':30';
		var n = AD.totalbox + 1;
		gsap.set([AD.skater,AD.img_x], {autoAlpha: 1, display: 'none'});
		gsap.set(AD.allbox, {left: 960});	

		for ( var i = 0; i < n; i++ ) {
			var _random = Math.floor(Math.random() * 4);
			AD.arw_keys.push(_random);
			AD.pressed.push(false);
			gsap.set($( ".box" + i + ' .spr_arw'), {'display':'block','background-position-y':0,'background-position-x': AD.arw_pos[_random]});
		}
	}
	
	function fn_startGame () {
		gsap.fromTo(AD.allbox, 35,{z:0.01, rotation: 0.01, left:960}, {left:-9450, ease: CustomEase.create("custom", 'M0,0,C0.312,0.174,0.452,0.346,0.746,0.69,0.847,0.808,1.092,1.154,1,1')});
		gsap.delayedCall(1,fn_txtTimer);
		fn_addControls ();
	}
	
	function fn_endGame () {
		gsap.killTweensOf(AD.allbox);
		gsap.killTweensOf(AD.img_sparkle); 
		AD.end = true;
		window.onkeydown = function (e) {};	
		gsap.fromTo(AD.box, 0.2,{ autoAlpha:1 },{autoAlpha:0, ease:Power0.easeNone});
		gsap.to(AD.img_sparkle, 0.2, {scale:0, ease:Power0.easeNone});
		
		AD.callout.removeClass('animated bounceIn');
		AD.callout.hide();
		
		gsap.delayedCall(0.3,fn_removeGame);
		function fn_removeGame(){
			gsap.fromTo([AD.targetbox, AD.logo, AD.txt_timer2, AD.skater, AD.bg2, AD.txt_howtoplay], 0.2,{ autoAlpha:1 },{autoAlpha:0, ease:Power0.easeNone, onComplete: function(){
				
				AD.callout.css(AD.bgPosY, '-1704px');
				AD.callout.show();				
				AD.callout.addClass('animated bounceIn');
			}});

			gsap.fromTo(AD._allbox, 0.2,{ autoAlpha:0 },{autoAlpha:1, ease:Power0.easeNone});
			gsap.delayedCall(1,fn_STEP3);
		}
		
	}
	
	function fn_result () {
		var score = (AD.score / AD.currentBox) * 100;
		
		if(score >= 100){
			AD.spr_banner.css(AD.bgPosX, '-999px');
		} else if (score >= 31 && score <= 99){
			AD.spr_banner.css(AD.bgPosX, '-666px');
		} else {
			AD.spr_banner.css(AD.bgPosX, '-333px');
		}
	}
	
	function fn_addControls () {
		window.onkeydown = function (e) {
			if(AD.pressed[AD.currentBox] || !AD.ready) return;
			var code = e.keyCode ? e.keyCode : e.which;
			
			AD.callout.removeClass('animated bounceIn');
			AD.starburst.removeClass('animated starBurst');
			AD.arrowburst.removeClass('animated arrowBurst');
			
			switch(code){
				case 38: //up
					e.preventDefault();
					if(AD.arw_keys[AD.currentBox] == AD.zero){
						if(AD.s1.css(AD.bgPosY) == '-3546px')
							AD.s1.css(AD.bgPosY, '-3940px');
						else if(AD.s1.css(AD.bgPosY) == '-3940px')
							AD.s1.css(AD.bgPosY, '-4334px');
						else AD.s1.css(AD.bgPosY, '-3546px');
						
						AD.arw_y.css(AD.bgPosX, '0');
						AD.skater.hide();						
						gsap.fromTo(AD.s1, 0.3,{z:0.01, rotation: 0.01, display:'block', top:40},{top:0, ease:Power2.easeOut});
						AD.s1.show();
						fn_correct();
					}
					else fn_wrong();
					break;
				case 39: //right
					e.preventDefault();
					if(AD.arw_keys[AD.currentBox] == 1){
						if(AD.s2.css(AD.bgPosY) == '-1182px')
							AD.s2.css(AD.bgPosY, '-1576px');
						else if(AD.s2.css(AD.bgPosY) == '-1576px')
							AD.s2.css(AD.bgPosY, '-1970px');
						else AD.s2.css(AD.bgPosY, '-1182px');
						
						AD.arw_y.css(AD.bgPosX, '-102px');
						AD.skater.hide();
						gsap.fromTo(AD.s2, 0.3,{z:0.01, rotation: 0.01, display:'block', left:206},{left:246, ease:Power2.easeOut});
						fn_correct();
					}
					else fn_wrong();
					break;
				case 40: //down
					e.preventDefault();
					if(AD.arw_keys[AD.currentBox] == 2){
						if(AD.s3.css(AD.bgPosY) == '-4728px')
							AD.s3.css(AD.bgPosY, '-5122px');
						else if(AD.s3.css(AD.bgPosY) == '-5122px')
							AD.s3.css(AD.bgPosY, '-5516px');
						else AD.s3.css(AD.bgPosY, '-4728px');
						
						AD.arw_y.css(AD.bgPosX, '-204px');						
						AD.skater.hide();
						gsap.fromTo(AD.s3, 0.3,{z:0.01, rotation: 0.01, display:'block', top:-40},{top:0, ease:Power2.easeOut});										
						fn_correct();
					}
					else fn_wrong();
					break;
				case 37: // left
					e.preventDefault();
					if(AD.arw_keys[AD.currentBox] == 3){
						if(AD.s4.css(AD.bgPosY) == '-2364px')
							AD.s4.css(AD.bgPosY, '-2758px');
						else if(AD.s4.css(AD.bgPosY) == '-2758px')
							AD.s4.css(AD.bgPosY, '-3152px');
						else AD.s4.css(AD.bgPosY, '-2364px');
						
						AD.arw_y.css(AD.bgPosX, '-306px');
						AD.skater.hide();			
						gsap.fromTo(AD.s4, 0.3,{z:0.01, rotation: 0.01, display:'block', left:206},{left:166, ease:Power2.easeOut});
						fn_correct();
					}
					else fn_wrong();
					break;
			}
			
		};
	}
	
	function fn_correct () {	
		AD.score +=1;
		
		if(AD.callout.css(AD.bgPosY) == '0px')
			AD.callout.css(AD.bgPosY, '-213px');
		else if(AD.callout.css(AD.bgPosY) == '-213px')
			AD.callout.css(AD.bgPosY, '-426px');
		else if(AD.callout.css(AD.bgPosY) == '-426px')
			AD.callout.css(AD.bgPosY, '-639px');
		else AD.callout.css(AD.bgPosY, '0px');
		
		AD.callout.show();
		AD.callout.addClass('animated bounceIn');
		
		gsap.fromTo(AD.arrowburst, 0.3,{z:0.01, rotation: 0.01, display:'block', autoAlpha:1, scale:0.3, bottom:-10},{ scale:1,bottom:10, ease:Power3.easeOut});
		gsap.fromTo(AD.starburst, 0.3,{z:0.01, rotation: 0.01, display:'block', autoAlpha:1, scale:0.5},{ scale:1.2, ease:Power3.easeOut});			
		gsap.to(AD.arrowburst, 0.2,{delay:0.1, autoAlpha:0, ease:Power0.easeNone});			
		gsap.to(AD.starburst, 0.2,{delay:0.1, autoAlpha:0, ease:Power0.easeNone});
		
		gsap.fromTo(AD.arw_y, 0.3,{z:0.01, display:'block', scale:1, autoAlpha:1},{autoAlpha: 0, scale:1.2, ease:Power1.easeIn});		

		AD.pressed[AD.currentBox] = true;
		gsap.set($('.box' + AD.currentBox + ' .spr_arw'), {'background-position-y': '-102px'});
		
		gsap.set($('.box' + AD.currentBox + ' .spr_arw'), {delay: 0.2,'background-position-y': '-204px'});
		
		AD.combo++;
		switch(AD.combo){
			case 1: AD.sfx_good1.get(0).currentTime = 0;
					AD.sfx_good1.get(0).play();
				break;
			case 2: AD.sfx_good2.get(0).currentTime = 0;
					AD.sfx_good2.get(0).play();
				break;
			case 3: AD.sfx_good3.get(0).currentTime = 0;
					AD.sfx_good3.get(0).play();
				break;
			case 4: AD.sfx_good4.get(0).currentTime = 0;
					AD.sfx_good4.get(0).play();
				break;
			default: AD.sfx_good5.get(0).currentTime = 0;
					 AD.sfx_good5.get(0).play();
		}
	}
	
	function fn_sparkle () {
		AD.spark = 0;
		
		if(AD.currentSpark == AD.zero){
			AD.currentSpark = 1; var x0 = 273, _x0 = 390, x1 = 535, _x1 = 681, y0 = 30, _y = 160;
		}
		else if(AD.currentSpark == 1){
			AD.currentSpark = 2; var x0 = 296, _x0 = 390, x1 = 535, _x1 = 663, y0 = 0, _y = 90;
		}			
		else {
			AD.currentSpark = 0; var x0 = 256, _x0 = 390, x1 = 535, _x1 = 702, y0 = 80, _y = 100;
		};
		
		for ( var i = 0; i < 6; i++ ) {
			var _delay = getRandomArbitrary(0, 4);
			gsap.fromTo('.sp'+i, 0.4,{z:0.01, display:'block', scale:0, autoAlpha:0.1, left:(getRandomInt(x0, _x0))-79, top: (getRandomInt(y0, _y))-79},{delay:_delay, scale:getRandomArbitrary(0.5, 1), autoAlpha:1, ease:Power2.easeInOut, yoyo:true, repeat: 1});
			
			gsap.fromTo('.sp'+i, 0.8,{rotation: 0.01},{delay:_delay, rotation:getRandomInt(-200, 200), onComplete: function(){AD.spark+=1}});
		}
		
		for ( var i2 = 0; i2 < 6; i2++ ) {
			var _delay2 = getRandomArbitrary(0, 4);
			gsap.fromTo('.ps'+i2, 0.4,{z:0.01, display:'block', scale:0, autoAlpha:0.1, left:(getRandomInt(x1, _x1))-79, top: (getRandomInt(y0, _y))-79},{delay:_delay2, scale:getRandomArbitrary(0.5, 1), autoAlpha:1, ease:Power2.easeInOut, yoyo:true, repeat: 1});
			
			gsap.fromTo('.ps'+i2, 0.8,{rotation: 0.01},{delay:_delay2, rotation:getRandomInt(-200, 200), onComplete: function(){AD.spark+=1}});
		}
	}
	
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
		
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	function fn_wrong () {
		AD.skater.hide();
		AD.starburst.hide();
		AD.arrowburst.hide();
		
		if(AD.callout.css(AD.bgPosY) == '-852px')
			AD.callout.css(AD.bgPosY, '-1065px');
		else if(AD.callout.css(AD.bgPosY) == '-1065px')
			AD.callout.css(AD.bgPosY, '-1278px');
		else if(AD.callout.css(AD.bgPosY) == '-1278px')
			AD.callout.css(AD.bgPosY, '-1491px');
		else AD.callout.css(AD.bgPosY, '-852px');
		
		AD.callout.show();
		AD.callout.addClass('animated bounceIn');
		
		AD.pressed[AD.currentBox] = true;
		gsap.set($('.box' + AD.currentBox + ' .img_x'), {'display': 'block'});
		
		if(AD.s0.css(AD.bgPosY) == '-394px')
			AD.s0.css(AD.bgPosY, '-788px');
		else AD.s0.css(AD.bgPosY, '-394px');
		
		AD.s0.show();
		
		AD.combo = 0;
		AD.sfx_fail.get(0).currentTime = 0;
		AD.sfx_fail.get(0).play();
	}
	
	function fn_missed () {
		AD.skater.hide();
		AD.starburst.hide();
		AD.arrowburst.hide();
		AD.callout.removeClass('animated bounceIn');
		
		if(AD.callout.css(AD.bgPosY) == '-852px')
			AD.callout.css(AD.bgPosY, '-1065px');
		else if(AD.callout.css(AD.bgPosY) == '-1065px')
			AD.callout.css(AD.bgPosY, '-1278px');
		else if(AD.callout.css(AD.bgPosY) == '-1278px')
			AD.callout.css(AD.bgPosY, '-1491px');
		else AD.callout.css(AD.bgPosY, '-852px');
		
		AD.callout.show();
		AD.callout.addClass('animated bounceIn');
		
		AD.pressed[AD.currentBox-1] = true;
		gsap.set($('.box' + (AD.currentBox-1) + ' .img_x'), {'display': 'block'});
		
		if(AD.s0.css(AD.bgPosY) == '-394px')
			AD.s0.css(AD.bgPosY, '-788px');
		else AD.s0.css(AD.bgPosY, '-394px');
		
		AD.s0.show();
		
		AD.combo = 0;
		AD.sfx_fail.get(0).currentTime = 0;
		AD.sfx_fail.get(0).play();
	}
		
	function fn_sound () {
		var isMuted = AD.btn_sound.hasClass( 'mute' );
		if ( isMuted ) {
			AD.btn_sound.removeClass( 'mute' );
			AD.bgm.get(0).muted = false;
			AD.sfx_fail.get(0).muted = false;
			AD.sfx_good1.get(0).muted = false;
			AD.sfx_good2.get(0).muted = false;
			AD.sfx_good3.get(0).muted = false;
			AD.sfx_good4.get(0).muted = false;
			AD.sfx_good5.get(0).muted = false;
			AD.video.get(0).muted = false;
		}

		else {		
			AD.btn_sound.addClass( 'mute' );
			AD.bgm.get(0).muted = true;
			AD.sfx_fail.get(0).muted = true;
			AD.sfx_good1.get(0).muted = true;
			AD.sfx_good2.get(0).muted = true;
			AD.sfx_good3.get(0).muted = true;
			AD.sfx_good4.get(0).muted = true;
			AD.sfx_good5.get(0).muted = true;
			AD.video.get(0).muted = true;
		}
	}
		
	return {
		fn_STEP1 : fn_STEP1,
		fn_STEP2 : fn_STEP2
	};

})();

/**###################################################
 * SET UP VIDEO HERE
 * ###################################################
 */
var	TXVideo = (function () {

	function init () {
		AD.video.on( 'play', videoStarted );
		AD.video.on( 'ended', videoEnded );
		AD.video.on( 'timeupdate', videoProgress );
		AD.video.on( 'playing', videoPlaying);
		AD.btn_x.on( 'click', fn_closevid );

		if ( AD.video.attr( 'autoplay' ) ) {
			AD.videoPlayer.show();
			AD.videoPlay.hide();
		}
		
		//AD.videoPlayer.on( 'click', pauseVideo );
		AD.videoPlay.on( 'click', playVideo );
	}
	
	function videoPlaying () {
		AD.video.off( 'playing' );
		AD.video.get(0).removeAttribute('autoplay');
		AD.video.get(0).removeAttribute('muted');
		AD.video.get(0).muted = false;
		AD.video.get(0).volume = 1;
	}
	
	 function fn_closevid () {
		AD.video.get(0).pause();
		AD.video.get(0).currentTime = 0;
		AD.videoHolder.hide();
		AD.bgm.get(0).play();
		AD.videoStatus	= [false, false, false, false];
	}

	function destroy () {

		var videoPlayerMarkup = AD.videoPlayer.html();
		videoPlayerMarkup = $( videoPlayerMarkup ).removeAttr( 'autoplay' );

		AD.video.off( 'play', videoStarted );
		AD.video.off( 'ended', videoEnded );
		AD.video.off( 'timeupdate', videoProgress );

		AD.videoPlayer.html('');
	}

	function playVideo () {
		AD.videoHolder.show();
		AD.videoPlay.hide();
		AD.video.get(0).play();
	}

    function pauseVideo () {
		AD.videoPlay.show();
		AD.video.get(0).pause();
	}
  
	function videoStarted () {
		
		AD.bgm.get(0).pause();

		if ( AD.videoStatus[0] ) return;
		
		//if ( AD.videoReplay ) console.log('video_replay');

		AD.videoStatus[0] = true;
		//console.log('video_started');
	}
	
	function videoProgress (e) {
		
		var progress = e.currentTarget.currentTime / e.currentTarget.duration;

		if( !AD.videoStatus[1] && progress >= 0.25 ) {
			AD.videoStatus[1] = true; //console.log('video_first_quartile');
		}
		else if ( !AD.videoStatus[2] && progress >= 0.50 ) {
			AD.videoStatus[2] = true; //console.log('video_second_quartile');
		}
		else if ( !AD.videoStatus[3] && progress >= 0.75 ) {
			AD.videoStatus[3] = true; //console.log('video_third_quartile');
		}
	}

	function videoEnded () {
		
		AD.bgm.get(0).play();
		
        AD.video.get(0).pause();
        AD.video.get(0).removeAttribute('autoplay');
		AD.video.get(0).removeAttribute('muted');
		AD.video.get(0).currentTime = 0;
		AD.videoHolder.hide();

		AD.videoStatus	= [false, false, false, false];
		AD.videoReplay = true;
		//destroy();
	}
	
	return {
		init		: init,
		destroy		: destroy,
		playVideo	: playVideo,
		pauseVideo	: pauseVideo
	};

})();

TXAd.init();

}());