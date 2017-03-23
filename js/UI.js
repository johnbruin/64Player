var cssColor = 0;
var UI_init = function () {
    $("#imgColor").click(function () {
        if (powerOn) {
            cssColor++;
            if (cssColor > 6)
            {
                cssColor = 0;
            }
            document.getElementById('cssColor').href = "css/Color" + cssColor + ".css";
        }
    });

    $("#imgPrev").mousedown(function () {
        if (powerOn) {
            $("#imgPrev").addClass("on");
        }
    });
    $("#imgPrev").mouseup(function () {
        if (powerOn) {
            $("#imgPrev").removeClass("on");
        }
    });
    $("#imgNext").mousedown(function () {
        if (powerOn) {
            $("#imgNext").addClass("on");
        }
    });
    $("#imgNext").mouseup(function () {
        if (powerOn) {
            $("#imgNext").removeClass("on");
        }
    });
    $("#imgColor").mousedown(function () {
        if (powerOn) {
            $("#imgColor").addClass("on");
        }
    });
    $("#imgColor").mouseup(function () {
        if (powerOn) {
            $("#imgColor").removeClass("on");
        }
    });
    $("#imgDisplay").mousedown(function () {
        if (powerOn) {
            $("#imgDisplay").addClass("on");
        }
    });
    $("#imgDisplay").mouseup(function () {
        if (powerOn) {
            $("#imgDisplay").removeClass("on");
        }
    });
}