function Shine() {
    var canvas = document.createElement("canvas");
    canvas.width = 90;
    canvas.height = 9;
    var context = canvas.getContext('2d');
    var _backgroundImage = new Image();
    _backgroundImage.src = "animations/Shine/Resources/Shine.png";
    xpos = 0;

    this.Draw = function () {
        if (xpos > canvas.width * 2)
            xpos = 0;

        context.fillStyle = colors.DarkGray;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(_backgroundImage, xpos, 0);
        xpos = xpos + 3;
        return canvas;
    }
}