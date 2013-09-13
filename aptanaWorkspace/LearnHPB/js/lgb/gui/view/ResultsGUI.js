goog.provide('lgb.gui.view.ResultsGUI');

goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.ResultsGUI = function(dataModel) {

  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('resultsGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);
  
};
goog.inherits(lgb.gui.view.ResultsGUI, lgb.gui.view.BaseViewGUI);





lgb.gui.view.ResultsGUI.prototype.add = function(gui) {


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
lgb.gui.view.ResultsGUI.prototype.init = function() {


  // this.tabStrip1.setOptions({
    // width : "100%",
    // height : "100%",
  // });

    this.triggerLocal(e.RequestAddToLayout, this);
};




/**
 * @public
 */
lgb.gui.view.ResultsGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("width","100%");
  el.css("min-height","100%");


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


