/**
 * @constructor
 * @param {Object} arg1 The object whosre properties we will tween
 * @param {Object} arg2 The props
 * @return {Tween}
 */
function Tween(arg1, arg2) {};

/**
 * @param {number} delta Milliseconds
 * @param {boolean} paused Is paused flag
 */
Tween.tick = function(delta,paused) {};

/** 
 * Queues a tween from the current values to the target properties. Set duration to 0 to jump to these value.
 * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
 * properties will be set at the end of the specified duration.
 * @method to
 * @param {Object} props An object specifying property target values for this tween (Ex. {x:300} would tween the x property of the target to 300).
 * @param {number} duration The duration of the wait in milliseconds (or in ticks if useTicks is true).
 * @param {Function} ease The easing function to use for this tween.
 */
Tween.prototype.to = function(props, duration, ease) {};


/**
 * Returns a new tween instance. This is functionally identical to using "new Tween(...)", but looks cleaner
 * with the chained syntax of TweenJS.
 * @method get
 * @static
 * @param {Object} target The target object that will have its properties tweened.
 * @param {Object} props The configuration properties to apply to this tween instance (ex. {loop:true}). Supported props are:<UL>
 *    <LI> loop: sets the loop property on this tween.</LI>
 *    <LI> css: indicates this is a CSS tween. This causes it to use the style property of the target as the default target
 *        for property changes, and to use the cssSuffixMap property for generating CSS value strings.</LI>
 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
 *    <LI> ignoreGlobalPause: sets the ignoreGlobalPause property on this tween.</LI>
 *    <LI> override: if true, Tween.removeTweens(target) will be called to remove any other tweens with the same target.
 * </UL>
 * @return {Tween}
 **/
Tween.get = function(target, props) {};


/** @typedef {Object} */
var Ease;


Ease.quadInOut = function() {};



