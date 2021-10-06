function UI(audioPlayer) {

    if (!audioPlayer)
        alert("Cannot create UI. Parameter audioPlayer is missing!");

    var cssColor = 0;
    var holdVolume;
    var isForwarding = false;
    var isBackwarding = false;
    var FxIndex = 0;

    var volumeButton = new VolumeButton(audioPlayer);

    this.GetIsForwarding = function () {
        return isForwarding;
    }

    this.GetIsBackwarding = function () {
        return isBackwarding;
    }

    // Set up touch events for mobile, etc
    var imgForward = document.getElementById('imgForward');
    imgForward.addEventListener("touchstart", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        imgForward.dispatchEvent(mouseEvent);
    }, false);

    imgForward.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        imgForward.dispatchEvent(mouseEvent);
    }, false);

    var imgBack = document.getElementById('imgBack');
    imgBack.addEventListener("touchstart", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        imgBack.dispatchEvent(mouseEvent);
    }, false);

    imgBack.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        imgBack.dispatchEvent(mouseEvent);
    }, false);

    var audioFile = document.getElementById('audio_file');
    audioFile.onchange = function () {
        var files = this.files;
        var file = URL.createObjectURL(files[0]);
        $("#imgStop").trigger('click');
        audioPlayer.SetFileName(files[0].name);
        audioPlayer.SetFile(file);
    };

    $("#imgColor").click(function () {
        if (powerOn) {
            cssColor++;
            if (cssColor > 6) {
                cssColor = 0;
            }
            document.getElementById('cssColor').href = "css/Color" + cssColor + ".css";
        }
    });

    $("#imgDisplay").click(function () {
        if (powerOn) {
            soundDuration.ChangeDisplay(soundDuration.GetDisplayIndex() + 1);
        }
    });

    $("#imgPrev").mousedown(function () {
        if (powerOn) {
            $("#imgPrev").addClass("on");
        }
    });
    $("#imgPrev").mouseup(function () {
        if (powerOn) {
            $("#imgPrev").removeClass("on");
        }
    });
    $("#imgNext").mousedown(function () {
        if (powerOn) {
            $("#imgNext").addClass("on");
        }
    });
    $("#imgNext").mouseup(function () {
        if (powerOn) {
            $("#imgNext").removeClass("on");
        }
    });
    $("#imgColor").mousedown(function () {
        if (powerOn) {
            $("#imgColor").addClass("on");
        }
    });
    $("#imgColor").mouseup(function () {
        if (powerOn) {
            $("#imgColor").removeClass("on");
        }
    });
    $("#imgDisplay").mousedown(function () {
        if (powerOn) {
            $("#imgDisplay").addClass("on");
        }
    });
    $("#imgDisplay").mouseup(function () {
        if (powerOn) {
            $("#imgDisplay").removeClass("on");
        }
    });

    $("#imgEqualizerMin").mousedown(function () {
        if (powerOn) {
            $("#imgEqualizerMin").addClass("on");
        }
    });
    $("#imgEqualizerMin").mouseup(function () {
        if (powerOn) {
            $("#imgEqualizerMin").removeClass("on");
        }
    });
    $("#imgEqualizerPlus").mousedown(function () {
        if (powerOn) {
            $("#imgEqualizerPlus").addClass("on");
        }
    });
    $("#imgEqualizerPlus").mouseup(function () {
        if (powerOn) {
            $("#imgEqualizerPlus").removeClass("on");
        }
    });

    $("#imgFxMin").mousedown(function () {
        if (powerOn) {
            $("#imgFxMin").addClass("on");
        }
    });
    $("#imgFxMin").mouseup(function () {
        if (powerOn) {
            $("#imgFxMin").removeClass("on");
        }
    });
    $("#imgFxPlus").mousedown(function () {
        if (powerOn) {
            $("#imgFxPlus").addClass("on");
        }
    });
    $("#imgFxPlus").mouseup(function () {
        if (powerOn) {
            $("#imgFxPlus").removeClass("on");
        }
    });

    $("#imgEject").mousedown(function () {
        if (powerOn) {
            $("#imgEject").addClass("on");
        }
    });
    $("#imgEject").mouseup(function () {
        if (powerOn) {
            $("#imgEject").removeClass("on");
        }
    });


    $("#imgPower").click(function () {
        if (powerOn) {
            audioPlayer.Stop();
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
            animations[3].Stop();

            powerOn = false;
        }
        else {
			audioPlayer.Start();
			
            $("#imgPower").addClass("on");
            $('#bars').find('.colorBar').show();

            $(".knob .top").addClass("powerOn");
            $('.knob .top').removeClass("powerOff");

            animations[0].Play();
            animations[1].Play();
            animations[2].Play();
            animations[3].Play();

            powerOn = true;
            soundDuration.ChangeDisplay(0);
        }
    });

    $("#imgEqualizerMin").click(function () {
        if (powerOn) {
            animations[0].Mode(animations[0].GetMode() - 1);
        }
    });
    $("#imgEqualizerPlus").click(function () {
        if (powerOn) {
            animations[0].Mode(animations[0].GetMode() + 1);
        }
    });

    $("#imgFxMin").click(function () {
        if (powerOn) {
            FxIndex--;
            changeFx(FxIndex);
        }
    });
    $("#imgFxPlus").click(function () {
        if (powerOn) {
            FxIndex++;
            changeFx(FxIndex);
        }
    });

    $("#imgPlay").click(function () {
        if (powerOn) {
            audioPlayer.Play();
            soundDuration.Play();

            $("#imgPause").removeClass("on");
            $("#imgStop").removeClass("on");
            $("#imgPlay").addClass("on");
        }
    });

    $("#imgEject").click(function () {
        if (powerOn) {
            $("#audio_file").trigger('click');
        }
    });

    $("#imgPause").click(function () {
        if (powerOn) {
            audioPlayer.Pause();

            $("#imgPlay").removeClass("on");
            $("#imgStop").removeClass("on");
            $("#imgPause").addClass("on");
        }
    });

    $("#imgStop").click(function () {
        if (powerOn) {
            audioPlayer.Stop();
            soundDuration.Stop();

            $("#imgPlay").removeClass("on");
            $("#imgPause").removeClass("on");
            $("#imgStop").addClass("on");
        }
    });

    $("#imgNext").click(function () {
        if (powerOn) {
            var wasPlaying = audioPlayer.GetPlaying();
            audioPlayer.Next();
            soundDuration.Next();
            if (wasPlaying) {
                audioPlayer.Play();
            }
        }
    });

    $("#imgPrev").click(function () {
        if (powerOn) {
            var wasPlaying = audioPlayer.GetPlaying();
            audioPlayer.Previous();
            soundDuration.Next();
            if (wasPlaying) {
                audioPlayer.Play();
            }
        }
    });

    $("#imgForward").mousedown(function () {
        if (powerOn && audioPlayer.GetPlaying() && !isForwarding) {
            $("#imgForward").addClass("on");
            isForwarding = true;
            holdVolume = audioPlayer.GetVolume();
            audioPlayer.ChangeVolume(0);
            soundDuration.ChangeDisplay(0);
        }
    });
    $("#imgForward").mouseup(function () {
        if (powerOn && audioPlayer.GetPlaying()) {
            $("#imgForward").removeClass("on");
            isForwarding = false;
            audioPlayer.ChangeVolume(holdVolume);
        }
    });

    $("#imgBack").mousedown(function () {
        if (powerOn && audioPlayer.GetPlaying() && !isBackwarding) {
            $("#imgBack").addClass("on");
            isBackwarding = true;
            holdVolume = audioPlayer.GetVolume();
            audioPlayer.ChangeVolume(0);
            soundDuration.ChangeDisplay(0);
        }
    });
    $("#imgBack").mouseup(function () {
        if (powerOn && audioPlayer.GetPlaying()) {
            isBackwarding = false;
            $("#imgBack").removeClass("on");
            audioPlayer.ChangeVolume(holdVolume);
        }
    });

    //Audio filter sliders
    $("#rngFilter1").change(function () {
        audioPlayer.ChangeFilter(this.value, 1);
    });

    $("#rngFilter2").change(function () {
        audioPlayer.ChangeFilter(this.value, 2);
    });

    $("#rngFilter3").change(function () {
        audioPlayer.ChangeFrequency(this.value);
    });

    $("#rngFilter4").change(function () {
        audioPlayer.ChangeQuality(this.value);
    });

    $("#rngEcho").change(function () {
        audioPlayer.ChangeFeedback(this.value);
    });

    function changeFx() {
        if (FxIndex > 3) {
            FxIndex = 0;
        }
        if (FxIndex < 0) {
            FxIndex = 3;
        }
        switch (FxIndex) {
            case 0:
                animations[1] = new TimeAnalyzer(MyAudioPlayer);
                break;
            case 1:
                animations[1] = new PixelField3D();
                break;
            case 3:
                animations[1] = new Elite();
                break;
            case 2:
                animations[1] = new Sphere3D(MyAudioPlayer);
                break;
            default:
        }
        animations[1].Play();
    }
}