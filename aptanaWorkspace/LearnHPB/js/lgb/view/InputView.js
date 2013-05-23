goog.provide('lgb.view.InputView');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');


lgb.view.InputView = function(dataModel, htmlID, parentHtmlID) {
    
  
  lgb.view.BaseViewGUI.call(this, dataModel, htmlID, parentHtmlID);

};
goog.inherits(lgb.view.InputView, lgb.view.BaseViewGUI);


/**
 * @public
 */
lgb.view.InputView.prototype.init = function() {
 

  var dataSource = new lgb.component.TabStripDataSource
        ('TabStripTitle', this.parentHtmlID, 'leftpanel-tabStrip');
        
       
  dataSource.addTab('Viewpoints', '<br />', 1);
  dataSource.addTab('Airflow', '<br />', 2);
  dataSource.addTab('Settings', '<br />', 3);

  
  this.tabStrip1 = new lgb.component.TabStrip(dataSource);
  
  this.tabStrip1.setOptions(
      {
          width : "100%"
      }
  );
  
  this.injectHtml();
  this.injectCss();
    
  return;
};




/**
 * @public
 */
lgb.view.InputView.prototype.injectHtml = function() {

  this.tabStrip1.injectHtml();
  
};


/**
 * @public
 */
lgb.view.InputView.prototype.injectCss = function() {

  this.tabStrip1.injectCss();

};



