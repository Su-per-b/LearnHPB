
/**
 * @constructor
 * @param {(jQuerySelector|Element|Array.<Element>|Object|jQuery|string|
 *     function())=} arg1
 * @param {(Element|jQuery|Document|
 *     Object.<string, (string|function(jQuery.event=))>)=} arg2
 * @return {jQuery}
 */
function jQueryObject(arg1, arg2) {};


// Undocumented jQuery externs called by ui
/**
 * @param {Element} elem
 * @param {string} name
 * @param {boolean=} force
 * @return {string}
 * @nosideeffects
 */
jQueryObject.prototype.curCSS = function(elem, name, force) {};


/** @const */
jQuery.expr;

/** @type {Object.<string, function(Element, RegExp)>} */
jQuery.expr[":"];

/**
 * @param {Element} elem
 * @return {boolean}
 */
jQuery.expr.hidden = function(elem) {};

/** @type {Object.<string, function(Element, RegExp)>} */
jQuery.expr.filters;

// UI extensions to jQuery
/** @return {Element} */
jQueryObject.prototype.scrollParent = function() {};

/**
 * @param {number=} zIndex
 * @return {number}
 */
jQueryObject.prototype.zIndex = function(zIndex) {};

/** @return {jQueryObject} */
jQueryObject.prototype.disableSelection = function() {};

/** @return {jQueryObject} */
jQueryObject.prototype.enableSelection = function() {};

// UI extensions to jQuery selectors
/**
 * @param {Element} elem
 * @param {number} i
 * @param {RegExp} match
 * @return {*}
 */
jQuery.expr[":"].data = function(elem, i, match) {};

/**
 * @param {Element} element
 * @return {boolean}
 * @nosideeffects
 */
jQuery.expr[":"].focusable = function(element) {};

/**
 * @param {Element} element
 * @return {boolean}
 * @nosideeffects
 */
jQuery.expr[":"].tabbable = function(element) {};

//UI Namespace
jQuery.ui;

// jquery.ui.core.js externs
/** @type {string} */
jQuery.ui.version;

/** @enum */
jQuery.ui.keyCode = {
  ALT: 18,
  BACKSPACE: 8,
  CAPS_LOCK: 20,
  COMMA: 188,
  COMMAND: 91,
  COMMAND_LEFT: 91, // COMMAND
  COMMAND_RIGHT: 93,
  CONTROL: 17,
  DELETE: 46,
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESCAPE: 27,
  HOME: 36,
  INSERT: 45,
  LEFT: 37,
  MENU: 93, // COMMAND_RIGHT
  NUMPAD_ADD: 107,
  NUMPAD_DECIMAL: 110,
  NUMPAD_DIVIDE: 111,
  NUMPAD_ENTER: 108,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_SUBTRACT: 109,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  PERIOD: 190,
  RIGHT: 39,
  SHIFT: 16,
  SPACE: 32,
  TAB: 9,
  UP: 38,
  WINDOWS: 91 // COMMAND
}

/** @deprecated */
jQuery.ui.plugin;

/**
 * @param {string} module
 * @param {Object.<string, *>} option
 * @param {Object.<string, Array.<*>>} set
 * @deprecated
 */
jQuery.ui.plugin.add = function(module, option, set) {};

/**
 * @param {jQueryObject} instance
 * @param {string} name
 * @param {...*} args
 * @deprecated
 */
jQuery.ui.plugin.call = function(instance, name, args) {};

/**
 * @param {Element} container
 * @param {Element} contained
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
jQuery.ui.contains = function(container, contained) {};

/**
 * @param {Element} el
 * @param {string=} a
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
jQuery.ui.hasScroll = function(el, a) {};

/**
 * @param {number} x
 * @param {number} reference
 * @param {number} size
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
jQuery.ui.isOverAxis = function(x, reference, size) {};

/**
 * @param {number} y
 * @param {number} x
 * @param {number} top
 * @param {number} left
 * @param {number} height
 * @param {number} width
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
jQuery.ui.isOver = function(y, x, top, left, height, width) {};


/** @const */
$.expr;

/** @type {Object.<string, function(Element, RegExp)>} */
$.expr[":"];

/**
 * @param {Element} elem
 * @return {boolean}
 */
$.expr.hidden = function(elem) {};

/** @type {Object.<string, function(Element, RegExp)>} */
$.expr.filters;

// UI extensions to $ selectors
/**
 * @param {Element} elem
 * @param {number} i
 * @param {RegExp} match
 * @return {*}
 */
$.expr[":"].data = function(elem, i, match) {};

/**
 * @param {Element} element
 * @return {boolean}
 * @nosideeffects
 */
$.expr[":"].focusable = function(element) {};

/**
 * @param {Element} element
 * @return {boolean}
 * @nosideeffects
 */
$.expr[":"].tabbable = function(element) {};

//UI Namespace
$.ui;

// $.ui.core.js externs
/** @type {string} */
$.ui.version;

/** @enum */
$.ui.keyCode = {
  ALT: 18,
  BACKSPACE: 8,
  CAPS_LOCK: 20,
  COMMA: 188,
  COMMAND: 91,
  COMMAND_LEFT: 91, // COMMAND
  COMMAND_RIGHT: 93,
  CONTROL: 17,
  DELETE: 46,
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESCAPE: 27,
  HOME: 36,
  INSERT: 45,
  LEFT: 37,
  MENU: 93, // COMMAND_RIGHT
  NUMPAD_ADD: 107,
  NUMPAD_DECIMAL: 110,
  NUMPAD_DIVIDE: 111,
  NUMPAD_ENTER: 108,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_SUBTRACT: 109,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  PERIOD: 190,
  RIGHT: 39,
  SHIFT: 16,
  SPACE: 32,
  TAB: 9,
  UP: 38,
  WINDOWS: 91 // COMMAND
}

/** @deprecated */
$.ui.plugin;

/**
 * @param {string} module
 * @param {Object.<string, *>} option
 * @param {Object.<string, Array.<*>>} set
 * @deprecated
 */
$.ui.plugin.add = function(module, option, set) {};

/**
 * @param {jQueryObject} instance
 * @param {string} name
 * @param {...*} args
 * @deprecated
 */
$.ui.plugin.call = function(instance, name, args) {};

/**
 * @param {Element} container
 * @param {Element} contained
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
$.ui.contains = function(container, contained) {};

/**
 * @param {Element} el
 * @param {string=} a
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
$.ui.hasScroll = function(el, a) {};

/**
 * @param {number} x
 * @param {number} reference
 * @param {number} size
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
$.ui.isOverAxis = function(x, reference, size) {};

/**
 * @param {number} y
 * @param {number} x
 * @param {number} top
 * @param {number} left
 * @param {number} height
 * @param {number} width
 * @return {boolean}
 * @nosideeffects
 * @deprecated
 */
$.ui.isOver = function(y, x, top, left, height, width) {};