/* Project: T-Mobile | Developer: Neptali Calonge | Date: Nov 16, 2017 */
(function() {

var TXConfig = (function () {
	
	var creativeImages = [
        'src/bg.png',
		'src/spr_btn.png',
		'src/txt_logo1.png',
		'src/txt_copy1.png'
	],
		
		otherImages = [
        'src/txt_footer.png',
		'src/btn_switchnow.png',
		'src/pop_instruction.png',
		'src/pop_result.png',
		'src/txt_copy2.png',
		'src/spr_cards.png',
		'src/bg2.jpg',
		'src/txt_copy3.png'
	],
		
        creativeScripts = [
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js'
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
			gsap.fromTo([AD.INSTRUCTION,AD.GAMEBOARD,AD.FOOTER],0.2, 
				{display:'block',autoAlpha: 0},
				{autoAlpha: 1, onComplete: function(){
					AD.INTRO.hide();					
					gsap.delayedCall(1,TXCreative.cd_3sec);
					AD.sfx_countdown.get(0).play();
				}});
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
		//all creative variables
		AD.flipout				= $( '.flipout' );
		AD.txt_copy1			= $( '#txt_copy1' );
		AD.zero					= 0;
		
		//buttons
		AD.btn_startplaying		= $( '#btn_startplaying' );
		AD.btn_switchtoday		= $( '#btn_switchtoday' );
		AD.btn_playagain		= $( '#btn_playagain' );
		AD.btn_switchnow		= $( '#btn_switchnow' );
		AD.spr_cards			= $( '.spr_cards' );
		
		//frames
		AD.INTRO				= $( '#INTRO' );
		AD.INSTRUCTION			= $( '#INSTRUCTION' );
		AD.GAMEBOARD			= $( '#GAMEBOARD' );
		AD.RESULT				= $( '#RESULT' );
		AD.ENDFRAME				= $( '#ENDFRAME' );
		AD.FOOTER				= $( '#FOOTER' );
		
		//dynamic text
		AD.countdown_3sec		= document.getElementById('countdown_3sec');
		AD.countdown_30sec		= document.getElementById('countdown_30sec');
		AD.matches				= document.getElementById('matches');
		AD.txt_result			= document.getElementById('txt_result');
		AD.txt_result2			= document.getElementById('txt_result2');
		AD.txt_result3			= document.getElementById('txt_result3');
		
		AD.count				= 0;
		AD.score				= 0;
		AD.set					= 6;
		AD.initElapse			= null;
		AD.checkResult			= null;
		
		//gameboard
		AD.card					= 0;
		AD.selectedcard			= [];
		AD.currentcard			= [];
		AD.cardsY				= ['-150px', '-300px', '-450px', '-600px', '-750px', '-900px','-1050px'];
		AD.cards				= [];
		AD.ready				= true;
		
		//audio
		AD.btn_sound			= $( '#sound' );
		AD.audio_bg				= $( '#audio_bg' );
		AD.sfx_countdown		= $( '#sfx_countdown' );
		AD.sfx_flip				= $( '#sfx_flip' );
		AD.sfx_match			= $( '#sfx_match' );
		AD.sfx_reset			= $( '#sfx_reset' );
		AD.sfx_gameover			= $( '#sfx_gameover' );

		AD._audio_bg			= $( '#_audio_bg' );
		AD._sfx_countdown		= $( '#_sfx_countdown' );
		AD._sfx_flip			= $( '#_sfx_flip' );
		AD._sfx_match			= $( '#_sfx_match' );
		AD._sfx_reset			= $( '#_sfx_reset' );
		AD._sfx_gameover		= $( '#_sfx_gameover' );
		
		AD._sfx_countdown.get(0).src = 'src/audio/sfx_countdown.mp3';
		AD._sfx_match.get(0).src = 'src/audio/sfx_match.mp3';
		AD._sfx_flip.get(0).src = 'src/audio/sfx_flip.mp3';		
		AD._sfx_reset.get(0).src = 'src/audio/sfx_reset.mp3';
		AD._sfx_gameover.get(0).src = 'src/audio/sfx_gameover.mp3';
		
		AD.audio_bg.get(0).load();
		AD.sfx_countdown.get(0).load();
		AD.sfx_flip.get(0).load();
		AD.sfx_match.get(0).load();
		AD.sfx_reset.get(0).load();
		AD.sfx_gameover.get(0).load();
		
		//autoplay
		AD.autoplay			= null;
		AD.isautoplay		= true;
		AD.autoflip			= [0,1,2,3,4,5,6,7,8,9,10,11];
		AD.flip				= 0; 
		AD.ap_card 			= null;
		
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
		AD.btn_startplaying.on( 'click', fn_buttons );
		AD.btn_switchtoday.on( 'click', fn_buttons );		
		AD.btn_switchnow.on( 'click', fn_buttons );
		AD.btn_sound.on( 'click', fn_sound );
		AD.spr_cards.on( 'click', fn_cardpick );
		AD.spr_cards.mouseover( 'over', fn_cardover );
		AD.spr_cards.mouseout( 'over', fn_cardout );
		
		AD.btn_startplaying.mouseover( 'over', function(){ gsap.fromTo(AD.btn_startplaying, 0.1, {scale:1}, {scale:1.05});   } );
		AD.btn_startplaying.mouseout( 'out', function(){ gsap.fromTo(AD.btn_startplaying, 0.1, {scale:1.05}, {scale:1});   } );
			
		gsap.from(AD.flipout,0.5, {top:960});
		gsap.from(AD.txt_copy1,0.5, {delay:0.2, top:960});
		gsap.from(AD.btn_startplaying,0.5, {delay:0.4, top:960});
		gsap.fromTo(AD.btn_startplaying,0.2, {delay:1, scale:1}, {delay:1, scale:1.2});
		gsap.to(AD.btn_startplaying,0.2, {delay:1.1, scale:1, onComplete: function(){
			AD.btn_playagain.on( 'click', fn_buttons );
		}});
		
		//AD.autoplay = setTimeout(fn_AUTOPLAY, 9000);

		//AD.audio_bg.get(0).currentTime = 0;
		//AD.audio_bg.get(0).play();
		
		// lower the sound volumes
		AD.sfx_flip.get(0).volume = 0.3;
		AD.sfx_match.get(0).volume = 0.3;
		AD.sfx_reset.get(0).volume = 0.3;
		AD.sfx_gameover.get(0).volume = 0.3;
	}
	
	function fn_STEP2 () {
		card_setup ();
		AD.ENDFRAME.hide();
		AD.count = 30;
		AD.score = 0;
		AD.set = 6;
		AD.card	= 0;
		AD.selectedcard	= [];
		AD.currentcard = [];
		AD.ready = true;
		AD.countdown_30sec.innerHTML = AD.count;
		AD.matches.innerHTML = AD.score;
		gsap.set(AD.spr_cards,{'background-position-y': 0});
		gsap.delayedCall(1,cd_30sec);		
		gsap.to(AD.audio_bg, 0.5,{volume: 0.3});
		
		AD.initElapse = setTimeout(ap_cardopen, 5000);
	}
	
	function fn_STEP3 () {
		AD.isautoplay = false;
		clearTimeout(AD.autoplay);
		gsap.fromTo(AD.ENDFRAME,0.2, {display:'block',autoAlpha: 0},{autoAlpha: 1, onComplete: function(){
			gsap.set(AD.spr_cards,{rotationY: 0});
			AD.RESULT.hide();
		}});
		
		gsap.to(AD.audio_bg, 0.5,{volume: 1});
	}
	
	function fn_AUTOPLAY () {
		clearTimeout(AD.autoplay);
		AD.btn_startplaying.off( 'click' );				
		AD.count = 3;
		AD.countdown_3sec.innerHTML = AD.count;
		TXAd.loadotherImages(TXConfig.otherImages);
		shuffle(AD.autoflip);
	}
	
	function ap_cardopen (e) {
		AD.ap_card = 'card_'+AD.autoflip[AD.flip];
		gsap.set($('#'+AD.ap_card),{'pointer-events': 'none'});
		gsap.to($('#'+AD.ap_card),0.2,{z:0.01, force3D: false, perspective: 1000, rotationY:90, ease:'none', onComplete:ap_cardflip});
	}
		
	function ap_cardflip (e) {
		var i = null;
		switch(AD.ap_card){
			case 'card_0': i = AD.cards[0]; break;
			case 'card_1': i = AD.cards[1]; break;
			case 'card_2': i = AD.cards[2]; break;
			case 'card_3': i = AD.cards[3]; break;
			case 'card_4': i = AD.cards[4]; break;
			case 'card_5': i = AD.cards[5]; break;
			case 'card_6': i = AD.cards[6]; break;
			case 'card_7': i = AD.cards[7]; break;
			case 'card_8': i = AD.cards[8]; break;
			case 'card_9': i = AD.cards[9]; break;
			case 'card_10': i = AD.cards[10]; break;
			case 'card_11': i = AD.cards[11]; break;
		}
		
		gsap.set($('#'+AD.ap_card),{'background-position-y': i});
		gsap.to($('#'+AD.ap_card),0.2,{z:0.01, force3D: false,perspective: 1000, rotationY:0, ease:'none', onComplete: function(){
			setTimeout(ap_cardreturn, 500);
		}});
	}
		
	function ap_cardreturn (e) {
		gsap.to($('#'+AD.ap_card),0.2,{z:0.01, force3D: false, perspective: 1000, rotationY:90,ease:'none', onComplete:ap_cardreturn2});
		
		function ap_cardreturn2 () {
			gsap.set($('#'+AD.ap_card),{'pointer-events': 'auto','background-position-y': 0});
			gsap.to($('#'+AD.ap_card),0.2,{z:0.01, force3D: false, perspective: 1000,rotationY:0,ease:'none', onComplete: function(){
                if(!AD.isautoplay) return;
                if(AD.flip >= 11) 
                    AD.flip = 0;
				else 
                    AD.flip++;
                if(AD.flip<2)
				    AD.autoplay = setTimeout(ap_cardopen, 1000);
			}});
		}
	}
	
	function fn_RESULT () {

		gsap.killTweensOf("*");

		gsap.set(AD.spr_cards,{'pointer-events': 'none' , scale: 0.91});
		
		if(AD.matches.innerHTML <= 3){
			AD.txt_result.innerHTML = ' ';
			AD.txt_result2.innerHTML = 'Nice try! Give it another shot and '; 
			AD.txt_result3.innerHTML = 'see if you can do better!';
		} else if (AD.matches.innerHTML >= 7) {
			AD.txt_result.innerHTML = ' ';
			AD.txt_result2.innerHTML = "Unreal! Your matching skills";
			AD.txt_result3.innerHTML = 'are rock star level!';
		} else {
			AD.txt_result.innerHTML = ' ';
			AD.txt_result2.innerHTML = "Well done! You’re on your way"; 
			AD.txt_result3.innerHTML = 'to becoming a match-master!'; 
		}
		
		gsap.fromTo(AD.RESULT, 0.2,{autoAlpha: 0, display:'block'}, {autoAlpha: 1});
		gsap.delayedCall(5, fn_STEP3);
		
		AD.sfx_gameover.get(0).currentTime = 0;
		AD.sfx_gameover.get(0).play();
	}
	
	function fn_buttons () {
		switch(this.id){
			case 'btn_startplaying':
				AD.isautoplay = true;
				clearTimeout(AD.autoplay);
				AD.btn_startplaying.off( 'click' );				
				AD.count = 3;
				AD.countdown_3sec.innerHTML = AD.count;
				TXAd.loadotherImages(TXConfig.otherImages);	
				gsap.to('#btn_startplaying', 0.5,{autoAlpha: 0});
				break;
			case 'btn_switchtoday':
                AD.isautoplay=false;
				window.open("https://www.t-mobile.com/", "_blank");
				if(!AD.btn_sound.hasClass( 'mute' ))fn_sound ();
				break;
			case 'btn_playagain':
				gsap.set(AD.spr_cards,{'pointer-events': 'auto'});
				fn_STEP2 ();
				break;
			case 'btn_switchnow':
				AD.isautoplay = false;
				clearTimeout(AD.autoplay);
				window.open("https://www.t-mobile.com/", "_blank");
				if(!AD.btn_sound.hasClass( 'mute' ))fn_sound ();
				break;
		}
	}
	
	function fn_cardpick (e) {
		
		if(!AD.ready) { 
			return; 
		}
		else {
			AD.isautoplay = false;
			clearTimeout(AD.autoplay);
			clearTimeout(AD.initElapse);
			AD.ready = false;
			
			AD.currentcard[AD.card] = e.currentTarget;
			
			gsap.set(e.currentTarget,{'pointer-events': 'none'});
			gsap.to(e.currentTarget,0.2,{z:0.01, force3D: false, perspective: 1000, rotationY:90, ease:'none', onComplete:fn_cardflip});

			AD.sfx_flip.get(0).currentTime = 0.02;
			AD.sfx_flip.get(0).play();
		}
		
	}
	
	function fn_cardflip (e) {
		var i = null;
		var n = AD.currentcard[AD.card];
		switch(n.id){
			case 'card_0': i = AD.cards[0]; break;
			case 'card_1': i = AD.cards[1]; break;
			case 'card_2': i = AD.cards[2]; break;
			case 'card_3': i = AD.cards[3]; break;
			case 'card_4': i = AD.cards[4]; break;
			case 'card_5': i = AD.cards[5]; break;
			case 'card_6': i = AD.cards[6]; break;
			case 'card_7': i = AD.cards[7]; break;
			case 'card_8': i = AD.cards[8]; break;
			case 'card_9': i = AD.cards[9]; break;
			case 'card_10': i = AD.cards[10]; break;
			case 'card_11': i = AD.cards[11]; break;
		}
		AD.selectedcard.push(i);
		gsap.set(n,{'background-position-y': i});
		gsap.to(n,0.2,{z:0.01, force3D: false, perspective: 1000, rotationY:0, ease:'none', onComplete:fn_cardcheck});
		
	}
	
	function card_setup () {
		shuffle(AD.cardsY);
		AD.cards = [];
		for ( var i = 0; i < 6; i++ ) {
			AD.cards.push(AD.cardsY[i]);
			AD.cards.push(AD.cardsY[i]);
		}
		shuffle(AD.cards);
	}
	
	function fn_cardcheck () {
		if(AD.card == AD.zero){
			AD.card = 1;
			AD.ready = true;
		} else {			
			if(AD.selectedcard[0] == AD.selectedcard[1]){
				AD.score++;
				AD.matches.innerHTML = AD.score;
				gsap.set([AD.currentcard[0],AD.currentcard[1]],{'pointer-events': 'none'});
				AD.sfx_match.get(0).currentTime = 0.04;
				AD.sfx_match.get(0).play();
				fn_cardreset ();
			} else {
				gsap.delayedCall(0.7, fn_cardreturn);
			}
			
		}
	}
		
	function fn_cardreturn () {
		var card1 = AD.currentcard[0],
			card2 = AD.currentcard[1];

		fn_cardreset();

		gsap.to([card1, card2],0.2,{z:0.01, force3D: false, perspective: 1000, rotationY:90,ease:'none', onComplete:fn_cardreturn2});

		function fn_cardreturn2 () {			
			gsap.set([card1, card2],{'pointer-events': 'auto', scale: 0.91, 'background-position-y': 0});
			gsap.to([card1, card2],0.2,{z:0.01, force3D: false, perspective: 1000,rotationY:0,ease:'none'});
		}
	}
	
	function fn_cardreset () {
		if(AD.score == AD.set){
			fn_cardcomplete ();
			AD.set += 6;
		} else {
			AD.card	= 0;
			AD.selectedcard	= [];
			AD.currentcard = [];
			AD.ready = true;
		}
		
	}
	
	function fn_cardcomplete () {
		card_setup ();
		gsap.to(AD.spr_cards,0.2,{rotationY:90,ease:'none', onComplete:fn_cardcomplete2});
		
		function fn_cardcomplete2 () {
			gsap.set(AD.spr_cards,{'background-position-y': 0});
			gsap.to(AD.spr_cards,0.2,{rotationY:0,ease:'none', onComplete: function(){
				gsap.set(AD.spr_cards,{'pointer-events': 'auto'});
				AD.card	= 0;
				AD.selectedcard	= [];
				AD.currentcard = [];
				AD.ready = true;
			}});
		}
		
		AD.sfx_reset.get(0).currentTime = 0;
		AD.sfx_reset.get(0).play();
	}
	
	function fn_cardover (e) {
		gsap.set(this,{z:0.01, force3D: false, perspective: 1000, scale: 0.96});
	}
	
	function fn_cardout (e) {
		gsap.set(this,{z:0.01, force3D: false, perspective: 1000, scale: 0.91});
	}
	
	function cd_3sec () {
		
		if(AD.count <= 1){
			gsap.set(AD.countdown_3sec,{left:'564px', top:'176px','font-size': '710%' });
			AD.countdown_3sec.innerHTML = 'GO!';
			gsap.delayedCall(1,cd_3sec_complete);
		} else {			
			AD.count--;
			AD.countdown_3sec.innerHTML = AD.count;
			gsap.delayedCall(1,cd_3sec);
		}
		
		function cd_3sec_complete(){
			gsap.fromTo(AD.INSTRUCTION, 0.2,{autoAlpha: 1}, {autoAlpha: 0, onComplete: fn_STEP2});
		}
	}
	
	function cd_30sec () {
		if(AD.count <= AD.zero){
			fn_RESULT();
			AD.isautoplay = false;
			clearTimeout(AD.autoplay);
        } else if(AD.count<=18 && AD.isautoplay){
            fn_RESULT();
        } else {
			AD.count--;
		
			if(AD.count <=9){
				AD.countdown_30sec.innerHTML = '0' + AD.count;
			} else {
				AD.countdown_30sec.innerHTML = AD.count;
			}
			gsap.delayedCall(1,cd_30sec);
		}
		
	}
		
	function fn_sound () {
		var isMuted = AD.btn_sound.hasClass( 'mute' );
        AD.isautoplay=false;
		if ( isMuted ) {
			AD.btn_sound.removeClass( 'mute' );
			AD.audio_bg.get(0).muted = false;
			AD.sfx_countdown.get(0).muted = false;
			AD.sfx_flip.get(0).muted = false;
			AD.sfx_match.get(0).muted = false;
			AD.sfx_reset.get(0).muted = false;
			AD.sfx_gameover.get(0).muted = false;
		}

		else {
			AD.btn_sound.addClass( 'mute' );
			AD.audio_bg.get(0).muted = true;
			AD.sfx_countdown.get(0).muted = true;
			AD.sfx_flip.get(0).muted = true;
			AD.sfx_match.get(0).muted = true;
			AD.sfx_reset.get(0).muted = true;
			AD.sfx_gameover.get(0).muted = true;
		}
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
		
	return {
		fn_STEP1 : fn_STEP1,
		cd_3sec	 : cd_3sec
	};

})();

TXAd.init();

}());