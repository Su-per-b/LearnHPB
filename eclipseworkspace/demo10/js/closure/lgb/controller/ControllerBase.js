goog.provide('lgb.controller.ControllerBase');

goog.require ("lgb.BaseClass");


lgb.controller.ControllerBase = function() {
	lgb.BaseClass.call(this);
};

goog.inherits(lgb.controller.ControllerBase, lgb.BaseClass);


lgb.controller.ControllerBase.prototype.d = function(theFunction) {
	var delegate = $.proxy(theFunction, this);
	return delegate;
};






