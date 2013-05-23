/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.BaseDataSource');

goog.require('lgb.BaseClass');
goog.require('lgb.events.DataSourceChanged');


/**
 * @constructor
 * @extends lgb.BaseClass
 */
lgb.component.BaseDataSource = function() {

  lgb.BaseClass.call(this);

};
goog.inherits(lgb.component.BaseDataSource, lgb.BaseClass);



/**
 * dispatches a local DataModelChanged Event
 * used to notify the view
 * @protected
 */
lgb.component.BaseDataSource.prototype.dispatchChange = function(payload) {
  
  
  if (undefined == payload) {
    payload = this;
  }
  
  this.dispatchLocal(new lgb.events.DataSourceChanged(payload));
  

};

