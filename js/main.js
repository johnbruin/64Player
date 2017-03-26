//Globals
var MyAudioPlayer = new AudioPlayer();
var powerOn = false;
var colors = new Colors();
var soundDuration;
var animations;

$(document).ready(function ()
{
    var introPlaying = true;
    var fps = 40;
    var introanimations = [];
    var shine;

    //Setup UI
    var MyUI = new UI(MyAudioPlayer);

    //Canvasses
    var equalizerCanvas;
    var equalizerContext;
    var fxCanvas;
    var fxContext;
    var volumeCanvas;
    var volumeContext;
    var volumeBarCanvas;
    var volumeBarContext;
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
            //introanimations[0].Play(0);
            draw();

            introPlaying = false;
            fps = 24;
            $('#equalizerCanvas').css('background-color', colors.Black);
            $('#fxCanvas').css('background-color', colors.Black);
            $('#volumeCanvas').css('background-color', colors.Black);
            $('#content').show();
            Init();
        });
    }

    function initAnimations()
    {
        soundDuration = new SoundDuration(document.getElementById('info'), MyAudioPlayer);

        shine = new Shine();

        animations = [];

        //0
        animations.push(new SpectrumAnalyzer(MyAudioPlayer));
        //1
        animations.push(new TimeAnalyzer(MyAudioPlayer));
        //2
        animations.push(new VolumeMeter(MyAudioPlayer));
        //3
        animations.push(new VolumeBar(MyAudioPlayer));
    }

    function initCanvas()
    {
        var contentWidth = 960;
        var contentHeight = 600;

        var W = window.innerWidth;
        var H = window.innerHeight;

        //Scale content
        var scale = 0.8 * (window.innerWidth / contentWidth);
        $('#content').css('transform', 'scale(' + scale + ',' + scale + ')');
        $('#bars').css('transform', 'scale(' + 1.6 + ',' + 1.6 + ')');

        equalizerCanvas = document.getElementById('equalizerCanvas');
        equalizerContext = equalizerCanvas.getContext('2d');

        fxCanvas = document.getElementById('fxCanvas');
        fxContext = fxCanvas.getContext('2d');

        volumeCanvas = document.getElementById('volumeCanvas');
        volumeContext = volumeCanvas.getContext('2d');

        volumeBarCanvas = document.getElementById('volumeBarCanvas');
        volumeBarContext = volumeBarCanvas.getContext('2d');

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

            if (MyUI.GetIsForwarding())
            {
                MyAudioPlayer.SetCurrentTime(MyAudioPlayer.GetCurrentTime() + .5);
            }
            else if (MyUI.GetIsBackwarding())
            {
                MyAudioPlayer.SetCurrentTime(MyAudioPlayer.GetCurrentTime() - .5);
            }

            logoContext.beginPath();
            logoContext.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
            logoContext.drawImage(shine.Draw(), 0, 0, logoCanvas.width, logoCanvas.height);

            //Draw info
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

            //Draw volume bars animation
            volumeBarContext.beginPath();
            volumeBarContext.clearRect(0, 0, volumeBarCanvas.width, volumeBarCanvas.height);
            //if (animations[3].IsPlaying())
                volumeBarContext.drawImage(animations[3].Draw(), 0, 0, volumeBarCanvas.width, volumeBarCanvas.height);

            if (introPlaying) {
                //Draw intro animations
                backgroundfullContext.beginPath();
                backgroundfullContext.clearRect(0, 0, backgroundfullCanvas.width, backgroundfullCanvas.height);
                if (introanimations[0].IsPlaying())
                    backgroundfullContext.drawImage(introanimations[0].Draw(), 0, 0, backgroundfullCanvas.width, backgroundfullCanvas.height);
                else
                {
                    introPlaying = false;
                    fps = 24;
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