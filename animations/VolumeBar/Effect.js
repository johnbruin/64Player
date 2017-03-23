function VolumeBar()
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

        if (myAudioAnalyser == null)
            return canvas;

        var average = 0;
        var freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount);
        myAudioAnalyser.getByteFrequencyData(freqByteData);
        average = getAverageVolume(freqByteData) / 10;

        for (var j = 0; j < 10; j++)
        {
            var x = (j * 15);
            context.fillStyle = colors.Black;
            context.fillRect(x, 15, 13, 13);
        }

        if (isPlaying) {
            for (var j = 0; j < average; j++) {
                var x = (j * 15);
                context.fillStyle = $("#imgPower").css("background-color");
                context.fillRect(x, 15, 13, 13);
            }
        }

        return canvas;
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

        if (average > 100)
            average = 100;

        return average;
    }
}