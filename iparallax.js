
//Layer constructor function
var layer = function(param) {
	this.elem = [];
	this.parallax = param.parallax;
	this.randomFunction = param.randFunction;
	var rf = this.randomFunction;
	for(var i=0;i<param.num_squares;i++) {
        var ret = {
            s: Math.round(Math.random()*(param.max_side - param.min_side) + param.min_side),
            x: Math.round(param.randomFunction()*param.width),
            y: Math.round(Math.random()*param.height),
            c: Math.random()*(param.max_gray - param.min_gray) + param.min_gray,
            o: (Math.random()*(param.max_opacity - param.min_opacity) + param.min_opacity),
            r: 0,
            g: 0,
            b: 0,
            fo: 0,
            r_grad:0,
            g_grad:0,
            b_grad:0,
            o_grad:0
        };
        ret.r = ret.g = ret.b = ret.c;
        ret.fo = ret.o;
		this.elem.push(ret);
	}
};

var llayers = [];
var rlayers = [];
var resetFlag = false;
var REP = 20;
var DELAY = 20;

//Initiate all the squares at the starting itself: called when doc is ready
var startup = function() {

	var left = document.getElementById("left-canvas");
	var right = document.getElementById("right-canvas");
	left.height = $("body").height();
	right.height = $("body").height();
	var lc = $("#left-canvas").get(0).getContext("2d");
	var rc = $("#right-canvas").get(0).getContext("2d");


	// Push in the first layer
	llayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 50,
		max_side: 30,
		min_side: 25,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.01,
        grad: function(){},
		randomFunction: function() {
			return Math.random()*Math.random()*Math.random();
		}
	}));
	rlayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 50,
		max_side: 30,
		min_side: 25,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.01,
        grad: function(){},
		randomFunction: function() {
			return 1-Math.random()*Math.random()*Math.random();
		}
	}));

	// Push in the second layer
	llayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 50,
		max_side: 25,
		min_side: 15,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.25,
        grad: function(){},
		randomFunction: function() {
			return Math.random()*Math.random();
		}
	}));
	rlayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 50,
		max_side: 25,
		min_side: 15,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.25,
		randomFunction: function() {
			return 1-Math.random()*Math.random();
		}
	}));

	// Push in the third layer
	llayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 40,
		max_side: 15,
		min_side: 7,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.5,
        grad: function(){},
		randomFunction: function() {
			return Math.random();
		}
	}));
	rlayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 40,
		max_side: 15,
		min_side: 7,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.5,
        grad: function(){},
		randomFunction: function() {
			return 1-Math.random();
		}
	}));

	// Push in the fourth layer
	llayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 40,
		max_side: 7,
		min_side: 0,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.75,
        grad: function(){},
		randomFunction: function() {
			return Math.random();
		}
	}));
	rlayers.push(new layer({
		height: left.height,
		width: right.width,
		num_squares: 40,
		max_side: 7,
		min_side: 0,
		max_gray: 220,
		min_gray: 175,
		max_opacity: 0.6,
		min_opacity: 0.2,
		parallax: 0.75,
        grad: function(){},
		randomFunction: function() {
			return 1-Math.random();
		}
	}));

	$(window).scroll(drawCanvas);
	drawCanvas();
};

var drawLayer = function(l, e) {
    var context = e.getContext("2d");
    var scrollTop = $(window).scrollTop();
    var offs = $("#content-pane").offset();

    for(var i=0;i<l.elem.length;i++) {
        var r = Math.round(l.elem[i].r);
        var g = Math.round(l.elem[i].g);
        var b = Math.round(l.elem[i].b);
        if(r>255)r=255;
        if(r<0)r=0;
        if(b>255)b=255;
        if(b<0)b=0;
        if(g>255)g=255;
        if(g<0)g=0;
        context.fillStyle = "rgba("+r+","+g+","+b+","+l.elem[i].fo+")";
        context.fillRect(l.elem[i].x, l.elem[i].y + l.parallax * scrollTop, l.elem[i].s, l.elem[i].s);
        //if(!($(e).offset().left+l.elem[i].x+l.elem[i].s< offs.left || $(e).offset().left+l.elem[i].x>offs.right))
        //    stackBlurCanvasRGBA("left-canvas",l.elem[i].x,l.elem[i].y,l.elem[i].s,l.elem[i].s,3);
    }
};

var drawCanvas = function() {
    var right = document.getElementById("right-canvas");
    var left = document.getElementById("left-canvas");
    var rc = document.getElementById("right-canvas").getContext("2d");
    var lc = document.getElementById("left-canvas").getContext("2d");
    rc.clearRect(0,0,right.width,right.height);
    lc.clearRect(0,0,left.width,left.height);
    for(var i=0;i<rlayers.length;i++) {
        drawLayer(rlayers[i], right);
        drawLayer(llayers[i], left);
    }
};

$(document).on("ready",startup);

var drawSquares = function(color) {
    for(var i=0;i<llayers.length;i++) {
        for(var j=0;j<llayers[i].elem.length;j++) {
            var l = llayers[i].elem[j];
            var r = rlayers[i].elem[j];
            switch(color) {
                case "red":
                    l.r_grad = (255 - l.r)/REP;
                    r.r_grad = (255 - r.r)/REP;

                    l.g_grad = (0 - l.g)/REP;
                    r.g_grad = (0 - r.g)/REP;

                    l.b_grad = (0 - l.b)/REP;
                    r.b_grad = (0 - r.b)/REP;
                    break;
                case "lime":
                    l.g_grad = (255 - l.g)/REP;
                    r.g_grad = (255 - r.g)/REP;

                    l.r_grad = (0 - l.r)/REP;
                    r.r_grad = (0 - r.r)/REP;

                    l.b_grad = (0 - l.b)/REP;
                    r.b_grad = (0 - r.b)/REP;
                    break;
                case "mediumpurple":
                    l.r_grad = (147 - l.r)/REP;
                    r.r_grad = (147 - r.r)/REP;

                    l.g_grad = (112 - l.g)/REP;
                    r.g_grad = (112 - r.g)/REP;

                    l.b_grad = (219 - l.b)/REP;
                    r.b_grad = (219 - r.b)/REP;
                    break;
                case "blue":
                    l.b_grad = (255 - l.b)/REP;
                    r.b_grad = (255 - r.b)/REP;

                    l.g_grad = (0 - l.g)/REP;
                    r.g_grad = (0 - r.g)/REP;

                    l.r_grad = (0 - l.r)/REP;
                    r.r_grad = (0 - r.r)/REP;
                    break;
                case "original":
                    resetFlag = true;
                    l.r_grad = (l.c - l.r)/REP;
                    r.r_grad = (r.c - r.r)/REP;

                    l.g_grad = (l.c - l.g)/REP;
                    r.g_grad = (r.c - r.g)/REP;

                    l.b_grad = (l.c - l.b)/REP;
                    r.b_grad = (r.c - r.b)/REP;

                    l.o_grad = (l.o - l.fo)/REP;
                    r.o_grad = (r.o - r.fo)/REP;
            }
            if(color!== "original") {
                l.o_grad = (Math.random()*(1-.6) +.6 - l.fo)/REP;
                r.o_grad = (Math.random()*(1-.6) +.6 - r.fo)/REP;
            }
        }
    }
    
    if(color!=="original")
        setIntervalX(function(){
            if(!resetFlag) {
                for(var i=0;i<llayers.length;i++) {
                    for(var j=0;j<llayers[i].elem.length;j++) {
                    {
                            var l = llayers[i].elem[j];
                            var r = rlayers[i].elem[j];
                            l.r += l.r_grad;
                            r.r += l.r_grad;

                            l.g += l.g_grad;
                            r.g += r.g_grad;

                            l.b += l.b_grad;
                            r.b += r.b_grad;

                            l.fo += l.o_grad;
                            r.fo += r.o_grad;
                        }
                    }
                }
                drawCanvas();
            }
        }, DELAY, REP);
    else
        setIntervalX(function(){
            for(var i=0;i<llayers.length;i++) {
                for(var j=0;j<llayers[i].elem.length;j++) {
                     {
                        var l = llayers[i].elem[j];
                        var r = rlayers[i].elem[j];
                        l.r += l.r_grad;
                        r.r += l.r_grad;

                        l.g += l.g_grad;
                        r.g += r.g_grad;

                        l.b += l.b_grad;
                        r.b += r.b_grad;

                        l.fo += l.o_grad;
                        r.fo += r.o_grad;
                    }
                }
            }
            drawCanvas();
        }, DELAY, REP, function(){resetFlag=false;});
};

function resetSquares() {
    drawSquares("original");
}

function setIntervalX(callback, delay, repetitions, endf) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
           if(endf!==undefined)
            endf();
       }
    }, delay);
    return intervalID;
}

// Reset the squares only when mouse leaves the button-pane
$("#buttons-pane").mouseleave(function(){
    resetSquares();
});

// Attach event handler for each button
$("#about-me-button").click(function(){
    var offset = $("#about-me").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": offset},1000);
    
});
$("#about-me-button").mouseenter(function(){
    drawSquares("red");
});

$("#home-button").click(function(){
    var offset = $("#home").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": $("#home").offset().top},1000);
});
$("#home-button").mouseenter(function(){
    drawSquares("lime");
});

$("#contact-button").click(function(){
    var offset = $("#contact-me").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": $("#contact-me").offset().top},1000);
});
$("#contact-button").mouseenter(function(){
    console.log("Mouse entered tasksButton");
    drawSquares("mediumpurple");
});

$("#stuff-button").click(function(){
    var offset = $("#stuff").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": $("#stuff").offset().top},1000);
});
$("#stuff-button").mouseenter(function(){
    console.log("Mouse entered nearest events button");
    drawSquares("blue");
});
