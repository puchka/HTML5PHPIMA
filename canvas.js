window.onload = function()
{
	// Canvas
    var canvas = document.getElementById('canvas');
    if(!canvas)
    {
        alert("Impossible to get the Canvas");
        return;
    }

    var context = canvas.getContext('2d');
    if(!context)
    {
        alert("Impossible to get the Canvas context");
        return;
    }
	var img = new Image();
	img.src = 'uploads/1.jpg';
	var width;
	var height;
	if (img.width<650) {
		width = img.width;
		height = img.height;
	}
	else {
		width = 650;
		height = Math.floor((img.height*650)/img.width);
	}
	canvas.width = 650;
	canvas.height = height;
	context.drawImage(img, 0, 0, img.width, img.height,
						   0, 0, width, height);
	// Color
	var palette = document.getElementById('palette');
	var red = document.getElementById('red');
	var green = document.getElementById('green');
	var blue = document.getElementById('blue');
	var set = document.getElementById('set');
	set.addEventListener('click', setColor, false);
	red.addEventListener('blur', setColor, false);
	green.addEventListener('blur', setColor, false);
	blue.addEventListener('blur', setColor, false);
	function setColor() {
		if (!red.value) {
			red.value = 0;
		}
		if (!green.value) {
			green.value = 0;
		}
		if (!blue.value) {
			blue.value = 0;
		}
		palette.style.background = 'rgb('+red.value+','+green.value+','+blue.value+')';
	}
	setColor();
	// Peinture
	var selection = document.getElementsByName('selection');
	var selectionType;
	// Brush Options
	var options = document.getElementById('brush_options');
	var canvasOptions = document.getElementById('canvas_options');
	var ctx = canvasOptions.getContext('2d');
	// Initialize Canvas Options
	function init() {
		ctx.clearRect(0, 0, 200, 100);
		ctx.beginPath();
		ctx.arc(25, 15, 2, 0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(50, 15, 5, 0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(80, 15, 7, 0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(115, 15, 10, 0, 2*Math.PI);
		ctx.fill();
	}
	// Initialize Brush selection
	init();
	ctx.strokeStyle = 'red';
	ctx.strokeRect(71, 7, 17, 17);
	// Select Brush Type
	var brushType = 7;
	canvasOptions.addEventListener('click',
	function (e) {
		var x = e.clientX-e.target.offsetLeft;
		var y = e.clientY-e.target.offsetTop;
		//alert('x = '+x+'\ny = '+y);
		ctx.strokeStyle = 'red';
		if (x>13 && x<20 && y>5 && y<15) {
			init();
			ctx.strokeRect(17, 7, 15, 15);
			brushType = 2;
		}
		if (x>29 && x<38 && y>5 && y<15) {
			init();
			ctx.strokeRect(41, 7, 17, 17);
			brushType = 5;
		}
		if (x>48 && x<60 && y>4 && y<15) {
			init();
			ctx.strokeRect(71, 7, 17, 17);
			brushType = 7;
		}
		if (x>68 && x<84 && y>2 && y<16) {
			init();
			ctx.strokeRect(105, 5, 20, 20);
			brushType = 10;
		}
	}, false);
	// ---- #### ----------- #### ----
	// Choosing selection type
	for (var i=0, c=selection.length;i<c;i++) {
		if (selection[i].checked) {
			selectionType = selection[i].value;
		}
		selection[i].addEventListener('change',
		function (e) {
			selectionType = e.target.value;
			// Displaying/Masking Brush Options
			if (selectionType=='brush') {
				options.style.display = 'block';
				canvas.style.cursor = 'pointer';
			}
			else {
				options.style.display = 'none';
				canvas.style.cursor = 'crosshair';
			}
		}, false)
	}
	// Displaying/Masking Brush Options
	if (selectionType=='brush') {
		options.style.display = 'block';
		canvas.style.cursor = 'pointer';
	}
	else {
		options.style.display = 'none';
		canvas.style.cursor = 'crosshair';
	}
	// --- #### --- #### --- #### ---
	// Zoom
	var zoomOn = false, zoom = 0;
	var pointZoom = {};
	var zoomin = document.getElementsByName('zoomin')[0];
	var zoomout = document.getElementsByName('zoomout')[0];
	zoomin.checked = false; zoomout.checked = false;
	zoomin.addEventListener('change',
	function () {
		if (zoomin.checked) {
			zoomOn = true;
			if (zoomout.checked) {
				zoomout.checked = false;
			}
		}
		else {
			zoomOn = false;
		}
	}, false);
	zoomout.addEventListener('change',
	function () {
		if (zoomout.checked) {
			zoomOn = true;
			if (zoomin.checked) {
				zoomin.checked = false;
			}
		}
		else {
			zoomOn = false;
		}
	}, false);
	// ---- ## -------- ## ----
	// Initializations
	var brushOn = false, rectOn = false;
	var pile = []; var square = {};
	var pointRect = {};
	// -- Events control --
	canvas.addEventListener('mousedown', mouseDownCanvas, false);
	canvas.addEventListener('mousemove', mouseMoveCanvas, false);
	canvas.addEventListener('mouseup', mouseUpCanvas, false);
	canvas.addEventListener('mouseover', mouseOverCanvas, false);
	function createRect(x, y) {
		if (zoom>0 && zoom<7) {
			var zw = img.width-zoom*50;
			var zh = Math.floor(zw*img.height/img.width);
			var x1 = pointZoom.x - Math.floor(zw/2);
			var y1 = pointZoom.y - Math.floor(zh/2);
			var x2 = pointZoom.x + Math.floor(zw/2);
			var y2 = pointZoom.y + Math.floor(zh/2);
			if (x1 < 0) {
				x1 = 0;
			}
			if (y1 < 0) {
				y1 = 0;
			}
			if (x2 > img.width) {
				x1 = img.width - zw;
			}
			if (y2 > img.height) {
				y1 = img.height - zh;
			}
			context.drawImage(img, x1, y1, zw, zh,
								   0, 0, width, height);
		} else {
			context.drawImage(img, 0, 0, img.width, img.height,
								   0, 0, width, height);
		}
		context.fillStyle = 'rgba(200, 200, 200, 0.7)';
		if (x<pointRect.x && y<pointRect.y) {
			context.fillRect(0, 0, width, y);
			context.fillRect(0, y, x, height-y);
			context.fillRect(x, pointRect.y, pointRect.x-x, height-pointRect.y);
			context.fillRect(pointRect.x, y, width-pointRect.x, height-y);
			if (!rectOn) {
				stack('rect', 0, 0, width, y);
				stack('rect', 0, y, x, height-y);
				stack('rect', x, pointRect.y, pointRect.x-x, height-pointRect.y);
				stack('rect', pointRect.x, y, width-pointRect.x, height-y);
				setSquare(x, y, pointRect.x, pointRect.y);
			}
		}
		else if (x<pointRect.x && y>pointRect.y) {
			context.fillRect(0, 0, width, pointRect.y);
			context.fillRect(0, pointRect.y, x, height-pointRect.y);
			context.fillRect(x, y, pointRect.x-x, height-y);
			context.fillRect(pointRect.x, pointRect.y, width-pointRect.x, height-pointRect.y);
			if (!rectOn) {
				stack('rect', 0, 0, width, pointRect.y);
				stack('rect', 0, pointRect.y, x, height-pointRect.y);
				stack('rect', x, y, pointRect.x-x, height-y);
				stack('rect', pointRect.x, pointRect.y, width-pointRect.x, height-pointRect.y);
				setSquare(x, pointRect.y, pointRect.x, y);
			}
		}
		else if (x>pointRect.x && y<pointRect.y) {
			context.fillRect(0, 0, width, y);
			context.fillRect(0, y, pointRect.x, height-y);
			context.fillRect(pointRect.x, pointRect.y, x-pointRect.x, height-pointRect.y);
			context.fillRect(x, y, width-x, height-y);
			if (!rectOn) {
				stack('rect', 0, 0, width, y);
				stack('rect', 0, y, pointRect.x, height-y);
				stack('rect', pointRect.x, pointRect.y, x-pointRect.x, height-pointRect.y);
				stack('rect', x, y, width-x, height-y);
				setSquare(pointRect.x, y, x, pointRect.y);
			}
		}
		else {
			context.fillRect(0, 0, width, pointRect.y);
			context.fillRect(0, pointRect.y, pointRect.x, height);
			context.fillRect(pointRect.x, y, x-pointRect.x, height-y);
			context.fillRect(x, pointRect.y, width-x, height-pointRect.y);
			if (!rectOn) {
				stack('rect', 0, 0, img.width, pointRect.y);
				stack('rect', 0, pointRect.y, pointRect.x, height);
				stack('rect', pointRect.x, y, x-pointRect.x, height-y);
				stack('rect', x, pointRect.y, width-x, height-pointRect.y);
				setSquare(pointRect.x, pointRect.y, x, y);
			}
		}
	}
	function createCircle(x, y)	{
		context.beginPath();
		context.arc(x, y, brushType, 0, 2*Math.PI);
		context.fillStyle = 'rgba(200, 200, 200, 0.7)';
		context.fill();
		stack('circle', x-brushType, y-brushType, x+brushType, y+brushType);
	}
	function mouseDownCanvas(e) {
		var x = e.clientX-e.target.offsetLeft;
		var y = e.clientY-e.target.offsetTop;
		if (zoomOn) {
			if (pile.length==4) {
				for (var i=0;i<4;i++) {
					pile.pop();
					square = {};
				}
			}
			square = {};
			if (zoomin.checked) {
				zoom++;
			}
			else if (zoom>0) {
				zoom--;
			}
			if (zoom>0 && zoom<7) {
				pointZoom.x = x;
				pointZoom.y = y;
				var zw = img.width-zoom*50;
				var zh = Math.floor(zw*img.height/img.width);
				var x1 = x - Math.floor(zw/2);
				var y1 = y - Math.floor(zh/2);
				var x2 = x + Math.floor(zw/2);
				var y2 = y + Math.floor(zh/2);
				if (x1 < 0) {
					x1 = 0;
				}
				if (y1 < 0) {
					y1 = 0;
				}
				if (x2 > img.width) {
					x1 = img.width - zw;
				}
				if (y2 > img.height) {
					y1 = img.height - zh;
				}
				context.drawImage(img, x1, y1, zw, zh,
									   0, 0, width, height);
			}
			if (zoom==0) {
				context.drawImage(img, 0, 0, img.width, img.height,
									   0, 0, width, height);
			}
		}
		else if (selectionType=='brush') {
			if (typeof square.type=='undefined') {
				alert('Preselect an object first.');
			} else {
				createCircle(e.clientX-e.target.offsetLeft,
							 e.clientY-e.target.offsetTop);
			}
		}
		else if (selectionType=='rect') {
			pointRect.x = e.clientX-e.target.offsetLeft;
			pointRect.y = e.clientY-e.target.offsetTop;
			rectOn = true;
			if (typeof square.type!='undefined') {
				if (zoom>0 && zoom<7) {
					var zw = img.width-zoom*50;
					var zh = Math.floor(zw*img.height/img.width);
					var x1 = pointZoom.x - Math.floor(zw/2);
					var y1 = pointZoom.y - Math.floor(zh/2);
					var x2 = pointZoom.x + Math.floor(zw/2);
					var y2 = pointZoom.y + Math.floor(zh/2);
					if (x1 < 0) {
						x1 = 0;
					}
					if (y1 < 0) {
						y1 = 0;
					}
					if (x2 > img.width) {
						x1 = img.width - zw;
					}
					if (y2 > img.height) {
						y1 = img.height - zh;
					}
					context.drawImage(img, x1, y1, zw, zh,
										   0, 0, width, height);
				}
				else {
					context.drawImage(img, 0, 0, img.width, img.height,
										   0, 0, width, height);
				}
				pile = []; square = {}; square = {};
				rectOn = false;
			}
		}
	}
	function mouseMoveCanvas(e) {
		if (selectionType=='rect' && rectOn) {
			createRect(e.clientX-e.target.offsetLeft,
					   e.clientY-e.target.offsetTop);
		}
	}
	function mouseUpCanvas(e) {
		if (brushOn && selectionType=='brush') {
			brushOn = false;
		}
		if (rectOn && selectionType=='rect') {
			rectOn = false;
			createRect(e.clientX-e.target.offsetLeft,
					   e.clientY-e.target.offsetTop);
			pointRect = {};
		}
	}
	function mouseOverCanvas() {
		if (selectionType=='rect' && rectOn) {
			rectOn = false;
		}
	}
	// ---- #### ---------- #### ----
	// Saving
	function stack(type, x, y, x2, y2) {
		var shape = {};
		shape.type=type=='rect'?'rect':'circle';
		shape.x = x;
		shape.y = y;
		shape.x2 = x2;
		shape.y2 = y2;
		pile.push(shape);
	}
	// Square
	function setSquare(x, y, x2, y2) {
		square.type = 'r';
		square.x = x; square.y = y;
		square.x2 = x2; square.y2 = y2;
	}
	// Undo Button
	var undo = document.getElementById('undo');
	undo.addEventListener('click',
	function () {
		if (zoom>0 && zoom<7) {
			var zw = img.width-zoom*50;
			var zh = Math.floor(zw*img.height/img.width);
			var x1 = pointZoom.x - Math.floor(zw/2);
			var y1 = pointZoom.y - Math.floor(zh/2);
			var x2 = pointZoom.x + Math.floor(zw/2);
			var y2 = pointZoom.y + Math.floor(zh/2);
			if (x1 < 0) {
				x1 = 0;
			}
			if (y1 < 0) {
				y1 = 0;
			}
			if (x2 > img.width) {
				x1 = img.width - zw;
			}
			if (y2 > img.height) {
				y1 = img.height - zh;
			}
			context.drawImage(img, x1, y1, zw, zh,
								   0, 0, width, height);
		}
		else {
			context.drawImage(img, 0, 0, img.width, img.height,
								   0, 0, width, height);
		}
		if (pile.length==4) {
			for (var i=0;i<4;i++) {
				pile.pop();
				square = {};
			}
		} else {
			pile.pop();
			for (var i=0, c=pile.length;i<c;i++) {
				if (pile[i].type=='rect') {
					var x = pile[i].x;
					var y = pile[i].y;
					var w = pile[i].x2;
					var h = pile[i].y2;
					context.fillStyle = 'rgba(200, 200, 200, 0.7)';
					context.fillRect(x, y, w, h);
				} else {
					var r = (pile[i].x2-pile[i].x)/2;
					var x = pile[i].x+r;
					var y = pile[i].y+r;
					context.beginPath();
					context.arc(x, y, r, 0, 2*Math.PI);
					context.fillStyle = 'rgba(200, 200, 200, 0.7)';
					context.fill();
				}
			}
		}
	}, false);
	// Reset Button
	var reset = document.getElementById('reset');
	reset.addEventListener('click',
	function () {
		context.drawImage(img, 0, 0, img.width, img.height,
							   0, 0, width, height);
		pile = [];
		square = {};
		zoom = 0;
	}, false);
	// Button Submit
	var perform = document.getElementById('perform');
	perform.addEventListener('click',
	function () {
		var data = document.getElementsByName('data')[0];
		var string = '{"0":';
		pointZoom.z = zoom;
		string += JSON.stringify(pointZoom);
		string += ',"1":';
		string += JSON.stringify(square);
		for (var i=0, c=pile.length;i<c;i++) {
			if (i>=4) {
				string += ',"'+(i+2)+'":';
				string += JSON.stringify(pile[i]);
			}
		}
		string += '}';
		data.value = string;
		//alert(data.value);
		if (typeof square.type == "undefined") {
			alert('Preselect an object first.');
		}
		else {
			document.getElementsByTagName('form')[0].submit();
		}
	}, false);
}
