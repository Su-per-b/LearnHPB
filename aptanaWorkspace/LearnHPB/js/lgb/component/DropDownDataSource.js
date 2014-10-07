/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
 
goog.provide('lgb.component.DropDownDataSource');
 
goog.require('lgb.component.DropDownDSnode');
goog.require('lgb.core.BaseModel');

/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.component.DropDownDataSource = function(name) {

  lgb.core.BaseModel.call(this);
  
  this.name = name;
  this.list= [];
  this.selectedIdx_= 0;
  this.selectedOption = null;
  
};
goog.inherits(lgb.component.DropDownDataSource, lgb.core.BaseModel);



lgb.component.DropDownDataSource.prototype.add = function(name, value, isDefault) {

  var option = new lgb.component.DropDownDSnode(name, value);
  this.list.push(option);
  
  if (isDefault) {
    this.selectedIdx_ = this.list.length-1;
  }
  
};


lgb.component.DropDownDataSource.prototype.selectByIdx = function(idx) {


  this.selectedIdx_ = idx;
  this.selectedOption = this.list[this.selectedIdx_];
  
  this.changePropertyEx("selectedOption", this.selectedOption);
  
};


