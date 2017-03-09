/*global document, colors, next*/
function c64Typer(text) {

    // in text codes:
    // e = next line
    // x = enable/disable flashing cursor
    // d = delay typing by random amount on/off (off = type hyper fast)
    // w = wait for a long while (only works when delay (d) is ON))
    // c = decrunch effects on/off
    
	// setup code
    var canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = canvas.width / 1.6;
    var context = canvas.getContext('2d');
	             
	var borderWidth,
	    borderHeight,
	    charSize,
        lineSize,
	    blinkSpeed = 20,
	    cursorBlink = 0,
        cursorX =0,
        cursorY =6,
        typeI = 0,
        typeDelay = 50,
        typeDelayOn = true,
        decrunchOn = false,
        screen = new Array(25),
        cursorOn = true;
    
    for (var i = 0; i < screen.length; i++) {
        screen[i] = new Array(40);
        for (var ii = 0; ii < 40; ii++) {
            screen[i][ii]= ' ';
        }
    }

    function Init() {
    }

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
        Init();
        _times = times;
        _counter = 0;
        _playing = true;
    }

	this.Draw = function () {

	    context.clearRect(0, 0, canvas.width, canvas.height);

	    if (_counter > _times) {
	        context.clearRect(0, 0, canvas.width, canvas.height)
	        _playing = false;
	        return canvas;
	    }
	    _counter++;

		charSize = (canvas.width * 0.8) / 40;
        lineSize = charSize / 8;
		var screenWidth = charSize * 40;
		var screenHeight = charSize * 25;		
		
		borderWidth = (canvas.width - screenWidth) / 2;
		borderHeight = (canvas.height - screenHeight) /2 ;		
		
		context.fillStyle = colors.Blue;
		context.fillRect(0,0, canvas.width, canvas.height);
		
		context.fillStyle = colors.LightBlue;
		context.fillRect(0, 0, canvas.width, borderHeight);
		context.fillRect(0, canvas.height - borderHeight, canvas.width, canvas.height);
		
		context.fillRect(0, 0, borderWidth, canvas.height);
		context.fillRect(canvas.width - borderWidth, 0, canvas.width, canvas.height);		
		
        context.font = charSize + "px CommodoreServer";
		context.textBaseline = "top";
		
        this.decrunch();
        context.fillStyle = colors.LightBlue;
		this.putText(4, 1, "**** COMMODORE 64 BASIC V2 ****");
		this.putText(1, 3, "64K RAM SYSTEM  38911 BASIC BYTES FREE");
		this.putText(0, 5, "READY.");
		this.drawCursor();
        this.typeChar();
        this.drawScreen();
        
		return canvas;
	};
	
	this.putText = function(x, y, text) {
		context.fillText(text, borderWidth + charSize * x, borderHeight + charSize * y);
	};
	
    this.typeChar = function() {
        
        if (typeDelayOn && (typeDelay-- > 0)) {
            return;
        } 
        
        if (typeI < text.length) {
            
            var c = text.charAt(typeI++);
            
            if (c === 'e') {
                cursorX = 0;
                cursorY++;
            }
            else if (c === 'x') {
                cursorOn = !cursorOn;
            }
            else if (c === 'd') {
                typeDelayOn = !typeDelayOn;
            }
            else if (c === 'w') {
                typeDelay = 100;
            }
            else if (c === 'c') {
                decrunchOn = !decrunchOn;
            }
            else if (c === 'n') {
                _playing = false;;
            }
            else {
                screen[cursorY][cursorX++] = c;
                typeDelay = 3 + Math.random() * 8;
            }
        }
        if (cursorX > 40) {
            cursorX = 0;
            cursorY++;
        }
    };
    
    this.drawScreen = function() {
        
        for (var y = 0; y < screen.length; y++) {
            for (var x = 0; x < 40; x++) {
                context.fillText(screen[y][x], borderWidth + charSize * x, borderHeight + charSize * y); 
            }
        }
    };
    
    
    this.decrunch = function() {
        if (decrunchOn) {
           for (var y = 0; y < canvas.height; y+= lineSize) {
               context.fillStyle = colors.Random();
               context.fillRect(0, y, canvas.width, lineSize);
           }
        }
    };
		
    
	this.drawCursor = function() {
		if (cursorOn && (cursorBlink > blinkSpeed)) {
            context.fillStyle = colors.LightBlue;
            var x = borderWidth + charSize * cursorX,
                y = borderHeight + charSize * cursorY;

            context.fillRect(x, y, charSize, charSize);
		}
		cursorBlink = (cursorBlink + 1) % (2 * blinkSpeed);		
	};

}