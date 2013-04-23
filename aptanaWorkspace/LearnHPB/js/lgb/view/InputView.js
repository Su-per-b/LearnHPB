goog.provide('lgb.view.InputView');

goog.require('lgb.view.BaseView');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');


lgb.view.InputView = function(dataModel, htmlID, parentHtmlID) {
    
  this._NAME = 'lgb.view.InputView';
  
  lgb.view.BaseView.call(this, dataModel, htmlID, parentHtmlID);

};
goog.inherits(lgb.view.InputView, lgb.view.BaseView);


/**
 * @public
 */
lgb.view.InputView.prototype.init = function() {
 

  var dataSource = new lgb.component.TabStripDataSource
        ('TabStripTitle', this.parentHtmlID, 'leftpanel-tabStrip');
        
       
  dataSource.addTab('Viewpoints', '<br />', 1);
  dataSource.addTab('Airflow', 'parent content 2 <br />', 2);

  
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
 * @return {string} The Css to be injected into the DOM.
 */
lgb.view.InputView.prototype.getCss = function() {

  var css = this.tabStripViewParent.getCss();
    
  return css;
};


lgb.view.InputView.prototype.getHtml = function() {
    
  var el = this.getElement();
  return el[0].outerHTML;
  
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



