goog.provide('lgb.view.input.ResultsGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.input.ResultsGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.view.input.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.input.ResultsGUI, lgb.view.input.BaseViewGUI);


/**
 * @public
 */
lgb.view.input.ResultsGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('ResultsGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.view.input.ResultsGUI.prototype.add = function(gui) {


  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title];
  } else {
    
    contentElement = this.tabStrip1.addTab(title);
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.injectTo(contentElement);
  
};


/**
 * @public
 */
lgb.view.input.ResultsGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("padding-top","68px");



// 
    // this.mainPanel_ = $('<div>').attr('id', "resultsGUIMainPanel");
    // this.append(this.mainPanel_);
//     
// 
    // var tabsID = 'simulationView-tabs';
    // var tabStripID = 'simulationView-tabstrip';
// 
    // var htmlTabs = '<div id="{0}" class="k-content">' + '<div id="{1}" />' + '</div>';
// 
    // htmlTabs = htmlTabs.format(tabsID, tabStripID);
// 
    // this.mainPanel_.append(htmlTabs);
//     
    // this.tabStripContainer_ = $('#' + tabStripID);
    // this.mainPanel_.append(this.tabStripContainer_);
//     
// 
    // this.kendoTabStrip = this.tabStripContainer_.kendoTabStrip({
        // animation : false
    // }).data('kendoTabStrip');
// 
    // this.kendoTabStrip.append([{
        // text : 'Console',
        // content: "<br> Console"
    // }, {
        // text : 'Input',
        // content: "<br> Input"
    // }, {
        // text : 'Output',
        // content: "<br> Output"
    // }, {
        // text : 'Results Log',
        // content: "<br> Results"
    // }]);
// 
    // this.kendoTabStrip.select(this.kendoTabStrip.tabGroup[0].children[0]);
//     
    // this.messageBox_ = $(this.kendoTabStrip.contentElements[0]);
    // this.inputBox_ = $(this.kendoTabStrip.contentElements[1]);
    // this.outputBox_ = $(this.kendoTabStrip.contentElements[2]);
    // this.resultsLogBox_ = $(this.kendoTabStrip.contentElements[3]);


};


