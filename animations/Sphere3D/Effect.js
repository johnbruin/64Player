function Sphere3D(audioPlayer) {

    var rotation = 0;
    var distance = 0;
    var sphere;

    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 60;
    var context = canvas.getContext('2d');

    function Point3D() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    this.Play = function () {

        sphere = new _Sphere3D();
        rotation = 0;
        distance = 0;

        _playing = true;
    }

    this.Stop = function () {
        _playing = false;
    }

    function _Sphere3D(radius) {
        this.point = new Array();
        this.color = "rgb(100,0,255)"
        this.radius = (typeof (radius) == "undefined") ? 20.0 : radius;
        this.radius = (typeof (radius) != "number") ? 20.0 : radius;
        this.numberOfVertexes = 0;

        for (alpha = 0; alpha <= 6.28; alpha += 0.17) {
            p = this.point[this.numberOfVertexes] = new Point3D();

            p.x = Math.cos(alpha) * this.radius;
            p.y = 0;
            p.z = Math.sin(alpha) * this.radius;

            this.numberOfVertexes++;
        }

        for (var direction = 1; direction >= -1; direction -= 2) {
            for (var beta = 0.17; beta < 1.445; beta += 0.17) {
                var radius = Math.cos(beta) * this.radius;
                var fixedY = Math.sin(beta) * this.radius * direction;

                for (var alpha = 0; alpha < 6.28; alpha += 0.17) {
                    p = this.point[this.numberOfVertexes] = new Point3D();

                    p.x = Math.cos(alpha) * radius;
                    p.y = fixedY;
                    p.z = Math.sin(alpha) * radius;

                    this.numberOfVertexes++;
                }
            }
        }
    }

    function rotateX(point, radians) {
        var y = point.y;
        point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
        point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
    }

    function rotateY(point, radians) {
        var x = point.x;
        point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
        point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
    }

    function rotateZ(point, radians) {
        var x = point.x;
        point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
        point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
    }

    function projection(xy, z, xyOffset, zOffset, distance) {
        return ((distance * xy) / (z - zOffset)) + xyOffset;
    }

    this.Draw = function () {

        var x, y;

        var p = new Point3D();

        var width = canvas.width;
        var height = canvas.height;

        context.save();
        context.clearRect(0, 0, width, height);

        for (i = 0; i < sphere.numberOfVertexes; i++) {

            p.x = sphere.point[i].x;
            p.y = sphere.point[i].y;
            p.z = sphere.point[i].z;

            rotateX(p, rotation);
            rotateY(p, rotation);
            rotateZ(p, rotation);

            x = projection(p.x, p.z, width / 2.0, 100.0, distance);
            y = projection(p.y, p.z, height / 2.0, 100.0, distance);

            if ((x >= 0) && (x < width)) {
                if ((y >= 0) && (y < height)) {
                    if (p.z < 0) {
                        drawPoint(context, x, y, 1, "rgb(200,200,200)");
                    } else {
                        drawPoint(context, x, y, 1, "rgb(0,200,0)");
                    }
                }
            }
        }

        rotation += Math.PI / 90.0;

        if (distance < 800) {
            distance += 10;
        }
        distance = 150 + audioPlayer.GetAverageVolume();

        return canvas;
    }

    function drawPoint(context, x, y, size, color) {
        context.save();
        context.beginPath();
        context.fillStyle = $("#imgPower").css("background-color");
        context.arc(x, y, size, 0, 2 * Math.PI, true);
        context.fill();
        context.restore();
    }
}