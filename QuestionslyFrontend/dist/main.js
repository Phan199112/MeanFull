(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js":
/*!********************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-svg-core/index.es.js ***!
  \********************************************************************/
/*! exports provided: icon, noAuto, config, toHtml, layer, text, counter, library, dom, parse, findIconDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icon", function() { return icon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noAuto", function() { return noAuto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toHtml", function() { return toHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "layer", function() { return layer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "counter", function() { return counter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "library", function() { return library; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dom", function() { return dom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIconDefinition", function() { return findIconDefinition; });
/*!
 * Font Awesome Free 5.1.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
var noop = function noop() {};

var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER$1 = null;
var _PERFORMANCE = { mark: noop, measure: noop };

try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER$1 = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

var _ref = _WINDOW.navigator || {};
var _ref$userAgent = _ref.userAgent;
var userAgent = _ref$userAgent === undefined ? '' : _ref$userAgent;

var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var MUTATION_OBSERVER = _MUTATION_OBSERVER$1;
var PERFORMANCE = _PERFORMANCE;

var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var UNITS_IN_GRID = 16;
var DEFAULT_FAMILY_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
var DATA_FA_I2SVG = 'data-fa-i2svg';
var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
var DATA_PREFIX = 'data-prefix';
var DATA_ICON = 'data-icon';
var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
var PRODUCTION = function () {
  try {
    return "development" === 'production';
  } catch (e) {
    return false;
  }
}();

var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];

var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter'].concat(oneToTen.map(function (n) {
  return n + 'x';
})).concat(oneToTwenty.map(function (n) {
  return 'w-' + n;
}));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');

  if (element) {
    return element.getAttribute(attr);
  }
}

function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  // For example <script data-search-pseudo-elements src="..."></script>
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];

  attrs.forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        attr = _ref2[0],
        key = _ref2[1];

    var val = coerce(getAttrConfig(attr));

    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}

var _default = _extends({
  familyPrefix: DEFAULT_FAMILY_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
}, initial);

if (!_default.autoReplaceSvg) _default.observeMutations = false;

var config = _extends({}, _default);

WINDOW.FontAwesomeConfig = config;

var w = WINDOW || {};

if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];

var namespace = w[NAMESPACE_IDENTIFIER];

var functions = [];
var listener = function listener() {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(function (fn) {
    return fn();
  });
};

var loaded = false;

if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);

  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}

var domready = function (fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
};

var d = UNITS_IN_GRID;

var meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};

function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}



function insertCss(css) {
  if (!css || !IS_DOM) {
    return;
  }

  var style = DOCUMENT.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;

  var headChildren = DOCUMENT.head.childNodes;
  var beforeChild = null;

  for (var i = headChildren.length - 1; i > -1; i--) {
    var child = headChildren[i];
    var tagName = (child.tagName || '').toUpperCase();
    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }

  DOCUMENT.head.insertBefore(style, beforeChild);

  return css;
}

var _uniqueId = 0;

function nextUniqueId() {
  _uniqueId++;

  return _uniqueId;
}

function toArray(obj) {
  var array = [];

  for (var i = (obj || []).length >>> 0; i--;) {
    array[i] = obj[i];
  }

  return array;
}

function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute('class') || '').split(' ').filter(function (i) {
      return i;
    });
  }
}

function getIconName(familyPrefix, cls) {
  var parts = cls.split('-');
  var prefix = parts[0];
  var iconName = parts.slice(1).join('-');

  if (prefix === familyPrefix && iconName !== '' && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}

function htmlEscape(str) {
  return ('' + str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
    return acc + (attributeName + '="' + htmlEscape(attributes[attributeName]) + '" ');
  }, '').trim();
}

function joinStyles(styles) {
  return Object.keys(styles || {}).reduce(function (acc, styleName) {
    return acc + (styleName + ': ' + styles[styleName] + ';');
  }, '');
}

function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}

function transformForSvg(_ref) {
  var transform = _ref.transform,
      containerWidth = _ref.containerWidth,
      iconWidth = _ref.iconWidth;

  var outer = {
    transform: 'translate(' + containerWidth / 2 + ' 256)'
  };
  var innerTranslate = 'translate(' + transform.x * 32 + ', ' + transform.y * 32 + ') ';
  var innerScale = 'scale(' + transform.size / 16 * (transform.flipX ? -1 : 1) + ', ' + transform.size / 16 * (transform.flipY ? -1 : 1) + ') ';
  var innerRotate = 'rotate(' + transform.rotate + ' 0 0)';
  var inner = {
    transform: innerTranslate + ' ' + innerScale + ' ' + innerRotate
  };
  var path = {
    transform: 'translate(' + iconWidth / 2 * -1 + ' -256)'
  };
  return {
    outer: outer,
    inner: inner,
    path: path
  };
}

function transformForCss(_ref2) {
  var transform = _ref2.transform,
      _ref2$width = _ref2.width,
      width = _ref2$width === undefined ? UNITS_IN_GRID : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === undefined ? UNITS_IN_GRID : _ref2$height,
      _ref2$startCentered = _ref2.startCentered,
      startCentered = _ref2$startCentered === undefined ? false : _ref2$startCentered;

  var val = '';

  if (startCentered && IS_IE) {
    val += 'translate(' + (transform.x / d - width / 2) + 'em, ' + (transform.y / d - height / 2) + 'em) ';
  } else if (startCentered) {
    val += 'translate(calc(-50% + ' + transform.x / d + 'em), calc(-50% + ' + transform.y / d + 'em)) ';
  } else {
    val += 'translate(' + transform.x / d + 'em, ' + transform.y / d + 'em) ';
  }

  val += 'scale(' + transform.size / d * (transform.flipX ? -1 : 1) + ', ' + transform.size / d * (transform.flipY ? -1 : 1) + ') ';
  val += 'rotate(' + transform.rotate + 'deg) ';

  return val;
}

var ALL_SPACE = {
  x: 0,
  y: 0,
  width: '100%',
  height: '100%'
};

var makeIconMasking = function (_ref) {
  var children = _ref.children,
      attributes = _ref.attributes,
      main = _ref.main,
      mask = _ref.mask,
      transform = _ref.transform;
  var mainWidth = main.width,
      mainPath = main.icon;
  var maskWidth = mask.width,
      maskPath = mask.icon;


  var trans = transformForSvg({ transform: transform, containerWidth: maskWidth, iconWidth: mainWidth });

  var maskRect = {
    tag: 'rect',
    attributes: _extends({}, ALL_SPACE, {
      fill: 'white'
    })
  };
  var maskInnerGroup = {
    tag: 'g',
    attributes: _extends({}, trans.inner),
    children: [{ tag: 'path', attributes: _extends({}, mainPath.attributes, trans.path, { fill: 'black' }) }]
  };
  var maskOuterGroup = {
    tag: 'g',
    attributes: _extends({}, trans.outer),
    children: [maskInnerGroup]
  };
  var maskId = 'mask-' + nextUniqueId();
  var clipId = 'clip-' + nextUniqueId();
  var maskTag = {
    tag: 'mask',
    attributes: _extends({}, ALL_SPACE, {
      id: maskId,
      maskUnits: 'userSpaceOnUse',
      maskContentUnits: 'userSpaceOnUse'
    }),
    children: [maskRect, maskOuterGroup]
  };
  var defs = {
    tag: 'defs',
    children: [{ tag: 'clipPath', attributes: { id: clipId }, children: [maskPath] }, maskTag]
  };

  children.push(defs, { tag: 'rect', attributes: _extends({ fill: 'currentColor', 'clip-path': 'url(#' + clipId + ')', mask: 'url(#' + maskId + ')' }, ALL_SPACE) });

  return {
    children: children,
    attributes: attributes
  };
};

var makeIconStandard = function (_ref) {
  var children = _ref.children,
      attributes = _ref.attributes,
      main = _ref.main,
      transform = _ref.transform,
      styles = _ref.styles;

  var styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  if (transformIsMeaningful(transform)) {
    var trans = transformForSvg({ transform: transform, containerWidth: main.width, iconWidth: main.width });
    children.push({
      tag: 'g',
      attributes: _extends({}, trans.outer),
      children: [{
        tag: 'g',
        attributes: _extends({}, trans.inner),
        children: [{
          tag: main.icon.tag,
          children: main.icon.children,
          attributes: _extends({}, main.icon.attributes, trans.path)
        }]
      }]
    });
  } else {
    children.push(main.icon);
  }

  return {
    children: children,
    attributes: attributes
  };
};

var asIcon = function (_ref) {
  var children = _ref.children,
      main = _ref.main,
      mask = _ref.mask,
      attributes = _ref.attributes,
      styles = _ref.styles,
      transform = _ref.transform;

  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    var width = main.width,
        height = main.height;

    var offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes['style'] = joinStyles(_extends({}, styles, {
      'transform-origin': offset.x + transform.x / 16 + 'em ' + (offset.y + transform.y / 16) + 'em'
    }));
  }

  return [{
    tag: 'svg',
    attributes: attributes,
    children: children
  }];
};

var asSymbol = function (_ref) {
  var prefix = _ref.prefix,
      iconName = _ref.iconName,
      children = _ref.children,
      attributes = _ref.attributes,
      symbol = _ref.symbol;

  var id = symbol === true ? prefix + '-' + config.familyPrefix + '-' + iconName : symbol;

  return [{
    tag: 'svg',
    attributes: {
      style: 'display: none;'
    },
    children: [{
      tag: 'symbol',
      attributes: _extends({}, attributes, { id: id }),
      children: children
    }]
  }];
};

function makeInlineSvgAbstract(params) {
  var _params$icons = params.icons,
      main = _params$icons.main,
      mask = _params$icons.mask,
      prefix = params.prefix,
      iconName = params.iconName,
      transform = params.transform,
      symbol = params.symbol,
      title = params.title,
      extra = params.extra,
      _params$watchable = params.watchable,
      watchable = _params$watchable === undefined ? false : _params$watchable;

  var _ref = mask.found ? mask : main,
      width = _ref.width,
      height = _ref.height;

  var widthClass = 'fa-w-' + Math.ceil(width / height * 16);
  var attrClass = [config.replacementClass, iconName ? config.familyPrefix + '-' + iconName : '', widthClass].filter(function (c) {
    return extra.classes.indexOf(c) === -1;
  }).concat(extra.classes).join(' ');

  var content = {
    children: [],
    attributes: _extends({}, extra.attributes, {
      'data-prefix': prefix,
      'data-icon': iconName,
      'class': attrClass,
      'role': 'img',
      'xmlns': 'http://www.w3.org/2000/svg',
      'viewBox': '0 0 ' + width + ' ' + height
    })
  };

  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = '';
  }

  if (title) content.children.push({ tag: 'title', attributes: { id: content.attributes['aria-labelledby'] || 'title-' + nextUniqueId() }, children: [title] });

  var args = _extends({}, content, {
    prefix: prefix,
    iconName: iconName,
    main: main,
    mask: mask,
    transform: transform,
    symbol: symbol,
    styles: extra.styles
  });

  var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),
      children = _ref2.children,
      attributes = _ref2.attributes;

  args.children = children;
  args.attributes = attributes;

  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}

function makeLayersTextAbstract(params) {
  var content = params.content,
      width = params.width,
      height = params.height,
      transform = params.transform,
      title = params.title,
      extra = params.extra,
      _params$watchable2 = params.watchable,
      watchable = _params$watchable2 === undefined ? false : _params$watchable2;


  var attributes = _extends({}, extra.attributes, title ? { 'title': title } : {}, {
    'class': extra.classes.join(' ')
  });

  if (watchable) {
    attributes[DATA_FA_I2SVG] = '';
  }

  var styles = _extends({}, extra.styles);

  if (transformIsMeaningful(transform)) {
    styles['transform'] = transformForCss({ transform: transform, startCentered: true, width: width, height: height });
    styles['-webkit-transform'] = styles['transform'];
  }

  var styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  var val = [];

  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });

  if (title) {
    val.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [title] });
  }

  return val;
}

function makeLayersCounterAbstract(params) {
  var content = params.content,
      title = params.title,
      extra = params.extra;


  var attributes = _extends({}, extra.attributes, title ? { 'title': title } : {}, {
    'class': extra.classes.join(' ')
  });

  var styleString = joinStyles(extra.styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  var val = [];

  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });

  if (title) {
    val.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [title] });
  }

  return val;
}

var noop$2 = function noop() {};
var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : { mark: noop$2, measure: noop$2 };
var preamble = 'FA "5.1.0"';

var begin = function begin(name) {
  p.mark(preamble + ' ' + name + ' begins');
  return function () {
    return end(name);
  };
};

var end = function end(name) {
  p.mark(preamble + ' ' + name + ' ends');
  p.measure(preamble + ' ' + name, preamble + ' ' + name + ' begins', preamble + ' ' + name + ' ends');
};

var perf = { begin: begin, end: end };

'use strict';

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
var bindInternal4 = function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

'use strict';



/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
var reduce = function fastReduceObject (subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, key, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

var styles$2 = namespace.styles;
var shims = namespace.shims;


var _byUnicode = {};
var _byLigature = {};
var _byOldName = {};

var build = function build() {
  var lookup = function lookup(reducer) {
    return reduce(styles$2, function (o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };

  _byUnicode = lookup(function (acc, icon, iconName) {
    acc[icon[3]] = iconName;

    return acc;
  });

  _byLigature = lookup(function (acc, icon, iconName) {
    var ligatures = icon[2];

    acc[iconName] = iconName;

    ligatures.forEach(function (ligature) {
      acc[ligature] = iconName;
    });

    return acc;
  });

  var hasRegular = 'far' in styles$2;

  _byOldName = reduce(shims, function (acc, shim) {
    var oldName = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];

    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }

    acc[oldName] = { prefix: prefix, iconName: iconName };

    return acc;
  }, {});
};

build();

function byUnicode(prefix, unicode) {
  return _byUnicode[prefix][unicode];
}

function byLigature(prefix, ligature) {
  return _byLigature[prefix][ligature];
}

function byOldName(name) {
  return _byOldName[name] || { prefix: null, iconName: null };
}

var styles$1 = namespace.styles;


var emptyCanonicalIcon = function emptyCanonicalIcon() {
  return { prefix: null, iconName: null, rest: [] };
};

function getCanonicalIcon(values) {
  return values.reduce(function (acc, cls) {
    var iconName = getIconName(config.familyPrefix, cls);

    if (styles$1[cls]) {
      acc.prefix = cls;
    } else if (iconName) {
      var shim = acc.prefix === 'fa' ? byOldName(iconName) : {};

      acc.iconName = shim.iconName || iconName;
      acc.prefix = shim.prefix || acc.prefix;
    } else if (cls !== config.replacementClass && cls.indexOf('fa-w-') !== 0) {
      acc.rest.push(cls);
    }

    return acc;
  }, emptyCanonicalIcon());
}

function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix: prefix,
      iconName: iconName,
      icon: mapping[prefix][iconName]
    };
  }
}

function toHtml(abstractNodes) {
  var tag = abstractNodes.tag,
      _abstractNodes$attrib = abstractNodes.attributes,
      attributes = _abstractNodes$attrib === undefined ? {} : _abstractNodes$attrib,
      _abstractNodes$childr = abstractNodes.children,
      children = _abstractNodes$childr === undefined ? [] : _abstractNodes$childr;


  if (typeof abstractNodes === 'string') {
    return htmlEscape(abstractNodes);
  } else {
    return '<' + tag + ' ' + joinAttributes(attributes) + '>' + children.map(toHtml).join('') + '</' + tag + '>';
  }
}

var noop$1 = function noop() {};

function isWatched(node) {
  var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;

  return typeof i2svg === 'string';
}

function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }

  var mutator = mutators[config.autoReplaceSvg];

  return mutator || mutators.replace;
}

var mutators = {
  replace: function replace(mutation) {
    var node = mutation[0];
    var abstract = mutation[1];
    var newOuterHTML = abstract.map(function (a) {
      return toHtml(a);
    }).join('\n');

    if (node.parentNode && node.outerHTML) {
      node.outerHTML = newOuterHTML + (config.keepOriginalSource && node.tagName.toLowerCase() !== 'svg' ? '<!-- ' + node.outerHTML + ' -->' : '');
    } else if (node.parentNode) {
      var newNode = document.createElement('span');
      node.parentNode.replaceChild(newNode, node);
      newNode.outerHTML = newOuterHTML;
    }
  },
  nest: function nest(mutation) {
    var node = mutation[0];
    var abstract = mutation[1];

    // If we already have a replaced node we do not want to continue nesting within it.
    // Short-circuit to the standard replacement
    if (~classArray(node).indexOf(config.replacementClass)) {
      return mutators.replace(mutation);
    }

    var forSvg = new RegExp(config.familyPrefix + '-.*');

    delete abstract[0].attributes.style;

    var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
      if (cls === config.replacementClass || cls.match(forSvg)) {
        acc.toSvg.push(cls);
      } else {
        acc.toNode.push(cls);
      }

      return acc;
    }, { toNode: [], toSvg: [] });

    abstract[0].attributes.class = splitClasses.toSvg.join(' ');

    var newInnerHTML = abstract.map(function (a) {
      return toHtml(a);
    }).join('\n');
    node.setAttribute('class', splitClasses.toNode.join(' '));
    node.setAttribute(DATA_FA_I2SVG, '');
    node.innerHTML = newInnerHTML;
  }
};

function perform(mutations, callback) {
  var callbackFunction = typeof callback === 'function' ? callback : noop$1;

  if (mutations.length === 0) {
    callbackFunction();
  } else {
    var frame = WINDOW.requestAnimationFrame || function (op) {
      return op();
    };

    frame(function () {
      var mutator = getMutator();
      var mark = perf.begin('mutate');

      mutations.map(mutator);

      mark();

      callbackFunction();
    });
  }
}

var disabled = false;

function disableObservation(operation) {
  disabled = true;
  operation();
  disabled = false;
}

var mo = null;

function observe(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }

  if (!config.observeMutations) {
    return;
  }

  var treeCallback = options.treeCallback,
      nodeCallback = options.nodeCallback,
      pseudoElementsCallback = options.pseudoElementsCallback,
      _options$observeMutat = options.observeMutationsRoot,
      observeMutationsRoot = _options$observeMutat === undefined ? DOCUMENT.body : _options$observeMutat;


  mo = new MUTATION_OBSERVER(function (objects) {
    if (disabled) return;

    toArray(objects).forEach(function (mutationRecord) {
      if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }

        treeCallback(mutationRecord.target);
      }

      if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }

      if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === 'class') {
          var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
              prefix = _getCanonicalIcon.prefix,
              iconName = _getCanonicalIcon.iconName;

          if (prefix) mutationRecord.target.setAttribute('data-prefix', prefix);
          if (iconName) mutationRecord.target.setAttribute('data-icon', iconName);
        } else {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });

  if (!IS_DOM) return;

  mo.observe(observeMutationsRoot, {
    childList: true, attributes: true, characterData: true, subtree: true
  });
}

function disconnect() {
  if (!mo) return;

  mo.disconnect();
}

var styleParser = function (node) {
  var style = node.getAttribute('style');

  var val = [];

  if (style) {
    val = style.split(';').reduce(function (acc, style) {
      var styles = style.split(':');
      var prop = styles[0];
      var value = styles.slice(1);

      if (prop && value.length > 0) {
        acc[prop] = value.join(':').trim();
      }

      return acc;
    }, {});
  }

  return val;
};

function toHex(unicode) {
  var result = '';

  for (var i = 0; i < unicode.length; i++) {
    var hex = unicode.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }

  return result;
}

var classParser = function (node) {
  var existingPrefix = node.getAttribute('data-prefix');
  var existingIconName = node.getAttribute('data-icon');
  var innerText = node.innerText !== undefined ? node.innerText.trim() : '';

  var val = getCanonicalIcon(classArray(node));

  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }

  if (val.prefix && innerText.length > 1) {
    val.iconName = byLigature(val.prefix, node.innerText);
  } else if (val.prefix && innerText.length === 1) {
    val.iconName = byUnicode(val.prefix, toHex(node.innerText));
  }

  return val;
};

var parseTransformString = function parseTransformString(transformString) {
  var transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };

  if (!transformString) {
    return transform;
  } else {
    return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
      var parts = n.toLowerCase().split('-');
      var first = parts[0];
      var rest = parts.slice(1).join('-');

      if (first && rest === 'h') {
        acc.flipX = true;
        return acc;
      }

      if (first && rest === 'v') {
        acc.flipY = true;
        return acc;
      }

      rest = parseFloat(rest);

      if (isNaN(rest)) {
        return acc;
      }

      switch (first) {
        case 'grow':
          acc.size = acc.size + rest;
          break;
        case 'shrink':
          acc.size = acc.size - rest;
          break;
        case 'left':
          acc.x = acc.x - rest;
          break;
        case 'right':
          acc.x = acc.x + rest;
          break;
        case 'up':
          acc.y = acc.y - rest;
          break;
        case 'down':
          acc.y = acc.y + rest;
          break;
        case 'rotate':
          acc.rotate = acc.rotate + rest;
          break;
      }

      return acc;
    }, transform);
  }
};

var transformParser = function (node) {
  return parseTransformString(node.getAttribute('data-fa-transform'));
};

var symbolParser = function (node) {
  var symbol = node.getAttribute('data-fa-symbol');

  return symbol === null ? false : symbol === '' ? true : symbol;
};

var attributesParser = function (node) {
  var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
    if (acc.name !== 'class' && acc.name !== 'style') {
      acc[attr.name] = attr.value;
    }
    return acc;
  }, {});

  var title = node.getAttribute('title');

  if (config.autoA11y) {
    if (title) {
      extraAttributes['aria-labelledby'] = config.replacementClass + '-title-' + nextUniqueId();
    } else {
      extraAttributes['aria-hidden'] = 'true';
    }
  }

  return extraAttributes;
};

var maskParser = function (node) {
  var mask = node.getAttribute('data-fa-mask');

  if (!mask) {
    return emptyCanonicalIcon();
  } else {
    return getCanonicalIcon(mask.split(' ').map(function (i) {
      return i.trim();
    }));
  }
};

var blankMeta = {
  iconName: null,
  title: null,
  prefix: null,
  transform: meaninglessTransform,
  symbol: false,
  mask: null,
  extra: { classes: [], styles: {}, attributes: {} }
};

function parseMeta(node) {
  var _classParser = classParser(node),
      iconName = _classParser.iconName,
      prefix = _classParser.prefix,
      extraClasses = _classParser.rest;

  var extraStyles = styleParser(node);
  var transform = transformParser(node);
  var symbol = symbolParser(node);
  var extraAttributes = attributesParser(node);
  var mask = maskParser(node);

  return {
    iconName: iconName,
    title: node.getAttribute('title'),
    prefix: prefix,
    transform: transform,
    symbol: symbol,
    mask: mask,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    }
  };
}

function MissingIcon(error) {
  this.name = 'MissingIcon';
  this.message = error || 'Icon unavailable';
  this.stack = new Error().stack;
}

MissingIcon.prototype = Object.create(Error.prototype);
MissingIcon.prototype.constructor = MissingIcon;

var FILL = { fill: 'currentColor' };
var ANIMATION_BASE = {
  attributeType: 'XML',
  repeatCount: 'indefinite',
  dur: '2s'
};
var RING = {
  tag: 'path',
  attributes: _extends({}, FILL, {
    d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
  })
};
var OPACITY_ANIMATE = _extends({}, ANIMATION_BASE, {
  attributeName: 'opacity'
});
var DOT = {
  tag: 'circle',
  attributes: _extends({}, FILL, {
    cx: '256',
    cy: '364',
    r: '28'
  }),
  children: [{ tag: 'animate', attributes: _extends({}, ANIMATION_BASE, { attributeName: 'r', values: '28;14;28;28;14;28;' }) }, { tag: 'animate', attributes: _extends({}, OPACITY_ANIMATE, { values: '1;0;1;1;0;1;' }) }]
};
var QUESTION = {
  tag: 'path',
  attributes: _extends({}, FILL, {
    opacity: '1',
    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
  }),
  children: [{ tag: 'animate', attributes: _extends({}, OPACITY_ANIMATE, { values: '1;0;0;0;0;1;' }) }]
};
var EXCLAMATION = {
  tag: 'path',
  attributes: _extends({}, FILL, {
    opacity: '0',
    d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
  }),
  children: [{ tag: 'animate', attributes: _extends({}, OPACITY_ANIMATE, { values: '0;0;1;1;0;0;' }) }]
};

var missing = { tag: 'g', children: [RING, DOT, QUESTION, EXCLAMATION] };

var styles = namespace.styles;

var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
var FONT_FAMILY_PATTERN = /Font Awesome 5 (Solid|Regular|Light|Brands|Free|Pro)/;
var STYLE_TO_PREFIX = {
  'Solid': 'fas',
  'Regular': 'far',
  'Light': 'fal',
  'Brands': 'fab'
};
var FONT_WEIGHT_TO_PREFIX = {
  '900': 'fas',
  '400': 'far',
  '300': 'fal'
};

function findIcon(iconName, prefix) {
  var val = {
    found: false,
    width: 512,
    height: 512,
    icon: missing
  };

  if (iconName && prefix && styles[prefix] && styles[prefix][iconName]) {
    var icon = styles[prefix][iconName];
    var width = icon[0];
    var height = icon[1];
    var vectorData = icon.slice(4);

    val = {
      found: true,
      width: width,
      height: height,
      icon: { tag: 'path', attributes: { fill: 'currentColor', d: vectorData[0] } }
    };
  } else if (iconName && prefix && !config.showMissingIcons) {
    throw new MissingIcon('Icon is missing for prefix ' + prefix + ' with icon name ' + iconName);
  }

  return val;
}

function generateSvgReplacementMutation(node, nodeMeta) {
  var iconName = nodeMeta.iconName,
      title = nodeMeta.title,
      prefix = nodeMeta.prefix,
      transform = nodeMeta.transform,
      symbol = nodeMeta.symbol,
      mask = nodeMeta.mask,
      extra = nodeMeta.extra;


  return [node, makeInlineSvgAbstract({
    icons: {
      main: findIcon(iconName, prefix),
      mask: findIcon(mask.iconName, mask.prefix)
    },
    prefix: prefix,
    iconName: iconName,
    transform: transform,
    symbol: symbol,
    mask: mask,
    title: title,
    extra: extra,
    watchable: true
  })];
}

function generateLayersText(node, nodeMeta) {
  var title = nodeMeta.title,
      transform = nodeMeta.transform,
      extra = nodeMeta.extra;


  var width = null;
  var height = null;

  if (IS_IE) {
    var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
    var boundingClientRect = node.getBoundingClientRect();
    width = boundingClientRect.width / computedFontSize;
    height = boundingClientRect.height / computedFontSize;
  }

  if (config.autoA11y && !title) {
    extra.attributes['aria-hidden'] = 'true';
  }

  return [node, makeLayersTextAbstract({
    content: node.innerHTML,
    width: width,
    height: height,
    transform: transform,
    title: title,
    extra: extra,
    watchable: true
  })];
}

function generateMutation(node) {
  var nodeMeta = parseMeta(node);

  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return generateLayersText(node, nodeMeta);
  } else {
    return generateSvgReplacementMutation(node, nodeMeta);
  }
}

function searchPseudoElements(root) {
  if (!IS_DOM) return;

  var end = perf.begin('searchPseudoElements');

  disableObservation(function () {
    toArray(root.querySelectorAll('*')).filter(function (n) {
      return n.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(n.tagName.toUpperCase()) && !n.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!n.parentNode || n.parentNode.tagName !== 'svg');
    }).forEach(function (node) {
      [':before', ':after'].forEach(function (pos) {
        var children = toArray(node.children);
        var alreadyProcessedPseudoElement = children.filter(function (c) {
          return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === pos;
        })[0];

        var styles = WINDOW.getComputedStyle(node, pos);
        var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
        var fontWeight = styles.getPropertyValue('font-weight');

        if (alreadyProcessedPseudoElement && !fontFamily) {
          // If we've already processed it but the current computed style does not result in a font-family,
          // that probably means that a class name that was previously present to make the icon has been
          // removed. So we now should delete the icon.
          node.removeChild(alreadyProcessedPseudoElement);
        } else if (fontFamily) {
          var content = styles.getPropertyValue('content');
          var prefix = ~['Light', 'Regular', 'Solid'].indexOf(fontFamily[1]) ? STYLE_TO_PREFIX[fontFamily[1]] : FONT_WEIGHT_TO_PREFIX[fontWeight];
          var iconName = byUnicode(prefix, toHex(content.length === 3 ? content.substr(1, 1) : content));
          // Only convert the pseudo element in this :before/:after position into an icon if we haven't
          // already done so with the same prefix and iconName
          if (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconName) {
            if (alreadyProcessedPseudoElement) {
              // Delete the old one, since we're replacing it with a new one
              node.removeChild(alreadyProcessedPseudoElement);
            }

            var extra = blankMeta.extra;

            extra.attributes[DATA_FA_PSEUDO_ELEMENT] = pos;
            var abstract = makeInlineSvgAbstract(_extends({}, blankMeta, {
              icons: {
                main: findIcon(iconName, prefix),
                mask: emptyCanonicalIcon()
              },
              prefix: prefix,
              iconName: iconName,
              extra: extra,
              watchable: true
            }));

            var element = DOCUMENT.createElement('svg');

            if (pos === ':before') {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }

            element.outerHTML = abstract.map(function (a) {
              return toHtml(a);
            }).join('\n');
          }
        }
      });
    });
  });

  end();
}

function onTree(root) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!IS_DOM) return;

  var htmlClassList = DOCUMENT.documentElement.classList;
  var hclAdd = function hclAdd(suffix) {
    return htmlClassList.add(HTML_CLASS_I2SVG_BASE_CLASS + '-' + suffix);
  };
  var hclRemove = function hclRemove(suffix) {
    return htmlClassList.remove(HTML_CLASS_I2SVG_BASE_CLASS + '-' + suffix);
  };
  var prefixes = Object.keys(styles);
  var prefixesDomQuery = ['.' + LAYERS_TEXT_CLASSNAME + ':not([' + DATA_FA_I2SVG + '])'].concat(prefixes.map(function (p) {
    return '.' + p + ':not([' + DATA_FA_I2SVG + '])';
  })).join(', ');

  if (prefixesDomQuery.length === 0) {
    return;
  }

  var candidates = toArray(root.querySelectorAll(prefixesDomQuery));

  if (candidates.length > 0) {
    hclAdd('pending');
    hclRemove('complete');
  } else {
    return;
  }

  var mark = perf.begin('onTree');

  var mutations = candidates.reduce(function (acc, node) {
    try {
      var mutation = generateMutation(node);

      if (mutation) {
        acc.push(mutation);
      }
    } catch (e) {
      if (!PRODUCTION) {
        if (e instanceof MissingIcon) {
          console.error(e);
        }
      }
    }

    return acc;
  }, []);

  mark();

  perform(mutations, function () {
    hclAdd('active');
    hclAdd('complete');
    hclRemove('pending');

    if (typeof callback === 'function') callback();
  });
}

function onNode(node) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var mutation = generateMutation(node);

  if (mutation) {
    perform([mutation], callback);
  }
}

var baseStyles = "svg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -.125em; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -.225em; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    width: 2em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -.125em;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n";

var css = function () {
  var dfp = DEFAULT_FAMILY_PREFIX;
  var drc = DEFAULT_REPLACEMENT_CLASS;
  var fp = config.familyPrefix;
  var rc = config.replacementClass;
  var s = baseStyles;

  if (fp !== dfp || rc !== drc) {
    var dPatt = new RegExp('\\.' + dfp + '\\-', 'g');
    var rPatt = new RegExp('\\.' + drc, 'g');

    s = s.replace(dPatt, '.' + fp + '-').replace(rPatt, '.' + rc);
  }

  return s;
};

function define(prefix, icons) {
  var normalized = Object.keys(icons).reduce(function (acc, iconName) {
    var icon = icons[iconName];
    var expanded = !!icon.icon;

    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }
    return acc;
  }, {});

  if (typeof namespace.hooks.addPack === 'function') {
    namespace.hooks.addPack(prefix, normalized);
  } else {
    namespace.styles[prefix] = _extends({}, namespace.styles[prefix] || {}, normalized);
  }

  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll easy the upgrade process for our users by automatically defining
   * this as well.
   */
  if (prefix === 'fas') {
    define('fa', icons);
  }
}

var Library = function () {
  function Library() {
    classCallCheck(this, Library);

    this.definitions = {};
  }

  createClass(Library, [{
    key: 'add',
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, definitions = Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }

      var additions = definitions.reduce(this._pullDefinitions, {});

      Object.keys(additions).forEach(function (key) {
        _this.definitions[key] = _extends({}, _this.definitions[key] || {}, additions[key]);
        define(key, additions[key]);
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: '_pullDefinitions',
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? { 0: definition } : definition;

      Object.keys(normalized).map(function (key) {
        var _normalized$key = normalized[key],
            prefix = _normalized$key.prefix,
            iconName = _normalized$key.iconName,
            icon = _normalized$key.icon;


        if (!additions[prefix]) additions[prefix] = {};

        additions[prefix][iconName] = icon;
      });

      return additions;
    }
  }]);
  return Library;
}();

function prepIcon(icon) {
  var width = icon[0];
  var height = icon[1];
  var vectorData = icon.slice(4);

  return {
    found: true,
    width: width,
    height: height,
    icon: { tag: 'path', attributes: { fill: 'currentColor', d: vectorData[0] } }
  };
}

function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}

function apiObject(val, abstractCreator) {
  Object.defineProperty(val, 'abstract', {
    get: abstractCreator
  });

  Object.defineProperty(val, 'html', {
    get: function get() {
      return val.abstract.map(function (a) {
        return toHtml(a);
      });
    }
  });

  Object.defineProperty(val, 'node', {
    get: function get() {
      if (!IS_DOM) return;

      var container = DOCUMENT.createElement('div');
      container.innerHTML = val.html;
      return container.children;
    }
  });

  return val;
}

function findIconDefinition(params) {
  var _params$prefix = params.prefix,
      prefix = _params$prefix === undefined ? 'fa' : _params$prefix,
      iconName = params.iconName;


  if (!iconName) return;

  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}

function resolveIcons(next) {
  return function (maybeIconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});

    var mask = params.mask;


    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }

    return next(iconDefinition, _extends({}, params, { mask: mask }));
  };
}

var library = new Library();

var noAuto = function noAuto() {
  config.autoReplaceSvg = false;
  config.observeMutations = false;

  disconnect();
};

var _cssInserted = false;

var dom = {
  i2svg: function i2svg() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (IS_DOM) {
      ensureCss();

      var _params$node = params.node,
          node = _params$node === undefined ? DOCUMENT : _params$node,
          _params$callback = params.callback,
          callback = _params$callback === undefined ? function () {} : _params$callback;


      if (config.searchPseudoElements) {
        searchPseudoElements(node);
      }

      onTree(node, callback);
    }
  },

  css: css,

  insertCss: function insertCss$$1() {
    if (!_cssInserted) {
      insertCss(css());
      _cssInserted = true;
    }
  },

  watch: function watch() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var autoReplaceSvgRoot = params.autoReplaceSvgRoot,
        observeMutationsRoot = params.observeMutationsRoot;


    if (config.autoReplaceSvg === false) {
      config.autoReplaceSvg = true;
    }

    config.observeMutations = true;

    domready(function () {
      autoReplace({
        autoReplaceSvgRoot: autoReplaceSvgRoot
      });

      observe({
        treeCallback: onTree,
        nodeCallback: onNode,
        pseudoElementsCallback: searchPseudoElements,
        observeMutationsRoot: observeMutationsRoot
      });
    });
  }
};

var parse = {
  transform: function transform(transformString) {
    return parseTransformString(transformString);
  }
};

var icon = resolveIcons(function (iconDefinition) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform = params.transform,
      transform = _params$transform === undefined ? meaninglessTransform : _params$transform,
      _params$symbol = params.symbol,
      symbol = _params$symbol === undefined ? false : _params$symbol,
      _params$mask = params.mask,
      mask = _params$mask === undefined ? null : _params$mask,
      _params$title = params.title,
      title = _params$title === undefined ? null : _params$title,
      _params$classes = params.classes,
      classes = _params$classes === undefined ? [] : _params$classes,
      _params$attributes = params.attributes,
      attributes = _params$attributes === undefined ? {} : _params$attributes,
      _params$styles = params.styles,
      styles = _params$styles === undefined ? {} : _params$styles;


  if (!iconDefinition) return;

  var prefix = iconDefinition.prefix,
      iconName = iconDefinition.iconName,
      icon = iconDefinition.icon;


  return apiObject(_extends({ type: 'icon' }, iconDefinition), function () {
    ensureCss();

    if (config.autoA11y) {
      if (title) {
        attributes['aria-labelledby'] = config.replacementClass + '-title-' + nextUniqueId();
      } else {
        attributes['aria-hidden'] = 'true';
      }
    }

    return makeInlineSvgAbstract({
      icons: {
        main: prepIcon(icon),
        mask: mask ? prepIcon(mask.icon) : { found: false, width: null, height: null, icon: {} }
      },
      prefix: prefix,
      iconName: iconName,
      transform: _extends({}, meaninglessTransform, transform),
      symbol: symbol,
      title: title,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: classes
      }
    });
  });
});

var text = function text(content) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform2 = params.transform,
      transform = _params$transform2 === undefined ? meaninglessTransform : _params$transform2,
      _params$title2 = params.title,
      title = _params$title2 === undefined ? null : _params$title2,
      _params$classes2 = params.classes,
      classes = _params$classes2 === undefined ? [] : _params$classes2,
      _params$attributes2 = params.attributes,
      attributes = _params$attributes2 === undefined ? {} : _params$attributes2,
      _params$styles2 = params.styles,
      styles = _params$styles2 === undefined ? {} : _params$styles2;


  return apiObject({ type: 'text', content: content }, function () {
    ensureCss();

    return makeLayersTextAbstract({
      content: content,
      transform: _extends({}, meaninglessTransform, transform),
      title: title,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: [config.familyPrefix + '-layers-text'].concat(toConsumableArray(classes))
      }
    });
  });
};

var counter = function counter(content) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$title3 = params.title,
      title = _params$title3 === undefined ? null : _params$title3,
      _params$classes3 = params.classes,
      classes = _params$classes3 === undefined ? [] : _params$classes3,
      _params$attributes3 = params.attributes,
      attributes = _params$attributes3 === undefined ? {} : _params$attributes3,
      _params$styles3 = params.styles,
      styles = _params$styles3 === undefined ? {} : _params$styles3;


  return apiObject({ type: 'counter', content: content }, function () {
    ensureCss();

    return makeLayersCounterAbstract({
      content: content.toString(),
      title: title,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: [config.familyPrefix + '-layers-counter'].concat(toConsumableArray(classes))
      }
    });
  });
};

var layer = function layer(assembler) {
  return apiObject({ type: 'layer' }, function () {
    ensureCss();

    var children = [];

    assembler(function (args) {
      Array.isArray(args) ? args.map(function (a) {
        children = children.concat(a.abstract);
      }) : children = children.concat(args.abstract);
    });

    return [{
      tag: 'span',
      attributes: { class: config.familyPrefix + '-layers' },
      children: children
    }];
  });
};

var api = {
  noAuto: noAuto,
  config: config,
  dom: dom,
  library: library,
  parse: parse,
  findIconDefinition: findIconDefinition,
  icon: icon,
  text: text,
  counter: counter,
  layer: layer,
  toHtml: toHtml
};

var autoReplace = function autoReplace() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _params$autoReplaceSv = params.autoReplaceSvgRoot,
      autoReplaceSvgRoot = _params$autoReplaceSv === undefined ? DOCUMENT : _params$autoReplaceSv;


  if (Object.keys(namespace.styles).length > 0 && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({ node: autoReplaceSvgRoot });
};




/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Discussion/discussion-item/discussion-item.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/Discussion/discussion-item/discussion-item.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"indComment\" [ngClass]=\"{reverse: ind%2 === 0}\" *ngIf=\"!hide\">\n    <a routerLink=\"/profile/{{data.author.id}}\">\n        <img *ngIf=\"data.author.fb\" class=\"comUserImage\" [ngClass]=\"{reverse: ind%2 === 0}\" src=\"https://graph.facebook.com/{{data.author.fb}}/picture?width=30&height=30\" height=\"30\" width=\"30\">\n        <img *ngIf=\"!data.author.fb\" class=\"comUserImage\" [ngClass]=\"{reverse: ind%2 === 0}\" src=\"{{data.author.pic ? data.author.pic : '/images/' + data.author.gender + '.png'}}\" height=\"30\" width=\"30\">\n    </a>\n    <div class=\"textAndDate\" [ngClass]=\"{reverseAlign: ind%2 === 0}\">\n        <p class=\"commentText\"><span class=\"heavy\">{{firstName}}:</span> {{data.message}}</p>\n        <div class=\"subText\" [ngClass]=\"{reverse: ind%2 !== 0}\" >\n            <span *ngIf=\"data.admin\" class=\"remove\" (click)=\"deleteMessage()\">Remove</span>\n            <span class=\"date\">{{data.timestamp | date}}</span>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/Discussion/discussion-item/discussion-item.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/Discussion/discussion-item/discussion-item.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".comUserImage {\n  width: 32px !important;\n  border-radius: 8px;\n  z-index: 3;\n  margin-right: 10px;\n  background-color: #e2e2e2; }\n  .comUserImage.reverse {\n    margin-right: 0px !important;\n    margin-left: 10px !important; }\n  .indComment {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 100%;\n  margin-bottom: 10px; }\n  .commentText {\n  font-family: Karla;\n  font-size: .8rem;\n  color: #999;\n  background: white;\n  border-radius: 8px;\n  padding: 4px 6px;\n  margin-bottom: 0px;\n  border: solid 1px #e2e2e2; }\n  @media (max-width: 767px) {\n    .commentText {\n      font-size: .8rem; } }\n  .reverse {\n  flex-direction: row-reverse !important; }\n  .heavy {\n  font-weight: 700; }\n  .textAndDate {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start; }\n  .subText {\n  display: flex;\n  flex-direction: row; }\n  .date {\n  display: block;\n  font-size: .7rem;\n  color: #999;\n  padding: 3px;\n  padding-bottom: 0px; }\n  .remove {\n  display: block;\n  font-size: .7rem;\n  color: #e74e4e;\n  padding: 3px;\n  margin: auto 10px;\n  padding-bottom: 0px;\n  color: #AAA;\n  font-weight: 700; }\n  .remove:hover {\n    cursor: pointer; }\n  .reverseAlign {\n  align-items: flex-end; }\n"

/***/ }),

/***/ "./src/app/Discussion/discussion-item/discussion-item.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Discussion/discussion-item/discussion-item.component.ts ***!
  \*************************************************************************/
/*! exports provided: DiscussionItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscussionItemComponent", function() { return DiscussionItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _discussion_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../discussion.model */ "./src/app/Discussion/discussion.model.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DiscussionItemComponent = /** @class */ (function () {
    function DiscussionItemComponent(http, route, elementRef) {
        this.http = http;
        this.route = route;
        this.elementRef = elementRef;
    }
    DiscussionItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params.message && params.message == _this.data.id) {
                setTimeout(function () {
                    _this.elementRef.nativeElement.scrollIntoView();
                    window.scrollBy(0, -63.5);
                }, 500);
            }
        });
        this.firstName = this.data.author.name.split(' ')[0];
    };
    DiscussionItemComponent.prototype.deleteMessage = function () {
        var _this = this;
        // post and get response
        this.http.post('/discussions/delete', { id: this.data.id })
            .toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                _this.hide = true;
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _discussion_model__WEBPACK_IMPORTED_MODULE_1__["DiscussionModel"])
    ], DiscussionItemComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], DiscussionItemComponent.prototype, "ind", void 0);
    DiscussionItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-discussion-item',
            template: __webpack_require__(/*! ./discussion-item.component.html */ "./src/app/Discussion/discussion-item/discussion-item.component.html"),
            styles: [__webpack_require__(/*! ./discussion-item.component.scss */ "./src/app/Discussion/discussion-item/discussion-item.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], DiscussionItemComponent);
    return DiscussionItemComponent;
}());



/***/ }),

/***/ "./src/app/Discussion/discussion-list/discussion-list.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/Discussion/discussion-list/discussion-list.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"cBody\" *ngIf=\"!hide && form.found\">\n\n    <form [formGroup]=\"newmessage\">\n        <div class=\"userComCont\">\n            <div *ngIf=\"pictype == 'fb'\">\n                <img src=\"https://graph.facebook.com/{{pic}}/picture?width=32&height=32\" class=\"comUserImage\" />\n            </div>\n            <div *ngIf=\"pictype == 'local'\">\n                <img [src]=\"pic\" class=\"comUserImage\" />\n            </div>\n            <div *ngIf=\"form.pictype !== 'local'\">\n                <img *ngIf=\"pictype == 'default-male'\"  src=\"/images/male.png\" class=\"comUserImage\" />\n                <img *ngIf=\"pictype == 'default-female'\" src=\"/images/female.png\" class=\"comUserImage\" />\n            </div>\n            <textarea #entrybox\n                placeholder=\"Leave a comment..\"\n                class=\"niceTextInput\"\n                rows=\"1\"\n                formControlName=\"message\"\n                (keydown)=\"autosizeTextarea($event, entrybox)\"\n                style=\"min-height: 23px !important;\"\n                (click)=\"loginPopup.check(!loggedin)\">\n            </textarea>\n        </div>\n        <div *ngIf=\"entrybox.value !== ''\" class=\"comSort\" style=\"padding-top: 0\">\n            <a (click)=\"checkSubmit()\" class=\"submitButton\">Comment</a>\n        </div>\n        <div *ngIf=\"submissionfailed\">Submission failed.</div>\n    </form>\n\n    <div class=\"comments\">\n        <div *ngFor=\"let com of chatlist; let i = index\">\n            <app-discussion-item [data]=\"com\" *ngIf=\"commentsExpanded || i < 2\" [ind]=\"i\"></app-discussion-item>\n        </div>\n    </div>\n\n    <div *ngIf=\"chatlist.length > 2\" class=\"flex\" style=\"padding-top: 0px\">\n        <span class=\"comSwitch\" style=\"font-size: 1rem\" (click)=\"expandComment()\">{{commentsExpanded ? 'See Less Comments' : 'See More Comments'}}</span>\n    </div>\n\n</div>\n<app-login-popup #loginPopup></app-login-popup>\n"

/***/ }),

/***/ "./src/app/Discussion/discussion-list/discussion-list.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/Discussion/discussion-list/discussion-list.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".cBody {\n  height: auto;\n  border-bottom-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border: solid 1px #e2e2e2;\n  border-top: none;\n  position: relative;\n  background: #FAFAFA;\n  box-sizing: border-box;\n  margin: auto 0px;\n  margin-bottom: 10px;\n  z-index: 1;\n  background-size: cover;\n  padding-top: 0;\n  padding-bottom: 0;\n  width: 100%; }\n\n.flex {\n  display: flex;\n  justify-content: center;\n  padding: 10px;\n  width: 100%; }\n\n.comSort {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  width: 100%;\n  padding: 8px 12px; }\n\n.comSwitch {\n  display: block;\n  color: #999;\n  font-family: Karla;\n  font-size: .8rem;\n  margin: auto 4px; }\n\n.comSwitch:hover {\n    cursor: pointer;\n    font-weight: 700; }\n\n#divider {\n  color: #CCC; }\n\n.userComCont {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 8px;\n  padding-bottom: 0px;\n  padding-top: 12px;\n  width: 100%; }\n\n.comUserImage {\n  width: 32px !important;\n  border-radius: 8px;\n  z-index: 3;\n  margin-right: 10px;\n  background-color: #e2e2e2; }\n\n.comUserImage.reverse {\n    margin-right: 0px !important;\n    margin-left: 10px !important; }\n\n.comments {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 8px 12px;\n  padding-top: 6px; }\n\n.reverse {\n  flex-direction: row-reverse; }\n\n.niceTextInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  font-size: .8rem;\n  color: #999;\n  border-radius: 0px;\n  width: 100%;\n  margin-bottom: 6px; }\n\n@media (max-width: 767px) {\n    .niceTextInput {\n      font-size: .8rem; } }\n\n.submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 100px;\n  max-width: 150px;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 0px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n.heavy {\n  font-weight: 700;\n  font-size: .9rem; }\n"

/***/ }),

/***/ "./src/app/Discussion/discussion-list/discussion-list.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/Discussion/discussion-list/discussion-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: DiscussionListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscussionListComponent", function() { return DiscussionListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _discussion_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../discussion.model */ "./src/app/Discussion/discussion.model.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Feed/feed-form.model */ "./src/app/Feed/feed-form.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DiscussionListComponent = /** @class */ (function () {
    function DiscussionListComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.chatlist = [];
        this.submissionfailed = false;
        this.hide = false;
        this.commentsExpanded = false;
        this.commentSort = 'top';
        this.previousCommenters = [];
    }
    DiscussionListComponent.prototype.ngOnInit = function () {
        this.newmessage = this.fb.group({
            message: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])]
        });
        this.retrieveMessages(true);
        // window.console.log("pic: ", this.pic, "pictype:", this.pictype);
    };
    // retrieve message list for this form
    DiscussionListComponent.prototype.retrieveMessages = function (clean) {
        var _this = this;
        this.http.post('/discussions/list', { formid: this.id }).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                // clean?
                if (clean == true) {
                    // clean current data list
                    var l = _this.chatlist.length;
                    while (l--) {
                        _this.chatlist.splice(l, 1);
                    }
                }
                // only add the new messages
                var start = _this.chatlist.length;
                // update
                _this.data = response.json().data;
                if (_this.data !== null) {
                    for (var i = start; i < _this.data.length; i++) {
                        _this.chatlist.push(new _discussion_model__WEBPACK_IMPORTED_MODULE_1__["DiscussionModel"](_this.data[i]));
                    }
                }
            }
        })
            .catch(function (error) { return function (error) {
            // error
        }; });
    };
    // submit new message
    DiscussionListComponent.prototype.checkSubmit = function () {
        this.setAsTouched(this.newmessage);
        if (this.newmessage.invalid) {
            this.newmessage.wasChecked = true;
        }
        else {
            this.Submit();
        }
    };
    DiscussionListComponent.prototype.Submit = function () {
        var _this = this;
        this.preparePreviousCommenters();
        var senddata = {
            formid: this.id,
            message: this.newmessage.value.message,
            previousCommenters: this.previousCommenters,
            firstquestion: this.form.questions[0].body
        };
        this.http.post('/discussions/new', senddata).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                _this.submissionfailed = false;
                _this.retrieveMessages(true);
                _this.newmessage.reset();
            }
            else {
                _this.submissionfailed = true;
                _this.retrieveMessages(true);
            }
        })
            .catch(function (error) { return function (error) {
            this.submissionfailed = true;
            alert("Error posting form: " + error);
        }; });
    };
    DiscussionListComponent.prototype.preparePreviousCommenters = function () {
        this.previousCommenters = this.data.map(function (comment) { return comment.author.id; });
    };
    DiscussionListComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    DiscussionListComponent.prototype.expandComment = function () {
        this.commentsExpanded = !this.commentsExpanded;
    };
    DiscussionListComponent.prototype.autosizeTextarea = function (event, el) {
        if (event.keyCode == 13) {
            el.blur();
            this.checkSubmit();
            this.commentsExpanded = true;
        }
        else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0; min-height: 23px';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + (el.scrollHeight) + 'px';
            }, 0);
        }
    };
    DiscussionListComponent.prototype.toggleSort = function (view) {
        this.commentSort = view;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_4__["FeedFormModel"])
    ], DiscussionListComponent.prototype, "form", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DiscussionListComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DiscussionListComponent.prototype, "pic", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DiscussionListComponent.prototype, "pictype", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], DiscussionListComponent.prototype, "loggedin", void 0);
    DiscussionListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-discussion-list',
            template: __webpack_require__(/*! ./discussion-list.component.html */ "./src/app/Discussion/discussion-list/discussion-list.component.html"),
            styles: [__webpack_require__(/*! ./discussion-list.component.scss */ "./src/app/Discussion/discussion-list/discussion-list.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"]])
    ], DiscussionListComponent);
    return DiscussionListComponent;
}());



/***/ }),

/***/ "./src/app/Discussion/discussion.model.ts":
/*!************************************************!*\
  !*** ./src/app/Discussion/discussion.model.ts ***!
  \************************************************/
/*! exports provided: DiscussionModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscussionModel", function() { return DiscussionModel; });
var DiscussionModel = /** @class */ (function () {
    function DiscussionModel(object) {
        this.object = object;
        // general data
        this.id = object.id;
        this.fb = object.fb;
        this.author = object.author;
        this.message = object.message;
        this.timestamp = object.timestamp;
        this.admin = object.admin;
    }
    return DiscussionModel;
}());



/***/ }),

/***/ "./src/app/Feed/feed-form.model.ts":
/*!*****************************************!*\
  !*** ./src/app/Feed/feed-form.model.ts ***!
  \*****************************************/
/*! exports provided: FeedFormModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedFormModel", function() { return FeedFormModel; });
var FeedFormModel = /** @class */ (function () {
    function FeedFormModel(object) {
        this.object = object;
        this.contracted = true;
        this.viewGraphsbool = false;
        this.viewTablesbool = false;
        this.eventplot = false;
        this.found = object.found;
        if (this.found) {
            // general data
            this.title = object.formdata.title;
            this.id = object.id; //   encrypted
            this.description = object.formdata.description;
            this.questions = object.formdata.questions;
            this.hashtags = object.formdata.hashtags;
            this.timestamp = object.formdata.timestamp;
            this.reactions = object.formdata.reactions;
            this.admin = object.formdata.admin;
            this.expired = object.formdata.expired;
            this.shared = object.formdata.shared;
            this.public = object.formdata.public;
            this.typeevent = object.formdata.typeevent;
            this.loginRequired = object.formdata.loginRequired;
            this.categories = object.formdata.categories;
            this.answered = false;
            this.plotdata = null;
            this.viewGraphsbool = false;
            this.download = './forms/download/' + this.id;
            this.highlight = object.highlight;
            // author info
            if (object.author != null) {
                if (object.author.anonymous == false) {
                    this.author = object.author.name;
                    this.authorlink = object.author.link;
                    this.authorlinkdisabled = false;
                    // deal with picture
                    if (object.author.facebookID != null) {
                        this.pic = object.author.facebookID;
                        this.pictype = "fb";
                    }
                    else {
                        if (object.author.pic != null) {
                            this.pictype = "local";
                            this.pic = object.author.pic;
                        }
                        else {
                            this.pictype = "default";
                            this.authorgender = object.author.gender;
                        }
                    }
                }
                else {
                    this.author = "Anonymous";
                    this.authorlink = "";
                    this.authorlinkdisabled = true;
                    this.pictype = "anonymous";
                }
            }
            else {
                this.setFailed();
            }
            // manyShortMcOptions can be used for UI formatting
            for (var i = 0; i < this.questions.length; i++) {
                if (this.questions[i].kind != 'Multiple Choice' || this.questions[i].options.length <= 5) {
                    this.questions[i].manyShortMcOptions = false;
                    continue;
                }
                var maxMcOptionLength = 0;
                this.questions[i].options.forEach(function (option) {
                    maxMcOptionLength = Math.max(maxMcOptionLength, option.body.length);
                });
                this.questions[i].manyShortMcOptions = (maxMcOptionLength < 32);
            }
        }
    }
    FeedFormModel.prototype.setAnswered = function (input) {
        this.answered = input;
    };
    FeedFormModel.prototype.setShowData = function (input) {
        this.showdata = input;
    };
    FeedFormModel.prototype.setFailed = function () {
        this.author = "Loading failed.";
        this.authorlink = "";
        this.authorlinkdisabled = true;
        this.pictype = "default";
    };
    FeedFormModel.prototype.setPlotData = function (input) {
        this.plotdata = [];
        this.plotdata = this.plotdata.concat(input);
    };
    FeedFormModel.prototype.viewGraphs = function (input) {
        this.viewGraphsbool = input;
    };
    return FeedFormModel;
}());



/***/ }),

/***/ "./src/app/Network/network-item/network-item.component.html":
/*!******************************************************************!*\
  !*** ./src/app/Network/network-item/network-item.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"netw\" [routerLink]=\"['/profile', data.link]\">\n    <img *ngIf=\"data.pic[0] == 'fb'\" src=\"https://graph.facebook.com/{{data.pic[1]}}/picture?width=120&height=120\">\n    <img *ngIf=\"data.pic[0] == 'local'\" [src]=\"data.pic[1]\"/>\n    <img *ngIf=\"data.pic[0] == 'default' && data.pic[1] == 'male'\" src=\"/images/male.png\" />\n    <img *ngIf=\"data.pic[0] == 'default' && data.pic[1] == 'female'\" src=\"/images/female.png\" />\n    <br>\n    <a [routerLink]=\"['/profile', data.link]\">{{data.name.first}} {{data.name.last}}</a>\n</div>"

/***/ }),

/***/ "./src/app/Network/network-item/network-item.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/Network/network-item/network-item.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  font-weight: 400;\n  font-family: Karla;\n  font-size: .75rem;\n  padding: auto 5px;\n  margin-top: -15px;\n  color: #333; }\n  a:hover {\n    cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/Network/network-item/network-item.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/Network/network-item/network-item.component.ts ***!
  \****************************************************************/
/*! exports provided: NetworkItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkItemComponent", function() { return NetworkItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NetworkItemComponent = /** @class */ (function () {
    function NetworkItemComponent() {
    }
    NetworkItemComponent.prototype.ngOnInit = function () {
        // this.name  = this.data.name.split(' ');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NetworkItemComponent.prototype, "data", void 0);
    NetworkItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-network-item',
            template: __webpack_require__(/*! ./network-item.component.html */ "./src/app/Network/network-item/network-item.component.html"),
            styles: [__webpack_require__(/*! ./network-item.component.scss */ "./src/app/Network/network-item/network-item.component.scss")],
        })
    ], NetworkItemComponent);
    return NetworkItemComponent;
}());



/***/ }),

/***/ "./src/app/Network/network-list/network-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/Network/network-list/network-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container main-container\" id=\"tagsListComponent\">\n    <div class=\"secondary-container\">\n        <a *ngIf=\"user\" routerLink=\"/profile/{{user}}/friends\">\n            <h5 class=\"title\">Friends</h5>\n        </a>\n        <h5 *ngIf=\"!user\" class=\"title\">Friends</h5>        \n        <div class=\"adaptable-matrix\">\n            <app-network-item class=\"adaptable-matrix-unit\" [data]=\"item\" *ngFor=\"let item of networklist\"> </app-network-item>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/Network/network-list/network-list.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/Network/network-list/network-list.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h5 {\n  text-align: center; }\n"

/***/ }),

/***/ "./src/app/Network/network-list/network-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/Network/network-list/network-list.component.ts ***!
  \****************************************************************/
/*! exports provided: NetworkListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkListComponent", function() { return NetworkListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _network_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../network.model */ "./src/app/Network/network.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NetworkListComponent = /** @class */ (function () {
    function NetworkListComponent(http, route) {
        this.http = http;
        this.route = route;
        this.networklist = [];
    }
    NetworkListComponent.prototype.ngOnInit = function () {
        // window.console.log("Network list: ", this.data);
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var obj = _a[_i];
            this.networklist.push(new _network_model__WEBPACK_IMPORTED_MODULE_3__["NetworkModel"](obj));
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], NetworkListComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], NetworkListComponent.prototype, "user", void 0);
    NetworkListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-network-list',
            template: __webpack_require__(/*! ./network-list.component.html */ "./src/app/Network/network-list/network-list.component.html"),
            styles: [__webpack_require__(/*! ./network-list.component.scss */ "./src/app/Network/network-list/network-list.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], NetworkListComponent);
    return NetworkListComponent;
}());



/***/ }),

/***/ "./src/app/Network/network.model.ts":
/*!******************************************!*\
  !*** ./src/app/Network/network.model.ts ***!
  \******************************************/
/*! exports provided: NetworkModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkModel", function() { return NetworkModel; });
var NetworkModel = /** @class */ (function () {
    function NetworkModel(object) {
        this.object = object;
        // general data
        this.name = object.name;
        this.pic = object.pic;
        this.link = object.link || '';
    }
    return NetworkModel;
}());



/***/ }),

/***/ "./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"width: 100%;\">\n    <form [formGroup]=\"question\" novalidate >\n        <div class=\"multipleChoice\">\n            <!-- <h6 class=\"title firstTitle qslyBlack\">What is your question? <span class=\"valError\" *ngIf=\"errors.question\">*Question cannot be empty.</span></h6>\n            <div style=\"display: flex; align-items: center; width: 100%\">\n                <label style=\"margin-right: 10px; color: #CCC; margin-bottom: 0px;\">-</label>\n                <textarea class=\"niceTextAreaInput\" formControlName=\"body\" rows=\"1\" autofocus #f (keydown)=\"autosizeTextarea($event, f)\"></textarea>\n            </div> -->\n\n            <h6 class=\"title qslyBlack\">Choices <span class=\"valError\" *ngIf=\"errors.choices\">*Must enter at least 2 choices.</span></h6>\n\n            <div class=\"responseContainer\" formArrayName=\"options\">\n                <div class=\"responseRow\" *ngFor=\"let x of question.get('options').controls; let i = index\">\n                    <div class=\"flex\" [formGroupName]=\"i\">\n                        <div style=\"margin-right: 2px\"><label class=\"subtleText qslyGray\">- </label></div>\n                        <input placeholder=\"Enter response choice\" class=\"niceTextInput\" type=\"text\" formControlName=\"body\" #f (keyup.enter)=\"enterMcOption(f);\" />\n                        <button *ngIf=\"question.get('options').length === i +1\" id=\"focusLastBtn\" style=\"display:none\" (click)=\"focusLast(f)\"></button>\n                        <i *ngIf=\"question.get('options').length > 1\" class=\"fa fa-times cross\" (click)=\"removeOption(i)\"></i>\n                    </div>\n                </div>\n            </div>\n\n            <div>\n                <h6 class=\"title qslyBlack\">Allow User to Select Multiple Choices?</h6>\n                <div style=\"display:flex; justify-content: flex-start; margin-bottom: 30px\">\n                    <app-switch-buttons [active]=\"question.get('canSelectMultiple').value\" [option]=\"false\" [title]=\"'No'\" (selected)=\"toggleMultiple($event)\"\n                        formControlName=\"canSelectMultiple\"></app-switch-buttons>\n                    <app-switch-buttons [active]=\"question.get('canSelectMultiple').value\" [option]=\"true\" [title]=\"'Yes'\" (selected)=\"toggleMultiple($event)\"\n                        formControlName=\"canSelectMultiple\"></app-switch-buttons>\n                </div>\n            </div>\n\n            <!-- IMAGE START -->\n            <!-- <div class=\"imgContainer\">\n                <h6 class=\"title qslyBlack\">Add an image</h6>\n                <div class=\"inner\">\n\n                    <div id=\"uploadBtn\">\n                        <label for=\"picFile\" class=\"submitButton not\">Upload</label>\n                        <input id=\"picFile\" title=\"Hello\" style=\"display:none;\" type=\"file\" (change)=\"onPicChange($event)\" />\n                    </div>\n\n                    <div><p id=\"orText\" class=\"qslyGray\">or</p></div>\n\n                    <div id=\"urlImage\" class=\"input-group\" style=\"width: 100%\">\n                        <input type=\"text\" formControlName=\"pic\" #imgUrl class=\"form-control\" style=\"font-size: .5rem\" placeholder=\"Enter image URL\">\n                        <div class=\"input-group-append\">\n                            <button (click)=\"setPicUrl(imgUrl.value)\" class=\"btn btn-outline-secondary\">\n                                <i class=\"fa fa-check\"></i>\n                            </button>\n                        </div>\n                    </div>\n\n                </div>\n\n                <div class=\"flex\">\n                   <img class=\"image\" *ngIf=\"question.get('pic').value !== ''\" id=\"preview\" [src]=\"question.get('pic').value\">\n                </div>\n\n            </div> -->\n            <!-- IMAGE END -->\n\n        </div>\n\n\n        <!-- <div id=\"sbContainer\">\n            <a class=\"submitButton\" (click)=\"submitQuestion()\" style=\"margin-bottom:20px\">{{updateView ? \"Update\" : \"Add Question\"}}</a>\n        </div> -->\n    </form>\n</div>\n"

/***/ }),

/***/ "./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title {\n  font-family: Karla;\n  font-weight: 700;\n  font-size: 1rem;\n  text-align: left;\n  margin: 30px 0px 5px 0px; }\n  .title.firstTitle {\n    margin-top: 5px; }\n  @media (max-width: 767px) {\n    .title {\n      margin-top: 15px; } }\n  .subtleText {\n  font-family: Karla;\n  font-size: 1.1rem;\n  margin-right: 8px; }\n  .titleWithButton {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 95%;\n  margin: 20px auto 15px auto; }\n  .niceTextInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  padding: 2px;\n  width: 95%;\n  font-family: Helvetica Neue, sans-serif;\n  font-weight: 300;\n  font-size: 1rem; }\n  .niceTextAreaInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  padding: 2px;\n  width: 95%;\n  font-family: Helvetica Neue, sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  overflow: hidden; }\n  .multipleChoice {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 90%;\n  margin: 0 auto; }\n  .responseContainer {\n  display: flex;\n  justify-content: flex-start !important;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 95%;\n  height: auto;\n  padding-left: 20px; }\n  .responseRow {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  margin: 2px auto;\n  width: 100%; }\n  .flex {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  #sbContainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: flex-start;\n  width: 100%;\n  padding-right: 20px; }\n  @media (max-width: 767px) {\n    #sbContainer {\n      justify-content: center;\n      padding: 0; } }\n  .submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 20%;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n  .submitButton.not {\n    background: #47d487;\n    margin-top: 2px;\n    margin-left: 10px;\n    padding: 2px 10px; }\n  .submitButton:active {\n    outline-style: none; }\n  .submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n  @media (max-width: 767px) {\n    .submitButton {\n      margin-top: 15px; } }\n  .cross {\n  color: #ffa6a6;\n  font-size: 1rem; }\n  .cross:hover {\n    cursor: pointer; }\n  .imgContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  .imgContainer .inner {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    margin-bottom: 12px; }\n  #uploadBtn {\n  margin-right: 20px; }\n  @media (max-width: 767px) {\n    #uploadBtn {\n      margin-right: 10px; } }\n  #orText {\n  margin: 0px;\n  font-weight: 700;\n  font-family: Karla; }\n  #urlImage {\n  margin: 0px 20px; }\n  @media (max-width: 767px) {\n    #urlImage {\n      margin: 0 10px; } }\n  #preview {\n  border: 1px solid #28ab64;\n  width: 200px;\n  border-radius: 8px;\n  outline-style: none;\n  outline: none; }\n  @media (max-width: 767px) {\n  .form-control {\n    font-size: .55rem; } }\n  .valError {\n  color: #ff6969;\n  font-size: .8rem;\n  margin-left: 8px; }\n"

/***/ }),

/***/ "./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.ts ***!
  \**************************************************************************************/
/*! exports provided: MultipleChoiceFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultipleChoiceFormComponent", function() { return MultipleChoiceFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../form.service */ "./src/app/form.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { create } from 'domain';

var MultipleChoiceFormComponent = /** @class */ (function () {
    function MultipleChoiceFormComponent(fb, formService, route) {
        this.fb = fb;
        this.formService = formService;
        this.route = route;
        this.questionData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.outputUpdateData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updateView = false;
        this.errors = {
            question: false,
            choices: false
        };
    }
    MultipleChoiceFormComponent.prototype.ngOnInit = function () {
        if (this.updateData && this.updateData.kind !== "Multiple Choice") {
            this.updateData = null;
        }
        this.createForm();
    };
    MultipleChoiceFormComponent.prototype.ngOnChanges = function () {
        if (this.updateData) {
            this.createForm();
        }
        if (this.getData) {
            console.log('called');
            this.submitQuestion();
        }
    };
    MultipleChoiceFormComponent.prototype.createForm = function () {
        if (this.updateData) {
            this.updateView = true;
            this.question = this.fb.group({
                kind: ['Multiple Choice', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: this.updateData.required,
                number: this.updateData.number,
                pic: this.updateData.pic,
                canSelectMultiple: this.updateData.canSelectMultiple,
                id: this.updateData.id
            });
            var control = this.question.get('options');
            for (var i = 0; i < this.updateData.options.length; i++) {
                control.push(this.createOption(this.updateData.options[i].body));
            }
        }
        else {
            this.question = this.fb.group({
                kind: ['Multiple Choice', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: true,
                number: this.qLength,
                pic: '',
                canSelectMultiple: false,
                id: Math.random().toString().substring(2),
            });
            this.addMcOption();
        }
    };
    MultipleChoiceFormComponent.prototype.addMcOption = function () {
        var control = this.question.get('options');
        control.push(this.createOption());
    };
    MultipleChoiceFormComponent.prototype.enterMcOption = function (f) {
        if (f.value == '') {
            return;
        }
        var arrayControl = this.question.get('options');
        var lastGroup = arrayControl.at(arrayControl.length - 1);
        var lastControl = lastGroup.get('option');
        var control = this.question.get('options');
        control.push(this.createOption());
        window.setTimeout(function () { jquery__WEBPACK_IMPORTED_MODULE_5__('#focusLastBtn').click(); }, 90);
    };
    MultipleChoiceFormComponent.prototype.focusLast = function (f) {
        f.focus();
    };
    MultipleChoiceFormComponent.prototype.createOption = function (val) {
        if (val === void 0) { val = ""; }
        return this.fb.group({
            body: [val, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(1)]]
        });
    };
    MultipleChoiceFormComponent.prototype.toggleMultiple = function (isMultiple) {
        if (isMultiple === "Yes") {
            this.question.get('canSelectMultiple').setValue(true);
        }
        else {
            this.question.get('canSelectMultiple').setValue(false);
        }
    };
    MultipleChoiceFormComponent.prototype.toggleRequried = function (isRequired) {
        if (isRequired === "Yes") {
            this.question.get('required').setValue(true);
        }
        else {
            this.question.get('required').setValue(false);
        }
    };
    MultipleChoiceFormComponent.prototype.purgeForm = function () {
        var arrayControl = this.question.get('options');
        var lastGroup = arrayControl.at(arrayControl.length - 1);
        var lastControl = lastGroup.get('body');
        this.question.markAsPristine();
        this.question.markAsUntouched();
        this.question.updateValueAndValidity();
        while (1 !== arrayControl.length) {
            arrayControl.removeAt(0);
        }
        lastControl.setValue('');
        this.question.get('canSelectMultiple').setValue(false);
        this.question.get('pic').setValue("");
        this.question.get('id').setValue(Math.random().toString().substring(2));
    };
    MultipleChoiceFormComponent.prototype.submitQuestion = function () {
        //Remove empty option at end if more than 2 choices entered to make choices valid
        if (this.question.get('options').length > 2) {
            var cont = this.question.get('options');
            var lg = cont.at(cont.length - 1);
            if (!lg.value.body)
                this.removeOption(cont.length - 1);
        }
        console.log(this.question.valid, this.question.get('options').length);
        if (this.question.valid && this.question.get('options').length > 1) {
            console.log('In here');
            this.errors.question = false;
            this.errors.choices = false;
            var empty = /^\s*$/;
            var arrayControl = this.question.get('options');
            var lastGroup = arrayControl.at(arrayControl.length - 1);
            var lastControl = lastGroup.get('body');
            if (arrayControl.length === 1 && empty.test(lastControl.value))
                return;
            for (var i = 0; i < arrayControl.length; i++) {
                var group = arrayControl.at(i);
                var control = group.get('body');
                if (empty.test(control.value))
                    this.removeOption(i);
            }
            if (this.updateView) {
                this.outputUpdateData.emit(this.question.value);
                this.updateView = false;
                this.updateData = null;
                this.createForm();
            }
            else {
                this.questionData.emit(this.question.value);
            }
            this.purgeForm();
        }
        else {
            this.errors.choices = !this.question.get('options').valid;
            if (this.question.get('options').length < 2) {
                this.errors.choices = true;
            }
        }
    };
    MultipleChoiceFormComponent.prototype.autosizeTextarea = function (event, el) {
        if (event.keyCode == 13) {
            el.blur();
        }
        else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    };
    MultipleChoiceFormComponent.prototype.removeOption = function (i) {
        var arrayControl = this.question.get('options');
        var lastGroup = arrayControl.removeAt(i);
        // window.console.log("i: ", i, "item at i: ", arrayControl.at(i));
    };
    /*
  Function to carry out the actual PUT request to S3 using the signed request from the app.
*/
    MultipleChoiceFormComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.question.get('pic').setValue(url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    MultipleChoiceFormComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    MultipleChoiceFormComponent.prototype.onPicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    MultipleChoiceFormComponent.prototype.setPicUrl = function (url) {
        this.question.get('pic').setValue(url);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MultipleChoiceFormComponent.prototype, "questionType", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], MultipleChoiceFormComponent.prototype, "qLength", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], MultipleChoiceFormComponent.prototype, "getData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MultipleChoiceFormComponent.prototype, "updateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], MultipleChoiceFormComponent.prototype, "questionData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], MultipleChoiceFormComponent.prototype, "outputUpdateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])('imgTooltipCtrl'),
        __metadata("design:type", Object)
    ], MultipleChoiceFormComponent.prototype, "imgTooltipCtrls", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])('imgTooltipToggle'),
        __metadata("design:type", Object)
    ], MultipleChoiceFormComponent.prototype, "imgTooltipToggles", void 0);
    MultipleChoiceFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mc-question-form',
            template: __webpack_require__(/*! ./multiple-choice-form.component.html */ "./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.html"),
            styles: [__webpack_require__(/*! ./multiple-choice-form.component.scss */ "./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.scss")],
            providers: [_form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], MultipleChoiceFormComponent);
    return MultipleChoiceFormComponent;
}());



/***/ }),

/***/ "./src/app/QuestionForms/number-question-form/number-question-form.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/QuestionForms/number-question-form/number-question-form.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"width: 100%\">\n    <form [formGroup]=\"question\" novalidate (ngSubmit)=submitQuestion()>    \n        <div class=\"multipleChoice\">\n            <!-- <h6 class=\"title qslyBlack firstTitle\">What is your question? <span class=\"valError\" *ngIf=\"errors.question\">*Question cannot be empty.</span></h6>\n            <div style=\"display: flex; align-items: center; width: 100%\">\n                <label style=\"margin-right: 10px; color: #CCC; margin-bottom: 0px;\">-</label>\n                <textarea class=\"niceTextAreaInput\" formControlName=\"body\" rows=\"1\" autofocus #f (keydown)=\"autosizeTextarea($event, f)\"></textarea>\n            </div> -->\n            <!-- <a formControlName=\"required\">Required</a> -->\n\n            <div>\n                <h6 class=\"title qslyBlack\" style=\"margin-bottom: 20px\">Set a Range?</h6>    \n                <div style=\"display:flex; justify-content: flex-start; margin-bottom: 20px;\">\n                    <app-switch-buttons [active]=\"question.get('boundaries').value\" [option]=\"false\" [title]=\"'No'\" (selected)=\"toggleBoundaries($event)\" formControlName=\"boundaries\"></app-switch-buttons>\n                    <app-switch-buttons [active]=\"question.get('boundaries').value\" [option]=\"true\" [title]=\"'Yes'\" (selected)=\"toggleBoundaries($event)\" formControlName=\"boundaries\"></app-switch-buttons>\n                </div>         \n            </div>\n\n            <div class=\"boundaries\" *ngIf=\"question.get('boundaries').value\">\n                <div class=\"boundary\">\n                    <label class=\"bLabel qslyGray\">Minimum: </label>\n                    <input name=\"lowerBoundary\" type=\"number\" class=\"niceTextInput qslyGray\" (change)=\"validateNumber($event)\" value=\"question.get('upperBoundary').value\" formControlName=\"lowerBoundary\" />\n                </div>\n\n                <div class=\"boundary\">\n                    <label class=\"bLabel qslyGray\">Maximum: </label>\n                    <input name=\"upperBoundary\" type=\"number\" class=\"niceTextInput qslyGray\" (change)=\"validateNumber($event)\" value=\"question.get('upperBoundary').value\" formControlName=\"upperBoundary\" />\n                </div>\n            </div>\n\n            \n            <!-- IMAGE START -->\n            <!-- <div class=\"imgContainer\">\n                <h6 class=\"title qslyBlack\">Add an image</h6>\n                <div class=\"inner\">\n            \n                    <div id=\"uploadBtn\">\n                        <label for=\"picFile\" class=\"submitButton not\">Upload</label>\n                        <input id=\"picFile\" title=\"Hello\" style=\"display:none;\" type=\"file\" (change)=\"onPicChange($event)\" />\n                    </div>\n            \n                    <div>\n                        <p id=\"orText\" class=\"qslyGray\">or</p>\n                    </div>\n            \n                    <div id=\"urlImage\" class=\"input-group\" style=\"width: 100%\">\n                        <input type=\"text\" formControlName=\"pic\" #imgUrl class=\"form-control\" style=\"font-size: .5rem\" placeholder=\"Enter an image URL\">\n                        <div class=\"input-group-append\">\n                            <button (click)=\"setPicUrl(imgUrl.value)\" class=\"btn btn-outline-secondary\">\n                                <i class=\"fa fa-check\"></i>\n                            </button>\n                        </div>\n                    </div>\n            \n                </div>\n            \n                <div class=\"flex\">\n                    <img class=\"image\" *ngIf=\"question.get('pic').value !== ''\" id=\"preview\" [src]=\"question.get('pic').value\">\n                </div>\n            \n            </div> -->\n            <!-- IMAGE END -->\n\n        </div>\n\n        <!-- <div id=\"sbContainer\">\n            <a class=\"submitButton\" (click)=\"submitQuestion()\" style=\"margin-bottom:20px\">{{updateView ? \"Update\" : \"Add Question\"}}</a>\n        </div> -->\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/QuestionForms/number-question-form/number-question-form.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/QuestionForms/number-question-form/number-question-form.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title {\n  font-family: Karla;\n  font-weight: 700;\n  font-size: 1rem;\n  text-align: left;\n  margin: 30px 0px 5px 0px; }\n  .title.firstTitle {\n    margin-top: 5px; }\n  @media (max-width: 767px) {\n    .title {\n      margin-top: 15px; } }\n  .titleWithButton {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 95%;\n  margin: 20px auto 15px auto; }\n  .niceTextInput {\n  background: none;\n  outline-style: none;\n  text-align: center;\n  font-family: Karla;\n  border: none;\n  border-bottom: solid 1px #e2e2e2;\n  padding: 2px;\n  max-width: 100px;\n  font-size: 1rem; }\n  .niceTextAreaInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  padding: 2px;\n  width: 95%;\n  font-family: Helvetica Neue, sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  overflow: hidden; }\n  .multipleChoice {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 90%;\n  margin: 0 auto; }\n  .responseContainer {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 95%;\n  height: auto;\n  padding-left: 20px; }\n  .responseRow {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  margin: 2px auto;\n  width: 100%; }\n  .flex {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  #sbContainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: flex-start;\n  width: 100%;\n  padding-right: 20px; }\n  @media (max-width: 767px) {\n    #sbContainer {\n      justify-content: center;\n      padding: 0; } }\n  .submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 20%;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n  .submitButton.not {\n    background: #47d487;\n    margin-top: 2px;\n    margin-left: 10px;\n    padding: 2px 10px; }\n  .submitButton:active {\n    outline-style: none; }\n  .submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n  @media (max-width: 767px) {\n    .submitButton {\n      margin-top: 15px; } }\n  .boundaries {\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding-left: 20px;\n  margin-bottom: 30px; }\n  .boundary {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  margin-bottom: 12px; }\n  .bLabel {\n  width: 100%;\n  font-size: .9rem;\n  font-family: Karla;\n  margin-bottom: 0px;\n  margin-right: 16px; }\n  .imgContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  .imgContainer .inner {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    margin-bottom: 12px; }\n  #uploadBtn {\n  margin-right: 20px; }\n  @media (max-width: 767px) {\n    #uploadBtn {\n      margin-right: 10px; } }\n  #orText {\n  margin: 0px;\n  font-weight: 700;\n  font-family: Karla; }\n  #urlImage {\n  margin: 0px 20px; }\n  @media (max-width: 767px) {\n    #urlImage {\n      margin: 0 10px; } }\n  #preview {\n  border: 1px solid #28ab64;\n  width: 200px;\n  border-radius: 8px;\n  outline-style: none;\n  outline: none; }\n  @media (max-width: 767px) {\n  .form-control {\n    font-size: .55rem; } }\n  .valError {\n  color: #ff6969;\n  font-size: .8rem;\n  margin-left: 8px; }\n"

/***/ }),

/***/ "./src/app/QuestionForms/number-question-form/number-question-form.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/QuestionForms/number-question-form/number-question-form.component.ts ***!
  \**************************************************************************************/
/*! exports provided: NumberQuestionFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberQuestionFormComponent", function() { return NumberQuestionFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../form.service */ "./src/app/form.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NumberQuestionFormComponent = /** @class */ (function () {
    function NumberQuestionFormComponent(fb, formService, route) {
        this.fb = fb;
        this.formService = formService;
        this.route = route;
        this.questionData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.outputUpdateData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updateView = false;
        this.errors = {
            question: false,
        };
    }
    NumberQuestionFormComponent.prototype.ngOnInit = function () {
        if (this.updateData && this.updateData.kind !== "Number") {
            this.updateData = null;
        }
        this.createForm();
        this.onChanges();
    };
    NumberQuestionFormComponent.prototype.ngOnChanges = function () {
        if (this.updateData && this.updateData.kind !== "Number") {
            this.updateData = null;
        }
        this.createForm();
        if (this.getData) {
            this.submitQuestion();
        }
    };
    NumberQuestionFormComponent.prototype.validateNumber = function (event) {
        var newValue = Number(event.target.value);
        var name = event.target.name;
        var ub = this.question.get('upperBoundary').value;
        var lb = this.question.get('lowerBoundary').value;
        if (name === "lowerBoundary" && newValue >= ub)
            this.question.get('lowerBoundary').setValue(ub - 1);
        if (name === "upperBoundary" && newValue <= lb)
            this.question.get('upperBoundary').setValue(lb + 1);
    };
    NumberQuestionFormComponent.prototype.createForm = function () {
        if (this.updateData) {
            this.updateView = true;
            this.question = this.fb.group({
                kind: ['Number', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: this.updateData.required,
                number: this.updateData.number,
                pic: this.updateData.pic,
                boundaries: this.updateData.boundaries,
                lowerBoundary: [this.updateData.lowerBoundary, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                upperBoundary: [this.updateData.upperBoundary, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                id: this.updateData.id
            });
        }
        else {
            this.question = this.fb.group({
                kind: ['Number', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: true,
                number: this.qLength,
                pic: "",
                boundaries: false,
                lowerBoundary: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                upperBoundary: [100, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                id: Math.random().toString().substring(2),
            });
        }
    };
    NumberQuestionFormComponent.prototype.onChanges = function () {
        this.question.get('lowerBoundary').valueChanges.subscribe(function (val) {
            // window.console.log(this.question.get('lowerBoundary').value);
        });
        this.question.get('upperBoundary').valueChanges.subscribe(function (val) {
        });
    };
    NumberQuestionFormComponent.prototype.toggleBoundaries = function (boundaries) {
        if (boundaries === "Yes") {
            this.question.get('boundaries').setValue(true);
        }
        else {
            this.question.get('boundaries').setValue(false);
        }
    };
    NumberQuestionFormComponent.prototype.toggleRequried = function (isRequired) {
        if (isRequired === "Yes") {
            this.question.get('required').setValue(true);
        }
        else {
            this.question.get('required').setValue(false);
        }
    };
    NumberQuestionFormComponent.prototype.submitQuestion = function () {
        if (this.question.valid) {
            this.errors.question = false;
            if (this.updateView) {
                this.outputUpdateData.emit(this.question.value);
                this.updateView = false;
                this.updateData = null;
                this.createForm();
            }
            else {
                this.questionData.emit(this.question.value);
            }
            this.purgeForm();
        }
        else {
        }
    };
    NumberQuestionFormComponent.prototype.autosizeTextarea = function (event, el) {
        if (event.keyCode == 13) {
            el.blur();
        }
        else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    };
    NumberQuestionFormComponent.prototype.purgeForm = function () {
        this.question.markAsPristine();
        this.question.markAsUntouched();
        this.question.updateValueAndValidity();
        this.question.get('boundaries').setValue(false);
        this.question.get('lowerBoundary').setValue('0');
        this.question.get('upperBoundary').setValue('100');
        this.question.get('pic').setValue("");
        this.question.get('id').setValue(Math.random().toString().substring(2));
    };
    NumberQuestionFormComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.question.get('pic').setValue(url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    NumberQuestionFormComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    NumberQuestionFormComponent.prototype.onPicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    NumberQuestionFormComponent.prototype.setPicUrl = function (url) {
        this.question.get('pic').setValue(url);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], NumberQuestionFormComponent.prototype, "questionType", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], NumberQuestionFormComponent.prototype, "qLength", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NumberQuestionFormComponent.prototype, "updateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], NumberQuestionFormComponent.prototype, "getData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], NumberQuestionFormComponent.prototype, "questionData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], NumberQuestionFormComponent.prototype, "outputUpdateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])("imgTooltipCtrl"),
        __metadata("design:type", Object)
    ], NumberQuestionFormComponent.prototype, "imgTooltipCtrls", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])("imgTooltipToggle"),
        __metadata("design:type", Object)
    ], NumberQuestionFormComponent.prototype, "imgTooltipToggles", void 0);
    NumberQuestionFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-number-question-form',
            template: __webpack_require__(/*! ./number-question-form.component.html */ "./src/app/QuestionForms/number-question-form/number-question-form.component.html"),
            styles: [__webpack_require__(/*! ./number-question-form.component.scss */ "./src/app/QuestionForms/number-question-form/number-question-form.component.scss")],
            providers: [_form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], NumberQuestionFormComponent);
    return NumberQuestionFormComponent;
}());



/***/ }),

/***/ "./src/app/QuestionForms/rating-form/rating-form.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/QuestionForms/rating-form/rating-form.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"width: 100%\">\n    <form [formGroup]=\"question\" novalidate (ngSubmit)=submitQuestion()>    \n        <div class=\"multipleChoice\">\n            <!-- <h6 class=\"title qslyBlack firstTitle\">What is your question? <span class=\"valError\" *ngIf=\"errors.question\">*Question cannot be empty.</span></h6>\n            <div style=\"display: flex; align-items: center; width: 100%\">\n                <label style=\"margin-right: 10px; color: #CCC; margin-bottom: 0px;\">-</label>\n                <textarea class=\"niceTextAreaInput\" formControlName=\"body\" rows=\"1\" autofocus #f (keydown)=\"autosizeTextarea($event, f)\"></textarea>\n            </div> -->\n            <!-- <a formControlName=\"required\">Required</a> -->\n\n            <div style=\"margin-bottom: 30px\">\n                <h6 class=\"title qslyBlack\">Select a Rating Scale</h6>    \n                <div class='starArray'>\n                    <div *ngFor=\"let x of temp\">\n                     <img src=\"/images/icons/star.svg\" class=\"starIcon\" />\n                    </div>\n                </div>\n                <div style=\"display:flex\">\n                    <app-switch-buttons [active]=\"question.get('scale').value\" [option]=\"'5'\" [title]=\"'5'\" (selected)=\"toggleLimit($event)\" formControlName=\"scale\"></app-switch-buttons>\n                    <app-switch-buttons [active]=\"question.get('scale').value\" [option]=\"'10'\" [title]=\"'10'\" (selected)=\"toggleLimit($event)\" formControlName=\"scale\"></app-switch-buttons>\n                </div>\n            </div>\n\n            <!-- IMAGE START -->\n            <!-- <div class=\"imgContainer\">\n                <h6 class=\"title qslyBlack\">Add an image</h6>\n                <div class=\"inner\">\n            \n                    <div id=\"uploadBtn\">\n                        <label for=\"picFile\" class=\"submitButton not\">Upload</label>\n                        <input id=\"picFile\" title=\"Hello\" style=\"display:none;\" type=\"file\" (change)=\"onPicChange($event)\" />\n                    </div>\n            \n                    <div>\n                        <p id=\"orText\" class=\"qslyGray\">or</p>\n                    </div>\n            \n                    <div id=\"urlImage\" class=\"input-group\" style=\"width: 100%\">\n                        <input type=\"text\" formControlName=\"pic\" #imgUrl class=\"form-control\" style=\"font-size: .5rem\" placeholder=\"Enter an image URL\">\n                        <div class=\"input-group-append\">\n                            <button (click)=\"setPicUrl(imgUrl.value)\" class=\"btn btn-outline-secondary\">\n                                <i class=\"fa fa-check\"></i>\n                            </button>\n                        </div>\n                    </div>\n            \n                </div>\n            \n                <div class=\"flex\">\n                    <img class=\"image\" *ngIf=\"question.get('pic').value !== ''\" id=\"preview\" [src]=\"question.get('pic').value\">\n                </div>\n            \n            </div> -->\n            <!-- IMAGE END -->\n\n\n\n        </div>\n        \n        <!-- <div id=\"sbContainer\">\n            <a class=\"submitButton\" (click)=\"submitQuestion()\" style=\"margin-bottom:20px\">{{updateView ? \"Update\" : \"Add Question\"}}</a>\n        </div> -->\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/QuestionForms/rating-form/rating-form.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/QuestionForms/rating-form/rating-form.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title {\n  font-family: Karla;\n  font-weight: 700;\n  font-size: 1rem;\n  text-align: left;\n  margin: 30px 0px 5px 0px; }\n  .title.firstTitle {\n    margin-top: 5px; }\n  @media (max-width: 767px) {\n    .title {\n      margin-top: 15px; } }\n  .starIcon {\n  width: 28px; }\n  @media (max-width: 767px) {\n    .starIcon {\n      width: 18px; } }\n  .titleWithButton {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 95%;\n  margin: 20px auto 15px auto; }\n  .niceTextInput {\n  background: none;\n  outline-style: none;\n  border: solid 1px #2dc070;\n  border-radius: 4px;\n  padding: 2px;\n  width: 95%; }\n  .niceTextInput.bottom {\n    border: none;\n    border-bottom: solid 1px #2dc070;\n    border-radius: 0px; }\n  .niceTextAreaInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  padding: 2px;\n  width: 95%;\n  font-family: Helvetica Neue, sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  overflow: hidden; }\n  .multipleChoice {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 90%;\n  margin: 0 auto; }\n  .responseContainer {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 90%;\n  height: auto; }\n  .responseRow {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  margin: 2px auto;\n  width: 100%; }\n  .flex {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  #sbContainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: flex-start;\n  width: 100%;\n  padding-right: 20px; }\n  @media (max-width: 767px) {\n    #sbContainer {\n      justify-content: center;\n      padding: 0; } }\n  .submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 20%;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n  .submitButton.not {\n    background: #47d487;\n    margin-top: 2px;\n    margin-left: 10px;\n    padding: 2px 10px; }\n  .submitButton:active {\n    outline-style: none; }\n  .submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n  @media (max-width: 767px) {\n    .submitButton {\n      margin-top: 15px; } }\n  .starArray {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 12px; }\n  .starArray img {\n    margin: auto 6px; }\n  .imgContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  .imgContainer .inner {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    margin-bottom: 12px; }\n  #uploadBtn {\n  margin-right: 20px; }\n  @media (max-width: 767px) {\n    #uploadBtn {\n      margin-right: 10px; } }\n  #orText {\n  margin: 0px;\n  font-weight: 700;\n  font-family: Karla; }\n  #urlImage {\n  margin: 0px 20px; }\n  @media (max-width: 767px) {\n    #urlImage {\n      margin: 0 10px; } }\n  #preview {\n  border: 1px solid #28ab64;\n  width: 200px;\n  border-radius: 8px;\n  outline-style: none;\n  outline: none; }\n  @media (max-width: 767px) {\n  .form-control {\n    font-size: .55rem; } }\n  .valError {\n  color: #ff6969;\n  font-size: .8rem;\n  margin-left: 8px; }\n"

/***/ }),

/***/ "./src/app/QuestionForms/rating-form/rating-form.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/QuestionForms/rating-form/rating-form.component.ts ***!
  \********************************************************************/
/*! exports provided: RatingFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingFormComponent", function() { return RatingFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../form.service */ "./src/app/form.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RatingFormComponent = /** @class */ (function () {
    function RatingFormComponent(fb, formService, route) {
        this.fb = fb;
        this.formService = formService;
        this.route = route;
        this.questionData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.outputUpdateData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updateView = false;
        this.errors = {
            question: false,
        };
    }
    RatingFormComponent.prototype.ngOnInit = function () {
        this.temp = Array(5);
        if (this.updateData && this.updateData.kind != "Rating") {
            this.updateData = null;
        }
        this.createForm();
    };
    RatingFormComponent.prototype.ngOnChanges = function () {
        if (this.updateData && this.updateData.kind != "Rating") {
            this.updateData = null;
        }
        this.createForm();
        if (this.getData) {
            this.submitQuestion();
        }
    };
    RatingFormComponent.prototype.createForm = function () {
        if (this.updateData) {
            this.updateView = true;
            console.log(this.updateData);
            this.temp = Array(Number(this.updateData.scale));
            this.question = this.fb.group({
                kind: ['Rating', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: this.updateData.required,
                number: this.updateData.number,
                pic: this.updateData.pic,
                scale: this.updateData.scale,
                id: this.updateData.id
            });
        }
        else {
            this.question = this.fb.group({
                kind: ['Rating', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: true,
                number: this.qLength,
                pic: "",
                scale: '5',
                id: Math.random().toString().substring(2),
            });
        }
    };
    RatingFormComponent.prototype.toggleLimit = function (newLimit) {
        if (newLimit == '5') {
            this.question.get('scale').setValue('5');
            this.temp = Array(5);
        }
        else {
            this.question.get('scale').setValue('10');
            this.temp = Array(10);
        }
    };
    RatingFormComponent.prototype.toggleRequried = function (isRequired) {
        if (isRequired === "Yes") {
            this.question.get('required').setValue(true);
        }
        else {
            this.question.get('required').setValue(false);
        }
    };
    RatingFormComponent.prototype.submitQuestion = function () {
        if (this.question.valid) {
            this.errors.question = false;
            // window.console.log('Submitted!', this.question.value);
            if (this.updateView) {
                this.outputUpdateData.emit(this.question.value);
                this.updateView = false;
                this.updateData = null;
                this.createForm();
            }
            else {
                this.questionData.emit(this.question.value);
            }
            this.purgeForm();
        }
        else {
        }
    };
    RatingFormComponent.prototype.autosizeTextarea = function (event, el) {
        if (event.keyCode == 13) {
            el.blur();
        }
        else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    };
    RatingFormComponent.prototype.purgeForm = function () {
        this.question.markAsPristine();
        this.question.markAsUntouched();
        this.question.updateValueAndValidity();
        this.question.get('scale').setValue('5');
        this.temp = Array(5);
        this.question.get('pic').setValue("");
        this.question.get('id').setValue(Math.random().toString().substring(2));
    };
    RatingFormComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.question.get('pic').setValue(url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    RatingFormComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    RatingFormComponent.prototype.onPicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    RatingFormComponent.prototype.setPicUrl = function (url) {
        this.question.get('pic').setValue(url);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RatingFormComponent.prototype, "qLength", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RatingFormComponent.prototype, "updateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], RatingFormComponent.prototype, "getData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], RatingFormComponent.prototype, "questionData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], RatingFormComponent.prototype, "outputUpdateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])("imgTooltipCtrl"),
        __metadata("design:type", Object)
    ], RatingFormComponent.prototype, "imgTooltipCtrls", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])("imgTooltipToggle"),
        __metadata("design:type", Object)
    ], RatingFormComponent.prototype, "imgTooltipToggles", void 0);
    RatingFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-rating-question-form',
            template: __webpack_require__(/*! ./rating-form.component.html */ "./src/app/QuestionForms/rating-form/rating-form.component.html"),
            styles: [__webpack_require__(/*! ./rating-form.component.scss */ "./src/app/QuestionForms/rating-form/rating-form.component.scss")],
            providers: [_form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], RatingFormComponent);
    return RatingFormComponent;
}());



/***/ }),

/***/ "./src/app/QuestionForms/short-answer-form/short-answer-form.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/QuestionForms/short-answer-form/short-answer-form.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"width: 100%\">\n    <form [formGroup]=\"question\" novalidate (ngSubmit)=submitQuestion()>    \n        <div class=\"multipleChoice\">\n            <h6 class=\"title qslyBlack firstTitle\">What is your question? <span class=\"valError\" *ngIf=\"errors.question\">*Question cannot be empty.</span></h6>\n            <div style=\"display: flex; align-items: center; width: 100%\">\n                <label style=\"margin-right: 10px; color: #CCC; margin-bottom: 0px;\">-</label>\n                <textarea class=\"niceTextAreaInput\" formControlName=\"body\" rows=\"1\" autofocus #f (keydown)=\"autosizeTextarea($event, f)\"></textarea>\n            </div>\n            <!-- <a formControlName=\"required\">Required</a> -->\n\n            <!-- IMAGE START -->\n            <div class=\"imgContainer\">\n                <h6 class=\"title qslyBlack\">Add an image</h6>\n                <div class=\"inner\">\n            \n                    <div id=\"uploadBtn\">\n                        <label for=\"picFile\" class=\"submitButton not\">Upload</label>\n                        <input id=\"picFile\" title=\"Hello\" style=\"display:none;\" type=\"file\" (change)=\"onPicChange($event)\" />\n                    </div>\n            \n                    <div>\n                        <p id=\"orText\" class=\"qslyGray\">or</p>\n                    </div>\n            \n                    <div id=\"urlImage\" class=\"input-group\" style=\"width: 100%\">\n                        <input type=\"text\" formControlName=\"pic\" #imgUrl class=\"form-control\" style=\"font-size: .5rem\" placeholder=\"Enter an image URL\">\n                        <div class=\"input-group-append\">\n                            <button (click)=\"setPicUrl(imgUrl.value)\" class=\"btn btn-outline-secondary\">\n                                <i class=\"fa fa-check\"></i>\n                            </button>\n                        </div>\n                    </div>\n            \n                </div>\n            \n                <div class=\"flex\">\n                    <img class=\"image\" *ngIf=\"question.get('pic').value !== ''\" id=\"preview\" [src]=\"question.get('pic').value\">\n                </div>\n            \n            </div>\n            <!-- IMAGE END -->\n\n\n\n        </div>\n        <div id=\"sbContainer\">\n            <a class=\"submitButton\" (click)=\"submitQuestion()\" style=\"margin-bottom:20px\">{{updateView ? \"Update\" : \"Add Question\"}}</a>\n        </div>\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/QuestionForms/short-answer-form/short-answer-form.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/QuestionForms/short-answer-form/short-answer-form.component.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title {\n  font-family: Karla;\n  font-weight: 700;\n  font-size: 1rem;\n  text-align: left;\n  margin: 30px 0px 5px 0px; }\n  .title.firstTitle {\n    margin-top: 5px; }\n  @media (max-width: 767px) {\n    .title {\n      margin-top: 15px; } }\n  .titleWithButton {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 95%;\n  margin: 20px auto 15px auto; }\n  .niceTextInput {\n  background: none;\n  outline-style: none;\n  border: solid 1px #2dc070;\n  border-radius: 4px;\n  padding: 2px;\n  width: 95%; }\n  .niceTextInput.bottom {\n    border: none;\n    border-bottom: solid 1px #2dc070;\n    border-radius: 0px; }\n  .niceTextAreaInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  padding: 2px;\n  width: 95%;\n  font-family: Helvetica Neue, sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  overflow: hidden; }\n  .multipleChoice {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 90%;\n  margin: 0 auto; }\n  .responseContainer {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 90%;\n  height: auto; }\n  .responseRow {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  margin: 5px auto;\n  width: 100%; }\n  .flex {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  #sbContainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: flex-start;\n  width: 100%;\n  padding-right: 20px; }\n  @media (max-width: 767px) {\n    #sbContainer {\n      justify-content: center;\n      padding: 0; } }\n  .submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 20%;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n  .submitButton.not {\n    background: #47d487;\n    margin-top: 2px;\n    margin-left: 10px;\n    padding: 2px 10px; }\n  .submitButton:active {\n    outline-style: none; }\n  .submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n  @media (max-width: 767px) {\n    .submitButton {\n      margin-top: 15px; } }\n  .imgContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n  .imgContainer .inner {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    margin-bottom: 12px; }\n  #uploadBtn {\n  margin-right: 20px; }\n  @media (max-width: 767px) {\n    #uploadBtn {\n      margin-right: 10px; } }\n  #orText {\n  margin: 0px;\n  font-weight: 700;\n  font-family: Karla; }\n  #urlImage {\n  margin: 0px 20px; }\n  @media (max-width: 767px) {\n    #urlImage {\n      margin: 0 10px; } }\n  #preview {\n  border: 1px solid #28ab64;\n  width: 200px;\n  border-radius: 8px;\n  outline-style: none;\n  outline: none; }\n  @media (max-width: 767px) {\n  .form-control {\n    font-size: .55rem; } }\n  .valError {\n  color: #ff6969;\n  font-size: .8rem;\n  margin-left: 8px; }\n"

/***/ }),

/***/ "./src/app/QuestionForms/short-answer-form/short-answer-form.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/QuestionForms/short-answer-form/short-answer-form.component.ts ***!
  \********************************************************************************/
/*! exports provided: ShortAnswerFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShortAnswerFormComponent", function() { return ShortAnswerFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../form.service */ "./src/app/form.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShortAnswerFormComponent = /** @class */ (function () {
    function ShortAnswerFormComponent(fb, formService, route) {
        this.fb = fb;
        this.formService = formService;
        this.route = route;
        this.questionData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.outputUpdateData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updateView = false;
        this.errors = {
            question: false,
        };
    }
    ShortAnswerFormComponent.prototype.ngOnInit = function () {
        if (this.updateData && this.updateData.kind != "Short Answer") {
            this.updateData = null;
        }
        this.createForm();
    };
    ShortAnswerFormComponent.prototype.ngOnChanges = function () {
        if (this.updateData) {
            this.createForm();
        }
    };
    // ngOnDestroy() {
    //     this.updateData = null;
    // }
    ShortAnswerFormComponent.prototype.createForm = function () {
        if (this.updateData) {
            this.updateView = true;
            this.question = this.fb.group({
                body: [this.updateData.body, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(1)]],
                kind: ['Short Answer', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: this.updateData.required,
                number: this.updateData.number,
                pic: this.updateData.pic,
                id: this.updateData.id
            });
        }
        else {
            this.question = this.fb.group({
                body: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(1)]],
                kind: ['Short Answer', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                options: this.fb.array([]),
                required: true,
                number: this.qLength,
                pic: "",
                id: Math.random().toString().substring(2),
            });
        }
    };
    ShortAnswerFormComponent.prototype.toggleRequried = function (isRequired) {
        if (isRequired === "Yes") {
            this.question.get('required').setValue(true);
        }
        else {
            this.question.get('required').setValue(false);
        }
    };
    ShortAnswerFormComponent.prototype.submitQuestion = function () {
        if (this.question.valid) {
            this.errors.question = false;
            if (this.updateView) {
                this.outputUpdateData.emit(this.question.value);
                this.updateView = false;
                this.updateData = null;
                this.createForm();
            }
            else {
                this.questionData.emit(this.question.value);
            }
            this.purgeForm();
        }
        else {
            this.errors.question = !this.question.get('body').valid;
        }
    };
    ShortAnswerFormComponent.prototype.autosizeTextarea = function (event, el) {
        if (event.keyCode == 13) {
            el.blur();
        }
        else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    };
    ShortAnswerFormComponent.prototype.purgeForm = function () {
        this.question.markAsPristine();
        this.question.markAsUntouched();
        this.question.updateValueAndValidity();
        this.question.get('body').setValue("");
        this.question.get('pic').setValue("");
        this.question.get('id').setValue(Math.random().toString().substring(2));
    };
    ShortAnswerFormComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.question.get('pic').setValue(url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    ShortAnswerFormComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    ShortAnswerFormComponent.prototype.onPicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    ShortAnswerFormComponent.prototype.setPicUrl = function (url) {
        this.question.get('pic').setValue(url);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ShortAnswerFormComponent.prototype, "questionType", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ShortAnswerFormComponent.prototype, "qLength", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ShortAnswerFormComponent.prototype, "updateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ShortAnswerFormComponent.prototype, "questionData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ShortAnswerFormComponent.prototype, "outputUpdateData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])("imgTooltipCtrl"),
        __metadata("design:type", Object)
    ], ShortAnswerFormComponent.prototype, "imgTooltipCtrls", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])("imgTooltipToggle"),
        __metadata("design:type", Object)
    ], ShortAnswerFormComponent.prototype, "imgTooltipToggles", void 0);
    ShortAnswerFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sa-question-form',
            template: __webpack_require__(/*! ./short-answer-form.component.html */ "./src/app/QuestionForms/short-answer-form/short-answer-form.component.html"),
            styles: [__webpack_require__(/*! ./short-answer-form.component.scss */ "./src/app/QuestionForms/short-answer-form/short-answer-form.component.scss")],
            providers: [_form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _form_service__WEBPACK_IMPORTED_MODULE_3__["FormService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], ShortAnswerFormComponent);
    return ShortAnswerFormComponent;
}());



/***/ }),

/***/ "./src/app/Sidebar/community-image/community-image.component.html":
/*!************************************************************************!*\
  !*** ./src/app/Sidebar/community-image/community-image.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"iContainer\" [routerLink]=\"['/group', data.id]\" (click)=\"clickedCommunity()\">\n  <div class=\"imgDiv\">\n      <img class=\"commImg\" *ngIf=\"data.pic\" [src]=\"data.pic\" />\n      <img class=\"commImg\" *ngIf=\"!data.pic\" src=\"/images/community.png\" />\n      <a *ngIf=\"showNames\" class=\"commText\" [routerLink]=\"['/group', data.id]\">{{title}}</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/Sidebar/community-image/community-image.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/Sidebar/community-image/community-image.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".iContainer {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: column;\n  flex-basis: 33%;\n  margin-bottom: 3px; }\n  .iContainer:active {\n    outline-style: none; }\n  a {\n  font-weight: 400;\n  font-family: Karla;\n  font-size: .75rem;\n  color: #333;\n  display: block;\n  padding: auto 5px;\n  margin-top: 2px; }\n  a:hover {\n    cursor: pointer; }\n  .commImg {\n  width: 100%;\n  height: 77px; }\n  .commImg:hover {\n    cursor: pointer; }\n  .imgDiv {\n  position: relative;\n  margin: 0px 2px;\n  overflow: hidden; }\n  .imgDiv .commImg {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    -o-object-fit: cover;\n       object-fit: cover; }\n  .imgDiv:hover .commImg {\n    -webkit-transform: scale(1.08);\n            transform: scale(1.08);\n    transition: all 100ms ease-in-out; }\n  .commText {\n  display: block;\n  text-align: left;\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  padding: 20px 0 4px 4px;\n  color: white;\n  background: linear-gradient(0, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0));\n  text-transform: capitalize;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n  @media (max-width: 767px) {\n    .commText {\n      font-size: .55rem; } }\n"

/***/ }),

/***/ "./src/app/Sidebar/community-image/community-image.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/Sidebar/community-image/community-image.component.ts ***!
  \**********************************************************************/
/*! exports provided: CommunityImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityImageComponent", function() { return CommunityImageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CommunityImageComponent = /** @class */ (function () {
    function CommunityImageComponent() {
        this.title = '';
    }
    CommunityImageComponent.prototype.ngOnInit = function () {
        this.startingTime = Date.now();
        this.title = this.data.title;
        this.cropTitle();
    };
    CommunityImageComponent.prototype.cropTitle = function () {
        var index = 0;
        for (var i = 0; i < 3; i++) {
            index = this.title.indexOf(' ', index + 1);
            if (index === -1) {
                return;
            }
        }
        if (index !== -1) {
            this.title = this.title.substr(0, index) + '...';
        }
    };
    CommunityImageComponent.prototype.clickedCommunity = function () {
        var startingTime = this.startingTime;
        window.mixpanel.track("Discovered Community on Feed", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "communityId": this.data.id,
            "name": this.data.title,
            "timestamp": Date.now()
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CommunityImageComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], CommunityImageComponent.prototype, "showNames", void 0);
    CommunityImageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-community-image',
            template: __webpack_require__(/*! ./community-image.component.html */ "./src/app/Sidebar/community-image/community-image.component.html"),
            styles: [__webpack_require__(/*! ./community-image.component.scss */ "./src/app/Sidebar/community-image/community-image.component.scss")],
        })
    ], CommunityImageComponent);
    return CommunityImageComponent;
}());



/***/ }),

/***/ "./src/app/Sidebar/group.model.ts":
/*!****************************************!*\
  !*** ./src/app/Sidebar/group.model.ts ***!
  \****************************************/
/*! exports provided: GroupModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupModel", function() { return GroupModel; });
var GroupModel = /** @class */ (function () {
    function GroupModel(object) {
        this.object = object;
        // general data
        this.title = object.title;
        this.id = object.id; // encrypted
        this.pic = object.pic;
    }
    return GroupModel;
}());



/***/ }),

/***/ "./src/app/Sidebar/right-panel/right-panel.component.html":
/*!****************************************************************!*\
  !*** ./src/app/Sidebar/right-panel/right-panel.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Placeholder -->\n<div class=\"rpnHolder\">\n    <div class=\"sContainer\">\n    </div>\n</div>\n\n\n\n<div id=\"rightPanel\">\n    <div class=\"sContainer\" >\n        <h3 class=\"lpText small\">Top Tags</h3>\n        <div class=\"catList\">\n            <div *ngFor=\"let t of topTags\" class=\"catContainer\" (click)=\"toggleTag(t)\">\n                <img class=\"catIcon\" src=\"/images/icons/next.svg\" />\n                <span class=\"catTitle\" [ngClass]=\"{selected: t === currentTag}\">{{t}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"sContainer\" *ngIf=\"loggedin && noLocation\">\n        <h3 class=\"lpText small\">Please Complete Your Profile</h3>\n\n        <h3 class=\"lpText medium\" *ngIf=\"submittedLocation\">Thanks for updating your profile!</h3>\n\n        <div *ngIf=\"!submittedLocation\">\n            <p>Location</p>\n            <form [formGroup]=\"locationForm\" novalidate>\n                <div class=\"formBox\">\n                    <div class=\"formGroup\">\n                        <label for=\"city\">City</label>\n                        <input type=\"text\" name=\"city\" formControlName=\"city\" />\n                    </div>\n                    <div class=\"formGroup\">\n                        <label for=\"state\">State</label>\n                        <input type=\"text\" name=\"city\" formControlName=\"state\" />\n                    </div>\n                    <div class=\"formGroup\">\n                        <label for=\"country\">Country</label>\n                        <input type=\"text\" name=\"city\" formControlName=\"country\" />\n                    </div>\n                </div>\n            </form>\n            <p class=\"submitButton\" (click)=\"updateLocation()\">Submit</p>\n        </div>\n    </div>\n\n    <a class=\"sContainer fbCont\" id=\"feedbackBtn\" (click)=\"toggleFb()\" *ngIf=\"!showFeedbackForm\">Give us Feedback!</a>\n\n    <div class=\"sContainer fbCont\" *ngIf=\"showFeedbackForm\">\n        <h3 class=\"lpText medium\" *ngIf=\"sentFeedback\" style=\"margin-top: 0\">Thanks for the Feedback!</h3>\n\n        <div *ngIf=\"!sentFeedback\" style=\"width: 100%\">\n            <div class=\"flex\">\n                <div id=\"emptyContainer\"></div>\n                <h3 class=\"lpText small\">Send Feedback</h3>\n                <i class=\"fa fa-times cancelCross\" (click)=\"toggleFb()\"></i>\n            </div>\n\n            <p  *ngIf=\"fbError\" class=\"valError\">Feedback cannot be empty</p>\n\n            <div>\n                <form [formGroup]=\"feedbackForm\" novalidate style=\"width: 100%\">\n                        <div class=\"formGroup\">\n                            <textarea formControlName=\"feedback\" name=\"feedback\" id=\"fbInput\" rows=\"6\"></textarea>\n                        </div>\n                </form>\n                <p class=\"submitButton\" (click)=\"sendFeedback()\" style=\"margin-top: 8px;\">Submit</p>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/Sidebar/right-panel/right-panel.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/Sidebar/right-panel/right-panel.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3 {\n  font-size: 1.2rem;\n  font-weight: 500;\n  font-family: Quicksand; }\n\n.sContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: #FFF;\n  border: solid 1px #e2e2e2;\n  border-radius: 5px;\n  box-sizing: border-box;\n  margin: 8px auto;\n  padding: 12px 10px 0px 10px; }\n\n@media (max-width: 768px) {\n    .sContainer {\n      flex-basis: 33%;\n      margin: auto 0; } }\n\n.sMenu {\n  display: flex;\n  justify-content: space-around;\n  flex-direction: row;\n  width: 80%;\n  padding-top: 20px; }\n\n.icons {\n  color: #28ab64;\n  display: block;\n  font-size: 24px; }\n\n.icons:hover {\n    cursor: pointer; }\n\n.line {\n  height: 1px;\n  border-top: #28ab64 solid 1px;\n  width: 90%;\n  margin: 4px auto; }\n\n.catList {\n  padding: 2px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  padding-bottom: 12px; }\n\n@media (max-width: 768px) {\n    .catList {\n      flex-flow: wrap; } }\n\n.catContainer {\n  width: 95%;\n  padding: 4px;\n  display: flex;\n  align-items: center; }\n\n.catContainer:hover {\n    cursor: pointer; }\n\n.catContainer:hover .catTitle {\n      color: #28ab64; }\n\n@media (max-width: 768px) {\n    .catContainer {\n      width: auto; } }\n\n.flex {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 0 12px; }\n\n.selected {\n  color: #28ab64 !important; }\n\n.catIcon {\n  width: 12px !important;\n  color: #333 !important;\n  margin-right: 10px; }\n\n@media (max-width: 768px) {\n    .catIcon {\n      display: none; } }\n\n.catTitle {\n  font-family: Karla;\n  color: #666;\n  font-weight: 300;\n  font-size: .9rem;\n  text-transform: capitalize; }\n\n@media (max-width: 768px) {\n    .catTitle {\n      font-size: .62rem;\n      font-weight: 700;\n      margin-right: 3px; } }\n\n.emoContainer {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  width: 100%;\n  margin: 10px auto; }\n\n.emoContainer .emoAndText {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: flex-start;\n    width: 50px;\n    margin: 2px 8px; }\n\n.emoContainer .emoAndText:hover {\n      cursor: pointer; }\n\n.hoverGrow:hover {\n  cursor: pointer; }\n\n.hoverGrow:hover .emoticon {\n    height: 42px; }\n\n.hoverGrow:hover .emoText {\n    font-size: .75rem; }\n\n.vCenter {\n  align-items: center; }\n\n.emoticon {\n  height: 32px; }\n\n.emoticon.emoSelected {\n    height: 60px; }\n\n.emoticon.blurred {\n    opacity: .25; }\n\n.emoText {\n  font-family: Karla;\n  color: #28ab64;\n  font-size: .65rem;\n  font-weight: 700;\n  text-align: center;\n  width: 50px; }\n\n.emoSelected {\n  font-weight: 700;\n  font-size: .85rem;\n  color: #28ab64; }\n\n.title {\n  font-family: Karla;\n  color: #666;\n  font-size: 1rem;\n  margin: 5px auto; }\n\n.lpText {\n  color: #666;\n  text-align: center; }\n\n.small {\n  font-size: .9rem; }\n\n.medium {\n  font-size: 1rem;\n  margin-top: 20px;\n  color: #666; }\n\n.submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 6px 18px;\n  float: right;\n  text-align: center;\n  border: none;\n  display: inline-block;\n  margin: 0 auto;\n  margin-bottom: 12px;\n  font-size: .8rem;\n  font-family: Karla;\n  font-weight: 300;\n  color: #FFF !important;\n  outline-style: none; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    background: #2ec473; }\n\np {\n  color: #666;\n  font-size: .8rem;\n  font-weight: 700;\n  font-family: Karla;\n  margin: 4px; }\n\n.formGroup {\n  display: flex;\n  align-items: center;\n  margin-bottom: 3px; }\n\n.formGroup label {\n    color: #666;\n    font-size: .65rem;\n    margin-right: 6px;\n    margin-bottom: 0;\n    min-width: 22%; }\n\n.formGroup input {\n    outline-style: none;\n    font-size: .75rem;\n    color: #666;\n    flex: 1;\n    font-family: Karla; }\n\n.formBox {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 8px;\n  padding: 10px;\n  border: 1px solid #e2e2e2;\n  border-radius: 4px; }\n\n#feedbackBtn {\n  font-weight: 700;\n  font-size: .9rem;\n  color: #AAA;\n  width: 100%;\n  text-align: center;\n  padding-bottom: 12px;\n  border: solid 1px #e2e2e2;\n  display: block;\n  border-radius: 5px;\n  box-sizing: border-box;\n  margin: 8px auto;\n  padding: 12px 10px;\n  cursor: pointer; }\n\n#feedbackBtn:hover {\n    color: #666;\n    border-color: #d5d5d5; }\n\n@media (max-width: 768px) {\n    #feedbackBtn {\n      flex-basis: 33%;\n      margin: auto 0; } }\n\n#fbInput {\n  border: solid 1px #e2e2e2;\n  width: 100%; }\n\n.cancelCross {\n  color: #CCC;\n  font-size: 1.1rem;\n  display: block; }\n\n.cancelCross:hover {\n    cursor: pointer;\n    color: #666; }\n\n.valError {\n  color: #ff6969;\n  font-size: .8rem;\n  font-weight: 400;\n  margin: 4px 0 6px 0;\n  text-align: center;\n  width: 100%; }\n\n@media (max-width: 768px) {\n  .fbCont {\n    margin-top: 8px !important; } }\n\n.rpnHolder {\n  visibility: hidden;\n  margin-bottom: -14px; }\n"

/***/ }),

/***/ "./src/app/Sidebar/right-panel/right-panel.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/Sidebar/right-panel/right-panel.component.ts ***!
  \**************************************************************/
/*! exports provided: RightPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RightPanelComponent", function() { return RightPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RightPanelComponent = /** @class */ (function () {
    function RightPanelComponent(http, fb, router, userService) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.userService = userService;
        this.toggledTag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.currentEmo = null;
        this.topTags = [];
        this.noLocation = false;
        this.submittedLocation = false;
        this.showFeedbackForm = false;
        this.sentFeedback = false;
        this.fbError = false;
        this.users = [];
        this.postResults = [];
    }
    RightPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkLocation();
        this.locationForm = this.fb.group({
            city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            state: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.feedbackForm = this.fb.group({
            feedback: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(1)]]
        });
        this.http.post('/tags/list', {})
            .toPromise()
            .then(function (res) {
            var tags = res.json().data;
            // console.log(tags);
            for (var i = 0; i < tags.length; i++) {
                var t = tags[i];
                _this.topTags.push(t.tag + ' (' + t.count + ')');
                // this.topTags.push(t.tag);
            }
        });
        this.currentTag = null;
        this.http.get('/users/feedlist')
            .toPromise()
            .then(function (response) {
            _this.users = _this.users.concat(response.json().data);
        });
    };
    RightPanelComponent.prototype.checkLocation = function () {
        var _this = this;
        this.userService.afterLoginCheck().then(function (userData) {
            if (userData != 0) {
                if (userData.location.city == '') {
                    _this.noLocation = true;
                }
            }
        });
    };
    RightPanelComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    RightPanelComponent.prototype.toggleTag = function (tag) {
        if (this.currentTag === tag) {
            this.currentTag = null;
            this.toggledTag.emit(null);
        }
        else {
            this.currentTag = tag;
            this.toggledTag.emit(tag);
        }
    };
    RightPanelComponent.prototype.updateLocation = function () {
        var _this = this;
        this.http.post('/users/updateLocation', { location: this.locationForm.value })
            .toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                _this.locationReceived();
            }
        });
    };
    RightPanelComponent.prototype.locationReceived = function () {
        var _this = this;
        this.submittedLocation = true;
        window.setTimeout(function () {
            _this.noLocation = false;
        }, 2500);
    };
    RightPanelComponent.prototype.toggleFb = function () {
        this.showFeedbackForm = !this.showFeedbackForm;
        this.fbError = false;
    };
    RightPanelComponent.prototype.sendFeedback = function () {
        var _this = this;
        var feedback = this.feedbackForm.value.feedback;
        if (this.feedbackForm.valid) {
            this.fbError = false;
            this.sentFeedback = true;
            // Reset Feedback form
            var resetFb = function () {
                _this.toggleFb();
                _this.sentFeedback = false;
                _this.feedbackForm.get('feedback').setValue('');
            };
            window.setTimeout(resetFb, 2000);
            this.http.post('/savefeedback', { feedback: feedback })
                .toPromise()
                .then(function (response) { });
        }
        else {
            this.fbError = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], RightPanelComponent.prototype, "loggedin", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], RightPanelComponent.prototype, "toggledTag", void 0);
    RightPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-right-panel',
            template: __webpack_require__(/*! ./right-panel.component.html */ "./src/app/Sidebar/right-panel/right-panel.component.html"),
            styles: [__webpack_require__(/*! ./right-panel.component.scss */ "./src/app/Sidebar/right-panel/right-panel.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]])
    ], RightPanelComponent);
    return RightPanelComponent;
}());



/***/ }),

/***/ "./src/app/Sidebar/sidebar/sidebar.component.html":
/*!********************************************************!*\
  !*** ./src/app/Sidebar/sidebar/sidebar.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Beginning Placeholder -->\n<div class=\"qSidebar sdbHolder\" id=\"sidebar\">\n  <div class=\"sContainer\">\n  </div>\n</div>\n\n<!-- Profile Sidebar -->\n<div *ngIf=\"context === 'profile'\" class=\"qSidebar\" id=\"sdb\">\n  <button *ngIf=\"me\" style=\"font-family: Karla\" class=\"btn btn-outline-success\" id=\"askBtn\" routerLink=\"/createForm\">\n      Ask a Question\n  </button>\n\n  <div class=\"sContainer\">\n      <h6 *ngIf=\"networklist.length == 0\" class=\"lpText\">\n          {{me ? 'Your' : userName + \"'s\"}} friends list is empty.<br/>\n          Discover other members!\n      </h6>\n      <h6 *ngIf=\"networklist.length !== 0\" class=\"lpText\">\n          {{me ? 'My' : userName + \"'s\"}} Friends\n      </h6>\n\n      <div *ngIf=\"networklist.length != 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let p of networklist\" style=\"flex-basis:33%;\">\n              <app-user-image [showNames]=\"showNames\" [data]=\"p\"> </app-user-image>\n          </div>\n      </div>\n      <div *ngIf=\"networklist.length == 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let p of users\" style=\"flex-basis:33%;\">\n              <app-user-image [showNames]=\"showNames\" [data]=\"p\"> </app-user-image>\n          </div>\n      </div>\n\n      <div *ngIf=\"networklist.length !== 0\" class=\"moreLink\">\n          <a [routerLink]=\"['/profile', user, 'friends']\" class=\"viewAllBtn\">\n              View All\n          </a>\n      </div>\n\n\n      <div *ngIf=\"showFriendsLoading\" class=\"loadingContainer\">\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n      </div>\n  </div>\n\n  <div class=\"sContainer\">\n      <h6 *ngIf=\"communitylist.length == 0\" class=\"lpText\">\n          {{me ? \"You haven't\" : userName + \" hasn't\"}} joined a group yet.<br/>\n          Discover other groups!\n      </h6>\n      <h6 *ngIf=\"communitylist.length !== 0\" class=\"lpText\">\n          {{me ? 'My' : userName + \"'s\"}} Groups\n      </h6>\n\n      <div *ngIf=\"communitylist.length != 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let c of communitylist\" style=\"flex-basis:33%;\">\n              <app-community-image [showNames]=\"showNames\" [data]=\"c\"> </app-community-image>\n          </div>\n      </div>\n      <div *ngIf=\"communitylist.length == 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let c of randomlist\" style=\"flex-basis:33%;\">\n              <app-community-image [showNames]=\"showNames\" [data]=\"c\"> </app-community-image>\n          </div>\n      </div>\n\n      <div *ngIf=\"communitylist.length !== 0\" class=\"moreLink\">\n          <a [routerLink]=\"['/profile', user, 'groups']\">\n              View All\n          </a>\n      </div>\n\n\n      <div *ngIf=\"showCommunityLoading\" class=\"loadingContainer\">\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n      </div>\n\n  </div>\n</div>\n\n<!-- Feed Sidebar -->\n<div *ngIf=\"context === 'feed'\" class=\"mainContainer qSidebar\" id=\"sdb\">\n  <div class=\"sContainer lhs\">\n      <h3 class=\"lpText\">Discover People</h3>\n      <div *ngIf=\"networklist.length != 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let p of networklist\" style=\"flex-basis:33%;\">\n              <app-user-image [showNames]=\"showNames\" [data]=\"p\"> </app-user-image>\n          </div>\n      </div>\n      <div *ngIf=\"networklist.length == 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let p of users\" style=\"flex-basis:33%;\">\n              <app-user-image [showNames]=\"showNames\" [data]=\"p\"> </app-user-image>\n          </div>\n      </div>\n\n\n      <div *ngIf=\"showFriendsLoading\" class=\"loadingContainer\">\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n      </div>\n\n  </div>\n\n  <div class=\"sContainer comPadding rhs\">\n      <h3 class=\"lpText\">Discover Groups</h3>\n      <div *ngIf=\"communitylist.length != 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let c of communitylist\" style=\"flex-basis:33%;\">\n              <app-community-image [showNames]=\"showNames\" [data]=\"c\"> </app-community-image>\n          </div>\n      </div>\n      <div *ngIf=\"communitylist.length == 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let c of data\" style=\"flex-basis:33%;\">\n              <app-community-image [showNames]=\"showNames\" [data]=\"c\"> </app-community-image>\n          </div>\n      </div>\n\n      <div *ngIf=\"showCommunityLoading\" class=\"loadingContainer\">\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n      </div>\n\n      <a class=\"submitButton\" [routerLink]=\"['/createGroup']\">Create Group</a>\n  </div>\n</div>\n\n\n<!-- Community Sidebar -->\n<div *ngIf=\"context === 'community'\" class=\"qSidebar\" id=\"sdb\">\n  <div class=\"sContainer\">\n      <h6 class=\"lpText small\">Members</h6>\n      <div *ngIf=\"networklist.length != 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let p of networklist\" style=\"flex-basis:33%;\">\n              <app-user-image [showNames]=\"showNames\" [data]=\"p\"> </app-user-image>\n          </div>\n      </div>\n\n      <div *ngIf=\"showFriendsLoading\" class=\"loadingContainer\">\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n      </div>\n  </div>\n\n  <div class=\"sContainer comPadding rhs\">\n      <h3 class=\"lpText\">Discover Groups</h3>\n      <div *ngIf=\"communitylist.length != 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let c of communitylist\" style=\"flex-basis:33%;\">\n              <app-community-image [showNames]=\"showNames\" [data]=\"c\"> </app-community-image>\n          </div>\n      </div>\n      <div *ngIf=\"communitylist.length == 0\" class=\"peopleContainer\">\n          <div *ngFor=\"let c of data\">\n              <app-community-image [showNames]=\"showNames\" [data]=\"c\"> </app-community-image>\n          </div>\n      </div>\n\n      <div *ngIf=\"showCommunityLoading\" class=\"loadingContainer\">\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n          <div class=\"loadingBox\"></div>\n      </div>\n\n      <a class=\"submitButton\" [routerLink]=\"['/createGroup']\">Create Group</a>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/Sidebar/sidebar/sidebar.component.scss":
/*!********************************************************!*\
  !*** ./src/app/Sidebar/sidebar/sidebar.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3 {\n  font-size: 1.2rem;\n  font-weight: 500;\n  font-family: Quicksand; }\n\n.sContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: #FFF;\n  border: solid 1px #e2e2e2;\n  border-radius: 5px;\n  box-sizing: border-box;\n  margin: 8px auto;\n  padding: 12px 1px 0px 1px;\n  width: 100%; }\n\n@media (max-width: 767px) {\n    .sContainer {\n      flex-basis: 49%;\n      margin: 10px 0 8px 0;\n      padding-bottom: 0px; } }\n\n@media (max-width: 767px) {\n  .lhs {\n    margin-right: 1%; } }\n\n@media (max-width: 767px) {\n  .rhs {\n    margin-left: 1%; } }\n\n.commPadding {\n  padding-bottom: 15px; }\n\n@media (max-width: 767px) {\n    .commPadding {\n      padding-bottom: 0; } }\n\n.mainContainer {\n  display: flex;\n  flex-flow: row wrap; }\n\n.sMenu {\n  display: flex;\n  justify-content: space-around;\n  flex-direction: row;\n  width: 80%;\n  padding-top: 20px; }\n\n.icons {\n  color: #28ab64;\n  display: block;\n  font-size: 24px; }\n\n.icons:hover {\n    cursor: pointer; }\n\n.line {\n  height: 1px;\n  border-top: #28ab64 solid 1px;\n  width: 90%;\n  margin: 4px auto; }\n\n.activeView {\n  color: #c7d2ba;\n  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.6); }\n\n.userImage {\n  width: 100px;\n  height: 100px;\n  border-radius: 50px;\n  border: 4px solid #737373;\n  z-index: 3;\n  background-color: #666; }\n\n.content {\n  display: inline;\n  margin-left: 10px; }\n\n.userName {\n  padding-top: 30px; }\n\n.stars {\n  padding-bottom: 20px; }\n\n.peopleContainer {\n  padding: 4px;\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: flex-start;\n  width: 100%; }\n\n@media (max-width: 767px) {\n    .peopleContainer {\n      padding: 6px 0 3px 0; } }\n\n.imgName {\n  cursor: pointer;\n  margin-top: 0; }\n\n.searchContainer {\n  display: flex;\n  justify-content: center;\n  margin-top: 15px !important; }\n\n.searchbar {\n  width: 55%;\n  padding: 3px;\n  font-size: .9rem;\n  font-family: Karla;\n  text-align: center; }\n\n.primaryText {\n  color: #28ab64; }\n\n.lpText {\n  color: #666;\n  text-align: center;\n  font-size: .9rem; }\n\n.small {\n  font-size: .8rem; }\n\n.moreLink {\n  text-align: right;\n  width: 100%;\n  padding: 4px 8px 8px 0; }\n\n.moreLink a {\n  color: #AAA;\n  border: solid 1px #999;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: .7rem;\n  text-decoration: none; }\n\n.moreLink a:hover {\n    border-color: #333;\n    color: #444; }\n\n.submitButton {\n  background: #FFF;\n  border-radius: 8px;\n  padding: 2px 8px;\n  line-height: 1rem;\n  width: auto;\n  text-align: center;\n  border: none;\n  border: solid 1px #666;\n  font-size: .8rem;\n  font-family: Karla;\n  color: #666 !important;\n  outline-style: none;\n  margin-top: 0px;\n  margin-bottom: 6px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    color: #333 !important;\n    border: solid 1px #333;\n    text-decoration: none; }\n\n@media (max-width: 767px) {\n    .submitButton {\n      display: none; } }\n\n#askBtn {\n  display: block;\n  margin: 0px auto;\n  width: 250px;\n  padding: 4px 10px;\n  font-size: 1.2rem;\n  font-weight: 400;\n  color: white;\n  background-color: #28ab64;\n  border-radius: 10px;\n  margin-top: 8px;\n  margin-bottom: -2px; }\n\n#askBtn:hover {\n    background-color: #36d07d; }\n\n.loadingContainer {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: center;\n  width: 100%; }\n\n.loadingBox {\n  width: 52px;\n  height: 52px;\n  margin: 10px;\n  border-radius: 6px;\n  background: #E2E2E2;\n  -webkit-animation: loading 1s linear 0s infinite alternate;\n          animation: loading 1s linear 0s infinite alternate; }\n\n.sdbHolder {\n  visibility: hidden;\n  margin-bottom: -32px; }\n\n@-webkit-keyframes loading {\n  0% {\n    background: #E2E2E2; }\n  100% {\n    background: #CECECE; } }\n\n@keyframes loading {\n  0% {\n    background: #E2E2E2; }\n  100% {\n    background: #CECECE; } }\n"

/***/ }),

/***/ "./src/app/Sidebar/sidebar/sidebar.component.ts":
/*!******************************************************!*\
  !*** ./src/app/Sidebar/sidebar/sidebar.component.ts ***!
  \******************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _group_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../group.model */ "./src/app/Sidebar/group.model.ts");
/* harmony import */ var _Network_network_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Network/network.model */ "./src/app/Network/network.model.ts");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { CommunityListComponent } from '../communityContainer/community.list.component';



// import { UserService } from '../user.service';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(http, fb, router, route) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.userName = '';
        this.communitylist = [];
        this.randomlist = [];
        this.amountToFetch = 9;
        this.amountArray = Array(9);
        this.showFriendsLoading = true;
        this.showCommunityLoading = true;
        this.showNames = false;
        this.sliceHeightResize = { sliced: false, count: 9, prevHeight: 1200 };
        this.users = [];
        this.ogUsersList = [];
        this.networklist = [];
        this.mobWidth = (window.screen.width);
        // console.log(this.mobWidth)
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.communitylist = [];
        this.changeMobileFetchCount();
        var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_6__(window).width();
        if (windowWidth < 1089) {
            this.amountToFetch = 6;
        }
        var showNames = function () { _this.showNames = true; };
        this.http.get('/users/feedlist')
            .toPromise()
            .then(function (response) {
            _this.users = _this.users.concat(response.json().data);
            _this.ogUsersList = _this.ogUsersList.concat(response.json().data);
            _this.users = _this.users.slice(0, _this.amountToFetch);
            _this.showFriendsLoading = false;
            window.setTimeout(showNames, 500);
        });
        this.handleScrollAndResize();
    };
    SidebarComponent.prototype.changeMobileFetchCount = function () {
        if (this.mobWidth <= 768) {
            this.amountToFetch = 6;
            this.amountArray = Array(6);
        }
    };
    SidebarComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.name) {
            this.userName = this.name.split(' ')[0];
        }
        this.networklist = [];
        this.ogNetworkList = [];
        if (this.friends) {
            var j = 0;
            for (var _i = 0, _a = this.friends; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (j < this.amountToFetch) {
                    this.networklist.push(new _Network_network_model__WEBPACK_IMPORTED_MODULE_5__["NetworkModel"](obj));
                    this.ogNetworkList.push(new _Network_network_model__WEBPACK_IMPORTED_MODULE_5__["NetworkModel"](obj));
                    j++;
                }
            }
            this.showFriendsLoading = false;
        }
        this.http.post("/group/list", { user: this.user }).toPromise()
            .then(function (res) {
            if (res.json().status == 1) {
                _this.data = res.json().data;
                _this.randomlistdata = res.json().random;
                _this.communitylist = [];
                var k = 0;
                _this.communitylist = [];
                _this.ogCommunityList = [];
                for (var _i = 0, _a = _this.data; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    if (k < _this.amountToFetch) {
                        // console.log('obj:', obj);
                        _this.communitylist.push(new _group_model__WEBPACK_IMPORTED_MODULE_4__["GroupModel"](obj));
                        _this.ogCommunityList.push(new _group_model__WEBPACK_IMPORTED_MODULE_4__["GroupModel"](obj));
                        k++;
                    }
                }
                var i = 0;
                if (_this.randomlistdata != null) {
                    _this.randomlist = [];
                    _this.ogRandomList = [];
                    for (var _b = 0, _c = _this.randomlistdata; _b < _c.length; _b++) {
                        var obj = _c[_b];
                        if (i < _this.amountToFetch) {
                            _this.randomlist.push(new _group_model__WEBPACK_IMPORTED_MODULE_4__["GroupModel"](obj));
                            _this.ogRandomList.push(new _group_model__WEBPACK_IMPORTED_MODULE_4__["GroupModel"](obj));
                            i++;
                        }
                    }
                }
                _this.showCommunityLoading = false;
            }
        })
            .catch(function (error) { return console.log('Error retrieving form: ' + error); });
    };
    SidebarComponent.prototype.handleScrollAndResize = function () {
        var _this = this;
        // Helper function to slice user/community arrays when resizing
        var sliceLists = function (x) {
            _this.users = _this.ogUsersList.slice(0, x);
            _this.networklist = _this.ogNetworkList ? _this.ogNetworkList.slice(0, x) : [];
            _this.communitylist = _this.ogCommunityList ? _this.ogCommunityList.slice(0, x) : [];
            _this.randomlist = _this.randomlist.slice(0, x);
        };
        var fixSidebar = function () {
            var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_6__(window).width();
            var windowHeight = jquery__WEBPACK_IMPORTED_MODULE_6__(window).height();
            var sdbPos = jquery__WEBPACK_IMPORTED_MODULE_6__('.sdbHolder').offset();
            var sdbWidth = jquery__WEBPACK_IMPORTED_MODULE_6__('.sdbHolder').width();
            var rpnPos = jquery__WEBPACK_IMPORTED_MODULE_6__('.rpnHolder').offset();
            var rpnWidth = jquery__WEBPACK_IMPORTED_MODULE_6__('.rpnHolder').width();
            var heightToSlice = jquery__WEBPACK_IMPORTED_MODULE_6__('#sdb').height() + sdbPos.top;
            var flag = false;
            // For vertical resizing and slicing of elements in sidebar so the whole sidebar is always in the window
            if (windowHeight - heightToSlice < 1 && _this.sliceHeightResize.count !== 3) {
                flag = true;
                var newCount = _this.sliceHeightResize.count - 3;
                _this.sliceHeightResize = { count: newCount, prevHeight: windowHeight, sliced: true };
                sliceLists(newCount);
            }
            if (windowHeight - heightToSlice > 200 && _this.sliceHeightResize.count !== 9) {
                flag = true;
                var newCount = _this.sliceHeightResize.count + 3;
                _this.sliceHeightResize = { count: newCount, prevHeight: windowHeight, sliced: true };
                sliceLists(newCount);
            }
            // Width checks for setting the sidebar either fixed or static position in the page
            if (windowWidth > 767) {
                jquery__WEBPACK_IMPORTED_MODULE_6__('#sdb').css({
                    'position': 'fixed',
                    'width': sdbWidth,
                    'top': sdbPos.top - 8,
                    'left': sdbPos.left
                });
                if (rpnPos) {
                    jquery__WEBPACK_IMPORTED_MODULE_6__('#rightPanel').css({
                        'position': 'fixed',
                        'width': rpnWidth,
                        'top': rpnPos.top - 8,
                        'left': rpnPos.left
                    });
                }
            }
            if (windowWidth < 768) {
                jquery__WEBPACK_IMPORTED_MODULE_6__('#sdb, #rightPanel').css({
                    'position': 'static',
                    'width': '100%'
                });
            }
            // Window width resizing checks that will resize sidebar if needed
            if (!flag) {
                if (windowWidth > 1089 && _this.sliceHeightResize.count == 9) {
                    sliceLists(9);
                }
                if (windowWidth < 1089 && _this.sliceHeightResize.count !== 3) {
                    sliceLists(6);
                }
                if (windowWidth < 820) {
                    sliceLists(3);
                }
                if (windowWidth < 768 && _this.sliceHeightResize.count !== 3) {
                    sliceLists(6);
                }
            }
        };
        // Just cause the dom isnt ready right away and able to get the position and width of our placeholder right away
        window.setTimeout(fixSidebar, 400);
        // Resets sidebar and rightpanel position when window is resized
        jquery__WEBPACK_IMPORTED_MODULE_6__(window).resize(function () {
            fixSidebar();
        });
        // Make sidebars scroll with page then become fixed when they reach the top
        jquery__WEBPACK_IMPORTED_MODULE_6__(window).scroll(function () {
            var wScroll = jquery__WEBPACK_IMPORTED_MODULE_6__(window).scrollTop();
            var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_6__(window).width();
            var sdbPos = jquery__WEBPACK_IMPORTED_MODULE_6__('.sdbHolder').offset();
            var rpnPos = jquery__WEBPACK_IMPORTED_MODULE_6__('.rpnHolder').offset();
            if (windowWidth > 767 && sdbPos) {
                var navHeight = jquery__WEBPACK_IMPORTED_MODULE_6__('.navbar').height() + 8;
                if (navHeight < sdbPos.top - 8 - wScroll) {
                    jquery__WEBPACK_IMPORTED_MODULE_6__('#sdb').css({
                        'top': sdbPos.top - 8 - wScroll,
                    });
                    jquery__WEBPACK_IMPORTED_MODULE_6__('#rightPanel').css({
                        'top': rpnPos.top - 8 - wScroll,
                    });
                }
                else {
                    jquery__WEBPACK_IMPORTED_MODULE_6__('#sdb').css({
                        'top': 52
                    });
                    jquery__WEBPACK_IMPORTED_MODULE_6__('#rightPanel').css({
                        'top': 52
                    });
                }
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], SidebarComponent.prototype, "loggedin", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "user", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "friends", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "context", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "name", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], SidebarComponent.prototype, "me", void 0);
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/Sidebar/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/Sidebar/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/Sidebar/user-image/user-image.component.html":
/*!**************************************************************!*\
  !*** ./src/app/Sidebar/user-image/user-image.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"type === 'users' \" class=\"iContainer\" [routerLink]=\"['/profile', data.link]\" (click)=\"clickedUser()\">\n  <div class=\"imgDiv\">\n      <img class=\"usrImg\" *ngIf=\"(data.pic === null || data.pic === undefined) && data.fb !== null \" src=\"https://graph.facebook.com/{{data.fb}}/picture?width=120&height=120\">\n      <img class=\"usrImg\" *ngIf=\"(data.pic !== null && data.pic !== undefined)\" [src]=\"data.pic\" />\n      <img class=\"usrImg\" *ngIf=\"(data.pic === null || data.pic === undefined) && data.fb === null && data.gender === 'male'\" src=\"/images/male.png\" />\n      <img class=\"usrImg\" *ngIf=\"(data.pic === null || data.pic === undefined) && data.fb === null && data.gender === 'female'\" src=\"/images/female.png\" />\n      <a *ngIf=\"showNames\" class=\"imgTitle\" [routerLink]=\"['/profile', data.link]\">{{name[0]}}<br/>{{name[1]}}</a>\n  </div>\n\n</div>\n<div *ngIf=\"type === 'network' \" class=\"iContainer\" [routerLink]=\"['/profile', data.link]\" (click)=\"clickedUser()\">\n  <div class=\"imgDiv\">\n      <img class=\"usrImg\" *ngIf=\"(data.pic[0] === 'local')\" [src]=\"data.pic[1]\">\n      <img class=\"usrImg\" *ngIf=\"(data.pic[0] === 'fb')\" src=\"https://graph.facebook.com/{{data.pic[1]}}/picture?width=120&height=120\">\n      <img class=\"usrImg\" *ngIf=\"(data.pic[0] !== 'fb' && data.pic[0] !== 'local')\" src=\"/images/male.png\" />\n      <a *ngIf=\"showNames\" class=\"imgTitle\" [routerLink]=\"['/profile', data.link]\">{{name.first}}<br/>{{name.last}}</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/Sidebar/user-image/user-image.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/Sidebar/user-image/user-image.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".iContainer {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: column;\n  margin-bottom: 3px; }\n  .iContainer:active {\n    outline-style: none; }\n  a {\n  font-weight: 400;\n  font-family: Karla;\n  font-size: .75rem;\n  padding: auto 5px;\n  margin-top: 2px;\n  color: #333; }\n  a:hover {\n    cursor: pointer; }\n  .imgDiv {\n  margin: 0px 2px;\n  text-align: center;\n  position: relative;\n  overflow: hidden; }\n  .imgDiv .usrImg {\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  .imgDiv:hover .usrImg {\n    -webkit-transform: scale(1.08);\n            transform: scale(1.08);\n    transition: all 100ms ease-in-out; }\n  img {\n  width: 100%;\n  height: 77px;\n  -o-object-fit: cover;\n     object-fit: cover; }\n  img:hover {\n    cursor: pointer; }\n  .imgTitle {\n  display: block;\n  text-align: left;\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  padding: 20px 0 4px 4px;\n  color: white;\n  background: linear-gradient(0, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0));\n  text-transform: capitalize;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n  @media (max-width: 767px) {\n    .imgTitle {\n      font-size: .55rem; } }\n"

/***/ }),

/***/ "./src/app/Sidebar/user-image/user-image.component.ts":
/*!************************************************************!*\
  !*** ./src/app/Sidebar/user-image/user-image.component.ts ***!
  \************************************************************/
/*! exports provided: UserImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserImageComponent", function() { return UserImageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserImageComponent = /** @class */ (function () {
    function UserImageComponent() {
    }
    UserImageComponent.prototype.ngOnInit = function () {
        this.startTime = Date.now();
        if (this.data && typeof this.data.name === "object") {
            this.type = 'network';
            this.name = this.data.name;
        }
        else {
            this.type = 'users';
            this.name = this.data.name.split(' ');
        }
    };
    UserImageComponent.prototype.ngAfterViewInit = function () {
        // Dynamically sets img width and text box of images to be equal to the width
        function setHeight() {
            var usrImgWidth = jquery__WEBPACK_IMPORTED_MODULE_1__(".usrImg").first().width();
            if (usrImgWidth == 0)
                window.setTimeout(setHeight, 200);
            jquery__WEBPACK_IMPORTED_MODULE_1__(".usrImg, .commImg").css({ height: usrImgWidth });
            jquery__WEBPACK_IMPORTED_MODULE_1__(".imgTitle, .commText").css({ width: usrImgWidth });
        }
        window.setTimeout(setHeight, 400);
        window.setTimeout(setHeight, 1000);
        window.setTimeout(setHeight, 2000);
        // Resize images when window resizes
        jquery__WEBPACK_IMPORTED_MODULE_1__(window).resize(function () {
            var usrImgWidth = jquery__WEBPACK_IMPORTED_MODULE_1__(".usrImg").first().width();
            jquery__WEBPACK_IMPORTED_MODULE_1__(".usrImg, .commImg").css({ height: usrImgWidth });
            jquery__WEBPACK_IMPORTED_MODULE_1__(".imgTitle, .commText").css({ width: usrImgWidth });
        });
    };
    UserImageComponent.prototype.clickedUser = function () {
        var startingTime = this.startTime;
        window.mixpanel.track("Discovered User on Feed", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "userLink": this.data.link,
            "name": this.data.name,
            "timestamp": Date.now()
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], UserImageComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], UserImageComponent.prototype, "showNames", void 0);
    UserImageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-image',
            template: __webpack_require__(/*! ./user-image.component.html */ "./src/app/Sidebar/user-image/user-image.component.html"),
            styles: [__webpack_require__(/*! ./user-image.component.scss */ "./src/app/Sidebar/user-image/user-image.component.scss")],
        })
    ], UserImageComponent);
    return UserImageComponent;
}());



/***/ }),

/***/ "./src/app/YourCommunities/your-community-item/your-community-item.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/YourCommunities/your-community-item/your-community-item.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    \n    <div class=\"flex\">\n        <div>\n            <img [src]=\"comm.pic\" *ngIf=\"comm.pic\" class=\"imageSize\"/>\n            <img class=\"imageSize\" *ngIf=\"!comm.pic\" src=\"/images/community.png\" />\n\n            <a *ngIf=\"!sharedAlready\" (click)=\"closeModal()\" [routerLink]=\"['/group', comm.id]\" style=\"color: #999;\">{{comm.title}}</a>\n            <span *ngIf=\"sharedAlready\" style=\"font-family:karla\">Post shared in <a style=\"color:#999\" [routerLink]=\"['/group', comm.id]\">{{comm.title}}!</a></span>\n        </div>\n        <div>\n            <button *ngIf=\"!sharedAlready\" class=\"submitButton\" (click)=\"shareInComm()\">Share</button>\n        </div>\n    </div>\n    \n</div>\n"

/***/ }),

/***/ "./src/app/YourCommunities/your-community-item/your-community-item.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/YourCommunities/your-community-item/your-community-item.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  font-weight: bold; }\n\n.imageSize {\n  height: 36px;\n  width: 36px;\n  border-radius: 18px; }\n\n.submitButton {\n  background: #FFF;\n  border-radius: 16px;\n  padding: 1px 8px;\n  line-height: 1rem;\n  width: auto;\n  text-align: center;\n  border: none;\n  border: solid 1px #666;\n  font-size: .7rem;\n  font-family: Karla;\n  color: #666 !important;\n  outline-style: none;\n  margin-top: 0px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    color: #333 !important;\n    border: solid 1px #333; }\n\n.flex {\n  display: flex;\n  justify-content: space-between;\n  flex-flow: row nowrap;\n  margin-bottom: 8px; }\n"

/***/ }),

/***/ "./src/app/YourCommunities/your-community-item/your-community-item.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/YourCommunities/your-community-item/your-community-item.component.ts ***!
  \**************************************************************************************/
/*! exports provided: YourCommunityItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourCommunityItemComponent", function() { return YourCommunityItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _your_group_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../your-group.model */ "./src/app/YourCommunities/your-group.model.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YourCommunityItemComponent = /** @class */ (function () {
    function YourCommunityItemComponent(http, modalService) {
        this.http = http;
        this.modalService = modalService;
        this.sharedAlready = false;
    }
    YourCommunityItemComponent.prototype.shareInComm = function () {
        var _this = this;
        this.http.post("/group/shareform", { commid: this.comm.id, formid: this.comm.link, pic: this.comm.pic }).toPromise()
            .then(function (result) {
            if (result.json().status == 1) {
                _this.sharedAlready = true;
            }
            else {
                // console.log("failed comm share request");
            }
            //
        })
            .catch(function () {
            //console.log("failed comm share request");
        });
    };
    YourCommunityItemComponent.prototype.closeModal = function () {
        this.modalService.close(this.shareModal);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _your_group_model__WEBPACK_IMPORTED_MODULE_1__["YourCommunitiesModel"])
    ], YourCommunityItemComponent.prototype, "comm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('shareModal'),
        __metadata("design:type", Object)
    ], YourCommunityItemComponent.prototype, "shareModal", void 0);
    YourCommunityItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-your-comm-component',
            template: __webpack_require__(/*! ./your-community-item.component.html */ "./src/app/YourCommunities/your-community-item/your-community-item.component.html"),
            styles: [__webpack_require__(/*! ./your-community-item.component.scss */ "./src/app/YourCommunities/your-community-item/your-community-item.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbActiveModal"]])
    ], YourCommunityItemComponent);
    return YourCommunityItemComponent;
}());



/***/ }),

/***/ "./src/app/YourCommunities/your-community-list/your-community-list.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/YourCommunities/your-community-list/your-community-list.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"scrollView\" *ngIf=\"visible\">\n        <app-your-comm-component class=\"\" [comm]=\"comm\" *ngFor=\"let comm of yourcommlist\"> </app-your-comm-component>\n    \n</div>\n"

/***/ }),

/***/ "./src/app/YourCommunities/your-community-list/your-community-list.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/YourCommunities/your-community-list/your-community-list.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h5, .secondary-container {\n  text-align: center; }\n\n.scrollView {\n  max-height: 60vh;\n  overflow-y: scroll; }\n"

/***/ }),

/***/ "./src/app/YourCommunities/your-community-list/your-community-list.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/YourCommunities/your-community-list/your-community-list.component.ts ***!
  \**************************************************************************************/
/*! exports provided: YourCommunityListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourCommunityListComponent", function() { return YourCommunityListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _your_group_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../your-group.model */ "./src/app/YourCommunities/your-group.model.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var YourCommunityListComponent = /** @class */ (function () {
    function YourCommunityListComponent(http) {
        this.http = http;
        this.yourcommlist = [];
        this.visible = false;
    }
    YourCommunityListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get("/group/mylist").toPromise()
            .then(function (res) {
            if (res.json().status == 1) {
                _this.data = res.json().data;
                for (var _i = 0, _a = _this.data; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    _this.yourcommlist.push(new _your_group_model__WEBPACK_IMPORTED_MODULE_1__["YourCommunitiesModel"](obj, _this.link));
                    //    window.console.log("communities", obj);
                }
                if (_this.yourcommlist.length > 0) {
                    _this.visible = true;
                }
            }
            else {
                _this.visible = false;
            }
        })
            .catch(function (error) { return console.log("Error retrieving form: " + error); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], YourCommunityListComponent.prototype, "link", void 0);
    YourCommunityListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-your-comm-list',
            template: __webpack_require__(/*! ./your-community-list.component.html */ "./src/app/YourCommunities/your-community-list/your-community-list.component.html"),
            styles: [__webpack_require__(/*! ./your-community-list.component.scss */ "./src/app/YourCommunities/your-community-list/your-community-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"]])
    ], YourCommunityListComponent);
    return YourCommunityListComponent;
}());



/***/ }),

/***/ "./src/app/YourCommunities/your-group.model.ts":
/*!*****************************************************!*\
  !*** ./src/app/YourCommunities/your-group.model.ts ***!
  \*****************************************************/
/*! exports provided: YourCommunitiesModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourCommunitiesModel", function() { return YourCommunitiesModel; });
var YourCommunitiesModel = /** @class */ (function () {
    function YourCommunitiesModel(object, y) {
        this.object = object;
        // general data
        this.title = object.title;
        this.id = object.id;
        this.pic = object.pic;
        this.link = y;
    }
    return YourCommunitiesModel;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"background\">\n<!-- <app-navbar></app-navbar> -->\n<router-outlet></router-outlet>\n<div #popupRoot></div>\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Dosis:300,400,500,700|Karla:400,700|Fira+Sans:300,400,500,600,700|Raleway:300,400,500,600,700|Cabin:400,700|Playfair+Display:700|Montserrat:600|Alfa+Slab+One\");\nhtml {\n  font-size: 14px; }\nh1 {\n  color: blue; }\nli h2 {\n  color: green; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ng2_dragula__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng2-dragula */ "./node_modules/ng2-dragula/index.js");
/* harmony import */ var ng2_dragula__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ng2_dragula__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var ngx_chips__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-chips */ "./node_modules/ngx-chips/esm5/ngx-chips.js");
/* harmony import */ var ng2_flatpickr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-flatpickr */ "./node_modules/ng2-flatpickr/esm5/ng2-flatpickr.js");
/* harmony import */ var angular2_multiselect_dropdown_angular2_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angular2-multiselect-dropdown/angular2-multiselect-dropdown */ "./node_modules/angular2-multiselect-dropdown/angular2-multiselect-dropdown.js");
/* harmony import */ var ngforage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngforage */ "./node_modules/ngforage/esm5/ngforage.js");
/* harmony import */ var _ngx_share_buttons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-share/buttons */ "./node_modules/@ngx-share/buttons/fesm5/ngx-share-buttons.js");
/* harmony import */ var _ngx_share_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-share/button */ "./node_modules/@ngx-share/button/fesm5/ngx-share-button.js");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/ngx-image-cropper.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pie-chart/pie-chart.component */ "./src/app/pie-chart/pie-chart.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _confirmation_popup_confirmation_popup_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./confirmation-popup/confirmation-popup.component */ "./src/app/confirmation-popup/confirmation-popup.component.ts");
/* harmony import */ var _create_group_create_group_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./create-group/create-group.component */ "./src/app/create-group/create-group.component.ts");
/* harmony import */ var _QuestionForms_multiple_choice_form_multiple_choice_form_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./QuestionForms/multiple-choice-form/multiple-choice-form.component */ "./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.ts");
/* harmony import */ var _QuestionForms_number_question_form_number_question_form_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./QuestionForms/number-question-form/number-question-form.component */ "./src/app/QuestionForms/number-question-form/number-question-form.component.ts");
/* harmony import */ var _QuestionForms_rating_form_rating_form_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./QuestionForms/rating-form/rating-form.component */ "./src/app/QuestionForms/rating-form/rating-form.component.ts");
/* harmony import */ var _QuestionForms_short_answer_form_short_answer_form_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./QuestionForms/short-answer-form/short-answer-form.component */ "./src/app/QuestionForms/short-answer-form/short-answer-form.component.ts");
/* harmony import */ var _create_form_createForm_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./create-form/createForm.component */ "./src/app/create-form/createForm.component.ts");
/* harmony import */ var _description_switch_buttons_description_switch_buttons_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./description-switch-buttons/description-switch-buttons.component */ "./src/app/description-switch-buttons/description-switch-buttons.component.ts");
/* harmony import */ var _form_button_form_button_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./form-button/form-button.component */ "./src/app/form-button/form-button.component.ts");
/* harmony import */ var _switch_buttons_switch_buttons_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./switch-buttons/switch-buttons.component */ "./src/app/switch-buttons/switch-buttons.component.ts");
/* harmony import */ var _Discussion_discussion_item_discussion_item_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Discussion/discussion-item/discussion-item.component */ "./src/app/Discussion/discussion-item/discussion-item.component.ts");
/* harmony import */ var _Discussion_discussion_list_discussion_list_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Discussion/discussion-list/discussion-list.component */ "./src/app/Discussion/discussion-list/discussion-list.component.ts");
/* harmony import */ var _feed_form_feed_form_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./feed-form/feed-form.component */ "./src/app/feed-form/feed-form.component.ts");
/* harmony import */ var _feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./feed-list/feed-list.component */ "./src/app/feed-list/feed-list.component.ts");
/* harmony import */ var _feed_page_feed_page_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./feed-page/feed-page.component */ "./src/app/feed-page/feed-page.component.ts");
/* harmony import */ var _mini_show_form_mini_show_form_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./mini-show-form/mini-show-form.component */ "./src/app/mini-show-form/mini-show-form.component.ts");
/* harmony import */ var _short_answers_short_answers_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./short-answers/short-answers.component */ "./src/app/short-answers/short-answers.component.ts");
/* harmony import */ var _star_array_star_array_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./star-array/star-array.component */ "./src/app/star-array/star-array.component.ts");
/* harmony import */ var _feedback_feedback_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./feedback/feedback.component */ "./src/app/feedback/feedback.component.ts");
/* harmony import */ var _image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./image-editor/image-editor.component */ "./src/app/image-editor/image-editor.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _login_popup_login_popup_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./login-popup/login-popup.component */ "./src/app/login-popup/login-popup.component.ts");
/* harmony import */ var _Network_network_item_network_item_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./Network/network-item/network-item.component */ "./src/app/Network/network-item/network-item.component.ts");
/* harmony import */ var _Network_network_list_network_list_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./Network/network-list/network-list.component */ "./src/app/Network/network-list/network-list.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _resource_list_resource_list_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./resource-list/resource-list.component */ "./src/app/resource-list/resource-list.component.ts");
/* harmony import */ var _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./search-page/search-page.component */ "./src/app/search-page/search-page.component.ts");
/* harmony import */ var _question_question_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./question/question.component */ "./src/app/question/question.component.ts");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/settings/settings.component.ts");
/* harmony import */ var _share_form_share_form_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./share-form/share-form.component */ "./src/app/share-form/share-form.component.ts");
/* harmony import */ var _Sidebar_community_image_community_image_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./Sidebar/community-image/community-image.component */ "./src/app/Sidebar/community-image/community-image.component.ts");
/* harmony import */ var _Sidebar_right_panel_right_panel_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./Sidebar/right-panel/right-panel.component */ "./src/app/Sidebar/right-panel/right-panel.component.ts");
/* harmony import */ var _Sidebar_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./Sidebar/sidebar/sidebar.component */ "./src/app/Sidebar/sidebar/sidebar.component.ts");
/* harmony import */ var _Sidebar_user_image_user_image_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./Sidebar/user-image/user-image.component */ "./src/app/Sidebar/user-image/user-image.component.ts");
/* harmony import */ var _take_form_take_form_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./take-form/take-form.component */ "./src/app/take-form/take-form.component.ts");
/* harmony import */ var _view_community_view_community_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./view-community/view-community.component */ "./src/app/view-community/view-community.component.ts");
/* harmony import */ var _YourCommunities_your_community_item_your_community_item_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./YourCommunities/your-community-item/your-community-item.component */ "./src/app/YourCommunities/your-community-item/your-community-item.component.ts");
/* harmony import */ var _YourCommunities_your_community_list_your_community_list_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./YourCommunities/your-community-list/your-community-list.component */ "./src/app/YourCommunities/your-community-list/your-community-list.component.ts");
/* harmony import */ var _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./landing-page/landing-page.component */ "./src/app/landing-page/landing-page.component.ts");
/* harmony import */ var _new_feed_page_new_feed_page_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./new-feed-page/new-feed-page.component */ "./src/app/new-feed-page/new-feed-page.component.ts");
/* harmony import */ var _new_sidebar_new_sidebar_component__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./new-sidebar/new-sidebar.component */ "./src/app/new-sidebar/new-sidebar.component.ts");
/* harmony import */ var _new_navbar_new_navbar_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./new-navbar/new-navbar.component */ "./src/app/new-navbar/new-navbar.component.ts");
/* harmony import */ var _member_list_member_list_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./member-list/member-list.component */ "./src/app/member-list/member-list.component.ts");
/* harmony import */ var _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./sign-in/sign-in.component */ "./src/app/sign-in/sign-in.component.ts");
/* harmony import */ var _ask_question_ask_question_component__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./ask-question/ask-question.component */ "./src/app/ask-question/ask-question.component.ts");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./home-page/home-page.component */ "./src/app/home-page/home-page.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Third party




















// From our app


















































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_21__["AppComponent"],
                _pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_22__["PieChartComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_23__["NavbarComponent"],
                _confirmation_popup_confirmation_popup_component__WEBPACK_IMPORTED_MODULE_24__["ConfirmationPopupComponent"],
                _create_group_create_group_component__WEBPACK_IMPORTED_MODULE_25__["CreateGroupComponent"],
                _QuestionForms_multiple_choice_form_multiple_choice_form_component__WEBPACK_IMPORTED_MODULE_26__["MultipleChoiceFormComponent"],
                _QuestionForms_number_question_form_number_question_form_component__WEBPACK_IMPORTED_MODULE_27__["NumberQuestionFormComponent"],
                _QuestionForms_rating_form_rating_form_component__WEBPACK_IMPORTED_MODULE_28__["RatingFormComponent"],
                _QuestionForms_short_answer_form_short_answer_form_component__WEBPACK_IMPORTED_MODULE_29__["ShortAnswerFormComponent"],
                _create_form_createForm_component__WEBPACK_IMPORTED_MODULE_30__["CreateFormComponent"],
                _description_switch_buttons_description_switch_buttons_component__WEBPACK_IMPORTED_MODULE_31__["DescriptionSwitchButtonsComponent"],
                _form_button_form_button_component__WEBPACK_IMPORTED_MODULE_32__["FormButtonComponent"],
                _switch_buttons_switch_buttons_component__WEBPACK_IMPORTED_MODULE_33__["SwitchButtonsComponent"],
                _Discussion_discussion_item_discussion_item_component__WEBPACK_IMPORTED_MODULE_34__["DiscussionItemComponent"],
                _Discussion_discussion_list_discussion_list_component__WEBPACK_IMPORTED_MODULE_35__["DiscussionListComponent"],
                _feed_form_feed_form_component__WEBPACK_IMPORTED_MODULE_36__["FeedFormComponent"],
                _feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_37__["FeedListComponent"],
                _feed_page_feed_page_component__WEBPACK_IMPORTED_MODULE_38__["FeedPageComponent"],
                _mini_show_form_mini_show_form_component__WEBPACK_IMPORTED_MODULE_39__["MiniShowFormComponent"],
                _short_answers_short_answers_component__WEBPACK_IMPORTED_MODULE_40__["ShortAnswersComponent"],
                _star_array_star_array_component__WEBPACK_IMPORTED_MODULE_41__["StarArrayComponent"],
                _feedback_feedback_component__WEBPACK_IMPORTED_MODULE_42__["FeedbackComponent"],
                _image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_43__["ImageEditorComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_44__["LoginComponent"],
                _login_popup_login_popup_component__WEBPACK_IMPORTED_MODULE_45__["LoginPopupComponent"],
                _Network_network_item_network_item_component__WEBPACK_IMPORTED_MODULE_46__["NetworkItemComponent"],
                _Network_network_list_network_list_component__WEBPACK_IMPORTED_MODULE_47__["NetworkListComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_48__["ProfileComponent"],
                _resource_list_resource_list_component__WEBPACK_IMPORTED_MODULE_49__["ResourceListComponent"],
                _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_50__["SearchPageComponent"],
                _question_question_component__WEBPACK_IMPORTED_MODULE_51__["QuestionComponent"],
                _settings_settings_component__WEBPACK_IMPORTED_MODULE_52__["SettingsComponent"],
                _share_form_share_form_component__WEBPACK_IMPORTED_MODULE_53__["ShareFormComponent"],
                _Sidebar_community_image_community_image_component__WEBPACK_IMPORTED_MODULE_54__["CommunityImageComponent"],
                _Sidebar_right_panel_right_panel_component__WEBPACK_IMPORTED_MODULE_55__["RightPanelComponent"],
                _Sidebar_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_56__["SidebarComponent"],
                _Sidebar_user_image_user_image_component__WEBPACK_IMPORTED_MODULE_57__["UserImageComponent"],
                _take_form_take_form_component__WEBPACK_IMPORTED_MODULE_58__["TakeFormComponent"],
                _view_community_view_community_component__WEBPACK_IMPORTED_MODULE_59__["ViewCommunityComponent"],
                _YourCommunities_your_community_item_your_community_item_component__WEBPACK_IMPORTED_MODULE_60__["YourCommunityItemComponent"],
                _YourCommunities_your_community_list_your_community_list_component__WEBPACK_IMPORTED_MODULE_61__["YourCommunityListComponent"],
                _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_62__["LandingPageComponent"],
                _new_feed_page_new_feed_page_component__WEBPACK_IMPORTED_MODULE_63__["NewFeedPageComponent"],
                _new_sidebar_new_sidebar_component__WEBPACK_IMPORTED_MODULE_64__["NewSidebarComponent"],
                _new_navbar_new_navbar_component__WEBPACK_IMPORTED_MODULE_65__["NewNavbarComponent"],
                _member_list_member_list_component__WEBPACK_IMPORTED_MODULE_66__["MemberListComponent"],
                _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_67__["SignInComponent"],
                _ask_question_ask_question_component__WEBPACK_IMPORTED_MODULE_68__["AskQuestionComponent"],
                _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_69__["HomePageComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__["MatAutocompleteModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_20__["routing"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"].forRoot(),
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["NoopAnimationsModule"],
                ng2_dragula__WEBPACK_IMPORTED_MODULE_11__["DragulaModule"],
                ngx_chips__WEBPACK_IMPORTED_MODULE_12__["TagInputModule"],
                ng2_flatpickr__WEBPACK_IMPORTED_MODULE_13__["Ng2FlatpickrModule"],
                angular2_multiselect_dropdown_angular2_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__["AngularMultiSelectModule"],
                ngforage__WEBPACK_IMPORTED_MODULE_15__["NgForageModule"],
                _ngx_share_buttons__WEBPACK_IMPORTED_MODULE_16__["ShareButtonsModule"].forRoot(),
                _ngx_share_button__WEBPACK_IMPORTED_MODULE_17__["ShareButtonModule"].forRoot(),
                ngx_image_cropper__WEBPACK_IMPORTED_MODULE_18__["ImageCropperModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]
            ],
            providers: [
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbActiveModal"],
                ngx_cookie_service__WEBPACK_IMPORTED_MODULE_19__["CookieService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_21__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _create_form_createForm_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-form/createForm.component */ "./src/app/create-form/createForm.component.ts");
/* harmony import */ var _share_form_share_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./share-form/share-form.component */ "./src/app/share-form/share-form.component.ts");
/* harmony import */ var _take_form_take_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./take-form/take-form.component */ "./src/app/take-form/take-form.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sign-in/sign-in.component */ "./src/app/sign-in/sign-in.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/settings/settings.component.ts");
/* harmony import */ var _create_group_create_group_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create-group/create-group.component */ "./src/app/create-group/create-group.component.ts");
/* harmony import */ var _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./search-page/search-page.component */ "./src/app/search-page/search-page.component.ts");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home-page/home-page.component */ "./src/app/home-page/home-page.component.ts");











var APP_ROUTES = [
    { path: '', pathMatch: 'full', component: _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_10__["HomePageComponent"] },
    { path: 'createForm', component: _create_form_createForm_component__WEBPACK_IMPORTED_MODULE_1__["CreateFormComponent"] },
    { path: 'shareForm', component: _share_form_share_form_component__WEBPACK_IMPORTED_MODULE_2__["ShareFormComponent"] },
    { path: 'takeForm/:id', component: _take_form_take_form_component__WEBPACK_IMPORTED_MODULE_3__["TakeFormComponent"] },
    { path: 'users/login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'sign-in', component: _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_5__["SignInComponent"] },
    { path: 'profile/:id', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__["ProfileComponent"] },
    { path: 'profile/:id/:subsection', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__["ProfileComponent"] },
    { path: 'settings', component: _settings_settings_component__WEBPACK_IMPORTED_MODULE_7__["SettingsComponent"] },
    { path: 'createGroup', component: _create_group_create_group_component__WEBPACK_IMPORTED_MODULE_8__["CreateGroupComponent"] },
    { path: 'searchresults', component: _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_9__["SearchPageComponent"] }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(APP_ROUTES);


/***/ }),

/***/ "./src/app/ask-question/ask-question.component.html":
/*!**********************************************************!*\
  !*** ./src/app/ask-question/ask-question.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"activeDimmer\" class=\"dim-overlay\"></div>\n\n<div *ngIf=\"!preview\" class=\"fullwidth askbox\">\n    <img id=\"deleteCross\" src=\"/assets/images/delete-button.svg\" />\n    <div class=\"summary-container\" *ngIf=\"questionsContainer.length > 0\">\n        <div class=\"prev-item\"></div>\n        <p class=\"question-count prev-item\">Added {{questionsContainer.length}} {{questionsContainer.length === 1 ? 'Question' : 'Questions'}}</p>\n        <div class=\"prev-item\">\n            <a class=\"preview-btn\" (click)=togglePreview()>Preview Survey</a>\n        </div>\n    </div>\n    <textarea id=\"user-question-text\" rows=\"2\" class=\"ask-textarea\" [(ngModel)]=\"question\" (ngModelChange)=\"isQuestionEmpty($event)\" (focus)=\"activateDimmer()\" (blur)=\"deactivateDimmer()\" placeholder=\"Start typing your question here..\"></textarea>\n    <div class=\"question-form-container\">\n        <app-mc-question-form #mc *ngIf=\"questionType == 'multiplechoice'\" (questionData)=\"pushQuestionToList($event)\" [getData]=\"getQuestionData\"></app-mc-question-form>\n        <app-rating-question-form #rc *ngIf=\"questionType == 'rating'\" (questionData)=\"pushQuestionToList($event)\" [getData]=\"getQuestionData\"></app-rating-question-form>\n        <app-number-question-form #nc *ngIf=\"questionType == 'number'\" (questionData)=\"pushQuestionToList($event)\" [getData]=\"getQuestionData\"></app-number-question-form>\n    </div>\n    <div class=\"toolbar\" [ngClass]='{active: selection}'>\n        <a class=\"tb-option\" [ngClass]='{active: selection == \"question\" }' (click)=\"toolbarSelect('question')\">Question Type</a>\n        <a class=\"tb-option\"  [ngClass]='{active: selection == \"photo\" }' (click)=\"toolbarSelect('photo')\">Add Picture</a>\n        <a class=\"tb-option\"  [ngClass]='{active: selection == \"groups\" && isMobile }' (click)=\"toolbarSelect('groups')\">Share with&nbsp;Groups</a>\n\n        <mat-form-field class=\"groups-input\" *ngIf=\"!isMobile\">\n            <input type=\"text\" placeholder=\"Share with a group\" aria-label=\"Number\" matInput [formControl]=\"group\" [matAutocomplete]=\"auto\">\n            <mat-autocomplete #auto=\"matAutocomplete\">\n                <mat-option *ngFor=\"let g of filteredGroups | async\" [value]=\"g\">\n                    {{g}}\n                </mat-option>\n            </mat-autocomplete>\n        </mat-form-field>\n\n\n\n        <!-- <input type=\"text\" class=\"groups-input\" (focus)=\"activateDimmer()\" (blur)=\"deactivateDimmer()\" placeholder=\"Share with a group\" /> -->\n        <a class=\"tb-option submit\" [ngClass]=\"{enabled: question}\" (click)=\"getData('multiplechoice')\">Add&nbsp;Question</a>\n\n    </div>\n\n\n    <div *ngIf=\"selection == 'question'\" class=\"selection-menu\">\n        <a class=\"tb-option sub active\" (click)=\"questionSelect('shortanswer')\" [ngClass]=\"{active: questionType == 'shortanswer'}\" style=\"margin-left: 0\">Short Answer</a>\n        <a class=\"tb-option sub\" (click)=\"questionSelect('multiplechoice')\" [ngClass]=\"{active: questionType == 'multiplechoice'}\">Multiple Choice</a>\n        <a class=\"tb-option sub\" (click)=\"questionSelect('rating')\" [ngClass]=\"{active: questionType == 'rating'}\">Rating</a>\n        <a class=\"tb-option sub\" (click)=\"questionSelect('number')\" [ngClass]=\"{active: questionType == 'number'}\">Number</a>\n        <a class=\"tb-option sub\" (click)=\"questionSelect('yesno')\" [ngClass]=\"{active: questionType == 'yesno'}\">Yes/No</a>\n        <a class=\"tb-option sub\" (click)=\"questionSelect('matrix')\" [ngClass]=\"{active: questionType == 'matrix'}\">Matrix</a>\n    </div>\n    \n    <div *ngIf=\"selection == 'photo'\" class=\"photo-menu\">\n        <!-- <a class=\"tb-option\" style=\"margin-left: 0\">Select&nbsp;an&nbsp;Image</a> -->\n\n        <!-- IMAGE START -->\n        <div class=\"imgContainer\">\n                        <div class=\"inner\">\n        \n                            <div id=\"uploadBtn\">\n                                <label for=\"picFile\" class=\"submitButton not\">Upload</label>\n                                <input id=\"picFile\" title=\"Hello\" style=\"display:none;\" type=\"file\" (change)=\"onPicChange($event)\" />\n                            </div>\n        \n                            <div><p id=\"orText\" class=\"qslyGray\">or</p></div>\n        \n                            <div id=\"urlImage\" class=\"input-group\" style=\"width: 100%\">\n                                <input type=\"text\" #imgUrl class=\"form-control url-input\" style=\"font-size: .8rem;\" placeholder=\"Enter an image URL\" value={{pic}} >\n                                <div class=\"input-group-append\">\n                                    <button (click)=\"setPicUrl(imgUrl.value)\" class=\"btn btn-outline-secondary\">\n                                        <i class=\"fa fa-check\"></i>\n                                    </button>\n                                </div>\n                            </div>\n        \n                        </div>\n        \n                        <div class=\"flex\">\n                            <img class=\"image\" *ngIf=\"pic\" id=\"preview\" [src]=\"pic\">\n                        </div>\n        \n                    </div>\n        <!-- IMAGE END -->\n    </div>\n\n    <div class=\"toolbar mobileGroup\" *ngIf=\"isMobile && selection == 'groups'\">\n        <mat-form-field class=\"groups-input\">\n            <input type=\"text\" placeholder=\"Share with a group\" aria-label=\"Number\" matInput [formControl]=\"group\" [matAutocomplete]=\"auto\">\n            <mat-autocomplete #auto=\"matAutocomplete\">\n                <mat-option *ngFor=\"let g of filteredGroups | async\" [value]=\"g\">\n                    {{g}}\n                </mat-option>\n            </mat-autocomplete>\n        </mat-form-field>\n    </div>\n</div>\n\n<div *ngIf=\"preview\" class=\"fullwidth askbox\">\n        <div class=\"summary-container\" *ngIf=\"questionsContainer.length > 0\">\n            <div class=\"prev-item\"></div>\n            <p *ngIf='!addTitle' class=\"question-count prev-item title\" (click)=\"toggleTitle()\">{{title ? title : 'Click to Add Title'}}</p>\n            <input (blur)=\"toggleTitle()\" [(ngModel)]=\"title\" class=\"groups-input\" style=\"text-align: center; font-size: 1.2rem; color: #333333;\" *ngIf='addTitle' type=\"text\" autofocus />\n            <div class=\"prev-item\">\n                <a class=\"preview-btn\" (click)=\"togglePreview()\">Add a Question</a>\n            </div>\n        </div>\n        <div class=\"question\" *ngFor=\"let q of questionsContainer; let i = index;\">\n            <p class=\"number-label\">Question {{i + 1}}</p>\n            <img class=\"q-prev-image\" [src]=\"q.pic\" [ngClass]=\"{hidden: !q.pic}\"/>\n            <p class=\"question-body\">{{q.body}}</p>\n            \n            <!-- Multiple Choice -->\n            <form *ngIf=\"q.kind == 'Multiple Choice'\">\n                <div *ngFor=\"let o of q.options\">\n                    <div class=\"radio-container\" *ngIf=\"q.canSelectMultiple\">\n                        <input class=\"prev-radios\" type=\"checkbox\" /> <span class=\"radio-text\">{{o.body}}</span> <br />\n                    </div>\n                    <div class=\"radio-container\" *ngIf=\"!q.canSelectMultiple\">\n                        <input class=\"prev-radios\" type=\"radio\" /> <span class=\"radio-text\">{{o.body}}</span> <br />\n                    </div>\n                </div>\n            </form>\n\n            <!-- Number -->\n            <p *ngIf=\"q.kind == 'Number' && q.boundaries\" class=\"number-boundary\">Answer must lie within {{q.lowerBoundary}} and {{q.upperBoundary}}</p>\n\n            <!-- Rating -->\n\n\n        </div>\n\n        <div class=\"submit-container\">\n            <a class=\"submit-btn\" (click)=\"submitForm()\">Submit Survey</a>\n        </div>\n\n</div>"

/***/ }),

/***/ "./src/app/ask-question/ask-question.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/ask-question/ask-question.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fullwidth {\n  width: 100%; }\n\n.askbox {\n  position: relative; }\n\n.ask-textarea {\n  width: 100%;\n  outline: none;\n  border: 1px solid #e2e2e2;\n  padding: 20px;\n  padding-bottom: 0;\n  font-size: 1rem;\n  margin-bottom: -4px;\n  border-bottom-color: #f4f4f4; }\n\n.ask-textarea::-webkit-input-placeholder {\n    color: #AAAAAA;\n    font-size: 1rem; }\n\n.ask-textarea:-ms-input-placeholder {\n    color: #AAAAAA;\n    font-size: 1rem; }\n\n.ask-textarea::-ms-input-placeholder {\n    color: #AAAAAA;\n    font-size: 1rem; }\n\n.ask-textarea::placeholder {\n    color: #AAAAAA;\n    font-size: 1rem; }\n\n@media (max-width: 768px) {\n      .ask-textarea::-webkit-input-placeholder {\n        font-size: .8rem; }\n      .ask-textarea:-ms-input-placeholder {\n        font-size: .8rem; }\n      .ask-textarea::-ms-input-placeholder {\n        font-size: .8rem; }\n      .ask-textarea::placeholder {\n        font-size: .8rem; } }\n\n@media (max-width: 768px) {\n    .ask-textarea {\n      font-size: .8rem; } }\n\n.toolbar {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-bottom: 0;\n  background: #FFFFFF;\n  border: 1px solid #e2e2e2;\n  border-top: none;\n  padding: 8px 16px;\n  margin-bottom: 24px;\n  justify-content: space-between; }\n\n.toolbar.active {\n    border-bottom-color: #f4f4f4;\n    margin-bottom: 0; }\n\n.toolbar.mobileGroup {\n    padding: 8px 0 0 0; }\n\n.tb-option {\n  font-size: .8rem;\n  font-weight: 500;\n  font-family: \"Fira Sans\";\n  padding: 4px 12px;\n  color: #28ab64 !important;\n  cursor: pointer;\n  border-radius: 16px;\n  text-align: center; }\n\n.tb-option.submit {\n    background: #28ab64;\n    color: white !important;\n    padding: 8px 12px;\n    border-radius: 8px;\n    opacity: .1;\n    pointer-events: none; }\n\n.tb-option.submit:hover {\n      background: #4bd58a; }\n\n.tb-option.submit.enabled {\n      opacity: 1;\n      pointer-events: all; }\n\n.tb-option.active {\n    background: #47d487;\n    color: white !important; }\n\n.tb-option.sub {\n    margin: 2px 8px;\n    padding: 4px 8px;\n    border-radius: 12px;\n    color: #BBBBBB !important; }\n\n.tb-option.sub.active {\n      background: #47d487;\n      color: white !important;\n      pointer-events: none; }\n\n.tb-option.sub:hover:not(.active) {\n      color: #28ab64 !important; }\n\n@media (max-width: 768px) {\n    .tb-option {\n      font-size: .65rem;\n      padding: 4px 12px;\n      margin: 0 8px;\n      border-radius: 8px; } }\n\n.groups-input {\n  width: 100%;\n  margin: 0 16px;\n  padding-left: 8px;\n  border: none;\n  outline: none;\n  font-size: .9rem; }\n\n.groups-input::-webkit-input-placeholder {\n    color: #AAAAAA;\n    font-size: .9rem; }\n\n.groups-input:-ms-input-placeholder {\n    color: #AAAAAA;\n    font-size: .9rem; }\n\n.groups-input::-ms-input-placeholder {\n    color: #AAAAAA;\n    font-size: .9rem; }\n\n.groups-input::placeholder {\n    color: #AAAAAA;\n    font-size: .9rem; }\n\n.selection-menu, .photo-menu {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-bottom: 24px;\n  background: #FFFFFF;\n  border: 1px solid #e2e2e2;\n  border-top: none;\n  padding: 16px; }\n\n@media (max-width: 768px) {\n  .selection-menu {\n    flex-wrap: wrap;\n    justify-content: center; } }\n\n.dim-overlay {\n  position: absolute;\n  background: #000000;\n  opacity: .5;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: -1; }\n\n.question-form-container {\n  width: 100%;\n  background: #FFFFFF;\n  border: 1px solid #e2e2e2;\n  box-sizing: border-box; }\n\n.photo-menu .tb-option {\n  color: #AAAAAA !important;\n  cursor: initial; }\n\n.summary-container {\n  width: 100%;\n  background: #FFFFFF;\n  border: 1px solid #e2e2e2;\n  border-bottom: none;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 16px; }\n\n.question-count {\n  margin: 0;\n  font-size: 1.2rem;\n  color: #bbbbbb;\n  font-family: \"Fira Sans\";\n  font-weight: 500;\n  text-align: center; }\n\n.preview-btn {\n  padding: 4px 12px;\n  color: #999999 !important;\n  border: 1px solid #e2e2e2;\n  border-radius: 8px;\n  font-size: .9rem;\n  cursor: pointer;\n  float: right;\n  transition: all 200ms ease-in-out; }\n\n.preview-btn:hover {\n    border-color: #28ab64;\n    color: #28ab64 !important;\n    transition: all 200ms ease-in-out; }\n\n.prev-item {\n  flex-basis: 33.33%; }\n\n.question {\n  width: 100%;\n  background: #FFFFFF;\n  padding: 24px 16px;\n  box-shadow: 0 6px 30px 12px rgba(0, 0, 0, 0.05); }\n\n.number-label {\n  font-size: .8rem;\n  font-family: \"Fira Sans\";\n  font-weight: 400;\n  color: #AAAAAA;\n  margin-bottom: 8px; }\n\n.question-body {\n  font-size: 1.4rem;\n  font-family: \"Fira Sans\";\n  font-weight: 600;\n  color: #333333;\n  margin-left: 8px;\n  margin-bottom: 16px; }\n\n.prev-radios {\n  margin-left: 32px;\n  margin-right: 8px; }\n\n.radio-container {\n  margin-bottom: 8px; }\n\n.radio-text {\n  font-size: 1rem;\n  font-family: \"Fira Sans\";\n  font-weight: 500;\n  color: #484848; }\n\n.number-boundary {\n  font-size: 1rem;\n  font-family: \"Fira Sans\";\n  font-weight: 600;\n  color: #999999;\n  margin-left: 8px;\n  margin-bottom: 16px;\n  margin-top: -16px; }\n\n.title {\n  cursor: pointer; }\n\n.submit-container {\n  width: 100%;\n  background: #FFFFFF;\n  padding: 8px 16px;\n  box-shadow: 0 6px 30px 12px rgba(0, 0, 0, 0.05);\n  display: flex;\n  justify-content: center;\n  margin-bottom: 24px; }\n\n.submit-btn {\n  padding: 8px 24px;\n  background: #28ab64;\n  color: #FFFFFF !important;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n  font-family: \"Fira Sans\";\n  font-weight: 400; }\n\n.submit-btn:hover {\n    background: #4bd58a; }\n\n.imgContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%; }\n\n.imgContainer .inner {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    margin-bottom: 12px; }\n\n.input-group {\n  max-width: 320px; }\n\n.url-input {\n  border: 1px solid #e2e2e2;\n  outline: none; }\n\n.url-input :focus {\n    border-color: #28ab64 !important; }\n\n#uploadBtn {\n  margin-right: 20px; }\n\n@media (max-width: 767px) {\n    #uploadBtn {\n      margin-right: 10px; } }\n\n#orText {\n  margin: 0px;\n  font-weight: 400;\n  font-size: .85rem;\n  color: #CCCCCC !important;\n  font-family: \"Fira Sans\"; }\n\n#urlImage {\n  margin: 0px 20px; }\n\n@media (max-width: 767px) {\n    #urlImage {\n      margin: 0 10px; } }\n\n#preview {\n  max-width: 128px;\n  border-radius: 8px;\n  outline-style: none;\n  outline: none; }\n\n.submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 20%;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n\n.submitButton.not {\n    background: #47d487;\n    margin-top: 2px;\n    margin-left: 10px;\n    padding: 2px 10px;\n    margin-bottom: 0px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n@media (max-width: 767px) {\n    .submitButton {\n      margin-top: 15px; } }\n\n.btn-outline-secondary {\n  border-color: #E2E2E2; }\n\n.btn-outline-secondary:hover {\n    background: #AAAAAA;\n    border-color: #AAAAAA; }\n\n.form-control:focus {\n  box-shadow: 0 0 0 1px rgba(76, 175, 80, 0.53); }\n\n.q-prev-image {\n  max-width: 64px;\n  margin: 8px 16px; }\n\n.hidden {\n  display: none; }\n\n#deleteCross {\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  z-index: 11;\n  cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/ask-question/ask-question.component.ts":
/*!********************************************************!*\
  !*** ./src/app/ask-question/ask-question.component.ts ***!
  \********************************************************/
/*! exports provided: AskQuestionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AskQuestionComponent", function() { return AskQuestionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _QuestionForms_multiple_choice_form_multiple_choice_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../QuestionForms/multiple-choice-form/multiple-choice-form.component */ "./src/app/QuestionForms/multiple-choice-form/multiple-choice-form.component.ts");
/* harmony import */ var _QuestionForms_rating_form_rating_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../QuestionForms/rating-form/rating-form.component */ "./src/app/QuestionForms/rating-form/rating-form.component.ts");
/* harmony import */ var _QuestionForms_number_question_form_number_question_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../QuestionForms/number-question-form/number-question-form.component */ "./src/app/QuestionForms/number-question-form/number-question-form.component.ts");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AskQuestionComponent = /** @class */ (function () {
    function AskQuestionComponent(http, router, route) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.route = route;
        this.activeDimmer = false;
        this.selection = '';
        this.questionType = 'shortanswer';
        this.question = '';
        this.pic = '';
        this.tempQuestion = '';
        this.getQuestionData = false;
        this.questionsContainer = [];
        this.preview = false;
        this.title = '';
        this.addTitle = false;
        this.group = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
        this.isMobile = true;
        this.kindsWithOptions = ["Multiple Choice", "Checkboxes", "Drop-down", "Rank"];
        this.alphabeth = "abcdefghijklmnopqrstuvwxyz";
        this.groups = ['Class 1', 'Class 2', 'Class 3'];
        this.refreshFeed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.filteredGroups = this.group.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (g) { return g ? _this._filterGroups(g) : _this.groups.slice(); }));
        console.log('TYPEOF: ', typeof this.filteredGroups);
    }
    AskQuestionComponent.prototype._filterGroups = function (value) {
        var filterValue = value.toLowerCase();
        return this.groups.filter(function (g) { return g.toLowerCase().indexOf(filterValue) === 0; });
    };
    AskQuestionComponent.prototype.ngOnInit = function () {
        //handle dimmer toggling
        var activateDimmer = this.activateDimmer.bind(this);
        var deactivateDimmer = this.deactivateDimmer.bind(this);
        jquery__WEBPACK_IMPORTED_MODULE_7__(window.document).on('click', function (event) {
            if (jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).parents('.askbox').length) {
                activateDimmer();
                event.stopPropagation();
            }
            else {
                event.stopPropagation();
                deactivateDimmer();
            }
        });
    };
    AskQuestionComponent.prototype.activateDimmer = function () {
        this.activeDimmer = true;
        jquery__WEBPACK_IMPORTED_MODULE_7__('.fBody, .cBody').css({ 'z-index': -2 });
        // $('nav').css({'z-index': 0});
    };
    AskQuestionComponent.prototype.deactivateDimmer = function () {
        if (this.question) {
            return;
        }
        else {
            this.activeDimmer = false;
            jquery__WEBPACK_IMPORTED_MODULE_7__('.fBody, .cBody').css({ 'z-index': 2 });
            jquery__WEBPACK_IMPORTED_MODULE_7__('.cBody, nav').css({ 'z-index': 1 });
        }
    };
    AskQuestionComponent.prototype.toolbarSelect = function (item) {
        if (item === this.selection) {
            this.selection = '';
        }
        else {
            this.selection = item;
            this.activateDimmer();
        }
    };
    AskQuestionComponent.prototype.questionSelect = function (item) {
        var _this = this;
        var toolbarSelect = function () {
            _this.toolbarSelect(_this.selection);
        };
        if (item === this.questionType) {
            window.setTimeout(toolbarSelect, 1500);
        }
        else {
            this.questionType = item;
            window.setTimeout(toolbarSelect, 1500);
        }
    };
    AskQuestionComponent.prototype.isQuestionEmpty = function (val) {
        if (this.question && !this.activateDimmer) {
            this.activateDimmer();
        }
    };
    AskQuestionComponent.prototype.pushQuestionToList = function (data) {
        data.body = this.tempQuestion;
        data.required = true;
        data.pic = this.pic;
        this.questionsContainer.push(data);
        this.questionType = 'shortanswer';
        this.pic = '';
        console.log(data);
    };
    AskQuestionComponent.prototype.getData = function (type) {
        this.tempQuestion = this.question;
        this.question = '';
        if (this.questionType === 'shortanswer') {
            this.questionsContainer.push({ body: this.tempQuestion, kind: 'Short Answer', pic: this.pic });
            this.pic = '';
        }
        if (this.questionType === 'multiplechoice') {
            this.mc.submitQuestion();
        }
        if (this.questionType === 'rating') {
            this.rc.submitQuestion();
        }
        if (this.questionType === 'number') {
            this.nc.submitQuestion();
        }
    };
    AskQuestionComponent.prototype.togglePreview = function () {
        if (this.preview === false) {
            this.activateDimmer();
        }
        this.preview = !this.preview;
    };
    AskQuestionComponent.prototype.toggleTitle = function () {
        this.addTitle = !this.addTitle;
    };
    AskQuestionComponent.prototype.submitForm = function () {
        var _this = this;
        var formData = this.questionnaireData();
        this.http.post('/forms/create', formData).toPromise()
            .then(function (response) {
            // formData.id = response.json().id;
            // this.shareLink = `https://www.questionsly.com/feed;survey=${formData.id}`;
            // this.formService.setData(formData);
            _this.questionsContainer = [];
            _this.questionType = 'shortanswer';
            _this.preview = false;
            _this.deactivateDimmer();
            _this.refreshFeed.emit(true);
            // const refresh = () => {this.refreshFeed.emit(true);};
            // window.setTimeout(refresh, 1000);
        })
            .catch(function (error) { return _this.router.navigate(['/users/login']); });
    };
    AskQuestionComponent.prototype.questionnaireData = function () {
        var data = this.questionsContainer;
        data.forEach(function (q, i) { return data[i].number = i; });
        for (var i = 0; i < data.length; i++) {
            if (this.kindsWithOptions.indexOf(data[i].kind) !== -1) {
                for (var j = 0; j < data[i].options.length; j++) {
                    data[i].options[j].label = this.alphabeth[j];
                }
            }
        }
        // for (let tagField of ['hashtags', 'sharedWith']) {
        //   if (data[tagField]) {
        //     data[tagField] = data[tagField].map(tag => tag.value ? tag.value : tag);
        //   }
        // }
        return data;
    };
    /*
  Function to carry out the actual PUT request to S3 using the signed request from the app.
  */
    AskQuestionComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.pic = url;
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    AskQuestionComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    AskQuestionComponent.prototype.onPicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    AskQuestionComponent.prototype.setPicUrl = function (url) {
        var _this = this;
        this.pic = url;
        var toggle = function () { _this.toolbarSelect(''); };
        window.setTimeout(toggle, 1500);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], AskQuestionComponent.prototype, "refreshFeed", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mc'),
        __metadata("design:type", _QuestionForms_multiple_choice_form_multiple_choice_form_component__WEBPACK_IMPORTED_MODULE_4__["MultipleChoiceFormComponent"])
    ], AskQuestionComponent.prototype, "mc", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('rc'),
        __metadata("design:type", _QuestionForms_rating_form_rating_form_component__WEBPACK_IMPORTED_MODULE_5__["RatingFormComponent"])
    ], AskQuestionComponent.prototype, "rc", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('nc'),
        __metadata("design:type", _QuestionForms_number_question_form_number_question_form_component__WEBPACK_IMPORTED_MODULE_6__["NumberQuestionFormComponent"])
    ], AskQuestionComponent.prototype, "nc", void 0);
    AskQuestionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ask-question',
            template: __webpack_require__(/*! ./ask-question.component.html */ "./src/app/ask-question/ask-question.component.html"),
            styles: [__webpack_require__(/*! ./ask-question.component.scss */ "./src/app/ask-question/ask-question.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], AskQuestionComponent);
    return AskQuestionComponent;
}());



/***/ }),

/***/ "./src/app/confirmation-popup/confirmation-popup.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/confirmation-popup/confirmation-popup.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Confirm action</h4>\n        <!-- <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n            <span aria-hidden=\"true\" style=\"font-size:30px;\">&times;</span>\n        </button> -->\n    </div>\n    <div class=\"modal-body\">\n        <div>{{text}}</div>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"c(true)\">Yes</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"c(false)\">No</button>\n    </div>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/confirmation-popup/confirmation-popup.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/confirmation-popup/confirmation-popup.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-header, .modal-footer {\n  padding: 6px 15px; }\n\n.modal-body {\n  padding: 18px 15px; }\n\n.modal-title, .modal-footer button {\n  font-size: 16px; }\n\n.modal-header {\n  background-color: #1E824C; }\n\n.modal-header .modal-title {\n    font-weight: bold;\n    color: #fff;\n    font-size: 18px; }\n\n.modal-footer {\n  background-color: #eee;\n  border-top: 2px solid #ddd; }\n\n.modal-footer button {\n    padding: 5px 10px;\n    font-weight: bold;\n    font-size: 15px; }\n"

/***/ }),

/***/ "./src/app/confirmation-popup/confirmation-popup.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/confirmation-popup/confirmation-popup.component.ts ***!
  \********************************************************************/
/*! exports provided: ConfirmationPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmationPopupComponent", function() { return ConfirmationPopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmationPopupComponent = /** @class */ (function () {
    function ConfirmationPopupComponent(modalService) {
        this.modalService = modalService;
    }
    ConfirmationPopupComponent.prototype.open = function () {
        return this.modalService.open(this.content);
    };
    ConfirmationPopupComponent.prototype.confirm = function (text) {
        this.text = text;
        return this.open().result;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('content'),
        __metadata("design:type", Object)
    ], ConfirmationPopupComponent.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ConfirmationPopupComponent.prototype, "text", void 0);
    ConfirmationPopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-confirmation-popup',
            template: __webpack_require__(/*! ./confirmation-popup.component.html */ "./src/app/confirmation-popup/confirmation-popup.component.html"),
            styles: [__webpack_require__(/*! ./confirmation-popup.component.scss */ "./src/app/confirmation-popup/confirmation-popup.component.scss")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], ConfirmationPopupComponent);
    return ConfirmationPopupComponent;
}());



/***/ }),

/***/ "./src/app/create-form/createForm.component.html":
/*!*******************************************************!*\
  !*** ./src/app/create-form/createForm.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"centerxandy\">\n    <div class=\"qContainer\" *ngIf=\"reject\" style=\"padding: 25px;\">\n        <h2 class=\"qbBody qslyBlack\" style=\"text-align: center; padding: 15px;\">You must be logged in to create ask a question!<br/>Please login first</h2>\n    </div>\n    <!-- Create Questions Container -->\n    <form *ngIf=\"!reject\" [formGroup]=\"questionnaire\" class=\"mtClear\" style=\"width: 100%\">\n        <div *ngIf=\"step === 1\" class=\"oContainer\">\n            <div class=\"qContainer\">\n                <h3 class=\"containerTitle qslyGreen\">Options</h3>\n                <ul class=\"qTypeList\">\n                    <li *ngFor=\"let k of kinds; let kIndex = index\">\n                        <app-form-buttons formControlName=\"kind\" [active]=\"typeView\" [qKind]=\"k\" (selected)=\"toggleView($event)\"></app-form-buttons>\n                        <div *ngIf=\"kinds.length !== kIndex + 1\" class=\"line\"></div>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"lContainer\">\n                <div class=\"qDataScroll\">\n                    <h3 class=\"containerTitle qslyGreen\">Create Your Question</h3>\n                    <div class=\"responseConfiguration\">\n                        <app-mc-question-form *ngIf=\"questionnaire.get('kind').value == 'Multiple Choice'\" (outputUpdateData)=\"updateQuestion($event)\" (questionData)=\"pushQuestionToList($event)\" [updateData]=\"updateData\"></app-mc-question-form>\n                        <app-sa-question-form *ngIf=\"questionnaire.get('kind').value == 'Short Answer'\" (outputUpdateData)=\"updateQuestion($event)\" (questionData)=\"pushQuestionToList($event)\" [updateData]=\"updateData\"></app-sa-question-form>\n                        <app-rating-question-form *ngIf=\"questionnaire.get('kind').value == 'Rating'\" (outputUpdateData)=\"updateQuestion($event)\" (questionData)=\"pushQuestionToList($event)\" [updateData]=\"updateData\"></app-rating-question-form>\n                        <app-number-question-form *ngIf=\"questionnaire.get('kind').value == 'Number'\" (outputUpdateData)=\"updateQuestion($event)\" (questionData)=\"pushQuestionToList($event)\" [updateData]=\"updateData\"></app-number-question-form>\n                    </div>\n                </div>\n            </div>\n\n            <!-- //Finished Questions Container -->\n            <div class=\"rContainer\" [ngClass]=\"{centered: questionData.length === 0}\">\n                <div class=\"qDataScroll\">\n                    <h3 class=\"containerTitle abs qslyGreen\">Overview</h3>\n\n                    <h3 *ngIf=\"!questionData.length\" class=\"containerTitle\" style=\"color: #999; padding: 0 12px\">Your Completed Questions Will Appear Here</h3>\n\n                    <div class=\"surveyTitle\">\n                        <a\n                            href=\"#\"\n                            onClick=\"$('.surveyTitle a').hide(); $('.surveyTitle fieldset').show(); $('.surveyTitle textarea').focus(); return false\"\n                            class=\"titleLink\">\n                            + Add a Title\n                        </a>\n                        <fieldset>\n                            <input\n                                formControlName=\"title\"\n                                placeholder=\"Enter a Title\" \n                                id=\"titleInput\"\n                                />\n                        </fieldset>\n                    </div>\n\n                    <div *ngFor=\"let q of getSortedQuestions(); let i = index\" class=\"qBlock\">\n                        <div class=\"editDelete\">\n                            <span class=\"redCross edit qslyGray\" (click)=\"editQuestion(i)\">Edit</span>\n                            <i class=\"fa fa-times redCross\" (click)=\"removeQuestion(i)\"></i>\n                        </div>\n\n                        <div class=\"aqContainer\">\n                            <div *ngIf=\"questionData.length > 0\" class=\"sortArrowBlock\">\n                                <div *ngIf=\"i !== 0\"><i class=\"fa fa-caret-up arrows\" (click)=\"moveUp(i)\"></i></div>\n                                <div *ngIf=\"i !== questionData.length - 1\"><i class=\"fa fa-caret-down arrows\" (click)=\"moveDown(i)\"></i></div>\n                            </div>\n\n                            <div class=\"qLeftBlock\" [ngClass]=\"{wImg: q.pic !== ''}\">\n                                <h4 class=\"qbType qslyGray\" [ngClass]=\"{mtClear: false}\">Question {{i+1}}: {{q.kind}} <span><a class=\"required\" [ngClass]=\"{req: q.required, not: !q.required, hide: questionData.length == 1}\" (click)=\"toggleRequired(i)\">{{q.required ? 'Required' : 'Optional'}}</a></span> </h4>\n                                <h2 class=\"qbBody qslyBlack\">{{q.body}}</h2>\n\n                                <div *ngIf=\"q.kind === 'Multiple Choice'\">\n                                    <div class=\"qbOptions\" *ngFor=\"let optionGroup of q.options\">\n                                        <label style=\"color: #CCC; margin-bottom: 0px;\">-</label>\n                                        <h3 class=\"qbOption qslyGray\" style=\"\">{{optionGroup.body}}</h3>\n                                    </div>\n                                </div>\n\n\n                                <div *ngIf=\"q.kind === 'Rating'\">\n                                    <div class='starArray'>\n                                        <div *ngFor=\"let x of q.temp\">\n                                            <img src=\"/images/icons/star.svg\" class=\"starIcon\" />\n                                        </div>\n                                    </div>\n                                    <h4 class=\"qbOption qbRating qslyGray\">Rating out of\n                                        <span class=\"qbSpan qslyGreen\">{{q.scale}}</span>\n                                    </h4>\n                                </div>\n\n                                <div *ngIf=\"q.kind === 'Number'\">\n                                    <h4 class=\"qbOption qslyGray\" *ngIf=\"q.boundaries\">A number between\n                                        <span class=\"qbSpan qslyGreen\">{{q.lowerBoundary}}</span> and\n                                        <span class=\"qbSpan qslyGreen\">{{q.upperBoundary}}</span>\n                                    </h4>\n                                    <h4 class=\"qbOption qslyGray\" *ngIf=\"!q.boundaries\">Response can be any number</h4>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div *ngIf=\"q.pic !== ''\" class=\"qRightBlock\">\n                            <img class=\"image\" *ngIf=\"q.pic !== ''\" id=\"preview\" [src]=\"q.pic\">\n                        </div>\n\n                    </div>\n                </div>\n\n                <!-- <div id=\"sbContainer\"> -->\n                    <a *ngIf=\"questionData.length > 0\" id=\"publishBtn\" class=\"submitButton\" (click)=\"postForm()\" >Next</a>\n                <!-- </div> -->\n            </div>\n        </div>\n\n\n        <!-- ************Publish and Share*****************  -->\n\n        <div *ngIf=\"step === 2\" class=\"oContainer l2\">\n            <div class=\"forMobile\">\n                <a  class=\"prevButton\" (click)=\"prevView()\">Previous</a>\n            </div>\n\n            <div class=\"lContainer l2\">\n                <h3 class=\"containerTitle qslyGreen\">Settings</h3>\n\n                <div class=\"form-group\" style=\"margin-bottom: 2px; width: 80%\">\n                    <div [ngClass]=\"{'tag-input-wrapper': true, 'form-control': true, 'underlined-input': true, 'active': showHashtags == true}\" style=\"padding: auto;\">\n                        <div [ngClass]=\"{'d-none': showHashtags || questionnaire.get('hashtags').value}\" class=\"tag-placeholder text-muted\" (click)=\"showHashtags = true; focusTagInput(hashtags)\">\n                            Enter up to 3 Tags\n                        </div>\n                        <tag-input #hashtags [ngClass]=\"{'d-none': !showHashtags && questionnaire.get('hashtags').value === null}\" [onAdding]=\"transformHashtag\" [maxItems]='3'\n                            placeholder=\"Tag\" secondaryPlaceholder=\"#hashtag\" (onBlur)=\"showHashtags = false\" [separatorKeyCodes]=\"[13, 188]\"\n                            formControlName=\"hashtags\" id=\"tags\">\n                            <tag-input-dropdown [matchingFn]=\"acMatching\" [focusFirstElement]=\"true\" [autocompleteObservable]=\"observableSourceTag.bind(this)\">\n                            </tag-input-dropdown>\n                        </tag-input>\n                    </div>\n                </div>\n\n\n                <div class=\"flexContainer fdColumn faStart\">\n                    <h6 class=\"settingTitle qslyBlack\">Post as</h6>\n                    <div style=\"display:flex; justify-content: flex-start;\">\n                        <app-switch-buttons [active]=\"questionnaire.get('anonymous').value\" [option]=\"false\" [title]=\"'Myself'\" (selected)=\"toggleAuthor($event)\"\n                            formControlName=\"anonymous\"></app-switch-buttons>\n                        <app-switch-buttons [active]=\"questionnaire.get('anonymous').value\" [option]=\"true\" [title]=\"'Anonymous'\" (selected)=\"toggleAuthor($event)\"\n                            formControlName=\"anonymous\"></app-switch-buttons>\n                    </div>\n                </div>\n\n                <div class=\"flexContainer fdColumn faStart\">\n                    <h6 class=\"settingTitle qslyBlack\">Audience</h6>\n                    <div style=\"display:flex; justify-content: flex-start; width: 100%;\">\n                        <app-switch-buttons [active]=\"questionnaire.get('public').value\" [option]=\"true\" [title]=\"'Public'\" (selected)=\"toggleAudience($event)\"\n                            formControlName=\"public\"></app-switch-buttons>\n                        <app-switch-buttons [active]=\"questionnaire.get('public').value\" [option]=\"false\" [title]=\"'Private'\" (selected)=\"toggleAudience($event)\"\n                            formControlName=\"public\"></app-switch-buttons>\n                    </div>\n                </div>\n\n                <div class=\"mbClear flexContainer fdColumn faStart\">\n                    <h6 class=\"settingTitle qslyBlack\">Require Login?</h6>\n                    <div style=\"display:flex; justify-content: flex-start;\">\n                        <app-switch-buttons [active]=\"questionnaire.get('loginRequired').value\" [option]=\"false\" [title]=\"'No'\" (selected)=\"toggleLogin($event)\" formControlName=\"loginRequired\"></app-switch-buttons>\n                        <app-switch-buttons [active]=\"questionnaire.get('loginRequired').value\" [option]=\"true\" [title]=\"'Yes'\" (selected)=\"toggleLogin($event)\" formControlName=\"loginRequired\"></app-switch-buttons>\n                    </div>\n                </div>\n            </div>\n\n\n\n\n            <div class=\"rContainer sFix\">\n                <h3 class=\"containerTitle qslyGreen\">Get More Responses</h3>\n\n                <div class=\"flexContainer fdColumn faStart\">\n                    <h6 class=\"settingTitle qslyBlack\">Share with your friends</h6>\n                    <div style=\"display:flex; justify-content: flex-start; width: 100%\">\n                        <div class=\"tag-input-wrapper form-control\" style=\"margin-left: 10px;\">\n                            <div [ngClass]=\"{'d-none': showPrivateShares || questionnaire.get('sharedWithUsers').value}\" class=\"tag-placeholder text-muted\"\n                                (click)=\"showPrivateShares = true; focusTagInput(sharedWith)\">\n                                Name\n                            </div>\n                            <tag-input #sharedWith [ngClass]=\"{'d-none': !showPrivateShares && questionnaire.get('sharedWithUsers').value === null}\"\n                                id=\"private-shares\" [identifyBy]=\"'value'\" [displayBy]=\"'display'\" placeholder=\"Name\" secondaryPlaceholder=\"Name\"\n                                [onAdding]=\"transformName\" [separatorKeyCodes]=\"[32, 13, 188]\" formControlName=\"sharedWithUsers\" [onlyFromAutocomplete]=\"true\">\n                                <tag-input-dropdown [matchingFn]=\"acMatching\" [focusFirstElement]=\"true\" [autocompleteObservable]=\"observableSourceUser.bind(this)\">\n                                </tag-input-dropdown>\n                            </tag-input>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"flexContainer fdColumn faStart\">\n                    <h6 class=\"settingTitle qslyBlack\">Share with a group</h6>\n                    <div style=\"display:flex; justify-content: flex-start; width: 100%\">\n                        <div class=\"tag-input-wrapper form-control\" style=\"margin-left: 10px;\">\n                            <div [ngClass]=\"{'d-none': showPublicShares || questionnaire.get('sharedWithCommunities').value}\" class=\"tag-placeholder text-muted\"\n                                (click)=\"showPublicShares = true; focusTagInput(sharedWith)\">\n                                Group name\n                            </div>\n                            <tag-input #sharedWith [ngClass]=\"{'d-none': !showPublicShares && questionnaire.get('sharedWithCommunities').value === null}\"\n                                id=\"public-shares\" placeholder=\"Name\" secondaryPlaceholder=\"Name\" [onAdding]=\"transformName\" (onBlur)=\"showPublicShares = false\"\n                                [separatorKeyCodes]=\"[32, 13, 188]\" formControlName=\"sharedWithCommunities\" [onlyFromAutocomplete]=\"true\">\n                                <tag-input-dropdown [matchingFn]=\"acMatching\" [focusFirstElement]=\"true\" [autocompleteObservable]=\"observableSourceCom.bind(this)\">\n                                </tag-input-dropdown>\n                            </tag-input>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"flexContainer fdColumn faStart shareEmails\">\n                    <h6 class=\"settingTitle qslyBlack\">Share with email addresses</h6>\n                    <div>\n                        <input type=\"text\" name=\"shareEmailAddresses\" placeholder=\"Emails\">\n                        <a href=\"#\" onClick=\"$('#secretUploadBox').toggle(); return false\" class=\"xlsBtn\">Upload .XLS</a>\n                        <fieldset id=\"secretUploadBox\">\n                            <p style=\"font-size: .75rem\">Upload an Excel file (.XLS) to extract email addresses</p>\n                            <input type=\"file\" name=\"shareEmailAddressesFile\" accept=\".xls,.xlsx\">\n                            <button (click)=\"uploadShareEmailAddresses()\">Upload</button>\n                        </fieldset>\n                    </div>\n                </div>\n\n                <div class=\"flexContainer fdColumn faStart\">\n                    <h6 class=\"settingTitle qslyBlack\">Share it With the World</h6>\n                    <div class=\"shareFlex\">\n                        <share-buttons [theme]=\"'default'\" [url]=\"shareLink\" [include]=\"['facebook','linkedin', 'twitter']\"></share-buttons>\n                        <div style=\"display:flex; justify-content: flex-start; align-items: center; flex: 1\">\n                            <input class=\"col form-control\" style=\"max-height: 30px; font-size: .75rem\" [value]=\"shareLink\" />\n                            <share-button [theme]=\"'default'\" [button]=\"'copy'\" [showText]=\"false\" [size]=\"1\" [url]=\"shareLink\" style=\"margin-top:1px\"></share-button>\n                        </div>\n                    </div>\n                </div>\n\n            <div *ngIf=\"this.published\" class=\"flexContainer fjCenter\" style=\"margin-top:10px; margin-bottom: 30px\">\n                <h1 class=\"publishedLine qslyGreen\">Your Post has Been Published!</h1>\n            </div>\n\n\n                 <a id=\"publishBtn\" class=\"submitButton\" (click)=\"updateForm()\">Publish</a>\n\n            </div>\n\n\n            <a id=\"previousBtn\" class=\"submitButton\" (click)=\"prevView()\">Previous</a>\n\n        </div>\n    </form>\n\n</div>\n"

/***/ }),

/***/ "./src/app/create-form/createForm.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/create-form/createForm.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3 {\n  margin-bottom: 2px !important; }\n\n.centerxandy {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  min-height: 500px;\n  height: calc(100vh - 52px);\n  width: 100%;\n  margin-top: 0px; }\n\n@media (max-width: 767px) {\n    .centerxandy {\n      margin-top: 0;\n      height: auto; } }\n\n.oContainer {\n  margin: auto auto;\n  display: flex;\n  flex-flow: row nowrap;\n  min-height: 500px;\n  height: auto;\n  max-height: 800px;\n  width: auto;\n  max-width: 1280px;\n  position: relative; }\n\n.oContainer.l2 {\n    width: auto;\n    max-width: 800px; }\n\n@media (max-width: 767px) {\n    .oContainer {\n      flex-flow: row wrap;\n      width: 100%;\n      height: auto;\n      justify-content: center; }\n      .oContainer.l2 {\n        width: 90%; } }\n\n.typesContainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: center; }\n\n.containerTitle {\n  font-family: Karla;\n  font-weight: 300;\n  font-size: 1.4rem;\n  text-align: center;\n  margin: 20px auto;\n  margin-bottom: 40px !important; }\n\n@media (max-width: 767px) {\n    .containerTitle {\n      margin-bottom: 12px !important;\n      margin-top: 10px;\n      font-size: 1.2rem; } }\n\n.line {\n  height: 1px;\n  border: none;\n  border-top: 1px solid #DDD;\n  width: 85%;\n  margin: 8px auto; }\n\n@media (max-width: 767px) {\n    .line {\n      display: none; } }\n\n.lContainer, .rContainer, .qContainer {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  position: relative; }\n\n.lContainer .absPos, .rContainer .absPos, .qContainer .absPos {\n    position: absolute;\n    top: 5px;\n    width: 100%; }\n\n@media (max-width: 767px) {\n    .lContainer, .rContainer, .qContainer {\n      flex-flow: row wrap;\n      width: 100%;\n      height: auto;\n      margin-bottom: 6px;\n      border-radius: 12px;\n      border: 1px solid #e2e2e2; } }\n\n.mtClear {\n  margin-top: 30px; }\n\n@media (max-width: 767px) {\n    .mtClear {\n      margin-top: 30px; } }\n\n.mbClear {\n  margin-bottom: 80px; }\n\n@media (max-width: 767px) {\n    .mbClear {\n      margin-bottom: 6px; } }\n\n.lContainer {\n  width: 70%; }\n\n.lContainer.l2 {\n    border-bottom-left-radius: 12px;\n    border-top-left-radius: 12px;\n    border-left: solid 1px #e2e2e2;\n    width: 100%; }\n\n@media (max-width: 767px) {\n    .lContainer {\n      flex-flow: column wrap;\n      width: 90%;\n      height: auto; } }\n\n.qContainer {\n  width: auto;\n  padding: 0px 10px;\n  background: #FFF;\n  border-bottom-left-radius: 12px;\n  border-top-left-radius: 12px;\n  border: solid 1px #e2e2e2;\n  min-width: 12rem;\n  justify-content: flex-start; }\n\n.qContainer ul {\n    display: block;\n    padding-left: 0px;\n    margin-bottom: 0px;\n    list-style: none; }\n\n@media (max-width: 767px) {\n    .qContainer {\n      flex-flow: column wrap;\n      width: 90%;\n      height: auto;\n      padding-bottom: 10px; } }\n\n@media (max-width: 767px) {\n  .qTypeList {\n    width: 100%;\n    display: flex !important;\n    flex-flow: row wrap; }\n    .qTypeList li {\n      width: 50%; } }\n\n.lContainer {\n  background: #FFF;\n  border-top: solid 1px #e2e2e2;\n  border-bottom: solid 1px #e2e2e2;\n  position: relative; }\n\n.rContainer {\n  background: #FFF;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  border-bottom-right-radius: 12px;\n  border-top-right-radius: 12px;\n  border: solid 1px #e2e2e2;\n  position: relative; }\n\n@media (max-width: 767px) {\n    .rContainer {\n      flex-flow: column wrap;\n      width: 90%;\n      height: auto; }\n      .rContainer.sFix {\n        width: 100%; } }\n\n.centered {\n  justify-content: center;\n  align-items: center; }\n\n.iTitle {\n  font-family: Karla;\n  font-size: 1.1rem;\n  font-weight: 700;\n  text-align: center;\n  margin: 12px auto; }\n\n.responseConfiguration {\n  width: 100%; }\n\n.multipleChoice {\n  display: flex;\n  justify-content: center;\n  height: 200px;\n  width: 100%;\n  margin: 0px 5%; }\n\n.niceTextInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  border-bottom: solid 2px #28ab64;\n  width: 100%; }\n\n.qBlock {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  position: relative; }\n\n@media (max-width: 767px) {\n    .qBlock {\n      flex-flow: row wrap;\n      margin-bottom: 10px; } }\n\n.sortArrowBlock {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.sortArrowBlock .arrows {\n    font-size: 1.7rem;\n    color: #28ab64;\n    margin: 4px 12px;\n    margin-right: 0px; }\n\n.sortArrowBlock .arrows:hover {\n      cursor: pointer;\n      color: #47d487; }\n\n.qLeftBlock {\n  padding: 25px;\n  padding-left: 10px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  margin-bottom: 10px; }\n\n.qLeftBlock.wImg {\n    width: 100%; }\n\n@media (max-width: 767px) {\n    .qLeftBlock {\n      width: 100%;\n      padding: 15px 0px 0px 10px; }\n      .qLeftBlock.wImg {\n        width: 100%; } }\n\n.aqContainer {\n  display: flex;\n  flex-flow: row nowrap;\n  width: 100%; }\n\n.qRightBlock {\n  padding: 25px 10px;\n  width: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  margin: 0px 20px; }\n\n@media (max-width: 767px) {\n    .qRightBlock {\n      padding: 0 20px 10px 20px;\n      width: 100%;\n      align-items: flex-end; } }\n\n#preview {\n  border: 1px solid #28ab64;\n  width: 100px;\n  border-radius: 8px;\n  outline-style: none;\n  outline: none;\n  margin: 0px; }\n\n.starIcon {\n  width: 28px; }\n\n@media (max-width: 767px) {\n    .starIcon {\n      width: 18px; } }\n\n.qbType {\n  font-size: .7rem; }\n\n@media (max-width: 767px) {\n    .qbType {\n      font-size: .6rem; } }\n\n.qbBody {\n  font-size: 1.3rem;\n  font-family: Karla; }\n\n@media (max-width: 767px) {\n    .qbBody {\n      font-size: .92rem;\n      padding: 0 10px 0 0; } }\n\n.qbOptions {\n  display: flex;\n  justify-content: flex-start;\n  padding-left: 20px;\n  margin-bottom: none; }\n\n@media (max-width: 767px) {\n    .qbOptions {\n      padding-left: 6px; } }\n\n.qbOption {\n  font-size: 1rem;\n  font-family: Karla; }\n\n.qbOption.qbOption {\n    padding-left: 20px; }\n\n@media (max-width: 767px) {\n    .qbOption {\n      font-size: .6rem; }\n      .qbOption.qbOption {\n        padding: 0 10px 6px 6px; }\n      .qbOption.qbRating {\n        padding-bottom: 0; } }\n\n.qbSpan {\n  font-size: 1.2rem;\n  font-family: Karla;\n  font-weight: 700; }\n\n@media (max-width: 767px) {\n    .qbSpan {\n      font-size: .8rem; } }\n\n#sbContainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: flex-start;\n  width: 100%;\n  padding-right: 20px;\n  position: absolute;\n  bottom: 0px;\n  margin-bottom: 10px; }\n\n#sb2Container {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 100%;\n  padding-left: 20px;\n  position: absolute;\n  bottom: 0px;\n  margin-bottom: 10px; }\n\n.prevButton {\n  display: none;\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 100px;\n  max-width: 150px;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n\n.prevButton:active {\n    outline-style: none; }\n\n.prevButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n@media (max-width: 767px) {\n    .prevButton {\n      margin-top: 0;\n      margin-bottom: 8px;\n      display: block; } }\n\n.forMobile {\n  display: none; }\n\n@media (max-width: 767px) {\n    .forMobile {\n      display: block;\n      width: 100%;\n      display: flex;\n      justify-content: flex-start; } }\n\n#previousBtn {\n  position: absolute;\n  bottom: 12px;\n  left: 20px;\n  margin-bottom: 5px;\n  background: #999; }\n\n@media (max-width: 767px) {\n    #previousBtn {\n      display: none; } }\n\n#publishBtn {\n  margin: 10px auto;\n  margin-bottom: 20px;\n  width: 100%;\n  max-width: 80%; }\n\n@media (max-width: 767px) {\n    #publishBtn {\n      margin: 15px auto; } }\n\n.submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 100px;\n  max-width: 150px;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n.shareContainer {\n  margin: auto auto;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  min-height: 80vh;\n  height: auto;\n  width: 70%;\n  background: #FFF;\n  border-radius: 12px;\n  border: solid 1px #e2e2e2;\n  position: relative; }\n\n.flexContainer {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 15px 25px;\n  width: 95%; }\n\n.starArray {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 12px;\n  padding-left: 20px; }\n\n.starArray img {\n    margin: auto 6px; }\n\n.starArray img:first-of-type {\n    margin-left: 0px; }\n\n@media (max-width: 767px) {\n    .starArray {\n      padding-left: 5px;\n      margin-bottom: 5px; } }\n\n.editDelete {\n  position: absolute;\n  right: 20px;\n  top: 10px;\n  display: flex;\n  align-items: center; }\n\n.redCross {\n  color: #ffa6a6;\n  font-size: 1.3rem; }\n\n.redCross:hover {\n    cursor: pointer;\n    color: #ff7373; }\n\n.edit {\n  font-size: .8rem;\n  margin-right: 10px; }\n\n.edit:hover {\n    cursor: pointer;\n    color: #999; }\n\n.settingTitle {\n  font-family: Karla;\n  font-weight: 700;\n  font-size: 1.1rem;\n  width: 100%;\n  text-align: left;\n  padding-right: 10px; }\n\n.settingTitle .subDesc {\n    display: block;\n    font-size: .8rem;\n    font-weight: 300;\n    padding-right: 10px; }\n\n.qDataScroll {\n  overflow-x: none;\n  overflow-y: scroll;\n  width: 100%;\n  height: 100%;\n  position: relative; }\n\n@media (max-width: 767px) {\n    .qDataScroll {\n      height: auto; } }\n\n.fdColumn {\n  flex-direction: column; }\n\n.faStart {\n  align-items: flex-start; }\n\n.fjCenter {\n  justify-content: center; }\n\n.backAndBorder {\n  background: white;\n  border: 1px solid #e2e2e2;\n  border-radius: 12px; }\n\n.sb-text {\n  display: none !important; }\n\n@media (max-width: 767px) {\n  .descSwitchButton {\n    width: 49%;\n    flex: 1; } }\n\n@media (max-width: 767px) {\n  .rhs {\n    margin-left: 1%; } }\n\n@media (max-width: 767px) {\n  .lhs {\n    margin-right: 1%; } }\n\n.publishedLine {\n  font-size: 1.3rem;\n  text-align: center;\n  width: 100%;\n  font-family: Karla;\n  font-weight: 300;\n  margin-bottom: 6px; }\n\n@media (max-width: 767px) {\n    .publishedLine {\n      font-size: 1.1rem; } }\n\n.required {\n  font-family: Karla;\n  font-size: .75rem;\n  padding: 2px 4px;\n  border-radius: 4px;\n  margin-left: 8px; }\n\n.required.req {\n    background: #47d487;\n    color: #FFF;\n    border: none; }\n\n.required.req:hover {\n      background: #FFF;\n      color: #28ab64;\n      border: solid 1px #28ab64;\n      cursor: pointer; }\n\n.required.not {\n    color: #666;\n    border: 1px solid #999; }\n\n.required.not:hover {\n      color: #FFF;\n      border: 1px solid #999;\n      background: #999;\n      cursor: pointer; }\n\n.required.hide {\n    display: none; }\n\n.shareFlex {\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  width: 100%; }\n\n@media (max-width: 767px) {\n    .shareFlex {\n      flex-flow: row nowrap; } }\n\n.shareEmails > div {\n  width: 100%; }\n\n.shareEmails input[name=shareEmailAddresses] {\n  margin-left: 10px;\n  border: 1px solid #ced4da;\n  border-radius: .25rem;\n  width: 60%;\n  line-height: 1.8rem;\n  padding: 0 10px; }\n\n.shareEmails fieldset {\n  display: none;\n  margin-top: 1em; }\n\n.shareEmails fieldset input {\n  width: 60%; }\n\n.shareEmails fieldset button {\n  margin-left: 1em;\n  background-color: white;\n  border-radius: .25rem; }\n\n.surveyTitle {\n  width: 100%;\n  text-align: center; }\n\n.surveyTitle fieldset {\n    display: none; }\n\n@media (max-width: 767px) {\n    .surveyTitle {\n      margin-bottom: 25px; } }\n\n.titleLink {\n  color: #FFF;\n  border: solid 1px #47d487;\n  background-color: #47d487;\n  padding: 4px 32px;\n  border-radius: 8px;\n  font-size: 1rem;\n  text-decoration: none; }\n\n.titleLink:hover {\n    border-color: #2ec472;\n    background-color: #2ec472; }\n\n#titleInput {\n  border: none;\n  border-bottom: 1px solid #999;\n  color: #000;\n  outline: none;\n  width: 80%;\n  padding: 4px 8px; }\n\n.xlsBtn {\n  color: #AAA;\n  border: solid 1px #999;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: .7rem;\n  text-decoration: none;\n  float: right; }\n\n.xlsBtn:hover {\n    border-color: #333;\n    color: #444; }\n"

/***/ }),

/***/ "./src/app/create-form/createForm.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/create-form/createForm.component.ts ***!
  \*****************************************************/
/*! exports provided: CreateFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateFormComponent", function() { return CreateFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../form.service */ "./src/app/form.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-dragula/ng2-dragula */ "./node_modules/ng2-dragula/ng2-dragula.js");
/* harmony import */ var ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! xlsx */ "../node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var CreateFormComponent = /** @class */ (function () {
    function CreateFormComponent(fb, http, formService, router, route, dragulaService, userService) {
        this.fb = fb;
        this.http = http;
        this.formService = formService;
        this.router = router;
        this.route = route;
        this.dragulaService = dragulaService;
        this.userService = userService;
        this.kinds = ["Multiple Choice", "Short Answer", "Rating", "Number"]; //, "Rank", "Matrix", "Checkbox", "Stars", "Drop-down"
        this.kindsWithOptions = ["Multiple Choice", "Checkboxes", "Drop-down", "Rank"];
        this.kindIcons = {
            'Multiple Choice': 'list.png',
            'Checkboxes': 'checkbox.png',
            'Drop-down': 'sort.png',
            'Rank': 'rank.png',
            'Short Answer': 'textbox.png',
            'Matrix': 'matrix.png',
            'Stars': 'stars.png'
        };
        this.kindAliases = {
            'Multiple Choice': 'Multiple Choice',
            'Short Answer': 'Text question'
        };
        this.kind = null;
        this.questionData = [];
        // sortedQuestions: Observable<Array<Object>>;
        this.question = null;
        this.edit = false;
        this.pics = {};
        this.temp = [];
        this.reject = null;
        this.typeevent = false;
        this.focusedOption = 0;
        this.step = 1;
        this.updateform = false; // so when you go back to the previous page to correct something that it doesn't create a new database entry for the form
        this.published = false;
        this.shareLink = "";
        this.alphabeth = "abcdefghijklmnopqrstuvwxyz";
        this.questionsSubmitted = 0;
        this.typeView = "Multiple Choice";
    }
    CreateFormComponent.prototype.toggleView = function (view) {
        this.typeView = view;
        if (this.updateData)
            this.updateData = null;
    };
    CreateFormComponent.prototype.pushQuestionToList = function (res) {
        if (res.kind === "Rating") {
            var size = Number(res.scale);
            res.temp = Array(size);
        }
        if (res.kind === "Multiple Choice") {
            var space_1 = /^\s*$/;
            res.options = res.options.filter(function (x) { return !space_1.test(x.body); });
        }
        res.number = this.questionData.length;
        this.questionData.push(res);
    };
    CreateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params.edit)
                _this.edit = true;
            // this.typeevent = !!params.event;
            _this.createForm();
        });
        //checks user is logged in
        this.userService.afterLoginCheck().then(function (userData) {
            if (userData != 0) {
                _this.reject = false;
            }
            else {
                _this.reject = true;
                window.setTimeout(function () { _this.router.navigate(['/']); }, 2200);
            }
        });
        this.getSortedQuestions();
        this.categoryList = [
            { "id": 1, "itemName": "Automotive" },
            { "id": 2, "itemName": "Business" },
            { "id": 3, "itemName": "Cooking" },
            { "id": 4, "itemName": "Education" },
            { "id": 5, "itemName": "Entertainment" },
            { "id": 6, "itemName": "Fashion" },
            { "id": 7, "itemName": "Fitness" },
            { "id": 8, "itemName": "Health" },
            { "id": 9, "itemName": "Health" },
            { "id": 10, "itemName": "Home Improvement" },
            { "id": 11, "itemName": "Sports" },
            { "id": 12, "itemName": "Technology" },
        ];
        this.categorySettings = {
            singleSelection: false,
            text: "Select up to 4 Categories",
            classes: "filterDropdownText",
            badgeShowLimit: 4,
            limitSelection: 4,
            enableSearchFilter: true,
            enableCheckAll: false
        };
    };
    CreateFormComponent.prototype.ngOnDestroy = function () {
        if (this.autoScroll) {
            this.autoScroll.destroy();
        }
    };
    CreateFormComponent.prototype.onItemSelect = function (item) {
        item = item.itemName;
    };
    CreateFormComponent.prototype.OnItemDeSelect = function (item) {
    };
    CreateFormComponent.prototype.getSortedQuestions = function () {
        return this.questionData.sort(function (a, b) { return a.number - b.number; });
    };
    CreateFormComponent.prototype.createForm = function () {
        var _this = this;
        //set expire date
        var defaultExpDate = new Date();
        defaultExpDate.setHours(23);
        defaultExpDate.setMinutes(59);
        //see if editing form...only for event type I believe
        if (this.edit) {
            var prevData = this.formService.getData();
            this.typeevent = prevData.typeevent;
        }
        this.timePickerConfig = {
            enableTime: true,
            noCalendar: true,
            altInput: true,
            altInputClass: 'form-control',
            defaultDate: defaultExpDate,
            dateFormat: 'h:i K'
        };
        this.datePickerConfig = {
            altInput: true,
            altInputClass: 'form-control',
            defaultDate: defaultExpDate
        };
        //Creates whole questionnaire, not individual questions
        this.questionnaire = this.fb.group({
            title: '',
            hashtags: null,
            kind: "Multiple Choice",
            categories: [],
            anonymous: false,
            sharedWithCommunities: null,
            sharedWithUsers: null,
            sharedWithFb: null,
            public: true,
            loginRequired: true,
            typeevent: this.typeevent,
            questions: this.fb.array([])
        });
        if (this.edit) {
            var data = this.formService.getData();
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var key = _a[_i];
                if (key !== "questions" && key !== "hashtags") {
                    var control = this.questionnaire.get(key);
                    if (control) {
                        control.setValue(data[key]);
                    }
                }
                else if (key === 'hashtags') {
                    var tagarray = [];
                    for (var _b = 0, _c = data['hashtags']; _b < _c.length; _b++) {
                        var tag = _c[_b];
                        tagarray.push(this.transformHashtagArray(tag));
                    }
                    this.questionnaire.get('hashtags').setValue(tagarray);
                }
            }
            for (var _d = 0, _e = data.questions; _d < _e.length; _d++) {
                var question = _e[_d];
                question.options = this.fb.array(question.options.map(function (option) { return _this.fb.group(option); }));
                if (question.pic) {
                    this.pics[question.id] = question.pic;
                }
                this.questionnaire.controls['questions'].push(this.fb.group(question));
            }
        }
        else {
            //    this.addQuestion();
            //    this.forceOptionRequired(0);
        }
    };
    CreateFormComponent.prototype.forceOptionRequired = function (index) {
        var requiredControl = this.questionnaire.get('questions').get(index.toString()).get('required');
        requiredControl.setValue(true);
        requiredControl.disable();
    };
    CreateFormComponent.prototype.onPicChange = function (question, $event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file, question);
    };
    CreateFormComponent.prototype.setPicUrl = function (index, url) {
        // this.pics[this.questionnaire.get('questions').get(index.toString()).get('id').value] = url;
        // this.imgTooltipCtrls.toArray()[index].close();
    };
    CreateFormComponent.prototype.deleteQuestion = function (i) {
        // let questions = this.questionnaire.get("questions");
        var questions = this.questionnaire.controls["questions"];
        questions.removeAt(i);
        if (questions.length === 1) {
            this.forceOptionRequired(0);
        }
    };
    CreateFormComponent.prototype.editQuestion = function (i) {
        this.updateEnabled = true;
        var type = this.questionData[i].kind;
        this.updateData = this.questionData[i];
        this.questionnaire.get('kind').setValue(type);
        this.typeView = type;
    };
    CreateFormComponent.prototype.updateQuestion = function (qdata) {
        if (qdata.kind === "Rating") {
            var size = Number(qdata.scale);
            qdata.temp = Array(size);
        }
        this.questionData[qdata.number] = qdata;
        this.updateEnabled = false;
    };
    CreateFormComponent.prototype.getInputType = function (question) {
        switch (question.get("kind").value) {
            case "Multiple Choice":
                return "radio";
            case "Checkboxes":
                return "checkbox";
        }
    };
    CreateFormComponent.prototype.deleteOption = function (question, i) {
        question.get("options").removeAt(i);
    };
    CreateFormComponent.prototype.isInvalid = function (control) {
        return control.invalid && control.touched;
    };
    CreateFormComponent.prototype.optionsHaveErrors = function (input) {
        var errors = null;
        for (var _i = 0, _a = input.controls.options.controls; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.controls.body.errors) {
                errors = option.controls.body.errors;
            }
        }
        return errors;
    };
    CreateFormComponent.prototype.hasNoOptions = function (input) {
        if (input.kindHasOptions && input.kindHasOptions() && input.controls.options.length === 0) {
            return { noOptions: true };
        }
        else {
            return null;
        }
    };
    CreateFormComponent.prototype.optionIsUnique = function (input) {
        var error = null;
        if (input && input.value && input.parent && input.parent.parent) {
            for (var _i = 0, _a = input.parent.parent.controls; _i < _a.length; _i++) {
                var option = _a[_i];
                option = option.controls.body;
                if (input !== option && input.value == option.value) {
                    error = { duplicateOption: true };
                }
            }
        }
        return error;
    };
    CreateFormComponent.prototype.valueIsUnique = function (input) {
        var error = null;
        if (input && input.value && input.parent) {
            for (var _i = 0, _a = input.parent.value; _i < _a.length; _i++) {
                var other = _a[_i];
                if (input.value == other) {
                    error = { duplicateValue: true };
                }
            }
        }
        return error;
    };
    CreateFormComponent.prototype.inputHasError = function (error) {
        var _this = this;
        return function (input) { return _this.isInvalid(input) && input.hasError(error); };
    };
    CreateFormComponent.prototype.addOption = function (question, focus) {
        if (focus === void 0) { focus = false; }
        question.get("options").push(this.fb.group({
            body: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([this.optionIsUnique, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])]
        }));
        if (focus) {
            this.focusedOption = question.get("options").controls.length - 1;
        }
    };
    CreateFormComponent.prototype.addOneTo = function (question, collection) {
        question.get(collection).push(this.fb.control("", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([this.valueIsUnique, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])));
    };
    CreateFormComponent.prototype.optionClicked = function (question, i) {
        if (i === question.get("options").length - 1) {
            this.addOption(question);
        }
    };
    CreateFormComponent.prototype.fieldClicked = function (question, collection, i) {
        if (i === question.get(collection).length - 1) {
            this.addOneTo(question, collection);
        }
    };
    CreateFormComponent.prototype.transformHashtag = function (value) {
        if (value !== null && typeof value === 'object') {
            value = value.value;
        }
        if (value[0] === "#") {
            value = value.substring(1);
        }
        value = value.toLowerCase();
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of({
            display: "" + value,
            value: value
        });
    };
    CreateFormComponent.prototype.transformHashtagArray = function (value) {
        if (value !== null && typeof value === 'object') {
            value = value.value;
        }
        if (value[0] === "#") {
            value = value.substring(1);
        }
        return {
            display: "" + value,
            value: value
        };
    };
    CreateFormComponent.prototype.transformName = function (x) {
        var value, display;
        if (x !== null && typeof x === 'object') {
            value = x.value;
            display = x.display;
            if (value[0] === "@") {
                value = value.substring(1);
            }
            return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of({
                display: "@" + display,
                value: value
            });
        }
        else {
            return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of({
                display: "@" + x,
                value: x
            });
        }
    };
    CreateFormComponent.prototype.observableSourceTag = function (keyword) {
        if (keyword) {
            if (keyword[0] === "#") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of([]);
                }
            }
            return this.http.post('/search', { type: 'tag', keyword: keyword })
                .map(this.observableProcessRaw.bind(this))
                .catch(function (err) {
                return [];
            });
        }
        else {
            return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of([]);
        }
    };
    CreateFormComponent.prototype.observableSourceCom = function (keyword) {
        if (keyword) {
            if (keyword[0] === "@") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of([]);
                }
            }
            return this.http.post('/search', { type: 'comm', keyword: keyword })
                .map(this.observableProcessRaw.bind(this))
                .catch(function (err) {
                return [];
            });
        }
        else {
            return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of([]);
        }
    };
    CreateFormComponent.prototype.observableSourceUser = function (keyword) {
        if (keyword) {
            if (keyword[0] === "@") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of([]);
                }
            }
            return this.http.post('/search', { type: 'user', keyword: keyword })
                .map(this.observableProcessRaw.bind(this))
                .catch(function (err) {
                return [];
            });
        }
        else {
            return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].of([]);
        }
    };
    CreateFormComponent.prototype.observableProcessRaw = function (data) {
        if (data.json().status == 1) {
            var searchoutput = [];
            var results = data.json().results;
            for (var l = 0; l < results.length; l++) {
                searchoutput.push(results[l]);
            }
            return searchoutput;
        }
        else {
            return [];
        }
    };
    ;
    CreateFormComponent.prototype.acMatching = function () {
        return true;
    };
    CreateFormComponent.prototype.focusTagInput = function (tagInput) {
        setTimeout(function () {
            tagInput.inputForm.input.nativeElement.focus();
        });
    };
    CreateFormComponent.prototype.onMatrixDrag = function (event, matrix) {
        // if scrollable
        if (matrix.scrollWidth > matrix.clientWidth) {
            // prevent drag
            event.stopPropagation();
        }
        return true;
    };
    CreateFormComponent.prototype.kindText = function (kind) {
        return this.kindAliases[kind] || kind;
    };
    CreateFormComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    CreateFormComponent.prototype.setAsUntouched = function (group) {
        group.markAsUntouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]) {
                group.controls[i].markAsUntouched();
            }
            else {
                this.setAsUntouched(group.controls[i]);
            }
        }
    };
    CreateFormComponent.prototype.checkSubmit = function () {
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            // this.questionnaire.wasChecked = true;
        }
        else {
            if (!this.updateform) {
                this.submitForm();
            }
            else {
                this.updateForm();
            }
        }
    };
    CreateFormComponent.prototype.checkPreview = function () {
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            // this.questionnaire.wasChecked = true;
        }
        else {
            var formdata = this.questionnaireData();
            this.formService.setPersistedData(formdata).then(function () { return window.open("/previewForm"); });
        }
    };
    CreateFormComponent.prototype.checkPublish = function () {
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            // this.questionnaire.wasChecked = true;
        }
        else {
            this.updateForm();
        }
    };
    CreateFormComponent.prototype.submitForm = function () {
        if (this.edit) {
            this.updateForm();
        }
        else {
            this.postForm();
        }
    };
    CreateFormComponent.prototype.questionnaireData = function () {
        var data = this.questionnaire.getRawValue();
        data.questions = this.questionData;
        for (var i = 0; i < data.questions.length; i++) {
            if (this.kindsWithOptions.indexOf(data.questions[i].kind) !== -1) {
                for (var j = 0; j < data.questions[i].options.length; j++) {
                    data.questions[i].options[j].label = this.alphabeth[j];
                }
            }
        }
        for (var _i = 0, _a = ['hashtags', 'sharedWith']; _i < _a.length; _i++) {
            var tagField = _a[_i];
            if (data[tagField]) {
                data[tagField] = data[tagField].map(function (tag) { return tag.value ? tag.value : tag; });
            }
        }
        data['sharedWithEmailAddresses'] = $('input[name=shareEmailAddresses]').val();
        return data;
    };
    CreateFormComponent.prototype.postForm = function () {
        var _this = this;
        var formData = this.questionnaireData();
        this.http.post('/forms/create', formData).toPromise()
            .then(function (response) {
            formData.id = response.json().id;
            _this.shareLink = "https://www.questionsly.com/feed;survey=" + formData.id;
            _this.formService.setData(formData);
            _this.step = 2;
        })
            .catch(function (error) { return _this.router.navigate(['/users/login']); });
    };
    CreateFormComponent.prototype.updateForm = function () {
        var _this = this;
        var formData = this.formService.getData();
        var meta = {
            id: formData.id
        };
        var data = Object.assign(this.questionnaireData(), meta);
        this.http.put("/forms/" + data.id, data).toPromise()
            .then(function (response) {
            _this.formService.setData(Object.assign(_this.questionnaireData(), meta));
            if (_this.step === 1) {
                _this.step = 2;
            }
            else {
                _this.published = true;
                window.setTimeout(function () { _this.router.navigate(['/']); }, 2000);
            }
        })
            .catch(function (error) { return alert("Error updating form: " + error); });
    };
    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    CreateFormComponent.prototype.uploadFile = function (file, signedRequest, url, question) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.pics[question.get("id").value] = url;
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    CreateFormComponent.prototype.getSignedRequest = function (file, question) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url, question);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    CreateFormComponent.prototype.nextView = function () {
        this.step = 2;
    };
    CreateFormComponent.prototype.prevView = function () {
        this.step = 1;
    };
    CreateFormComponent.prototype.removeQuestion = function (i) {
        this.questionData.splice(i, 1);
        for (var j = i; j < this.questionData.length; j++) {
            this.questionData[j].number = this.questionData[j].number - 1;
        }
        if (this.questionData.length === 1)
            this.questionData[0].required = true;
    };
    CreateFormComponent.prototype.toggleRequired = function (i) {
        var last = 0;
        for (var j = 0; j < this.getSortedQuestions()[j]; j++) {
            if (this.getSortedQuestions[j].required) {
                last++;
            }
            ;
        }
        if (last === 1 && this.getSortedQuestions()[i].required) {
            return;
        }
        else {
            this.questionData[i].required = !this.questionData[i].required;
        }
    };
    CreateFormComponent.prototype.toggleAuthor = function (anonymous) {
        this.questionnaire.get('anonymous').setValue(anonymous);
    };
    CreateFormComponent.prototype.toggleAudience = function (audience) {
        this.questionnaire.get('public').setValue(audience);
    };
    CreateFormComponent.prototype.toggleLogin = function (required) {
        this.questionnaire.get('loginRequired').setValue(required);
    };
    CreateFormComponent.prototype.moveUp = function (i) {
        // Up meaning lowering the number, so higher up the list
        if (i == 0)
            return;
        var currentNum = this.questionData[i].number;
        this.questionData[i].number = currentNum - 1;
        this.questionData[i - 1].number = currentNum;
    };
    CreateFormComponent.prototype.moveDown = function (i) {
        // Down meaning raising the number, so lower down the list
        var qdLength = this.questionData.length;
        if (i === (qdLength - 1))
            return;
        var currentNum = this.questionData[i].number;
        this.questionData[i].number = currentNum + 1;
        this.questionData[i + 1].number = currentNum;
    };
    CreateFormComponent.prototype.uploadShareEmailAddresses = function () {
        var fileInput = $('.shareEmails input[type=file]')[0];
        var target = (fileInput);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            /* read workbook */
            var bstr = e.target.result;
            var wb = xlsx__WEBPACK_IMPORTED_MODULE_9__["read"](bstr, { type: 'binary' });
            /* grab first sheet */
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];
            /* save data */
            var emailArray = (xlsx__WEBPACK_IMPORTED_MODULE_9__["utils"].sheet_to_json(ws, { header: 1 }));
            /* strip emails of the individual arrays they are in */
            emailArray = emailArray.map(function (x) { return x[0]; });
            $('.shareEmails input[type=text]').val(emailArray.join(', '));
            $('.shareEmails input[type=file]').val('');
            console.log("email", emailArray);
        };
        reader.readAsBinaryString(target.files[0]);
    };
    CreateFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-form',
            template: __webpack_require__(/*! ./createForm.component.html */ "./src/app/create-form/createForm.component.html"),
            styles: [__webpack_require__(/*! ./createForm.component.scss */ "./src/app/create-form/createForm.component.scss")],
            providers: [_form_service__WEBPACK_IMPORTED_MODULE_5__["FormService"], _user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"]],
        })
        // @Component({
        //     selector: 'create-form',
        //     templateUrl: './createForm.componentssss.html',
        //     styleUrls: [
        //         './createForm.componentssss.scss'
        //     ],
        //     providers: [FormService, UserService],
        //     host: {
        //         '(document:click)': 'onDocClick($event)',
        //     }
        // })
        ,
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _form_service__WEBPACK_IMPORTED_MODULE_5__["FormService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_8__["DragulaService"],
            _user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"]])
    ], CreateFormComponent);
    return CreateFormComponent;
}());



/***/ }),

/***/ "./src/app/create-group/create-group.component.html":
/*!**********************************************************!*\
  !*** ./src/app/create-group/create-group.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pageLayout\">\n    <h3 class=\"name qslyGray\" *ngIf=\"!shareLink\">Create {{category.displayName}}</h3>\n    <h3 class=\"name qslyGray\" *ngIf=\"shareLink\">{{category.displayName}} Created</h3>\n\n    <form id=\"main-form\" [formGroup]=\"fgCreateGroup\" class=\"container\" *ngIf=\"!shareLink\">\n        <div class=\"flexContainer fdColumn faStart\">\n            <h6 class=\"title firstTitle\">\n                {{category.displayNameShort}} Name\n                <span class=\"valError\" *ngIf=\"fgCreateGroup.controls['title'].invalid && fgCreateGroup.controls['title'].touched\">*The name cannot be empty.</span>\n            </h6>\n            <div style=\"display: flex; align-items: center; width: 100%\">\n                <label style=\"margin-right: 10px; color: #CCC; margin-bottom: 0px;\">-</label>\n                <input class=\"niceTextInput qslyGray\" formControlName=\"title\" autofocus />\n            </div>\n        </div>\n\n        <div class=\"flexContainer fdColumn faStart\" *ngIf=\"category.category == 'class'\">\n            <h6 class=\"title firstTitle\">Session</h6>\n            <div style=\"display:flex; justify-content: flex-start;\">\n                <app-desc-switch-buttons [active]=\"fgCreateGroup.get('forCurrentSession').value\" [option]=\"true\"\n                    [title]=\"'Summer 2018'\" [description]=\"''\"\n                    (selected)=\"toggleForCurrentSession($event)\" formControlName=\"forCurrentSession\"></app-desc-switch-buttons>\n                <app-desc-switch-buttons [active]=\"fgCreateGroup.get('forCurrentSession').value\" [option]=\"false\"\n                    [title]=\"'Fall 2018'\" [description]=\"''\"\n                    (selected)=\"toggleForCurrentSession($event)\" formControlName=\"forCurrentSession\"></app-desc-switch-buttons>\n            </div>\n        </div>\n\n        <div id=\"buttons\" class=\"flexContainer\" style=\"justify-content: center\">\n            <button\n                    class=\"submitButton\"\n                    (click)=\"checkSubmit()\">Create!</button>\n        </div>\n\n        <p class=\"valError\" style=\"text-align: center\" *ngIf=\"submissionfailed\">\n            Error, please try again.\n        </p>\n    </form>\n\n    <div class=\"flexContainer fdColumn faStart\" *ngIf=\"shareLink\">\n        <h6 class=\"title firstTitle\">Share Link</h6>\n        <p>Share this link with anyone who should join the {{category.displayName.toLowerCase()}}:</p>\n        <p><a [href]=\"shareLink\">https://questionsly.herokuapp.com{{shareLink}}</a></p>\n\n        <div id=\"buttons\" class=\"flexContainer\" style=\"justify-content: center\">\n            <button class=\"submitButton\" (click)=\"goToNewGroup()\">Go to {{category.displayName}}</button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/create-group/create-group.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/create-group/create-group.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3 {\n  margin: .7rem 0 .4rem 0; }\n\n.pageLayout {\n  min-width: 600px; }\n\n#main-form > .row {\n  margin-bottom: 40px; }\n\n#main-form > .row label.align {\n    margin-top: 6px; }\n\n.fa-heart {\n  color: #0088cc; }\n\n.mouseChangeToHand {\n  cursor: pointer;\n  cursor: hand; }\n\ninput.option-input.is-invalid {\n  border: 2px solid #ea7a85; }\n\n.form-control.is-invalid {\n  border-color: #ea7a85; }\n\n.invalid-feedback {\n  color: #ea7a85;\n  display: block; }\n\n#comm-data {\n  margin-top: -10px;\n  padding: 0 15px; }\n\n#comm-data .form-group {\n    text-align: center; }\n\n#comm-data #comm-title input {\n    font-size: 30px;\n    width: 70%; }\n\n#comm-data input {\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center; }\n\n.name {\n  margin-bottom: 2px;\n  font-family: Karla;\n  font-size: 1.6rem;\n  font-weight: 300;\n  text-align: center;\n  width: 100%; }\n\n.submitButton {\n  background: #47d487;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 100px;\n  max-width: 150px;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 0px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    background: #57d892; }\n\n.niceTextInput {\n  background: none;\n  outline-style: none;\n  font-family: Helvetica Neue, sans-serif;\n  border: none;\n  font-weight: 300;\n  padding: 2px;\n  width: 100%;\n  font-size: 1rem; }\n\n.niceTextAreaInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  padding: 2px;\n  width: 100%;\n  font-family: Helvetica Neue, sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  overflow: hidden; }\n\n.flexContainer {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 15px 25px;\n  width: 95%; }\n\n.fdColumn {\n  flex-direction: column; }\n\n.faStart {\n  align-items: flex-start; }\n\n.fjCenter {\n  justify-content: center; }\n\n.flex {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n\n.valError {\n  color: #ff6969;\n  font-size: .8rem;\n  margin-left: 8px; }\n"

/***/ }),

/***/ "./src/app/create-group/create-group.component.ts":
/*!********************************************************!*\
  !*** ./src/app/create-group/create-group.component.ts ***!
  \********************************************************/
/*! exports provided: CreateGroupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateGroupComponent", function() { return CreateGroupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../form.service */ "./src/app/form.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CreateGroupComponent = /** @class */ (function () {
    function CreateGroupComponent(fb, http, router) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.submissionfailed = false;
        this.submitted = false;
        this.shareLink = '';
        this.errors = {
            title: false
        };
    }
    CreateGroupComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    CreateGroupComponent.prototype.createForm = function () {
        this.fgCreateGroup = this.fb.group({
            category: '',
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(1)]),
            description: '',
            forCurrentSession: false,
            admins: null,
            pic: '',
        });
    };
    CreateGroupComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    CreateGroupComponent.prototype.checkSubmit = function () {
        this.setAsTouched(this.fgCreateGroup);
        if (!this.fgCreateGroup.invalid) {
            this.submitted = true;
            this.submitForm();
        }
    };
    CreateGroupComponent.prototype.submitForm = function () {
        var _this = this;
        this.fgCreateGroup.get('category').setValue(this.category.category);
        var date = new Date();
        var data = this.createcommunityData();
        console.log("posted", data);
        this.http.post('/group/save', data).toPromise()
            .then(function (response) {
            var responseJson = response.json();
            if (responseJson.status === 1) {
                _this.shareLink = '/?group=' + responseJson.id + ';' + 't=' + responseJson.shareToken;
                _this.newGroupLink = { queryParams: { 'group': responseJson.id } };
            }
            else {
                _this.submissionfailed = true;
            }
        })
            .catch(function (error) { return function (error) {
            this.submissionfailed = true;
            alert("Error posting community: " + error);
        }; });
    };
    CreateGroupComponent.prototype.createcommunityData = function () {
        var data = this.fgCreateGroup.value;
        for (var _i = 0, _a = ['hashtags', 'admins']; _i < _a.length; _i++) {
            var tagField = _a[_i];
            if (data[tagField]) {
                data[tagField] = data[tagField].map(function (tag) { return tag.value; });
            }
        }
        return data;
    };
    CreateGroupComponent.prototype.goToNewGroup = function () {
        this.router.navigate(['/'], this.newGroupLink);
    };
    CreateGroupComponent.prototype.toggleForCurrentSession = function (forCurrentSession) {
        this.fgCreateGroup.get('forCurrentSession').setValue(forCurrentSession);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CreateGroupComponent.prototype, "category", void 0);
    CreateGroupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-group',
            template: __webpack_require__(/*! ./create-group.component.html */ "./src/app/create-group/create-group.component.html"),
            styles: [__webpack_require__(/*! ./create-group.component.scss */ "./src/app/create-group/create-group.component.scss")],
            providers: [_form_service__WEBPACK_IMPORTED_MODULE_5__["FormService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], CreateGroupComponent);
    return CreateGroupComponent;
}());



/***/ }),

/***/ "./src/app/description-switch-buttons/description-switch-buttons.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/description-switch-buttons/description-switch-buttons.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"box\" [ngClass]=\"{selectedBox: option === active}\" (click)=\"toggle(option)\">\n    <p class=\"text title qslyBlack\" [ngClass]=\"{selectedText: option === active}\">{{title}}</p>\n    <p class=\"text description qslyGray\" [ngClass]=\"{selectedText: option === active}\">{{description}}</p>\n</div>\n"

/***/ }),

/***/ "./src/app/description-switch-buttons/description-switch-buttons.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/description-switch-buttons/description-switch-buttons.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".box {\n  width: 150px;\n  height: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  margin: 5px 10px;\n  padding: 4px 8px;\n  text-align: center;\n  border-radius: 12px;\n  border: solid 1px #e2e2e2; }\n  @media (max-width: 767px) {\n    .box {\n      width: 100%;\n      margin: 0; } }\n  .box:hover, .box:hover .text, .box .selectedText {\n    cursor: pointer;\n    color: #FFF;\n    background: #47d487; }\n  .selectedBox {\n  background: #47d487; }\n  .text {\n  font-size: 1rem;\n  font-weight: 400;\n  font-family: Karla;\n  width: 100%; }\n  .selectedText {\n  color: #FFF; }\n  .title {\n  font-weight: 700;\n  margin: 12px auto;\n  font-size: 1rem; }\n  @media (max-width: 767px) {\n    .title {\n      font-size: .9rem; } }\n  .description {\n  font-size: .8rem; }\n  @media (max-width: 767px) {\n    .description {\n      font-size: .8rem; } }\n"

/***/ }),

/***/ "./src/app/description-switch-buttons/description-switch-buttons.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/description-switch-buttons/description-switch-buttons.component.ts ***!
  \************************************************************************************/
/*! exports provided: DescriptionSwitchButtonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescriptionSwitchButtonsComponent", function() { return DescriptionSwitchButtonsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DescriptionSwitchButtonsComponent = /** @class */ (function () {
    function DescriptionSwitchButtonsComponent() {
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DescriptionSwitchButtonsComponent_1 = DescriptionSwitchButtonsComponent;
    DescriptionSwitchButtonsComponent.prototype.writeValue = function (value) { };
    DescriptionSwitchButtonsComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    DescriptionSwitchButtonsComponent.prototype.registerOnTouched = function () { };
    DescriptionSwitchButtonsComponent.prototype.toggle = function (newType) {
        this.selected.emit(this.option);
        this._onChange(newType);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DescriptionSwitchButtonsComponent.prototype, "title", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DescriptionSwitchButtonsComponent.prototype, "description", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DescriptionSwitchButtonsComponent.prototype, "option", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DescriptionSwitchButtonsComponent.prototype, "active", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DescriptionSwitchButtonsComponent.prototype, "selected", void 0);
    DescriptionSwitchButtonsComponent = DescriptionSwitchButtonsComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-desc-switch-buttons',
            template: __webpack_require__(/*! ./description-switch-buttons.component.html */ "./src/app/description-switch-buttons/description-switch-buttons.component.html"),
            styles: [__webpack_require__(/*! ./description-switch-buttons.component.scss */ "./src/app/description-switch-buttons/description-switch-buttons.component.scss")],
            providers: [{ provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"], multi: true, useExisting: DescriptionSwitchButtonsComponent_1 }]
        }),
        __metadata("design:paramtypes", [])
    ], DescriptionSwitchButtonsComponent);
    return DescriptionSwitchButtonsComponent;
    var DescriptionSwitchButtonsComponent_1;
}());



/***/ }),

/***/ "./src/app/feed-form/feed-form.component.html":
/*!****************************************************!*\
  !*** ./src/app/feed-form/feed-form.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"fBody\" *ngIf=\"!hide && form.found\" [ngClass]=\"{highlightedForm: form.highlight}\">\n        <div class=\"topContainer\">\n            <div class=\"imageContainer\">\n                <a [routerLink]=\"form.authorlinkdisabled ? null : ['/profile', form.authorlink]\" >\n                    <div *ngIf=\"form.pictype == 'fb'\">\n                        <img src=\"https://graph.facebook.com/{{form.pic}}/picture?width=30&height=30\" class=\"userImage\" />\n                    </div>\n                    <div *ngIf=\"form.pictype == 'local'\">\n                        <img [src]=\"form.pic\" class=\"userImage\" />\n                    </div>\n                    <div *ngIf=\"form.pictype == 'default'\">\n                        <img *ngIf=\"form.authorgender == 'male'\" src=\"/images/male.png\" class=\"userImage\"/>\n                        <img *ngIf=\"form.authorgender == 'female'\" src=\"/images/female.png\" class=\"userImage\"  />\n                    </div>\n                    <div *ngIf=\"form.pictype == 'anonymous'\">\n                        <img src=\"/images/question.jpg\" class=\"userImage\"/>\n                    </div>\n                </a>\n                <div class=\"userInfoBox\">\n                    <p class=\"nameTitle\" style=\"margin-bottom:0px\"><b>{{name.first}} {{name.last}}</b></p>\n                    <p class=\"locationTitle qslyGray\" style=\"margin-bottom:-3px\" *ngIf=\"location.country\">{{location.city}}, {{location.state}}, {{location.country}}</p>\n                    <span class=\"partTitle qslyGray\">Asked: {{nocreated}}</span>\n                    <span class=\"partTitle qslyGray\">Taken: {{notaken}}</span>\n                    <span class=\"partTitle qslyGray\">Comments: {{nodiscussion}}</span>\n                </div>\n\n            </div>\n\n            <!-- Categories -->\n            <div *ngIf=\"form.hashtags\" class=\"cTagContainer\">\n                <span class=\"cTag qslyGray\" *ngFor=\"let tag of form.hashtags; let i = index\">{{tag}}</span>\n            </div>\n        </div>\n\n        <div class=\"share\">\n            <div class=\"col p-0\" *ngIf=\"loggedin\">\n                <div ngbDropdown placement=\"bottom-right\" class=\"mouseChangeToHand\" id=\"form-menu-wrapper\">\n                    <a class=\"navlinks nav-link custom-dropdown-toggle\" id=\"form-menu\" ngbDropdownToggle aria-haspopup=\"true\" aria-expanded=\"false\">\n                        <i class=\"fa fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                    </a>\n                    <div ngbDropdownMenu aria-labelledby=\"form-menu\">\n                        <a class=\"dropdown-item\" (click)=\"shareForm()\" *ngIf=\"form.admin || form.public\">Share Link</a>\n                        <a class=\"dropdown-item\" (click)=\"releaseForm()\" *ngIf=\"form.admin && !form.shared\">Release</a>\n                        <a class=\"dropdown-item\" (click)=\"expireForm()\" *ngIf=\"form.admin && !form.expired\">Expire </a>\n                        <a class=\"dropdown-item\" target=\"_self\" href=\"{{form.download}}\" *ngIf=\"form.admin && form.typeevent\">Download data</a>\n                        <a class=\"dropdown-item\" (click)=\"deleteForm()\" *ngIf=\"form.admin\">Delete</a>\n                        <a class=\"dropdown-item\" (click)=\"reportForm()\" *ngIf=\"!form.admin\">Report abuse</a>\n                        <a class=\"dropdown-item\" (click)=\"beginPDF()\" *ngIf=\"form.admin || form.answered\">Export as PDF</a>\n                        <a class=\"dropdown-item\" (click)=\"toggleShareEmails()\" *ngIf=\"form.admin || form.answered\">Email PDF Report</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Response Count -->\n        <div *ngIf=\"false\" class=\"topContainer\">\n            <div id=\"completedBlock\" *ngIf=\"submitted\">\n                <span id=\"answerCount\" class=\"qslyGray\">Answered {{count ? count : '<5'}} {{count > 1 ? 'Times' : 'Time'}}</span>\n            </div>\n        </div>\n\n\n        <!-- Share Report Email Field -->\n        <div *ngIf=\"shareEmails\" class=\"flex\">\n            <div *ngIf=\"!shareEmailStatus\" class=\"shareEmailContainer\">\n                <p class=\"headline qslyBlack\">Enter Recipient Email(s)</p>\n                <input class=\"emailInput\" type=\"text\" #shareEmails placeholder=\"Seperate emails with a comma\" />\n                <div>\n                    <a class=\"submitButton qslyGray\" (click)=\"toggleShareEmails()\">Cancel</a>\n                    <a class=\"submitButton qslyGray positive\" style=\"margin-left: 12px\" (click)=\"exportPDF(false, shareEmails.value)\">Send</a>\n                </div>\n            </div>\n\n            <div *ngIf=\"shareEmailStatus\" class=\"shareEmailContainer\">\n                <p class=\"headline qslyGray\" style=\"margin: 10px\">{{shareEmailStatus}}</p>\n            </div>\n\n\n        </div>\n\n        <!-- QUESTIONS CONTAINER -->\n        <div class=\"responseBox\">\n            <app-mini-show-form\n                class=\"maxWidthOfParent\"\n                [count]=\"count\"\n                [data]=\"form\"\n                [shortAnswers2]=\"shortAnswers2\"\n                [expired]=\"form.expired\"\n                [isMyPost]=\"isMyPost\"\n                [me]=\"me\"\n                [showSubmit]=\"showsubmit && !form.expired\"\n                [submitted]=\"submitted\"\n                [submissionfailed]=\"submissionfailed\"\n                (submitForm)=\"postForm($event)\"\n                (toggleFilters)=\"toggleFilters($event)\"\n                *ngIf=\"form.questions != null\"></app-mini-show-form>\n        </div>\n\n\n        <!-- Graph Filters -->\n        <form *ngIf=\"showFilter && form.answered && !form.contracted && showdiscussion && !form.typeevent\" [formGroup]=\"dataselectionform\" style=\"margin-bottom: 0px; padding-bottom: 10px;\">\n            <div id=\"analysisContainer\">\n\n                <div class=\"filterBox\">\n                    <p class=\"filterCategory qslyGray\">Gender</p>\n                    <angular2-multiselect style=\"width: 110px\" [data]=\"genderList\" [settings]=\"genderSettings\" [(ngModel)]=\"genderSelected\" (onSelect)=\"onItemSelect($event)\"\n                        (onDeSelect)=\"OnItemDeSelect($event)\" (onSelectAll)=\"onSelectAll($event)\" (onDeSelectAll)=\"onDeSelectAll($event)\" formControlName=\"gender\">\n                    </angular2-multiselect>\n                </div>\n\n                <div class=\"filterBox\">\n                    <p class=\"filterCategory qslyGray\">Age</p>\n                    <angular2-multiselect style=\"width: 110px\" [data]=\"ageList\" [settings]=\"ageSettings\" (onSelect)=\"onItemSelect($event)\" [(ngModel)]=\"ageSelected\"\n                        (onDeSelect)=\"OnItemDeSelect($event)\" (onSelectAll)=\"onSelectAll($event)\" (onDeSelectAll)=\"onDeSelectAll($event)\"\n                        formControlName=\"age\">\n                    </angular2-multiselect>\n                </div>\n\n                <div class=\"filterBox\">\n                    <p class=\"filterCategory qslyGray\">Location</p>\n                    <angular2-multiselect style=\"width: 160px\" [data]=\"locationList\" [settings]=\"locationSettings\" [(ngModel)]=\"locationSelected\"\n                        (onSelect)=\"onItemSelect($event)\" (onDeSelect)=\"OnItemDeSelect($event)\" (onSelectAll)=\"onSelectAll($event)\" (onDeSelectAll)=\"onDeSelectAll($event)\"\n                        formControlName=\"locations\">\n                    </angular2-multiselect>\n                </div>\n            </div>\n            <div *ngIf=\"!form.loginRequired\" class=\"flex\" style=\"justify-content: flex-start; padding-left: 25px;\">\n                <span class=\"partTitle\" style=\"color: #CCC\">*Unknown = Responses made without an account</span>\n            </div>\n        </form>\n\n\n        <!-- End Graph Filters -->\n\n\n\n        <div class=\"flex\" *ngIf=\"form.contracted\" style=\"padding-top: 0px\">\n            <button (click)=\"expand()\" class=\"submitButton qslyGray\">\n                See More\n            </button>\n        </div>\n    </div>\n\n\n    <app-discussion-list\n        *ngIf=\"!hide && form.found\"\n        [loggedin]=\"loggedin\"\n        [pic]=\"pic\"\n        [pictype]=\"pictype\"\n        [form]='form'\n        [id]=\"form.id\">\n    </app-discussion-list>\n\n\n\n\n\n\n    <app-confirmation-popup></app-confirmation-popup>\n    <ng-template #shareModal let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"shareContainer\">\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n                <span aria-hidden=\"true\" style=\"font-size:30px;\">&times;</span>\n            </button>\n            <h3 style=\"font-family:karla; text-align: center; color:#AAA\">Share</h3>\n\n            <div style=\"margin-bottom:12px\">\n                   <h6 style=\"font-family:karla; margin-bottom:5px; font-weight:bold; color: #CCC;\"> Share link\n                </h6>\n                <a href=\"{{shareUrl}}\" style=\"font-size:0.7rem\" target=\"_blank\">{{shareUrl}}</a>\n            </div>\n\n            <div *ngIf=\"loggedin\">\n                <h6 style=\"font-family:karla; font-weight:bold; color: #CCC;\">Group</h6>\n\n                <app-your-comm-list [link]=\"form.id\"></app-your-comm-list>\n            </div>\n        </div>\n    </ng-template>\n"

/***/ }),

/***/ "./src/app/feed-form/feed-form.component.scss":
/*!****************************************************!*\
  !*** ./src/app/feed-form/feed-form.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@-webkit-keyframes highlight {\n  0% {\n    border: 4px solid #2dc070; }\n  100% {\n    border: 4px solid #89e3b2; } }\n\n@keyframes highlight {\n  0% {\n    border: 4px solid #2dc070; }\n  100% {\n    border: 4px solid #89e3b2; } }\n\n.fBody {\n  height: auto;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  border: solid 1px #e2e2e2;\n  border-bottom: none;\n  position: relative;\n  background: #FFF;\n  box-sizing: border-box;\n  margin: auto 0px;\n  z-index: 2;\n  background-size: cover;\n  padding-top: 0;\n  padding-bottom: 0;\n  width: 100%; }\n\n.highlightedForm {\n  -webkit-animation: 1s ease-in-out 0s infinite alternate highlight;\n          animation: 1s ease-in-out 0s infinite alternate highlight;\n  border-radius: 8px; }\n\n.shareContainer {\n  height: auto;\n  padding: 15px;\n  max-height: 90vh; }\n\n.userImagePos {\n  position: absolute;\n  left: 20px;\n  top: -80px; }\n\n.topContainer {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 10px; }\n\n.imageContainer {\n  display: flex;\n  z-index: 2;\n  align-items: center;\n  padding: 20px 6px 0 20px; }\n\n.userImage {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  z-index: 3; }\n\n.userInfoBox {\n  display: inline;\n  margin-left: 10px;\n  padding-left: 5px;\n  border-left: solid 1px #ddd; }\n\n.share {\n  right: 20px;\n  top: 20px;\n  position: absolute; }\n\n.cTagContainer {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: flex-end;\n  margin: 20px 60px 0px 0px;\n  max-width: 200px; }\n\n.cTag {\n  display: block;\n  padding: 2px 8px;\n  background: #FFF;\n  border: solid 1px #666;\n  border-radius: 4px;\n  margin: 4px;\n  font-family: Karla;\n  font-size: .7rem;\n  text-transform: capitalize; }\n\n.cTag:hover {\n    cursor: pointer;\n    color: #333;\n    border: solid 1px #333; }\n\n@media (max-width: 767px) {\n    .cTag {\n      font-size: .6rem; } }\n\n.flex {\n  display: flex;\n  justify-content: center;\n  padding: 10px;\n  width: 100%; }\n\n.userTitle {\n  display: block;\n  font-size: 1.4rem;\n  font-weight: normal;\n  font-family: Karla;\n  text-align: left;\n  margin-top: 20px;\n  width: 100%; }\n\n.responseBox {\n  margin: 20px 30px;\n  margin-top: 35px;\n  font-family: Quicksand;\n  margin-bottom: 0px;\n  padding-bottom: 10px; }\n\n.line {\n  height: 1px;\n  border-top: black 1px solid;\n  margin: 10px 25px; }\n\n.hashtag {\n  margin: 12px 30px; }\n\n.nameTitle {\n  font-family: Karla;\n  color: #2b2b2b;\n  font-size: .85rem;\n  font-weight: 400;\n  text-transform: capitalize; }\n\n@media (max-width: 767px) {\n    .nameTitle {\n      font-size: .8rem; } }\n\n.locationTitle {\n  font-family: Karla;\n  font-size: .7rem;\n  font-weight: 400; }\n\n@media (max-width: 767px) {\n    .locationTitle {\n      font-size: .55rem; } }\n\n.dropdown-item {\n  cursor: pointer; }\n\n.partTitle {\n  font-size: .6rem;\n  font-weight: 400; }\n\n.partTitle::before {\n    margin-left: 4px; }\n\n.partTitle::before:first-of-type {\n      margin-left: 20px; }\n\n.partTitle span {\n    font-weight: 300;\n    font-family: Karla; }\n\n@media (max-width: 767px) {\n      .partTitle span {\n        font-size: .5rem; } }\n\n@media (max-width: 767px) {\n    .partTitle {\n      font-size: .5rem;\n      margin-top: -2px; } }\n\n.formContainer {\n  border: 1px solid #0088cc;\n  border-radius: 5px;\n  padding-top: 8px;\n  margin-bottom: 20px;\n  box-shadow: 1px 1px 1px #0077b3; }\n\n#analysisContainer {\n  display: flex;\n  flex-flow: wrap;\n  align-items: center;\n  padding: 8px;\n  padding-top: 0px;\n  max-width: 95%;\n  margin: 0px auto; }\n\n#filterTitle {\n  padding-left: 20px;\n  font-weight: 300;\n  color: #999;\n  font-size: 1rem;\n  width: 100%;\n  text-align: left; }\n\n.filterBox {\n  display: flex;\n  align-items: center;\n  padding-right: 10px; }\n\n.filterBox:last-of-type {\n    padding-right: 0px; }\n\n@media (max-width: 767px) {\n    .filterBox {\n      width: 100%;\n      margin-bottom: 6px; } }\n\n.filterCategory {\n  font-family: Karla;\n  font-size: .9rem;\n  font-weight: 300;\n  text-align: center;\n  margin-bottom: 4px;\n  padding-right: 6px; }\n\n@media (max-width: 767px) {\n    .filterCategory {\n      min-width: 70px; } }\n\n#chatContainer {\n  border: 1px dashed black;\n  padding-top: 10px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px;\n  margin-right: 10px;\n  border-radius: 5px; }\n\n.maxWidthOfParent {\n  width: 100%; }\n\n.title {\n  display: inline-block;\n  font-style: normal;\n  font-size: 22px;\n  width: 80%; }\n\n.author {\n  display: inline-block;\n  font-style: italic;\n  font-size: 12px;\n  width: 80%; }\n\n.link {\n  display: inline-block;\n  text-align: right;\n  font-size: 12px;\n  width: 19%; }\n\n#authorPicture {\n  margin-bottom: 20px; }\n\nhr {\n  margin-bottom: 2px;\n  margin-top: 2px; }\n\n#form-menu-wrapper {\n  position: absolute;\n  top: -10px;\n  right: 0;\n  margin-right: -5px; }\n\n#form-menu-wrapper #form-menu {\n    font-size: 25px; }\n\n.emoContainer {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  margin-top: 20px;\n  padding-left: 10px;\n  margin-bottom: -25px; }\n\n.emoContainer .emoAndText {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: flex-start;\n    width: 50px;\n    margin: 2px 8px; }\n\n.emoContainer .emoAndText:hover {\n      cursor: pointer; }\n\n.emoContainer .emoAndText:hover .emoticon {\n        height: 40px; }\n\n.emoContainer .emoAndText:hover .emoText {\n        font-size: .7rem; }\n\n.selectedPercent {\n  background: #28ab64;\n  color: #fff;\n  border-radius: 100px;\n  border: 1px solid #28ab64;\n  padding: 1px 3px;\n  width: 40px;\n  margin: 2px auto; }\n\n.cBody {\n  height: auto;\n  border-bottom-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border: none;\n  border-top: none;\n  position: relative;\n  background: transparent;\n  box-sizing: border-box;\n  margin: auto 0px;\n  margin-bottom: 10px;\n  background-size: cover;\n  padding-top: 0;\n  padding-bottom: 0;\n  width: 100%;\n  z-index: 0 !important; }\n\n.comSort {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  width: 100%;\n  padding: 8px 12px; }\n\n.comSwitch {\n  display: block;\n  color: #1a7142;\n  font-family: Karla;\n  font-size: .8rem;\n  margin: auto 4px; }\n\n.comSwitch:hover {\n    cursor: pointer;\n    font-weight: 700; }\n\n.userComCont {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 8px;\n  width: 100%; }\n\n.comUserImage {\n  width: 32px !important;\n  border-radius: 8px;\n  z-index: 3;\n  margin-right: 10px;\n  background-color: #e2e2e2; }\n\n.comUserImage.reverse {\n    margin-right: 0px !important;\n    margin-left: 10px !important; }\n\n.comments {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 8px 12px; }\n\n.indComment {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n  margin-bottom: 10px; }\n\n.reverse {\n  flex-direction: row-reverse; }\n\n.submitButton {\n  background: #FFF;\n  border-radius: 8px;\n  padding: 2px 14px;\n  line-height: 1rem;\n  width: auto;\n  text-align: center;\n  border: none;\n  border: solid 1px #666;\n  font-size: 1rem;\n  font-family: Karla;\n  outline-style: none;\n  margin-top: 0px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    color: #333 !important;\n    border: solid 1px #333; }\n\n.submitButton.positive {\n    background: #28ab64;\n    border: #28ab64 1px solid;\n    color: #FFF !important; }\n\n.submitButton.positive:hover {\n      background: #47d487; }\n\n.resetButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 4px 8px;\n  border: none;\n  text-align: center;\n  font-size: .8rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin: 0px 6px; }\n\n.resetButton:active {\n    outline-style: none; }\n\n.resetButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n.demo-chart {\n  height: 300px; }\n\n#completedBlock {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: flex-start;\n  margin-right: 60px;\n  margin-top: 20px;\n  width: 100%; }\n\n#answerCount {\n  display: block;\n  font-family: Karla;\n  font-size: 1rem;\n  padding: 0px;\n  margin-top: 8px; }\n\n#qCompleted {\n  display: block;\n  font-family: Karla;\n  font-size: 1.2rem;\n  color: #28ab64;\n  padding: 3px 9px;\n  border: 1px solid #28ab64;\n  border-radius: 4px; }\n\n.filterDropdownText {\n  font-family: Karla;\n  font-weight: 400; }\n\n.filterDropdownText .cuppa-dropdown {\n  background: #28ab64 !important; }\n\n.sharePdfMenu {\n  width: 200px;\n  height: 200px; }\n\n.headline {\n  text-align: center;\n  font-family: Karla;\n  font-size: 1.2rem; }\n\n.emailInput {\n  width: 90%;\n  padding: 3px 6px;\n  margin-bottom: 16px; }\n\n.emailInput:focus {\n    outline: none; }\n\n.shareEmailContainer {\n  width: 90%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 15px;\n  position: relative;\n  border: 1px solid #e2e2e2;\n  border-radius: 8px; }\n\n.dropdown-toggle::after {\n  display: none; }\n\n#form-menu-wrapper {\n  cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/feed-form/feed-form.component.ts":
/*!**************************************************!*\
  !*** ./src/app/feed-form/feed-form.component.ts ***!
  \**************************************************/
/*! exports provided: FeedFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedFormComponent", function() { return FeedFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Feed/feed-form.model */ "./src/app/Feed/feed-form.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _popup_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../popup.service */ "./src/app/popup.service.ts");
/* harmony import */ var _confirmation_popup_confirmation_popup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../confirmation-popup/confirmation-popup.component */ "./src/app/confirmation-popup/confirmation-popup.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! html2canvas */ "../node_modules/html2canvas/dist/npm/index.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.min.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jspdf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var FeedFormComponent = /** @class */ (function () {
    function FeedFormComponent(http, modalService, fb) {
        this.http = http;
        this.modalService = modalService;
        this.fb = fb;
        this.emitSubmitted = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.showsubmit = false;
        this.submissionfailed = false;
        this.showdiscussion = false;
        this.hide = false;
        this.loggedin = false;
        this.count = null;
        this.submitted = false;
        this.showFilter = false;
        this.shortAnswers2 = [];
        this.isMyPost = false;
        this.answersExist = true;
        this.shareEmails = false;
        this.shareEmailStatus = null;
        //  ------ Emoticon properties to change/check against
        this.hasReacted = false;
        this.reaction = null;
        // ------ Filter variables
        this.ageList = [];
        this.ageSelected = [];
        this.ageSettings = {};
        this.locationList = [];
        this.locationSelected = [];
        this.locationSettings = {};
        this.genderList = [];
        this.genderSelected = [];
        this.genderSettings = {};
        this.otherloc = true;
        this.locations = [];
        this.otherlocations = [];
        this.alllocationsarray = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]);
        this.defaultages = [];
        this.plotselection = { age: this.defaultages, location: [], gender: ['male', 'female', 'unknown'] };
        // ages
        this.unknownage = ['Unknown'];
        this.valuesagesmin17 = [];
        this.valuesages17to23 = [];
        this.valuesages24to29 = [];
        this.valuesages30to39 = [];
        this.valuesages40to49 = [];
        this.valuesages50to59 = [];
        this.valuesplus60 = [];
        this.userData = {};
        this.nocreated = null;
        this.name = '';
        this.nodiscussion = null;
        this.notaken = null;
        this.location = { city: '', state: '', country: '' };
        this.dataselectionform = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            // set them to true to have filters true from the start
            age: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]([]),
            otherlocbox: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true),
            alllocations: this.alllocationsarray,
            locations: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]([]),
            gender: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]([])
        });
    }
    FeedFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.me && this.form && this.me == this.form.authorlink) {
            this.isMyPost = true;
        }
        // update reactions
        // this.intReactionData = this.form.reactions;
        // this.reactionData = this.reactionssummary(this.intReactionData);
        // get profile info
        this.startingTime = Date.now();
        if (this.inComm) {
            this.shareUrl = "https://www.questionsly.com/group/" + this.inComm + ";survey=" + this.form.id;
        }
        else {
            this.shareUrl = "https://www.questionsly.com/feed;survey=" + this.form.id;
        }
        this.http.post("/users/profile/" + this.form.authorlink, { slim: true }).toPromise()
            .then(function (res) {
            if (res) {
                _this.userData = res.json();
                // anonymous
                if (_this.userData.status == 0) {
                    _this.location = { city: '', state: '', country: '' };
                    _this.name = { first: 'Anonymous', last: '' };
                    _this.nocreated = 100;
                    _this.nodiscussion = 100;
                    _this.notaken = 100;
                }
                else {
                    // User
                    _this.location = _this.userData.userprofile.location || { city: '', state: '', country: '' };
                    _this.name = _this.userData.userprofile.name || '';
                    _this.nocreated = _this.userData.userprofile.nocreated || 0;
                    _this.nodiscussion = _this.userData.userprofile.nodiscussion || 0;
                    _this.notaken = _this.userData.userprofile.notaken || 0;
                }
            }
        });
        if (this.form.questions != null) {
            // did the current user complete this form, if so answers can be shown
            this.isFilledIn();
            this.form.eventplot = false;
            this.form.contracted = this.form.questions.length > 1;
            // default ages. Uncomment to have initial plot data include all ages
            for (var i = 0; i < 120; i++) {
                this.defaultages.push(i);
            }
            this.defaultages.push('Unknown');
            for (var i = 0; i < 17; i++) {
                this.valuesagesmin17.push(i);
            }
            for (var i = 17; i < 24; i++) {
                this.valuesages17to23.push(i);
            }
            for (var i = 24; i < 30; i++) {
                this.valuesages24to29.push(i);
            }
            for (var i = 30; i < 40; i++) {
                this.valuesages30to39.push(i);
            }
            for (var i = 40; i < 50; i++) {
                this.valuesages40to49.push(i);
            }
            for (var i = 50; i < 60; i++) {
                this.valuesages50to59.push(i);
            }
            for (var i = 60; i < 120; i++) {
                this.valuesplus60.push(i);
            }
        }
        this.ageList = [
            { 'id': 1, 'itemName': '< 17', 'input': 'age', 'min': 0, 'max': 16 },
            { 'id': 2, 'itemName': '17 - 23', 'input': 'age', 'min': 17, 'max': 23 },
            { 'id': 3, 'itemName': '24 - 29', 'input': 'age', 'min': 24, 'max': 29 },
            { 'id': 4, 'itemName': '31-39', 'input': 'age', 'min': 30, 'max': 39 },
            { 'id': 5, 'itemName': '40 - 49', 'input': 'age', 'min': 40, 'max': 49 },
            { 'id': 6, 'itemName': '50 - 59', 'input': 'age', 'min': 50, 'max': 59 },
            { 'id': 7, 'itemName': '60+', 'input': 'age', 'min': 60, 'max': 119 }
        ];
        if (!this.form.loginRequired)
            this.ageList.push({ 'id': 8, 'itemName': 'Unknown', 'input': 'age', 'min': -1, 'max': -1 });
        this.genderList = [
            { 'id': 1, 'input': 'gender', 'itemName': 'Male' },
            { 'id': 2, 'input': 'gender', 'itemName': 'Female' }
        ];
        if (!this.form.loginRequired)
            this.genderList.push({ 'id': 3, 'input': 'gender', 'itemName': 'Unknown' });
        this.locationList = [];
        this.ageSelected = [
            { 'id': 1, 'itemName': '< 17', 'input': 'age', 'min': 0, 'max': 16 },
            { 'id': 2, 'itemName': '17 - 23', 'input': 'age', 'min': 17, 'max': 23 },
            { 'id': 3, 'itemName': '24 - 29', 'input': 'age', 'min': 24, 'max': 29 },
            { 'id': 4, 'itemName': '31-39', 'input': 'age', 'min': 30, 'max': 39 },
            { 'id': 5, 'itemName': '40 - 49', 'input': 'age', 'min': 40, 'max': 49 },
            { 'id': 6, 'itemName': '50 - 59', 'input': 'age', 'min': 50, 'max': 59 },
            { 'id': 7, 'itemName': '60+', 'input': 'age', 'min': 60, 'max': 119 }
        ];
        if (!this.form.loginRequired)
            this.ageSelected.push({ 'id': 8, 'itemName': 'Unknown', 'input': 'age', 'min': -1, 'max': -1 });
        this.genderSelected = [
            { 'id': 1, 'input': 'gender', 'itemName': 'Male' },
            { 'id': 2, 'input': 'gender', 'itemName': 'Female' }
        ];
        if (!this.form.loginRequired)
            this.genderSelected.push({ 'id': 3, 'input': 'gender', 'itemName': 'Unknown' });
        this.ageSettings = {
            singleSelection: false,
            text: 'Age',
            classes: 'filterDropdownText',
            badgeShowLimit: 0,
            enableCheckAll: false,
            maxHeight: 350
        };
        this.locationSettings = {
            singleSelection: false,
            text: 'Location',
            classes: 'filterDropdownText',
            badgeShowLimit: 0,
            enableCheckAll: false,
            maxHeight: 350
        };
        this.genderSettings = {
            singleSelection: false,
            text: 'Gender',
            classes: 'filterDropdownText',
            badgeShowLimit: 0,
            enableCheckAll: false,
            maxHeight: 350
        };
    };
    FeedFormComponent.prototype.onItemSelect = function (item) {
        item.status = true;
        this.doDataSelectionUpdate(item);
    };
    FeedFormComponent.prototype.OnItemDeSelect = function (item) {
        item.status = false;
        this.doDataSelectionUpdate(item);
    };
    FeedFormComponent.prototype.onSelectAll = function (items) {
        // console.log(items);
    };
    FeedFormComponent.prototype.onDeSelectAll = function (items) {
        // console.log(items);
    };
    FeedFormComponent.prototype.onDocClick = function (event) {
        // event.preventDefault();
        // console.log(event.target);
        // Auto Scroll for Filters in Feed Post
        // if ($(event.target).hasClass('filterButton')) {
        //     window.setTimeout(() => {
        //         var target = $(event.target).closest('.fBody').find('#analysisContainer');
        //         if (target.length) {
        //             $('html, body').animate({
        //                 scrollTop: Math.ceil(target.offset().top - 100)
        //             }, 700);
        //             return;
        //         }
        //     }, 50);
        //     return;
        // }
        // if ($(event.target).hasClass('navbar-toggler') || $(event.target).hasClass('navbar-toggler-icon')) {
        //     return;
        // }
        // if (!$(event.target).parents('.navbar-collapse').length) {
        //     $('#navbarSupportedContent').removeClass('show');
        // }
    };
    // NEW: ONLY THING I CARE ABOUT HERE IS THE INITIAL PLOT INFORMATION RECEIVED ON LINE 271
    FeedFormComponent.prototype.isFilledIn = function () {
        var _this = this;
        this.form.viewGraphs(false);
        // did the current user complete this particular survey?
        var data = { link: this.form.id, answered: this.form.answered, isAuthor: this.isMyPost };
        // post and get response
        this.http.post('/forms/data', data)
            .toPromise()
            .then(function (response) {
            var responsedata = response.json().data;
            _this.shortAnswers2 = response.json().shortAnswers2;
            var responsestatus = response.json().status;
            _this.loggedin = response.json().loggedin;
            // set parameters for visualising the results
            if (responsestatus == 2) {
                _this.form.setAnswered(true);
                // make sure the plot is given the data
                _this.form.answerCount = response.json().count;
                _this.form.plotdata = [];
                // iniital data to give plot
                _this.form.plotdata = _this.form.plotdata.concat(responsedata);
                _this.submitted = true;
                _this.showsubmit = false;
                _this.showdiscussion = true;
                _this.count = response.json().count;
                // if (this.form.typeevent) {
                //     this.retrieveEventData();
                // }
                // this.retrieveEventDataTotals();
                _this.form.setShowData(true);
                // query top locations
                _this.queryTopLocation();
                _this.form.viewGraphs(true);
            }
            else if (responsestatus == 3) {
                // results not public, but answered
                _this.form.setAnswered(true);
                _this.form.setShowData(false);
                _this.showdiscussion = true;
                _this.submitted = true;
                _this.showsubmit = false;
            }
            else if (responsestatus == 1) {
                //test whether this form can be submitted if not signed in.
                if (_this.form.loginRequired === true) {
                    _this.form.setAnswered(true);
                    _this.showdiscussion = false;
                    _this.showsubmit = false;
                }
                else {
                    _this.form.setAnswered(false);
                    _this.showdiscussion = false;
                    _this.showsubmit = true;
                }
            }
            else if (responsestatus == 0) {
                _this.form.setAnswered(false);
                _this.showdiscussion = true;
                _this.showsubmit = true;
            }
            else {
                _this.form.setAnswered(false);
                _this.showsubmit = false;
            }
        })
            .catch(function (error) {
            _this.form.setAnswered(false);
        });
    };
    FeedFormComponent.prototype.postForm = function (data) {
        var _this = this;
        var startingTime = this.startingTime;
        this.emitSubmitted.emit(true);
        window.mixpanel.track('Answered Question', {
            'timeElapsedFromInit': (Date.now() - startingTime) / 1000,
            'question': this.form.questions[0].body,
            'id': this.form.id,
            'timestamp': Date.now()
        });
        data.id = this.form.id;
        this.http.post('/forms/answers', data).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                _this.submitted = true;
                _this.form.answered = true;
                //   this.form.viewGraphs(false);
                _this.isFilledIn();
                _this.form.setAnswered(true);
                _this.form.viewGraphs(true);
            }
            else {
                _this.submissionfailed = true;
            }
        })
            .catch(function (error) { return alert('Error posting survey: ' + error); });
    };
    FeedFormComponent.prototype.expand = function () {
        var startingTime = this.startingTime;
        this.form.contracted = false;
        window.mixpanel.track('Clicked "See More"', {
            'timeElapsedFromInit': (Date.now() - startingTime) / 1000,
            'question': this.form.questions[0].body,
            'id': this.form.id,
            'timestamp': Date.now()
        });
    };
    FeedFormComponent.prototype.queryTopLocation = function () {
        var _this = this;
        this.http.post('/forms/requestTopLocations', { id: this.form.id }).toPromise()
            .then(function (response) {
            var all = response.json().data;
            var tempLocation = [];
            for (var _i = 0, all_1 = all; _i < all_1.length; _i++) {
                var a = all_1[_i];
                _this.locations.push({ name: a[0], count: a[1] });
                // Push to list for dropdown
                tempLocation.push({ itemName: a[0], input: 'location' });
                //comment out to add all locations to initial plot selection
                _this.plotselection.location.push(a[0]);
                var fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({});
                //change to true to have filters true from the start
                fg.addControl(a[0], new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true));
                _this.alllocationsarray.push(fg);
            }
            tempLocation.map(function (loc, ind) {
                _this.locationList.push({ id: ind + 1, itemName: loc.itemName, input: 'location' });
                _this.locationSelected.push({ id: ind + 1, itemName: loc.itemName, input: 'location' });
            });
            // deal with the possibility of more than 5 locations
            // var other = response.json().otherlocations;
            // if (other != null) {
            //     this.otherloc = true;
            //     other.map((loc, ind) => {
            //         this.locationList.push({ id: tempLocation.length + ind+ 1, itemName: loc[0], input: 'location' });
            //         this.locationSelected.push({ id:tempLocation.length + ind + 1, itemName: loc[0], input: 'location' });
            //     });
            //     this.locationList.push({ id: tempLocation.length + other.length + 1, itemName:'Unknown', input: 'location' });
            //     this.locationSelected.push({ id: tempLocation.length + other.length + 1, itemName:'Unknown', input: 'location' });
            //     for (let o of other) {
            //         this.otherlocations.push(o[0]);
            //         this.plotselection.location.push(o[0]);
            //     }
            // }
        })
            .catch(function (error) {
        });
    };
    // NEW: THIS IS THE FUNCTION THATS CALLED WHEN THE FORM CONTROL IS CHANGED
    FeedFormComponent.prototype.doDataSelectionUpdate = function (x) {
        this.form.viewGraphs(false);
        if (x.itemName == 'Unknown') {
            var tempgenderstring = ['unknown'];
            var tempage = [];
            if (x.status == false) {
                if (x.input = 'age') {
                    if (this.locationSelected[this.locationSelected.length - 1].itemName === 'Unknown')
                        this.locationSelected = this.locationSelected.slice(0, this.locationSelected.length - 1);
                    if (this.genderSelected[this.genderSelected.length - 1].itemName === 'Unknown')
                        this.genderSelected = this.genderSelected.slice(0, this.genderSelected.length - 1);
                }
                if (x.input = 'gender') {
                    if (this.locationSelected[this.locationSelected.length - 1].itemName === 'Unknown')
                        this.locationSelected = this.locationSelected.slice(0, this.locationSelected.length - 1);
                    if (this.ageSelected[this.ageSelected.length - 1].itemName === 'Unknown')
                        this.ageSelected = this.ageSelected.slice(0, this.ageSelected.length - 1);
                }
                if (x.input = 'location') {
                    if (this.ageSelected[this.ageSelected.length - 1].itemName === 'Unknown')
                        this.ageSelected = this.ageSelected.slice(0, this.ageSelected.length - 1);
                    if (this.genderSelected[this.genderSelected.length - 1].itemName === 'Unknown')
                        this.genderSelected = this.genderSelected.slice(0, this.genderSelected.length - 1);
                }
                tempage = this.unknownage;
                this.plotselection.age = this.plotselection.age.filter(function (e) { return tempage.indexOf(e) == -1; });
                this.plotselection.location = this.plotselection.location.filter(function (e) { return x.itemName.indexOf(e) == -1; });
                this.plotselection.gender = this.plotselection.gender.filter(function (e) { return tempgenderstring.indexOf(e) == -1; });
            }
            else {
                if (x.input = 'age') {
                    if (this.locationSelected[this.locationSelected.length - 1].itemName !== 'Unknown')
                        this.locationSelected.push({ 'id': this.locationList.length, 'input': 'location', 'itemName': 'Unknown' });
                    if (this.genderSelected[this.genderSelected.length - 1].itemName !== 'Unknown')
                        this.genderSelected.push({ 'id': 3, 'input': 'gender', 'itemName': 'Unknown' });
                }
                if (x.input = 'gender') {
                    if (this.locationSelected[this.locationSelected.length - 1].itemName !== 'Unknown')
                        this.locationSelected.push({ 'id': this.locationList.length, 'input': 'location', 'itemName': 'Unknown' });
                    if (this.ageSelected[this.ageSelected.length - 1].itemName !== 'Unknown')
                        this.ageSelected.push({ 'id': 8, 'itemName': 'Unknown', 'input': 'age', 'min': -1, 'max': -1 });
                }
                if (x.input = 'location') {
                    if (this.ageSelected[this.ageSelected.length - 1].itemName !== 'Unknown')
                        this.ageSelected.push({ 'id': 8, 'itemName': 'Unknown', 'input': 'age', 'min': -1, 'max': -1 });
                    if (this.genderSelected[this.genderSelected.length - 1].itemName !== 'Unknown')
                        this.genderSelected.push({ 'id': 3, 'input': 'gender', 'itemName': 'Unknown' });
                }
                tempage = this.unknownage;
                this.plotselection.age = this.plotselection.age.concat(tempage);
                this.plotselection.location = this.plotselection.location.concat(x.itemName);
                this.plotselection.gender = this.plotselection.gender.concat(tempgenderstring);
            }
        }
        if (x.itemName !== 'Unknown' && x.input == 'age') {
            // NEW: THIS REMOVES THIS AGE RANGE FROM THE plotselection.age array
            if (x.status == false) {
                // remove entries from the array
                var tempremoval = [];
                if (x.min === 0) {
                    tempremoval = this.valuesagesmin17;
                }
                else if (x.min === 17) {
                    tempremoval = this.valuesages17to23;
                }
                else if (x.min === 24) {
                    tempremoval = this.valuesages24to29;
                }
                else if (x.min === 30) {
                    tempremoval = this.valuesages30to39;
                }
                else if (x.min === 40) {
                    tempremoval = this.valuesages40to49;
                }
                else if (x.min === 50) {
                    tempremoval = this.valuesages50to59;
                }
                else if (x.min === 60) {
                    tempremoval = this.valuesplus60;
                }
                this.plotselection.age = this.plotselection.age.filter(function (e) { return tempremoval.indexOf(e) == -1; });
            }
            else {
                // NEW: THIS REMOVES THIS AGE RANGE FROM THE plotselection.age array
                var tempadd = [];
                if (x.min === 0) {
                    tempadd = this.valuesagesmin17;
                }
                else if (x.min === 17) {
                    tempadd = this.valuesages17to23;
                }
                else if (x.min === 24) {
                    tempadd = this.valuesages24to29;
                }
                else if (x.min === 30) {
                    tempadd = this.valuesages30to39;
                }
                else if (x.min === 40) {
                    tempadd = this.valuesages40to49;
                }
                else if (x.min === 50) {
                    tempadd = this.valuesages50to59;
                }
                else if (x.min === 60) {
                    tempadd = this.valuesplus60;
                }
                this.plotselection.age = this.plotselection.age.concat(tempadd);
            }
        }
        else if (x.itemName !== 'Unknown' && x.input == 'location') {
            if (x.status == false) {
                if (x.value != 'other') {
                    this.plotselection.location = this.plotselection.location.filter(function (e) { return x.itemName.indexOf(e) == -1; });
                }
                else {
                    var remove = this.otherlocations;
                    this.plotselection.location = this.plotselection.location.filter(function (e) { return remove.indexOf(e) == -1; });
                }
            }
            else {
                if (x.value != 'other') {
                    this.plotselection.location = this.plotselection.location.concat(x.itemName);
                }
                else {
                    this.plotselection.location = this.plotselection.location.concat(this.otherlocations);
                }
            }
        }
        else if (x.itemName !== 'Unknown' && x.input == 'gender') {
            // Something to filter it
            var tempgenderstring2_1 = [x.itemName.toLowerCase()];
            if (x.status == false) {
                this.plotselection.gender = this.plotselection.gender.filter(function (e) { return tempgenderstring2_1.indexOf(e) == -1; });
            }
            else {
                this.plotselection.gender = this.plotselection.gender.concat(tempgenderstring2_1);
            }
        }
        this.executePlotDataRetrieval();
    };
    FeedFormComponent.prototype.executePlotDataRetrieval = function () {
        var _this = this;
        // post and get response
        this.http.post('/forms/alldata', { link: this.form.id, dataselection: this.plotselection, all: false })
            .toPromise()
            .then(function (response) {
            var responsedata = response.json().data;
            var responsestatus = response.json().status;
            // set parameters for visualising the results
            if (responsestatus == 2) {
                // make sure the plot is given the data
                _this.form.setAnswered(true);
                _this.form.setPlotData(responsedata);
                _this.submitted = true;
                _this.showsubmit = false;
                _this.form.viewGraphs(true);
            }
            else if (responsestatus == 1) {
                _this.form.setAnswered(false);
                _this.showsubmit = false;
            }
            else if (responsestatus == 0) {
                _this.form.setAnswered(false);
                _this.showsubmit = true;
            }
            else {
                _this.form.setAnswered(false);
                _this.showsubmit = false;
            }
        })
            .catch(function (error) {
            //Used to disenable graphs for non logged in users
            _this.form.setAnswered(false);
        });
    };
    FeedFormComponent.prototype.deleteForm = function () {
        var _this = this;
        // post and get response
        this.confirmationPopup.confirm('Are you sure you want to delete this survey?').then(function (answer) {
            if (answer) {
                _this.http.post('/forms/delete', { id: _this.form.id })
                    .toPromise()
                    .then(function (response) {
                    if (response.json().status == 1) {
                        _this.hide = true;
                    }
                });
            }
        });
    };
    FeedFormComponent.prototype.expireForm = function () {
        var _this = this;
        // post and get response
        this.confirmationPopup.confirm('Are you sure you want to expire this survey? No further answers will be accepted, this action can not be undone.').then(function (answer) {
            if (answer) {
                _this.http.post('/forms/expire', { id: _this.form.id })
                    .toPromise()
                    .then(function (response) {
                    if (response.json().status == 1) {
                        _this.form.expired = true;
                    }
                });
            }
        });
    };
    FeedFormComponent.prototype.releaseForm = function () {
        var _this = this;
        // update form parameters to make survey 'public': shared boolean set to true.
        this.confirmationPopup.confirm('Are you sure you want to release this form? Users will be able to view and answer this form when you release it.').then(function (answer) {
            if (answer) {
                _this.http.post('/forms/shared', { formid: _this.form.id }).toPromise()
                    .then(function (response) {
                    if (response.json().status == 1) {
                    }
                });
            }
        });
    };
    FeedFormComponent.prototype.shareForm = function () {
        this.modalService.open(this.shareModal);
    };
    FeedFormComponent.prototype.reportForm = function () {
        this.http.post('/forms/report', { targetid: this.form.id }).toPromise()
            .then(function (response) {
            //
        })
            .catch(function (error) { return function () {
            //
        }; });
    };
    FeedFormComponent.prototype.ResetDataForm = function () {
        var _this = this;
        //
        this.form.viewGraphs(false);
        // alter the graph type to split by gender
        this.http.post('/forms/alldata', { link: this.form.id, all: true })
            .toPromise()
            .then(function (response) {
            var responsedata = response.json().data;
            var responsestatus = response.json().status;
            // set parameters for visualising the results
            if (responsestatus == 2) {
                // make sure the plot is given the data
                _this.form.setAnswered(true);
                _this.form.setPlotData(responsedata);
                _this.submitted = true;
                _this.showsubmit = false;
                _this.form.viewGraphs(true);
            }
            else if (responsestatus == 1) {
                _this.form.setAnswered(false);
                _this.showsubmit = false;
            }
            else if (responsestatus == 0) {
                _this.form.setAnswered(false);
                _this.showsubmit = true;
            }
            else {
                _this.form.setAnswered(false);
                _this.showsubmit = false;
            }
        })
            .catch(function (error) {
            _this.form.setAnswered(false);
        });
    };
    FeedFormComponent.prototype.reactionssummary = function (reactions) {
        // make a summary
        var counts = {};
        var total = 0;
        var summary = {};
        if (reactions != null) {
            for (var k in reactions) {
                total += reactions[k];
            }
            // reformat
            // and make percentage
            for (var k in reactions) {
                summary[k] = (Math.round(((reactions[k] / total) * 100) * 100) / 100);
            }
        }
        return summary;
    };
    ;
    FeedFormComponent.prototype.toggleFilters = function (e) {
        this.form.contracted = false;
        this.showFilter = e;
    };
    FeedFormComponent.prototype.toggleShareEmails = function () {
        this.shareEmails = !this.shareEmails;
    };
    FeedFormComponent.prototype.sendEmails = function (emails) {
        var emailList = emails;
        this.exportPDF(false);
    };
    FeedFormComponent.prototype.beginPDF = function (save) {
        var _this = this;
        if (save === void 0) { save = true; }
        // Calling this function to expand form first if needed, so it can capture all pie charts
        var exportPDF = this.exportPDF.bind(this);
        if (this.form.contracted) {
            this.form.contracted = false;
            if (save) {
                window.setTimeout(function () { _this.exportPDF(); }, 1000);
            }
            else {
                this.shareEmails = true;
                window.setTimeout(function () { _this.exportPDF(false); }, 1000);
            }
        }
        else {
            if (save) {
                this.exportPDF();
            }
            else {
                this.shareEmails = true;
                this.exportPDF(false);
            }
        }
    };
    FeedFormComponent.prototype.exportPDF = function (save, list) {
        var _this = this;
        if (save === void 0) { save = true; }
        if (list === void 0) { list = ''; }
        if (!save) {
            this.shareEmailStatus = 'Sending...';
        }
        var doc = new jspdf__WEBPACK_IMPORTED_MODULE_8__();
        var yOffset;
        // Map pie charts to right questions
        var pieChartsIndexes = jquery__WEBPACK_IMPORTED_MODULE_9__(event.target).parents('.fBody').find('[formarrayname]').find('pie-chart');
        var pieCharts = jquery__WEBPACK_IMPORTED_MODULE_9__(event.target).parents('.fBody').find('[formarrayname]').find('canvas');
        var indexes = [];
        var pieChartPromises = [];
        var pieImages = [];
        for (var i = 0; i < pieChartsIndexes.length; i++) {
            indexes.push(pieChartsIndexes[i].id);
        }
        // Extract the index from id and make it a number
        indexes = indexes.map(function (x) {
            return Number(x.substr(x.indexOf('-') + 1));
        });
        // Start Creating PDF Here
        var pdf;
        renderPieCharts().then(function () {
            // Create page per question in survey
            _this.form.questions.forEach(function (q, i) {
                // Reset yOffset for new pages
                yOffset = 25;
                // Heading
                doc.setTextColor(40, 171, 100);
                doc.setFontSize(12);
                doc.text('Questionsly', 20, yOffset);
                doc.setLineWidth(0.3);
                yOffset += 4;
                doc.line(20, yOffset, 180, yOffset);
                yOffset += 10;
                // Response Count
                doc.setTextColor(96, 96, 96);
                doc.setFontSize(18);
                doc.text(_this.count + " Responses", 80, yOffset);
                yOffset += 15;
                // Survey Title
                if (i == 0 && _this.form.title) {
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(16);
                    doc.text(_this.form.title, 20, yOffset);
                    yOffset += 15;
                }
                // Question Body
                doc.setTextColor(32, 32, 32);
                doc.setFontSize(14);
                doc.text((i + 1) + '. ' + multipleLine(q.body, 12).text, 20, yOffset);
                yOffset += Math.max(10, 6 * multipleLine(q.body).lines);
                // Question Image
                if (q.pic) {
                    try {
                        doc.addImage(q.pic, 'PNG', 20, yOffset, 100, 50);
                        yOffset += 60;
                    }
                    catch (_a) {
                        yOffset += 10;
                        console.log('COULD NOT EXPORT QUESTION IMAGE TO PDF.\n');
                    }
                }
                // Question options
                if (q.options && q.options.length > 0) {
                    doc.setFontSize(10);
                    q.options.forEach(function (option) {
                        doc.text(option.label + ". " + option.body, 20, yOffset);
                        yOffset += 8;
                    });
                }
                // yOffset += 20;
                // Check to see if this question has a pie chart
                var hasChart = indexes.indexOf(i);
                // Add Pie Charts
                if (pieCharts.length > 0 && hasChart !== -1) {
                    var width = pieCharts[hasChart].clientWidth / 2.5;
                    var height = pieCharts[hasChart].clientHeight / 2.5;
                    doc.addImage(pieImages[hasChart], 'PNG', 20, yOffset, width, height);
                }
                // Add Text Responses if Short Answer Question
                if (_this.form.questions[i].kind == 'Short Answer') {
                    // Heading
                    doc.setTextColor(32, 32, 32);
                    doc.setFontSize(12);
                    doc.text('Responses', 20, yOffset);
                    yOffset += 2;
                    doc.setLineWidth(0.1);
                    doc.line(20, yOffset, 43, yOffset);
                    yOffset += 5;
                    _this.shortAnswers2[i].forEach(function (res) {
                        // Move to new page if necessary
                        yOffset = overflowCheck(yOffset);
                        // Add User Image if possible
                        try {
                            doc.addImage(res.pic, 'PNG', 20, yOffset, 12, 12);
                        }
                        catch (err) {
                            console.log('COULD NOT SAVE USER IMAGE TO PDF. USING DEFAULT.\n');
                            doc.addImage('/images/male.png', 'PNG', 20, yOffset, 12, 12);
                        }
                        yOffset += 6;
                        // User Name
                        doc.setFontSize(10);
                        doc.text("" + res.name, 35, yOffset);
                        yOffset += 4;
                        // Response
                        doc.setTextColor(32, 32, 32);
                        doc.setFontSize(8);
                        doc.text("" + multipleLine(res.answer, 16).text, 40, yOffset);
                        yOffset += (4 * multipleLine(res.answer, 16).lines);
                    });
                }
                // Add Page if more questions
                if (_this.form.questions.length > (i + 1)) {
                    doc.addPage();
                }
            });
            // Save or Share PDF
            if (save) {
                doc.save(_this.form.questions[0].body.substr(0, 20) + ".pdf");
                return;
            }
            else {
                //Output for sharing
                return doc.output('blob');
                // return doc.output('blob');
            }
        }).then(function (pdf) {
            if (pdf) {
                _this.sendPDF(pdf, list);
            }
        });
        // Aux Functions
        // Need to render pie charts before because they are async and will be appended randomly throughout the page if not loaded first
        function renderPieCharts() {
            if (pieCharts.length > 0) {
                var _loop_1 = function (i) {
                    pieChartPromises.push(new Promise(function (resolve, reject) {
                        html2canvas__WEBPACK_IMPORTED_MODULE_7__(pieCharts[i]).then(function (canvas) {
                            var img = canvas.toDataURL('image/png');
                            pieImages.push(img);
                            resolve();
                        });
                    }));
                };
                for (var i = 0; i < pieCharts.length; i++) {
                    _loop_1(i);
                }
                return Promise.all(pieChartPromises);
            }
            else {
                return new Promise(function (resolve) { return resolve(); });
            }
        }
        //Create New Page if Overflow
        function overflowCheck(yOffset) {
            if (yOffset >= 260) {
                doc.addPage();
                yOffset = 25;
            }
            return yOffset;
        }
        // Breakdown long lines since jsPDF doesn't wrap the lines. Wordcount is words per line
        function multipleLine(s, wordCount) {
            if (wordCount === void 0) { wordCount = 14; }
            var index = [];
            var words = 0;
            var finalString = [];
            for (var i = 0; i < s.length; i++) {
                if (s[i] === ' ') {
                    words++;
                }
                if (words == wordCount) {
                    words = 0;
                    index.push(i);
                }
            }
            if (index.length > 0) {
                var prevValue;
                index.forEach(function (x, i) {
                    if (i == 0) {
                        // console.log(s.substr(0,x), 'OKOKO', x);
                        finalString.push(s.substr(0, x));
                        prevValue = x;
                    }
                    else {
                        finalString.push(s.substr(prevValue + 1, x - prevValue - 1));
                        prevValue = x;
                    }
                });
                finalString.push(s.substr(prevValue + 1, s.length - prevValue - 1));
            }
            return finalString.length === 0 ? { text: s, lines: 1 } : { text: finalString.join('\n'), lines: finalString.length };
        }
    };
    FeedFormComponent.prototype.sendPDF = function (pdf, list) {
        // Get pdf
        // get email list
        var _this = this;
        var data = new FormData();
        data.append('survey', pdf);
        var xhr = new XMLHttpRequest();
        var sendlist = function () {
            _this.http.post("/forms/sendOutPDF", { emails: list, title: _this.form.title, firstQuestion: _this.form.questions[0].body }).toPromise()
                .then(function (res) {
                if (res) {
                }
            });
        };
        var done = function () {
            _this.toggleShareEmails();
            _this.shareEmailStatus = null;
        };
        var completed = function () {
            _this.shareEmailStatus = 'Report Sent!';
            window.setTimeout(done, 1800);
        };
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status !== 200) {
                    // handle error
                }
                else {
                    sendlist();
                    completed();
                }
            }
        };
        xhr.open('POST', '/forms/generatePDF', true);
        xhr.send(data);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_2__["FeedFormModel"])
    ], FeedFormComponent.prototype, "form", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedFormComponent.prototype, "pic", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedFormComponent.prototype, "pictype", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedFormComponent.prototype, "inComm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedFormComponent.prototype, "me", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], FeedFormComponent.prototype, "emitSubmitted", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_confirmation_popup_confirmation_popup_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmationPopupComponent"]),
        __metadata("design:type", Object)
    ], FeedFormComponent.prototype, "confirmationPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('shareModal'),
        __metadata("design:type", Object)
    ], FeedFormComponent.prototype, "shareModal", void 0);
    FeedFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feed-form-component',
            template: __webpack_require__(/*! ./feed-form.component.html */ "./src/app/feed-form/feed-form.component.html"),
            styles: [__webpack_require__(/*! ./feed-form.component.scss */ "./src/app/feed-form/feed-form.component.scss")],
            providers: [_popup_service__WEBPACK_IMPORTED_MODULE_4__["PopupService"]],
            host: {
                '(document:click)': 'onDocClick($event)',
            }
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], FeedFormComponent);
    return FeedFormComponent;
}());



/***/ }),

/***/ "./src/app/feed-list/feed-list.component.html":
/*!****************************************************!*\
  !*** ./src/app/feed-list/feed-list.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"FeedContainer\">\n    <app-feed-form-component [pic]=\"pic\" [pictype]=\"pictype\" [form]=\"form\" [inComm]=\"comm\" [me]=\"me\" *ngFor=\"let form of feedlist\"> </app-feed-form-component>\n    <div *ngIf=\"feedlist.length === 0\" class=\"aboutContainer\">\n        <h4 *ngIf=\"!showLoadingBoxes\" class=\"tempText qslyGray\">{{emptyMessage}}</h4>\n        <div *ngIf=\"showLoadingBoxes\" class=\"loadingBoxContainer\">\n            <div class=\"loadingPost\">\n                <div class=\"loadingHeader\">\n                    <div class=\"loadingUser\"></div>\n                    <div class=\"loadingTag\"></div>\n                </div>\n                <div class=\"loadingBox\"></div>\n            </div>\n\n            <div class=\"loadingPost\">\n                <div class=\"loadingHeader\">\n                    <div class=\"loadingUser\"></div>\n                    <div class=\"loadingTag\"></div>\n                </div>\n                <div class=\"loadingBox\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/feed-list/feed-list.component.scss":
/*!****************************************************!*\
  !*** ./src/app/feed-list/feed-list.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#FeedContainer {\n  background-color: none;\n  padding: 0px;\n  padding-top: 20px;\n  overflow: auto;\n  margin-top: 30px; }\n  #FeedContainer:first-child {\n    margin-top: -30px; }\n  #topJumbo {\n  border: 10px;\n  background: #F6F6F6; }\n  .fa-heart {\n  color: #0088cc; }\n  .mouseChangeToHand {\n  cursor: pointer;\n  cursor: hand; }\n  .aboutContainer {\n  width: 100%;\n  padding: 25px;\n  display: flex;\n  align-items: center;\n  background: #FFF;\n  margin: 0px;\n  border-radius: 4px;\n  border: 1px solid #e2e2e2;\n  position: relative;\n  z-index: -2; }\n  @media (min-width: 980px) {\n    .aboutContainer {\n      min-width: 480px; } }\n  .tempText {\n  margin-bottom: 6px;\n  font-family: Karla;\n  font-size: 1.15rem;\n  font-weight: 300;\n  text-align: center;\n  width: 100%; }\n  .loadingBoxContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%; }\n  .loadingPost {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  margin-bottom: 20px; }\n  .loadingHeader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%; }\n  .loadingUser {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: #E2E2E2;\n  -webkit-animation: loading 1s linear 0s infinite alternate;\n          animation: loading 1s linear 0s infinite alternate; }\n  .loadingTag {\n  width: 25%;\n  height: 20px;\n  border-radius: 2px;\n  background: #E2E2E2;\n  -webkit-animation: loading 1s linear 0s infinite alternate;\n          animation: loading 1s linear 0s infinite alternate; }\n  .loadingBox {\n  width: 100%;\n  height: 200px;\n  margin: 12px 0;\n  border-radius: 4px;\n  background: #E2E2E2;\n  -webkit-animation: loading 1s linear 0s infinite alternate;\n          animation: loading 1s linear 0s infinite alternate; }\n  @-webkit-keyframes loading {\n  0% {\n    background: #E2E2E2; }\n  100% {\n    background: #CECECE; } }\n  @keyframes loading {\n  0% {\n    background: #E2E2E2; }\n  100% {\n    background: #CECECE; } }\n"

/***/ }),

/***/ "./src/app/feed-list/feed-list.component.ts":
/*!**************************************************!*\
  !*** ./src/app/feed-list/feed-list.component.ts ***!
  \**************************************************/
/*! exports provided: FeedListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedListComponent", function() { return FeedListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Feed/feed-form.model */ "./src/app/Feed/feed-form.model.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FeedListComponent = /** @class */ (function () {
    function FeedListComponent(http, userService, route) {
        this.http = http;
        this.userService = userService;
        this.route = route;
        this.feedlist = [];
        this.formids = [];
        this.emptyMessage = 'Retrieving Data...';
        this.somethingChanged = false;
        this.showLoadingBoxes = true;
    }
    FeedListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formselected = this.route.params.value.survey;
        this.prevTag = this.tag;
        this.route.params.subscribe(function (params) {
            if (_this.formselected !== params.survey) {
                // console.log('Changed from: ',this.formselected, ' to ', params.survey, '\n' );
                _this.formselected = params.survey;
                _this.somethingChanged = true;
                _this.getTopPost();
            }
        });
        this.userService.afterLoginCheck().then(function (userData) {
            if (userData != 0) {
                _this.me = userData.dbid;
            }
        });
        var loadMorePosts = this.loadMorePosts.bind(this);
        window.setTimeout(loadMorePosts, 3000);
        this.refreshFeed(); //take out after we have official posts
    };
    FeedListComponent.prototype.ngOnChanges = function () {
        this.formselected = this.route.params.value.survey;
        // Check if changes came from tag or community
        if (this.prevTag !== this.tag) {
            this.somethingChanged = true;
            this.prevTag = this.tag;
        }
        if (this.prevComm !== this.comm) {
            this.somethingChanged = true;
            this.prevComm = this.comm;
        }
        this.refreshFeed();
    };
    FeedListComponent.prototype.loadMorePosts = function () {
        var prevPostCount = this.feedlist.length;
        var postPostCount = this.feedlist.length;
        var $docHeight = jquery__WEBPACK_IMPORTED_MODULE_5__(document).height(), $windHeight = jquery__WEBPACK_IMPORTED_MODULE_5__(window).height(), triggerHeight = .75 * ($docHeight - $windHeight), fetched = false;
        // console.log('Document Height:', $docHeight, '\nWindow Height:', $windHeight, '\nTRIGGER HEIGHT:', triggerHeight);
        var refreshFeed = this.refreshFeed.bind(this);
        jquery__WEBPACK_IMPORTED_MODULE_5__(window).scroll(function () {
            var wScroll = jquery__WEBPACK_IMPORTED_MODULE_5__(window).scrollTop();
            if (wScroll > triggerHeight && !fetched) {
                refreshFeed();
                fetched = true;
                // Reset trigger location to initiate new post fetch
                window.setTimeout(function () {
                    $docHeight = jquery__WEBPACK_IMPORTED_MODULE_5__(document).height();
                    triggerHeight = .75 * ($docHeight - $windHeight);
                    fetched = false;
                }, 3000);
            }
        });
    };
    FeedListComponent.prototype.refreshFeed = function (totalRefresh) {
        var _this = this;
        if (totalRefresh === void 0) { totalRefresh = false; }
        var route;
        var requestBody;
        if (totalRefresh) {
            this.formids = [];
            this.feedlist = [];
        }
        if (this.showAnsweredQuestions) {
            route = "/forms/feed/answered";
            requestBody = {
                user: this.user,
                pref: this.pref,
                offset: 0,
                limit: this.formids.length + 10
            };
        }
        else {
            route = "/forms/feed";
            // Clear list if fetching new Top Survey from notification
            if (this.somethingChanged) {
                this.feedlist = [];
                this.formids = [];
                this.somethingChanged = false;
            }
            requestBody = {
                tag: this.tag,
                user: this.user,
                topsurvey: this.formselected,
                comm: this.comm,
                pref: this.pref,
                anonymous: true,
                // Just a flag to not show anonymous
                currentPosts: this.formids
            };
        }
        this.http
            .post(route, requestBody)
            .toPromise()
            .then(function (res) {
            if (res.json().status === 1) {
                // add to list
                _this.data = res.json().data;
                for (var _i = 0, _a = _this.data; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    if (_this.formids.indexOf(obj.id) === -1) {
                        // Push forms into feedlist if not there already
                        // console.log('PREBODY: ', obj);
                        _this.feedlist.push(new _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_1__["FeedFormModel"](obj));
                        // Populate array full of id's of questions currently shown on feed
                        // Sending this to the backend so it can skip over these when fetching for more questions
                        _this.formids.push(obj.id);
                    }
                }
                if (_this.feedlist.length == 0) {
                    _this.emptyMessage = 'No questions have been asked yet';
                    _this.showLoadingBoxes = false;
                }
            }
        })
            .catch(function (error) { return console.log('Error retrieving form: ' + error); });
    };
    FeedListComponent.prototype.getTopPost = function () {
        var _this = this;
        var route = "/forms/topSurvey";
        var requestBody = {
            topsurvey: this.formselected,
        };
        this.http
            .post(route, requestBody)
            .toPromise()
            .then(function (res) {
            if (res.json().status == 1) {
                // add to list
                // remove current top survey
                var removedPost = _this.feedlist.shift();
                if (removedPost) {
                    var rmvIndex = _this.formids.indexOf(removedPost.id);
                    _this.formids.splice(rmvIndex, 1);
                }
                // Add new top survey
                _this.feedlist.unshift(new _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_1__["FeedFormModel"](res.json().formdata));
                _this.formids.push(_this.formselected);
                console.log(_this.formids.length);
            }
        })
            .catch(function (error) { return console.log('Error retrieving form: ' + error); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedListComponent.prototype, "user", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedListComponent.prototype, "comm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedListComponent.prototype, "pic", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeedListComponent.prototype, "emptyMessage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedListComponent.prototype, "pictype", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedListComponent.prototype, "tag", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FeedListComponent.prototype, "pref", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FeedListComponent.prototype, "showAnsweredQuestions", void 0);
    FeedListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feed-list',
            template: __webpack_require__(/*! ./feed-list.component.html */ "./src/app/feed-list/feed-list.component.html"),
            styles: [__webpack_require__(/*! ./feed-list.component.scss */ "./src/app/feed-list/feed-list.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], FeedListComponent);
    return FeedListComponent;
}());



/***/ }),

/***/ "./src/app/feed-page/feed-page.component.html":
/*!****************************************************!*\
  !*** ./src/app/feed-page/feed-page.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pageLayout\">\n\n  <div class=\"row\">\n      <button *ngIf=\"loggedin\" style=\"font-family: Karla\" class=\"btn btn-outline-success\" id=\"askBtn\" routerLink=\"/createForm\" (click)=\"askQuestion()\">Ask a Question</button>\n  </div>\n\n  <div class=\"row\">\n\n      <div class=\"col-md-3 col-sm-12 col-12 order-1 order-md-1\">\n          <app-sidebar [loggedin]=\"loggedin\" [context]=\"'feed'\"></app-sidebar>\n      </div>\n\n    <div class=\"col-md-6 col-12 order-3 order-md-2\">\n        <br>\n        <div class=\"statusMessage bad\" *ngIf=\"emailconfirmfailed\">Validation of your email address failed. Please try again later.</div>\n        <div class=\"statusMessage\" *ngIf=\"emailconfirmok\">Your email address was confirmed! Many thanks for joining Questionsly!</div>\n        <div class=\"card-body btn-success\" *ngIf=\"completedform\">Many thanks for completing a form on Questionsly!</div>\n        <app-feed-list\n            [pic]=\"pic\"\n            [pictype]=\"pictype\"\n            [user]=\"null\"\n            [tag]=\"tag\"><!-- pref not specified!-->\n        </app-feed-list>\n    </div>\n\n      <div class=\"col-md-3 col-12 order-2 order-md-3\" id=\"rightSideOfContainer\">\n          <app-right-panel [loggedin]=\"loggedin\" (toggledTag)=\"setTag($event)\"></app-right-panel>\n      </div>\n\n  </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/feed-page/feed-page.component.scss":
/*!****************************************************!*\
  !*** ./src/app/feed-page/feed-page.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#FeedContainer {\n  background-color: #fff;\n  min-height: 100%;\n  padding-top: 20px;\n  overflow: auto;\n  margin-top: 30px; }\n\n#topJumbo {\n  border: 10px;\n  background: #F6F6F6; }\n\n#askBtn {\n  display: block;\n  margin: 0px auto;\n  margin-top: 15px;\n  min-width: 250px;\n  padding: 4px 10px;\n  font-size: 1.2rem;\n  font-weight: 400;\n  color: white;\n  background-color: #28ab64;\n  border-radius: 10px; }\n\n#askBtn:hover {\n    background-color: #36d07d; }\n\n@media (max-width: 767px) {\n    #askBtn {\n      margin-top: 16px; } }\n\n.statusMessage {\n  width: 100%;\n  color: white;\n  text-align: center;\n  font-size: .7rem;\n  padding: 15px 40px;\n  border-radius: 8px;\n  background: #47d487;\n  margin-bottom: 18px;\n  margin-top: -8px; }\n\n.statusMessage.bad {\n    background: #d74a4a; }\n"

/***/ }),

/***/ "./src/app/feed-page/feed-page.component.ts":
/*!**************************************************!*\
  !*** ./src/app/feed-page/feed-page.component.ts ***!
  \**************************************************/
/*! exports provided: FeedPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedPageComponent", function() { return FeedPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FeedPageComponent = /** @class */ (function () {
    function FeedPageComponent(http, userService, route) {
        this.http = http;
        this.userService = userService;
        this.route = route;
        this.loggedin = false;
        this.fbid = false;
        this.firstname = null;
        this.dbid = null;
        this.emailconfirmfailed = false;
        this.emailconfirmok = false;
        this.completedform = false;
    }
    FeedPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.startingTime = Date.now();
        var startingTime = this.startingTime;
        window.mixpanel.track('Feed Start', {
            'timestamp': Date.now()
        });
        window.addEventListener('beforeunload', function (event) {
            var amountScrolled = window.scrollY;
            window.mixpanel.track('Feed End', {
                'timeSpentOnFeed': (Date.now() - startingTime) / 1000,
                'scrolled': amountScrolled,
                'timestamp': Date.now()
            });
        });
        this.tag = null;
        this.userService.afterLoginCheck().then(function (userData) {
            if (userData != 0) {
                _this.loggedin = true;
                _this.fbid = userData.fbid;
                _this.dbid = userData.dbid;
                _this.firstname = userData.firstname;
                _this.picdata = userData.picdata;
                _this.gender = userData.gender;
                // deal with picture
                if (_this.fbid != null) {
                    _this.pic = _this.fbid;
                    _this.pictype = 'fb';
                }
                else {
                    if (_this.picdata != null) {
                        _this.pictype = 'local';
                        _this.pic = _this.picdata;
                    }
                    else {
                        if (_this.gender) {
                            if (_this.gender == 'male') {
                                _this.pictype = 'default-male';
                            }
                            else {
                                _this.pictype = 'default-female';
                            }
                        }
                    }
                }
                var commid = localStorage.getItem('comm');
                if (commid) {
                    _this.http.post('/group/accept', { commid: commid }).toPromise()
                        .then(function (response) {
                        localStorage.removeItem('comm');
                        localStorage.removeItem('commVerification');
                    })
                        .catch(function (error) { return function () { }; });
                }
            }
            else {
                _this.loggedin = false;
            }
        });
        this.route.queryParams.subscribe(function (params) {
            if (params.message) {
                if (params.message == 'emailconfirmfailed') {
                    _this.emailconfirmfailed = true;
                }
                else if (params.message == 'emailconfirmok') {
                    _this.emailconfirmok = true;
                }
                else if (params.message == 'completedform') {
                    _this.completedform = true;
                }
            }
        });
    };
    FeedPageComponent.prototype.ngOnDestroy = function () {
        var amountScrolled = window.scrollY;
        var startingTime = this.startingTime;
        window.mixpanel.track('Feed End', {
            'timeSpentOnFeed': (Date.now() - startingTime) / 1000,
            'scrolled': amountScrolled,
            'timestamp': Date.now()
        });
    };
    FeedPageComponent.prototype.setTag = function (tag) {
        this.tag = tag;
    };
    FeedPageComponent.prototype.askQuestion = function () {
        var startingTime = this.startingTime;
        window.mixpanel.track('Clicked Ask Question', {
            'timeSpentOnFeed': (Date.now() - startingTime) / 1000,
            'timestamp': Date.now()
        });
    };
    FeedPageComponent.prototype.sendFix = function () {
        this.http.post('/events/sendfix', {}).toPromise()
            .then(function (response) {
        })
            .catch(function (error) { return function () { }; });
    };
    FeedPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feed-page',
            template: __webpack_require__(/*! ./feed-page.component.html */ "./src/app/feed-page/feed-page.component.html"),
            styles: [__webpack_require__(/*! ./feed-page.component.scss */ "./src/app/feed-page/feed-page.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], FeedPageComponent);
    return FeedPageComponent;
}());



/***/ }),

/***/ "./src/app/feedback/feedback.component.html":
/*!**************************************************!*\
  !*** ./src/app/feedback/feedback.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container main-container\" id=\"tagsListComponent\">\n    <div class=\"secondary-container\">\n        <h5 class=\"title\">Feedback</h5>\n\n        <form [formGroup]=\"formfeedback\" *ngIf=\"!submitted\">\n            <div class=\"textarea-btn-holder form-group form-group-replace\">\n                <textarea rows=\"10\" class=\"form-control text-comment\" placeholder=\"This is a beta release release. Please, help us improve your experience, by reporting any bugs here :)\"\n                          formControlName=\"feedback\" [ngClass]=\"{'form-control': true, 'is-invalid': formfeedback.get('feedback').invalid && formfeedback.get('feedback').touched}\">\n                </textarea>\n                <div *ngIf=\"formfeedback.get('feedback').invalid && formfeedback.get('feedback').touched\" class=\"invalid-feedback\">\n                    Please provide a longer message!\n                </div>\n            </div>\n            <button id=\"formSubmitButton\"\n                    class=\"d-flex justify-content-center btn btn-outline-primary mouseChangeToHand\"\n                    [disabled]=\"formfeedback.get('feedback').invalid && formfeedback.get('feedback').touched || !formfeedback.get('feedback').touched\"\n                    (click)=\"checkSubmit()\">\n                Submit!\n            </button>\n        </form>\n\n        <div>\n            <div *ngIf=\"submissionfailed\">Failure: please try again!</div>\n            <div *ngIf=\"submissionthanks\">Thank you for your feedback!</div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/feedback/feedback.component.scss":
/*!**************************************************!*\
  !*** ./src/app/feedback/feedback.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/feedback/feedback.component.ts":
/*!************************************************!*\
  !*** ./src/app/feedback/feedback.component.ts ***!
  \************************************************/
/*! exports provided: FeedbackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackComponent", function() { return FeedbackComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedbackComponent = /** @class */ (function () {
    function FeedbackComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.submissionfailed = false;
        this.submissionthanks = false;
        this.submitted = false;
    }
    FeedbackComponent.prototype.ngOnInit = function () {
    };
    FeedbackComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feedback-form',
            template: __webpack_require__(/*! ./feedback.component.html */ "./src/app/feedback/feedback.component.html"),
            styles: [__webpack_require__(/*! ./feedback.component.scss */ "./src/app/feedback/feedback.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], FeedbackComponent);
    return FeedbackComponent;
}());



/***/ }),

/***/ "./src/app/form-button/form-button.component.html":
/*!********************************************************!*\
  !*** ./src/app/form-button/form-button.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"choiceContainer\"><p class=\"choice\" [ngClass]=\"{selected: qKind === active}\" (click)=\"toggle(qKind)\" >{{qKind}}</p></div>\n"

/***/ }),

/***/ "./src/app/form-button/form-button.component.scss":
/*!********************************************************!*\
  !*** ./src/app/form-button/form-button.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".choice {\n  min-width: 100px;\n  width: auto;\n  font-size: 1rem;\n  font-weight: 300;\n  font-family: Karla;\n  display: block;\n  margin: 2px 5px;\n  padding: 4px 8px;\n  text-align: center; }\n  .choice:hover {\n    cursor: pointer;\n    color: #28ab64; }\n  .selected {\n  color: #28ab64;\n  font-weight: 700; }\n  .center {\n  display: flex;\n  justify-content: space-around; }\n  @media (max-width: 767px) {\n  .choiceContainer {\n    width: 100%;\n    margin: 4px 0; } }\n"

/***/ }),

/***/ "./src/app/form-button/form-button.component.ts":
/*!******************************************************!*\
  !*** ./src/app/form-button/form-button.component.ts ***!
  \******************************************************/
/*! exports provided: FormButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormButtonComponent", function() { return FormButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormButtonComponent = /** @class */ (function () {
    function FormButtonComponent() {
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    FormButtonComponent_1 = FormButtonComponent;
    FormButtonComponent.prototype.writeValue = function (value) { };
    FormButtonComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    FormButtonComponent.prototype.registerOnTouched = function () { };
    FormButtonComponent.prototype.toggle = function (newType) {
        this.selected.emit(this.qKind);
        this._onChange(newType);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FormButtonComponent.prototype, "qKind", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FormButtonComponent.prototype, "active", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], FormButtonComponent.prototype, "selected", void 0);
    FormButtonComponent = FormButtonComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-form-buttons',
            template: __webpack_require__(/*! ./form-button.component.html */ "./src/app/form-button/form-button.component.html"),
            styles: [__webpack_require__(/*! ./form-button.component.scss */ "./src/app/form-button/form-button.component.scss")],
            providers: [{ provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"], multi: true, useExisting: FormButtonComponent_1 }]
        }),
        __metadata("design:paramtypes", [])
    ], FormButtonComponent);
    return FormButtonComponent;
    var FormButtonComponent_1;
}());



/***/ }),

/***/ "./src/app/form.service.ts":
/*!*********************************!*\
  !*** ./src/app/form.service.ts ***!
  \*********************************/
/*! exports provided: FormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormService", function() { return FormService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngforage */ "./node_modules/ngforage/esm5/ngforage.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var data = null;
var FormService = /** @class */ (function () {
    function FormService(ngf) {
        this.ngf = ngf;
    }
    FormService.prototype.getData = function () {
        return data;
    };
    FormService.prototype.setData = function (received) {
        data = received;
    };
    FormService.prototype.getPersistedData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ngf.getItem('form')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    FormService.prototype.setPersistedData = function (received) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ngf.setItem('form', received)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FormService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [ngforage__WEBPACK_IMPORTED_MODULE_1__["NgForage"]])
    ], FormService);
    return FormService;
}());



/***/ }),

/***/ "./src/app/home-page/home-page.component.html":
/*!****************************************************!*\
  !*** ./src/app/home-page/home-page.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-landing-page *ngIf=\"!isLoggedIn\"></app-landing-page>\n\n<app-new-feed-page *ngIf=\"isLoggedIn\" [viewGroupId]=\"viewGroupId\" [viewFilter]=\"viewFilter\"></app-new-feed-page>\n"

/***/ }),

/***/ "./src/app/home-page/home-page.component.ts":
/*!**************************************************!*\
  !*** ./src/app/home-page/home-page.component.ts ***!
  \**************************************************/
/*! exports provided: HomePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageComponent", function() { return HomePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(userService, route) {
        this.userService = userService;
        this.route = route;
        this.viewGroupId = '';
        this.viewFilter = '';
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoggedIn = this.userService.getUser() !== 0;
        this.route.queryParams.subscribe(function (params) {
            _this.viewGroupId = params.group;
            _this.viewFilter = params.filter;
        });
    };
    HomePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home-page',
            template: __webpack_require__(/*! ./home-page.component.html */ "./src/app/home-page/home-page.component.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], HomePageComponent);
    return HomePageComponent;
}());



/***/ }),

/***/ "./src/app/image-editor/image-editor.component.html":
/*!**********************************************************!*\
  !*** ./src/app/image-editor/image-editor.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Crop your image</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n        <span aria-hidden=\"true\" style=\"font-size:30px;\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <div id=\"cropper-cover\" [ngClass]=\"{'img-loaded': imgLoaded}\"></div>\n        <div id=\"cropper-wrapper\" [ngClass]=\"{'img-loaded': imgLoaded}\">\n        <image-cropper\n            [imageChangedEvent]=\"imgChangedEvent\"\n            [maintainAspectRatio]=\"true\"\n            [aspectRatio]=\"1 / 1\"\n            [resizeToWidth]=\"80\"\n            format=\"png\"\n            (imageCropped)=\"cropped = $event\"\n            (imageLoaded)=\"onImgLoaded()\"\n        ></image-cropper>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"c(true)\">Done</button>\n    </div>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/image-editor/image-editor.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/image-editor/image-editor.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-body {\n  position: relative;\n  background-color: #ddd; }\n\n#cropper-wrapper {\n  width: 100%;\n  margin-left: 999999; }\n\n#cropper-wrapper.img-loaded {\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    margin: 0 auto; }\n"

/***/ }),

/***/ "./src/app/image-editor/image-editor.component.ts":
/*!********************************************************!*\
  !*** ./src/app/image-editor/image-editor.component.ts ***!
  \********************************************************/
/*! exports provided: ImageEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageEditorComponent", function() { return ImageEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/ngx-image-cropper.es5.js");
/* harmony import */ var b64_to_blob__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! b64-to-blob */ "./node_modules/b64-to-blob/b64toBlob.js");
/* harmony import */ var b64_to_blob__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(b64_to_blob__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_library_web_timers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/library/web/timers */ "./node_modules/core-js/library/web/timers.js");
/* harmony import */ var core_js_library_web_timers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_library_web_timers__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ImageEditorComponent = /** @class */ (function () {
    function ImageEditorComponent(modalService) {
        this.modalService = modalService;
        this.done = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.imgLoaded = false;
    }
    ImageEditorComponent.prototype.open = function () {
        var _this = this;
        this.modalService.open(this.content).result.then(function (result) {
            _this.imgLoaded = false;
            var data = _this.cropped.substring(_this.cropped.indexOf(";base64,") + 8);
            var type = _this.cropped.substring(_this.cropped.indexOf("data:") + 5, _this.cropped.indexOf(";base64,"));
            var file = b64_to_blob__WEBPACK_IMPORTED_MODULE_3__(data, type);
            file.name = _this.imgChangedEvent.target.files[0].name;
            _this.done.emit(file);
        }, function (reason) {
            _this.imgLoaded = false;
            _this.done.emit(_this.imgChangedEvent.target.files[0]);
        });
    };
    ImageEditorComponent.prototype.onImgLoaded = function () {
        var _this = this;
        Object(core_js_library_web_timers__WEBPACK_IMPORTED_MODULE_4__["setTimeout"])(function () { return _this.imgLoaded = true; }, 500);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ImageEditorComponent.prototype, "imgChangedEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ImageEditorComponent.prototype, "done", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('content'),
        __metadata("design:type", Object)
    ], ImageEditorComponent.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ngx_image_cropper__WEBPACK_IMPORTED_MODULE_2__["ImageCropperComponent"]),
        __metadata("design:type", Object)
    ], ImageEditorComponent.prototype, "cropper", void 0);
    ImageEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-image-editor',
            template: __webpack_require__(/*! ./image-editor.component.html */ "./src/app/image-editor/image-editor.component.html"),
            styles: [__webpack_require__(/*! ./image-editor.component.scss */ "./src/app/image-editor/image-editor.component.scss")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], ImageEditorComponent);
    return ImageEditorComponent;
}());



/***/ }),

/***/ "./src/app/landing-page/landing-page.component.html":
/*!**********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"full-width\">\n  <div class=\"container\">\n    <nav>\n      <!-- <img src=\"https://www.questionsly.com/images/logo.png\" height=\"60px\"> -->\n    <a [routerLink]=\"['/']\" class=\"logo-text\">Questionsly</a>\n      <a class=\"nav-tab\" [routerLink]=\"['/sign-in']\">Login</a>\n    </nav>\n  </div>\n    <div class=\"container content\">\n        <div class=\"col-50\">\n            <h1>Better Data,<br/>Better Decisions.</h1>\n            <h4>Bring your organization together to make better decisions, faster..</h4>\n            <!-- <h2>It's easy to get started!\n            <br/>Just sign in with your organization's email.</h2> -->\n            <form [formGroup]=\"getStartedForm\">\n                <div class=\"flex\">\n                    <input type='email' class=\"email-input\" placeholder=\"johndoe@anderson.ucla.edu\" formControlName=\"email\">\n                    <button class=\"cta-btn\" (click)=\"getStartedItsFree()\">Log into your org</button>\n                </div>\n            </form>\n        </div>\n        <div class=\"col-50 mobileFirst\">\n            <img class=\"hero-img\" src=\"/assets/images/school.png\">\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/landing-page/landing-page.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1 {\n  font-size: 60px;\n  font-weight: 700;\n  font-family: \"Playfair Display\";\n  color: #152c48;\n  margin-bottom: 26px;\n  line-height: 1; }\n  @media (max-width: 768px) {\n    h1 {\n      font-size: 40px;\n      margin-bottom: 12px; } }\n  nav {\n  width: 100%;\n  height: 80px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center; }\n  nav a {\n    color: #28ab64;\n    font-size: 1rem;\n    cursor: pointer; }\n  @media (max-width: 768px) {\n    nav {\n      height: 40px;\n      margin-top: 8px; } }\n  h4 {\n  margin-bottom: 24px;\n  font-family: \"Montserrat\";\n  font-size: 20px;\n  font-weight: 600;\n  color: #7d8f9d;\n  line-height: 32px; }\n  @media (max-width: 768px) {\n    h4 {\n      font-size: 16px;\n      margin-bottom: 12px;\n      line-height: 20px; } }\n  h2 {\n  font-size: 1.2rem;\n  color: #333333;\n  line-height: 1.4;\n  margin-left: 8px;\n  margin-bottom: 0; }\n  img {\n  width: 100%; }\n  .nav-tab {\n  font-size: 1.2rem;\n  color: #28ab64;\n  font-family: \"Montserrat\";\n  font-weight: 600; }\n  .full-width {\n  width: 100%;\n  height: 100vh;\n  background: #FFFFFF;\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  .container {\n  max-width: 1200px;\n  display: flex;\n  justify-content: center;\n  flex-wrap: nowrap; }\n  @media (max-width: 768px) {\n    .container {\n      flex-wrap: wrap; }\n      .container.content {\n        margin-top: 48px; } }\n  .col-50 {\n  width: 50%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 100px 0; }\n  @media (max-width: 768px) {\n    .col-50 {\n      width: 100%;\n      padding: 16px 0; }\n      .col-50.mobileFirst {\n        align-items: center;\n        order: -1; } }\n  .hero-img {\n  width: 100%; }\n  @media (max-width: 768px) {\n    .hero-img {\n      width: 80%; } }\n  .logo-text {\n  font-size: 1.6rem;\n  letter-spacing: .045rem;\n  font-weight: 400;\n  font-family: \"Montserrat\";\n  color: #28ab64;\n  margin: 0; }\n  .email-input {\n  width: 100%;\n  font-size: .9rem;\n  color: #333333;\n  outline: none;\n  padding: .8rem 0;\n  padding-left: 20px !important;\n  margin-right: 20px;\n  border: solid 2px #dfe5e9; }\n  .email-input:hover {\n    border-color: #28ab64;\n    transition: all 300ms ease-in-out; }\n  .email-input:focus {\n    border-color: #28ab64; }\n  .email-input:blur {\n    border-color: #dfe5e9; }\n  @media (max-width: 768px) {\n    .email-input {\n      margin-right: 0;\n      margin-bottom: 12px; } }\n  .cta-btn {\n  background: #28ab64;\n  color: #FFFFFF;\n  font-family: \"Montserrat\";\n  font-size: 12px;\n  font-weight: 600;\n  padding: 0;\n  border-radius: 4px;\n  border: 1px solid transparent;\n  line-height: 52px;\n  width: 60%;\n  outline: none;\n  cursor: pointer; }\n  .cta-btn:hover {\n    background: transparent;\n    border-color: #28ab64;\n    color: #28ab64;\n    transition: all 300ms ease-in-out; }\n  ::-webkit-input-placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  :-ms-input-placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  ::-ms-input-placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  ::placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  @media (max-width: 768px) {\n    ::-webkit-input-placeholder {\n      font-size: 16px; }\n    :-ms-input-placeholder {\n      font-size: 16px; }\n    ::-ms-input-placeholder {\n      font-size: 16px; }\n    ::placeholder {\n      font-size: 16px; } }\n  .flex {\n  display: flex;\n  margin-top: .9rem;\n  width: 100%; }\n  @media (max-width: 768px) {\n    .flex {\n      flex-wrap: wrap;\n      margin-bottom: 12px;\n      justify-content: center; } }\n"

/***/ }),

/***/ "./src/app/landing-page/landing-page.component.ts":
/*!********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.ts ***!
  \********************************************************/
/*! exports provided: LandingPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPageComponent", function() { return LandingPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LandingPageComponent = /** @class */ (function () {
    function LandingPageComponent(router, fb, cookieService) {
        this.router = router;
        this.fb = fb;
        this.cookieService = cookieService;
    }
    LandingPageComponent.prototype.ngOnInit = function () {
        this.getStartedForm = this.fb.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email],
        });
    };
    LandingPageComponent.prototype.getStartedItsFree = function () {
        // Set the cookie and go to sign-in page, even if the email address is not given or is invalid.
        // This should be nicer than showing the user a red error message.
        if (this.getStartedForm.invalid) {
            this.cookieService.set('sign-in-email', '');
        }
        else {
            this.cookieService.set('sign-in-email', this.getStartedForm.controls['email'].value);
        }
        this.router.navigate(['/sign-in']);
    };
    LandingPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-landing-page',
            template: __webpack_require__(/*! ./landing-page.component.html */ "./src/app/landing-page/landing-page.component.html"),
            styles: [__webpack_require__(/*! ./landing-page.component.scss */ "./src/app/landing-page/landing-page.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], LandingPageComponent);
    return LandingPageComponent;
}());



/***/ }),

/***/ "./src/app/login-popup/login-popup.component.html":
/*!********************************************************!*\
  !*** ./src/app/login-popup/login-popup.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Not Logged In</h4>\n    </div>\n    <div class=\"modal-body\">\n        <div>Please log in to continue.</div>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" routerLink=\"/users/login\" (click)=\"c(true)\">Log In</button>\n    </div>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/login-popup/login-popup.component.scss":
/*!********************************************************!*\
  !*** ./src/app/login-popup/login-popup.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-header, .modal-footer {\n  padding: 6px 15px; }\n\n.modal-body {\n  padding: 18px 15px; }\n\n.modal-title, .modal-footer button {\n  font-size: 16px; }\n\n.modal-header {\n  background-color: #1E824C; }\n\n.modal-header .modal-title {\n    font-weight: bold;\n    color: #fff;\n    font-size: 18px; }\n\n.modal-footer {\n  background-color: #eee;\n  border-top: 2px solid #ddd; }\n\n.modal-footer button {\n    padding: 5px 10px;\n    font-weight: bold;\n    font-size: 15px; }\n"

/***/ }),

/***/ "./src/app/login-popup/login-popup.component.ts":
/*!******************************************************!*\
  !*** ./src/app/login-popup/login-popup.component.ts ***!
  \******************************************************/
/*! exports provided: LoginPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPopupComponent", function() { return LoginPopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginPopupComponent = /** @class */ (function () {
    function LoginPopupComponent(modalService, userService) {
        this.modalService = modalService;
        this.userService = userService;
    }
    LoginPopupComponent.prototype.open = function () {
        this.modalService.open(this.content);
    };
    LoginPopupComponent.prototype.check = function (loginRequired) {
        var _this = this;
        if (loginRequired === true) {
            this.userService.afterLoginCheck().then(function (response) {
                if (response === 0) {
                    _this.open();
                }
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('content'),
        __metadata("design:type", Object)
    ], LoginPopupComponent.prototype, "content", void 0);
    LoginPopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login-popup',
            template: __webpack_require__(/*! ./login-popup.component.html */ "./src/app/login-popup/login-popup.component.html"),
            styles: [__webpack_require__(/*! ./login-popup.component.scss */ "./src/app/login-popup/login-popup.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
            _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], LoginPopupComponent);
    return LoginPopupComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" id=\"mainLoginPageContainer\">\n    <div class=\"row\">\n        <div class=\"col-sm-5\">\n\n            <div class=\"login-box\">\n                <div class=\"top clearfix\">\n                    <div class=\"left\">\n                        <h5 class=\"title\">Login</h5>\n                    </div>\n                </div>\n                <div class=\"bottom\">\n                    <form [formGroup]=\"login\">\n                        <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"!status\">\n                            <p>LOGIN FAILED: Please confirm password and/or e-mail address for accuracy.</p>\n                        </div>\n                        <div class=\"form-group\">\n                            <input type=\"text\" class=\"form-control\"\n                                formControlName=\"email\"\n                                placeholder=\"e-mail address...\"\n                                [ngClass]=\"{'form-control': true, 'is-invalid': login.get('email').invalid && login.get('email').touched}\">\n                            <div *ngIf=\"login.get('email').invalid && login.get('email').touched\" class=\"invalid-feedback\">\n                                E-mail address is required\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <input type=\"password\" class=\"form-control\"\n                                formControlName=\"password\"\n                                placeholder=\"Password...\"\n                                [ngClass]=\"{'form-control': true, 'is-invalid': login.get('password').invalid && login.get('password').touched}\">\n                            <div *ngIf=\"login.get('password').invalid && login.get('password').touched\" class=\"invalid-feedback\">\n                                Password is required\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <p style=\"font-size: .7rem;\">By using this service you agree to our<a href=\"/tos\" target=\"_blank\" style=\"font-size: .7rem; color: #666\">Terms of Service</a> & <a href=\"/privacy\" target=\"_blank\" style=\"font-size: .7rem; color: #666\">Privacy Policy</a>.</p>\n                        </div>\n                        <div>\n                            <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"login.invalid\" (click)=\"checkSubmit(login, 'login')\">Sign in!</button>\n                            <button type=\"button\" class=\"btn\" style=\"background-color: #CCC\" (click)=\"showForgotPwd = true\">Forgot password?</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n\n            <div class=\"login-box\" *ngIf=\"showForgotPwd\">\n                <div class=\"top clearfix\">\n                    <div class=\"left\">\n                        <h5 class=\"title\">Password Reset</h5>\n                        <p>Enter your email address to get password reset instructions:</p>\n                    </div>\n                </div>\n                <div class=\"bottom\">\n                    <form [formGroup]=\"pwdReset\">\n                        <div class=\"form-group\">\n                            <input\n                                *ngIf=\"!statusresetok\"\n                                formControlName=\"email\"\n                                placeholder=\"Email...\"\n                                type=\"email\"\n                                [ngClass]=\"{'form-control': true, 'is-invalid': pwdReset.get('email').invalid && pwdReset.get('email').touched}\">\n                            <div *ngIf=\"pwdReset.get('email').invalid && pwdReset.get('email').touched\" class=\"invalid-feedback\">\n                                Email is required\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col text-center submitted-message\" *ngIf=\"statusresetok\" >\n                                <p class=\"alert alert-success\">A new password was sent to your email address!</p>\n                            </div>\n                            <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"statusresetfailed\">\n                                <p>Reset failed!</p>\n                            </div>\n                        </div>\n                        <button *ngIf=\"!statusresetok && !statusresetfailed\" type=\"submit\" class=\"btn btn-success\" [disabled]=\"pwdReset.invalid && pwdReset.wasChecked\" (click)=\"checkSubmit(pwdReset, 'pwdReset')\">Submit</button>\n                    </form>\n                </div>\n            </div>\n\n\n            <div class=\"row\" style=\"margin-top: 20px\">\n                <div id=\"loginPageSocial\" class=\"text-center\">\n                    <div class=\"social-wrap a\">\n                        <a href=\"\\users\\login\\facebook\">\n                            <button id=\"facebook\">Sign in with Facebook</button>\n                        </a>\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n        <div class=\"col-sm-1 align-self-start\" id=\"separator-middle\"></div>\n        <div class=\"col-sm-1\"></div>\n        <div class=\"col-sm-5\">\n            <div class=\"login-box\">\n                <div class=\"top clearfix\">\n                    <div class=\"left\">\n                        <h5 class=\"title\">Sign Up!</h5>\n                    </div>\n                </div>\n                <div class=\"bottom\">\n                    <div *ngIf=\"!signupcompleted && !signupfailed\">\n                        <form [formGroup]=\"signup\">\n                            <!--name-->\n                            <div class=\"form-row form-group\" formGroupName=\"name\">\n                                <div class=\" col-sm-6\">\n                                    <input formControlName=\"firstname\" [ngClass]=\"{'form-control': true, 'is-invalid': signup.get('name').get('firstname').invalid && signup.get('name').get('firstname').touched}\" type=\"text\" placeholder=\"First Name\">\n                                    <div *ngIf=\"signup.get('name').get('firstname').invalid && signup.get('name').get('firstname').touched\" class=\"invalid-feedback\">\n                                        First name must be at least 2 letters long\n                                    </div>\n                                </div>\n                                <div class=\" col-sm-6\">\n                                    <input formControlName=\"lastname\" [ngClass]=\"{'form-control': true, 'is-invalid': signup.get('name').get('lastname').invalid && signup.get('name').get('lastname').touched}\" type=\"text\" placeholder=\"Last Name\">\n                                    <div *ngIf=\"signup.get('name').get('lastname').invalid && signup.get('name').get('lastname').touched\" class=\"invalid-feedback\">\n                                        Last name must be at least 2 letters long\n                                    </div>\n                                </div>\n                            </div>\n\n                            <!--email-->\n                            <div class=\"form-row form-group\">\n                                <div class=\"col-sm-6\">\n                                    <input formControlName=\"email\" [ngClass]=\"{'form-control': true, 'is-invalid': signup.get('email').invalid && signup.get('email').touched}\" type=\"email\" name=\"\" placeholder=\"Email\">\n                                    <div *ngIf=\"signup.get('email').invalid && signup.get('email').touched\" class=\"invalid-feedback\">\n                                        Email is required\n                                    </div>\n                                </div>\n\n                                <!--password-->\n                                <div class=\"col-sm-6\">\n                                    <input formControlName=\"password\"\n                                            [ngClass]=\"{'form-control': true, 'is-invalid': signup.get('password').invalid && signup.get('password').touched}\" type=\"password\" placeholder=\"Password\">\n                                    <div *ngIf=\"signup.get('password').invalid && signup.get('password').touched\" class=\"invalid-feedback\">\n                                        Password is required\n                                    </div>\n                                </div>\n\n                            </div>\n\n                            <!--profile picture-->\n                            <div class=\"form-group\">\n                                <div class=\"input-group image-preview\">\n                                    <input type=\"text\" [value]=\"profilePic ? profilePic.name : ''\" class=\"form-control image-preview-filename\" placeholder=\"Upload Profile Picture (Optional)\" disabled=\"disabled\">\n                                    <span class=\"input-group-btn\">\n                                    <div class=\"btn btn-default image-preview-input\">\n                                        <span><i class=\"fa fa-folder-open\" aria-hidden=\"true\"></i></span>\n                                        <span class=\"image-preview-input-title\">Browse</span>\n                                        <input (change)=\"onProfilePicChange($event)\" type=\"file\" accept=\"image/png, image/jpeg, image/gif\" name=\"input-file-preview\"/>\n                                    </div>\n                                </span>\n                                </div>\n                            </div>\n                            <div>\n                                <img style=\"border:1px solid gray;width:100px;\"  id=\"preview\" [src]=\"profilePicURL\" *ngIf=\"profilePicURL\">\n                            </div>\n\n                            <!--gender-->\n                            <div class=\"form-group\">\n                                <div class=\"row\" style=\"padding-left: 10px;\">\n                                    <div class=\"col-sm-3\">\n                                        <label class=\"form-check-label\">\n                                            <input formControlName=\"gender\" value=\"male\" type=\"radio\" name=\"gender\">\n                                            Male\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-3\">\n                                        <label class=\"form-check-label\">\n                                            <input formControlName=\"gender\" value=\"female\" type=\"radio\" name=\"gender\">\n                                            Female\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <!--dob-->\n                            <div class=\"form-group\" formGroupName=\"dob\">\n                                <div class=\"row\" style=\"padding-left: 10px\">\n                                    <label  class=\"col-form-legend col-sm-2\">DOB</label>\n                                    <div class=\"col-sm-10\">\n                                        <div class=\"form-inline\">\n                                            <select formControlName=\"month\" style=\"margin-right: 6px\" [ngClass]=\"{'form-control': true, 'is-invalid': signup.get('dob').get('month').invalid && signup.get('dob').get('month').touched}\"\n                                                placeholder=\"Current City\">\n                                                <option selected disabled value=\"\">Month</option>\n                                                <option value=\"0\">Jan</option>\n                                                <option value=\"1\">Feb</option>\n                                                <option value=\"2\">Mar</option>\n                                                <option value=\"3\">Apr</option>\n                                                <option value=\"4\">May</option>\n                                                <option value=\"5\">Jun</option>\n                                                <option value=\"6\">Jul</option>\n                                                <option value=\"7\">Aug</option>\n                                                <option value=\"8\">Sep</option>\n                                                <option value=\"9\">Oct</option>\n                                                <option value=\"10\">Nov</option>\n                                                <option value=\"11\">Dec</option>\n                                            </select>\n                                            <select formControlName=\"date\" style=\"margin-right: 6px\"\n                                                    [ngClass]=\"{'form-control': true, 'is-invalid': signup.get('dob').get('date').invalid && signup.get('dob').get('date').touched}\" placeholder=\"Current City\">\n                                                <option selected disabled value=\"\">Date</option>\n                                                <option value=\"1\" >1 </option>\n                                                <option value=\"2\" >2 </option>\n                                                <option value=\"3\" >3 </option>\n                                                <option value=\"4\" >4 </option>\n                                                <option value=\"5\" >5 </option>\n                                                <option value=\"6\" >6 </option>\n                                                <option value=\"7\" >7 </option>\n                                                <option value=\"8\" >8 </option>\n                                                <option value=\"9\" >9 </option>\n                                                <option value=\"10\" >10 </option>\n                                                <option value=\"11\" >11 </option>\n                                                <option value=\"12\" >12 </option>\n                                                <option value=\"13\" >13 </option>\n                                                <option value=\"14\" >14 </option>\n                                                <option value=\"15\" >15 </option>\n                                                <option value=\"16\" >16 </option>\n                                                <option value=\"17\" >17 </option>\n                                                <option value=\"18\" >18 </option>\n                                                <option value=\"19\" >19 </option>\n                                                <option value=\"20\" >20 </option>\n                                                <option value=\"21\" >21 </option>\n                                                <option value=\"22\" >22 </option>\n                                                <option value=\"23\" >23 </option>\n                                                <option value=\"24\" >24 </option>\n                                                <option value=\"25\" >25 </option>\n                                                <option value=\"26\" >26 </option>\n                                                <option value=\"27\" >27 </option>\n                                                <option value=\"28\" >28 </option>\n                                                <option value=\"29\" >29 </option>\n                                                <option value=\"30\" >30 </option>\n                                                <option value=\"31\" >31 </option>\n                                            </select>\n                                            <select formControlName=\"year\"\n                                                    [ngClass]=\"{'form-control': true, 'is-invalid': signup.get('dob').get('year').invalid && signup.get('dob').get('year').touched}\" placeholder=\"Current City\">\n                                                <option selected disabled value=\"\">Year</option>\n                                                <option value=\"1955\" >1955</option><option value=\"1956\">1956 </option><option value=\"1957\" >1957 </option><option value=\"1958\" >1958 </option><option value=\"1959\" >1959 </option><option value=\"1960\" >1960 </option><option value=\"1961\" >1961 </option><option value=\"1962\" >1962 </option><option value=\"1963\" >1963 </option><option value=\"1964\" >1964 </option><option value=\"1965\" >1965 </option><option value=\"1966\" >1966 </option><option value=\"1967\" >1967 </option><option value=\"1968\" >1968 </option><option value=\"1969\" >1969 </option><option value=\"1970\" >1970 </option><option value=\"1971\" >1971 </option><option value=\"1972\" >1972 </option><option value=\"1973\" >1973 </option><option value=\"1974\" >1974 </option><option value=\"1975\" >1975 </option><option value=\"1976\" >1976 </option><option value=\"1977\" >1977 </option><option value=\"1978\" >1978 </option><option value=\"1979\" >1979 </option><option value=\"1980\" >1980 </option><option value=\"1981\" >1981 </option><option value=\"1982\" >1982 </option><option value=\"1983\" >1983 </option><option value=\"1984\" >1984 </option><option value=\"1985\" >1985 </option><option value=\"1986\" >1986 </option><option value=\"1987\" >1987 </option><option value=\"1988\" >1988 </option><option value=\"1989\" >1989 </option><option value=\"1990\" >1990 </option><option value=\"1991\" >1991 </option><option value=\"1992\" >1992 </option><option value=\"1993\" >1993 </option><option value=\"1994\" >1994 </option><option value=\"1995\" >1995 </option><option value=\"1996\" >1996 </option><option value=\"1997\" >1997 </option><option value=\"1998\" >1998 </option><option value=\"1999\" >1999 </option><option value=\"2000\" >2000 </option><option value=\"2001\" >2001 </option><option value=\"2002\" >2002 </option><option value=\"2003\" >2003 </option><option value=\"2004\" >2004 </option><option value=\"2005\" >2005 </option><option value=\"2006\" >2006 </option>\n                                            </select>\n                                        </div>\n                                        <div *ngIf=\"signup.get('dob').get('date').invalid && signup.get('dob').get('date').touched\" class=\"invalid-feedback\">\n                                            Date is required\n                                        </div>\n                                        <div *ngIf=\"signup.get('dob').get('month').invalid && signup.get('dob').get('month').touched\" class=\"invalid-feedback\">\n                                            Month is required\n                                        </div>\n                                        <div *ngIf=\"signup.get('dob').get('year').invalid && signup.get('dob').get('year').touched\" class=\"invalid-feedback\">\n                                            Year is required\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"form-group\">\n                                <p style=\"font-size: .7rem;\">By creating an account you agree to our <a href=\"/tos\" target=\"_blank\" style=\"font-size: .7rem; color: #666\">Terms of Service</a> & <a href=\"/privacy\" target=\"_blank\" style=\"font-size: .7rem; color: #666\">Privacy Policy</a>.</p>\n                            </div>\n\n                            <button class=\"btn btn-success\" [disabled]=\"signup.invalid && signup.wasChecked\" (click)=\"checkSubmit(signup, 'signup')\">\n                                Let's do it!\n                            </button>\n\n                        </form>\n                    </div>\n\n                    <div class=\"alert alert-info\" role=\"alert\"  *ngIf=\"signupstarted && signuppending\">\n                        <p>Processing...</p>\n                    </div>\n\n                    <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"signupstarted && signupfailed\">\n                        <p>Signup failed! Perhaps you have already signed up using this email address?</p>\n                    </div>\n\n                    <div class=\"alert alert-success\" role=\"alert\"  *ngIf=\"signupstarted && signupcompleted\">\n                        <p>Signed up! Please check your email for verification.</p>\n                    </div>\n                </div>\n\n\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(https://fonts.googleapis.com/css?family=Merriweather+Sans);\n#mainLoginPageContainer {\n  margin-top: 40px; }\n.half {\n  max-width: 450px; }\n.login-box {\n  font-weight: 300;\n  line-height: 30px;\n  font-size: 16px; }\n.login-box .top {\n    background-color: #fff;\n    padding: 0 25px 15px 25px;\n    color: #666;\n    border-radius: 4px 4px 0 0;\n    text-align: left; }\n.login-box .top .left {\n      float: left;\n      width: 77%;\n      padding-top: 25px; }\n.login-box .top .left .title {\n        color: #555;\n        font-size: 22px;\n        line-height: 30px; }\n.login-box .top .left p {\n        margin: 0 0 10px; }\n.login-box .bottom {\n    background-color: #eee;\n    padding: 25px 25px 30px 25px;\n    border-radius: 0 0 4px 4px;\n    text-align: left; }\n.login-box .bottom form {\n      margin: 0; }\n.login-box .bottom form .form-control {\n        font-size: inherit; }\n.login-box .bottom form button {\n        cursor: hand;\n        color: #fff;\n        font-size: inherit; }\n.login-box .alert {\n    margin-bottom: 0; }\n#separator-login {\n  text-align: center; }\n#separator-login hr {\n    display: inline-block;\n    width: 42%;\n    vertical-align: middle; }\n#separator-login span {\n    margin: 0 1%; }\n#loginPageSocial {\n  margin: 0 auto; }\n#loginPageSocial .social-wrap {\n    display: inline-block;\n    margin-left: 5px; }\ndiv.social-wrap button {\n  padding-right: 45px;\n  height: 35px;\n  background: none;\n  border: none;\n  display: block;\n  background-size: 35px 35px;\n  background-position: right center;\n  background-repeat: no-repeat;\n  border-radius: 4px;\n  color: white;\n  font-family: \"Merriweather Sans\", sans-serif;\n  font-size: 14px;\n  margin-bottom: 15px;\n  width: 205px;\n  border-bottom: 2px solid transparent;\n  border-left: 1px solid transparent;\n  border-right: 1px solid transparent;\n  box-shadow: 0 4px 2px -2px gray;\n  text-shadow: rgba(0, 0, 0, 0.5) -1px -1px 0; }\nbutton#facebook {\n  border-color: #2d5073;\n  background-color: #3b5998;\n  background-image: url(http://icons.iconarchive.com/icons/danleech/simple/512/facebook-icon.png);\n  cursor: hand; }\nbutton#facebook:hover, button#facebook:focus {\n  background-color: #5B7BD5;\n  background-image: linear-gradient(#5B7BD5, #4864B1); }\nbutton#google {\n  border-color: #BB3F30;\n  background-color: #DD4B39;\n  background-image: url(https://www.drupal.org/files/project-images/Google-login_0.png);\n  cursor: hand; }\nbutton#google:hover, button#google:focus {\n  background: #E74B37; }\nbutton#linkedin {\n  border-color: #007bb6;\n  background-color: #007bb6;\n  background-image: url(http://icons.iconarchive.com/icons/danleech/simple/512/linkedin-icon.png);\n  cursor: hand; }\ndiv.social-wrap button:active {\n  background-color: #222; }\n#separator-middle {\n  min-height: 300px;\n  border-right: 1px solid rgba(0, 0, 0, 0.1); }\n@media (max-width: 767px) {\n    #separator-middle {\n      min-height: auto;\n      margin: 65px 30px;\n      border-right: 0;\n      border-top: 1px solid rgba(0, 0, 0, 0.1); } }\n@media (min-width: 767px) {\n    #separator-middle {\n      top: 185px; } }\n.image-preview-input {\n  position: relative;\n  overflow: hidden;\n  margin: 0px;\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc; }\n.image-preview-input input[type=file] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 0;\n  padding: 0;\n  font-size: 20px;\n  cursor: pointer;\n  opacity: 0;\n  filter: alpha(opacity=0); }\n.image-preview-input-title {\n  margin-left: 2px; }\n.is-invalid {\n  border-color: #ea7a85; }\n.invalid-feedback {\n  color: #ea7a85;\n  display: block; }\n#forgotPwdLink {\n  margin-top: 20px;\n  height: 0; }\n.centerContent {\n  text-align: center; }\n.button {\n  font-size: inherit; }\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, http, router, userService) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.userService = userService;
        this.status = true;
        // reset
        this.showForgotPwd = false;
        this.statusresetfailed = false;
        this.statusresetok = false;
        // signup
        this.signupstarted = false;
        this.signuppending = false;
        this.signupfailed = false;
        this.signupcompleted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.login = this.fb.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.signup = this.fb.group({
            name: this.fb.group({
                firstname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
                lastname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])]
            }),
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            // city: ['', Validators.required],
            // state: ['', Validators.required],
            // country: ['United States', Validators.required],
            gender: ['female', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            dob: this.fb.group({
                date: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                month: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                year: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            }),
            schoolAffiliation: ''
        });
        this.pwdReset = this.fb.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    LoginComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    LoginComponent.prototype.checkSubmit = function (form, name) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        }
        else {
            if (name == 'signup') {
                this.submitSignup();
            }
            else if (name == 'login') {
                this.submitLogin();
            }
            else if (name == 'pwdReset') {
                this.submitPwdReset();
            }
        }
    };
    LoginComponent.prototype.onProfilePicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    LoginComponent.prototype.submitPwdReset = function () {
        var _this = this;
        var data = this.pwdReset.value;
        console.log('PwdData: ', data);
        this.http.post('/users/pwdReset', data).toPromise()
            .then(function (k) {
            if (k.json().status == 1) {
                _this.statusresetok = true;
            }
            else {
                _this.statusresetfailed = true;
                var resetField = function () { _this.statusresetfailed = false; };
                window.setTimeout(resetField, 1800);
            }
        })
            .catch(function (error) { return alert("Error submitting password reset: " + error); });
    };
    LoginComponent.prototype.submitLogin = function () {
        var _this = this;
        var data = this.login.value;
        this.http.post('/users/login/local', data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            // Handle response here
            if (data.status == 1) {
                // reload userservice
                _this.userService.acknowledgeLogin(data);
                // navigate to feed
                _this.router.navigate(['/']);
            }
            else {
                _this.status = false;
            }
        }, function (err) {
            _this.status = false;
        });
    };
    LoginComponent.prototype.submitSignup = function () {
        var _this = this;
        // status
        this.signupstarted = true;
        this.signuppending = true;
        this.signupcompleted = false;
        this.signupfailed = false;
        var commToJoinWith = localStorage.getItem("comm");
        // var commlocalStorage.getItem("commVerification");
        // data
        localStorage.removeItem("comm");
        localStorage.removeItem("commVerification");
        var signupData = Object.assign({
            profilePic: this.profilePicURL,
            commToJoinWith: commToJoinWith
        }, this.signup.value);
        this.http.post('/users/signup', signupData).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                _this.http.post('/users/login/local', { email: signupData.email, password: signupData.password })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    // Handle response here
                    if (data.status == 1) {
                        // reload userservice
                        _this.userService.acknowledgeLogin(data);
                        // navigate to feed
                        _this.router.navigate(['/'])
                            .then(function () {
                            // reload the page
                            location.reload(true);
                            // Track signup
                            window.mixpanel.track("User Signed Up", {
                                "email": signupData.email,
                                "name": signupData.name.firstname + " " + signupData.name.lastname,
                                "timestamp": Date.now()
                            });
                        });
                    }
                    else {
                        _this.status = false;
                    }
                }, function (err) {
                    _this.status = false;
                });
                // this.signupfailed = false;
                // this.signuppending = false;
                // this.signupcompleted = true;
            }
            else {
                _this.signuppending = false;
                _this.signupfailed = true;
            }
        })
            .catch(function (error) { return alert("Error posting signup data: " + error); });
    };
    // picture upload code
    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    LoginComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.profilePicURL = url;
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    LoginComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/member-list/member-list.component.html":
/*!********************************************************!*\
  !*** ./src/app/member-list/member-list.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h4 class=\"title\">Members</h4>\n\n  <div class=\"member-row\">\n    <img src=\"https://picsum.photos/32/32/?random\" class=\"member-icon\">\n    <p class=\"member-name\">{{member || \"Student Name\"}}</p>\n  </div>\n\n\n</div>"

/***/ }),

/***/ "./src/app/member-list/member-list.component.scss":
/*!********************************************************!*\
  !*** ./src/app/member-list/member-list.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  display: flex;\n  flex-direction: column;\n  width: 240px;\n  background: white;\n  border: 1px solid #EFEFEF;\n  border-radius: 4px;\n  padding-bottom: 24px;\n  z-index: -2;\n  margin-bottom: 16px; }\n  @media (max-width: 768px) {\n    .container {\n      order: -1;\n      width: 100%; } }\n  .title {\n  color: #464646;\n  font-size: 1.2rem;\n  font-family: \"Fira Sans\";\n  font-weight: 700;\n  margin: 16px 16px 16px 8px; }\n  .member-row {\n  width: 100%;\n  padding: 4px 8px;\n  display: flex;\n  align-items: center;\n  cursor: pointer; }\n  .member-icon {\n  width: 28px;\n  height: 28px;\n  border-radius: 16px;\n  margin-right: 8px; }\n  .member-name {\n  color: #666666;\n  font-size: .9rem;\n  font-family: \"Fira Sans\";\n  font-weight: 400;\n  margin: 0;\n  padding: 0; }\n"

/***/ }),

/***/ "./src/app/member-list/member-list.component.ts":
/*!******************************************************!*\
  !*** ./src/app/member-list/member-list.component.ts ***!
  \******************************************************/
/*! exports provided: MemberListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberListComponent", function() { return MemberListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MemberListComponent = /** @class */ (function () {
    function MemberListComponent() {
        this.member = '';
    }
    MemberListComponent.prototype.ngOnInit = function () {
    };
    MemberListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-member-list',
            template: __webpack_require__(/*! ./member-list.component.html */ "./src/app/member-list/member-list.component.html"),
            styles: [__webpack_require__(/*! ./member-list.component.scss */ "./src/app/member-list/member-list.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MemberListComponent);
    return MemberListComponent;
}());



/***/ }),

/***/ "./src/app/mini-show-form/mini-show-form.component.html":
/*!**************************************************************!*\
  !*** ./src/app/mini-show-form/mini-show-form.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"survey-title lead qslyGreen\">{{data.title}}</h2>\n\n<form [formGroup]=\"questionnaire\">\n    <div formArrayName=\"questions\">\n        <div class=\"row miniFormQuestionBox\" [ngClass]=\"{noBotMargin: i == 0 && data.contracted}\" style=\"display:flex; align-items: center;\" *ngFor=\"let question of data.questions; let i = index\">\n            <div *ngIf=\"((data.answered && data.showdata && data.answerCount > 0) || isMyPost);then withanswer else formonly\"></div>\n\n            <ng-template #withanswer>\n\n                <!-- LHS -->\n                <div *ngIf=\"question.kind === 'Short Answer' && (i == 0 || !data.contracted)\" class=\"col-md-12\">\n                    <label class=\"lead qslyBlack\">{{question.number + 1}}. {{question.body}}<span *ngIf=\"question.required\" class=\"lead\">*</span></label>\n                    <div *ngIf=\"question.pic\" class=\"form-group question-pic\"><img style=\"border-radius: 8px;\" [src]=\"question.pic\" /></div>\n                    <div style=\"display: flex; flex-direction: column;\">\n                        <label class=\"wAnswerOpts qslyGray\" style=\"margin-bottom: 5px\">Responses</label>\n\n                        <div *ngFor=\"let ans of shortAnswers2[i]; let x = index;\" style=\"margin-bottom: 4px; margin-left: 6px;\">\n                            <p *ngIf=\"x < 2\" class=\"response-container\">\n                                <img class=\"response-image\" src=\"{{ans.pic}}\"/>\n                                <span><strong>{{ans.name}}: </strong>{{ans.answer}}</span>\n                            </p>\n                        </div>\n                    </div>\n\n                    <p *ngIf=\"shortAnswers2.length > 0 && shortAnswers2[i].length > 2\" style=\"margin-bottom: 4px; margin-top: 12px; margin-left: 6px; width: max-content\" class=\"submitButton smaller qslyGray\" (click)=\"shortAnswersModal.open(i)\">See All</p>\n\n                </div>\n\n                <!-- Make the question full width -->\n                <div *ngIf=\"question.kind !== 'Short Answer' && (i == 0 || !data.contracted)\" class=\"col-md-12\">\n                    <label class=\"lead qslyBlack\">{{question.number + 1}}. {{question.body}}<span *ngIf=\"question.required\" class=\"lead\">*</span></label>\n                </div>\n\n                <div *ngIf=\"question.kind !== 'Short Answer'\" class=\"col-md-6\">\n                    <div class=\"mx-auto form-group\" [formGroupName]=\"i\" *ngIf=\"i == 0 || !data.contracted\">\n                        <div *ngIf=\"question.pic\" class=\"form-group question-pic\">\n                            <img style=\"border-radius: 8px;\" [src]=\"question.pic\"/>\n                        </div>\n\n                        <div *ngIf=\"question.kind == 'Multiple Choice'\">\n                            <div>\n                                <div *ngFor=\"let option of question.options\" class=\"formChoices\">\n                                    <label class=\"wAnswerOpts qslyGray\">{{option.label}}. {{option.body}}</label>\n                                </div>\n                                <label *ngIf=\"question.canSelectMultiple\" class=\"qslyGray\" style=\"font-size: .6rem; margin-left: 8px;\">*Multiple Selection</label>\n                            </div>\n                        </div>\n\n                        <div *ngIf=\"question.kind == 'Rating'\" class=\"formChoices\">\n                            <label class=\"wAnswerOpts qslyGray\">Out of scale of {{question.scale}}</label>\n                        </div>\n\n\n                        <div *ngIf=\"question.kind == 'Number'\" class=\"formChoices\">\n                            <label class=\"wAnswerOpts qslyGray\" *ngIf=\"!question.boundaries\">Answer could have been any number</label>\n                            <label class=\"wAnswerOpts qslyGray\" *ngIf=\"question.boundaries\">Answer was a number between {{question.lowerBoundary}} and {{question.upperBoundary}}</label>\n                        </div>\n\n\n                    </div>\n                </div>\n\n                <!-- RHS -->\n                <div *ngIf=\"question.kind !== 'Short Answer'\" class=\"col-md-6\">\n\n                    <!-- ********** Chart ************ -->\n                    <div *ngIf=\"(data.answerCount > 0) && (i == 0 || !data.contracted) && data.viewGraphsbool\">\n                        <app-pie-chart  id=\"{{ 'piechart-' + i}}\" [qKind]=\"question.kind\" [dataLabels]=\"data?.plotdata[i][0]\" [dataValues]=\"data?.plotdata[i][1]\" [dataCounts]=\"data?.plotdata[i][2]\" [count]=\"count\" ></app-pie-chart>\n                    </div>\n                    <div *ngIf=\"(data.answerCount > 0) && ((i == 0 && data.contracted) || (i == lastMcQuestionIndex && !data.contracted) ) && data.viewGraphsbool\" style=\"display: flex; width: 100%; justify-content: center\">\n                        <a class=\"submitButton smaller filterButton qslyGray\" (click)=\"toggleFilter()\">{{showFilters ? 'Hide Filters' : 'Filter Responses'}}</a>\n                    </div>\n\n                </div>\n            </ng-template>\n\n\n            <ng-template #formonly>\n                <div class=\"col-md-12\">\n                    <div class=\"mx-auto form-group\" [formGroupName]=\"i\" *ngIf=\"i == 0 || !data.contracted\">\n                        <label class=\"lead qslyBlack\">{{question.number + 1}}. {{question.body}}\n                            <span *ngIf=\"question.required\" class=\"lead\">*</span>\n                            <span *ngIf=\"question.kind === 'Number' && question.boundaries\" style=\"color: #999; font-size: .8rem\">(Number between {{question.lowerBoundary}} and {{question.upperBoundary}})</span>\n                        </label>\n                        <div *ngIf=\"question.pic\" class=\"form-group question-pic\">\n                            <img style=\"border-radius: 8px;\" [src]=\"question.pic\"/>\n                        </div>\n                        <div  *ngIf=\"question.options\">\n                            <div *ngIf=\"question.kind == 'Multiple Choice'\">\n                                <div *ngIf=\"!question.canSelectMultiple\">\n                                    <div *ngFor=\"let option of question.options\" class=\"formChoices\">\n                                        <label>\n                                            <input (click)=\"loginPopup.check(data.loginRequired)\" formControlName=\"answer\" [value]=\"option.label\" type=\"radio\" />\n                                            <span>{{option.body}}</span>\n                                        </label>\n                                    </div>\n                                </div>\n                                <div *ngIf=\"question.canSelectMultiple\" formGroupName=\"answer\">\n                                    <div *ngFor=\"let option of question.options\" class=\"formChoices\">\n                                        <label>\n                                            <input (click)=\"loginPopup.check(data.loginRequired)\" [formControlName]=\"option.label\" type=\"checkbox\" />\n                                            <span>{{option.body}}</span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n\n                        <app-star-array *ngIf=\"question.kind == 'Rating'\"\n                            (selected)=\"setRating($event, i)\"\n                            formGroupName=\"answer\"\n                            [scale]=\"question.scale\">\n                        </app-star-array>\n\n                        <input (click)=\"loginPopup.check(data.loginRequired)\" type=\"number\" min=\"question.lowerBoundary\" max=\"question.upperBoundary\"\n                            class=\"formChoices num\" formControlName=\"answer\" *ngIf=\"question.kind == 'Number'\" />\n\n                        <!-- Short Answer entry -->\n                        <label *ngIf=\"question.kind == 'Short Answer' && me != null\">\n\n                            <input type=\"checkbox\"\n                                class=\"formChoices sa\" style=\"width: 20px\"\n                                formControlName=\"answerAnonymously\"\n                                (click)=\"loginPopup.check(data.loginRequired)\">\n                            Answer anonymously?\n                        </label>\n                        <textarea\n                            class=\"formChoices sa txtarea\"\n                            formControlName=\"answer\"\n                            *ngIf=\"question.kind == 'Short Answer'\"\n                            (click)=\"loginPopup.check(data.loginRequired)\"\n                            ></textarea>\n\n                        <div *ngIf=\"isInvalid(i)\" class=\"invalid-feedback\">\n                            Option is required\n                        </div>\n                    </div>\n                </div>\n            </ng-template>\n\n        </div>\n    </div>\n\n    <div class=\"flex submitBox\"  *ngIf=\"!data.contracted && !submitted && !isMyPost\">\n        <button *ngIf=\"showSubmit\" class=\"submitButton qslyGray\"\n            [disabled]=\"questionnaire.invalid && questionnaire.wasChecked\" (click)=\"checkSubmit($event)\">\n            Submit\n        </button>\n        <p *ngIf=\"errorText\">Submission failed!</p>\n        <p *ngIf=\"expired\" class=\"errorText\">The survey has expired, no further answers are allowed!</p>\n    </div>\n</form>\n\n<app-login-popup #loginPopup></app-login-popup>\n<app-short-answers [answers]=\"shortAnswers2\" #shortAnswersModal></app-short-answers>\n"

/***/ }),

/***/ "./src/app/mini-show-form/mini-show-form.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/mini-show-form/mini-show-form.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".formChoices {\n  font-weight: 500;\n  width: 95%;\n  display: flex; }\n  .formChoices input {\n    margin-top: 3px; }\n  .formChoices label {\n    font-size: 1rem;\n    font-family: Karla;\n    padding-left: 8px;\n    display: flex;\n    cursor: pointer; }\n  .formChoices label span {\n      display: block;\n      margin-left: 6px;\n      color: #2b2b2b;\n      font-size: 1rem; }\n  .formChoices.sa, .formChoices.num {\n    margin-left: 10px; }\n  .miniFormQuestionBox {\n  margin-bottom: 20px; }\n  .miniFormQuestionBox:last-of-type {\n    margin-bottom: 0px; }\n  .noBotMargin {\n  margin-bottom: 0px; }\n  #createFormContainer {\n  background-color: #fff;\n  min-height: 100%;\n  padding-top: 20px;\n  overflow: auto;\n  border-radius: 1%;\n  margin-top: 30px; }\n  #topJumbo {\n  border: 10px;\n  background: #F6F6F6; }\n  .form-control input {\n  vertical-align: middle; }\n  .question-pic img {\n  max-height: 180px;\n  max-width: 100%; }\n  .expand-button {\n  float: right; }\n  .submitted-message {\n  font-size: 1.25rem; }\n  .ng-invalid.ng-touched {\n  border-color: #ea7a85; }\n  .invalid-feedback {\n  color: #ea7a85;\n  display: block; }\n  .rank {\n  background-color: green;\n  width: 30px;\n  height: 20px;\n  display: inline-block;\n  text-align: center;\n  border-radius: 10px;\n  color: white;\n  vertical-align: middle;\n  margin-right: 10px;\n  font-size: 12px;\n  font-weight: bold;\n  padding: 3px;\n  margin-top: 2px; }\n  .matrix td {\n  padding: 10px 20px;\n  vertical-align: top;\n  white-space: nowrap; }\n  .matrix tbody tr:nth-child(even) {\n  background-color: #F6F6F6; }\n  .matrix tbody td.field {\n  text-align: center; }\n  .flex {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: center; }\n  .submitBox {\n  margin-top: 15px; }\n  .submitButton {\n  background: #FFF;\n  border-radius: 6px;\n  padding: 2px 14px;\n  line-height: 1;\n  width: auto;\n  text-align: center;\n  border: none;\n  border: solid 1px #666;\n  font-size: 1rem;\n  font-family: Karla;\n  outline-style: none;\n  margin-top: 0px; }\n  .submitButton:active {\n    outline-style: none; }\n  .submitButton:hover {\n    cursor: pointer;\n    color: #333 !important;\n    border: solid 1px #333; }\n  .errorText {\n  color: #47d487;\n  font-size: 1rem;\n  font-family: Karla; }\n  .wAnswerOpts {\n  font-size: .8rem; }\n  .lead {\n  font-weight: 700; }\n  @media (max-width: 767px) {\n    .lead {\n      font-size: .95rem; } }\n  .txtarea {\n  border: 1px solid #E2E2E2; }\n  .sa-response-container {\n  display: flex;\n  align-items: center;\n  margin-bottom: 4px; }\n  .sa-response-container label {\n    display: block;\n    margin-right: 14px;\n    margin-bottom: 0; }\n  .sa-response-container p {\n    margin-bottom: 0; }\n  .response-container {\n  margin-bottom: 10px; }\n  .response-image {\n  width: 30px;\n  height: 30px;\n  margin-right: 4px;\n  border-radius: 8px; }\n  .survey-title {\n  width: 100%;\n  margin-top: -12px;\n  text-align: center;\n  width: 100%; }\n"

/***/ }),

/***/ "./src/app/mini-show-form/mini-show-form.component.ts":
/*!************************************************************!*\
  !*** ./src/app/mini-show-form/mini-show-form.component.ts ***!
  \************************************************************/
/*! exports provided: MiniShowFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiniShowFormComponent", function() { return MiniShowFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Feed/feed-form.model */ "./src/app/Feed/feed-form.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MiniShowFormComponent = /** @class */ (function () {
    function MiniShowFormComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.contracted = false;
        this.showFilters = false;
        this.saIndexes = [];
        this.lastMcQuestionIndex = null;
        this.submitted = false;
        this.expired = false;
        this.isMyPost = false;
        this.submitForm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.toggleFilters = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    MiniShowFormComponent.prototype.ngOnInit = function () {
        this.startingTime = Date.now();
        this.createForm();
    };
    MiniShowFormComponent.prototype.ngOnChanges = function () {
        var _this = this;
        // Load short answer array and get index of questions that are short answers and put their index in an array
        if (this.data) {
            var qs = this.data.questions;
            this.saIndexes = [];
            qs.map(function (q, i) {
                if (q.kind == "Short Answer") {
                    _this.saIndexes.push(i);
                }
                if (q.kind == "Multiple Choice") {
                    _this.lastMcQuestionIndex = i;
                }
            });
        }
    };
    MiniShowFormComponent.prototype.getShortAnswerResponses = function () {
        var _this = this;
        this.http.post('/forms/shortAnswerResponses', {})
            .toPromise()
            .then(function (res) {
            var tags = res.json().data;
            for (var i = 0; i < tags.length; i++) {
                var t = tags[i];
                _this.topTags.push(t.tag + " (" + t.count + ")");
                // this.topTags.push(t.tag);
            }
        });
    };
    MiniShowFormComponent.prototype.createForm = function () {
        //
        var tempf = function (x) {
            return { label: x.label, body: x.body };
        };
        //
        var questions = [];
        for (var _i = 0, _a = this.data.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            var groupObject = {
                body: question.body,
                label: question.label,
                kind: question.kind,
                number: question.number,
                answer: null,
                answerAnonymously: null,
            };
            if (question.kind === 'Multiple Choice' && question.canSelectMultiple) {
                groupObject.answer = {};
                for (var _b = 0, _c = question.options; _b < _c.length; _b++) {
                    var option = _c[_b];
                    groupObject.answer[option.label] = false;
                }
                if (question.required) {
                    groupObject.answer = this.fb.group(groupObject.answer, { validator: this.checkboxesRequired });
                }
                else {
                    groupObject.answer = this.fb.group(groupObject.answer);
                }
            }
            else if (question.kind === 'Rank') {
                groupObject.answer = question.options.map(function (option) { return tempf(option); });
                groupObject.answer = this.fb.array(groupObject.answer);
            }
            else if (question.kind === 'Rating') {
                groupObject.answer = 0;
                if (question.required) {
                    groupObject.answer = [groupObject.answer, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required];
                }
            }
            else if (question.kind === 'Matrix') {
                groupObject.answer = {};
                for (var _d = 0, _e = question.rows; _d < _e.length; _d++) {
                    var row = _e[_d];
                    groupObject.answer[row] = "";
                    if (question.required) {
                        groupObject.answer[row] = [groupObject.answer[row], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required];
                    }
                }
                groupObject.answer = this.fb.group(groupObject.answer);
            }
            else {
                groupObject.answer = "";
                if (question.kind === 'Short Answer') {
                    groupObject.answerAnonymously = false;
                }
                if (question.required) {
                    groupObject.answer = [groupObject.answer, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required];
                }
            }
            questions.push(this.fb.group(groupObject));
        }
        this.questionnaire = this.fb.group({ questions: this.fb.array(questions) });
    };
    MiniShowFormComponent.prototype.checkboxesRequired = function (input) {
        var somethingIsChecked = false;
        for (var _i = 0, _a = Object.keys(input.controls); _i < _a.length; _i++) {
            var option = _a[_i];
            if (input.get(option).value) {
                somethingIsChecked = true;
            }
        }
        if (!somethingIsChecked) {
            return { required: true };
        }
        else {
            return null;
        }
    };
    MiniShowFormComponent.prototype.isInvalid = function (questionIndex) {
        var control = this.questionnaire.controls.questions.controls[questionIndex];
        return control.invalid && control.touched;
    };
    MiniShowFormComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    MiniShowFormComponent.prototype.checkSubmit = function () {
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            this.questionnaire.wasChecked = true;
        }
        else {
            this.submitIt();
        }
    };
    MiniShowFormComponent.prototype.submitIt = function () {
        if (this.submitted)
            return;
        var value = Object.assign({}, this.questionnaire.value);
        var _loop_1 = function (question) {
            if (question.kind === 'Checkboxes') {
                question.answer = Object.keys(question.answer).filter(function (k) { return question.answer[k]; });
            }
        };
        for (var _i = 0, _a = value.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            _loop_1(question);
        }
        this.submitForm.emit(value);
    };
    MiniShowFormComponent.prototype.setRating = function (rating, i) {
        this.questionnaire.get('questions').controls[i].get('answer').setValue(rating);
    };
    MiniShowFormComponent.prototype.toggleFilter = function () {
        var startingTime = this.startingTime;
        this.showFilters = !this.showFilters;
        this.toggleFilters.emit(this.showFilters);
        window.mixpanel.track("Clicked Apply Filters", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "question": this.data.questions[0].body,
            "id": this.data.id,
            "timestamp": Date.now()
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_3__["FeedFormModel"])
    ], MiniShowFormComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MiniShowFormComponent.prototype, "shortAnswers2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], MiniShowFormComponent.prototype, "count", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], MiniShowFormComponent.prototype, "showSubmit", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], MiniShowFormComponent.prototype, "submissionfailed", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MiniShowFormComponent.prototype, "submitted", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MiniShowFormComponent.prototype, "expired", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MiniShowFormComponent.prototype, "isMyPost", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MiniShowFormComponent.prototype, "me", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], MiniShowFormComponent.prototype, "submitForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], MiniShowFormComponent.prototype, "toggleFilters", void 0);
    MiniShowFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mini-show-form',
            template: __webpack_require__(/*! ./mini-show-form.component.html */ "./src/app/mini-show-form/mini-show-form.component.html"),
            styles: [__webpack_require__(/*! ./mini-show-form.component.scss */ "./src/app/mini-show-form/mini-show-form.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"]])
    ], MiniShowFormComponent);
    return MiniShowFormComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg bg-light navbar-light fixed-top\">\n    <a class=\"navbar-brand\" href=\"#\" routerLink=\"/\"><img src=\"/images/logo.png\" class=\"logo\"/> Questionsly</a>\n\n    <a *ngIf=\"!loggedin\" class=\"nav-item navlinks nav-link align-right navbar-login\" style=\"padding: 4px 12px; border-radius: 8px; border: 1px solid #28ab64\" routerLink=\"/users/login\" (click)=\"clickedLogin()\">Login</a>\n\n    <button *ngIf=\"loggedin\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\"\n        aria-expanded=\"false\" aria-label=\"Toggle navigation\" >\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n    <div *ngIf=\"loggedin\" class=\"collapse navbar-collapse bordTop\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mr-auto\">\n            <li class=\"nav-item mobHide\">\n                <form class=\"searchContainer form-inline my-2 my-lg-0\" [formGroup]=\"searchbox\" (keyup.enter)=\"checkSubmit(searchbox)\">\n                    <input class=\"searchbar form-control mr-sm-2\" type=\"text\" placeholder=\"Search Questionsly\" formControlName=\"searchterm\" [ngClass]=\"{'form-control': true}\">\n                </form>\n            </li>\n\n        </ul>\n\n\n        <ul *ngIf=\"loggedin\" class=\"rightNavList\">\n\n            <li class=\"nav-item mobShow\">\n                <form class=\"searchContainer form-inline my-2 my-lg-0\" [formGroup]=\"searchbox\" (keyup.enter)=\"checkSubmit(searchbox)\">\n                    <input class=\"searchbar form-control mr-sm-2\" type=\"text\" placeholder=\"Search Questionsly\" formControlName=\"searchterm\" [ngClass]=\"{'form-control': true}\">\n                </form>\n            </li>\n\n            <div style=\"display:flex; align-items: center;\">\n            <div class=\"notification-icon\" [ngStyle]=\"{'padding-bottom': unreadNotifications > 0 ? '5px' : '0px'}\">\n                <li>\n                    <div class=\"position-relative\">\n                        <div (click)=\"toggleNotifications()\" class=\"toggleNot\">\n                            <i class=\"fa fa-bell qslyGray\" [ngClass]=\"{iconActive: showNotifications}\" aria-hidden=\"true\"></i>\n                            <div *ngIf=\"unreadNotifications > 0\" class=\"notification-bubble\">{{unreadNotifications}}</div>\n                        </div>\n            \n                        <div class=\"notificationDropdown\" *ngIf=\"showNotifications\">\n            \n                            <div *ngIf=\"networkNotifications.length > 0\">\n                              \n                                <div class=\"notifTextCont\" *ngIf='notifications.length > 0' [ngClass]=\"{'noTopBorder': true}\">\n                                    <p class=\"notifLabel\">Friend Requests</p>\n                                    <p class=\"notifLabel markAll\" (click)=\"markAllRead()\">Mark all as read</p>\n                                </div>\n\n                                <!-- <p class=\"notifLabel\" [ngClass]=\"{'noTopBorder': true}\">Friend Requests</p> -->\n                                <!-- <p class=\"notifLabel\" [ngClass]=\"{'noTopBorder': true}\">Friend Requests</p> -->\n                                <div *ngFor=\"let notification of networkNotifications; let i = index\">\n                                    <div [ngClass]=\"{'notification': true, 'new': !notification.seen}\" class=\"dropdownItem\" [routerLink]=\"notificationLink(notification)\" (click)=\"setAsSeen(notification)\">\n                                        <div class=\"flex\" style=\"align-items: center\">\n                                            <img src=\"{{notificationPic(notification)}}\" class=\"notifImage\" />\n                                            <div class=\"flex fCol\" style=\"max-width: 300px; \">\n                                                <p style=\"color: #333; margin: 0; font-size: .8rem\">\n                                                    <span style=\"font-weight: 700; font-size: .8rem\">{{notificationMessage(notification).name}}</span> {{notificationMessage(notification).message}}</p>\n                                                <p style=\"margin: 0; color: #AAA; font-size: .7rem\">{{notification.timestamp | date:\"EEE MMM d 'at' h:mm a\"}}</p>\n                                            </div>\n                                            <div class=\"flex\">\n                                                <a class=\"acceptButton\" (click)=\"acceptConnectionRequest(notification); $event.stopPropagation();\">Accept</a>\n                                                <a class=\"denyButton\" (click)=\"deleteConnectionRequest(notification.fromUserId, notification.id); $event.stopPropagation();\">Deny</a>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n            \n            \n                            <div *ngIf=\"communityNotifications.length > 0\">\n                                <div class=\"notifTextCont\" *ngIf='notifications.length > 0' [ngClass]=\"{'noTopBorder': networkNotifications.length == 0}\">\n                                    <p class=\"notifLabel\">Group Requests</p>\n                                    <p class=\"notifLabel markAll\" [ngClass]=\"{'notVisible': networkNotifications.length != 0}\" (click)=\"markAllRead()\">Mark all as read</p>\n                                </div>\n\n                                <!-- <p class=\"notifLabel\" [ngClass]=\"{'noTopBorder': networkNotifications.length == 0}\">Community Requests</p> -->\n                                <div *ngFor=\"let notification of communityNotifications; let i = index\">\n                                    <div [ngClass]=\"{'notification': true, 'new': !notification.seen}\" class=\"dropdownItem\" [routerLink]=\"notificationLink(notification)\" (click)=\"setAsSeen(notification)\">\n                                        <div class=\"flex\" style=\"align-items: center\">\n                                            <img src=\"{{notificationPic(notification)}}\" class=\"notifImage\" />\n                                            <div class=\"flex fCol\" style=\"max-width: 300px; \">\n                                                <p style=\"color: #333; margin: 0; font-size: .8rem\">\n                                                    <span style=\"font-weight: 700; font-size: .8rem\">{{notificationMessage(notification).name}}</span> {{notificationMessage(notification).message}}\n                                                    <span style=\"font-weight: 700; font-size: .8rem\">{{notificationMessage(notification).community}}</span>\n                                                </p>\n                                                <p style=\"margin: 0; color: #AAA; font-size: .7rem\">{{notification.timestamp | date:\"EEE MMM d 'at' h:mm a\"}}</p>\n                                            </div>\n                                            <div class=\"flex\">\n                                                <a *ngIf=\"notification.type === 'comm-admin' \" class=\"acceptButton\" (click)=\"acceptCommunityRequest(notification.id, true)\">Accept</a>\n                                                <a *ngIf=\"notification.type === 'comm' \" class=\"acceptButton\" (click)=\"acceptCommunityRequest(notification.id)\">Accept</a>\n                                                <a *ngIf=\"notification.type === 'comm-request' \" class=\"acceptButton\" (click)=\"acceptNewgroupMemberRequest(notification.id, notification.data, notification.fromUserId)\">Accept</a>\n                                                <a *ngIf=\"notification.type === 'comm-admin' || notification.type === 'comm'\" class=\"denyButton\" (click)=\"deleteCommunityRequest(notification.id)\">Deny</a>\n                                                <a *ngIf=\"notification.type === 'comm-request'\" class=\"denyButton\" (click)=\"rejectNewgroupMemberRequest(notification.id, notification.data, notification.fromUserId)\">Deny</a>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            \n                            <div class=\"notifTextCont\" *ngIf='notifications.length > 0' [ngClass]=\"{'noTopBorder': communityNotifications.length == 0 && networkNotifications.length == 0}\">\n                                <p class=\"notifLabel\">Activity</p>\n                                <p class=\"notifLabel markAll\" [ngClass]=\"{'notVisible': communityNotifications.length != 0 || networkNotifications.length != 0}\" (click)=\"markAllRead()\">Mark all as read</p>\n                            </div>\n                            <!-- <p class=\"notifLabel\" *ngIf='notifications.length > 0' [ngClass]=\"{'noTopBorder': communityNotifications.length == 0 && networkNotifications.length == 0}\">Activity</p> -->\n                            <p class=\"noNotifications\" *ngIf='communityNotifications.length == 0 && networkNotifications.length == 0 && notifications.length === 0'>No Notifications</p>\n                            <div *ngFor=\"let notification of notifications; let i = index\">\n                                <div *ngIf=\"i<notifShowCount\" [ngClass]=\"{'notification': true, 'new': !notification.seen}\" class=\"dropdownItem\" [routerLink]=\"notificationLink(notification)\" (click)=\"setAsSeen(notification)\">\n                                    <div class=\"flex\" style=\"align-items: center\">\n                                        <img src=\"{{notificationPic(notification)}}\" class=\"notifImage\" />\n                                        <div class=\"flex fCol\" style=\"max-width: 300px; \">\n                                            <p style=\"color: #555; margin: 0; font-size: .8rem; line-height: 1.25\">\n                                                <span style=\"font-weight: 700; font-size: .8rem; color: #333\">{{notificationMessage(notification).name}}</span> \n                                                {{notificationMessage(notification).action}}\n                                                <span style=\"font-weight: 700; font-size: .75rem; color: #333\">{{notificationMessage(notification).message}}</span>\n                                                {{notificationMessage(notification)?.action2}}\n                                                <span style=\"font-weight: 700; font-size: .8rem; color: #333\">{{notificationMessage(notification)?.community}}</span>\n                                            </p>\n                                            <p style=\"margin: 0; color: #AAA; font-size: .7rem\">{{notification.timestamp | date:\"EEE MMM d 'at' h:mma\"}}</p>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <p *ngIf=\"notifications.length > notifShowCount\" class=\"notifLabel showMoreLabel\" (click)=\"showMoreNotifications()\">Show More</p>\n                        </div>         \n                    </div>                    \n                </li>\n            </div>\n\n            <li *ngIf=\"loggedin\">\n                <div class=\"\">\n                    <li [ngClass]=\"{\n                                'nav-item': true, \n                                'd-none': true, \n                                'd-xl-block': true\n                            }\" ngbDropdown>\n                        <a class=\"navlinks nav-link custom-dropdown-toggle\" style=\"padding: 8px 0\" id=\"nav-bar-actions\" ngbDropdownToggle aria-haspopup=\"true\" aria-expanded=\"false\">\n                            <div *ngIf=\"pictype\" class=\"d-inline-block\">\n                                <div *ngIf=\"pictype == 'fb'\">\n                                    <img class=\"userImage\" src=\"https://graph.facebook.com/{{pic}}/picture?width=40&height=40\">\n                                </div>\n                                <div *ngIf=\"pictype == 'local'\">\n                                    <img class=\"userImage\" [src]=\"pic\" />\n                                </div>\n                                <div *ngIf=\"pictype == 'default-male'\">\n                                    <img class=\"userImage\" src=\"/images/male.png\" />\n                                </div>\n                                <div *ngIf=\"pictype == 'default-female'\">\n                                    <img class=\"userImage\" src=\"/images/female.png\" />\n                                </div>\n                            </div>\n                            <span style=\"margin-left: 4px; font-size: 14px\">{{firstname}}</span>\n                        </a>\n                        <div class=\"p-0 settingsDropdown\" ngbDropdownMenu aria-labelledby=\"nav-bar-actions\">\n                            <a class=\"dropdown-item\" [routerLink]=\"['/profile', dbid]\">Profile</a>\n                            <a class=\"dropdown-item\" routerLink=\"/settings\">Settings</a>\n                            <a class=\"dropdown-item\" (click)=\"logout()\">Logout</a>\n                        </div>\n                    </li>\n                </div>\n            </li>\n            </div>\n\n            \n            \n        </ul>\n\n        <a *ngIf=\"!loggedin\" class=\"nav-item navlinks nav-link align-right\" style=\"margin-right: 10%\" routerLink=\"/users/login\" (click)=\"clickedLogin()\">Login</a>\n\n    </div>\n</nav>\n\n\n<!-- could be its own component later -->\n<p class=\"signupBanner\" *ngIf=\"!loggedin\">\n    Questionsly &mdash; connecting the world to share information and helping people make better decisions\n\n    <button *ngIf=\"router.url != '/users/login'\" style=\"font-family: Karla\" class=\"btn btn-outline-success\" routerLink=\"/users/login\">Please Log in or Sign Up!</button>\n</p>\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.scss":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media (max-width: 768px) {\n  /deep/ .navbar {\n    padding-left: 15px;\n    padding-right: 0; } }\n\n#nav-bar-actions, .notification {\n  cursor: pointer; }\n\n.navbar-light {\n  display: flex;\n  justify-content: space-between;\n  background-color: #FFF !important;\n  border-bottom: 1px solid #e2e2e2; }\n\n@media (min-width: 992px) {\n    .navbar-light {\n      padding: 0px 12%;\n      height: 52px;\n      max-width: 100%;\n      width: 100%; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n    .navbar-light {\n      max-width: 100%;\n      width: 100%;\n      padding: 8px 0; } }\n\n@media (max-width: 767px) {\n    .navbar-light {\n      padding: 4px 0; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .navbar-collapse.show, .navbar-collapse.collapsing {\n    display: flex;\n    width: 100%;\n    background: white;\n    padding: 0 10%; } }\n\n.navbar-light .navbar-text,\n.navbar-light .navbar-brand {\n  color: #28ab64;\n  font-weight: 700; }\n\n@media (max-width: 767px) {\n  .navbar-brand {\n    margin: 4px 5%; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .navbar-brand {\n    margin: 0px 10%; } }\n\n.navbar-toggler, .navbar-login {\n  outline: none; }\n\n@media (min-width: 768px) and (max-width: 991px) {\n    .navbar-toggler, .navbar-login {\n      margin: 0px 10% !important; } }\n\n@media (max-width: 767px) {\n    .navbar-toggler, .navbar-login {\n      margin: 0 5% !important; } }\n\n.navlinks {\n  color: #28ab64 !important; }\n\n.nav-item {\n  cursor: hand;\n  margin-right: 5px; }\n\n.nav-item i.fa {\n    width: 14px; }\n\n@media (max-width: 991px) {\n  .bordTop {\n    border-top: 1px solid #e2e2e2; } }\n\n.align-right {\n  text-align: right; }\n\n.dropdown-toggle {\n  display: inherit; }\n\n.notification {\n  background: #FFF; }\n\n.notification.new {\n    color: #fff !important;\n    background-color: #eafff4; }\n\n.notification.new:hover {\n      background-color: #F0F0F0;\n      color: #fff !important; }\n\n.notification:hover:not(.new) {\n    background-color: #eee;\n    color: #333 !important; }\n\n/* change the brand and text color */\n\n.navbar-custom .navbar-brand,\n.navbar-custom .navbar-text {\n  color: #28ab64;\n  font-weight: 700; }\n\n.navli:hover {\n  background: #fff;\n  color: #FFF; }\n\n/* change the color of active or hovered links */\n\n.navbar-custom .nav-item.active .nav-link,\n.navbar-custom .nav-item:hover .nav-link {\n  color: #666; }\n\n.mouseChangeToHand {\n  cursor: pointer;\n  cursor: hand; }\n\n.newnotification {\n  color: darkred; }\n\nimg {\n  width: 40px; }\n\n.searchContainer {\n  display: flex;\n  justify-content: center;\n  width: 250px;\n  margin-left: 12px; }\n\n@media (max-width: 767px) {\n    .searchContainer {\n      width: 100%;\n      margin-left: 0px; } }\n\n.searchbar {\n  width: 100%;\n  padding: 2px;\n  font-size: .85rem;\n  font-family: Karla;\n  text-align: center; }\n\n.userImage {\n  width: 28px;\n  height: 28px;\n  border-radius: 14px; }\n\n@media (max-width: 767px) {\n    .userImage {\n      width: 24px;\n      height: 24px; } }\n\n.notification-icon {\n  display: flex;\n  align-items: center;\n  margin-right: 25px;\n  align-items: center; }\n\n.notification-bubble {\n  background: #47d487;\n  padding: 1px 3px;\n  color: white;\n  font-family: Karla;\n  top: 10px;\n  right: -13px;\n  position: absolute; }\n\n.iconActive {\n  color: #28ab64 !important; }\n\n.notificationDropdown {\n  background: #FFF;\n  max-height: 70vh;\n  overflow-y: scroll;\n  overflow-x: none;\n  position: absolute;\n  right: -10px;\n  top: 30px;\n  width: 400px;\n  border-radius: 4px;\n  border: 1px solid #e2e2e2; }\n\n@media (max-width: 767px) {\n    .notificationDropdown {\n      width: 90vw;\n      max-width: 320px;\n      max-height: 80vh;\n      right: -18vw; } }\n\n@media (max-width: 400px) {\n    .notificationDropdown {\n      width: 90vw;\n      max-height: 80vh;\n      right: -35vw; } }\n\n.dropdownItem {\n  cursor: hand;\n  padding: 6px 15px 5px 12px;\n  width: 100%;\n  align-items: center;\n  background-color: #FFFFFF; }\n\n.dropdownItem:not(:last-of-type) {\n    border-bottom: 1px solid #ddd; }\n\n.dropdownItem:hover {\n    background-color: #47d487;\n    color: #fff !important; }\n\n.flex {\n  display: flex; }\n\n.fCol {\n  flex-direction: column; }\n\n.notifImage {\n  height: 36px !important;\n  width: 36px !important;\n  border-radius: 24px;\n  margin-right: 6px; }\n\n.toggleNot:hover {\n  cursor: pointer; }\n\n.noNotifications {\n  text-align: center;\n  font-family: Helvetica Neue;\n  color: #666;\n  font-weight: 500;\n  font-size: 1.1rem;\n  margin: 10px 0px; }\n\n.notifTextCont {\n  border: 1px solid #FFFFFF;\n  border-top: 1px solid #e2e2e2;\n  border-bottom: 1px solid #e2e2e2;\n  display: flex;\n  justify-content: space-between;\n  padding: auto 8px; }\n\n.notifTextCont .notifLabel {\n    margin: 0;\n    padding: 5px 10px;\n    font-size: .75rem;\n    font-family: Karla; }\n\n.notifTextCont .notifLabel.markAll:hover {\n      cursor: pointer;\n      font-weight: 700; }\n\n.notVisible {\n  visibility: hidden; }\n\n.noTopBorder {\n  border-top: none; }\n\n.showMoreLabel {\n  text-align: center;\n  font-weight: 700;\n  color: #666;\n  margin: 6px auto; }\n\n.showMoreLabel:hover {\n    cursor: pointer; }\n\n.acceptButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 4px 8px;\n  border: none;\n  text-align: center;\n  font-size: .7rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin: 0px 3px; }\n\n.acceptButton:active {\n    outline-style: none; }\n\n.acceptButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n.denyButton {\n  background: #FFF;\n  border-radius: 8px;\n  padding: 4px 8px;\n  text-align: center;\n  border: none;\n  border: solid 1px #666;\n  font-size: .7rem;\n  font-family: Karla;\n  color: #666 !important;\n  outline-style: none;\n  margin-top: 0px; }\n\n.denyButton:active {\n    outline-style: none; }\n\n.denyButton:hover {\n    cursor: pointer;\n    color: #333 !important;\n    border: solid 1px #333; }\n\n.rightNavList {\n  list-style: none;\n  display: flex;\n  margin-bottom: 0px;\n  padding-left: 0;\n  justify-content: space-between;\n  background: #FFFFFF;\n  margin: 0 5%; }\n\n@media (max-width: 767px) {\n  .mobHide {\n    display: none; } }\n\n.mobShow {\n  display: none; }\n\n@media (max-width: 767px) {\n    .mobShow {\n      display: block; } }\n\n.logo {\n  width: 24px; }\n\n@media (max-width: 767px) {\n    .logo {\n      width: 20px; } }\n\n.signupBanner {\n  width: 100%;\n  text-align: center;\n  margin: .9rem 0 0.5rem 0;\n  padding: 0 2rem;\n  font-size: larger;\n  font-family: karla;\n  font-weight: 300;\n  color: #999; }\n\n.signupBanner button {\n    display: block;\n    margin: 0px auto;\n    margin-top: 15px;\n    min-width: 250px;\n    padding: 4px 10px;\n    font-size: 1.2rem;\n    font-weight: 400;\n    color: white;\n    background-color: #28ab64;\n    border-radius: 10px; }\n\n.signupBanner button:hover {\n      background-color: #36d07d; }\n\n@media (max-width: 767px) {\n      .signupBanner button {\n        margin-top: 8px; } }\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _share_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../share.service */ "./src/app/share.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(http, fb, userService, shareService, router) {
        this.http = http;
        this.fb = fb;
        this.userService = userService;
        this.shareService = shareService;
        this.router = router;
        this.loggedin = false;
        this.fbid = false;
        this.firstname = null;
        this.dbid = null;
        this.notifications = [];
        this.networkNotifications = [];
        this.communityNotifications = [];
        this.unreadNotifications = 0;
        this.showNotifications = false;
        this.notifShowCount = 10;
        this.newestNotificationId = null;
        this.navExpanded = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.startingTime = Date.now();
        this.searchbox = this.fb.group({
            searchterm: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]
        });
        this.checkLoggedin();
        // update the list every 30 seconds
        this.obs = rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__["Observable"].interval(1000 * 30).subscribe(function (x) {
            _this.getEventsList();
        });
        // const aboutOffset = $('qSidebar').offset().top;
        // $(window).scroll(function () {
        //     var wScroll = $(window).scrollTop();
        //     $('.qSidebar').css({position:"relative"; left: aboutOffset + wScroll });
        //     if (wScroll < 0) wScroll = 0;
        // });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.obs.unsubscribe();
    };
    NavbarComponent.prototype.checkLoggedin = function () {
        var _this = this;
        this.userService.afterLoginCheck().then(function (userData) {
            if (userData != 0) {
                _this.loggedin = true;
                _this.fbid = userData.fbid;
                _this.dbid = userData.dbid;
                _this.firstname = userData.firstname;
                _this.picdata = userData.picdata;
                _this.gender = userData.gender;
                // deal with events
                _this.getEventsList();
                // deal with picture
                if (_this.fbid != null) {
                    _this.pic = _this.fbid;
                    _this.pictype = "fb";
                }
                else {
                    if (_this.picdata != null) {
                        _this.pictype = "local";
                        _this.pic = _this.picdata;
                    }
                    else {
                        if (_this.gender) {
                            if (_this.gender == 'male') {
                                _this.pictype = "default-male";
                            }
                            else {
                                _this.pictype = "default-female";
                            }
                        }
                    }
                }
                //if local pic is uploaded in settings
                _this.shareService.get("profilePic").subscribe(function (pic) {
                    _this.pictype = "local";
                    _this.pic = pic;
                });
            }
            else {
                _this.loggedin = false;
                _this.userService.listenForLogin(_this.checkLoggedin.bind(_this));
            }
        });
    };
    ;
    NavbarComponent.prototype.clearNotifications = function () {
        // reset the counter
        this.unreadNotifications = 0;
        this.networkNotifications = [];
        this.notifications = [];
        this.communityNotifications = [];
    };
    NavbarComponent.prototype.addNotification = function (notification) {
        if (notification.type === 'network') {
            this.networkNotifications.push(notification);
            if (notification.seen == false) {
                this.unreadNotifications++;
            }
            this.networkNotifications.sort(function (a, b) { return Number(b.timestamp) - Number(a.timestamp); });
        }
        if (notification.type === 'comm' || notification.type === 'comm-admin' || notification.type === "comm-request") {
            this.communityNotifications.push(notification);
            if (notification.seen == false) {
                this.unreadNotifications++;
            }
            this.communityNotifications.sort(function (a, b) { return Number(b.timestamp) - Number(a.timestamp); });
        }
        if (notification.type === 'form' || notification.type === 'form-shared' || notification.type === 'form-answer' || notification.type === 'form-discussion') {
            this.notifications.push(notification);
            if (notification.seen == false) {
                this.unreadNotifications++;
            }
            this.notifications.sort(function (a, b) { return Number(b.timestamp) - Number(a.timestamp); });
        }
    };
    NavbarComponent.prototype.getEventsList = function () {
        var _this = this;
        this.userService.afterLoginCheck().then(function (response) {
            if (response == '0')
                return;
            var onlyGetNewNotifications = !!_this.newestNotificationId;
            _this.http.post('/events/list', { since: _this.newestNotificationId })
                .toPromise()
                .then(function (eventsdata) {
                var eventsList;
                try {
                    eventsList = eventsdata.json();
                }
                catch (err) {
                    // Since we poll for events every few seconds, this will handle the
                    // case of an idle browser tab that becomes logged out
                    _this.router.navigate(['/users/login']);
                    return;
                }
                // nothing new so don't render / rerender
                if (!eventsList.events)
                    return;
                if (onlyGetNewNotifications) {
                    // we already have this.events and just need to append to it
                    Array.prototype.push.apply(_this.events, eventsList.events);
                }
                else {
                    // array of objects
                    _this.events = eventsList.events;
                }
                // clear the current list and add new data
                _this.clearNotifications();
                for (var _i = 0, _a = _this.events; _i < _a.length; _i++) {
                    var e = _a[_i];
                    // window.console.log(e);
                    _this.addNotification(e);
                }
                if (eventsList.newestEvent)
                    _this.newestNotificationId = eventsList.newestEvent;
            });
        });
    };
    NavbarComponent.prototype.showMoreNotifications = function () {
        var _this = this;
        this.notifShowCount += 10;
        window.setTimeout(function () { _this.showNotifications = true; }, 1);
    };
    NavbarComponent.prototype.setAsSeen = function (notification) {
        var _this = this;
        // if (notification.seen) {
        //     window.setTimeout(()=>{this.toggleNotifications();},10);
        //     return;
        // }
        this.http.post('/events/seen', { id: notification.id }).toPromise()
            .then(function (eventsdata) {
            // this.toggleNotifications();
            _this.unreadNotifications--;
            notification.seen = true;
        });
    };
    NavbarComponent.prototype.notificationLink = function (notification) {
        switch (notification.type) {
            case "form":
                if (notification.data.comm) {
                    return ['/group', notification.data.comm.value, { 'survey': notification.data.formid }];
                }
                else {
                    return ['/feed', { 'survey': notification.data.formid }];
                }
            case "form-answer":
                return ['/feed', { 'survey': notification.data }];
            case "form-shared":
                return ['/group', notification.data.commid];
            // return ['/group', notification.data.commid, { 'survey': notification.data.formid } ]
            case "form-discussion":
                return ['/feed', { 'survey': notification.data.formid, 'message': notification.data.messageid }];
            case "network":
            case "comm-request":
                return ['/profile', notification.fromUserId];
            case "comm":
            case "comm-admin":
                return ['/group', notification.data];
        }
    };
    NavbarComponent.prototype.notificationPic = function (notification) {
        if (notification.fromuser) {
            if (notification.fromuser.fb !== null) {
                return "https://graph.facebook.com/" + notification.fromuser.fb + "/picture?width=30&height=30";
            }
            else {
                if (notification.fromuser.pic) {
                    return notification.fromuser.pic;
                }
                else {
                    // return `/images/${notification.fromuser.gender}.png`;
                    return "/images/male.png";
                }
            }
        }
        else {
            return "/images/question.jpg";
        }
    };
    NavbarComponent.prototype.notificationMessage = function (notification) {
        var name;
        var pronoun;
        // trim message
        function trimMessage(string, wordCount) {
            if (wordCount === void 0) { wordCount = 12; }
            var index = 0;
            var words = 0;
            var finalString = [];
            if (!string)
                return '';
            for (var i = 0; i < string.length; i++) {
                if (string[i] === " ") {
                    words++;
                }
                if (words == wordCount) {
                    index = i;
                    break;
                }
            }
            if (!index) {
                return string;
            }
            else {
                return string.substr(0, index) + '...';
            }
        }
        if (notification.fromuser) {
            name = notification.fromuser.name;
            if (notification.fromuser.gender == "male") {
                pronoun = "his";
            }
            else if (notification.fromuser.gender == "female") {
                pronoun = "her";
            }
            else {
                pronoun = "their";
            }
        }
        else {
            name = "Someone";
            pronoun = "their";
        }
        switch (notification.type) {
            case "form":
                if (notification.data.comm) {
                    return { name: name, action: " asked", message: "'" + trimMessage(notification.qTitle) + "'", action2: " in ", community: "" + notification.data.comm.display.substr(1) };
                }
                else {
                    return { name: name, action: " asked", message: "'" + trimMessage(notification.qTitle) + "'" };
                }
            case "form-shared":
                return { name: name, action: " has shared ", message: "'" + trimMessage(notification.qTitle) + "'", action2: " in ", community: notification.commTitle };
            case "form-answer":
                return { name: name, action: " has answered your question '" + trimMessage(notification.qTitle) + "'" };
            case "form-discussion":
                return { name: name, action: " has commented on your question '" + trimMessage(notification.qTitle) + "'" };
            case "network":
                return { name: name, message: " invited you to be a part of " + pronoun + " network" };
            case "comm-request":
                return { name: name, message: " has requested to join ", community: notification.commTitle };
            case "comm":
                return { name: name, message: " has invited you to join ", community: notification.commTitle };
            case "comm-admin":
                return { name: name, message: " invited you to be an admin of ", community: notification.commTitle };
        }
    };
    NavbarComponent.prototype.logout = function () {
        this.goTo('/users/logout');
    };
    NavbarComponent.prototype.goTo = function (url) {
        window.location.href = url;
    };
    NavbarComponent.prototype.onDocClick = function (event) {
        // Auto Scroll for Filters in Feed Post
        if (jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).hasClass('filterButton')) {
            window.setTimeout(function () {
                var target = jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).closest('.fBody').find('#analysisContainer');
                if (target.length) {
                    jquery__WEBPACK_IMPORTED_MODULE_7__('html, body').animate({
                        scrollTop: Math.ceil(target.offset().top - 100)
                    }, 700);
                    return;
                }
            }, 50);
            return;
        }
        if (this.showNotifications) {
            this.navExpanded = false;
            this.showNotifications = false;
            jquery__WEBPACK_IMPORTED_MODULE_7__('body').css('overflow', 'auto');
        }
        if (jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).parents('.notificationDropdown').length || jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).parents('.settingsDropdown').length) {
            jquery__WEBPACK_IMPORTED_MODULE_7__('#navbarSupportedContent').removeClass('show');
        }
        if (jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).hasClass('navbar-toggler') || jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).hasClass('navbar-toggler-icon')) {
            return;
        }
        if (!jquery__WEBPACK_IMPORTED_MODULE_7__(event.target).parents('.navbar-collapse').length) {
            jquery__WEBPACK_IMPORTED_MODULE_7__('#navbarSupportedContent').removeClass('show');
        }
        if (this.showNotifications) {
            this.navExpanded = false;
            this.showNotifications = false;
            jquery__WEBPACK_IMPORTED_MODULE_7__('body').css('overflow', 'auto');
        }
    };
    NavbarComponent.prototype.closeNavbar = function () {
        jquery__WEBPACK_IMPORTED_MODULE_7__('#navbarSupportedContent').removeClass('show');
    };
    NavbarComponent.prototype.checkSubmit = function (form) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        }
        else {
            // submit
            this.submitSearch();
            this.searchbox.get("searchterm").setValue("");
            this.closeNavbar();
        }
    };
    NavbarComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    NavbarComponent.prototype.submitSearch = function () {
        this.router.navigate(['/searchresults', { 'q': this.searchbox.value.searchterm }]);
    };
    NavbarComponent.prototype.toggleNotifications = function () {
        var _this = this;
        if (this.showNotifications)
            return;
        window.setTimeout(function () {
            _this.showNotifications = !_this.showNotifications;
            jquery__WEBPACK_IMPORTED_MODULE_7__('body').css('overflow', 'hidden');
        }, 10);
    };
    NavbarComponent.prototype.acceptConnectionRequest = function (notification) {
        var _this = this;
        this.http.post("/users/settings/acceptnetworkrequest", { eventid: notification.id }).toPromise()
            .then(function () {
            _this.http.post("/events/delete", { id: notification.id }).toPromise()
                .then(function () {
                _this.reloadFullNotificationsList();
                _this.router.navigate(['/profile', notification.fromUserId]);
            });
        })
            .catch(function (error) { return alert("Error: " + error); });
    };
    NavbarComponent.prototype.deleteConnectionRequest = function (fromuserid, notificationid) {
        var _this = this;
        // Note: it might be better to mark the request as declined rather than deleting it
        this.http.post("/users/settings/removefromnetwork", { targetid: fromuserid }).toPromise()
            .then(function () {
            _this.reloadFullNotificationsList();
        })
            .catch(function (error) { return alert("Error: " + error); });
    };
    NavbarComponent.prototype.acceptCommunityRequest = function (x, asAdmin) {
        var _this = this;
        if (asAdmin === void 0) { asAdmin = false; }
        this.http.post("/users/settings/acceptcommrequest", { eventid: x, asadmin: asAdmin }).toPromise()
            .then(function () {
            _this.http.post("/events/delete", { id: x }).toPromise()
                .then(function () {
                _this.reloadFullNotificationsList();
            });
        })
            .catch(function (error) { return alert("Error: " + error); });
    };
    NavbarComponent.prototype.acceptNewgroupMemberRequest = function (x, commId, memberId) {
        var _this = this;
        this.http.post("/group/accept", { commid: commId, memberid: memberId }).toPromise()
            .then(function () {
            //delete event for all admins once one of them makes a decision
            _this.http.post("/events/delete", { id: x }).toPromise()
                .then(function () {
                _this.reloadFullNotificationsList();
            });
        })
            .catch(function (error) { return alert("Error: " + error); });
    };
    NavbarComponent.prototype.rejectNewgroupMemberRequest = function (x, commId, memberId) {
        var _this = this;
        this.http.post("/group/reject", { commid: commId, memberid: memberId }).toPromise()
            .then(function () {
            _this.reloadFullNotificationsList();
        })
            .catch(function (error) { return alert("Error: " + error); });
    };
    NavbarComponent.prototype.deleteCommunityRequest = function (x) {
        var _this = this;
        this.http.post("/users/settings/deletecommrequest", { eventid: x }).toPromise()
            .then(function () {
            _this.reloadFullNotificationsList();
        })
            .catch(function (error) { return alert("Error: " + error); });
    };
    NavbarComponent.prototype.markAllRead = function () {
        var _this = this;
        this.http.post("/events/markAllRead", {}).toPromise()
            .then(function () {
            _this.notifications.forEach(function (x) {
                x.seen = true;
            });
            _this.networkNotifications.forEach(function (x) {
                x.seen = true;
            });
            _this.communityNotifications.forEach(function (x) {
                x.seen = true;
            });
            _this.unreadNotifications = 0;
        })
            .catch(function (error) { return alert("Error: " + error); });
    };
    // Use this if you know this.events is now out-of-date
    NavbarComponent.prototype.reloadFullNotificationsList = function () {
        this.newestNotificationId = null;
        this.events = [];
        this.getEventsList();
    };
    NavbarComponent.prototype.clickedLogin = function () {
        var startingTime = this.startingTime;
        window.mixpanel.track("Login Clicked", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "timestamp": Date.now()
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('toggler'),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "toggler", void 0);
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/navbar/navbar.component.scss")],
            host: {
                '(document:click)': 'onDocClick($event)',
            }
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _share_service__WEBPACK_IMPORTED_MODULE_4__["ShareService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/new-feed-page/new-feed-page.component.html":
/*!************************************************************!*\
  !*** ./src/app/new-feed-page/new-feed-page.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-new-sidebar #sb [activeGroup]=\"viewGroupId\"></app-new-sidebar>\n<div class=\"flex\">\n    <div id=\"sidebarPlaceholder\"></div>\n    <div class=\"flex\">\n        <div></div>\n        <app-new-navbar (toggle)=\"sb.toggleSidebar($event)\"></app-new-navbar>\n        <div id=\"main-container\" class=\"flex flex-jcse\">\n            <div class=\"feed-column\">\n                <app-ask-question (refreshFeed)=\"feedList.refreshFeed($event)\"></app-ask-question>\n                <app-feed-list #feedList></app-feed-list>\n            </div>\n            <app-member-list style=\"z-index: -2;\" class=\"fullMobile\"></app-member-list>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/new-feed-page/new-feed-page.component.scss":
/*!************************************************************!*\
  !*** ./src/app/new-feed-page/new-feed-page.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n  justify-content: flex-start;\n  width: 100%;\n  position: relative;\n  z-index: 0; }\n\n.flex-jcfe {\n  justify-content: flex-end; }\n\n.flex-jcse {\n  justify-content: space-evenly; }\n\n#main-container {\n  padding-top: 120px;\n  flex-wrap: wrap; }\n\n@media (max-width: 768px) {\n    #main-container {\n      padding-top: 100px; } }\n\n.feed-column {\n  width: 100%;\n  max-width: 560px; }\n\n#sidebarPlaceholder {\n  min-width: 216px;\n  height: 100vh;\n  background: #28ab64; }\n\n@media (max-width: 768px) {\n    #sidebarPlaceholder {\n      display: none; } }\n\n@media (max-width: 768px) {\n  .fullMobile {\n    width: 100%;\n    order: -1; } }\n"

/***/ }),

/***/ "./src/app/new-feed-page/new-feed-page.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/new-feed-page/new-feed-page.component.ts ***!
  \**********************************************************/
/*! exports provided: NewFeedPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewFeedPageComponent", function() { return NewFeedPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NewFeedPageComponent = /** @class */ (function () {
    function NewFeedPageComponent() {
    }
    NewFeedPageComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], NewFeedPageComponent.prototype, "viewGroupId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], NewFeedPageComponent.prototype, "viewFilter", void 0);
    NewFeedPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-feed-page',
            template: __webpack_require__(/*! ./new-feed-page.component.html */ "./src/app/new-feed-page/new-feed-page.component.html"),
            styles: [__webpack_require__(/*! ./new-feed-page.component.scss */ "./src/app/new-feed-page/new-feed-page.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NewFeedPageComponent);
    return NewFeedPageComponent;
}());



/***/ }),

/***/ "./src/app/new-navbar/new-navbar.component.html":
/*!******************************************************!*\
  !*** ./src/app/new-navbar/new-navbar.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav>\n    <!-- <div class=\"left-block\"> -->\n        <img src=\"/assets/images/hamburger.svg\" class=\"menu-icon\" (click)=\"toggleSidebar()\" />\n        <div class=\"entry-block\">\n            <h1 class=\"entry-title\">{{selectedClass || \"Class Title\"}}</h1>\n            <div class=\"member-icon-array\">\n\n            </div>\n        </div>\n        <div class=\"tabs\">\n            <span class=\"tab active\">All</span>\n            <span class=\"tab\">My Posts</span>\n            <span class=\"tab\">Answered</span>\n        </div>\n    <!-- </div> -->\n    <div class=\"right-block\">\n        <input class=\"searchbar\" placeholder=\"Search here\" type=\"text\" />\n        <img src=\"https://picsum.photos/32/32/?random\" class=\"user-icon\">\n    </div>\n</nav>"

/***/ }),

/***/ "./src/app/new-navbar/new-navbar.component.scss":
/*!******************************************************!*\
  !*** ./src/app/new-navbar/new-navbar.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav {\n  height: 80px;\n  background: white;\n  box-sizing: border-box;\n  box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.11);\n  position: fixed;\n  left: 216px;\n  right: 0;\n  top: 0;\n  z-index: 1;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center; }\n  @media (max-width: 768px) {\n    nav {\n      left: 0; } }\n  .left-block {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n  width: 100%;\n  position: relative; }\n  .right-block {\n  display: flex;\n  justify-content: flex-start;\n  width: 400px;\n  position: absolute; }\n  @media (max-width: 768px) {\n    .right-block {\n      display: none; } }\n  .entry-title {\n  font-size: 1.6rem;\n  font-weight: 700;\n  font-family: \"Fira Sans\";\n  color: #464646;\n  margin-bottom: 0; }\n  @media (max-width: 768px) {\n    .entry-title {\n      font-size: 1.2rem; } }\n  .entry-block {\n  margin-left: 36px;\n  position: absolute;\n  top: 8px;\n  left: 0; }\n  @media (max-width: 768px) {\n    .entry-block {\n      top: 16px; } }\n  .tabs {\n  position: absolute;\n  margin-left: 36px;\n  padding: 8px 0;\n  z-index: 1;\n  bottom: 3px;\n  left: 0; }\n  .tab {\n  color: #7D857C;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: \"Fira Sans\";\n  margin-right: 4px;\n  padding: 8px 16px;\n  border-bottom: 3px solid transparent;\n  cursor: pointer; }\n  .tab.active, .tab:hover {\n    color: #67A85E;\n    border-bottom: 3px solid #67A85E; }\n  @media (max-width: 768px) {\n    .tab {\n      font-size: .8rem; } }\n  .searchbar {\n  width: 280px;\n  font-size: .75rem;\n  color: #333333;\n  outline: none;\n  padding: 4px 0;\n  padding-left: 20px !important;\n  margin-right: 20px;\n  border: solid 2px #dfe5e9; }\n  .searchbar:hover {\n    border-color: #28ab64;\n    transition: all 300ms ease-in-out; }\n  .searchbar:focus {\n    border-color: #28ab64; }\n  .searchbar:blur {\n    border-color: #dfe5e9; }\n  .user-icon {\n  width: 32px;\n  height: 32px;\n  border-radius: 16px; }\n  ::-webkit-input-placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  :-ms-input-placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  ::-ms-input-placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  ::placeholder {\n  color: #8a98a4;\n  opacity: 1;\n  font-size: 14px; }\n  .menu-icon {\n  display: none;\n  cursor: pointer;\n  z-index: 10; }\n  @media (max-width: 768px) {\n    .menu-icon {\n      width: 28px;\n      display: block;\n      margin: 0 16px; } }\n"

/***/ }),

/***/ "./src/app/new-navbar/new-navbar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/new-navbar/new-navbar.component.ts ***!
  \****************************************************/
/*! exports provided: NewNavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewNavbarComponent", function() { return NewNavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NewNavbarComponent = /** @class */ (function () {
    function NewNavbarComponent() {
        this.toggle = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectedClass = '';
    }
    NewNavbarComponent.prototype.ngOnInit = function () {
    };
    NewNavbarComponent.prototype.toggleSidebar = function () {
        this.toggle.emit(true);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], NewNavbarComponent.prototype, "toggle", void 0);
    NewNavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-navbar',
            template: __webpack_require__(/*! ./new-navbar.component.html */ "./src/app/new-navbar/new-navbar.component.html"),
            styles: [__webpack_require__(/*! ./new-navbar.component.scss */ "./src/app/new-navbar/new-navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NewNavbarComponent);
    return NewNavbarComponent;
}());



/***/ }),

/***/ "./src/app/new-sidebar/new-sidebar.component.html":
/*!********************************************************!*\
  !*** ./src/app/new-sidebar/new-sidebar.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sb-container\" [ngClass]=\"{open: this.open}\">\n    <div class=\"header\">\n        <span class=\"brand-text\">Questionsly</span>\n    </div>\n\n    <div class=\"group-section\">\n            <a class=\"section-entry\" [ngClass]=\"{active: !activeGroup}\" [routerLink]=\"['/']\">\n                {{orgName}}\n            </a>\n    </div>\n\n    <div *ngFor=\"let category of categories\" class=\"group-section\">\n        <h4 class=\"section-title\">{{category.displayNamePlural}}</h4>\n\n            <a *ngFor=\"let group of category.groups\" class=\"section-entry\"\n                [ngClass]=\"{active: group.id == activeGroup}\" [routerLink]=\"['/']\" [queryParams]=\"{group: group.id}\">\n                {{group.title}}\n            </a>\n\n            <a class=\"section-entry dim\" (click)=\"openCreateGroupModal(category)\">\n                + Add {{category.displayNameShort}}\n            </a>\n    </div>\n</div>\n\n<ng-template #createGroupModal let-c=\"close\" let-d=\"dismiss\">\n    <app-create-group [category]=\"createGroupCategory\"></app-create-group>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/new-sidebar/new-sidebar.component.scss":
/*!********************************************************!*\
  !*** ./src/app/new-sidebar/new-sidebar.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  text-decoration: none; }\n\n.sb-container {\n  width: 216px;\n  background: #28ab64;\n  box-shadow: 1px 0px 16px 0px rgba(0, 0, 0, 0.21);\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  bottom: 0px;\n  z-index: 1;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  transition: all 300ms ease-in-out; }\n\n@media (max-width: 768px) {\n    .sb-container {\n      -webkit-transform: translateX(-100%);\n              transform: translateX(-100%);\n      transition: all 300ms ease-in-out; }\n      .sb-container.open {\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n        transition: all 300ms ease-in-out; } }\n\n.brand-text {\n  display: block;\n  color: white;\n  padding: 16px 24px;\n  font-size: 1.2rem;\n  font-weight: 700;\n  font-family: Montserrat; }\n\n.group-section {\n  width: 100%;\n  margin-top: 16px;\n  border-top: 1px solid rgba(255, 255, 255, 0.2); }\n\n.section-title {\n  color: rgba(255, 255, 255, 0.45);\n  padding: 8px 16px;\n  margin: 0;\n  font-size: .9rem;\n  font-weight: 400;\n  font-family: \"Fira Sans\"; }\n\n.section-entry {\n  display: block;\n  color: #FFFFFF;\n  padding: 4px 16px 4px 24px;\n  margin: 0;\n  margin-bottom: 4px;\n  width: 100%;\n  font-size: 1rem;\n  font-weight: 300;\n  font-family: \"Fira Sans\";\n  cursor: pointer; }\n\n.section-entry:first-child {\n    position: relative;\n    top: 8px; }\n\n.section-entry.active {\n    font-weight: 700;\n    background: rgba(255, 255, 255, 0.1); }\n\n.section-entry.dim {\n    color: rgba(255, 255, 255, 0.6); }\n\n.section-entry:hover {\n    color: #FFFFFF !important;\n    background: rgba(255, 255, 255, 0.1); }\n"

/***/ }),

/***/ "./src/app/new-sidebar/new-sidebar.component.ts":
/*!******************************************************!*\
  !*** ./src/app/new-sidebar/new-sidebar.component.ts ***!
  \******************************************************/
/*! exports provided: NewSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewSidebarComponent", function() { return NewSidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewSidebarComponent = /** @class */ (function () {
    function NewSidebarComponent(http, modalService, router) {
        this.http = http;
        this.modalService = modalService;
        this.router = router;
        this.categories = [];
        this.orgName = '';
        this.open = false;
    }
    NewSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('/group/mylist')
            .toPromise()
            .then(function (response) {
            var responseJson = response.json();
            for (var _i = 0, _a = Object.keys(responseJson.categories); _i < _a.length; _i++) {
                var category = _a[_i];
                _this.categories.push(responseJson.categories[category]);
                // console.log('Category:', responseJson.categories[category]);
            }
        });
        this.http.get('/organizations/mine')
            .toPromise()
            .then(function (response) {
            var responseJson = response.json();
            _this.orgName = responseJson.organization.name;
            console.log('Category:', _this.orgName);
        });
    };
    // category is an object from the backend
    NewSidebarComponent.prototype.openCreateGroupModal = function (category) {
        this.createGroupCategory = category;
        var ref = this.modalService.open(this.createGroupModal);
        this.router.events
            .filter(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationStart"]; })
            .subscribe(function (event) {
            ref.close();
        });
    };
    NewSidebarComponent.prototype.toggleSidebar = function (val) {
        this.open = !this.open;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], NewSidebarComponent.prototype, "activeGroup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('createGroupModal'),
        __metadata("design:type", Object)
    ], NewSidebarComponent.prototype, "createGroupModal", void 0);
    NewSidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-sidebar',
            template: __webpack_require__(/*! ./new-sidebar.component.html */ "./src/app/new-sidebar/new-sidebar.component.html"),
            styles: [__webpack_require__(/*! ./new-sidebar.component.scss */ "./src/app/new-sidebar/new-sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], NewSidebarComponent);
    return NewSidebarComponent;
}());



/***/ }),

/***/ "./src/app/pie-chart/pie-chart.component.html":
/*!****************************************************!*\
  !*** ./src/app/pie-chart/pie-chart.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #pieChartDiv class=\"pie-chart\"></div>\n"

/***/ }),

/***/ "./src/app/pie-chart/pie-chart.component.scss":
/*!****************************************************!*\
  !*** ./src/app/pie-chart/pie-chart.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".pie-chart {\n  height: 240px; }\n"

/***/ }),

/***/ "./src/app/pie-chart/pie-chart.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pie-chart/pie-chart.component.ts ***!
  \**************************************************/
/*! exports provided: PieChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieChartComponent", function() { return PieChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PieChartComponent = /** @class */ (function () {
    function PieChartComponent() {
        this.newData = [];
        this.colorArray = [
            "#18663B",
            "#20884F",
            "#28AB63",
            "#53BB82",
            "#7ECCA1",
            "#A9DDC0",
            "#D4EEDF",
            "#145531",
            "#1C7745",
            "#249959",
            "#28AB63",
            "#3DB372",
            "#68C491",
            "#93D5B1",
            "#BEE5D0",
            "#E9F6EF",
        ];
    }
    PieChartComponent.prototype.ngAfterViewInit = function () {
        this.parseChartData();
        this.newData.sort(function (a, b) { return a.value - b.value; });
        window.echarts.init(this.pieChartDiv.nativeElement).setOption(this.getEchartsOptions());
    };
    PieChartComponent.prototype.getEchartsOptions = function () {
        return {
            series: [
                {
                    name: 'Results',
                    center: ['50%', '50%'],
                    type: 'pie',
                    radius: '55%',
                    // minAngle: 180,
                    data: this.newData,
                    // roseType: 'area',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999'
                            }
                        },
                        align: "center"
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#999'
                            },
                            smooth: 0.2,
                            length: 8,
                            length2: 8
                        }
                    },
                }
            ]
        };
    };
    PieChartComponent.prototype.parseChartData = function () {
        var items = this.dataLabels.length;
        var isMC = this.qKind === "Multiple Choice";
        for (var i = 0; i < items; i++) {
            var temp = {};
            // Color array has length 16
            var j = i % 16;
            temp = {
                name: this.dataLabels[i],
                value: this.dataValues[0].data[i],
                label: {
                    show: true,
                    position: "outside",
                    formatter: "{b}: " + this.dataCounts[i] + "\n({d}%)",
                    align: "center",
                    verticalAlign: "bottom",
                    rich: {
                        a: {
                            align: "center"
                        },
                        align: "center"
                    },
                    color: "#666",
                    fontFamily: "Karla",
                    fontWeight: 700
                },
                itemStyle: {
                    color: this.colorArray[j],
                    shadowBlur: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            };
            this.newData.push(temp);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], PieChartComponent.prototype, "qKind", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], PieChartComponent.prototype, "count", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], PieChartComponent.prototype, "dataLabels", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], PieChartComponent.prototype, "dataValues", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], PieChartComponent.prototype, "dataCounts", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pieChartDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], PieChartComponent.prototype, "pieChartDiv", void 0);
    PieChartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pie-chart',
            template: __webpack_require__(/*! ./pie-chart.component.html */ "./src/app/pie-chart/pie-chart.component.html"),
            styles: [__webpack_require__(/*! ./pie-chart.component.scss */ "./src/app/pie-chart/pie-chart.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PieChartComponent);
    return PieChartComponent;
}());



/***/ }),

/***/ "./src/app/popup.service.ts":
/*!**********************************!*\
  !*** ./src/app/popup.service.ts ***!
  \**********************************/
/*! exports provided: PopupService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupService", function() { return PopupService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var link = null;
var PopupService = /** @class */ (function () {
    function PopupService() {
    }
    PopupService.prototype.getLink = function () {
        return link;
    };
    PopupService.prototype.setLink = function (received) {
        link = received;
    };
    PopupService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], PopupService);
    return PopupService;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.html":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pageLayout\">\n     <div class=\"row\" >\n\n        <div class=\"col-md-3 col-sm-12 col-12 order-1 order-md-1\">\n            <app-sidebar *ngIf=\"!mobileWidth\" [friends]=\"network\" [loggedin]=\"loggedin\" [user]=\"id\" [context]=\"'profile'\" [name]=\"name\" [me]=\"me\"></app-sidebar>\n        </div>\n\n        <div class=\"col-md-6 col-12 order-2 order-md-2\">\n            <div id=\"profileContainer\" *ngIf=\"loadsuccessful\">\n\n                <!-- Header container with user info -->\n                <div class=\"aboutContainer\">\n\n                    <div>\n                        <div *ngIf=\"pictype == 'fb'\">\n                            <img src=\"https://graph.facebook.com/{{pic}}/picture?width=120&height=120\" class=\"profilePicture\">\n                        </div>\n                        <div *ngIf=\"pictype == 'local'\">\n                            <img [src]=\"pic\" class=\"profilePicture\"/>\n                        </div>\n                        <div *ngIf=\"pictype == 'default'\">\n                            <img *ngIf=\"gender == 'male'\" src=\"/images/male.png\" class=\"profilePicture\"/>\n                            <img *ngIf=\"gender == 'female'\" src=\"/images/female.png\" class=\"profilePicture\"/>\n                        </div>\n                    </div>\n\n                    <div class=\"profileInfo\">\n                        <h3 class=\"name\">{{name}}</h3>\n                        <h5 class=\"location\" *ngIf=\"location !== '' \">{{location}}</h5>\n                        <div style=\"display: flex;\">\n                            <i class=\"stats fa fa-pencil-square-o\" aria-hidden=\"true\">&nbsp;<span>{{nocreated ? nocreated : '0'}}</span></i>\n                            <i class=\"stats fa fa-pencil\" aria-hidden=\"true\">&nbsp;<span>{{notaken ? notaken : '0'}}</span></i>\n                            <i class=\"stats fa fa-comments\" aria-hidden=\"true\">&nbsp;<span>{{nodiscussion ? nodiscussion : '0'}}</span></i>\n                        </div>\n                        <div *ngIf=\"(loggedin && !innetwork && !pending && !me) || pending\" style=\"margin-top: 8px\">\n                            <a class=\"submitButton\" (click)=\"onAddToNetwork(id)\"\n                                *ngIf=\"loggedin && !innetwork && !pending && !me\">Add Friend</a>\n                            <a class=\"submitButton\" (click)=\"removeFriendOrRequest(id)\"\n                                *ngIf=\"pending && pendingRequestFromLoggedInUser\">Cancel Friend Request</a>\n                            <a class=\"submitButton\" (click)=\"onAcceptFriendRequest(id)\"\n                                *ngIf=\"pending && !pendingRequestFromLoggedInUser\">Accept Friend Request</a>\n                        </div>\n                        <div *ngIf=\"innetwork && !me\" style=\"margin-top: 8px\">\n                            Friends\n                        </div>\n                    </div>\n\n                    <div class=\"profileMenu\">\n                        <div>\n                            <div ngbDropdown placement=\"bottom-right\" class=\"mouseChangeToHand\" *ngIf=\"loggedin && !me\">\n                                <a  class=\"navlinks nav-link custom-dropdown-toggle\"\n                                    id=\"profile-menu\"\n                                    ngbDropdownToggle\n                                    aria-haspopup=\"true\"\n                                    aria-expanded=\"false\">\n                                    <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n                                </a>\n                                <div ngbDropdownMenu aria-labelledby=\"profile-menu\">\n                                    <a class=\"dropdown-item\" (click)=\"removeFriendOrRequest(id)\" *ngIf=\"innetwork && !me\" >Remove friend</a>\n                                    <a class=\"dropdown-item\" (click)=\"reportUser(id)\" *ngIf=\"!me\" >Report user</a>\n                                </div>\n                            </div>\n                            <div *ngIf=\"addfailed\">failed..</div>\n                        </div>\n                    </div>\n                </div>\n\n                <app-sidebar *ngIf=\"mobileWidth\" [friends]=\"network\" [loggedin]=\"loggedin\" [user]=\"id\" [context]=\"'profile'\" [name]=\"name\" [me]=\"me\"></app-sidebar>\n\n\n                <div *ngIf=\"!hidefeed && !genericSubsection\" class=\"feedRow\">\n                    <a [routerLink]=\"['/profile', id]\" [ngClass]=\"{currentFeed: showAnsweredQuestions, notCurrentFeed: !showAnsweredQuestions}\">\n                        Answered\n                    </a>\n                    <a [routerLink]=\"['/profile', id, 'asked']\" [ngClass]=\"{currentFeed: !showAnsweredQuestions, notCurrentFeed: showAnsweredQuestions}\">\n                        Asked\n                    </a>\n                </div>\n\n                <!-- Feed content or other info -->\n                <div class=\"\">\n                    <div *ngIf=\"!genericSubsection\"  style=\"margin-top:20px\">\n                        <div *ngIf=\"status == '2'\" class=\"aboutContainer\"><h6 class=\"location\" style=\"text-align: center; width: 100%;\">{{name}} has a private profile.<br/>Only {{pronoun}} friends can see further details.</h6></div>\n                        <app-feed-list\n                            [emptyMessage]=\"noPostsMessage\"\n                            [user]=\"id\"\n                            [showAnsweredQuestions]=\"showAnsweredQuestions\"\n                            *ngIf=\"!hidefeed\">\n                        </app-feed-list>\n                    </div>\n                    <div *ngIf=\"genericSubsection\" class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <h3 style=\"text-transform: capitalize\">{{genericSubsection}}</h3>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                               <app-resource-list [resource]=\"subsectionResource\" [list]=\"subsectionList\"></app-resource-list>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n            <div class=\"aboutContainer\" id=\"profileContainer\" *ngIf=\"!loadsuccessful && !loading\">\n                <div id=\"topJumbo\" class=\"aboutContainer\">\n                    <h2 style=\"overflow: auto\" class=\"location\">This profile could not be found!</h2>\n                    <p class=\"location\">Connect with a community of people to get all your questions answered!</p>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/profile/profile.component.scss":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#profileContainer {\n  min-height: 100%;\n  overflow: auto;\n  overflow-x: hidden;\n  margin-top: 8px; }\n  @media (max-width: 1140px) {\n    #profileContainer {\n      min-height: 0;\n      overflow: hidden; } }\n  #topJumbo {\n  border: 10px;\n  background: #e6f7ff; }\n  .mouseChangeToHand {\n  cursor: pointer;\n  cursor: hand; }\n  body {\n  margin: 0;\n  overflow: hidden;\n  background: url(\"http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/crossword.png\"); }\n  canvas {\n  -webkit-filter: blur(0.6px);\n  -moz-filter: blur(0.6px);\n  -o-filter: blur(0.6px);\n  -ms-filter: blur(0.6px);\n  filter: blur(0.6px); }\n  #Profile {\n  margin: auto;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  width: 120px;\n  height: 120px;\n  border-radius: 120px;\n  text-align: center;\n  cursor: pointer; }\n  #Profile img {\n  border-radius: 120px; }\n  #interests-input {\n  background-color: lightblue; }\n  /deep/ tag-input tag:not(:active) {\n  background-color: #fff !important; }\n  /deep/ tag-input tag-input-form input {\n  background-color: lightblue; }\n  #profile-menu-wrapper {\n  position: absolute;\n  top: 4rem;\n  right: 0.8rem; }\n  #profile-menu-wrapper #profile-menu {\n    font-size: 25px; }\n  .aboutContainer {\n  width: 100%;\n  padding: 25px;\n  display: flex;\n  align-items: center;\n  background: #FFF;\n  margin: 0px;\n  border-radius: 4px;\n  border: 1px solid #e2e2e2;\n  position: relative; }\n  .container {\n  margin-top: 8px;\n  border: 1px solid #e2e2e2;\n  background: #FFF;\n  border-radius: 4px; }\n  .container h3 {\n  margin: 12px 0 0 4px;\n  font-size: 1.3rem; }\n  .profilePicture {\n  width: 120px;\n  border-radius: 60px;\n  margin-right: 25px; }\n  @media (max-width: 767px) {\n    .profilePicture {\n      width: 64px;\n      border-radius: 32px; } }\n  .profileInfo {\n  display: flex;\n  flex-direction: column; }\n  .name {\n  margin-bottom: 2px;\n  font-family: Karla;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #333; }\n  @media (max-width: 767px) {\n    .name {\n      font-size: 1.2rem; } }\n  .location {\n  margin-bottom: 6px;\n  font-family: Karla;\n  font-size: 1.15rem;\n  font-weight: 300;\n  color: #666; }\n  @media (max-width: 767px) {\n    .location {\n      font-size: .8rem; } }\n  .stats {\n  color: #666;\n  font-size: .8rem;\n  font-weight: 400;\n  display: block; }\n  .stats::before {\n    margin-left: 4px; }\n  .stats::before:first-of-type {\n      margin-left: 0; }\n  .stats span {\n    font-weight: 700;\n    font-family: Karla; }\n  .addToNetwork {\n  position: absolute;\n  top: 20px;\n  right: 20px; }\n  .submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 1.5rem;\n  min-width: 100px;\n  max-width: 150px;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 0px; }\n  .submitButton:active {\n    outline-style: none; }\n  .submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n  @media (max-width: 767px) {\n    .submitButton {\n      font-size: .75rem; } }\n  .profileMenu {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  display: flex; }\n  .feedRow {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin: 12px 0; }\n  .feedRow a {\n    display: block; }\n  .currentFeed {\n  color: #FFF !important;\n  font-size: .75rem;\n  padding: 4px 12px;\n  border: 1px solid #666;\n  background: #666;\n  margin: 0 6px;\n  border-radius: 6px;\n  pointer-events: none; }\n  .notCurrentFeed {\n  color: #999;\n  font-size: .75rem;\n  padding: 4px 12px;\n  border: 1px solid #999;\n  margin: 0 6px;\n  border-radius: 6px;\n  text-decoration: none;\n  cursor: pointer; }\n  .notCurrentFeed:hover {\n    border-color: #333;\n    color: #666; }\n"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _share_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../share.service */ "./src/app/share.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(http, route, userService, shareService, fb) {
        this.http = http;
        this.route = route;
        this.userService = userService;
        this.shareService = shareService;
        this.fb = fb;
        this.loading = true;
        this.addfailed = false;
        this.loadsuccessful = false;
        this.loggedin = false;
        this.hidefeed = true;
        this.hidetags = true;
        this.pending = false;
        this.pendingRequestFromLoggedInUser = false;
        this.status = "0";
        this.genericSubsection = null;
        this.subsectionList = [];
        this.showAnsweredQuestions = true;
    }
    ProfileComponent.prototype.ngOnDestroy = function () {
        if (this.parametersObservable != null) {
            this.parametersObservable.unsubscribe();
        }
    };
    ProfileComponent.prototype.clearAll = function () {
        this.hidefeed = true;
        this.hidetags = true;
        this.id = null;
        this.form = this.fb.group({
            interests: null
        });
    };
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        // load new data
        this.loading = true;
        this.loadProfile();
        var recalculate = function () {
            _this.mobileWidth = window.document.body.clientWidth < 768 ? true : false;
        };
        window.addEventListener('resize', function () {
            recalculate();
        });
    };
    ProfileComponent.prototype.loadProfile = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.clearAll();
            _this.id = params.id;
            if (params.subsection == "asked") {
                _this.genericSubsection = "";
                _this.showAnsweredQuestions = false;
            }
            else {
                _this.genericSubsection = params.subsection;
            }
            switch (_this.genericSubsection) {
                case "friends":
                    _this.http.get("/users/network", { params: { user: params.id } }).toPromise().then(function (res) {
                        _this.subsectionList = res.json().data;
                        _this.subsectionResource = "user";
                    });
                    break;
                case "groups":
                    _this.http.post("/group/list", { user: params.id, userCommunitiesLimit: 100 }).toPromise().then(function (res) {
                        _this.subsectionList = res.json().data;
                        _this.subsectionResource = "community";
                    });
                    break;
            }
            _this.http.post("/users/profile/" + _this.id, {}).toPromise()
                .then(function (res) {
                _this.status = res.json().status;
                if (_this.status == '1') {
                    _this.hidefeed = true;
                    //
                    _this.userprofile = res.json().userprofile;
                    _this.network = res.json().network;
                    // counts
                    _this.nocreated = res.json().userprofile.nocreated;
                    _this.notaken = res.json().userprofile.notaken;
                    _this.nodiscussion = res.json().userprofile.nodiscussion;
                    //
                    _this.me = _this.userprofile.me;
                    _this.innetwork = _this.userprofile.innetwork;
                    _this.pending = _this.userprofile.pending;
                    _this.pendingRequestFromLoggedInUser = _this.userprofile.pendingRequestFromLoggedInUser;
                    _this.name = _this.userprofile.name.first + " " + _this.userprofile.name.last;
                    _this.firstname = _this.userprofile.name.first;
                    _this.gender = _this.userprofile.gender;
                    if (_this.me) {
                        _this.noPostsMessage = "Your profile content will begin to populate once you post a question or when you begin answering other questions.";
                    }
                    else {
                        _this.noPostsMessage = _this.firstname + " has not posted nor answered a question yet.";
                    }
                    if (_this.gender == "male") {
                        _this.pronoun = "his";
                    }
                    else if (_this.gender == "female") {
                        _this.pronoun = "her";
                    }
                    else {
                        _this.pronoun = "their";
                    }
                    if (_this.userprofile.location == null || _this.userprofile.location.city == "") {
                        _this.location = "";
                    }
                    else {
                        _this.location = _this.userprofile.location.city + ", " + _this.userprofile.location.state + ", " + _this.userprofile.location.country;
                    }
                    // deal with picture
                    // if pic was uploaded in settings
                    if (_this.shareService.data.profilePic) {
                        _this.pictype = "local";
                        _this.pic = _this.shareService.data.profilePic;
                    }
                    else {
                        if (_this.userprofile.facebookID != null) {
                            _this.pic = _this.userprofile.facebookID;
                            _this.pictype = "fb";
                        }
                        else {
                            if (_this.userprofile.pic != null) {
                                _this.pictype = "local";
                                _this.pic = _this.userprofile.pic;
                            }
                            else {
                                _this.pictype = "default";
                            }
                        }
                    }
                    // is the viewer logged in?
                    _this.loggedin = res.json().loggedin;
                    // switch off loading
                    _this.loading = false;
                    // loading successful (entire profile)
                    _this.loadsuccessful = true;
                    // show again
                    _this.hidefeed = false;
                    _this.hidetags = false;
                }
                else if (_this.status == '2') {
                    // display limited version of the profile
                    _this.hidefeed = true;
                    _this.hidetags = true;
                    _this.userprofile = res.json().userprofile;
                    // is the viewer loggedin
                    _this.loggedin = res.json().loggedin;
                    // counts
                    _this.nocreated = res.json().nocreated;
                    _this.notaken = res.json().notaken;
                    _this.nodiscussion = res.json().nodiscussion;
                    //
                    _this.innetwork = _this.userprofile.innetwork;
                    _this.pending = _this.userprofile.pending;
                    _this.pendingRequestFromLoggedInUser = _this.userprofile.pendingRequestFromLoggedInUser;
                    _this.name = _this.userprofile.name.first + " " + _this.userprofile.name.last;
                    _this.firstname = _this.userprofile.name.first;
                    _this.gender = _this.userprofile.gender;
                    if (_this.gender == "male") {
                        _this.pronoun = "his";
                    }
                    else if (_this.gender == "female") {
                        _this.pronoun = "her";
                    }
                    else {
                        _this.pronoun = "their";
                    }
                    _this.me = _this.userprofile.me;
                    if (_this.userprofile.location == null) {
                        _this.location = "";
                    }
                    else {
                        _this.location = _this.userprofile.location.city + ", " + _this.userprofile.location.state + ", " + _this.userprofile.location.country;
                    }
                    // deal with picture
                    if (_this.userprofile.facebookID != null) {
                        _this.pic = _this.userprofile.facebookID;
                        _this.pictype = "fb";
                    }
                    else {
                        if (_this.userprofile.pic != null) {
                            _this.pictype = "local";
                            _this.pic = _this.userprofile.pic;
                        }
                        else {
                            _this.pictype = "default";
                        }
                    }
                    // switch off loading
                    _this.loading = false;
                    _this.loadsuccessful = true;
                }
                else {
                    _this.loading = false;
                    _this.loadsuccessful = false;
                }
            })
                .catch(function (error) { return function (error) {
                this.loading = false;
                this.loadsuccessful = false;
            }; });
        });
    };
    ProfileComponent.prototype.onAddToNetwork = function (x) {
        var _this = this;
        if (this.loading)
            return false; // prevent double-click
        this.loading = true;
        this.http.post('/users/settings/addtonetwork', { targetid: x }).toPromise()
            .then(function (response) {
            _this.loading = false;
            if (response.json().status == 1) {
                _this.pending = true;
                _this.pendingRequestFromLoggedInUser = true;
            }
            else {
                _this.addfailed = true;
            }
        })
            .catch(function (error) { return function () {
            this.addfailed = true;
            this.loading = false;
        }; });
    };
    ;
    ProfileComponent.prototype.removeFriendOrRequest = function (x) {
        var _this = this;
        if (this.loading)
            return false; // prevent double-click
        this.loading = true;
        this.http.post('/users/settings/removefromnetwork', { targetid: x }).toPromise()
            .then(function (response) {
            _this.loading = false;
            if (response.json().status == 1) {
                _this.innetwork = false;
                _this.pending = false;
            }
            else {
                _this.addfailed = true;
            }
        })
            .catch(function (error) { return function () {
            this.addfailed = true;
            this.loading = false;
        }; });
    };
    ;
    ProfileComponent.prototype.onAcceptFriendRequest = function (x) {
        var _this = this;
        if (this.loading)
            return false; // prevent double-click
        this.loading = true;
        this.http.post('/users/settings/acceptfriendrequest', { targetid: x }).toPromise()
            .then(function (response) {
            _this.loading = false;
            if (response.json().status == 1) {
                _this.innetwork = true;
                _this.pending = false;
            }
            else {
                _this.addfailed = true;
            }
        })
            .catch(function (error) { return function () {
            this.addfailed = true;
            this.loading = false;
        }; });
    };
    ;
    ProfileComponent.prototype.reportUser = function (x) {
        this.http.post('/users/settings/report', { targetid: x }).toPromise()
            .then(function (response) {
            //
        })
            .catch(function (error) { return function () {
            //
        }; });
    };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.scss */ "./src/app/profile/profile.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _share_service__WEBPACK_IMPORTED_MODULE_5__["ShareService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/question/question.component.html":
/*!**************************************************!*\
  !*** ./src/app/question/question.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<li [ngClass]=\"{'question': true, 'silent': data.silent}\" [formGroup]=\"form\">\n    <div *ngIf=\"data.name === 'school'\">\n        <div class=\"body\">{{data.body}}</div>\n        <select #select (change)=\"text.value = ''\" class=\"form-control d-inline\" [formControlName]=\"data.name\">\n        <option selected value=\"\">Select Your School</option>\n        <option *ngFor=\"let option of data.options\" [value]=\"option.value\">{{option.label}}</option>\n        </select>\n        <span style=\"margin:0 5px\">or</span>\n        <input #text type=\"text\" placeholder=\"Enter Your School\" (change)=\"select.value = ''\" [formControlName]=\"data.name\" class=\"form-control d-inline\" />\n    </div>\n    <div *ngIf=\"data.name !== 'school'\">\n        <div *ngIf=\"data.body\" class=\"body\">{{data.body}}</div>\n        <div *ngIf=\"data.type == 'text'\">\n        <input class=\"form-control\" type=\"text\" [formControlName]=\"data.name\" [placeholder]=\"data.placeholder || ''\"/>\n        </div>\n        <div *ngIf=\"data.type == 'radio'\" class=\"options-container\">\n        <div *ngFor=\"let option of data.options\" class=\"form-check\">\n            <label class=\"form-check-label\">\n            <input class=\"form-check-input\" type=\"radio\" [value]=\"option.value\" [formControlName]=\"data.name\">\n            {{option.label}}\n            </label>\n        </div>\n        </div>\n        <select *ngIf=\"data.type == 'dropdown'\" class=\"form-control\" [formControlName]=\"data.name\">\n        <option selected value=\"\">{{data.placeholder}}</option>\n        <option *ngFor=\"let option of data.options\" [value]=\"option.value\">{{option.label}}</option>\n        </select>\n    </div>\n    <div *ngIf=\"data.subQuestions\" class=\"sub-question-list\">\n        <div *ngFor=\"let condition of keys(data.subQuestions)\">\n        <ul [hidden]=\"condition !== valueLabel\">\n            <app-question\n                *ngFor=\"let subQuestion of data.subQuestions[condition]\"\n                class=\"question sub-question\"\n                [form]=\"subFormGroup\"\n                [data]=\"subQuestion\"\n                [disabled]=\"condition !== valueLabel\"\n                [level]=\"level + 1\">\n            </app-question>\n        </ul>\n        </div>\n    </div>\n</li>\n"

/***/ }),

/***/ "./src/app/question/question.component.scss":
/*!**************************************************!*\
  !*** ./src/app/question/question.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".silent {\n  list-style-type: none; }\n\ninput[type=\"text\"], select {\n  margin-bottom: 10px; }\n"

/***/ }),

/***/ "./src/app/question/question.component.ts":
/*!************************************************!*\
  !*** ./src/app/question/question.component.ts ***!
  \************************************************/
/*! exports provided: QuestionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionComponent", function() { return QuestionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuestionComponent = /** @class */ (function () {
    function QuestionComponent(fb) {
        this.fb = fb;
        this.data = {};
        this.level = 0;
        this.disabled = false;
    }
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.type === 'dropdown') {
            this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
        }
        else {
            this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
        }
        this.form.addControl(this.data.name, this.control);
        if (this.disabled) {
            this.control.disable();
        }
        if (this.data.subQuestions) {
            this.subFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({});
            this.form.addControl(this.data.name + "FollowUp", this.subFormGroup);
        }
        this.control.valueChanges.subscribe(function (value) {
            if (value !== null && value !== '' && _this.data.options) {
                _this.valueLabel = _this.data.options.find(function (o) { return o.value == _this.control.value; }).label;
            }
            else {
                _this.valueLabel = "null";
            }
        });
    };
    QuestionComponent.prototype.ngOnChanges = function (inputs) {
        if (inputs.disabled && this.control) {
            if (inputs.disabled.currentValue) {
                this.control.reset();
                this.control.disable();
            }
            else {
                this.control.enable();
            }
        }
    };
    QuestionComponent.prototype.keys = function (obj) {
        return Object.keys(obj);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QuestionComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QuestionComponent.prototype, "level", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], QuestionComponent.prototype, "form", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], QuestionComponent.prototype, "disabled", void 0);
    QuestionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-question',
            template: __webpack_require__(/*! ./question.component.html */ "./src/app/question/question.component.html"),
            styles: [__webpack_require__(/*! ./question.component.scss */ "./src/app/question/question.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], QuestionComponent);
    return QuestionComponent;
}());



/***/ }),

/***/ "./src/app/resource-list/resource-list.component.html":
/*!************************************************************!*\
  !*** ./src/app/resource-list/resource-list.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"gallery\">\n  <div class=\"item\" *ngFor=\"let item of list\">\n    <a [routerLink]=\"link(item)\">\n      <img class=\"image\" src=\"{{pic(item)}}\" />\n    </a>\n    <a class=\"name\" [routerLink]=\"link(item)\" title=\"{{item.name || item.title}}\">\n      {{item.name || item.title}}\n    </a>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/resource-list/resource-list.component.scss":
/*!************************************************************!*\
  !*** ./src/app/resource-list/resource-list.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#gallery {\n  display: flex;\n  width: 100%;\n  flex-flow: row wrap;\n  padding: 10px 0px;\n  justify-content: flex-start; }\n\n.item {\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  padding: 5px;\n  margin-bottom: 10px;\n  flex-basis: 12.5%; }\n\n.item .image {\n    width: 80px;\n    height: 80px;\n    border-radius: 8px; }\n\n.item .name {\n    font-family: Karla;\n    color: #666;\n    font-size: .8rem;\n    overflow: hidden;\n    margin-top: 2px;\n    text-overflow: ellipsis;\n    text-align: center; }\n\n@media (max-width: 767px) {\n  .item {\n    flex-basis: 25%; }\n    .item .image {\n      width: 60px;\n      height: 60px; }\n    .item .name {\n      font-size: .7rem; } }\n\n@media (max-width: 320px) {\n  .item .image {\n    width: 50px;\n    height: 50px; } }\n"

/***/ }),

/***/ "./src/app/resource-list/resource-list.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/resource-list/resource-list.component.ts ***!
  \**********************************************************/
/*! exports provided: ResourceListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceListComponent", function() { return ResourceListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResourceListComponent = /** @class */ (function () {
    function ResourceListComponent(http) {
        this.http = http;
        this.list = [];
    }
    ResourceListComponent.prototype.pic = function (item) {
        if (item.fb) {
            return "https://graph.facebook.com/" + item.fb + "/picture?width=80&height=80";
        }
        else {
            if (item.pic) {
                return item.pic;
            }
            else {
                switch (this.resource) {
                    case "user":
                        return "/images/" + item.gender + ".png";
                    case "community":
                        return "/images/question.jpg";
                    case "form":
                        return "/images/question.jpg";
                }
            }
        }
    };
    ResourceListComponent.prototype.link = function (item) {
        switch (this.resource) {
            case "user":
                return "/profile/" + item.id;
            case "community":
                return "/group/" + item.id;
            case "form":
                return ['/feed', { 'survey': item.id }];
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ResourceListComponent.prototype, "resource", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], ResourceListComponent.prototype, "list", void 0);
    ResourceListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-resource-list',
            template: __webpack_require__(/*! ./resource-list.component.html */ "./src/app/resource-list/resource-list.component.html"),
            styles: [__webpack_require__(/*! ./resource-list.component.scss */ "./src/app/resource-list/resource-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], ResourceListComponent);
    return ResourceListComponent;
}());



/***/ }),

/***/ "./src/app/search-page/search-page.component.html":
/*!********************************************************!*\
  !*** ./src/app/search-page/search-page.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pageLayout\">\n    <div class=\"row\">\n\n        <div class=\"col-md-3 col-sm-12 col-12 order-2 order-md-1\">\n            <app-sidebar [context]=\"'feed'\"></app-sidebar>\n        </div>\n\n\n        <div class=\"col-md-6 col-12 order-1 order-md-2\">\n            <div class=\"aboutContainer\">\n                <h3 class=\"titles mainTitle\">Search Results</h3>    \n                <div *ngIf=\"results\">\n\n                    <h3 class=\"titles\">Users</h3>\n                    <app-resource-list *ngIf=\"usersearchresultsList && usersearchresultsList.length !== 0\" [resource]=\"'user'\" [list]=\"usersearchresultsList\"></app-resource-list>\n                    <h3 *ngIf=\"!usersearchresultsList || usersearchresultsList.length === 0\" class=\"noResults\">No users found matching this search</h3>\n\n                    <h3 class=\"titles\">Groups</h3>\n                    <app-resource-list *ngIf=\"communitysearchresultsList && communitysearchresultsList.length !== 0\" [resource]=\"'community'\" [list]=\"communitysearchresultsList\"></app-resource-list>\n                    <h3 *ngIf=\"!communitysearchresultsList || communitysearchresultsList.length === 0\" class=\"noResults\">No groups found matching this search</h3>\n\n                    <h3 class=\"titles\">Questions</h3>\n                    <app-resource-list *ngIf=\"formsearchresultsList && formsearchresultsList.length !== 0\" [resource]=\"'form'\" [list]=\"formsearchresultsList\"></app-resource-list>\n                    <h3 *ngIf=\"!formsearchresultsList || formsearchresultsList.length === 0\" class=\"noResults\">No questions found matching this search</h3>\n\n                    <!-- <h3 class=\"titles\">Tags</h3>\n                    <tag-banner-list [data]=\"tagsList\"></tag-banner-list>\n                    <h3 *ngIf=\"!usersearchresultsList || usersearchresultsList.length === 0\">No tags found matching this search.</h3> -->\n\n                </div>\n            </div>\n        </div>\n        <!-- <div class=\"col-xl-2 offset-xl-0 col-md-7 offset-md-3\" id=\"rightSideOfContainer\">\n            <feedback-form *ngIf=\"loggedin\"></feedback-form>\n        </div> -->\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/search-page/search-page.component.scss":
/*!********************************************************!*\
  !*** ./src/app/search-page/search-page.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".aboutContainer {\n  width: 100%;\n  padding: 25px;\n  display: flex;\n  flex-direction: column;\n  background: #FFF;\n  margin: 0px;\n  margin-top: 8px;\n  border-radius: 4px;\n  border: 1px solid #e2e2e2;\n  position: relative; }\n\n.titles {\n  margin-bottom: 6px;\n  font-family: Karla;\n  font-size: 1.3rem;\n  font-weight: 300;\n  color: #666;\n  margin-top: 10px; }\n\n@media (max-width: 767px) {\n    .titles {\n      font-size: 1.2rem; } }\n\n.mainTitle {\n  width: 100%;\n  text-align: center;\n  font-size: 1.5rem;\n  margin-top: 0px; }\n\n@media (max-width: 767px) {\n    .mainTitle {\n      font-size: 1.3rem; } }\n\n.noResults {\n  margin-bottom: 6px;\n  font-family: Karla;\n  font-weight: 300;\n  color: #666;\n  margin-top: 10px;\n  width: 100%;\n  text-align: center;\n  font-size: 1.1rem; }\n\n@media (max-width: 767px) {\n    .noResults {\n      font-size: .9rem; } }\n"

/***/ }),

/***/ "./src/app/search-page/search-page.component.ts":
/*!******************************************************!*\
  !*** ./src/app/search-page/search-page.component.ts ***!
  \******************************************************/
/*! exports provided: SearchPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageComponent", function() { return SearchPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchPageComponent = /** @class */ (function () {
    function SearchPageComponent(http, userService, route) {
        this.http = http;
        this.userService = userService;
        this.route = route;
        this.loggedin = false;
        this.searchoutput = [];
        this.results = false;
        this.usersearchresultsList = [];
        this.formsearchresultsList = [];
        this.communitysearchresultsList = [];
        this.tagsList = [];
    }
    SearchPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.afterLoginCheck().then(function (data) {
            if (data != 0) {
                _this.loggedin = true;
            }
        });
        this.route.params.subscribe(function (params) {
            _this.results = false;
            var query = params['q'];
            _this.http.post('/search/all', { keyword: query }).toPromise()
                .then(function (data) {
                if (data.json().status == 1) {
                    _this.usersearchresultsList = data.json().users;
                    _this.communitysearchresultsList = data.json().communities;
                    _this.formsearchresultsList = data.json().forms;
                    _this.tagsList = data.json().tags;
                    _this.results = true;
                }
                else {
                    _this.results = false;
                }
            });
        });
    };
    SearchPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-search-page',
            template: __webpack_require__(/*! ./search-page.component.html */ "./src/app/search-page/search-page.component.html"),
            styles: [__webpack_require__(/*! ./search-page.component.scss */ "./src/app/search-page/search-page.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], SearchPageComponent);
    return SearchPageComponent;
}());



/***/ }),

/***/ "./src/app/settings/settings.component.html":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container main-container\" *ngIf=\"reject\">\n    <h2 style=\"text-align: center; color: #999; margin-top: 20%;\">Please login to access this page.</h2>\n</div>\n\n<div class=\"container main-container\" *ngIf=\"!reject && !loaded\">\n    <h2 style=\"text-align: center; color: #999; margin-top: 20%;\">Loading Your Settings...</h2>\n</div>\n\n\n<div class=\"container main-container\" *ngIf=\"!reject && loaded\">\n    <div class=\"row\">\n        <div class=\"col-lg-2 col-sm-3 tab-list\">\n            <div class=\"container secondary-container\">\n                <div [ngClass]=\"{'row': true, 'tab-nav': true, 'active': activeTab == 'general'}\">\n                    <i class=\"fa fa-cogs\" aria-hidden=\"true\"></i>\n                    <a (click)=\"tabs.select('general-tab'); activeTab = 'general'\">General</a>\n                </div>\n                <div [ngClass]=\"{'row': true, 'tab-nav': true, 'active': activeTab == 'notifications'}\">\n                    <i class=\"fa fa-bell\" aria-hidden=\"true\"></i>\n                    <a (click)=\"tabs.select('notifications-tab'); activeTab = 'notifications'\">Email Notifications</a>\n                </div>\n                <div [ngClass]=\"{'row': true, 'tab-nav': true, 'active': activeTab == 'security'}\">\n                    <i class=\"fa fa-shield\" aria-hidden=\"true\"></i>\n                    <a (click)=\"tabs.select('security-tab'); activeTab = 'security'\">Security</a>\n                </div>\n                <div [ngClass]=\"{'row': true, 'tab-nav': true, 'active': activeTab == 'privacy'}\">\n                    <i class=\"fa fa-user-secret\" aria-hidden=\"true\"></i>\n                    <a (click)=\"tabs.select('privacy-tab'); activeTab = 'privacy'\">Privacy</a>\n                </div>\n                <div [ngClass]=\"{'row': true, 'tab-nav': true, 'active': activeTab == 'connections'}\">\n                    <i class=\"fa fa-address-book\" aria-hidden=\"true\"></i>\n                    <a (click)=\"tabs.select('connections-tab'); activeTab = 'connections'\">Connections</a>\n                </div>\n                <div [ngClass]=\"{'row': true, 'tab-nav': true, 'active': activeTab == 'communities'}\">\n                    <i class=\"fa fa-users\" aria-hidden=\"true\"></i>\n                    <a (click)=\"tabs.select('communities-tab'); activeTab = 'communities'\">Groups</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"col\">\n            <div class=\"container secondary-container\">\n                <ngb-tabset #tabs>\n                    <ngb-tab id=\"general-tab\" title=\"General\">\n                        <ng-template ngbTabContent>\n                            <h5 class=\"tab-title\">General configuration of the account</h5>\n                            <div id=\"general-box\" class=\"settings-box\">\n                                <div *ngFor=\"let field of profileFields\">\n                                    <div class=\"row field\">\n                                        <div class=\"col-sm-2\">\n                                            <div class=\"field-name\">{{field.label}}</div>\n                                        </div>\n                                        <div class=\"col\">\n                                            <div *ngIf=\"!field.edit\" class=\"visualization\">\n                                                <span class=\"field-value text-muted\">{{field.value}}</span>\n                                                <a (click)=\"field.edit = true; field.formValue = field.formGroup.value\" class=\"edit-btn\">Edit</a>\n                                            </div>\n                                            <form *ngIf=\"field.edit\" class=\"edit\" [formGroup]=\"field.formGroup\">\n                                                <div *ngFor=\"let input of field.inputs; let i = index\" class=\"form-group\">\n                                                    <div *ngIf=\"input.type == 'text'\">\n                                                        <label *ngIf=\"input.label\">{{input.label}}</label>\n                                                        <input class=\"form-control\" [formControlName]=\"input.name\">\n                                                        <div *ngIf=\"isInvalid(field.formGroup.get(input.name))\" class=\"invalid-feedback\">\n                                                            {{input.label || field.label}} is required\n                                                        </div>\n                                                    </div>\n                                                    <div *ngIf=\"input.type == 'radio'\">\n                                                        <div *ngFor=\"let option of input.options\" class=\"form-check\">\n                                                            <label class=\"form-check-label\">\n                                                                <input class=\"form-check-input\" type=\"radio\" [formControlName]=\"input.name\" [value]=\"option.value\"/>\n                                                                {{option.label}}\n                                                            </label>\n                                                        </div>\n                                                    </div>\n                                                    <div *ngIf=\"input.type == 'date'\">\n                                                        <label *ngIf=\"input.label\">{{input.label}}</label>\n                                                        <ng2-flatpickr\n                                                                class=\"d-inline-block\"\n                                                                [config]=\"input.config\"\n                                                                [formControlName]=\"input.name\">\n                                                        </ng2-flatpickr>\n                                                    </div>\n                                                    <div *ngIf=\"input.type == 'country'\">\n                                                        <label *ngIf=\"input.label\">{{input.label}}</label>\n                                                        <select [formControlName]=\"input.name\" class=\"form-control\">\n                                                            <option value=\"United States\" selected>United States</option>\n                                                            <option value=\"United States Minor Outlying Islands\">United States Minor Outlying Islands</option>\n                                                            <option value=\"Afghanistan\">Afghanistan</option>\n                                                            <option value=\"Albania\">Albania</option>\n                                                            <option value=\"Algeria\">Algeria</option>\n                                                            <option value=\"American Samoa\">American Samoa</option>\n                                                            <option value=\"Andorra\">Andorra</option>\n                                                            <option value=\"Angola\">Angola</option>\n                                                            <option value=\"Anguilla\">Anguilla</option>\n                                                            <option value=\"Antartica\">Antarctica</option>\n                                                            <option value=\"Antigua and Barbuda\">Antigua and Barbuda</option>\n                                                            <option value=\"Argentina\">Argentina</option>\n                                                            <option value=\"Armenia\">Armenia</option>\n                                                            <option value=\"Aruba\">Aruba</option>\n                                                            <option value=\"Australia\">Australia</option>\n                                                            <option value=\"Austria\">Austria</option>\n                                                            <option value=\"Azerbaijan\">Azerbaijan</option>\n                                                            <option value=\"Bahamas\">Bahamas</option>\n                                                            <option value=\"Bahrain\">Bahrain</option>\n                                                            <option value=\"Bangladesh\">Bangladesh</option>\n                                                            <option value=\"Barbados\">Barbados</option>\n                                                            <option value=\"Belarus\">Belarus</option>\n                                                            <option value=\"Belgium\">Belgium</option>\n                                                            <option value=\"Belize\">Belize</option>\n                                                            <option value=\"Benin\">Benin</option>\n                                                            <option value=\"Bermuda\">Bermuda</option>\n                                                            <option value=\"Bhutan\">Bhutan</option>\n                                                            <option value=\"Bolivia\">Bolivia</option>\n                                                            <option value=\"Bosnia and Herzegowina\">Bosnia and Herzegowina</option>\n                                                            <option value=\"Botswana\">Botswana</option>\n                                                            <option value=\"Bouvet Island\">Bouvet Island</option>\n                                                            <option value=\"Brazil\">Brazil</option>\n                                                            <option value=\"British Indian Ocean Territory\">British Indian Ocean Territory</option>\n                                                            <option value=\"Brunei Darussalam\">Brunei Darussalam</option>\n                                                            <option value=\"Bulgaria\">Bulgaria</option>\n                                                            <option value=\"Burkina Faso\">Burkina Faso</option>\n                                                            <option value=\"Burundi\">Burundi</option>\n                                                            <option value=\"Cambodia\">Cambodia</option>\n                                                            <option value=\"Cameroon\">Cameroon</option>\n                                                            <option value=\"Canada\">Canada</option>\n                                                            <option value=\"Cape Verde\">Cape Verde</option>\n                                                            <option value=\"Cayman Islands\">Cayman Islands</option>\n                                                            <option value=\"Central African Republic\">Central African Republic</option>\n                                                            <option value=\"Chad\">Chad</option>\n                                                            <option value=\"Chile\">Chile</option>\n                                                            <option value=\"China\">China</option>\n                                                            <option value=\"Christmas Island\">Christmas Island</option>\n                                                            <option value=\"Cocos Islands\">Cocos (Keeling) Islands</option>\n                                                            <option value=\"Colombia\">Colombia</option>\n                                                            <option value=\"Comoros\">Comoros</option>\n                                                            <option value=\"Congo\">Congo</option>\n                                                            <option value=\"Congo\">Congo, the Democratic Republic of the</option>\n                                                            <option value=\"Cook Islands\">Cook Islands</option>\n                                                            <option value=\"Costa Rica\">Costa Rica</option>\n                                                            <option value=\"Cota D'Ivoire\">Cote d'Ivoire</option>\n                                                            <option value=\"Croatia\">Croatia (Hrvatska)</option>\n                                                            <option value=\"Cuba\">Cuba</option>\n                                                            <option value=\"Cyprus\">Cyprus</option>\n                                                            <option value=\"Czech Republic\">Czech Republic</option>\n                                                            <option value=\"Denmark\">Denmark</option>\n                                                            <option value=\"Djibouti\">Djibouti</option>\n                                                            <option value=\"Dominica\">Dominica</option>\n                                                            <option value=\"Dominican Republic\">Dominican Republic</option>\n                                                            <option value=\"East Timor\">East Timor</option>\n                                                            <option value=\"Ecuador\">Ecuador</option>\n                                                            <option value=\"Egypt\">Egypt</option>\n                                                            <option value=\"El Salvador\">El Salvador</option>\n                                                            <option value=\"Equatorial Guinea\">Equatorial Guinea</option>\n                                                            <option value=\"Eritrea\">Eritrea</option>\n                                                            <option value=\"Estonia\">Estonia</option>\n                                                            <option value=\"Ethiopia\">Ethiopia</option>\n                                                            <option value=\"Falkland Islands\">Falkland Islands (Malvinas)</option>\n                                                            <option value=\"Faroe Islands\">Faroe Islands</option>\n                                                            <option value=\"Fiji\">Fiji</option>\n                                                            <option value=\"Finland\">Finland</option>\n                                                            <option value=\"France\">France</option>\n                                                            <option value=\"France Metropolitan\">France, Metropolitan</option>\n                                                            <option value=\"French Guiana\">French Guiana</option>\n                                                            <option value=\"French Polynesia\">French Polynesia</option>\n                                                            <option value=\"French Southern Territories\">French Southern Territories</option>\n                                                            <option value=\"Gabon\">Gabon</option>\n                                                            <option value=\"Gambia\">Gambia</option>\n                                                            <option value=\"Georgia\">Georgia</option>\n                                                            <option value=\"Germany\">Germany</option>\n                                                            <option value=\"Ghana\">Ghana</option>\n                                                            <option value=\"Gibraltar\">Gibraltar</option>\n                                                            <option value=\"Greece\">Greece</option>\n                                                            <option value=\"Greenland\">Greenland</option>\n                                                            <option value=\"Grenada\">Grenada</option>\n                                                            <option value=\"Guadeloupe\">Guadeloupe</option>\n                                                            <option value=\"Guam\">Guam</option>\n                                                            <option value=\"Guatemala\">Guatemala</option>\n                                                            <option value=\"Guinea\">Guinea</option>\n                                                            <option value=\"Guinea-Bissau\">Guinea-Bissau</option>\n                                                            <option value=\"Guyana\">Guyana</option>\n                                                            <option value=\"Haiti\">Haiti</option>\n                                                            <option value=\"Heard and McDonald Islands\">Heard and Mc Donald Islands</option>\n                                                            <option value=\"Holy See\">Holy See (Vatican City State)</option>\n                                                            <option value=\"Honduras\">Honduras</option>\n                                                            <option value=\"Hong Kong\">Hong Kong</option>\n                                                            <option value=\"Hungary\">Hungary</option>\n                                                            <option value=\"Iceland\">Iceland</option>\n                                                            <option value=\"India\">India</option>\n                                                            <option value=\"Indonesia\">Indonesia</option>\n                                                            <option value=\"Iran\">Iran (Islamic Republic of)</option>\n                                                            <option value=\"Iraq\">Iraq</option>\n                                                            <option value=\"Ireland\">Ireland</option>\n                                                            <option value=\"Israel\">Israel</option>\n                                                            <option value=\"Italy\">Italy</option>\n                                                            <option value=\"Jamaica\">Jamaica</option>\n                                                            <option value=\"Japan\">Japan</option>\n                                                            <option value=\"Jordan\">Jordan</option>\n                                                            <option value=\"Kazakhstan\">Kazakhstan</option>\n                                                            <option value=\"Kenya\">Kenya</option>\n                                                            <option value=\"Kiribati\">Kiribati</option>\n                                                            <option value=\"Democratic People's Republic of Korea\">Korea, Democratic People's Republic of</option>\n                                                            <option value=\"Korea\">Korea, Republic of</option>\n                                                            <option value=\"Kuwait\">Kuwait</option>\n                                                            <option value=\"Kyrgyzstan\">Kyrgyzstan</option>\n                                                            <option value=\"Lao\">Lao People's Democratic Republic</option>\n                                                            <option value=\"Latvia\">Latvia</option>\n                                                            <option value=\"Lebanon\">Lebanon</option>\n                                                            <option value=\"Lesotho\">Lesotho</option>\n                                                            <option value=\"Liberia\">Liberia</option>\n                                                            <option value=\"Libyan Arab Jamahiriya\">Libyan Arab Jamahiriya</option>\n                                                            <option value=\"Liechtenstein\">Liechtenstein</option>\n                                                            <option value=\"Lithuania\">Lithuania</option>\n                                                            <option value=\"Luxembourg\">Luxembourg</option>\n                                                            <option value=\"Macau\">Macau</option>\n                                                            <option value=\"Macedonia\">Macedonia, The Former Yugoslav Republic of</option>\n                                                            <option value=\"Madagascar\">Madagascar</option>\n                                                            <option value=\"Malawi\">Malawi</option>\n                                                            <option value=\"Malaysia\">Malaysia</option>\n                                                            <option value=\"Maldives\">Maldives</option>\n                                                            <option value=\"Mali\">Mali</option>\n                                                            <option value=\"Malta\">Malta</option>\n                                                            <option value=\"Marshall Islands\">Marshall Islands</option>\n                                                            <option value=\"Martinique\">Martinique</option>\n                                                            <option value=\"Mauritania\">Mauritania</option>\n                                                            <option value=\"Mauritius\">Mauritius</option>\n                                                            <option value=\"Mayotte\">Mayotte</option>\n                                                            <option value=\"Mexico\">Mexico</option>\n                                                            <option value=\"Micronesia\">Micronesia, Federated States of</option>\n                                                            <option value=\"Moldova\">Moldova, Republic of</option>\n                                                            <option value=\"Monaco\">Monaco</option>\n                                                            <option value=\"Mongolia\">Mongolia</option>\n                                                            <option value=\"Montserrat\">Montserrat</option>\n                                                            <option value=\"Morocco\">Morocco</option>\n                                                            <option value=\"Mozambique\">Mozambique</option>\n                                                            <option value=\"Myanmar\">Myanmar</option>\n                                                            <option value=\"Namibia\">Namibia</option>\n                                                            <option value=\"Nauru\">Nauru</option>\n                                                            <option value=\"Nepal\">Nepal</option>\n                                                            <option value=\"Netherlands\">Netherlands</option>\n                                                            <option value=\"Netherlands Antilles\">Netherlands Antilles</option>\n                                                            <option value=\"New Caledonia\">New Caledonia</option>\n                                                            <option value=\"New Zealand\">New Zealand</option>\n                                                            <option value=\"Nicaragua\">Nicaragua</option>\n                                                            <option value=\"Niger\">Niger</option>\n                                                            <option value=\"Nigeria\">Nigeria</option>\n                                                            <option value=\"Niue\">Niue</option>\n                                                            <option value=\"Norfolk Island\">Norfolk Island</option>\n                                                            <option value=\"Northern Mariana Islands\">Northern Mariana Islands</option>\n                                                            <option value=\"Norway\">Norway</option>\n                                                            <option value=\"Oman\">Oman</option>\n                                                            <option value=\"Pakistan\">Pakistan</option>\n                                                            <option value=\"Palau\">Palau</option>\n                                                            <option value=\"Panama\">Panama</option>\n                                                            <option value=\"Papua New Guinea\">Papua New Guinea</option>\n                                                            <option value=\"Paraguay\">Paraguay</option>\n                                                            <option value=\"Peru\">Peru</option>\n                                                            <option value=\"Philippines\">Philippines</option>\n                                                            <option value=\"Pitcairn\">Pitcairn</option>\n                                                            <option value=\"Poland\">Poland</option>\n                                                            <option value=\"Portugal\">Portugal</option>\n                                                            <option value=\"Puerto Rico\">Puerto Rico</option>\n                                                            <option value=\"Qatar\">Qatar</option>\n                                                            <option value=\"Reunion\">Reunion</option>\n                                                            <option value=\"Romania\">Romania</option>\n                                                            <option value=\"Russia\">Russian Federation</option>\n                                                            <option value=\"Rwanda\">Rwanda</option>\n                                                            <option value=\"Saint Kitts and Nevis\">Saint Kitts and Nevis</option>\n                                                            <option value=\"Saint LUCIA\">Saint LUCIA</option>\n                                                            <option value=\"Saint Vincent\">Saint Vincent and the Grenadines</option>\n                                                            <option value=\"Samoa\">Samoa</option>\n                                                            <option value=\"San Marino\">San Marino</option>\n                                                            <option value=\"Sao Tome and Principe\">Sao Tome and Principe</option>\n                                                            <option value=\"Saudi Arabia\">Saudi Arabia</option>\n                                                            <option value=\"Senegal\">Senegal</option>\n                                                            <option value=\"Seychelles\">Seychelles</option>\n                                                            <option value=\"Sierra\">Sierra Leone</option>\n                                                            <option value=\"Singapore\">Singapore</option>\n                                                            <option value=\"Slovakia\">Slovakia (Slovak Republic)</option>\n                                                            <option value=\"Slovenia\">Slovenia</option>\n                                                            <option value=\"Solomon Islands\">Solomon Islands</option>\n                                                            <option value=\"Somalia\">Somalia</option>\n                                                            <option value=\"South Africa\">South Africa</option>\n                                                            <option value=\"South Georgia\">South Georgia and the South Sandwich Islands</option>\n                                                            <option value=\"Span\">Spain</option>\n                                                            <option value=\"SriLanka\">Sri Lanka</option>\n                                                            <option value=\"St. Helena\">St. Helena</option>\n                                                            <option value=\"St. Pierre and Miguelon\">St. Pierre and Miquelon</option>\n                                                            <option value=\"Sudan\">Sudan</option>\n                                                            <option value=\"Suriname\">Suriname</option>\n                                                            <option value=\"Svalbard\">Svalbard and Jan Mayen Islands</option>\n                                                            <option value=\"Swaziland\">Swaziland</option>\n                                                            <option value=\"Sweden\">Sweden</option>\n                                                            <option value=\"Switzerland\">Switzerland</option>\n                                                            <option value=\"Syria\">Syrian Arab Republic</option>\n                                                            <option value=\"Taiwan\">Taiwan, Province of China</option>\n                                                            <option value=\"Tajikistan\">Tajikistan</option>\n                                                            <option value=\"Tanzania\">Tanzania, United Republic of</option>\n                                                            <option value=\"Thailand\">Thailand</option>\n                                                            <option value=\"Togo\">Togo</option>\n                                                            <option value=\"Tokelau\">Tokelau</option>\n                                                            <option value=\"Tonga\">Tonga</option>\n                                                            <option value=\"Trinidad and Tobago\">Trinidad and Tobago</option>\n                                                            <option value=\"Tunisia\">Tunisia</option>\n                                                            <option value=\"Turkey\">Turkey</option>\n                                                            <option value=\"Turkmenistan\">Turkmenistan</option>\n                                                            <option value=\"Turks and Caicos\">Turks and Caicos Islands</option>\n                                                            <option value=\"Tuvalu\">Tuvalu</option>\n                                                            <option value=\"Uganda\">Uganda</option>\n                                                            <option value=\"Ukraine\">Ukraine</option>\n                                                            <option value=\"United Arab Emirates\">United Arab Emirates</option>\n                                                            <option value=\"United Kingdom\">United Kingdom</option>\n                                                            <option value=\"Uruguay\">Uruguay</option>\n                                                            <option value=\"Uzbekistan\">Uzbekistan</option>\n                                                            <option value=\"Vanuatu\">Vanuatu</option>\n                                                            <option value=\"Venezuela\">Venezuela</option>\n                                                            <option value=\"Vietnam\">Viet Nam</option>\n                                                            <option value=\"Virgin Islands (British)\">Virgin Islands (British)</option>\n                                                            <option value=\"Virgin Islands (U.S)\">Virgin Islands (U.S.)</option>\n                                                            <option value=\"Wallis and Futana Islands\">Wallis and Futuna Islands</option>\n                                                            <option value=\"Western Sahara\">Western Sahara</option>\n                                                            <option value=\"Yemen\">Yemen</option>\n                                                            <option value=\"Yugoslavia\">Yugoslavia</option>\n                                                            <option value=\"Zambia\">Zambia</option>\n                                                            <option value=\"Zimbabwe\">Zimbabwe</option>\n                                                        </select>\n                                                    </div>\n                                                </div>\n                                                <button class=\"btn btn-primary\" [disabled]=\"field.formGroup.invalid && field.formGroup.wasChecked\" (click)=\"submitField(field)\">Save</button>\n                                                <button class=\"btn btn-secondary\" (click)=\"field.edit = false; field.formGroup.setValue(field.formValue)\">Cancel</button>\n                                            </form>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div>\n                                    <div class=\"row field\">\n                                        <div class=\"col-sm-2\">\n                                            <div class=\"field-name\">Education</div>\n                                        </div>\n                                        <div class=\"col\">\n                                            <div *ngIf=\"!educationfield.edit\" class=\"visualization\">\n                                                <span class=\"field-value text-muted\">{{educationfield.summary}}</span>\n                                                <a (click)=\"educationfield.edit = true\" class=\"edit-btn\">Edit</a>\n                                            </div>\n                                            <form *ngIf=\"educationfield.edit\" class=\"edit\" [formGroup]=\"generalQuestionsForm\">\n                                                <ul id=\"questions\">\n                                                    <app-question\n                                                            *ngFor=\"let question of generalQuestions\"\n                                                            [data]=\"question\"\n                                                            [form]=\"generalQuestionsForm\">\n                                                    </app-question>\n                                                </ul>\n                                                <div class=\"row\" *ngIf=\"generalQuestionsForm.submitted && generalQuestionsForm.pristine\">\n                                                    <div class=\"col text-center submitted-message\">\n                                                        <p class=\"alert alert-success\">Your profile is updated</p>\n                                                    </div>\n                                                </div>\n                                                <button [disabled]=\"generalQuestionsForm.invalid || generalQuestionsForm.pristine\" class=\"btn btn-primary\" (click)=\"postGeneralQuestions()\">Save</button>\n                                                <button class=\"btn btn-secondary\" (click)=\"educationfield.edit = false\">Cancel</button>\n                                            </form>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div *ngIf=\"passwordNotFB\">\n                                    <div class=\"row field\">\n                                        <div class=\"col-sm-2\">\n                                            <div class=\"field-name\">Profile picture</div>\n                                        </div>\n                                        <div class=\"col\">\n                                            <div *ngIf=\"!picture.edit\" class=\"visualization\">\n                                                <span class=\"field-value text-muted\">Profile picture</span>\n                                                <a (click)=\"picture.edit = true\" class=\"edit-btn\">Edit</a>\n                                            </div>\n                                            <form *ngIf=\"picture.edit\" class=\"edit\">\n                                                <div class=\"form-group\">\n\n\n                                                    <div class=\"input-group image-preview\">\n                                                        <span class=\"input-group-btn\">\n                                                        <div class=\"btn btn-default image-preview-input\">\n                                                            <span><i class=\"fa fa-folder-open\" aria-hidden=\"true\"></i></span>\n                                                            <span class=\"image-preview-input-title\">Browse</span>\n                                                            <input (change)=\"imgChangedEvent = $event; imgEditor.open()\" type=\"file\" accept=\"image/png, image/jpeg, image/gif\" name=\"input-file-preview\"/>\n                                                        </div>\n                                                        </span>\n                                                    </div>\n                                                </div>\n                                                <div class=\"row\">\n                                                    <div class=\"col-sm-6\">\n                                                        <p><b>Current profile picture</b></p>\n                                                        <p *ngIf=\"picture.current == null\">You currently do not have a profile picture.</p>\n                                                        <img style=\"border:1px solid gray;width:100px;\"  id=\"previewold\" [src]=\"picture.current\" *ngIf=\"picture.current != null\">\n                                                    </div>\n                                                    <div class=\"col-sm-6\" *ngIf=\"picture.newurl\">\n                                                        <p><b>New profile picture</b></p>\n                                                        <img style=\"border:1px solid gray;width:100px;\"  id=\"preview\" [src]=\"picture.newurl\">\n                                                    </div>\n\n                                                </div>\n                                                <div class=\"row\">\n                                                    &nbsp;\n                                                </div>\n                                                <div class=\"row\">\n                                                    <div class=\"alert alert-success\" *ngIf=\"picture.success\">\n                                                        <strong>Success!</strong> Your profile picture was updated.\n                                                    </div>\n                                                    <div class=\"alert alert-warning\" *ngIf=\"picture.failure\">\n                                                        <strong>Warning!</strong> Updating your profile picture failed. Please try again.\n                                                    </div>\n                                                </div>\n\n                                                    <button class=\"btn btn-primary\" [disabled]=\"!picture.newurl\" (click)=\"submitPicture()\">Save</button>\n                                                    <button class=\"btn btn-secondary\" (click)=\"rejectPicture()\">Cancel</button>\n                                            </form>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </ng-template>\n                    </ngb-tab>\n                    <ngb-tab id=\"notifications-tab\" title=\"Notifications\">\n                        <ng-template ngbTabContent>\n                            <h5 class=\"tab-title\">Notifications</h5>\n                            <div class=\"settings-box\">\n                                <form class=\"edit\" [formGroup]=\"notificationsettings.form\">\n                                    <div class=\"row field\" *ngFor=\"let field of notificationsettings.question\" style=\"margin-bottom: 16px; margin-top: 8px\">\n                                        <div class=\"col-sm-2\">\n                                            <div class=\"field-name\">{{field.label}}</div>\n                                        </div>\n                                        <div class=\"col\">\n                                                <div>\n                                                    {{field.body}}\n                                                    <div *ngFor=\"let option of field.options\" class=\"form-check\">\n                                                        <label class=\"form-check-label\">\n                                                            <input class=\"form-check-input\" type=\"radio\" [formControlName]=\"field.name\" [value]=\"option.value\"/>\n                                                            {{option.label}}\n                                                        </label>\n                                                    </div>\n                                                </div>\n                                        </div>\n                                    </div>\n                                    <button class=\"btn btn-primary\" [disabled]=\"notificationsettings.form.invalid && notificationsettings.form.wasChecked\" (click)=\"submitNotificationSettingsField()\" style=\"margin-bottom: 20px\">{{settingsSaved ? \"Saved!\" : \"Save\"}}</button>\n                                </form>\n                            </div>\n                        </ng-template>\n                    </ngb-tab>\n                    <ngb-tab id=\"security-tab\" title=\"Security\">\n                        <ng-template ngbTabContent>\n                            <h5 class=\"tab-title\">Security</h5>\n                            <div id=\"security-box\" class=\"settings-box\">\n                                <div *ngIf=\"!passwordNotFB\" class=\"row security-row\">\n                                    You are signed in using your facebook credentials.\n                                    Security settings, such are changing your password are managed by Facebook.\n                                </div>\n                                <div *ngIf=\"passwordNotFB\" class=\"row security-row\" id=\"password-change\">\n                                    <div class=\"col-sm-6 col-9\">\n                                        <div class=\"icon d-inline-block\">\n                                            <i class=\"fa fa-key\" aria-hidden=\"true\" style=\"position: absolute; top:3px; left:15px; font-size: 18px;\"></i>\n                                        </div>\n                                        <div class=\"content d-inline-block\" style=\"line-height:10px;\">\n                                            <div class=\"visualization\">\n                                                <label style=\"font-weight: bold\">Change password</label>\n                                                <div class=\"text-muted\">It is recommended to use a secure password</div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div *ngIf=\"passwordEdit\" class=\"col\">\n                                        <form [formGroup]=\"passwordForm\" class=\"edit\">\n                                            <div class=\"form-group\">\n                                                <label>Current</label>\n                                                <input class=\"form-control\" formControlName=\"current\" type=\"password\"/>\n                                                <div *ngIf=\"isInvalid(passwordForm.get('current'))\" class=\"invalid-feedback\">\n                                                    Current password is required\n                                                </div>\n                                            </div>\n                                            <div class=\"form-group\">\n                                                <label>New</label>\n                                                <input class=\"form-control\" formControlName=\"new\" type=\"password\"/>\n                                                <div *ngIf=\"isInvalid(passwordForm.get('new'))\" class=\"invalid-feedback\">\n                                                    New password is required\n                                                </div>\n                                            </div>\n                                            <div class=\"form-group\">\n                                                <label>Repeat new password</label>\n                                                <input class=\"form-control\"  formControlName=\"confirmation\" type=\"password\"/>\n                                                <div *ngIf=\"isInvalid(passwordForm.get('confirmation'))\" class=\"invalid-feedback\">\n                                                    Password confirmation is required\n                                                </div>\n                                                <div *ngIf=\"passwordForm.get('confirmation').touched && passwordForm.get('confirmation').value != '' && passwordForm.errors && passwordForm.errors.passwordMismatch\" class=\"invalid-feedback\">\n                                                    Passwords don't match\n                                                </div>\n                                            </div>\n                                            <button class=\"btn btn-primary\" (click)=\"submitPasswordChange()\" [disabled]=\"passwordForm.invalid && passwordForm.wasChecked\">Save changes</button>\n                                            <button class=\"btn btn-secondary\" (click)=\"passwordEdit = false; passwordForm.reset()\">Cancel</button>\n                                        </form>\n                                    </div>\n                                    <div *ngIf=\"!passwordEdit\" class=\"col\">\n                                        <button class=\"btn edit-btn\" style=\"float:right; padding: 5px 12px; font-size: 12px; font-weight: bold;\" (click)=\"passwordEdit = true; passwordChangeSuccess = false\">Edit</button>\n                                    </div>\n                                </div>\n                                <div class=\"row\" *ngIf=\"passwordChangeSuccess\">\n                                    <div class=\"col text-center submitted-message\">\n                                        <p class=\"alert alert-success\">Password has been changed successfully</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </ng-template>\n                    </ngb-tab>\n                    <ngb-tab id=\"privacy-tab\" title=\"Privacy\">\n                        <ng-template ngbTabContent>\n                            <h5 class=\"tab-title\">Privacy</h5>\n                            <div class=\"settings-box\">\n                                <div class=\"row field\" style=\"margin-top: 8px; margin-bottom: 16px\">\n                                    <div class=\"col-sm-2\">\n                                        <div class=\"field-name\">Profile visibility</div>\n                                    </div>\n                                    <div class=\"col\">\n                                        <form class=\"edit\" [formGroup]=\"profilepublic.form\">\n                                                <div>\n                                                    {{profilepublic.question.body}}\n                                                    <div *ngFor=\"let option of profilepublic.question.options\" class=\"form-check\">\n                                                        <label class=\"form-check-label\">\n                                                            <input class=\"form-check-input\" type=\"radio\" [formControlName]=\"profilepublic.question.name\" [value]=\"option.value\"/>\n                                                            {{option.label}}\n                                                        </label>\n                                                    </div>\n                                                </div>\n                                            </form>\n                                        </div>\n                                    </div>\n                                    <button class=\"btn btn-primary\" [disabled]=\"profilepublic.form.invalid && profilepublic.form.wasChecked\" (click)=\"submitPublicField()\" style=\"margin: 20px;\">Save</button>\n                            </div>\n                        </ng-template>\n                    </ngb-tab>\n                    <ngb-tab id=\"connections-tab\" title=\"Connections\">\n                        <ng-template ngbTabContent>\n                            <h5 class=\"tab-title\">Your connections</h5>\n                            <div class=\"settings-box\">\n                                <div *ngIf=\"network.length > 0\">\n                                    <div class=\"col\" *ngFor=\"let data of network\">\n                                        <div class=\"row\">\n                                            <div class=\"col-md-2\">\n                                                <img *ngIf=\"data.pic[0] == 'fb'\" src=\"https://graph.facebook.com/{{data.pic[1]}}/picture?width=30&height=30\" height=\"30\" width=\"30\">\n                                                <img *ngIf=\"data.pic[0] == 'local'\" [src]=\"data.pic[1]\" height=\"30\" width=\"30\" />\n                                                <img *ngIf=\"data.pic[0] == 'default' && data.pic[1] == 'male'\" src=\"/images/male.png\" height=\"30\" width=\"30\" />\n                                                <img *ngIf=\"data.pic[0] == 'default' && data.pic[1] == 'female'\" src=\"/images/female.png\" height=\"30\" width=\"30\" />\n                                            </div>\n                                            <div class=\"col-md-5\">\n                                                <a [routerLink]=\"['/profile', data.link]\">{{data.name.first}} {{data.name.last}}</a>\n                                            </div>\n                                            <div class=\"col-md-3\">\n                                                <button class=\"btn btn-primary\" style=\"margin-top: 5px; margin-bottom: 5px;\" (click)=\"deleteConnection(data.edgeid)\">Delete</button>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </ng-template>\n                    </ngb-tab>\n                    <ngb-tab id=\"communities-tab\" title=\"Groups\">\n                        <ng-template ngbTabContent>\n                            <h5 class=\"tab-title\">Your groups</h5>\n                            <div class=\"settings-box\">\n                                <div *ngIf=\"comm.length > 0\">\n                                    <div class=\"col\" *ngFor=\"let data of comm\">\n                                        <div class=\"row\" style=\"margin: 8px 0;\">\n                                            <div class=\"col-md-2\">\n                                                <img *ngIf=\"data.pic\" src=\"{{data.pic}}\" height=\"30\" width=\"30\">\n                                            </div>\n                                            <div class=\"col-md-5\">\n                                                <a [routerLink]=\"['/group', data.link]\">{{data.title}}</a>\n                                            </div>\n                                            <div class=\"col-md-3\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </ng-template>\n                    </ngb-tab>\n                </ngb-tabset>\n            </div>\n        </div>\n    </div>\n</div>\n\n<app-image-editor #imgEditor [imgChangedEvent]=\"imgChangedEvent\" (done)=\"getSignedRequest($event)\"></app-image-editor>\n"

/***/ }),

/***/ "./src/app/settings/settings.component.scss":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  cursor: pointer; }\n\n/deep/ ul.nav-tabs {\n  display: none !important; }\n\n.ng-invalid.ng-touched {\n  border-color: #ea7a85; }\n\n.invalid-feedback {\n  color: #ea7a85;\n  display: block; }\n\n.tab-list {\n  border-right: 1px solid #ccc; }\n\n.tab-list .tab-nav {\n    cursor: hand;\n    padding: 5px; }\n\n.tab-list .tab-nav.active {\n      background-color: #c4d2e7;\n      font-weight: bold; }\n\n.tab-list .tab-nav i {\n      margin-right: 5px;\n      width: 15px; }\n\n.tab-title {\n  font-size: 18px;\n  font-weight: bold; }\n\n/deep/ input {\n  font-size: 12px !important;\n  width: auto !important;\n  padding: 5px !important; }\n\n/deep/ select {\n  font-size: 12px !important;\n  width: auto !important;\n  height: auto !important;\n  padding: 5px !important; }\n\nbutton {\n  font-size: 12px;\n  font-weight: bold; }\n\n.settings-box {\n  border-top: 1px solid #000;\n  border-bottom: 1px solid #000; }\n\n.edit /deep/ label, .edit input {\n  display: inline; }\n\n.edit label {\n  font-size: 12px;\n  font-weight: bold;\n  color: #666; }\n\n.edit /deep/ input {\n  font-size: 12px;\n  width: auto;\n  padding: 5px; }\n\n.edit button {\n  font-size: 12px;\n  font-weight: bold; }\n\n#general-box .field {\n  border-bottom: 1px #e9ebee solid;\n  margin: 0;\n  padding: 8px 0; }\n\n#general-box .field .field-name {\n    font-weight: bold;\n    font-size: 12px; }\n\n#general-box .field .visualization .field-value {\n    font-size: 12px; }\n\n#general-box .field .visualization .edit-btn {\n    font-size: 12px;\n    color: blue;\n    cursor: hand;\n    float: right; }\n\n#security-box .security-row {\n  margin: 0;\n  padding: 15px 0; }\n\n#security-box .security-row .icon, #security-box .security-row .content {\n    display: inline-block; }\n\n#security-box .security-row .content {\n    margin-left: 30px; }\n\n@media (max-width: 767px) {\n    #security-box .security-row .edit {\n      margin-top: 20px; } }\n\n#security-box .security-row#password-change label {\n    display: inline-block;\n    width: 130px; }\n\nul#questions {\n  padding-left: 20px;\n  padding-top: 20px; }\n"

/***/ }),

/***/ "./src/app/settings/settings.component.ts":
/*!************************************************!*\
  !*** ./src/app/settings/settings.component.ts ***!
  \************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _share_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../share.service */ "./src/app/share.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(http, fb, route, router, userService, shareService) {
        this.http = http;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.shareService = shareService;
        this.profile = {};
        this.passwordNotFB = false;
        this.passwordEdit = false;
        this.passwordChangeSuccess = false;
        this.activeTab = 'general';
        this.generalQuestionsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({});
        this.profilepublic = { form: null, question: {} };
        this.notificationsettings = { form: null, question: {} };
        this.educationfield = { edit: false, values: null, summary: '' };
        this.reject = false;
        this.picture = { edit: false, formValue: null, current: null, newurl: null, success: false, failure: false };
        this.loaded = false;
        this.settingsSaved = false;
    }
    SettingsComponent.prototype.range = function (start, end) {
        return Array.from({ length: (end - start) }, function (v, k) { return k + start; });
    };
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http
            .get('/assets/data/US-schools.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (json) {
            _this.UsaSchools = json;
            _this.userService.afterLoginCheck().then(function (userData) {
                if (userData) {
                    _this.retrieveData();
                }
                else {
                    _this.reject = true;
                    window.setTimeout(function () { _this.router.navigate(['/']); }, 1800);
                }
            });
        });
    };
    SettingsComponent.prototype.retrieveData = function () {
        var _this = this;
        var thisss = this;
        this.http
            .get("/users/settings/info").toPromise()
            .then(function (res) {
            if (res.json().status == 1) {
                _this.profile = res.json().data;
                _this.comm = res.json().comm;
                _this.network = res.json().network;
                _this.notifications = res.json().notifications;
                // process picture
                _this.picture.current = _this.profile.pic;
                // process education
                _this.educationfield = { edit: false, values: _this.profile.education, summary: '' };
                if (_this.educationfield.values != null) {
                    if (_this.educationfield.values.undergraduateDegree == false && _this.educationfield.values.mastersDegree == false) {
                        _this.educationfield.summary = '';
                    }
                    else if (_this.educationfield.values.undergraduateDegree == true && _this.educationfield.values.mastersDegree == false) {
                        _this.educationfield.summary = 'Undergraduate degree';
                    }
                    else if (_this.educationfield.values.undergraduateDegree == true && _this.educationfield.values.mastersDegree == true) {
                        _this.educationfield.summary = 'Postgraduate degree';
                    }
                }
                //
                _this.passwordNotFB = (_this.profile.facebookID == null);
                _this.constructProfileFields();
                _this.loaded = true;
                _this.passwordForm = _this.fb.group({
                    current: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                    new: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                    confirmation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
                }, {
                    validator: _this.passwordMatchValidator
                });
                // privacy stuff
                _this.profilepublic.form = _this.fb.group({
                    public: [_this.profile.public, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
                });
                _this.profilepublic.question = {
                    body: 'Would you like your profile to be visible to anyone visiting Questionsly?',
                    name: 'public',
                    type: 'radio',
                    options: [
                        { value: true, label: 'Yes' },
                        { value: false, label: 'No' }
                    ]
                };
                // notification settings
                _this.notificationsettings.form = _this.fb.group({
                    summary: [_this.profile.notifications.summary, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
                });
                _this.notificationsettings.question = [{
                        label: 'Daily Summary',
                        body: 'Would you like to receive emails summarizing your daily activity?',
                        name: 'summary',
                        type: 'radio',
                        options: [
                            { value: true, label: 'Yes' },
                            { value: false, label: 'No' }
                        ]
                    }];
                // which page should be opened
                _this.route.params.subscribe(function (params) {
                    if (params['page'] == 'notifications') {
                        _this.tabs.select('notifications-tab');
                        _this.activeTab = 'notifications';
                    }
                });
                var currentDate = new Date();
                var degreeQuestions = {
                    'Yes': [
                        {
                            body: 'Enter or select the name of your school',
                            name: 'school',
                            type: 'dropdown',
                            options: _this.UsaSchools.map(function (school) {
                                return { label: school, value: school };
                            })
                        },
                        {
                            body: 'Have you graduated?',
                            name: 'graduated',
                            type: 'radio',
                            options: [
                                { value: true, label: 'Yes' },
                                { value: false, label: 'No' }
                            ],
                            subQuestions: {
                                'Yes': [
                                    {
                                        body: 'When did you graduate',
                                        placeholder: 'Select year',
                                        name: 'graduatedYear',
                                        type: 'dropdown',
                                        options: _this.range(1950, currentDate.getFullYear()).map(function (year) {
                                            return {
                                                value: year,
                                                label: year
                                            };
                                        })
                                    }
                                ],
                                'No': [
                                    {
                                        body: 'When do you expect to graduate',
                                        placeholder: 'Select year',
                                        name: 'expectToGraduate',
                                        type: 'dropdown',
                                        options: _this.range(2017, 2023).map(function (year) {
                                            return {
                                                value: year,
                                                label: year
                                            };
                                        })
                                    }
                                ]
                            }
                        }
                    ]
                };
                _this.generalQuestions = [
                    {
                        body: 'Do you have a master\'s degree or are you enrolled in one?',
                        name: 'mastersDegree',
                        type: 'radio',
                        options: [
                            { value: true, label: 'Yes' },
                            { value: false, label: 'No' }
                        ],
                        subQuestions: {
                            'Yes': [
                                {
                                    body: 'Is it an MBA?',
                                    name: 'mba',
                                    type: 'radio',
                                    options: [
                                        { value: true, label: 'Yes' },
                                        { value: false, label: 'No' }
                                    ],
                                    subQuestions: Object.assign({}, degreeQuestions, {
                                        'No': [
                                            {
                                                body: "What's your master's in (major)",
                                                name: 'major',
                                                type: 'text'
                                            }
                                        ]
                                    })
                                }
                            ]
                        }
                    },
                    {
                        body: "Do you have an undergraduate's degree or are you enrolled in one?",
                        name: 'undergraduateDegree',
                        type: 'radio',
                        options: [
                            { value: true, label: 'Yes' },
                            { value: false, label: 'No' }
                        ],
                        subQuestions: degreeQuestions
                    }
                ];
            }
            else {
                _this.reject = true;
            }
        })
            .catch(function (e) {
            thisss.reject = true;
            console.log(e);
        });
    };
    SettingsComponent.prototype.passwordMatchValidator = function (input) {
        var errors = null;
        if (input.get('new').value != input.get('confirmation').value) {
            errors = { passwordMismatch: true };
        }
        return errors;
    };
    SettingsComponent.prototype.getProfileFields = function () {
        var _this = this;
        var profile = this.profile;
        // check for blank location.
        if (profile.location == null) {
            profile.location = { city: 'NA', state: 'NA', country: 'NA' };
        }
        if (profile.dob == null) {
            profile.dob = { year: '1900', month: '1', date: '1' };
        }
        return [
            {
                label: 'Name',
                name: 'name',
                value: profile.name.first + " " + profile.name.last,
                edit: false,
                inputs: [
                    {
                        label: 'First name',
                        name: 'first',
                        type: 'text',
                        value: profile.name.first
                    },
                    {
                        label: 'Last name',
                        name: 'last',
                        type: 'text',
                        value: profile.name.last
                    }
                ]
            },
            {
                label: 'Email',
                name: 'email',
                value: profile.email,
                edit: false,
                inputs: [
                    {
                        name: 'email',
                        type: 'text'
                    }
                ]
            },
            {
                label: 'Gender',
                name: 'gender',
                value: profile.gender,
                edit: false,
                inputs: [
                    {
                        type: 'radio',
                        name: 'gender',
                        options: [
                            {
                                label: 'Male',
                                value: 'male',
                            },
                            {
                                label: 'Female',
                                value: 'female',
                            }
                        ]
                    }
                ]
            },
            {
                label: 'DOB',
                name: 'dob',
                value: (new Date(profile.dob.year, profile.dob.month, profile.dob.date)).toDateString(),
                edit: false,
                formatValue: function (value) {
                    value = value.dob;
                    // control wraps the value in array sometimes
                    if (value.length) {
                        value = value[0];
                    }
                    return {
                        dob: {
                            year: value.getFullYear(),
                            month: value.getMonth(),
                            date: value.getDate()
                        }
                    };
                },
                inputs: [
                    {
                        name: 'dob',
                        type: 'date',
                        config: {
                            defaultDate: new Date(profile.dob.year, profile.dob.month, profile.dob.date),
                            altInput: true,
                            altInputClass: 'form-control'
                        }
                    }
                ]
            },
            {
                label: 'City',
                name: 'city',
                value: profile.location.city,
                edit: false,
                formatValue: function (value) {
                    return {
                        location: Object.assign({}, _this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: 'city',
                        type: 'text'
                    }
                ]
            },
            {
                label: 'State',
                name: 'state',
                value: profile.location.state,
                edit: false,
                formatValue: function (value) {
                    return {
                        location: Object.assign({}, _this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: 'state',
                        type: 'text'
                    }
                ]
            },
            {
                label: 'Country',
                name: 'country',
                value: profile.location.country,
                edit: false,
                formatValue: function (value) {
                    return {
                        location: Object.assign({}, _this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: 'country',
                        type: 'country'
                    }
                ]
            }
        ];
    };
    SettingsComponent.prototype.initProfileFields = function () {
        var _this = this;
        // check for blank location.
        this.profile.location = { city: 'NA', state: 'NA', country: 'NA' };
        this.profile.dob = { year: '1900', month: '1', date: '1' };
        return [
            {
                label: 'Name',
                name: 'name',
                value: " ",
                edit: false,
                inputs: [
                    {
                        label: 'First name',
                        name: 'first',
                        type: 'text',
                        value: ''
                    },
                    {
                        label: 'Last name',
                        name: 'last',
                        type: 'text',
                        value: ''
                    }
                ]
            },
            {
                label: 'Email',
                name: 'email',
                value: '',
                edit: false,
                inputs: [
                    {
                        name: 'email',
                        type: 'text'
                    }
                ]
            },
            {
                label: 'Gender',
                name: 'gender',
                value: '',
                edit: false,
                inputs: [
                    {
                        type: 'radio',
                        name: 'gender',
                        options: [
                            {
                                label: 'Male',
                                value: 'male',
                            },
                            {
                                label: 'Female',
                                value: 'female',
                            }
                        ]
                    }
                ]
            },
            {
                label: 'DOB',
                name: 'dob',
                value: (new Date().toDateString()),
                edit: false,
                formatValue: function (value) {
                    value = value.dob;
                    //control wraps the value in array sometimes
                    if (value.length) {
                        value = value[0];
                    }
                    return {
                        dob: {
                            year: value.getFullYear(),
                            month: value.getMonth(),
                            date: value.getDate()
                        }
                    };
                },
                inputs: [
                    {
                        name: 'dob',
                        type: 'date',
                        config: {
                            defaultDate: new Date(),
                            altInput: true,
                            altInputClass: 'form-control'
                        }
                    }
                ]
            },
            {
                label: 'City',
                name: 'city',
                value: '',
                edit: false,
                formatValue: function (value) {
                    return {
                        location: Object.assign({}, _this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: 'city',
                        type: 'text'
                    }
                ]
            },
            {
                label: 'State',
                name: 'state',
                value: '',
                edit: false,
                formatValue: function (value) {
                    return {
                        location: Object.assign({}, _this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: 'state',
                        type: 'text'
                    }
                ]
            },
            {
                label: 'Country',
                name: 'country',
                value: '',
                edit: false,
                formatValue: function (value) {
                    return {
                        location: Object.assign({}, _this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: 'country',
                        type: 'country'
                    }
                ]
            }
        ];
        // this.constructProfileFields();
    };
    SettingsComponent.prototype.constructProfileFields = function () {
        this.profileFields = this.getProfileFields();
        for (var _i = 0, _a = this.profileFields; _i < _a.length; _i++) {
            var field = _a[_i];
            var formGroupObj = {};
            for (var _b = 0, _c = field.inputs; _b < _c.length; _b++) {
                var input = _c[_b];
                if (input.value) {
                    formGroupObj[input.name] = [input.value, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required];
                }
                else {
                    formGroupObj[input.name] = [field.value, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required];
                }
            }
            field.formGroup = this.fb.group(formGroupObj);
        }
    };
    SettingsComponent.prototype.setAsTouched = function (group) {
        group.markAsTouched();
        for (var i in group.controls) {
            if (group.controls[i] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]) {
                group.controls[i].markAsTouched();
            }
            else {
                this.setAsTouched(group.controls[i]);
            }
        }
    };
    SettingsComponent.prototype.isInvalid = function (control) {
        return control.invalid && control.touched;
    };
    SettingsComponent.prototype.checkSubmit = function (form, callback) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        }
        else {
            callback();
        }
    };
    SettingsComponent.prototype.submitPasswordChange = function () {
        var _this = this;
        this.checkSubmit(this.passwordForm, function () {
            _this.http.post("/users/settings/changepwd", { pwdsettings: _this.passwordForm.value }).toPromise()
                .then(function () {
                _this.passwordEdit = false;
                _this.passwordChangeSuccess = true;
            })
                .catch(function (error) { return alert('Error submitting password change: ' + error); });
        });
    };
    SettingsComponent.prototype.submitField = function (field) {
        var _this = this;
        var data;
        this.checkSubmit(field.formGroup, function () {
            var formValue = field.formGroup.value;
            if (field.formatValue) {
                formValue = field.formatValue(formValue);
            }
            if (field.inputs.length > 1) {
                data = {};
                data[field.name] = formValue;
            }
            else {
                data = Object.assign({}, formValue);
            }
            _this.http.put("/users/settings/changesettings", data).toPromise()
                .then(function (res) {
                Object.assign(_this.profile, data);
                var newProfileFields = _this.getProfileFields();
                var index = newProfileFields.findIndex(function (p) { return p.name == field.name; });
                Object.assign(_this.profileFields[index], newProfileFields[index]);
                field.edit = false;
            })
                .catch(function (error) { return alert('Error submitting settings: ' + error); });
        });
    };
    SettingsComponent.prototype.submitPublicField = function () {
        var _this = this;
        this.checkSubmit(this.profilepublic.form, function () {
            var formValue = _this.profilepublic.form.value;
            _this.http.put("/users/settings/changeprivacy", formValue).toPromise()
                .then(function (res) {
            })
                .catch(function (error) { return alert('Error submitting settings: ' + error); });
        });
    };
    SettingsComponent.prototype.submitNotificationSettingsField = function () {
        var _this = this;
        var changeSaved = function () { _this.settingsSaved = !_this.settingsSaved; };
        this.checkSubmit(this.notificationsettings.form, function () {
            var formValue = _this.notificationsettings.form.value;
            _this.http.put("/users/settings/changenotifications", formValue).toPromise()
                .then(function (res) {
                if (res.json().status == 1) {
                    changeSaved();
                    window.setTimeout(changeSaved, 2000);
                }
                else {
                }
            })
                .catch(function (error) { return alert('Error submitting settings: ' + error); });
        });
    };
    SettingsComponent.prototype.postGeneralQuestions = function () {
        var _this = this;
        this.http.put('/users/settings/generalQuestions', { data: this.generalQuestionsForm.value }).toPromise()
            .then(function (res) {
            _this.generalQuestionsForm.submitted = true;
            _this.generalQuestionsForm.submittedValue = _this.generalQuestionsForm.value;
            _this.generalQuestionsForm.markAsPristine();
        })
            .catch(function (error) { return alert('Error posting general questions data:' + error); });
    };
    SettingsComponent.prototype.submitPicture = function () {
        var _this = this;
        this.http.put('/users/settings/changeprofilepicture', { data: this.picture.newurl }).toPromise()
            .then(function (res) {
            //
            if (res.json().status == 1) {
                _this.retrieveData();
                _this.picture.success = true;
                _this.picture.newurl = null;
            }
            else {
                _this.picture.failure = true;
            }
        })
            .catch(function (error) { return alert('Error posting general questions data:' + error); });
    };
    SettingsComponent.prototype.rejectPicture = function () {
        this.picture.edit = false;
    };
    //// accept or reject
    SettingsComponent.prototype.deleteConnectionRequest = function (x, y) {
        var _this = this;
        this.http.post("/users/settings/deletenetworkrequest", { edgeid: x, eventid: y }).toPromise()
            .then(function () {
            _this.retrieveData();
        })
            .catch(function (error) { return alert('Error: ' + error); });
    };
    SettingsComponent.prototype.deleteConnection = function (x) {
        var _this = this;
        this.http.post("/users/settings/deletenetwork", { edgeid: x }).toPromise()
            .then(function () {
            _this.retrieveData();
        })
            .catch(function (error) { return alert('Error: ' + error); });
    };
    SettingsComponent.prototype.setAsSeen = function (x) {
        var _this = this;
        this.http.post('/events/seen', { id: x }).toPromise()
            .then(function (eventsdata) {
            _this.retrieveData();
        })
            .catch(function (error) { return alert('Error ' + error); });
    };
    SettingsComponent.prototype.deleteNotification = function (x) {
        var _this = this;
        this.http.post('/events/delete', { id: x }).toPromise()
            .then(function (eventsdata) {
            _this.retrieveData();
        })
            .catch(function (error) { return alert('Error ' + error); });
    };
    SettingsComponent.prototype.acceptCommunityRequest = function (x, asAdmin) {
        var _this = this;
        if (asAdmin === void 0) { asAdmin = false; }
        this.http.post("/users/settings/acceptcommrequest", { eventid: x, asadmin: asAdmin }).toPromise()
            .then(function () {
            _this.retrieveData();
        })
            .catch(function (error) { return alert('Error: ' + error); });
    };
    SettingsComponent.prototype.deleteCommunityRequest = function (x) {
        var _this = this;
        this.http.post("/users/settings/deletecommrequest", { eventid: x }).toPromise()
            .then(function () {
            _this.retrieveData();
        })
            .catch(function (error) { return alert('Error: ' + error); });
    };
    // picture upload code
    SettingsComponent.prototype.onProfilePicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    SettingsComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.picture.newurl = url;
                    _this.shareService.set('profilePic', url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    SettingsComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('tabs'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTabset"])
    ], SettingsComponent.prototype, "tabs", void 0);
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.scss */ "./src/app/settings/settings.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _share_service__WEBPACK_IMPORTED_MODULE_6__["ShareService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/share-form/share-form.component.html":
/*!******************************************************!*\
  !*** ./src/app/share-form/share-form.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container main-container\" *ngIf=\"reject\">\n    <h2>You are not authorised to create a new form. Please login first!</h2>\n</div>\n<div id=\"shareFormPage\" *ngIf=\"!reject\">\n    <div class=\"row\">\n        <div class=\"col-md-2\" id=\"leftSideOfContainer\">\n        </div>\n        <div class=\"col-md-8\">\n            <div id=\"createFormContainer\" class=\"container\">\n                <div id=\"topJumbo\" class=\"jumbotron\">\n                    <h2 style=\"overflow: auto\" class=\"display-4\">Share Your Survey</h2>\n                    <p class=\"lead\">Connect with a group of people to get all your questions answered!</p>\n                </div>\n                <div class=\"form-control\">\n                    If you chose to make your survey public, it will now be visible on the feed.\n                    You can also inviting friends to fill out your survey by sending them following link:\n                    <a id=\"link\" [href]=\"link\">{{link}}</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-2\" id=\"rightSideOfContainer\">\n        </div>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/share-form/share-form.component.scss":
/*!******************************************************!*\
  !*** ./src/app/share-form/share-form.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#createFormContainer {\n  background-color: #fff;\n  min-height: 100%;\n  padding-top: 20px;\n  overflow: auto;\n  border-radius: 1%;\n  margin-top: 30px; }\n\n#topJumbo {\n  border: 10px;\n  background: #e6f7ff; }\n\n#link {\n  color: black; }\n"

/***/ }),

/***/ "./src/app/share-form/share-form.component.ts":
/*!****************************************************!*\
  !*** ./src/app/share-form/share-form.component.ts ***!
  \****************************************************/
/*! exports provided: ShareFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareFormComponent", function() { return ShareFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form.service */ "./src/app/form.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShareFormComponent = /** @class */ (function () {
    function ShareFormComponent(formService, userService) {
        this.formService = formService;
        this.userService = userService;
        this.reject = false;
    }
    ShareFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.afterLoginCheck().then(function (userData) {
            if (userData) {
                _this.link = "https://www.questionsly.com/takeForm/" + _this.formService.getData().id;
            }
            else {
                _this.reject = true;
            }
        });
    };
    ShareFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-share-form',
            template: __webpack_require__(/*! ./share-form.component.html */ "./src/app/share-form/share-form.component.html"),
            styles: [__webpack_require__(/*! ./share-form.component.scss */ "./src/app/share-form/share-form.component.scss")],
            providers: [_form_service__WEBPACK_IMPORTED_MODULE_1__["FormService"], _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_form_service__WEBPACK_IMPORTED_MODULE_1__["FormService"],
            _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], ShareFormComponent);
    return ShareFormComponent;
}());



/***/ }),

/***/ "./src/app/share.service.ts":
/*!**********************************!*\
  !*** ./src/app/share.service.ts ***!
  \**********************************/
/*! exports provided: ShareService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareService", function() { return ShareService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ShareService = /** @class */ (function () {
    function ShareService() {
        this.data = {};
        this.subjects = {};
    }
    ShareService.prototype.set = function (key, value) {
        this.data[key] = value;
        if (!this.subjects.hasOwnProperty(key)) {
            this.subjects[key] = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        }
        this.subjects[key].next(value);
    };
    ShareService.prototype.get = function (key) {
        if (!this.subjects.hasOwnProperty(key)) {
            this.subjects[key] = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        }
        return this.subjects[key].asObservable();
    };
    ShareService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], ShareService);
    return ShareService;
}());



/***/ }),

/***/ "./src/app/short-answers/short-answers.component.html":
/*!************************************************************!*\
  !*** ./src/app/short-answers/short-answers.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\" class=\"display:flex; justify-content: center; align-items: center;\">\n        <div class=\"modal-container\">\n            <p class=\"question qslyGray\">All Responses <span>({{answers[index].length}})</span></p>\n            <div class=\"response-container\" *ngFor=\"let ans of answers[index]\">\n                <div>\n                    <img class=\"response-image\" src=\"{{ans.pic}}\" />\n                    <span class=\"author qslyGray\">{{ans.name}}:</span>\n                    <span class=\"response qslyBlack\">{{ans.answer}}</span>\n                </div>\n                <hr>\n            </div>\n        </div>\n    </ng-template>\n"

/***/ }),

/***/ "./src/app/short-answers/short-answers.component.scss":
/*!************************************************************!*\
  !*** ./src/app/short-answers/short-answers.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-header, .modal-footer {\n  padding: 6px 15px; }\n\n.modal-body {\n  padding: 18px 15px; }\n\n.modal-title, .modal-footer button {\n  font-size: 16px; }\n\n.modal-header {\n  background-color: #1E824C; }\n\n.modal-header .modal-title {\n    font-weight: bold;\n    color: #fff;\n    font-size: 18px; }\n\n.modal-footer {\n  background-color: #eee;\n  border-top: 2px solid #ddd; }\n\n.modal-footer button {\n    padding: 5px 10px;\n    font-weight: bold;\n    font-size: 15px; }\n\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  width: auto;\n  max-height: 80vh;\n  height: auto;\n  overflow-y: scroll;\n  padding: 10px 20px 50px 20px; }\n\n@media (max-width: 767px) {\n    .modal-container {\n      min-width: auto;\n      max-width: 90%; } }\n\n.question {\n  width: 100%;\n  text-align: center;\n  font-size: 1.4rem;\n  font-family: Karla;\n  margin: 25px 0; }\n\n.question span {\n    font-size: 1.2rem; }\n\n.response-container {\n  width: 100%;\n  padding: 0 15px; }\n\n.author {\n  font-size: 1.2rem;\n  font-family: Karla;\n  margin-right: 8px; }\n\n.response {\n  font-size: 1rem;\n  font-family: Karla; }\n\n.response-image {\n  width: 40px;\n  height: 40px;\n  margin-right: 6px;\n  border-radius: 8px; }\n"

/***/ }),

/***/ "./src/app/short-answers/short-answers.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/short-answers/short-answers.component.ts ***!
  \**********************************************************/
/*! exports provided: ShortAnswersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShortAnswersComponent", function() { return ShortAnswersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShortAnswersComponent = /** @class */ (function () {
    function ShortAnswersComponent(modalService, userService) {
        this.modalService = modalService;
        this.userService = userService;
    }
    ShortAnswersComponent.prototype.open = function (i) {
        this.index = i;
        this.modalService.open(this.content);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ShortAnswersComponent.prototype, "answers", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('content'),
        __metadata("design:type", Object)
    ], ShortAnswersComponent.prototype, "content", void 0);
    ShortAnswersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-short-answers',
            template: __webpack_require__(/*! ./short-answers.component.html */ "./src/app/short-answers/short-answers.component.html"),
            styles: [__webpack_require__(/*! ./short-answers.component.scss */ "./src/app/short-answers/short-answers.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
            _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], ShortAnswersComponent);
    return ShortAnswersComponent;
}());



/***/ }),

/***/ "./src/app/sign-in/sign-in.component.html":
/*!************************************************!*\
  !*** ./src/app/sign-in/sign-in.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"fullpage\">\n    <nav>\n        <a [routerLink]=\"['/']\" class=\"logo-text\">Questionsly</a>\n    </nav>\n\n    <div *ngIf=\"whichStep == 'loading'\" id=\"loadingStep\">\n        <!-- Don't show anything -->\n    </div>\n\n    <div *ngIf=\"whichStep == 'noemail'\" id=\"noemailStep\">\n        <h1>Welcome!</h1>\n        <p>Enter your email address to get started.</p>\n\n        <form [formGroup]=\"noemailForm\">\n            <div>\n                <div *ngIf=\"noemailForm.controls['email'].invalid && noemailForm.controls['email'].touched\" class=\"alert alert-danger\">\n                    Please provide your email address.\n                </div>\n\n                <input type='email' class=\"form-control\" placeholder=\"name@ucla.edu\" formControlName=\"email\">\n\n                <div class=\"submitButtons\">\n                    <button class=\"cta-btn\" (click)=\"noemailFormSubmit()\">Go</button>\n                </div>\n            </div>\n        </form>\n    </div>\n\n    <div *ngIf=\"whichStep == 'noorg'\" id=\"noorgStep\">\n        <h1>Welcome!</h1>\n        <p>\n            Thanks for your interest in Questionsly. Currently, Questionsly is in a closed beta for specific organizations.\n            Join our interest list to be notified when Questionsly is opened for {{emailDomain}} emails.\n        </p>\n        <div class=\"submitButtons\">\n            <button id=\"joinInterestList\" class=\"cta-btn\" (click)=\"joinInterestList()\">Join interest list</button>\n            <button class=\"text-btn\" (click)=\"tryADifferentEmailAddress()\">Try a different email address</button>\n        </div>\n    </div>\n\n    <div *ngIf=\"whichStep == 'noaccount'\" id=\"noaccountStep\">\n        <p class=\"welcome-label top\">Welcome to {{orgName}}!</p>\n        <p class=\"welcome-label bottom\">Please enter the following information to finish creating your account for {{email}}.</p>\n\n        <form [formGroup]=\"noaccountForm\">\n            <div class=\"flex\">\n                <!-- first name -->\n                <div class=\"col-sm-6\">\n                    <label>\n                        First name\n                        <input type='text' class=\"form-control\" formControlName=\"firstName\"\n                            [ngClass]=\"{'is-invalid': noaccountForm.controls['firstName'].invalid && noaccountForm.controls['firstName'].touched}\">\n                    </label>\n                    <div *ngIf=\"noaccountForm.controls['firstName'].invalid && noaccountForm.controls['firstName'].touched\" class=\"is-invalid\">\n                        Required field\n                    </div>\n                </div>\n\n                <!-- last name -->\n                <div class=\"col-sm-6\">\n                    <label>\n                        Last name\n                        <input type='text' class=\"form-control\" formControlName=\"lastName\"\n                            [ngClass]=\"{'is-invalid': noaccountForm.controls['lastName'].invalid && noaccountForm.controls['lastName'].touched}\">\n                    </label>\n                    <div *ngIf=\"noaccountForm.controls['lastName'].invalid && noaccountForm.controls['lastName'].touched\" class=\"is-invalid\">\n                        Required field\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex\">\n                <!-- password -->\n                <div class=\"col-sm-6\">\n                    <label>\n                        Password\n                        <input type='password' class=\"form-control\" formControlName=\"password\"\n                            [ngClass]=\"{'is-invalid': noaccountForm.controls['password'].invalid && noaccountForm.controls['password'].touched}\">\n                    </label>\n                    <div *ngIf=\"noaccountForm.controls['password'].invalid && noaccountForm.controls['password'].touched\" class=\"is-invalid\">\n                        Required field\n                    </div>\n                </div>\n\n                <!-- gender -->\n                <div class=\"col-sm-6\">\n                    <label style=\"margin-bottom: 0\">Gender</label><br>\n                    <label class=\"form-check-label\">\n                        <input formControlName=\"gender\" value=\"male\" type=\"radio\" name=\"gender\">\n                        Male\n                    </label>\n                    <label class=\"form-check-label\">\n                        <input formControlName=\"gender\" value=\"female\" type=\"radio\" name=\"gender\">\n                        Female\n                    </label>\n                    <label class=\"form-check-label\">\n                        <input formControlName=\"gender\" value=\"other\" type=\"radio\" name=\"gender\">\n                        Other\n                    </label>\n                </div>\n            </div>\n            <div class=\"flex\">\n                <!-- profile pic -->\n                <div class=\"col-sm-6\">\n                    <label style=\"margin-bottom: 0\">Profile pic</label><br>\n\n\n                    <!-- <div class=\"form-group\">\n                        <div class=\"input-group\">\n                            <span class=\"input-group-btn\">\n                                <div class=\"btn btn-default\">\n                                    <span><i class=\"fa fa-folder-open\" aria-hidden=\"true\"></i></span>\n                                    <span class=\"image-preview-input-title\">Browse</span>\n                                    <input (change)=\"onProfilePicChange($event)\" type=\"file\" accept=\"image/png, image/jpeg, image/gif\" name=\"input-file-preview\"/>\n                                </div>\n                            </span>\n                        </div>\n                    </div> -->\n\n                    <!-- IMAGE START -->\n                    <div class=\"imgContainer\">\n                        <div class=\"inner\">\n                    \n                            <div id=\"uploadBtn\">\n                                <label for=\"picFile\" class=\"submitButton not\">Upload</label>\n                                <input id=\"picFile\"  name=\"input-file-preview\" title=\"Hello\" style=\"display:none;\" type=\"file\" accept=\"image/png, image/jpeg, image/gif\" (change)=\"onProfilePicChange($event)\" />\n                            </div>\n                    \n                        </div>\n\n                    </div>\n                    <!-- IMAGE END -->\n\n\n\n                    <div>\n                        <img style=\"border:1px solid gray;width:100px;\"  id=\"preview\" [src]=\"profilePicURL\" *ngIf=\"profilePicURL\">\n                    </div>\n                    <div *ngIf=\"showProfilePicRequired\" class=\"is-invalid\">\n                        Profile pic required\n                    </div>\n                </div>\n            </div>\n            <br>\n            <br>\n            <br>\n            <div class=\"col-sm-12 tos\">\n                By using this service you agree to our <a href=\"/tos\">Terms of Service</a> & <a href=\"/privacy\">Privacy Policy</a>.\n            </div>\n\n            <div class=\"submitButtons\">\n                <button class=\"cta-btn\" (click)=\"noaccountSubmit()\">Sign Up</button>\n                <button class=\"text-btn\" (click)=\"tryADifferentEmailAddress()\">Use different email</button>\n            </div>\n        </form>\n    </div>\n\n    <div *ngIf=\"whichStep == 'login'\" id=\"loginStep\">\n        <h1>Welcome back!</h1>\n        <p>Enter your password for {{email}}.</p>\n\n        <form [formGroup]=\"loginForm\">\n            <div>\n                <div *ngIf=\"loginForm.controls['password'].invalid && loginForm.controls['password'].touched && !loginPasswordIncorrect\" class=\"alert alert-danger\">\n                    Please provide your password.\n                </div>\n                <div *ngIf=\"loginPasswordIncorrect\" class=\"alert alert-danger\">\n                    Your password is incorrect.\n                </div>\n\n                <input type='password' class=\"form-control\" formControlName=\"password\">\n\n                <div class=\"submitButtons\">\n                    <button class=\"cta-btn\" (click)=\"loginSubmit()\">Login</button>\n                    <!-- TODO <button class=\"text-btn\" (click)=\"forgotPassword()\">Forgot password?</button> -->\n                    <button class=\"text-btn\" (click)=\"tryADifferentEmailAddress()\">Use different email</button>\n                </div>\n            </div>\n        </form>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/sign-in/sign-in.component.scss":
/*!************************************************!*\
  !*** ./src/app/sign-in/sign-in.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n  margin-bottom: 24px; }\n\nh1 {\n  font-size: 60px;\n  font-weight: 700;\n  font-family: \"Playfair Display\";\n  color: #152c48;\n  margin-bottom: 26px;\n  line-height: 1; }\n\n@media (max-width: 768px) {\n    h1 {\n      font-size: 40px;\n      margin-bottom: 12px; } }\n\np {\n  font-size: .9rem;\n  font-weight: 500;\n  font-family: \"Montserrat\";\n  color: #7d8f9d; }\n\n@media (max-width: 768px) {\n    p {\n      font-size: .72rem; } }\n\nlabel {\n  line-height: 2.5em;\n  font-weight: 700;\n  font-size: .8rem;\n  color: #999999; }\n\nlabel:not(.form-check-label) {\n  color: #239658; }\n\nlabel.form-check-label {\n  font-size: 1rem;\n  font-weight: 600; }\n\nlabel + label {\n  margin-left: 2em; }\n\n.fullpage {\n  width: 100vw;\n  height: 100vh;\n  background: #FFFFFF; }\n\n.fullpage > div {\n  margin: 0 auto;\n  padding: 2em 0;\n  max-width: 700px; }\n\ninput.is-invalid {\n  border-color: #ea7a85; }\n\ndiv.is-invalid {\n  color: #ea7a85; }\n\nnav {\n  max-width: 1200px;\n  padding: 0 15px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  margin: 0 auto; }\n\nnav .logo-text {\n    font-size: 1.6rem;\n    letter-spacing: .045rem;\n    font-weight: 400;\n    font-family: \"Montserrat\";\n    color: #28ab64;\n    margin: 0;\n    cursor: pointer; }\n\n.submitButtons button {\n  float: right; }\n\n.submitButtons .cta-btn {\n  background: #28ab64;\n  color: #FFFFFF;\n  font-family: \"Montserrat\";\n  font-size: 12px;\n  font-weight: 600;\n  padding: 1em;\n  border-radius: 4px;\n  border: 1px solid transparent;\n  outline: none;\n  cursor: pointer;\n  margin-top: 1.375rem;\n  margin-left: 1.375rem; }\n\n.submitButtons .cta-btn:hover {\n    background: transparent;\n    border-color: #28ab64;\n    color: #28ab64;\n    transition: all 300ms ease-in-out; }\n\n.submitButtons .text-btn {\n  outline: none;\n  border: none;\n  padding: 4px 12px;\n  margin-top: 2rem;\n  background: white;\n  border: 1px solid #e2e2e2;\n  border-radius: 8px;\n  color: #AAAAAA;\n  cursor: pointer;\n  margin-top: 2rem; }\n\n.submitButtons .text-btn:hover {\n    color: #999999; }\n\n.tos {\n  margin-top: 1em;\n  font-size: smaller; }\n\n.tos a {\n    font-size: inherit;\n    color: black; }\n\n.welcome-label.top {\n  font-size: 1.4rem;\n  font-weight: 600;\n  font-family: \"Fira Sans\";\n  color: #28ab64;\n  margin-bottom: 8px; }\n\n.welcome-label.bottom {\n  font-size: 1.2rem;\n  font-weight: 400;\n  font-family: \"Fira Sans\";\n  color: #BBBBBB;\n  margin-bottom: 32px; }\n\n.imgContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%; }\n\n.imgContainer .inner {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    margin-bottom: 12px; }\n\n.submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 6px;\n  line-height: 2rem;\n  min-width: 20%;\n  width: auto;\n  text-align: center;\n  border: none;\n  font-size: 1rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px; }\n\n.submitButton.not {\n    background: #47d487;\n    margin-top: 2px;\n    margin-left: 0px;\n    padding: 2px 10px;\n    margin-bottom: 0px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n@media (max-width: 767px) {\n    .submitButton {\n      margin-top: 15px; } }\n\n#uploadBtn {\n  margin-right: 20px; }\n\n@media (max-width: 767px) {\n    #uploadBtn {\n      margin-right: 10px; } }\n\n#loginStep, #noemailStep {\n  margin-top: 48px;\n  padding: 0 16px; }\n"

/***/ }),

/***/ "./src/app/sign-in/sign-in.component.ts":
/*!**********************************************!*\
  !*** ./src/app/sign-in/sign-in.component.ts ***!
  \**********************************************/
/*! exports provided: SignInComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignInComponent", function() { return SignInComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignInComponent = /** @class */ (function () {
    function SignInComponent(cookieService, http, router, fb, userService) {
        this.cookieService = cookieService;
        this.http = http;
        this.router = router;
        this.fb = fb;
        this.userService = userService;
        this.whichStep = 'loading'; // Options: loading, noemail, noorg, noaccount, login
        this.loginPasswordIncorrect = false;
        this.showProfilePicRequired = false;
    }
    SignInComponent.prototype.ngOnInit = function () {
        // Logged-in users shouldn't go through sign-in flow
        if (this.userService.getUser() !== 0) {
            this.router.navigate(['/']);
            return;
        }
        this.setEmail(this.cookieService.get('sign-in-email'));
        this.initAllForms();
        this.computeWhichStep();
    };
    SignInComponent.prototype.computeWhichStep = function () {
        var _this = this;
        if (!this.email) {
            this.whichStep = 'noemail';
            return;
        }
        this.http.post('/users/status', { email: this.email }).toPromise()
            .then(function (response) {
            var responseJson = response.json();
            if (responseJson.status !== 1) {
                _this.router.navigate(['/']);
                return;
            }
            _this.orgName = (responseJson.orgExists ? responseJson.orgName : '');
            if (responseJson.userExists) {
                _this.whichStep = 'login';
            }
            else if (responseJson.orgExists) {
                _this.whichStep = 'noaccount';
            }
            else {
                _this.whichStep = 'noorg';
            }
        })
            .catch(function (error) { return _this.router.navigate(['/']); });
    };
    SignInComponent.prototype.initAllForms = function () {
        this.noemailForm = this.fb.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])],
        });
        this.loginForm = this.fb.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
        this.noaccountForm = this.fb.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            gender: ['male', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
    };
    SignInComponent.prototype.setEmail = function (email) {
        this.email = email;
        this.emailDomain = email.split('@')[1];
        this.cookieService.set('sign-in-email', this.email);
    };
    //
    // For noemail step
    //
    SignInComponent.prototype.noemailFormSubmit = function () {
        this.noemailForm.controls['email'].markAsTouched();
        if (!this.noemailForm.invalid) {
            this.setEmail(this.noemailForm.controls['email'].value);
            this.computeWhichStep();
        }
    };
    SignInComponent.prototype.joinInterestList = function (button) {
        var _this = this;
        this.http
            .post('/api/joinWaitingList', { email: this.email }).toPromise()
            .then(function (response) {
            document.getElementById('joinInterestList').innerHTML = 'Joined!';
        })
            .catch(function (error) { return _this.router.navigate(['/']); });
    };
    SignInComponent.prototype.tryADifferentEmailAddress = function () {
        this.setEmail('');
        this.noemailForm.controls['email'].setValue('');
        this.noemailForm.controls['email'].markAsUntouched();
        this.computeWhichStep();
    };
    //
    // For noaccount step
    //
    SignInComponent.prototype.noaccountSubmit = function () {
        var _this = this;
        this.noaccountForm.markAsTouched();
        this.showProfilePicRequired = !this.profilePicURL;
        if (this.profilePicURL && !this.noaccountForm.invalid) {
            var signupData_1 = Object.assign({
                email: this.email,
                name: {
                    firstname: this.noaccountForm.controls['firstName'].value,
                    lastname: this.noaccountForm.controls['lastName'].value,
                },
                profilePic: this.profilePicURL,
            }, this.noaccountForm.value);
            this.http
                .post('/users/signup', signupData_1).toPromise()
                .then(function (response) {
                var responseJson = response.json();
                if (responseJson.status === 1) {
                    _this.http.post('/users/login/local', { email: signupData_1.email, password: signupData_1.password })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        if (data.status === 1) {
                            _this.userService.acknowledgeLogin(data);
                            _this.router.navigate(['/']).then(function () { });
                        }
                        else {
                            alert('Error, please try again');
                        }
                    });
                }
                else {
                    alert('Error, please try again');
                }
            })
                .catch(function (error) { return alert('Error, please try again'); });
        }
    };
    SignInComponent.prototype.onProfilePicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    SignInComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    SignInComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.profilePicURL = url;
                    _this.showProfilePicRequired = false;
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    //
    // For login step
    //
    SignInComponent.prototype.loginSubmit = function () {
        var _this = this;
        this.loginForm.controls['password'].markAsTouched();
        this.loginPasswordIncorrect = false;
        if (!this.loginForm.invalid) {
            this.http
                .post('/users/login/local', { email: this.email, password: this.loginForm.controls['password'].value }).toPromise()
                .then(function (response) {
                var responseJson = response.json();
                _this.userService.acknowledgeLogin(responseJson);
                _this.router.navigate(['/']);
            })
                .catch(function (error) {
                _this.loginPasswordIncorrect = true;
            });
        }
    };
    SignInComponent.prototype.forgotPassword = function () {
        alert('not implemented');
    };
    SignInComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sign-in',
            template: __webpack_require__(/*! ./sign-in.component.html */ "./src/app/sign-in/sign-in.component.html"),
            styles: [__webpack_require__(/*! ./sign-in.component.scss */ "./src/app/sign-in/sign-in.component.scss")]
        }),
        __metadata("design:paramtypes", [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_1__["CookieService"],
            _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]])
    ], SignInComponent);
    return SignInComponent;
}());



/***/ }),

/***/ "./src/app/star-array/star-array.component.html":
/*!******************************************************!*\
  !*** ./src/app/star-array/star-array.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='starArray'>\n    <div *ngFor=\"let x of temp; let i = index\">\n        <img class=\"star\" *ngIf=\"i <= rating\" src=\"/images/icons/starFilled.svg\" (click)=\"toggle(i)\" width=\"22px\" />\n        <img class=\"star\" *ngIf=\"i > rating\" src=\"/images/icons/star.svg\" (click)=\"toggle(i)\" width=\"22px\" />\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/star-array/star-array.component.scss":
/*!******************************************************!*\
  !*** ./src/app/star-array/star-array.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".starArray {\n  display: flex;\n  justify-content: flex-start;\n  flex-direction: row;\n  width: 100%; }\n\n.star {\n  margin: 0px 2px; }\n\n.star:hover {\n    cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/star-array/star-array.component.ts":
/*!****************************************************!*\
  !*** ./src/app/star-array/star-array.component.ts ***!
  \****************************************************/
/*! exports provided: StarArrayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarArrayComponent", function() { return StarArrayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StarArrayComponent = /** @class */ (function () {
    function StarArrayComponent() {
        this.rating = -1;
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.temp = Array(this.scale);
    }
    StarArrayComponent_1 = StarArrayComponent;
    StarArrayComponent.prototype.ngOnInit = function () {
        this.scale = Number(this.scale);
        this.temp = Array(this.scale);
    };
    StarArrayComponent.prototype.writeValue = function (value) { };
    StarArrayComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    StarArrayComponent.prototype.registerOnTouched = function () { };
    StarArrayComponent.prototype.toggle = function (rating) {
        window.console.log("Rating is: ", rating);
        this.rating = rating;
        this.selected.emit(this.rating + 1);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], StarArrayComponent.prototype, "rating", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], StarArrayComponent.prototype, "scale", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], StarArrayComponent.prototype, "selected", void 0);
    StarArrayComponent = StarArrayComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-star-array',
            template: __webpack_require__(/*! ./star-array.component.html */ "./src/app/star-array/star-array.component.html"),
            styles: [__webpack_require__(/*! ./star-array.component.scss */ "./src/app/star-array/star-array.component.scss")],
            providers: [{ provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"], multi: true, useExisting: StarArrayComponent_1 }]
        }),
        __metadata("design:paramtypes", [])
    ], StarArrayComponent);
    return StarArrayComponent;
    var StarArrayComponent_1;
}());



/***/ }),

/***/ "./src/app/switch-buttons/switch-buttons.component.html":
/*!**************************************************************!*\
  !*** ./src/app/switch-buttons/switch-buttons.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p class=\"choice\" [ngClass]=\"{selected: option === active}\" (click)=\"toggle(option)\" >{{title}}</p>\n"

/***/ }),

/***/ "./src/app/switch-buttons/switch-buttons.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/switch-buttons/switch-buttons.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".choice {\n  min-width: 80px;\n  font-size: 1.1rem;\n  font-weight: 300;\n  font-family: Karla;\n  display: block;\n  margin: 2px 5px;\n  padding: 4px 8px;\n  text-align: center;\n  border-radius: 12px; }\n  .choice:hover {\n    cursor: pointer;\n    color: #FFF;\n    background: #47d487; }\n  .selected {\n  color: #FFF;\n  background: #47d487; }\n"

/***/ }),

/***/ "./src/app/switch-buttons/switch-buttons.component.ts":
/*!************************************************************!*\
  !*** ./src/app/switch-buttons/switch-buttons.component.ts ***!
  \************************************************************/
/*! exports provided: SwitchButtonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchButtonsComponent", function() { return SwitchButtonsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SwitchButtonsComponent = /** @class */ (function () {
    function SwitchButtonsComponent() {
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    SwitchButtonsComponent_1 = SwitchButtonsComponent;
    SwitchButtonsComponent.prototype.writeValue = function (value) { };
    SwitchButtonsComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    SwitchButtonsComponent.prototype.registerOnTouched = function () { };
    SwitchButtonsComponent.prototype.toggle = function (newType) {
        this.selected.emit(this.option);
        this._onChange(newType);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SwitchButtonsComponent.prototype, "title", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SwitchButtonsComponent.prototype, "option", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], SwitchButtonsComponent.prototype, "active", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], SwitchButtonsComponent.prototype, "selected", void 0);
    SwitchButtonsComponent = SwitchButtonsComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-switch-buttons',
            template: __webpack_require__(/*! ./switch-buttons.component.html */ "./src/app/switch-buttons/switch-buttons.component.html"),
            styles: [__webpack_require__(/*! ./switch-buttons.component.scss */ "./src/app/switch-buttons/switch-buttons.component.scss")],
            providers: [{ provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"], multi: true, useExisting: SwitchButtonsComponent_1 }]
        }),
        __metadata("design:paramtypes", [])
    ], SwitchButtonsComponent);
    return SwitchButtonsComponent;
    var SwitchButtonsComponent_1;
}());



/***/ }),

/***/ "./src/app/take-form/take-form.component.html":
/*!****************************************************!*\
  !*** ./src/app/take-form/take-form.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pageLayout\">\n    <div class=\"row\">\n\n        <div class=\"col-md-3 order-2 order-sm-1\">\n            <!-- <sidebar [friends]=\"network\" [loggedin]=\"loggedin\" [user]=\"id\" [context]=\"'profile'\" [name]=\"name\" [me]=\"me\"></sidebar> -->\n        </div>\n\n        <div class=\"col-md-6 order-1 order-sm-2 mtop\">\n            <div *ngIf=\"form && form.answered\" style=\"margin-bottom: 20px;\">\n                <h3 class=\"thanksText\">Thanks for your response. Please check us out!\n                    <a class=\"qslyButton\" [routerLink]=\"['/']\" [queryParams]=\"{c: 'sports'}\" (click)=\"clickedCTA()\">Questionsly.com</a>\n                </h3>\n            </div>\n            <app-feed-form-component *ngIf=\"form\" [pic]=\"pic\" [pictype]=\"pictype\" [form]=\"form\" (emitSubmitted)=\"stopTimer($event)\"> </app-feed-form-component>\n            <div class=\"container\" *ngIf=\"unavailable\">\n                <h3>This survey is unavailable!</h3>\n            </div>\n        </div>\n\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/take-form/take-form.component.scss":
/*!****************************************************!*\
  !*** ./src/app/take-form/take-form.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mtop {\n  margin-top: 20px; }\n  @media (max-width: 768px) {\n    .mtop {\n      margin-top: 0px; } }\n  .thanksText {\n  text-align: center;\n  line-height: 2;\n  color: #666;\n  font-size: 1rem;\n  font-family: Karla;\n  margin-top: 25px; }\n  @media (max-width: 768px) {\n    .thanksText {\n      margin-top: 15px;\n      line-height: 2rem; } }\n  .qslyButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 4px 10px;\n  line-height: 1.5rem;\n  min-width: 20%;\n  width: auto;\n  text-align: center;\n  border: none;\n  -webkit-animation: 1500ms ease-in-out 0s infinite alternate qBut;\n          animation: 1500ms ease-in-out 0s infinite alternate qBut;\n  text-decoration: none;\n  font-size: 1.2rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 80px;\n  margin-left: 10px; }\n  .qslyButton.not {\n    background: #47d487;\n    margin-top: 2px;\n    margin-left: 10px;\n    padding: 2px 10px; }\n  .qslyButton:active {\n    outline-style: none; }\n  .qslyButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n  @-webkit-keyframes qBut {\n  0% {\n    background-color: #28ab64; }\n  100% {\n    background-color: #4bd58a; } }\n  @keyframes qBut {\n  0% {\n    background-color: #28ab64; }\n  100% {\n    background-color: #4bd58a; } }\n"

/***/ }),

/***/ "./src/app/take-form/take-form.component.ts":
/*!**************************************************!*\
  !*** ./src/app/take-form/take-form.component.ts ***!
  \**************************************************/
/*! exports provided: TakeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TakeFormComponent", function() { return TakeFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Feed/feed-form.model */ "./src/app/Feed/feed-form.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TakeFormComponent = /** @class */ (function () {
    function TakeFormComponent(http, route, router) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.submitted = false;
        this.showsubmit = false;
        this.loggedin = false;
        this.unavailable = false;
    }
    TakeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params.id;
            _this.startingTime = Date.now();
            var startingTime = _this.startingTime;
            window.addEventListener("beforeunload", function (event) {
                window.mixpanel.track("Bounced Stand Alone Page", {
                    "timeSpentOnFeed": (Date.now() - startingTime) / 1000,
                    "timestamp": Date.now()
                });
            });
            // window.mixpanel.track(this.id.toString()); //track users directed to questionsly via shared links
            _this.http.get("/forms/" + params.id).toPromise()
                .then(function (res) {
                if (res.json().status == 1) {
                    _this.formdata = res.json().formdata;
                    window.mixpanel.track("Landed at Stand Alone Page", {
                        "question": _this.formdata.questions[0].body,
                        "id": _this.id,
                        "timestamp": startingTime
                    });
                    _this.authordata = res.json().authordata;
                    _this.loggedin = res.json().loggedin;
                    _this.showsubmit = false;
                    _this.unavailable = false;
                    _this.timestamp = _this.formdata.timestamp;
                    console.log("fdata", _this.formdata);
                    if (_this.authordata.anonymous == false) {
                        _this.author = _this.authordata.name;
                        _this.authorlink = _this.authordata.link;
                        _this.authorlinkdisabled = false;
                        // deal with picture
                        if (_this.authordata.facebookID != null) {
                            _this.pic = _this.authordata.facebookID;
                            _this.pictype = "fb";
                        }
                        else {
                            if (_this.authordata.pic != null) {
                                _this.pictype = "local";
                                _this.pic = _this.authordata.pic;
                            }
                            else {
                                _this.pictype = "default";
                                _this.authorgender = _this.authordata.gender;
                            }
                        }
                    }
                    else {
                        _this.author = "Anonymous";
                        _this.authorlink = "";
                        _this.authorlinkdisabled = true;
                        _this.pictype = "anonymous";
                    }
                    if (_this.loggedin) {
                        _this.isFilledIn();
                    }
                }
                else {
                    _this.unavailable = true;
                }
                // this.formdata.pic = this.pic;
                // this.formdata.pictype = this.pictype;
                // this.formdata.authorgender = this.authorgender;
                // this.formdata.object = {author: this.authordata};
                _this.formdata.id = _this.id;
                _this.form = new _Feed_feed_form_model__WEBPACK_IMPORTED_MODULE_3__["FeedFormModel"]({ formdata: _this.formdata, author: _this.authordata, id: _this.id, found: true });
                // window.console.log("Response; ", this.formdata);
                // this.formdata.location = this.authordata.location;
                // this.formdata.nocreated = this.authordata.nocreated;
                // this.formdata.nodiscussion = this.authordata.nodiscussion;
                // this.formdata.notaken = this.authordata.notaken;
            })
                .catch(function (error) { return console.log("Error retrieving form: " + error); });
        });
        this.startingTime = new Date();
    };
    TakeFormComponent.prototype.ngOnDestroy = function () {
        var startingTime = this.startingTime;
        window.mixpanel.track("Bounced Stand Alone Page", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "question": this.formdata.questions[0].body,
            "id": this.id,
            "timestamp": Date.now()
        });
    };
    TakeFormComponent.prototype.postForm = function (data) {
        var _this = this;
        data.id = this.id;
        this.http.post('/forms/answers', data).toPromise()
            .then(function (response) {
            _this.submitted = true;
            // redirect
            _this.router.navigate(['/'], { queryParams: { message: 'completedform' } });
        })
            .catch(function (error) { return alert("Error posting survey: " + error); });
    };
    TakeFormComponent.prototype.isFilledIn = function () {
        var _this = this;
        // did the current user complete this particular survey?
        var data = { formid: this.id };
        // post and get response
        this.http.post('/forms/checkcompleted', data)
            .toPromise()
            .then(function (response) {
            if (response.json().data == 1) {
                //completed
                _this.showsubmit = false;
                _this.submitted = true;
            }
            else {
                _this.showsubmit = true;
            }
        })
            .catch(function (error) {
            // error, assume completed
            _this.showsubmit = false;
        });
    };
    TakeFormComponent.prototype.stopTimer = function (val) {
        if (val) {
            var startingTime = this.startingTime;
            window.mixpanel.track("Answered Stand Alone Question", {
                "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
                "question": this.formdata.questions[0].body,
                "id": this.id,
                "timestamp": Date.now()
            });
        }
    };
    TakeFormComponent.prototype.clickedCTA = function () {
        var startingTime = this.startingTime;
        window.mixpanel.track("Clicked CTA in Stand Along Page", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "question": this.formdata.questions[0].body,
            "id": this.id,
            "timestamp": Date.now()
        });
    };
    TakeFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-take-form',
            template: __webpack_require__(/*! ./take-form.component.html */ "./src/app/take-form/take-form.component.html"),
            styles: [__webpack_require__(/*! ./take-form.component.scss */ "./src/app/take-form/take-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], TakeFormComponent);
    return TakeFormComponent;
}());



/***/ }),

/***/ "./src/app/user.service.ts":
/*!*********************************!*\
  !*** ./src/app/user.service.ts ***!
  \*********************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var callbacksForLogin = [];
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getUser = function () {
        return window['USER_LOGIN_STATE'];
    };
    // Deprecated - no async stuff needed now
    UserService.prototype.afterLoginCheck = function () {
        return new Promise(function (resolve, reject) {
            resolve(window['USER_LOGIN_STATE']);
        });
    };
    // We just made a successful AJAX request to login; we should notify any subscribers who are waiting to be logged in
    UserService.prototype.acknowledgeLogin = function (userData) {
        window['USER_LOGIN_STATE'] = userData;
        callbacksForLogin.forEach(function (callback) {
            callback();
        });
    };
    UserService.prototype.listenForLogin = function (callback) {
        callbacksForLogin.push(callback);
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/view-community/view-community.component.html":
/*!**************************************************************!*\
  !*** ./src/app/view-community/view-community.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pageLayout\">\n    <div class=\"row\">\n        <!-- <div *ngIf=\"status == '2'\"><h6>{{data.title}} is a private community. Only individuals invited by the admin can see further details. </h6></div> -->\n        <!-- <network-list [data]=\"data.members\" *ngIf=\"!loading && loadsuccessful && status != '2'\"></network-list> -->\n\n        <div class=\" col-md-3 col-sm-12 col-12 order-2 order-md-1\">\n            <app-sidebar [friends]=\"data.members\" [context]=\"'community'\" *ngIf=\"!loading && loadsuccessful && status != '2'\"></app-sidebar>\n        </div>\n\n\n\n        <div class=\"col-md-6 col-12 order-1 order-md-2\" *ngIf=\"loadsuccessful\">\n\n\n            <div id=\"viewCommunityContainer\">\n\n                <div *ngIf=\"deleteWarning && !showEdit\" class=\"aboutContainer fdColumn\">\n                    <h3 class=\"name\" style=\"text-align: center\">Are you sure you want to delete this group?</h3>\n                    <div class=\"flex fjCenter\" style=\"margin-top: 24px\">\n                        <button class=\"submitButton greyBtn\" (click)=\"toggleDeleteWarning()\" style=\"margin-right: 16px;\">Cancel</button>\n                        <button class=\"submitButton redBtn\" (click)=\"deleteCommunity()\">Delete</button>\n                    </div>\n                </div>\n\n\n                <!-- Info header -->\n                <div class=\"aboutContainer\" *ngIf=\"!showEdit\">\n                    <img *ngIf=\"data.pic\" id=\"community-image\" [src]=\"data.pic\" />\n                    <div style=\"margin-left: 15px\">\n                        <h3 class=\"name\">{{data.title}}</h3>\n                        <h5 class=\"description\">{{data.description ? data.description : \"No Description.\"}}</h5>\n                        <h5 *ngIf=\"(data.public || data.ismember) && data.members\" class=\"description smallDesc\">{{data.memberCount}} {{data.memberCount > 1 ? \"Members\" : \"Member\"}}</h5>\n                    </div>\n\n                    <div class=\"profileMenu\">\n\n                        <div ngbDropdown placement=\"bottom-right\" class=\"mouseChangeToHand\" *ngIf=\"loggedin\">\n                            <a class=\"navlinks nav-link custom-dropdown-toggle\" id=\"community-menu\" ngbDropdownToggle aria-haspopup=\"true\" aria-expanded=\"false\">\n                                <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n                            </a>\n                            <div ngbDropdownMenu aria-labelledby=\"community-menu\">\n                                <a class=\"dropdown-item\" *ngIf=\"data.isadmin\" (click)=\"toggleEdit()\">Edit</a>\n                                <a class=\"dropdown-item\" *ngIf=\"!data.ismember && status != '2'\" (click)=\"joinCommunity(id)\">Join Group</a>\n                                <a class=\"dropdown-item\" *ngIf=\"!data.public && !data.ismember && !data.isPending\" (click)=\"joinCommunity(id)\">Request to Join</a>\n                                <a class=\"dropdown-item\" *ngIf=\"data.isPending && !data.public\">Request Pending</a>\n                                <a class=\"dropdown-item\" *ngIf=\"data.ismember && !data.isadmin\" (click)=\"leaveCommunity(id)\">Leave Group</a>\n                                <a class=\"dropdown-item\" *ngIf=\"data.isadmin\" (click)=\"inviteToCommunity(id)\">Invite others to join</a>\n                                <a class=\"dropdown-item\" *ngIf=\"data.isadmin\" (click)=\"toggleDeleteWarning()\">Delete Group</a>\n                                <a class=\"dropdown-item\" *ngIf=\"!data.isadmin\" (click)=\"reportCommunity(id)\">Report Group</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n\n                <div class=\"row\" *ngIf=\"data.ismember\">\n                    <button style=\"font-family: Karla\" class=\"btn btn-outline-success\" id=\"askBtn\" routerLink=\"/createForm\">Ask a Question</button>\n                </div>\n\n\n\n\n                <!-- Feed list and private community message -->\n                <div class=\"\" *ngIf=\"!showEdit && !showAllMembers\">\n                    <div *ngIf=\"status == '2'\" class=\"aboutContainer\" style=\"flex-direction: column\"><h6 class=\"description center\">{{data.title}} is a private group.</h6><h6 class=\"description center\">Only members can see the content of this group.</h6></div>\n                    <app-feed-list *ngIf=\"data.public || data.ismember\" [comm]=\"id\"></app-feed-list>\n                </div>\n\n                <!-- View all members -->\n                <div class=\"aboutContainer\" *ngIf=\"showAllMembers\">\n                </div>\n\n\n\n                <!-- Edit Community -->\n                <div class=\"aboutContainer\" *ngIf=\"data.isadmin && showEdit && !showAllMembers\" style=\"margin-bottom: 18px !important; flex-direction: column;\">\n                    <div class=\"flexContainer\" style=\"justify-content: center; padding-bottom: 0;\">\n                        <h3 class=\"description\" style=\"margin-bottom: 25px\">Edit Group</h3>\n                    </div>\n\n\n                    <form id=\"main-form\" [formGroup]=\"fgCreateGroup\">\n\n                        <div class=\"flexContainer fdColumn faStart\">\n                            <h6 class=\"title firstTitle\">Group Title</h6>\n                            <div style=\"display: flex; align-items: center; width: 100%\">\n                                <label style=\"margin-right: 10px; color: #CCC; margin-bottom: 0px;\">-</label>\n                                <input class=\"niceTextInput\" formControlName=\"title\" autofocus />\n                            </div>\n                        </div>\n\n                        <div class=\"flexContainer fdColumn faStart\">\n                            <h6 class=\"title firstTitle\">Description</h6>\n                            <div style=\"display: flex; align-items: center; width: 100%\">\n                                <label style=\"margin-right: 10px; color: #CCC; margin-bottom: 0px;\">-</label>\n                                <textarea placeholder=\"Enter a short description..\" class=\"niceTextAreaInput\" formControlName=\"description\" rows=\"1\" #f (keydown)=\"autosizeTextarea($event, f)\"></textarea>\n                            </div>\n                        </div>\n\n\n                        <div class=\"flexContainer fdColumn faStart\">\n                            <h6 class=\"title firstTitle\">Privacy</h6>\n                            <div style=\"display:flex; justify-content: flex-start;\">\n                                <app-desc-switch-buttons [active]=\"fgCreateGroup.get('public').value\" [option]=\"true\" [title]=\"'Public'\" [description]=\"'Anyone can see the contents of this group'\"\n                                    (selected)=\"toggleAudience($event)\" formControlName=\"public\"></app-desc-switch-buttons>\n                                <app-desc-switch-buttons [active]=\"fgCreateGroup.get('public').value\" [option]=\"false\" [title]=\"'Private'\" [description]=\"'Only members can see the contents of this group'\"\n                                    (selected)=\"toggleAudience($event)\" formControlName=\"public\"></app-desc-switch-buttons>\n                            </div>\n                        </div>\n\n\n                        <!-- IMAGE START -->\n                        <div class=\"flexContainer fdColumn faStart\">\n                            <h6 class=\"title firstTitle\">Image</h6>\n                            <div class=\"flex\" style=\"align-items: center; width: 100%\">\n\n                                <div id=\"uploadBtn\">\n                                    <label for=\"picFile\" class=\"submitButton not\">Upload</label>\n                                    <input id=\"picFile\" title=\"Hello\" style=\"display:none;\" type=\"file\" (change)=\"onPicChange($event)\" />\n                                </div>\n\n                                <div>\n                                    <p id=\"orText\">or</p>\n                                </div>\n\n                                <div id=\"urlImage\" class=\"input-group\" style=\"width: 100%\">\n                                    <input type=\"text\" formControlName=\"pic\" #imgUrl class=\"form-control\" placeholder=\"Enter an image URL\">\n                                    <div class=\"input-group-append\">\n                                        <button (click)=\"setPicUrl(imgUrl.value)\" class=\"btn btn-outline-secondary\">\n                                            <i class=\"fa fa-check\"></i>\n                                        </button>\n                                    </div>\n                                </div>\n\n                                <div style=\"margin-left: 12px\">\n                                    <img class=\"image\" *ngIf=\"fgCreateGroup.get('pic').value !== ''\" id=\"preview\" [src]=\"fgCreateGroup.get('pic').value\">\n                                </div>\n                            </div>\n\n\n                        </div>\n                        <!-- IMAGE END -->\n\n\n                        <div class=\"flexContainer faStart fdColumn\">\n                            <h6 class=\"title firstTitle\">Add Admins</h6>\n                            <div [ngClass]=\"{'tag-input-wrapper': true, 'form-control': true, 'active': showAdmins == true}\">\n                                <div [ngClass]=\"{'d-none': showAdmins || fgCreateGroup.get('admins').value}\" class=\"tag-placeholder text-muted\" (click)=\"showAdmins = true; focusTagInput(admins)\">\n                                    Add your friends as admins\n                                </div>\n                                <tag-input #admins [ngClass]=\"{'d-none': !showAdmins && fgCreateGroup.get('admins').value === null}\" [onAdding]=\"transformName\"\n                                    [identifyBy]=\"'value'\" [displayBy]=\"'display'\" placeholder=\"@name\" secondaryPlaceholder=\"@name\" (onBlur)=\"showAdmins = false\"\n                                    [separatorKeyCodes]=\"[32, 13, 188]\" formControlName=\"admins\" [onlyFromAutocomplete]=\"true\" id=\"admins\">\n                                    <tag-input-dropdown identifyBy=\"id\" displayBy=\"name\" [matchingFn]=\"nameMatching\" [focusFirstElement]=\"true\" [autocompleteItems]=\"friends\">\n                                    </tag-input-dropdown>\n                                </tag-input>\n                            </div>\n                        </div>\n\n                        <!-- <div class=\"flexContainer faStart fdColumn\">\n                            <h6 class=\"title firstTitle\">Add Other Community Admins</h6>\n                            <div [ngClass]=\"{'tag-input-wrapper': true, 'form-control': true, 'active': showAdmins == true}\">\n                                <div [ngClass]=\"{'d-none': showAdmins || fgCreateGroup.get('admins').value}\" class=\"tag-placeholder text-muted\" (click)=\"showAdmins = true; focusTagInput(admins)\">\n                                    Add your friends as admins\n                                </div>\n                                <tag-input #admins [ngClass]=\"{'d-none': !showAdmins && fgCreateGroup.get('admins').value === null}\" [onAdding]=\"transformName\"\n                                    [identifyBy]=\"'value'\" [displayBy]=\"'display'\" placeholder=\"@name\" secondaryPlaceholder=\"@name\" (onBlur)=\"showAdmins = false\"\n                                    [separatorKeyCodes]=\"[32, 13, 188]\" formControlName=\"admins\" [onlyFromAutocomplete]=\"true\" id=\"admins\">\n                                    <tag-input-dropdown identifyBy=\"id\" displayBy=\"name\" [matchingFn]=\"nameMatching\" [focusFirstElement]=\"true\" [autocompleteItems]=\"friends\">\n                                    </tag-input-dropdown>\n                                </tag-input>\n                            </div>\n                        </div> -->\n\n\n                        <div class=\"flexContainer\" style=\"justify-content: center\">\n                            <button type=\"button\" class=\"submitButton greyBtn\" (click)=\"toggleEdit()\" [disabled]=\"(fgCreateGroup.invalid && fgCreateGroup.wasChecked) || submitted\" style=\"margin-right: 20px;\">Cancel</button>\n                            <button type=\"button\"  class=\"submitButton\" (click)=\"updateCommunity()\" [disabled]=\"(fgCreateGroup.invalid && fgCreateGroup.wasChecked) || submitted\">Update</button>\n                        </div>\n\n                    </form>\n                </div>\n\n\n\n            </div>\n        </div>\n\n\n        <div class=\"col-md-6 order-2 order-sm-3\" *ngIf=\"!loadsuccessful && !loading\">\n            <div class=\"aboutContainer\">\n                <h2 style=\"overflow: auto\" class=\"location\">Uh oh. This group could not be found.</h2>\n            </div>\n        </div>\n\n        <!-- <div class=\"col-md-2 col-xl-2 offset-xl-0 col-md-7 offset-md-3 order-3 order-sm-4\" id=\"rightSideOfContainer\">\n            <feedback-form *ngIf=\"loggedin\"></feedback-form>\n        </div> -->\n    </div>\n</div>\n\n\n<ng-template #invitationModal let-c=\"close\" let-d=\"dismiss\">\n    <!--<div class=\"modal-header\" [formGroup]=\"inviteForm\">\n        <h4 class=\"modal-title\">Invite your friends to this community</h4>\n    </div>-->\n    <div class=\"modal-body container\" [formGroup]=\"inviteForm\">\n        <div class=\"row\">\n            <div class=\"col\">\n                <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n                    <span aria-hidden=\"true\" style=\"font-size:30px;\">&times;</span>\n                </button>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                <div id=\"friendsInput\" [ngClass]=\"{'tag-input-wrapper': true, 'form-control': true, 'active': showFriends == true}\">\n                    <div\n                        [ngClass]=\"{'d-none': showFriends || inviteForm.get('friends').value}\"\n                        class=\"tag-placeholder text-muted\"\n                        (click)=\"showFriends = true; focusTagInput(admins)\">\n                        Names of your friends you want to invite\n                    </div>\n                    <tag-input\n                        #admins\n                        [ngClass]=\"{'d-none': !showFriends && inviteForm.get('friends').value === null}\"\n                        [onAdding]=\"transformName\"\n                        [identifyBy]=\"'value'\"\n                        [displayBy]=\"'display'\"\n                        placeholder=\"@name\"\n                        secondaryPlaceholder=\"@name\"\n                        (onBlur)=\"showFriends = false\"\n                        [separatorKeyCodes]=\"[32, 13, 188]\"\n                        formControlName=\"friends\"\n                        [onlyFromAutocomplete]=\"true\">\n                        <tag-input-dropdown\n                            identifyBy=\"id\"\n                            displayBy=\"name\"\n                            [matchingFn]=\"nameMatching\"\n                            [focusFirstElement]=\"true\"\n                            [autocompleteItems]=\"friends\">\n                        </tag-input-dropdown>\n                    </tag-input>\n                </div>\n            </div>\n        </div>\n        <p class=\"shareText center\">Or share the following link with others to have them automatically enrolled in this group:</p>\n        <p class=\"enrollLink center\">{{autoEnrollLink}}</p>\n        <div class=\"row\" style=\"padding-top: 20px\">\n            <div class=\"col text-center\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"c(true)\">Send</button>\n            </div>\n        </div>\n    </div>\n    <!--<div class=\"modal-footer\" style=\"justify-content: center\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"c(true)\">Send</button>\n    </div>-->\n</ng-template>\n"

/***/ }),

/***/ "./src/app/view-community/view-community.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/view-community/view-community.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#viewCommunityContainer {\n  overflow: none;\n  margin-top: 8px; }\n\n#topJumbo {\n  border: 10px;\n  background: #e6f7ff; }\n\n.mouseChangeToHand {\n  cursor: pointer;\n  cursor: hand; }\n\n.padded-simple {\n  padding: 1rem; }\n\n#community-menu-wrapper {\n  position: absolute;\n  top: 55px;\n  right: 30px; }\n\n#community-menu-wrapper #community-menu {\n    font-size: 25px; }\n\nfeed-list {\n  margin-top: -30px; }\n\n#mobile-feed-list {\n  margin-top: 30px; }\n\n#friendsInput {\n  width: 88%;\n  margin: 0 auto;\n  height: 130px;\n  border-radius: 20px;\n  border: 2px solid green;\n  margin-top: -15px; }\n\n.lead {\n  font-family: Dosis; }\n\n.aboutContainer {\n  width: 100%;\n  padding: 25px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  background: #FFF;\n  margin: 0px;\n  border-radius: 4px;\n  border: 1px solid #e2e2e2;\n  position: relative;\n  margin-bottom: 18px; }\n\n.profilePicture {\n  width: 120px;\n  border-radius: 60px;\n  margin-right: 25px; }\n\n.profileInfo {\n  display: flex;\n  flex-direction: column; }\n\n.name {\n  margin-bottom: 2px;\n  font-family: Karla;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #333; }\n\n@media (max-width: 767px) {\n    .name {\n      font-size: 1.2rem; } }\n\n.description {\n  margin-bottom: 8px;\n  font-family: Karla;\n  font-size: 1.15rem;\n  font-weight: 300;\n  color: #666; }\n\n@media (max-width: 767px) {\n    .description {\n      font-size: .8rem; } }\n\n.description.smallDesc {\n    font-size: .8rem;\n    color: #666; }\n\n@media (max-width: 767px) {\n      .description.smallDesc {\n        font-size: .6rem; } }\n\n.stats {\n  color: #666;\n  font-size: .8rem;\n  font-weight: 400;\n  display: block; }\n\n.stats::before {\n    margin-left: 4px; }\n\n.stats::before:first-of-type {\n      margin-left: 0; }\n\n.stats span {\n    font-weight: 700;\n    font-family: Karla; }\n\n.addToNetwork {\n  position: absolute;\n  top: 20px;\n  right: 20px; }\n\n.submitButton {\n  background: #28ab64;\n  border-radius: 8px;\n  padding: 3px 12px;\n  line-height: 1.5rem;\n  width: auto;\n  text-align: center;\n  border: #e2e2e2 1px solid;\n  font-size: .9rem;\n  font-family: Karla;\n  color: #FFF !important;\n  outline-style: none;\n  margin-top: 0px; }\n\n.submitButton:active {\n    outline-style: none; }\n\n.submitButton:hover {\n    cursor: pointer;\n    background: #2dc070; }\n\n.greyBtn {\n  background: none;\n  border: 1px solid #666;\n  color: #666 !important; }\n\n.greyBtn:hover {\n    background: none;\n    color: #333 !important;\n    border: 1px solid #333; }\n\n.redBtn {\n  background: #e23f33;\n  border: 1px solid #e23f33;\n  color: #FFFFFF !important; }\n\n.redBtn:hover {\n    background: #dc2c1f;\n    color: #FFFFFFFF !important;\n    border: 1px solid #e23f33; }\n\n.center {\n  text-align: center; }\n\n.categoryMenu {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  display: flex; }\n\n@media (max-width: 767px) {\n    .categoryMenu {\n      top: 5px;\n      right: 5px; } }\n\n#community-image {\n  max-height: 150px;\n  max-width: 150px;\n  width: auto;\n  height: auto;\n  border-radius: 8px; }\n\n@media (max-width: 767px) {\n    #community-image {\n      max-height: 90px;\n      max-width: 90px; } }\n\n.profileMenu {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  display: flex; }\n\n.niceTextInput {\n  background: none;\n  outline-style: none;\n  font-family: Helvetica Neue, sans-serif;\n  border: none;\n  font-weight: 300;\n  padding: 2px;\n  width: 100%;\n  font-size: 1rem;\n  color: #666; }\n\n.niceTextAreaInput {\n  background: none;\n  outline-style: none;\n  border: none;\n  padding: 2px;\n  width: 100%;\n  font-family: Helvetica Neue, sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  overflow: hidden; }\n\n.flexContainer {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 15px 25px;\n  width: 100%; }\n\n.fdColumn {\n  flex-direction: column; }\n\n.faStart {\n  align-items: flex-start; }\n\n.fjCenter {\n  justify-content: center; }\n\n.imgContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start; }\n\n.imgContainer .inner {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    margin-bottom: 12px; }\n\n.flex {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%; }\n\n#uploadBtn {\n  margin-right: 20px; }\n\n#orText {\n  margin: 0px;\n  font-weight: 700;\n  font-family: Karla;\n  color: #666; }\n\n#urlImage {\n  margin: 0px 20px; }\n\n#preview {\n  border: 1px solid #28ab64;\n  width: 80px;\n  height: 80px;\n  border-radius: 8px;\n  outline-style: none;\n  outline: none; }\n\n.center {\n  text-align: center; }\n\n.shareText {\n  margin-top: 20px;\n  color: #666;\n  font-size: .9rem; }\n\n.enrollLink {\n  margin-top: 4px;\n  color: #0088cc;\n  font-size: .63rem;\n  text-decoration: underline; }\n\n#askBtn {\n  display: block;\n  margin: 0px auto;\n  width: 250px;\n  padding: 4px 10px;\n  font-size: 1.2rem;\n  font-weight: 400;\n  color: white;\n  background-color: #28ab64;\n  border-radius: 10px;\n  margin-top: -8px;\n  margin-bottom: 20px; }\n\n#askBtn:hover {\n    background-color: #36d07d; }\n"

/***/ }),

/***/ "./src/app/view-community/view-community.component.ts":
/*!************************************************************!*\
  !*** ./src/app/view-community/view-community.component.ts ***!
  \************************************************************/
/*! exports provided: ViewCommunityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewCommunityComponent", function() { return ViewCommunityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ViewCommunityComponent = /** @class */ (function () {
    function ViewCommunityComponent(http, fb, modalService, route, router, userService) {
        this.http = http;
        this.fb = fb;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.loggedin = false;
        this.loadsuccessful = false;
        this.loading = true;
        this.addfailed = false;
        this.autoEnrollLink = "";
        this.communityToJoin = "";
        this.verifyAccess = "";
        this.friends = [];
        this.showEdit = false;
        this.deleteWarning = false;
        this.showAllMembers = false;
    }
    ViewCommunityComponent.prototype.ngOnInit = function () {
        this.loggedin = false;
        this.loading = true;
        this.loadData();
    };
    ViewCommunityComponent.prototype.loadData = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params.id;
            _this.http.get("/group/retrieve/" + params.id).toPromise()
                .then(function (res) {
                _this.loading = false;
                _this.status = res.json().status;
                if (_this.status == '1') {
                    _this.data = res.json().data;
                    _this.autoEnrollLink = "www.questionsly.com/group/" + _this.id + ";access=" + _this.data.adminId;
                    _this.loggedin = res.json().loggedin == '1';
                    _this.loadsuccessful = true;
                    if (params.access) {
                        _this.communityToJoin = _this.id;
                        _this.verifyAccess = params.access;
                        if (_this.loggedin && !_this.data.ismember) {
                            _this.forceJoinPrivateCommunity(_this.id);
                        }
                        // Setting local storage so people are automatically added once they sign up or log in
                        if (!_this.loggedin) {
                            localStorage.setItem("comm", _this.communityToJoin);
                            localStorage.setItem("commVerification", _this.verifyAccess);
                        }
                    }
                }
                else if (_this.status == '2') {
                    _this.data = res.json().data;
                    _this.autoEnrollLink = "www.questionsly.com/group/" + _this.id + ";access=" + _this.data.adminId;
                    _this.loggedin = res.json().loggedin == '1';
                    _this.loadsuccessful = true;
                    if (params.access) {
                        _this.communityToJoin = _this.id;
                        _this.verifyAccess = params.access;
                        if (_this.loggedin && !_this.data.ismember) {
                            _this.forceJoinPrivateCommunity(_this.id);
                        }
                        if (!_this.loggedin) {
                            localStorage.setItem("comm", _this.communityToJoin);
                            localStorage.setItem("commVerification", _this.verifyAccess);
                        }
                    }
                }
                else {
                    _this.loadsuccessful = false;
                }
                _this.fgCreateGroup = _this.fb.group({
                    title: _this.data.title,
                    description: _this.data.description,
                    public: _this.data.public,
                    admins: _this.data.admins,
                    pic: _this.data.pic
                });
            })
                .catch(function () {
                this.loading = false;
                this.loadsuccessful = false;
            });
        });
        this.http.get("/users/network").toPromise().then(function (res) {
            var json = res.json();
            if (json.data) {
                _this.friends = json.data;
            }
        });
    };
    ViewCommunityComponent.prototype.updateCommunity = function () {
        var _this = this;
        var data = this.createcommunityData();
        this.http.put('/group/update', data).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                var commurl = response.json().id;
                _this.data.title = data.title;
                _this.data.description = data.description;
                _this.data.pic = data.pic;
                _this.data.public = data.public;
                _this.toggleEdit();
            }
            else {
                window.console.log("Updating Community Failed.");
            }
        })
            .catch(function (error) { return function (error) {
            this.submissionfailed = true;
            alert("Error posting community: " + error);
        }; });
    };
    ViewCommunityComponent.prototype.createcommunityData = function () {
        var data = this.fgCreateGroup.value;
        data.commid = this.id;
        for (var _i = 0, _a = ['hashtags', 'admins']; _i < _a.length; _i++) {
            var tagField = _a[_i];
            if (data[tagField]) {
                data[tagField] = data[tagField].map(function (tag) { return tag.value; });
            }
        }
        return data;
    };
    ViewCommunityComponent.prototype.transformHashtag = function (value) {
        if (value !== null && typeof value === 'object') {
            value = value.value;
        }
        if (value[0] === "#") {
            value = value.substring(1);
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"].of({
            display: "#" + value,
            value: value
        });
    };
    ViewCommunityComponent.prototype.focusTagInput = function (tagInput) {
        setTimeout(function () {
            tagInput.inputForm.input.nativeElement.focus();
        });
    };
    ViewCommunityComponent.prototype.observableSourceTag = function (keyword) {
        if (keyword) {
            if (keyword[0] === "#") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"].of([]);
                }
            }
            return this.http.post('/search', { type: 'tag', keyword: keyword })
                .map(this.observableProcessRaw.bind(this))
                .catch(function (err) {
                return [];
            });
        }
        else {
            return rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"].of([]);
        }
    };
    ViewCommunityComponent.prototype.observableTagProcess = function (data) {
        if (data.json().status == 1) {
            var searchoutput = [];
            var results = data.json().results;
            for (var l = 0; l < results.length; l++) {
                searchoutput.push(results[l].word);
            }
            return searchoutput;
        }
        else {
            return [];
        }
    };
    ViewCommunityComponent.prototype.observableProcessRaw = function (data) {
        if (data.json().status == 1) {
            var searchoutput = [];
            var results = data.json().results;
            for (var l = 0; l < results.length; l++) {
                searchoutput.push(results[l]);
            }
            return searchoutput;
        }
        else {
            return [];
        }
    };
    ;
    ViewCommunityComponent.prototype.transformName = function (x) {
        var value, display;
        if (x !== null && typeof x === 'object') {
            value = x.value;
            display = x.display;
            if (value[0] === "@") {
                value = value.substring(1);
            }
            return rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"].of({
                display: "@" + display,
                value: value
            });
        }
        else {
            return rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"].of({
                display: "@" + x,
                value: x
            });
        }
    };
    ViewCommunityComponent.prototype.nameMatching = function (keyword, target) {
        var targetValue = target.name;
        if (keyword[0] === "@") {
            keyword = keyword.substring(1);
        }
        return keyword.length > 0 &&
            targetValue &&
            targetValue.toLowerCase().indexOf(keyword.toLowerCase()) === 0;
    };
    ViewCommunityComponent.prototype.joinCommunity = function (x) {
        var _this = this;
        this.http.post('/group/join', { targetid: x }).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                _this.data.ismember = true;
            }
            else {
                _this.addfailed = true;
            }
        })
            .catch(function (error) { return function () {
            this.addfailed = true;
        }; });
    };
    ViewCommunityComponent.prototype.forceJoinPrivateCommunity = function (commid) {
        var _this = this;
        this.http.post('/group/accept', { commid: commid }).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                _this.loadData();
                _this.data.ismember = true;
            }
            else {
                _this.addfailed = true;
            }
        })
            .catch(function (error) { return function () {
            this.addfailed = true;
        }; });
    };
    ViewCommunityComponent.prototype.leaveCommunity = function (x) {
        var _this = this;
        this.http.post('/group/leave', { targetid: x }).toPromise()
            .then(function (response) {
            if (response.json().status == 1) {
                //
                _this.data.ismember = false;
            }
            else {
                _this.addfailed = true;
            }
            //
        })
            .catch(function (error) { return function () {
            this.addfailed = true;
        }; });
    };
    ViewCommunityComponent.prototype.reportCommunity = function (x) {
        this.http.post('/group/report', { targetid: x }).toPromise()
            .then(function (response) {
            //
        })
            .catch(function (error) { return function () {
            //
        }; });
    };
    ViewCommunityComponent.prototype.toggleDeleteWarning = function () {
        this.deleteWarning = !this.deleteWarning;
    };
    ViewCommunityComponent.prototype.deleteCommunity = function (x) {
        var _this = this;
        this.http.post('/group/delete', { targetid: this.id }).toPromise()
            .then(function (response) {
            _this.router.navigate(['/']);
            if (response.json().status == 1) {
            }
        })
            .catch(function (error) { return function () {
            //
        }; });
    };
    ViewCommunityComponent.prototype.inviteToCommunity = function () {
        var _this = this;
        this.inviteForm = this.fb.group({
            friends: null
        });
        this.modalService.open(this.invitationModal).result.then(function (result) {
            _this.http.post("/group/invite", {
                commid: _this.id,
                commtitle: _this.data.title,
                commpic: _this.data.pic,
                userids: _this.inviteForm.get('friends').value.map(function (friend) { return friend.value; }),
            }).toPromise().then(function (result) {
                if (result.json().status == 1) {
                    //console.log("accepted comm invite request");
                }
                else {
                    alert("Failed to send invites");
                }
            })
                .catch(function () {
                alert("Failed to send invites");
            });
        }, function (reason) {
            //on cancel
        });
    };
    ViewCommunityComponent.prototype.toggleEdit = function () {
        this.showEdit = !this.showEdit;
    };
    ViewCommunityComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.fgCreateGroup.get('pic').setValue(url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    ViewCommunityComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    ViewCommunityComponent.prototype.onPicChange = function ($event) {
        var file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    };
    ViewCommunityComponent.prototype.setPicUrl = function (url) {
        this.fgCreateGroup.get('pic').setValue(url);
    };
    ViewCommunityComponent.prototype.toggleAudience = function (audience) {
        this.fgCreateGroup.get('public').setValue(audience);
    };
    ViewCommunityComponent.prototype.autosizeTextarea = function (event, el) {
        if (event.keyCode == 13) {
            el.blur();
        }
        else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('invitationModal'),
        __metadata("design:type", Object)
    ], ViewCommunityComponent.prototype, "invitationModal", void 0);
    ViewCommunityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-view-community',
            template: __webpack_require__(/*! ./view-community.component.html */ "./src/app/view-community/view-community.component.html"),
            styles: [__webpack_require__(/*! ./view-community.component.scss */ "./src/app/view-community/view-community.component.scss")],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]],
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], ViewCommunityComponent);
    return ViewCommunityComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/fernandofunes/Desktop/questionsly/QuestionslyFrontend/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map