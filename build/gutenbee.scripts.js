window["wp"] = window["wp"] || {}; window["wp"]["gutenbee.scripts"] =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1303);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var core = __webpack_require__(22);
var hide = __webpack_require__(41);
var redefine = __webpack_require__(38);
var ctx = __webpack_require__(47);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return maybeLoadYouTubeApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return maybeLoadVimeoApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getVideoProviderInfoByUrl; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Checks whether the YouTube API is loaded.
 *
 * @returns {boolean}
 */
var youTubeApiLoaded = function youTubeApiLoaded() {
  var _window$YT;

  return typeof ((_window$YT = window.YT) === null || _window$YT === void 0 ? void 0 : _window$YT.Player) !== 'undefined';
};
/**
 * Checks whether the Vimeo API is loaded.
 *
 * @returns {boolean}
 */


var vimeoApiLoaded = function vimeoApiLoaded() {
  var _window$Vimeo;

  return typeof ((_window$Vimeo = window.Vimeo) === null || _window$Vimeo === void 0 ? void 0 : _window$Vimeo.Player) !== 'undefined';
};
/**
 * Loads the YouTube API if it's not already loaded.
 *
 * @returns {Promise<boolean>}
 */


var maybeLoadYouTubeApi = function maybeLoadYouTubeApi() {
  if (!document.getElementById('gutenbee-youtube-api-script') && !youTubeApiLoaded()) {
    var tag = document.createElement('script');
    tag.id = 'gutenbee-youtube-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  var apiLoaded = function apiLoaded(resolve) {
    if (!youTubeApiLoaded()) {
      setTimeout(function () {
        return apiLoaded(resolve);
      }, 333);
      return;
    }

    resolve(true);
  };

  return new Promise(function (resolve, reject) {
    apiLoaded(resolve, reject);
  });
};
/**
 * Loads the Vimeo API if it's not already loaded.
 *
 * @returns {Promise<boolean>}
 */

var maybeLoadVimeoApi = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var tag, firstScriptTag, apiLoaded;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!document.getElementById('gutenbee-vimeo-api-script') && !vimeoApiLoaded()) {
              tag = document.createElement('script');
              tag.id = 'gutenbee-vimeo-api-script';
              tag.src = 'https://player.vimeo.com/api/player.js';
              firstScriptTag = document.getElementsByTagName('script')[0];
              firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            apiLoaded = function apiLoaded(resolve) {
              if (!vimeoApiLoaded()) {
                setTimeout(function () {
                  return apiLoaded(resolve);
                }, 333);
                return;
              }

              resolve(true);
            };

            return _context.abrupt("return", new Promise(function (resolve, reject) {
              apiLoaded(resolve, reject);
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function maybeLoadVimeoApi() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Matches a particular array of patterns on a string.
 *
 * @param {string} str The string to be matched.
 * @param {Array} patterns An array of URL patterns to match.
 * @returns {boolean} Whether a pattern was matched.
 */

var matchesPatterns = function matchesPatterns(str) {
  var patterns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return patterns.some(function (pattern) {
    return str.match(pattern);
  });
};
/**
 * YouTube URL patterns.
 *
 * @type {RegExp[]}
 */


var youTubeUrlPatterns = [/^https?:\/\/((m|www)\.)?youtube\.com\/.+/i, /^https?:\/\/youtu\.be\/.+/i];
/**
 * Vimeo URL patterns.
 *
 * @type {RegExp[]}
 */

var vimeoUrlPatterns = [/^https?:\/\/(www\.)?vimeo\.com\/.+/i];
/**
 * Self hosted video URL patterns.
 *
 * @type {RegExp[]}
 */

var selfHostedVideoUrlPatterns = [/([a-zA-Z0-9\s_\\.\-\(\):])+(.webm|.mkv|.avi|.mov|.mp4|.ogg)/i];
/**
 * Returns the Vimeo video ID based on the URL provided.
 *
 * @param {string} url The YouTube video URL.
 * @returns {string}
 */

var getYouTubeIdByUrl = function getYouTubeIdByUrl(url) {
  return url.split('v=').pop();
};
/**
 * Returns the Vimeo video ID based on the URL provided.
 *
 * @param {string} url Vimeo video URL.
 * @returns {string} The video ID.
 */


var getVimeoIdByUrl = function getVimeoIdByUrl(url) {
  var id = null;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://vimeo.com/api/oembed.json?url=' + url, false);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);

      if (response.video_id) {
        id = response.video_id;
      }
    }
  };

  request.send();
  return id;
};
/**
 * Takes in a URL and returns the matched provider's info (if any).
 *
 * @param {string} url The URL.
 * @returns {{provider: string, id: string}|null|{provider: string, id: null}}
 */


var getVideoProviderInfoByUrl = function getVideoProviderInfoByUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (!url) {
    return null;
  }

  if (matchesPatterns(url, youTubeUrlPatterns)) {
    return {
      id: getYouTubeIdByUrl(url),
      provider: 'youtube',
      url: url
    };
  }

  if (matchesPatterns(url, vimeoUrlPatterns)) {
    return {
      id: getVimeoIdByUrl(url),
      provider: 'vimeo',
      url: url
    };
  }

  if (matchesPatterns(url, selfHostedVideoUrlPatterns)) {
    return {
      id: url,
      provider: 'self',
      url: url
    };
  }

  return {
    id: null,
    provider: 'unsupported'
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(126)('wks');
var uid = __webpack_require__(69);
var Symbol = __webpack_require__(13).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(49);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(14)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(373);
var toPrimitive = __webpack_require__(60);
var dP = Object.defineProperty;

exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(54);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var hide = __webpack_require__(41);
var has = __webpack_require__(40);
var SRC = __webpack_require__(69)('src');
var $toString = __webpack_require__(1113);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(22).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var fails = __webpack_require__(14);
var defined = __webpack_require__(54);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(24);
var createDesc = __webpack_require__(68);
module.exports = __webpack_require__(23) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(100);
var defined = __webpack_require__(54);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(14);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(48);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(101);
var createDesc = __webpack_require__(68);
var toIObject = __webpack_require__(42);
var toPrimitive = __webpack_require__(60);
var has = __webpack_require__(40);
var IE8_DOM_DEFINE = __webpack_require__(373);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(9);
var core = __webpack_require__(22);
var fails = __webpack_require__(14);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(47);
var IObject = __webpack_require__(100);
var toObject = __webpack_require__(35);
var toLength = __webpack_require__(21);
var asc = __webpack_require__(389);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(23)) {
  var LIBRARY = __webpack_require__(70);
  var global = __webpack_require__(13);
  var fails = __webpack_require__(14);
  var $export = __webpack_require__(9);
  var $typed = __webpack_require__(137);
  var $buffer = __webpack_require__(190);
  var ctx = __webpack_require__(47);
  var anInstance = __webpack_require__(89);
  var propertyDesc = __webpack_require__(68);
  var hide = __webpack_require__(41);
  var redefineAll = __webpack_require__(90);
  var toInteger = __webpack_require__(49);
  var toLength = __webpack_require__(21);
  var toIndex = __webpack_require__(400);
  var toAbsoluteIndex = __webpack_require__(72);
  var toPrimitive = __webpack_require__(60);
  var has = __webpack_require__(40);
  var classof = __webpack_require__(102);
  var isObject = __webpack_require__(16);
  var toObject = __webpack_require__(35);
  var isArrayIter = __webpack_require__(182);
  var create = __webpack_require__(73);
  var getPrototypeOf = __webpack_require__(75);
  var gOPN = __webpack_require__(74).f;
  var getIterFn = __webpack_require__(184);
  var uid = __webpack_require__(69);
  var wks = __webpack_require__(20);
  var createArrayMethod = __webpack_require__(52);
  var createArrayIncludes = __webpack_require__(127);
  var speciesConstructor = __webpack_require__(103);
  var ArrayIterators = __webpack_require__(186);
  var Iterators = __webpack_require__(87);
  var $iterDetect = __webpack_require__(130);
  var setSpecies = __webpack_require__(88);
  var arrayFill = __webpack_require__(185);
  var arrayCopyWithin = __webpack_require__(391);
  var $DP = __webpack_require__(24);
  var $GOPD = __webpack_require__(50);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(69)('meta');
var isObject = __webpack_require__(16);
var has = __webpack_require__(40);
var setDesc = __webpack_require__(24).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(14)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(375);
var enumBugKeys = __webpack_require__(169);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(49);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(15);
var dPs = __webpack_require__(376);
var enumBugKeys = __webpack_require__(169);
var IE_PROTO = __webpack_require__(168)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(166)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(170).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(375);
var hiddenKeys = __webpack_require__(169).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(40);
var toObject = __webpack_require__(35);
var IE_PROTO = __webpack_require__(168)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(20)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(41)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(24).f;
var has = __webpack_require__(40);
var TAG = __webpack_require__(20)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var defined = __webpack_require__(54);
var fails = __webpack_require__(14);
var spaces = __webpack_require__(172);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(13);
var dP = __webpack_require__(24);
var DESCRIPTORS = __webpack_require__(23);
var SPECIES = __webpack_require__(20)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(38);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(53);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(53);
var TAG = __webpack_require__(20)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(48);
var SPECIES = __webpack_require__(20)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CountdownTimer = /*#__PURE__*/function () {
  /**
   * @constructor
   *
   * @param {HTMLElement} element HTML Element to attach the timer on
   * @param {string} endTime The end time
   */
  function CountdownTimer(element, endTime) {
    var _this = this;

    _classCallCheck(this, CountdownTimer);

    this.clock = element;
    this.updateClock(endTime);
    this.interval = setInterval(function () {
      _this.updateClock(endTime);
    }, 1000);
  }
  /**
   * Calculates remaining time from the present moment to `endDate`
   *
   * @static
   * @param {string} endTime The end time
   * @returns {{total: number, days: number, hours: number, minutes: number, seconds: number}} Total time remaining
   */


  _createClass(CountdownTimer, [{
    key: "updateClock",

    /**
     * Updates the HTML element
     *
     * @param {string} endTime The end time
     * @returns {undefined}
     * @returns {undefined}
     */
    value: function updateClock(endTime) {
      var daysSpan = this.clock.querySelector('.gutenbee-countdown-days');
      var hoursSpan = this.clock.querySelector('.gutenbee-countdown-hours');
      var minutesSpan = this.clock.querySelector('.gutenbee-countdown-minutes');
      var secondsSpan = this.clock.querySelector('.gutenbee-countdown-seconds');
      var t = CountdownTimer.getRemainingTime(endTime);

      if (daysSpan) {
        daysSpan.innerHTML = t.days;
      }

      if (hoursSpan) {
        hoursSpan.innerHTML = "0".concat(t.hours).slice(-2);
      }

      if (minutesSpan) {
        minutesSpan.innerHTML = "0".concat(t.minutes).slice(-2);
      }

      if (secondsSpan) {
        secondsSpan.innerHTML = "0".concat(t.seconds).slice(-2);
      }

      if (t.total <= 0) {
        this.stop();
      }
    }
    /**
     * Stops the countdown
     *
     * @returns {undefined}
     */

  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.interval);
    }
    /**
     * "Destroys" the instance
     *
     * @returns {undefined}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      this.clock = null;
      this.interval = null;
    }
  }]);

  return CountdownTimer;
}();

_defineProperty(CountdownTimer, "getRemainingTime", function (endTime) {
  var t = Date.parse(endTime) - Date.parse(new Date());
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var hours = Math.floor(t / (1000 * 60 * 60) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days <= 0 ? 0 : days,
    hours: hours <= 0 ? 0 : hours,
    minutes: minutes <= 0 ? 0 : minutes,
    seconds: seconds <= 0 ? 0 : seconds
  };
});

/* harmony default export */ __webpack_exports__["a"] = (CountdownTimer);

/***/ }),
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(22);
var global = __webpack_require__(13);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(70) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(42);
var toLength = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(72);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 128 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(53);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(20)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(15);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(102);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(393);
var redefine = __webpack_require__(38);
var hide = __webpack_require__(41);
var fails = __webpack_require__(14);
var defined = __webpack_require__(54);
var wks = __webpack_require__(20);
var regexpExec = __webpack_require__(187);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(47);
var call = __webpack_require__(388);
var isArrayIter = __webpack_require__(182);
var anObject = __webpack_require__(15);
var toLength = __webpack_require__(21);
var getIterFn = __webpack_require__(184);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(13);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(38);
var redefineAll = __webpack_require__(90);
var meta = __webpack_require__(61);
var forOf = __webpack_require__(134);
var anInstance = __webpack_require__(89);
var isObject = __webpack_require__(16);
var fails = __webpack_require__(14);
var $iterDetect = __webpack_require__(130);
var setToStringTag = __webpack_require__(85);
var inheritIfRequired = __webpack_require__(173);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var hide = __webpack_require__(41);
var uid = __webpack_require__(69);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var document = __webpack_require__(13).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(20);


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(126)('keys');
var uid = __webpack_require__(69);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 169 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(13).document;
module.exports = document && document.documentElement;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16);
var anObject = __webpack_require__(15);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(47)(Function.call, __webpack_require__(50).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var setPrototypeOf = __webpack_require__(171).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(49);
var defined = __webpack_require__(54);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 175 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 176 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(49);
var defined = __webpack_require__(54);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(70);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(38);
var hide = __webpack_require__(41);
var Iterators = __webpack_require__(87);
var $iterCreate = __webpack_require__(387);
var setToStringTag = __webpack_require__(85);
var getPrototypeOf = __webpack_require__(75);
var ITERATOR = __webpack_require__(20)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(180);
var defined = __webpack_require__(54);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(16);
var cof = __webpack_require__(53);
var MATCH = __webpack_require__(20)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(20)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(87);
var ITERATOR = __webpack_require__(20)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(24);
var createDesc = __webpack_require__(68);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(102);
var ITERATOR = __webpack_require__(20)('iterator');
var Iterators = __webpack_require__(87);
module.exports = __webpack_require__(22).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(35);
var toAbsoluteIndex = __webpack_require__(72);
var toLength = __webpack_require__(21);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(76);
var step = __webpack_require__(392);
var Iterators = __webpack_require__(87);
var toIObject = __webpack_require__(42);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(178)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(131);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(177)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(47);
var invoke = __webpack_require__(381);
var html = __webpack_require__(170);
var cel = __webpack_require__(166);
var global = __webpack_require__(13);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(53)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(23);
var LIBRARY = __webpack_require__(70);
var $typed = __webpack_require__(137);
var hide = __webpack_require__(41);
var redefineAll = __webpack_require__(90);
var fails = __webpack_require__(14);
var anInstance = __webpack_require__(89);
var toInteger = __webpack_require__(49);
var toLength = __webpack_require__(21);
var toIndex = __webpack_require__(400);
var gOPN = __webpack_require__(74).f;
var dP = __webpack_require__(24).f;
var arrayFill = __webpack_require__(185);
var setToStringTag = __webpack_require__(85);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 191 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(405)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(23) && !__webpack_require__(14)(function () {
  return Object.defineProperty(__webpack_require__(166)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var core = __webpack_require__(22);
var LIBRARY = __webpack_require__(70);
var wksExt = __webpack_require__(167);
var defineProperty = __webpack_require__(24).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(40);
var toIObject = __webpack_require__(42);
var arrayIndexOf = __webpack_require__(127)(false);
var IE_PROTO = __webpack_require__(168)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(24);
var anObject = __webpack_require__(15);
var getKeys = __webpack_require__(71);

module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(42);
var gOPN = __webpack_require__(74).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(23);
var getKeys = __webpack_require__(71);
var gOPS = __webpack_require__(128);
var pIE = __webpack_require__(101);
var toObject = __webpack_require__(35);
var IObject = __webpack_require__(100);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(14)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 379 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(48);
var isObject = __webpack_require__(16);
var invoke = __webpack_require__(381);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 381 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(13).parseInt;
var $trim = __webpack_require__(86).trim;
var ws = __webpack_require__(172);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(13).parseFloat;
var $trim = __webpack_require__(86).trim;

module.exports = 1 / $parseFloat(__webpack_require__(172) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(53);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(16);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 386 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(73);
var descriptor = __webpack_require__(68);
var setToStringTag = __webpack_require__(85);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(41)(IteratorPrototype, __webpack_require__(20)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(15);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(1203);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(48);
var toObject = __webpack_require__(35);
var IObject = __webpack_require__(100);
var toLength = __webpack_require__(21);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(35);
var toAbsoluteIndex = __webpack_require__(72);
var toLength = __webpack_require__(21);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 392 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(187);
__webpack_require__(9)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(23) && /./g.flags != 'g') __webpack_require__(24).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(131)
});


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(70);
var global = __webpack_require__(13);
var ctx = __webpack_require__(47);
var classof = __webpack_require__(102);
var $export = __webpack_require__(9);
var isObject = __webpack_require__(16);
var aFunction = __webpack_require__(48);
var anInstance = __webpack_require__(89);
var forOf = __webpack_require__(134);
var speciesConstructor = __webpack_require__(103);
var task = __webpack_require__(189).set;
var microtask = __webpack_require__(1223)();
var newPromiseCapabilityModule = __webpack_require__(396);
var perform = __webpack_require__(1224);
var userAgent = __webpack_require__(135);
var promiseResolve = __webpack_require__(397);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(20)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(90)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(85)($Promise, PROMISE);
__webpack_require__(88)(PROMISE);
Wrapper = __webpack_require__(22)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(130)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(48);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var isObject = __webpack_require__(16);
var newPromiseCapability = __webpack_require__(396);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(24).f;
var create = __webpack_require__(73);
var redefineAll = __webpack_require__(90);
var ctx = __webpack_require__(47);
var anInstance = __webpack_require__(89);
var forOf = __webpack_require__(134);
var $iterDefine = __webpack_require__(178);
var step = __webpack_require__(392);
var setSpecies = __webpack_require__(88);
var DESCRIPTORS = __webpack_require__(23);
var fastKey = __webpack_require__(61).fastKey;
var validate = __webpack_require__(77);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(90);
var getWeak = __webpack_require__(61).getWeak;
var anObject = __webpack_require__(15);
var isObject = __webpack_require__(16);
var anInstance = __webpack_require__(89);
var forOf = __webpack_require__(134);
var createArrayMethod = __webpack_require__(52);
var $has = __webpack_require__(40);
var validate = __webpack_require__(77);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(49);
var toLength = __webpack_require__(21);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(74);
var gOPS = __webpack_require__(128);
var anObject = __webpack_require__(15);
var Reflect = __webpack_require__(13).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(21);
var repeat = __webpack_require__(174);
var defined = __webpack_require__(54);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(23);
var getKeys = __webpack_require__(71);
var toIObject = __webpack_require__(42);
var isEnum = __webpack_require__(101).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),
/* 404 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 405 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(a,t){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined}(this,function(a,t,n){var e=function(a,t,n,e,i,r){for(var o=0,s=["webkit","moz","ms","o"],m=0;m<s.length&&!window.requestAnimationFrame;++m)window.requestAnimationFrame=window[s[m]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[m]+"CancelAnimationFrame"]||window[s[m]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,t){var n=(new Date).getTime(),e=Math.max(0,16-(n-o)),i=window.setTimeout(function(){a(n+e)},e);return o=n+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});var u=this;u.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null};for(var l in r)r.hasOwnProperty(l)&&(u.options[l]=r[l]);""===u.options.separator&&(u.options.useGrouping=!1),u.options.prefix||(u.options.prefix=""),u.options.suffix||(u.options.suffix=""),u.d="string"==typeof a?document.getElementById(a):a,u.startVal=Number(t),u.endVal=Number(n),u.countDown=u.startVal>u.endVal,u.frameVal=u.startVal,u.decimals=Math.max(0,e||0),u.dec=Math.pow(10,u.decimals),u.duration=1e3*Number(i)||2e3,u.formatNumber=function(a){a=a.toFixed(u.decimals),a+="";var t,n,e,i;if(t=a.split("."),n=t[0],e=t.length>1?u.options.decimal+t[1]:"",i=/(\d+)(\d{3})/,u.options.useGrouping)for(;i.test(n);)n=n.replace(i,"$1"+u.options.separator+"$2");return u.options.prefix+n+e+u.options.suffix},u.easeOutExpo=function(a,t,n,e){return n*(-Math.pow(2,-10*a/e)+1)*1024/1023+t},u.easingFn=u.options.easingFn?u.options.easingFn:u.easeOutExpo,u.formattingFn=u.options.formattingFn?u.options.formattingFn:u.formatNumber,u.version=function(){return"1.7.1"},u.printValue=function(a){var t=u.formattingFn(a);"INPUT"===u.d.tagName?this.d.value=t:"text"===u.d.tagName||"tspan"===u.d.tagName?this.d.textContent=t:this.d.innerHTML=t},u.count=function(a){u.startTime||(u.startTime=a),u.timestamp=a;var t=a-u.startTime;u.remaining=u.duration-t,u.options.useEasing?u.countDown?u.frameVal=u.startVal-u.easingFn(t,0,u.startVal-u.endVal,u.duration):u.frameVal=u.easingFn(t,u.startVal,u.endVal-u.startVal,u.duration):u.countDown?u.frameVal=u.startVal-(u.startVal-u.endVal)*(t/u.duration):u.frameVal=u.startVal+(u.endVal-u.startVal)*(t/u.duration),u.countDown?u.frameVal=u.frameVal<u.endVal?u.endVal:u.frameVal:u.frameVal=u.frameVal>u.endVal?u.endVal:u.frameVal,u.frameVal=Math.round(u.frameVal*u.dec)/u.dec,u.printValue(u.frameVal),t<u.duration?u.rAF=requestAnimationFrame(u.count):u.callback&&u.callback()},u.start=function(a){return u.callback=a,u.rAF=requestAnimationFrame(u.count),!1},u.pauseResume=function(){u.paused?(u.paused=!1,delete u.startTime,u.duration=u.remaining,u.startVal=u.frameVal,requestAnimationFrame(u.count)):(u.paused=!0,cancelAnimationFrame(u.rAF))},u.reset=function(){u.paused=!1,delete u.startTime,u.startVal=t,cancelAnimationFrame(u.rAF),u.printValue(u.startVal)},u.update=function(a){cancelAnimationFrame(u.rAF),u.paused=!1,delete u.startTime,u.startVal=u.frameVal,u.endVal=Number(a),u.countDown=u.startVal>u.endVal,u.rAF=requestAnimationFrame(u.count)},u.printValue(u.startVal)};return e});

/***/ }),
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */,
/* 730 */,
/* 731 */,
/* 732 */,
/* 733 */,
/* 734 */,
/* 735 */,
/* 736 */,
/* 737 */,
/* 738 */,
/* 739 */,
/* 740 */,
/* 741 */,
/* 742 */,
/* 743 */,
/* 744 */,
/* 745 */,
/* 746 */,
/* 747 */,
/* 748 */,
/* 749 */,
/* 750 */,
/* 751 */,
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */,
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */,
/* 764 */,
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */,
/* 769 */,
/* 770 */,
/* 771 */,
/* 772 */,
/* 773 */,
/* 774 */,
/* 775 */,
/* 776 */,
/* 777 */,
/* 778 */,
/* 779 */,
/* 780 */,
/* 781 */,
/* 782 */,
/* 783 */,
/* 784 */,
/* 785 */,
/* 786 */,
/* 787 */,
/* 788 */,
/* 789 */,
/* 790 */,
/* 791 */,
/* 792 */,
/* 793 */,
/* 794 */,
/* 795 */,
/* 796 */,
/* 797 */,
/* 798 */,
/* 799 */,
/* 800 */,
/* 801 */,
/* 802 */,
/* 803 */,
/* 804 */,
/* 805 */,
/* 806 */,
/* 807 */,
/* 808 */,
/* 809 */,
/* 810 */,
/* 811 */,
/* 812 */,
/* 813 */,
/* 814 */,
/* 815 */,
/* 816 */,
/* 817 */,
/* 818 */,
/* 819 */,
/* 820 */,
/* 821 */,
/* 822 */,
/* 823 */,
/* 824 */,
/* 825 */,
/* 826 */,
/* 827 */,
/* 828 */,
/* 829 */,
/* 830 */,
/* 831 */,
/* 832 */,
/* 833 */,
/* 834 */,
/* 835 */,
/* 836 */,
/* 837 */,
/* 838 */,
/* 839 */,
/* 840 */,
/* 841 */,
/* 842 */,
/* 843 */,
/* 844 */,
/* 845 */,
/* 846 */,
/* 847 */,
/* 848 */,
/* 849 */,
/* 850 */,
/* 851 */,
/* 852 */,
/* 853 */,
/* 854 */,
/* 855 */,
/* 856 */,
/* 857 */,
/* 858 */,
/* 859 */,
/* 860 */,
/* 861 */,
/* 862 */,
/* 863 */,
/* 864 */,
/* 865 */,
/* 866 */,
/* 867 */,
/* 868 */,
/* 869 */,
/* 870 */,
/* 871 */,
/* 872 */,
/* 873 */,
/* 874 */,
/* 875 */,
/* 876 */,
/* 877 */,
/* 878 */,
/* 879 */,
/* 880 */,
/* 881 */,
/* 882 */,
/* 883 */,
/* 884 */,
/* 885 */,
/* 886 */,
/* 887 */,
/* 888 */,
/* 889 */,
/* 890 */,
/* 891 */,
/* 892 */,
/* 893 */,
/* 894 */,
/* 895 */,
/* 896 */,
/* 897 */,
/* 898 */,
/* 899 */,
/* 900 */,
/* 901 */,
/* 902 */,
/* 903 */,
/* 904 */,
/* 905 */,
/* 906 */,
/* 907 */,
/* 908 */,
/* 909 */,
/* 910 */,
/* 911 */,
/* 912 */,
/* 913 */,
/* 914 */,
/* 915 */,
/* 916 */,
/* 917 */,
/* 918 */,
/* 919 */,
/* 920 */,
/* 921 */,
/* 922 */,
/* 923 */,
/* 924 */,
/* 925 */,
/* 926 */,
/* 927 */,
/* 928 */,
/* 929 */,
/* 930 */,
/* 931 */,
/* 932 */,
/* 933 */,
/* 934 */,
/* 935 */,
/* 936 */,
/* 937 */,
/* 938 */,
/* 939 */,
/* 940 */,
/* 941 */,
/* 942 */,
/* 943 */,
/* 944 */,
/* 945 */,
/* 946 */,
/* 947 */,
/* 948 */,
/* 949 */,
/* 950 */,
/* 951 */,
/* 952 */,
/* 953 */,
/* 954 */,
/* 955 */,
/* 956 */,
/* 957 */,
/* 958 */,
/* 959 */,
/* 960 */,
/* 961 */,
/* 962 */,
/* 963 */,
/* 964 */,
/* 965 */,
/* 966 */,
/* 967 */,
/* 968 */,
/* 969 */,
/* 970 */,
/* 971 */,
/* 972 */,
/* 973 */,
/* 974 */,
/* 975 */,
/* 976 */,
/* 977 */,
/* 978 */,
/* 979 */,
/* 980 */,
/* 981 */,
/* 982 */,
/* 983 */,
/* 984 */,
/* 985 */,
/* 986 */,
/* 987 */,
/* 988 */,
/* 989 */,
/* 990 */,
/* 991 */,
/* 992 */,
/* 993 */,
/* 994 */,
/* 995 */,
/* 996 */,
/* 997 */,
/* 998 */,
/* 999 */,
/* 1000 */,
/* 1001 */,
/* 1002 */,
/* 1003 */,
/* 1004 */,
/* 1005 */,
/* 1006 */,
/* 1007 */,
/* 1008 */,
/* 1009 */,
/* 1010 */,
/* 1011 */,
/* 1012 */,
/* 1013 */,
/* 1014 */,
/* 1015 */,
/* 1016 */,
/* 1017 */,
/* 1018 */,
/* 1019 */,
/* 1020 */,
/* 1021 */,
/* 1022 */,
/* 1023 */,
/* 1024 */,
/* 1025 */,
/* 1026 */,
/* 1027 */,
/* 1028 */,
/* 1029 */,
/* 1030 */,
/* 1031 */,
/* 1032 */,
/* 1033 */,
/* 1034 */,
/* 1035 */,
/* 1036 */,
/* 1037 */,
/* 1038 */,
/* 1039 */,
/* 1040 */,
/* 1041 */,
/* 1042 */,
/* 1043 */,
/* 1044 */,
/* 1045 */,
/* 1046 */,
/* 1047 */,
/* 1048 */,
/* 1049 */,
/* 1050 */,
/* 1051 */,
/* 1052 */,
/* 1053 */,
/* 1054 */,
/* 1055 */,
/* 1056 */,
/* 1057 */,
/* 1058 */,
/* 1059 */,
/* 1060 */,
/* 1061 */,
/* 1062 */,
/* 1063 */,
/* 1064 */,
/* 1065 */,
/* 1066 */,
/* 1067 */,
/* 1068 */,
/* 1069 */,
/* 1070 */,
/* 1071 */,
/* 1072 */,
/* 1073 */,
/* 1074 */,
/* 1075 */,
/* 1076 */,
/* 1077 */,
/* 1078 */,
/* 1079 */,
/* 1080 */,
/* 1081 */,
/* 1082 */,
/* 1083 */,
/* 1084 */,
/* 1085 */,
/* 1086 */,
/* 1087 */,
/* 1088 */,
/* 1089 */,
/* 1090 */,
/* 1091 */,
/* 1092 */,
/* 1093 */,
/* 1094 */,
/* 1095 */,
/* 1096 */,
/* 1097 */,
/* 1098 */,
/* 1099 */,
/* 1100 */,
/* 1101 */,
/* 1102 */,
/* 1103 */,
/* 1104 */,
/* 1105 */,
/* 1106 */,
/* 1107 */,
/* 1108 */,
/* 1109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1110);

var _global = _interopRequireDefault(__webpack_require__(1282));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (_global["default"]._babelPolyfill && typeof console !== "undefined" && console.warn) {
  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
}

_global["default"]._babelPolyfill = true;

/***/ }),
/* 1110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1111);

__webpack_require__(1254);

__webpack_require__(1256);

__webpack_require__(1259);

__webpack_require__(1261);

__webpack_require__(1263);

__webpack_require__(1265);

__webpack_require__(1267);

__webpack_require__(1269);

__webpack_require__(1271);

__webpack_require__(1273);

__webpack_require__(1275);

__webpack_require__(1277);

__webpack_require__(1281);

/***/ }),
/* 1111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1112);
__webpack_require__(1115);
__webpack_require__(1116);
__webpack_require__(1117);
__webpack_require__(1118);
__webpack_require__(1119);
__webpack_require__(1120);
__webpack_require__(1121);
__webpack_require__(1122);
__webpack_require__(1123);
__webpack_require__(1124);
__webpack_require__(1125);
__webpack_require__(1126);
__webpack_require__(1127);
__webpack_require__(1128);
__webpack_require__(1129);
__webpack_require__(1130);
__webpack_require__(1131);
__webpack_require__(1132);
__webpack_require__(1133);
__webpack_require__(1134);
__webpack_require__(1135);
__webpack_require__(1136);
__webpack_require__(1137);
__webpack_require__(1138);
__webpack_require__(1139);
__webpack_require__(1140);
__webpack_require__(1141);
__webpack_require__(1142);
__webpack_require__(1143);
__webpack_require__(1144);
__webpack_require__(1145);
__webpack_require__(1146);
__webpack_require__(1147);
__webpack_require__(1148);
__webpack_require__(1149);
__webpack_require__(1150);
__webpack_require__(1151);
__webpack_require__(1152);
__webpack_require__(1153);
__webpack_require__(1154);
__webpack_require__(1155);
__webpack_require__(1156);
__webpack_require__(1158);
__webpack_require__(1159);
__webpack_require__(1160);
__webpack_require__(1161);
__webpack_require__(1162);
__webpack_require__(1163);
__webpack_require__(1164);
__webpack_require__(1165);
__webpack_require__(1166);
__webpack_require__(1167);
__webpack_require__(1168);
__webpack_require__(1169);
__webpack_require__(1170);
__webpack_require__(1171);
__webpack_require__(1172);
__webpack_require__(1173);
__webpack_require__(1174);
__webpack_require__(1175);
__webpack_require__(1176);
__webpack_require__(1177);
__webpack_require__(1178);
__webpack_require__(1179);
__webpack_require__(1180);
__webpack_require__(1181);
__webpack_require__(1182);
__webpack_require__(1183);
__webpack_require__(1184);
__webpack_require__(1185);
__webpack_require__(1186);
__webpack_require__(1187);
__webpack_require__(1188);
__webpack_require__(1189);
__webpack_require__(1190);
__webpack_require__(1191);
__webpack_require__(1193);
__webpack_require__(1194);
__webpack_require__(1196);
__webpack_require__(1197);
__webpack_require__(1198);
__webpack_require__(1199);
__webpack_require__(1200);
__webpack_require__(1201);
__webpack_require__(1202);
__webpack_require__(1204);
__webpack_require__(1205);
__webpack_require__(1206);
__webpack_require__(1207);
__webpack_require__(1208);
__webpack_require__(1209);
__webpack_require__(1210);
__webpack_require__(1211);
__webpack_require__(1212);
__webpack_require__(1213);
__webpack_require__(1214);
__webpack_require__(1215);
__webpack_require__(1216);
__webpack_require__(186);
__webpack_require__(1217);
__webpack_require__(393);
__webpack_require__(1218);
__webpack_require__(394);
__webpack_require__(1219);
__webpack_require__(1220);
__webpack_require__(1221);
__webpack_require__(1222);
__webpack_require__(395);
__webpack_require__(1225);
__webpack_require__(1226);
__webpack_require__(1227);
__webpack_require__(1228);
__webpack_require__(1229);
__webpack_require__(1230);
__webpack_require__(1231);
__webpack_require__(1232);
__webpack_require__(1233);
__webpack_require__(1234);
__webpack_require__(1235);
__webpack_require__(1236);
__webpack_require__(1237);
__webpack_require__(1238);
__webpack_require__(1239);
__webpack_require__(1240);
__webpack_require__(1241);
__webpack_require__(1242);
__webpack_require__(1243);
__webpack_require__(1244);
__webpack_require__(1245);
__webpack_require__(1246);
__webpack_require__(1247);
__webpack_require__(1248);
__webpack_require__(1249);
__webpack_require__(1250);
__webpack_require__(1251);
__webpack_require__(1252);
__webpack_require__(1253);
module.exports = __webpack_require__(22);


/***/ }),
/* 1112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(13);
var has = __webpack_require__(40);
var DESCRIPTORS = __webpack_require__(23);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(38);
var META = __webpack_require__(61).KEY;
var $fails = __webpack_require__(14);
var shared = __webpack_require__(126);
var setToStringTag = __webpack_require__(85);
var uid = __webpack_require__(69);
var wks = __webpack_require__(20);
var wksExt = __webpack_require__(167);
var wksDefine = __webpack_require__(374);
var enumKeys = __webpack_require__(1114);
var isArray = __webpack_require__(129);
var anObject = __webpack_require__(15);
var isObject = __webpack_require__(16);
var toObject = __webpack_require__(35);
var toIObject = __webpack_require__(42);
var toPrimitive = __webpack_require__(60);
var createDesc = __webpack_require__(68);
var _create = __webpack_require__(73);
var gOPNExt = __webpack_require__(377);
var $GOPD = __webpack_require__(50);
var $GOPS = __webpack_require__(128);
var $DP = __webpack_require__(24);
var $keys = __webpack_require__(71);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(74).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(101).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(70)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(41)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 1113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(126)('native-function-to-string', Function.toString);


/***/ }),
/* 1114 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(71);
var gOPS = __webpack_require__(128);
var pIE = __webpack_require__(101);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 1115 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(73) });


/***/ }),
/* 1116 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(23), 'Object', { defineProperty: __webpack_require__(24).f });


/***/ }),
/* 1117 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(23), 'Object', { defineProperties: __webpack_require__(376) });


/***/ }),
/* 1118 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(42);
var $getOwnPropertyDescriptor = __webpack_require__(50).f;

__webpack_require__(51)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 1119 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(35);
var $getPrototypeOf = __webpack_require__(75);

__webpack_require__(51)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 1120 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(35);
var $keys = __webpack_require__(71);

__webpack_require__(51)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 1121 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(51)('getOwnPropertyNames', function () {
  return __webpack_require__(377).f;
});


/***/ }),
/* 1122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(16);
var meta = __webpack_require__(61).onFreeze;

__webpack_require__(51)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 1123 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(16);
var meta = __webpack_require__(61).onFreeze;

__webpack_require__(51)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 1124 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(16);
var meta = __webpack_require__(61).onFreeze;

__webpack_require__(51)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 1125 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(16);

__webpack_require__(51)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 1126 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(16);

__webpack_require__(51)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 1127 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(16);

__webpack_require__(51)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 1128 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(9);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(378) });


/***/ }),
/* 1129 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(9);
$export($export.S, 'Object', { is: __webpack_require__(379) });


/***/ }),
/* 1130 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(9);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(171).set });


/***/ }),
/* 1131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(102);
var test = {};
test[__webpack_require__(20)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(38)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 1132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(9);

$export($export.P, 'Function', { bind: __webpack_require__(380) });


/***/ }),
/* 1133 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(24).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(23) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 1134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(75);
var HAS_INSTANCE = __webpack_require__(20)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(24).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 1135 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var $parseInt = __webpack_require__(382);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 1136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var $parseFloat = __webpack_require__(383);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 1137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(13);
var has = __webpack_require__(40);
var cof = __webpack_require__(53);
var inheritIfRequired = __webpack_require__(173);
var toPrimitive = __webpack_require__(60);
var fails = __webpack_require__(14);
var gOPN = __webpack_require__(74).f;
var gOPD = __webpack_require__(50).f;
var dP = __webpack_require__(24).f;
var $trim = __webpack_require__(86).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(73)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(23) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(38)(global, NUMBER, $Number);
}


/***/ }),
/* 1138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var toInteger = __webpack_require__(49);
var aNumberValue = __webpack_require__(384);
var repeat = __webpack_require__(174);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(14)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 1139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $fails = __webpack_require__(14);
var aNumberValue = __webpack_require__(384);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 1140 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(9);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 1141 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(9);
var _isFinite = __webpack_require__(13).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 1142 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(9);

$export($export.S, 'Number', { isInteger: __webpack_require__(385) });


/***/ }),
/* 1143 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(9);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 1144 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(9);
var isInteger = __webpack_require__(385);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 1145 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(9);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 1146 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(9);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 1147 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var $parseFloat = __webpack_require__(383);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 1148 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var $parseInt = __webpack_require__(382);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 1149 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(9);
var log1p = __webpack_require__(386);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 1150 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(9);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 1151 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(9);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 1152 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(9);
var sign = __webpack_require__(175);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 1153 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(9);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 1154 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(9);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 1155 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(9);
var $expm1 = __webpack_require__(176);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 1156 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(9);

$export($export.S, 'Math', { fround: __webpack_require__(1157) });


/***/ }),
/* 1157 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(175);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 1158 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(9);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 1159 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(9);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(14)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 1160 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(9);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 1161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(9);

$export($export.S, 'Math', { log1p: __webpack_require__(386) });


/***/ }),
/* 1162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(9);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 1163 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(9);

$export($export.S, 'Math', { sign: __webpack_require__(175) });


/***/ }),
/* 1164 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(9);
var expm1 = __webpack_require__(176);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(14)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 1165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(9);
var expm1 = __webpack_require__(176);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 1166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(9);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 1167 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(72);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 1168 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var toIObject = __webpack_require__(42);
var toLength = __webpack_require__(21);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 1169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(86)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 1170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(177)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(178)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 1171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $at = __webpack_require__(177)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 1172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(9);
var toLength = __webpack_require__(21);
var context = __webpack_require__(179);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(181)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 1173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(9);
var context = __webpack_require__(179);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(181)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 1174 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(174)
});


/***/ }),
/* 1175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(9);
var toLength = __webpack_require__(21);
var context = __webpack_require__(179);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(181)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 1176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(39)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 1177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(39)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 1178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(39)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 1179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(39)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 1180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(39)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 1181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(39)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 1182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(39)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 1183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(39)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 1184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(39)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 1185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(39)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 1186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(39)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 1187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(39)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 1188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(39)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 1189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(9);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 1190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var toObject = __webpack_require__(35);
var toPrimitive = __webpack_require__(60);

$export($export.P + $export.F * __webpack_require__(14)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 1191 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(9);
var toISOString = __webpack_require__(1192);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 1192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(14);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 1193 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(38)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 1194 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(20)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(41)(proto, TO_PRIMITIVE, __webpack_require__(1195));


/***/ }),
/* 1195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(60);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 1196 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(9);

$export($export.S, 'Array', { isArray: __webpack_require__(129) });


/***/ }),
/* 1197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(47);
var $export = __webpack_require__(9);
var toObject = __webpack_require__(35);
var call = __webpack_require__(388);
var isArrayIter = __webpack_require__(182);
var toLength = __webpack_require__(21);
var createProperty = __webpack_require__(183);
var getIterFn = __webpack_require__(184);

$export($export.S + $export.F * !__webpack_require__(130)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 1198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var createProperty = __webpack_require__(183);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(14)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 1199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(9);
var toIObject = __webpack_require__(42);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(100) != Object || !__webpack_require__(45)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 1200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var html = __webpack_require__(170);
var cof = __webpack_require__(53);
var toAbsoluteIndex = __webpack_require__(72);
var toLength = __webpack_require__(21);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(14)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 1201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var aFunction = __webpack_require__(48);
var toObject = __webpack_require__(35);
var fails = __webpack_require__(14);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(45)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 1202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $forEach = __webpack_require__(52)(0);
var STRICT = __webpack_require__(45)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 1203 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var isArray = __webpack_require__(129);
var SPECIES = __webpack_require__(20)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 1204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $map = __webpack_require__(52)(1);

$export($export.P + $export.F * !__webpack_require__(45)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 1205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $filter = __webpack_require__(52)(2);

$export($export.P + $export.F * !__webpack_require__(45)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 1206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $some = __webpack_require__(52)(3);

$export($export.P + $export.F * !__webpack_require__(45)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 1207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $every = __webpack_require__(52)(4);

$export($export.P + $export.F * !__webpack_require__(45)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 1208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $reduce = __webpack_require__(390);

$export($export.P + $export.F * !__webpack_require__(45)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 1209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $reduce = __webpack_require__(390);

$export($export.P + $export.F * !__webpack_require__(45)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 1210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $indexOf = __webpack_require__(127)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(45)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 1211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var toIObject = __webpack_require__(42);
var toInteger = __webpack_require__(49);
var toLength = __webpack_require__(21);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(45)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 1212 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(9);

$export($export.P, 'Array', { copyWithin: __webpack_require__(391) });

__webpack_require__(76)('copyWithin');


/***/ }),
/* 1213 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(9);

$export($export.P, 'Array', { fill: __webpack_require__(185) });

__webpack_require__(76)('fill');


/***/ }),
/* 1214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(9);
var $find = __webpack_require__(52)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(76)(KEY);


/***/ }),
/* 1215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(9);
var $find = __webpack_require__(52)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(76)(KEY);


/***/ }),
/* 1216 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88)('Array');


/***/ }),
/* 1217 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var inheritIfRequired = __webpack_require__(173);
var dP = __webpack_require__(24).f;
var gOPN = __webpack_require__(74).f;
var isRegExp = __webpack_require__(180);
var $flags = __webpack_require__(131);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(23) && (!CORRECT_NEW || __webpack_require__(14)(function () {
  re2[__webpack_require__(20)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(38)(global, 'RegExp', $RegExp);
}

__webpack_require__(88)('RegExp');


/***/ }),
/* 1218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(394);
var anObject = __webpack_require__(15);
var $flags = __webpack_require__(131);
var DESCRIPTORS = __webpack_require__(23);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(38)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(14)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 1219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(15);
var toLength = __webpack_require__(21);
var advanceStringIndex = __webpack_require__(188);
var regExpExec = __webpack_require__(132);

// @@match logic
__webpack_require__(133)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 1220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(15);
var toObject = __webpack_require__(35);
var toLength = __webpack_require__(21);
var toInteger = __webpack_require__(49);
var advanceStringIndex = __webpack_require__(188);
var regExpExec = __webpack_require__(132);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(133)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 1221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(15);
var sameValue = __webpack_require__(379);
var regExpExec = __webpack_require__(132);

// @@search logic
__webpack_require__(133)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 1222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(180);
var anObject = __webpack_require__(15);
var speciesConstructor = __webpack_require__(103);
var advanceStringIndex = __webpack_require__(188);
var toLength = __webpack_require__(21);
var callRegExpExec = __webpack_require__(132);
var regexpExec = __webpack_require__(187);
var fails = __webpack_require__(14);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(133)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 1223 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var macrotask = __webpack_require__(189).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(53)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 1224 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 1225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(398);
var validate = __webpack_require__(77);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(136)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 1226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(398);
var validate = __webpack_require__(77);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(136)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 1227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(13);
var each = __webpack_require__(52)(0);
var redefine = __webpack_require__(38);
var meta = __webpack_require__(61);
var assign = __webpack_require__(378);
var weak = __webpack_require__(399);
var isObject = __webpack_require__(16);
var validate = __webpack_require__(77);
var NATIVE_WEAK_MAP = __webpack_require__(77);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(136)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 1228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(399);
var validate = __webpack_require__(77);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(136)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 1229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(9);
var $typed = __webpack_require__(137);
var buffer = __webpack_require__(190);
var anObject = __webpack_require__(15);
var toAbsoluteIndex = __webpack_require__(72);
var toLength = __webpack_require__(21);
var isObject = __webpack_require__(16);
var ArrayBuffer = __webpack_require__(13).ArrayBuffer;
var speciesConstructor = __webpack_require__(103);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(14)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(88)(ARRAY_BUFFER);


/***/ }),
/* 1230 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
$export($export.G + $export.W + $export.F * !__webpack_require__(137).ABV, {
  DataView: __webpack_require__(190).DataView
});


/***/ }),
/* 1231 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1232 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1233 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 1234 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1235 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1236 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1237 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1238 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1239 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 1240 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(9);
var aFunction = __webpack_require__(48);
var anObject = __webpack_require__(15);
var rApply = (__webpack_require__(13).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(14)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 1241 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(9);
var create = __webpack_require__(73);
var aFunction = __webpack_require__(48);
var anObject = __webpack_require__(15);
var isObject = __webpack_require__(16);
var fails = __webpack_require__(14);
var bind = __webpack_require__(380);
var rConstruct = (__webpack_require__(13).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 1242 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(24);
var $export = __webpack_require__(9);
var anObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(60);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(14)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 1243 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(9);
var gOPD = __webpack_require__(50).f;
var anObject = __webpack_require__(15);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 1244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(9);
var anObject = __webpack_require__(15);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(387)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 1245 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(50);
var getPrototypeOf = __webpack_require__(75);
var has = __webpack_require__(40);
var $export = __webpack_require__(9);
var isObject = __webpack_require__(16);
var anObject = __webpack_require__(15);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 1246 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(50);
var $export = __webpack_require__(9);
var anObject = __webpack_require__(15);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 1247 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(9);
var getProto = __webpack_require__(75);
var anObject = __webpack_require__(15);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 1248 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(9);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 1249 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(9);
var anObject = __webpack_require__(15);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 1250 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(9);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(401) });


/***/ }),
/* 1251 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(9);
var anObject = __webpack_require__(15);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 1252 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(24);
var gOPD = __webpack_require__(50);
var getPrototypeOf = __webpack_require__(75);
var has = __webpack_require__(40);
var $export = __webpack_require__(9);
var createDesc = __webpack_require__(68);
var anObject = __webpack_require__(15);
var isObject = __webpack_require__(16);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 1253 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(9);
var setProto = __webpack_require__(171);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 1254 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1255);
module.exports = __webpack_require__(22).Array.includes;


/***/ }),
/* 1255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(9);
var $includes = __webpack_require__(127)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(76)('includes');


/***/ }),
/* 1256 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1257);
module.exports = __webpack_require__(22).Array.flatMap;


/***/ }),
/* 1257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(9);
var flattenIntoArray = __webpack_require__(1258);
var toObject = __webpack_require__(35);
var toLength = __webpack_require__(21);
var aFunction = __webpack_require__(48);
var arraySpeciesCreate = __webpack_require__(389);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(76)('flatMap');


/***/ }),
/* 1258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(129);
var isObject = __webpack_require__(16);
var toLength = __webpack_require__(21);
var ctx = __webpack_require__(47);
var IS_CONCAT_SPREADABLE = __webpack_require__(20)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 1259 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1260);
module.exports = __webpack_require__(22).String.padStart;


/***/ }),
/* 1260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(9);
var $pad = __webpack_require__(402);
var userAgent = __webpack_require__(135);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 1261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1262);
module.exports = __webpack_require__(22).String.padEnd;


/***/ }),
/* 1262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(9);
var $pad = __webpack_require__(402);
var userAgent = __webpack_require__(135);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 1263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1264);
module.exports = __webpack_require__(22).String.trimLeft;


/***/ }),
/* 1264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(86)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 1265 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1266);
module.exports = __webpack_require__(22).String.trimRight;


/***/ }),
/* 1266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(86)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 1267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1268);
module.exports = __webpack_require__(167).f('asyncIterator');


/***/ }),
/* 1268 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(374)('asyncIterator');


/***/ }),
/* 1269 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1270);
module.exports = __webpack_require__(22).Object.getOwnPropertyDescriptors;


/***/ }),
/* 1270 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(9);
var ownKeys = __webpack_require__(401);
var toIObject = __webpack_require__(42);
var gOPD = __webpack_require__(50);
var createProperty = __webpack_require__(183);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 1271 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1272);
module.exports = __webpack_require__(22).Object.values;


/***/ }),
/* 1272 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(9);
var $values = __webpack_require__(403)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 1273 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1274);
module.exports = __webpack_require__(22).Object.entries;


/***/ }),
/* 1274 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(9);
var $entries = __webpack_require__(403)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 1275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(395);
__webpack_require__(1276);
module.exports = __webpack_require__(22).Promise['finally'];


/***/ }),
/* 1276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(9);
var core = __webpack_require__(22);
var global = __webpack_require__(13);
var speciesConstructor = __webpack_require__(103);
var promiseResolve = __webpack_require__(397);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 1277 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1278);
__webpack_require__(1279);
__webpack_require__(1280);
module.exports = __webpack_require__(22);


/***/ }),
/* 1278 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(13);
var $export = __webpack_require__(9);
var userAgent = __webpack_require__(135);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 1279 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
var $task = __webpack_require__(189);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 1280 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(186);
var getKeys = __webpack_require__(71);
var redefine = __webpack_require__(38);
var global = __webpack_require__(13);
var hide = __webpack_require__(41);
var Iterators = __webpack_require__(87);
var wks = __webpack_require__(20);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 1281 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 1282 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1283);
module.exports = __webpack_require__(404).global;


/***/ }),
/* 1283 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(1284);

$export($export.G, { global: __webpack_require__(191) });


/***/ }),
/* 1284 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(191);
var core = __webpack_require__(404);
var ctx = __webpack_require__(1285);
var hide = __webpack_require__(1287);
var has = __webpack_require__(1294);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1285 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(1286);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 1286 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 1287 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(1288);
var createDesc = __webpack_require__(1293);
module.exports = __webpack_require__(193) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 1288 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1289);
var IE8_DOM_DEFINE = __webpack_require__(1290);
var toPrimitive = __webpack_require__(1292);
var dP = Object.defineProperty;

exports.f = __webpack_require__(193) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 1289 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(192);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 1290 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(193) && !__webpack_require__(405)(function () {
  return Object.defineProperty(__webpack_require__(1291)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 1291 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(192);
var document = __webpack_require__(191).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 1292 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(192);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 1293 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 1294 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 1295 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1296 */,
/* 1297 */,
/* 1298 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.7.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });            

                if (slideControlIndex !== -1) {
                    $(this).attr({
                        'aria-describedby': 'slick-slide-control' + _.instanceUid + slideControlIndex
                    });
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];
        
                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
            _.$slides.eq(i).attr('tabindex', 0);
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }   
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
                // for non-autoplay: once active slide (group) has updated, set focus on first newly showing slide 
                if (!_.options.autoplay) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


/***/ }),
/* 1299 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * justifiedGallery - v3.7.0
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2018 Miro Mannino
 * Licensed under the MIT license.
 */
(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(function ($) {

  /**
   * Justified Gallery controller constructor
   *
   * @param $gallery the gallery to build
   * @param settings the settings (the defaults are in JustifiedGallery.defaults)
   * @constructor
   */
  var JustifiedGallery = function ($gallery, settings) {
  
    this.settings = settings;
    this.checkSettings();
  
    this.imgAnalyzerTimeout = null;
    this.entries = null;
    this.buildingRow = {
      entriesBuff : [],
      width : 0,
      height : 0,
      aspectRatio : 0
    };
    this.lastFetchedEntry = null;
    this.lastAnalyzedIndex = -1;
    this.yield = {
      every : 2, // do a flush every n flushes (must be greater than 1)
      flushed : 0 // flushed rows without a yield
    };
    this.border = settings.border >= 0 ? settings.border : settings.margins;
    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
    this.offY = this.border;
    this.rows = 0;
    this.spinner = {
      phase : 0,
      timeSlot : 150,
      $el : $('<div class="spinner"><span></span><span></span><span></span></div>'),
      intervalId : null
    };
    this.scrollBarOn = false;
    this.checkWidthIntervalId = null;
    this.galleryWidth = $gallery.width();
    this.$gallery = $gallery;
  
  };
  
  /** @returns {String} the best suffix given the width and the height */
  JustifiedGallery.prototype.getSuffix = function (width, height) {
    var longestSide, i;
    longestSide = (width > height) ? width : height;
    for (i = 0; i < this.suffixRanges.length; i++) {
      if (longestSide <= this.suffixRanges[i]) {
        return this.settings.sizeRangeSuffixes[this.suffixRanges[i]];
      }
    }
    return this.settings.sizeRangeSuffixes[this.suffixRanges[i - 1]];
  };
  
  /**
   * Remove the suffix from the string
   *
   * @returns {string} a new string without the suffix
   */
  JustifiedGallery.prototype.removeSuffix = function (str, suffix) {
    return str.substring(0, str.length - suffix.length);
  };
  
  /**
   * @returns {boolean} a boolean to say if the suffix is contained in the str or not
   */
  JustifiedGallery.prototype.endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };
  
  /**
   * Get the used suffix of a particular url
   *
   * @param str
   * @returns {String} return the used suffix
   */
  JustifiedGallery.prototype.getUsedSuffix = function (str) {
    for (var si in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(si)) {
        if (this.settings.sizeRangeSuffixes[si].length === 0) continue;
        if (this.endsWith(str, this.settings.sizeRangeSuffixes[si])) return this.settings.sizeRangeSuffixes[si];
      }
    }
    return '';
  };
  
  /**
   * Given an image src, with the width and the height, returns the new image src with the
   * best suffix to show the best quality thumbnail.
   *
   * @returns {String} the suffix to use
   */
  JustifiedGallery.prototype.newSrc = function (imageSrc, imgWidth, imgHeight, image) {
    var newImageSrc;
  
    if (this.settings.thumbnailPath) {
      newImageSrc = this.settings.thumbnailPath(imageSrc, imgWidth, imgHeight, image);
    } else {
      var matchRes = imageSrc.match(this.settings.extension);
      var ext = (matchRes !== null) ? matchRes[0] : '';
      newImageSrc = imageSrc.replace(this.settings.extension, '');
      newImageSrc = this.removeSuffix(newImageSrc, this.getUsedSuffix(newImageSrc));
      newImageSrc += this.getSuffix(imgWidth, imgHeight) + ext;
    }
  
    return newImageSrc;
  };
  
  /**
   * Shows the images that is in the given entry
   *
   * @param $entry the entry
   * @param callback the callback that is called when the show animation is finished
   */
  JustifiedGallery.prototype.showImg = function ($entry, callback) {
    if (this.settings.cssAnimation) {
      $entry.addClass('entry-visible');
      if (callback) callback();
    } else {
      $entry.stop().fadeTo(this.settings.imagesAnimationDuration, 1.0, callback);
      $entry.find(this.settings.imgSelector).stop().fadeTo(this.settings.imagesAnimationDuration, 1.0, callback);
    }
  };
  
  /**
   * Extract the image src form the image, looking from the 'safe-src', and if it can't be found, from the
   * 'src' attribute. It saves in the image data the 'jg.originalSrc' field, with the extracted src.
   *
   * @param $image the image to analyze
   * @returns {String} the extracted src
   */
  JustifiedGallery.prototype.extractImgSrcFromImage = function ($image) {
    var imageSrc = (typeof $image.data('safe-src') !== 'undefined') ? $image.data('safe-src') : $image.attr('src');
    $image.data('jg.originalSrc', imageSrc);
    return imageSrc;
  };
  
  /** @returns {jQuery} the image in the given entry */
  JustifiedGallery.prototype.imgFromEntry = function ($entry) {
    var $img = $entry.find(this.settings.imgSelector);
    return $img.length === 0 ? null : $img;
  };
  
  /** @returns {jQuery} the caption in the given entry */
  JustifiedGallery.prototype.captionFromEntry = function ($entry) {
    var $caption = $entry.find('> .caption');
    return $caption.length === 0 ? null : $caption;
  };
  
  /**
   * Display the entry
   *
   * @param {jQuery} $entry the entry to display
   * @param {int} x the x position where the entry must be positioned
   * @param y the y position where the entry must be positioned
   * @param imgWidth the image width
   * @param imgHeight the image height
   * @param rowHeight the row height of the row that owns the entry
   */
  JustifiedGallery.prototype.displayEntry = function ($entry, x, y, imgWidth, imgHeight, rowHeight) {
    $entry.width(imgWidth);
    $entry.height(rowHeight);
    $entry.css('top', y);
    $entry.css('left', x);
  
    var $image = this.imgFromEntry($entry);
    if ($image !== null) {
      $image.css('width', imgWidth);
      $image.css('height', imgHeight);
      $image.css('margin-left', - imgWidth / 2);
      $image.css('margin-top', - imgHeight / 2);
  
      // Image reloading for an high quality of thumbnails
      var imageSrc = $image.attr('src');
      var newImageSrc = this.newSrc(imageSrc, imgWidth, imgHeight, $image[0]);
  
      $image.one('error', function () {
        $image.attr('src', $image.data('jg.originalSrc')); //revert to the original thumbnail, we got it.
      });
  
      var loadNewImage = function () {
        if (imageSrc !== newImageSrc) { //load the new image after the fadeIn
          $image.attr('src', newImageSrc);
        }
      };
  
      if ($entry.data('jg.loaded') === 'skipped') {
        this.onImageEvent(imageSrc, $.proxy(function() {
          this.showImg($entry, loadNewImage);
          $entry.data('jg.loaded', true);
        }, this));
      } else {
        this.showImg($entry, loadNewImage);
      }
  
    } else {
      this.showImg($entry);
    }
  
    this.displayEntryCaption($entry);
  };
  
  /**
   * Display the entry caption. If the caption element doesn't exists, it creates the caption using the 'alt'
   * or the 'title' attributes.
   *
   * @param {jQuery} $entry the entry to process
   */
  JustifiedGallery.prototype.displayEntryCaption = function ($entry) {
    var $image = this.imgFromEntry($entry);
    if ($image !== null && this.settings.captions) {
      var $imgCaption = this.captionFromEntry($entry);
  
      // Create it if it doesn't exists
      if ($imgCaption === null) {
        var caption = $image.attr('alt');
        if (!this.isValidCaption(caption)) caption = $entry.attr('title');
        if (this.isValidCaption(caption)) { // Create only we found something
          $imgCaption = $('<div class="caption">' + caption + '</div>');
          $entry.append($imgCaption);
          $entry.data('jg.createdCaption', true);
        }
      }
  
      // Create events (we check again the $imgCaption because it can be still inexistent)
      if ($imgCaption !== null) {
        if (!this.settings.cssAnimation) $imgCaption.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity);
        this.addCaptionEventsHandlers($entry);
      }
    } else {
      this.removeCaptionEventsHandlers($entry);
    }
  };
  
  /**
   * Validates the caption
   *
   * @param caption The caption that should be validated
   * @return {boolean} Validation result
   */
  JustifiedGallery.prototype.isValidCaption = function (caption) {
    return (typeof caption !== 'undefined' && caption.length > 0);
  };
  
  /**
   * The callback for the event 'mouseenter'. It assumes that the event currentTarget is an entry.
   * It shows the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseEnterForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.addClass('caption-visible').removeClass('caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
          this.settings.captionSettings.visibleOpacity);
    }
  };
  
  /**
   * The callback for the event 'mouseleave'. It assumes that the event currentTarget is an entry.
   * It hides the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseLeaveForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.removeClass('caption-visible').removeClass('caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
          this.settings.captionSettings.nonVisibleOpacity);
    }
  };
  
  /**
   * Add the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.addCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents === 'undefined') {
      captionMouseEvents = {
        mouseenter: $.proxy(this.onEntryMouseEnterForCaption, this),
        mouseleave: $.proxy(this.onEntryMouseLeaveForCaption, this)
      };
      $entry.on('mouseenter', undefined, undefined, captionMouseEvents.mouseenter);
      $entry.on('mouseleave', undefined, undefined, captionMouseEvents.mouseleave);
      $entry.data('jg.captionMouseEvents', captionMouseEvents);
    }
  };
  
  /**
   * Remove the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.removeCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents !== 'undefined') {
      $entry.off('mouseenter', undefined, captionMouseEvents.mouseenter);
      $entry.off('mouseleave', undefined, captionMouseEvents.mouseleave);
      $entry.removeData('jg.captionMouseEvents');
    }
  };
  
  /**
   * Clear the building row data to be used for a new row
   */
  JustifiedGallery.prototype.clearBuildingRow = function () {
    this.buildingRow.entriesBuff = [];
    this.buildingRow.aspectRatio = 0;
    this.buildingRow.width = 0;
  };
  
  /**
   * Justify the building row, preparing it to
   *
   * @param isLastRow
   * @returns a boolean to know if the row has been justified or not
   */
  JustifiedGallery.prototype.prepareBuildingRow = function (isLastRow) {
    var i, $entry, imgAspectRatio, newImgW, newImgH, justify = true;
    var minHeight = 0;
    var availableWidth = this.galleryWidth - 2 * this.border - (
        (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
    var rowHeight = availableWidth / this.buildingRow.aspectRatio;
    var defaultRowHeight = this.settings.rowHeight;
    var justifiable = this.buildingRow.width / availableWidth > this.settings.justifyThreshold;
  
    //Skip the last row if we can't justify it and the lastRow == 'hide'
    if (isLastRow && this.settings.lastRow === 'hide' && !justifiable) {
      for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
        $entry = this.buildingRow.entriesBuff[i];
        if (this.settings.cssAnimation)
          $entry.removeClass('entry-visible');
        else {
          $entry.stop().fadeTo(0, 0.1);
          $entry.find('> img, > a > img').fadeTo(0, 0);
        }
      }
      return -1;
    }
  
    // With lastRow = nojustify, justify if is justificable (the images will not become too big)
    if (isLastRow && !justifiable && this.settings.lastRow !== 'justify' && this.settings.lastRow !== 'hide') {
      justify = false;
  
      if (this.rows > 0) {
        defaultRowHeight = (this.offY - this.border - this.settings.margins * this.rows) / this.rows;
        justify = defaultRowHeight * this.buildingRow.aspectRatio / availableWidth > this.settings.justifyThreshold;
      }
    }
  
    for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
      $entry = this.buildingRow.entriesBuff[i];
      imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');
  
      if (justify) {
        newImgW = (i === this.buildingRow.entriesBuff.length - 1) ? availableWidth : rowHeight * imgAspectRatio;
        newImgH = rowHeight;
      } else {
        newImgW = defaultRowHeight * imgAspectRatio;
        newImgH = defaultRowHeight;
      }
  
      availableWidth -= Math.round(newImgW);
      $entry.data('jg.jwidth', Math.round(newImgW));
      $entry.data('jg.jheight', Math.ceil(newImgH));
      if (i === 0 || minHeight > newImgH) minHeight = newImgH;
    }
  
    this.buildingRow.height = minHeight;
    return justify;
  };
  
  /**
   * Flush a row: justify it, modify the gallery height accordingly to the row height
   *
   * @param isLastRow
   */
  JustifiedGallery.prototype.flushRow = function (isLastRow) {
    var settings = this.settings;
    var $entry, buildingRowRes, offX = this.border, i;
  
    buildingRowRes = this.prepareBuildingRow(isLastRow);
    if (isLastRow && settings.lastRow === 'hide' && buildingRowRes === -1) {
      this.clearBuildingRow();
      return;
    }
  
    if(this.maxRowHeight) {
      if(this.maxRowHeight < this.buildingRow.height)  this.buildingRow.height = this.maxRowHeight;
    }
  
    //Align last (unjustified) row
    if (isLastRow && (settings.lastRow === 'center' || settings.lastRow === 'right')) {
      var availableWidth = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * settings.margins;
  
      for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
        $entry = this.buildingRow.entriesBuff[i];
        availableWidth -= $entry.data('jg.jwidth');
      }
  
      if (settings.lastRow === 'center')
        offX += availableWidth / 2;
      else if (settings.lastRow === 'right')
        offX += availableWidth;
    }
  
    var lastEntryIdx = this.buildingRow.entriesBuff.length - 1;
    for (i = 0; i <= lastEntryIdx; i++) {
      $entry = this.buildingRow.entriesBuff[ this.settings.rtl ? lastEntryIdx - i : i ];
      this.displayEntry($entry, offX, this.offY, $entry.data('jg.jwidth'), $entry.data('jg.jheight'), this.buildingRow.height);
      offX += $entry.data('jg.jwidth') + settings.margins;
    }
  
    //Gallery Height
    this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border;
    this.setGalleryTempHeight(this.galleryHeightToSet + this.getSpinnerHeight());
  
    if (!isLastRow || (this.buildingRow.height <= settings.rowHeight && buildingRowRes)) {
      //Ready for a new row
      this.offY += this.buildingRow.height + settings.margins;
      this.rows += 1;
      this.clearBuildingRow();
      this.settings.triggerEvent.call(this, 'jg.rowflush');
    }
  };
  
  
  // Scroll position not restoring: https://github.com/miromannino/Justified-Gallery/issues/221
  var galleryPrevStaticHeight = 0;
  
  JustifiedGallery.prototype.rememberGalleryHeight = function () {
    galleryPrevStaticHeight = this.$gallery.height();
    this.$gallery.height(galleryPrevStaticHeight);
  };
  
  // grow only
  JustifiedGallery.prototype.setGalleryTempHeight = function (height) {
    galleryPrevStaticHeight = Math.max(height, galleryPrevStaticHeight);
    this.$gallery.height(galleryPrevStaticHeight);
  };
  
  JustifiedGallery.prototype.setGalleryFinalHeight = function (height) {
    galleryPrevStaticHeight = height;
    this.$gallery.height(height);
  };
  
  /**
   * @returns {boolean} a boolean saying if the scrollbar is active or not
   */
  function hasScrollBar() {
    return $("body").height() > $(window).height();
  }
  
  /**
   * Checks the width of the gallery container, to know if a new justification is needed
   */
  JustifiedGallery.prototype.checkWidth = function () {
    this.checkWidthIntervalId = setInterval($.proxy(function () {
  
      // if the gallery is not currently visible, abort.
      if (!this.$gallery.is(":visible")) return;
  
      var galleryWidth = parseFloat(this.$gallery.width());
      if (hasScrollBar() === this.scrollBarOn) {
        if (Math.abs(galleryWidth - this.galleryWidth) > this.settings.refreshSensitivity) {
          this.galleryWidth = galleryWidth;
          this.rewind();
  
          this.rememberGalleryHeight();
  
          // Restart to analyze
          this.startImgAnalyzer(true);
        }
      } else {
        this.scrollBarOn = hasScrollBar();
        this.galleryWidth = galleryWidth;
      }
    }, this), this.settings.refreshTime);
  };
  
  /**
   * @returns {boolean} a boolean saying if the spinner is active or not
   */
  JustifiedGallery.prototype.isSpinnerActive = function () {
    return this.spinner.intervalId !== null;
  };
  
  /**
   * @returns {int} the spinner height
   */
  JustifiedGallery.prototype.getSpinnerHeight = function () {
    return this.spinner.$el.innerHeight();
  };
  
  /**
   * Stops the spinner animation and modify the gallery height to exclude the spinner
   */
  JustifiedGallery.prototype.stopLoadingSpinnerAnimation = function () {
    clearInterval(this.spinner.intervalId);
    this.spinner.intervalId = null;
    this.setGalleryTempHeight(this.$gallery.height() - this.getSpinnerHeight());
    this.spinner.$el.detach();
  };
  
  /**
   * Starts the spinner animation
   */
  JustifiedGallery.prototype.startLoadingSpinnerAnimation = function () {
    var spinnerContext = this.spinner;
    var $spinnerPoints = spinnerContext.$el.find('span');
    clearInterval(spinnerContext.intervalId);
    this.$gallery.append(spinnerContext.$el);
    this.setGalleryTempHeight(this.offY + this.buildingRow.height + this.getSpinnerHeight());
    spinnerContext.intervalId = setInterval(function () {
      if (spinnerContext.phase < $spinnerPoints.length) {
        $spinnerPoints.eq(spinnerContext.phase).fadeTo(spinnerContext.timeSlot, 1);
      } else {
        $spinnerPoints.eq(spinnerContext.phase - $spinnerPoints.length).fadeTo(spinnerContext.timeSlot, 0);
      }
      spinnerContext.phase = (spinnerContext.phase + 1) % ($spinnerPoints.length * 2);
    }, spinnerContext.timeSlot);
  };
  
  /**
   * Rewind the image analysis to start from the first entry.
   */
  JustifiedGallery.prototype.rewind = function () {
    this.lastFetchedEntry = null;
    this.lastAnalyzedIndex = -1;
    this.offY = this.border;
    this.rows = 0;
    this.clearBuildingRow();
  };
  
  /**
   * Update the entries searching it from the justified gallery HTML element
   *
   * @param norewind if norewind only the new entries will be changed (i.e. randomized, sorted or filtered)
   * @returns {boolean} true if some entries has been founded
   */
  JustifiedGallery.prototype.updateEntries = function (norewind) {
    var newEntries;
  
    if (norewind && this.lastFetchedEntry != null) {
      newEntries = $(this.lastFetchedEntry).nextAll(this.settings.selector).toArray();
    } else {
      this.entries = [];
      newEntries = this.$gallery.children(this.settings.selector).toArray();
    }
  
    if (newEntries.length > 0) {
  
      // Sort or randomize
      if ($.isFunction(this.settings.sort)) {
        newEntries = this.sortArray(newEntries);
      } else if (this.settings.randomize) {
        newEntries = this.shuffleArray(newEntries);
      }
      this.lastFetchedEntry = newEntries[newEntries.length - 1];
  
      // Filter
      if (this.settings.filter) {
        newEntries = this.filterArray(newEntries);
      } else {
        this.resetFilters(newEntries);
      }
  
    }
  
    this.entries = this.entries.concat(newEntries);
    return true;
  };
  
  /**
   * Apply the entries order to the DOM, iterating the entries and appending the images
   *
   * @param entries the entries that has been modified and that must be re-ordered in the DOM
   */
  JustifiedGallery.prototype.insertToGallery = function (entries) {
    var that = this;
    $.each(entries, function () {
      $(this).appendTo(that.$gallery);
    });
  };
  
  /**
   * Shuffle the array using the Fisher-Yates shuffle algorithm
   *
   * @param a the array to shuffle
   * @return the shuffled array
   */
  JustifiedGallery.prototype.shuffleArray = function (a) {
    var i, j, temp;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    this.insertToGallery(a);
    return a;
  };
  
  /**
   * Sort the array using settings.comparator as comparator
   *
   * @param a the array to sort (it is sorted)
   * @return the sorted array
   */
  JustifiedGallery.prototype.sortArray = function (a) {
    a.sort(this.settings.sort);
    this.insertToGallery(a);
    return a;
  };
  
  /**
   * Reset the filters removing the 'jg-filtered' class from all the entries
   *
   * @param a the array to reset
   */
  JustifiedGallery.prototype.resetFilters = function (a) {
    for (var i = 0; i < a.length; i++) $(a[i]).removeClass('jg-filtered');
  };
  
  /**
   * Filter the entries considering theirs classes (if a string has been passed) or using a function for filtering.
   *
   * @param a the array to filter
   * @return the filtered array
   */
  JustifiedGallery.prototype.filterArray = function (a) {
    var settings = this.settings;
    if ($.type(settings.filter) === 'string') {
      // Filter only keeping the entries passed in the string
      return a.filter(function (el) {
        var $el = $(el);
        if ($el.is(settings.filter)) {
          $el.removeClass('jg-filtered');
          return true;
        } else {
          $el.addClass('jg-filtered').removeClass('jg-visible');
          return false;
        }
      });
    } else if ($.isFunction(settings.filter)) {
      // Filter using the passed function
      var filteredArr = a.filter(settings.filter);
      for (var i = 0; i < a.length; i++) {
        if (filteredArr.indexOf(a[i]) === -1) {
          $(a[i]).addClass('jg-filtered').removeClass('jg-visible');
        } else {
          $(a[i]).removeClass('jg-filtered');
        }
      }
      return filteredArr;
    }
  };
  
  /**
   * Destroy the Justified Gallery instance.
   *
   * It clears all the css properties added in the style attributes. We doesn't backup the original
   * values for those css attributes, because it costs (performance) and because in general one
   * shouldn't use the style attribute for an uniform set of images (where we suppose the use of
   * classes). Creating a backup is also difficult because JG could be called multiple times and
   * with different style attributes.
   */
  JustifiedGallery.prototype.destroy = function () {
    clearInterval(this.checkWidthIntervalId);
  
    $.each(this.entries, $.proxy(function(_, entry) {
      var $entry = $(entry);
  
      // Reset entry style
      $entry.css('width', '');
      $entry.css('height', '');
      $entry.css('top', '');
      $entry.css('left', '');
      $entry.data('jg.loaded', undefined);
      $entry.removeClass('jg-entry');
  
      // Reset image style
      var $img = this.imgFromEntry($entry);
      $img.css('width', '');
      $img.css('height', '');
      $img.css('margin-left', '');
      $img.css('margin-top', '');
      $img.attr('src', $img.data('jg.originalSrc'));
      $img.data('jg.originalSrc', undefined);
  
      // Remove caption
      this.removeCaptionEventsHandlers($entry);
      var $caption = this.captionFromEntry($entry);
      if ($entry.data('jg.createdCaption')) {
        // remove also the caption element (if created by jg)
        $entry.data('jg.createdCaption', undefined);
        if ($caption !== null) $caption.remove();
      } else {
        if ($caption !== null) $caption.fadeTo(0, 1);
      }
  
    }, this));
  
    this.$gallery.css('height', '');
    this.$gallery.removeClass('justified-gallery');
    this.$gallery.data('jg.controller', undefined);
  };
  
  /**
   * Analyze the images and builds the rows. It returns if it found an image that is not loaded.
   *
   * @param isForResize if the image analyzer is called for resizing or not, to call a different callback at the end
   */
  JustifiedGallery.prototype.analyzeImages = function (isForResize) {
    for (var i = this.lastAnalyzedIndex + 1; i < this.entries.length; i++) {
      var $entry = $(this.entries[i]);
      if ($entry.data('jg.loaded') === true || $entry.data('jg.loaded') === 'skipped') {
        var availableWidth = this.galleryWidth - 2 * this.border - (
            (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
        var imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');
        if (availableWidth / (this.buildingRow.aspectRatio + imgAspectRatio) < this.settings.rowHeight) {
          this.flushRow(false);
  
          if(++this.yield.flushed >= this.yield.every) {
            this.startImgAnalyzer(isForResize);
            return;
          }
        }
  
        this.buildingRow.entriesBuff.push($entry);
        this.buildingRow.aspectRatio += imgAspectRatio;
        this.buildingRow.width += imgAspectRatio * this.settings.rowHeight;
        this.lastAnalyzedIndex = i;
  
      } else if ($entry.data('jg.loaded') !== 'error') {
        return;
      }
    }
  
    // Last row flush (the row is not full)
    if (this.buildingRow.entriesBuff.length > 0) this.flushRow(true);
  
    if (this.isSpinnerActive()) {
      this.stopLoadingSpinnerAnimation();
    }
  
    /* Stop, if there is, the timeout to start the analyzeImages.
     This is because an image can be set loaded, and the timeout can be set,
     but this image can be analyzed yet.
     */
    this.stopImgAnalyzerStarter();
  
    //On complete callback
    this.settings.triggerEvent.call(this, isForResize ? 'jg.resize' : 'jg.complete');
    this.setGalleryFinalHeight(this.galleryHeightToSet);
  };
  
  /**
   * Stops any ImgAnalyzer starter (that has an assigned timeout)
   */
  JustifiedGallery.prototype.stopImgAnalyzerStarter = function () {
    this.yield.flushed = 0;
    if (this.imgAnalyzerTimeout !== null) {
      clearTimeout(this.imgAnalyzerTimeout);
      this.imgAnalyzerTimeout = null;
    }
  };
  
  /**
   * Starts the image analyzer. It is not immediately called to let the browser to update the view
   *
   * @param isForResize specifies if the image analyzer must be called for resizing or not
   */
  JustifiedGallery.prototype.startImgAnalyzer = function (isForResize) {
    var that = this;
    this.stopImgAnalyzerStarter();
    this.imgAnalyzerTimeout = setTimeout(function () {
      that.analyzeImages(isForResize);
    }, 0.001); // we can't start it immediately due to a IE different behaviour
  };
  
  /**
   * Checks if the image is loaded or not using another image object. We cannot use the 'complete' image property,
   * because some browsers, with a 404 set complete = true.
   *
   * @param imageSrc the image src to load
   * @param onLoad callback that is called when the image has been loaded
   * @param onError callback that is called in case of an error
   */
  JustifiedGallery.prototype.onImageEvent = function (imageSrc, onLoad, onError) {
    if (!onLoad && !onError) return;
  
    var memImage = new Image();
    var $memImage = $(memImage);
    if (onLoad) {
      $memImage.one('load', function () {
        $memImage.off('load error');
        onLoad(memImage);
      });
    }
    if (onError) {
      $memImage.one('error', function() {
        $memImage.off('load error');
        onError(memImage);
      });
    }
    memImage.src = imageSrc;
  };
  
  /**
   * Init of Justified Gallery controlled
   * It analyzes all the entries starting theirs loading and calling the image analyzer (that works with loaded images)
   */
  JustifiedGallery.prototype.init = function () {
    var imagesToLoad = false, skippedImages = false, that = this;
    $.each(this.entries, function (index, entry) {
      var $entry = $(entry);
      var $image = that.imgFromEntry($entry);
  
      $entry.addClass('jg-entry');
  
      if ($entry.data('jg.loaded') !== true && $entry.data('jg.loaded') !== 'skipped') {
  
        // Link Rel global overwrite
        if (that.settings.rel !== null) $entry.attr('rel', that.settings.rel);
  
        // Link Target global overwrite
        if (that.settings.target !== null) $entry.attr('target', that.settings.target);
  
        if ($image !== null) {
  
          // Image src
          var imageSrc = that.extractImgSrcFromImage($image);
          $image.attr('src', imageSrc);
  
          /* If we have the height and the width, we don't wait that the image is loaded, but we start directly
           * with the justification */
          if (that.settings.waitThumbnailsLoad === false) {
            var width = parseFloat($image.prop('width'));
            var height = parseFloat($image.prop('height'));
            if (!isNaN(width) && !isNaN(height)) {
              $entry.data('jg.width', width);
              $entry.data('jg.height', height);
              $entry.data('jg.loaded', 'skipped');
              skippedImages = true;
              that.startImgAnalyzer(false);
              return true; // continue
            }
          }
  
          $entry.data('jg.loaded', false);
          imagesToLoad = true;
  
          // Spinner start
          if (!that.isSpinnerActive()) that.startLoadingSpinnerAnimation();
  
          that.onImageEvent(imageSrc, function (loadImg) { // image loaded
            $entry.data('jg.width', loadImg.width);
            $entry.data('jg.height', loadImg.height);
            $entry.data('jg.loaded', true);
            that.startImgAnalyzer(false);
          }, function () { // image load error
            $entry.data('jg.loaded', 'error');
            that.startImgAnalyzer(false);
          });
  
        } else {
          $entry.data('jg.loaded', true);
          $entry.data('jg.width', $entry.width() | parseFloat($entry.css('width')) | 1);
          $entry.data('jg.height', $entry.height() | parseFloat($entry.css('height')) | 1);
        }
  
      }
  
    });
  
    if (!imagesToLoad && !skippedImages) this.startImgAnalyzer(false);
    this.checkWidth();
  };
  
  /**
   * Checks that it is a valid number. If a string is passed it is converted to a number
   *
   * @param settingContainer the object that contains the setting (to allow the conversion)
   * @param settingName the setting name
   */
  JustifiedGallery.prototype.checkOrConvertNumber = function (settingContainer, settingName) {
    if ($.type(settingContainer[settingName]) === 'string') {
      settingContainer[settingName] = parseFloat(settingContainer[settingName]);
    }
  
    if ($.type(settingContainer[settingName]) === 'number') {
      if (isNaN(settingContainer[settingName])) throw 'invalid number for ' + settingName;
    } else {
      throw settingName + ' must be a number';
    }
  };
  
  /**
   * Checks the sizeRangeSuffixes and, if necessary, converts
   * its keys from string (e.g. old settings with 'lt100') to int.
   */
  JustifiedGallery.prototype.checkSizeRangesSuffixes = function () {
    if ($.type(this.settings.sizeRangeSuffixes) !== 'object') {
      throw 'sizeRangeSuffixes must be defined and must be an object';
    }
  
    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(rangeIdx);
    }
  
    var newSizeRngSuffixes = {0: ''};
    for (var i = 0; i < suffixRanges.length; i++) {
      if ($.type(suffixRanges[i]) === 'string') {
        try {
          var numIdx = parseInt(suffixRanges[i].replace(/^[a-z]+/, ''), 10);
          newSizeRngSuffixes[numIdx] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
        } catch (e) {
          throw 'sizeRangeSuffixes keys must contains correct numbers (' + e + ')';
        }
      } else {
        newSizeRngSuffixes[suffixRanges[i]] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
      }
    }
  
    this.settings.sizeRangeSuffixes = newSizeRngSuffixes;
  };
  
  /**
   * check and convert the maxRowHeight setting
   * requires rowHeight to be already set
   * TODO: should be always called when only rowHeight is changed
   * @return number or null
   */
  JustifiedGallery.prototype.retrieveMaxRowHeight = function () {
    var newMaxRowHeight = null;
    var rowHeight = this.settings.rowHeight;
  
    if ($.type(this.settings.maxRowHeight) === 'string') {
      if (this.settings.maxRowHeight.match(/^[0-9]+%$/)) {
        newMaxRowHeight = rowHeight * parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100;
      } else {
        newMaxRowHeight = parseFloat(this.settings.maxRowHeight);
      }
    } else if ($.type(this.settings.maxRowHeight) === 'number') {
      newMaxRowHeight = this.settings.maxRowHeight;
    } else if (this.settings.maxRowHeight === false || this.settings.maxRowHeight == null) {
      return null;
    } else {
      throw 'maxRowHeight must be a number or a percentage';
    }
  
    // check if the converted value is not a number
    if (isNaN(newMaxRowHeight)) throw 'invalid number for maxRowHeight';
  
    // check values, maxRowHeight must be >= rowHeight
    if (newMaxRowHeight < rowHeight) newMaxRowHeight = rowHeight;
  
    return newMaxRowHeight;
  };
  
  /**
   * Checks the settings
   */
  JustifiedGallery.prototype.checkSettings = function () {
    this.checkSizeRangesSuffixes();
  
    this.checkOrConvertNumber(this.settings, 'rowHeight');
    this.checkOrConvertNumber(this.settings, 'margins');
    this.checkOrConvertNumber(this.settings, 'border');
  
    var lastRowModes = [
      'justify',
      'nojustify',
      'left',
      'center',
      'right',
      'hide'
    ];
    if (lastRowModes.indexOf(this.settings.lastRow) === -1) {
      throw 'lastRow must be one of: ' + lastRowModes.join(', ');
    }
  
    this.checkOrConvertNumber(this.settings, 'justifyThreshold');
    if (this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) {
      throw 'justifyThreshold must be in the interval [0,1]';
    }
    if ($.type(this.settings.cssAnimation) !== 'boolean') {
      throw 'cssAnimation must be a boolean';
    }
  
    if ($.type(this.settings.captions) !== 'boolean') throw 'captions must be a boolean';
    this.checkOrConvertNumber(this.settings.captionSettings, 'animationDuration');
  
    this.checkOrConvertNumber(this.settings.captionSettings, 'visibleOpacity');
    if (this.settings.captionSettings.visibleOpacity < 0 ||
        this.settings.captionSettings.visibleOpacity > 1) {
      throw 'captionSettings.visibleOpacity must be in the interval [0, 1]';
    }
  
    this.checkOrConvertNumber(this.settings.captionSettings, 'nonVisibleOpacity');
    if (this.settings.captionSettings.nonVisibleOpacity < 0 ||
        this.settings.captionSettings.nonVisibleOpacity > 1) {
      throw 'captionSettings.nonVisibleOpacity must be in the interval [0, 1]';
    }
  
    this.checkOrConvertNumber(this.settings, 'imagesAnimationDuration');
    this.checkOrConvertNumber(this.settings, 'refreshTime');
    this.checkOrConvertNumber(this.settings, 'refreshSensitivity');
    if ($.type(this.settings.randomize) !== 'boolean') throw 'randomize must be a boolean';
    if ($.type(this.settings.selector) !== 'string') throw 'selector must be a string';
  
    if (this.settings.sort !== false && !$.isFunction(this.settings.sort)) {
      throw 'sort must be false or a comparison function';
    }
  
    if (this.settings.filter !== false && !$.isFunction(this.settings.filter) &&
        $.type(this.settings.filter) !== 'string') {
      throw 'filter must be false, a string or a filter function';
    }
  };
  
  /**
   * It brings all the indexes from the sizeRangeSuffixes and it orders them. They are then sorted and returned.
   * @returns {Array} sorted suffix ranges
   */
  JustifiedGallery.prototype.retrieveSuffixRanges = function () {
    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(parseInt(rangeIdx, 10));
    }
    suffixRanges.sort(function (a, b) { return a > b ? 1 : a < b ? -1 : 0; });
    return suffixRanges;
  };
  
  /**
   * Update the existing settings only changing some of them
   *
   * @param newSettings the new settings (or a subgroup of them)
   */
  JustifiedGallery.prototype.updateSettings = function (newSettings) {
    // In this case Justified Gallery has been called again changing only some options
    this.settings = $.extend({}, this.settings, newSettings);
    this.checkSettings();
  
    // As reported in the settings: negative value = same as margins, 0 = disabled
    this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins;
  
    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
  };
  
  JustifiedGallery.prototype.defaults = {
    sizeRangeSuffixes: { }, /* e.g. Flickr configuration
        {
          100: '_t',  // used when longest is less than 100px
          240: '_m',  // used when longest is between 101px and 240px
          320: '_n',  // ...
          500: '',
          640: '_z',
          1024: '_b'  // used as else case because it is the last
        }
    */
    thumbnailPath: undefined, /* If defined, sizeRangeSuffixes is not used, and this function is used to determine the
    path relative to a specific thumbnail size. The function should accept respectively three arguments:
    current path, width and height */
    rowHeight: 120, // required? required to be > 0?
    maxRowHeight: false, // false or negative value to deactivate. Positive number to express the value in pixels,
                         // A string '[0-9]+%' to express in percentage (e.g. 300% means that the row height
                         // can't exceed 3 * rowHeight)
    margins: 1,
    border: -1, // negative value = same as margins, 0 = disabled, any other value to set the border
  
    lastRow: 'nojustify', // … which is the same as 'left', or can be 'justify', 'center', 'right' or 'hide'
  
    justifyThreshold: 0.90, /* if row width / available space > 0.90 it will be always justified
                             * (i.e. lastRow setting is not considered) */
    waitThumbnailsLoad: true,
    captions: true,
    cssAnimation: true,
    imagesAnimationDuration: 500, // ignored with css animations
    captionSettings: { // ignored with css animations
      animationDuration: 500,
      visibleOpacity: 0.7,
      nonVisibleOpacity: 0.0
    },
    rel: null, // rewrite the rel of each analyzed links
    target: null, // rewrite the target of all links
    extension: /\.[^.\\/]+$/, // regexp to capture the extension of an image
    refreshTime: 200, // time interval (in ms) to check if the page changes its width
    refreshSensitivity: 0, // change in width allowed (in px) without re-building the gallery
    randomize: false,
    rtl: false, // right-to-left mode
    sort: false, /*
      - false: to do not sort
      - function: to sort them using the function as comparator (see Array.prototype.sort())
    */
    filter: false, /*
      - false, null or undefined: for a disabled filter
      - a string: an entry is kept if entry.is(filter string) returns true
                  see jQuery's .is() function for further information
      - a function: invoked with arguments (entry, index, array). Return true to keep the entry, false otherwise.
                    It follows the specifications of the Array.prototype.filter() function of JavaScript.
    */
    selector: 'a, div:not(.spinner)', // The selector that is used to know what are the entries of the gallery
    imgSelector: '> img, > a > img', // The selector that is used to know what are the images of each entry
    triggerEvent: function (event) { // This is called to trigger events, the default behavior is to call $.trigger
      this.$gallery.trigger(event);  // Consider that 'this' is this set to the JustifiedGallery object, so it can
    }                                // access to fields such as $gallery, useful to trigger events with jQuery.
  };

  /**
   * Justified Gallery plugin for jQuery
   *
   * Events
   *  - jg.complete : called when all the gallery has been created
   *  - jg.resize : called when the gallery has been resized
   *  - jg.rowflush : when a new row appears
   *
   * @param arg the action (or the settings) passed when the plugin is called
   * @returns {*} the object itself
   */
  $.fn.justifiedGallery = function (arg) {
    return this.each(function (index, gallery) {

      var $gallery = $(gallery);
      $gallery.addClass('justified-gallery');

      var controller = $gallery.data('jg.controller');
      if (typeof controller === 'undefined') {
        // Create controller and assign it to the object data
        if (typeof arg !== 'undefined' && arg !== null && $.type(arg) !== 'object') {
          if (arg === 'destroy') return; // Just a call to an unexisting object
          throw 'The argument must be an object';
        }
        controller = new JustifiedGallery($gallery, $.extend({}, JustifiedGallery.prototype.defaults, arg));
        $gallery.data('jg.controller', controller);
      } else if (arg === 'norewind') {
        // In this case we don't rewind: we analyze only the latest images (e.g. to complete the last unfinished row
        // ... left to be more readable
      } else if (arg === 'destroy') {
        controller.destroy();
        return;
      } else {
        // In this case Justified Gallery has been called again changing only some options
        controller.updateSettings(arg);
        controller.rewind();
      }

      // Update the entries list
      if (!controller.updateEntries(arg === 'norewind')) return;

      // Init justified gallery
      controller.init();

    });
  };

}));

/***/ }),
/* 1300 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// DOM.event.move
//
// 2.0.0
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:     Page coordinates of pointer.
// startX:
// startY:    Page coordinates of pointer at movestart.
// distX:
// distY:     Distance the pointer has moved since movestart.
// deltaX:
// deltaY:    Distance the finger has moved since last event.
// velocityX:
// velocityY: Average velocity over last few events.


(function(fn) {
	if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (fn),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(function(){
	var assign = Object.assign || window.jQuery && jQuery.extend;

	// Number of pixels a pressed pointer travels before movestart
	// event is fired.
	var threshold = 8;

	// Shim for requestAnimationFrame, falling back to timer. See:
	// see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	var requestFrame = (function(){
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(fn, element){
				return window.setTimeout(function(){
					fn();
				}, 25);
			}
		);
	})();
	
	// Shim for customEvent
	// see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
	(function () {
		if ( typeof window.CustomEvent === "function" ) return false;
		function CustomEvent ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}
		
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	})();

	var ignoreTags = {
			textarea: true,
			input: true,
			select: true,
			button: true
		};

	var mouseevents = {
		move:   'mousemove',
		cancel: 'mouseup dragstart',
		end:    'mouseup'
	};

	var touchevents = {
		move:   'touchmove',
		cancel: 'touchend',
		end:    'touchend'
	};

	var rspaces = /\s+/;


	// DOM Events

	var eventOptions = { bubbles: true, cancelable: true };

	var eventsSymbol = typeof Symbol === "function" ? Symbol('events') : {};

	function createEvent(type) {
		return new CustomEvent(type, eventOptions);
	}

	function getEvents(node) {
		return node[eventsSymbol] || (node[eventsSymbol] = {});
	}

	function on(node, types, fn, data, selector) {
		types = types.split(rspaces);

		var events = getEvents(node);
		var i = types.length;
		var handlers, type;

		function handler(e) { fn(e, data); }

		while (i--) {
			type = types[i];
			handlers = events[type] || (events[type] = []);
			handlers.push([fn, handler]);
			node.addEventListener(type, handler);
		}
	}

	function off(node, types, fn, selector) {
		types = types.split(rspaces);

		var events = getEvents(node);
		var i = types.length;
		var type, handlers, k;

		if (!events) { return; }

		while (i--) {
			type = types[i];
			handlers = events[type];
			if (!handlers) { continue; }
			k = handlers.length;
			while (k--) {
				if (handlers[k][0] === fn) {
					node.removeEventListener(type, handlers[k][1]);
					handlers.splice(k, 1);
				}
			}
		}
	}

	function trigger(node, type, properties) {
		// Don't cache events. It prevents you from triggering an event of a
		// given type from inside the handler of another event of that type.
		var event = createEvent(type);
		if (properties) { assign(event, properties); }
		node.dispatchEvent(event);
	}


	// Constructors

	function Timer(fn){
		var callback = fn,
		    active = false,
		    running = false;

		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}

		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};

		this.end = function(fn) {
			var cb = callback;

			if (!fn) { return; }

			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } :
					fn ;

				active = true;
			}
		};
	}


	// Functions

	function noop() {}

	function preventDefault(e) {
		e.preventDefault();
	}

	function isIgnoreTag(e) {
		return !!ignoreTags[e.target.tagName.toLowerCase()];
	}

	function isPrimaryButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}

		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...

		i = -1;
		l = touchList.length;

		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, data) {
		var touch = identifiedTouch(e.changedTouches, data.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === data.pageX && touch.pageY === data.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered

	function mousedown(e){
		// Ignore non-primary buttons
		if (!isPrimaryButton(e)) { return; }

		// Ignore form and interactive elements
		if (isIgnoreTag(e)) { return; }

		on(document, mouseevents.move, mousemove, e);
		on(document, mouseevents.cancel, mouseend, e);
	}

	function mousemove(e, data){
		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e, data) {
		removeMouse();
	}

	function removeMouse() {
		off(document, mouseevents.move, mousemove);
		off(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		// Don't get in the way of interaction with form elements
		if (ignoreTags[e.target.tagName.toLowerCase()]) { return; }

		var touch = e.changedTouches[0];

		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		var data = {
			target:     touch.target,
			pageX:      touch.pageX,
			pageY:      touch.pageY,
			identifier: touch.identifier,

			// The only way to make handlers individually unbindable is by
			// making them unique.
			touchmove:  function(e, data) { touchmove(e, data); },
			touchend:   function(e, data) { touchend(e, data); }
		};

		on(document, touchevents.move, data.touchmove, data);
		on(document, touchevents.cancel, data.touchend, data);
	}

	function touchmove(e, data) {
		var touch = changedTouch(e, data);
		if (!touch) { return; }
		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e, data) {
		var touch = identifiedTouch(e.changedTouches, data.identifier);
		if (!touch) { return; }
		removeTouch(data);
	}

	function removeTouch(data) {
		off(document, touchevents.move, data.touchmove);
		off(document, touchevents.cancel, data.touchend);
	}

	function checkThreshold(e, data, touch, fn) {
		var distX = touch.pageX - data.pageX;
		var distY = touch.pageY - data.pageY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, data, touch, distX, distY, fn);
	}

	function triggerStart(e, data, touch, distX, distY, fn) {
		var touches = e.targetTouches;
		var time = e.timeStamp - data.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		var template = {
			altKey:     e.altKey,
			ctrlKey:    e.ctrlKey,
			shiftKey:   e.shiftKey,
			startX:     data.pageX,
			startY:     data.pageY,
			distX:      distX,
			distY:      distY,
			deltaX:     distX,
			deltaY:     distY,
			pageX:      touch.pageX,
			pageY:      touch.pageY,
			velocityX:  distX / time,
			velocityY:  distY / time,
			identifier: data.identifier,
			targetTouches: touches,
			finger: touches ? touches.length : 1,
			enableMove: function() {
				this.moveEnabled = true;
				this.enableMove = noop;
				e.preventDefault();
			}
		};

		// Trigger the movestart event.
		trigger(data.target, 'movestart', template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(data);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e, data) {
		var timer  = data.timer;

		data.touch = e;
		data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeMouseend(e, data) {
		var target = data.target;
		var event  = data.event;
		var timer  = data.timer;

		removeActiveMouse();

		endEvent(target, event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				off(target, 'click', preventDefault);
			}, 0);
		});
	}

	function removeActiveMouse() {
		off(document, mouseevents.move, activeMousemove);
		off(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e, data) {
		var event = data.event;
		var timer = data.timer;
		var touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		data.touch = touch;
		data.timeStamp = e.timeStamp;

		timer.kick();
	}

	function activeTouchend(e, data) {
		var target = data.target;
		var event  = data.event;
		var timer  = data.timer;
		var touch  = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(data);
		endEvent(target, event, timer);
	}

	function removeActiveTouch(data) {
		off(document, touchevents.move, data.activeTouchmove);
		off(document, touchevents.end, data.activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp) {
		var time = timeStamp - event.timeStamp;

		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;

		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;
	}

	function endEvent(target, event, timer, fn) {
		timer.end(function(){
			trigger(target, 'moveend', event);
			return fn && fn();
		});
	}


	// Set up the DOM

	function movestart(e) {
		if (e.defaultPrevented) { return; }
		if (!e.moveEnabled) { return; }

		var event = {
			startX:        e.startX,
			startY:        e.startY,
			pageX:         e.pageX,
			pageY:         e.pageY,
			distX:         e.distX,
			distY:         e.distY,
			deltaX:        e.deltaX,
			deltaY:        e.deltaY,
			velocityX:     e.velocityX,
			velocityY:     e.velocityY,
			identifier:    e.identifier,
			targetTouches: e.targetTouches,
			finger:        e.finger
		};

		var data = {
			target:    e.target,
			event:     event,
			timer:     new Timer(update),
			touch:     undefined,
			timeStamp: e.timeStamp
		};

		function update(time) {
			updateEvent(event, data.touch, data.timeStamp);
			trigger(data.target, 'move', event);
		}

		if (e.identifier === undefined) {
			// We're dealing with a mouse event.
			// Stop clicks from propagating during a move
			on(e.target, 'click', preventDefault);
			on(document, mouseevents.move, activeMousemove, data);
			on(document, mouseevents.end, activeMouseend, data);
		}
		else {
			// In order to unbind correct handlers they have to be unique
			data.activeTouchmove = function(e, data) { activeTouchmove(e, data); };
			data.activeTouchend = function(e, data) { activeTouchend(e, data); };

			// We're dealing with a touch.
			on(document, touchevents.move, data.activeTouchmove, data);
			on(document, touchevents.end, data.activeTouchend, data);
		}
	}

	on(document, 'mousedown', mousedown);
	on(document, 'touchstart', touchstart);
	on(document, 'movestart', movestart);


	// jQuery special events
	//
	// jQuery event objects are copies of DOM event objects. They need
	// a little help copying the move properties across.

	if (!window.jQuery) { return; }

	var properties = ("startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY").split(' ');

	function enableMove1(e) { e.enableMove(); }
	function enableMove2(e) { e.enableMove(); }
	function enableMove3(e) { e.enableMove(); }

	function add(handleObj) {
		var handler = handleObj.handler;

		handleObj.handler = function(e) {
			// Copy move properties across from originalEvent
			var i = properties.length;
			var property;

			while(i--) {
				property = properties[i];
				e[property] = e.originalEvent[property];
			}

			handler.apply(this, arguments);
		};
	}

	jQuery.event.special.movestart = {
		setup: function() {
			// Movestart must be enabled to allow other move events
			on(this, 'movestart', enableMove1);

			// Do listen to DOM events
			return false;
		},

		teardown: function() {
			off(this, 'movestart', enableMove1);
			return false;
		},

		add: add
	};

	jQuery.event.special.move = {
		setup: function() {
			on(this, 'movestart', enableMove2);
			return false;
		},

		teardown: function() {
			off(this, 'movestart', enableMove2);
			return false;
		},

		add: add
	};

	jQuery.event.special.moveend = {
		setup: function() {
			on(this, 'movestart', enableMove3);
			return false;
		},

		teardown: function() {
			off(this, 'movestart', enableMove3);
			return false;
		},

		add: add
	};
});


/***/ }),
/* 1301 */
/***/ (function(module, exports) {

(function($){

  $.fn.twentytwenty = function(options) {
    var options = $.extend({
      default_offset_pct: 0.5,
      orientation: 'horizontal',
      before_label: 'Before',
      after_label: 'After',
      no_overlay: false,
      move_slider_on_hover: false,
      move_with_handle_only: true,
      click_to_move: false
    }, options);

    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';


      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      if(!options.no_overlay) {
        container.append("<div class='twentytwenty-overlay'></div>");
      }
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");
      slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");

      var overlay = container.find(".twentytwenty-overlay");
      overlay.append("<div class='twentytwenty-before-label' data-content='"+options.before_label+"'></div>");
      overlay.append("<div class='twentytwenty-after-label' data-content='"+options.after_label+"'></div>");

      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h = beforeImg.height();
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px"
        };
      };

      var adjustContainer = function(offset) {
      	if (sliderOrientation === 'vertical') {
          beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
          afterImg.css("clip", "rect("+offset.ch+","+offset.w+","+offset.h+",0)");
      	}
      	else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
          afterImg.css("clip", "rect(0,"+offset.w+","+offset.h+","+offset.cw+")");
    	}
        container.css("height", offset.h);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      };

      // Return the number specified or the min/max number if it outside the range given.
      var minMaxNumber = function(num, min, max) {
        return Math.max(min, Math.min(max, num));
      };

      // Calculate the slider percentage based on the position.
      var getSliderPercentage = function(positionX, positionY) {
        var sliderPercentage = (sliderOrientation === 'vertical') ?
          (positionY-offsetY)/imgHeight :
          (positionX-offsetX)/imgWidth;

        return minMaxNumber(sliderPercentage, 0, 1);
      };


      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var offsetY = 0;
      var imgWidth = 0;
      var imgHeight = 0;
      var onMoveStart = function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width(); 
        imgHeight = beforeImg.height();          
      };
      var onMove = function(e) {
        if (container.hasClass("active")) {
          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        }
      };
      var onMoveEnd = function() {
          container.removeClass("active");
      };

      var moveTarget = options.move_with_handle_only ? slider : container;
      moveTarget.on("movestart",onMoveStart);
      moveTarget.on("move",onMove);
      moveTarget.on("moveend",onMoveEnd);

      if (options.move_slider_on_hover) {
        container.on("mouseenter", onMoveStart);
        container.on("mousemove", onMove);
        container.on("mouseleave", onMoveEnd);
      }

      slider.on("touchmove", function(e) {
        e.preventDefault();
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      if (options.click_to_move) {
        container.on('click', function(e) {
          offsetX = container.offset().left;
          offsetY = container.offset().top;
          imgWidth = beforeImg.width();
          imgHeight = beforeImg.height();

          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        });
      }

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);


/***/ }),
/* 1302 */,
/* 1303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/polyfill/lib/index.js
var lib = __webpack_require__(1109);

// EXTERNAL MODULE: ./src/styles/style.scss
var style = __webpack_require__(1295);

// EXTERNAL MODULE: external "jQuery"
var external_jQuery_ = __webpack_require__(18);
var external_jQuery_default = /*#__PURE__*/__webpack_require__.n(external_jQuery_);

// CONCATENATED MODULE: ./src/components/controls/background-controls/script.js

external_jQuery_default()(function ($) {
  var $window = $(window);

  $.fn.gutenbeeParallax = function (opts) {
    var options = $.extend({}, {
      speed: null,
      direction: null
    }, opts);
    var $elements = this.each(function () {
      var $this = $(this);
      var speed = options.speed || $this.data('parallax-speed');
      $this.css({
        height: 100 + speed * 100 + '%'
      });
    });

    function update() {
      var wheight = $window.height();
      var wscroll = $window.scrollTop();
      $elements.each(function () {
        var $this = $(this);
        var $parent = $this.parent();
        var elHeight = $parent.outerHeight();
        var heightDelta = $this.outerHeight() - elHeight;
        var elTop = $parent.offset().top + elHeight;
        var scrollPercentage = (elTop - wscroll) / (wheight + elHeight);
        var ypos = (scrollPercentage - 1) * heightDelta;
        $this.css({
          transform: 'translateY(' + ypos + 'px)'
        });
      });
    }

    var requestParallaxUpdate = function requestParallaxUpdate() {
      window.requestAnimationFrame(update);
    };

    $window.on('scroll', requestParallaxUpdate).on('resize', requestParallaxUpdate);
    update();

    $.fn.gutenbeeParallax.destroy = function () {
      $elements.each(function () {
        var $this = $(this);
        $this.css({
          height: '100%',
          transform: 'none'
        });
      });
      $window.off('scroll', requestParallaxUpdate).off('resize', requestParallaxUpdate);
    };

    return $elements;
  };

  $('.gutenbee-parallax').gutenbeeParallax();
});
// EXTERNAL MODULE: ./node_modules/slick-carousel/slick/slick.js
var slick = __webpack_require__(1298);

// CONCATENATED MODULE: ./src/blocks/slideshow/script.js


external_jQuery_default()(function ($) {
  var $window = $(window);
  $window.on('load', function () {
    var $slideshow = $('.wp-block-gutenbee-slideshow');
    $slideshow.each(function () {
      var $this = $(this);
      $this.slick({
        arrows: $this.data('arrows'),
        dots: $this.data('dots'),
        autoplay: $this.data('autoplay'),
        fade: $this.data('fade'),
        infinite: $this.data('infinite'),
        speed: $this.data('speed'),
        autoplaySpeed: $this.data('autoplay-speed'),
        slidesToScroll: $this.data('slides-to-scroll'),
        slidesToShow: $this.data('slides-to-show'),
        pauseOnHover: $this.data('pause-on-hover'),
        slide: '.gutenbee-slideshow-item',
        customPaging: function customPaging() {
          return $('<button type="button" />').css({
            backgroundColor: $this.data('dots-color')
          });
        }
      });
    });
  });
});
// EXTERNAL MODULE: ./node_modules/countup/dist/countUp.min.js
var countUp_min = __webpack_require__(414);
var countUp_min_default = /*#__PURE__*/__webpack_require__.n(countUp_min);

// CONCATENATED MODULE: ./src/blocks/countup/script.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


document.addEventListener('DOMContentLoaded', function () {
  var elements = document.getElementsByClassName('wp-block-gutenbee-countup-number');

  _toConsumableArray(elements).forEach(function (element) {
    var separator = element.dataset.separator;
    var options = {
      useGrouping: !!separator,
      separator: separator,
      prefix: element.dataset.prefix,
      suffix: element.dataset.suffix
    };
    var countup = new countUp_min_default.a(element, element.dataset.start, element.dataset.end, 0, element.dataset.animationDuration, options);

    if (!countup.error) {
      countup.start();
    }
  });
});
// EXTERNAL MODULE: ./node_modules/justifiedGallery/dist/js/jquery.justifiedGallery.js
var jquery_justifiedGallery = __webpack_require__(1299);

// CONCATENATED MODULE: ./src/blocks/justified-gallery/script.js


external_jQuery_default()(function ($) {
  var $justifiedGallery = $('.wp-block-gutenbee-gallery-justified');
  $justifiedGallery.each(function () {
    var $this = $(this);
    var $content = $this.find('.wp-block-gutenbee-gallery-content');
    var $type = $this.data('gallery-type');

    if ($type !== 'justified') {
      return;
    }

    $content.justifiedGallery({
      rowHeight: $this.data('row-height'),
      margins: $this.data('margins'),
      lastRow: $this.data('last-row'),
      randomize: $this.data('randomize')
    });
  });
});
// CONCATENATED MODULE: ./src/blocks/google-maps/script.js

external_jQuery_default()(function ($) {
  var google = window.google;

  if (typeof google === 'undefined') {
    return;
  }

  var $maps = $('.wp-block-gutenbee-google-maps > div, .wp-block-gutenbee-google-maps');
  $maps.each(function () {
    var $this = $(this);
    var location = {
      lat: parseFloat($this.data('latitude')),
      lng: parseFloat($this.data('longitude'))
    };
    var info = $this.data('info-window');

    if (!location.lat || !location.lng) {
      return;
    }

    var map = new google.maps.Map($this.get(0), {
      zoom: $this.data('zoom'),
      center: location,
      scrollwheel: !$this.data('prevent-scroll'),
      styles: $this.data('map-style')
    });
    var marker = new google.maps.Marker({
      position: location,
      icon: $this.data('marker-icon'),
      map: map
    });
    var infoWindow = new google.maps.InfoWindow({
      content: info,
      maxWidth: 350
    });

    if (info) {
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
  });
});
// EXTERNAL MODULE: ./src/util/CountdownTimer.js
var CountdownTimer = __webpack_require__(104);

// CONCATENATED MODULE: ./src/blocks/countdown/script.js


external_jQuery_default()(function ($) {
  var $countdown = $('.wp-block-gutenbee-countdown');
  $countdown.each(function () {
    var $this = $(this);
    var date = $this.data('date') || '1900-01-01T00:00:00'; // eslint-disable-next-line no-new

    new CountdownTimer["a" /* default */]($this.get(0), date);
  });
});
// EXTERNAL MODULE: ./node_modules/zurb-twentytwenty/js/jquery.event.move.js
var jquery_event_move = __webpack_require__(1300);

// EXTERNAL MODULE: ./node_modules/zurb-twentytwenty/js/jquery.twentytwenty.js
var jquery_twentytwenty = __webpack_require__(1301);

// CONCATENATED MODULE: ./src/blocks/image-comparison/script.js



external_jQuery_default()(function ($) {
  $(window).load(function () {
    $('.wp-block-gutenbee-comparison-wrap').each(function () {
      var $this = $(this);
      $this.twentytwenty({
        default_offset_pct: $this.data('offset') / 100
      });
    });
  });
});
// CONCATENATED MODULE: ./src/blocks/accordion/script.js

external_jQuery_default()(function ($) {
  var expandedClass = 'wp-block-gutenbee-accordion-item-expanded';
  var $titles = $('.wp-block-gutenbee-accordion-item-title');
  var $defaultExpanded = $(".".concat(expandedClass));
  $defaultExpanded.find('.wp-block-gutenbee-accordion-item-content-wrap').slideDown(350);
  $titles.on('click', function () {
    var $this = $(this);
    var $accordion = $this.parents('.wp-block-gutenbee-accordion');
    var $item = $this.parent('.wp-block-gutenbee-accordion-item');
    var $content = $item.find('.wp-block-gutenbee-accordion-item-content-wrap');
    var collapseOthers = $accordion.data('collapse-others');

    if ($item.hasClass(expandedClass)) {
      $content.slideUp(350);
      $item.removeClass(expandedClass);
    } else {
      if (collapseOthers) {
        $item.siblings().removeClass(expandedClass).find('.wp-block-gutenbee-accordion-item-content-wrap').slideUp(350);
      }

      $content.slideDown(350);
      $item.addClass(expandedClass);
    }
  });
});
// CONCATENATED MODULE: ./src/blocks/tabs/script.js

external_jQuery_default()(function ($) {
  var prefix = 'wp-block-gutenbee-tabs';
  var $tabs = $(".".concat(prefix));
  $tabs.each(function () {
    var $this = $(this);
    var $titles = $this.find(".".concat(prefix, "-nav-item"));
    var $tabContents = $this.find(".".concat(prefix, "-tab-content"));
    $titles.on('click', function (event) {
      event.preventDefault();
      var $title = $(this);
      var index = $title.index();
      $title.addClass("".concat(prefix, "-nav-item-active")).siblings().removeClass("".concat(prefix, "-nav-item-active"));
      $tabContents.hide();
      $tabContents.eq(index).fadeIn('fast');
    });
  });
});
// EXTERNAL MODULE: ./src/util/video/providers.js
var providers = __webpack_require__(17);

// CONCATENATED MODULE: ./src/blocks/video-embed/script.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



external_jQuery_default()(function ($) {
  var $videoEmbed = $('.gutenbee-video-embed');
  var $videoWrap = $videoEmbed.parents('.gutenbee-video-embed-wrapper');

  var attrState = function attrState(attr) {
    return 'true' === attr ? 1 : 0;
  }; // YouTube videos


  var onYouTubeApiReady = function onYouTubeApiReady(videoEmbed) {
    var $dataset = videoEmbed[0].dataset;
    var $video = $(videoEmbed).find('div').get(0);
    var $overlay = $(videoEmbed).siblings('.gutenbee-video-embed-overlay'); // eslint-disable-next-line no-unused-vars

    var ytPlayer = new window.YT.Player($video, {
      videoId: $dataset.videoId,
      playerVars: {
        autoplay: $dataset.videoAutoplay ? attrState($dataset.videoAutoplay) : 0,
        controls: $dataset.videoControls ? attrState($dataset.videoControls) : 0,
        showinfo: 0,
        modestbranding: $dataset.videoBranding ? attrState($dataset.videoBranding) : 0,
        loop: $dataset.videoLoop ? attrState($dataset.videoLoop) : 0,
        playlist: $dataset.videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0,
        mute: $dataset.videoMute ? attrState($dataset.videoMute) : 0,
        start: parseInt($dataset.videoStart, 10) || undefined,
        end: parseInt($dataset.videoEnd, 10) || undefined
      },
      events: {
        onReady: function onReady() {
          if ('true' === $dataset.videoAutoplay && $overlay.length) {
            $overlay.fadeOut();
          } else if ('false' === $dataset.videoAutoplay && $overlay.length && 'true' === $dataset.videoLazy) {
            $overlay.fadeOut;
            ytPlayer.playVideo();
          } else if ('false' === $dataset.videoAutoplay && $overlay.length) {
            $overlay.on('click', function () {
              $overlay.find('div').addClass('gutenbee-spinner').removeClass('play-button');
              ytPlayer.playVideo();
            });
          }
        },
        onStateChange: function onStateChange(event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            $overlay.fadeOut();
          }
        }
      }
    });
  }; // Vimeo videos


  var onVimeoApiReady = function onVimeoApiReady(videoEmbed) {
    var $dataset = videoEmbed[0].dataset;
    var $overlay = $(videoEmbed).siblings('.gutenbee-video-embed-overlay');
    var player = new window.Vimeo.Player(videoEmbed, {
      id: $dataset.videoId,
      loop: $dataset.videoLoop ? attrState($dataset.videoLoop) : 0,
      autoplay: $dataset.videoAutoplay ? attrState($dataset.videoAutoplay) : 0,
      controls: $dataset.videoControls ? attrState($dataset.videoControls) : 0,
      byline: false,
      title: false,
      autopause: false,
      muted: $dataset.videoMute ? attrState($dataset.videoMute) : 0
    });

    if ($dataset.videoStart) {
      player.setCurrentTime($dataset.videoStart);
    }

    player.on('loaded', function () {
      if ('true' === $dataset.videoAutoplay && $overlay.length) {
        $overlay.fadeOut();
      } else if ('false' === $dataset.videoAutoplay && $overlay.length && 'true' === $dataset.videoLazy) {
        player.play();
        player.on('play', function () {
          $overlay.fadeOut();
        });
      } else if ('false' === $dataset.videoAutoplay && $overlay.length) {
        $overlay.on('click', function () {
          $overlay.find('div').addClass('gutenbee-spinner').removeClass('play-button');
          player.play();
          player.on('play', function () {
            $overlay.fadeOut();
          });
        });
      }
    });
  };

  var createEmbed = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(firstScript, videoType, videoEmbed) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(videoType === 'youtube')) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return Object(providers["c" /* maybeLoadYouTubeApi */])();

            case 3:
              onYouTubeApiReady(videoEmbed);

            case 4:
              if (!(videoType === 'vimeo')) {
                _context.next = 8;
                break;
              }

              _context.next = 7;
              return Object(providers["b" /* maybeLoadVimeoApi */])();

            case 7:
              onVimeoApiReady(videoEmbed);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function createEmbed(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  $videoWrap.on('click', function () {
    var $this = $(this);
    var embedLoaded = $this.find('iframe').length;
    var $overlay = $this.find('.gutenbee-video-embed-overlay');
    var $videoEmbed = $this.find('.gutenbee-video-embed');
    var $firstScript = $('script');
    var videoType = $videoEmbed.data('video-type');

    if (embedLoaded) {
      return;
    }

    $overlay.find('div').removeClass('play-button');
    $overlay.find('div').addClass('gutenbee-spinner');
    createEmbed($firstScript, videoType, $videoEmbed);
  });
  $videoEmbed.each(function () {
    var $this = $(this);
    var firstScript = $('script');
    var $dataset = $this[0].dataset;
    var $overlay = $this.siblings('.gutenbee-video-embed-overlay');

    if (1 === $overlay.length && 'false' === $dataset.videoAutoplay) {
      $overlay.find('div').addClass('play-button');
    } else if (1 === $overlay.length && 'true' === $dataset.videoAutoplay) {
      $overlay.find('div').addClass('gutenbee-spinner');
    }

    if (0 === $overlay.length || 'false' === $dataset.videoLazy) {
      createEmbed(firstScript, $dataset.videoType, $this);
    }
  });
  var $window = $(window);
  var $stickyWrap = $('.wp-block-gutenbee-video-embed-sticky');
  var $stickyVideoWrap = $stickyWrap.find('.gutenbee-video-embed-wrapper');
  var videoWrapHeight = $stickyWrap.outerHeight();
  var offset = 50;

  if ($stickyWrap.length) {
    $window.on('scroll', function () {
      var windowScrollTop = $window.scrollTop();
      var videoBottom = videoWrapHeight + $stickyWrap.offset().top;

      if (windowScrollTop > videoBottom + offset) {
        if (!$stickyVideoWrap.hasClass('closed') && !$stickyVideoWrap.hasClass('stuck')) {
          $stickyWrap.height(videoWrapHeight);
          $stickyVideoWrap.addClass('stuck');
          $stickyVideoWrap.append('<span class="close">×</span>');
          var $close = $($stickyVideoWrap).find('.close');
          $close.on('click', function () {
            var $videoId = $(this).siblings('.gutenbee-video-embed').find('iframe').attr('id');
            document.getElementById($videoId).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            $stickyVideoWrap.removeClass('stuck');
            $stickyVideoWrap.addClass('closed');
          });
        }
      } else {
        $stickyVideoWrap.removeClass('stuck');
        $stickyVideoWrap.find('.close').remove();
      }
    });
  }
});
// CONCATENATED MODULE: ./src/blocks/container/script.js
function script_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function script_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { script_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { script_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



external_jQuery_default()(function ($) {
  var $window = $(window);
  /* -----------------------------------------
  Video Backgrounds
  ----------------------------------------- */

  var $videoBg = $('.wp-block-gutenbee-container .wp-block-gutenbee-video-bg');
  var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper'); // YouTube videos

  function onYouTubeApiReady($videoBg) {
    var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    var videoId = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-id');
    var video = $videoBg.attr('id');
    new window.YT.Player(video, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        playlist: videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0
      },
      events: {
        onReady: function onReady(event) {
          event.target.mute();
        },
        onStateChange: function onStateChange(event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            $videoWrap.addClass('visible');
            adjustVideoSize($videoWrap);
          }
        }
      }
    });
  } // Vimeo videos


  function onVimeoApiReady($videoBg) {
    var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    var videoId = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-id');
    var player = new window.Vimeo.Player($videoBg, {
      id: videoId,
      loop: true,
      autoplay: true,
      byline: false,
      title: false,
      autopause: false,
      muted: true
    });
    player.setVolume(0);
    player.on('play', function () {
      $videoWrap.addClass('visible');
      adjustVideoSize($videoWrap);
    });
  }

  var videoResizeTimer;
  $window.on('resize.ciVideo', function () {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(function () {
      $videoWrap.each(function () {
        var $this = $(this);
        adjustVideoSize($this);
      });
    }, 350);
  });

  function getVideoSize($videoWrap) {
    var containerWidth = $videoWrap.outerWidth();
    var containerHeight = $videoWrap.outerHeight();
    var aspectRatio = 16 / 9;
    var ratioWidth = containerWidth / aspectRatio;
    var ratioHeight = containerHeight * aspectRatio;
    var isWidthFixed = containerWidth / containerHeight > aspectRatio;
    return {
      width: isWidthFixed ? containerWidth : ratioHeight,
      height: isWidthFixed ? ratioWidth : containerHeight
    };
  }

  function adjustVideoSize($videoWrap) {
    var size = getVideoSize($videoWrap);
    $videoWrap.find('iframe, video').css({
      width: size.width + 'px',
      height: size.height + 'px'
    });
  }

  if ($videoBg.length && window.innerWidth > 1080) {
    $videoBg.each( /*#__PURE__*/script_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var $this, videoType;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $this = $(this);
              videoType = $this.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-type');

              if (!(videoType === 'youtube')) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return Object(providers["c" /* maybeLoadYouTubeApi */])();

            case 5:
              onYouTubeApiReady($this);
              _context.next = 15;
              break;

            case 8:
              if (!(videoType === 'vimeo')) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return Object(providers["b" /* maybeLoadVimeoApi */])();

            case 11:
              onVimeoApiReady($this);
              _context.next = 15;
              break;

            case 14:
              if (videoType === 'self') {
                $videoWrap.addClass('visible');
                adjustVideoSize($videoWrap);
              }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  }
});
// CONCATENATED MODULE: ./src/blocks/banner/script.js

external_jQuery_default()(function ($) {
  var $window = $(window);
  /* -----------------------------------------
  Video Backgrounds
  ----------------------------------------- */

  var $videoBg = $('.wp-block-gutenbee-banner .wp-block-gutenbee-video-bg');
  var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper'); // YouTube videos

  function onYouTubeAPIReady($videoBg) {
    if (typeof window.YT === 'undefined' || typeof window.YT.Player === 'undefined') {
      return setTimeout(onYouTubeAPIReady.bind(null, $videoBg), 333);
    }

    var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    var videoId = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-id');
    var video = $videoBg.attr('id'); // eslint-disable-next-line no-unused-vars

    var ytPlayer = new window.YT.Player(video, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        playlist: videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0
      },
      events: {
        onReady: function onReady(event) {
          event.target.mute();
        },
        onStateChange: function onStateChange(event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            $videoWrap.addClass('visible');
            adjustVideoSize($videoWrap);
          }
        }
      }
    });
  } // Vimeo videos


  function onVimeoAPIReady($videoBg) {
    if (typeof Vimeo === 'undefined' || typeof window.Vimeo.Player === 'undefined') {
      return setTimeout(onVimeoAPIReady.bind(null, $videoBg), 333);
    }

    var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    var videoId = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-id');
    var player = new window.Vimeo.Player($videoBg, {
      id: videoId,
      loop: true,
      autoplay: true,
      byline: false,
      title: false,
      autopause: false,
      muted: true
    });
    player.setVolume(0);
    player.on('play', function () {
      $videoWrap.addClass('visible');
      adjustVideoSize($videoWrap);
    });
  }

  var videoResizeTimer;
  $window.on('resize.ciVideo', function () {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(function () {
      $videoWrap.each(function () {
        var $this = $(this);
        adjustVideoSize($this);
      });
    }, 350);
  });

  function getVideoSize($videoWrap) {
    var containerWidth = $videoWrap.outerWidth();
    var containerHeight = $videoWrap.outerHeight();
    var aspectRatio = 16 / 9;
    var ratioWidth = containerWidth / aspectRatio;
    var ratioHeight = containerHeight * aspectRatio;
    var isWidthFixed = containerWidth / containerHeight > aspectRatio;
    return {
      width: isWidthFixed ? containerWidth : ratioHeight,
      height: isWidthFixed ? ratioWidth : containerHeight
    };
  }

  function adjustVideoSize($videoWrap) {
    var size = getVideoSize($videoWrap);
    $videoWrap.find('iframe, video').css({
      width: size.width + 'px',
      height: size.height + 'px'
    });
  }

  if ($videoBg.length && window.innerWidth > 1080) {
    $videoBg.each(function () {
      var $this = $(this);
      var firstScript = $('script');
      var videoType = $this.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-type');

      if (videoType === 'youtube') {
        if (!$('#youtube-api-script').length) {
          var tag = $('<script />', {
            id: 'youtube-api-script'
          });
          tag.attr('src', 'https://www.youtube.com/player_api');
          firstScript.parent().prepend(tag);
        }

        onYouTubeAPIReady($this);
      } else if (videoType === 'vimeo') {
        if (!$('#vimeo-api-script').length) {
          var tag = $('<script />', {
            id: 'vimeo-api-script'
          });
          tag.attr('src', 'https://player.vimeo.com/api/player.js');
          firstScript.parent().prepend(tag);
        }

        onVimeoAPIReady($this);
      } else if (videoType === 'self') {
        $videoWrap.addClass('visible');
        adjustVideoSize($videoWrap);
      }
    });
  }
});
// CONCATENATED MODULE: ./src/blocks/tab-slider/script.js

external_jQuery_default()(function ($) {
  var prefix = 'wp-block-gutenbee-tab-slider';
  var $tabs = $(".".concat(prefix));
  $tabs.each(function () {
    var $this = $(this);
    var $titles = $this.find(".".concat(prefix, "-nav"));
    var $tabContents = $this.find(".".concat(prefix, "-content"));
    $titles.on('click', function (event) {
      event.preventDefault();
      var $title = $(this);
      var index = $title.index();
      $title.addClass("".concat(prefix, "-nav-item-active")).siblings().removeClass("".concat(prefix, "-nav-item-active"));
      $tabContents.hide();
      $tabContents.eq(index).fadeIn('fast');
    });
  });
});
// CONCATENATED MODULE: ./src/frontend.js
//
// Polyfill
//
 //
// Stylesheets
//

 //
// Control scripts
//

 //
// Block scripts
//












 // TODO only import this if there is an active lottie block
// import '@lottiefiles/lottie-player';

/***/ })
/******/ ]);