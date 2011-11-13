goog.provide('lgb.Global');




/**@typedef {Object} */
lgb.Global = {};

  /**
  * replaces markers like {0} with a string
  *
  * @param {string} arg1 The value to insert.
  * @param {string=} arg2 The value to insert.
  * @param {string=} arg3 The value to insert.
  * @param {string=} arg4 The value to insert.
  * @param {string=} arg5 The value to insert.
  * @param {string=} arg6 The value to insert.
  * @return {string} The correctly formatted string.
  */
  String.prototype.format = function(arg1, arg2, arg3, arg4, arg5, arg6) {
    var args = arguments;
    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function(m, n) {
      if (m == '{{') { return '{'; }
      if (m == '}}') { return '}'; }
      return args[n];
    });
  };



/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
if (!window.requestAnimationFrame) {

  /**
   * the function def.
   */
  window.requestAnimationFrame = (function() {

    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(
      /* function FrameRequestCallback */ callback,
      /* DOMElement Element */ element) 
    {
      window.setTimeout(callback, 1000 / 60);
    };

  })();

}

