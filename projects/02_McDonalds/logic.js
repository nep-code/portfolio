/* Project: McDonalds Beverage | Developer: Neptali Calonge | Date: Jun 05, 2017 */
(function() {
var TXConfig = (function () {
	
	var creativeImages = [
        'src/logo.png',
		'src/txt_header.png',
		'src/spr_intro.png',
		'src/spr_audio.png',
		'src/spr_buttons.png',
		'src/spr_drinks.png'
	],
        creativeScripts = [
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/Draggable.min.js'
	],

        markupContainer,
        loadedAssets = 0,
        totalAssets = creativeImages.length + creativeScripts.length,
        engagementStartedFiredOnce = false;

	return {
		markupContainer            : markupContainer,
		loadedAssets               : loadedAssets,
		totalAssets                : totalAssets,
		engagementStartedFiredOnce : engagementStartedFiredOnce,
		creativeImages             : creativeImages,
		creativeScripts            : creativeScripts
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
			$( '<img />' ).attr( 'src', url ).on('load',updateAssetsLoaded);
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
        
        AD.container		= $( '#container' );
		
		//sounds
		AD.snd_swoosh		= $( '#snd_swoosh' );
		AD.snd_intro		= $( '#snd_intro' );
		AD.snd_gameplay		= $( '#snd_gameplay' );
		AD.snd_grabdrink	= $( '#snd_grabdrink' );
		AD.snd_correct		= $( '#snd_correct' );
		AD.snd_incorrect	= $( '#snd_incorrect' );
		AD.snd_roundover	= $( '#snd_roundover' );
		AD.snd_timeisup		= $( '#snd_timeisup' );
			
		//buttons
		AD.logo					= $( '#logo' );
		AD.btn_letsgo 			= $( '.btn_letsgo' );
		AD.btn_startnextround 	= $( '.btn_startnextround' );
		AD.btn_playagain 		= $( '.btn_playagain' );
		AD.btn_findyours 		= $( '.btn_findyours' );
		AD.btn_sound			= $( '#sound' );
		
		//all rounds
		AD.faceIcon		= $( '.face-icon' );
		AD.postIt		= $( '.post-it' );
		AD.sel_drinks	= $( '.sel_drinks' );
		AD.txt_timeleft	= $( '#txt_timeleft' );
		AD.timebar		= $( '#timebar' );
		AD.bar_timeleft	= $( '#bar_timeleft' );
		AD.footer		= $( '#footer' );
		AD.spr_score	= $( '#spr_score' );
		AD.sel_drink	= 'none';
		
		AD.currentRound	= 0;
		AD.timer		= null;
		AD.barTimer		= null;
		AD.timeTotal	= 30;
		AD.timeLeft		= 30;
		AD.zero			= 0;
		AD.score		= 0;
        AD.timeisup		= false;
		
		AD.tl 			= new TimelineMax({repeat:-1});
		AD.tl2 			= new TimelineMax({repeat:-1});
		AD.tl3 			= new TimelineMax({repeat:-1});
		
		//round 1
		AD.round_1		= $( '.round_1' );
		AD.postIts1		= $( '.post-its_1' );
		AD.faceIcon1_0	= $( '.ico_face_1-0' );
		AD.faceIcon1_1	= $( '.ico_face_1-1' );
		AD.faceIcon1_2	= $( '.ico_face_1-2' );
		
		//round 2
		AD.round_2		= $( '.round_2' );
		AD.faceIcon2_0	= $( '.ico_face_2-0' );
		AD.faceIcon2_1	= $( '.ico_face_2-1' );
		AD.faceIcon2_2	= $( '.ico_face_2-2' );
		AD.faceIcon2_3	= $( '.ico_face_2-3' );
		
		//round 3
		AD.round_3		= $( '.round_3' );
		AD.faceIcon3_0	= $( '.ico_face_3-0' );
		AD.faceIcon3_1	= $( '.ico_face_3-1' );
		AD.faceIcon3_2	= $( '.ico_face_3-2' );
		AD.faceIcon3_3	= $( '.ico_face_3-3' );
		AD.faceIcon3_4	= $( '.ico_face_3-4' );
		
		//elements
		AD.spr_intro 	= $( '.spr_intro' );
		AD.intro_bg		= $( '#intro_background' );
		AD.audio1		= $( '#audio1' );
		AD.txt_s4		= $( '#txt_s4' );
		AD.txt_s5		= $( '#txt_s5' );

		AD.drinks_PosX		= ['0', '-113px', '-226px', '-339px', '-452px', '-565px', '-678px', '-791px', '-904px', '-1017px', '-1130px', '-1243px', '-1356px', '-1469px', '-1582px'];
		
		AD.drinksTxt_PosY	= ['0', '-59px', '-118px', '-177px', '-236px', '-295px', '-354px', '-413px', '-472px', '-531px', '-590px', '-649px', '-708px', '-767px', '-826px'];
		
		AD.chars_PosX		= ['0', '-168px', '-336px', '-504px', '-672px', '-840px', '-1008px', '-1176px', '-1344px', '-1512px'];
		AD.charsTxt_PosY	= ['0', '-26px', '-52px', '-78px', '-104px', '-130px', '-156px', '-182px', '-208px', '-234px'];
		
		AD.score_PosY		= ['0', '-30px', '-60px', '-90px', '-120px', '-150px', '-180px', '210px', '-240px', '-270px', '-300px', '-330px', '-360px'];
		
		AD.d_browns		= [6,9,10,11];
		AD.d_lemons		= [3,5];
		AD.d_pinks		= [1,2,4,7];
		AD.d_mango		= 0;
		AD.d_vanilla	= 8;
		AD.d_coke		= [12,13];
		AD.d_sprite		= 14;

		AD.r1_browns	= 0;
		AD.r1_lemons	= 0;
		AD.r1_pinks		= 0;
		AD.r1_coke		= 0;
		
		AD.r2_browns	= 0;
		AD.r2_lemons	= 0;
		AD.r2_pinks		= 0;
		AD.r2_coke		= 0;
		
		AD.r3_browns	= 0;
		AD.r3_lemons	= 0;
		AD.r3_pinks		= 0;
		AD.r3_coke		= 0;
		
		AD.r1_coke2		= 0;
		AD.r2_coke2		= 0;
		AD.r3_coke2		= 0;
		
		AD.r1_drinks	= [];
		AD.r2_drinks	= [];
		AD.r3_drinks	= [];
		
		AD.r1_chars		= [0,1,2,3,4,5,6,7,8,9];
		AD.r2_chars		= [0,1,2,3,4,5,6,7,8,9];
		AD.r3_chars		= [0,1,2,3,4,5,6,7,8,9];
		
		AD.r1_drinksPos	= [0,1,2,3,4,5];
		AD.r2_drinksPos	= [0,1,2,3,4,5,6,7];
		AD.r3_drinksPos	= [0,1,2,3,4,5,6,7];
		
		AD.r1_complete	= [false,false,false];
		AD.r2_complete	= [false,false,false,false];
		AD.r3_complete	= [false,false,false,false,false];
		
		AD.r1_order		= [0,1,2];
		AD.r2_order		= [0,1,2,3];
		AD.r3_order		= [0,1,2,3,4];
		
		AD.random		= [AD.r1_order, AD.r2_order, AD.r3_order, AD.r1_drinks, AD.r2_drinks, AD.r3_drinks, AD.r1_chars, AD.r2_chars, AD.r3_chars, AD.r1_drinksPos, AD.r2_drinksPos, AD.r3_drinksPos];
		
		AD.virgin 		= true;
		
        setTimeout( TXCreative.fn_init, 1000);
	}
	
	return {
		init 	: init
	};

})();

/**###################################################
 * SET UP CREATIVE HERE
 * ###################################################
 */		  
var TXCreative = (function () {
	
	function fn_init () {
		
		AD.r1_drinks	= [];
		AD.r2_drinks	= [];
		AD.r3_drinks	= [];
		
		AD.r1_browns	= getRandomInt(0, 3);
		AD.r1_lemons	= getRandomInt(0, 1);
		AD.r1_pinks		= getRandomInt(0, 3);
		AD.r1_coke		= getRandomInt(0, 1);
		
		AD.r2_browns	= [0,1,2,3];
		AD.r2_lemons	= getRandomInt(0, 1);
		AD.r2_pinks		= getRandomInt(0, 3);
		AD.r2_coke		= getRandomInt(0, 1);
		
		AD.r3_browns	= [0,1,2,3]
		AD.r3_lemons	= getRandomInt(0, 1);
		AD.r3_pinks		= getRandomInt(0, 3);
		AD.r3_coke		= getRandomInt(0, 1);
        
        shuffle(AD.r2_browns);
        shuffle(AD.r3_browns);
		
		(AD.r1_coke==1) ? AD.r1_coke2 = 0 : AD.r1_coke2 = 1;
		(AD.r2_coke==1) ? AD.r2_coke2 = 0 : AD.r2_coke2 = 1;
		(AD.r3_coke==1) ? AD.r3_coke2 = 0 : AD.r3_coke2 = 1;
		
		AD.r1_drinks = [AD.d_browns[AD.r1_browns], AD.d_lemons[AD.r1_lemons], AD.d_pinks[AD.r1_pinks], AD.d_mango, AD.d_vanilla];
    
		AD.r2_drinks = [AD.d_browns[AD.r2_browns[0]], AD.d_browns[AD.r2_browns[1]], AD.d_lemons[AD.r2_lemons], AD.d_pinks[AD.r2_pinks], AD.d_mango, AD.d_vanilla, AD.d_sprite,  AD.d_coke[AD.r2_coke2]];
		
		AD.r3_drinks = [AD.d_browns[AD.r3_browns[0]], AD.d_browns[AD.r3_browns[1]], AD.d_lemons[AD.r3_lemons], AD.d_pinks[AD.r3_pinks], AD.d_mango, AD.d_vanilla, AD.d_sprite,  AD.d_coke[AD.r3_coke2]];
        
		AD.r1_drinks.pop(); AD.r1_drinks.pop();
		AD.r1_drinks.push(AD.d_sprite, AD.d_coke[AD.r1_coke2]);
      
      shuffle(AD.r1_drinks);
        
		for (var i=0; i<AD.random.length; i++) {
            shuffle(AD.random[i]);
			if(i==8){                
                var r2_mangoLoc = AD.r2_drinks.indexOf(AD.d_mango),
                    r3_mangoLoc = AD.r3_drinks.indexOf(AD.d_mango),
                    _r2 = AD.r2_drinks.length-1,
                    _r3 = AD.r3_drinks.length-1;
                
                if(r2_mangoLoc != _r2 && r3_mangoLoc != _r3){
                    swapArrayElements( AD.r3_drinks, r3_mangoLoc, _r3) ;
                }
                
				AD.r1_drinks.push(AD.r1_drinks[AD.r1_order[0]]);
				AD.r2_drinks.push(AD.r2_drinks[AD.r2_order[0]]);
				AD.r3_drinks.push(AD.r3_drinks[AD.r3_order[0]]);
                
				AD.r1_drinks[AD.r1_order[0]] = AD.d_coke[AD.r1_coke];
				AD.r2_drinks[AD.r2_order[0]] = AD.d_coke[AD.r2_coke];
				AD.r3_drinks[AD.r3_order[0]] = AD.d_coke[AD.r3_coke];
                
               
                
				fn_round_1();
				fn_round_2();
				fn_round_3();
                
                var r1_0_Pos = $('#drink_1-' + AD.r1_drinksPos[0]).css('background-position').split(" "),
                    r1_1_Pos = $('#drink_1-' + AD.r1_drinksPos[1]).css('background-position').split(" "),
                    r1_2_Pos = $('#drink_1-' + AD.r1_drinksPos[2]).css('background-position').split(" "),

                    r2_0_Pos = $('#drink_2-' + AD.r2_drinksPos[0]).css('background-position').split(" "),
                    r2_1_Pos = $('#drink_2-' + AD.r2_drinksPos[1]).css('background-position').split(" "),
                    r2_2_Pos = $('#drink_2-' + AD.r2_drinksPos[2]).css('background-position').split(" "),
                    r2_3_Pos = $('#drink_2-' + AD.r2_drinksPos[3]).css('background-position').split(" "),

                    r3_0_Pos = $('#drink_3-' + AD.r3_drinksPos[0]).css('background-position').split(" "),
                    r3_1_Pos = $('#drink_3-' + AD.r3_drinksPos[1]).css('background-position').split(" "),
                    r3_2_Pos = $('#drink_3-' + AD.r3_drinksPos[2]).css('background-position').split(" "),
                    r3_3_Pos = $('#drink_3-' + AD.r3_drinksPos[3]).css('background-position').split(" "),
                    r3_4_Pos = $('#drink_3-' + AD.r3_drinksPos[4]).css('background-position').split(" ");
				

				AD.r1_0 = r1_0_Pos[0];
				AD.r1_1 = r1_1_Pos[0];
				AD.r1_2 = r1_2_Pos[0];

				AD.r2_0 = r2_0_Pos[0];
				AD.r2_1 = r2_1_Pos[0];
				AD.r2_2 = r2_2_Pos[0];
				AD.r2_3 = r2_3_Pos[0];

				AD.r3_0 = r3_0_Pos[0];
				AD.r3_1 = r3_1_Pos[0];
				AD.r3_2 = r3_2_Pos[0];
				AD.r3_3 = r3_3_Pos[0];
				AD.r3_4 = r3_4_Pos[0];
				
				shuffle(AD.r1_drinksPos);
				shuffle(AD.r2_drinksPos);
				shuffle(AD.r3_drinksPos);
                
                
                r2_mangoLoc = AD.r2_drinks.indexOf(AD.d_mango);
                r3_mangoLoc = AD.r3_drinks.indexOf(AD.d_mango);
                _r2 = AD.r2_drinks.length-1;
                _r3 = AD.r3_drinks.length-1;
                
                if(r2_mangoLoc != _r2 && r3_mangoLoc != _r3){
                    swapArrayElements( AD.r3_drinks, r3_mangoLoc, _r3) ;
                }
				
				fn_shuffleDrinks ();
				fn_shuffleDrinks ();
				fn_shuffleDrinks ();
				
				setTimeout(function(){
					(AD.virgin) ? fn_STEP1() : fn_STEP2();
				}, 10);
				
				
			}
        }
		
		AD.snd_swoosh.get(0).volume = 0.8;
		AD.snd_grabdrink.get(0).volume = 0.8;
		AD.snd_correct.get(0).volume = 0.8;
		AD.snd_incorrect.get(0).volume = 0.8;
		AD.snd_roundover.get(0).volume = 0.8;
		AD.snd_timeisup.get(0).volume = 0.8;
        
		AD.snd_intro.get(0).play();
	}

	function fn_STEP1 () {
        AD.container.show();
		AD.btn_letsgo.show();
		AD.spr_intro.show();
		gsap.from(AD.spr_intro, 0.5,{z:0.01, delay:0.2, left:350, top:500, ease: Power2.easeOut, onComplete: function(){
            AD.btn_letsgo.css('pointer-events','auto');
        }});
		
		//AD.timer = setTimeout(fn_STEP2, 10000);

		AD.logo.on( 'click', fn_logo);
		AD.btn_letsgo.on( 'click', fn_letsgo);
		AD.btn_startnextround.on( 'click', fn_startnextround);
		AD.btn_playagain.on( 'click', fn_playagain);
		AD.btn_findyours.on( 'click', fn_findyours);
		AD.btn_sound.on( 'click', fn_sound);

		AD.tl.fromTo(AD.round_1, 7, {z:0.01, left:0}, {left:-995, ease: Power0.easeNone});
		AD.tl.play();
	}
	
	function fn_STEP2 () {
		AD.currentRound +=1;		
		AD.txt_timeleft.show();
		AD.timebar.show();
		
		AD.snd_gameplay.get(0).currentTime = 0;
		AD.snd_gameplay.get(0).play();
		AD.snd_intro.get(0).pause();
		
		gsap.to(AD.footer, 0.5,{z:0.01, top: 423, ease: Power2.easeIn});
		
		$('.post-its_'+AD.currentRound).show();
		
		if(AD.virgin){
			clearTimeout(AD.timer);
			AD.btn_letsgo.hide();
			gsap.to(AD.intro_bg, 0.5,{autoAlpha:0, ease: Power2.easeIn});
			gsap.to(AD.spr_intro, 0.5,{z:0.01, left:350, top:500, ease: Power2.easeIn});
			gsap.from($('.post-its_'+AD.currentRound + ' .post-it'), 0.5,{z:0.01, delay:0.7, left:350, top:500, ease: Power2.easeOut});
			
			gsap.delayedCall(0.7,function(){
				AD.snd_swoosh.get(0).currentTime = 0;
				AD.snd_swoosh.get(0).play();
			});
			
			Draggable.create(AD.sel_drinks, {
            onPress: drinks_onPress,
            onRelease: drinks_onRelease,
            type:"x,y", edgeResistance:0, throwProps:true});
			
		} else {
			gsap.from($('.post-its_'+AD.currentRound + ' .post-it'), 0.5,{z:0.01, left:350, top:500, ease: Power2.easeOut});
			AD.snd_swoosh.get(0).currentTime = 0;
			AD.snd_swoosh.get(0).play();
		}

		switch(AD.currentRound){
			case 1:
				AD.timer = setTimeout(fn_STEP3, 5000);
				if(!AD.virgin)AD.tl.fromTo(AD.round_1, 7, {z:0.01, left:0}, {left:-995, ease: Power0.easeNone});
				AD.tl.play();
				AD.virgin = false;
				break;
			case 2:
			   	AD.tl2.fromTo(AD.round_2, 10, {z:0.01, left:0}, {left:-1325, ease: Power0.easeNone});
				gsap.to(AD.round_2, 0.5,{z:0.01, top:90, ease: Power2.easeOut});
				AD.tl2.play();
				AD.timer = setTimeout(fn_STEP3, 6000);
			   	break;
			case 3:
				AD.tl3.fromTo(AD.round_3, 10, {z:0.01, left:0}, {left:-1325, ease: Power0.easeNone});
				gsap.to(AD.round_3, 0.5,{z:0.01, top:90, ease: Power2.easeOut});
				AD.tl3.play();
				AD.timer = setTimeout(fn_STEP3, 6000);
			   	break;
		}
	}
	
	function fn_STEP3 () {
		clearTimeout(AD.timer);
        AD.timeisup = false;
		gsap.to($('.post-its_'+AD.currentRound + ' .post-it'), 0.5,{left:350, top:500, ease: Power2.easeIn, onComplete: function(){
			$('.post-its_'+AD.currentRound).hide();
			$('.face-icons_'+AD.currentRound).show();
			gsap.from($('.face-icons_'+AD.currentRound + ' .face-icon'), 0.5,{z:0.01, left:410, top:500, ease: Power2.easeOut, onComplete: function(){
				fn_timer();
				$('.round_'+AD.currentRound).css('z-index','2');
				$('.face-icons').css('z-index','0');
				$('.sel_drinks').css('pointer-events','auto');
			}});
			AD.snd_swoosh.get(0).currentTime = 0;
			AD.snd_swoosh.get(0).play();
		}});
	}
	
	function fn_STEP4 () {
		AD.txt_s4.show();
		AD.btn_startnextround.show();
		
		AD.txt_timeleft.hide();
		AD.timebar.hide();
		
		$('.sel_drinks').css('pointer-events','none');
		
		gsap.fromTo([AD.txt_s4, AD.btn_startnextround], 0.5,{z:0.01, alpha:0},{delay:0.5, alpha:1, ease: Power2.easeOut});
		
		gsap.to($('.face-icons_'+AD.currentRound), 0.5,{z:0.01, left:-960, ease: Power2.easeIn});	
		gsap.to($('.round_'+AD.currentRound), 0.5,{z:0.01, top:500, ease: Power2.easeIn});
		gsap.to(AD.footer, 0.5,{z:0.01, top:500, ease: Power2.easeIn});
		
		AD.snd_intro.get(0).currentTime = 0;
		AD.snd_intro.get(0).play();
		AD.snd_gameplay.get(0).pause();
	}
	
	function fn_STEP5 () {
		AD.spr_score.css('background-position-y', AD.score_PosY[AD.score]);
		
		AD.txt_timeleft.hide();
		AD.timebar.hide();
		
		$('.sel_drinks').css('pointer-events','none');

		gsap.to($('.face-icons_'+AD.currentRound), 0.5,{z:0.01, left:-960, ease: Power2.easeIn});	
		gsap.to($('.round_'+AD.currentRound), 0.5,{z:0.01, top:500, ease: Power2.easeIn});
		gsap.to(AD.footer, 0.5,{z:0.01, top:500, ease: Power2.easeIn, onComplete: function(){
			AD.txt_s5.show();
			AD.btn_playagain.show();
			AD.btn_findyours.show();
			AD.spr_score.show();
		}});
		
		AD.snd_intro.get(0).currentTime = 0;
		AD.snd_intro.get(0).play();
		AD.snd_gameplay.get(0).pause();
	}
	
	// // // // // // // //  ALL BUTTONS  // // // // // // // //
	
	function fn_logo () {
		window.open("https://www.mcdonalds.com/", "_blank");
	}
	
	function fn_letsgo(){
		fn_STEP2 ();
	}
	
	function fn_startnextround(){
		AD.txt_s4.hide();
		AD.btn_startnextround.hide();
		fn_STEP2 ();
	}
	
	function fn_playagain(){
		AD.currentRound	= 0;
		AD.txt_s5.hide();
		AD.btn_playagain.hide();
		AD.btn_findyours.hide();
		AD.spr_score.hide();
		
		fn_reset();
	}
	
	function fn_findyours () {
		window.open("https://www.mcdonalds.com/", "_blank");
	}
		
	function fn_sound () {
		var isMuted = AD.btn_sound.hasClass( 'mute' );
		if ( isMuted ) {
			AD.btn_sound.removeClass( 'mute' );
			//audio1.get(0).play();
			AD.snd_swoosh.get(0).muted = false;
			AD.snd_intro.get(0).muted = false;
			AD.snd_gameplay.get(0).muted = false;
			AD.snd_grabdrink.get(0).muted = false;
			AD.snd_correct.get(0).muted = false;
			AD.snd_incorrect.get(0).muted = false;
			AD.snd_roundover.get(0).muted = false;
			AD.snd_timeisup.get(0).muted = false;
		}

		else {		
			AD.btn_sound.addClass( 'mute' );
			//audio1.get(0).pause();
			AD.snd_swoosh.get(0).muted = true;
			AD.snd_intro.get(0).muted = true;
			AD.snd_gameplay.get(0).muted = true;
			AD.snd_grabdrink.get(0).muted = true;
			AD.snd_correct.get(0).muted = true;
			AD.snd_incorrect.get(0).muted = true;
			AD.snd_roundover.get(0).muted = true;
			AD.snd_timeisup.get(0).muted = true;
		}
	}
	
	// // // // // // // // // // // // // // // // // // // //
	
	function fn_reset(e){

		AD.r1_complete		= [false,false,false];
		AD.r2_complete		= [false,false,false,false];
		AD.r3_complete		= [false,false,false,false,false];
		
		AD.currentRound		= 0;
		AD.timeLeft			= 30;
		AD.score			= 0;
		
		gsap.set(AD.bar_timeleft, {width: AD.timebar.width()});
		
		gsap.set($('.rounds.round_1'),{top: 90});
		
		gsap.set($('.bg_result'),{autoAlpha:0});
		
		$('.round_'+AD.currentRound).css('z-index','0');
		gsap.set([$('.post-its'),$('.face-icons')],{zIndex:2, left: 0});
		$('.face-icons').hide();
		
		gsap.set(AD.footer, {top: 423});
		
		gsap.set($('.postit_1-0'),{top: 50, left:85});
		gsap.set($('.postit_1-1'),{top: 50, left:380});
		gsap.set($('.postit_1-2'),{top: 50, left:666});
		
		gsap.set($('.postit_2-0'),{top: 50, left:24});
		gsap.set($('.postit_2-1'),{top: 50, left:258});
		gsap.set($('.postit_2-2'),{top: 40, left:488});
		gsap.set($('.postit_2-3'),{top: 50, left:715});
		
		gsap.set($('.postit_3-0'),{top: 50, left:-12});
		gsap.set($('.postit_3-1'),{top: 50, left:177});
		gsap.set($('.postit_3-2'),{top: 50, left:366});
		gsap.set($('.postit_3-3'),{top: 50, left:556});
		gsap.set($('.postit_3-4'),{top: 50, left:747});
		
		gsap.set($('.ico_face_1-0'),{top: 43, left:126});
		gsap.set($('.ico_face_1-1'),{top: 43, left:410});
		gsap.set($('.ico_face_1-2'),{top: 43, left:677});
		
		gsap.set($('.ico_face_2-0'),{top: 43, left:43});
		gsap.set($('.ico_face_2-1'),{top: 43, left:280});
		gsap.set($('.ico_face_2-2'),{top: 43, left:518});
		gsap.set($('.ico_face_2-3'),{top: 43, left:754});
		
		gsap.set($('.ico_face_3-0'),{top: 43, left:26});
		gsap.set($('.ico_face_3-1'),{top: 43, left:212});
		gsap.set($('.ico_face_3-2'),{top: 43, left:400});
		gsap.set($('.ico_face_3-3'),{top: 43, left:586});
		gsap.set($('.ico_face_3-4'),{top: 43, left:772});
		
		$('.spr_drinks').show();
		$('.sel_drinks').css('pointer-events','none');
				
		fn_init ();
		
    }
	
	function fn_shuffleDrinks () {
		for(var i=0; i < 8;i++){
			$('#drink_1-'+AD.r1_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r1_drinks[i]]);
			$('#drink_1-0'+AD.r1_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r1_drinks[i]]);
			
			$('#drink_2-'+AD.r2_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r2_drinks[i]]);
			$('#drink_2-0'+AD.r2_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r2_drinks[i]]);
			
			$('#drink_3-'+AD.r3_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r3_drinks[i]]);
			$('#drink_3-0'+AD.r3_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r3_drinks[i]]);
		}
	}
	
	function fn_round_1 () {
		for(var i=0; i < 6;i++){
			$('#drink_1-'+AD.r1_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r1_drinks[i]]);
			$('#drink_1-0'+AD.r1_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r1_drinks[i]]);
		}
		
		for(var i2=0; i2 < 3;i2++){
			$('.img_drink_1-'+i2).css('background-position-x', AD.drinks_PosX[AD.r1_drinks[i2]]);
			$('.txt_drink_1-'+i2).css('background-position-y', AD.drinksTxt_PosY[AD.r1_drinks[i2]]);
			
			$('.img_char_1-'+i2).css('background-position-x', AD.chars_PosX[AD.r1_chars[i2]]);
			$('.txt_char_1-'+i2).css('background-position-y', AD.charsTxt_PosY[AD.r1_chars[i2]]);
			
			$('.ico_char_1-'+i2).css('background-position-x', AD.chars_PosX[AD.r1_chars[i2]]);
			$('.ico_name_1-'+i2).css('background-position-y', AD.charsTxt_PosY[AD.r1_chars[i2]]);
		}
	}
	
	function fn_round_2 () {
		for(var i=0; i < 8;i++){
			$('#drink_2-'+AD.r2_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r2_drinks[i]]);
			$('#drink_2-0'+AD.r2_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r2_drinks[i]]);
		}
		
		for(var i2=0; i2 < 4;i2++){
			$('.img_drink_2-'+i2).css('background-position-x', AD.drinks_PosX[AD.r2_drinks[i2]]);
			$('.txt_drink_2-'+i2).css('background-position-y', AD.drinksTxt_PosY[AD.r2_drinks[i2]]);
			
			$('.img_char_2-'+i2).css('background-position-x', AD.chars_PosX[AD.r2_chars[i2]]);
			$('.txt_char_2-'+i2).css('background-position-y', AD.charsTxt_PosY[AD.r2_chars[i2]]);
			
			$('.ico_char_2-'+i2).css('background-position-x', AD.chars_PosX[AD.r2_chars[i2]]);
			$('.ico_name_2-'+i2).css('background-position-y', AD.charsTxt_PosY[AD.r2_chars[i2]]);
		}
	}
	
	function fn_round_3 () {
		for(var i=0; i < 8;i++){
			$('#drink_3-'+AD.r3_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r3_drinks[i]]);
			$('#drink_3-0'+AD.r3_drinksPos[i]).css('background-position-x', AD.drinks_PosX[AD.r3_drinks[i]]);
		}
		
		for(var i2=0; i2 < 5;i2++){
			$('.img_drink_3-'+i2).css('background-position-x', AD.drinks_PosX[AD.r3_drinks[i2]]);
			$('.txt_drink_3-'+i2).css('background-position-y', AD.drinksTxt_PosY[AD.r3_drinks[i2]]);
			
			$('.img_char_3-'+i2).css('background-position-x', AD.chars_PosX[AD.r3_chars[i2]]);
			$('.txt_char_3-'+i2).css('background-position-y', AD.charsTxt_PosY[AD.r3_chars[i2]]);
			
			$('.ico_char_3-'+i2).css('background-position-x', AD.chars_PosX[AD.r3_chars[i2]]);
			$('.ico_name_3-'+i2).css('background-position-y', AD.charsTxt_PosY[AD.r3_chars[i2]]);
		}
	}
	
	function fn_timer () {
		switch(AD.currentRound){
			case 1: if(AD.r1_complete[0] && AD.r1_complete[1] && AD.r1_complete[2]) return;
			   break;
			case 2: if(AD.r2_complete[0] && AD.r2_complete[1] && AD.r2_complete[2] && AD.r2_complete[3]) return;
			   break;
			case 3: if(AD.r3_complete[0] && AD.r3_complete[1] && AD.r3_complete[2] && AD.r3_complete[3] && AD.r3_complete[4]) return;
			   break;
		}
		
		AD.timeLeft = AD.timeLeft - 1;
		var progressBarWidth = AD.timeLeft * AD.timebar.width() / AD.timeTotal;
		gsap.to(AD.bar_timeleft, 1,{width: progressBarWidth, ease: Power0.easeNone});
		if(progressBarWidth >= AD.zero) {
			AD.barTimer = setTimeout(fn_timer, 1000);
		} else {
            AD.timeisup = true;
            gsap.to($('.sel_drinks'), 0.1,{x:0,y:0, ease: Power2.easeInOut});
			$('.sel_drinks').css('pointer-events','none');
			AD.snd_timeisup.get(0).currentTime = 0;
			AD.snd_timeisup.get(0).play();
			fn_STEP5 ();
		}
		
	}

	function drinks_onPress(e){		
		switch(AD.currentRound){
			case 1: AD.tl.pause(); break;
			case 2: AD.tl2.pause(); break;
			case 3:	AD.tl3.pause(); break;
		}
		
		AD.snd_grabdrink.get(0).currentTime = 1;
		AD.snd_grabdrink.get(0).play();
		
    }
    
    function drinks_onRelease(e){
		i = '#'+this.target.id;
		AD.sel_drink = this.target.id;
        var sel_Pos = $(i).css('background-position').split(" "),
		    sel_PosX = sel_Pos[0];
		
		switch(AD.currentRound){
			case 1:
				AD.tl.play();
				if (this.hitTest(AD.faceIcon1_0, '50%') && !AD.r1_complete[0]){	
					if(sel_PosX == AD.r1_0){
						AD.r1_complete[0] = true; fn_correct(0);
					} else {
						fn_wrong(0);
					}
				}
				else if (this.hitTest(AD.faceIcon1_1, '50%') && !AD.r1_complete[1]){
					if(sel_PosX == AD.r1_1){
						AD.r1_complete[1] = true; fn_correct(1);
					} else {
						fn_wrong(1);
					}
				}
				else if (this.hitTest(AD.faceIcon1_2, '50%') && !AD.r1_complete[2]){
					if(sel_PosX == AD.r1_2){
						AD.r1_complete[2] = true; fn_correct(2);
					} else {
						fn_wrong(2);
					}
				}
				if(AD.r1_complete[0] && AD.r1_complete[1] && AD.r1_complete[2]){
					clearTimeout(AD.barTimer);
					AD.snd_roundover.get(0).currentTime = 0;
					AD.snd_roundover.get(0).play();
					fn_STEP4 ();
				}
				
			   break;
				
			case 2:
				AD.tl2.play();
				if (this.hitTest(AD.faceIcon2_0, '50%') && !AD.r2_complete[0]){	
					if(sel_PosX == AD.r2_0){
						AD.r2_complete[0] = true; fn_correct(0);
					} else { fn_wrong(0); }
				}
				else if (this.hitTest(AD.faceIcon2_1, '50%') && !AD.r2_complete[1]){
					if(sel_PosX == AD.r2_1){
						AD.r2_complete[1] = true; fn_correct(1);
					} else { fn_wrong(1); }
				}
				else if (this.hitTest(AD.faceIcon2_2, '50%') && !AD.r2_complete[2]){
					if(sel_PosX == AD.r2_2){
						AD.r2_complete[2] = true; fn_correct(2);
					} else { fn_wrong(2); }
				}
				
				else if (this.hitTest(AD.faceIcon2_3, '50%') && !AD.r2_complete[3]){
					if(sel_PosX == AD.r2_3){
						AD.r2_complete[3] = true; fn_correct(3);	
					} else { fn_wrong(3); }
				}
				
				if(AD.r2_complete[0] && AD.r2_complete[1] && AD.r2_complete[2] && AD.r2_complete[3]){
					clearTimeout(AD.barTimer);
					AD.snd_roundover.get(0).currentTime = 0;
					AD.snd_roundover.get(0).play();
					fn_STEP4 ();
				}
				
			   break;
			case 3:
				AD.tl3.play();
				if (this.hitTest(AD.faceIcon3_0, '50%') && !AD.r3_complete[0]){	
					if(sel_PosX == AD.r3_0){
						AD.r3_complete[0] = true; fn_correct(0);
					} else { fn_wrong(0); }
				}
				else if (this.hitTest(AD.faceIcon3_1, '50%') && !AD.r3_complete[1]){
					if(sel_PosX == AD.r3_1){
						AD.r3_complete[1] = true; fn_correct(1);
					} else { fn_wrong(1); }
				}
				else if (this.hitTest(AD.faceIcon3_2, '50%') && !AD.r3_complete[2]){
					if(sel_PosX == AD.r3_2){
						AD.r3_complete[2] = true; fn_correct(2);
					} else { fn_wrong(2); }
				}
				
				else if (this.hitTest(AD.faceIcon3_3, '50%') && !AD.r3_complete[3]){
					if(sel_PosX == AD.r3_3){
						AD.r3_complete[3] = true; fn_correct(3);	
					} else { fn_wrong(3); }
				}
				else if (this.hitTest(AD.faceIcon3_4, '50%') && !AD.r3_complete[4]){
					if(sel_PosX == AD.r3_4){
						AD.r3_complete[4] = true; fn_correct(4);	
					} else { fn_wrong(4); }
				}
				
				if(AD.r3_complete[0] && AD.r3_complete[1] && AD.r3_complete[2] && AD.r3_complete[3] && AD.r3_complete[4]){
					clearTimeout(AD.barTimer);
					AD.snd_roundover.get(0).currentTime = 0;
					AD.snd_roundover.get(0).play();
					fn_STEP5 ();
				}
			   break;
		}
		
      	gsap.to($(i), 0.2,{x:0,y:0, ease: Power2.easeInOut});
    }
	
	function fn_correct(e){
        if(AD.timeisup) return;
        $('.sel_drinks').css('pointer-events','none');
		clearTimeout(AD.barTimer);
		fn_removeSelected();
	  	AD.timeLeft += 10; 
		AD.score +=1;
		if(AD.timeLeft >=30) AD.timeLeft = 30;
		fn_timerBegin();
      	$('#sec_orange').css({'background-position-y': '0', left: AD.bar_timeleft.width()});
		gsap.fromTo($('#sec_orange'), 0.3,{autoAlpha:1},{delay:0.2, autoAlpha:0, ease: Power2.easeIn});
		gsap.fromTo($('#sec_orange'), 0.5,{z:0.01, top:100},{top:80, ease: Power2.easeIn, onComplete: function(){
			$('.sel_drinks').css('pointer-events','auto');
		}});
		
		AD.snd_correct.get(0).currentTime = 0;
		AD.snd_correct.get(0).play();
		
	  	switch(AD.currentRound){
			case 1:
			    $('.bg_result_1-' + e).css({
					'background-color': 'rgba(141, 198, 63, 0.9)',
					'border': 'none',
					'visibility': 'visible',
					'opacity': '1'
				});
			  	$('.result_1-' + e).css('background-position-y', '0');
			  	$('.sec_1-' + e).css('background-position-y', '0');
			  	gsap.fromTo($('.sec_1-' + e), 0.3,{autoAlpha:1},{delay:0.5, autoAlpha:0, ease: Power2.easeIn});
				break;
			case 2:
				$('.bg_result_2-' + e).css({
					'background-color': 'rgba(141, 198, 63, 0.9)',
					'border': 'none',
					'visibility': 'visible',
					'opacity': '1'
				});
			  	$('.result_2-' + e).css('background-position-y', '0');
			  	$('.sec_2-' + e).css('background-position-y', '0');
			  	gsap.fromTo($('.sec_2-' + e), 0.3,{autoAlpha:1},{delay:0.5, autoAlpha:0, ease: Power2.easeIn});
			   break;
			case 3:
				$('.bg_result_3-' + e).css({
					'background-color': 'rgba(141, 198, 63, 0.9)',
					'border': 'none',
					'visibility': 'visible',
					'opacity': '1'
				});
			  	$('.result_3-' + e).css('background-position-y', '0');
			  	$('.sec_3-' + e).css('background-position-y', '0');
			  	gsap.fromTo($('.sec_3-' + e), 0.3,{autoAlpha:1},{delay:0.5, autoAlpha:0, ease: Power2.easeIn});
			   break;
		}
    }
	
	function fn_wrong(e){
        if(AD.timeisup) return;
        $('.sel_drinks').css('pointer-events','none');
		clearTimeout(AD.barTimer);
		AD.timeLeft -= 5;
		fn_timerBegin();
      	$('#sec_orange').css({'background-position-y': '-18px', left: AD.bar_timeleft.width()});
		gsap.fromTo($('#sec_orange'), 0.3,{autoAlpha:1},{delay:0.5, autoAlpha:0, ease: Power2.easeIn});
		gsap.fromTo($('#sec_orange'), 0.5,{z:0.01, top:100},{top:80, ease: Power2.easeIn, onComplete: function(){
			$('.sel_drinks').css('pointer-events','auto');
		}});
		
		AD.snd_incorrect.get(0).currentTime = 0;
		AD.snd_incorrect.get(0).play();
		
	  	switch(AD.currentRound){
			case 1:
				$('.bg_result_1-' + e).css({
					'background-color': 'rgba(97, 97, 97, 0.9)',
					'border': '3px solid #555555',
					'visibility': 'visible'
				});
			  	$('.result_1-' + e).css('background-position-y', '-77px');
			  	$('.sec_1-' + e).css('background-position-y', '-43px');
				gsap.fromTo([$('.sec_1-' + e),$('.bg_result_1-' + e)], 0.5,{autoAlpha:1},{delay:0.2,autoAlpha:0, ease: Power2.easeIn});
				break;
			case 2:
				$('.bg_result_2-' + e).css({
					'background-color': 'rgba(97, 97, 97, 0.9)',
					'border': '3px solid #555555',
					'visibility': 'visible'
				});
			  	$('.result_2-' + e).css('background-position-y', '-77px');
			  	$('.sec_2-' + e).css('background-position-y', '-43px');
				gsap.fromTo([$('.sec_2-' + e),$('.bg_result_2-' + e)], 0.5,{autoAlpha:1},{delay:0.2,autoAlpha:0, ease: Power2.easeIn});
			   break;
			case 3:
				$('.bg_result_3-' + e).css({
					'background-color': 'rgba(97, 97, 97, 0.9)',
					'border': '3px solid #555555',
					'visibility': 'visible'
				});
			  	$('.result_3-' + e).css('background-position-y', '-77px');
			  	$('.sec_3-' + e).css('background-position-y', '-43px');
				gsap.fromTo([$('.sec_3-' + e),$('.bg_result_3-' + e)], 0.5,{autoAlpha:1},{delay:0.2,autoAlpha:0, ease: Power2.easeIn});
			   break;
		}
    }
	
	function fn_timerBegin(e){
		var progressBarWidth = AD.timeLeft * AD.timebar.width() / AD.timeTotal;
		gsap.to(AD.bar_timeleft, 1,{width: progressBarWidth, ease: Power2.easeInOut, onComplete:fn_timer });
    }
	
	function fn_removeSelected(e){
		
		switch(AD.currentRound){
			case 1:
				if(AD.sel_drink == 'drink_1-0' || AD.sel_drink == 'drink_1-00'){
					$('#drink_1-0').hide(); $('#drink_1-00').hide();
				} 
				else if(AD.sel_drink == 'drink_1-1' || AD.sel_drink == 'drink_1-01'){
					$('#drink_1-1').hide(); $('#drink_1-01').hide();
				}
				else if(AD.sel_drink == 'drink_1-2' || AD.sel_drink == 'drink_1-02'){
					$('#drink_1-2').hide(); $('#drink_1-02').hide();
				}
				else if(AD.sel_drink == 'drink_1-3' || AD.sel_drink == 'drink_1-03'){
					$('#drink_1-3').hide(); $('#drink_1-03').hide();
				}
				else if(AD.sel_drink == 'drink_1-4' || AD.sel_drink == 'drink_1-04'){
					$('#drink_1-4').hide(); $('#drink_1-04').hide();
				}
				else if(AD.sel_drink == 'drink_1-5' || AD.sel_drink == 'drink_1-05'){
					$('#drink_1-5').hide(); $('#drink_1-05').hide();
				} else {
					$('#' + AD.sel_drink).hide();
				}
				break;
			case 2:
				if(AD.sel_drink == 'drink_2-0' || AD.sel_drink == 'drink_2-00'){
					$('#drink_2-0').hide(); $('#drink_2-00').hide();
				} 
				else if(AD.sel_drink == 'drink_2-1' || AD.sel_drink == 'drink_2-01'){
					$('#drink_2-1').hide(); $('#drink_2-01').hide();
				}
				else if(AD.sel_drink == 'drink_2-2' || AD.sel_drink == 'drink_2-02'){
					$('#drink_2-2').hide(); $('#drink_2-02').hide();
				}
				else if(AD.sel_drink == 'drink_2-3' || AD.sel_drink == 'drink_2-03'){
					$('#drink_2-3').hide(); $('#drink_2-03').hide();
				}
				else if(AD.sel_drink == 'drink_2-4' || AD.sel_drink == 'drink_2-04'){
					$('#drink_2-4').hide(); $('#drink_2-04').hide();
				}
				else if(AD.sel_drink == 'drink_2-5' || AD.sel_drink == 'drink_2-05'){
					$('#drink_2-5').hide(); $('#drink_2-05').hide();
				} else {
					$('#' + AD.sel_drink).hide();
				}
			   break;
			case 3:
				if(AD.sel_drink == 'drink_3-0' || AD.sel_drink == 'drink_3-00'){
					$('#drink_3-0').hide(); $('#drink_3-00').hide();
				} 
				else if(AD.sel_drink == 'drink_3-1' || AD.sel_drink == 'drink_3-01'){
					$('#drink_3-1').hide(); $('#drink_3-01').hide();
				}
				else if(AD.sel_drink == 'drink_3-2' || AD.sel_drink == 'drink_3-02'){
					$('#drink_3-2').hide(); $('#drink_3-02').hide();
				}
				else if(AD.sel_drink == 'drink_3-3' || AD.sel_drink == 'drink_3-03'){
					$('#drink_3-3').hide(); $('#drink_3-03').hide();
				}
				else if(AD.sel_drink == 'drink_3-4' || AD.sel_drink == 'drink_3-04'){
					$('#drink_3-4').hide(); $('#drink_3-04').hide();
				}
				else if(AD.sel_drink == 'drink_3-5' || AD.sel_drink == 'drink_3-05'){
					$('#drink_3-5').hide(); $('#drink_3-05').hide();
				} else {
					$('#' + AD.sel_drink).hide();
				}
			   break;
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
	
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
    
    function swapArrayElements(arr, indexA, indexB) {
        var temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
    }

	return {
		fn_init : fn_init
	};

})();

TXAd.init();

}());