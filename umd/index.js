(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chrys"] = factory();
	else
		root["chrys"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var _exportNames = {
  passesAA: true,
  passesAAA: true,
  bestColorContrast: true,
  BOKEH: true,
  VEGA: true,
  CATEGORICAL_PALETTE_VENDORS: true,
  DIVERGING_PALETTE_VENDORS: true,
  SEQUENTIAL_PALETTE_VENDORS: true,
  CYCLICAL_PALETTE_VENDORS: true,
  parsePaletteName: true,
  toDiscretePalette: true,
  discretePalette: true,
  docsPalette: true
};
exports.parsePaletteName = parsePaletteName;
exports.toDiscretePalette = toDiscretePalette;
exports.discretePalette = discretePalette;
exports.docsPalette = docsPalette;
exports.CYCLICAL_PALETTE_VENDORS = exports.SEQUENTIAL_PALETTE_VENDORS = exports.DIVERGING_PALETTE_VENDORS = exports.CATEGORICAL_PALETTE_VENDORS = exports.VEGA = exports.BOKEH = exports.bestColorContrast = exports.passesAAA = exports.passesAA = void 0;

var _passesAA = __webpack_require__(0);

exports.passesAA = _passesAA.passesAA;

var _passesAAA = __webpack_require__(1);

exports.passesAAA = _passesAAA.passesAAA;

var _bestColorContrast = __webpack_require__(3);

exports.bestColorContrast = _bestColorContrast.bestColorContrast;

var _bokehPalettes = __webpack_require__(5);

Object.keys(_bokehPalettes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bokehPalettes[key]) return;
  exports[key] = _bokehPalettes[key];
});

var _vegaPalettes = __webpack_require__(6);

Object.keys(_vegaPalettes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _vegaPalettes[key]) return;
  exports[key] = _vegaPalettes[key];
});

var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _ref40, _ref41, _ref42, _ref43, _ref44, _ref45, _ref46, _ref47, _ref48, _ref49, _ref50, _ref51, _ref52, _ref53, _ref54, _ref55, _ref56, _ref57, _ref58, _ref59, _ref60, _ref61, _ref62, _ref63, _ref64, _ref65, _ref66;

var BOKEH = 'bokeh';
exports.BOKEH = BOKEH;
var VEGA = 'vega';
exports.VEGA = VEGA;
var CATEGORICAL_PALETTE_VENDORS = [(_ref = {}, _ref[BOKEH] = _bokehPalettes.BOKEH_ACCENT, _ref[VEGA] = _vegaPalettes.VEGA_ACCENT, _ref), (_ref2 = {}, _ref2[BOKEH] = _bokehPalettes.BOKEH_CATEGORY_10, _ref2[VEGA] = _vegaPalettes.VEGA_CATEGORY_10, _ref2), (_ref3 = {}, _ref3[BOKEH] = _bokehPalettes.BOKEH_CATEGORY_20, _ref3[VEGA] = _vegaPalettes.VEGA_CATEGORY_20, _ref3), (_ref4 = {}, _ref4[BOKEH] = _bokehPalettes.BOKEH_CATEGORY_20_B, _ref4[VEGA] = _vegaPalettes.VEGA_CATEGORY_20_B, _ref4), (_ref5 = {}, _ref5[BOKEH] = _bokehPalettes.BOKEH_CATEGORY_20_C, _ref5[VEGA] = _vegaPalettes.VEGA_CATEGORY_20_C, _ref5), (_ref6 = {}, _ref6[BOKEH] = _bokehPalettes.BOKEH_DARK_2, _ref6[VEGA] = _vegaPalettes.VEGA_DARK_2, _ref6), (_ref7 = {}, _ref7[BOKEH] = _bokehPalettes.BOKEH_PAIRED, _ref7[VEGA] = _vegaPalettes.VEGA_PAIRED, _ref7), (_ref8 = {}, _ref8[BOKEH] = _bokehPalettes.BOKEH_PASTEL_1, _ref8[VEGA] = _vegaPalettes.VEGA_PASTEL_1, _ref8), (_ref9 = {}, _ref9[BOKEH] = _bokehPalettes.BOKEH_PASTEL_2, _ref9[VEGA] = _vegaPalettes.VEGA_PASTEL_2, _ref9), (_ref10 = {}, _ref10[BOKEH] = _bokehPalettes.BOKEH_SET_1, _ref10[VEGA] = _vegaPalettes.VEGA_SET_1, _ref10), (_ref11 = {}, _ref11[BOKEH] = _bokehPalettes.BOKEH_SET_2, _ref11[VEGA] = _vegaPalettes.VEGA_SET_2, _ref11), (_ref12 = {}, _ref12[BOKEH] = _bokehPalettes.BOKEH_SET_3, _ref12[VEGA] = _vegaPalettes.VEGA_SET_3, _ref12), (_ref13 = {}, _ref13[BOKEH] = undefined, _ref13[VEGA] = _vegaPalettes.VEGA_TABLEAU_10, _ref13), (_ref14 = {}, _ref14[BOKEH] = undefined, _ref14[VEGA] = _vegaPalettes.VEGA_TABLEAU_20, _ref14), (_ref15 = {}, _ref15[BOKEH] = _bokehPalettes.BOKEH_COLORBLIND, _ref15[VEGA] = undefined, _ref15)];
exports.CATEGORICAL_PALETTE_VENDORS = CATEGORICAL_PALETTE_VENDORS;
var DIVERGING_PALETTE_VENDORS = [(_ref16 = {}, _ref16[BOKEH] = undefined, _ref16[VEGA] = _vegaPalettes.VEGA_BLUE_ORANGE, _ref16), (_ref17 = {}, _ref17[BOKEH] = _bokehPalettes.BOKEH_BROWN_BLUE_GREEN, _ref17[VEGA] = _vegaPalettes.VEGA_BROWN_BLUE_GREEN, _ref17), (_ref18 = {}, _ref18[BOKEH] = _bokehPalettes.BOKEH_PURPLE_GREEN, _ref18[VEGA] = _vegaPalettes.VEGA_PURPLE_GREEN, _ref18), (_ref19 = {}, _ref19[BOKEH] = _bokehPalettes.BOKEH_PINK_YELLOW_GREEN, _ref19[VEGA] = _vegaPalettes.VEGA_PINK_YELLOW_GREEN, _ref19), (_ref20 = {}, _ref20[BOKEH] = _bokehPalettes.BOKEH_PURPLE_ORANGE, _ref20[VEGA] = _vegaPalettes.VEGA_PURPLE_ORANGE, _ref20), (_ref21 = {}, _ref21[BOKEH] = _bokehPalettes.BOKEH_RED_BLUE, _ref21[VEGA] = _vegaPalettes.VEGA_RED_BLUE, _ref21), (_ref22 = {}, _ref22[BOKEH] = _bokehPalettes.BOKEH_RED_GREY, _ref22[VEGA] = _vegaPalettes.VEGA_RED_GREY, _ref22), (_ref23 = {}, _ref23[BOKEH] = _bokehPalettes.BOKEH_RED_YELLOW_BLUE, _ref23[VEGA] = _vegaPalettes.VEGA_RED_YELLOW_BLUE, _ref23), (_ref24 = {}, _ref24[BOKEH] = _bokehPalettes.BOKEH_RED_YELLOW_GREEN, _ref24[VEGA] = _vegaPalettes.VEGA_RED_YELLOW_GREEN, _ref24), (_ref25 = {}, _ref25[BOKEH] = _bokehPalettes.BOKEH_SPECTRAL, _ref25[VEGA] = _vegaPalettes.VEGA_SPECTRAL, _ref25)];
exports.DIVERGING_PALETTE_VENDORS = DIVERGING_PALETTE_VENDORS;
var SEQUENTIAL_PALETTE_VENDORS = [(_ref26 = {}, _ref26[BOKEH] = _bokehPalettes.BOKEH_BLUES, _ref26[VEGA] = _vegaPalettes.VEGA_BLUES, _ref26), (_ref27 = {}, _ref27[BOKEH] = undefined, _ref27[VEGA] = _vegaPalettes.VEGA_TEAL_BLUES, _ref27), (_ref28 = {}, _ref28[BOKEH] = undefined, _ref28[VEGA] = _vegaPalettes.VEGA_TEALS, _ref28), (_ref29 = {}, _ref29[BOKEH] = _bokehPalettes.BOKEH_GREENS, _ref29[VEGA] = _vegaPalettes.VEGA_GREENS, _ref29), (_ref30 = {}, _ref30[BOKEH] = undefined, _ref30[VEGA] = _vegaPalettes.VEGA_BROWNS, _ref30), (_ref31 = {}, _ref31[BOKEH] = _bokehPalettes.BOKEH_ORANGES, _ref31[VEGA] = _vegaPalettes.VEGA_ORANGES, _ref31), (_ref32 = {}, _ref32[BOKEH] = _bokehPalettes.BOKEH_REDS, _ref32[VEGA] = _vegaPalettes.VEGA_REDS, _ref32), (_ref33 = {}, _ref33[BOKEH] = _bokehPalettes.BOKEH_PURPLES, _ref33[VEGA] = _vegaPalettes.VEGA_PURPLES, _ref33), (_ref34 = {}, _ref34[BOKEH] = undefined, _ref34[VEGA] = _vegaPalettes.VEGA_WARM_GREYS, _ref34), (_ref35 = {}, _ref35[BOKEH] = _bokehPalettes.BOKEH_GREYS, _ref35[VEGA] = _vegaPalettes.VEGA_GREYS, _ref35), (_ref36 = {}, _ref36[BOKEH] = _bokehPalettes.BOKEH_VIRIDIS, _ref36[VEGA] = _vegaPalettes.VEGA_VIRIDIS, _ref36), (_ref37 = {}, _ref37[BOKEH] = _bokehPalettes.BOKEH_MAGMA, _ref37[VEGA] = _vegaPalettes.VEGA_MAGMA, _ref37), (_ref38 = {}, _ref38[BOKEH] = _bokehPalettes.BOKEH_INFERNO, _ref38[VEGA] = _vegaPalettes.VEGA_INFERNO, _ref38), (_ref39 = {}, _ref39[BOKEH] = _bokehPalettes.BOKEH_PLASMA, _ref39[VEGA] = _vegaPalettes.VEGA_PLASMA, _ref39), (_ref40 = {}, _ref40[BOKEH] = _bokehPalettes.BOKEH_BLUE_GREEN, _ref40[VEGA] = _vegaPalettes.VEGA_BLUE_GREEN, _ref40), (_ref41 = {}, _ref41[BOKEH] = _bokehPalettes.BOKEH_BLUE_PURPLE, _ref41[VEGA] = _vegaPalettes.VEGA_BLUE_PURPLE, _ref41), (_ref42 = {}, _ref42[BOKEH] = undefined, _ref42[VEGA] = _vegaPalettes.VEGA_GOLD_GREEN, _ref42), (_ref43 = {}, _ref43[BOKEH] = undefined, _ref43[VEGA] = _vegaPalettes.VEGA_GOLD_ORANGE, _ref43), (_ref44 = {}, _ref44[BOKEH] = undefined, _ref44[VEGA] = _vegaPalettes.VEGA_GOLD_RED, _ref44), (_ref45 = {}, _ref45[BOKEH] = _bokehPalettes.BOKEH_GREEN_BLUE, _ref45[VEGA] = _vegaPalettes.VEGA_GREEN_BLUE, _ref45), (_ref46 = {}, _ref46[BOKEH] = _bokehPalettes.BOKEH_ORANGE_RED, _ref46[VEGA] = _vegaPalettes.VEGA_ORANGE_RED, _ref46), (_ref47 = {}, _ref47[BOKEH] = _bokehPalettes.BOKEH_PURPLE_BLUE_GREEN, _ref47[VEGA] = _vegaPalettes.VEGA_PURPLE_BLUE_GREEN, _ref47), (_ref48 = {}, _ref48[BOKEH] = _bokehPalettes.BOKEH_PURPLE_BLUE, _ref48[VEGA] = _vegaPalettes.VEGA_PURPLE_BLUE, _ref48), (_ref49 = {}, _ref49[BOKEH] = _bokehPalettes.BOKEH_PURPLE_RED, _ref49[VEGA] = _vegaPalettes.VEGA_PURPLE_RED, _ref49), (_ref50 = {}, _ref50[BOKEH] = _bokehPalettes.BOKEH_RED_PURPLE, _ref50[VEGA] = _vegaPalettes.VEGA_RED_PURPLE, _ref50), (_ref51 = {}, _ref51[BOKEH] = _bokehPalettes.BOKEH_YELLOW_GREEN_BLUE, _ref51[VEGA] = _vegaPalettes.VEGA_YELLOW_GREEN_BLUE, _ref51), (_ref52 = {}, _ref52[BOKEH] = _bokehPalettes.BOKEH_YELLOW_GREEN, _ref52[VEGA] = _vegaPalettes.VEGA_YELLOW_GREEN, _ref52), (_ref53 = {}, _ref53[BOKEH] = _bokehPalettes.BOKEH_YELLOW_ORANGE_BROWN, _ref53[VEGA] = _vegaPalettes.VEGA_YELLOW_ORANGE_BROWN, _ref53), (_ref54 = {}, _ref54[BOKEH] = _bokehPalettes.BOKEH_YELLOW_ORANGE_RED, _ref54[VEGA] = _vegaPalettes.VEGA_YELLOW_ORANGE_RED, _ref54), (_ref55 = {}, _ref55[BOKEH] = undefined, _ref55[VEGA] = _vegaPalettes.VEGA_DARK_BLUE, _ref55), (_ref56 = {}, _ref56[BOKEH] = undefined, _ref56[VEGA] = _vegaPalettes.VEGA_DARK_GOLD, _ref56), (_ref57 = {}, _ref57[BOKEH] = undefined, _ref57[VEGA] = _vegaPalettes.VEGA_DARK_GREEN, _ref57), (_ref58 = {}, _ref58[BOKEH] = undefined, _ref58[VEGA] = _vegaPalettes.VEGA_DARK_MULTI, _ref58), (_ref59 = {}, _ref59[BOKEH] = undefined, _ref59[VEGA] = _vegaPalettes.VEGA_DARK_RED, _ref59), (_ref60 = {}, _ref60[BOKEH] = undefined, _ref60[VEGA] = _vegaPalettes.VEGA_LIGHT_GREY_RED, _ref60), (_ref61 = {}, _ref61[BOKEH] = undefined, _ref61[VEGA] = _vegaPalettes.VEGA_LIGHT_GREY_TEAL, _ref61), (_ref62 = {}, _ref62[BOKEH] = undefined, _ref62[VEGA] = _vegaPalettes.VEGA_LIGHT_MULTI, _ref62), (_ref63 = {}, _ref63[BOKEH] = undefined, _ref63[VEGA] = _vegaPalettes.VEGA_LIGHT_ORANGE, _ref63), (_ref64 = {}, _ref64[BOKEH] = undefined, _ref64[VEGA] = _vegaPalettes.VEGA_LIGHT_TEAL_BLUE, _ref64)];
exports.SEQUENTIAL_PALETTE_VENDORS = SEQUENTIAL_PALETTE_VENDORS;
var CYCLICAL_PALETTE_VENDORS = [(_ref65 = {}, _ref65[BOKEH] = undefined, _ref65[VEGA] = _vegaPalettes.VEGA_RAINBOW, _ref65), (_ref66 = {}, _ref66[BOKEH] = undefined, _ref66[VEGA] = _vegaPalettes.VEGA_SINEBOW, _ref66)];
exports.CYCLICAL_PALETTE_VENDORS = CYCLICAL_PALETTE_VENDORS;
var PALETTE_TO_VENDOR_MAP = {};
[DIVERGING_PALETTE_VENDORS, CATEGORICAL_PALETTE_VENDORS, SEQUENTIAL_PALETTE_VENDORS, CYCLICAL_PALETTE_VENDORS].forEach(function (mappings) {
  mappings.forEach(function (mapping) {
    Object.keys(mapping).forEach(function (vendor) {
      var name = mapping[vendor];

      if (name) {
        PALETTE_TO_VENDOR_MAP[name] = vendor;
      }
    });
  });
});
var BOKEH_CONTINUOUS_PALETTE_NAMES = Object.keys(_bokehPalettes.BOKEH_PALETTE_DATA).filter(function (name) {
  return ~Object.keys(_bokehPalettes.BOKEH_PALETTE_DATA[name]).indexOf(256);
});
var VEGA_CONTINUOUS_PALETTE_NAMES = Object.keys(_vegaPalettes.VEGA_PALETTE_DATA).filter(function (name) {
  return ~Object.keys(_vegaPalettes.VEGA_PALETTE_DATA[name]).indexOf(256);
});

function parsePaletteName(name) {
  if (!Object.prototype.hasOwnProperty.call(PALETTE_TO_VENDOR_MAP, name)) {
    throw new Error("Palette name \"" + name + "\" no recognized.");
  }

  var vendor = PALETTE_TO_VENDOR_MAP[name];
  var palette = name.substring(vendor.length + 1);
  return {
    vendor: vendor,
    palette: palette
  };
}

function getPalette(name) {
  var _parsePaletteName = parsePaletteName(name),
      vendor = _parsePaletteName.vendor;

  if (vendor === BOKEH) {
    return _bokehPalettes.BOKEH_PALETTE_DATA[name];
  } else if (vendor === VEGA) {
    return _vegaPalettes.VEGA_PALETTE_DATA[name];
  }

  throw new Error("Vendor \"" + vendor + "\" no recognized.");
}

function getDocsPalette(name) {
  var _parsePaletteName2 = parsePaletteName(name),
      vendor = _parsePaletteName2.vendor;

  if (vendor === BOKEH) {
    return _bokehPalettes.BOKEH_DOCS_PALETTE_DATA[name];
  } else if (vendor === VEGA) {
    return _vegaPalettes.VEGA_DOCS_PALETTE_DATA[name];
  }

  throw new Error("Vendor \"" + vendor + "\" no recognized.");
}

function isContinuous(name) {
  var _parsePaletteName3 = parsePaletteName(name),
      vendor = _parsePaletteName3.vendor;

  if (vendor === BOKEH) {
    return Object.prototype.hasOwnProperty.call(BOKEH_CONTINUOUS_PALETTE_NAMES, name);
  } else if (vendor === VEGA) {
    return Object.prototype.hasOwnProperty.call(VEGA_CONTINUOUS_PALETTE_NAMES, name);
  }

  throw new Error("Vendor \"" + vendor + "\" no recognized.");
}

function toDiscretePalette(palette, n, asRgb) {
  if (n === void 0) {
    n = 6;
  }

  if (asRgb === void 0) {
    asRgb = false;
  }

  var sizes = Object.keys(palette).map(Number);
  var nClamped = Math.min(Math.max.apply(Math, sizes), Math.max(Math.min.apply(Math, sizes), n));
  var result = palette[nClamped + ''].slice(0, n);
  return result;
}

function discretePalette(name, n, asRgb) {
  if (n === void 0) {
    n = 6;
  }

  if (asRgb === void 0) {
    asRgb = false;
  }

  return toDiscretePalette(getPalette(name), n, asRgb);
}

function docsPalette(name, asRgb) {
  if (asRgb === void 0) {
    asRgb = false;
  }

  var result = getDocsPalette(name);
  return result;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.bestColorContrast = bestColorContrast;

var _chromaJs = _interopRequireDefault(__webpack_require__(4));

var _passesAA = __webpack_require__(0);

var _passesAAA = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */
(function (global, factory) {
   true ? module.exports = factory() : undefined;
})(void 0, function () {
  'use strict';

  var limit = function limit(x, min, max) {
    if (min === void 0) min = 0;
    if (max === void 0) max = 1;
    return x < min ? min : x > max ? max : x;
  };

  var clip_rgb = function clip_rgb(rgb) {
    rgb._clipped = false;
    rgb._unclipped = rgb.slice(0);

    for (var i = 0; i <= 3; i++) {
      if (i < 3) {
        if (rgb[i] < 0 || rgb[i] > 255) {
          rgb._clipped = true;
        }

        rgb[i] = limit(rgb[i], 0, 255);
      } else if (i === 3) {
        rgb[i] = limit(rgb[i], 0, 1);
      }
    }

    return rgb;
  };

  var classToType = {};

  for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
    var name = list[i];
    classToType["[object " + name + "]"] = name.toLowerCase();
  }

  var type = function type(obj) {
    return classToType[Object.prototype.toString.call(obj)] || "object";
  };

  var unpack = function unpack(args, keyOrder) {
    if (keyOrder === void 0) keyOrder = null;

    if (args.length >= 3) {
      return Array.prototype.slice.call(args);
    }

    if (type(args[0]) == 'object' && keyOrder) {
      return keyOrder.split('').filter(function (k) {
        return args[0][k] !== undefined;
      }).map(function (k) {
        return args[0][k];
      });
    }

    return args[0];
  };

  var last = function last(args) {
    if (args.length < 2) {
      return null;
    }

    var l = args.length - 1;

    if (type(args[l]) == 'string') {
      return args[l].toLowerCase();
    }

    return null;
  };

  var PI = Math.PI;
  var utils = {
    clip_rgb: clip_rgb,
    limit: limit,
    type: type,
    unpack: unpack,
    last: last,
    PI: PI,
    TWOPI: PI * 2,
    PITHIRD: PI / 3,
    DEG2RAD: PI / 180,
    RAD2DEG: 180 / PI
  };
  var input = {
    format: {},
    autodetect: []
  };
  var last$1 = utils.last;
  var clip_rgb$1 = utils.clip_rgb;
  var type$1 = utils.type;

  var Color = function Color() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var me = this;

    if (type$1(args[0]) === 'object' && args[0].constructor && args[0].constructor === this.constructor) {
      return args[0];
    }

    var mode = last$1(args);
    var autodetect = false;

    if (!mode) {
      autodetect = true;

      if (!input.sorted) {
        input.autodetect = input.autodetect.sort(function (a, b) {
          return b.p - a.p;
        });
        input.sorted = true;
      }

      for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
        var chk = list[i];
        mode = chk.test.apply(chk, args);

        if (mode) {
          break;
        }
      }
    }

    if (input.format[mode]) {
      var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
      me._rgb = clip_rgb$1(rgb);
    } else {
      throw new Error('unknown format: ' + args);
    }

    if (me._rgb.length === 3) {
      me._rgb.push(1);
    }
  };

  Color.prototype.toString = function toString() {
    if (type$1(this.hex) == 'function') {
      return this.hex();
    }

    return "[" + this._rgb.join(',') + "]";
  };

  var Color_1 = Color;

  var chroma = function chroma() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(chroma.Color, [null].concat(args)))();
  };

  chroma.Color = Color_1;
  chroma.version = '2.1.1';
  var chroma_1 = chroma;
  var unpack$1 = utils.unpack;
  var max = Math.max;

  var rgb2cmyk = function rgb2cmyk() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$1(args, 'rgb');
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
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

  var rgb2cmyk_1 = rgb2cmyk;
  var unpack$2 = utils.unpack;

  var cmyk2rgb = function cmyk2rgb() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$2(args, 'cmyk');
    var c = args[0];
    var m = args[1];
    var y = args[2];
    var k = args[3];
    var alpha = args.length > 4 ? args[4] : 1;

    if (k === 1) {
      return [0, 0, 0, alpha];
    }

    return [c >= 1 ? 0 : 255 * (1 - c) * (1 - k), m >= 1 ? 0 : 255 * (1 - m) * (1 - k), y >= 1 ? 0 : 255 * (1 - y) * (1 - k), alpha];
  };

  var cmyk2rgb_1 = cmyk2rgb;
  var unpack$3 = utils.unpack;
  var type$2 = utils.type;

  Color_1.prototype.cmyk = function () {
    return rgb2cmyk_1(this._rgb);
  };

  chroma_1.cmyk = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['cmyk'])))();
  };

  input.format.cmyk = cmyk2rgb_1;
  input.autodetect.push({
    p: 2,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      args = unpack$3(args, 'cmyk');

      if (type$2(args) === 'array' && args.length === 4) {
        return 'cmyk';
      }
    }
  });
  var unpack$4 = utils.unpack;
  var last$2 = utils.last;

  var rnd = function rnd(a) {
    return Math.round(a * 100) / 100;
  };

  var hsl2css = function hsl2css() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var hsla = unpack$4(args, 'hsla');
    var mode = last$2(args) || 'lsa';
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

  var hsl2css_1 = hsl2css;
  var unpack$5 = utils.unpack;

  var rgb2hsl = function rgb2hsl() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$5(args, 'rgba');
    var r = args[0];
    var g = args[1];
    var b = args[2];
    r /= 255;
    g /= 255;
    b /= 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var l = (max + min) / 2;
    var s, h;

    if (max === min) {
      s = 0;
      h = Number.NaN;
    } else {
      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }

    if (r == max) {
      h = (g - b) / (max - min);
    } else if (g == max) {
      h = 2 + (b - r) / (max - min);
    } else if (b == max) {
      h = 4 + (r - g) / (max - min);
    }

    h *= 60;

    if (h < 0) {
      h += 360;
    }

    if (args.length > 3 && args[3] !== undefined) {
      return [h, s, l, args[3]];
    }

    return [h, s, l];
  };

  var rgb2hsl_1 = rgb2hsl;
  var unpack$6 = utils.unpack;
  var last$3 = utils.last;
  var round = Math.round;

  var rgb2css = function rgb2css() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var rgba = unpack$6(args, 'rgba');
    var mode = last$3(args) || 'rgb';

    if (mode.substr(0, 3) == 'hsl') {
      return hsl2css_1(rgb2hsl_1(rgba), mode);
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

  var rgb2css_1 = rgb2css;
  var unpack$7 = utils.unpack;
  var round$1 = Math.round;

  var hsl2rgb = function hsl2rgb() {
    var assign;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$7(args, 'hsl');
    var h = args[0];
    var s = args[1];
    var l = args[2];
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
        if (t3[i] < 0) {
          t3[i] += 1;
        }

        if (t3[i] > 1) {
          t3[i] -= 1;
        }

        if (6 * t3[i] < 1) {
          c[i] = t1 + (t2 - t1) * 6 * t3[i];
        } else if (2 * t3[i] < 1) {
          c[i] = t2;
        } else if (3 * t3[i] < 2) {
          c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
        } else {
          c[i] = t1;
        }
      }

      assign = [round$1(c[0] * 255), round$1(c[1] * 255), round$1(c[2] * 255)], r = assign[0], g = assign[1], b = assign[2];
    }

    if (args.length > 3) {
      return [r, g, b, args[3]];
    }

    return [r, g, b, 1];
  };

  var hsl2rgb_1 = hsl2rgb;
  var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
  var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
  var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
  var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
  var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
  var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
  var round$2 = Math.round;

  var css2rgb = function css2rgb(css) {
    css = css.toLowerCase().trim();
    var m;

    if (input.format.named) {
      try {
        return input.format.named(css);
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
      var rgb$1 = m.slice(1, 5);

      for (var i$1 = 0; i$1 < 4; i$1++) {
        rgb$1[i$1] = +rgb$1[i$1];
      }

      return rgb$1;
    }

    if (m = css.match(RE_RGB_PCT)) {
      var rgb$2 = m.slice(1, 4);

      for (var i$2 = 0; i$2 < 3; i$2++) {
        rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
      }

      rgb$2[3] = 1;
      return rgb$2;
    }

    if (m = css.match(RE_RGBA_PCT)) {
      var rgb$3 = m.slice(1, 5);

      for (var i$3 = 0; i$3 < 3; i$3++) {
        rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
      }

      rgb$3[3] = +rgb$3[3];
      return rgb$3;
    }

    if (m = css.match(RE_HSL)) {
      var hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      var rgb$4 = hsl2rgb_1(hsl);
      rgb$4[3] = 1;
      return rgb$4;
    }

    if (m = css.match(RE_HSLA)) {
      var hsl$1 = m.slice(1, 4);
      hsl$1[1] *= 0.01;
      hsl$1[2] *= 0.01;
      var rgb$5 = hsl2rgb_1(hsl$1);
      rgb$5[3] = +m[4];
      return rgb$5;
    }
  };

  css2rgb.test = function (s) {
    return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
  };

  var css2rgb_1 = css2rgb;
  var type$3 = utils.type;

  Color_1.prototype.css = function (mode) {
    return rgb2css_1(this._rgb, mode);
  };

  chroma_1.css = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['css'])))();
  };

  input.format.css = css2rgb_1;
  input.autodetect.push({
    p: 5,
    test: function test(h) {
      var rest = [],
          len = arguments.length - 1;

      while (len-- > 0) {
        rest[len] = arguments[len + 1];
      }

      if (!rest.length && type$3(h) === 'string' && css2rgb_1.test(h)) {
        return 'css';
      }
    }
  });
  var unpack$8 = utils.unpack;

  input.format.gl = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var rgb = unpack$8(args, 'rgba');
    rgb[0] *= 255;
    rgb[1] *= 255;
    rgb[2] *= 255;
    return rgb;
  };

  chroma_1.gl = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['gl'])))();
  };

  Color_1.prototype.gl = function () {
    var rgb = this._rgb;
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
  };

  var unpack$9 = utils.unpack;

  var rgb2hcg = function rgb2hcg() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$9(args, 'rgb');
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var c = delta * 100 / 255;

    var _g = min / (255 - delta) * 100;

    var h;

    if (delta === 0) {
      h = Number.NaN;
    } else {
      if (r === max) {
        h = (g - b) / delta;
      }

      if (g === max) {
        h = 2 + (b - r) / delta;
      }

      if (b === max) {
        h = 4 + (r - g) / delta;
      }

      h *= 60;

      if (h < 0) {
        h += 360;
      }
    }

    return [h, c, _g];
  };

  var rgb2hcg_1 = rgb2hcg;
  var unpack$a = utils.unpack;
  var floor = Math.floor;

  var hcg2rgb = function hcg2rgb() {
    var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$a(args, 'hcg');
    var h = args[0];
    var c = args[1];
    var _g = args[2];
    var r, g, b;
    _g = _g * 255;

    var _c = c * 255;

    if (c === 0) {
      r = g = b = _g;
    } else {
      if (h === 360) {
        h = 0;
      }

      if (h > 360) {
        h -= 360;
      }

      if (h < 0) {
        h += 360;
      }

      h /= 60;
      var i = floor(h);
      var f = h - i;
      var p = _g * (1 - c);
      var q = p + _c * (1 - f);
      var t = p + _c * f;
      var v = p + _c;

      switch (i) {
        case 0:
          assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
          break;

        case 1:
          assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
          break;

        case 2:
          assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
          break;

        case 3:
          assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
          break;

        case 4:
          assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
          break;

        case 5:
          assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
          break;
      }
    }

    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  var hcg2rgb_1 = hcg2rgb;
  var unpack$b = utils.unpack;
  var type$4 = utils.type;

  Color_1.prototype.hcg = function () {
    return rgb2hcg_1(this._rgb);
  };

  chroma_1.hcg = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['hcg'])))();
  };

  input.format.hcg = hcg2rgb_1;
  input.autodetect.push({
    p: 1,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      args = unpack$b(args, 'hcg');

      if (type$4(args) === 'array' && args.length === 3) {
        return 'hcg';
      }
    }
  });
  var unpack$c = utils.unpack;
  var last$4 = utils.last;
  var round$3 = Math.round;

  var rgb2hex = function rgb2hex() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$c(args, 'rgba');
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
    var a = ref[3];
    var mode = last$4(args) || 'auto';

    if (a === undefined) {
      a = 1;
    }

    if (mode === 'auto') {
      mode = a < 1 ? 'rgba' : 'rgb';
    }

    r = round$3(r);
    g = round$3(g);
    b = round$3(b);
    var u = r << 16 | g << 8 | b;
    var str = "000000" + u.toString(16);
    str = str.substr(str.length - 6);
    var hxa = '0' + round$3(a * 255).toString(16);
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

  var rgb2hex_1 = rgb2hex;
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
      var g = u >> 8 & 0xFF;
      var b = u & 0xFF;
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

      var u$1 = parseInt(hex, 16);
      var r$1 = u$1 >> 24 & 0xFF;
      var g$1 = u$1 >> 16 & 0xFF;
      var b$1 = u$1 >> 8 & 0xFF;
      var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
      return [r$1, g$1, b$1, a];
    }

    throw new Error("unknown hex color: " + hex);
  };

  var hex2rgb_1 = hex2rgb;
  var type$5 = utils.type;

  Color_1.prototype.hex = function (mode) {
    return rgb2hex_1(this._rgb, mode);
  };

  chroma_1.hex = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['hex'])))();
  };

  input.format.hex = hex2rgb_1;
  input.autodetect.push({
    p: 4,
    test: function test(h) {
      var rest = [],
          len = arguments.length - 1;

      while (len-- > 0) {
        rest[len] = arguments[len + 1];
      }

      if (!rest.length && type$5(h) === 'string' && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
        return 'hex';
      }
    }
  });
  var unpack$d = utils.unpack;
  var TWOPI = utils.TWOPI;
  var min = Math.min;
  var sqrt = Math.sqrt;
  var acos = Math.acos;

  var rgb2hsi = function rgb2hsi() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$d(args, 'rgb');
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
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
        h = TWOPI - h;
      }

      h /= TWOPI;
    }

    return [h * 360, s, i];
  };

  var rgb2hsi_1 = rgb2hsi;
  var unpack$e = utils.unpack;
  var limit$1 = utils.limit;
  var TWOPI$1 = utils.TWOPI;
  var PITHIRD = utils.PITHIRD;
  var cos = Math.cos;

  var hsi2rgb = function hsi2rgb() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$e(args, 'hsi');
    var h = args[0];
    var s = args[1];
    var i = args[2];
    var r, g, b;

    if (isNaN(h)) {
      h = 0;
    }

    if (isNaN(s)) {
      s = 0;
    }

    if (h > 360) {
      h -= 360;
    }

    if (h < 0) {
      h += 360;
    }

    h /= 360;

    if (h < 1 / 3) {
      b = (1 - s) / 3;
      r = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
      g = 1 - (b + r);
    } else if (h < 2 / 3) {
      h -= 1 / 3;
      r = (1 - s) / 3;
      g = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
      b = 1 - (r + g);
    } else {
      h -= 2 / 3;
      g = (1 - s) / 3;
      b = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
      r = 1 - (g + b);
    }

    r = limit$1(i * r * 3);
    g = limit$1(i * g * 3);
    b = limit$1(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
  };

  var hsi2rgb_1 = hsi2rgb;
  var unpack$f = utils.unpack;
  var type$6 = utils.type;

  Color_1.prototype.hsi = function () {
    return rgb2hsi_1(this._rgb);
  };

  chroma_1.hsi = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['hsi'])))();
  };

  input.format.hsi = hsi2rgb_1;
  input.autodetect.push({
    p: 2,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      args = unpack$f(args, 'hsi');

      if (type$6(args) === 'array' && args.length === 3) {
        return 'hsi';
      }
    }
  });
  var unpack$g = utils.unpack;
  var type$7 = utils.type;

  Color_1.prototype.hsl = function () {
    return rgb2hsl_1(this._rgb);
  };

  chroma_1.hsl = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['hsl'])))();
  };

  input.format.hsl = hsl2rgb_1;
  input.autodetect.push({
    p: 2,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      args = unpack$g(args, 'hsl');

      if (type$7(args) === 'array' && args.length === 3) {
        return 'hsl';
      }
    }
  });
  var unpack$h = utils.unpack;
  var min$1 = Math.min;
  var max$1 = Math.max;

  var rgb2hsl$1 = function rgb2hsl$1() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$h(args, 'rgb');
    var r = args[0];
    var g = args[1];
    var b = args[2];
    var min_ = min$1(r, g, b);
    var max_ = max$1(r, g, b);
    var delta = max_ - min_;
    var h, s, v;
    v = max_ / 255.0;

    if (max_ === 0) {
      h = Number.NaN;
      s = 0;
    } else {
      s = delta / max_;

      if (r === max_) {
        h = (g - b) / delta;
      }

      if (g === max_) {
        h = 2 + (b - r) / delta;
      }

      if (b === max_) {
        h = 4 + (r - g) / delta;
      }

      h *= 60;

      if (h < 0) {
        h += 360;
      }
    }

    return [h, s, v];
  };

  var rgb2hsv = rgb2hsl$1;
  var unpack$i = utils.unpack;
  var floor$1 = Math.floor;

  var hsv2rgb = function hsv2rgb() {
    var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$i(args, 'hsv');
    var h = args[0];
    var s = args[1];
    var v = args[2];
    var r, g, b;
    v *= 255;

    if (s === 0) {
      r = g = b = v;
    } else {
      if (h === 360) {
        h = 0;
      }

      if (h > 360) {
        h -= 360;
      }

      if (h < 0) {
        h += 360;
      }

      h /= 60;
      var i = floor$1(h);
      var f = h - i;
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));

      switch (i) {
        case 0:
          assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
          break;

        case 1:
          assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
          break;

        case 2:
          assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
          break;

        case 3:
          assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
          break;

        case 4:
          assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
          break;

        case 5:
          assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
          break;
      }
    }

    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  var hsv2rgb_1 = hsv2rgb;
  var unpack$j = utils.unpack;
  var type$8 = utils.type;

  Color_1.prototype.hsv = function () {
    return rgb2hsv(this._rgb);
  };

  chroma_1.hsv = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['hsv'])))();
  };

  input.format.hsv = hsv2rgb_1;
  input.autodetect.push({
    p: 2,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      args = unpack$j(args, 'hsv');

      if (type$8(args) === 'array' && args.length === 3) {
        return 'hsv';
      }
    }
  });
  var labConstants = {
    Kn: 18,
    Xn: 0.950470,
    Yn: 1,
    Zn: 1.088830,
    t0: 0.137931034,
    t1: 0.206896552,
    t2: 0.12841855,
    t3: 0.008856452
  };
  var unpack$k = utils.unpack;
  var pow = Math.pow;

  var rgb2lab = function rgb2lab() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$k(args, 'rgb');
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
    var ref$1 = rgb2xyz(r, g, b);
    var x = ref$1[0];
    var y = ref$1[1];
    var z = ref$1[2];
    var l = 116 * y - 16;
    return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
  };

  var rgb_xyz = function rgb_xyz(r) {
    if ((r /= 255) <= 0.04045) {
      return r / 12.92;
    }

    return pow((r + 0.055) / 1.055, 2.4);
  };

  var xyz_lab = function xyz_lab(t) {
    if (t > labConstants.t3) {
      return pow(t, 1 / 3);
    }

    return t / labConstants.t2 + labConstants.t0;
  };

  var rgb2xyz = function rgb2xyz(r, g, b) {
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
    var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / labConstants.Yn);
    var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / labConstants.Zn);
    return [x, y, z];
  };

  var rgb2lab_1 = rgb2lab;
  var unpack$l = utils.unpack;
  var pow$1 = Math.pow;

  var lab2rgb = function lab2rgb() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$l(args, 'lab');
    var l = args[0];
    var a = args[1];
    var b = args[2];
    var x, y, z, r, g, b_;
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;
    y = labConstants.Yn * lab_xyz(y);
    x = labConstants.Xn * lab_xyz(x);
    z = labConstants.Zn * lab_xyz(z);
    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
    return [r, g, b_, args.length > 3 ? args[3] : 1];
  };

  var xyz_rgb = function xyz_rgb(r) {
    return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055);
  };

  var lab_xyz = function lab_xyz(t) {
    return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0);
  };

  var lab2rgb_1 = lab2rgb;
  var unpack$m = utils.unpack;
  var type$9 = utils.type;

  Color_1.prototype.lab = function () {
    return rgb2lab_1(this._rgb);
  };

  chroma_1.lab = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['lab'])))();
  };

  input.format.lab = lab2rgb_1;
  input.autodetect.push({
    p: 2,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      args = unpack$m(args, 'lab');

      if (type$9(args) === 'array' && args.length === 3) {
        return 'lab';
      }
    }
  });
  var unpack$n = utils.unpack;
  var RAD2DEG = utils.RAD2DEG;
  var sqrt$1 = Math.sqrt;
  var atan2 = Math.atan2;
  var round$4 = Math.round;

  var lab2lch = function lab2lch() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$n(args, 'lab');
    var l = ref[0];
    var a = ref[1];
    var b = ref[2];
    var c = sqrt$1(a * a + b * b);
    var h = (atan2(b, a) * RAD2DEG + 360) % 360;

    if (round$4(c * 10000) === 0) {
      h = Number.NaN;
    }

    return [l, c, h];
  };

  var lab2lch_1 = lab2lch;
  var unpack$o = utils.unpack;

  var rgb2lch = function rgb2lch() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$o(args, 'rgb');
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
    var ref$1 = rgb2lab_1(r, g, b);
    var l = ref$1[0];
    var a = ref$1[1];
    var b_ = ref$1[2];
    return lab2lch_1(l, a, b_);
  };

  var rgb2lch_1 = rgb2lch;
  var unpack$p = utils.unpack;
  var DEG2RAD = utils.DEG2RAD;
  var sin = Math.sin;
  var cos$1 = Math.cos;

  var lch2lab = function lch2lab() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$p(args, 'lch');
    var l = ref[0];
    var c = ref[1];
    var h = ref[2];

    if (isNaN(h)) {
      h = 0;
    }

    h = h * DEG2RAD;
    return [l, cos$1(h) * c, sin(h) * c];
  };

  var lch2lab_1 = lch2lab;
  var unpack$q = utils.unpack;

  var lch2rgb = function lch2rgb() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    args = unpack$q(args, 'lch');
    var l = args[0];
    var c = args[1];
    var h = args[2];
    var ref = lch2lab_1(l, c, h);
    var L = ref[0];
    var a = ref[1];
    var b_ = ref[2];
    var ref$1 = lab2rgb_1(L, a, b_);
    var r = ref$1[0];
    var g = ref$1[1];
    var b = ref$1[2];
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  var lch2rgb_1 = lch2rgb;
  var unpack$r = utils.unpack;

  var hcl2rgb = function hcl2rgb() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var hcl = unpack$r(args, 'hcl').reverse();
    return lch2rgb_1.apply(void 0, hcl);
  };

  var hcl2rgb_1 = hcl2rgb;
  var unpack$s = utils.unpack;
  var type$a = utils.type;

  Color_1.prototype.lch = function () {
    return rgb2lch_1(this._rgb);
  };

  Color_1.prototype.hcl = function () {
    return rgb2lch_1(this._rgb).reverse();
  };

  chroma_1.lch = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['lch'])))();
  };

  chroma_1.hcl = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['hcl'])))();
  };

  input.format.lch = lch2rgb_1;
  input.format.hcl = hcl2rgb_1;
  ['lch', 'hcl'].forEach(function (m) {
    return input.autodetect.push({
      p: 2,
      test: function test() {
        var args = [],
            len = arguments.length;

        while (len--) {
          args[len] = arguments[len];
        }

        args = unpack$s(args, m);

        if (type$a(args) === 'array' && args.length === 3) {
          return m;
        }
      }
    });
  });
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
    cornflower: '#6495ed',
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
  var w3cx11_1 = w3cx11;
  var type$b = utils.type;

  Color_1.prototype.name = function () {
    var hex = rgb2hex_1(this._rgb, 'rgb');

    for (var i = 0, list = Object.keys(w3cx11_1); i < list.length; i += 1) {
      var n = list[i];

      if (w3cx11_1[n] === hex) {
        return n.toLowerCase();
      }
    }

    return hex;
  };

  input.format.named = function (name) {
    name = name.toLowerCase();

    if (w3cx11_1[name]) {
      return hex2rgb_1(w3cx11_1[name]);
    }

    throw new Error('unknown color name: ' + name);
  };

  input.autodetect.push({
    p: 5,
    test: function test(h) {
      var rest = [],
          len = arguments.length - 1;

      while (len-- > 0) {
        rest[len] = arguments[len + 1];
      }

      if (!rest.length && type$b(h) === 'string' && w3cx11_1[h.toLowerCase()]) {
        return 'named';
      }
    }
  });
  var unpack$t = utils.unpack;

  var rgb2num = function rgb2num() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var ref = unpack$t(args, 'rgb');
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
    return (r << 16) + (g << 8) + b;
  };

  var rgb2num_1 = rgb2num;
  var type$c = utils.type;

  var num2rgb = function num2rgb(num) {
    if (type$c(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
      var r = num >> 16;
      var g = num >> 8 & 0xFF;
      var b = num & 0xFF;
      return [r, g, b, 1];
    }

    throw new Error("unknown num color: " + num);
  };

  var num2rgb_1 = num2rgb;
  var type$d = utils.type;

  Color_1.prototype.num = function () {
    return rgb2num_1(this._rgb);
  };

  chroma_1.num = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['num'])))();
  };

  input.format.num = num2rgb_1;
  input.autodetect.push({
    p: 5,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      if (args.length === 1 && type$d(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
        return 'num';
      }
    }
  });
  var unpack$u = utils.unpack;
  var type$e = utils.type;
  var round$5 = Math.round;

  Color_1.prototype.rgb = function (rnd) {
    if (rnd === void 0) rnd = true;

    if (rnd === false) {
      return this._rgb.slice(0, 3);
    }

    return this._rgb.slice(0, 3).map(round$5);
  };

  Color_1.prototype.rgba = function (rnd) {
    if (rnd === void 0) rnd = true;
    return this._rgb.slice(0, 4).map(function (v, i) {
      return i < 3 ? rnd === false ? v : round$5(v) : v;
    });
  };

  chroma_1.rgb = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['rgb'])))();
  };

  input.format.rgb = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var rgba = unpack$u(args, 'rgba');

    if (rgba[3] === undefined) {
      rgba[3] = 1;
    }

    return rgba;
  };

  input.autodetect.push({
    p: 3,
    test: function test() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      args = unpack$u(args, 'rgba');

      if (type$e(args) === 'array' && (args.length === 3 || args.length === 4 && type$e(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
        return 'rgb';
      }
    }
  });
  var log = Math.log;

  var temperature2rgb = function temperature2rgb(kelvin) {
    var temp = kelvin / 100;
    var r, g, b;

    if (temp < 66) {
      r = 255;
      g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
      b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
      b = 255;
    }

    return [r, g, b, 1];
  };

  var temperature2rgb_1 = temperature2rgb;
  var unpack$v = utils.unpack;
  var round$6 = Math.round;

  var rgb2temperature = function rgb2temperature() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var rgb = unpack$v(args, 'rgb');
    var r = rgb[0],
        b = rgb[2];
    var minTemp = 1000;
    var maxTemp = 40000;
    var eps = 0.4;
    var temp;

    while (maxTemp - minTemp > eps) {
      temp = (maxTemp + minTemp) * 0.5;
      var rgb$1 = temperature2rgb_1(temp);

      if (rgb$1[2] / rgb$1[0] >= b / r) {
        maxTemp = temp;
      } else {
        minTemp = temp;
      }
    }

    return round$6(temp);
  };

  var rgb2temperature_1 = rgb2temperature;

  Color_1.prototype.temp = Color_1.prototype.kelvin = Color_1.prototype.temperature = function () {
    return rgb2temperature_1(this._rgb);
  };

  chroma_1.temp = chroma_1.kelvin = chroma_1.temperature = function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ['temp'])))();
  };

  input.format.temp = input.format.kelvin = input.format.temperature = temperature2rgb_1;
  var type$f = utils.type;

  Color_1.prototype.alpha = function (a, mutate) {
    if (mutate === void 0) mutate = false;

    if (a !== undefined && type$f(a) === 'number') {
      if (mutate) {
        this._rgb[3] = a;
        return this;
      }

      return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
    }

    return this._rgb[3];
  };

  Color_1.prototype.clipped = function () {
    return this._rgb._clipped || false;
  };

  Color_1.prototype.darken = function (amount) {
    if (amount === void 0) amount = 1;
    var me = this;
    var lab = me.lab();
    lab[0] -= labConstants.Kn * amount;
    return new Color_1(lab, 'lab').alpha(me.alpha(), true);
  };

  Color_1.prototype.brighten = function (amount) {
    if (amount === void 0) amount = 1;
    return this.darken(-amount);
  };

  Color_1.prototype.darker = Color_1.prototype.darken;
  Color_1.prototype.brighter = Color_1.prototype.brighten;

  Color_1.prototype.get = function (mc) {
    var ref = mc.split('.');
    var mode = ref[0];
    var channel = ref[1];
    var src = this[mode]();

    if (channel) {
      var i = mode.indexOf(channel);

      if (i > -1) {
        return src[i];
      }

      throw new Error("unknown channel " + channel + " in mode " + mode);
    } else {
      return src;
    }
  };

  var type$g = utils.type;
  var pow$2 = Math.pow;
  var EPS = 1e-7;
  var MAX_ITER = 20;

  Color_1.prototype.luminance = function (lum) {
    if (lum !== undefined && type$g(lum) === 'number') {
      if (lum === 0) {
        return new Color_1([0, 0, 0, this._rgb[3]], 'rgb');
      }

      if (lum === 1) {
        return new Color_1([255, 255, 255, this._rgb[3]], 'rgb');
      }

      var cur_lum = this.luminance();
      var mode = 'rgb';
      var max_iter = MAX_ITER;

      var test = function test(low, high) {
        var mid = low.interpolate(high, 0.5, mode);
        var lm = mid.luminance();

        if (Math.abs(lum - lm) < EPS || !max_iter--) {
          return mid;
        }

        return lm > lum ? test(low, mid) : test(mid, high);
      };

      var rgb = (cur_lum > lum ? test(new Color_1([0, 0, 0]), this) : test(this, new Color_1([255, 255, 255]))).rgb();
      return new Color_1(rgb.concat([this._rgb[3]]));
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
    return x <= 0.03928 ? x / 12.92 : pow$2((x + 0.055) / 1.055, 2.4);
  };

  var interpolator = {};
  var type$h = utils.type;

  var mix = function mix(col1, col2, f) {
    if (f === void 0) f = 0.5;
    var rest = [],
        len = arguments.length - 3;

    while (len-- > 0) {
      rest[len] = arguments[len + 3];
    }

    var mode = rest[0] || 'lrgb';

    if (!interpolator[mode] && !rest.length) {
      mode = Object.keys(interpolator)[0];
    }

    if (!interpolator[mode]) {
      throw new Error("interpolation mode " + mode + " is not defined");
    }

    if (type$h(col1) !== 'object') {
      col1 = new Color_1(col1);
    }

    if (type$h(col2) !== 'object') {
      col2 = new Color_1(col2);
    }

    return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
  };

  Color_1.prototype.mix = Color_1.prototype.interpolate = function (col2, f) {
    if (f === void 0) f = 0.5;
    var rest = [],
        len = arguments.length - 2;

    while (len-- > 0) {
      rest[len] = arguments[len + 2];
    }

    return mix.apply(void 0, [this, col2, f].concat(rest));
  };

  Color_1.prototype.premultiply = function (mutate) {
    if (mutate === void 0) mutate = false;
    var rgb = this._rgb;
    var a = rgb[3];

    if (mutate) {
      this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
      return this;
    } else {
      return new Color_1([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], 'rgb');
    }
  };

  Color_1.prototype.saturate = function (amount) {
    if (amount === void 0) amount = 1;
    var me = this;
    var lch = me.lch();
    lch[1] += labConstants.Kn * amount;

    if (lch[1] < 0) {
      lch[1] = 0;
    }

    return new Color_1(lch, 'lch').alpha(me.alpha(), true);
  };

  Color_1.prototype.desaturate = function (amount) {
    if (amount === void 0) amount = 1;
    return this.saturate(-amount);
  };

  var type$i = utils.type;

  Color_1.prototype.set = function (mc, value, mutate) {
    if (mutate === void 0) mutate = false;
    var ref = mc.split('.');
    var mode = ref[0];
    var channel = ref[1];
    var src = this[mode]();

    if (channel) {
      var i = mode.indexOf(channel);

      if (i > -1) {
        if (type$i(value) == 'string') {
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
        } else if (type$i(value) === 'number') {
          src[i] = value;
        } else {
          throw new Error("unsupported value for Color.set");
        }

        var out = new Color_1(src, mode);

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

  var rgb$1 = function rgb$1(col1, col2, f) {
    var xyz0 = col1._rgb;
    var xyz1 = col2._rgb;
    return new Color_1(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), 'rgb');
  };

  interpolator.rgb = rgb$1;
  var sqrt$2 = Math.sqrt;
  var pow$3 = Math.pow;

  var lrgb = function lrgb(col1, col2, f) {
    var ref = col1._rgb;
    var x1 = ref[0];
    var y1 = ref[1];
    var z1 = ref[2];
    var ref$1 = col2._rgb;
    var x2 = ref$1[0];
    var y2 = ref$1[1];
    var z2 = ref$1[2];
    return new Color_1(sqrt$2(pow$3(x1, 2) * (1 - f) + pow$3(x2, 2) * f), sqrt$2(pow$3(y1, 2) * (1 - f) + pow$3(y2, 2) * f), sqrt$2(pow$3(z1, 2) * (1 - f) + pow$3(z2, 2) * f), 'rgb');
  };

  interpolator.lrgb = lrgb;

  var lab$1 = function lab$1(col1, col2, f) {
    var xyz0 = col1.lab();
    var xyz1 = col2.lab();
    return new Color_1(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), 'lab');
  };

  interpolator.lab = lab$1;

  var _hsx = function _hsx(col1, col2, f, m) {
    var assign, assign$1;
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
    }

    var hue0, hue1, sat0, sat1, lbv0, lbv1;

    if (m.substr(0, 1) === 'h') {
      assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
      assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
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

      if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') {
        sat = sat0;
      }
    } else if (!isNaN(hue1)) {
      hue = hue1;

      if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') {
        sat = sat1;
      }
    } else {
      hue = Number.NaN;
    }

    if (sat === undefined) {
      sat = sat0 + f * (sat1 - sat0);
    }

    lbv = lbv0 + f * (lbv1 - lbv0);
    return new Color_1([hue, sat, lbv], m);
  };

  var lch$1 = function lch$1(col1, col2, f) {
    return _hsx(col1, col2, f, 'lch');
  };

  interpolator.lch = lch$1;
  interpolator.hcl = lch$1;

  var num$1 = function num$1(col1, col2, f) {
    var c1 = col1.num();
    var c2 = col2.num();
    return new Color_1(c1 + f * (c2 - c1), 'num');
  };

  interpolator.num = num$1;

  var hcg$1 = function hcg$1(col1, col2, f) {
    return _hsx(col1, col2, f, 'hcg');
  };

  interpolator.hcg = hcg$1;

  var hsi$1 = function hsi$1(col1, col2, f) {
    return _hsx(col1, col2, f, 'hsi');
  };

  interpolator.hsi = hsi$1;

  var hsl$1 = function hsl$1(col1, col2, f) {
    return _hsx(col1, col2, f, 'hsl');
  };

  interpolator.hsl = hsl$1;

  var hsv$1 = function hsv$1(col1, col2, f) {
    return _hsx(col1, col2, f, 'hsv');
  };

  interpolator.hsv = hsv$1;
  var clip_rgb$2 = utils.clip_rgb;
  var pow$4 = Math.pow;
  var sqrt$3 = Math.sqrt;
  var PI$1 = Math.PI;
  var cos$2 = Math.cos;
  var sin$1 = Math.sin;
  var atan2$1 = Math.atan2;

  var average = function average(colors, mode, weights) {
    if (mode === void 0) mode = 'lrgb';
    if (weights === void 0) weights = null;
    var l = colors.length;

    if (!weights) {
      weights = Array.from(new Array(l)).map(function () {
        return 1;
      });
    }

    var k = l / weights.reduce(function (a, b) {
      return a + b;
    });
    weights.forEach(function (w, i) {
      weights[i] *= k;
    });
    colors = colors.map(function (c) {
      return new Color_1(c);
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
        var A = xyz[i] / 180 * PI$1;
        dx += cos$2(A) * weights[0];
        dy += sin$1(A) * weights[0];
      }
    }

    var alpha = first.alpha() * weights[0];
    colors.forEach(function (c, ci) {
      var xyz2 = c.get(mode);
      alpha += c.alpha() * weights[ci + 1];

      for (var i = 0; i < xyz.length; i++) {
        if (!isNaN(xyz2[i])) {
          cnt[i] += weights[ci + 1];

          if (mode.charAt(i) === 'h') {
            var A = xyz2[i] / 180 * PI$1;
            dx += cos$2(A) * weights[ci + 1];
            dy += sin$1(A) * weights[ci + 1];
          } else {
            xyz[i] += xyz2[i] * weights[ci + 1];
          }
        }
      }
    });

    for (var i$1 = 0; i$1 < xyz.length; i$1++) {
      if (mode.charAt(i$1) === 'h') {
        var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;

        while (A$1 < 0) {
          A$1 += 360;
        }

        while (A$1 >= 360) {
          A$1 -= 360;
        }

        xyz[i$1] = A$1;
      } else {
        xyz[i$1] = xyz[i$1] / cnt[i$1];
      }
    }

    alpha /= l;
    return new Color_1(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
  };

  var _average_lrgb = function _average_lrgb(colors, weights) {
    var l = colors.length;
    var xyz = [0, 0, 0, 0];

    for (var i = 0; i < colors.length; i++) {
      var col = colors[i];
      var f = weights[i] / l;
      var rgb = col._rgb;
      xyz[0] += pow$4(rgb[0], 2) * f;
      xyz[1] += pow$4(rgb[1], 2) * f;
      xyz[2] += pow$4(rgb[2], 2) * f;
      xyz[3] += rgb[3] * f;
    }

    xyz[0] = sqrt$3(xyz[0]);
    xyz[1] = sqrt$3(xyz[1]);
    xyz[2] = sqrt$3(xyz[2]);

    if (xyz[3] > 0.9999999) {
      xyz[3] = 1;
    }

    return new Color_1(clip_rgb$2(xyz));
  };

  var type$j = utils.type;
  var pow$5 = Math.pow;

  var scale = function scale(colors) {
    var _mode = 'rgb';

    var _nacol = chroma_1('#ccc');

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

      if (colors && type$j(colors) === 'string' && chroma_1.brewer && chroma_1.brewer[colors.toLowerCase()]) {
        colors = chroma_1.brewer[colors.toLowerCase()];
      }

      if (type$j(colors) === 'array') {
        if (colors.length === 1) {
          colors = [colors[0], colors[0]];
        }

        colors = colors.slice(0);

        for (var c = 0; c < colors.length; c++) {
          colors[c] = chroma_1(colors[c]);
        }

        _pos.length = 0;

        for (var c$1 = 0; c$1 < colors.length; c$1++) {
          _pos.push(c$1 / (colors.length - 1));
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
        t = pow$5(t, _gamma);
      }

      t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
      t = Math.min(1, Math.max(0, t));
      var k = Math.floor(t * 10000);

      if (_useCache && _colorCache[k]) {
        col = _colorCache[k];
      } else {
        if (type$j(_colors) === 'array') {
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
              col = chroma_1.interpolate(_colors[i], _colors[i + 1], t, _mode);
              break;
            }
          }
        } else if (type$j(_colors) === 'function') {
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
      var c = chroma_1(getColor(v));

      if (_out && c[_out]) {
        return c[_out]();
      } else {
        return c;
      }
    };

    f.classes = function (classes) {
      if (classes != null) {
        if (type$j(classes) === 'array') {
          _classes = classes;
          _domain = [classes[0], classes[classes.length - 1]];
        } else {
          var d = chroma_1.analyze(_domain);

          if (classes === 0) {
            _classes = [d.min, d.max];
          } else {
            _classes = chroma_1.limits(d, 'e', classes);
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
        for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
          var d = list[i];

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
              if (t <= 0 || t >= 1) {
                return t;
              }

              var i = 0;

              while (t >= tBreaks[i + 1]) {
                i++;
              }

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
        if (type$j(p) === 'number') {
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

      if (chroma_1[out]) {
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
        _nacol = chroma_1(d);
        return f;
      } else {
        return _nacol;
      }
    };

    return f;
  };

  function __range__(left, right, inclusive) {
    var range = [];
    var ascending = left < right;
    var end = !inclusive ? right : ascending ? right + 1 : right - 1;

    for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
      range.push(i);
    }

    return range;
  }

  var bezier = function bezier(colors) {
    var assign, assign$1, assign$2;
    var I, lab0, lab1, lab2;
    colors = colors.map(function (c) {
      return new Color_1(c);
    });

    if (colors.length === 2) {
      assign = colors.map(function (c) {
        return c.lab();
      }), lab0 = assign[0], lab1 = assign[1];

      I = function I(t) {
        var lab = [0, 1, 2].map(function (i) {
          return lab0[i] + t * (lab1[i] - lab0[i]);
        });
        return new Color_1(lab, 'lab');
      };
    } else if (colors.length === 3) {
      assign$1 = colors.map(function (c) {
        return c.lab();
      }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];

      I = function I(t) {
        var lab = [0, 1, 2].map(function (i) {
          return (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i];
        });
        return new Color_1(lab, 'lab');
      };
    } else if (colors.length === 4) {
      var lab3;
      assign$2 = colors.map(function (c) {
        return c.lab();
      }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];

      I = function I(t) {
        var lab = [0, 1, 2].map(function (i) {
          return (1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i];
        });
        return new Color_1(lab, 'lab');
      };
    } else if (colors.length === 5) {
      var I0 = bezier(colors.slice(0, 3));
      var I1 = bezier(colors.slice(2, 5));

      I = function I(t) {
        if (t < 0.5) {
          return I0(t * 2);
        } else {
          return I1((t - 0.5) * 2);
        }
      };
    }

    return I;
  };

  var bezier_1 = function bezier_1(colors) {
    var f = bezier(colors);

    f.scale = function () {
      return scale(f);
    };

    return f;
  };

  var blend = function blend(bottom, top, mode) {
    if (!blend[mode]) {
      throw new Error('unknown blend mode ' + mode);
    }

    return blend[mode](bottom, top);
  };

  var blend_f = function blend_f(f) {
    return function (bottom, top) {
      var c0 = chroma_1(top).rgb();
      var c1 = chroma_1(bottom).rgb();
      return chroma_1.rgb(f(c0, c1));
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

  var darken$1 = function darken$1(a, b) {
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
    if (a === 255) {
      return 255;
    }

    a = 255 * (b / 255) / (1 - a / 255);
    return a > 255 ? 255 : a;
  };

  blend.normal = blend_f(each(normal));
  blend.multiply = blend_f(each(multiply));
  blend.screen = blend_f(each(screen));
  blend.overlay = blend_f(each(overlay));
  blend.darken = blend_f(each(darken$1));
  blend.lighten = blend_f(each(lighten));
  blend.dodge = blend_f(each(dodge));
  blend.burn = blend_f(each(burn));
  var blend_1 = blend;
  var type$k = utils.type;
  var clip_rgb$3 = utils.clip_rgb;
  var TWOPI$2 = utils.TWOPI;
  var pow$6 = Math.pow;
  var sin$2 = Math.sin;
  var cos$3 = Math.cos;

  var cubehelix = function cubehelix(start, rotations, hue, gamma, lightness) {
    if (start === void 0) start = 300;
    if (rotations === void 0) rotations = -1.5;
    if (hue === void 0) hue = 1;
    if (gamma === void 0) gamma = 1;
    if (lightness === void 0) lightness = [0, 1];
    var dh = 0,
        dl;

    if (type$k(lightness) === 'array') {
      dl = lightness[1] - lightness[0];
    } else {
      dl = 0;
      lightness = [lightness, lightness];
    }

    var f = function f(fract) {
      var a = TWOPI$2 * ((start + 120) / 360 + rotations * fract);
      var l = pow$6(lightness[0] + dl * fract, gamma);
      var h = dh !== 0 ? hue[0] + fract * dh : hue;
      var amp = h * l * (1 - l) / 2;
      var cos_a = cos$3(a);
      var sin_a = sin$2(a);
      var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
      var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
      var b = l + amp * (+1.97294 * cos_a);
      return chroma_1(clip_rgb$3([r * 255, g * 255, b * 255, 1]));
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

      if (type$k(hue) === 'array') {
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

      if (type$k(h) === 'array') {
        lightness = h;
        dl = h[1] - h[0];
      } else {
        lightness = [h, h];
        dl = 0;
      }

      return f;
    };

    f.scale = function () {
      return chroma_1.scale(f);
    };

    f.hue(hue);
    return f;
  };

  var digits = '0123456789abcdef';
  var floor$2 = Math.floor;
  var random = Math.random;

  var random_1 = function random_1() {
    var code = '#';

    for (var i = 0; i < 6; i++) {
      code += digits.charAt(floor$2(random() * 16));
    }

    return new Color_1(code, 'hex');
  };

  var log$1 = Math.log;
  var pow$7 = Math.pow;
  var floor$3 = Math.floor;
  var abs = Math.abs;

  var analyze = function analyze(data, key) {
    if (key === void 0) key = null;
    var r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };

    if (type(data) === 'object') {
      data = Object.values(data);
    }

    data.forEach(function (val) {
      if (key && type(val) === 'object') {
        val = val[key];
      }

      if (val !== undefined && val !== null && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;

        if (val < r.min) {
          r.min = val;
        }

        if (val > r.max) {
          r.max = val;
        }

        r.count += 1;
      }
    });
    r.domain = [r.min, r.max];

    r.limits = function (mode, num) {
      return limits(r, mode, num);
    };

    return r;
  };

  var limits = function limits(data, mode, num) {
    if (mode === void 0) mode = 'equal';
    if (num === void 0) num = 7;

    if (type(data) == 'array') {
      data = analyze(data);
    }

    var min = data.min;
    var max = data.max;
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

      var min_log = Math.LOG10E * log$1(min);
      var max_log = Math.LOG10E * log$1(max);
      limits.push(min);

      for (var i$1 = 1; i$1 < num; i$1++) {
        limits.push(pow$7(10, min_log + i$1 / num * (max_log - min_log)));
      }

      limits.push(max);
    } else if (mode.substr(0, 1) === 'q') {
      limits.push(min);

      for (var i$2 = 1; i$2 < num; i$2++) {
        var p = (values.length - 1) * i$2 / num;
        var pb = floor$3(p);

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

      for (var i$3 = 1; i$3 < num; i$3++) {
        centroids.push(min + i$3 / num * (max - min));
      }

      centroids.push(max);

      while (repeat) {
        for (var j = 0; j < num; j++) {
          clusterSizes[j] = 0;
        }

        for (var i$4 = 0; i$4 < n; i$4++) {
          var value = values[i$4];
          var mindist = Number.MAX_VALUE;
          var best = void 0;

          for (var j$1 = 0; j$1 < num; j$1++) {
            var dist = abs(centroids[j$1] - value);

            if (dist < mindist) {
              mindist = dist;
              best = j$1;
            }

            clusterSizes[best]++;
            assignments[i$4] = best;
          }
        }

        var newCentroids = new Array(num);

        for (var j$2 = 0; j$2 < num; j$2++) {
          newCentroids[j$2] = null;
        }

        for (var i$5 = 0; i$5 < n; i$5++) {
          cluster = assignments[i$5];

          if (newCentroids[cluster] === null) {
            newCentroids[cluster] = values[i$5];
          } else {
            newCentroids[cluster] += values[i$5];
          }
        }

        for (var j$3 = 0; j$3 < num; j$3++) {
          newCentroids[j$3] *= 1 / clusterSizes[j$3];
        }

        repeat = false;

        for (var j$4 = 0; j$4 < num; j$4++) {
          if (newCentroids[j$4] !== centroids[j$4]) {
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

      for (var j$5 = 0; j$5 < num; j$5++) {
        kClusters[j$5] = [];
      }

      for (var i$6 = 0; i$6 < n; i$6++) {
        cluster = assignments[i$6];
        kClusters[cluster].push(values[i$6]);
      }

      var tmpKMeansBreaks = [];

      for (var j$6 = 0; j$6 < num; j$6++) {
        tmpKMeansBreaks.push(kClusters[j$6][0]);
        tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
      }

      tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a, b) {
        return a - b;
      });
      limits.push(tmpKMeansBreaks[0]);

      for (var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2) {
        var v = tmpKMeansBreaks[i$7];

        if (!isNaN(v) && limits.indexOf(v) === -1) {
          limits.push(v);
        }
      }
    }

    return limits;
  };

  var analyze_1 = {
    analyze: analyze,
    limits: limits
  };

  var contrast = function contrast(a, b) {
    a = new Color_1(a);
    b = new Color_1(b);
    var l1 = a.luminance();
    var l2 = b.luminance();
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
  };

  var sqrt$4 = Math.sqrt;
  var atan2$2 = Math.atan2;
  var abs$1 = Math.abs;
  var cos$4 = Math.cos;
  var PI$2 = Math.PI;

  var deltaE = function deltaE(a, b, L, C) {
    if (L === void 0) L = 1;
    if (C === void 0) C = 1;
    a = new Color_1(a);
    b = new Color_1(b);
    var ref = Array.from(a.lab());
    var L1 = ref[0];
    var a1 = ref[1];
    var b1 = ref[2];
    var ref$1 = Array.from(b.lab());
    var L2 = ref$1[0];
    var a2 = ref$1[1];
    var b2 = ref$1[2];
    var c1 = sqrt$4(a1 * a1 + b1 * b1);
    var c2 = sqrt$4(a2 * a2 + b2 * b2);
    var sl = L1 < 16.0 ? 0.511 : 0.040975 * L1 / (1.0 + 0.01765 * L1);
    var sc = 0.0638 * c1 / (1.0 + 0.0131 * c1) + 0.638;
    var h1 = c1 < 0.000001 ? 0.0 : atan2$2(b1, a1) * 180.0 / PI$2;

    while (h1 < 0) {
      h1 += 360;
    }

    while (h1 >= 360) {
      h1 -= 360;
    }

    var t = h1 >= 164.0 && h1 <= 345.0 ? 0.56 + abs$1(0.2 * cos$4(PI$2 * (h1 + 168.0) / 180.0)) : 0.36 + abs$1(0.4 * cos$4(PI$2 * (h1 + 35.0) / 180.0));
    var c4 = c1 * c1 * c1 * c1;
    var f = sqrt$4(c4 / (c4 + 1900.0));
    var sh = sc * (f * t + 1.0 - f);
    var delL = L1 - L2;
    var delC = c1 - c2;
    var delA = a1 - a2;
    var delB = b1 - b2;
    var dH2 = delA * delA + delB * delB - delC * delC;
    var v1 = delL / (L * sl);
    var v2 = delC / (C * sc);
    var v3 = sh;
    return sqrt$4(v1 * v1 + v2 * v2 + dH2 / (v3 * v3));
  };

  var distance = function distance(a, b, mode) {
    if (mode === void 0) mode = 'lab';
    a = new Color_1(a);
    b = new Color_1(b);
    var l1 = a.get(mode);
    var l2 = b.get(mode);
    var sum_sq = 0;

    for (var i in l1) {
      var d = (l1[i] || 0) - (l2[i] || 0);
      sum_sq += d * d;
    }

    return Math.sqrt(sum_sq);
  };

  var valid = function valid() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    try {
      new (Function.prototype.bind.apply(Color_1, [null].concat(args)))();
      return true;
    } catch (e) {
      return false;
    }
  };

  var scales = {
    cool: function cool() {
      return scale([chroma_1.hsl(180, 1, .9), chroma_1.hsl(250, .7, .4)]);
    },
    hot: function hot() {
      return scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb');
    }
  };
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

  for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
    var key = list$1[i$1];
    colorbrewer[key.toLowerCase()] = colorbrewer[key];
  }

  var colorbrewer_1 = colorbrewer;
  chroma_1.average = average;
  chroma_1.bezier = bezier_1;
  chroma_1.blend = blend_1;
  chroma_1.cubehelix = cubehelix;
  chroma_1.mix = chroma_1.interpolate = mix;
  chroma_1.random = random_1;
  chroma_1.scale = scale;
  chroma_1.analyze = analyze_1.analyze;
  chroma_1.contrast = contrast;
  chroma_1.deltaE = deltaE;
  chroma_1.distance = distance;
  chroma_1.limits = analyze_1.limits;
  chroma_1.valid = valid;
  chroma_1.scales = scales;
  chroma_1.colors = w3cx11_1;
  chroma_1.brewer = colorbrewer_1;
  var chroma_js = chroma_1;
  return chroma_js;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.BOKEH_DOCS_PALETTES = exports.BOKEH_PALETTES = exports.BOKEH_PALETTE_NAMES = exports.BOKEH_VIRIDIS = exports.BOKEH_PLASMA = exports.BOKEH_MAGMA = exports.BOKEH_INFERNO = exports.BOKEH_RED_YELLOW_GREEN = exports.BOKEH_SPECTRAL = exports.BOKEH_RED_YELLOW_BLUE = exports.BOKEH_RED_GREY = exports.BOKEH_RED_BLUE = exports.BOKEH_PINK_YELLOW_GREEN = exports.BOKEH_PURPLE_GREEN = exports.BOKEH_BROWN_BLUE_GREEN = exports.BOKEH_PURPLE_ORANGE = exports.BOKEH_GREYS = exports.BOKEH_REDS = exports.BOKEH_ORANGES = exports.BOKEH_GREENS = exports.BOKEH_BLUES = exports.BOKEH_PURPLES = exports.BOKEH_YELLOW_ORANGE_BROWN = exports.BOKEH_YELLOW_ORANGE_RED = exports.BOKEH_ORANGE_RED = exports.BOKEH_PURPLE_RED = exports.BOKEH_RED_PURPLE = exports.BOKEH_BLUE_PURPLE = exports.BOKEH_PURPLE_BLUE = exports.BOKEH_PURPLE_BLUE_GREEN = exports.BOKEH_BLUE_GREEN = exports.BOKEH_GREEN_BLUE = exports.BOKEH_YELLOW_GREEN_BLUE = exports.BOKEH_YELLOW_GREEN = exports.BOKEH_SET_3 = exports.BOKEH_SET_2 = exports.BOKEH_SET_1 = exports.BOKEH_PASTEL_2 = exports.BOKEH_PASTEL_1 = exports.BOKEH_PAIRED = exports.BOKEH_DARK_2 = exports.BOKEH_ACCENT = exports.BOKEH_COLORBLIND = exports.BOKEH_CATEGORY_20_C = exports.BOKEH_CATEGORY_20_B = exports.BOKEH_CATEGORY_20 = exports.BOKEH_CATEGORY_10 = exports.BOKEH_DOCS_PALETTE_DATA = exports.BOKEH_PALETTE_DATA = void 0;
var BOKEH_PALETTE_DATA = {
  "bokeh_Category10": {
    3: ["#1f77b4", "#ff7f0e", "#2ca02c"],
    4: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"],
    5: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
    6: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    7: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"],
    8: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f"],
    9: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22"],
    10: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
  },
  "bokeh_Category20": {
    3: ["#1f77b4", "#aec7e8", "#ff7f0e"],
    4: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"],
    5: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c"],
    6: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a"],
    7: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728"],
    8: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896"],
    9: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd"],
    10: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5"],
    11: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b"],
    12: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"],
    13: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2"],
    14: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2"],
    15: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f"],
    16: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7"],
    17: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22"],
    18: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d"],
    19: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf"],
    20: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]
  },
  "bokeh_Category20b": {
    3: ["#393b79", "#5254a3", "#6b6ecf"],
    4: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede"],
    5: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939"],
    6: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252"],
    7: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b"],
    8: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c"],
    9: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31"],
    10: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39"],
    11: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52"],
    12: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94"],
    13: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39"],
    14: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a"],
    15: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b"],
    16: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c"],
    17: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173"],
    18: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194"],
    19: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd"],
    20: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"]
  },
  "bokeh_Category20c": {
    3: ["#3182bd", "#6baed6", "#9ecae1"],
    4: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef"],
    5: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d"],
    6: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c"],
    7: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b"],
    8: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2"],
    9: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354"],
    10: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476"],
    11: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b"],
    12: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0"],
    13: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1"],
    14: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8"],
    15: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc"],
    16: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb"],
    17: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363"],
    18: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696"],
    19: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd"],
    20: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"]
  },
  "bokeh_Colorblind": {
    3: ["#0072b2", "#e69f00", "#f0e442"],
    4: ["#0072b2", "#e69f00", "#f0e442", "#009e73"],
    5: ["#0072b2", "#e69f00", "#f0e442", "#009e73", "#56b4e9"],
    6: ["#0072b2", "#e69f00", "#f0e442", "#009e73", "#56b4e9", "#d55e00"],
    7: ["#0072b2", "#e69f00", "#f0e442", "#009e73", "#56b4e9", "#d55e00", "#cc79a7"],
    8: ["#0072b2", "#e69f00", "#f0e442", "#009e73", "#56b4e9", "#d55e00", "#cc79a7", "#000000"]
  },
  "bokeh_Accent": {
    3: ["#7fc97f", "#beaed4", "#fdc086"],
    4: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99"],
    5: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0"],
    6: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"],
    7: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17"],
    8: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"]
  },
  "bokeh_Dark2": {
    3: ["#1b9e77", "#d95f02", "#7570b3"],
    4: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
    5: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"],
    6: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02"],
    7: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
    8: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"]
  },
  "bokeh_Paired": {
    3: ["#a6cee3", "#1f78b4", "#b2df8a"],
    4: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c"],
    5: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"],
    6: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c"],
    7: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f"],
    8: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"],
    9: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6"],
    10: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a"],
    11: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99"],
    12: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"]
  },
  "bokeh_Pastel1": {
    3: ["#fbb4ae", "#b3cde3", "#ccebc5"],
    4: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4"],
    5: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6"],
    6: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc"],
    7: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd"],
    8: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec"],
    9: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
  },
  "bokeh_Pastel2": {
    3: ["#b3e2cd", "#fdcdac", "#cbd5e8"],
    4: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4"],
    5: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9"],
    6: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae"],
    7: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc"],
    8: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]
  },
  "bokeh_Set1": {
    3: ["#e41a1c", "#377eb8", "#4daf4a"],
    4: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"],
    5: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
    6: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"],
    7: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628"],
    8: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf"],
    9: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"]
  },
  "bokeh_Set2": {
    3: ["#66c2a5", "#fc8d62", "#8da0cb"],
    4: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3"],
    5: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"],
    6: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"],
    7: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"],
    8: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]
  },
  "bokeh_Set3": {
    3: ["#8dd3c7", "#ffffb3", "#bebada"],
    4: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072"],
    5: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3"],
    6: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462"],
    7: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69"],
    8: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"],
    9: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9"],
    10: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"],
    11: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5"],
    12: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
  },
  "bokeh_YlGn": {
    3: ["#31a354", "#addd8e", "#f7fcb9"],
    4: ["#238443", "#78c679", "#c2e699", "#ffffcc"],
    5: ["#006837", "#31a354", "#78c679", "#c2e699", "#ffffcc"],
    6: ["#006837", "#31a354", "#78c679", "#addd8e", "#d9f0a3", "#ffffcc"],
    7: ["#005a32", "#238443", "#41ab5d", "#78c679", "#addd8e", "#d9f0a3", "#ffffcc"],
    8: ["#005a32", "#238443", "#41ab5d", "#78c679", "#addd8e", "#d9f0a3", "#f7fcb9", "#ffffe5"],
    9: ["#004529", "#006837", "#238443", "#41ab5d", "#78c679", "#addd8e", "#d9f0a3", "#f7fcb9", "#ffffe5"]
  },
  "bokeh_YlGnBu": {
    3: ["#2c7fb8", "#7fcdbb", "#edf8b1"],
    4: ["#225ea8", "#41b6c4", "#a1dab4", "#ffffcc"],
    5: ["#253494", "#2c7fb8", "#41b6c4", "#a1dab4", "#ffffcc"],
    6: ["#253494", "#2c7fb8", "#41b6c4", "#7fcdbb", "#c7e9b4", "#ffffcc"],
    7: ["#0c2c84", "#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#ffffcc"],
    8: ["#0c2c84", "#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#edf8b1", "#ffffd9"],
    9: ["#081d58", "#253494", "#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#edf8b1", "#ffffd9"]
  },
  "bokeh_GnBu": {
    3: ["#43a2ca", "#a8ddb5", "#e0f3db"],
    4: ["#2b8cbe", "#7bccc4", "#bae4bc", "#f0f9e8"],
    5: ["#0868ac", "#43a2ca", "#7bccc4", "#bae4bc", "#f0f9e8"],
    6: ["#0868ac", "#43a2ca", "#7bccc4", "#a8ddb5", "#ccebc5", "#f0f9e8"],
    7: ["#08589e", "#2b8cbe", "#4eb3d3", "#7bccc4", "#a8ddb5", "#ccebc5", "#f0f9e8"],
    8: ["#08589e", "#2b8cbe", "#4eb3d3", "#7bccc4", "#a8ddb5", "#ccebc5", "#e0f3db", "#f7fcf0"],
    9: ["#084081", "#0868ac", "#2b8cbe", "#4eb3d3", "#7bccc4", "#a8ddb5", "#ccebc5", "#e0f3db", "#f7fcf0"]
  },
  "bokeh_BuGn": {
    3: ["#2ca25f", "#99d8c9", "#e5f5f9"],
    4: ["#238b45", "#66c2a4", "#b2e2e2", "#edf8fb"],
    5: ["#006d2c", "#2ca25f", "#66c2a4", "#b2e2e2", "#edf8fb"],
    6: ["#006d2c", "#2ca25f", "#66c2a4", "#99d8c9", "#ccece6", "#edf8fb"],
    7: ["#005824", "#238b45", "#41ae76", "#66c2a4", "#99d8c9", "#ccece6", "#edf8fb"],
    8: ["#005824", "#238b45", "#41ae76", "#66c2a4", "#99d8c9", "#ccece6", "#e5f5f9", "#f7fcfd"],
    9: ["#00441b", "#006d2c", "#238b45", "#41ae76", "#66c2a4", "#99d8c9", "#ccece6", "#e5f5f9", "#f7fcfd"]
  },
  "bokeh_PuBuGn": {
    3: ["#1c9099", "#a6bddb", "#ece2f0"],
    4: ["#02818a", "#67a9cf", "#bdc9e1", "#f6eff7"],
    5: ["#016c59", "#1c9099", "#67a9cf", "#bdc9e1", "#f6eff7"],
    6: ["#016c59", "#1c9099", "#67a9cf", "#a6bddb", "#d0d1e6", "#f6eff7"],
    7: ["#016450", "#02818a", "#3690c0", "#67a9cf", "#a6bddb", "#d0d1e6", "#f6eff7"],
    8: ["#016450", "#02818a", "#3690c0", "#67a9cf", "#a6bddb", "#d0d1e6", "#ece2f0", "#fff7fb"],
    9: ["#014636", "#016c59", "#02818a", "#3690c0", "#67a9cf", "#a6bddb", "#d0d1e6", "#ece2f0", "#fff7fb"]
  },
  "bokeh_PuBu": {
    3: ["#2b8cbe", "#a6bddb", "#ece7f2"],
    4: ["#0570b0", "#74a9cf", "#bdc9e1", "#f1eef6"],
    5: ["#045a8d", "#2b8cbe", "#74a9cf", "#bdc9e1", "#f1eef6"],
    6: ["#045a8d", "#2b8cbe", "#74a9cf", "#a6bddb", "#d0d1e6", "#f1eef6"],
    7: ["#034e7b", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#f1eef6"],
    8: ["#034e7b", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#ece7f2", "#fff7fb"],
    9: ["#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#ece7f2", "#fff7fb"]
  },
  "bokeh_BuPu": {
    3: ["#8856a7", "#9ebcda", "#e0ecf4"],
    4: ["#88419d", "#8c96c6", "#b3cde3", "#edf8fb"],
    5: ["#810f7c", "#8856a7", "#8c96c6", "#b3cde3", "#edf8fb"],
    6: ["#810f7c", "#8856a7", "#8c96c6", "#9ebcda", "#bfd3e6", "#edf8fb"],
    7: ["#6e016b", "#88419d", "#8c6bb1", "#8c96c6", "#9ebcda", "#bfd3e6", "#edf8fb"],
    8: ["#6e016b", "#88419d", "#8c6bb1", "#8c96c6", "#9ebcda", "#bfd3e6", "#e0ecf4", "#f7fcfd"],
    9: ["#4d004b", "#810f7c", "#88419d", "#8c6bb1", "#8c96c6", "#9ebcda", "#bfd3e6", "#e0ecf4", "#f7fcfd"]
  },
  "bokeh_RdPu": {
    3: ["#c51b8a", "#fa9fb5", "#fde0dd"],
    4: ["#ae017e", "#f768a1", "#fbb4b9", "#feebe2"],
    5: ["#7a0177", "#c51b8a", "#f768a1", "#fbb4b9", "#feebe2"],
    6: ["#7a0177", "#c51b8a", "#f768a1", "#fa9fb5", "#fcc5c0", "#feebe2"],
    7: ["#7a0177", "#ae017e", "#dd3497", "#f768a1", "#fa9fb5", "#fcc5c0", "#feebe2"],
    8: ["#7a0177", "#ae017e", "#dd3497", "#f768a1", "#fa9fb5", "#fcc5c0", "#fde0dd", "#fff7f3"],
    9: ["#49006a", "#7a0177", "#ae017e", "#dd3497", "#f768a1", "#fa9fb5", "#fcc5c0", "#fde0dd", "#fff7f3"]
  },
  "bokeh_PuRd": {
    3: ["#dd1c77", "#c994c7", "#e7e1ef"],
    4: ["#ce1256", "#df65b0", "#d7b5d8", "#f1eef6"],
    5: ["#980043", "#dd1c77", "#df65b0", "#d7b5d8", "#f1eef6"],
    6: ["#980043", "#dd1c77", "#df65b0", "#c994c7", "#d4b9da", "#f1eef6"],
    7: ["#91003f", "#ce1256", "#e7298a", "#df65b0", "#c994c7", "#d4b9da", "#f1eef6"],
    8: ["#91003f", "#ce1256", "#e7298a", "#df65b0", "#c994c7", "#d4b9da", "#e7e1ef", "#f7f4f9"],
    9: ["#67001f", "#980043", "#ce1256", "#e7298a", "#df65b0", "#c994c7", "#d4b9da", "#e7e1ef", "#f7f4f9"]
  },
  "bokeh_OrRd": {
    3: ["#e34a33", "#fdbb84", "#fee8c8"],
    4: ["#d7301f", "#fc8d59", "#fdcc8a", "#fef0d9"],
    5: ["#b30000", "#e34a33", "#fc8d59", "#fdcc8a", "#fef0d9"],
    6: ["#b30000", "#e34a33", "#fc8d59", "#fdbb84", "#fdd49e", "#fef0d9"],
    7: ["#990000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fef0d9"],
    8: ["#990000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fee8c8", "#fff7ec"],
    9: ["#7f0000", "#b30000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fee8c8", "#fff7ec"]
  },
  "bokeh_YlOrRd": {
    3: ["#f03b20", "#feb24c", "#ffeda0"],
    4: ["#e31a1c", "#fd8d3c", "#fecc5c", "#ffffb2"],
    5: ["#bd0026", "#f03b20", "#fd8d3c", "#fecc5c", "#ffffb2"],
    6: ["#bd0026", "#f03b20", "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"],
    7: ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"],
    8: ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffeda0", "#ffffcc"],
    9: ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffeda0", "#ffffcc"]
  },
  "bokeh_YlOrBr": {
    3: ["#d95f0e", "#fec44f", "#fff7bc"],
    4: ["#cc4c02", "#fe9929", "#fed98e", "#ffffd4"],
    5: ["#993404", "#d95f0e", "#fe9929", "#fed98e", "#ffffd4"],
    6: ["#993404", "#d95f0e", "#fe9929", "#fec44f", "#fee391", "#ffffd4"],
    7: ["#8c2d04", "#cc4c02", "#ec7014", "#fe9929", "#fec44f", "#fee391", "#ffffd4"],
    8: ["#8c2d04", "#cc4c02", "#ec7014", "#fe9929", "#fec44f", "#fee391", "#fff7bc", "#ffffe5"],
    9: ["#662506", "#993404", "#cc4c02", "#ec7014", "#fe9929", "#fec44f", "#fee391", "#fff7bc", "#ffffe5"]
  },
  "bokeh_Purples": {
    3: ["#756bb1", "#bcbddc", "#efedf5"],
    4: ["#6a51a3", "#9e9ac8", "#cbc9e2", "#f2f0f7"],
    5: ["#54278f", "#756bb1", "#9e9ac8", "#cbc9e2", "#f2f0f7"],
    6: ["#54278f", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#f2f0f7"],
    7: ["#4a1486", "#6a51a3", "#807dba", "#9e9ac8", "#bcbddc", "#dadaeb", "#f2f0f7"],
    8: ["#4a1486", "#6a51a3", "#807dba", "#9e9ac8", "#bcbddc", "#dadaeb", "#efedf5", "#fcfbfd"],
    9: ["#3f007d", "#54278f", "#6a51a3", "#807dba", "#9e9ac8", "#bcbddc", "#dadaeb", "#efedf5", "#fcfbfd"]
  },
  "bokeh_Blues": {
    3: ["#3182bd", "#9ecae1", "#deebf7"],
    4: ["#2171b5", "#6baed6", "#bdd7e7", "#eff3ff"],
    5: ["#08519c", "#3182bd", "#6baed6", "#bdd7e7", "#eff3ff"],
    6: ["#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#eff3ff"],
    7: ["#084594", "#2171b5", "#4292c6", "#6baed6", "#9ecae1", "#c6dbef", "#eff3ff"],
    8: ["#084594", "#2171b5", "#4292c6", "#6baed6", "#9ecae1", "#c6dbef", "#deebf7", "#f7fbff"],
    9: ["#08306b", "#08519c", "#2171b5", "#4292c6", "#6baed6", "#9ecae1", "#c6dbef", "#deebf7", "#f7fbff"]
  },
  "bokeh_Greens": {
    3: ["#31a354", "#a1d99b", "#e5f5e0"],
    4: ["#238b45", "#74c476", "#bae4b3", "#edf8e9"],
    5: ["#006d2c", "#31a354", "#74c476", "#bae4b3", "#edf8e9"],
    6: ["#006d2c", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#edf8e9"],
    7: ["#005a32", "#238b45", "#41ab5d", "#74c476", "#a1d99b", "#c7e9c0", "#edf8e9"],
    8: ["#005a32", "#238b45", "#41ab5d", "#74c476", "#a1d99b", "#c7e9c0", "#e5f5e0", "#f7fcf5"],
    9: ["#00441b", "#006d2c", "#238b45", "#41ab5d", "#74c476", "#a1d99b", "#c7e9c0", "#e5f5e0", "#f7fcf5"]
  },
  "bokeh_Oranges": {
    3: ["#e6550d", "#fdae6b", "#fee6ce"],
    4: ["#d94701", "#fd8d3c", "#fdbe85", "#feedde"],
    5: ["#a63603", "#e6550d", "#fd8d3c", "#fdbe85", "#feedde"],
    6: ["#a63603", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#feedde"],
    7: ["#8c2d04", "#d94801", "#f16913", "#fd8d3c", "#fdae6b", "#fdd0a2", "#feedde"],
    8: ["#8c2d04", "#d94801", "#f16913", "#fd8d3c", "#fdae6b", "#fdd0a2", "#fee6ce", "#fff5eb"],
    9: ["#7f2704", "#a63603", "#d94801", "#f16913", "#fd8d3c", "#fdae6b", "#fdd0a2", "#fee6ce", "#fff5eb"]
  },
  "bokeh_Reds": {
    3: ["#de2d26", "#fc9272", "#fee0d2"],
    4: ["#cb181d", "#fb6a4a", "#fcae91", "#fee5d9"],
    5: ["#a50f15", "#de2d26", "#fb6a4a", "#fcae91", "#fee5d9"],
    6: ["#a50f15", "#de2d26", "#fb6a4a", "#fc9272", "#fcbba1", "#fee5d9"],
    7: ["#99000d", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee5d9"],
    8: ["#99000d", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2", "#fff5f0"],
    9: ["#67000d", "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2", "#fff5f0"]
  },
  "bokeh_Greys": {
    3: ["#636363", "#bdbdbd", "#f0f0f0"],
    4: ["#525252", "#969696", "#cccccc", "#f7f7f7"],
    5: ["#252525", "#636363", "#969696", "#cccccc", "#f7f7f7"],
    6: ["#252525", "#636363", "#969696", "#bdbdbd", "#d9d9d9", "#f7f7f7"],
    7: ["#252525", "#525252", "#737373", "#969696", "#bdbdbd", "#d9d9d9", "#f7f7f7"],
    8: ["#252525", "#525252", "#737373", "#969696", "#bdbdbd", "#d9d9d9", "#f0f0f0", "#ffffff"],
    9: ["#000000", "#252525", "#525252", "#737373", "#969696", "#bdbdbd", "#d9d9d9", "#f0f0f0", "#ffffff"],
    10: ["#000000", "#1c1c1c", "#383838", "#555555", "#717171", "#8d8d8d", "#aaaaaa", "#c6c6c6", "#e2e2e2", "#ffffff"],
    11: ["#000000", "#191919", "#333333", "#4c4c4c", "#666666", "#7f7f7f", "#999999", "#b2b2b2", "#cccccc", "#e5e5e5", "#ffffff"],
    256: ["#000000", "#010101", "#020202", "#030303", "#040404", "#050505", "#060606", "#070707", "#080808", "#090909", "#0a0a0a", "#0b0b0b", "#0c0c0c", "#0d0d0d", "#0e0e0e", "#0f0f0f", "#101010", "#111111", "#121212", "#131313", "#141414", "#151515", "#161616", "#171717", "#181818", "#191919", "#1a1a1a", "#1b1b1b", "#1c1c1c", "#1d1d1d", "#1e1e1e", "#1f1f1f", "#202020", "#212121", "#222222", "#232323", "#242424", "#252525", "#262626", "#272727", "#282828", "#292929", "#2a2a2a", "#2b2b2b", "#2c2c2c", "#2d2d2d", "#2e2e2e", "#2f2f2f", "#303030", "#313131", "#323232", "#333333", "#343434", "#353535", "#363636", "#373737", "#383838", "#393939", "#3a3a3a", "#3b3b3b", "#3c3c3c", "#3d3d3d", "#3e3e3e", "#3f3f3f", "#404040", "#414141", "#424242", "#434343", "#444444", "#454545", "#464646", "#474747", "#484848", "#494949", "#4a4a4a", "#4b4b4b", "#4c4c4c", "#4d4d4d", "#4e4e4e", "#4f4f4f", "#505050", "#515151", "#525252", "#535353", "#545454", "#555555", "#565656", "#575757", "#585858", "#595959", "#5a5a5a", "#5b5b5b", "#5c5c5c", "#5d5d5d", "#5e5e5e", "#5f5f5f", "#606060", "#616161", "#626262", "#636363", "#646464", "#656565", "#666666", "#676767", "#686868", "#696969", "#6a6a6a", "#6b6b6b", "#6c6c6c", "#6d6d6d", "#6e6e6e", "#6f6f6f", "#707070", "#717171", "#727272", "#737373", "#747474", "#757575", "#767676", "#777777", "#787878", "#797979", "#7a7a7a", "#7b7b7b", "#7c7c7c", "#7d7d7d", "#7e7e7e", "#7f7f7f", "#808080", "#818181", "#828282", "#838383", "#848484", "#858585", "#868686", "#878787", "#888888", "#898989", "#8a8a8a", "#8b8b8b", "#8c8c8c", "#8d8d8d", "#8e8e8e", "#8f8f8f", "#909090", "#919191", "#929292", "#939393", "#949494", "#959595", "#969696", "#979797", "#989898", "#999999", "#9a9a9a", "#9b9b9b", "#9c9c9c", "#9d9d9d", "#9e9e9e", "#9f9f9f", "#a0a0a0", "#a1a1a1", "#a2a2a2", "#a3a3a3", "#a4a4a4", "#a5a5a5", "#a6a6a6", "#a7a7a7", "#a8a8a8", "#a9a9a9", "#aaaaaa", "#ababab", "#acacac", "#adadad", "#aeaeae", "#afafaf", "#b0b0b0", "#b1b1b1", "#b2b2b2", "#b3b3b3", "#b4b4b4", "#b5b5b5", "#b6b6b6", "#b7b7b7", "#b8b8b8", "#b9b9b9", "#bababa", "#bbbbbb", "#bcbcbc", "#bdbdbd", "#bebebe", "#bfbfbf", "#c0c0c0", "#c1c1c1", "#c2c2c2", "#c3c3c3", "#c4c4c4", "#c5c5c5", "#c6c6c6", "#c7c7c7", "#c8c8c8", "#c9c9c9", "#cacaca", "#cbcbcb", "#cccccc", "#cdcdcd", "#cecece", "#cfcfcf", "#d0d0d0", "#d1d1d1", "#d2d2d2", "#d3d3d3", "#d4d4d4", "#d5d5d5", "#d6d6d6", "#d7d7d7", "#d8d8d8", "#d9d9d9", "#dadada", "#dbdbdb", "#dcdcdc", "#dddddd", "#dedede", "#dfdfdf", "#e0e0e0", "#e1e1e1", "#e2e2e2", "#e3e3e3", "#e4e4e4", "#e5e5e5", "#e6e6e6", "#e7e7e7", "#e8e8e8", "#e9e9e9", "#eaeaea", "#ebebeb", "#ececec", "#ededed", "#eeeeee", "#efefef", "#f0f0f0", "#f1f1f1", "#f2f2f2", "#f3f3f3", "#f4f4f4", "#f5f5f5", "#f6f6f6", "#f7f7f7", "#f8f8f8", "#f9f9f9", "#fafafa", "#fbfbfb", "#fcfcfc", "#fdfdfd", "#fefefe", "#ffffff"]
  },
  "bokeh_PuOr": {
    3: ["#998ec3", "#f7f7f7", "#f1a340"],
    4: ["#5e3c99", "#b2abd2", "#fdb863", "#e66101"],
    5: ["#5e3c99", "#b2abd2", "#f7f7f7", "#fdb863", "#e66101"],
    6: ["#542788", "#998ec3", "#d8daeb", "#fee0b6", "#f1a340", "#b35806"],
    7: ["#542788", "#998ec3", "#d8daeb", "#f7f7f7", "#fee0b6", "#f1a340", "#b35806"],
    8: ["#542788", "#8073ac", "#b2abd2", "#d8daeb", "#fee0b6", "#fdb863", "#e08214", "#b35806"],
    9: ["#542788", "#8073ac", "#b2abd2", "#d8daeb", "#f7f7f7", "#fee0b6", "#fdb863", "#e08214", "#b35806"],
    10: ["#2d004b", "#542788", "#8073ac", "#b2abd2", "#d8daeb", "#fee0b6", "#fdb863", "#e08214", "#b35806", "#7f3b08"],
    11: ["#2d004b", "#542788", "#8073ac", "#b2abd2", "#d8daeb", "#f7f7f7", "#fee0b6", "#fdb863", "#e08214", "#b35806", "#7f3b08"]
  },
  "bokeh_BrBG": {
    3: ["#5ab4ac", "#f5f5f5", "#d8b365"],
    4: ["#018571", "#80cdc1", "#dfc27d", "#a6611a"],
    5: ["#018571", "#80cdc1", "#f5f5f5", "#dfc27d", "#a6611a"],
    6: ["#01665e", "#5ab4ac", "#c7eae5", "#f6e8c3", "#d8b365", "#8c510a"],
    7: ["#01665e", "#5ab4ac", "#c7eae5", "#f5f5f5", "#f6e8c3", "#d8b365", "#8c510a"],
    8: ["#01665e", "#35978f", "#80cdc1", "#c7eae5", "#f6e8c3", "#dfc27d", "#bf812d", "#8c510a"],
    9: ["#01665e", "#35978f", "#80cdc1", "#c7eae5", "#f5f5f5", "#f6e8c3", "#dfc27d", "#bf812d", "#8c510a"],
    10: ["#003c30", "#01665e", "#35978f", "#80cdc1", "#c7eae5", "#f6e8c3", "#dfc27d", "#bf812d", "#8c510a", "#543005"],
    11: ["#003c30", "#01665e", "#35978f", "#80cdc1", "#c7eae5", "#f5f5f5", "#f6e8c3", "#dfc27d", "#bf812d", "#8c510a", "#543005"]
  },
  "bokeh_PRGn": {
    3: ["#7fbf7b", "#f7f7f7", "#af8dc3"],
    4: ["#008837", "#a6dba0", "#c2a5cf", "#7b3294"],
    5: ["#008837", "#a6dba0", "#f7f7f7", "#c2a5cf", "#7b3294"],
    6: ["#1b7837", "#7fbf7b", "#d9f0d3", "#e7d4e8", "#af8dc3", "#762a83"],
    7: ["#1b7837", "#7fbf7b", "#d9f0d3", "#f7f7f7", "#e7d4e8", "#af8dc3", "#762a83"],
    8: ["#1b7837", "#5aae61", "#a6dba0", "#d9f0d3", "#e7d4e8", "#c2a5cf", "#9970ab", "#762a83"],
    9: ["#1b7837", "#5aae61", "#a6dba0", "#d9f0d3", "#f7f7f7", "#e7d4e8", "#c2a5cf", "#9970ab", "#762a83"],
    10: ["#00441b", "#1b7837", "#5aae61", "#a6dba0", "#d9f0d3", "#e7d4e8", "#c2a5cf", "#9970ab", "#762a83", "#40004b"],
    11: ["#00441b", "#1b7837", "#5aae61", "#a6dba0", "#d9f0d3", "#f7f7f7", "#e7d4e8", "#c2a5cf", "#9970ab", "#762a83", "#40004b"]
  },
  "bokeh_PiYG": {
    3: ["#a1d76a", "#f7f7f7", "#e9a3c9"],
    4: ["#4dac26", "#b8e186", "#f1b6da", "#d01c8b"],
    5: ["#4dac26", "#b8e186", "#f7f7f7", "#f1b6da", "#d01c8b"],
    6: ["#4d9221", "#a1d76a", "#e6f5d0", "#fde0ef", "#e9a3c9", "#c51b7d"],
    7: ["#4d9221", "#a1d76a", "#e6f5d0", "#f7f7f7", "#fde0ef", "#e9a3c9", "#c51b7d"],
    8: ["#4d9221", "#7fbc41", "#b8e186", "#e6f5d0", "#fde0ef", "#f1b6da", "#de77ae", "#c51b7d"],
    9: ["#4d9221", "#7fbc41", "#b8e186", "#e6f5d0", "#f7f7f7", "#fde0ef", "#f1b6da", "#de77ae", "#c51b7d"],
    10: ["#276419", "#4d9221", "#7fbc41", "#b8e186", "#e6f5d0", "#fde0ef", "#f1b6da", "#de77ae", "#c51b7d", "#8e0152"],
    11: ["#276419", "#4d9221", "#7fbc41", "#b8e186", "#e6f5d0", "#f7f7f7", "#fde0ef", "#f1b6da", "#de77ae", "#c51b7d", "#8e0152"]
  },
  "bokeh_RdBu": {
    3: ["#67a9cf", "#f7f7f7", "#ef8a62"],
    4: ["#0571b0", "#92c5de", "#f4a582", "#ca0020"],
    5: ["#0571b0", "#92c5de", "#f7f7f7", "#f4a582", "#ca0020"],
    6: ["#2166ac", "#67a9cf", "#d1e5f0", "#fddbc7", "#ef8a62", "#b2182b"],
    7: ["#2166ac", "#67a9cf", "#d1e5f0", "#f7f7f7", "#fddbc7", "#ef8a62", "#b2182b"],
    8: ["#2166ac", "#4393c3", "#92c5de", "#d1e5f0", "#fddbc7", "#f4a582", "#d6604d", "#b2182b"],
    9: ["#2166ac", "#4393c3", "#92c5de", "#d1e5f0", "#f7f7f7", "#fddbc7", "#f4a582", "#d6604d", "#b2182b"],
    10: ["#053061", "#2166ac", "#4393c3", "#92c5de", "#d1e5f0", "#fddbc7", "#f4a582", "#d6604d", "#b2182b", "#67001f"],
    11: ["#053061", "#2166ac", "#4393c3", "#92c5de", "#d1e5f0", "#f7f7f7", "#fddbc7", "#f4a582", "#d6604d", "#b2182b", "#67001f"]
  },
  "bokeh_RdGy": {
    3: ["#999999", "#ffffff", "#ef8a62"],
    4: ["#404040", "#bababa", "#f4a582", "#ca0020"],
    5: ["#404040", "#bababa", "#ffffff", "#f4a582", "#ca0020"],
    6: ["#4d4d4d", "#999999", "#e0e0e0", "#fddbc7", "#ef8a62", "#b2182b"],
    7: ["#4d4d4d", "#999999", "#e0e0e0", "#ffffff", "#fddbc7", "#ef8a62", "#b2182b"],
    8: ["#4d4d4d", "#878787", "#bababa", "#e0e0e0", "#fddbc7", "#f4a582", "#d6604d", "#b2182b"],
    9: ["#4d4d4d", "#878787", "#bababa", "#e0e0e0", "#ffffff", "#fddbc7", "#f4a582", "#d6604d", "#b2182b"],
    10: ["#1a1a1a", "#4d4d4d", "#878787", "#bababa", "#e0e0e0", "#fddbc7", "#f4a582", "#d6604d", "#b2182b", "#67001f"],
    11: ["#1a1a1a", "#4d4d4d", "#878787", "#bababa", "#e0e0e0", "#ffffff", "#fddbc7", "#f4a582", "#d6604d", "#b2182b", "#67001f"]
  },
  "bokeh_RdYlBu": {
    3: ["#91bfdb", "#ffffbf", "#fc8d59"],
    4: ["#2c7bb6", "#abd9e9", "#fdae61", "#d7191c"],
    5: ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c"],
    6: ["#4575b4", "#91bfdb", "#e0f3f8", "#fee090", "#fc8d59", "#d73027"],
    7: ["#4575b4", "#91bfdb", "#e0f3f8", "#ffffbf", "#fee090", "#fc8d59", "#d73027"],
    8: ["#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#fee090", "#fdae61", "#f46d43", "#d73027"],
    9: ["#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027"],
    10: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"],
    11: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"]
  },
  "bokeh_Spectral": {
    3: ["#99d594", "#ffffbf", "#fc8d59"],
    4: ["#2b83ba", "#abdda4", "#fdae61", "#d7191c"],
    5: ["#2b83ba", "#abdda4", "#ffffbf", "#fdae61", "#d7191c"],
    6: ["#3288bd", "#99d594", "#e6f598", "#fee08b", "#fc8d59", "#d53e4f"],
    7: ["#3288bd", "#99d594", "#e6f598", "#ffffbf", "#fee08b", "#fc8d59", "#d53e4f"],
    8: ["#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#fee08b", "#fdae61", "#f46d43", "#d53e4f"],
    9: ["#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f"],
    10: ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"],
    11: ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"]
  },
  "bokeh_RdYlGn": {
    3: ["#91cf60", "#ffffbf", "#fc8d59"],
    4: ["#1a9641", "#a6d96a", "#fdae61", "#d7191c"],
    5: ["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c"],
    6: ["#1a9850", "#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"],
    7: ["#1a9850", "#91cf60", "#d9ef8b", "#ffffbf", "#fee08b", "#fc8d59", "#d73027"],
    8: ["#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#fee08b", "#fdae61", "#f46d43", "#d73027"],
    9: ["#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027"],
    10: ["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"],
    11: ["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"]
  },
  "bokeh_Inferno": {
    3: ["#000003", "#ba3655", "#fcfea4"],
    4: ["#000003", "#781c6d", "#ed6825", "#fcfea4"],
    5: ["#000003", "#550f6d", "#ba3655", "#f98c09", "#fcfea4"],
    6: ["#000003", "#410967", "#932567", "#dc5039", "#fba40a", "#fcfea4"],
    7: ["#000003", "#32095d", "#781c6d", "#ba3655", "#ed6825", "#fbb318", "#fcfea4"],
    8: ["#000003", "#270b52", "#63146e", "#9e2963", "#d24742", "#f57c15", "#fabf25", "#fcfea4"],
    9: ["#000003", "#1f0c47", "#550f6d", "#88216a", "#ba3655", "#e35832", "#f98c09", "#f8c931", "#fcfea4"],
    10: ["#000003", "#1a0b40", "#4a0b6a", "#781c6d", "#a42c60", "#cd4247", "#ed6825", "#fb9906", "#f7cf3a", "#fcfea4"],
    11: ["#000003", "#160b39", "#410967", "#6a176e", "#932567", "#ba3655", "#dc5039", "#f2751a", "#fba40a", "#f6d542", "#fcfea4"],
    256: ["#000003", "#000004", "#000006", "#010007", "#010109", "#01010b", "#02010e", "#020210", "#030212", "#040314", "#040316", "#050418", "#06041b", "#07051d", "#08061f", "#090621", "#0a0723", "#0b0726", "#0d0828", "#0e082a", "#0f092d", "#10092f", "#120a32", "#130a34", "#140b36", "#160b39", "#170b3b", "#190b3e", "#1a0b40", "#1c0c43", "#1d0c45", "#1f0c47", "#200c4a", "#220b4c", "#240b4e", "#260b50", "#270b52", "#290b54", "#2b0a56", "#2d0a58", "#2e0a5a", "#300a5c", "#32095d", "#34095f", "#350960", "#370961", "#390962", "#3b0964", "#3c0965", "#3e0966", "#400966", "#410967", "#430a68", "#450a69", "#460a69", "#480b6a", "#4a0b6a", "#4b0c6b", "#4d0c6b", "#4f0d6c", "#500d6c", "#520e6c", "#530e6d", "#550f6d", "#570f6d", "#58106d", "#5a116d", "#5b116e", "#5d126e", "#5f126e", "#60136e", "#62146e", "#63146e", "#65156e", "#66156e", "#68166e", "#6a176e", "#6b176e", "#6d186e", "#6e186e", "#70196e", "#72196d", "#731a6d", "#751b6d", "#761b6d", "#781c6d", "#7a1c6d", "#7b1d6c", "#7d1d6c", "#7e1e6c", "#801f6b", "#811f6b", "#83206b", "#85206a", "#86216a", "#88216a", "#892269", "#8b2269", "#8d2369", "#8e2468", "#902468", "#912567", "#932567", "#952666", "#962666", "#982765", "#992864", "#9b2864", "#9c2963", "#9e2963", "#a02a62", "#a12b61", "#a32b61", "#a42c60", "#a62c5f", "#a72d5f", "#a92e5e", "#ab2e5d", "#ac2f5c", "#ae305b", "#af315b", "#b1315a", "#b23259", "#b43358", "#b53357", "#b73456", "#b83556", "#ba3655", "#bb3754", "#bd3753", "#be3852", "#bf3951", "#c13a50", "#c23b4f", "#c43c4e", "#c53d4d", "#c73e4c", "#c83e4b", "#c93f4a", "#cb4049", "#cc4148", "#cd4247", "#cf4446", "#d04544", "#d14643", "#d24742", "#d44841", "#d54940", "#d64a3f", "#d74b3e", "#d94d3d", "#da4e3b", "#db4f3a", "#dc5039", "#dd5238", "#de5337", "#df5436", "#e05634", "#e25733", "#e35832", "#e45a31", "#e55b30", "#e65c2e", "#e65e2d", "#e75f2c", "#e8612b", "#e9622a", "#ea6428", "#eb6527", "#ec6726", "#ed6825", "#ed6a23", "#ee6c22", "#ef6d21", "#f06f1f", "#f0701e", "#f1721d", "#f2741c", "#f2751a", "#f37719", "#f37918", "#f47a16", "#f57c15", "#f57e14", "#f68012", "#f68111", "#f78310", "#f7850e", "#f8870d", "#f8880c", "#f88a0b", "#f98c09", "#f98e08", "#f99008", "#fa9107", "#fa9306", "#fa9506", "#fa9706", "#fb9906", "#fb9b06", "#fb9d06", "#fb9e07", "#fba007", "#fba208", "#fba40a", "#fba60b", "#fba80d", "#fbaa0e", "#fbac10", "#fbae12", "#fbb014", "#fbb116", "#fbb318", "#fbb51a", "#fbb71c", "#fbb91e", "#fabb21", "#fabd23", "#fabf25", "#fac128", "#f9c32a", "#f9c52c", "#f9c72f", "#f8c931", "#f8cb34", "#f8cd37", "#f7cf3a", "#f7d13c", "#f6d33f", "#f6d542", "#f5d745", "#f5d948", "#f4db4b", "#f4dc4f", "#f3de52", "#f3e056", "#f3e259", "#f2e45d", "#f2e660", "#f1e864", "#f1e968", "#f1eb6c", "#f1ed70", "#f1ee74", "#f1f079", "#f1f27d", "#f2f381", "#f2f485", "#f3f689", "#f4f78d", "#f5f891", "#f6fa95", "#f7fb99", "#f9fc9d", "#fafda0", "#fcfea4"]
  },
  "bokeh_Magma": {
    3: ["#000003", "#b53679", "#fbfcbf"],
    4: ["#000003", "#711f81", "#f0605d", "#fbfcbf"],
    5: ["#000003", "#4f117b", "#b53679", "#fb8660", "#fbfcbf"],
    6: ["#000003", "#3b0f6f", "#8c2980", "#dd4968", "#fd9f6c", "#fbfcbf"],
    7: ["#000003", "#2b115e", "#711f81", "#b53679", "#f0605d", "#feae76", "#fbfcbf"],
    8: ["#000003", "#221150", "#5d177e", "#972c7f", "#d1426e", "#f8755c", "#feb97f", "#fbfcbf"],
    9: ["#000003", "#1b1044", "#4f117b", "#812581", "#b53679", "#e55063", "#fb8660", "#fec286", "#fbfcbf"],
    10: ["#000003", "#170f3c", "#430f75", "#711f81", "#9e2e7e", "#cb3e71", "#f0605d", "#fc9366", "#fec78b", "#fbfcbf"],
    11: ["#000003", "#140d35", "#3b0f6f", "#63197f", "#8c2980", "#b53679", "#dd4968", "#f66e5b", "#fd9f6c", "#fdcd90", "#fbfcbf"],
    256: ["#000003", "#000004", "#000006", "#010007", "#010109", "#01010b", "#02020d", "#02020f", "#030311", "#040313", "#040415", "#050417", "#060519", "#07051b", "#08061d", "#09071f", "#0a0722", "#0b0824", "#0c0926", "#0d0a28", "#0e0a2a", "#0f0b2c", "#100c2f", "#110c31", "#120d33", "#140d35", "#150e38", "#160e3a", "#170f3c", "#180f3f", "#1a1041", "#1b1044", "#1c1046", "#1e1049", "#1f114b", "#20114d", "#221150", "#231152", "#251155", "#261157", "#281159", "#2a115c", "#2b115e", "#2d1060", "#2f1062", "#301065", "#321067", "#341068", "#350f6a", "#370f6c", "#390f6e", "#3b0f6f", "#3c0f71", "#3e0f72", "#400f73", "#420f74", "#430f75", "#450f76", "#470f77", "#481078", "#4a1079", "#4b1079", "#4d117a", "#4f117b", "#50127b", "#52127c", "#53137c", "#55137d", "#57147d", "#58157e", "#5a157e", "#5b167e", "#5d177e", "#5e177f", "#60187f", "#61187f", "#63197f", "#651a80", "#661a80", "#681b80", "#691c80", "#6b1c80", "#6c1d80", "#6e1e81", "#6f1e81", "#711f81", "#731f81", "#742081", "#762181", "#772181", "#792281", "#7a2281", "#7c2381", "#7e2481", "#7f2481", "#812581", "#822581", "#842681", "#852681", "#872781", "#892881", "#8a2881", "#8c2980", "#8d2980", "#8f2a80", "#912a80", "#922b80", "#942b80", "#952c80", "#972c7f", "#992d7f", "#9a2d7f", "#9c2e7f", "#9e2e7e", "#9f2f7e", "#a12f7e", "#a3307e", "#a4307d", "#a6317d", "#a7317d", "#a9327c", "#ab337c", "#ac337b", "#ae347b", "#b0347b", "#b1357a", "#b3357a", "#b53679", "#b63679", "#b83778", "#b93778", "#bb3877", "#bd3977", "#be3976", "#c03a75", "#c23a75", "#c33b74", "#c53c74", "#c63c73", "#c83d72", "#ca3e72", "#cb3e71", "#cd3f70", "#ce4070", "#d0416f", "#d1426e", "#d3426d", "#d4436d", "#d6446c", "#d7456b", "#d9466a", "#da4769", "#dc4869", "#dd4968", "#de4a67", "#e04b66", "#e14c66", "#e24d65", "#e44e64", "#e55063", "#e65162", "#e75262", "#e85461", "#ea5560", "#eb5660", "#ec585f", "#ed595f", "#ee5b5e", "#ee5d5d", "#ef5e5d", "#f0605d", "#f1615c", "#f2635c", "#f3655c", "#f3675b", "#f4685b", "#f56a5b", "#f56c5b", "#f66e5b", "#f6705b", "#f7715b", "#f7735c", "#f8755c", "#f8775c", "#f9795c", "#f97b5d", "#f97d5d", "#fa7f5e", "#fa805e", "#fa825f", "#fb8460", "#fb8660", "#fb8861", "#fb8a62", "#fc8c63", "#fc8e63", "#fc9064", "#fc9265", "#fc9366", "#fd9567", "#fd9768", "#fd9969", "#fd9b6a", "#fd9d6b", "#fd9f6c", "#fda16e", "#fda26f", "#fda470", "#fea671", "#fea873", "#feaa74", "#feac75", "#feae76", "#feaf78", "#feb179", "#feb37b", "#feb57c", "#feb77d", "#feb97f", "#febb80", "#febc82", "#febe83", "#fec085", "#fec286", "#fec488", "#fec689", "#fec78b", "#fec98d", "#fecb8e", "#fdcd90", "#fdcf92", "#fdd193", "#fdd295", "#fdd497", "#fdd698", "#fdd89a", "#fdda9c", "#fddc9d", "#fddd9f", "#fddfa1", "#fde1a3", "#fce3a5", "#fce5a6", "#fce6a8", "#fce8aa", "#fceaac", "#fcecae", "#fceeb0", "#fcf0b1", "#fcf1b3", "#fcf3b5", "#fcf5b7", "#fbf7b9", "#fbf9bb", "#fbfabd", "#fbfcbf"]
  },
  "bokeh_Plasma": {
    3: ["#0c0786", "#ca4678", "#eff821"],
    4: ["#0c0786", "#9b179e", "#ec7853", "#eff821"],
    5: ["#0c0786", "#7c02a7", "#ca4678", "#f79341", "#eff821"],
    6: ["#0c0786", "#6a00a7", "#b02a8f", "#e06461", "#fca635", "#eff821"],
    7: ["#0c0786", "#5c00a5", "#9b179e", "#ca4678", "#ec7853", "#fdb22f", "#eff821"],
    8: ["#0c0786", "#5201a3", "#8908a5", "#b83289", "#da5a68", "#f38748", "#fdbb2b", "#eff821"],
    9: ["#0c0786", "#4a02a0", "#7c02a7", "#a82296", "#ca4678", "#e56b5c", "#f79341", "#fdc328", "#eff821"],
    10: ["#0c0786", "#45039e", "#7200a8", "#9b179e", "#bc3685", "#d7566c", "#ec7853", "#fa9d3a", "#fcc726", "#eff821"],
    11: ["#0c0786", "#40039c", "#6a00a7", "#8f0da3", "#b02a8f", "#ca4678", "#e06461", "#f1824c", "#fca635", "#fccc25", "#eff821"],
    256: ["#0c0786", "#100787", "#130689", "#15068a", "#18068b", "#1b068c", "#1d068d", "#1f058e", "#21058f", "#230590", "#250591", "#270592", "#290593", "#2b0594", "#2d0494", "#2f0495", "#310496", "#330497", "#340498", "#360498", "#380499", "#3a049a", "#3b039a", "#3d039b", "#3f039c", "#40039c", "#42039d", "#44039e", "#45039e", "#47029f", "#49029f", "#4a02a0", "#4c02a1", "#4e02a1", "#4f02a2", "#5101a2", "#5201a3", "#5401a3", "#5601a3", "#5701a4", "#5901a4", "#5a00a5", "#5c00a5", "#5e00a5", "#5f00a6", "#6100a6", "#6200a6", "#6400a7", "#6500a7", "#6700a7", "#6800a7", "#6a00a7", "#6c00a8", "#6d00a8", "#6f00a8", "#7000a8", "#7200a8", "#7300a8", "#7500a8", "#7601a8", "#7801a8", "#7901a8", "#7b02a8", "#7c02a7", "#7e03a7", "#7f03a7", "#8104a7", "#8204a7", "#8405a6", "#8506a6", "#8607a6", "#8807a5", "#8908a5", "#8b09a4", "#8c0aa4", "#8e0ca4", "#8f0da3", "#900ea3", "#920fa2", "#9310a1", "#9511a1", "#9612a0", "#9713a0", "#99149f", "#9a159e", "#9b179e", "#9d189d", "#9e199c", "#9f1a9b", "#a01b9b", "#a21c9a", "#a31d99", "#a41e98", "#a51f97", "#a72197", "#a82296", "#a92395", "#aa2494", "#ac2593", "#ad2692", "#ae2791", "#af2890", "#b02a8f", "#b12b8f", "#b22c8e", "#b42d8d", "#b52e8c", "#b62f8b", "#b7308a", "#b83289", "#b93388", "#ba3487", "#bb3586", "#bc3685", "#bd3784", "#be3883", "#bf3982", "#c03b81", "#c13c80", "#c23d80", "#c33e7f", "#c43f7e", "#c5407d", "#c6417c", "#c7427b", "#c8447a", "#c94579", "#ca4678", "#cb4777", "#cc4876", "#cd4975", "#ce4a75", "#cf4b74", "#d04d73", "#d14e72", "#d14f71", "#d25070", "#d3516f", "#d4526e", "#d5536d", "#d6556d", "#d7566c", "#d7576b", "#d8586a", "#d95969", "#da5a68", "#db5b67", "#dc5d66", "#dc5e66", "#dd5f65", "#de6064", "#df6163", "#df6262", "#e06461", "#e16560", "#e26660", "#e3675f", "#e3685e", "#e46a5d", "#e56b5c", "#e56c5b", "#e66d5a", "#e76e5a", "#e87059", "#e87158", "#e97257", "#ea7356", "#ea7455", "#eb7654", "#ec7754", "#ec7853", "#ed7952", "#ed7b51", "#ee7c50", "#ef7d4f", "#ef7e4e", "#f0804d", "#f0814d", "#f1824c", "#f2844b", "#f2854a", "#f38649", "#f38748", "#f48947", "#f48a47", "#f58b46", "#f58d45", "#f68e44", "#f68f43", "#f69142", "#f79241", "#f79341", "#f89540", "#f8963f", "#f8983e", "#f9993d", "#f99a3c", "#fa9c3b", "#fa9d3a", "#fa9f3a", "#faa039", "#fba238", "#fba337", "#fba436", "#fca635", "#fca735", "#fca934", "#fcaa33", "#fcac32", "#fcad31", "#fdaf31", "#fdb030", "#fdb22f", "#fdb32e", "#fdb52d", "#fdb62d", "#fdb82c", "#fdb92b", "#fdbb2b", "#fdbc2a", "#fdbe29", "#fdc029", "#fdc128", "#fdc328", "#fdc427", "#fdc626", "#fcc726", "#fcc926", "#fccb25", "#fccc25", "#fcce25", "#fbd024", "#fbd124", "#fbd324", "#fad524", "#fad624", "#fad824", "#f9d924", "#f9db24", "#f8dd24", "#f8df24", "#f7e024", "#f7e225", "#f6e425", "#f6e525", "#f5e726", "#f5e926", "#f4ea26", "#f3ec26", "#f3ee26", "#f2f026", "#f2f126", "#f1f326", "#f0f525", "#f0f623", "#eff821"]
  },
  "bokeh_Viridis": {
    3: ["#440154", "#208f8c", "#fde724"],
    4: ["#440154", "#30678d", "#35b778", "#fde724"],
    5: ["#440154", "#3b518a", "#208f8c", "#5bc862", "#fde724"],
    6: ["#440154", "#404387", "#29788e", "#22a784", "#79d151", "#fde724"],
    7: ["#440154", "#443982", "#30678d", "#208f8c", "#35b778", "#8dd644", "#fde724"],
    8: ["#440154", "#46317e", "#365a8c", "#277e8e", "#1ea087", "#49c16d", "#9dd93a", "#fde724"],
    9: ["#440154", "#472b7a", "#3b518a", "#2c718e", "#208f8c", "#27ad80", "#5bc862", "#aadb32", "#fde724"],
    10: ["#440154", "#472777", "#3e4989", "#30678d", "#25828e", "#1e9c89", "#35b778", "#6bcd59", "#b2dd2c", "#fde724"],
    11: ["#440154", "#482374", "#404387", "#345e8d", "#29788e", "#208f8c", "#22a784", "#42be71", "#79d151", "#bade27", "#fde724"],
    256: ["#440154", "#440255", "#440357", "#450558", "#45065a", "#45085b", "#46095c", "#460b5e", "#460c5f", "#460e61", "#470f62", "#471163", "#471265", "#471466", "#471567", "#471669", "#47186a", "#48196b", "#481a6c", "#481c6e", "#481d6f", "#481e70", "#482071", "#482172", "#482273", "#482374", "#472575", "#472676", "#472777", "#472878", "#472a79", "#472b7a", "#472c7b", "#462d7c", "#462f7c", "#46307d", "#46317e", "#45327f", "#45347f", "#453580", "#453681", "#443781", "#443982", "#433a83", "#433b83", "#433c84", "#423d84", "#423e85", "#424085", "#414186", "#414286", "#404387", "#404487", "#3f4587", "#3f4788", "#3e4888", "#3e4989", "#3d4a89", "#3d4b89", "#3d4c89", "#3c4d8a", "#3c4e8a", "#3b508a", "#3b518a", "#3a528b", "#3a538b", "#39548b", "#39558b", "#38568b", "#38578c", "#37588c", "#37598c", "#365a8c", "#365b8c", "#355c8c", "#355d8c", "#345e8d", "#345f8d", "#33608d", "#33618d", "#32628d", "#32638d", "#31648d", "#31658d", "#31668d", "#30678d", "#30688d", "#2f698d", "#2f6a8d", "#2e6b8e", "#2e6c8e", "#2e6d8e", "#2d6e8e", "#2d6f8e", "#2c708e", "#2c718e", "#2c728e", "#2b738e", "#2b748e", "#2a758e", "#2a768e", "#2a778e", "#29788e", "#29798e", "#287a8e", "#287a8e", "#287b8e", "#277c8e", "#277d8e", "#277e8e", "#267f8e", "#26808e", "#26818e", "#25828e", "#25838d", "#24848d", "#24858d", "#24868d", "#23878d", "#23888d", "#23898d", "#22898d", "#228a8d", "#228b8d", "#218c8d", "#218d8c", "#218e8c", "#208f8c", "#20908c", "#20918c", "#1f928c", "#1f938b", "#1f948b", "#1f958b", "#1f968b", "#1e978a", "#1e988a", "#1e998a", "#1e998a", "#1e9a89", "#1e9b89", "#1e9c89", "#1e9d88", "#1e9e88", "#1e9f88", "#1ea087", "#1fa187", "#1fa286", "#1fa386", "#20a485", "#20a585", "#21a685", "#21a784", "#22a784", "#23a883", "#23a982", "#24aa82", "#25ab81", "#26ac81", "#27ad80", "#28ae7f", "#29af7f", "#2ab07e", "#2bb17d", "#2cb17d", "#2eb27c", "#2fb37b", "#30b47a", "#32b57a", "#33b679", "#35b778", "#36b877", "#38b976", "#39b976", "#3bba75", "#3dbb74", "#3ebc73", "#40bd72", "#42be71", "#44be70", "#45bf6f", "#47c06e", "#49c16d", "#4bc26c", "#4dc26b", "#4fc369", "#51c468", "#53c567", "#55c666", "#57c665", "#59c764", "#5bc862", "#5ec961", "#60c960", "#62ca5f", "#64cb5d", "#67cc5c", "#69cc5b", "#6bcd59", "#6dce58", "#70ce56", "#72cf55", "#74d054", "#77d052", "#79d151", "#7cd24f", "#7ed24e", "#81d34c", "#83d34b", "#86d449", "#88d547", "#8bd546", "#8dd644", "#90d643", "#92d741", "#95d73f", "#97d83e", "#9ad83c", "#9dd93a", "#9fd938", "#a2da37", "#a5da35", "#a7db33", "#aadb32", "#addc30", "#afdc2e", "#b2dd2c", "#b5dd2b", "#b7dd29", "#bade27", "#bdde26", "#bfdf24", "#c2df22", "#c5df21", "#c7e01f", "#cae01e", "#cde01d", "#cfe11c", "#d2e11b", "#d4e11a", "#d7e219", "#dae218", "#dce218", "#dfe318", "#e1e318", "#e4e318", "#e7e419", "#e9e419", "#ece41a", "#eee51b", "#f1e51c", "#f3e51e", "#f6e61f", "#f8e621", "#fae622", "#fde724"]
  }
};
exports.BOKEH_PALETTE_DATA = BOKEH_PALETTE_DATA;
var BOKEH_DOCS_PALETTE_DATA = {
  "bokeh_Category10": ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
  "bokeh_Category20": ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
  "bokeh_Category20b": ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"],
  "bokeh_Category20c": ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"],
  "bokeh_Colorblind": ["#0072b2", "#e69f00", "#f0e442", "#009e73", "#56b4e9", "#d55e00", "#cc79a7", "#000000"],
  "bokeh_Accent": ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  "bokeh_Dark2": ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  "bokeh_Paired": ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
  "bokeh_Pastel1": ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"],
  "bokeh_Pastel2": ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
  "bokeh_Set1": ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
  "bokeh_Set2": ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  "bokeh_Set3": ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
  "bokeh_YlGn": ["#004529", "#004529", "#006837", "#238443", "#41ab5d", "#78c679", "#addd8e", "#d9f0a3", "#f7fcb9", "#ffffe5", "#ffffe5"],
  "bokeh_YlGnBu": ["#081d58", "#081d58", "#253494", "#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#edf8b1", "#ffffd9", "#ffffd9"],
  "bokeh_GnBu": ["#084081", "#084081", "#0868ac", "#2b8cbe", "#4eb3d3", "#7bccc4", "#a8ddb5", "#ccebc5", "#e0f3db", "#f7fcf0", "#f7fcf0"],
  "bokeh_BuGn": ["#00441b", "#00441b", "#006d2c", "#238b45", "#41ae76", "#66c2a4", "#99d8c9", "#ccece6", "#e5f5f9", "#f7fcfd", "#f7fcfd"],
  "bokeh_PuBuGn": ["#014636", "#014636", "#016c59", "#02818a", "#3690c0", "#67a9cf", "#a6bddb", "#d0d1e6", "#ece2f0", "#fff7fb", "#fff7fb"],
  "bokeh_PuBu": ["#023858", "#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#ece7f2", "#fff7fb", "#fff7fb"],
  "bokeh_BuPu": ["#4d004b", "#4d004b", "#810f7c", "#88419d", "#8c6bb1", "#8c96c6", "#9ebcda", "#bfd3e6", "#e0ecf4", "#f7fcfd", "#f7fcfd"],
  "bokeh_RdPu": ["#49006a", "#49006a", "#7a0177", "#ae017e", "#dd3497", "#f768a1", "#fa9fb5", "#fcc5c0", "#fde0dd", "#fff7f3", "#fff7f3"],
  "bokeh_PuRd": ["#67001f", "#67001f", "#980043", "#ce1256", "#e7298a", "#df65b0", "#c994c7", "#d4b9da", "#e7e1ef", "#f7f4f9", "#f7f4f9"],
  "bokeh_OrRd": ["#7f0000", "#7f0000", "#b30000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fee8c8", "#fff7ec", "#fff7ec"],
  "bokeh_YlOrRd": ["#800026", "#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffeda0", "#ffffcc", "#ffffcc"],
  "bokeh_YlOrBr": ["#662506", "#662506", "#993404", "#cc4c02", "#ec7014", "#fe9929", "#fec44f", "#fee391", "#fff7bc", "#ffffe5", "#ffffe5"],
  "bokeh_Purples": ["#3f007d", "#3f007d", "#54278f", "#6a51a3", "#807dba", "#9e9ac8", "#bcbddc", "#dadaeb", "#efedf5", "#fcfbfd", "#fcfbfd"],
  "bokeh_Blues": ["#08306b", "#08306b", "#08519c", "#2171b5", "#4292c6", "#6baed6", "#9ecae1", "#c6dbef", "#deebf7", "#f7fbff", "#f7fbff"],
  "bokeh_Greens": ["#00441b", "#00441b", "#006d2c", "#238b45", "#41ab5d", "#74c476", "#a1d99b", "#c7e9c0", "#e5f5e0", "#f7fcf5", "#f7fcf5"],
  "bokeh_Oranges": ["#7f2704", "#7f2704", "#a63603", "#d94801", "#f16913", "#fd8d3c", "#fdae6b", "#fdd0a2", "#fee6ce", "#fff5eb", "#fff5eb"],
  "bokeh_Reds": ["#67000d", "#67000d", "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2", "#fff5f0", "#fff5f0"],
  "bokeh_Greys": ["#000000", "#191919", "#333333", "#4c4c4c", "#666666", "#808080", "#999999", "#b3b3b3", "#cccccc", "#e6e6e6", "#ffffff"],
  "bokeh_PuOr": ["#2d004b", "#542788", "#8073ac", "#b2abd2", "#d8daeb", "#f7f7f7", "#fee0b6", "#fdb863", "#e08214", "#b35806", "#7f3b08"],
  "bokeh_BrBG": ["#003c30", "#01665e", "#35978f", "#80cdc1", "#c7eae5", "#f5f5f5", "#f6e8c3", "#dfc27d", "#bf812d", "#8c510a", "#543005"],
  "bokeh_PRGn": ["#00441b", "#1b7837", "#5aae61", "#a6dba0", "#d9f0d3", "#f7f7f7", "#e7d4e8", "#c2a5cf", "#9970ab", "#762a83", "#40004b"],
  "bokeh_PiYG": ["#276419", "#4d9221", "#7fbc41", "#b8e186", "#e6f5d0", "#f7f7f7", "#fde0ef", "#f1b6da", "#de77ae", "#c51b7d", "#8e0152"],
  "bokeh_RdBu": ["#053061", "#2166ac", "#4393c3", "#92c5de", "#d1e5f0", "#f7f7f7", "#fddbc7", "#f4a582", "#d6604d", "#b2182b", "#67001f"],
  "bokeh_RdGy": ["#1a1a1a", "#4d4d4d", "#878787", "#bababa", "#e0e0e0", "#ffffff", "#fddbc7", "#f4a582", "#d6604d", "#b2182b", "#67001f"],
  "bokeh_RdYlBu": ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"],
  "bokeh_Spectral": ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"],
  "bokeh_RdYlGn": ["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"],
  "bokeh_Inferno": ["#000003", "#160b39", "#410967", "#6a176e", "#932567", "#bb3754", "#dc5039", "#f37719", "#fba40a", "#f5d745", "#fcfea4"],
  "bokeh_Magma": ["#000003", "#140d35", "#3b0f6f", "#63197f", "#8c2980", "#b63679", "#dd4968", "#f6705b", "#fd9f6c", "#fdcf92", "#fbfcbf"],
  "bokeh_Plasma": ["#0c0786", "#40039c", "#6a00a7", "#8f0da3", "#b02a8f", "#cb4777", "#e06461", "#f2844b", "#fca635", "#fcce25", "#eff821"],
  "bokeh_Viridis": ["#440154", "#482374", "#404387", "#345e8d", "#29788e", "#20908c", "#22a784", "#44be70", "#79d151", "#bdde26", "#fde724"]
};
exports.BOKEH_DOCS_PALETTE_DATA = BOKEH_DOCS_PALETTE_DATA;
var BOKEH_CATEGORY_10 = "bokeh_Category10";
exports.BOKEH_CATEGORY_10 = BOKEH_CATEGORY_10;
var BOKEH_CATEGORY_20 = "bokeh_Category20";
exports.BOKEH_CATEGORY_20 = BOKEH_CATEGORY_20;
var BOKEH_CATEGORY_20_B = "bokeh_Category20b";
exports.BOKEH_CATEGORY_20_B = BOKEH_CATEGORY_20_B;
var BOKEH_CATEGORY_20_C = "bokeh_Category20c";
exports.BOKEH_CATEGORY_20_C = BOKEH_CATEGORY_20_C;
var BOKEH_COLORBLIND = "bokeh_Colorblind";
exports.BOKEH_COLORBLIND = BOKEH_COLORBLIND;
var BOKEH_ACCENT = "bokeh_Accent";
exports.BOKEH_ACCENT = BOKEH_ACCENT;
var BOKEH_DARK_2 = "bokeh_Dark2";
exports.BOKEH_DARK_2 = BOKEH_DARK_2;
var BOKEH_PAIRED = "bokeh_Paired";
exports.BOKEH_PAIRED = BOKEH_PAIRED;
var BOKEH_PASTEL_1 = "bokeh_Pastel1";
exports.BOKEH_PASTEL_1 = BOKEH_PASTEL_1;
var BOKEH_PASTEL_2 = "bokeh_Pastel2";
exports.BOKEH_PASTEL_2 = BOKEH_PASTEL_2;
var BOKEH_SET_1 = "bokeh_Set1";
exports.BOKEH_SET_1 = BOKEH_SET_1;
var BOKEH_SET_2 = "bokeh_Set2";
exports.BOKEH_SET_2 = BOKEH_SET_2;
var BOKEH_SET_3 = "bokeh_Set3";
exports.BOKEH_SET_3 = BOKEH_SET_3;
var BOKEH_YELLOW_GREEN = "bokeh_YlGn";
exports.BOKEH_YELLOW_GREEN = BOKEH_YELLOW_GREEN;
var BOKEH_YELLOW_GREEN_BLUE = "bokeh_YlGnBu";
exports.BOKEH_YELLOW_GREEN_BLUE = BOKEH_YELLOW_GREEN_BLUE;
var BOKEH_GREEN_BLUE = "bokeh_GnBu";
exports.BOKEH_GREEN_BLUE = BOKEH_GREEN_BLUE;
var BOKEH_BLUE_GREEN = "bokeh_BuGn";
exports.BOKEH_BLUE_GREEN = BOKEH_BLUE_GREEN;
var BOKEH_PURPLE_BLUE_GREEN = "bokeh_PuBuGn";
exports.BOKEH_PURPLE_BLUE_GREEN = BOKEH_PURPLE_BLUE_GREEN;
var BOKEH_PURPLE_BLUE = "bokeh_PuBu";
exports.BOKEH_PURPLE_BLUE = BOKEH_PURPLE_BLUE;
var BOKEH_BLUE_PURPLE = "bokeh_BuPu";
exports.BOKEH_BLUE_PURPLE = BOKEH_BLUE_PURPLE;
var BOKEH_RED_PURPLE = "bokeh_RdPu";
exports.BOKEH_RED_PURPLE = BOKEH_RED_PURPLE;
var BOKEH_PURPLE_RED = "bokeh_PuRd";
exports.BOKEH_PURPLE_RED = BOKEH_PURPLE_RED;
var BOKEH_ORANGE_RED = "bokeh_OrRd";
exports.BOKEH_ORANGE_RED = BOKEH_ORANGE_RED;
var BOKEH_YELLOW_ORANGE_RED = "bokeh_YlOrRd";
exports.BOKEH_YELLOW_ORANGE_RED = BOKEH_YELLOW_ORANGE_RED;
var BOKEH_YELLOW_ORANGE_BROWN = "bokeh_YlOrBr";
exports.BOKEH_YELLOW_ORANGE_BROWN = BOKEH_YELLOW_ORANGE_BROWN;
var BOKEH_PURPLES = "bokeh_Purples";
exports.BOKEH_PURPLES = BOKEH_PURPLES;
var BOKEH_BLUES = "bokeh_Blues";
exports.BOKEH_BLUES = BOKEH_BLUES;
var BOKEH_GREENS = "bokeh_Greens";
exports.BOKEH_GREENS = BOKEH_GREENS;
var BOKEH_ORANGES = "bokeh_Oranges";
exports.BOKEH_ORANGES = BOKEH_ORANGES;
var BOKEH_REDS = "bokeh_Reds";
exports.BOKEH_REDS = BOKEH_REDS;
var BOKEH_GREYS = "bokeh_Greys";
exports.BOKEH_GREYS = BOKEH_GREYS;
var BOKEH_PURPLE_ORANGE = "bokeh_PuOr";
exports.BOKEH_PURPLE_ORANGE = BOKEH_PURPLE_ORANGE;
var BOKEH_BROWN_BLUE_GREEN = "bokeh_BrBG";
exports.BOKEH_BROWN_BLUE_GREEN = BOKEH_BROWN_BLUE_GREEN;
var BOKEH_PURPLE_GREEN = "bokeh_PRGn";
exports.BOKEH_PURPLE_GREEN = BOKEH_PURPLE_GREEN;
var BOKEH_PINK_YELLOW_GREEN = "bokeh_PiYG";
exports.BOKEH_PINK_YELLOW_GREEN = BOKEH_PINK_YELLOW_GREEN;
var BOKEH_RED_BLUE = "bokeh_RdBu";
exports.BOKEH_RED_BLUE = BOKEH_RED_BLUE;
var BOKEH_RED_GREY = "bokeh_RdGy";
exports.BOKEH_RED_GREY = BOKEH_RED_GREY;
var BOKEH_RED_YELLOW_BLUE = "bokeh_RdYlBu";
exports.BOKEH_RED_YELLOW_BLUE = BOKEH_RED_YELLOW_BLUE;
var BOKEH_SPECTRAL = "bokeh_Spectral";
exports.BOKEH_SPECTRAL = BOKEH_SPECTRAL;
var BOKEH_RED_YELLOW_GREEN = "bokeh_RdYlGn";
exports.BOKEH_RED_YELLOW_GREEN = BOKEH_RED_YELLOW_GREEN;
var BOKEH_INFERNO = "bokeh_Inferno";
exports.BOKEH_INFERNO = BOKEH_INFERNO;
var BOKEH_MAGMA = "bokeh_Magma";
exports.BOKEH_MAGMA = BOKEH_MAGMA;
var BOKEH_PLASMA = "bokeh_Plasma";
exports.BOKEH_PLASMA = BOKEH_PLASMA;
var BOKEH_VIRIDIS = "bokeh_Viridis";
exports.BOKEH_VIRIDIS = BOKEH_VIRIDIS;
var _BOKEH_PALETTE_NAMES = {};
_BOKEH_PALETTE_NAMES['BOKEH_CATEGORY_10'] = 'bokeh_Category10';
_BOKEH_PALETTE_NAMES['BOKEH_CATEGORY_20'] = 'bokeh_Category20';
_BOKEH_PALETTE_NAMES['BOKEH_CATEGORY_20_B'] = 'bokeh_Category20b';
_BOKEH_PALETTE_NAMES['BOKEH_CATEGORY_20_C'] = 'bokeh_Category20c';
_BOKEH_PALETTE_NAMES['BOKEH_COLORBLIND'] = 'bokeh_Colorblind';
_BOKEH_PALETTE_NAMES['BOKEH_ACCENT'] = 'bokeh_Accent';
_BOKEH_PALETTE_NAMES['BOKEH_DARK_2'] = 'bokeh_Dark2';
_BOKEH_PALETTE_NAMES['BOKEH_PAIRED'] = 'bokeh_Paired';
_BOKEH_PALETTE_NAMES['BOKEH_PASTEL_1'] = 'bokeh_Pastel1';
_BOKEH_PALETTE_NAMES['BOKEH_PASTEL_2'] = 'bokeh_Pastel2';
_BOKEH_PALETTE_NAMES['BOKEH_SET_1'] = 'bokeh_Set1';
_BOKEH_PALETTE_NAMES['BOKEH_SET_2'] = 'bokeh_Set2';
_BOKEH_PALETTE_NAMES['BOKEH_SET_3'] = 'bokeh_Set3';
_BOKEH_PALETTE_NAMES['BOKEH_YELLOW_GREEN'] = 'bokeh_YlGn';
_BOKEH_PALETTE_NAMES['BOKEH_YELLOW_GREEN_BLUE'] = 'bokeh_YlGnBu';
_BOKEH_PALETTE_NAMES['BOKEH_GREEN_BLUE'] = 'bokeh_GnBu';
_BOKEH_PALETTE_NAMES['BOKEH_BLUE_GREEN'] = 'bokeh_BuGn';
_BOKEH_PALETTE_NAMES['BOKEH_PURPLE_BLUE_GREEN'] = 'bokeh_PuBuGn';
_BOKEH_PALETTE_NAMES['BOKEH_PURPLE_BLUE'] = 'bokeh_PuBu';
_BOKEH_PALETTE_NAMES['BOKEH_BLUE_PURPLE'] = 'bokeh_BuPu';
_BOKEH_PALETTE_NAMES['BOKEH_RED_PURPLE'] = 'bokeh_RdPu';
_BOKEH_PALETTE_NAMES['BOKEH_PURPLE_RED'] = 'bokeh_PuRd';
_BOKEH_PALETTE_NAMES['BOKEH_ORANGE_RED'] = 'bokeh_OrRd';
_BOKEH_PALETTE_NAMES['BOKEH_YELLOW_ORANGE_RED'] = 'bokeh_YlOrRd';
_BOKEH_PALETTE_NAMES['BOKEH_YELLOW_ORANGE_BROWN'] = 'bokeh_YlOrBr';
_BOKEH_PALETTE_NAMES['BOKEH_PURPLES'] = 'bokeh_Purples';
_BOKEH_PALETTE_NAMES['BOKEH_BLUES'] = 'bokeh_Blues';
_BOKEH_PALETTE_NAMES['BOKEH_GREENS'] = 'bokeh_Greens';
_BOKEH_PALETTE_NAMES['BOKEH_ORANGES'] = 'bokeh_Oranges';
_BOKEH_PALETTE_NAMES['BOKEH_REDS'] = 'bokeh_Reds';
_BOKEH_PALETTE_NAMES['BOKEH_GREYS'] = 'bokeh_Greys';
_BOKEH_PALETTE_NAMES['BOKEH_PURPLE_ORANGE'] = 'bokeh_PuOr';
_BOKEH_PALETTE_NAMES['BOKEH_BROWN_BLUE_GREEN'] = 'bokeh_BrBG';
_BOKEH_PALETTE_NAMES['BOKEH_PURPLE_GREEN'] = 'bokeh_PRGn';
_BOKEH_PALETTE_NAMES['BOKEH_PINK_YELLOW_GREEN'] = 'bokeh_PiYG';
_BOKEH_PALETTE_NAMES['BOKEH_RED_BLUE'] = 'bokeh_RdBu';
_BOKEH_PALETTE_NAMES['BOKEH_RED_GREY'] = 'bokeh_RdGy';
_BOKEH_PALETTE_NAMES['BOKEH_RED_YELLOW_BLUE'] = 'bokeh_RdYlBu';
_BOKEH_PALETTE_NAMES['BOKEH_SPECTRAL'] = 'bokeh_Spectral';
_BOKEH_PALETTE_NAMES['BOKEH_RED_YELLOW_GREEN'] = 'bokeh_RdYlGn';
_BOKEH_PALETTE_NAMES['BOKEH_INFERNO'] = 'bokeh_Inferno';
_BOKEH_PALETTE_NAMES['BOKEH_MAGMA'] = 'bokeh_Magma';
_BOKEH_PALETTE_NAMES['BOKEH_PLASMA'] = 'bokeh_Plasma';
_BOKEH_PALETTE_NAMES['BOKEH_VIRIDIS'] = 'bokeh_Viridis';
var BOKEH_PALETTE_NAMES = _BOKEH_PALETTE_NAMES;
exports.BOKEH_PALETTE_NAMES = BOKEH_PALETTE_NAMES;
var _BOKEH_PALETTES = {};
_BOKEH_PALETTES['Category10'] = BOKEH_PALETTE_DATA[BOKEH_CATEGORY_10];
_BOKEH_PALETTES['Category20'] = BOKEH_PALETTE_DATA[BOKEH_CATEGORY_20];
_BOKEH_PALETTES['Category20b'] = BOKEH_PALETTE_DATA[BOKEH_CATEGORY_20_B];
_BOKEH_PALETTES['Category20c'] = BOKEH_PALETTE_DATA[BOKEH_CATEGORY_20_C];
_BOKEH_PALETTES['Colorblind'] = BOKEH_PALETTE_DATA[BOKEH_COLORBLIND];
_BOKEH_PALETTES['Accent'] = BOKEH_PALETTE_DATA[BOKEH_ACCENT];
_BOKEH_PALETTES['Dark2'] = BOKEH_PALETTE_DATA[BOKEH_DARK_2];
_BOKEH_PALETTES['Paired'] = BOKEH_PALETTE_DATA[BOKEH_PAIRED];
_BOKEH_PALETTES['Pastel1'] = BOKEH_PALETTE_DATA[BOKEH_PASTEL_1];
_BOKEH_PALETTES['Pastel2'] = BOKEH_PALETTE_DATA[BOKEH_PASTEL_2];
_BOKEH_PALETTES['Set1'] = BOKEH_PALETTE_DATA[BOKEH_SET_1];
_BOKEH_PALETTES['Set2'] = BOKEH_PALETTE_DATA[BOKEH_SET_2];
_BOKEH_PALETTES['Set3'] = BOKEH_PALETTE_DATA[BOKEH_SET_3];
_BOKEH_PALETTES['YlGn'] = BOKEH_PALETTE_DATA[BOKEH_YELLOW_GREEN];
_BOKEH_PALETTES['YlGnBu'] = BOKEH_PALETTE_DATA[BOKEH_YELLOW_GREEN_BLUE];
_BOKEH_PALETTES['GnBu'] = BOKEH_PALETTE_DATA[BOKEH_GREEN_BLUE];
_BOKEH_PALETTES['BuGn'] = BOKEH_PALETTE_DATA[BOKEH_BLUE_GREEN];
_BOKEH_PALETTES['PuBuGn'] = BOKEH_PALETTE_DATA[BOKEH_PURPLE_BLUE_GREEN];
_BOKEH_PALETTES['PuBu'] = BOKEH_PALETTE_DATA[BOKEH_PURPLE_BLUE];
_BOKEH_PALETTES['BuPu'] = BOKEH_PALETTE_DATA[BOKEH_BLUE_PURPLE];
_BOKEH_PALETTES['RdPu'] = BOKEH_PALETTE_DATA[BOKEH_RED_PURPLE];
_BOKEH_PALETTES['PuRd'] = BOKEH_PALETTE_DATA[BOKEH_PURPLE_RED];
_BOKEH_PALETTES['OrRd'] = BOKEH_PALETTE_DATA[BOKEH_ORANGE_RED];
_BOKEH_PALETTES['YlOrRd'] = BOKEH_PALETTE_DATA[BOKEH_YELLOW_ORANGE_RED];
_BOKEH_PALETTES['YlOrBr'] = BOKEH_PALETTE_DATA[BOKEH_YELLOW_ORANGE_BROWN];
_BOKEH_PALETTES['Purples'] = BOKEH_PALETTE_DATA[BOKEH_PURPLES];
_BOKEH_PALETTES['Blues'] = BOKEH_PALETTE_DATA[BOKEH_BLUES];
_BOKEH_PALETTES['Greens'] = BOKEH_PALETTE_DATA[BOKEH_GREENS];
_BOKEH_PALETTES['Oranges'] = BOKEH_PALETTE_DATA[BOKEH_ORANGES];
_BOKEH_PALETTES['Reds'] = BOKEH_PALETTE_DATA[BOKEH_REDS];
_BOKEH_PALETTES['Greys'] = BOKEH_PALETTE_DATA[BOKEH_GREYS];
_BOKEH_PALETTES['PuOr'] = BOKEH_PALETTE_DATA[BOKEH_PURPLE_ORANGE];
_BOKEH_PALETTES['BrBG'] = BOKEH_PALETTE_DATA[BOKEH_BROWN_BLUE_GREEN];
_BOKEH_PALETTES['PRGn'] = BOKEH_PALETTE_DATA[BOKEH_PURPLE_GREEN];
_BOKEH_PALETTES['PiYG'] = BOKEH_PALETTE_DATA[BOKEH_PINK_YELLOW_GREEN];
_BOKEH_PALETTES['RdBu'] = BOKEH_PALETTE_DATA[BOKEH_RED_BLUE];
_BOKEH_PALETTES['RdGy'] = BOKEH_PALETTE_DATA[BOKEH_RED_GREY];
_BOKEH_PALETTES['RdYlBu'] = BOKEH_PALETTE_DATA[BOKEH_RED_YELLOW_BLUE];
_BOKEH_PALETTES['Spectral'] = BOKEH_PALETTE_DATA[BOKEH_SPECTRAL];
_BOKEH_PALETTES['RdYlGn'] = BOKEH_PALETTE_DATA[BOKEH_RED_YELLOW_GREEN];
_BOKEH_PALETTES['Inferno'] = BOKEH_PALETTE_DATA[BOKEH_INFERNO];
_BOKEH_PALETTES['Magma'] = BOKEH_PALETTE_DATA[BOKEH_MAGMA];
_BOKEH_PALETTES['Plasma'] = BOKEH_PALETTE_DATA[BOKEH_PLASMA];
_BOKEH_PALETTES['Viridis'] = BOKEH_PALETTE_DATA[BOKEH_VIRIDIS];
var BOKEH_PALETTES = _BOKEH_PALETTES;
exports.BOKEH_PALETTES = BOKEH_PALETTES;
var _BOKEH_DOCS_PALETTES = {};
_BOKEH_DOCS_PALETTES['Category10'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_CATEGORY_10];
_BOKEH_DOCS_PALETTES['Category20'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_CATEGORY_20];
_BOKEH_DOCS_PALETTES['Category20b'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_CATEGORY_20_B];
_BOKEH_DOCS_PALETTES['Category20c'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_CATEGORY_20_C];
_BOKEH_DOCS_PALETTES['Colorblind'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_COLORBLIND];
_BOKEH_DOCS_PALETTES['Accent'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_ACCENT];
_BOKEH_DOCS_PALETTES['Dark2'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_DARK_2];
_BOKEH_DOCS_PALETTES['Paired'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PAIRED];
_BOKEH_DOCS_PALETTES['Pastel1'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PASTEL_1];
_BOKEH_DOCS_PALETTES['Pastel2'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PASTEL_2];
_BOKEH_DOCS_PALETTES['Set1'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_SET_1];
_BOKEH_DOCS_PALETTES['Set2'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_SET_2];
_BOKEH_DOCS_PALETTES['Set3'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_SET_3];
_BOKEH_DOCS_PALETTES['YlGn'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_YELLOW_GREEN];
_BOKEH_DOCS_PALETTES['YlGnBu'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_YELLOW_GREEN_BLUE];
_BOKEH_DOCS_PALETTES['GnBu'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_GREEN_BLUE];
_BOKEH_DOCS_PALETTES['BuGn'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_BLUE_GREEN];
_BOKEH_DOCS_PALETTES['PuBuGn'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PURPLE_BLUE_GREEN];
_BOKEH_DOCS_PALETTES['PuBu'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PURPLE_BLUE];
_BOKEH_DOCS_PALETTES['BuPu'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_BLUE_PURPLE];
_BOKEH_DOCS_PALETTES['RdPu'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_RED_PURPLE];
_BOKEH_DOCS_PALETTES['PuRd'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PURPLE_RED];
_BOKEH_DOCS_PALETTES['OrRd'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_ORANGE_RED];
_BOKEH_DOCS_PALETTES['YlOrRd'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_YELLOW_ORANGE_RED];
_BOKEH_DOCS_PALETTES['YlOrBr'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_YELLOW_ORANGE_BROWN];
_BOKEH_DOCS_PALETTES['Purples'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PURPLES];
_BOKEH_DOCS_PALETTES['Blues'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_BLUES];
_BOKEH_DOCS_PALETTES['Greens'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_GREENS];
_BOKEH_DOCS_PALETTES['Oranges'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_ORANGES];
_BOKEH_DOCS_PALETTES['Reds'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_REDS];
_BOKEH_DOCS_PALETTES['Greys'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_GREYS];
_BOKEH_DOCS_PALETTES['PuOr'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PURPLE_ORANGE];
_BOKEH_DOCS_PALETTES['BrBG'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_BROWN_BLUE_GREEN];
_BOKEH_DOCS_PALETTES['PRGn'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PURPLE_GREEN];
_BOKEH_DOCS_PALETTES['PiYG'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PINK_YELLOW_GREEN];
_BOKEH_DOCS_PALETTES['RdBu'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_RED_BLUE];
_BOKEH_DOCS_PALETTES['RdGy'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_RED_GREY];
_BOKEH_DOCS_PALETTES['RdYlBu'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_RED_YELLOW_BLUE];
_BOKEH_DOCS_PALETTES['Spectral'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_SPECTRAL];
_BOKEH_DOCS_PALETTES['RdYlGn'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_RED_YELLOW_GREEN];
_BOKEH_DOCS_PALETTES['Inferno'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_INFERNO];
_BOKEH_DOCS_PALETTES['Magma'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_MAGMA];
_BOKEH_DOCS_PALETTES['Plasma'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_PLASMA];
_BOKEH_DOCS_PALETTES['Viridis'] = BOKEH_DOCS_PALETTE_DATA[BOKEH_VIRIDIS];
var BOKEH_DOCS_PALETTES = _BOKEH_DOCS_PALETTES;
exports.BOKEH_DOCS_PALETTES = BOKEH_DOCS_PALETTES;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.VEGA_DOCS_PALETTES = exports.VEGA_PALETTES = exports.VEGA_PALETTE_NAMES = exports.VEGA_DARK_RED = exports.VEGA_DARK_MULTI = exports.VEGA_DARK_GREEN = exports.VEGA_DARK_GOLD = exports.VEGA_DARK_BLUE = exports.VEGA_LIGHT_TEAL_BLUE = exports.VEGA_LIGHT_ORANGE = exports.VEGA_LIGHT_MULTI = exports.VEGA_LIGHT_GREY_TEAL = exports.VEGA_LIGHT_GREY_RED = exports.VEGA_GOLD_RED = exports.VEGA_GOLD_ORANGE = exports.VEGA_GOLD_GREEN = exports.VEGA_WARM_GREYS = exports.VEGA_TEALS = exports.VEGA_TEAL_BLUES = exports.VEGA_BROWNS = exports.VEGA_TURBO = exports.VEGA_SINEBOW = exports.VEGA_RAINBOW = exports.VEGA_CIVIDIS = exports.VEGA_PLASMA = exports.VEGA_INFERNO = exports.VEGA_MAGMA = exports.VEGA_VIRIDIS = exports.VEGA_SPECTRAL = exports.VEGA_PINK_YELLOW_GREEN = exports.VEGA_RED_YELLOW_GREEN = exports.VEGA_RED_YELLOW_BLUE = exports.VEGA_YELLOW_GREEN_BLUE = exports.VEGA_RED_GREY = exports.VEGA_RED_BLUE = exports.VEGA_PURPLE_ORANGE = exports.VEGA_PURPLE_GREEN = exports.VEGA_BROWN_BLUE_GREEN = exports.VEGA_BLUE_ORANGE = exports.VEGA_YELLOW_ORANGE_RED = exports.VEGA_YELLOW_ORANGE_BROWN = exports.VEGA_YELLOW_GREEN = exports.VEGA_RED_PURPLE = exports.VEGA_PURPLE_RED = exports.VEGA_PURPLE_BLUE_GREEN = exports.VEGA_PURPLE_BLUE = exports.VEGA_ORANGE_RED = exports.VEGA_GREEN_BLUE = exports.VEGA_BLUE_PURPLE = exports.VEGA_BLUE_GREEN = exports.VEGA_REDS = exports.VEGA_PURPLES = exports.VEGA_ORANGES = exports.VEGA_GREYS = exports.VEGA_GREENS = exports.VEGA_BLUES = exports.VEGA_SET_3 = exports.VEGA_SET_2 = exports.VEGA_SET_1 = exports.VEGA_PASTEL_2 = exports.VEGA_PASTEL_1 = exports.VEGA_PAIRED = exports.VEGA_DARK_2 = exports.VEGA_ACCENT = exports.VEGA_TABLEAU_20 = exports.VEGA_TABLEAU_10 = exports.VEGA_CATEGORY_20_C = exports.VEGA_CATEGORY_20_B = exports.VEGA_CATEGORY_20 = exports.VEGA_CATEGORY_10 = exports.VEGA_DOCS_PALETTE_DATA = exports.VEGA_PALETTE_DATA = void 0;
var VEGA_PALETTE_DATA = {
  "vega_category10": {
    1: ["#1f77b4"],
    2: ["#1f77b4", "#ff7f0e"],
    3: ["#1f77b4", "#ff7f0e", "#2ca02c"],
    4: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"],
    5: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
    6: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    7: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"],
    8: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f"],
    9: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22"],
    10: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
  },
  "vega_category20": {
    1: ["#1f77b4"],
    2: ["#1f77b4", "#aec7e8"],
    3: ["#1f77b4", "#aec7e8", "#ff7f0e"],
    4: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"],
    5: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c"],
    6: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a"],
    7: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728"],
    8: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896"],
    9: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd"],
    10: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5"],
    11: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b"],
    12: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"],
    13: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2"],
    14: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2"],
    15: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f"],
    16: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7"],
    17: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22"],
    18: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d"],
    19: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf"],
    20: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]
  },
  "vega_category20b": {
    1: ["#393b79"],
    2: ["#393b79", "#5254a3"],
    3: ["#393b79", "#5254a3", "#6b6ecf"],
    4: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede"],
    5: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939"],
    6: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252"],
    7: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b"],
    8: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c"],
    9: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31"],
    10: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39"],
    11: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52"],
    12: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94"],
    13: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39"],
    14: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a"],
    15: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b"],
    16: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c"],
    17: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173"],
    18: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194"],
    19: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd"],
    20: ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"]
  },
  "vega_category20c": {
    1: ["#3182bd"],
    2: ["#3182bd", "#6baed6"],
    3: ["#3182bd", "#6baed6", "#9ecae1"],
    4: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef"],
    5: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d"],
    6: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c"],
    7: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b"],
    8: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2"],
    9: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354"],
    10: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476"],
    11: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b"],
    12: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0"],
    13: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1"],
    14: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8"],
    15: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc"],
    16: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb"],
    17: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363"],
    18: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696"],
    19: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd"],
    20: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"]
  },
  "vega_tableau10": {
    1: ["#4c78a8"],
    2: ["#4c78a8", "#f58518"],
    3: ["#4c78a8", "#f58518", "#e45756"],
    4: ["#4c78a8", "#f58518", "#e45756", "#72b7b2"],
    5: ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b"],
    6: ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b", "#eeca3b"],
    7: ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b", "#eeca3b", "#b279a2"],
    8: ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b", "#eeca3b", "#b279a2", "#ff9da6"],
    9: ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b", "#eeca3b", "#b279a2", "#ff9da6", "#9d755d"],
    10: ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b", "#eeca3b", "#b279a2", "#ff9da6", "#9d755d", "#bab0ac"]
  },
  "vega_tableau20": {
    1: ["#4c78a8"],
    2: ["#4c78a8", "#9ecae9"],
    3: ["#4c78a8", "#9ecae9", "#f58518"],
    4: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79"],
    5: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b"],
    6: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a"],
    7: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20"],
    8: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b"],
    9: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894"],
    10: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6"],
    11: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756"],
    12: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98"],
    13: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e"],
    14: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac"],
    15: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac", "#d67195"],
    16: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac", "#d67195", "#fcbfd2"],
    17: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac", "#d67195", "#fcbfd2", "#b279a2"],
    18: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac", "#d67195", "#fcbfd2", "#b279a2", "#d6a5c9"],
    19: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac", "#d67195", "#fcbfd2", "#b279a2", "#d6a5c9", "#9e765f"],
    20: ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac", "#d67195", "#fcbfd2", "#b279a2", "#d6a5c9", "#9e765f", "#d8b5a5"]
  },
  "vega_accent": {
    1: ["#7fc97f"],
    2: ["#7fc97f", "#beaed4"],
    3: ["#7fc97f", "#beaed4", "#fdc086"],
    4: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99"],
    5: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0"],
    6: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"],
    7: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17"],
    8: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"]
  },
  "vega_dark2": {
    1: ["#1b9e77"],
    2: ["#1b9e77", "#d95f02"],
    3: ["#1b9e77", "#d95f02", "#7570b3"],
    4: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
    5: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"],
    6: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02"],
    7: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
    8: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"]
  },
  "vega_paired": {
    1: ["#a6cee3"],
    2: ["#a6cee3", "#1f78b4"],
    3: ["#a6cee3", "#1f78b4", "#b2df8a"],
    4: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c"],
    5: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"],
    6: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c"],
    7: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f"],
    8: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"],
    9: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6"],
    10: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a"],
    11: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99"],
    12: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"]
  },
  "vega_pastel1": {
    1: ["#fbb4ae"],
    2: ["#fbb4ae", "#b3cde3"],
    3: ["#fbb4ae", "#b3cde3", "#ccebc5"],
    4: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4"],
    5: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6"],
    6: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc"],
    7: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd"],
    8: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec"],
    9: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
  },
  "vega_pastel2": {
    1: ["#b3e2cd"],
    2: ["#b3e2cd", "#fdcdac"],
    3: ["#b3e2cd", "#fdcdac", "#cbd5e8"],
    4: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4"],
    5: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9"],
    6: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae"],
    7: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc"],
    8: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]
  },
  "vega_set1": {
    1: ["#e41a1c"],
    2: ["#e41a1c", "#377eb8"],
    3: ["#e41a1c", "#377eb8", "#4daf4a"],
    4: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"],
    5: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
    6: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"],
    7: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628"],
    8: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf"],
    9: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"]
  },
  "vega_set2": {
    1: ["#66c2a5"],
    2: ["#66c2a5", "#fc8d62"],
    3: ["#66c2a5", "#fc8d62", "#8da0cb"],
    4: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3"],
    5: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"],
    6: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"],
    7: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"],
    8: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]
  },
  "vega_set3": {
    1: ["#8dd3c7"],
    2: ["#8dd3c7", "#ffffb3"],
    3: ["#8dd3c7", "#ffffb3", "#bebada"],
    4: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072"],
    5: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3"],
    6: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462"],
    7: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69"],
    8: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"],
    9: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9"],
    10: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"],
    11: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5"],
    12: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
  },
  "vega_blues": {
    1: ["#5ba3cf"],
    2: ["#86bcdc", "#3887c0"],
    3: ["#9cc8e2", "#5ba3cf", "#2978b8"],
    4: ["#a8cee5", "#74b2d7", "#4592c6", "#206fb2"],
    5: ["#afd1e7", "#86bcdc", "#5ba3cf", "#3887c0", "#1b69ad"],
    6: ["#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebb", "#1864aa"],
    7: ["#b9d6ea", "#9cc8e2", "#7bb6d9", "#5ba3cf", "#408ec4", "#2978b8", "#1661a8"],
    8: ["#bcd7eb", "#a2cbe3", "#86bcdc", "#69abd3", "#4f9aca", "#3887c0", "#2473b4", "#145ea6"],
    9: ["#bed8ec", "#a8cee5", "#8fc1de", "#74b2d7", "#5ba3cf", "#4592c6", "#3181bd", "#206fb2", "#125ca4"]
  },
  "vega_greens": {
    1: ["#60ba6c"],
    2: ["#8ccf8a", "#39a055"],
    3: ["#a0d89b", "#60ba6c", "#29924a"],
    4: ["#abdda5", "#7bc77d", "#46ab5e", "#208943"],
    5: ["#b2e0ac", "#8ccf8a", "#60ba6c", "#39a055", "#1a833e"],
    6: ["#b7e2b1", "#97d494", "#73c378", "#4daf62", "#2f984f", "#167f3b"],
    7: ["#bbe4b5", "#a0d89b", "#81ca82", "#60ba6c", "#41a75b", "#29924a", "#137c39"],
    8: ["#bee5b8", "#a6dba1", "#8ccf8a", "#6fc175", "#52b264", "#39a055", "#248d46", "#107937"],
    9: ["#c0e6ba", "#abdda5", "#94d391", "#7bc77d", "#60ba6c", "#46ab5e", "#329a51", "#208943", "#0e7735"]
  },
  "vega_greys": {
    1: ["#888888"],
    2: ["#aaaaaa", "#686868"],
    3: ["#bbbbbb", "#888888", "#585858"],
    4: ["#c4c4c4", "#9d9d9d", "#757575", "#4d4d4d"],
    5: ["#c9c9c9", "#aaaaaa", "#888888", "#686868", "#454545"],
    6: ["#cdcdcd", "#b4b4b4", "#979797", "#7a7a7a", "#5f5f5f", "#3f3f3f"],
    7: ["#d0d0d0", "#bbbbbb", "#a2a2a2", "#888888", "#707070", "#585858", "#3b3b3b"],
    8: ["#d2d2d2", "#c0c0c0", "#aaaaaa", "#949494", "#7d7d7d", "#686868", "#525252", "#383838"],
    9: ["#d4d4d4", "#c4c4c4", "#b1b1b1", "#9d9d9d", "#888888", "#757575", "#626262", "#4d4d4d", "#353535"]
  },
  "vega_oranges": {
    1: ["#f87f2c"],
    2: ["#fd9f55", "#e85e0f"],
    3: ["#fdaf6d", "#f87f2c", "#db5108"],
    4: ["#fdb87b", "#fc9244", "#f06b18", "#d14904"],
    5: ["#fdbe85", "#fd9f55", "#f87f2c", "#e85e0f", "#c94503"],
    6: ["#fdc28c", "#fda862", "#fb8d3d", "#f2711e", "#e1560a", "#c34203"],
    7: ["#fdc591", "#fdaf6d", "#fc974b", "#f87f2c", "#ed6615", "#db5108", "#bf4003"],
    8: ["#fdc795", "#fdb475", "#fd9f55", "#fa8a39", "#f47421", "#e85e0f", "#d54c06", "#bc3e02"],
    9: ["#fdc998", "#fdb87b", "#fda55e", "#fc9244", "#f87f2c", "#f06b18", "#e4580b", "#d14904", "#b93d02"]
  },
  "vega_purples": {
    1: ["#928ec3"],
    2: ["#aeadd3", "#796db2"],
    3: ["#bcbcdb", "#928ec3", "#6f5aa8"],
    4: ["#c4c5e0", "#a3a0cc", "#827cb9", "#684ea2"],
    5: ["#c9cae3", "#aeadd3", "#928ec3", "#796db2", "#64469e"],
    6: ["#cdcee5", "#b6b6d7", "#9e9bc9", "#8781bc", "#7363ac", "#61409b"],
    7: ["#d0d0e6", "#bcbcdb", "#a7a5cf", "#928ec3", "#7f77b6", "#6f5aa8", "#5f3c99"],
    8: ["#d2d2e7", "#c0c1de", "#aeadd3", "#9b98c8", "#8984bd", "#796db2", "#6b53a5", "#5d3997"],
    9: ["#d4d4e8", "#c4c5e0", "#b4b3d6", "#a3a0cc", "#928ec3", "#827cb9", "#7566ae", "#684ea2", "#5c3696"]
  },
  "vega_reds": {
    1: ["#f6573f"],
    2: ["#fb7f60", "#e13128"],
    3: ["#fc9374", "#f6573f", "#d22321"],
    4: ["#fc9e80", "#fa7051", "#ec3f2f", "#c81b1d"],
    5: ["#fca589", "#fb7f60", "#f6573f", "#e13128", "#c1181b"],
    6: ["#fcab8f", "#fc8a6b", "#f9694c", "#ef4634", "#d92824", "#bb161a"],
    7: ["#fcaf94", "#fc9374", "#fb7657", "#f6573f", "#e83a2d", "#d22321", "#b81419"],
    8: ["#fcb297", "#fc997a", "#fb7f60", "#f86549", "#f04a36", "#e13128", "#cc1e1f", "#b41319"],
    9: ["#fcb49a", "#fc9e80", "#fc8767", "#fa7051", "#f6573f", "#ec3f2f", "#dc2a25", "#c81b1d", "#b21218"]
  },
  "vega_bluegreen": {
    1: ["#58ba91"],
    2: ["#82ceb7", "#37a266"],
    3: ["#99d8c8", "#58ba91", "#299352"],
    4: ["#a7ddd1", "#70c6a9", "#44ad77", "#208946"],
    5: ["#b0e1d6", "#82ceb7", "#58ba91", "#37a266", "#1a8341"],
    6: ["#b6e3da", "#8fd4c1", "#69c3a2", "#4ab17e", "#2f995a", "#167f3d"],
    7: ["#bbe5dc", "#99d8c8", "#77c9ae", "#58ba91", "#3fa971", "#299352", "#137c3a"],
    8: ["#bee7de", "#a1dbcd", "#82ceb7", "#65c19e", "#4db383", "#37a266", "#248d4b", "#107938"],
    9: ["#c1e8e0", "#a7ddd1", "#8bd2be", "#70c6a9", "#58ba91", "#44ad77", "#319c5d", "#208946", "#0e7736"]
  },
  "vega_bluepurple": {
    1: ["#8d85be"],
    2: ["#97a9d0", "#8a5daa"],
    3: ["#a1b9d9", "#8d85be", "#8949a0"],
    4: ["#a8c2dd", "#919cc9", "#8b6db2", "#873c99"],
    5: ["#aec7df", "#97a9d0", "#8d85be", "#8a5daa", "#853393"],
    6: ["#b2cae1", "#9cb3d5", "#9095c6", "#8c74b5", "#8a51a4", "#842d8f"],
    7: ["#b6cde2", "#a1b9d9", "#93a1cc", "#8d85be", "#8b67af", "#8949a0", "#83298c"],
    8: ["#b8cee3", "#a5bedb", "#97a9d0", "#8f92c4", "#8c78b7", "#8a5daa", "#88429c", "#832589"],
    9: ["#bad0e4", "#a8c2dd", "#9ab0d4", "#919cc9", "#8d85be", "#8b6db2", "#8a55a6", "#873c99", "#822287"]
  },
  "vega_greenblue": {
    1: ["#69c2ca"],
    2: ["#93d5bd", "#43a5c9"],
    3: ["#a6ddbb", "#69c2ca", "#3295c2"],
    4: ["#b1e1bb", "#82cec2", "#51b2cd", "#288abd"],
    5: ["#b8e3be", "#93d5bd", "#69c2ca", "#43a5c9", "#2283b9"],
    6: ["#bce5c0", "#9ed9bb", "#7bcbc4", "#58b7cc", "#399cc6", "#1e7eb6"],
    7: ["#c0e6c1", "#a6ddbb", "#88d1c0", "#69c2ca", "#4cadcc", "#3295c2", "#1b7ab4"],
    8: ["#c3e7c2", "#acdfbb", "#93d5bd", "#77c9c6", "#5cb9cc", "#43a5c9", "#2c8fbf", "#1877b2"],
    9: ["#c5e8c3", "#b1e1bb", "#9bd8bb", "#82cec2", "#69c2ca", "#51b2cd", "#3c9fc7", "#288abd", "#1675b1"]
  },
  "vega_orangered": {
    1: ["#f67d53"],
    2: ["#fca570", "#e65238"],
    3: ["#fdb781", "#f67d53", "#db3b28"],
    4: ["#fdc18a", "#fb9562", "#ee6545", "#d32d1e"],
    5: ["#fdc690", "#fca570", "#f67d53", "#e65238", "#cc2418"],
    6: ["#fdc994", "#fdb07a", "#fa8e5e", "#f06c49", "#e0452f", "#c81e14"],
    7: ["#fdcc97", "#fdb781", "#fc9b67", "#f67d53", "#eb5e40", "#db3b28", "#c41a11"],
    8: ["#fdcd99", "#fdbd86", "#fca570", "#f98a5b", "#f2704b", "#e65238", "#d63322", "#c1160f"],
    9: ["#fdcf9b", "#fdc18a", "#fdad77", "#fb9562", "#f67d53", "#ee6545", "#e24932", "#d32d1e", "#bf130d"]
  },
  "vega_purpleblue": {
    1: ["#5b9fc9"],
    2: ["#8eb3d6", "#2785ba"],
    3: ["#a4bddb", "#5b9fc9", "#1578b1"],
    4: ["#b1c3de", "#7bacd1", "#3a90c0", "#0b70ab"],
    5: ["#b9c7e0", "#8eb3d6", "#5b9fc9", "#2785ba", "#096ba5"],
    6: ["#bec9e1", "#9bb9d9", "#72a8cf", "#4394c3", "#1b7db5", "#0867a1"],
    7: ["#c2cbe3", "#a4bddb", "#82afd3", "#5b9fc9", "#338cbe", "#1578b1", "#07659e"],
    8: ["#c5cde3", "#abc0dd", "#8eb3d6", "#6da6cd", "#4997c4", "#2785ba", "#0f73ae", "#06639b"],
    9: ["#c8cee4", "#b1c3de", "#97b7d8", "#7bacd1", "#5b9fc9", "#3a90c0", "#1e7fb7", "#0b70ab", "#056199"]
  },
  "vega_purplebluegreen": {
    1: ["#549fc8"],
    2: ["#88b3d6", "#258bab"],
    3: ["#a2bddb", "#549fc8", "#138495"],
    4: ["#b0c3de", "#72acd1", "#3892bb", "#097f87"],
    5: ["#b8c7e0", "#88b3d6", "#549fc8", "#258bab", "#077b7e"],
    6: ["#bec9e1", "#97b9d9", "#69a8ce", "#4096bf", "#19879f", "#057877"],
    7: ["#c2cbe3", "#a2bddb", "#7aafd3", "#549fc8", "#3190b5", "#138495", "#047672"],
    8: ["#c5cde3", "#aac0dd", "#88b3d6", "#65a6cd", "#4498c1", "#258bab", "#0d818d", "#03746e"],
    9: ["#c8cee4", "#b0c3de", "#93b7d8", "#72acd1", "#549fc8", "#3892bb", "#1c88a3", "#097f87", "#02736b"]
  },
  "vega_purplered": {
    1: ["#e14da0"],
    2: ["#d47dbb", "#dc2478"],
    3: ["#d092c6", "#e14da0", "#d01864"],
    4: ["#ce9ecc", "#da6bb2", "#e23189", "#c61159"],
    5: ["#d0a5d0", "#d47dbb", "#e14da0", "#dc2478", "#bd0e54"],
    6: ["#d1aad2", "#d189c2", "#dc62ad", "#e23990", "#d61c6c", "#b70b50"],
    7: ["#d2aed4", "#d092c6", "#d872b6", "#e14da0", "#e02c83", "#d01864", "#b20a4d"],
    8: ["#d2b1d6", "#cf99c9", "#d47dbb", "#dd5eaa", "#e23d93", "#dc2478", "#ca145e", "#ae084b"],
    9: ["#d3b3d7", "#ce9ecc", "#d186c0", "#da6bb2", "#e14da0", "#e23189", "#d91e6f", "#c61159", "#ab0749"]
  },
  "vega_redpurple": {
    1: ["#ec539d"],
    2: ["#f885ac", "#cc248e"],
    3: ["#fa9cb4", "#ec539d", "#b71285"],
    4: ["#faa9b8", "#f571a5", "#db3695", "#a90880"],
    5: ["#fbb0bb", "#f885ac", "#ec539d", "#cc248e", "#a0067e"],
    6: ["#fbb5bd", "#f993b0", "#f268a3", "#e03e97", "#c01889", "#99047c"],
    7: ["#fcb9be", "#fa9cb4", "#f679a8", "#ec539d", "#d52f92", "#b71285", "#94037b"],
    8: ["#fcbcbf", "#faa3b6", "#f885ac", "#f164a1", "#e34399", "#cc248e", "#af0c82", "#90027a"],
    9: ["#fcbec0", "#faa9b8", "#f98faf", "#f571a5", "#ec539d", "#db3695", "#c41b8a", "#a90880", "#8d0179"]
  },
  "vega_yellowgreen": {
    1: ["#62bb6e"],
    2: ["#94d284", "#399d55"],
    3: ["#acdc8e", "#62bb6e", "#298d4a"],
    4: ["#b9e294", "#80c97c", "#47aa5e", "#208344"],
    5: ["#c1e598", "#94d284", "#62bb6e", "#399d55", "#1a7d41"],
    6: ["#c7e89b", "#a2d88a", "#77c578", "#4faf63", "#2f944e", "#16793f"],
    7: ["#cbea9d", "#acdc8e", "#88cc7f", "#62bb6e", "#42a55b", "#298d4a", "#13763d"],
    8: ["#ceeb9f", "#b3df91", "#94d284", "#73c376", "#53b265", "#399d55", "#248747", "#10743c"],
    9: ["#d1eca0", "#b9e294", "#9ed688", "#80c97c", "#62bb6e", "#47aa5e", "#329750", "#208344", "#0e723b"]
  },
  "vega_yelloworangebrown": {
    1: ["#f68921"],
    2: ["#fdaf3f", "#e0650e"],
    3: ["#fec255", "#f68921", "#d05508"],
    4: ["#fecc63", "#fca031", "#eb7215", "#c54c05"],
    5: ["#fed26e", "#fdaf3f", "#f68921", "#e0650e", "#bc4704"],
    6: ["#fed676", "#feba4a", "#fa992c", "#ee7918", "#d85b0a", "#b64304"],
    7: ["#fed97c", "#fec255", "#fda636", "#f68921", "#e76d13", "#d05508", "#b24104"],
    8: ["#fedb80", "#fec75d", "#fdaf3f", "#f9962a", "#f07c1a", "#e0650e", "#ca5006", "#ae3f03"],
    9: ["#fedd84", "#fecc63", "#feb746", "#fca031", "#f68921", "#eb7215", "#db5e0b", "#c54c05", "#ab3d03"]
  },
  "vega_yelloworangered": {
    1: ["#fc7335"],
    2: ["#fea045", "#f23e26"],
    3: ["#feb351", "#fc7335", "#e62822"],
    4: ["#febd59", "#fd903e", "#f9522b", "#de1b20"],
    5: ["#fec460", "#fea045", "#fc7335", "#f23e26", "#d71621"],
    6: ["#fec866", "#feab4b", "#fd883b", "#fa5b2e", "#ec3023", "#d31221"],
    7: ["#fecc6a", "#feb351", "#fd9641", "#fc7335", "#f64b29", "#e62822", "#cf0f22"],
    8: ["#fecf6d", "#feb855", "#fea045", "#fd833a", "#fa612f", "#f23e26", "#e22121", "#cc0d22"],
    9: ["#fed16f", "#febd59", "#fea849", "#fd903e", "#fc7335", "#f9522b", "#ee3423", "#de1b20", "#ca0b22"]
  },
  "vega_blueorange": {
    1: ["#f2f0eb"],
    2: ["#afd3e6", "#fbca8b"],
    3: ["#7db6d6", "#f2f0eb", "#f2a952"],
    4: ["#5da2cb", "#d2e5ef", "#fce0ba", "#e8932f"],
    5: ["#4e94c3", "#afd3e6", "#f2f0eb", "#fbca8b", "#dc8524"],
    6: ["#438abd", "#94c4de", "#dbe8ee", "#f9e5c8", "#f8b96a", "#d47b1c"],
    7: ["#3b83b9", "#7db6d6", "#c5deec", "#f2f0eb", "#fcd8a9", "#f2a952", "#ce7416"],
    8: ["#347db6", "#6babd0", "#afd3e6", "#e0eaed", "#f8e7d0", "#fbca8b", "#ec9d3e", "#c96e11"],
    9: ["#2f78b3", "#5da2cb", "#9dcae1", "#d2e5ef", "#f2f0eb", "#fce0ba", "#fbbf74", "#e8932f", "#c5690d"]
  },
  "vega_brownbluegreen": {
    1: ["#eef1ea"],
    2: ["#e8d19e", "#a2d9d1"],
    3: ["#d5ae69", "#eef1ea", "#6ebcb3"],
    4: ["#c79548", "#f3e6c6", "#c9e9e4", "#4da79e"],
    5: ["#ba8539", "#e8d19e", "#eef1ea", "#a2d9d1", "#3b988f"],
    6: ["#b17a2e", "#dfc081", "#f2e9d0", "#d4ebe6", "#85cbc1", "#2f8d85"],
    7: ["#aa7126", "#d5ae69", "#efdeb7", "#eef1ea", "#bae3dd", "#6ebcb3", "#25857d"],
    8: ["#a46a1f", "#cda057", "#e8d19e", "#f1ebd6", "#d9ede7", "#a2d9d1", "#5bb0a7", "#1e7f77"],
    9: ["#a0651a", "#c79548", "#e3c78a", "#f3e6c6", "#eef1ea", "#c9e9e4", "#8ed1c7", "#4da79e", "#187a72"]
  },
  "vega_purplegreen": {
    1: ["#eff0ef"],
    2: ["#d3bbda", "#bce3b8"],
    3: ["#b897c5", "#eff0ef", "#90cc8f"],
    4: ["#a67fb6", "#e6d6e8", "#d9efd5", "#71bb75"],
    5: ["#9a6caa", "#d3bbda", "#eff0ef", "#bce3b8", "#5dac66"],
    6: ["#925fa1", "#c4a7cf", "#e9ddea", "#dfefdc", "#a5d8a2", "#4fa15c"],
    7: ["#8c559b", "#b897c5", "#dfcce3", "#eff0ef", "#ceebca", "#90cc8f", "#459954"],
    8: ["#874d96", "#ae89bc", "#d3bbda", "#eae2eb", "#e3efe1", "#bce3b8", "#7fc381", "#3d934e"],
    9: ["#834792", "#a67fb6", "#c9aed3", "#e6d6e8", "#eff0ef", "#d9efd5", "#aedda9", "#71bb75", "#368e49"]
  },
  "vega_purpleorange": {
    1: ["#f3eeea"],
    2: ["#c4c1dd", "#fbca8b"],
    3: ["#a49cc7", "#f3eeea", "#f2a952"],
    4: ["#8f83b7", "#dadbeb", "#fce0ba", "#e8932f"],
    5: ["#816fac", "#c4c1dd", "#f3eeea", "#fbca8b", "#dc8524"],
    6: ["#7861a4", "#b3add2", "#e1e0eb", "#f9e4c8", "#f8b96a", "#d47b1c"],
    7: ["#70569e", "#a49cc7", "#d2d1e6", "#f3eeea", "#fcd8a9", "#f2a952", "#ce7416"],
    8: ["#6b4e9a", "#988ebe", "#c4c1dd", "#e5e3eb", "#f8e6cf", "#fbca8b", "#ec9d3e", "#c96e11"],
    9: ["#664796", "#8f83b7", "#b9b4d6", "#dadbeb", "#f3eeea", "#fce0ba", "#fbbf74", "#e8932f", "#c5690d"]
  },
  "vega_redblue": {
    1: ["#f2efee"],
    2: ["#f6bda4", "#afd3e6"],
    3: ["#ea9178", "#f2efee", "#7db6d6"],
    4: ["#df745e", "#fbdbc9", "#d2e5ef", "#5da2cb"],
    5: ["#d45f52", "#f6bda4", "#f2efee", "#afd3e6", "#4e94c3"],
    6: ["#cd5149", "#f1a68a", "#f8e1d4", "#dbe8ef", "#94c4de", "#438abd"],
    7: ["#c74643", "#ea9178", "#f9d0bb", "#f2efee", "#c5deec", "#7db6d6", "#3b83b9"],
    8: ["#c33d3e", "#e48169", "#f6bda4", "#f7e4d9", "#e0e9ef", "#afd3e6", "#6babd0", "#347db6"],
    9: ["#bf363a", "#df745e", "#f4ae91", "#fbdbc9", "#f2efee", "#d2e5ef", "#9dcae1", "#5da2cb", "#2f78b3"]
  },
  "vega_redgrey": {
    1: ["#faf4f1"],
    2: ["#f7bda4", "#cbcbcb"],
    3: ["#ea9178", "#faf4f1", "#ababab"],
    4: ["#df745e", "#fcdccb", "#e2e2e2", "#969696"],
    5: ["#d45f52", "#f7bda4", "#faf4f1", "#cbcbcb", "#858585"],
    6: ["#cd5149", "#f1a68a", "#fbe3d6", "#e9e7e6", "#bababa", "#797979"],
    7: ["#c74643", "#ea9178", "#fad1bd", "#faf4f1", "#dadada", "#ababab", "#717171"],
    8: ["#c33d3e", "#e48169", "#f7bda4", "#fbe7dc", "#edeae9", "#cbcbcb", "#9f9f9f", "#6a6a6a"],
    9: ["#bf363a", "#df745e", "#f4ae91", "#fcdccb", "#faf4f1", "#e2e2e2", "#c0c0c0", "#969696", "#646464"]
  },
  "vega_yellowgreenblue": {
    1: ["#45b4c2"],
    2: ["#86d0bb", "#258bbb"],
    3: ["#a9ddb7", "#45b4c2", "#2173b1"],
    4: ["#bde5b5", "#69c5be", "#2c9ec0", "#2163aa"],
    5: ["#c7e9b5", "#86d0bb", "#45b4c2", "#258bbb", "#225aa5"],
    6: ["#ceecb4", "#9ad7b8", "#5fc0bf", "#33a4c1", "#217eb6", "#2253a2"],
    7: ["#d4eeb4", "#a9ddb7", "#74c9bd", "#45b4c2", "#2997be", "#2173b1", "#234ea0"],
    8: ["#d8f0b4", "#b4e1b6", "#86d0bb", "#59bdc0", "#37a8c1", "#258bbb", "#216aad", "#234a9e"],
    9: ["#dbf1b4", "#bde5b5", "#94d5b9", "#69c5be", "#45b4c2", "#2c9ec0", "#2182b8", "#2163aa", "#23479c"]
  },
  "vega_redyellowblue": {
    1: ["#faf8c1"],
    2: ["#fdbc73", "#bbdfe9"],
    3: ["#f78d54", "#faf8c1", "#90c1dc"],
    4: ["#f16e43", "#fedd90", "#dcf1ec", "#75abd0"],
    5: ["#e75a3b", "#fdbc73", "#faf8c1", "#bbdfe9", "#6799c7"],
    6: ["#e04c36", "#faa35f", "#fde59e", "#e5f3e0", "#a3d0e5", "#5c8cc0"],
    7: ["#db4132", "#f78d54", "#fed185", "#faf8c1", "#d0eaeb", "#90c1dc", "#5582bb"],
    8: ["#d7392f", "#f37c4a", "#fdbc73", "#fce9a6", "#e9f4d9", "#bbdfe9", "#81b5d5", "#4f7ab7"],
    9: ["#d4322c", "#f16e43", "#fcac64", "#fedd90", "#faf8c1", "#dcf1ec", "#abd6e8", "#75abd0", "#4a74b4"]
  },
  "vega_redyellowgreen": {
    1: ["#f9f7ae"],
    2: ["#fdbc71", "#b5df79"],
    3: ["#f78d53", "#f9f7ae", "#84ca68"],
    4: ["#f16e43", "#fedd8d", "#d7ee8e", "#64bc61"],
    5: ["#e75a3b", "#fdbc71", "#f9f7ae", "#b5df79", "#4eaf5b"],
    6: ["#e04c36", "#faa35e", "#fde496", "#e1f197", "#9bd46c", "#3ea657"],
    7: ["#db4132", "#f78d53", "#fed183", "#f9f7ae", "#cae986", "#84ca68", "#33a054"],
    8: ["#d7392f", "#f37c4a", "#fdbc71", "#fce99c", "#e6f29c", "#b5df79", "#72c264", "#299a51"],
    9: ["#d4322c", "#f16e43", "#fcac63", "#fedd8d", "#f9f7ae", "#d7ee8e", "#a4d86e", "#64bc61", "#22964f"]
  },
  "vega_pinkyellowgreen": {
    1: ["#f5f3ef"],
    2: ["#f3c1de", "#c4e59d"],
    3: ["#e793c2", "#f5f3ef", "#9bcd67"],
    4: ["#dd72ad", "#fadded", "#e1f2ca", "#80bb47"],
    5: ["#d3599d", "#f3c1de", "#f5f3ef", "#c4e59d", "#70ad3c"],
    6: ["#cc4792", "#edaad0", "#f9e3ee", "#e7f2d5", "#aed97e", "#64a334"],
    7: ["#c7398a", "#e793c2", "#f8d3e7", "#f5f3ef", "#d6edb9", "#9bcd67", "#5b9c2e"],
    8: ["#c32e83", "#e180b6", "#f3c1de", "#f8e7ee", "#eaf2da", "#c4e59d", "#8cc355", "#549629"],
    9: ["#c0267e", "#dd72ad", "#f0b3d6", "#fadded", "#f5f3ef", "#e1f2ca", "#b6de87", "#80bb47", "#4f9125"]
  },
  "vega_spectral": {
    1: ["#fbf8b0"],
    2: ["#fdbc71", "#bbe4a2"],
    3: ["#f68e57", "#fbf8b0", "#89cda6"],
    4: ["#f0704a", "#fedd8d", "#e0f3a1", "#69bda9"],
    5: ["#e65f4a", "#fdbc71", "#fbf8b0", "#bbe4a2", "#5cabad"],
    6: ["#de524b", "#faa35f", "#fde597", "#e8f4a5", "#a0d8a3", "#539fb0"],
    7: ["#d9494b", "#f68e57", "#fed183", "#fbf8b0", "#d2eea1", "#89cda6", "#4c95b2"],
    8: ["#d4424b", "#f37d50", "#fdbc71", "#fde99d", "#ecf5a8", "#bbe4a2", "#77c4a7", "#468eb4"],
    9: ["#d13c4b", "#f0704a", "#fcac63", "#fedd8d", "#fbf8b0", "#e0f3a1", "#a9dda2", "#69bda9", "#4288b5"]
  },
  "vega_viridis": {
    1: ["#21918d"],
    2: ["#31688e", "#35b779"],
    3: ["#3b528b", "#21918d", "#5dc963"],
    4: ["#414487", "#2a788e", "#22a884", "#7ad151"],
    5: ["#443a83", "#31688e", "#21918d", "#35b779", "#8fd744"],
    6: ["#46327f", "#375c8d", "#27808e", "#1fa187", "#4ac26d", "#9fda3a"],
    7: ["#472d7b", "#3b528b", "#2c728e", "#21918d", "#28ae80", "#5dc963", "#abdc32"],
    8: ["#482878", "#3e4b89", "#31688e", "#26838e", "#1f9d89", "#35b779", "#6dce59", "#b4de2c"],
    9: ["#482575", "#414487", "#35608d", "#2a788e", "#21918d", "#22a884", "#43bf71", "#7ad151", "#bcdf27"],
    256: ["#440356", "#450457", "#450659", "#45075a", "#46095c", "#460a5d", "#460c5f", "#470d60", "#470f62", "#471063", "#471164", "#471365", "#481467", "#481668", "#481769", "#48186b", "#481a6c", "#481b6d", "#481c6e", "#481e6f", "#481f70", "#482071", "#482272", "#482373", "#482474", "#482575", "#482776", "#482877", "#482978", "#472a79", "#472b7a", "#472c7b", "#472e7c", "#472f7d", "#47307e", "#46317e", "#46337f", "#463480", "#453580", "#453681", "#453882", "#443982", "#443a83", "#443b84", "#433d84", "#433e84", "#433f85", "#424085", "#424186", "#414286", "#414487", "#414587", "#404688", "#404788", "#3f4888", "#3f4989", "#3e4b89", "#3e4c89", "#3d4d8a", "#3d4e8a", "#3d4f8a", "#3c508a", "#3c518b", "#3b528b", "#3b538b", "#3a548b", "#3a558c", "#39568c", "#39578c", "#38588c", "#38598c", "#375a8c", "#375b8d", "#365c8d", "#365e8d", "#365f8d", "#35608d", "#35618d", "#34628d", "#34638d", "#33648d", "#33658e", "#32668e", "#32668e", "#31678e", "#31688e", "#30698e", "#306a8e", "#2f6b8e", "#2f6c8e", "#2f6d8e", "#2e6e8e", "#2e6f8e", "#2d708e", "#2d718e", "#2c728e", "#2c738e", "#2c748e", "#2b748e", "#2b758e", "#2b768e", "#2a778e", "#2a788e", "#2a798e", "#297a8e", "#297b8e", "#297c8e", "#287d8e", "#287f8e", "#27808e", "#27818e", "#27828e", "#26828e", "#26838e", "#25848e", "#25858e", "#24868e", "#24868e", "#23878e", "#23888e", "#23898e", "#238a8e", "#228b8e", "#228c8e", "#228d8d", "#228e8d", "#218f8d", "#21908d", "#21918d", "#21928d", "#20938c", "#20948c", "#20958c", "#20958c", "#1f968b", "#1f978b", "#1f988b", "#1f998b", "#1f9a8a", "#1f9b8a", "#1f9c8a", "#1f9d89", "#1f9e89", "#1f9e89", "#1f9f88", "#1fa088", "#1fa187", "#20a287", "#20a386", "#21a486", "#21a585", "#21a685", "#22a785", "#22a884", "#23a984", "#24aa83", "#25ab82", "#26ac82", "#26ac81", "#27ad81", "#28ae80", "#29af7f", "#2ab07f", "#2cb17e", "#2db27d", "#2eb37d", "#2fb37c", "#31b47b", "#32b57b", "#33b67a", "#35b779", "#36b878", "#38b977", "#39b977", "#3bba76", "#3dbb75", "#3ebc74", "#40bd73", "#42be72", "#43bf71", "#45c070", "#47c06f", "#49c16e", "#4bc26d", "#4dc36c", "#4fc36b", "#51c46a", "#53c568", "#55c567", "#57c666", "#59c765", "#5bc863", "#5ec962", "#60ca61", "#62ca60", "#64cb5e", "#66cc5d", "#68cd5c", "#6bcd5a", "#6dce59", "#6fce57", "#72cf56", "#74cf55", "#76d053", "#79d152", "#7bd150", "#7dd24f", "#80d34d", "#82d34c", "#85d44a", "#87d549", "#8ad547", "#8cd646", "#8fd744", "#91d743", "#94d841", "#96d83f", "#99d93e", "#9bd93c", "#9eda3a", "#a1da39", "#a3db37", "#a6db36", "#a8dc34", "#abdc32", "#aedd30", "#b0dd2f", "#b3dd2d", "#b6de2b", "#b9de29", "#bbdf28", "#bedf26", "#c0e025", "#c3e023", "#c6e022", "#c8e120", "#cbe11f", "#cde11e", "#d0e21c", "#d2e21b", "#d5e21b", "#d8e31b", "#dae31b", "#dde31b", "#e0e41a", "#e2e41a", "#e5e41a", "#e8e51a", "#eae51b", "#ede51c", "#efe61d", "#f1e61f", "#f4e620", "#f6e621", "#f8e722", "#fbe724"]
  },
  "vega_magma": {
    1: ["#b6377a"],
    2: ["#721f81", "#f1605d"],
    3: ["#51137c", "#b6377a", "#fb8762"],
    4: ["#3b0f70", "#8c2981", "#de4968", "#fe9f6d"],
    5: ["#2c1160", "#721f81", "#b6377a", "#f1605d", "#feaf78"],
    6: ["#231151", "#5f187f", "#982d80", "#d3436e", "#f8765d", "#feba81"],
    7: ["#1d1046", "#51137c", "#822582", "#b6377a", "#e65164", "#fb8762", "#fec387"],
    8: ["#190f3e", "#451076", "#721f81", "#9f2f7f", "#cd4071", "#f1605d", "#fd9468", "#fec98d"],
    9: ["#150e37", "#3b0f70", "#651a80", "#8c2981", "#b6377a", "#de4968", "#f76f5c", "#fe9f6d", "#fece91"],
    256: ["#000006", "#010108", "#010109", "#02020b", "#02020d", "#03030f", "#030310", "#040412", "#040414", "#050516", "#060518", "#07061a", "#08071c", "#08071e", "#090820", "#0a0822", "#0b0924", "#0c0a26", "#0d0a28", "#0e0b2a", "#100b2d", "#110c2f", "#120c31", "#130d33", "#140e35", "#150e38", "#170e3a", "#180f3c", "#190f3f", "#1b1041", "#1c1043", "#1d1046", "#1e1148", "#20114a", "#21114d", "#22114f", "#241152", "#251154", "#271157", "#281159", "#29115c", "#2b115e", "#2c1160", "#2e1162", "#301064", "#321066", "#331068", "#35106a", "#37106c", "#390f6d", "#3a0f6f", "#3c0f71", "#3e0f72", "#400f73", "#410f74", "#431075", "#451076", "#471077", "#481078", "#4a1079", "#4c117a", "#4d117a", "#4f127b", "#50127b", "#52137c", "#53147d", "#55147d", "#56157e", "#58157e", "#59167e", "#5b167f", "#5d177f", "#5e187f", "#60187f", "#621980", "#631980", "#651a80", "#661b80", "#681b80", "#691c80", "#6b1c80", "#6c1d81", "#6e1d81", "#6f1e81", "#711f81", "#731f81", "#742081", "#762081", "#772181", "#792282", "#7a2282", "#7c2382", "#7d2382", "#7f2482", "#802482", "#822582", "#832682", "#852682", "#862781", "#882781", "#892881", "#8b2981", "#8c2981", "#8e2a81", "#902a81", "#912b81", "#932b81", "#942c80", "#962d80", "#982d80", "#992e80", "#9b2e80", "#9d2f7f", "#9e2f7f", "#a0307f", "#a2307e", "#a3317e", "#a5317e", "#a6327d", "#a8327d", "#aa337d", "#ab337c", "#ad347c", "#af347c", "#b0357b", "#b2367b", "#b4367b", "#b5377a", "#b7377a", "#b83879", "#ba3879", "#bc3978", "#bd3a77", "#bf3a77", "#c13b76", "#c23b76", "#c43c75", "#c53d74", "#c73d74", "#c83e73", "#ca3f72", "#cb3f72", "#cd4071", "#cf4170", "#d0426f", "#d2426f", "#d3436e", "#d5446d", "#d6456c", "#d8466b", "#d9466b", "#db476a", "#dc4869", "#de4968", "#df4a67", "#e04b67", "#e24d66", "#e34e65", "#e44f65", "#e55064", "#e75263", "#e85363", "#e95462", "#ea5661", "#eb5761", "#ec5960", "#ed5a60", "#ee5b5f", "#ef5d5e", "#f05e5e", "#f1605d", "#f1615d", "#f2635d", "#f3655d", "#f4665d", "#f4685c", "#f56a5c", "#f66c5c", "#f66d5c", "#f76f5c", "#f7715c", "#f8735c", "#f8755d", "#f8775d", "#f9795d", "#f97a5d", "#f97c5e", "#fa7e5e", "#fa805e", "#fa825f", "#fb8460", "#fb8661", "#fb8762", "#fb8963", "#fc8b63", "#fc8d64", "#fc8f65", "#fc9166", "#fc9367", "#fd9568", "#fd9669", "#fd986a", "#fd9a6b", "#fe9c6c", "#fe9e6c", "#fea06e", "#fea26f", "#fea370", "#fea571", "#fea773", "#fea974", "#feab75", "#fead77", "#feaf78", "#feb179", "#feb27b", "#feb47c", "#feb67d", "#feb87f", "#feba80", "#febc82", "#febe83", "#febf84", "#fec186", "#fec387", "#fec589", "#fec68a", "#fec88c", "#feca8e", "#fecc8f", "#fecd91", "#fecf92", "#fed194", "#fed396", "#fed597", "#fdd799", "#fdd99b", "#fddb9d", "#fddc9e", "#fddea0", "#fde0a2", "#fde2a4", "#fde3a5", "#fde5a7", "#fce7a9", "#fce9ab", "#fceaac", "#fcecae", "#fceeb0", "#fcf0b2", "#fcf2b4", "#fcf4b6", "#fcf6b8", "#fcf7b9", "#fcf9bb", "#fcfbbd"]
  },
  "vega_inferno": {
    1: ["#bb3755"],
    2: ["#781c6d", "#ed6925"],
    3: ["#57106d", "#bb3755", "#fa8d0b"],
    4: ["#420a68", "#932667", "#dd513a", "#fca50a"],
    5: ["#330a5f", "#781c6d", "#bb3755", "#ed6925", "#fcb519"],
    6: ["#280b54", "#65156e", "#9f2a63", "#d44843", "#f57d15", "#fbc127"],
    7: ["#210c4a", "#57106d", "#89226a", "#bb3755", "#e45933", "#fa8d0b", "#f9ca33"],
    8: ["#1b0c42", "#4b0c6b", "#781c6d", "#a52d60", "#ce4347", "#ed6925", "#fb9a07", "#f7d13d"],
    9: ["#170c3b", "#420a68", "#6b176e", "#932667", "#bb3755", "#dd513a", "#f3771a", "#fca50a", "#f6d645"],
    256: ["#000006", "#010108", "#010109", "#02010b", "#02020d", "#03020f", "#030210", "#040312", "#040314", "#050416", "#060418", "#07051b", "#08061d", "#09061f", "#0a0721", "#0b0723", "#0c0826", "#0d0828", "#0e092b", "#10092d", "#110a2f", "#120a32", "#140b34", "#150b37", "#160c39", "#170c3c", "#190c3e", "#1a0c40", "#1c0c43", "#1e0c45", "#1f0c47", "#210c4a", "#220c4c", "#240c4e", "#250c50", "#270c52", "#290b54", "#2b0b56", "#2c0b58", "#2e0b5a", "#300a5c", "#320a5d", "#330a5f", "#350a60", "#370a61", "#390a62", "#3a0a63", "#3c0a64", "#3e0a65", "#400a67", "#410a68", "#430a68", "#450b69", "#460b69", "#480b6a", "#4a0c6a", "#4b0c6b", "#4d0c6b", "#4e0d6c", "#500d6c", "#520e6c", "#530e6c", "#550f6d", "#560f6d", "#58106d", "#59116d", "#5b116e", "#5c126e", "#5e126e", "#5f136e", "#61136e", "#63146e", "#64156e", "#66156e", "#68166e", "#69166e", "#6b176e", "#6c186e", "#6e186e", "#6f196e", "#71196e", "#721a6d", "#741a6d", "#751b6d", "#771c6d", "#791c6d", "#7a1d6d", "#7c1d6c", "#7d1e6c", "#7f1f6c", "#811f6c", "#82206c", "#84206b", "#86216b", "#87216b", "#89226a", "#8a236a", "#8c2369", "#8d2469", "#8f2468", "#902568", "#922667", "#932667", "#952766", "#972766", "#982865", "#9a2865", "#9b2964", "#9d2a63", "#9f2a63", "#a02b62", "#a22b62", "#a32c61", "#a52d60", "#a72d5f", "#a82e5f", "#aa2e5e", "#ab2f5d", "#ad2f5d", "#ae305c", "#b0315b", "#b1325a", "#b33359", "#b43359", "#b63458", "#b73557", "#b93656", "#ba3755", "#bc3754", "#bd3853", "#bf3952", "#c03a51", "#c13b50", "#c33b4f", "#c43c4e", "#c63d4d", "#c73e4c", "#c83f4b", "#c9404a", "#cb4149", "#cc4248", "#cd4347", "#cf4446", "#d04446", "#d14545", "#d24644", "#d44842", "#d54941", "#d64a40", "#d84c3f", "#d94d3e", "#da4e3d", "#db4f3b", "#dd513a", "#de5239", "#df5338", "#e05537", "#e15636", "#e25734", "#e35833", "#e45a32", "#e55b31", "#e65c30", "#e75e2e", "#e85f2d", "#e9612c", "#e9622b", "#ea6429", "#eb6528", "#ec6727", "#ed6825", "#ed6a24", "#ee6c23", "#ef6d22", "#f06f20", "#f0711f", "#f1721e", "#f2741c", "#f2761b", "#f3771a", "#f47919", "#f47a17", "#f57c16", "#f57e15", "#f67f13", "#f78112", "#f78311", "#f88410", "#f8860e", "#f9880d", "#f98a0c", "#f98c0b", "#fa8d0a", "#fa8f09", "#fa9108", "#fb9307", "#fb9506", "#fb9706", "#fb9907", "#fb9b07", "#fb9c08", "#fc9e08", "#fca009", "#fca209", "#fca40a", "#fca60b", "#fca80c", "#fca90e", "#fcab10", "#fcad12", "#fcaf13", "#fcb115", "#fcb317", "#fcb519", "#fcb71b", "#fcb91d", "#fbbb20", "#fbbd22", "#fbbf24", "#fbc127", "#fac329", "#fac52b", "#fac62e", "#f9c831", "#f9ca33", "#f8cc36", "#f8ce39", "#f8d03c", "#f7d23f", "#f7d441", "#f6d544", "#f6d747", "#f5d94b", "#f5db4e", "#f4dd51", "#f4df54", "#f3e158", "#f3e35b", "#f2e45e", "#f2e662", "#f2e866", "#f2e96a", "#f2eb6e", "#f2ed72", "#f3ee76", "#f3f07a", "#f3f27e", "#f3f382", "#f4f586", "#f5f68a", "#f6f78e", "#f7f991", "#f8fa95", "#f9fb99", "#fafc9d", "#fbfea0"]
  },
  "vega_plasma": {
    1: ["#cb4779"],
    2: ["#9c179e", "#ed7953"],
    3: ["#7e03a8", "#cb4779", "#f89541"],
    4: ["#6a00a8", "#b12a90", "#e16462", "#fca636"],
    5: ["#5d01a6", "#9c179e", "#cb4779", "#ed7953", "#fdb32f"],
    6: ["#5402a3", "#8b0aa5", "#b93389", "#db5b68", "#f48849", "#febc2b"],
    7: ["#4d02a1", "#7e03a8", "#aa2396", "#cb4779", "#e66c5d", "#f89541", "#fec428"],
    8: ["#47039f", "#7301a8", "#9c179e", "#bd3785", "#d8576c", "#ed7953", "#fb9e3b", "#fdc926"],
    9: ["#42039d", "#6a00a8", "#900da4", "#b12a90", "#cb4779", "#e16462", "#f2834c", "#fca636", "#fcce25"],
    256: ["#100888", "#120889", "#15078a", "#17078b", "#1a078c", "#1c078d", "#1f068e", "#22068f", "#240690", "#260691", "#280692", "#290693", "#2b0594", "#2d0594", "#2f0595", "#310596", "#330597", "#350598", "#360598", "#380499", "#3a049a", "#3c049a", "#3d049b", "#3f039c", "#41039d", "#42039d", "#44039e", "#46039e", "#47039f", "#4902a0", "#4b02a0", "#4c02a1", "#4e02a1", "#5002a2", "#5102a2", "#5302a3", "#5402a3", "#5602a4", "#5701a4", "#5901a5", "#5a01a5", "#5c01a6", "#5d01a6", "#5f01a6", "#6001a7", "#6201a7", "#6301a7", "#6500a7", "#6600a7", "#6800a8", "#6900a8", "#6b00a8", "#6d00a8", "#6e00a8", "#7000a8", "#7201a8", "#7301a8", "#7501a8", "#7601a8", "#7801a8", "#7901a8", "#7b02a8", "#7c02a8", "#7e03a8", "#7f03a7", "#8004a7", "#8204a7", "#8305a7", "#8505a7", "#8606a6", "#8707a6", "#8908a6", "#8a09a5", "#8c0aa5", "#8d0ba5", "#8e0ca4", "#900da4", "#910ea3", "#930fa3", "#9410a2", "#9512a1", "#9713a1", "#9814a0", "#9a159f", "#9b169e", "#9c179e", "#9e199d", "#9f1a9c", "#a01b9c", "#a21c9b", "#a31d9a", "#a41e9a", "#a52099", "#a72198", "#a82297", "#a92396", "#aa2495", "#ab2594", "#ad2694", "#ae2793", "#af2892", "#b02991", "#b12a90", "#b22b8f", "#b32d8e", "#b42e8d", "#b52f8c", "#b6308b", "#b8318a", "#b93289", "#ba3488", "#bb3587", "#bc3686", "#bd3786", "#be3885", "#bf3984", "#c03a83", "#c13b82", "#c23c81", "#c33d80", "#c43e7f", "#c53f7e", "#c6417d", "#c7427d", "#c8437c", "#c9447b", "#ca457a", "#cb4679", "#cb4879", "#cc4978", "#cd4a77", "#ce4b76", "#cf4c75", "#d04d74", "#d14f73", "#d25072", "#d35171", "#d45270", "#d5536f", "#d5546e", "#d6556d", "#d7566c", "#d8576b", "#d9586b", "#d9596a", "#da5a69", "#db5c68", "#dc5d67", "#dd5e66", "#de5f65", "#de6065", "#df6164", "#e06363", "#e16462", "#e26561", "#e26661", "#e36760", "#e4685f", "#e46a5e", "#e56b5d", "#e66c5c", "#e66d5c", "#e76e5b", "#e8705a", "#e97159", "#e97258", "#ea7357", "#eb7556", "#eb7655", "#ec7754", "#ed7953", "#ed7a52", "#ee7b52", "#ef7c51", "#ef7d50", "#f07e4f", "#f0804e", "#f1814e", "#f1824d", "#f2834c", "#f3854b", "#f3864a", "#f38749", "#f48948", "#f48a47", "#f58c46", "#f58d45", "#f68e44", "#f69044", "#f79143", "#f79242", "#f89441", "#f89540", "#f9963f", "#f9973f", "#fa993e", "#fa9a3d", "#fa9b3c", "#fa9d3b", "#fb9e3b", "#fba03a", "#fba139", "#fba238", "#fca437", "#fca536", "#fca736", "#fca835", "#fcaa34", "#fcab33", "#fdad32", "#fdae32", "#fdb031", "#fdb130", "#fdb32f", "#fdb42e", "#fdb62e", "#fdb72d", "#fdb92c", "#feba2c", "#febc2b", "#febd2a", "#febf2a", "#fec029", "#fec228", "#fdc428", "#fdc527", "#fdc727", "#fdc927", "#fdca26", "#fccc26", "#fcce25", "#fccf25", "#fbd125", "#fbd225", "#fbd425", "#fad624", "#fad724", "#fad924", "#f9db24", "#f9dc24", "#f8de24", "#f8df25", "#f8e125", "#f7e325", "#f7e426", "#f6e626", "#f6e826", "#f5e927", "#f5eb27", "#f4ed26", "#f4ee25", "#f3f025", "#f2f224", "#f2f423", "#f1f522", "#f1f722"]
  },
  "vega_cividis": {
    1: ["#7e7b75"],
    2: ["#555b6e", "#a19b78"],
    3: ["#3b4c6e", "#7e7b75", "#b7ac73"],
    4: ["#2a446e", "#67686f", "#928d78", "#c7b76c"],
    5: ["#1f3e6e", "#555b6e", "#7e7b75", "#a19b78", "#d1bf67"],
    6: ["#16396d", "#47536d", "#6e6d71", "#8c8877", "#aea575", "#d8c462"],
    7: ["#11366c", "#3b4c6e", "#61636f", "#7e7b75", "#989278", "#b7ac73", "#dec85f"],
    8: ["#0d346b", "#31476e", "#555b6e", "#727071", "#898577", "#a19b78", "#c0b26f", "#e2cb5c"],
    9: ["#0a326a", "#2a446e", "#4c566d", "#67686f", "#7e7b75", "#928d78", "#a9a177", "#c7b76c", "#e6ce59"]
  },
  "vega_rainbow": {
    1: ["#aff05b"],
    2: ["#ff8c38", "#28ea8d"],
    3: ["#ff5f64", "#aff05b", "#1bc7c2"],
    4: ["#fe4b83", "#e2b72f", "#52f667", "#23abd8"],
    5: ["#ee4395", "#ff8c38", "#aff05b", "#28ea8d", "#2f96e0"],
    6: ["#de40a0", "#ff704f", "#d2c935", "#6bf65d", "#1bd9ac", "#3988e1"],
    7: ["#d23ea7", "#ff5f64", "#efa730", "#aff05b", "#40f374", "#1bc7c2", "#417de0"],
    8: ["#c73dab", "#ff5375", "#ff8c38", "#c9d33b", "#7af55a", "#28ea8d", "#1eb8cf", "#4775dd"],
    9: ["#bf3caf", "#fe4b83", "#ff7847", "#e2b72f", "#aff05b", "#52f667", "#1ddfa3", "#23abd8", "#4c6edb"]
  },
  "vega_sinebow": {
    1: ["#00bfbf"],
    2: ["#40ff40", "#4040ff"],
    3: ["#80ee12", "#00bfbf", "#8012ee"],
    4: ["#a7d503", "#18f472", "#1872f4", "#a703d5"],
    5: ["#bfbf00", "#40ff40", "#00bfbf", "#4040ff", "#bf00bf"],
    6: ["#cfae02", "#63f922", "#0de989", "#0d89e9", "#6322f9", "#cf02ae"],
    7: ["#daa105", "#80ee12", "#26fa5f", "#00bfbf", "#265ffa", "#8012ee", "#da05a1"],
    8: ["#e19608", "#96e108", "#40ff40", "#08e196", "#0896e1", "#4040ff", "#9608e1", "#e10896"],
    9: ["#e78d0b", "#a7d503", "#58fc2a", "#18f472", "#00bfbf", "#1872f4", "#582afc", "#a703d5", "#e70b8d"]
  },
  "vega_turbo": {
    1: ["#8ffc54"],
    2: ["#2de3b2", "#fac029"],
    3: ["#27bae3", "#8ffc54", "#ff8a1f"],
    4: ["#309bf5", "#49f787", "#d8e135", "#fb6819"],
    5: ["#3a85f9", "#2de3b2", "#8ffc54", "#fac029", "#ec5115"],
    6: ["#4074f5", "#25cdcf", "#5afc77", "#c5ec3c", "#ffa223", "#df4111"],
    7: ["#4568ed", "#27bae3", "#3cf197", "#8ffc54", "#e7d630", "#ff8a1f", "#d4370f"],
    8: ["#485ee4", "#2ba9ef", "#2de3b2", "#65fd6e", "#b9f140", "#fac029", "#ff771c", "#cb2f0d"],
    9: ["#4956db", "#309bf5", "#27d4c7", "#49f787", "#8ffc54", "#d8e135", "#ffac24", "#fb6819", "#c3290b"]
  },
  "vega_browns": {
    1: ["#d18954"],
    2: ["#e1a360", "#c26d43"],
    3: ["#e7b170", "#d18954", "#bc5e3b"],
    4: ["#e9b97a", "#dc9856", "#c7784c", "#b85536"],
    5: ["#eabf83", "#e1a360", "#d18954", "#c26d43", "#b44f35"],
    6: ["#ebc38a", "#e5aa68", "#d99455", "#ca7d4e", "#bf643e", "#b24b34"],
    7: ["#ebc68f", "#e7b170", "#de9c5a", "#d18954", "#c57449", "#bc5e3b", "#b04834"],
    8: ["#ecc893", "#e8b575", "#e1a360", "#d79155", "#cb8050", "#c26d43", "#ba5938", "#ae4633"],
    9: ["#ecca96", "#e9b97a", "#e4a865", "#dc9856", "#d18954", "#c7784c", "#c0673f", "#b85536", "#ad4433"]
  },
  "vega_tealblues": {
    1: ["#45a2b9"],
    2: ["#6eb8c5", "#3589a9"],
    3: ["#81c3cb", "#45a2b9", "#347da0"],
    4: ["#8cc9cd", "#5fb0c0", "#3993b0", "#32759b"],
    5: ["#94cecf", "#6eb8c5", "#45a2b9", "#3589a9", "#317097"],
    6: ["#99d1d0", "#79bec8", "#57acbe", "#3c97b3", "#3582a4", "#316d95"],
    7: ["#9dd3d1", "#81c3cb", "#65b3c2", "#45a2b9", "#368fae", "#347da0", "#306a93"],
    8: ["#a0d5d2", "#87c7cc", "#6eb8c5", "#53aabd", "#3e9ab4", "#3589a9", "#33799d", "#306891"],
    9: ["#a3d6d2", "#8cc9cd", "#76bdc7", "#5fb0c0", "#45a2b9", "#3993b0", "#3584a6", "#32759b", "#2f6790"]
  },
  "vega_teals": {
    1: ["#4da5a4"],
    2: ["#6eb8b7", "#2f9090"],
    3: ["#80c3c2", "#4da5a4", "#258586"],
    4: ["#8ac9c9", "#61b0af", "#379998", "#1e7f7f"],
    5: ["#92cdcd", "#6eb8b7", "#4da5a4", "#2f9090", "#1a7b7b"],
    6: ["#98cfd0", "#78bebd", "#5badac", "#3d9c9b", "#29898a", "#177878"],
    7: ["#9cd1d2", "#80c3c2", "#66b3b2", "#4da5a4", "#349695", "#258586", "#157576"],
    8: ["#9fd3d4", "#85c6c6", "#6eb8b7", "#58abaa", "#419e9d", "#2f9090", "#218282", "#137374"],
    9: ["#a2d4d5", "#8ac9c9", "#75bcbb", "#61b0af", "#4da5a4", "#379998", "#2b8b8c", "#1e7f7f", "#127273"]
  },
  "vega_warmgreys": {
    1: ["#98908c"],
    2: ["#aea5a2", "#827a77"],
    3: ["#bab1ae", "#98908c", "#786f6d"],
    4: ["#c0b8b4", "#a59c99", "#8b827f", "#726866"],
    5: ["#c5bcb8", "#aea5a2", "#98908c", "#827a77", "#6e6462"],
    6: ["#c8bfbb", "#b5aca9", "#a19995", "#8f8683", "#7c7471", "#6b615f"],
    7: ["#cbc2be", "#bab1ae", "#a9a09d", "#98908c", "#887f7c", "#786f6d", "#695f5d"],
    8: ["#ccc4c0", "#bdb5b1", "#aea5a2", "#9f9793", "#918885", "#827a77", "#756b69", "#675d5b"],
    9: ["#cec5c1", "#c0b8b4", "#b3aaa7", "#a59c99", "#98908c", "#8b827f", "#7e7673", "#726866", "#665c5a"]
  },
  "vega_goldgreen": {
    1: ["#60a656"],
    2: ["#8fb858", "#439350"],
    3: ["#a7bf5b", "#60a656", "#39894d"],
    4: ["#b6c35c", "#7cb257", "#4b9c53", "#33834a"],
    5: ["#c0c55d", "#8fb858", "#60a656", "#439350", "#2e7f47"],
    6: ["#c8c75e", "#9cbc59", "#74af57", "#519f54", "#3d8d4e", "#2b7c44"],
    7: ["#cdc85f", "#a7bf5b", "#83b458", "#60a656", "#489952", "#39894d", "#297a43"],
    8: ["#d2c960", "#afc15b", "#8fb858", "#70ad57", "#54a054", "#439350", "#36864b", "#277841"],
    9: ["#d5ca60", "#b6c35c", "#98bb59", "#7cb257", "#60a656", "#4b9c53", "#3f8f4f", "#33834a", "#257740"]
  },
  "vega_goldorange": {
    1: ["#ef701b"],
    2: ["#f49235", "#da5821"],
    3: ["#f7a144", "#ef701b", "#ce4e23"],
    4: ["#f8aa4c", "#f3852a", "#e2621f", "#c54923"],
    5: ["#f8b151", "#f49235", "#ef701b", "#da5821", "#be4723"],
    6: ["#f8b555", "#f59b3d", "#f27f26", "#e6661e", "#d45222", "#ba4523"],
    7: ["#f8b958", "#f7a144", "#f48a2e", "#ef701b", "#df5e20", "#ce4e23", "#b64423"],
    8: ["#f8bc5a", "#f7a648", "#f49235", "#f17c23", "#e8681d", "#da5821", "#c94b23", "#b34323"],
    9: ["#f8be5c", "#f8aa4c", "#f5983b", "#f3852a", "#ef701b", "#e2621f", "#d65322", "#c54923", "#b14223"]
  },
  "vega_goldred": {
    1: ["#ee734a"],
    2: ["#fa904d", "#de5748"],
    3: ["#fba050", "#ee734a", "#d54a46"],
    4: ["#f9aa51", "#f6834b", "#e56249", "#cf4244"],
    5: ["#f8b154", "#fa904d", "#ee734a", "#de5748", "#cb3c43"],
    6: ["#f7b556", "#fc994e", "#f47e4b", "#e86749", "#d95047", "#c93842"],
    7: ["#f7b957", "#fba050", "#f8884c", "#ee734a", "#e35e49", "#d54a46", "#c73542"],
    8: ["#f6bc58", "#faa650", "#fa904d", "#f27c4b", "#e96a49", "#de5748", "#d24645", "#c53341"],
    9: ["#f6be59", "#f9aa51", "#fc964e", "#f6834b", "#ee734a", "#e56249", "#db5247", "#cf4244", "#c43141"]
  },
  "vega_lightgreyred": {
    1: ["#c4a293"],
    2: ["#c8bdb9", "#dc7b43"],
    3: ["#d2c8c4", "#c4a293", "#e06624"],
    4: ["#d7cecb", "#c0b4af", "#d38b66", "#e15917"],
    5: ["#dbd3d0", "#c8bdb9", "#c4a293", "#dc7b43", "#e05015"],
    6: ["#ded6d3", "#cec3bf", "#bdb0ab", "#cf9275", "#de6f31", "#e04913"],
    7: ["#e0d8d5", "#d2c8c4", "#c3b7b3", "#c4a293", "#d68559", "#e06624", "#df4412"],
    8: ["#e1dad7", "#d5cbc8", "#c8bdb9", "#bbaea9", "#cd967d", "#dc7b43", "#e15f19", "#df4011"],
    9: ["#e2dcd9", "#d7cecb", "#ccc1be", "#c0b4af", "#c4a293", "#d38b66", "#de7336", "#e15917", "#df3a10"]
  },
  "vega_lightgreyteal": {
    1: ["#85b2be"],
    2: ["#b7c2c7", "#22a6c3"],
    3: ["#c4cbcf", "#85b2be", "#2299c2"],
    4: ["#cbd1d4", "#adbac0", "#4aacc1", "#2192c0"],
    5: ["#cfd5d8", "#b7c2c7", "#85b2be", "#22a6c3", "#218dc0"],
    6: ["#d2d8da", "#bec7cc", "#a8b6be", "#5bafc0", "#229fc2", "#208abf"],
    7: ["#d4dadc", "#c4cbcf", "#b1bdc3", "#85b2be", "#3baac2", "#2299c2", "#1f87be"],
    8: ["#d6dcdd", "#c8ced2", "#b7c2c7", "#a6b4bc", "#64b0bf", "#22a6c3", "#2295c1", "#1f85be"],
    9: ["#d7ddde", "#cbd1d4", "#bcc6ca", "#adbac0", "#85b2be", "#4aacc1", "#22a1c2", "#2192c0", "#1e84be"]
  },
  "vega_lightmulti": {
    1: ["#f6e072"],
    2: ["#c5e08b", "#f5b34c"],
    3: ["#b0de9f", "#f6e072", "#f3993e"],
    4: ["#b8e2b3", "#d8e17e", "#f6c659", "#f58a3f"],
    5: ["#bde5c0", "#c5e08b", "#f6e072", "#f5b34c", "#f6803f"],
    6: ["#c1e7c9", "#b9df96", "#e0e17b", "#f6ce60", "#f4a444", "#f67940"],
    7: ["#c4e9d0", "#b0de9f", "#d0e181", "#f6e072", "#f6c053", "#f3993e", "#f77440"],
    8: ["#c7ead4", "#b4e0aa", "#c5e08b", "#e5e079", "#f6d264", "#f5b34c", "#f4913e", "#f66f40"],
    9: ["#caebd7", "#b8e2b3", "#bddf93", "#d8e17e", "#f6e072", "#f6c659", "#f4a946", "#f58a3f", "#f56c3f"]
  },
  "vega_lightorange": {
    1: ["#f8936d"],
    2: ["#fab184", "#ef7860"],
    3: ["#f9bf94", "#f8936d", "#ea695c"],
    4: ["#f9c7a0", "#faa47a", "#f38264", "#e6605b"],
    5: ["#f8cdaa", "#fab184", "#f8936d", "#ef7860", "#e35b5b"],
    6: ["#f8d0b1", "#fab98d", "#fa9f75", "#f58766", "#ec6f5e", "#e1565b"],
    7: ["#f7d3b6", "#f9bf94", "#faa97e", "#f8936d", "#f27e63", "#ea695c", "#df535b"],
    8: ["#f7d5ba", "#f9c499", "#fab184", "#fa9c73", "#f68967", "#ef7860", "#e8645b", "#de515b"],
    9: ["#f7d7bd", "#f9c7a0", "#fab78a", "#faa47a", "#f8936d", "#f38264", "#ed725f", "#e6605b", "#dd4f5b"]
  },
  "vega_lighttealblue": {
    1: ["#49a7bd"],
    2: ["#7abfc8", "#328dad"],
    3: ["#92caca", "#49a7bd", "#3080a3"],
    4: ["#a2d1cb", "#66b5c3", "#3698b4", "#2d799e"],
    5: ["#add5cd", "#7abfc8", "#49a7bd", "#328dad", "#2b749b"],
    6: ["#b5d8ce", "#88c5c9", "#5eb1c1", "#379cb7", "#3186a7", "#297098"],
    7: ["#bbdace", "#92caca", "#6eb9c5", "#49a7bd", "#3494b2", "#3080a3", "#286d96"],
    8: ["#c0dccf", "#9aceca", "#7abfc8", "#59afc0", "#389fb9", "#328dad", "#2f7ca0", "#276b95"],
    9: ["#c4ddd1", "#a2d1cb", "#84c4c9", "#66b5c3", "#49a7bd", "#3698b4", "#3188a9", "#2d799e", "#276994"]
  },
  "vega_darkblue": {
    1: ["#039ac7"],
    2: ["#0074af", "#25c0dd"],
    3: ["#14629a", "#039ac7", "#33d4e9"],
    4: ["#1e588a", "#0082b9", "#12b1d4", "#3ddff0"],
    5: ["#24517e", "#0074af", "#039ac7", "#25c0dd", "#44e7f4"],
    6: ["#284c74", "#0b6aa3", "#0089bd", "#0aabd0", "#2dcbe4", "#49ecf6"],
    7: ["#2b496d", "#14629a", "#007db5", "#039ac7", "#19b7d7", "#33d4e9", "#4df0f8"],
    8: ["#2d4668", "#1a5c93", "#0074af", "#008cbf", "#05a7ce", "#25c0dd", "#38daed", "#50f3fa"],
    9: ["#2e4463", "#1e588a", "#086da7", "#0082b9", "#039ac7", "#12b1d4", "#2bc8e2", "#3ddff0", "#61f4fb"]
  },
  "vega_darkgold": {
    1: ["#bf9828"],
    2: ["#8c7631", "#ecc31e"],
    3: ["#796433", "#bf9828", "#f6d72c"],
    4: ["#6d5a35", "#a0832d", "#dbb022", "#fae241"],
    5: ["#655536", "#8c7631", "#bf9828", "#ecc31e", "#fce85a"],
    6: ["#5f5036", "#816c32", "#a9882c", "#d3a823", "#f2cf26", "#fdec6c"],
    7: ["#5b4d37", "#796433", "#997e2f", "#bf9828", "#e1b720", "#f6d72c", "#feef7a"],
    8: ["#584b37", "#725e34", "#8c7631", "#ae8b2b", "#cfa424", "#ecc31e", "#f9de30", "#fff184"],
    9: ["#554a38", "#6d5a35", "#846f32", "#a0832d", "#bf9828", "#dbb022", "#f0cb23", "#fae241", "#fff290"]
  },
  "vega_darkgreen": {
    1: ["#5fa941"],
    2: ["#048942", "#a6c63d"],
    3: ["#01764a", "#5fa941", "#c7d438"],
    4: ["#076a4c", "#2d9642", "#89bb3f", "#dbdc34"],
    5: ["#11634b", "#048942", "#5fa941", "#a6c63d", "#e9e231"],
    6: ["#185e49", "#027e47", "#3e9b42", "#7db640", "#b9ce3a", "#f2e62f"],
    7: ["#1d5a49", "#01764a", "#1e9142", "#5fa941", "#94bf3e", "#c7d438", "#f9e92d"],
    8: ["#215748", "#006f4d", "#048942", "#489e42", "#76b340", "#a6c63d", "#d2d836", "#ffeb2c"],
    9: ["#245447", "#076a4c", "#038145", "#2d9642", "#5fa941", "#89bb3f", "#b3cb3b", "#dbdc34", "#ffed39"]
  },
  "vega_darkmulti": {
    1: ["#29a869"],
    2: ["#197d8c", "#95ce3f"],
    3: ["#1c688a", "#29a869", "#cadb20"],
    4: ["#1e5b88", "#1f8e7e", "#6abf50", "#eae30d"],
    5: ["#1f5287", "#197d8c", "#29a869", "#95ce3f", "#ffe800"],
    6: ["#224e7c", "#1b718b", "#229678", "#57b857", "#b3d52d", "#ffeb24"],
    7: ["#254b73", "#1c688a", "#1d8883", "#29a869", "#7ac54a", "#cadb20", "#ffee40"],
    8: ["#27496c", "#1d6089", "#197d8c", "#249a75", "#4db55b", "#95ce3f", "#dcdf15", "#fff055"],
    9: ["#294767", "#1e5b88", "#1a748b", "#1f8e7e", "#29a869", "#6abf50", "#aad332", "#eae30d", "#fff166"]
  },
  "vega_darkred": {
    1: ["#e75d1e"],
    2: ["#bd3f37", "#ed9223"],
    3: ["#9e3c38", "#e75d1e", "#eeab29"],
    4: ["#8c3a36", "#d14632", "#eb7e20", "#efb92d"],
    5: ["#7f3835", "#bd3f37", "#e75d1e", "#ed9223", "#efc22f"],
    6: ["#773734", "#ab3d38", "#d84c2c", "#ea741f", "#eda026", "#f0c931"],
    7: ["#703633", "#9e3c38", "#cc4037", "#e75d1e", "#ec8620", "#eeab29", "#f0ce32"],
    8: ["#693633", "#943b37", "#bd3f37", "#db5029", "#e96f1f", "#ed9223", "#eeb32b", "#f2d131"],
    9: ["#643633", "#8c3a36", "#b03e38", "#d14632", "#e75d1e", "#eb7e20", "#ed9c25", "#efb92d", "#f3d431"]
  }
};
exports.VEGA_PALETTE_DATA = VEGA_PALETTE_DATA;
var VEGA_DOCS_PALETTE_DATA = {
  "vega_category10": ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
  "vega_category20": ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
  "vega_category20b": ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"],
  "vega_category20c": ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"],
  "vega_tableau10": ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b", "#eeca3b", "#b279a2", "#ff9da6", "#9d755d", "#bab0ac"],
  "vega_tableau20": ["#4c78a8", "#9ecae9", "#f58518", "#ffbf79", "#54a24b", "#88d27a", "#b79a20", "#f2cf5b", "#439894", "#83bcb6", "#e45756", "#ff9d98", "#79706e", "#bab0ac", "#d67195", "#fcbfd2", "#b279a2", "#d6a5c9", "#9e765f", "#d8b5a5"],
  "vega_accent": ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  "vega_dark2": ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  "vega_paired": ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
  "vega_pastel1": ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"],
  "vega_pastel2": ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
  "vega_set1": ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
  "vega_set2": ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  "vega_set3": ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
  "vega_blues": ["#cfe1f2", "#bed8ec", "#a8cee5", "#8fc1de", "#74b2d7", "#5ba3cf", "#4592c6", "#3181bd", "#206fb2", "#125ca4", "#0a4a90"],
  "vega_greens": ["#d3eecd", "#c0e6ba", "#abdda5", "#94d391", "#7bc77d", "#60ba6c", "#46ab5e", "#329a51", "#208943", "#0e7735", "#036429"],
  "vega_greys": ["#e2e2e2", "#d4d4d4", "#c4c4c4", "#b1b1b1", "#9d9d9d", "#888888", "#757575", "#626262", "#4d4d4d", "#353535", "#1e1e1e"],
  "vega_oranges": ["#fdd8b3", "#fdc998", "#fdb87b", "#fda55e", "#fc9244", "#f87f2c", "#f06b18", "#e4580b", "#d14904", "#b93d02", "#9f3303"],
  "vega_purples": ["#e2e1ef", "#d4d4e8", "#c4c5e0", "#b4b3d6", "#a3a0cc", "#928ec3", "#827cb9", "#7566ae", "#684ea2", "#5c3696", "#501f8c"],
  "vega_reds": ["#fdc9b4", "#fcb49a", "#fc9e80", "#fc8767", "#fa7051", "#f6573f", "#ec3f2f", "#dc2a25", "#c81b1d", "#b21218", "#970b13"],
  "vega_bluegreen": ["#d5efed", "#c1e8e0", "#a7ddd1", "#8bd2be", "#70c6a9", "#58ba91", "#44ad77", "#319c5d", "#208946", "#0e7736", "#036429"],
  "vega_bluepurple": ["#ccddec", "#bad0e4", "#a8c2dd", "#9ab0d4", "#919cc9", "#8d85be", "#8b6db2", "#8a55a6", "#873c99", "#822287", "#730f71"],
  "vega_greenblue": ["#d3eece", "#c5e8c3", "#b1e1bb", "#9bd8bb", "#82cec2", "#69c2ca", "#51b2cd", "#3c9fc7", "#288abd", "#1675b1", "#0b60a1"],
  "vega_orangered": ["#fddcaf", "#fdcf9b", "#fdc18a", "#fdad77", "#fb9562", "#f67d53", "#ee6545", "#e24932", "#d32d1e", "#bf130d", "#a70403"],
  "vega_purpleblue": ["#dbdaeb", "#c8cee4", "#b1c3de", "#97b7d8", "#7bacd1", "#5b9fc9", "#3a90c0", "#1e7fb7", "#0b70ab", "#056199", "#045281"],
  "vega_purplebluegreen": ["#dbd8ea", "#c8cee4", "#b0c3de", "#93b7d8", "#72acd1", "#549fc8", "#3892bb", "#1c88a3", "#097f87", "#02736b", "#016353"],
  "vega_purplered": ["#dcc9e2", "#d3b3d7", "#ce9ecc", "#d186c0", "#da6bb2", "#e14da0", "#e23189", "#d91e6f", "#c61159", "#ab0749", "#8f023a"],
  "vega_redpurple": ["#fccfcc", "#fcbec0", "#faa9b8", "#f98faf", "#f571a5", "#ec539d", "#db3695", "#c41b8a", "#a90880", "#8d0179", "#700174"],
  "vega_yellowgreen": ["#e4f4ac", "#d1eca0", "#b9e294", "#9ed688", "#80c97c", "#62bb6e", "#47aa5e", "#329750", "#208344", "#0e723b", "#036034"],
  "vega_yelloworangebrown": ["#feeaa1", "#fedd84", "#fecc63", "#feb746", "#fca031", "#f68921", "#eb7215", "#db5e0b", "#c54c05", "#ab3d03", "#8f3204"],
  "vega_yelloworangered": ["#fee087", "#fed16f", "#febd59", "#fea849", "#fd903e", "#fc7335", "#f9522b", "#ee3423", "#de1b20", "#ca0b22", "#af0225"],
  "vega_blueorange": ["#134b85", "#2f78b3", "#5da2cb", "#9dcae1", "#d2e5ef", "#f2f0eb", "#fce0ba", "#fbbf74", "#e8932f", "#c5690d", "#994a07"],
  "vega_brownbluegreen": ["#704108", "#a0651a", "#c79548", "#e3c78a", "#f3e6c6", "#eef1ea", "#c9e9e4", "#8ed1c7", "#4da79e", "#187a72", "#025147"],
  "vega_purplegreen": ["#5b1667", "#834792", "#a67fb6", "#c9aed3", "#e6d6e8", "#eff0ef", "#d9efd5", "#aedda9", "#71bb75", "#368e49", "#0e5e29"],
  "vega_purpleorange": ["#411469", "#664796", "#8f83b7", "#b9b4d6", "#dadbeb", "#f3eeea", "#fce0ba", "#fbbf74", "#e8932f", "#c5690d", "#994a07"],
  "vega_redblue": ["#8c0d25", "#bf363a", "#df745e", "#f4ae91", "#fbdbc9", "#f2efee", "#d2e5ef", "#9dcae1", "#5da2cb", "#2f78b3", "#134b85"],
  "vega_redgrey": ["#8c0d25", "#bf363a", "#df745e", "#f4ae91", "#fcdccb", "#faf4f1", "#e2e2e2", "#c0c0c0", "#969696", "#646464", "#343434"],
  "vega_yellowgreenblue": ["#eff9bd", "#dbf1b4", "#bde5b5", "#94d5b9", "#69c5be", "#45b4c2", "#2c9ec0", "#2182b8", "#2163aa", "#23479c", "#1c3185"],
  "vega_redyellowblue": ["#a50026", "#d4322c", "#f16e43", "#fcac64", "#fedd90", "#faf8c1", "#dcf1ec", "#abd6e8", "#75abd0", "#4a74b4", "#313695"],
  "vega_redyellowgreen": ["#a50026", "#d4322c", "#f16e43", "#fcac63", "#fedd8d", "#f9f7ae", "#d7ee8e", "#a4d86e", "#64bc61", "#22964f", "#006837"],
  "vega_pinkyellowgreen": ["#8e0152", "#c0267e", "#dd72ad", "#f0b3d6", "#fadded", "#f5f3ef", "#e1f2ca", "#b6de87", "#80bb47", "#4f9125", "#276419"],
  "vega_spectral": ["#9e0142", "#d13c4b", "#f0704a", "#fcac63", "#fedd8d", "#fbf8b0", "#e0f3a1", "#a9dda2", "#69bda9", "#4288b5", "#5e4fa2"],
  "vega_viridis": ["#440154", "#482575", "#414487", "#35608d", "#2a788e", "#21918d", "#22a884", "#43bf71", "#7ad151", "#bcdf27", "#fde725"],
  "vega_magma": ["#000004", "#150e37", "#3b0f70", "#651a80", "#8c2981", "#b6377a", "#de4968", "#f76f5c", "#fe9f6d", "#fece91", "#fcfdbf"],
  "vega_inferno": ["#000004", "#170c3b", "#420a68", "#6b176e", "#932667", "#bb3755", "#dd513a", "#f3771a", "#fca50a", "#f6d645", "#fcffa4"],
  "vega_plasma": ["#0d0887", "#42039d", "#6a00a8", "#900da4", "#b12a90", "#cb4779", "#e16462", "#f2834c", "#fca636", "#fcce25", "#f0f921"],
  "vega_cividis": ["#002051", "#083169", "#26426e", "#4c566d", "#66676f", "#7f7c75", "#938e78", "#a9a177", "#c9b96a", "#e7cf58", "#fce647"],
  "vega_rainbow": ["#6e40aa", "#bf3caf", "#fe4b83", "#ff7847", "#e2b72f", "#aff05b", "#52f667", "#1ddfa3", "#23abd8", "#4c6edb", "#6e40aa"],
  "vega_sinebow": ["#ff4040", "#e78d0b", "#a7d503", "#58fc2a", "#18f472", "#00bfbf", "#1872f4", "#582afc", "#a703d5", "#e70b8d", "#ff4040"],
  "vega_turbo": ["#23171b", "#4a53d7", "#3295f7", "#27d5c6", "#47f689", "#95fb51", "#dae034", "#ffad24", "#f76118", "#c0260a", "#910b00"],
  "vega_browns": ["#eedbbd", "#ecca96", "#e9b97a", "#e4a865", "#dc9856", "#d18954", "#c7784c", "#c0673f", "#b85536", "#ad4433", "#9f3632"],
  "vega_tealblues": ["#bce4d8", "#bce4d8", "#9dd3d1", "#81c3cb", "#65b3c2", "#45a2b9", "#368fae", "#347da0", "#306a93", "#2c5985", "#2c5985"],
  "vega_teals": ["#bbdfdf", "#a2d4d5", "#8ac9c9", "#75bcbb", "#61b0af", "#4da5a4", "#379998", "#2b8b8c", "#1e7f7f", "#127273", "#006667"],
  "vega_warmgreys": ["#dcd4d0", "#cec5c1", "#c0b8b4", "#b3aaa7", "#a59c99", "#98908c", "#8b827f", "#7e7673", "#726866", "#665c5a", "#59504e"],
  "vega_goldgreen": ["#f4d166", "#d5ca60", "#b6c35c", "#98bb59", "#7cb257", "#60a656", "#4b9c53", "#3f8f4f", "#33834a", "#257740", "#146c36"],
  "vega_goldorange": ["#f4d166", "#f8be5c", "#f8aa4c", "#f5983b", "#f3852a", "#ef701b", "#e2621f", "#d65322", "#c54923", "#b14223", "#9e3a26"],
  "vega_goldred": ["#f4d166", "#f6be59", "#f9aa51", "#fc964e", "#f6834b", "#ee734a", "#e56249", "#db5247", "#cf4244", "#c43141", "#b71d3e"],
  "vega_lightgreyred": ["#efe9e6", "#e1dad7", "#d5cbc8", "#c8bdb9", "#bbaea9", "#cd967d", "#dc7b43", "#e15f19", "#df4011", "#dc000b", "#dc000b"],
  "vega_lightgreyteal": ["#e4eaea", "#d6dcdd", "#c8ced2", "#b7c2c7", "#a6b4bc", "#64b0bf", "#22a6c3", "#2295c1", "#1f85be", "#1876bc", "#1876bc"],
  "vega_lightmulti": ["#e0f1f2", "#e0f1f2", "#c4e9d0", "#b0de9f", "#d0e181", "#f6e072", "#f6c053", "#f3993e", "#f77440", "#ef4a3c", "#ef4a3c"],
  "vega_lightorange": ["#f2e7da", "#f7d5ba", "#f9c499", "#fab184", "#fa9c73", "#f68967", "#ef7860", "#e8645b", "#de515b", "#d43d5b", "#d43d5b"],
  "vega_lighttealblue": ["#e3e9e0", "#c0dccf", "#9aceca", "#7abfc8", "#59afc0", "#389fb9", "#328dad", "#2f7ca0", "#276b95", "#255988", "#255988"],
  "vega_darkblue": ["#323232", "#2d4668", "#1a5c93", "#0074af", "#008cbf", "#05a7ce", "#25c0dd", "#38daed", "#50f3fa", "#ffffff", "#ffffff"],
  "vega_darkgold": ["#3c3c3c", "#584b37", "#725e34", "#8c7631", "#ae8b2b", "#cfa424", "#ecc31e", "#f9de30", "#fff184", "#ffffff", "#ffffff"],
  "vega_darkgreen": ["#3a3a3a", "#215748", "#006f4d", "#048942", "#489e42", "#76b340", "#a6c63d", "#d2d836", "#ffeb2c", "#ffffaa", "#ffffaa"],
  "vega_darkmulti": ["#373737", "#373737", "#1f5287", "#197d8c", "#197d8c", "#29a869", "#95ce3f", "#95ce3f", "#ffe800", "#ffffff", "#ffffff"],
  "vega_darkred": ["#343434", "#343434", "#703633", "#9e3c38", "#cc4037", "#e75d1e", "#ec8620", "#eeab29", "#f0ce32", "#ffeb2c", "#ffeb2c"]
};
exports.VEGA_DOCS_PALETTE_DATA = VEGA_DOCS_PALETTE_DATA;
var VEGA_CATEGORY_10 = "vega_category10";
exports.VEGA_CATEGORY_10 = VEGA_CATEGORY_10;
var VEGA_CATEGORY_20 = "vega_category20";
exports.VEGA_CATEGORY_20 = VEGA_CATEGORY_20;
var VEGA_CATEGORY_20_B = "vega_category20b";
exports.VEGA_CATEGORY_20_B = VEGA_CATEGORY_20_B;
var VEGA_CATEGORY_20_C = "vega_category20c";
exports.VEGA_CATEGORY_20_C = VEGA_CATEGORY_20_C;
var VEGA_TABLEAU_10 = "vega_tableau10";
exports.VEGA_TABLEAU_10 = VEGA_TABLEAU_10;
var VEGA_TABLEAU_20 = "vega_tableau20";
exports.VEGA_TABLEAU_20 = VEGA_TABLEAU_20;
var VEGA_ACCENT = "vega_accent";
exports.VEGA_ACCENT = VEGA_ACCENT;
var VEGA_DARK_2 = "vega_dark2";
exports.VEGA_DARK_2 = VEGA_DARK_2;
var VEGA_PAIRED = "vega_paired";
exports.VEGA_PAIRED = VEGA_PAIRED;
var VEGA_PASTEL_1 = "vega_pastel1";
exports.VEGA_PASTEL_1 = VEGA_PASTEL_1;
var VEGA_PASTEL_2 = "vega_pastel2";
exports.VEGA_PASTEL_2 = VEGA_PASTEL_2;
var VEGA_SET_1 = "vega_set1";
exports.VEGA_SET_1 = VEGA_SET_1;
var VEGA_SET_2 = "vega_set2";
exports.VEGA_SET_2 = VEGA_SET_2;
var VEGA_SET_3 = "vega_set3";
exports.VEGA_SET_3 = VEGA_SET_3;
var VEGA_BLUES = "vega_blues";
exports.VEGA_BLUES = VEGA_BLUES;
var VEGA_GREENS = "vega_greens";
exports.VEGA_GREENS = VEGA_GREENS;
var VEGA_GREYS = "vega_greys";
exports.VEGA_GREYS = VEGA_GREYS;
var VEGA_ORANGES = "vega_oranges";
exports.VEGA_ORANGES = VEGA_ORANGES;
var VEGA_PURPLES = "vega_purples";
exports.VEGA_PURPLES = VEGA_PURPLES;
var VEGA_REDS = "vega_reds";
exports.VEGA_REDS = VEGA_REDS;
var VEGA_BLUE_GREEN = "vega_bluegreen";
exports.VEGA_BLUE_GREEN = VEGA_BLUE_GREEN;
var VEGA_BLUE_PURPLE = "vega_bluepurple";
exports.VEGA_BLUE_PURPLE = VEGA_BLUE_PURPLE;
var VEGA_GREEN_BLUE = "vega_greenblue";
exports.VEGA_GREEN_BLUE = VEGA_GREEN_BLUE;
var VEGA_ORANGE_RED = "vega_orangered";
exports.VEGA_ORANGE_RED = VEGA_ORANGE_RED;
var VEGA_PURPLE_BLUE = "vega_purpleblue";
exports.VEGA_PURPLE_BLUE = VEGA_PURPLE_BLUE;
var VEGA_PURPLE_BLUE_GREEN = "vega_purplebluegreen";
exports.VEGA_PURPLE_BLUE_GREEN = VEGA_PURPLE_BLUE_GREEN;
var VEGA_PURPLE_RED = "vega_purplered";
exports.VEGA_PURPLE_RED = VEGA_PURPLE_RED;
var VEGA_RED_PURPLE = "vega_redpurple";
exports.VEGA_RED_PURPLE = VEGA_RED_PURPLE;
var VEGA_YELLOW_GREEN = "vega_yellowgreen";
exports.VEGA_YELLOW_GREEN = VEGA_YELLOW_GREEN;
var VEGA_YELLOW_ORANGE_BROWN = "vega_yelloworangebrown";
exports.VEGA_YELLOW_ORANGE_BROWN = VEGA_YELLOW_ORANGE_BROWN;
var VEGA_YELLOW_ORANGE_RED = "vega_yelloworangered";
exports.VEGA_YELLOW_ORANGE_RED = VEGA_YELLOW_ORANGE_RED;
var VEGA_BLUE_ORANGE = "vega_blueorange";
exports.VEGA_BLUE_ORANGE = VEGA_BLUE_ORANGE;
var VEGA_BROWN_BLUE_GREEN = "vega_brownbluegreen";
exports.VEGA_BROWN_BLUE_GREEN = VEGA_BROWN_BLUE_GREEN;
var VEGA_PURPLE_GREEN = "vega_purplegreen";
exports.VEGA_PURPLE_GREEN = VEGA_PURPLE_GREEN;
var VEGA_PURPLE_ORANGE = "vega_purpleorange";
exports.VEGA_PURPLE_ORANGE = VEGA_PURPLE_ORANGE;
var VEGA_RED_BLUE = "vega_redblue";
exports.VEGA_RED_BLUE = VEGA_RED_BLUE;
var VEGA_RED_GREY = "vega_redgrey";
exports.VEGA_RED_GREY = VEGA_RED_GREY;
var VEGA_YELLOW_GREEN_BLUE = "vega_yellowgreenblue";
exports.VEGA_YELLOW_GREEN_BLUE = VEGA_YELLOW_GREEN_BLUE;
var VEGA_RED_YELLOW_BLUE = "vega_redyellowblue";
exports.VEGA_RED_YELLOW_BLUE = VEGA_RED_YELLOW_BLUE;
var VEGA_RED_YELLOW_GREEN = "vega_redyellowgreen";
exports.VEGA_RED_YELLOW_GREEN = VEGA_RED_YELLOW_GREEN;
var VEGA_PINK_YELLOW_GREEN = "vega_pinkyellowgreen";
exports.VEGA_PINK_YELLOW_GREEN = VEGA_PINK_YELLOW_GREEN;
var VEGA_SPECTRAL = "vega_spectral";
exports.VEGA_SPECTRAL = VEGA_SPECTRAL;
var VEGA_VIRIDIS = "vega_viridis";
exports.VEGA_VIRIDIS = VEGA_VIRIDIS;
var VEGA_MAGMA = "vega_magma";
exports.VEGA_MAGMA = VEGA_MAGMA;
var VEGA_INFERNO = "vega_inferno";
exports.VEGA_INFERNO = VEGA_INFERNO;
var VEGA_PLASMA = "vega_plasma";
exports.VEGA_PLASMA = VEGA_PLASMA;
var VEGA_CIVIDIS = "vega_cividis";
exports.VEGA_CIVIDIS = VEGA_CIVIDIS;
var VEGA_RAINBOW = "vega_rainbow";
exports.VEGA_RAINBOW = VEGA_RAINBOW;
var VEGA_SINEBOW = "vega_sinebow";
exports.VEGA_SINEBOW = VEGA_SINEBOW;
var VEGA_TURBO = "vega_turbo";
exports.VEGA_TURBO = VEGA_TURBO;
var VEGA_BROWNS = "vega_browns";
exports.VEGA_BROWNS = VEGA_BROWNS;
var VEGA_TEAL_BLUES = "vega_tealblues";
exports.VEGA_TEAL_BLUES = VEGA_TEAL_BLUES;
var VEGA_TEALS = "vega_teals";
exports.VEGA_TEALS = VEGA_TEALS;
var VEGA_WARM_GREYS = "vega_warmgreys";
exports.VEGA_WARM_GREYS = VEGA_WARM_GREYS;
var VEGA_GOLD_GREEN = "vega_goldgreen";
exports.VEGA_GOLD_GREEN = VEGA_GOLD_GREEN;
var VEGA_GOLD_ORANGE = "vega_goldorange";
exports.VEGA_GOLD_ORANGE = VEGA_GOLD_ORANGE;
var VEGA_GOLD_RED = "vega_goldred";
exports.VEGA_GOLD_RED = VEGA_GOLD_RED;
var VEGA_LIGHT_GREY_RED = "vega_lightgreyred";
exports.VEGA_LIGHT_GREY_RED = VEGA_LIGHT_GREY_RED;
var VEGA_LIGHT_GREY_TEAL = "vega_lightgreyteal";
exports.VEGA_LIGHT_GREY_TEAL = VEGA_LIGHT_GREY_TEAL;
var VEGA_LIGHT_MULTI = "vega_lightmulti";
exports.VEGA_LIGHT_MULTI = VEGA_LIGHT_MULTI;
var VEGA_LIGHT_ORANGE = "vega_lightorange";
exports.VEGA_LIGHT_ORANGE = VEGA_LIGHT_ORANGE;
var VEGA_LIGHT_TEAL_BLUE = "vega_lighttealblue";
exports.VEGA_LIGHT_TEAL_BLUE = VEGA_LIGHT_TEAL_BLUE;
var VEGA_DARK_BLUE = "vega_darkblue";
exports.VEGA_DARK_BLUE = VEGA_DARK_BLUE;
var VEGA_DARK_GOLD = "vega_darkgold";
exports.VEGA_DARK_GOLD = VEGA_DARK_GOLD;
var VEGA_DARK_GREEN = "vega_darkgreen";
exports.VEGA_DARK_GREEN = VEGA_DARK_GREEN;
var VEGA_DARK_MULTI = "vega_darkmulti";
exports.VEGA_DARK_MULTI = VEGA_DARK_MULTI;
var VEGA_DARK_RED = "vega_darkred";
exports.VEGA_DARK_RED = VEGA_DARK_RED;
var _VEGA_PALETTE_NAMES = {};
_VEGA_PALETTE_NAMES['VEGA_CATEGORY_10'] = 'vega_category10';
_VEGA_PALETTE_NAMES['VEGA_CATEGORY_20'] = 'vega_category20';
_VEGA_PALETTE_NAMES['VEGA_CATEGORY_20_B'] = 'vega_category20b';
_VEGA_PALETTE_NAMES['VEGA_CATEGORY_20_C'] = 'vega_category20c';
_VEGA_PALETTE_NAMES['VEGA_TABLEAU_10'] = 'vega_tableau10';
_VEGA_PALETTE_NAMES['VEGA_TABLEAU_20'] = 'vega_tableau20';
_VEGA_PALETTE_NAMES['VEGA_ACCENT'] = 'vega_accent';
_VEGA_PALETTE_NAMES['VEGA_DARK_2'] = 'vega_dark2';
_VEGA_PALETTE_NAMES['VEGA_PAIRED'] = 'vega_paired';
_VEGA_PALETTE_NAMES['VEGA_PASTEL_1'] = 'vega_pastel1';
_VEGA_PALETTE_NAMES['VEGA_PASTEL_2'] = 'vega_pastel2';
_VEGA_PALETTE_NAMES['VEGA_SET_1'] = 'vega_set1';
_VEGA_PALETTE_NAMES['VEGA_SET_2'] = 'vega_set2';
_VEGA_PALETTE_NAMES['VEGA_SET_3'] = 'vega_set3';
_VEGA_PALETTE_NAMES['VEGA_BLUES'] = 'vega_blues';
_VEGA_PALETTE_NAMES['VEGA_GREENS'] = 'vega_greens';
_VEGA_PALETTE_NAMES['VEGA_GREYS'] = 'vega_greys';
_VEGA_PALETTE_NAMES['VEGA_ORANGES'] = 'vega_oranges';
_VEGA_PALETTE_NAMES['VEGA_PURPLES'] = 'vega_purples';
_VEGA_PALETTE_NAMES['VEGA_REDS'] = 'vega_reds';
_VEGA_PALETTE_NAMES['VEGA_BLUE_GREEN'] = 'vega_bluegreen';
_VEGA_PALETTE_NAMES['VEGA_BLUE_PURPLE'] = 'vega_bluepurple';
_VEGA_PALETTE_NAMES['VEGA_GREEN_BLUE'] = 'vega_greenblue';
_VEGA_PALETTE_NAMES['VEGA_ORANGE_RED'] = 'vega_orangered';
_VEGA_PALETTE_NAMES['VEGA_PURPLE_BLUE'] = 'vega_purpleblue';
_VEGA_PALETTE_NAMES['VEGA_PURPLE_BLUE_GREEN'] = 'vega_purplebluegreen';
_VEGA_PALETTE_NAMES['VEGA_PURPLE_RED'] = 'vega_purplered';
_VEGA_PALETTE_NAMES['VEGA_RED_PURPLE'] = 'vega_redpurple';
_VEGA_PALETTE_NAMES['VEGA_YELLOW_GREEN'] = 'vega_yellowgreen';
_VEGA_PALETTE_NAMES['VEGA_YELLOW_ORANGE_BROWN'] = 'vega_yelloworangebrown';
_VEGA_PALETTE_NAMES['VEGA_YELLOW_ORANGE_RED'] = 'vega_yelloworangered';
_VEGA_PALETTE_NAMES['VEGA_BLUE_ORANGE'] = 'vega_blueorange';
_VEGA_PALETTE_NAMES['VEGA_BROWN_BLUE_GREEN'] = 'vega_brownbluegreen';
_VEGA_PALETTE_NAMES['VEGA_PURPLE_GREEN'] = 'vega_purplegreen';
_VEGA_PALETTE_NAMES['VEGA_PURPLE_ORANGE'] = 'vega_purpleorange';
_VEGA_PALETTE_NAMES['VEGA_RED_BLUE'] = 'vega_redblue';
_VEGA_PALETTE_NAMES['VEGA_RED_GREY'] = 'vega_redgrey';
_VEGA_PALETTE_NAMES['VEGA_YELLOW_GREEN_BLUE'] = 'vega_yellowgreenblue';
_VEGA_PALETTE_NAMES['VEGA_RED_YELLOW_BLUE'] = 'vega_redyellowblue';
_VEGA_PALETTE_NAMES['VEGA_RED_YELLOW_GREEN'] = 'vega_redyellowgreen';
_VEGA_PALETTE_NAMES['VEGA_PINK_YELLOW_GREEN'] = 'vega_pinkyellowgreen';
_VEGA_PALETTE_NAMES['VEGA_SPECTRAL'] = 'vega_spectral';
_VEGA_PALETTE_NAMES['VEGA_VIRIDIS'] = 'vega_viridis';
_VEGA_PALETTE_NAMES['VEGA_MAGMA'] = 'vega_magma';
_VEGA_PALETTE_NAMES['VEGA_INFERNO'] = 'vega_inferno';
_VEGA_PALETTE_NAMES['VEGA_PLASMA'] = 'vega_plasma';
_VEGA_PALETTE_NAMES['VEGA_CIVIDIS'] = 'vega_cividis';
_VEGA_PALETTE_NAMES['VEGA_RAINBOW'] = 'vega_rainbow';
_VEGA_PALETTE_NAMES['VEGA_SINEBOW'] = 'vega_sinebow';
_VEGA_PALETTE_NAMES['VEGA_TURBO'] = 'vega_turbo';
_VEGA_PALETTE_NAMES['VEGA_BROWNS'] = 'vega_browns';
_VEGA_PALETTE_NAMES['VEGA_TEAL_BLUES'] = 'vega_tealblues';
_VEGA_PALETTE_NAMES['VEGA_TEALS'] = 'vega_teals';
_VEGA_PALETTE_NAMES['VEGA_WARM_GREYS'] = 'vega_warmgreys';
_VEGA_PALETTE_NAMES['VEGA_GOLD_GREEN'] = 'vega_goldgreen';
_VEGA_PALETTE_NAMES['VEGA_GOLD_ORANGE'] = 'vega_goldorange';
_VEGA_PALETTE_NAMES['VEGA_GOLD_RED'] = 'vega_goldred';
_VEGA_PALETTE_NAMES['VEGA_LIGHT_GREY_RED'] = 'vega_lightgreyred';
_VEGA_PALETTE_NAMES['VEGA_LIGHT_GREY_TEAL'] = 'vega_lightgreyteal';
_VEGA_PALETTE_NAMES['VEGA_LIGHT_MULTI'] = 'vega_lightmulti';
_VEGA_PALETTE_NAMES['VEGA_LIGHT_ORANGE'] = 'vega_lightorange';
_VEGA_PALETTE_NAMES['VEGA_LIGHT_TEAL_BLUE'] = 'vega_lighttealblue';
_VEGA_PALETTE_NAMES['VEGA_DARK_BLUE'] = 'vega_darkblue';
_VEGA_PALETTE_NAMES['VEGA_DARK_GOLD'] = 'vega_darkgold';
_VEGA_PALETTE_NAMES['VEGA_DARK_GREEN'] = 'vega_darkgreen';
_VEGA_PALETTE_NAMES['VEGA_DARK_MULTI'] = 'vega_darkmulti';
_VEGA_PALETTE_NAMES['VEGA_DARK_RED'] = 'vega_darkred';
var VEGA_PALETTE_NAMES = _VEGA_PALETTE_NAMES;
exports.VEGA_PALETTE_NAMES = VEGA_PALETTE_NAMES;
var _VEGA_PALETTES = {};
_VEGA_PALETTES['category10'] = VEGA_PALETTE_DATA[VEGA_CATEGORY_10];
_VEGA_PALETTES['category20'] = VEGA_PALETTE_DATA[VEGA_CATEGORY_20];
_VEGA_PALETTES['category20b'] = VEGA_PALETTE_DATA[VEGA_CATEGORY_20_B];
_VEGA_PALETTES['category20c'] = VEGA_PALETTE_DATA[VEGA_CATEGORY_20_C];
_VEGA_PALETTES['tableau10'] = VEGA_PALETTE_DATA[VEGA_TABLEAU_10];
_VEGA_PALETTES['tableau20'] = VEGA_PALETTE_DATA[VEGA_TABLEAU_20];
_VEGA_PALETTES['accent'] = VEGA_PALETTE_DATA[VEGA_ACCENT];
_VEGA_PALETTES['dark2'] = VEGA_PALETTE_DATA[VEGA_DARK_2];
_VEGA_PALETTES['paired'] = VEGA_PALETTE_DATA[VEGA_PAIRED];
_VEGA_PALETTES['pastel1'] = VEGA_PALETTE_DATA[VEGA_PASTEL_1];
_VEGA_PALETTES['pastel2'] = VEGA_PALETTE_DATA[VEGA_PASTEL_2];
_VEGA_PALETTES['set1'] = VEGA_PALETTE_DATA[VEGA_SET_1];
_VEGA_PALETTES['set2'] = VEGA_PALETTE_DATA[VEGA_SET_2];
_VEGA_PALETTES['set3'] = VEGA_PALETTE_DATA[VEGA_SET_3];
_VEGA_PALETTES['blues'] = VEGA_PALETTE_DATA[VEGA_BLUES];
_VEGA_PALETTES['greens'] = VEGA_PALETTE_DATA[VEGA_GREENS];
_VEGA_PALETTES['greys'] = VEGA_PALETTE_DATA[VEGA_GREYS];
_VEGA_PALETTES['oranges'] = VEGA_PALETTE_DATA[VEGA_ORANGES];
_VEGA_PALETTES['purples'] = VEGA_PALETTE_DATA[VEGA_PURPLES];
_VEGA_PALETTES['reds'] = VEGA_PALETTE_DATA[VEGA_REDS];
_VEGA_PALETTES['bluegreen'] = VEGA_PALETTE_DATA[VEGA_BLUE_GREEN];
_VEGA_PALETTES['bluepurple'] = VEGA_PALETTE_DATA[VEGA_BLUE_PURPLE];
_VEGA_PALETTES['greenblue'] = VEGA_PALETTE_DATA[VEGA_GREEN_BLUE];
_VEGA_PALETTES['orangered'] = VEGA_PALETTE_DATA[VEGA_ORANGE_RED];
_VEGA_PALETTES['purpleblue'] = VEGA_PALETTE_DATA[VEGA_PURPLE_BLUE];
_VEGA_PALETTES['purplebluegreen'] = VEGA_PALETTE_DATA[VEGA_PURPLE_BLUE_GREEN];
_VEGA_PALETTES['purplered'] = VEGA_PALETTE_DATA[VEGA_PURPLE_RED];
_VEGA_PALETTES['redpurple'] = VEGA_PALETTE_DATA[VEGA_RED_PURPLE];
_VEGA_PALETTES['yellowgreen'] = VEGA_PALETTE_DATA[VEGA_YELLOW_GREEN];
_VEGA_PALETTES['yelloworangebrown'] = VEGA_PALETTE_DATA[VEGA_YELLOW_ORANGE_BROWN];
_VEGA_PALETTES['yelloworangered'] = VEGA_PALETTE_DATA[VEGA_YELLOW_ORANGE_RED];
_VEGA_PALETTES['blueorange'] = VEGA_PALETTE_DATA[VEGA_BLUE_ORANGE];
_VEGA_PALETTES['brownbluegreen'] = VEGA_PALETTE_DATA[VEGA_BROWN_BLUE_GREEN];
_VEGA_PALETTES['purplegreen'] = VEGA_PALETTE_DATA[VEGA_PURPLE_GREEN];
_VEGA_PALETTES['purpleorange'] = VEGA_PALETTE_DATA[VEGA_PURPLE_ORANGE];
_VEGA_PALETTES['redblue'] = VEGA_PALETTE_DATA[VEGA_RED_BLUE];
_VEGA_PALETTES['redgrey'] = VEGA_PALETTE_DATA[VEGA_RED_GREY];
_VEGA_PALETTES['yellowgreenblue'] = VEGA_PALETTE_DATA[VEGA_YELLOW_GREEN_BLUE];
_VEGA_PALETTES['redyellowblue'] = VEGA_PALETTE_DATA[VEGA_RED_YELLOW_BLUE];
_VEGA_PALETTES['redyellowgreen'] = VEGA_PALETTE_DATA[VEGA_RED_YELLOW_GREEN];
_VEGA_PALETTES['pinkyellowgreen'] = VEGA_PALETTE_DATA[VEGA_PINK_YELLOW_GREEN];
_VEGA_PALETTES['spectral'] = VEGA_PALETTE_DATA[VEGA_SPECTRAL];
_VEGA_PALETTES['viridis'] = VEGA_PALETTE_DATA[VEGA_VIRIDIS];
_VEGA_PALETTES['magma'] = VEGA_PALETTE_DATA[VEGA_MAGMA];
_VEGA_PALETTES['inferno'] = VEGA_PALETTE_DATA[VEGA_INFERNO];
_VEGA_PALETTES['plasma'] = VEGA_PALETTE_DATA[VEGA_PLASMA];
_VEGA_PALETTES['cividis'] = VEGA_PALETTE_DATA[VEGA_CIVIDIS];
_VEGA_PALETTES['rainbow'] = VEGA_PALETTE_DATA[VEGA_RAINBOW];
_VEGA_PALETTES['sinebow'] = VEGA_PALETTE_DATA[VEGA_SINEBOW];
_VEGA_PALETTES['turbo'] = VEGA_PALETTE_DATA[VEGA_TURBO];
_VEGA_PALETTES['browns'] = VEGA_PALETTE_DATA[VEGA_BROWNS];
_VEGA_PALETTES['tealblues'] = VEGA_PALETTE_DATA[VEGA_TEAL_BLUES];
_VEGA_PALETTES['teals'] = VEGA_PALETTE_DATA[VEGA_TEALS];
_VEGA_PALETTES['warmgreys'] = VEGA_PALETTE_DATA[VEGA_WARM_GREYS];
_VEGA_PALETTES['goldgreen'] = VEGA_PALETTE_DATA[VEGA_GOLD_GREEN];
_VEGA_PALETTES['goldorange'] = VEGA_PALETTE_DATA[VEGA_GOLD_ORANGE];
_VEGA_PALETTES['goldred'] = VEGA_PALETTE_DATA[VEGA_GOLD_RED];
_VEGA_PALETTES['lightgreyred'] = VEGA_PALETTE_DATA[VEGA_LIGHT_GREY_RED];
_VEGA_PALETTES['lightgreyteal'] = VEGA_PALETTE_DATA[VEGA_LIGHT_GREY_TEAL];
_VEGA_PALETTES['lightmulti'] = VEGA_PALETTE_DATA[VEGA_LIGHT_MULTI];
_VEGA_PALETTES['lightorange'] = VEGA_PALETTE_DATA[VEGA_LIGHT_ORANGE];
_VEGA_PALETTES['lighttealblue'] = VEGA_PALETTE_DATA[VEGA_LIGHT_TEAL_BLUE];
_VEGA_PALETTES['darkblue'] = VEGA_PALETTE_DATA[VEGA_DARK_BLUE];
_VEGA_PALETTES['darkgold'] = VEGA_PALETTE_DATA[VEGA_DARK_GOLD];
_VEGA_PALETTES['darkgreen'] = VEGA_PALETTE_DATA[VEGA_DARK_GREEN];
_VEGA_PALETTES['darkmulti'] = VEGA_PALETTE_DATA[VEGA_DARK_MULTI];
_VEGA_PALETTES['darkred'] = VEGA_PALETTE_DATA[VEGA_DARK_RED];
var VEGA_PALETTES = _VEGA_PALETTES;
exports.VEGA_PALETTES = VEGA_PALETTES;
var _VEGA_DOCS_PALETTES = {};
_VEGA_DOCS_PALETTES['category10'] = VEGA_DOCS_PALETTE_DATA[VEGA_CATEGORY_10];
_VEGA_DOCS_PALETTES['category20'] = VEGA_DOCS_PALETTE_DATA[VEGA_CATEGORY_20];
_VEGA_DOCS_PALETTES['category20b'] = VEGA_DOCS_PALETTE_DATA[VEGA_CATEGORY_20_B];
_VEGA_DOCS_PALETTES['category20c'] = VEGA_DOCS_PALETTE_DATA[VEGA_CATEGORY_20_C];
_VEGA_DOCS_PALETTES['tableau10'] = VEGA_DOCS_PALETTE_DATA[VEGA_TABLEAU_10];
_VEGA_DOCS_PALETTES['tableau20'] = VEGA_DOCS_PALETTE_DATA[VEGA_TABLEAU_20];
_VEGA_DOCS_PALETTES['accent'] = VEGA_DOCS_PALETTE_DATA[VEGA_ACCENT];
_VEGA_DOCS_PALETTES['dark2'] = VEGA_DOCS_PALETTE_DATA[VEGA_DARK_2];
_VEGA_DOCS_PALETTES['paired'] = VEGA_DOCS_PALETTE_DATA[VEGA_PAIRED];
_VEGA_DOCS_PALETTES['pastel1'] = VEGA_DOCS_PALETTE_DATA[VEGA_PASTEL_1];
_VEGA_DOCS_PALETTES['pastel2'] = VEGA_DOCS_PALETTE_DATA[VEGA_PASTEL_2];
_VEGA_DOCS_PALETTES['set1'] = VEGA_DOCS_PALETTE_DATA[VEGA_SET_1];
_VEGA_DOCS_PALETTES['set2'] = VEGA_DOCS_PALETTE_DATA[VEGA_SET_2];
_VEGA_DOCS_PALETTES['set3'] = VEGA_DOCS_PALETTE_DATA[VEGA_SET_3];
_VEGA_DOCS_PALETTES['blues'] = VEGA_DOCS_PALETTE_DATA[VEGA_BLUES];
_VEGA_DOCS_PALETTES['greens'] = VEGA_DOCS_PALETTE_DATA[VEGA_GREENS];
_VEGA_DOCS_PALETTES['greys'] = VEGA_DOCS_PALETTE_DATA[VEGA_GREYS];
_VEGA_DOCS_PALETTES['oranges'] = VEGA_DOCS_PALETTE_DATA[VEGA_ORANGES];
_VEGA_DOCS_PALETTES['purples'] = VEGA_DOCS_PALETTE_DATA[VEGA_PURPLES];
_VEGA_DOCS_PALETTES['reds'] = VEGA_DOCS_PALETTE_DATA[VEGA_REDS];
_VEGA_DOCS_PALETTES['bluegreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_BLUE_GREEN];
_VEGA_DOCS_PALETTES['bluepurple'] = VEGA_DOCS_PALETTE_DATA[VEGA_BLUE_PURPLE];
_VEGA_DOCS_PALETTES['greenblue'] = VEGA_DOCS_PALETTE_DATA[VEGA_GREEN_BLUE];
_VEGA_DOCS_PALETTES['orangered'] = VEGA_DOCS_PALETTE_DATA[VEGA_ORANGE_RED];
_VEGA_DOCS_PALETTES['purpleblue'] = VEGA_DOCS_PALETTE_DATA[VEGA_PURPLE_BLUE];
_VEGA_DOCS_PALETTES['purplebluegreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_PURPLE_BLUE_GREEN];
_VEGA_DOCS_PALETTES['purplered'] = VEGA_DOCS_PALETTE_DATA[VEGA_PURPLE_RED];
_VEGA_DOCS_PALETTES['redpurple'] = VEGA_DOCS_PALETTE_DATA[VEGA_RED_PURPLE];
_VEGA_DOCS_PALETTES['yellowgreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_YELLOW_GREEN];
_VEGA_DOCS_PALETTES['yelloworangebrown'] = VEGA_DOCS_PALETTE_DATA[VEGA_YELLOW_ORANGE_BROWN];
_VEGA_DOCS_PALETTES['yelloworangered'] = VEGA_DOCS_PALETTE_DATA[VEGA_YELLOW_ORANGE_RED];
_VEGA_DOCS_PALETTES['blueorange'] = VEGA_DOCS_PALETTE_DATA[VEGA_BLUE_ORANGE];
_VEGA_DOCS_PALETTES['brownbluegreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_BROWN_BLUE_GREEN];
_VEGA_DOCS_PALETTES['purplegreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_PURPLE_GREEN];
_VEGA_DOCS_PALETTES['purpleorange'] = VEGA_DOCS_PALETTE_DATA[VEGA_PURPLE_ORANGE];
_VEGA_DOCS_PALETTES['redblue'] = VEGA_DOCS_PALETTE_DATA[VEGA_RED_BLUE];
_VEGA_DOCS_PALETTES['redgrey'] = VEGA_DOCS_PALETTE_DATA[VEGA_RED_GREY];
_VEGA_DOCS_PALETTES['yellowgreenblue'] = VEGA_DOCS_PALETTE_DATA[VEGA_YELLOW_GREEN_BLUE];
_VEGA_DOCS_PALETTES['redyellowblue'] = VEGA_DOCS_PALETTE_DATA[VEGA_RED_YELLOW_BLUE];
_VEGA_DOCS_PALETTES['redyellowgreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_RED_YELLOW_GREEN];
_VEGA_DOCS_PALETTES['pinkyellowgreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_PINK_YELLOW_GREEN];
_VEGA_DOCS_PALETTES['spectral'] = VEGA_DOCS_PALETTE_DATA[VEGA_SPECTRAL];
_VEGA_DOCS_PALETTES['viridis'] = VEGA_DOCS_PALETTE_DATA[VEGA_VIRIDIS];
_VEGA_DOCS_PALETTES['magma'] = VEGA_DOCS_PALETTE_DATA[VEGA_MAGMA];
_VEGA_DOCS_PALETTES['inferno'] = VEGA_DOCS_PALETTE_DATA[VEGA_INFERNO];
_VEGA_DOCS_PALETTES['plasma'] = VEGA_DOCS_PALETTE_DATA[VEGA_PLASMA];
_VEGA_DOCS_PALETTES['cividis'] = VEGA_DOCS_PALETTE_DATA[VEGA_CIVIDIS];
_VEGA_DOCS_PALETTES['rainbow'] = VEGA_DOCS_PALETTE_DATA[VEGA_RAINBOW];
_VEGA_DOCS_PALETTES['sinebow'] = VEGA_DOCS_PALETTE_DATA[VEGA_SINEBOW];
_VEGA_DOCS_PALETTES['turbo'] = VEGA_DOCS_PALETTE_DATA[VEGA_TURBO];
_VEGA_DOCS_PALETTES['browns'] = VEGA_DOCS_PALETTE_DATA[VEGA_BROWNS];
_VEGA_DOCS_PALETTES['tealblues'] = VEGA_DOCS_PALETTE_DATA[VEGA_TEAL_BLUES];
_VEGA_DOCS_PALETTES['teals'] = VEGA_DOCS_PALETTE_DATA[VEGA_TEALS];
_VEGA_DOCS_PALETTES['warmgreys'] = VEGA_DOCS_PALETTE_DATA[VEGA_WARM_GREYS];
_VEGA_DOCS_PALETTES['goldgreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_GOLD_GREEN];
_VEGA_DOCS_PALETTES['goldorange'] = VEGA_DOCS_PALETTE_DATA[VEGA_GOLD_ORANGE];
_VEGA_DOCS_PALETTES['goldred'] = VEGA_DOCS_PALETTE_DATA[VEGA_GOLD_RED];
_VEGA_DOCS_PALETTES['lightgreyred'] = VEGA_DOCS_PALETTE_DATA[VEGA_LIGHT_GREY_RED];
_VEGA_DOCS_PALETTES['lightgreyteal'] = VEGA_DOCS_PALETTE_DATA[VEGA_LIGHT_GREY_TEAL];
_VEGA_DOCS_PALETTES['lightmulti'] = VEGA_DOCS_PALETTE_DATA[VEGA_LIGHT_MULTI];
_VEGA_DOCS_PALETTES['lightorange'] = VEGA_DOCS_PALETTE_DATA[VEGA_LIGHT_ORANGE];
_VEGA_DOCS_PALETTES['lighttealblue'] = VEGA_DOCS_PALETTE_DATA[VEGA_LIGHT_TEAL_BLUE];
_VEGA_DOCS_PALETTES['darkblue'] = VEGA_DOCS_PALETTE_DATA[VEGA_DARK_BLUE];
_VEGA_DOCS_PALETTES['darkgold'] = VEGA_DOCS_PALETTE_DATA[VEGA_DARK_GOLD];
_VEGA_DOCS_PALETTES['darkgreen'] = VEGA_DOCS_PALETTE_DATA[VEGA_DARK_GREEN];
_VEGA_DOCS_PALETTES['darkmulti'] = VEGA_DOCS_PALETTE_DATA[VEGA_DARK_MULTI];
_VEGA_DOCS_PALETTES['darkred'] = VEGA_DOCS_PALETTE_DATA[VEGA_DARK_RED];
var VEGA_DOCS_PALETTES = _VEGA_DOCS_PALETTES;
exports.VEGA_DOCS_PALETTES = VEGA_DOCS_PALETTES;

/***/ })
/******/ ]);
});