function Elite() {

    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 60;
    var context = canvas.getContext('2d');

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

    function Point3D(X, Y, Z) {

        this.x = (X / 4);
        this.y = (Y / 4);
        this.z = Z / 4;

        this.rotateX = function (angle) {
            var rad, cosa, sina, y, z;
            rad = angle * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);
            y = this.y * cosa - this.z * sina;
            z = this.y * sina + this.z * cosa;
            return new Point3D(this.x, y, z);
        }

        this.rotateY = function (angle) {
            var rad, cosa, sina, x, z;
            rad = angle * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);
            z = this.z * cosa - this.x * sina;
            x = this.z * sina + this.x * cosa;
            return new Point3D(x, this.y, z);
        }

        this.rotateZ = function (angle) {
            var rad, cosa, sina, x, y;
            rad = angle * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);
            x = this.x * cosa - this.y * sina;
            y = this.x * sina + this.y * cosa;
            return new Point3D(x, y, this.z);
        }

        this.project = function (viewWidth, viewHeight, fov, viewDistance) {
            var factor, x, y;
            factor = fov / (viewDistance + this.z);
            x = this.x * factor + viewWidth / 2;
            y = this.y * factor + viewHeight / 2;
            return new Point3D(x, y, this.z);
        }
    }

    var vertices = [
        new Point3D(40, 0, 95),
        new Point3D(-40, 0, 95),
        new Point3D(0, 32.5, 30),
        new Point3D(-150, -3.8, -10),
        new Point3D(150, -3.8, -10),
        new Point3D(-110, 20, -50),
        new Point3D(110, 20, -50), 
        new Point3D(160, -10, -50), 
        new Point3D(-160, -10, -50), 
        new Point3D(0, 32.5, -50), 
        new Point3D(-40, -30, -50), 
        new Point3D(40, -30, -50), 
        new Point3D(-45, 10, -55), 
        new Point3D(-10, 15, -55), 
        new Point3D(10, 15, -55), 
        new Point3D(45, 10, -55), 
        new Point3D(45, -15, -55), 
        new Point3D(10, -20, -55), 
        new Point3D(-10, -20, -55), 
        new Point3D(-45, -15, -55), 
        new Point3D(-2, -2, 95), 
        new Point3D(-2, -2, 112.5), 
        new Point3D(-100, -7.5, -55), 
        new Point3D(-100, 7.5, -55), 
        new Point3D(-110, 0, -55), 
        new Point3D(100, 7.5, -55), 
        new Point3D(110, 0, -55), 
        new Point3D(100, -7.5, -55), 
        new Point3D(2, -2, 95), 
        new Point3D(2, -2, 112.5),
        new Point3D(2, 2, 95), 
        new Point3D(2, 2, 112.5), 
        new Point3D(-2, 2, 95),
        new Point3D(-2, 2, 112.5)    
    ];

    // Define the vertices that compose each of the 6 faces. These numbers are
    // indices to the vertex list defined above.
    var faces = [
        [2, 1, 0], 
		[0, 1, 10, 11],
		[6, 2, 0],
		[0, 4, 6],
		[0, 11, 7, 4], 
		[1, 2, 5],
		[5, 3, 1],
		[1, 3, 8, 10], 
		[5, 2, 9], 
		[2, 6, 9], 
		[5, 8, 3], 
		[7, 6, 4], 
		[9, 6, 7, 11, 10, 8, 5], 
		[14, 15, 16, 17], 
		[12, 13, 18, 19], 
		[25, 26, 27], 
		[24, 23, 22], 
		[21, 29, 28, 20], 
		[31, 29, 28, 30], 
		[32, 30, 31, 33], 
		[21, 33, 32, 20], 
		[20, 29, 31, 33]
    ];

    var angle = 0;

    this.Draw = function () {

        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);

        var t = new Array();

        for (var i = 0; i < vertices.length; i++) {
            var v = vertices[i];
            var r = v.rotateZ(angle).rotateX(angle).rotateZ(angle);
            var p = r.project(100, 60, 200, 1);
            t.push(p);
        }

        var avg_z = new Array();

        for (var i = 0; i < faces.length; i++) {
            var f = faces[i];
            var tot = 0;
            for (var pp = 0; pp < f.length; pp++) {
                tot = tot + t[f[pp]].z;
            }
            avg_z[i] = { "index": i, "z": tot / f.length };
        }

        avg_z.sort(function (a, b) {
            return b.z - a.z;
        });

        for (var i = 0; i < faces.length; i++) {
            var f = faces[avg_z[i].index];
            context.save();
            context.strokeStyle = $("#imgPower").css("background-color");
            context.translate(canvas.width / 2.5, canvas.height / 2.5);
            context.beginPath();
            context.moveTo(t[f[0]].x, t[f[0]].y);
            context.lineWidth = 1;
            context.lineCap = "square";
            for (var pp = 1; pp < f.length; pp++) {
                context.lineTo(t[f[pp]].x, t[f[pp]].y);
            }
            context.closePath();
            context.stroke();
            context.restore();
        }
        angle += 2;
        return canvas;
    }
}