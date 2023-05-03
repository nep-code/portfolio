/* Project: Amazon | Developer: Neptali Calonge | Date: Jan 25, 2019 */
(function () {

var TXConfig = (function() {
    // ADD INITIAL IMAGES HERE [GIF,PNG,JPG]:
    var init_Images = [
            'src/bg.jpg',
            'src/logo.png',
            'src/intro-title.png',
            'src/intro-cta-mic.png',
            'src/intro-cta-no-mic.png',
            'src/intro-cta-no-mic-white.png',
            'src/intro-cta-mic-white.png',
            'src/cta-mic.png',
            'src/cta-mic-no.png',
            'src/cta.png',
            'src/mic-ico.png',
            'src/bg-blur.jpg',
            'src/shadow.png',
            'src/alexa-aliens.png',
            'src/alexa-barrel.png',
            'src/alexa-bedtime.png',
            'src/alexa-jetpack.png',
            'src/alexa-lights.png',
            'src/alexa-toilet.png',
            'src/mic-text.png',
            'src/mic-circle.png',
            'src/mic-off.png',
            'src/mic-circle-animation.png',
            'src/mic.png',
            'src/timeout-title.png',
            'src/timeout-cta-mic.png',
            'src/timeout-cta-no-mic.png'

        ],
        init_JS = [],
        loadedAssets = 0,
        totalAssets = init_Images.length + init_JS.length,
        is_started = false,
        is_mobile = ("ontouchstart" in document.documentElement) ? true : false;

    return {
        loadedAssets: loadedAssets,
        totalAssets: totalAssets,
        is_started: is_started,
        init_Images: init_Images,
        init_JS: init_JS,
        is_mobile: is_mobile
    };

})();

var TXAd = (function() {

    function init() {
        loadImages(TXConfig.init_Images);
        loadScripts(TXConfig.init_JS);
    }

    function loadImages(urls) {
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            $('<img />').attr('src', url).on('load', updateAssetsLoaded);
        }
    }

    function loadScripts(urls) {
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            $.getScript(url, updateAssetsLoaded);
        }
    }

    function updateAssetsLoaded() {
        TXConfig.loadedAssets += 1;
        if (TXConfig.loadedAssets == TXConfig.totalAssets) TXCreative.init();
    }

    return {
        init: init
    };

})();

/**###################################################
 * SET UP GLOBAL VARIABLES HERE
 * ###################################################
 */
var AD = {};

/**###################################################
 * SET UP CREATIVE HERE
 * ###################################################
 */
var TXCreative = (function() {

    function init() {
        TXCreative.updateScale();
        $(window).resize(updateScale);
        TXMain.init();
    }

    function updateScale() {
        var transform = $('#container').css('transform');
        if (transform != 'none') {
            try {
                var values = transform.split('(')[1];
                values = values.split(')')[0];
                values = values.split(',');
                var a = values[0];
                var b = values[1];
                AD.scale = Math.sqrt(a * a + b * b);
            } catch (e) {
                AD.scale = 1;
            }
        } else {
            AD.scale = 1;
        }
            
    }

    return {
        init: init,
        updateScale: updateScale
    };

})();

/**###################################################
 * SET UP main.js
 * ###################################################
 */
var TXMain = (function() {
  
    function init() {
       
        var creative = {};

        creative.videoSrc = '';

        var showingExperience = false;
        var showingSorryExperience = false;

        try {
            var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition,
            SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList,
            SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

            AD.recognition = true;
            var recognition = new SpeechRecognition();
            var speechRecognitionList = new SpeechGrammarList();
            // speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = true;
            recognition.maxAlternatives = 1;

            // Set the name of the hidden property and the change event for visibility
            var hidden, visibilityChange;
            var isPageHidden = false;

            if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }

            // If the page is hidden, pause the video;
            // if the page is shown, play the video
            function handleVisibilityChange() {
                if (document[hidden]) {
                    isPageHidden = true;
                    recognition.stop();
                } else {
                    isPageHidden = false;
                    if (withMic) {
                        recognition.start();
                    }
                }
            }

            // Warn if the browser doesn't support addEventListener or the Page Visibility API
            if (typeof document.addEventListener === "undefined" || hidden === undefined) {
                //console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
                $(body).css('background','red');
            } else {
                // Handle page visibility change   
                document.addEventListener(visibilityChange, handleVisibilityChange, false);
            }

            recognition.onresult = function(event) {
                var last = event.results.length - 1;
                speechText = (event.results[last][0].transcript).toLowerCase();
                isSpeechResult = true;
    
                if (speechText.includes('alexa') && callOnce) {
                    callOnce = false;
                    clearTimeout(baseOnTim);
    
                    creative.onVideo.classList.add('animate');
                    creative.onVideo.play();
                    baseOnTim = setTimeout(function() {
                        creative.baseOnVideo.classList.add('animate');
                        creative.baseOnVideo.play();
                        creative.onVideo.classList.remove('animate');
                    }, 1000);
                }
                diagnostic.textContent = speechText;
            };
    
            recognition.onspeechend = function() {
                if (!callOnce) {
                    callOnce = true;
                    setTimeout(function() {
                        clearTimeout(baseOnTim);
                        creative.baseOnVideo.classList.remove('animate');
                        creative.onVideo.classList.remove('animate');
                        creative.offVideo.classList.add('animate');
                        creative.offVideo.play();
                        creative.offVideo.classList.remove('animate');
                    }, 2200);
                }
    
                setTimeout(function() {
                    if (!showingExperience && !isPageHidden && isSpeechResult) {
                        creative.micButton.classList.add('disabled');
                        cancelTimeout();
                        if (
                            speechText.includes('alexa') &&
                            speechText.includes('do') &&
                            speechText.includes('aliens') &&
                            speechText.includes('exist')
                        ) {
                            isSpeechResult = false;
                            alexaPrompt('aliens');
                        } else if (
                            speechText.includes('alexa') &&
                            speechText.includes('do') &&
                            speechText.includes('barrel') &&
                            speechText.includes('roll')
                        ) {
                            isSpeechResult = false;
                            alexaPrompt('barrel');
                        } else if (
                            speechText.includes('alexa') &&
                            speechText.includes('turn') &&
                            speechText.includes('on') &&
                            speechText.includes('bedtime')
                        ) {
                            isSpeechResult = false;
                            alexaPrompt('bedtime');
                        } else if (
                            speechText.includes('alexa') &&
                            speechText.includes('fire') &&
                            speechText.includes('jetpack') ||
                            speechText.includes('thrusters')
                        ) {
                            isSpeechResult = false;
                            alexaPrompt('jetpack');
                        } else if (
                            speechText.includes('alexa') &&
                            speechText.includes('turn') &&
                            speechText.includes('off') &&
                            speechText.includes('lights')
                        ) {
                            isSpeechResult = false;
                            alexaPrompt('lights');
                        } else if (
                            speechText.includes('alexa') &&
                            speechText.includes('flash') &&
                            speechText.includes('the') &&
                            speechText.includes('toilet')
                        ) {
                            isSpeechResult = false;
                            alexaPrompt('toilet');
                        } else {
                            isSpeechResult = false;
                            alexaPrompt('no-prompt');
                            creative.micButton.classList.remove('disabled');
                        }
                    }
                }, 500);
            };
    
            recognition.onspeechstart = function() {};
    
            recognition.onnomatch = function() {
                diagnostic.textContent = "I didn't recognise that.";
            };
    
            recognition.onerror = function(event) {
                diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
                if (event.error == "not-allowed") {
                    withMic = false;
                    alert('No Microphone Access');
                    for (var i = 0; i < creative.alexa.length; ++i) {
                        creative.alexa[i].classList.add('disabled');
                    }
                    firstTransition(false);
                }
            };

            recognition.onend = function() {
                if (
                    !showingExperience &&
                    !showingSorryExperience &&
                    withMic &&
                    !isPageHidden
                ) {
                    //Recognition Ended - Restarting
                    recognition.start();
                }
            };
        } catch(e) {
            AD.recognition = false;
            document.querySelector('#continue-with-mic').style.display = "none";
            document.querySelector('#continue-without-mic').style.float = "none";
            document.querySelector('.mic-button').style.pointerEvents = "none";
        }

        var diagnostic = document.querySelector('.output');

        /**
         * Called on the window load event.
         */
        function preInit() {
            setupDom();
            init();
        }

        /**
         * Set up references to DOM elements.
         */
        function setupDom() {
            creative.introContainer = document.querySelector('.intro-container');
            creative.base = document.querySelector('.base');
            creative.cta = document.querySelector('.cta');
            creative.alexa = document.querySelectorAll('.alexa');
            creative.shadow = document.querySelector('.shadow');
            creative.micText = document.querySelector('.mic-text');
            creative.mic = document.querySelector('.mic');
            creative.micAnimation = document.querySelector('.mic-animation');
            creative.micCircle = document.querySelector('.mic-circle');
            creative.micCircleAnimation = document.querySelector('.mic-circle-animation');
            creative.micButton = document.querySelector('.mic-button');
            creative.micOff = document.querySelector('.mic-off');
            creative.transition = document.querySelector('.transition');
            creative.timeout = document.querySelector('.timeout');
            creative.alexaPrompt = document.querySelector('.alexa-prompt');
            creative.alexaPromptText = document.querySelector('.alexa-prompt-text');
            creative.video = document.querySelector('#video');
            creative.introVideo = document.querySelector('#intro-video');
            creative.onVideo = document.querySelector('#on-video');
            creative.offVideo = document.querySelector('#off-video');
            creative.baseOnVideo = document.querySelector('#base-on-video');
            creative.click = document.querySelector('.click');
        }

        function init() {
            addListeners();
            startCreative();
        }

        function addListeners() {
            document.querySelector('#continue-with-mic').addEventListener('click', continueWithMic, false);
            document.querySelector('#continue-without-mic').addEventListener('click', continueWithoutMic, false);
            document.querySelector('#timeout-continue-with-mic').addEventListener('click', continueWithMic, false);
            document.querySelector('#timeout-continue-without-mic').addEventListener('click', continueWithoutMic, false);
            creative.video.addEventListener('timeupdate', videoProgress, false);
            creative.video.addEventListener('ended', videoEnded, false);
            if(AD.recognition) creative.micButton.addEventListener('click', micButton, false);
            creative.cta.addEventListener('click', ctaHandler, false);

            for (var i = 0; i < creative.alexa.length; ++i) {
                _addEventListener(i);
            }

            function _addEventListener(e) {
                creative.alexa[e].addEventListener('click', function() {
                    alexaPrompt(this.id);
                }, false);
            }
        }

        function startCreative() {
            creative.introContainer.classList.add('animate');
            creative.introVideo.src = 'src/video/intro-video.mp4';
            
        }

        function ctaHandler() {
            window.open("https://www.amazon.com/", "_blank");
        }

        var withMic = false,
            audioMicOffPlayed = false,
            audioMicOnPlayed = false,
            continueInit = true,
            videoPlaying = false;

        function onOffAlexa() {
            creative.onVideo.classList.add('animate');
            creative.onVideo.play();
            setTimeout(function() {
                creative.onVideo.classList.remove('animate');
                creative.offVideo.classList.add('animate');
                creative.offVideo.play();
                setTimeout(function() {
                    creative.offVideo.classList.remove('animate');
                }, 1000);
            }, 1500);
        }

        function firstTransition(micSelected) {
            continueInit = false;
            creative.introVideo.volume = 0.5;
            creative.introVideo.muted = false;
            timeoutShowing = false;
            timeoutCalled = false;
            creative.timeout.style.display = 'none';
            creative.timeout.classList.remove('animate');
            creative.introContainer.classList.remove('animate');
            creative.cta.style.display = 'block';
            creative.base.style.display = 'block';
            setTimeout(function() {
                creative.base.classList.add('animate');
                creative.cta.classList.add('animate');
                creative.alexa[0].classList.add('animate');

                setTimeout(function() {
                    creative.alexa[1].classList.add('animate');
                }, 120);
                setTimeout(function() {
                    creative.alexa[2].classList.add('animate');
                }, 240);
                setTimeout(function() {
                    creative.alexa[3].classList.add('animate');
                }, 360);
                setTimeout(function() {
                    creative.alexa[4].classList.add('animate');
                }, 480);
                setTimeout(function() {
                    creative.alexa[5].classList.add('animate');
                }, 480);

            }, 150);

            creative.shadow.classList.add('animate');

            if (micSelected) {
    		    creative.click.classList.remove('animate');

                var constraints = {
                    audio: true,
                    video: false
                };
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function() {

                        withMic = true;

                        creative.videoAliensSrc = 'src/video/no_utterance/videoAliensSrc.mp4';
                        creative.videoBarrelSrc = 'src/video/no_utterance/videoBarrelSrc.mp4';
                        creative.videoBedtimeSrc = 'src/video/no_utterance/videoBedtimeSrc.mp4';
                        creative.videoJetpackSrc = 'src/video/no_utterance/videoJetpackSrc.mp4';
                        creative.videoLightsSrc = 'src/video/no_utterance/videoLightsSrc.mp4';
                        creative.videoToiletSrc = 'src/video/no_utterance/videoToiletSrc.mp4';

                        if (!audioMicOnPlayed) {
                            navigator.mediaDevices.getUserMedia(constraints)
                                .then(function() {
                                })
                                .catch(function(e) {
                                    withMic = false;
                                    alert('No Microphone Access');
                                    firstTransition(false);
                                });
                            audioMicOnPlayed = true;
                            toggleBubbles(false);
                            setTimeout(function() {
                                TX_Audio.PLAY(TX_Audio.SND_WELCOME);
                            }, 300);
                            onOffAlexa();
                            setTimeout(function() {
                                showMicOn();
                                creative.micButton.classList.remove('disabled');
                                recognition.start();
                            }, 14000);
                        } else {
                            showMicOn();
                            toggleBubbles(false);
                            setTimeout(function() {
                                creative.micButton.classList.remove('disabled');
                            }, 500);
                            recognition.start();
                        }
                    })
                    .catch(function(e) {
                        withMic = false;
                        continueWithoutMic();
                    });
            } else {
                withMic = false;
                
    			creative.click.classList.add('animate');

                creative.videoAliensSrc = 'src/video/utterance/videoAliensSrc.mp4';
                creative.videoBarrelSrc = 'src/video/utterance/videoBarrelSrc.mp4';
                creative.videoBedtimeSrc = 'src/video/utterance/videoBedtimeSrc.mp4';
                creative.videoJetpackSrc = 'src/video/utterance/videoJetpackSrc.mp4';
                creative.videoLightsSrc = 'src/video/utterance/videoLightsSrc.mp4';
                creative.videoToiletSrc = 'src/video/utterance/videoToiletSrc.mp4';

                if (!audioMicOffPlayed) {
                    audioMicOffPlayed = true;
                    setTimeout(function() {
                        setTimeout(function() {
                            TX_Audio.PLAY(TX_Audio.SND_ACCESSGRANTED);
                        }, 700);
                        onOffAlexa();
                    }, 250);
                    setTimeout(function() {
                        showMicOff();
                        toggleBubbles(true);
                        creative.micButton.classList.remove('disabled');
                        setTimeout(function() {
    					    creative.click.classList.remove('animate');
                        }, 5000);
                    }, 2000);
                } else {
                    showMicOff();
                    toggleBubbles(true);
                    setTimeout(function() {
                        creative.micButton.classList.remove('disabled');
                        setTimeout(function() {
    					    creative.click.classList.remove('animate');
                        }, 5000);
                    }, 500);
                }
            }
            cancelTimeout();
            callTimeout();
        }

        function showMicNeutral() {
            creative.micOff.classList.remove('animate');
            creative.micAnimation.classList.add('animate');

            creative.micCircle.classList.remove('hide');
            creative.mic.classList.remove('hide');
            creative.micText.classList.remove('animate');
            creative.micCircleAnimation.classList.add('hide');
            creative.micCircleAnimation.classList.remove('animate');
        }

        function showMicOn() {
            creative.micOff.classList.remove('animate');
            creative.micAnimation.classList.add('animate');

            creative.micCircle.classList.add('hide');
            creative.mic.classList.remove('hide');
            creative.micText.classList.add('animate');
            creative.micCircleAnimation.classList.remove('hide');
            creative.micCircleAnimation.classList.add('animate');
        }

        function showMicOff() {
            creative.micOff.classList.add('animate');
            creative.micAnimation.classList.add('animate');

            creative.micCircle.classList.add('hide');
            creative.mic.classList.add('hide');
            creative.micText.classList.remove('animate');
            creative.micCircleAnimation.classList.add('hide');
            creative.micCircleAnimation.classList.remove('animate');
        }

        function toggleBubbles(status) {
            if (status) {
                //Active Bubbles
                for (let i = 0; i < creative.alexa.length; ++i) {
                    creative.alexa[i].classList.add('pointers');
                }
            } else {
                //Deactive Bubbles
                for (let i = 0; i < creative.alexa.length; ++i) {
                    creative.alexa[i].classList.remove('pointers');
                }
            }
        }

        function micButton() {
            creative.micButton.classList.add('disabled');
            if (withMic) {
                withMic = false;
                recognition.stop();
                continueWithoutMic();
            } else {
                withMic = true;
                continueWithMic();
            }
        }


        function continueWithMic() {
            creative.micButton.classList.add('disabled');
            if (continueInit)
            for (var i = 0; i < creative.alexa.length; ++i) {
                creative.alexa[i].classList.remove('disabled');
            }
            showMicNeutral();
            firstTransition(true);
        }

        function continueWithoutMic() {
            if (continueInit)
            for (var i = 0; i < creative.alexa.length; ++i) {
                creative.alexa[i].classList.add('disabled');
            }
            showMicOff();
            firstTransition(false);
        }

        function alexaPrompt(promptID) {
            creative.alexaPromptText.innerHTML = '';
            msg = '';
            if (promptID == 'aliens') {
                showingExperience = true;
                msg = '“Alexa, do aliens exist?”';
                creative.video.src = creative.videoAliensSrc;
            } else if (promptID == 'barrel') {
                showingExperience = true;
                msg = '“Alexa, do a barrel roll”';
                creative.video.src = creative.videoBarrelSrc;
            } else if (promptID == 'bedtime') {
                showingExperience = true;
                msg = '“Alexa, turn on bedtime”';
                creative.video.src = creative.videoBedtimeSrc;
            } else if (promptID == 'jetpack') {
                showingExperience = true;
                msg = '“Alexa, fire jetpack thrusters”';
                creative.video.src = creative.videoJetpackSrc;
            } else if (promptID == 'lights') {
                showingExperience = true;
                msg = '“Alexa, turn off the lights”';
                creative.video.src = creative.videoLightsSrc;
            } else if (promptID == 'toilet') {
                showingExperience = true;
                msg = '“Alexa, flush the toilet”';
                creative.video.src = creative.videoToiletSrc;
            } else {
                // NO PROMPT
                recognition.stop();
                showingExperience = false;
                showingSorryExperience = true;
                TX_Audio.PLAY(TX_Audio.SND_SORRY);
                setTimeout(function() {
                    showingSorryExperience = false;
                    if (withMic) {
                        recognition.start();
                    }
                }, 2000);
            }

            if(showingExperience) showExperience(); else callTimeout();
        }

        function showExperience() {
            TX_Audio.PAUSE(TX_Audio.SND_WELCOME);
            creative.micButton.classList.add('disabled');
            creative.introVideo.volume = 0;
            creative.transition.classList.add('animate');
            if(AD.recognition) recognition.stop();
            setTimeout(function() {
                if (!isPageHidden) {
                    timeoutShowing = false;
                    timeoutCalled = false;
                    cancelTimeout();
                    creative.video.classList.add('animate');
                    creative.video.play();
                } else {
                    videoEnded();
                }
            }, 500);
        }

        function videoProgress() {
            videoPlaying = true;
        }

        function videoEnded() {
            speechText = "";
            creative.introVideo.volume = 0.5;
            creative.transition.classList.remove('animate');
            creative.micButton.classList.remove('disabled');
            setTimeout(function() {
                creative.video.classList.remove('animate');
                showingExperience = false;
                videoPlaying = false;
                if (withMic && AD.recognition) recognition.start();
                callTimeout();
            }, 500);
        }

        var speechText;
        var isSpeechResult = false;
        var callOnce = true;
        var baseOnTim;
        var timeoutTimeout;
        var timeoutShowing = false;
        var timeoutCalled = false;

        function callTimeout() {
            if (!timeoutCalled && !videoPlaying && AD.recognition) {
                clearTimeout(timeoutTimeout);
                //Speech - Timeout Called
                timeoutCalled = true;
                timeoutTimeout = setTimeout(function() {
                    //Speech - Timeout Trigger
                    recognition.stop();
                    withMic = false;
                    timeoutShowing = true;
                    creative.base.style.display = 'none';
                    creative.cta.classList.remove('animate');
                    creative.base.classList.remove('animate');
                    creative.timeout.style.display = 'block';

                    setTimeout(function() {
                        creative.timeout.classList.add('animate');
                    }, 150);

                    showMicNeutral();
                }, 30000);
            }
        }

        function cancelTimeout() {
            //Speech - Timeout Cancel
            clearTimeout(timeoutTimeout);
        }

        preInit();
    }

    return {
        init: init
    };

})();

/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-> 
 * SET UP AUDIO HERE | TX_Audio.INIT();
 */
var TX_Audio = {
	
	ASSETS: [ 
		// ['', {src:[''], loop:false, volume:1 }],		
		['SND_BGM', {src:['src/audio/bgm.mp3'], loop:true, volume:1 }],
		['SND_ACCESSGRANTED', {src:['src/audio/sfx_accessgranted.mp3'], loop:false, volume:1 }],
		['SND_WELCOME', {src:['src/audio/sfx_welcome.mp3'], loop:false, volume:1 }],
        ['SND_SORRY', {src:['src/audio/sfx_sorry.mp3'], loop:false, volume:1 }],
	],

	INIT: function(e) {	
		$.getScript('https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js', TX_Audio.READY);
		
	},

	READY: function(e) {			
		for (let i = 0; i < TX_Audio.ASSETS.length; i++) {
			TX_Audio.ASSETS[i][1].preload = true;								
			TX_Audio[ TX_Audio.ASSETS[i][0] ] = new Howl(TX_Audio.ASSETS[i][1]);				
		}
		
		TX_Audio.PLAY(TX_Audio.SND_BGM);
        TXAd.init();
	},

	PLAY: function(id) {			
		if( id.playing() ) TX_Audio.SEEK(id,0);
		else id.play();			
	},

	PAUSE: function(id) {
		id.pause();
	},

	STOP: function(id) { 
		id.stop(); 
	},

	MUTE: function(id) {
		id.volume(0);
	},

	UNMUTE: function(id) {
		id.volume(1);
	},
		
	SEEK: function(id, time) {
		id.seek(time);
	},

	VOLUME_ON: function() {
		Howler.volume(1);
	},

	VOLUME_OFF: function() {
		Howler.volume(0);
	},

	END: function(e) {
		Howler.unload();
	}
};

TX_Audio.INIT();

})();