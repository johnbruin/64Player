var myAudioContext = new (window.AudioContext || window.webkitAudioContext);

var isForwarding = false;
var isBackwarding = false;
var holdVolume;
var isPlaying = false;

var currentSong = 0;
var myAudioFileNames = [
    "Super Trucker - Reyn Ouwehand.mp3",
    "Wizball Highscore - Martin Galway.mp3",
    "Pimple Squeezer 6 - Johannes Bjerregaard.mp3",
    "LED Storm - Tim Follin.mp3",
    "Delta - Rob Hubbard.mp3",    
    "Rubicon - Jeroen Tel.mp3"
];
var myAudioFileName = myAudioFileNames[currentSong];
var myAudioPlayer = new Audio("sounds/" + myAudioFileName);
myAudioPlayer.preload = "auto";
myAudioPlayer.onended = function () {
    $("#imgNext").trigger('click');
}

var myAudioAnalyser;
var myAudioGain;

var myAudioFilter1;
var myAudioFilter2;
var myAudioFilter3;
var myAudioFilter4;

var myAudioDelay;
var myAudioDelayFeedback;

var myAudioVolume = 0;

var myFilter1 = 0;
var myFilter2 = 0;
var myFilter3 = 0;
var myFilter4 = 0;

var myEcho = 0;
var myDelay = 0;

var powerOn = false;

function createSound(context)
{
    var sourceNode = null;
    var startedAt = 0;
    var pausedAt = 0;
    var playing = false;

    sourceNode = context.createMediaElementSource(myAudioPlayer);
    
    myAudioAnalyser = context.createAnalyser();

    // Create the filter.
    myAudioFilter1 = context.createBiquadFilter();
    myAudioFilter1.type = "lowshelf";
    myAudioFilter1.frequency.value = 5000;

    // Create the filter.
    myAudioFilter2 = context.createBiquadFilter();
    myAudioFilter2.type = "highshelf";
    myAudioFilter2.frequency.value = 5000;

    // Create the filter.
    myAudioFilter3 = context.createBiquadFilter();
    myAudioFilter3.type = "lowpass";
    myAudioFilter3.frequency.value = 5000;

    //Create the delay and feedback
    myAudioDelay = context.createDelay();
    myAudioDelay.delayTime.value = 0.05;
    myAudioDelayFeedback = context.createGain();
    myAudioDelay.connect(myAudioDelayFeedback);
    myAudioDelayFeedback.connect(myAudioDelay);

    // Create volume gain 
    myAudioGain = context.createGain();

    ChangeVolume(myAudioVolume);

    ChangeFilter(myFilter1);
    ChangeFilter(myFilter2);
    ChangeFrequency(myFilter3);
    ChangeQuality(myFilter4);

    ChangeFeedback(myEcho);

    sourceNode.connect(myAudioDelay);
    myAudioDelay.connect(myAudioFilter1);
    myAudioFilter1.connect(myAudioFilter2);
    myAudioFilter2.connect(myAudioFilter3);
    myAudioFilter3.connect(myAudioAnalyser);
    myAudioAnalyser.connect(myAudioGain);
    myAudioGain.connect(context.destination);

    var play = function () {
        if (playing)
            return;
        playing = true;
        isPlaying = playing;
        myAudioPlayer.play();        
    };

    var pause = function () {
        playing = false;
        isPlaying = playing;
        myAudioPlayer.pause();        
    };

    var stop = function () {
        playing = false;
        isPlaying = playing;
        myAudioPlayer.pause();
        myAudioPlayer.currentTime = 0.0;        
    };

    var getPlaying = function () {
        return playing;
    };

    var getCurrentTime = function () {
        return myAudioPlayer.currentTime;
    };

    var getDuration = function () {
        return myAudioPlayer.duration;
    };

    return {
        getCurrentTime: getCurrentTime,
        getDuration: getDuration,
        getPlaying: getPlaying,
        play: play,
        pause: pause,
        stop: stop
    };
}

var AudioPlayer_init = function () {
    var sound = createSound(myAudioContext);
    
    $("#imgPower").click(function () {
        if (powerOn)
        {
            sound.stop();
            soundDuration.Stop();

            $("#imgPower").removeClass("on");
            $("#imgPlay").removeClass("on");
            $("#imgPause").removeClass("on");
            $("#imgStop").removeClass("on");

            $('#bars').find('.colorBar').hide();

            $(".knob .top").removeClass("powerOn");
            $('.knob .top').addClass("powerOff");

            animations[0].Stop();
            animations[1].Stop();
            animations[2].Stop();

            powerOn = false;
        }
        else
        {
            $("#imgPower").addClass("on");
            $('#bars').find('.colorBar').show();

            $(".knob .top").addClass("powerOn");
            $('.knob .top').removeClass("powerOff");

            animations[0].Play();
            animations[1].Play();
            animations[2].Play();

            powerOn = true;
        }
    });
    $("#imgPlay").click(function () {
        if (powerOn) {
            sound.play();
            soundDuration.Play(sound);

            $("#imgPause").removeClass("on");
            $("#imgStop").removeClass("on");
            $("#imgPlay").addClass("on");
        }
    });
    $("#imgPause").click(function () {
        if (powerOn) {
            sound.pause();

            $("#imgPlay").removeClass("on");
            $("#imgStop").removeClass("on");
            $("#imgPause").addClass("on");
        }
    });
    $("#imgStop").click(function () {
        if (powerOn) {
            sound.stop();
            soundDuration.Stop();
            
            $("#imgPlay").removeClass("on");
            $("#imgPause").removeClass("on");
            $("#imgStop").addClass("on");
        }
    });
    $("#imgNext").click(function () {
        if (powerOn) {
            var wasPlaying = sound.getPlaying();
            sound.stop();
            soundDuration.Stop();            
            currentSong++;
            if (currentSong > myAudioFileNames.length - 1)
                currentSong = 0;
            myAudioFileName = myAudioFileNames[currentSong];
            myAudioPlayer.src = "sounds/" + myAudioFileName;
            if (wasPlaying) {
                sound.play();
                sleep(3000).then(() => {
                    soundDuration.Play(sound);
                });
            }
        }
    });
    $("#imgPrev").click(function () {
        if (powerOn) {
            var wasPlaying = sound.getPlaying();
            sound.stop();
            soundDuration.Stop();
            currentSong--;
            if (currentSong < 0)
                currentSong = myAudioFileNames.length - 1;
            myAudioFileName = myAudioFileNames[currentSong];
            myAudioPlayer.src = "sounds/" + myAudioFileName;
            if (wasPlaying) {
                sound.play();
                sleep(3000).then(() => {
                    soundDuration.Play(sound);
                });                
            }
        }
    });
    $("#imgForward").mousedown(function () {
        if (powerOn && isPlaying && !isForwarding) {
            $("#imgForward").addClass("on");
            isForwarding = true;
            holdVolume = myAudioVolume;
            ChangeVolume(0);
        }
    });
    $("#imgForward").mouseup(function () {
        if (powerOn && isPlaying) {
            $("#imgForward").removeClass("on");
            isForwarding = false;
            ChangeVolume(holdVolume);
        }
    });
    $("#imgBack").mousedown(function () {
        if (powerOn && isPlaying && !isBackwarding) {
            $("#imgBack").addClass("on");
            isBackwarding = true;
            holdVolume = myAudioVolume;
            ChangeVolume(0);
        }
    });
    $("#imgBack").mouseup(function () {
        if (powerOn && isPlaying) {
            isBackwarding = false;
            $("#imgBack").removeClass("on");
            ChangeVolume(holdVolume);
        }
    });

    $("#rngFilter1").change(function () {
        ChangeFilter(this.value, 1);
    });

    $("#rngFilter2").change(function () {
        ChangeFilter(this.value, 2);
    });

    $("#rngFilter3").change(function () {
        ChangeFrequency(this.value);
    });

    $("#rngFilter4").change(function () {
        ChangeQuality(this.value);
    });

    $("#rngEcho").change(function () {
        ChangeFeedback(this.value);
    });
};

ChangeVolume = function (value) {
    myAudioVolume = value;
    if (myAudioGain === undefined || myAudioGain === null) 
        return;

    myAudioGain.gain.value = value * value;
};

ChangeDelay = function (value)
{
    myDelay = value;
    if (myAudioDelay === undefined || myAudioDelay === null)
        return;

    myAudioDelay.delayTime.value = value;
}

ChangeFeedback = function (value) {
    myEcho = value;
    if (myAudioDelayFeedback === undefined || myAudioDelayFeedback === null)
        return;

    myAudioDelayFeedback.gain.value = value;
}

ChangeFilter = function (value, filter)
{
    if (myAudioFilter1 === undefined || myAudioFilter1 === null)
        return;
    if (myAudioFilter2 === undefined || myAudioFilter2 === null)
        return;

    switch (filter) {
        case 1:
            myAudioFilter1.frequency.value = 5000;
            myFilter1 = value;
            myAudioFilter1.gain.value = value * 25;
            break;
        case 2:
            myAudioFilter2.frequency.value = 5000;
            myFilter2 = value;
            myAudioFilter2.gain.value = value * 25;
            break;
    }
};

ChangeFrequency = function (value) {
    // Clamp the frequency between the minimum value (40 Hz) and half of the
    // sampling rate.
    var minValue = 40;
    var maxValue = myAudioContext.sampleRate / 2;
    // Logarithm (base 2) to compute how many octaves fall in the range.
    var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
    // Compute a multiplier from 0 to 1 based on an exponential scale.
    var multiplier = Math.pow(2, numberOfOctaves * (1.0 - value - 1.0));

    if (value == 0)
        myAudioFilter3.frequency.value = 5000;
    else
        // Get back to the frequency value between min and max.
        myAudioFilter3.frequency.value = maxValue * multiplier;
};

ChangeQuality = function (value) {
    var QUAL_MUL = 30;
    myAudioFilter3.Q.value = value * QUAL_MUL;
};

// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}