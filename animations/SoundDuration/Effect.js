function SoundDuration(element)
{
    element.innerHTML = "";

    var _sound = null;
    var _index = -5;

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    this.Play = function (sound) {
        _sound = sound;
        _playing = true;
        _index = -5;
    }

    this.Stop = function () {
        _playing = false;
        var _index = -5;
    }

    this.Draw = function () {
        if (_sound != null && _playing)
        {
            $("#info").css('color', $("#imgPower").css("background-color"));
            var duration = _sound.getDuration();
            var currentTime = _sound.getCurrentTime();
            if (duration >= currentTime) {
                element.innerHTML = "REMAINING: " + formattime(duration - currentTime);
            }
        }
        else if (powerOn) {
            $("#info").css('color', $("#imgPower").css("background-color"));
            var audiofileName = myAudioFileName.replace(".mp3", "");
            if (audiofileName.length > 35) {
                _index = _index + .3;
                if (_index > audiofileName.length)
                    _index = -5;
                if (_index > 0)
                    audiofileName = audiofileName.substring(_index, audiofileName.length);
            }
            else
            {
                _index = -5;
            }
            element.innerHTML = audiofileName
        }
        else {
            $("#info").css('color', colors.Gray);
            element.innerHTML = getFullDateTime();
        }
    }

    function formattime(numberofseconds) {
        var zero = '0';
        var time = new Date(0, 0, 0, 0, 0, numberofseconds, 0);

        var hh = time.getHours();
        var mm = time.getMinutes();
        var ss = time.getSeconds()

        // Pad zero values to 00
        hh = (zero + hh).slice(-2);
        mm = (zero + mm).slice(-2);
        ss = (zero + ss).slice(-2);

        time = hh + ' : ' + mm + ' : ' + ss;
        return time;
    }

    function getFullDateTime()
    {
        var zero = '0'
        var date = new Date();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds()

        // Pad zero values to 00
        hh = (zero + hh).slice(-2);
        mm = (zero + mm).slice(-2);
        ss = (zero + ss).slice(-2);

        var time = hh + ' : ' + mm + ' : ' + ss;        
        var day = date.getDate();
        var dayAsWord = getdayasword(date.getDay());
        var monthAsWord = getmonthasword(date.getMonth());
        var year = date.getFullYear();

        return dayAsWord + "&nbsp;&nbsp;" + day + "&nbsp;" + monthAsWord + "&nbsp;" + year + "&nbsp;&nbsp;" + time;
    }

    function getmonthasword(number) {
        switch (number) {
            case 0:
                result = "January";
                break;
            case 1:
                result = "February";
                break;
            case 2:
                result = "March";
                break;
            case 3:
                result = "April";
                break;
            case 4:
                result = "May";
                break;
            case 5:
                result = "June";
                break;
            case 6:
                result = "July";
                break;
            case 7:
                result = "August";
                break;
            case 8:
                result = "September";
                break;
            case 9:
                result = "October";
                break;
            case 10:
                result = "November";
                break;
            case 11:
                result = "December";
                break;
        }
        return result;
    }

    function getdayasword(number) {
        switch (number) {
            case 0:
                result = "Sunday";
                break;
            case 1:
                result = "Monday";
                break;
            case 2:
                result = "Tuesday";
                break;
            case 3:
                result = "Wednesday";
                break;
            case 4:
                result = "Thursday";
                break;
            case 5:
                result = "Friday";
                break;
            case 6:
                result = "Saturday";
                break;
        }
        return result;
    }
}