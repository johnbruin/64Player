﻿function AudioPlayer()
{
    var context = new (window.AudioContext || window.webkitAudioContext);
    var playing = false;

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

    this.AudioAnalyser = null;
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
    
    function stop() {
        playing = false;
        myAudioPlayer.pause();
        myAudioPlayer.currentTime = 0.0;
    }
        
    this.GetPlaying = function () {
        return playing;
    };

    this.GetCurrentTime = function () {
        return myAudioPlayer.currentTime;
    };

    this.SetCurrentTime = function (value) {
        myAudioPlayer.currentTime = value;
    }

    this.GetDuration = function () {
        return myAudioPlayer.duration;
    };

    this.GetFileName = function () {
        return myAudioFileName;
    }

    this.SetFileName = function (fileName) {
        myAudioFileName = fileName;
    }

    this.SetFile = function (file) {
        myAudioPlayer.src = file;
    }

    this.GetVolume = function () {
        return myAudioVolume;
    }

    this.GetAverageVolume = function () {
        var freqByteData = new Uint8Array(this.AudioAnalyser.frequencyBinCount);
        this.AudioAnalyser.getByteFrequencyData(freqByteData);
        return getAverageVolume(freqByteData);
    }

    function getAverageVolume(array) {
        var values = 0;
        var average;

        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }
        average = values / length;

        return average;
    }

    this.Play = function () {
        if (playing)
            return;
        playing = true;
        myAudioPlayer.play();
    };

    this.Pause = function () {
        playing = false;
        myAudioPlayer.pause();
    };

    this.Stop = function () {
        stop();
    };

    this.Previous = function () {
        stop();
        currentSong--;
        if (currentSong < 0)
            currentSong = myAudioFileNames.length - 1;
        myAudioFileName = myAudioFileNames[currentSong];
        myAudioPlayer.src = "sounds/" + myAudioFileName;
    };

    this.Next = function () {
        stop();
        currentSong++;
        if (currentSong > myAudioFileNames.length - 1)
            currentSong = 0;
        myAudioFileName = myAudioFileNames[currentSong];
        myAudioPlayer.src = "sounds/" + myAudioFileName;
    };

    this.ChangeVolume = function (value) {
        myAudioVolume = value;
        if (myAudioGain === undefined || myAudioGain === null)
            return;

        myAudioGain.gain.value = value * value;
    };

    this.ChangeDelay = function (value) {
        myDelay = value;
        if (myAudioDelay === undefined || myAudioDelay === null)
            return;

        myAudioDelay.delayTime.value = value;
    }

    this.ChangeFeedback = function (value) {
        myEcho = value;
        if (myAudioDelayFeedback === undefined || myAudioDelayFeedback === null)
            return;

        myAudioDelayFeedback.gain.value = value;
    }

    this.ChangeFilter = function (value, filter) {
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

    this.ChangeFrequency = function (value) {
        // Clamp the frequency between the minimum value (40 Hz) and half of the
        // sampling rate.
        var minValue = 40;
        var maxValue = context.sampleRate / 2;
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

    this.ChangeQuality = function (value) {
        var QUAL_MUL = 30;
        myAudioFilter3.Q.value = value * QUAL_MUL;
    };

    var sourceNode = null;
    var startedAt = 0;
    var pausedAt = 0;

    sourceNode = context.createMediaElementSource(myAudioPlayer);

    this.AudioAnalyser = context.createAnalyser();

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

    this.ChangeVolume(myAudioVolume);
    this.ChangeFilter(myFilter1);
    this.ChangeFilter(myFilter2);
    this.ChangeFrequency(myFilter3);
    this.ChangeQuality(myFilter4);
    this.ChangeFeedback(myEcho);

    sourceNode.connect(myAudioDelay);
    myAudioDelay.connect(myAudioFilter1);
    myAudioFilter1.connect(myAudioFilter2);
    myAudioFilter2.connect(myAudioFilter3);
    myAudioFilter3.connect(this.AudioAnalyser);
    this.AudioAnalyser.connect(myAudioGain);
    myAudioGain.connect(context.destination);
}