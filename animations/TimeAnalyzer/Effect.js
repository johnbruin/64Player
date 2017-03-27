function TimeAnalyzer(audioPlayer)
{
    var canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 120;
    var context = canvas.getContext('2d');

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
        
        var width = canvas.width;
        var y = canvas.height / 2;
        var HEIGHT = 100;
        
        var binCount = audioPlayer.GetAudioAnalyser().frequencyBinCount;
        var times = new Uint8Array(binCount);
        audioPlayer.GetAudioAnalyser().getByteTimeDomainData(times);
        
        for (var i = 0; i < binCount; i++) {
            var value = times[i];
            var percent = value / 256;
            var height = HEIGHT * percent;
            var offset = HEIGHT - height - 1;
            var barWidth = width / binCount;
            context.fillStyle = $("#imgPower").css("background-color");
            context.fillRect(i * barWidth, y + offset - HEIGHT / 2, 2, 2);
        }
        return canvas;
    }
}