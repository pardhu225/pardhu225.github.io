var llayers = [];
var rlayers = [];
var resetFlag = false;
var drawId = -1;
var REP = 20;
var DELAY = 20;

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
        ret.fo = ret.o;
        this.elem.push(ret);
    }
};

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
		max_opacity: 0.8,
		min_opacity: 0.5,
		parallax: 0.01,
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
		max_opacity: 0.8,
		min_opacity: 0.5,
		parallax: 0.01,
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
		max_opacity: 0.8,
		min_opacity: 0.4,
		parallax: 0.25,
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
		max_opacity: 0.8,
		min_opacity: 0.4,
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
		max_opacity: 0.8,
		min_opacity: 0.4,
		parallax: 0.5,
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
		max_opacity: 0.8,
		min_opacity: 0.4,
		parallax: 0.5,
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
		max_opacity: 0.8,
		min_opacity: 0.4,
		parallax: 0.75,
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
		max_opacity: 0.8,
		min_opacity: 0.4,
		parallax: 0.75,
		randomFunction: function() {
			return 1-Math.random();
		}
	}));

	$(window).scroll(drawCanvas);
	drawSquares("lime");
};

var drawSquares = function(color) {
    for(var i=0;i<llayers.length;i++) {
        for(var j=0;j<llayers[i].elem.length;j++) {
            var l = llayers[i].elem[j];
            var r = rlayers[i].elem[j];
            switch(color) {
                case "fuchsia":
                    l.r_grad = (255 - l.r)/REP;
                    r.r_grad = (255 - r.r)/REP;

                    l.g_grad = (0 - l.g)/REP;
                    r.g_grad = (0 - r.g)/REP;

                    l.b_grad = (255 - l.b)/REP;
                    r.b_grad = (255 - r.b)/REP;
                    break;
                case "sand":
                    l.r_grad = (204 - l.r)/REP;
                    r.r_grad = (204 - r.r)/REP;

                    l.g_grad = (255 - l.g)/REP;
                    r.g_grad = (255 - r.g)/REP;

                    l.b_grad = (51 - l.b)/REP;
                    r.b_grad = (51 - r.b)/REP;
                    break;
                case "aqua":
                    l.r_grad = (0 - l.r)/REP;
                    r.r_grad = (0 - r.r)/REP;

                    l.g_grad = (255 - l.g)/REP;
                    r.g_grad = (255 - r.g)/REP;

                    l.b_grad = (255 - l.b)/REP;
                    r.b_grad = (255 - r.b)/REP;
                    break;
                case "orange":
                    l.r_grad = (255 - l.r)/REP;
                    r.r_grad = (255 - r.r)/REP;

                    l.g_grad = (165 - l.g)/REP;
                    r.g_grad = (165 - r.g)/REP;

                    l.b_grad = (0 - l.b)/REP;
                    r.b_grad = (0 - r.b)/REP;
                    break;
                case "yellow":
                    l.r_grad = (255 - l.r)/REP;
                    r.r_grad = (255 - r.r)/REP;

                    l.g_grad = (255 - l.g)/REP;
                    r.g_grad = (255 - r.g)/REP;

                    l.b_grad = (0 - l.b)/REP;
                    r.b_grad = (0 - r.b)/REP;
                    break;
                case "red":
                    l.r_grad = (255 - l.r)/REP;
                    r.r_grad = (255 - r.r)/REP;

                    l.g_grad = (77 - l.g)/REP;
                    r.g_grad = (77 - r.g)/REP;

                    l.b_grad = (77 - l.b)/REP;
                    r.b_grad = (77 - r.b)/REP;
                    break;
                case "lime":
                    l.g_grad = (255 - l.g)/REP;
                    r.g_grad = (255 - r.g)/REP;

                    l.r_grad = (0 - l.r)/REP;
                    r.r_grad = (0 - r.r)/REP;

                    l.b_grad = (0 - l.b)/REP;
                    r.b_grad = (0 - r.b)/REP;
                    break;
                case "white":
                    l.g_grad = (200 - l.g)/REP;
                    r.g_grad = (200 - r.g)/REP;

                    l.r_grad = (200 - l.r)/REP;
                    r.r_grad = (200 - r.r)/REP;

                    l.b_grad = (200 - l.b)/REP;
                    r.b_grad = (200 - r.b)/REP;
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
            }
            l.o_grad = (Math.random()*(1-.6) +.6 - l.fo)/REP;
            r.o_grad = (Math.random()*(1-.6) +.6 - r.fo)/REP;
        }
    }
    if(drawId!==-1){
        clearInterval(drawId);
        drawId = -1;
    }
    drawId = setIntervalX(function(){
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
    }, DELAY, REP,function(){drawId=-1;});
};

var drawCanvas = function() {
    var right = document.getElementById("right-canvas");
    var left = document.getElementById("left-canvas");
    var rc = right.getContext("2d");
    var lc = left.getContext("2d");
    rc.clearRect(0,0,right.width,right.height);
    lc.clearRect(0,0,left.width,left.height);
    for(var i=0;i<rlayers.length;i++) {
        drawLayer(rlayers[i], right);
        drawLayer(llayers[i], left);
    }
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
    }
};

$(document).on("ready",startup);


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

// Attach event handler for each button
$("#about-me-button").click(function(){
    var offset = $("#about-me").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": offset},1000);
    
});
$("#about-me-button").mouseenter(function(){
    drawSquares("white");
    $("#about-me-button").animate({"background-color":"rgba(255 , 255, 255, 0.5)"},200);
});

$("#home-button").click(function(){
    var offset = $("#home").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": $("#home").offset().top},1000);
});
$("#home-button").mouseenter(function(){
    drawSquares("lime");
    $("#home-button").animate({"background-color":"rgba(32, 128, 0, 0.5)"},200);
});

$("#contact-button").click(function(){
    var offset = $("#contact-me").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": $("#contact-me").offset().top},1000);
});
$("#contact-button").mouseenter(function(){
    drawSquares("mediumpurple");
});

$("#stuff-button").click(function(){
    var offset = $("#stuff").offset().top;
    var st = $('html, body').attr('scrollTop');
    $('html, body').animate({"scrollTop": $("#stuff").offset().top},1000);
});
$("#stuff-button").mouseenter(function(){
    drawSquares("blue");
});

$("#buttons-pane").mouseleave(function(){
    drawSquares(getCurrentColor());
});

var getCurrentColor = function() {
    var s = $(window).scrollTop();
    var h = $("#home").height();
    var a = $("#about-me").height();
    var c = $("#contact-me").height();
    var st = $("#stuff").height();
    console.log(s);
    if(s<0.75*h){ console.log(0.75*h); return "lime"; }
    if(s>0.75*h && s<h+0.75*a){ console.log(0.75*a); return "white"; }
    if(s>h+0.75*a && s<h+a+0.75*c){ return "mediumpurple"; }
    return "blue";
};