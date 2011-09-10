goog.provide('lgb.controller.ControllerBase');

goog.require ("lgb.Base");

console.log("loaded ControllerBase");

var lgb = (function(lgb) {


	lgb.controller = lgb.controller || {};
	
	lgb.controller.ControllerBase = function() {
		lgb.Base.call(this);
	};
	
	goog.inherits(lgb.controller.ControllerBase, lgb.Base);


	lgb.controller.ControllerBase.prototype.d = function(theFunction) {
		var delegate = $.proxy(theFunction, this);
		return delegate;
	}


	return lgb;
	
})(lgb || {});



console.log("parsed ControllerBase");

