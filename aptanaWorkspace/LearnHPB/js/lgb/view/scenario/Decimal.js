/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Decimal');

goog.require('lgb.view.scenario.BaseViewGUI');



lgb.view.scenario.Decimal = function(dataModel) {

  lgb.view.scenario.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.scenario.Decimal, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.Decimal.prototype.appendTo = function(el, debugFlag) {
  
  if (debugFlag) {
    this.debugAppendTo(el);
  } else {
    
    el.append(
      " ({0}-{1})".format(this.dataModel.min, this.dataModel.max)
    );
    
    this.div = this.makeDiv();
    this.div.addClass('input-Decimal');

    this.inputElement_ = $('<input>')
      .addClass('input-Decimal-textbox')
      .attr( "type", "text" )
      .attr( "value", this.dataModel['default'] );

    
    this.div.append(
      this.inputElement_
    );
    
    
    el.append(
      this.div
    );
    
  }
  
};




lgb.view.scenario.Decimal.prototype.debugAppendTo = function(el) {

  var div = this.makeDiv();
  div.addClass('input-DecimalDebug');
  
  
  div.append(
    'type : Decimal <br />'
  );
  
  
  div.append(
    'min : ' + this.dataModel.min + '<br />'
  );
  
  div.append(
    'max : ' + this.dataModel.max + '<br />'
  );
  
  div.append(
    'default : ' + this.dataModel['default'] + '<br />'
  );

  el.append(
    div
  );

};
