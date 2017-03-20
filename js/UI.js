var cssColor = 0;
var UI_init = function () {
    $("#imgColor").click(function () {
        if (powerOn) {
            cssColor++;
            if (cssColor > 3)
            {
                cssColor = 0;
            }
            document.getElementById('cssColor').href = "css/Color" + cssColor + ".css";
            //var newColor = $("#imgPower").css("background-color");
            //$(".colorBar").css("background-color", newColor);
        }
    });
}