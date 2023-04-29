/* Project: OnStar | Developer: Neptali Calonge | Date: Jan 05, 2017 */
(function() {

var currentSTEP = 0,
	iReady 		= true,
	s3_loaded 	= false,
	s5_loaded 	= false,
	s6_loaded 	= false,
	videoReplay	= false;
var TXConfig = (function () {
	var creativeImages = [
        'src/bg.jpg',
        'src/logo.png',
        'src/spr_txt.png',
        'src/spr_s2_ico.png'
	];

	var creativeScripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/Draggable.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js'
	];

	var loadedAssets = 0,
	    totalAssets = creativeImages.length + creativeScripts.length;

	return {
		loadedAssets               : loadedAssets,
		totalAssets                : totalAssets,
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
			$( '<img />' ).attr( 'src', url ).on('load', updateAssetsLoaded);
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
		if ( TXConfig.loadedAssets == TXConfig.totalAssets ) TXCreative.render();
	}
	
	return {
		init : init
	};

})();


var TXVideo = (function () {
	var videoStart         	= false,
	    videoFirstQuartile 	= false,
	    videoMidpoint      	= false,
	    videoThirdQuartile 	= false,
	    video,
	    videoOverlay,
	    videoPlayer;

	function init () {
        video           = $( '#video1' );
		videoOverlay    = $( '#overlay' );
		videoPlayer     = $( '#videoPlayer' );
        videoHolder     = $( '#videoHolder' );
        
        videoHolder.css('background-size','100% 100%');

		video.on( 'play', videoStarted );
		video.on( 'ended', videoEnded );
		video.on( 'timeupdate', videoProgress );

		if ( video.attr( 'autoplay' ) ) {
			videoPlayer.css( 'display', 'block' );
			videoOverlay.css( 'display', 'none' );
		}

		videoOverlay.on( 'click', playVideo );
	}

	function destroy () {

        video.get(0).removeAttribute('autoplay');
		var videoPlayerMarkup = videoPlayer.html();
		videoPlayerMarkup = $( videoPlayerMarkup ).removeAttr( 'autoplay' );

		video.off( 'play', videoStarted );
		video.off( 'ended', videoEnded );
		video.off( 'timeupdate', videoProgress );

		gsap.delayedCall( 0.05, function () {
            video.on( 'play', videoStarted );
            video.on( 'ended', videoEnded );
            video.on( 'timeupdate', videoProgress );
		});
	}

	function playVideo () {
		videoPlayer.css( 'display', 'block' );
		videoOverlay.css( 'display', 'none' );
		video.get(0).play();
	}

	/**
	 * -----------------------------------
	 * Video Player Events
	 * -----------------------------------
	 */
	function videoStarted () {

		if ( videoStart ) return;
		videoStart = true;
	}

	function videoEnded () {
        video.get(0).pause();
		video.get(0).currentTime = 0;
		videoPlayer.css( 'display', 'none' );
		videoOverlay.css( 'display', 'block' );
        video.get(0).removeAttribute('autoplay');

		videoStart          = false;
		videoFirstQuartile  = false;
		videoMidpoint       = false;
		videoThirdQuartile  = false;
		videoReplay			= true;
	}

	function videoProgress (e) {

		var progress = e.currentTarget.currentTime / e.currentTarget.duration;

		if( !videoFirstQuartile && progress >= 0.25 ) videoFirstQuartile = true;
		else if ( !videoMidpoint && progress >= 0.50 ) videoMidpoint = true;
		else if ( !videoThirdQuartile && progress >= 0.75 ) videoThirdQuartile = true;
	}
    
    function stopVideo () {
        video.get(0).pause();
		video.get(0).currentTime = 0;
		videoHolder.css( 'display', 'none' );
        video.get(0).removeAttribute('autoplay');

		videoStart         = false;
		videoFirstQuartile = false;
		videoMidpoint      = false;
		videoThirdQuartile = false;
        
    }

	return {
		init      	: init,
		destroy   	: destroy,
		playVideo 	: playVideo,
        stopVideo 	: stopVideo,
		videoReplay	: videoReplay
	};

})();


var TXCreative = (function () {
    currentSTEP = 1;
    
	function render () {
        var cta         = $( '#container #cta' ),
            btn_legal   = $( '#container #legal' ),
            x_legal     = $( '#container #x_legal' ),
            nxt         = $( '#container #nxt' ),
            btn_s3      = $( '#container #btn_s3' ),
            btn_s4      = $( '#container #btn_s4' ),
            btn_s5      = $( '#container #btn_s5' ),
            btn_s6      = $( '#container #btn_s6' );
              
        nxt.on('click', function(){
            if(!iReady) return;
            iReady = false;
            removeAll();
            switch(currentSTEP){
                case 6:
                    btn_s3.css({'background-color':'#0092bd','pointer-events':'none'});
                    $('#btn_s3 .spr_nav').css('background-position','-188px 0');
                    STEP_3.render();
                    break;
                case 3:  
                    btn_s4.css({'background-color':'#0092bd','pointer-events':'none'});
                    $('#btn_s4 .spr_nav').css('background-position','-188px -14px');
                    STEP_4.render();
                    break;
                case 4:  
                    btn_s5.css({'background-color':'#0092bd','pointer-events':'none'});
                    $('#btn_s5 .spr_nav').css('background-position','-188px -28px');
                    STEP_5.render();
                    break;
                case 5:  
                    btn_s6.css({'background-color':'#0092bd','pointer-events':'none'});
                    $('#btn_s6 .spr_nav').css('background-position','-188px -42px');
                    STEP_6.render();
                    break;
            }
            gsap.to(nxt, 0, {x:110});
        });
        
        nxt.on('mouseover', function(){
            gsap.to(nxt, 0.4, {x: 0, ease: Power2.easeInOut});
        });
        
        nxt.on('mouseout', function(){
            gsap.to(nxt, 0.2, {x:110, ease: Power2.easeInOut});
        });
        
        cta.on('click', function(){
            /* switch(currentSTEP){
                case 3: console.log("Meet a Connected Family"); break;
                case 4: console.log("Hear their stories"); break;
                case 5: console.log("Learn how it's possible"); break;
                case 6: console.log("See what AtYourService offers"); break;
            } */
            window.open("https://www.onstar.com/", "_blank");
        });
        
        x_legal.on('click', function(){
            switch(currentSTEP){
                case 3:
                case 6: gsap.to(spr_legal, 0.2, {y: 100, ease: Power2.easeIn});
                    break;
                case 4: gsap.to(spr_legal, 0.2, {y: 70, ease: Power2.easeIn});
                    break;
                case 5: gsap.to(spr_legal, 0.2, {y: 140, ease: Power2.easeIn}); 
                    break;
            }
        });
        
        btn_legal.on('mouseover', function(){
            gsap.to(spr_legal, 0.4, {y: 0, ease: Power2.easeOut});
        });

        TXVideo.init();
        STEP_2.render();

	}
    
    function showNav () {
        var nav_box     = $( '#container #NAV .nav_box' ),  
            cta         = $( '#container #cta' ),
            spr_legal   = $( '#container #spr_legal' ),
            btn_legal   = $( '#container #legal' ),
            nxt         = $( '#container #nxt' ),
            spr_txt     = $( '#container .spr_txt' );
        
        nav_box.on('click', nav_click);
        nav_box.on('mouseover', nav_mouseover);
        nav_box.on('mouseout', nav_mouseout);
        nav_box.css('cursor', 'pointer');
        gsap.to(spr_txt, 0, {y:0});
        
        cta.css('display', 'block');
        btn_legal.css('display', 'block');
        spr_legal.css('display', 'block');
        nxt.css('display', 'block');
        
	}
    
    function nav_click(){
        if(!iReady) return;
        iReady = false;
        removeAll();
        $('#'+this.id).css({'background-color':'#0092bd','pointer-events':'none'});
        switch(this.id){
            case 'btn_s3':
                $('#btn_s3 .spr_nav').css('background-position','-188px 0');
                //console.log("Wifi Hot Spot");
                STEP_3.render();
                break;
            case 'btn_s4':  
                $('#btn_s4 .spr_nav').css('background-position','-188px -14px');
                //console.log("Automatic Crash Response");
                STEP_4.render();
                break;
            case 'btn_s5':  
                $('#btn_s5 .spr_nav').css('background-position','-188px -28px');
                //console.log("Advanced Diagnostics");
                STEP_5.render();
                break;
            case 'btn_s6':  
                $('#btn_s6 .spr_nav').css('background-position','-188px -42px');
                //console.log("AtYourService");
                STEP_6.render();
                break;
        }
    }
    
    function removeAll(){
        var nav_box = $( '#NAV .nav_box' );
        var _S3 = $( '#container #STEP_3' );
        var _S4 = $( '#container #STEP_4' );
        var _S5 = $( '#container #STEP_5' );
        var _S6 = $( '#container #STEP_6' );
        
        if(currentSTEP == 2 || currentSTEP == 4)TXVideo.stopVideo();
        gsap.killTweensOf('*');
        
        _S3.css('display','none');
        _S4.css('display','none');
        _S5.css('display','none');
        _S6.css('display','none');
        
        $('#btn_s3 .spr_nav').css('background-position','0 0');
        $('#btn_s4 .spr_nav').css('background-position','0 -14px');
        $('#btn_s5 .spr_nav').css('background-position','0 -28px');
        $('#btn_s6 .spr_nav').css('background-position','0 -42px');
        
        nav_box.css('pointer-events', 'auto');
        nav_box.css('background','#cfd8df');
    }
        
    function nav_mouseover(e){
        var i = '#' + this.id + ' .spr_nav';
        gsap.to(i, 0.2, {scale: 0.95, ease: Power2.easeInOut});
    }
        
    function nav_mouseout(e){
        var i = '#' + this.id + ' .spr_nav';
        gsap.to(i, 0.1, {scale: 1, ease: Power2.easeInOut});
    }

	return {

		render  : render,
        showNav : showNav
	};

})();

var STEP_2 = (function () {
    
	function render () {
        var _S2         = $( '#container #STEP_2' ),
            video       = $( '#container #video1' ),
            videoHolder = $( '#videoHolder' ),
            spr_txt     = $( '#container .spr_txt' ),
            spr_s2_ico  = $( '#container .spr_s2_ico' ),
            nxt         = $( '#container #nxt' );

        currentSTEP = 2;
        
        spr_txt.css('background-position', '0 -500px');
        spr_s2_ico.css('display', 'block');
        
        gsap.to(spr_s2_ico, 0, {scale: 1});
        gsap.to(nxt, 0, {x: 110});
        spr_s2_ico.on('click', s2_click);
        spr_s2_ico.on('mouseover', s2_mouseover);
        spr_s2_ico.on('mouseout', s2_mouseout);
        
        function s2_click(e){
            var i = this.id;
            spr_s2_ico.off('click');
            video.get(0).src = 'src/video.mp4';
            videoHolder.css('background',"url('src/s4_vid.jpg')");
            gsap.to(_S2, 0.5, {y:-500, ease: Power2.easeIn});
            gsap.to(spr_txt, 0.5, {y:-500, ease: Power2.easeIn, onComplete:
            function(){        
                spr_s2_ico.css('display', 'none');
                    switch(i){
                        case 's2_ico1':  
                            $('#btn_s3').css({'background-color':'#0092bd','pointer-events':'none'});
                            $('#btn_s3 .spr_nav').css('background-position','-188px 0');
                            //console.log("Wifi Hot Spot FRAME 2");
                            STEP_3.render();
                            break;
                        case 's2_ico2':  
                            $('#btn_s4').css({'background-color':'#0092bd','pointer-events':'none'});
                            $('#btn_s4 .spr_nav').css('background-position','-188px -14px');
                            //console.log("Automatic Crash Response FRAME 2");
                            STEP_4.render();
                            break;
                        case 's2_ico3':  
                            $('#btn_s5').css({'background-color':'#0092bd','pointer-events':'none'});
                            $('#btn_s5 .spr_nav').css('background-position','-188px -28px');
                            //console.log("Advanced Diagnostics FRAME 2");
                            STEP_5.render();
                            break;
                        case 's2_ico4':  
                            $('#btn_s6').css({'background-color':'#0092bd','pointer-events':'none'});
                            $('#btn_s6 .spr_nav').css('background-position','-188px -42px');
                            //console.log("AtYourService FRAME 2 ");
                            STEP_6.render();
                            break;
                    }
            }});

        }

        function s2_mouseover(e){
            gsap.to(this, 0.2, {scale: 1.09, y:-3, ease: Power2.easeInOut});
        }

        function s2_mouseout(e){
            gsap.to(this, 0.1, {scale: 1, y:0, ease: Power2.easeInOut});
        }

	}

	return {
		render : render
	};

})();

var STEP_3 = (function () {    
	function render () {
        
        var urls = [
            'src/s3_arw.png',
            'src/spr_s3_img.png',
            'src/spr_s3_txt.png',
            'src/spr_w.png'
        ],

            imgs = [],
            cnt = 0,
            _S3             = $( '#container #STEP_3' ),
            logo            = $( '#container #logo' ),
            NAV             = $( '#container #NAV' ),
            cta             = $( '#container #cta' ),
            spr_legal       = $( '#container #spr_legal' ),
            spr_w           = $( '#STEP_3 .spr_w' ),
            spr_s3_img      = $( '#STEP_3 #spr_s3_img' ),
            spr_s3_txt      = $( '#STEP_3 #spr_s3_txt' ),
            spr_txt         = $( '#container .spr_txt' ),
            blackhole       = $( '#STEP_3 #blackhole' ),
            s3_circle       = $( '#STEP_3 #s3_circle' ),
            s3_arw          = $( '#STEP_3 #s3_arw' ),
            s3_outercircle  = $( '#STEP_3 #s3_outercircle' ),
            s3_outercircle2 = $( '#STEP_3 #s3_outercircle2' ),
            s3_outercircle3 = $( '#STEP_3 #s3_outercircle3' ),
            s3_drop         = $( '#STEP_3 #s3_drop' ),
            nxt_txt             = $( '#container #nxt_txt' ),
            pos_s3_img = [0, '-240px', '-480px', '-720px', '-960px', '-1200px', '-1440px', '-1680px', '-1920px', '-2160px', '-2400px', '-2640px', '-2880px', '-3120px', '-3360px'],
            pos_s3_txt = [0, '-47px' ,'-94px', '-141px', '-188px', '-235px', '-282px', '-329px', '-376px', '-423px', '-470px', '-517px', '-564px', '-611px', '-658px'],
            touched = false,
            w = 'none';

        for (var i = 0; i < urls.length; i++) {
            var img = new Image();
            img.onload = function() {
                ++cnt;
                if (cnt >= urls.length) {
                    s3_reset();
                    _S3.css('display', 'block');
                    gsap.fromTo(_S3, 0.2, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    
                    if(currentSTEP ==2){
                        TXCreative.showNav();
                        NAV.css('display', 'block');
                        gsap.from(NAV, 0.2, {y:-70, ease:Power2.easeOut});
                    }

                    currentSTEP = 3;
                    iReady = true;
                }
            };
            img.src = urls[i];
            imgs.push(img);
        }
        
        if(!s3_loaded){
            s3_loaded = true;
            Draggable.create(spr_w, {
            onPress: s3_onPress,
            onRelease:s3_onRelease,
            onDrag: s3_onDrag,
            type:"x,y", edgeResistance:0, bounds:"#s3_container", throwProps:true});
        }

        function s3_reset(e){
            spr_txt.css('background-position', '0 -1000px');
            cta.css({top:'337px',width:'211px'});
            spr_legal.css({'background-position':'0 0','height':'100px'});
            nxt_txt.css('background-position', '0 0');
            spr_w.css('display', 'block');
            spr_s3_img.css('display', 'none');
            spr_s3_txt.css('display', 'none');
            s3_outercircle2.css('display', 'none');
            s3_outercircle3.css('display', 'none');
            s3_arw.css('opacity', 1);
            gsap.to(spr_w, 0, {scale: 0.82});
            gsap.to(spr_legal, 0, {y: 100});
            gsap.to(s3_circle, 0, {alpha:1, scale: 0.80});
            gsap.to(s3_outercircle, 0, {alpha:1, scale:1});
            gsap.to(s3_outercircle2, 0, {alpha:0, scale:0.74});
            gsap.to(s3_outercircle3, 0, {alpha:0, scale:0.74});
            gsap.killTweensOf('*');
            s3_drop.css('display', 'block');            
        }

        function s3_onPress(e){
            s3_reset();
            gsap.to(this.target, 0.5, {scale: 1, yoyo:true, repeat:-1, ease: Power2.easeInOut});  
            
            switch(this.target.id){
                case 'w01': w=0; break;
                case 'w02': w=1; break;
                case 'w03': w=2; break;
                case 'w04': w=3; break;
                case 'w05': w=4; break;
                case 'w06': w=5; break;
                case 'w07': w=6; break;
                case 'w08': w=7; break;
                case 'w09': w=8; break;
                case 'w10': w=9; break;
                case 'w11': w=10; break;
                case 'w12': w=11; break;
                case 'w13': w=12; break;
                case 'w14': w=13; break;
                case 'w15': w=14; break;
            }
            
        }
        
        function s3_onRelease(e){
            var i = '#' + this.target.id;
            gsap.to(spr_w, 0.1, {scale: 0.82});
            NAV.css('z-index', 10000);
            logo.css('z-index', 10001);
            spr_legal.css('z-index', 10000);
            
            if (this.hitTest(blackhole, '50%')) {
                $(i).css('display', 'none');
                s3_drop.css('display', 'none');
                spr_s3_img.css({display:'block','background-position': '0 '+pos_s3_img[w]});
                spr_s3_txt.css({display:'block','background-position': '0 '+pos_s3_txt[w]});
                s3_outercircle2.css('display', 'block');
                s3_outercircle3.css('display', 'block');
                gsap.fromTo( spr_s3_img, 0.5, {alpha:0}, {alpha:1, ease:Power2.easeOut});
                gsap.fromTo( spr_s3_txt, 0.5, {alpha:0}, {alpha:1, ease:Power2.easeOut});
                gsap.fromTo(s3_outercircle, 3, {scale:0.74,alpha:1}, {scale:1, alpha:0, repeat:-1, ease: Power2.easeOut});
                gsap.fromTo(s3_outercircle2, 3, {scale:0.74,alpha:1}, {delay:1, scale:1, alpha:0, repeat:-1, ease: Power2.easeOut});
                gsap.fromTo(s3_outercircle3, 3, {scale:0.74,alpha:1}, {delay:2, scale:1, alpha:0, repeat:-1, ease: Power2.easeOut});
                gsap.to(s3_circle, 0.2, {alpha:0});
            }
            gsap.to(this.target, 0.3, {x:0,y:0, ease: Power2.easeInOut}); 
        }
        
        function s3_onDrag(e){
            var i = '#' + this.target.id;
             if (this.hitTest(blackhole, '50%')) {
                 if(!touched){
                     touched = true;
                     gsap.to(s3_arw, 0.3, {alpha:0, ease: Power2.easeInOut});
                     gsap.to(s3_outercircle, 0.3, {scale:1.04, ease: Power2.easeInOut});
                     gsap.to(s3_circle, 0.3, {scale:1, ease: Power2.easeInOut});
                 }
               } else {
                 if(touched){
                     touched = false;
                     gsap.to(s3_arw, 0.2, {alpha:1, ease: Power2.easeInOut});
                     gsap.to(s3_outercircle, 0.2, {scale:1, ease: Power2.easeInOut});
                     gsap.to(s3_circle, 0.2, {scale:0.80, ease: Power2.easeInOut});
                 }
               }
        }

    }

	return {
		render : render,
	};

})();

var STEP_4 = (function () {
	function render () {
        
		var spr_txt         = $( '#container .spr_txt' ),
            videoHolder     = $( '#videoHolder' ),
            video           = $( '#video1' ),
            cta             = $( '#container #cta' ),
            spr_legal       = $( '#container #spr_legal' ), 
            nxt_txt         = $( '#container #nxt_txt' ),
            NAV             = $( '#container #NAV' );
        
		
        currentVID 	= 'ACR'; 
		videoReplay = false;
        
        if(currentSTEP ==2){
            TXCreative.showNav();
            NAV.css('display', 'block');
            gsap.from(NAV, 0.2, {y:-70, ease:Power2.easeOut});
        }
        
        currentSTEP = 4;
        
        spr_txt.css('background-position', '0 -1500px');
        cta.css({top:'381px',width:'166px'});
        spr_legal.css({'background-position':'0 -100px','height':'70px'});
        nxt_txt.css('background-position', '0 -68px');
        videoHolder.css('display','block');
        video.get(0).setAttribute("controls","controls");
        gsap.to(spr_legal, 0, {y: 70});
        
        videoHolder.css({left:'353px', top:'133px', width:'585px' , height:'330px', border:'1px solid #c1c1c1'});
        
        videoHolder.css('background-size','100% 100%');
        TXVideo.playVideo();
        iReady = true;
    }

	return {
		render : render
	};

})();

var STEP_5 = (function () {
	function render () {
        
        var urls = [
            'src/spr_s5_car.png',
            'src/spr_s5_ico.png',
            'src/spr_s5_txt.png',
            'src/s5_glow.png',
            'src/s5_txtbox.png',
            'src/s5_bar.png'
        ],

            imgs = [],
            cnt = 0,
        
            _S5             = $( '#container #STEP_5' ),
            spr_txt       = $( '#container .spr_txt' ),
            NAV             = $( '#container #NAV' ),
            cta             = $( '#container #cta' ),
            spr_legal       = $( '#container #spr_legal' ),
            spr_s5_car      = $( '#STEP_5 #spr_s5_car' ),      
            s5_circle       = $( '#STEP_5 #s5_circle' ),
            s5_circle2      = $( '#STEP_5 #s5_circle2' ),
            s5_circle3      = $( '#STEP_5 #s5_circle3' ),
            s5_glow         = $( '#STEP_5 .s5_glow' ),
            spr_s5_txt      = $( '#STEP_5 #spr_s5_txt' ),
            s5_bar          = $( '#STEP_5 #s5_bar' ),
            s5_scrubber     = $( '#STEP_5 #s5_scrubber' ),
            s5_ico_01       = $( '#STEP_5 #s5_ico_01' ),
            s5_ico_02       = $( '#STEP_5 #s5_ico_02' ),
            s5_ico_03       = $( '#STEP_5 #s5_ico_03' ),
            s5_ico_04       = $( '#STEP_5 #s5_ico_04' ),
            s5_ico_05       = $( '#STEP_5 #s5_ico_05' ),
            s5_ico_06       = $( '#STEP_5 #s5_ico_06' ),
            s5_ico_01_on    = $( '#STEP_5 #s5_ico_01_on' ),
            s5_ico_02_on    = $( '#STEP_5 #s5_ico_02_on' ),
            s5_ico_03_on    = $( '#STEP_5 #s5_ico_03_on' ),
            s5_ico_04_on    = $( '#STEP_5 #s5_ico_04_on' ),
            s5_ico_05_on    = $( '#STEP_5 #s5_ico_05_on' ),
            s5_ico_06_on    = $( '#STEP_5 #s5_ico_06_on' ),
            s5_cir          = $( '#STEP_5 .s5_cir' ),
            s5_ico          = $( '#STEP_5 .s5_ico' ),
            s5_ico_on       = $( '#STEP_5 .s5_ico_on' ),
            nxt_txt         = $( '#container #nxt_txt' ),
            w               = 0,
            pos_car = [0,'-251px','-498px','-746px','-992px','-1241px'],
            pos_txt = [0,'-93px','-186px','-279px','-372px','-465px'],
            pos_cir = [{x:'462px',y:'203px'},   {x:'626px',y:'111px'},  {x:'611px',y:'94px'},
                       {x:'720px ',y:'164px'},  {x:'481px',y:'200px'},  {x:'680px ',y:'217px'}],
        
            pos_cir2 = [{x:'741px',y:'203px'},   {x:'-100px',y:'-100px'},  {x:'-100px',y:'-100px'},
                       {x:'-100px ',y:'-100px'},   {x:'758px',y:'200px'},  {x:'-100px',y:'-100px'}],
        
            pos_cir3 = [{x:'-100px',y:'-100px'},   {x:'-100px',y:'-100px'},  {x:'-100px',y:'-100px'},
                       {x:'-100px ',y:'-100px'},   {x:'653px',y:'124px'},  {x:'-100px',y:'-100px'}];
         
        for (var i = 0; i < urls.length; i++) {
            var img = new Image();
            img.onload = function() {
                ++cnt;
                if (cnt >= urls.length) {
                    s5_reset();
                    _S5.css('display', 'block');
                    gsap.fromTo(_S5, 0.2, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    if(currentSTEP ==2){
                        TXCreative.showNav();
                        NAV.css('display', 'block');
                        gsap.from(NAV, 0.2, {y:-70, ease:Power2.easeOut});
                    }
                    currentSTEP = 5;
                }
            };
            img.src = urls[i];
            imgs.push(img);
            imgs.push(img);
        }
        
        spr_legal.css('z-index', 10000);
        
        gsap.fromTo(s5_circle, 3, {rotation:0}, { rotation:360, repeat:-1, ease:Linear.easeNone});
        gsap.fromTo(s5_circle2, 3, {rotation:0}, { rotation:360, repeat:-1, ease:Linear.easeNone});
        gsap.fromTo(s5_circle3, 3, {rotation:0}, { rotation:360, repeat:-1, ease:Linear.easeNone});
        gsap.fromTo(s5_glow, 1, {alpha:1}, { alpha:0.2, yoyo:true, repeat:-1, ease:Linear.easeNone});
        
        if(!s5_loaded){
            s5_loaded = true;
            s5_ico_01.on('click', s5_click);
            s5_ico_02.on('click', s5_click);
            s5_ico_03.on('click', s5_click);
            s5_ico_04.on('click', s5_click);
            s5_ico_05.on('click', s5_click);
            s5_ico_06.on('click', s5_click);
        }
        
        
        function s5_reset(e){
            $( '#container #STEP_5' ).css('display','none');
            spr_txt.css('background-position', '0 -2000px');
            cta.css({top:'345px',width:'201px'});
            spr_legal.css({'background-position':'0 -170px','height':'140px'});
            nxt_txt.css('background-position', '0 -138px');
            spr_s5_car.css('background-position', '0 0');
            spr_s5_txt.css('background-position', '0 0');
            s5_circle.css({left:'462px', top:'203px'});
            s5_circle2.css({left:'741px', top:'203px'});
            s5_circle3.css({left:'-100px', top:'-100px'});
            gsap.to(s5_scrubber, 0, {css:{left:'393px'}});
            gsap.to(s5_ico_01_on, 0, {autoAlpha:1});
            gsap.to(spr_legal, 0, {y: 140});
            
            gsap.fromTo(s5_ico_01_on, 0.3,{scale:1},
                    {scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone,});
            gsap.fromTo(s5_ico_01, 0.3,{scale:1},
                    {scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            
            gsap.fromTo(s5_ico_02_on, 0.3,{scale:1, autoAlpha:0},
                    {delay:0.2, autoAlpha:1,scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            gsap.fromTo(s5_ico_02, 0.3,{scale:1},
                    {delay:0.2, scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            
            gsap.fromTo(s5_ico_03_on, 0.3,{scale:1, autoAlpha:0},
                    {delay:0.4, autoAlpha:1,scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            gsap.fromTo(s5_ico_03, 0.3,{scale:1},
                    {delay:0.4, scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            
            gsap.fromTo(s5_ico_04_on, 0.3,{scale:1, autoAlpha:0},
                    {delay:0.6, autoAlpha:1,scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            gsap.fromTo(s5_ico_04, 0.3,{scale:1},
                    {delay:0.6, scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            
            gsap.fromTo(s5_ico_05_on, 0.3,{scale:1, autoAlpha:0},
                    {delay:0.8, autoAlpha:1,scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            gsap.fromTo(s5_ico_05, 0.3,{scale:1},
                    {delay:0.8, scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            
            gsap.fromTo(s5_ico_06_on, 0.3,{scale:1, autoAlpha:0},
                    {delay:1, autoAlpha:1,scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            gsap.fromTo(s5_ico_06, 0.3,{scale:1},
                    {delay:1, scale:1.2, yoyo:true, repeat:1, ease:Linear.easeNone});
            iReady = true;
        }
        
        s5_scrubber.draggable({axis: "x",
            containment: s5_bar,
            stop: function(){
                if($(this).position().left <=440){
                    gsap.to(s5_scrubber, 0.2, {css:{left:'395px'}, ease: Power2.easeInOut});
                }
                else if($(this).position().left >=441 && $(this).position().left <=533){
                    gsap.to(s5_scrubber, 0.2, {css:{left:'485px'}, ease: Power2.easeInOut});
                }
                else if($(this).position().left >=534 && $(this).position().left <=625){
                    gsap.to(s5_scrubber, 0.2, {css:{left:'580px'}, ease: Power2.easeInOut});
                }
                 else if($(this).position().left >=626 && $(this).position().left <=717){
                    gsap.to(s5_scrubber, 0.2, {css:{left:'671px'}, ease: Power2.easeInOut});
                }
                 else if($(this).position().left >=718 && $(this).position().left <=809){
                    gsap.to(s5_scrubber, 0.2, {css:{left:'763px'}, ease: Power2.easeInOut});
                }
                 else if($(this).position().left >=810){
                    gsap.to(s5_scrubber, 0.2, {css:{left:'854px'}, ease: Power2.easeInOut});
                }
            },
            drag: function(){
                if($(this).position().left <=440){
                if(w!=0)changeFrame(0);
                }
                else if($(this).position().left >=441 && $(this).position().left <=533){
                    if(w!=1)changeFrame(1);
                }
                else if($(this).position().left >=534 && $(this).position().left <=625){
                    if(w!=2)changeFrame(2);
                }
                else if($(this).position().left >=626 && $(this).position().left <=717){
                    if(w!=3)changeFrame(3);
                }
                 else if($(this).position().left >=718 && $(this).position().left <=809){
                    if(w!=4)changeFrame(4);
                }
                 else if($(this).position().left >=810){
                    if(w!=5)changeFrame(5);
                }
            }
        });
        
        function s5_click(){ 
            switch(this.id){
                case 's5_ico_01': if(w!=0)changeFrame(0);
                    gsap.to(s5_scrubber, 0.2, {css:{left:'395px'}, ease: Power2.easeInOut});
                    break;
                case 's5_ico_02': if(w!=1)changeFrame(1);
                    gsap.to(s5_scrubber, 0.2, {css:{left:'485px'}, ease: Power2.easeInOut});
                    break;
                case 's5_ico_03': if(w!=2)changeFrame(2);
                    gsap.to(s5_scrubber, 0.2, {css:{left:'580px'}, ease: Power2.easeInOut});
                    break;
                case 's5_ico_04': if(w!=3)changeFrame(3);
                    gsap.to(s5_scrubber, 0.2, {css:{left:'671px'}, ease: Power2.easeInOut});
                    break;
                case 's5_ico_05': if(w!=4)changeFrame(4);
                    gsap.to(s5_scrubber, 0.2, {css:{left:'763px'}, ease: Power2.easeInOut});
                    break;
                case 's5_ico_06': if(w!=5)changeFrame(5);
                    gsap.to(s5_scrubber, 0.2, {css:{left:'854px'}, ease: Power2.easeInOut});
                    break;
            }
        }
                
        function changeFrame(e){
            w = e;
            var ico = '#s5_ico_0'+(e+1)+'_on';
            spr_s5_car.css('background-position', '0 '+pos_car[e]);
            spr_s5_txt.css('background-position', '0 '+pos_txt[e]);
            s5_circle.css({left:pos_cir[e].x, top:pos_cir[e].y});
            s5_circle2.css({left:pos_cir2[e].x, top:pos_cir2[e].y});
            s5_circle3.css({left:pos_cir3[e].x, top:pos_cir3[e].y});
            gsap.fromTo(spr_s5_txt, 0.2,{alpha:0}, {alpha:1, ease: Power2.easeOut});
            gsap.fromTo(s5_cir, 0.4,{scale:0.3}, {scale:1, ease: Power2.easeOut});
            gsap.to(s5_ico_on, 0.2, {autoAlpha:0});
            gsap.to($(ico), 0.2, {autoAlpha:1});
        }
       
    }

	return {
		render : render
	};

})();

var STEP_6 = (function () {
    
	function render () {
        
        var urls = [
            'src/spr_s6_btn.png',
            'src/spr_s6_ico_q.png',
            'src/spr_s6_ico_r.png',
            'src/spr_s6_txt.png'
        ],

        imgs = [],
        cnt = 0,
        
		_S6             = $( '#container #STEP_6' ),
        spr_txt         = $( '#container .spr_txt' ),
        cta             = $( '#container #cta' ),
        spr_legal       = $( '#container #spr_legal' ),
        nxt_txt         = $( '#container #nxt_txt' ),
        NAV             = $( '#container #NAV' ),
        s6_f1           = $( '#STEP_6 #s6_f1' ),
        s6_f2_left      = $( '#STEP_6 #s6_f2_left' ),
        s6_f2_down      = $( '#STEP_6 #s6_f2_down' ),
        s6_f2_right     = $( '#STEP_6 #s6_f2_right' ),
        s6_f3_01        = $( '#STEP_6 #s6_f3_01' ),
        s6_f3_02        = $( '#STEP_6 #s6_f3_02' ),
        s6_f3_03        = $( '#STEP_6 #s6_f3_03' ),
        s6_f3_04        = $( '#STEP_6 #s6_f3_04' ),
        s6_f3_05        = $( '#STEP_6 #s6_f3_05' ),
        s6_f3_06        = $( '#STEP_6 #s6_f3_06' ),
        
        s6_back         = $( '#STEP_6 #s6_back' ),
        s6_startover    = $( '#STEP_6 #s6_startover' ),
        
        spr_s6_ico_q    = $( '#STEP_6 .spr_s6_ico_q' ),
        
        s6_f_to         = [s6_f1, s6_f1, s6_f1, s6_f2_left, s6_f2_left, s6_f2_down, s6_f2_down, s6_f2_right, s6_f2_right],
        s6_f_from       = [s6_f2_left, s6_f2_down, s6_f2_right, s6_f3_01, s6_f3_02, s6_f3_03, s6_f3_04, s6_f3_05, s6_f3_06],
        
        f1_ico_q1       = $( '#s6_f1 .spr_s6_ico_q' ),
        
        s6_f            = $( '#STEP_6 .s6_f' ),
        s6_q1_txt       = $( '#STEP_6 #s6_q1_txt'),
        s6_ico_goback   = $( '#STEP_6 .s6_ico_goback'),
        s6_ico_startover= $( '#STEP_6 .s6_ico_startover'),
        
        currentBack = 9;
        
        for (var i = 0; i < urls.length; i++) {
            var img = new Image();
            img.onload = function() {
                ++cnt;
                if (cnt >= urls.length) {
                    s6_reset();
                    _S6.css('display', 'block');
                    gsap.fromTo(_S6, 0.2, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    if(currentSTEP ==2){
                        TXCreative.showNav();
                        NAV.css('display', 'block');
                        gsap.from(NAV, 0.2, {y:-70, ease:Power2.easeOut});
                    }
                    
                    currentSTEP = 6;
                    iReady = true;
                }
            };
            img.src = urls[i];
            imgs.push(img);
        }
        
        if(!s6_loaded){
            s6_loaded = true;
            spr_s6_ico_q.on('click', s6_click);
            s6_back.on('click', _s6_back);
            s6_startover.on('click', s6_reset);

            s6_back.on('mouseover', s6_over);
            s6_startover.on('mouseover', s6_over);
            s6_back.on('mouseout', s6_out);
            s6_startover.on('mouseout', s6_out);
        }
        
        
        function s6_reset(e){
            spr_txt.css('background-position', '0 -2500px');
            cta.css({top:'325px',width:'248px'});
            spr_legal.css({'background-position':'0 -310px','height':'100px'});
            nxt_txt.css('background-position', '0 -204px');
            s6_back.css('display','none');
            s6_startover.css('display', 'none');
            gsap.to(spr_legal, 0, {y: 100});
            s6_f.css('display', 'none');
            s6_f1.css('display', 'block');
            f1_ico_q1.css('pointer-events', 'auto');
            
            gsap.fromTo(s6_q1_txt, 0.3, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            gsap.fromTo(f1_ico_q1, 0.5, {scale: 0.2}, {scale: 1, ease: Back.easeOut});
            gsap.to(s6_f, 0, {x:0,y:0});
        }
        
        function s6_over(){
            switch(this.id){
                case 's6_back': 
                    gsap.to(s6_ico_goback, 0.2, {y: -5});
                    break;
                case 's6_startover':
                    gsap.to(s6_ico_startover, 2, {rotation: -360, repeat: -1, ease:Linear.easeNone, transformOrigin:"center 45%"});
                    break;
                }
        }
        
        function s6_out(){
            switch(this.id){
                case 's6_back':
                    gsap.to(s6_ico_goback, 0, {y: 0});
                    break;
                case 's6_startover': 
                    gsap.to(s6_ico_startover, 0, {rotation: 0});
                    break;
                }
        }
                
        function s6_click(){
            s6_back.css('pointer-events','none');
            s6_startover.css('pointer-events', 'none');
            spr_s6_ico_q.css('pointer-events', 'none');
            switch(this.id){
                case 's6_q1_01': currentBack = 0; goLeft();
                    break;
                case 's6_q1_02': currentBack = 1; goDown();
                    break;
                case 's6_q1_03': currentBack = 2; goRight();
                    break;
                case 's6_ico_q2_01_left': currentBack = 3; goLeft();
                    //console.log("COFFEE DISCOUNTS");
                    break;
                case 's6_ico_q2_01_right': currentBack = 4; goDown();
                    //console.log("HOTEL PRICING");
                    break;
                case 's6_ico_q2_02_left': currentBack = 5; goLeft();
                    //console.log("ICED COFFEE");
                    break;
                case 's6_ico_q2_02_right': currentBack = 6; goDown();
                    //console.log("AUDIO BOOKS");
                    break;
                case 's6_ico_q2_03_left': currentBack = 7; goDown();
                    //console.log("STAY AND PLAY");
                    break;
                case 's6_ico_q2_03_right': currentBack = 8; goRight();
                    //console.log("SNACKS AND DRINKS");
                    break;
                }
        }
        
        function goLeft(){
            s6_f_from[currentBack].css('display','block');
            gsap.fromTo(s6_f_to[currentBack], 0.5, {x:0}, {x:640, ease: Power2.easeInOut, onComplete: hideFrame});
            gsap.fromTo(s6_f_from[currentBack], 0.5, {x:-640}, {x:0, ease: Power2.easeInOut});
        }
        
        function goRight(){
            s6_f_from[currentBack].css('display','block');
            gsap.fromTo(s6_f_to[currentBack], 0.5, {x:0}, {x:-640, ease: Power2.easeInOut, onComplete: hideFrame});
            gsap.fromTo(s6_f_from[currentBack], 0.5, {x:640}, {x:0, ease: Power2.easeInOut});
        }
        
        function goDown(){
            s6_f_from[currentBack].css('display','block');
            gsap.fromTo(s6_f_to[currentBack], 0.5, {y:0}, {y:-430, ease: Power2.easeInOut, onComplete: hideFrame});
            gsap.fromTo(s6_f_from[currentBack], 0.5, {y:430}, {y:0, ease: Power2.easeInOut});
        }
        
        function hideFrame(){
            s6_f_to[currentBack].css('display','none');
            check_btn();
            s6_back.css('pointer-events','auto');
            s6_startover.css('pointer-events', 'auto');
            spr_s6_ico_q.css('pointer-events', 'auto');
        }
        function _s6_back(){
            s6_back.css('pointer-events','none');
            s6_startover.css('pointer-events', 'none');
            spr_s6_ico_q.css('pointer-events', 'none');
            switch(currentBack){
                case 0: backLeft(); 
                    s6_back.css('display','none');
                    s6_startover.css('display', 'none');
                    break;
                case 1: backTop();
                    s6_back.css('display','none');
                    s6_startover.css('display', 'none');
                    break;
                case 2: backRight(); 
                    s6_back.css('display','none');
                    s6_startover.css('display', 'none');
                    break;
                case 3:         
                    backLeft();
                    break;
                case 4:  
                    backTop();
                    break;
                case 5:  
                    backLeft();
                    break;
                case 6:  
                    backTop();
                    break;
                case 7:  
                    backTop();
                    break;
                case 8:  
                    backRight();
                    break;
            }
             if(currentBack >=3 && currentBack <=8 ){
                s6_back.css({display:'block','left':'290px'});
                s6_startover.css('display', 'none');
            }
        }
        
        function backLeft(){
            s6_f_to[currentBack].css('display','block');
            gsap.fromTo(s6_f_from[currentBack], 0.5, {x:0}, {x:-640, ease: Power2.easeInOut, onComplete: hideFrame2});
            gsap.fromTo(s6_f_to[currentBack], 0.5, {x:640}, {x:0, ease: Power2.easeInOut});
        }
        
        function backRight(){
            s6_f_to[currentBack].css('display','block');
            gsap.fromTo(s6_f_from[currentBack], 0.5, {x:0}, {x:640, ease: Power2.easeInOut, onComplete: hideFrame2});
            gsap.fromTo(s6_f_to[currentBack], 0.5, {x:-640}, {x:0, ease: Power2.easeInOut});
        }
        
        function backTop(){
            s6_f_to[currentBack].css('display','block');
            gsap.fromTo(s6_f_from[currentBack], 0.5, {y:0}, {y:430, ease: Power2.easeInOut, onComplete: hideFrame2});
            gsap.fromTo(s6_f_to[currentBack], 0.5, {y:-430}, {y:0, ease: Power2.easeInOut});
        }
        
        function hideFrame2(){
            s6_f_from[currentBack].css('display','none');
            if(currentBack == 3 || currentBack == 4 ){ currentBack = 0; }
            if(currentBack == 5 || currentBack == 6 ){ currentBack = 1; }
            if(currentBack == 7 || currentBack == 8 ){ currentBack = 2; }
            s6_back.css('pointer-events','auto');
            s6_startover.css('pointer-events', 'auto');
            spr_s6_ico_q.css('pointer-events', 'auto');
        }
        
        function check_btn(){
             if(currentBack <=2){
                s6_back.css({display:'block','left':'290px'});
                s6_startover.css('display', 'none');
            } else if(currentBack >=3 && currentBack <=8 ){
                s6_back.css({display:'block','left':'240px'});
                s6_startover.css('display', 'block');
            }
            
        }
        
     }

	return {
		render : render
	};

})();

TXAd.init();

}());