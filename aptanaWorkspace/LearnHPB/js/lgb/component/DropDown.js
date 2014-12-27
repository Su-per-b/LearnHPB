/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
 
goog.provide('lgb.component.DropDown');


goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.DropDownDataSource');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.component.DropDown = function(dataModel) {

  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.component.DropDown, lgb.gui.view.BaseGUI);



lgb.component.DropDown.prototype.bind_ = function() {
  
  this.kendoComboBox_.bind('select', this.d(this.onSelect_));
  this.kendoComboBox_.bind('open', this.d(this.onOpen_));
  this.kendoComboBox_.bind('close', this.d(this.onClose_));
  
};


lgb.component.DropDown.prototype.onOpen_ = function(event) {
  
    this.triggerLocal(e.OpenDropDown, this.dataModel.selectedOption);
};


lgb.component.DropDown.prototype.onClose_ = function(event) {
  
    this.triggerLocal(e.CloseDropDown, this.dataModel.selectedOption);
};



lgb.component.DropDown.prototype.onSelect_ = function(event) {

  var idx = event.item.index();
  this.dataModel.selectByIdx(idx);

  this.triggerLocal(e.Select, this.dataModel.selectedOption);
  
};


lgb.component.DropDown.prototype.injectInto = function(parentElement) {

  parentElement.append('<br />');
  parentElement.append('<br />');
 
  
  parentElement.append('<p>' + this.dataModel.name + '</p>');
  
  var container = $('<div>');
  parentElement.append(container);
  
  

  
  
  this.kendoComboBox_ = 
      container.kendoDropDownList( 
        {
          dataTextField: "name",
          dataValueField: "value",
          dataSource: this.dataModel.list
        }
      ).data("kendoDropDownList");
      
      this.kendoComboBox_.select(1);
      
   this.bind_();
      
};

