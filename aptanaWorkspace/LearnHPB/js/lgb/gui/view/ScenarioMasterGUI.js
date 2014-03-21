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


  this.listenForChange_('selectedFileName');
  
};


lgb.gui.view.ScenarioMasterGUI.prototype.onChange_selectedFileName_ = function(selectedFileName) {
  
  
  this.triggerLocal(e.RequestLoadScenario, selectedFileName);
  
};



lgb.gui.view.ScenarioMasterGUI.prototype.add = function(gui) {

  var el = this.getMainElement();
  gui.appendTo(el);
  
};



lgb.gui.view.ScenarioMasterGUI.prototype.bind_ = function() {
  
  this.kendoDropDownList_.bind('select', this.d(this.onDropDownSelect_));

};


lgb.gui.view.ScenarioMasterGUI.prototype.onDropDownSelect_ = function(event) {
  
  var idx = event.item.index();
  var dataItem = this.kendoDropDownList_.dataItem(idx);
  var value = dataItem.value;
  
  this.dataModel.changePropertyEx('selectedFileName', value);
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
    
    this.kendoDropDownList_ = 
      div.kendoDropDownList({
        dataSource: scenarios,
            dataTextField: 'name',
            dataValueField: 'value',
        change: this.d(this.onDropDownChange)
      }).data('kendoDropDownList');
      
     this.bind_();
     
};


