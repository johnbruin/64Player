$(function () {

    var _colors = [
		colors.Green, colors.Green, colors.Green, colors.Green, colors.Green, colors.Green, colors.Green, colors.Green,
		colors.LightGreen, colors.LightGreen, colors.LightGreen, colors.LightGreen, colors.LightGreen, colors.LightGreen, colors.LightGreen,
		colors.Yellow, colors.Yellow, colors.Yellow, colors.Yellow, colors.Yellow, colors.Yellow, colors.Yellow,
        colors.LightRed, colors.LightRed, colors.LightRed, colors.LightRed, colors.LightRed, colors.LightRed, colors.LightRed, colors.LightRed,
    ];

    var rad2deg = 180 / Math.PI;
    var deg = 0;
    var bars = $('#bars');

    for (var i = 0; i < _colors.length; i++) {

        deg = i * 12;

        $('<div class="colorBar">').css({
            backgroundColor: colors.Cyan,
            transform: 'rotate(' + deg + 'deg)',
            top: -Math.sin(deg / rad2deg) * 70 + 100,
            left: Math.cos((180 - deg) / rad2deg) * 70 + 100,
        }).appendTo(bars);
    }

    var colorBars = bars.find('.colorBar');
    colorBars.hide();
    var numBars = 0, lastNum = -1;

    $('#control').knobKnob({
        snap: 10,
        value: 154,
        turn: function (ratio) {
            numBars = Math.round(colorBars.length * ratio);
            ChangeVolume(ratio);

            if (numBars == lastNum) {
                return false;
            }
            lastNum = numBars;

            colorBars.removeClass('active').slice(0, numBars).addClass('active');
        }
    });

});