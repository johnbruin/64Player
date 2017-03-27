function SpectrumAnalyzer(audioPlayer) {
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height - 10;

    var bar_width = 15; //15, 24
    var barCount = Math.round(width / bar_width);
    var maxValues = new Array(barCount);
    for (var i = 0; i < barCount; i++) {
        maxValues[i] = 0;
    }

    var _mode = 0;

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

    this.Mode = function (value) {
        if (value > 4) {
            value = 0;
        }
        if (value < 0) {
            value = 4;
        }

        _mode = value;
        switch (_mode) {
            case 0:
                bar_width = 15;
                break;
            case 1:
                bar_width = 24;
                break;
            case 2:
                bar_width = 24;
                break;
            case 3:
                bar_width = 15;
                break;
            case 4:
                bar_width = 15;
                break;

            default:
                bar_width = 15;
        }
        barCount = Math.round(width / bar_width);
        for (var i = 0; i < barCount; i++) {
            maxValues[i] = 0;
        }
    }

    this.GetMode = function () {
        return _mode;
    }

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        var block_height = 10;
        var y2 = block_height - 3;

        var binCount = audioPlayer.GetAudioAnalyser().frequencyBinCount;
        var freqByteData = new Uint8Array(binCount);
        audioPlayer.GetAudioAnalyser().getByteFrequencyData(freqByteData);

        for (var i = 0; i < barCount; i++) {
            var magnitude = freqByteData[i * 5];

            if (_mode == 3) {
                var bar_height = 1 + Math.round((magnitude * 2) / block_height / 3);
                y2 = block_height - 5;
                for (var j = 0; j < bar_height / 2; j++) {
                    var y1 = j * block_height;
                    context.fillStyle = $("#imgPower").css("background-color");
                    context.fillRect(5 + bar_width * i, (height / 2) - y1, bar_width - 5, y2);
                    context.fillRect(5 + bar_width * i, (height / 2) + y1, bar_width - 5, y2);
                }
            }
            else if (_mode == 2) {
                var bar_height = Math.round((magnitude * 2) / block_height / 3);
                if (maxValues[i] > 0) {
                    maxValues[i] = maxValues[i] - .5;
                }
                if (bar_height > maxValues[i]) {
                    maxValues[i] = bar_height;
                }
                context.fillStyle = $("#imgPower").css("background-color");
                context.fillRect(5 + bar_width * i, height - (maxValues[i] * block_height), bar_width - 5, y2);
            }
            else if (_mode == 4) {
                var bar_height = Math.round((magnitude * 2) / block_height / 3);
                if (maxValues[i] > 0) {
                    maxValues[i] = maxValues[i] - .5;
                }
                if (bar_height / 2 > maxValues[i]) {
                    maxValues[i] = bar_height / 2;
                }
                context.fillStyle = $("#imgPower").css("background-color");
                context.fillRect(5 + bar_width * i, (height / 2) - (maxValues[i] * block_height), bar_width - 5, y2);
                context.fillRect(5 + bar_width * i, (height / 2) + (maxValues[i] * block_height), bar_width - 5, y2);
            }
            else {
                var bar_height = 1 + Math.round((magnitude * 2) / block_height / 3);
                for (var j = 0; j < bar_height; j++) {
                    var y1 = j * block_height;
                    context.fillStyle = $("#imgPower").css("background-color");
                    context.fillRect(5 + bar_width * i, height - y1, bar_width - 5, y2);
                }
            }
        }
        return canvas;
    }
}