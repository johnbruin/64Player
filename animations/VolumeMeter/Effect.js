function VolumeMeter(audioPlayer)
{
    var canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 100;
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;
    var _backgroundImage = new Image();
    _backgroundImage.src = "animations/VolumeMeter/Resources/Background.png";

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    this.Play = function () {
        _playing = true;
    }

    this.Stop = function () {
        _playing = false;
    }
    
    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(_backgroundImage, 0, 0, canvas.width, canvas.height);

        var average = audioPlayer.GetAverageVolume();
        if (average > 110)
            average = 110;
        average = average / 50;

        context.save();
        context.beginPath();
        context.moveTo(width / 2, height);
        var x = Math.sin(average + Math.PI * 1.65) * 80;
        var y = Math.cos(average + Math.PI * 1.65) * 80;

        context.lineTo((width / 2) + x, height - y);
        context.lineWidth = 3;

        // set line color
        context.strokeStyle = colors.Red;
        context.closePath();
        context.stroke();
        context.restore();

        return canvas;
    }
}