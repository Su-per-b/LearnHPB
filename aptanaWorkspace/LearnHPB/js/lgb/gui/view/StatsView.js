/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
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


goog.provide('lgb.gui.view.StatsView');

goog.require('lgb.gui.view.StatsHelper');
goog.require('lgb.gui.view.BaseViewGUI');



/**
 * MVC View
 * @constructor
 * @extends {lgb.gui.view.BaseViewGUI}
 * @param {Element} containerDiv The DOM element to append to.
 */
lgb.gui.view.StatsView = function(containerDiv) {

  lgb.gui.view.BaseViewGUI.call(this);
  this.init(containerDiv);

};
goog.inherits(lgb.gui.view.StatsView, lgb.gui.view.BaseViewGUI);



/**
 * Initializes the View
 * @param {Element} containerDiv The DOM element to append to.
 */
lgb.gui.view.StatsView.prototype.init = function(containerDiv) {

  this.stats_ = new lgb.gui.view.StatsHelper(containerDiv);
  containerDiv.appendChild(this.stats_.domElement);

  this.listen(e.RenderNotify, this.d(this.onRender));
};


/**
 * Event handler.
 * @param {e.RenderNotify} event Fired by the Worldcontroller.
 */
lgb.gui.view.StatsView.prototype.onRender = function(event) {
  this.stats_.update();
};











