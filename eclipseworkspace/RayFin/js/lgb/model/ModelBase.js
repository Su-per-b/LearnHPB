goog.provide('lgb.model.ModelBase');

goog.require('lgb.BaseClass');


/**
 * @constructor
 * @extends lgb.BaseClass
 */
lgb.model.ModelBase = function() {
  lgb.BaseClass.call(this);
};
goog.inherits(lgb.model.ModelBase, lgb.BaseClass);


/**
 * @param {Object=} whatIsDirty And object with properties of telling
 * what has changed in the data model.
 * @protected
 */
lgb.model.ModelBase.prototype.dispatchChange = function(whatIsDirty) {
    this.dispatchLocal(new lgb.events.DataModelChanged(whatIsDirty));
};


/**
 * returns a CSS id based on the fullname of the class
 * @protected
 * @return {string} The CSS ID.
 */
lgb.model.ModelBase.prototype.getCssID = function() {
  if (this._NAME === undefined) {
    throw ('this._NAME === undefined');
  } else {
    var id = this._NAME.split('.').join('-');
    return id;
  }
};
