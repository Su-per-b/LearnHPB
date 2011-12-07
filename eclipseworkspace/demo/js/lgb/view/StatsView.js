/*
 * stats.js r6
 * http://github.com/mrdoob/stats.js
 *
 * Released under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * How to use:
 *
 *  var stats = new Stats();
 *  parentElement.appendChild( stats.domElement );
 *
 *  setInterval(function () {
 *
 *    stats.update();
 *
 *  }, 1000/60);
 *
 * modified by Raj Dye 11/12/2011
 */


goog.provide('lgb.view.StatsView');

goog.require('lgb.view.StatsHelper');
goog.require('lgb.view.ViewBase');



/**
 * MVC View
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {Element} containerDiv The DOM element to append to.
 */
lgb.view.StatsView = function(containerDiv) {
  lgb.view.ViewBase.call(this);

  this.init(containerDiv);
  this._NAME = 'lgb.view.StatsView';
};
goog.inherits(lgb.view.StatsView, lgb.view.ViewBase);



/**
 * Initializes the View
 * @param {Element} containerDiv The DOM element to append to.
 */
lgb.view.StatsView.prototype.init = function(containerDiv) {

  this.stats_ = new lgb.view.StatsHelper(containerDiv);
  containerDiv.appendChild(this.stats_.domElement);

  this.listen(lgb.events.Render.TYPE, this.d(this.onRender));
};


/**
 * Event handler.
 * @param {lgb.events.Render} event Fired by the Worldcontroller.
 */
lgb.view.StatsView.prototype.onRender = function(event) {
  this.stats_.update();
};











