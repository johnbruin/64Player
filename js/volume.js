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

        deg = -30 + i * 12;

        if (i < 21) {
            $('<div class="grayBar">').css({
                backgroundColor: colors.Black,
                transform: 'rotate(' + deg + 'deg)',
                top: -Math.sin(deg / rad2deg) * 60 + 100,
                left: Math.cos((180 - deg) / rad2deg) * 60 + 100,
            }).appendTo(bars);
        }

        $('<div class="colorBar">').css({
            backgroundColor: colors.Cyan,
            transform: 'rotate(' + deg + 'deg)',
            top: -Math.sin(deg / rad2deg) * 60 + 100,
            left: Math.cos((180 - deg) / rad2deg) * 60 + 100,
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
            ChangeVolume(ratio * 1.2);

            if (numBars == lastNum) {
                return false;
            }
            lastNum = numBars;

            colorBars.removeClass('active').slice(0, numBars).addClass('active');
        }
    });

});