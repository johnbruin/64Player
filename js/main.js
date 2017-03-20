var fps = 40;

var animations;
var introanimations = [];
var soundDuration;
var shine;

var colors = new Colors();

var scale;
var contentWidth = 960;
var contentHeight = 600;

var introPlaying = true;
var idleTime = 0;

$(document).ready(function ()
{    
    var audioFile = document.getElementById('audio_file');        
    audioFile.onchange = function () {
        var files = this.files;
        var file = URL.createObjectURL(files[0]);
        $("#imgStop").trigger('click');
        myAudioFileName = files[0].name;
        myAudioPlayer.src = file;        
    };

    $("#imgEject").click(function () {
        if (powerOn) {
            $("#audio_file").trigger('click');
        }
    });

    AudioPlayer_init();

    //Canvasses
    var equalizerCanvas;
    var equalizerContext;
    var fxCanvas;
    var fxContext;
    var volumeCanvas;
    var volumeContext;
    var logoCanvas;
    var logoContext;
    var backgroundfullCanvas;
    var backgroundfullContext;

    function Init() {
        initCanvas();
        initAnimations();        
    }

    function Start() {
                
        Init();

        $('#content').hide();
        
        waitForWebfonts(['CommodoreServer', 'Snaredrum'], function () {
            introanimations.push(new c64Typer('LOAD"64PLAYER",8eedxSEARCHING FOR 64PLAYERedwdLOADINGdwdeREADY.exdwRUNxcwn'));
            introanimations[0].Play(0);
            draw();
        });
    }

    function initAnimations()
    {
        soundDuration = new SoundDuration(document.getElementById('info'));

        shine = new Shine();

        animations = [];

        //0
        animations.push(new SpectrumAnalyzer());
        //1
        animations.push(new TimeAnalyzer());
        //2
        animations.push(new VolumeMeter());
    }

    function initCanvas()
    {
        var W = window.innerWidth;
        var H = window.innerHeight;

        //Scale content
        scale = 0.8 * (window.innerWidth / contentWidth);
        $('#content').css('transform', 'scale(' + scale + ',' + scale + ')');
        $('#bars').css('transform', 'scale(' + 1.6 + ',' + 1.6 + ')');

        equalizerCanvas = document.getElementById('equalizerCanvas');
        equalizerContext = equalizerCanvas.getContext('2d');

        fxCanvas = document.getElementById('fxCanvas');
        fxContext = fxCanvas.getContext('2d');

        volumeCanvas = document.getElementById('volumeCanvas');
        volumeContext = volumeCanvas.getContext('2d');

        backgroundfullCanvas = document.getElementById('backgroundFullCanvas');
        backgroundfullContext = backgroundfullCanvas.getContext('2d');

        logoCanvas = document.getElementById('logoCanvas');
        logoContext = logoCanvas.getContext('2d');

        //Make the backgroundfullcanvas occupy the full page
        backgroundfullCanvas.width = W;
        backgroundfullCanvas.height = W * 200 / 320;
        $("#backgroundFullCanvas").css({ 'top': (H - backgroundfullCanvas.height) / 2 });
    }

    $(window).resize(function () {
        initCanvas();
    });

    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;

    function draw() {

        requestAnimationFrame(draw);

        now = Date.now();
        delta = now - then;

        interval = 1000 / fps;
        if (delta > interval) {

            then = now - (delta % interval);

            if (isForwarding)
            {
                myAudioPlayer.currentTime = myAudioPlayer.currentTime + .5;
            }
            else if (isBackwarding)
            {
                myAudioPlayer.currentTime = myAudioPlayer.currentTime - .5;
            }

            logoContext.beginPath();
            logoContext.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
            logoContext.drawImage(shine.Draw(), 0, 0, logoCanvas.width, logoCanvas.height);

            //Draw info
            //if (soundDuration.IsPlaying())
                soundDuration.Draw();

            //Draw equalizer animation
            equalizerContext.beginPath();
            equalizerContext.clearRect(0, 0, equalizerCanvas.width, equalizerCanvas.height);
            if (animations[0].IsPlaying())
                equalizerContext.drawImage(animations[0].Draw(), 0, 0, equalizerCanvas.width, equalizerCanvas.height);

            //Draw fx animation
            fxContext.beginPath();
            fxContext.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
            if (animations[1].IsPlaying())
                fxContext.drawImage(animations[1].Draw(), 0, 0, fxCanvas.width, fxCanvas.height);

            //Draw volume animation
            volumeContext.beginPath();
            volumeContext.clearRect(0, 0, volumeCanvas.width, volumeCanvas.height);
            if (animations[2].IsPlaying())
                volumeContext.drawImage(animations[2].Draw(), 0, 0, volumeCanvas.width, volumeCanvas.height);

            if (introPlaying) {
                //Draw intro animations
                backgroundfullContext.beginPath();
                backgroundfullContext.clearRect(0, 0, backgroundfullCanvas.width, backgroundfullCanvas.height);
                if (introanimations[0].IsPlaying())
                    backgroundfullContext.drawImage(introanimations[0].Draw(), 0, 0, backgroundfullCanvas.width, backgroundfullCanvas.height);
                else {
                    introPlaying = false;
                    fps = 24;
                    //$('#backgroundFullCanvas').css('background-color', colors.DarkGray);
                    //$('#content').css('background-color', colors.DarkGray);
                    $('#equalizerCanvas').css('background-color', colors.Black);
                    $('#fxCanvas').css('background-color', colors.Black);
                    $('#volumeCanvas').css('background-color', colors.Black);
                    $('#content').show();
                    Init();
                }
            }
        }
    }

    Start();
});