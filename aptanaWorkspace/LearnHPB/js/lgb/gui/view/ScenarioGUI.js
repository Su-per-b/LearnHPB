goog.provide('lgb.gui.view.ScenarioGUI');

goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.ScenarioGUI = function(dataModel) {

  this._TITLE = 'Scenario';
  
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.ScenarioGUI, lgb.gui.view.BaseViewGUI);


/**
 * @public
 */
lgb.gui.view.ScenarioGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('scenarioInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabTitleMap_ = {};
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.gui.view.ScenarioGUI.prototype.add = function(gui) {

  var el = this.getMainElement();
  gui.appendTo(el);
  
};



/**
 * @public
 */
lgb.gui.view.ScenarioGUI.prototype.injectTo = function(parentElement) {
  

  goog.base(this,  'injectTo', parentElement);
  
  
   var items = [
          {text: "Scenario 1", value:"1"},
          {text: "Scenario 2", value:"2"}
          ];
          
          
  var el = this.getMainElement();
  

  var titleDiv = el.append('<h5>Select Scenario</h5>');
    
  var cb = $('<div>');
  el.append(cb);

  this.kendoComboBox_ = 
      cb.kendoDropDownList( 
        {
          dataTextField: "text",
          dataValueField: "value",
          dataSource: items,
          enable: false
        }
      ).data("kendoDropDownList");
      
      
      this.kendoComboBox_.select(0);

  el.append('<br />');
  el.append('<br />');
  
};


