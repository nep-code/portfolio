/* Project: Shoe Carnival | Developer: Neptali Calonge | Date: Jun 28, 2016 */
(function() {

var _currentFrame = "none",
    _currentShoe = 10000,
    left_shoe,
    right_shoe,
    Xframes = [0,-960,-1920,-2880,-3840,-4800,-5760,-6720,-7680],
    myCurrentFrame = ['KK_FikShun', 'KK_Josh', 'Simrin_FikShun', 'KK_LilSwagg', 'Kaity_Josh', 'Simrin_LilSwagg', 'Kaity_FikShun', 'Simrin_Josh', 'Kaity_LilSwagg'],
    dancer_left = ['.KK_FikShun_left', '.KK_Josh_left', '.Simrin_FikShun_left', '.KK_LilSwagg_left', '.Kaity_Josh_left', '.Simrin_LilSwagg_left', '.Kaity_FikShun_left', '.Simrin_Josh_left', '.Kaity_LilSwagg_left'],
    dancer_right = ['.KK_FikShun_right', '.KK_Josh_right', '.Simrin_FikShun_right', '.KK_LilSwagg_right', '.Kaity_Josh_right', '.Simrin_LilSwagg_right', '.Kaity_FikShun_right', '.Simrin_Josh_right', '.Kaity_LilSwagg_right'],
    shoes_left = ['url(src/shoes/left/KK_RedBlowfish.png)',
                  'url(src/shoes/left/KK_VansorKeds.png)',
                  'url(src/shoes/left/Simrin_PinkNike.png)',
                  'url(src/shoes/left/KK_WhiteBlowfish.png)',
                  'url(src/shoes/left/Kaidy_StripeRoxy.png)',
                  'url(src/shoes/left/Simrin_Ascics.png)',
                  'url(src/shoes/left/Kaidy_Boots.png)',
                  'url(src/shoes/left/Simrin_BlackBoots.png)',
                  'url(src/shoes/left/Kaidy_BlueNikes.png)'
                 ],
    shoes_right = ['url(src/shoes/right/Fikshun_BlueNike.png)',
                   'url(src/shoes/right/Josh_Ascics.png)',
                   'url(src/shoes/right/FikShun_CamoNike.png)',
                   'url(src/shoes/right/Swagg_BlueSperry.png)',
                   'url(src/shoes/right/Josh_BlackNike.png)',
                   'url(src/shoes/right/Swagg_WhiteConverse.png)',
                   'url(src/shoes/right/Fikshun_RedConverse.png)',
                   'url(src/shoes/right/Josh_RedVans.png)',
                   'url(src/shoes/right/Swagg_GreyKeds.png)'
                  ],
    shop_left = ['KK_RedBlowfish',
                 'KK_VansorKeds',
                 'Simrin_PinkNike',
                 'KK_WhiteBlowfish',
                 'Kaidy_StripeRoxy',
                 'Simrin_Ascics',
                 'Kaidy_Boots',
                 'Simrin_BlackBoots',
                 'Kaidy_BlueNikes'
                 ],
    shop_right = ['Fikshun_BlueNike',
                  'Josh_Ascics',
                  'FikShun_CamoNike',
                  'Swagg_BlueSperry',
                  'Josh_BlackNike',
                  'Swagg_WhiteConverse',
                  'Fikshun_RedConverse',
                  'Josh_RedVans',
                  'Swagg_GreyKeds'
                  ],
    _random,
    right_BGctx,
    left_BGctx,
    left_ctx,
    right_ctx,
    _showresult = false,
    _id,
    _auto,
    _myvote = [false,false,false,false,false,false,false,false,false],
    names_Left = ['\"KK\" HARRIS','\"KK\" HARRIS','SIMRIN PLAYER','\"KK\" HARRIS','KAITY MARTINEZ','SIMRIN PLAYER','KAITY MARTINEZ','SIMRIN PLAYER','KAITY MARTINEZ'],
    names_Right = ['FIK-SHUN','JOSH KILLACKY','FIK-SHUN','LIL SWAGG','JOSH KILLACKY','LIL SWAGG','FIK-SHUN','JOSH KILLACKY','LIL SWAGG'],
    _currentVote = 0,
    _2shoes = false,
    navReady = true,
    AD = {};

AD.dom = {}; //cache DOM elements here

AD.creative = {
        
    _loadedAssets: 0,
    _totalAssets: 0,	
	_images: [], 		        //images array
	_scripts: [], 		        //scripts array
	
	_startPast: false, 			//flags if video start and quartiles have been reached
	_firstQuartilePast: false, 
	_midpointPast: false,
	_thirdQuartilePast: false,
	
    _init: function() {		
		//images to be preloaded
        AD.creative._images = ['src/shoes/left/KK_VansorKeds.png',
                               'src/shoes/left/KK_WhiteBlowfish.png',
                               'src/shoes/left/Simrin_Ascics.png',
                               'src/shoes/left/Simrin_BlackBoots.png',
                               'src/shoes/left/Simrin_PinkNike.png',
                               'src/shoes/left/Kaidy_BlueNikes.png',
                               'src/shoes/left/Kaidy_Boots.png',
                               'src/shoes/left/Kaidy_StripeRoxy.png',
                               'src/shoes/left/KK_RedBlowfish.png',
                               'src/shoes/right/Swagg_BlueSperry.png',
                               'src/shoes/right/Swagg_GreyKeds.png',
                               'src/shoes/right/Swagg_WhiteConverse.png',
                               'src/shoes/right/Fikshun_BlueNike.png',
                               'src/shoes/right/FikShun_CamoNike.png',
                               'src/shoes/right/Fikshun_RedConverse.png',
                               'src/shoes/right/Josh_Ascics.png',
                               'src/shoes/right/Josh_BlackNike.png',
                               'src/shoes/right/Josh_RedVans.png',
                               'src/background.jpg',
                               'src/btn_arrow.png',
                               'src/btn_GoBack.png',
                               'src/btn_shoe.png',
                               'src/nav_bg.png',
                               'src/sc_logo.png',
                               'src/seetheirshoes.png',
                               'src/showemwatchagot.png',
                               'src/txt_watchtheirbattle.png',
                               'src/vidClose.png',
                               'src/vote.png',
                               'src/watchanewbattle.png',
                               'src/watchtheirbattle.png',
                               'src/guys.png',
                               'src/girls.png',
                               'src/dancers/KK_Josh_left.png',
                               'src/dancers/KK_Josh_right.png',
                               'src/dancers/KK_LilSwagg_left.png',
                               'src/dancers/KK_LilSwagg_right.png',
                               'src/dancers/Simrin_FikShun_left.png',
                               'src/dancers/Simrin_FikShun_right.png',
                               'src/dancers/Simrin_Josh_left.png',
                               'src/dancers/Simrin_Josh_right.png',
                               'src/dancers/Simrin_LilSwagg_left.png',
                               'src/dancers/Simrin_LilSwagg_right.png',
                               'src/dancers/Kaity_FikShun_left.png',
                               'src/dancers/Kaity_FikShun_right.png',
                               'src/dancers/Kaity_Josh_left.png',
                               'src/dancers/Kaity_Josh_right.png',
                               'src/dancers/Kaity_LilSwagg_left.png',
                               'src/dancers/Kaity_LilSwagg_right.png',
                               'src/dancers/KK_FikShun_left.png',
                               'src/dancers/KK_FikShun_right.png'
                              ];
		
		//scripts/modules to be preloaded
		AD.creative._scripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/Draggable.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.js',
        ];
		
        AD.creative._totalAssets += AD.creative._images.length + AD.creative._scripts.length; // _totalAssets starts off with 1 for markup
        
		//begin loading assets
		AD.creative._loadImages(AD.creative._images);
    	AD.creative._loadScripts(AD.creative._scripts);	
        
        $( document ).on( "mobileinit", function() {
            $.mobile.loading().hide();  /* Remove Loading Text */ 
            $.mobile.autoInitializePage = false; /* Remove Blue Border */ 
        });
		
	},

	_updateAssetsLoaded: function(){
		AD.creative._loadedAssets += 1;
		if (AD.creative._loadedAssets == AD.creative._totalAssets) AD.creative._startAdProper();
	},

	/*LOAD IMAGES + HANDLERS */
    _loadImages: function(urls) {
        for (var i=0; i<urls.length; i++) {
            var url = urls[i];
            $("<img />").attr("src", url).on('load',AD.creative._onImageLoaded);
        }
    },
	
	_onImageLoaded: function() {
		AD.creative._updateAssetsLoaded();
	},
	
	/*LOAD SCRIPTS + HANDLERS */
	_loadScripts: function(urls) {
        for (var i=0; i<urls.length; i++) {
            var url = urls[i];
            $.getScript(url, AD.creative._onScriptLoaded);
        }
    },
	
	_onScriptLoaded: function() {
		AD.creative._updateAssetsLoaded();
	},
			
	/* INITIALIZE/CACHE DOM & START THE AD */
	_startAdProper: function() {
		AD.creative._videoSetup(); //setup video
        AD.creative.INTRO();
	},
	
	_videoSetup: function(){
		AD.dom.video = $("#container #STEP_2 #videoPlayer");
		AD.dom.video.on("play", AD.creative._videoStarted);
		AD.dom.video.on("ended", AD.creative._videoEnded);
		AD.dom.video.on("timeupdate", AD.creative._videoProgress);
	},
	
	_videoClear: function(e){
		
		var cache = AD.dom.video.html(); //cache videoPlayer markup
		
		//remove video listeners
		AD.dom.video.off("play", AD.creative._videoStarted);
		AD.dom.video.off("ended", AD.creative._videoEnded);
		AD.dom.video.off("timeupdate", AD.creative._videoProgress);
		
		AD.dom.video.html(""); //clear videoPlayer markup/destroy video
		
		gsap.delayedCall(0.05, function(){
			AD.dom.video.html(cache); //re-apply videoPlayer markup
			AD.creative._videoSetup();
		
		});
	},
    
    INTRO: function(e) {
        _random = AD.creative.getRandomInt(0,8);
        function autoAnimate(){
            gsap.to($('.name_left'), 0.2,{css:{'opacity': 0}, ease:Power2.easeIn});
            gsap.to($('.name_right'), 0.2,{css:{'opacity': 0}, ease:Power2.easeIn});
            gsap.to($('.gallery_dancers'), 0.2,{alpha:0, ease:Power2.easeIn,onComplete: doThis});
            function doThis(){
                switch(_currentFrame){
                    case 'KK_FikShun':
                        $('.gallery_dancers').css({left: -7680});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "Kaity_LilSwagg";
                        break;
                    case 'KK_Josh':
                        $('.gallery_dancers').css({left: 0});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "KK_FikShun";
                        break;
                    case 'Simrin_FikShun':
                        $('.gallery_dancers').css({left: -960});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "KK_Josh";
                        break;
                    case 'KK_LilSwagg':
                        $('.gallery_dancers').css({left: -1920});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "Simrin_FikShun";
                        break;
                    case 'Kaity_Josh':
                        $('.gallery_dancers').css({left: -2880});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "KK_LilSwagg";
                        break;
                    case 'Simrin_LilSwagg':
                        $('.gallery_dancers').css({left: -3840});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "Kaity_Josh";
                        break;
                    case 'Kaity_FikShun':
                        $('.gallery_dancers').css({left: -4800});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "Simrin_LilSwagg";
                        break;
                    case 'Simrin_Josh':
                        $('.gallery_dancers').css({left: -5760});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "Kaity_FikShun";
                        break;
                    case 'Kaity_LilSwagg':
                        $('.gallery_dancers').css({left: -6720});
                        gsap.to($('.gallery_dancers'), 0.5,{delay: 0.3, alpha:1});
                        _currentFrame = "Simrin_Josh";
                        break;
                    }	
                AD.creative.evt_changeName();
                }
           
         }
        $("#STEP_1").css("display", "block");
        $("#STEP_1 #swipetoselect" ).text("Swipe to Select 2 Dancers");
        $(".name_left" ).text(names_Left[_random]);
        $(".name_right" ).text(names_Right[_random]);
        $(".gallery_dancers" ).css({'left': Xframes[_random]});
        
        gsap.from( $(dancer_left[_random]), 0.6,{delay:0.5, x:-480, ease:Back.easeOut.config(0.9)});
        gsap.from( $(dancer_right[_random]), 0.6,{delay:0.5, x:960, ease:Back.easeOut.config(0.9)});
        gsap.from($(".name_left"), 0.4,{delay:1, alpha:0, scale:0, ease:Back.easeOut});
        gsap.from($(".name_right"), 0.4,{delay:1, alpha:0, scale:0, ease:Back.easeOut});
        
        gsap.from($("#btn_watchtheirbattle"), 0.5, {delay:1.2, alpha:0});
        gsap.from($("#btn_arrow"), 0.5, {delay:1.2, alpha:0});
        
        gsap.from($("#btn_watchtheirbattle"), 1, {delay:1.6, ease:Elastic.easeOut.config(0.8, 0.3), css:{borderRadius: "25px", width: '50px', left: '455px'}});
        gsap.from($("#btn_watchtheirbattle"), 1, {delay:1.9, ease:Elastic.easeOut.config(2, 0.75), css:{height: "30px",top: '380px'}});
        gsap.from($("#btn_arrow"), 0.3, {delay:1.5, ease:Power2.easeIn, css:{left: '475px'}});
       
        gsap.from($("#txt_watchtheirbattle"), 0.2, {delay:1.9, scaleY:0, alpha: 0, ease:Back.easeOut.config(2.5), onComplete: AD.creative.STEP_1 });
        
        _currentFrame = myCurrentFrame[_random];
        
        _auto = setInterval(autoAnimate, 4000);
	},
	
	STEP_1: function(e) {
        $("#STEP_1").css("display", "block");
        $("#STEP_1 #btn_swipe").on("swipeleft", AD.creative.evt_navleft);
        $("#STEP_1 #btn_swipe").on("swiperight", AD.creative.evt_navright);
        $("#STEP_1 #btn_watchtheirbattle").on("click", AD.creative.STEP_2); 
	},
    
    evt_changeName: function(e) {
        switch(_currentFrame){
            case 'KK_FikShun':
                $( ".name_left" ).text("\"KK\" HARRIS");
                $( ".name_right" ).text("FIK-SHUN");
                _currentVote = 0;
                break;
            case 'KK_Josh':
                $( ".name_left" ).text("\"KK\" HARRIS");
                $( ".name_right" ).text("JOSH KILLACKY");
                _currentVote = 1;
                break;
            case 'Simrin_FikShun':
                $( ".name_left" ).text("SIMRIN PLAYER");
                $( ".name_right" ).text("FIK-SHUN");
                _currentVote = 2;
                break;
            case 'KK_LilSwagg':
                $( ".name_left" ).text("\"KK\" HARRIS");
                $( ".name_right" ).text("LIL SWAGG");
                _currentVote = 3;
                break;
            case 'Kaity_Josh':
                $( ".name_left" ).text("KAITY MARTINEZ");
                $( ".name_right" ).text("JOSH KILLACKY");
                _currentVote = 4;
                break;
            case 'Simrin_LilSwagg':
                $( ".name_left" ).text("SIMRIN PLAYER");
                $( ".name_right" ).text("LIL SWAGG");
                _currentVote = 5;
                break;
            case 'Kaity_FikShun':
                $( ".name_left" ).text("KAITY MARTINEZ");
                $( ".name_right" ).text("FIK-SHUN");
                _currentVote = 6;
                break;
            case 'Simrin_Josh':
                $( ".name_left" ).text("SIMRIN PLAYER");
                $( ".name_right" ).text("JOSH KILLACKY");
                _currentVote = 7;
                break;
            case 'Kaity_LilSwagg':
                $( ".name_left" ).text("KAITY MARTINEZ");
                $( ".name_right" ).text("LIL SWAGG");
                _currentVote = 8;
                break;
        
        }	
        gsap.to($(".name_left"), 0,{delay: 0, scale:0});
        gsap.to($(".name_right"), 0,{delay: 0, scale:0});
        gsap.to($(".name_left"), 0.5,{delay: 0.3, alpha:0.7});
        gsap.to($(".name_right"), 0.5,{delay: 0.3, alpha:0.7});
        gsap.to($(".name_left"), 0.3,{delay: 0.3, scale:1, ease:Back.easeOut});
        gsap.to($(".name_right"), 0.3,{delay: 0.3, scale:1, ease:Back.easeOut});
	},
    
    evt_navleft: function(e) {
        clearTimeout(_auto);
        gsap.to('.name_left', 0, {alpha:0});
        gsap.to('.name_right', 0, {alpha:0});
        function back() {
           $('.gallery_dancers').css({left: 0});
           $("#STEP_1 #btn_swipe").css("display", "block");
        }
        if(_currentFrame == "KK_FikShun"){
            gsap.to('.gallery_dancers', 0.5,{left:-960});
            _currentFrame = "KK_Josh";
        }
        else if(_currentFrame == "KK_Josh"){
            gsap.to('.gallery_dancers', 0.5,{left:-1920});
            _currentFrame = "Simrin_FikShun";
        }
        else if(_currentFrame == "Simrin_FikShun"){
            gsap.to('.gallery_dancers', 0.5,{left:-2880});
            _currentFrame = "KK_LilSwagg";
        }
        else if(_currentFrame == "KK_LilSwagg"){
            gsap.to('.gallery_dancers', 0.5,{left:-3840});
            _currentFrame = "Kaity_Josh";
        }
        else if(_currentFrame == "Kaity_Josh"){
            gsap.to('.gallery_dancers', 0.5,{left:-4800});
            _currentFrame = "Simrin_LilSwagg";
        }
        else if(_currentFrame == "Simrin_LilSwagg"){
            gsap.to('.gallery_dancers', 0.5,{left:-5760});
            _currentFrame = "Kaity_FikShun";
        }
        else if(_currentFrame == "Kaity_FikShun"){
            gsap.to('.gallery_dancers', 0.5,{left:-6720});
            _currentFrame = "Simrin_Josh";
        }
        else if(_currentFrame == "Simrin_Josh"){
            gsap.to('.gallery_dancers', 0.5,{left:-7680});
            _currentFrame = "Kaity_LilSwagg";
        }
        else if(_currentFrame == "Kaity_LilSwagg"){
            gsap.to('.gallery_dancers', 0.5,{left:-8640, onComplete: back});
            _currentFrame = "KK_FikShun";
            $("#STEP_1 #btn_swipe").css("display", "none");
        }
        AD.creative.evt_changeName();
    },
    
    evt_navright: function(e) {
        clearTimeout(_auto);
        gsap.to('.name_left', 0, {alpha:0});
        gsap.to('.name_right', 0, {alpha:0});

        if(_currentFrame == "KK_FikShun"){
            $('.gallery_dancers').css({left: -8640});
            gsap.to('.gallery_dancers', 0.5,{left:-7680});
            _currentFrame = "Kaity_LilSwagg";
        }
        else if(_currentFrame == "KK_Josh"){      
            gsap.to('.gallery_dancers', 0.5,{left:0});
            _currentFrame = "KK_FikShun";
        }
        else if(_currentFrame == "Simrin_FikShun"){
            gsap.to('.gallery_dancers', 0.5,{left:-960});
            _currentFrame = "KK_Josh";
        }
        else if(_currentFrame == "KK_LilSwagg"){
            gsap.to('.gallery_dancers', 0.5,{left:-1920});
            _currentFrame = "Simrin_FikShun";
        }
        else if(_currentFrame == "Kaity_Josh"){
            gsap.to('.gallery_dancers', 0.5,{left:-2880});
            _currentFrame = "KK_LilSwagg";
        }
        else if(_currentFrame == "Simrin_LilSwagg"){
            gsap.to('.gallery_dancers', 0.5,{left:-3840});
            _currentFrame = "Kaity_Josh";
        }
        else if(_currentFrame == "Kaity_FikShun"){
            gsap.to('.gallery_dancers', 0.5,{left:-4800});
            _currentFrame = "Simrin_LilSwagg";
        }
        else if(_currentFrame == "Simrin_Josh"){
            gsap.to('.gallery_dancers', 0.5,{left:-5760});
            _currentFrame = "Kaity_FikShun";
        }
        else if(_currentFrame == "Kaity_LilSwagg"){
            gsap.to('.gallery_dancers', 0.5,{left:-6720});
            _currentFrame = "Simrin_Josh";
        }
        AD.creative.evt_changeName();
    },
    
    STEP_2: function(e) {
        clearTimeout(_auto);
        $("#STEP_1").css("display", "none");
        $("#STEP_2").css("display", "block");
        $("#btn_vidClose").css("display", "block");
        $("#STEP_1 #btn_swipe").off("swipeleft");
        $("#STEP_1 #btn_swipe").off("swiperight");
        $("#STEP_1 #btn_watchtheirbattle").off("click");
        $("#STEP_2 #btn_vidClose").on("click", AD.creative._onClicks);
        switch(_currentFrame){
            case 'KK_FikShun':
                AD.dom.video.attr('src', 'src/video/KK_FikShun.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "148px", "top": "394px"});
                $("#STEP_3 #btn_shoeright").css({"left": "889px", "top": "371px"});
                _currentVote = 0;
                break;
            case 'KK_Josh':
                AD.dom.video.attr('src', 'src/video/KK_Josh.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "128px", "top": "394px"});
                $("#STEP_3 #btn_shoeright").css({"left": "839px", "top": "381px"});
                _currentVote = 1;
                break;
            case 'Simrin_FikShun':
                AD.dom.video.attr('src', 'src/video/Simrin_FikShun.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "104px", "top": "384px"});
                $("#STEP_3 #btn_shoeright").css({"left": "830px", "top": "381px"});
                _currentVote = 2;
                break;
            case 'KK_LilSwagg':
                AD.dom.video.attr('src', 'src/video/KK_LilSwagg.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "105px", "top": "394px"});
                $("#STEP_3 #btn_shoeright").css({"left": "864px", "top": "396px"});
                _currentVote = 3;
                break;
            case 'Kaity_Josh':
                AD.dom.video.attr('src', 'src/video/Kaity_Josh.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "105px", "top": "394px"});
                $("#STEP_3 #btn_shoeright").css({"left": "864px", "top": "396px"});
                _currentVote = 4;
                break;
            case 'Simrin_LilSwagg':
                AD.dom.video.attr('src', 'src/video/Simrin_LilSwagg.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "123px", "top": "394px"});
                $("#STEP_3 #btn_shoeright").css({"left": "845px", "top": "390px"});
                _currentVote = 5;
                break;
            case 'Kaity_FikShun':
                AD.dom.video.attr('src', 'src/video/Kaity_FikShun.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "83px", "top": "334px"});
                $("#STEP_3 #btn_shoeright").css({"left": "861px", "top": "360px"});
                _currentVote = 6;
                break;
            case 'Simrin_Josh':
                AD.dom.video.attr('src', 'src/video/Simrin_Josh.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "112px", "top": "365px"});
                $("#STEP_3 #btn_shoeright").css({"left": "852px", "top": "400px"});
                _currentVote = 7;
                break;
            case 'Kaity_LilSwagg':
                AD.dom.video.attr('src', 'src/video/Kaity_LilSwagg.mp4');
                $("#STEP_3 #btn_shoeleft").css({"left": "105px", "top": "368px"});
                $("#STEP_3 #btn_shoeright").css({"left": "876px", "top": "395px"});
                _currentVote = 8;
                break;
        }	
        AD.dom.video.get(0).play();
	},
	
    STEP_3: function(e) {
        $("#STEP_3").css("display", "block");
        $("#STEP_3 #s3_vs").text("vs.");
        $("#STEP_2 #btn_vidClose").off("click");
        $("#STEP_3 #btn_watchanewbattle").on("click", AD.creative._onClicks);
        
        if(_myvote[_currentVote] == false){
            if(_showresult == true){
                    right_ctx.clearRect(0,0,160,160);
                    left_ctx.clearRect(0,0,160,160);
                }
            $("#STEP_3 #s3_title").text("WHO WON?");
            $("#STEP_3 #btn_voteleft").on("click", AD.creative._onClicks);
            $("#STEP_3 #btn_voteright").on("click", AD.creative._onClicks);
            //PERCENT BAR BG (LEFT)
            left_BGctx = document.getElementById('bar_BGleft').getContext('2d');
            left_BGctx.strokeStyle = "rgba(235,255,29, 0.5)"; //rgb(238,29,69)
            left_BGctx.beginPath();
            left_BGctx.arc(80, 80, 64,0,2*Math.PI);
            left_BGctx.lineWidth = 14;
            left_BGctx.stroke();
            left_BGctx.shadowBlur=5;
            left_BGctx.shadowColor="black";
            //PERCENT BAR BG (RIGHT)
            right_BGctx = document.getElementById('bar_BGright').getContext('2d');
            right_BGctx.strokeStyle = "rgba(235,255,29, 0.5)"; //rgb(238,29,69)
            right_BGctx.beginPath();
            right_BGctx.arc(80, 80, 64,0,2*Math.PI);
            right_BGctx.lineWidth = 14;
            right_BGctx.stroke();
            right_BGctx.shadowBlur=5;
            right_BGctx.shadowColor="black";
        } else {
            AD.creative.show_RESULT();
        }
        
        $("#STEP_3 #btn_shoeleft").on("click", AD.creative._onClicks);
        $("#STEP_3 #btn_shoeright").on("click", AD.creative._onClicks);
        $("#STEP_3 #btn_seetheirshoes").on("click", AD.creative._onClicks);   
        
	},
    
    show_RESULT: function (e){
        _showresult = true;
        $("#STEP_3 #btn_voteleft").css("display", "none");
        $("#STEP_3 #btn_voteright").css("display", "none");
        $( "#STEP_3 #s3_title" ).text("LIVE RESULTS");
        var _voteData = [];
        var _totalVotes = 0;
        var _votes = [];
        
        _voteData = [{category:"1", vote:"11", vote_count:"10"},
                     {category:"1", vote:"12", vote_count:"90"},
                      
                     {category:"2", vote:"21", vote_count:"20"},
                     {category:"2", vote:"22", vote_count:"80"},
                     
                     {category:"3", vote:"31", vote_count:"30"},
                     {category:"3", vote:"32", vote_count:"80"},
                      
                     {category:"4", vote:"41", vote_count:"40"},
                     {category:"4", vote:"42", vote_count:"70"},
                     
                     {category:"5", vote:"51", vote_count:"50"},
                     {category:"5", vote:"52", vote_count:"60"},
                      
                     {category:"6", vote:"61", vote_count:"60"},
                     {category:"6", vote:"62", vote_count:"55"},
                     
                     {category:"7", vote:"71", vote_count:"70"},
                     {category:"7", vote:"72", vote_count:"45"},
                      
                     {category:"8", vote:"81", vote_count:"85"},
                     {category:"8", vote:"82", vote_count:"30"},
                      
                     {category:"9", vote:"91", vote_count:"90"},
                     {category:"9", vote:"92", vote_count:"25"}];
        
         switch(_currentFrame){
            case 'KK_FikShun':
                _votes[0] = parseFloat(_voteData[0].vote_count);
				_votes[1] = parseFloat(_voteData[1].vote_count);
                break;
            case 'KK_Josh':
                _votes[0] = parseFloat(_voteData[2].vote_count);
				_votes[1] = parseFloat(_voteData[3].vote_count);
                break;
            case 'Simrin_FikShun':
                _votes[0] = parseFloat(_voteData[4].vote_count);
				_votes[1] = parseFloat(_voteData[5].vote_count);
                break;
            case 'KK_LilSwagg':
                _votes[0] = parseFloat(_voteData[6].vote_count);
				_votes[1] = parseFloat(_voteData[7].vote_count);
                break;
            case 'Kaity_Josh':
                _votes[0] = parseFloat(_voteData[8].vote_count);
				_votes[1] = parseFloat(_voteData[9].vote_count);
                break;
            case 'Simrin_LilSwagg':
                _votes[0] = parseFloat(_voteData[10].vote_count);
				_votes[1] = parseFloat(_voteData[11].vote_count);
                break;
            case 'Kaity_FikShun':
                _votes[0] = parseFloat(_voteData[12].vote_count);
				_votes[1] = parseFloat(_voteData[13].vote_count);
                break;
            case 'Simrin_Josh':
                _votes[0] = parseFloat(_voteData[14].vote_count);
				_votes[1] = parseFloat(_voteData[15].vote_count);
                break;
            case 'Kaity_LilSwagg':
                _votes[0] = parseFloat(_voteData[16].vote_count);
				_votes[1] = parseFloat(_voteData[17].vote_count);
                break;
        
        }
        
        for (var i in _votes){ 
            _totalVotes += _votes[i];
        }
        var start = 4.72,
        cw = 160,
        ch = 160, 
        left_al = 0,
        left_diff,
        right_al = 0,
        right_diff;
        //COLOR CODING
        left_ctx = document.getElementById('bar_voteleft').getContext('2d');
        left_BGctx = document.getElementById('bar_BGleft').getContext('2d');
        right_ctx = document.getElementById('bar_voteright').getContext('2d');
        right_BGctx = document.getElementById('bar_BGright').getContext('2d');
        right_BGctx.clearRect(0,0,160,160);
        left_BGctx.clearRect(0,0,160,160);
        right_ctx.clearRect(0,0,160,160);
        left_ctx.clearRect(0,0,160,160);
        if(_votes[0] >= _votes[1]){
            left_BGctx.strokeStyle = "rgba(235,255,29, 0.5)"; //rgb(238,29,69)
            left_BGctx.stroke();
            left_ctx.strokeStyle = '#ebff1d';
            left_ctx.fillStyle = '#ebff1d';
            
            right_BGctx.strokeStyle = "rgba(238,29,69, 0.5)";
            right_BGctx.stroke();
            right_ctx.strokeStyle = '#ee1d45';
            right_ctx.fillStyle = '#ee1d45';
                
        } else {
            left_BGctx.strokeStyle = "rgba(238,29,69, 0.5)"; //rgb(238,29,69)
            left_BGctx.stroke();
            left_ctx.strokeStyle = '#ee1d45';
            left_ctx.fillStyle = '#ee1d45';
                
            right_BGctx.strokeStyle = "rgba(235,255,29, 0.5)"; //rgb(238,29,69)
            right_BGctx.stroke();
            right_ctx.strokeStyle = '#ebff1d';
            right_ctx.fillStyle = '#ebff1d';
        }
            
        function left_progressSim(){
            left_diff = ((left_al / 100)* Math.PI*2*14).toFixed(2);
            left_ctx.clearRect(0, 0, cw, ch);
            left_ctx.lineWidth = 14;
            
            
            left_ctx.textAlign = 'center';
            left_ctx.font="25px myFont";
            left_ctx.shadowBlur=7;
            left_ctx.shadowColor="black";
            left_ctx.fillText(left_al + '%', cw *.5, ch *.5+10, cw);
            left_ctx.beginPath();
            left_ctx.arc(80, 80, 64, start, left_diff/14+ start, false);
            left_ctx.stroke();
            if(left_al >= Math.round((_votes[0] / _totalVotes) *100)){
                clearTimeout(left_sim);
                // Add scripting here that will run when progress completes
            }
            left_al++;
        }
        
         function right_progressSim(){
            right_diff = ((right_al / 100) * Math.PI*2*14).toFixed(2);
            right_ctx.clearRect(0, 0, cw, ch);
            right_ctx.lineWidth = 14;             
            right_ctx.textAlign = 'center';
            right_ctx.font="25px myFont";
            right_ctx.shadowBlur=7;
            right_ctx.shadowColor="black";
            right_ctx.fillText(right_al + '%', cw *.5, ch *.5+10, cw);
            right_ctx.beginPath();
            right_ctx.arc(80, 80, 64, start, right_diff/14+ start, false);
            right_ctx.stroke();
            if(right_al >= Math.round((_votes[1] / _totalVotes) *100)){
                clearTimeout(right_sim);
                // Add scripting here that will run when progress completes
            }
            right_al++;
         }
        var left_sim = setInterval(left_progressSim, 10);
        var right_sim = setInterval(right_progressSim, 10);
    },
    
    STEP_4: function(e) {
        $("#STEP_4").css("display", "block");
        $("#STEP_4 #btn_GoBack").on("click", AD.creative._onClicks);
        $("#STEP_4 #btn_shopnow").on("click", AD.creative._onClicks);
        $("#STEP_4 #s4_navleft").on("click", AD.creative._onClicks);
        $("#STEP_4 #s4_navright").on("click", AD.creative._onClicks);
        $("#STEP_4 #swipetoscroll").text("Swipe To Scroll");
               //GSAP
               Draggable.create("#STEP_4 #gallery_shoes", {
                    type:"left",
                    zIndexBoost:false,
                    throwProps:false,
                    onDragEnd:function(e) {
                        AD.creative._shoeUP();
                    },
                    onDrag:function() {
                        var XPos = $("#STEP_4 #gallery_shoes").position().left;
                        if(XPos <= -2925){     
                            $("#STEP_4 #gallery_shoes").animate({'left': -2925},0);
                            return false;
                            
                        }
                        if(XPos >= 390){
                            $("#STEP_4 #gallery_shoes").animate({'left': 390},0);
                            return false;   
                        }
                    },
                    onDragStart:function() {
                       if(_2shoes){
                            _2shoes = false;
                            $("#STEP_4 #PairOfShoes").css('display', 'none');
                            $("#STEP_4 #btn_shopnow1").css("display", 'none');
                            $("#STEP_4 #btn_shopnow2").css("display", 'none');
                       }else{
                            gsap.killTweensOf($(_id));
                            AD.creative._shoeDOWN();
                       }
                       
                    }
                   
                });
    },
    
    _shoeDOWN: function(){
        if(!_2shoes){
            var ids = ['#shoe_1','#shoe_2','#shoe_3','#shoe_4','#shoe_5','#shoe_6','#shoe_7','#shoe_8','#shoe_9','#shoe_10','#shoe_11','#shoe_12','#shoe_13','#shoe_14','#shoe_15','#shoe_16','#shoe_17','#shoe_18','#shoe_1c','#shoe_2c','#shoe_3c','#shoe_4c','#shoe_5c'];
                    var n = 0;
                    for (i = 0; i < ids.length; i++) {
                        $(ids[i]).css('left', n + 'px');
                        n = n + 195;
                    }

            $("#STEP_4 .myShoe").animate({
                'width': "185px",
                'height': "185px",
                'background-size': "105%",
                "zIndex": "0",
                'top': "0px",
                'box-shadow': '0px 0px 0px black',
                'border-width': '0px'
                },0);
        } else{ 
            $("#STEP_4 #PairOfShoes").css('display', 'none');
            $("#STEP_4 #btn_shopnow1").css("display", 'none');
            $("#STEP_4 #btn_shopnow2").css("display", 'none');
            _2shoes = false
        }
    },
    
    _shoeUP: function(e){
        var p = $("#STEP_4 #gallery_shoes"),
        pos = p.position();
        gsap.delayedCall(0.5, ()=> $("#STEP_4 #btn_shopnow").css("display", "block"));
        
        function doThis(){
            gsap.to($(_id), 0.3,{css:{
            'width': '251px',
            'height': '322px',
            'zIndex': '100',
            'top': '-37px',
            'box-shadow': '0px 2px 21px black',
            'border-width': '1px',
            'left': ($(_id).position().left-38) + "px"
            }, ease:Back.easeOut.config(1.5)
            });
            gsap.to($(_id), 0.2,{delay:0.1,css:{'background-size': '100%' }});            
        }   
                
        if(pos.left >= 293){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '390px' }});
            _id = '#shoe_1'; doThis(); _currentShoe = 390;
            }
        else if(pos.left <= 292 && pos.left >= 1){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '195px' }});
            _id = '#shoe_2'; doThis(); _currentShoe = 195; 
            }
        else if(pos.left <= 0 && pos.left >= -97){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '0px' }});
            _id = '#shoe_3'; doThis(); _currentShoe = 0 ;
            }
        else if(pos.left <= -98 && pos.left >= -292){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-195px' }});
            _id = '#shoe_4'; doThis(); _currentShoe = -195;
            }
        else if(pos.left <= -293 && pos.left >= -487){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-390px' }});
            _id = '#shoe_5'; doThis(); _currentShoe = -390;
            }
        else if(pos.left <= -488 && pos.left >= -684){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-585px' }});
            _id = '#shoe_6'; doThis(); _currentShoe = -585; 
            }
        else if(pos.left <= -685 && pos.left >= -877){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-780px' }});
            _id = '#shoe_7'; doThis(); _currentShoe = -780;
            }
        else if(pos.left <= -878 && pos.left >= -1072){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-975px' }});
            _id = '#shoe_8'; doThis(); _currentShoe = -975;
            }
        else if(pos.left <= -1073 && pos.left >= -1267){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-1170px' }});
            _id = '#shoe_9'; doThis(); _currentShoe = -1170;
            }
        else if(pos.left <= -1268 && pos.left >= -1462){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-1365px' }});
            _id = '#shoe_10'; doThis(); _currentShoe = -1365;
            }
        else if(pos.left <= -1463 && pos.left >= -1657){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-1560px' }});
            _id = '#shoe_11'; doThis(); _currentShoe = -1560;
            }
        else if(pos.left <= -1657 && pos.left >= -1852){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-1755px' }});
            _id = '#shoe_12'; doThis(); _currentShoe = -1755;
            }
        else if(pos.left <= -1853 && pos.left >= -2047){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-1950px' }});
            _id = '#shoe_13'; doThis(); _currentShoe = -1950;
            }
        else if(pos.left <= -2048 && pos.left >= -2242){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-2145px' }});
            _id = '#shoe_14'; doThis(); _currentShoe = -2145;
            }
        else if(pos.left <= -2243 && pos.left >= -2437){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-2340px' }});
            _id = '#shoe_15'; doThis(); _currentShoe = -2340;
            }
        else if(pos.left <= -2438 && pos.left >= -2632){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-2535px' }});
            _id = '#shoe_16'; doThis(); _currentShoe = -2535;
            }
        else if(pos.left <= -2633 && pos.left >= -2827){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-2730px' }});
            _id = '#shoe_17'; doThis(); _currentShoe = -2730;
            }
        else if(pos.left <= -2828){
            gsap.to($("#STEP_4 #gallery_shoes"), 0.3,{css:{'left': '-2925px' }});
            _id = '#shoe_18'; doThis(); _currentShoe = -2925;
            }
        
        if(pos.left <= -1268){
            $("#STEP_4 #girls").css("opacity", '0.5');
            $("#STEP_4 #guys").css("opacity", '1');
        } else{
            $("#STEP_4 #girls").css("opacity", '1');
            $("#STEP_4 #guys").css("opacity", '0.5');
        }
    },
    
    _pairOfShoes: function(e){
        var p = $("#STEP_4 #gallery_shoes"),
        pos = p.position();
        $("#STEP_4 #btn_shopnow1").on("click", AD.creative._onClicks);
        $("#STEP_4 #btn_shopnow2").on("click", AD.creative._onClicks);
        switch(_currentFrame){
            case 'KK_FikShun':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/KK_RedBlowfish.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Fikshun_BlueNike.png)');
                break;
            case 'KK_Josh':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/KK_VansorKeds.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Josh_Ascics.png)');
                break;
            case 'Simrin_FikShun':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/Simrin_PinkNike.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'urlsrc/shoes/right/FikShun_CamoNike.png)');
                break;
            case 'KK_LilSwagg':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/KK_WhiteBlowfish.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Swagg_BlueSperry.png)');
                break;
            case 'Kaity_Josh':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/Kaidy_StripeRoxy.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Josh_BlackNike.png)');
                break;
            case 'Simrin_LilSwagg':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/Simrin_Ascics.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Swagg_WhiteConverse.png)');
                break;
            case 'Kaity_FikShun':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/Kaidy_Boots.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Fikshun_RedConverse.png)');
                break;
            case 'Simrin_Josh':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/Simrin_BlackBoots.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Josh_RedVans.png)');
                break;
            case 'Kaity_LilSwagg':
                $("#STEP_4 #pairshoe_1").css("background-image", 'url(src/shoes/left/Kaidy_BlueNikes.png)');
                $("#STEP_4 #pairshoe_2").css("background-image", 'url(src/shoes/right/Swagg_GreyKeds.png)');
                break;
        }
        p.css('left', '-1273px');
        AD.creative._dynamicShoes();
        
        $("#STEP_4 #pairshoe_1").css('left', '1540px');
        $("#STEP_4 #pairshoe_2").css('left', '1775px');
        $("#STEP_4 .myShoes").css({
            'width': "185px",
            'height': "185px",
            'background-size': "105%",
            "zIndex": "0",
            'top': "0px",
            'box-shadow': '0px 0px 0px black',
            'border-width': '0px'
        }); 
        $("#STEP_4 #PairOfShoes").css("display", 'block');
        $("#STEP_4 #btn_shopnow1").css("display", 'block');
        $("#STEP_4 #btn_shopnow2").css("display", 'block');
        gsap.to($('#STEP_4 #pairshoe_1'), 0.3,{css:{
            'width': '251px',
            'height': '322px',
            'zIndex': '100',
            'top': '-37px',
            'box-shadow': '0px 2px 21px black',
            'border-width': '1px',
            'left': '1492px'
            }, ease:Back.easeOut.config(1.5)
            });
        gsap.to($('#STEP_4 #pairshoe_2'), 0.3,{css:{
            'width': '251px',
            'height': '322px',
            'zIndex': '100',
            'top': '-37px',
            'box-shadow': '0px 2px 21px black',
            'border-width': '1px',
            'left': '1755px'
            }, ease:Back.easeOut.config(1.5)
            });
        gsap.to($('.myShoes'), 0.2,{delay:0.1,css:{'background-size': '100%' }}); 
        _id = '#shoe_8'; _currentShoe = -1273;
        $("#STEP_4 #girls").css("opacity", '1');
        $("#STEP_4 #guys").css("opacity", '1');
    },
    
    _dynamicShoes: function(e){
        switch(_currentFrame){
            case 'KK_FikShun':
                right_shoe = shop_right.indexOf('Fikshun_BlueNike');
                left_shoe = shop_left.indexOf('KK_RedBlowfish');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/KK_RedBlowfish.png)');
                shoes_right.unshift('url(src/shoes/right/Fikshun_BlueNike.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('KK_RedBlowfish');
                shop_right.unshift('Fikshun_BlueNike');
                break;
            case 'KK_Josh':
                right_shoe = shop_right.indexOf('Josh_Ascics');
                left_shoe = shop_left.indexOf('KK_VansorKeds');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/KK_VansorKeds.png)');
                shoes_right.unshift('url(src/shoes/right/Josh_Ascics.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('KK_VansorKeds');
                shop_right.unshift('Josh_Ascics');
                break;
            case 'Simrin_FikShun':
                right_shoe = shop_right.indexOf('FikShun_CamoNike');    
                left_shoe = shop_left.indexOf('Simrin_PinkNike');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/Simrin_PinkNike.png)');
                shoes_right.unshift('url(src/shoes/right/FikShun_CamoNike.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('Simrin_PinkNike');
                shop_right.unshift('FikShun_CamoNike');
                break;
            case 'KK_LilSwagg':
                right_shoe = shop_right.indexOf('Swagg_BlueSperry');   
                left_shoe = shop_left.indexOf('KK_WhiteBlowfish');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/KK_WhiteBlowfish.png)');
                shoes_right.unshift('url(src/shoes/right/Swagg_BlueSperry.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('KK_WhiteBlowfish');
                shop_right.unshift('Swagg_BlueSperry');
                break;
            case 'Kaity_Josh':
                right_shoe = shop_right.indexOf('Josh_BlackNike');   
                left_shoe = shop_left.indexOf('Kaidy_StripeRoxy');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/Kaidy_StripeRoxy.png)');
                shoes_right.unshift('url(src/shoes/right/Josh_BlackNike.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('Kaidy_StripeRoxy');
                shop_right.unshift('Josh_BlackNike');
                break;
            case 'Simrin_LilSwagg':
                right_shoe = shop_right.indexOf('Swagg_WhiteConverse'); 
                left_shoe = shop_left.indexOf('Simrin_Ascics');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/Simrin_Ascics.png)');
                shoes_right.unshift('url(src/shoes/right/Swagg_WhiteConverse.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('Simrin_Ascics');
                shop_right.unshift('Swagg_WhiteConverse');
                break;
            case 'Kaity_FikShun':
                right_shoe = shop_right.indexOf('Fikshun_RedConverse');  
                left_shoe = shop_left.indexOf('Kaidy_Boots');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/Kaidy_Boots.png)');
                shoes_right.unshift('url(src/shoes/right/Fikshun_RedConverse.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('Kaidy_Boots');
                shop_right.unshift('Fikshun_RedConverse');
                break;
            case 'Simrin_Josh':
                right_shoe = shop_right.indexOf('Josh_RedVans');  
                left_shoe = shop_left.indexOf('Simrin_BlackBoots');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/Simrin_BlackBoots.png)');
                shoes_right.unshift('url(src/shoes/right/Josh_RedVans.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('Simrin_BlackBoots');
                shop_right.unshift('Josh_RedVans');
                break;
            case 'Kaity_LilSwagg':
                right_shoe = shop_right.indexOf('Swagg_GreyKeds');
                left_shoe = shop_left.indexOf('Kaidy_BlueNikes');
                shoes_left.splice(left_shoe,1); shoes_right.splice(right_shoe,1);
                shoes_left.push('url(src/shoes/left/Kaidy_BlueNikes.png)');
                shoes_right.unshift('url(src/shoes/right/Swagg_GreyKeds.png)');
                shop_left.splice(left_shoe,1); shop_right.splice(right_shoe,1);
                shop_left.push('Kaidy_BlueNikes');
                shop_right.unshift('Swagg_GreyKeds');
                break;
        }
        
        $("#STEP_4 #shoe_1").css("background-image", shoes_left[0]);
        $("#STEP_4 #shoe_2").css("background-image", shoes_left[1]);
        $("#STEP_4 #shoe_3").css("background-image", shoes_left[2]);
        $("#STEP_4 #shoe_4").css("background-image", shoes_left[3]);
        $("#STEP_4 #shoe_5").css("background-image", shoes_left[4]);    
        $("#STEP_4 #shoe_6").css("background-image", shoes_left[5]);
        $("#STEP_4 #shoe_7").css("background-image", shoes_left[6]);
        $("#STEP_4 #shoe_8").css("background-image", shoes_left[7]);
        $("#STEP_4 #shoe_9").css("background-image", shoes_left[8]);
        $("#STEP_4 #shoe_10").css("background-image", shoes_right[0]);
        $("#STEP_4 #shoe_11").css("background-image", shoes_right[1]);
        $("#STEP_4 #shoe_12").css("background-image", shoes_right[2]);
        $("#STEP_4 #shoe_13").css("background-image", shoes_right[3]);        
        $("#STEP_4 #shoe_14").css("background-image", shoes_right[4]);        
        $("#STEP_4 #shoe_15").css("background-image", shoes_right[5]);        
        $("#STEP_4 #shoe_16").css("background-image", shoes_right[6]);
        $("#STEP_4 #shoe_17").css("background-image", shoes_right[7]);
        $("#STEP_4 #shoe_18").css("background-image", shoes_right[8]);
        
    },
    _onClicks: function(e){
        if(!navReady) return;
        navReady = false;
        gsap.delayedCall(0.5, ()=> navReady = true);
        switch(this.id){
            case "btn_vidClose":                  
                AD.dom.video.get(0).pause();
                AD.dom.video.get(0).currentTime = 0;
                $("#STEP_2").css("display", "none");
                AD.creative.STEP_3();

                //exit fullscreen
                /* if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0)
                    AD.dom.video.get(0).webkitExitFullscreen();

                if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                      document.webkitExitFullscreen();
                    }
                } */

                AD.creative._startPast 			=
                AD.creative._firstQuartilePast 	=
                AD.creative._midpointPast 		= 
                AD.creative._thirdQuartilePast 	= false;
                AD.creative._videoClear();
                break;
            case "btn_watchanewbattle":
                _random = AD.creative.getRandomInt(0,8);
                $("#STEP_3 #btn_watchanewbattle").off("click");
                $("#STEP_3 #btn_voteleft").off("click");
                $("#STEP_3 #btn_voteright").off("click");
                $("#STEP_3 #btn_shoeleft").off("click");
                $("#STEP_3 #btn_shoeright").off("click");
                $("#STEP_3 #btn_seetheirshoes").off("click");
                $("#STEP_3").css("display", "none");
                $("#STEP_3 #btn_voteleft").css("display", "block");
                $("#STEP_3 #btn_voteright").css("display", "block");
            
                right_BGctx.clearRect(0,0,160,160);
                left_BGctx.clearRect(0,0,160,160);
                if(_showresult == true){
                    right_ctx.clearRect(0,0,160,160);
                    left_ctx.clearRect(0,0,160,160);
                }
                
                AD.creative.STEP_1();
                
                $(".name_left" ).text(names_Left[_random]);
                $(".name_right" ).text(names_Right[_random]);
                $(".gallery_dancers" ).css({'left': Xframes[_random]});

                gsap.from( $(dancer_left[_random]), 0.6,{x:-480, ease:Back.easeOut.config(0.9)});
                gsap.from( $(dancer_right[_random]), 0.6,{ x:960, ease:Back.easeOut.config(0.9)});
                gsap.from($(".name_left"), 0.4,{alpha:0, scale:0, ease:Back.easeOut});
                gsap.from($(".name_right"), 0.4,{alpha:0, scale:0, ease:Back.easeOut});

                _currentFrame = myCurrentFrame[_random];
                break;
            case "btn_voteleft":
                 _myvote[_currentVote] = true;
                 AD.creative.show_RESULT();
                break;
            case "btn_voteright":
                _myvote[_currentVote] = true;
                AD.creative.show_RESULT();
                break;
            case "btn_shoeleft":
                AD.creative._dynamicShoes();
                _currentShoe = -1170;
                $("#STEP_3").css("display", "none");
                $("#STEP_4 #gallery_shoes").css('left', "-1170px");
                AD.creative.STEP_4(); AD.creative._shoeUP();
                $("#STEP_4 #btn_shopnow1").css("display", 'none');
                $("#STEP_4 #btn_shopnow2").css("display", 'none');
                $("#STEP_4 #PairOfShoes").css("display", "none");
                break;
            case "btn_shoeright":
                AD.creative._dynamicShoes();
                _currentShoe = -1365;
                $("#STEP_3").css("display", "none");
                $("#STEP_4 #gallery_shoes").css('left', "-1365px");
                AD.creative.STEP_4(); AD.creative._shoeUP();
                $("#STEP_4 #btn_shopnow1").css("display", 'none');
                $("#STEP_4 #btn_shopnow2").css("display", 'none');
                $("#STEP_4 #PairOfShoes").css("display", "none");
                break;
            case "btn_seetheirshoes":
                $("#STEP_3").css("display", "none");
                AD.creative.STEP_4();
                AD.creative._pairOfShoes();
                _2shoes = true;
                break;
            case "btn_GoBack":
                _2shoes = false;
                AD.creative._shoeDOWN();
                $("#STEP_4").css("display", "none");
                $("#STEP_3").css("display", "block");
                $("#STEP_4 #btn_GoBack").off("click");
                $("#STEP_4 #btn_shopnow").off("click");
                $("#STEP_4 #s4_navleft").off("click");
                $("#STEP_4 #s4_navright").off("click");
                $("#STEP_4 #btn_shopnow1").off("click");
                $("#STEP_4 #btn_shopnow2").off("click");
                break;
            case "btn_shopnow":
                /* if(_currentShoe === 390) console.log(shop_left[0]);
                else if(_currentShoe === 195) console.log(shop_left[1]);
                else if(_currentShoe === 0) console.log(shop_left[2]);
                else if(_currentShoe === -195) console.log(shop_left[3]);
                else if(_currentShoe === -390) console.log(shop_left[4]);
                else if(_currentShoe === -585) console.log(shop_left[5]);
                else if(_currentShoe === -780) console.log(shop_left[6]);
                else if(_currentShoe === -975) console.log(shop_left[7]);
                else if(_currentShoe === -1170) console.log(shop_left[8]);
                else if(_currentShoe === -1365) console.log(shop_right[0]);
                else if(_currentShoe === -1560) console.log(shop_right[1]);
                else if(_currentShoe === -1755) console.log(shop_right[2]);
                else if(_currentShoe === -1950) console.log(shop_right[3]);
                else if(_currentShoe === -2145) console.log(shop_right[4]);
                else if(_currentShoe === -2340) console.log(shop_right[5]);
                else if(_currentShoe === -2535) console.log(shop_right[6]);
                else if(_currentShoe === -2730) console.log(shop_right[7]);
                else if(_currentShoe === -2925) console.log(shop_right[8]); */
                window.open("https://www.shoecarnival.com/", "_blank");
                break;
            case "s4_navleft":
                gsap.killTweensOf(_id);
                if(_currentShoe == -1273){
                    AD.creative._shoeDOWN();
                    gsap.to('#STEP_4 #gallery_shoes', 0.2,{
                        css:{'left': "-975px" }, onComplete: AD.creative._shoeUP});
                }
                else{
                    if(_currentShoe != 390){
                        AD.creative._shoeDOWN();
                        gsap.to('#STEP_4 #gallery_shoes', 0.2,{
                            css:{'left': (_currentShoe+195) + "px" }, onComplete: AD.creative._shoeUP});
                        }
                }
                break;
            case "s4_navright":
                gsap.killTweensOf(_id);
                if(_currentShoe == -1273){
                    AD.creative._shoeDOWN();
                    gsap.to('#STEP_4 #gallery_shoes', 0.2,{
                        css:{'left': "-1560px" }, onComplete: AD.creative._shoeUP});
                }
                else{
                    if(_currentShoe != -2925){
                        AD.creative._shoeDOWN();
                        gsap.to('#STEP_4 #gallery_shoes', 0.2,{
                            css:{'left': (_currentShoe-195) + "px" }, onComplete: AD.creative._shoeUP});
                        }
                }
                break;
            case "btn_shopnow1": 
                /* if(_currentFrame == "KK_FikShun") console.log("KK_RedBlowfish");
                else if(_currentFrame == "KK_Josh") console.log("KK_VansorKeds");
                else if(_currentFrame == "Simrin_FikShun") console.log("Simrin_PinkNike");
                else if(_currentFrame == "KK_LilSwagg") console.log("KK_WhiteBlowfish");
                else if(_currentFrame == "Kaity_Josh") console.log("Kaidy_StripeRoxy");
                else if(_currentFrame == "Simrin_LilSwagg") console.log("Simrin_Ascics");
                else if(_currentFrame == "Kaity_FikShun") console.log("Kaidy_Boots");
                else if(_currentFrame == "Simrin_Josh") console.log("Simrin_BlackBoots");
                else if(_currentFrame == "Kaity_LilSwagg") console.log("Kaidy_BlueNikes"); */
                window.open("https://www.shoecarnival.com/", "_blank");
                break;
            case "btn_shopnow2": 
                /* if(_currentFrame == "KK_FikShun") console.log("Fikshun_BlueNike");
                else if(_currentFrame == "KK_Josh") console.log("Josh_Ascics");
                else if(_currentFrame == "Simrin_FikShun") console.log("FikShun_CamoNike");
                else if(_currentFrame == "KK_LilSwagg") console.log("Swagg_BlueSperry");
                else if(_currentFrame == "Kaity_Josh") console.log("Josh_BlackNike");
                else if(_currentFrame == "Simrin_LilSwagg") console.log("Swagg_WhiteConverse");
                else if(_currentFrame == "Kaity_FikShun") console.log("Fikshun_RedConverse");
                else if(_currentFrame == "Simrin_Josh") console.log("Josh_RedVans");
                else if(_currentFrame == "Kaity_LilSwagg") console.log("Swagg_GreyKeds"); */
                window.open("https://www.shoecarnival.com/", "_blank");
                break;
        } 
    },
    
    _playVideo: function(e) {
		AD.creative.video.get(0).play();
        //AD.creative._scene2();
         
    },
	
	_videoStarted: function(e) {
		
		if(AD.creative._startPast)
			return;
			
		AD.creative._startPast = true;
		
        /* switch(_currentFrame){
            case 'KK_FikShun': console.log('[KK_FikShun Vid Start]'); break;
            case 'KK_Josh': console.log('[KK_Josh Vid Start]'); break;
            case 'Simrin_FikShun': console.log('[Simrin_FikShun Vid Start]'); break;
            case 'KK_LilSwagg': console.log('[KK_LilSwagg Vid Start]'); break;
            case 'Kaity_Josh': console.log('[Kaity_Josh Vid Start]'); break;
            case 'Simrin_LilSwagg': console.log('[Simrin_LilSwagg Vid Start]'); break;
            case 'Kaity_FikShun': console.log('[Kaity_FikShun Vid Start]'); break;
            case 'Simrin_Josh': console.log('[Simrin_Josh Vid Start]'); break;
            case 'Kaity_LilSwagg': console.log('[Kaity_LilSwagg Vid Start]'); break;
        } */
		
	},
	
	_videoEnded: function(e) {
		
		AD.dom.video.get(0).currentTime = 0;
		AD.creative._startPast 			=
		AD.creative._firstQuartilePast 	=
		AD.creative._midpointPast 		= 
		AD.creative._thirdQuartilePast 	= false;
		
        /* switch(_currentFrame){
            case 'KK_FikShun': console.log('[KK_FikShun Vid Complete]'); break;
            case 'KK_Josh': console.log('[KK_Josh Vid Complete]'); break;
            case 'Simrin_FikShun': console.log('[Simrin_FikShun Vid Complete]'); break;
            case 'KK_LilSwagg': console.log('[KK_LilSwagg Vid Complete]'); break;
            case 'Kaity_Josh': console.log('[Kaity_Josh Vid Complete]'); break;
            case 'Simrin_LilSwagg': console.log('[Simrin_LilSwagg Vid Complete]'); break;
            case 'Kaity_FikShun': console.log('[Kaity_FikShun Vid Complete]'); break;
            case 'Simrin_Josh': console.log('[Simrin_Josh Vid Complete]'); break;
            case 'Kaity_LilSwagg': console.log('[Kaity_LilSwagg Vid Complete]'); break;
        } */
		
		//destroy and reset video
		AD.creative._videoClear();
        $("#STEP_2").css("display", "none");
		AD.creative.STEP_3();
	},
	
	_videoProgress: function(e) {
		
		var progress = e.currentTarget.currentTime / e.currentTarget.duration;
        
        /* switch(_currentFrame){
            case 'KK_FikShun':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[KK_FikShun Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[KK_FikShun Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[KK_FikShun Vid Q3]');
                }
                break;
            case 'KK_Josh':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[KK_Josh Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[KK_Josh Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[KK_Josh Vid Q3]');
                }
                break;
            case 'Simrin_FikShun':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[Simrin_FikShun Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[Simrin_FikShun Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[Simrin_FikShun Vid Q3]');
                }
                break;
            case 'KK_LilSwagg':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[KK_LilSwagg Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[KK_LilSwagg Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[KK_LilSwagg Vid Q3]');
                }
                break;
            case 'Kaity_Josh':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[Kaity_Josh Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[Kaity_Josh Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[Kaity_Josh Vid Q3]');
                }
                break;
            case 'Simrin_LilSwagg':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[Simrin_LilSwagg Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[Simrin_LilSwagg Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[Simrin_LilSwagg Vid Q3]');
                }
                break;
            case 'Kaity_FikShun':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[Kaity_FikShun Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[Kaity_FikShun Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[Kaity_FikShun Vid Q3]');
                }
                break;
            case 'Simrin_Josh':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[Simrin_Josh Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[Simrin_Josh Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[Simrin_Josh Vid Q3]');
                }
                break;
            case 'Kaity_LilSwagg':
                if (!AD.creative._firstQuartilePast && progress >= 0.25) {
                  AD.creative._firstQuartilePast = true; //console.log('[Kaity_LilSwagg Vid Q1]');
                } else if (!AD.creative._midpointPast && progress >= 0.50) {
                  AD.creative._midpointPast = true; //console.log('[Kaity_LilSwagg Vid Q2]');
                } else if (!AD.creative._thirdQuartilePast && progress >= 0.75) {
                  AD.creative._thirdQuartilePast = true; //console.log('[Kaity_LilSwagg Vid Q3]');
                }
                break;
        } */
		
	},
	    
    getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
	
AD.creative._init();
	
}());