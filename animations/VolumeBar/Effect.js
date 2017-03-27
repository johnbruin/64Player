function VolumeBar(audioPlayer)
{
    var canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 50;
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;


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

        var volume = audioPlayer.GetAverageVolume() / 10;
        if (volume > 10)
            volume = 10;

        for (var j = 0; j < 10; j++)
        {
            var x = (j * 15);
            context.fillStyle = colors.Black;
            context.fillRect(x, 15, 13, 13);
        }

        if (_playing) {
            for (var j = 0; j < volume; j++) {
                var x = (j * 15);
                context.fillStyle = $("#imgPower").css("background-color");
                context.fillRect(x, 15, 13, 13);
            }
        }

        return canvas;
    }
}