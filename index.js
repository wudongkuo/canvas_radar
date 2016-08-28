/**
 * Created by cm on 2016/8/28.
 */
/*极坐标转笛卡尔坐标
 笛卡尔坐标：x,y分别自左上角 向左向下扩展，原点到达 极坐标原点的距离为 极坐标最大值半径R
 极坐标 角度逆时针增长 时钟3点为0度 360度等同0度
 */
function polar2Decare(r,du,R,noCeil) {
    if (du == 360) {
        du = 0;
    }
    if (du == 0) {
        return { x: R + r, y: R };
    }
    if (du == 90) {
        return { x: R, y: R - r };
    }
    if (du == 180) {
        return { x: R - r, y: R };
    }
    if (du == 270) {
        return { x: R, y: R + r };
    }


    if (0 < du && du < 90) {
        var y1 = R - sindu(du,r);
        var x1 = R+ cosdu(du,r)
        return { x: x1, y: y1 };
    }
    if (90 < du && du < 180) {
        var ltu = 90 - (du - 90);
        var y1 = R - sindu(ltu, r);
        var x1 = R - cosdu(ltu, r);
        return { x: x1, y: y1 };
    }
    if (180 < du && du < 270) {
        var ltu = 180 - (du - 180);
        var y1 = R+  sindu(ltu, r);
        var x1 = R+cosdu(ltu, r);
        return { x: x1, y: y1 };
    }
    if (270 < du && du < 360) {
        var ltu = 270 - (du - 270);
        var y1 = R - sindu(ltu, r);
        var x1 = R -cosdu(ltu, r);
        return { x: x1, y: y1 };
    }
}
function rd(n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}
function cosdu(du,r) {
    var hu = (Math.PI / 180) * du;
    return Math.cos(hu)*r;
}
function sindu(du, r) {
    var hu = (Math.PI / 180) * du;
    return Math.sin(hu) * r;
}
(function() {
    var animateCanvas, animateCanvasContext, animateCanvasDrawer, backgroundCanvas, backgroundCanvasCircleDrawer, backgroundCanvasContext, backgroundCanvasDrawer, backgroundCanvasLineDrawer, canvasCenterX, canvasCenterY, canvasHeight, canvasWidth, dataCanvas, dataCanvasContext, dataCanvasDrawer, dataProduct, max_R, my_gradient, randomProductDataDraw;

    backgroundCanvas = $(".radar_background canvas")[0];

    backgroundCanvasContext = backgroundCanvas.getContext("2d");

    max_R = 253;

    dataCanvas = $(".radar_data canvas")[0];

    dataCanvasContext = dataCanvas.getContext("2d");

    animateCanvas = $(".radar_animate canvas")[0];

    animateCanvasContext = animateCanvas.getContext("2d");

    canvasHeight = backgroundCanvas.height;

    canvasWidth = backgroundCanvas.width;

    canvasCenterX = canvasWidth / 2;

    canvasCenterY = canvasHeight / 2;

    backgroundCanvasCircleDrawer = (function(_this) {
        return function(_r, lineColor, lineWidth, cirlCounts, cirlAddStep) {
            var i, ref, x;
            backgroundCanvasContext.restore();
            backgroundCanvasContext.strokeStyle = lineColor;
            backgroundCanvasContext.lineWidth = lineWidth;
            for (x = i = 1, ref = cirlCounts; 1 <= ref ? i <= ref : i >= ref; x = 1 <= ref ? ++i : --i) {
                backgroundCanvasContext.beginPath();
                backgroundCanvasContext.arc(canvasCenterX, canvasCenterY, _r + x * cirlAddStep, 0, Math.PI * 2, false);
                backgroundCanvasContext.stroke();
            }
            return backgroundCanvasContext.save();
        };
    })(this);

    backgroundCanvasLineDrawer = (function(_this) {
        return function(lineColr, lineWidth, lineLong) {
            var _hx, _hy, _vx, _vy, hozLine, verLine;
            backgroundCanvasContext.restore();
            backgroundCanvasContext.strokeStyle = lineColr;
            backgroundCanvasContext.lineWidth = lineWidth;
            _hx = (canvasWidth - lineLong) / 2;
            _hy = canvasHeight / 2;
            _vx = canvasWidth / 2;
            _vy = (canvasHeight - lineLong) / 2;
            hozLine = {
                x: _hx,
                toX: _hx + lineLong,
                y: _hy,
                toY: _hy
            };
            verLine = {
                x: _vx,
                toX: _vx,
                y: _vy,
                toY: _vy + lineLong
            };
            backgroundCanvasContext.moveTo(hozLine.x, hozLine.y);
            backgroundCanvasContext.lineTo(hozLine.toX, hozLine.toY);
            backgroundCanvasContext.stroke();
            backgroundCanvasContext.moveTo(verLine.x, verLine.y);
            backgroundCanvasContext.lineTo(verLine.toX, verLine.toY);
            backgroundCanvasContext.stroke();
            return backgroundCanvasContext.save();
        };
    })(this);

    backgroundCanvasDrawer = (function(_this) {
        return function() {
            backgroundCanvasCircleDrawer(5, "#285430", 1, 3, 40);
            return backgroundCanvasLineDrawer("#285430", 2, 253);
        };
    })(this);

    animateCanvasDrawer = (function(_this) {
        return function(_r, fillStyle, startAngle, endAngle, roate) {
            animateCanvasContext.restore();
            animateCanvasContext.clearRect(0, 0, 500, 500);
            animateCanvasContext.fillStyle = fillStyle;
            animateCanvasContext.translate(canvasCenterX, canvasCenterY);
            animateCanvasContext.rotate(-Math.PI / 180 / 2);
            animateCanvasContext.translate(-canvasCenterX, -canvasCenterY);
            animateCanvasContext.beginPath();
            animateCanvasContext.moveTo(canvasCenterX, canvasCenterY);
            animateCanvasContext.arc(canvasCenterX, canvasCenterY, _r, startAngle, endAngle, false);
            animateCanvasContext.fill();
            return animateCanvasContext.save();
        };
    })(this);

    backgroundCanvasDrawer();

    my_gradient = animateCanvasContext.createLinearGradient(100, 0, 0, 100);

    my_gradient.addColorStop(0, "rgba(30,80,46,1)");

    my_gradient.addColorStop(0.5, "rgba(30,80,46,0.1)");

    my_gradient.addColorStop(1, "rgba(255,255,255,0)");

    animateCanvasDrawer(253 / 2, my_gradient, 0, Math.PI / 4);

    setInterval((function(_this) {
        return function() {
            return animateCanvasDrawer(max_R / 2, my_gradient, 0, Math.PI / 3, 1000);
        };
    })(this));

    dataCanvasDrawer = (function(_this) {
        return function(list) {
            dataCanvasContext.clearRect(0, 0, 500, 500);
            dataCanvasContext.lineWidth = 5;
            return list.forEach(function(obj) {
                dataCanvasContext.restore();
                dataCanvasContext.beginPath();
                dataCanvasContext.fillStyle = obj.color;
                dataCanvasContext.arc(obj.x, obj.y, 3, 0, Math.PI * 2, false);
                dataCanvasContext.fill();
                return dataCanvasContext.save();
            });
        };
    })(this);

    dataProduct = (function(_this) {
        return function() {
            var _objGreen, _objRed, _objYellow, data, i, length, ref, x;
            length = rd(2, 5);
            data = [];
            for (x = i = 1, ref = length; 1 <= ref ? i <= ref : i >= ref; x = 1 <= ref ? ++i : --i) {
                _objRed = polar2Decare(rd(10, 30), rd(0, 360), max_R);
                _objRed.color = "red";
                _objYellow = polar2Decare(rd(38, 60), rd(0, 360), max_R);
                _objYellow.color = "yellow";
                _objGreen = polar2Decare(rd(65, 100), rd(0, 360), max_R);
                _objGreen.color = "green";
                data.push(_objRed);
                data.push(_objYellow);
                data.push(_objGreen);
            }
            return data;
        };
    })(this);

    randomProductDataDraw = (function(_this) {
        return function() {
            return dataCanvasDrawer(dataProduct());
        };
    })(this);

    setInterval(randomProductDataDraw, 2000);

}).call(this);