function SoundDuration(element)
{
    element.innerHTML = "";

    var _sound = null;

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    this.Play = function (sound) {
        _sound = sound;
        _playing = true;
    }

    this.Stop = function () {
        _playing = false;
    }

    this.Draw = function () {
        if (_sound != null) {
            var duration = _sound.getDuration();
            var currentTime = _sound.getCurrentTime();
            if (duration >= currentTime) {
                element.innerHTML = "REMAINING: " + formattime(duration - currentTime);
            }
        }
    }

    function formattime(numberofseconds) {
        var zero = '0', hours, minutes, seconds, time;

        time = new Date(0, 0, 0, 0, 0, numberofseconds, 0);

        hh = time.getHours();
        mm = time.getMinutes();
        ss = time.getSeconds()

        // Pad zero values to 00
        hh = (zero + hh).slice(-2);
        mm = (zero + mm).slice(-2);
        ss = (zero + ss).slice(-2);

        time = hh + ' : ' + mm + ' : ' + ss;
        return time;
    }
}