goog.provide('lgb.view.input.ScenarioInputGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.input.ScenarioInputGUI = function(dataModel) {

  this._TITLE = 'Scenario';
  
  lgb.view.input.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.input.ScenarioInputGUI, lgb.view.input.BaseViewGUI);


/**
 * @public
 */
lgb.view.input.ScenarioInputGUI.prototype.init = function() {

  this.layoutID = lgb.Config.LAYOUT_ID.ScenarioInputGUI;
    
  this.dataSource = new lgb.component.TabStripDataSource('scenarioInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.view.input.ScenarioInputGUI.prototype.add = function(gui) {

  var el = this.getMainElement();
  gui.appendTo(el, true);
  
};



/**
 * @public
 */
lgb.view.input.ScenarioInputGUI.prototype.inject = function(parentElement) {
  

  goog.base(this,  'inject', parentElement);
  
  
   var items = [
          {text: "Scenario 1", value:"1"},
          {text: "Scenario 2", value:"2"}
          ];
          
          
  var el = this.getMainElement();
  

  var titleDiv = el.append('<h5>Select Scenario</h5>')
    
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


