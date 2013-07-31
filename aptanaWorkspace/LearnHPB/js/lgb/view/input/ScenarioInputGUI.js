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


  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title]
  } else {
    
    contentElement = this.tabStrip1.addTab(title);
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.inject(contentElement);
  
};


/**
 * @public
 */
lgb.view.input.ScenarioInputGUI.prototype.inject = function(parentElement) {
  

  goog.base(this,  'inject', parentElement);
  
  
   var items = [
          {text: "Scenario 1", value:"1"},
          {text: "Scenario 2", value:"2"},
          {text: "Scenario 3", value:"3"},
          {text: "Scenario 4", value:"4"}
          ];
          
          
  var el = this.getMainElement();
  

  var titleDiv = el.append('<h4>Select Scenario</h4>')
    
  var cb = $('<div>');
  el.append(cb);
  
  
  this.kendoComboBox_ = 
      cb.kendoDropDownList( 
        {
          dataTextField: "text",
          dataValueField: "value",
          dataSource: items
        }
      ).data("kendoDropDownList");
      
      
      this.kendoComboBox_.select(0);


  
};


