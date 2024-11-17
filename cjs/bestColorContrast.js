(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.unpack = exports.type = exports.min = exports.max = exports.limit = exports.last = exports.clip_rgb = exports.TWOPI = exports.RAD2DEG = exports.PITHIRD = exports.PI = exports.DEG2RAD = void 0;
var _clip_rgb = _interopRequireDefault(__webpack_require__(36));
exports.clip_rgb = _clip_rgb["default"];
var _limit = _interopRequireDefault(__webpack_require__(13));
exports.limit = _limit["default"];
var _type = _interopRequireDefault(__webpack_require__(7));
exports.type = _type["default"];
var _unpack = _interopRequireDefault(__webpack_require__(37));
exports.unpack = _unpack["default"];
var _last = _interopRequireDefault(__webpack_require__(38));
exports.last = _last["default"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PI = exports.PI = Math.PI,
  min = exports.min = Math.min,
  max = exports.max = Math.max;
var TWOPI = exports.TWOPI = PI * 2;
var PITHIRD = exports.PITHIRD = PI / 3;
var DEG2RAD = exports.DEG2RAD = PI / 180;
var RAD2DEG = exports.RAD2DEG = 180 / PI;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _input2 = _interopRequireDefault(__webpack_require__(3));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var Color = function () {
  function Color() {
    var me = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if ((0, _index.type)(args[0]) === 'object' && args[0].constructor && args[0].constructor === this.constructor) {
      return args[0];
    }
    var mode = (0, _index.last)(args);
    var autodetect = false;
    if (!mode) {
      autodetect = true;
      if (!_input2["default"].sorted) {
        _input2["default"].autodetect = _input2["default"].autodetect.sort(function (a, b) {
          return b.p - a.p;
        });
        _input2["default"].sorted = true;
      }
      for (var _iterator = _createForOfIteratorHelperLoose(_input2["default"].autodetect), _step; !(_step = _iterator()).done;) {
        var chk = _step.value;
        mode = chk.test.apply(chk, args);
        if (mode) break;
      }
    }
    if (_input2["default"].format[mode]) {
      var rgb = _input2["default"].format[mode].apply(null, autodetect ? args : args.slice(0, -1));
      me._rgb = (0, _index.clip_rgb)(rgb);
    } else {
      throw new Error('unknown format: ' + args);
    }
    if (me._rgb.length === 3) me._rgb.push(1);
  }
  var _proto = Color.prototype;
  _proto.toString = function toString() {
    if ((0, _index.type)(this.hex) == 'function') return this.hex();
    return "[" + this._rgb.join(',') + "]";
  };
  return Color;
}();
var _default = exports["default"] = Color;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
var _version = __webpack_require__(39);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var _chroma = function chroma() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_chroma.Color, args);
};
_chroma.Color = _Color["default"];
_chroma.version = _version.version;
var _default = exports["default"] = _chroma;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _default = exports["default"] = {
  format: {},
  autodetect: []
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _default = exports["default"] = {};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(col1, col2, f, m) {
  var xyz0, xyz1;
  if (m === 'hsl') {
    xyz0 = col1.hsl();
    xyz1 = col2.hsl();
  } else if (m === 'hsv') {
    xyz0 = col1.hsv();
    xyz1 = col2.hsv();
  } else if (m === 'hcg') {
    xyz0 = col1.hcg();
    xyz1 = col2.hcg();
  } else if (m === 'hsi') {
    xyz0 = col1.hsi();
    xyz1 = col2.hsi();
  } else if (m === 'lch' || m === 'hcl') {
    m = 'hcl';
    xyz0 = col1.hcl();
    xyz1 = col2.hcl();
  } else if (m === 'oklch') {
    xyz0 = col1.oklch().reverse();
    xyz1 = col2.oklch().reverse();
  }
  var hue0, hue1, sat0, sat1, lbv0, lbv1;
  if (m.substr(0, 1) === 'h' || m === 'oklch') {
    var _xyz = xyz0;
    hue0 = _xyz[0];
    sat0 = _xyz[1];
    lbv0 = _xyz[2];
    var _xyz2 = xyz1;
    hue1 = _xyz2[0];
    sat1 = _xyz2[1];
    lbv1 = _xyz2[2];
  }
  var sat, hue, lbv, dh;
  if (!isNaN(hue0) && !isNaN(hue1)) {
    if (hue1 > hue0 && hue1 - hue0 > 180) {
      dh = hue1 - (hue0 + 360);
    } else if (hue1 < hue0 && hue0 - hue1 > 180) {
      dh = hue1 + 360 - hue0;
    } else {
      dh = hue1 - hue0;
    }
    hue = hue0 + f * dh;
  } else if (!isNaN(hue0)) {
    hue = hue0;
    if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') sat = sat0;
  } else if (!isNaN(hue1)) {
    hue = hue1;
    if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') sat = sat1;
  } else {
    hue = Number.NaN;
  }
  if (sat === undefined) sat = sat0 + f * (sat1 - sat0);
  lbv = lbv0 + f * (lbv1 - lbv0);
  return m === 'oklch' ? new _Color["default"]([lbv, sat, hue], m) : new _Color["default"]([hue, sat, lbv], m);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _lab2rgb = _interopRequireDefault(__webpack_require__(21));
var _rgb2lab = _interopRequireDefault(__webpack_require__(22));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.lab = function () {
  return (0, _rgb2lab["default"])(this._rgb);
};
_chroma["default"].lab = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['lab']));
};
_input["default"].format.lab = _lab2rgb["default"];
_input["default"].autodetect.push({
  p: 2,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'lab');
    if ((0, _index.type)(args) === 'array' && args.length === 3) {
      return 'lab';
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = _default;
var classToType = {};
for (var _i = 0, _arr = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; _i < _arr.length; _i++) {
  var name = _arr[_i];
  classToType["[object " + name + "]"] = name.toLowerCase();
}
function _default(obj) {
  return classToType[Object.prototype.toString.call(obj)] || 'object';
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _default = exports["default"] = {
  Kn: 18,
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,
  t0: 0.137931034,
  t1: 0.206896552,
  t2: 0.12841855,
  t3: 0.008856452
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _lch2rgb = _interopRequireDefault(__webpack_require__(23));
var _hcl2rgb = _interopRequireDefault(__webpack_require__(55));
var _rgb2lch = _interopRequireDefault(__webpack_require__(56));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.lch = function () {
  return (0, _rgb2lch["default"])(this._rgb);
};
_Color["default"].prototype.hcl = function () {
  return (0, _rgb2lch["default"])(this._rgb).reverse();
};
_chroma["default"].lch = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['lch']));
};
_chroma["default"].hcl = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return _construct(_Color["default"], args.concat(['hcl']));
};
_input["default"].format.lch = _lch2rgb["default"];
_input["default"].format.hcl = _hcl2rgb["default"];
['lch', 'hcl'].forEach(function (m) {
  return _input["default"].autodetect.push({
    p: 2,
    test: function test() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      args = (0, _index.unpack)(args, m);
      if ((0, _index.type)(args) === 'array' && args.length === 3) {
        return m;
      }
    }
  });
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _hsl2rgb = _interopRequireDefault(__webpack_require__(15));
var _rgb2hsl = _interopRequireDefault(__webpack_require__(14));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.hsl = function () {
  return (0, _rgb2hsl["default"])(this._rgb);
};
_chroma["default"].hsl = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['hsl']));
};
_input["default"].format.hsl = _hsl2rgb["default"];
_input["default"].autodetect.push({
  p: 2,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'hsl');
    if ((0, _index.type)(args) === 'array' && args.length === 3) {
      return 'hsl';
    }
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = __webpack_require__(0);
var _index2 = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(col1, col2, f) {
  if (f === void 0) {
    f = 0.5;
  }
  var mode = (arguments.length <= 3 ? undefined : arguments[3]) || 'lrgb';
  if (!_index2["default"][mode] && !(arguments.length <= 3 ? 0 : arguments.length - 3)) {
    mode = Object.keys(_index2["default"])[0];
  }
  if (!_index2["default"][mode]) {
    throw new Error("interpolation mode " + mode + " is not defined");
  }
  if ((0, _index.type)(col1) !== 'object') col1 = new _Color["default"](col1);
  if ((0, _index.type)(col2) !== 'object') col2 = new _Color["default"](col2);
  return _index2["default"][mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = _default;
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pow = Math.pow;
function _default(colors) {
  var _mode = 'rgb';
  var _nacol = (0, _chroma["default"])('#ccc');
  var _spread = 0;
  var _domain = [0, 1];
  var _pos = [];
  var _padding = [0, 0];
  var _classes = false;
  var _colors = [];
  var _out = false;
  var _min = 0;
  var _max = 1;
  var _correctLightness = false;
  var _colorCache = {};
  var _useCache = true;
  var _gamma = 1;
  var setColors = function setColors(colors) {
    colors = colors || ['#fff', '#000'];
    if (colors && (0, _index.type)(colors) === 'string' && _chroma["default"].brewer && _chroma["default"].brewer[colors.toLowerCase()]) {
      colors = _chroma["default"].brewer[colors.toLowerCase()];
    }
    if ((0, _index.type)(colors) === 'array') {
      if (colors.length === 1) {
        colors = [colors[0], colors[0]];
      }
      colors = colors.slice(0);
      for (var c = 0; c < colors.length; c++) {
        colors[c] = (0, _chroma["default"])(colors[c]);
      }
      _pos.length = 0;
      for (var _c = 0; _c < colors.length; _c++) {
        _pos.push(_c / (colors.length - 1));
      }
    }
    resetCache();
    return _colors = colors;
  };
  var getClass = function getClass(value) {
    if (_classes != null) {
      var n = _classes.length - 1;
      var i = 0;
      while (i < n && value >= _classes[i]) {
        i++;
      }
      return i - 1;
    }
    return 0;
  };
  var tMapLightness = function tMapLightness(t) {
    return t;
  };
  var tMapDomain = function tMapDomain(t) {
    return t;
  };
  var getColor = function getColor(val, bypassMap) {
    var col, t;
    if (bypassMap == null) {
      bypassMap = false;
    }
    if (isNaN(val) || val === null) {
      return _nacol;
    }
    if (!bypassMap) {
      if (_classes && _classes.length > 2) {
        var c = getClass(val);
        t = c / (_classes.length - 2);
      } else if (_max !== _min) {
        t = (val - _min) / (_max - _min);
      } else {
        t = 1;
      }
    } else {
      t = val;
    }
    t = tMapDomain(t);
    if (!bypassMap) {
      t = tMapLightness(t);
    }
    if (_gamma !== 1) {
      t = pow(t, _gamma);
    }
    t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
    t = (0, _index.limit)(t, 0, 1);
    var k = Math.floor(t * 10000);
    if (_useCache && _colorCache[k]) {
      col = _colorCache[k];
    } else {
      if ((0, _index.type)(_colors) === 'array') {
        for (var i = 0; i < _pos.length; i++) {
          var p = _pos[i];
          if (t <= p) {
            col = _colors[i];
            break;
          }
          if (t >= p && i === _pos.length - 1) {
            col = _colors[i];
            break;
          }
          if (t > p && t < _pos[i + 1]) {
            t = (t - p) / (_pos[i + 1] - p);
            col = _chroma["default"].interpolate(_colors[i], _colors[i + 1], t, _mode);
            break;
          }
        }
      } else if ((0, _index.type)(_colors) === 'function') {
        col = _colors(t);
      }
      if (_useCache) {
        _colorCache[k] = col;
      }
    }
    return col;
  };
  var resetCache = function resetCache() {
    return _colorCache = {};
  };
  setColors(colors);
  var f = function f(v) {
    var c = (0, _chroma["default"])(getColor(v));
    if (_out && c[_out]) {
      return c[_out]();
    } else {
      return c;
    }
  };
  f.classes = function (classes) {
    if (classes != null) {
      if ((0, _index.type)(classes) === 'array') {
        _classes = classes;
        _domain = [classes[0], classes[classes.length - 1]];
      } else {
        var d = _chroma["default"].analyze(_domain);
        if (classes === 0) {
          _classes = [d.min, d.max];
        } else {
          _classes = _chroma["default"].limits(d, 'e', classes);
        }
      }
      return f;
    }
    return _classes;
  };
  f.domain = function (domain) {
    if (!arguments.length) {
      return _domain;
    }
    _min = domain[0];
    _max = domain[domain.length - 1];
    _pos = [];
    var k = _colors.length;
    if (domain.length === k && _min !== _max) {
      for (var _i = 0, _Array$from = Array.from(domain); _i < _Array$from.length; _i++) {
        var d = _Array$from[_i];
        _pos.push((d - _min) / (_max - _min));
      }
    } else {
      for (var c = 0; c < k; c++) {
        _pos.push(c / (k - 1));
      }
      if (domain.length > 2) {
        var tOut = domain.map(function (d, i) {
          return i / (domain.length - 1);
        });
        var tBreaks = domain.map(function (d) {
          return (d - _min) / (_max - _min);
        });
        if (!tBreaks.every(function (val, i) {
          return tOut[i] === val;
        })) {
          tMapDomain = function tMapDomain(t) {
            if (t <= 0 || t >= 1) return t;
            var i = 0;
            while (t >= tBreaks[i + 1]) i++;
            var f = (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
            var out = tOut[i] + f * (tOut[i + 1] - tOut[i]);
            return out;
          };
        }
      }
    }
    _domain = [_min, _max];
    return f;
  };
  f.mode = function (_m) {
    if (!arguments.length) {
      return _mode;
    }
    _mode = _m;
    resetCache();
    return f;
  };
  f.range = function (colors, _pos) {
    setColors(colors, _pos);
    return f;
  };
  f.out = function (_o) {
    _out = _o;
    return f;
  };
  f.spread = function (val) {
    if (!arguments.length) {
      return _spread;
    }
    _spread = val;
    return f;
  };
  f.correctLightness = function (v) {
    if (v == null) {
      v = true;
    }
    _correctLightness = v;
    resetCache();
    if (_correctLightness) {
      tMapLightness = function tMapLightness(t) {
        var L0 = getColor(0, true).lab()[0];
        var L1 = getColor(1, true).lab()[0];
        var pol = L0 > L1;
        var L_actual = getColor(t, true).lab()[0];
        var L_ideal = L0 + (L1 - L0) * t;
        var L_diff = L_actual - L_ideal;
        var t0 = 0;
        var t1 = 1;
        var max_iter = 20;
        while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
          (function () {
            if (pol) {
              L_diff *= -1;
            }
            if (L_diff < 0) {
              t0 = t;
              t += (t1 - t) * 0.5;
            } else {
              t1 = t;
              t += (t0 - t) * 0.5;
            }
            L_actual = getColor(t, true).lab()[0];
            return L_diff = L_actual - L_ideal;
          })();
        }
        return t;
      };
    } else {
      tMapLightness = function tMapLightness(t) {
        return t;
      };
    }
    return f;
  };
  f.padding = function (p) {
    if (p != null) {
      if ((0, _index.type)(p) === 'number') {
        p = [p, p];
      }
      _padding = p;
      return f;
    } else {
      return _padding;
    }
  };
  f.colors = function (numColors, out) {
    if (arguments.length < 2) {
      out = 'hex';
    }
    var result = [];
    if (arguments.length === 0) {
      result = _colors.slice(0);
    } else if (numColors === 1) {
      result = [f(0.5)];
    } else if (numColors > 1) {
      var dm = _domain[0];
      var dd = _domain[1] - dm;
      result = __range__(0, numColors, false).map(function (i) {
        return f(dm + i / (numColors - 1) * dd);
      });
    } else {
      colors = [];
      var samples = [];
      if (_classes && _classes.length > 2) {
        for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
          samples.push((_classes[i - 1] + _classes[i]) * 0.5);
        }
      } else {
        samples = _domain;
      }
      result = samples.map(function (v) {
        return f(v);
      });
    }
    if (_chroma["default"][out]) {
      result = result.map(function (c) {
        return c[out]();
      });
    }
    return result;
  };
  f.cache = function (c) {
    if (c != null) {
      _useCache = c;
      return f;
    } else {
      return _useCache;
    }
  };
  f.gamma = function (g) {
    if (g != null) {
      _gamma = g;
      return f;
    } else {
      return _gamma;
    }
  };
  f.nodata = function (d) {
    if (d != null) {
      _nacol = (0, _chroma["default"])(d);
      return f;
    } else {
      return _nacol;
    }
  };
  return f;
}
function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _default = exports["default"] = function _default(x, low, high) {
  if (low === void 0) {
    low = 0;
  }
  if (high === void 0) {
    high = 1;
  }
  return (0, _index.min)((0, _index.max)(low, x), high);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var rgb2hsl = function rgb2hsl() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'rgba');
  var _args = args,
    r = _args[0],
    g = _args[1],
    b = _args[2];
  r /= 255;
  g /= 255;
  b /= 255;
  var minRgb = (0, _index.min)(r, g, b);
  var maxRgb = (0, _index.max)(r, g, b);
  var l = (maxRgb + minRgb) / 2;
  var s, h;
  if (maxRgb === minRgb) {
    s = 0;
    h = Number.NaN;
  } else {
    s = l < 0.5 ? (maxRgb - minRgb) / (maxRgb + minRgb) : (maxRgb - minRgb) / (2 - maxRgb - minRgb);
  }
  if (r == maxRgb) h = (g - b) / (maxRgb - minRgb);else if (g == maxRgb) h = 2 + (b - r) / (maxRgb - minRgb);else if (b == maxRgb) h = 4 + (r - g) / (maxRgb - minRgb);
  h *= 60;
  if (h < 0) h += 360;
  if (args.length > 3 && args[3] !== undefined) return [h, s, l, args[3]];
  return [h, s, l];
};
var _default = exports["default"] = rgb2hsl;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var round = Math.round;
var hsl2rgb = function hsl2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'hsl');
  var _args = args,
    h = _args[0],
    s = _args[1],
    l = _args[2];
  var r, g, b;
  if (s === 0) {
    r = g = b = l * 255;
  } else {
    var t3 = [0, 0, 0];
    var c = [0, 0, 0];
    var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var t1 = 2 * l - t2;
    var h_ = h / 360;
    t3[0] = h_ + 1 / 3;
    t3[1] = h_;
    t3[2] = h_ - 1 / 3;
    for (var i = 0; i < 3; i++) {
      if (t3[i] < 0) t3[i] += 1;
      if (t3[i] > 1) t3[i] -= 1;
      if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];else if (2 * t3[i] < 1) c[i] = t2;else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;else c[i] = t1;
    }
    var _ref = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)];
    r = _ref[0];
    g = _ref[1];
    b = _ref[2];
  }
  if (args.length > 3) {
    return [r, g, b, args[3]];
  }
  return [r, g, b, 1];
};
var _default = exports["default"] = hsl2rgb;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _hcg2rgb = _interopRequireDefault(__webpack_require__(48));
var _rgb2hcg = _interopRequireDefault(__webpack_require__(49));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.hcg = function () {
  return (0, _rgb2hcg["default"])(this._rgb);
};
_chroma["default"].hcg = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['hcg']));
};
_input["default"].format.hcg = _hcg2rgb["default"];
_input["default"].autodetect.push({
  p: 1,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'hcg');
    if ((0, _index.type)(args) === 'array' && args.length === 3) {
      return 'hcg';
    }
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
var hex2rgb = function hex2rgb(hex) {
  if (hex.match(RE_HEX)) {
    if (hex.length === 4 || hex.length === 7) {
      hex = hex.substr(1);
    }
    if (hex.length === 3) {
      hex = hex.split('');
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var u = parseInt(hex, 16);
    var r = u >> 16;
    var g = u >> 8 & 0xff;
    var b = u & 0xff;
    return [r, g, b, 1];
  }
  if (hex.match(RE_HEXA)) {
    if (hex.length === 5 || hex.length === 9) {
      hex = hex.substr(1);
    }
    if (hex.length === 4) {
      hex = hex.split('');
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    var _u = parseInt(hex, 16);
    var _r = _u >> 24 & 0xff;
    var _g = _u >> 16 & 0xff;
    var _b = _u >> 8 & 0xff;
    var a = Math.round((_u & 0xff) / 0xff * 100) / 100;
    return [_r, _g, _b, a];
  }
  throw new Error("unknown hex color: " + hex);
};
var _default = exports["default"] = hex2rgb;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var round = Math.round;
var rgb2hex = function rgb2hex() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgba'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2],
    a = _unpack[3];
  var mode = (0, _index.last)(args) || 'auto';
  if (a === undefined) a = 1;
  if (mode === 'auto') {
    mode = a < 1 ? 'rgba' : 'rgb';
  }
  r = round(r);
  g = round(g);
  b = round(b);
  var u = r << 16 | g << 8 | b;
  var str = '000000' + u.toString(16);
  str = str.substr(str.length - 6);
  var hxa = '0' + round(a * 255).toString(16);
  hxa = hxa.substr(hxa.length - 2);
  switch (mode.toLowerCase()) {
    case 'rgba':
      return "#" + str + hxa;
    case 'argb':
      return "#" + hxa + str;
    default:
      return "#" + str;
  }
};
var _default = exports["default"] = rgb2hex;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _hsi2rgb = _interopRequireDefault(__webpack_require__(51));
var _rgb2hsi = _interopRequireDefault(__webpack_require__(52));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.hsi = function () {
  return (0, _rgb2hsi["default"])(this._rgb);
};
_chroma["default"].hsi = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['hsi']));
};
_input["default"].format.hsi = _hsi2rgb["default"];
_input["default"].autodetect.push({
  p: 2,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'hsi');
    if ((0, _index.type)(args) === 'array' && args.length === 3) {
      return 'hsi';
    }
  }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _hsv2rgb = _interopRequireDefault(__webpack_require__(53));
var _rgb2hsv = _interopRequireDefault(__webpack_require__(54));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.hsv = function () {
  return (0, _rgb2hsv["default"])(this._rgb);
};
_chroma["default"].hsv = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['hsv']));
};
_input["default"].format.hsv = _hsv2rgb["default"];
_input["default"].autodetect.push({
  p: 2,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'hsv');
    if ((0, _index.type)(args) === 'array' && args.length === 3) {
      return 'hsv';
    }
  }
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _labConstants = _interopRequireDefault(__webpack_require__(8));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pow = Math.pow;
var lab2rgb = function lab2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'lab');
  var _args = args,
    l = _args[0],
    a = _args[1],
    b = _args[2];
  var x, y, z, r, g, b_;
  y = (l + 16) / 116;
  x = isNaN(a) ? y : y + a / 500;
  z = isNaN(b) ? y : y - b / 200;
  y = _labConstants["default"].Yn * lab_xyz(y);
  x = _labConstants["default"].Xn * lab_xyz(x);
  z = _labConstants["default"].Zn * lab_xyz(z);
  r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
  g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
  b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
  return [r, g, b_, args.length > 3 ? args[3] : 1];
};
var xyz_rgb = function xyz_rgb(r) {
  return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
};
var lab_xyz = function lab_xyz(t) {
  return t > _labConstants["default"].t1 ? t * t * t : _labConstants["default"].t2 * (t - _labConstants["default"].t0);
};
var _default = exports["default"] = lab2rgb;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _labConstants = _interopRequireDefault(__webpack_require__(8));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pow = Math.pow;
var rgb2lab = function rgb2lab() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  var _rgb2xyz = rgb2xyz(r, g, b),
    x = _rgb2xyz[0],
    y = _rgb2xyz[1],
    z = _rgb2xyz[2];
  var l = 116 * y - 16;
  return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
};
var rgb_xyz = function rgb_xyz(r) {
  if ((r /= 255) <= 0.04045) return r / 12.92;
  return pow((r + 0.055) / 1.055, 2.4);
};
var xyz_lab = function xyz_lab(t) {
  if (t > _labConstants["default"].t3) return pow(t, 1 / 3);
  return t / _labConstants["default"].t2 + _labConstants["default"].t0;
};
var rgb2xyz = function rgb2xyz(r, g, b) {
  r = rgb_xyz(r);
  g = rgb_xyz(g);
  b = rgb_xyz(b);
  var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / _labConstants["default"].Xn);
  var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / _labConstants["default"].Yn);
  var z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / _labConstants["default"].Zn);
  return [x, y, z];
};
var _default = exports["default"] = rgb2lab;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _lch2lab2 = _interopRequireDefault(__webpack_require__(24));
var _lab2rgb2 = _interopRequireDefault(__webpack_require__(21));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var lch2rgb = function lch2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'lch');
  var _args = args,
    l = _args[0],
    c = _args[1],
    h = _args[2];
  var _lch2lab = (0, _lch2lab2["default"])(l, c, h),
    L = _lch2lab[0],
    a = _lch2lab[1],
    b_ = _lch2lab[2];
  var _lab2rgb = (0, _lab2rgb2["default"])(L, a, b_),
    r = _lab2rgb[0],
    g = _lab2rgb[1],
    b = _lab2rgb[2];
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var _default = exports["default"] = lch2rgb;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var sin = Math.sin,
  cos = Math.cos;
var lch2lab = function lch2lab() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'lch'),
    l = _unpack[0],
    c = _unpack[1],
    h = _unpack[2];
  if (isNaN(h)) h = 0;
  h = h * _index.DEG2RAD;
  return [l, cos(h) * c, sin(h) * c];
};
var _default = exports["default"] = lch2lab;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var sqrt = Math.sqrt,
  atan2 = Math.atan2,
  round = Math.round;
var lab2lch = function lab2lch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'lab'),
    l = _unpack[0],
    a = _unpack[1],
    b = _unpack[2];
  var c = sqrt(a * a + b * b);
  var h = (atan2(b, a) * _index.RAD2DEG + 360) % 360;
  if (round(c * 10000) === 0) h = Number.NaN;
  return [l, c, h];
};
var _default = exports["default"] = lab2lch;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var w3cx11 = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  laserlemon: '#ffff54',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrod: '#fafad2',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  maroon2: '#7f0000',
  maroon3: '#b03060',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  purple2: '#7f007f',
  purple3: '#a020f0',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};
var _default = exports["default"] = w3cx11;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _index = __webpack_require__(0);
var _num2rgb = _interopRequireDefault(__webpack_require__(58));
var _rgb2num = _interopRequireDefault(__webpack_require__(59));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.num = function () {
  return (0, _rgb2num["default"])(this._rgb);
};
_chroma["default"].num = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['num']));
};
_input["default"].format.num = _num2rgb["default"];
_input["default"].autodetect.push({
  p: 5,
  test: function test() {
    if (arguments.length === 1 && (0, _index.type)(arguments.length <= 0 ? undefined : arguments[0]) === 'number' && (arguments.length <= 0 ? undefined : arguments[0]) >= 0 && (arguments.length <= 0 ? undefined : arguments[0]) <= 0xffffff) {
      return 'num';
    }
  }
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var round = Math.round;
_Color["default"].prototype.rgb = function (rnd) {
  if (rnd === void 0) {
    rnd = true;
  }
  if (rnd === false) return this._rgb.slice(0, 3);
  return this._rgb.slice(0, 3).map(round);
};
_Color["default"].prototype.rgba = function (rnd) {
  if (rnd === void 0) {
    rnd = true;
  }
  return this._rgb.slice(0, 4).map(function (v, i) {
    return i < 3 ? rnd === false ? v : round(v) : v;
  });
};
_chroma["default"].rgb = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['rgb']));
};
_input["default"].format.rgb = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  var rgba = (0, _index.unpack)(args, 'rgba');
  if (rgba[3] === undefined) rgba[3] = 1;
  return rgba;
};
_input["default"].autodetect.push({
  p: 3,
  test: function test() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    args = (0, _index.unpack)(args, 'rgba');
    if ((0, _index.type)(args) === 'array' && (args.length === 3 || args.length === 4 && (0, _index.type)(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
      return 'rgb';
    }
  }
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var log = Math.log;
var temperature2rgb = function temperature2rgb(kelvin) {
  var temp = kelvin / 100;
  var r, g, b;
  if (temp < 66) {
    r = 255;
    g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
    b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
  } else {
    r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
    g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
    b = 255;
  }
  return [r, g, b, 1];
};
var _default = exports["default"] = temperature2rgb;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _oklab2rgb = _interopRequireDefault(__webpack_require__(31));
var _rgb2oklab = _interopRequireDefault(__webpack_require__(32));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.oklab = function () {
  return (0, _rgb2oklab["default"])(this._rgb);
};
_chroma["default"].oklab = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['oklab']));
};
_input["default"].format.oklab = _oklab2rgb["default"];
_input["default"].autodetect.push({
  p: 3,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'oklab');
    if ((0, _index.type)(args) === 'array' && args.length === 3) {
      return 'oklab';
    }
  }
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var pow = Math.pow,
  sign = Math.sign;
var oklab2rgb = function oklab2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'lab');
  var _args = args,
    L = _args[0],
    a = _args[1],
    b = _args[2];
  var l = pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  var m = pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  var s = pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [255 * lrgb2rgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), 255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), 255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s), args.length > 3 ? args[3] : 1];
};
var _default = exports["default"] = oklab2rgb;
function lrgb2rgb(c) {
  var abs = Math.abs(c);
  if (abs > 0.0031308) {
    return (sign(c) || 1) * (1.055 * pow(abs, 1 / 2.4) - 0.055);
  }
  return c * 12.92;
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var cbrt = Math.cbrt,
  pow = Math.pow,
  sign = Math.sign;
var rgb2oklab = function rgb2oklab() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  var _ref = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)],
    lr = _ref[0],
    lg = _ref[1],
    lb = _ref[2];
  var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
};
var _default = exports["default"] = rgb2oklab;
function rgb2lrgb(c) {
  var abs = Math.abs(c);
  if (abs < 0.04045) {
    return c / 12.92;
  }
  return (sign(c) || 1) * pow((abs + 0.055) / 1.055, 2.4);
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pow = Math.pow;
var EPS = 1e-7;
var MAX_ITER = 20;
_Color["default"].prototype.luminance = function (lum, mode) {
  if (mode === void 0) {
    mode = 'rgb';
  }
  if (lum !== undefined && (0, _index.type)(lum) === 'number') {
    if (lum === 0) {
      return new _Color["default"]([0, 0, 0, this._rgb[3]], 'rgb');
    }
    if (lum === 1) {
      return new _Color["default"]([255, 255, 255, this._rgb[3]], 'rgb');
    }
    var cur_lum = this.luminance();
    var max_iter = MAX_ITER;
    var _test = function test(low, high) {
      var mid = low.interpolate(high, 0.5, mode);
      var lm = mid.luminance();
      if (Math.abs(lum - lm) < EPS || !max_iter--) {
        return mid;
      }
      return lm > lum ? _test(low, mid) : _test(mid, high);
    };
    var rgb = (cur_lum > lum ? _test(new _Color["default"]([0, 0, 0]), this) : _test(this, new _Color["default"]([255, 255, 255]))).rgb();
    return new _Color["default"]([].concat(rgb, [this._rgb[3]]));
  }
  return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
};
var rgb2luminance = function rgb2luminance(r, g, b) {
  r = luminance_x(r);
  g = luminance_x(g);
  b = luminance_x(b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
var luminance_x = function luminance_x(x) {
  x /= 255;
  return x <= 0.03928 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.bestColorContrast = bestColorContrast;
var _chromaJs = _interopRequireDefault(__webpack_require__(35));
var _passesAA = __webpack_require__(97);
var _passesAAA = __webpack_require__(98);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function scoreContrast(a, b, large, AAA) {
  var contrast = _chromaJs["default"].contrast(a, b);
  return contrast + Number(AAA && (0, _passesAAA.passesAAA)(contrast, large)) * 100 + Number(!AAA && (0, _passesAA.passesAA)(contrast, large)) * 100;
}
function bestColorContrast(bgColor, fgColors, large, AAA) {
  if (large === void 0) {
    large = false;
  }
  if (AAA === void 0) {
    AAA = false;
  }
  var scores = fgColors.map(function (fgColor) {
    return scoreContrast(bgColor, fgColor, large, AAA);
  });
  return fgColors[scores.indexOf(Math.max.apply(Math, scores))];
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _chroma = _interopRequireDefault(__webpack_require__(2));
__webpack_require__(40);
__webpack_require__(43);
__webpack_require__(47);
__webpack_require__(16);
__webpack_require__(50);
__webpack_require__(19);
__webpack_require__(10);
__webpack_require__(20);
__webpack_require__(6);
__webpack_require__(9);
__webpack_require__(57);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(60);
__webpack_require__(30);
__webpack_require__(62);
__webpack_require__(65);
__webpack_require__(66);
__webpack_require__(67);
__webpack_require__(68);
__webpack_require__(33);
__webpack_require__(69);
__webpack_require__(70);
__webpack_require__(71);
__webpack_require__(72);
__webpack_require__(73);
__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(77);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(80);
__webpack_require__(81);
__webpack_require__(82);
__webpack_require__(83);
__webpack_require__(84);
var _average = _interopRequireDefault(__webpack_require__(85));
var _bezier = _interopRequireDefault(__webpack_require__(86));
var _blend = _interopRequireDefault(__webpack_require__(87));
var _cubehelix = _interopRequireDefault(__webpack_require__(88));
var _mix2 = _interopRequireDefault(__webpack_require__(11));
var _random = _interopRequireDefault(__webpack_require__(89));
var _scale = _interopRequireDefault(__webpack_require__(12));
var _analyze = __webpack_require__(90);
var _contrast = _interopRequireDefault(__webpack_require__(91));
var _deltaE = _interopRequireDefault(__webpack_require__(92));
var _distance = _interopRequireDefault(__webpack_require__(93));
var _valid = _interopRequireDefault(__webpack_require__(94));
var _input = _interopRequireDefault(__webpack_require__(3));
var _scales = _interopRequireDefault(__webpack_require__(95));
var _w3cx = _interopRequireDefault(__webpack_require__(26));
var _colorbrewer = _interopRequireDefault(__webpack_require__(96));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
_extends(_chroma["default"], {
  average: _average["default"],
  bezier: _bezier["default"],
  blend: _blend["default"],
  cubehelix: _cubehelix["default"],
  mix: _mix2["default"],
  interpolate: _mix2["default"],
  random: _random["default"],
  scale: _scale["default"],
  analyze: _analyze.analyze,
  contrast: _contrast["default"],
  deltaE: _deltaE["default"],
  distance: _distance["default"],
  limits: _analyze.limits,
  valid: _valid["default"],
  scales: _scales["default"],
  input: _input["default"],
  colors: _w3cx["default"],
  brewer: _colorbrewer["default"]
});
var _default = exports["default"] = _chroma["default"];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _limit = _interopRequireDefault(__webpack_require__(13));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(rgb) {
  rgb._clipped = false;
  rgb._unclipped = rgb.slice(0);
  for (var i = 0; i <= 3; i++) {
    if (i < 3) {
      if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
      rgb[i] = (0, _limit["default"])(rgb[i], 0, 255);
    } else if (i === 3) {
      rgb[i] = (0, _limit["default"])(rgb[i], 0, 1);
    }
  }
  return rgb;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _type = _interopRequireDefault(__webpack_require__(7));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(args, keyOrder) {
  if (keyOrder === void 0) {
    keyOrder = null;
  }
  if (args.length >= 3) return Array.prototype.slice.call(args);
  if ((0, _type["default"])(args[0]) == 'object' && keyOrder) {
    return keyOrder.split('').filter(function (k) {
      return args[0][k] !== undefined;
    }).map(function (k) {
      return args[0][k];
    });
  }
  return args[0];
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _type = _interopRequireDefault(__webpack_require__(7));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(args) {
  if (args.length < 2) return null;
  var l = args.length - 1;
  if ((0, _type["default"])(args[l]) == 'string') return args[l].toLowerCase();
  return null;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.version = void 0;
var version = exports.version = '2.6.0';

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _index = __webpack_require__(0);
var _cmyk2rgb = _interopRequireDefault(__webpack_require__(41));
var _rgb2cmyk = _interopRequireDefault(__webpack_require__(42));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.cmyk = function () {
  return (0, _rgb2cmyk["default"])(this._rgb);
};
_chroma["default"].cmyk = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['cmyk']));
};
_input["default"].format.cmyk = _cmyk2rgb["default"];
_input["default"].autodetect.push({
  p: 2,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'cmyk');
    if ((0, _index.type)(args) === 'array' && args.length === 4) {
      return 'cmyk';
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var cmyk2rgb = function cmyk2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'cmyk');
  var _args = args,
    c = _args[0],
    m = _args[1],
    y = _args[2],
    k = _args[3];
  var alpha = args.length > 4 ? args[4] : 1;
  if (k === 1) return [0, 0, 0, alpha];
  return [c >= 1 ? 0 : 255 * (1 - c) * (1 - k), m >= 1 ? 0 : 255 * (1 - m) * (1 - k), y >= 1 ? 0 : 255 * (1 - y) * (1 - k), alpha];
};
var _default = exports["default"] = cmyk2rgb;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var max = Math.max;
var rgb2cmyk = function rgb2cmyk() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  r = r / 255;
  g = g / 255;
  b = b / 255;
  var k = 1 - max(r, max(g, b));
  var f = k < 1 ? 1 / (1 - k) : 0;
  var c = (1 - r - k) * f;
  var m = (1 - g - k) * f;
  var y = (1 - b - k) * f;
  return [c, m, y, k];
};
var _default = exports["default"] = rgb2cmyk;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _index = __webpack_require__(0);
var _rgb2css = _interopRequireDefault(__webpack_require__(44));
var _css2rgb = _interopRequireDefault(__webpack_require__(46));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.css = function (mode) {
  return (0, _rgb2css["default"])(this._rgb, mode);
};
_chroma["default"].css = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['css']));
};
_input["default"].format.css = _css2rgb["default"];
_input["default"].autodetect.push({
  p: 5,
  test: function test(h) {
    if (!(arguments.length <= 1 ? 0 : arguments.length - 1) && (0, _index.type)(h) === 'string' && _css2rgb["default"].test(h)) {
      return 'css';
    }
  }
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _hsl2css = _interopRequireDefault(__webpack_require__(45));
var _rgb2hsl = _interopRequireDefault(__webpack_require__(14));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var round = Math.round;
var rgb2css = function rgb2css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var rgba = (0, _index.unpack)(args, 'rgba');
  var mode = (0, _index.last)(args) || 'rgb';
  if (mode.substr(0, 3) == 'hsl') {
    return (0, _hsl2css["default"])((0, _rgb2hsl["default"])(rgba), mode);
  }
  rgba[0] = round(rgba[0]);
  rgba[1] = round(rgba[1]);
  rgba[2] = round(rgba[2]);
  if (mode === 'rgba' || rgba.length > 3 && rgba[3] < 1) {
    rgba[3] = rgba.length > 3 ? rgba[3] : 1;
    mode = 'rgba';
  }
  return mode + "(" + rgba.slice(0, mode === 'rgb' ? 3 : 4).join(',') + ")";
};
var _default = exports["default"] = rgb2css;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var rnd = function rnd(a) {
  return Math.round(a * 100) / 100;
};
var hsl2css = function hsl2css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var hsla = (0, _index.unpack)(args, 'hsla');
  var mode = (0, _index.last)(args) || 'lsa';
  hsla[0] = rnd(hsla[0] || 0);
  hsla[1] = rnd(hsla[1] * 100) + '%';
  hsla[2] = rnd(hsla[2] * 100) + '%';
  if (mode === 'hsla' || hsla.length > 3 && hsla[3] < 1) {
    hsla[3] = hsla.length > 3 ? hsla[3] : 1;
    mode = 'hsla';
  } else {
    hsla.length = 3;
  }
  return mode + "(" + hsla.join(',') + ")";
};
var _default = exports["default"] = hsl2css;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _hsl2rgb = _interopRequireDefault(__webpack_require__(15));
var _input = _interopRequireDefault(__webpack_require__(3));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
var round = Math.round;
var css2rgb = function css2rgb(css) {
  css = css.toLowerCase().trim();
  var m;
  if (_input["default"].format.named) {
    try {
      return _input["default"].format.named(css);
    } catch (e) {}
  }
  if (m = css.match(RE_RGB)) {
    var rgb = m.slice(1, 4);
    for (var i = 0; i < 3; i++) {
      rgb[i] = +rgb[i];
    }
    rgb[3] = 1;
    return rgb;
  }
  if (m = css.match(RE_RGBA)) {
    var _rgb = m.slice(1, 5);
    for (var _i = 0; _i < 4; _i++) {
      _rgb[_i] = +_rgb[_i];
    }
    return _rgb;
  }
  if (m = css.match(RE_RGB_PCT)) {
    var _rgb2 = m.slice(1, 4);
    for (var _i2 = 0; _i2 < 3; _i2++) {
      _rgb2[_i2] = round(_rgb2[_i2] * 2.55);
    }
    _rgb2[3] = 1;
    return _rgb2;
  }
  if (m = css.match(RE_RGBA_PCT)) {
    var _rgb3 = m.slice(1, 5);
    for (var _i3 = 0; _i3 < 3; _i3++) {
      _rgb3[_i3] = round(_rgb3[_i3] * 2.55);
    }
    _rgb3[3] = +_rgb3[3];
    return _rgb3;
  }
  if (m = css.match(RE_HSL)) {
    var hsl = m.slice(1, 4);
    hsl[1] *= 0.01;
    hsl[2] *= 0.01;
    var _rgb4 = (0, _hsl2rgb["default"])(hsl);
    _rgb4[3] = 1;
    return _rgb4;
  }
  if (m = css.match(RE_HSLA)) {
    var _hsl = m.slice(1, 4);
    _hsl[1] *= 0.01;
    _hsl[2] *= 0.01;
    var _rgb5 = (0, _hsl2rgb["default"])(_hsl);
    _rgb5[3] = +m[4];
    return _rgb5;
  }
};
css2rgb.test = function (s) {
  return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
};
var _default = exports["default"] = css2rgb;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _input = _interopRequireDefault(__webpack_require__(3));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_input["default"].format.gl = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var rgb = (0, _index.unpack)(args, 'rgba');
  rgb[0] *= 255;
  rgb[1] *= 255;
  rgb[2] *= 255;
  return rgb;
};
_chroma["default"].gl = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return _construct(_Color["default"], args.concat(['gl']));
};
_Color["default"].prototype.gl = function () {
  var rgb = this._rgb;
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var floor = Math.floor;
var hcg2rgb = function hcg2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'hcg');
  var _args = args,
    h = _args[0],
    c = _args[1],
    _g = _args[2];
  var r, g, b;
  _g = _g * 255;
  var _c = c * 255;
  if (c === 0) {
    r = g = b = _g;
  } else {
    if (h === 360) h = 0;
    if (h > 360) h -= 360;
    if (h < 0) h += 360;
    h /= 60;
    var i = floor(h);
    var f = h - i;
    var p = _g * (1 - c);
    var q = p + _c * (1 - f);
    var t = p + _c * f;
    var v = p + _c;
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
  }
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var _default = exports["default"] = hcg2rgb;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var rgb2hcg = function rgb2hcg() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  var minRgb = (0, _index.min)(r, g, b);
  var maxRgb = (0, _index.max)(r, g, b);
  var delta = maxRgb - minRgb;
  var c = delta * 100 / 255;
  var _g = minRgb / (255 - delta) * 100;
  var h;
  if (delta === 0) {
    h = Number.NaN;
  } else {
    if (r === maxRgb) h = (g - b) / delta;
    if (g === maxRgb) h = 2 + (b - r) / delta;
    if (b === maxRgb) h = 4 + (r - g) / delta;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, c, _g];
};
var _default = exports["default"] = rgb2hcg;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = __webpack_require__(0);
var _input = _interopRequireDefault(__webpack_require__(3));
var _hex2rgb = _interopRequireDefault(__webpack_require__(17));
var _rgb2hex = _interopRequireDefault(__webpack_require__(18));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.hex = function (mode) {
  return (0, _rgb2hex["default"])(this._rgb, mode);
};
_chroma["default"].hex = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['hex']));
};
_input["default"].format.hex = _hex2rgb["default"];
_input["default"].autodetect.push({
  p: 4,
  test: function test(h) {
    if (!(arguments.length <= 1 ? 0 : arguments.length - 1) && (0, _index.type)(h) === 'string' && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
      return 'hex';
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var cos = Math.cos;
var hsi2rgb = function hsi2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'hsi');
  var _args = args,
    h = _args[0],
    s = _args[1],
    i = _args[2];
  var r, g, b;
  if (isNaN(h)) h = 0;
  if (isNaN(s)) s = 0;
  if (h > 360) h -= 360;
  if (h < 0) h += 360;
  h /= 360;
  if (h < 1 / 3) {
    b = (1 - s) / 3;
    r = (1 + s * cos(_index.TWOPI * h) / cos(_index.PITHIRD - _index.TWOPI * h)) / 3;
    g = 1 - (b + r);
  } else if (h < 2 / 3) {
    h -= 1 / 3;
    r = (1 - s) / 3;
    g = (1 + s * cos(_index.TWOPI * h) / cos(_index.PITHIRD - _index.TWOPI * h)) / 3;
    b = 1 - (r + g);
  } else {
    h -= 2 / 3;
    g = (1 - s) / 3;
    b = (1 + s * cos(_index.TWOPI * h) / cos(_index.PITHIRD - _index.TWOPI * h)) / 3;
    r = 1 - (g + b);
  }
  r = (0, _index.limit)(i * r * 3);
  g = (0, _index.limit)(i * g * 3);
  b = (0, _index.limit)(i * b * 3);
  return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
};
var _default = exports["default"] = hsi2rgb;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var min = Math.min,
  sqrt = Math.sqrt,
  acos = Math.acos;
var rgb2hsi = function rgb2hsi() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  r /= 255;
  g /= 255;
  b /= 255;
  var h;
  var min_ = min(r, g, b);
  var i = (r + g + b) / 3;
  var s = i > 0 ? 1 - min_ / i : 0;
  if (s === 0) {
    h = NaN;
  } else {
    h = (r - g + (r - b)) / 2;
    h /= sqrt((r - g) * (r - g) + (r - b) * (g - b));
    h = acos(h);
    if (b > g) {
      h = _index.TWOPI - h;
    }
    h /= _index.TWOPI;
  }
  return [h * 360, s, i];
};
var _default = exports["default"] = rgb2hsi;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var floor = Math.floor;
var hsv2rgb = function hsv2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'hsv');
  var _args = args,
    h = _args[0],
    s = _args[1],
    v = _args[2];
  var r, g, b;
  v *= 255;
  if (s === 0) {
    r = g = b = v;
  } else {
    if (h === 360) h = 0;
    if (h > 360) h -= 360;
    if (h < 0) h += 360;
    h /= 60;
    var i = floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - s * f);
    var t = v * (1 - s * (1 - f));
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
  }
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var _default = exports["default"] = hsv2rgb;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var min = Math.min,
  max = Math.max;
var rgb2hsl = function rgb2hsl() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'rgb');
  var _args = args,
    r = _args[0],
    g = _args[1],
    b = _args[2];
  var min_ = min(r, g, b);
  var max_ = max(r, g, b);
  var delta = max_ - min_;
  var h, s, v;
  v = max_ / 255.0;
  if (max_ === 0) {
    h = Number.NaN;
    s = 0;
  } else {
    s = delta / max_;
    if (r === max_) h = (g - b) / delta;
    if (g === max_) h = 2 + (b - r) / delta;
    if (b === max_) h = 4 + (r - g) / delta;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, v];
};
var _default = exports["default"] = rgb2hsl;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _lch2rgb = _interopRequireDefault(__webpack_require__(23));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hcl2rgb = function hcl2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var hcl = (0, _index.unpack)(args, 'hcl').reverse();
  return _lch2rgb["default"].apply(void 0, hcl);
};
var _default = exports["default"] = hcl2rgb;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _rgb2lab2 = _interopRequireDefault(__webpack_require__(22));
var _lab2lch = _interopRequireDefault(__webpack_require__(25));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var rgb2lch = function rgb2lch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  var _rgb2lab = (0, _rgb2lab2["default"])(r, g, b),
    l = _rgb2lab[0],
    a = _rgb2lab[1],
    b_ = _rgb2lab[2];
  return (0, _lab2lch["default"])(l, a, b_);
};
var _default = exports["default"] = rgb2lch;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _index = __webpack_require__(0);
var _w3cx = _interopRequireDefault(__webpack_require__(26));
var _hex2rgb = _interopRequireDefault(__webpack_require__(17));
var _rgb2hex = _interopRequireDefault(__webpack_require__(18));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.name = function () {
  var hex = (0, _rgb2hex["default"])(this._rgb, 'rgb');
  for (var _i = 0, _Object$keys = Object.keys(_w3cx["default"]); _i < _Object$keys.length; _i++) {
    var n = _Object$keys[_i];
    if (_w3cx["default"][n] === hex) return n.toLowerCase();
  }
  return hex;
};
_input["default"].format.named = function (name) {
  name = name.toLowerCase();
  if (_w3cx["default"][name]) return (0, _hex2rgb["default"])(_w3cx["default"][name]);
  throw new Error('unknown color name: ' + name);
};
_input["default"].autodetect.push({
  p: 5,
  test: function test(h) {
    if (!(arguments.length <= 1 ? 0 : arguments.length - 1) && (0, _index.type)(h) === 'string' && _w3cx["default"][h.toLowerCase()]) {
      return 'named';
    }
  }
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var num2rgb = function num2rgb(num) {
  if ((0, _index.type)(num) == 'number' && num >= 0 && num <= 0xffffff) {
    var r = num >> 16;
    var g = num >> 8 & 0xff;
    var b = num & 0xff;
    return [r, g, b, 1];
  }
  throw new Error('unknown num color: ' + num);
};
var _default = exports["default"] = num2rgb;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var rgb2num = function rgb2num() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  return (r << 16) + (g << 8) + b;
};
var _default = exports["default"] = rgb2num;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _temperature2rgb = _interopRequireDefault(__webpack_require__(29));
var _rgb2temperature = _interopRequireDefault(__webpack_require__(61));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.temp = _Color["default"].prototype.kelvin = _Color["default"].prototype.temperature = function () {
  return (0, _rgb2temperature["default"])(this._rgb);
};
_chroma["default"].temp = _chroma["default"].kelvin = _chroma["default"].temperature = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['temp']));
};
_input["default"].format.temp = _input["default"].format.kelvin = _input["default"].format.temperature = _temperature2rgb["default"];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _temperature2rgb = _interopRequireDefault(__webpack_require__(29));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var round = Math.round;
var rgb2temperature = function rgb2temperature() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var rgb = (0, _index.unpack)(args, 'rgb');
  var r = rgb[0],
    b = rgb[2];
  var minTemp = 1000;
  var maxTemp = 40000;
  var eps = 0.4;
  var temp;
  while (maxTemp - minTemp > eps) {
    temp = (maxTemp + minTemp) * 0.5;
    var _rgb = (0, _temperature2rgb["default"])(temp);
    if (_rgb[2] / _rgb[0] >= b / r) {
      maxTemp = temp;
    } else {
      minTemp = temp;
    }
  }
  return round(temp);
};
var _default = exports["default"] = rgb2temperature;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
var _Color = _interopRequireDefault(__webpack_require__(1));
var _input = _interopRequireDefault(__webpack_require__(3));
var _oklch2rgb = _interopRequireDefault(__webpack_require__(63));
var _rgb2oklch = _interopRequireDefault(__webpack_require__(64));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_Color["default"].prototype.oklch = function () {
  return (0, _rgb2oklch["default"])(this._rgb);
};
_chroma["default"].oklch = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(_Color["default"], args.concat(['oklch']));
};
_input["default"].format.oklch = _oklch2rgb["default"];
_input["default"].autodetect.push({
  p: 3,
  test: function test() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args = (0, _index.unpack)(args, 'oklch');
    if ((0, _index.type)(args) === 'array' && args.length === 3) {
      return 'oklch';
    }
  }
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _lch2lab2 = _interopRequireDefault(__webpack_require__(24));
var _oklab2rgb2 = _interopRequireDefault(__webpack_require__(31));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var oklch2rgb = function oklch2rgb() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args = (0, _index.unpack)(args, 'lch');
  var _args = args,
    l = _args[0],
    c = _args[1],
    h = _args[2];
  var _lch2lab = (0, _lch2lab2["default"])(l, c, h),
    L = _lch2lab[0],
    a = _lch2lab[1],
    b_ = _lch2lab[2];
  var _oklab2rgb = (0, _oklab2rgb2["default"])(L, a, b_),
    r = _oklab2rgb[0],
    g = _oklab2rgb[1],
    b = _oklab2rgb[2];
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var _default = exports["default"] = oklch2rgb;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _index = __webpack_require__(0);
var _rgb2oklab2 = _interopRequireDefault(__webpack_require__(32));
var _lab2lch = _interopRequireDefault(__webpack_require__(25));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var rgb2oklch = function rgb2oklch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _unpack = (0, _index.unpack)(args, 'rgb'),
    r = _unpack[0],
    g = _unpack[1],
    b = _unpack[2];
  var _rgb2oklab = (0, _rgb2oklab2["default"])(r, g, b),
    l = _rgb2oklab[0],
    a = _rgb2oklab[1],
    b_ = _rgb2oklab[2];
  return (0, _lab2lch["default"])(l, a, b_);
};
var _default = exports["default"] = rgb2oklch;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.alpha = function (a, mutate) {
  if (mutate === void 0) {
    mutate = false;
  }
  if (a !== undefined && (0, _index.type)(a) === 'number') {
    if (mutate) {
      this._rgb[3] = a;
      return this;
    }
    return new _Color["default"]([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
  }
  return this._rgb[3];
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.clipped = function () {
  return this._rgb._clipped || false;
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);
var _Color = _interopRequireDefault(__webpack_require__(1));
var _labConstants = _interopRequireDefault(__webpack_require__(8));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.darken = function (amount) {
  if (amount === void 0) {
    amount = 1;
  }
  var me = this;
  var lab = me.lab();
  lab[0] -= _labConstants["default"].Kn * amount;
  return new _Color["default"](lab, 'lab').alpha(me.alpha(), true);
};
_Color["default"].prototype.brighten = function (amount) {
  if (amount === void 0) {
    amount = 1;
  }
  return this.darken(-amount);
};
_Color["default"].prototype.darker = _Color["default"].prototype.darken;
_Color["default"].prototype.brighter = _Color["default"].prototype.brighten;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.get = function (mc) {
  var _mc$split = mc.split('.'),
    mode = _mc$split[0],
    channel = _mc$split[1];
  var src = this[mode]();
  if (channel) {
    var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
    if (i > -1) return src[i];
    throw new Error("unknown channel " + channel + " in mode " + mode);
  } else {
    return src;
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
var _mix = _interopRequireDefault(__webpack_require__(11));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.mix = _Color["default"].prototype.interpolate = function (col2, f) {
  if (f === void 0) {
    f = 0.5;
  }
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }
  return _mix["default"].apply(void 0, [this, col2, f].concat(rest));
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.premultiply = function (mutate) {
  if (mutate === void 0) {
    mutate = false;
  }
  var rgb = this._rgb;
  var a = rgb[3];
  if (mutate) {
    this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
    return this;
  } else {
    return new _Color["default"]([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], 'rgb');
  }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);
var _Color = _interopRequireDefault(__webpack_require__(1));
var _labConstants = _interopRequireDefault(__webpack_require__(8));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.saturate = function (amount) {
  if (amount === void 0) {
    amount = 1;
  }
  var me = this;
  var lch = me.lch();
  lch[1] += _labConstants["default"].Kn * amount;
  if (lch[1] < 0) lch[1] = 0;
  return new _Color["default"](lch, 'lch').alpha(me.alpha(), true);
};
_Color["default"].prototype.desaturate = function (amount) {
  if (amount === void 0) {
    amount = 1;
  }
  return this.saturate(-amount);
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.set = function (mc, value, mutate) {
  if (mutate === void 0) {
    mutate = false;
  }
  var _mc$split = mc.split('.'),
    mode = _mc$split[0],
    channel = _mc$split[1];
  var src = this[mode]();
  if (channel) {
    var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
    if (i > -1) {
      if ((0, _index.type)(value) == 'string') {
        switch (value.charAt(0)) {
          case '+':
            src[i] += +value;
            break;
          case '-':
            src[i] += +value;
            break;
          case '*':
            src[i] *= +value.substr(1);
            break;
          case '/':
            src[i] /= +value.substr(1);
            break;
          default:
            src[i] = +value;
        }
      } else if ((0, _index.type)(value) === 'number') {
        src[i] = value;
      } else {
        throw new Error("unsupported value for Color.set");
      }
      var out = new _Color["default"](src, mode);
      if (mutate) {
        this._rgb = out._rgb;
        return this;
      }
      return out;
    }
    throw new Error("unknown channel " + channel + " in mode " + mode);
  } else {
    return src;
  }
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);
var _Color = _interopRequireDefault(__webpack_require__(1));
var _mix = _interopRequireDefault(__webpack_require__(11));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_Color["default"].prototype.tint = function (f) {
  if (f === void 0) {
    f = 0.5;
  }
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }
  return _mix["default"].apply(void 0, [this, 'white', f].concat(rest));
};
_Color["default"].prototype.shade = function (f) {
  if (f === void 0) {
    f = 0.5;
  }
  for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    rest[_key2 - 1] = arguments[_key2];
  }
  return _mix["default"].apply(void 0, [this, 'black', f].concat(rest));
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var rgb = function rgb(col1, col2, f) {
  var xyz0 = col1._rgb;
  var xyz1 = col2._rgb;
  return new _Color["default"](xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), 'rgb');
};
_index["default"].rgb = rgb;
var _default = exports["default"] = rgb;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var sqrt = Math.sqrt,
  pow = Math.pow;
var lrgb = function lrgb(col1, col2, f) {
  var _col1$_rgb = col1._rgb,
    x1 = _col1$_rgb[0],
    y1 = _col1$_rgb[1],
    z1 = _col1$_rgb[2];
  var _col2$_rgb = col2._rgb,
    x2 = _col2$_rgb[0],
    y2 = _col2$_rgb[1],
    z2 = _col2$_rgb[2];
  return new _Color["default"](sqrt(pow(x1, 2) * (1 - f) + pow(x2, 2) * f), sqrt(pow(y1, 2) * (1 - f) + pow(y2, 2) * f), sqrt(pow(z1, 2) * (1 - f) + pow(z2, 2) * f), 'rgb');
};
_index["default"].lrgb = lrgb;
var _default = exports["default"] = lrgb;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(6);
var _index2 = _interopRequireDefault(__webpack_require__(4));
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var lab = function lab(col1, col2, f) {
  var xyz0 = col1.lab();
  var xyz1 = col2.lab();
  return new _Color["default"](xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), 'lab');
};
_index2["default"].lab = lab;
var _default = exports["default"] = lab;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(9);
var _hsx = _interopRequireDefault(__webpack_require__(5));
var _index2 = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var lch = function lch(col1, col2, f) {
  return (0, _hsx["default"])(col1, col2, f, 'lch');
};
_index2["default"].lch = lch;
_index2["default"].hcl = lch;
var _default = exports["default"] = lch;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(27);
var _index2 = _interopRequireDefault(__webpack_require__(4));
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var num = function num(col1, col2, f) {
  var c1 = col1.num();
  var c2 = col2.num();
  return new _Color["default"](c1 + f * (c2 - c1), 'num');
};
_index2["default"].num = num;
var _default = exports["default"] = num;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(16);
var _hsx = _interopRequireDefault(__webpack_require__(5));
var _index2 = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hcg = function hcg(col1, col2, f) {
  return (0, _hsx["default"])(col1, col2, f, 'hcg');
};
_index2["default"].hcg = hcg;
var _default = exports["default"] = hcg;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(19);
var _hsx = _interopRequireDefault(__webpack_require__(5));
var _index2 = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hsi = function hsi(col1, col2, f) {
  return (0, _hsx["default"])(col1, col2, f, 'hsi');
};
_index2["default"].hsi = hsi;
var _default = exports["default"] = hsi;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(10);
var _hsx = _interopRequireDefault(__webpack_require__(5));
var _index2 = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hsl = function hsl(col1, col2, f) {
  return (0, _hsx["default"])(col1, col2, f, 'hsl');
};
_index2["default"].hsl = hsl;
var _default = exports["default"] = hsl;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(20);
var _hsx = _interopRequireDefault(__webpack_require__(5));
var _index2 = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hsv = function hsv(col1, col2, f) {
  return (0, _hsx["default"])(col1, col2, f, 'hsv');
};
_index2["default"].hsv = hsv;
var _default = exports["default"] = hsv;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(30);
var _index2 = _interopRequireDefault(__webpack_require__(4));
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var oklab = function oklab(col1, col2, f) {
  var xyz0 = col1.oklab();
  var xyz1 = col2.oklab();
  return new _Color["default"](xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), 'oklab');
};
_index2["default"].oklab = oklab;
var _default = exports["default"] = oklab;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(9);
var _hsx = _interopRequireDefault(__webpack_require__(5));
var _index2 = _interopRequireDefault(__webpack_require__(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var oklch = function oklch(col1, col2, f) {
  return (0, _hsx["default"])(col1, col2, f, 'oklch');
};
_index2["default"].oklch = oklch;
var _default = exports["default"] = oklch;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
var _index = __webpack_require__(0);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pow = Math.pow,
  sqrt = Math.sqrt,
  PI = Math.PI,
  cos = Math.cos,
  sin = Math.sin,
  atan2 = Math.atan2;
var _default = exports["default"] = function _default(colors, mode, weights) {
  if (mode === void 0) {
    mode = 'lrgb';
  }
  if (weights === void 0) {
    weights = null;
  }
  var l = colors.length;
  if (!weights) weights = Array.from(new Array(l)).map(function () {
    return 1;
  });
  var k = l / weights.reduce(function (a, b) {
    return a + b;
  });
  weights.forEach(function (w, i) {
    weights[i] *= k;
  });
  colors = colors.map(function (c) {
    return new _Color["default"](c);
  });
  if (mode === 'lrgb') {
    return _average_lrgb(colors, weights);
  }
  var first = colors.shift();
  var xyz = first.get(mode);
  var cnt = [];
  var dx = 0;
  var dy = 0;
  for (var i = 0; i < xyz.length; i++) {
    xyz[i] = (xyz[i] || 0) * weights[0];
    cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
    if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
      var A = xyz[i] / 180 * PI;
      dx += cos(A) * weights[0];
      dy += sin(A) * weights[0];
    }
  }
  var alpha = first.alpha() * weights[0];
  colors.forEach(function (c, ci) {
    var xyz2 = c.get(mode);
    alpha += c.alpha() * weights[ci + 1];
    for (var _i = 0; _i < xyz.length; _i++) {
      if (!isNaN(xyz2[_i])) {
        cnt[_i] += weights[ci + 1];
        if (mode.charAt(_i) === 'h') {
          var _A = xyz2[_i] / 180 * PI;
          dx += cos(_A) * weights[ci + 1];
          dy += sin(_A) * weights[ci + 1];
        } else {
          xyz[_i] += xyz2[_i] * weights[ci + 1];
        }
      }
    }
  });
  for (var _i2 = 0; _i2 < xyz.length; _i2++) {
    if (mode.charAt(_i2) === 'h') {
      var _A2 = atan2(dy / cnt[_i2], dx / cnt[_i2]) / PI * 180;
      while (_A2 < 0) _A2 += 360;
      while (_A2 >= 360) _A2 -= 360;
      xyz[_i2] = _A2;
    } else {
      xyz[_i2] = xyz[_i2] / cnt[_i2];
    }
  }
  alpha /= l;
  return new _Color["default"](xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
};
var _average_lrgb = function _average_lrgb(colors, weights) {
  var l = colors.length;
  var xyz = [0, 0, 0, 0];
  for (var i = 0; i < colors.length; i++) {
    var col = colors[i];
    var f = weights[i] / l;
    var rgb = col._rgb;
    xyz[0] += pow(rgb[0], 2) * f;
    xyz[1] += pow(rgb[1], 2) * f;
    xyz[2] += pow(rgb[2], 2) * f;
    xyz[3] += rgb[3] * f;
  }
  xyz[0] = sqrt(xyz[0]);
  xyz[1] = sqrt(xyz[1]);
  xyz[2] = sqrt(xyz[2]);
  if (xyz[3] > 0.9999999) xyz[3] = 1;
  return new _Color["default"]((0, _index.clip_rgb)(xyz));
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
__webpack_require__(6);
var _scale = _interopRequireDefault(__webpack_require__(12));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var binom_row = function binom_row(n) {
  var row = [1, 1];
  for (var i = 1; i < n; i++) {
    var newrow = [1];
    for (var j = 1; j <= row.length; j++) {
      newrow[j] = (row[j] || 0) + row[j - 1];
    }
    row = newrow;
  }
  return row;
};
var bezier = function bezier(colors) {
  var I, lab0, lab1, lab2;
  colors = colors.map(function (c) {
    return new _Color["default"](c);
  });
  if (colors.length === 2) {
    var _colors$map = colors.map(function (c) {
      return c.lab();
    });
    lab0 = _colors$map[0];
    lab1 = _colors$map[1];
    I = function I(t) {
      var lab = [0, 1, 2].map(function (i) {
        return lab0[i] + t * (lab1[i] - lab0[i]);
      });
      return new _Color["default"](lab, 'lab');
    };
  } else if (colors.length === 3) {
    var _colors$map2 = colors.map(function (c) {
      return c.lab();
    });
    lab0 = _colors$map2[0];
    lab1 = _colors$map2[1];
    lab2 = _colors$map2[2];
    I = function I(t) {
      var lab = [0, 1, 2].map(function (i) {
        return (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i];
      });
      return new _Color["default"](lab, 'lab');
    };
  } else if (colors.length === 4) {
    var lab3;
    var _colors$map3 = colors.map(function (c) {
      return c.lab();
    });
    lab0 = _colors$map3[0];
    lab1 = _colors$map3[1];
    lab2 = _colors$map3[2];
    lab3 = _colors$map3[3];
    I = function I(t) {
      var lab = [0, 1, 2].map(function (i) {
        return (1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i];
      });
      return new _Color["default"](lab, 'lab');
    };
  } else if (colors.length >= 5) {
    var labs, row, n;
    labs = colors.map(function (c) {
      return c.lab();
    });
    n = colors.length - 1;
    row = binom_row(n);
    I = function I(t) {
      var u = 1 - t;
      var lab = [0, 1, 2].map(function (i) {
        return labs.reduce(function (sum, el, j) {
          return sum + row[j] * Math.pow(u, n - j) * Math.pow(t, j) * el[i];
        }, 0);
      });
      return new _Color["default"](lab, 'lab');
    };
  } else {
    throw new RangeError('No point in running bezier with only one color.');
  }
  return I;
};
var _default = exports["default"] = function _default(colors) {
  var f = bezier(colors);
  f.scale = function () {
    return (0, _scale["default"])(f);
  };
  return f;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
__webpack_require__(28);
var _chroma = _interopRequireDefault(__webpack_require__(2));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _blend = function blend(bottom, top, mode) {
  if (!_blend[mode]) {
    throw new Error('unknown blend mode ' + mode);
  }
  return _blend[mode](bottom, top);
};
var blend_f = function blend_f(f) {
  return function (bottom, top) {
    var c0 = (0, _chroma["default"])(top).rgb();
    var c1 = (0, _chroma["default"])(bottom).rgb();
    return _chroma["default"].rgb(f(c0, c1));
  };
};
var each = function each(f) {
  return function (c0, c1) {
    var out = [];
    out[0] = f(c0[0], c1[0]);
    out[1] = f(c0[1], c1[1]);
    out[2] = f(c0[2], c1[2]);
    return out;
  };
};
var normal = function normal(a) {
  return a;
};
var multiply = function multiply(a, b) {
  return a * b / 255;
};
var darken = function darken(a, b) {
  return a > b ? b : a;
};
var lighten = function lighten(a, b) {
  return a > b ? a : b;
};
var screen = function screen(a, b) {
  return 255 * (1 - (1 - a / 255) * (1 - b / 255));
};
var overlay = function overlay(a, b) {
  return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
};
var burn = function burn(a, b) {
  return 255 * (1 - (1 - b / 255) / (a / 255));
};
var dodge = function dodge(a, b) {
  if (a === 255) return 255;
  a = 255 * (b / 255) / (1 - a / 255);
  return a > 255 ? 255 : a;
};
_blend.normal = blend_f(each(normal));
_blend.multiply = blend_f(each(multiply));
_blend.screen = blend_f(each(screen));
_blend.overlay = blend_f(each(overlay));
_blend.darken = blend_f(each(darken));
_blend.lighten = blend_f(each(lighten));
_blend.dodge = blend_f(each(dodge));
_blend.burn = blend_f(each(burn));
var _default = exports["default"] = _blend;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = _default;
var _index = __webpack_require__(0);
var _chroma = _interopRequireDefault(__webpack_require__(2));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pow = Math.pow,
  sin = Math.sin,
  cos = Math.cos;
function _default(start, rotations, hue, gamma, lightness) {
  if (start === void 0) {
    start = 300;
  }
  if (rotations === void 0) {
    rotations = -1.5;
  }
  if (hue === void 0) {
    hue = 1;
  }
  if (gamma === void 0) {
    gamma = 1;
  }
  if (lightness === void 0) {
    lightness = [0, 1];
  }
  var dh = 0,
    dl;
  if ((0, _index.type)(lightness) === 'array') {
    dl = lightness[1] - lightness[0];
  } else {
    dl = 0;
    lightness = [lightness, lightness];
  }
  var f = function f(fract) {
    var a = _index.TWOPI * ((start + 120) / 360 + rotations * fract);
    var l = pow(lightness[0] + dl * fract, gamma);
    var h = dh !== 0 ? hue[0] + fract * dh : hue;
    var amp = h * l * (1 - l) / 2;
    var cos_a = cos(a);
    var sin_a = sin(a);
    var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
    var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
    var b = l + amp * (+1.97294 * cos_a);
    return (0, _chroma["default"])((0, _index.clip_rgb)([r * 255, g * 255, b * 255, 1]));
  };
  f.start = function (s) {
    if (s == null) {
      return start;
    }
    start = s;
    return f;
  };
  f.rotations = function (r) {
    if (r == null) {
      return rotations;
    }
    rotations = r;
    return f;
  };
  f.gamma = function (g) {
    if (g == null) {
      return gamma;
    }
    gamma = g;
    return f;
  };
  f.hue = function (h) {
    if (h == null) {
      return hue;
    }
    hue = h;
    if ((0, _index.type)(hue) === 'array') {
      dh = hue[1] - hue[0];
      if (dh === 0) {
        hue = hue[1];
      }
    } else {
      dh = 0;
    }
    return f;
  };
  f.lightness = function (h) {
    if (h == null) {
      return lightness;
    }
    if ((0, _index.type)(h) === 'array') {
      lightness = h;
      dl = h[1] - h[0];
    } else {
      lightness = [h, h];
      dl = 0;
    }
    return f;
  };
  f.scale = function () {
    return _chroma["default"].scale(f);
  };
  f.hue(hue);
  return f;
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var digits = '0123456789abcdef';
var floor = Math.floor,
  random = Math.random;
var _default = exports["default"] = function _default() {
  var code = '#';
  for (var i = 0; i < 6; i++) {
    code += digits.charAt(floor(random() * 16));
  }
  return new _Color["default"](code, 'hex');
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.analyze = analyze;
exports.limits = limits;
var _type = _interopRequireDefault(__webpack_require__(7));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var log = Math.log,
  pow = Math.pow,
  floor = Math.floor,
  abs = Math.abs;
function analyze(data, key) {
  if (key === void 0) {
    key = null;
  }
  var r = {
    min: Number.MAX_VALUE,
    max: Number.MAX_VALUE * -1,
    sum: 0,
    values: [],
    count: 0
  };
  if ((0, _type["default"])(data) === 'object') {
    data = Object.values(data);
  }
  data.forEach(function (val) {
    if (key && (0, _type["default"])(val) === 'object') val = val[key];
    if (val !== undefined && val !== null && !isNaN(val)) {
      r.values.push(val);
      r.sum += val;
      if (val < r.min) r.min = val;
      if (val > r.max) r.max = val;
      r.count += 1;
    }
  });
  r.domain = [r.min, r.max];
  r.limits = function (mode, num) {
    return limits(r, mode, num);
  };
  return r;
}
function limits(data, mode, num) {
  if (mode === void 0) {
    mode = 'equal';
  }
  if (num === void 0) {
    num = 7;
  }
  if ((0, _type["default"])(data) == 'array') {
    data = analyze(data);
  }
  var _data = data,
    min = _data.min,
    max = _data.max;
  var values = data.values.sort(function (a, b) {
    return a - b;
  });
  if (num === 1) {
    return [min, max];
  }
  var limits = [];
  if (mode.substr(0, 1) === 'c') {
    limits.push(min);
    limits.push(max);
  }
  if (mode.substr(0, 1) === 'e') {
    limits.push(min);
    for (var i = 1; i < num; i++) {
      limits.push(min + i / num * (max - min));
    }
    limits.push(max);
  } else if (mode.substr(0, 1) === 'l') {
    if (min <= 0) {
      throw new Error('Logarithmic scales are only possible for values > 0');
    }
    var min_log = Math.LOG10E * log(min);
    var max_log = Math.LOG10E * log(max);
    limits.push(min);
    for (var _i = 1; _i < num; _i++) {
      limits.push(pow(10, min_log + _i / num * (max_log - min_log)));
    }
    limits.push(max);
  } else if (mode.substr(0, 1) === 'q') {
    limits.push(min);
    for (var _i2 = 1; _i2 < num; _i2++) {
      var p = (values.length - 1) * _i2 / num;
      var pb = floor(p);
      if (pb === p) {
        limits.push(values[pb]);
      } else {
        var pr = p - pb;
        limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
      }
    }
    limits.push(max);
  } else if (mode.substr(0, 1) === 'k') {
    var cluster;
    var n = values.length;
    var assignments = new Array(n);
    var clusterSizes = new Array(num);
    var repeat = true;
    var nb_iters = 0;
    var centroids = null;
    centroids = [];
    centroids.push(min);
    for (var _i3 = 1; _i3 < num; _i3++) {
      centroids.push(min + _i3 / num * (max - min));
    }
    centroids.push(max);
    while (repeat) {
      for (var j = 0; j < num; j++) {
        clusterSizes[j] = 0;
      }
      for (var _i4 = 0; _i4 < n; _i4++) {
        var value = values[_i4];
        var mindist = Number.MAX_VALUE;
        var best = void 0;
        for (var _j = 0; _j < num; _j++) {
          var dist = abs(centroids[_j] - value);
          if (dist < mindist) {
            mindist = dist;
            best = _j;
          }
          clusterSizes[best]++;
          assignments[_i4] = best;
        }
      }
      var newCentroids = new Array(num);
      for (var _j2 = 0; _j2 < num; _j2++) {
        newCentroids[_j2] = null;
      }
      for (var _i5 = 0; _i5 < n; _i5++) {
        cluster = assignments[_i5];
        if (newCentroids[cluster] === null) {
          newCentroids[cluster] = values[_i5];
        } else {
          newCentroids[cluster] += values[_i5];
        }
      }
      for (var _j3 = 0; _j3 < num; _j3++) {
        newCentroids[_j3] *= 1 / clusterSizes[_j3];
      }
      repeat = false;
      for (var _j4 = 0; _j4 < num; _j4++) {
        if (newCentroids[_j4] !== centroids[_j4]) {
          repeat = true;
          break;
        }
      }
      centroids = newCentroids;
      nb_iters++;
      if (nb_iters > 200) {
        repeat = false;
      }
    }
    var kClusters = {};
    for (var _j5 = 0; _j5 < num; _j5++) {
      kClusters[_j5] = [];
    }
    for (var _i6 = 0; _i6 < n; _i6++) {
      cluster = assignments[_i6];
      kClusters[cluster].push(values[_i6]);
    }
    var tmpKMeansBreaks = [];
    for (var _j6 = 0; _j6 < num; _j6++) {
      tmpKMeansBreaks.push(kClusters[_j6][0]);
      tmpKMeansBreaks.push(kClusters[_j6][kClusters[_j6].length - 1]);
    }
    tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a, b) {
      return a - b;
    });
    limits.push(tmpKMeansBreaks[0]);
    for (var _i7 = 1; _i7 < tmpKMeansBreaks.length; _i7 += 2) {
      var v = tmpKMeansBreaks[_i7];
      if (!isNaN(v) && limits.indexOf(v) === -1) {
        limits.push(v);
      }
    }
  }
  return limits;
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
__webpack_require__(33);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(a, b) {
  a = new _Color["default"](a);
  b = new _Color["default"](b);
  var l1 = a.luminance();
  var l2 = b.luminance();
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = _default;
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var sqrt = Math.sqrt,
  pow = Math.pow,
  min = Math.min,
  max = Math.max,
  atan2 = Math.atan2,
  abs = Math.abs,
  cos = Math.cos,
  sin = Math.sin,
  exp = Math.exp,
  PI = Math.PI;
function _default(a, b, Kl, Kc, Kh) {
  if (Kl === void 0) {
    Kl = 1;
  }
  if (Kc === void 0) {
    Kc = 1;
  }
  if (Kh === void 0) {
    Kh = 1;
  }
  var rad2deg = function rad2deg(rad) {
    return 360 * rad / (2 * PI);
  };
  var deg2rad = function deg2rad(deg) {
    return 2 * PI * deg / 360;
  };
  a = new _Color["default"](a);
  b = new _Color["default"](b);
  var _Array$from = Array.from(a.lab()),
    L1 = _Array$from[0],
    a1 = _Array$from[1],
    b1 = _Array$from[2];
  var _Array$from2 = Array.from(b.lab()),
    L2 = _Array$from2[0],
    a2 = _Array$from2[1],
    b2 = _Array$from2[2];
  var avgL = (L1 + L2) / 2;
  var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
  var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
  var avgC = (C1 + C2) / 2;
  var G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
  var a1p = a1 * (1 + G);
  var a2p = a2 * (1 + G);
  var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
  var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
  var avgCp = (C1p + C2p) / 2;
  var arctan1 = rad2deg(atan2(b1, a1p));
  var arctan2 = rad2deg(atan2(b2, a2p));
  var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
  var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
  var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
  var T = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
  var deltaHp = h2p - h1p;
  deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
  deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
  var deltaL = L2 - L1;
  var deltaCp = C2p - C1p;
  var sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
  var sc = 1 + 0.045 * avgCp;
  var sh = 1 + 0.015 * avgCp * T;
  var deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
  var Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
  var Rt = -Rc * sin(2 * deg2rad(deltaTheta));
  var result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
  return max(0, min(100, result));
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = _default;
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default(a, b, mode) {
  if (mode === void 0) {
    mode = 'lab';
  }
  a = new _Color["default"](a);
  b = new _Color["default"](b);
  var l1 = a.get(mode);
  var l2 = b.get(mode);
  var sum_sq = 0;
  for (var i in l1) {
    var d = (l1[i] || 0) - (l2[i] || 0);
    sum_sq += d * d;
  }
  return Math.sqrt(sum_sq);
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _Color = _interopRequireDefault(__webpack_require__(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var _default = exports["default"] = function _default() {
  try {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _construct(_Color["default"], args);
    return true;
  } catch (e) {
    return false;
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _chroma = _interopRequireDefault(__webpack_require__(2));
__webpack_require__(10);
var _scale = _interopRequireDefault(__webpack_require__(12));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  cool: function cool() {
    return (0, _scale["default"])([_chroma["default"].hsl(180, 1, 0.9), _chroma["default"].hsl(250, 0.7, 0.4)]);
  },
  hot: function hot() {
    return (0, _scale["default"])(['#000', '#f00', '#ff0', '#fff'], [0, 0.25, 0.75, 1]).mode('rgb');
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var colorbrewer = {
  OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
  PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
  BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
  Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
  BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
  YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
  YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
  Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
  RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
  Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
  YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
  Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
  GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
  Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
  YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
  PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
  Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
  PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
  Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],
  Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
  RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
  RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
  PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
  PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
  RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
  BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
  RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
  PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],
  Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
  Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
  Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
  Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
  Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
  Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
  Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
  Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
};
for (var _i = 0, _Object$keys = Object.keys(colorbrewer); _i < _Object$keys.length; _i++) {
  var key = _Object$keys[_i];
  colorbrewer[key.toLowerCase()] = colorbrewer[key];
}
var _default = exports["default"] = colorbrewer;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.passesAA = passesAA;
function passesAA(contrast, large) {
  if (large === void 0) {
    large = false;
  }
  if (large) {
    return contrast > 3;
  }
  return contrast > 4.5;
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.passesAAA = passesAAA;
function passesAAA(contrast, large) {
  if (large === void 0) {
    large = false;
  }
  if (large) {
    return contrast > 4.5;
  }
  return contrast > 7;
}

/***/ })
/******/ ])));