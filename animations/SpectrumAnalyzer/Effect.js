function SpectrumAnalyzer()
{
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height - 10;

    var bar_width = 24;
    var barCount = Math.round(width / bar_width);

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

        if (myAudioAnalyser == null)
            return canvas;

        var block_height = 10;
        var y2 = block_height - 3;

        var binCount = myAudioAnalyser.frequencyBinCount;
        var freqByteData = new Uint8Array(binCount);
        myAudioAnalyser.getByteFrequencyData(freqByteData);

        for (var i = 0; i < barCount; i++) {

            var magnitude = freqByteData[i * 5];

            var bar_height = 1 + Math.round((magnitude * 2) / block_height / 3);
            
            for (var j = 0; j < bar_height; j++) {
                var y1 = height - (j * block_height);
                context.fillStyle = colors.Cyan;
                context.fillRect(5 + bar_width * i, y1, bar_width - 5, y2);
            }
        }        
        return canvas;
    }
}