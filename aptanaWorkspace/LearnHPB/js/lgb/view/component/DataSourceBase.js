/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.DataSourceBase');

goog.require('lgb.BaseClass');
goog.require('lgb.events.DataSourceChanged');


/**
 * @constructor
 * @extends lgb.BaseClass
 */
lgb.component.DataSourceBase = function() {
  lgb.BaseClass.call(this);
  
  if (this._NAME === undefined) {
    this._NAME = 'lgb.component.DataSourceBase';
  }
};
goog.inherits(lgb.component.DataSourceBase, lgb.BaseClass);



/**
 * dispatches a local DataModelChanged Event
 * used to notify the view
 * @protected
 */
lgb.component.DataSourceBase.prototype.dispatchChange = function() {
  this.dispatchLocal(new lgb.events.DataSourceChanged(this));
};


/**
 * returns a CSS id based on the fullname of the class
 * @protected
 * @return {string} The CSS ID.
 */
lgb.component.DataSourceBase.prototype.getCssID = function() {
  if (this._NAME === undefined) {
    throw ('this._NAME === undefined');
  } else {
    var id = this._NAME.split('.').join('-');
    return id;
  }
};
