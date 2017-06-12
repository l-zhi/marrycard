'use strict';

/**
 * @author lizhi
 * @date 2016-4-20
 * @desc 虹膜转场
 */

(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
			|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());

(function (root, factory) {
	if (window.Zepto) {
		module.exports = factory(Zepto)
	} else {
		throw 'needs zepto'
	}
}(this, function ($) {
	'use strict';

	/*
	 * Tween.js
	 * t: current time（当前时间）；
	 * b: beginning value（初始值）；
	 * c: change in value（变化量）；
	 * d: duration（持续时间）。
	 * you can visit 'http://easings.net/zh-cn' to get easing
	 */
	var Tween = {
		Linear: function (t, b, c, d) { return c * t / d + b; },
		Quad: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOut: function (t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t + b;
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		},
		Quart: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}
		},
		Quint: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			}
		},
		Sine: {
			easeIn: function (t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOut: function (t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOut: function (t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function (t, b, c, d) {
				return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOut: function (t, b, c, d) {
				return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if (t == 0) return b;
				if (t == d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function (t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOut: function (t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function (t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (typeof p == "undefined") p = d * .3;
				if (!a || a < Math.abs(c)) {
					s = p / 4;
					a = c;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOut: function (t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (typeof p == "undefined") p = d * .3;
				if (!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
			},
			easeInOut: function (t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d / 2) == 2) return b + c;
				if (typeof p == "undefined") p = d * (.3 * 1.5);
				if (!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			}
		},
		Back: {
			easeIn: function (t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOut: function (t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOut: function (t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function (t, b, c, d) {
				return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
			},
			easeOut: function (t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				}
			},
			easeInOut: function (t, b, c, d) {
				if (t < d / 2) {
					return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				} else {
					return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
				}
			}
		}
	}


	var _defualtOption = {
		duration: 1000,
		easing: 'Linear',
		x: 0,
		y: 0,
		bgcolor: '#000',
		zIndex: 100
	},
		_RADIUS = 0

	var WIDTH = 0, HEIGHT = 0, $el = 0, OPTIONS = 0, CTX = 0, _start = 0, _end = 0, _StartTime, radius = 0, cb = 0

	var Iris = function (options) {
		// var opts = $.extend({}, _defualtOption, options)
		_init(options || {})
		return Iris
	}

	var _init = function (opts) {
		var canvas = document.createElement('canvas');
		WIDTH = canvas.width = $(window).width()
		HEIGHT = canvas.height = $(window).height()
		$el = $(canvas)
		_defualtOption.x = WIDTH / 2
		_defualtOption.y = HEIGHT / 2
		OPTIONS = $.extend({}, _defualtOption, opts)
		$el.css({
			width: WIDTH + 'px',
			height: HEIGHT + 'px',
			position: 'absolute',
			left: 0,
			top: 0,
			'z-index': opts.zIndex || 100,
			'display': 'none'
		})
		CTX = canvas.getContext('2d')
		$('body').append(canvas)
	}

	var setRadius = function (x, y, w, h) {
		w = w || WIDTH
		h = h || HEIGHT
		var xGap = Math.max((w - x), x),
			yGap = Math.max((h - y), y)
		_RADIUS = Math.ceil(Math.sqrt((xGap * xGap) + (yGap * yGap)))
		return _RADIUS;
	}

	var circle = function () {
		CTX.clearRect(0, 0, WIDTH, HEIGHT);
		CTX.fillStyle = OPTIONS.bgcolor;
		CTX.fillRect(0, 0, WIDTH, HEIGHT);
		CTX.globalCompositeOperation = "destination-out";
		CTX.beginPath();
		CTX.fillStyle = "red";
		CTX.arc(OPTIONS.x, OPTIONS.y, radius, 0, 2 * Math.PI);
		CTX.fill();
		CTX.globalCompositeOperation = "source-over";
	}

	var _showCanvas = function () {
		$el.css({ 'display': 'block' })
	}

	var _hideCanvas = function () {
		$el.css({ 'display': 'none' })
	}

	var draw = function () {
		var time = new Date().getTime() - _StartTime
		if (time > 0) {
			radius = OPTIONS.easing(time, _start, _end - _start, OPTIONS.duration)
		} else {
			radius = _start
		}
		if (time >= OPTIONS.duration) {
			window.cancelAnimationFrame(draw)
			_hideCanvas()
			cb && cb()
			return
		}
		circle()
		window.requestAnimationFrame(draw)
	}

	var initOptions = function (opt) {
		opt = opt || {}
		OPTIONS = $.extend({}, OPTIONS, opt)
		_RADIUS = setRadius(OPTIONS.x, OPTIONS.y, WIDTH, HEIGHT)
		if (opt.compelate && typeof opt.compelate === 'function') {
			cb = opt.compelate
		} else {
			cb = 0
		}
		if (OPTIONS.easing && typeof OPTIONS.easing === 'string') {
			var easing = OPTIONS.easing.slice(0, 1).toUpperCase() + OPTIONS.easing.slice(1);
			var arrKeyTween = easing.split('.');
			var fnGetValue;
			if (arrKeyTween.length == 1) {
				fnGetValue = Tween[arrKeyTween[0]];
			} else if (arrKeyTween.length == 2) {
				fnGetValue = Tween[arrKeyTween[0]] && Tween[arrKeyTween[0]][arrKeyTween[1]];
			}
			if (typeof fnGetValue !== 'function') {
				console.error('没有找到名为"' + options.easing + '"的动画算法');
				return;
			}
			OPTIONS.easing = fnGetValue
		}
	}

	Iris.show = function (opt) { //放大
		initOptions(opt)
		_start = 0
		_end = _RADIUS
		_StartTime = new Date().getTime()
		_showCanvas()
		window.requestAnimationFrame(draw)
	}

	Iris.hide = function (opt) { //缩小
		initOptions(opt)
		_start = _RADIUS
		_end = 0
		_StartTime = new Date().getTime()
		_showCanvas()
		window.requestAnimationFrame(draw)
	}

	return Iris
}));