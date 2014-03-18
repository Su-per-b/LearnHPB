goog.provide('lgb.gui.view.ScenarioMasterGUI');

goog.require('lgb.gui.view.BaseGUI');



lgb.gui.view.ScenarioMasterGUI = function(dataModel) {

  this._TITLE = 'ScenarioMasterGUI';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.ScenarioMasterGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.ScenarioMasterGUI.prototype.init = function() {



};


lgb.gui.view.ScenarioMasterGUI.prototype.add = function(gui) {

  var el = this.getMainElement();
  gui.appendTo(el);
  
};



/**
 * @public
 */
lgb.gui.view.ScenarioMasterGUI.prototype.injectInto = function(parentElement) {
  

   goog.base(this,  'injectInto', parentElement);
   
   var scenarios = this.dataModel.getScenarioList();
   

    
    
    var div = this.makeDiv();
        
     div
    .addClass('input-ListBox')
    .addClass('select')
    .append('<input>')
    .attr('value', '1');
    
    this.append(div);
    
    this.kendoDropDownList = 
      div.kendoDropDownList({
        dataSource: scenarios,
            dataTextField: 'name',
            dataValueField: 'fileName',
        change: this.d(this.onDropDownChange)
      }).data('kendoDropDownList');
      
  
};


