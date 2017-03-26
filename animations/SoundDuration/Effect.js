function SoundDuration(element, sound)
{
    element.innerHTML = "";

    var _sound = sound;
    var _index = -5;
    var _displayIndex = 0;
    var _oldDisplayIndex = 0;

    var _showFileNameInterval = 80;
    var _showFileNameTime = 80;

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    this.Play = function () {
        _playing = true;
        _index = -5;
    }

    this.Stop = function () {
        _playing = false;
        _index = -5;
    }

    this.Next = function () {
        _showFileNameTime = 80;
        _showFileNameInterval = -1;
        _displayIndex = 4;
        _index = -5;
    }

    this.ChangeDisplay = function (index) {
        if (index > 3 || index < 0) {
            index = 0;
        }
        _oldDisplayIndex = index;
        _showFileNameTime = 80;
        _showFileNameInterval = 80;
        _displayIndex = _oldDisplayIndex;
    }

    this.GetDisplayIndex = function () {
        return _oldDisplayIndex;
    }

    this.Draw = function () {
        if (_sound == null)
            return;

        if (!powerOn)
        {
            $("#info").css('color', colors.Gray);
            element.innerHTML = getFullDateTime();
        }
        else
        {
            if (_showFileNameTime == 0 && _index < 0) {
                _showFileNameInterval = 80;
                _showFileNameTime = -1;
                _displayIndex = _oldDisplayIndex;
            }

            if (_showFileNameInterval == 0) {
                _showFileNameTime = 80;
                _showFileNameInterval = -1;
                _oldDisplayIndex = _displayIndex;
                _displayIndex = 4;
            }

            if (_showFileNameInterval > 0) {
                _showFileNameInterval--;
            }
            if (_showFileNameTime > 0) {
                _showFileNameTime--;
            }
            
            $("#info").css('color', $("#imgPower").css("background-color"));
            var duration = _sound.GetDuration();
            var currentTime = _sound.GetCurrentTime();

            if (_displayIndex == 0) {
                if (duration >= currentTime) {
                    element.innerHTML = "REMAINING TIME: " + formattime(duration - currentTime);
                }
            }
            else if (_displayIndex == 1) {
                element.innerHTML = "PLAYING TIME: " + formattime(currentTime);
            }
            else if (_displayIndex == 4) {
                var audiofileName = _sound.GetFileName().replace(".mp3", "");
                element.innerHTML = scrollLongText(audiofileName);
            }
            else if (_displayIndex == 2) {
                element.innerHTML = getFullDateTime();
            }
            else if (_displayIndex == 3) {
                var infoText = "- 64Player - by John Bruin in 2017"
                element.innerHTML = scrollLongText(infoText);
            }
        }
    }

    function scrollLongText(text)
    {
        if (text.length > 35) {
            _index = _index + .5;
            if (_index > text.length) {
                _index = -5;
                text = "";
            }
            else if (_index > 0) {
                text = text.substring(_index, text.length);
            }
        }
        else {
            _index = -5;
        }
        return text;
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