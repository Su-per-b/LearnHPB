/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Option');

goog.require('lgb.view.scenario.BaseViewGUI');



lgb.view.scenario.Option = function(dataModel) {

  lgb.view.scenario.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.scenario.Option, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.Option.prototype.appendTo = function(el) {


  var div = this.makeDiv();
  div.addClass('input-Option');
  
  
  div.append(
    'name : ' + this.dataModel.name + '<br />'
  );
  
  div.append(
    'disabled : ' + this.dataModel.disabled + '<br />'
  );
  
  div.append(
    'default : ' + this.dataModel['default'] + '<br />'
  );


  el.append(
    div
  );


};



