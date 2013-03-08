goog.provide('sim.view.InputView');

goog.require('sim.view.ViewBase');



sim.view.InputView = function(dataModel, htmlID, parentHtmlID) {
  sim.view.ViewBase.call(this, dataModel);

  this._NAME = 'sim.view.InputView';
  this.setIds_(htmlID, parentHtmlID);
  
};
goog.inherits(sim.view.InputView, sim.view.ViewBase);


/**
 * @public
 */
sim.view.InputView.prototype.init = function() {
 

  var dataSource = new sim.component.TabStripDataSource
        ('TabStripTitle', '', 'tabStrip1');
        
       
  dataSource.addTab('INPUTS', 'parent content 1 <br />', 1);
  dataSource.addTab('FAULTS', 'parent content 2 <br />', 2);
  dataSource.addTab('INSTRUMENTS', 'parent content 3 <br />', 3);
  
  this.tabStrip1 = new sim.component.TabStrip(dataSource);
  
  this.tabStrip1.setOptions(
      {
          width : 500
      }
  );
  


  var dataSource2 = new sim.component.TabStripDataSource
        ('TabStripTitle', '', 'tabStrip2');
     
  dataSource2.setIcon("images/tabs/systemBtn_grid_25.png", 25, 25);
      
  dataSource2.addTab('', 'content 1 <br />', 1);
  dataSource2.addTab('', 'content 2 <br />', 2);
  dataSource2.addTab('', 'content 3 <br />', 3);
  dataSource2.addTab('', 'content 4 <br />', 4);
  dataSource2.addTab('', 'content 5 <br />', 5);
  
  
  this.tabStrip2 = new sim.component.TabStrip(dataSource2);
  
  this.tabStrip2.setOptions(
      {
          width : 500, 
          
      }
  );
  
  
  
  var dataSource3 = new sim.component.TabStripDataSource
        ('TabStripTitle', '', 'tabStrip3');
     
  dataSource3.setIcon("images/tabs/viewBtn_grid_25.png", 25, 25);
      
  dataSource3.addTab('', 'content 1 <br />', 1);
  dataSource3.addTab('', 'content 2 <br />', 2);
  dataSource3.addTab('', 'content 3 <br />', 3);
  dataSource3.addTab('', 'content 4 <br />', 4);
  dataSource3.addTab('', 'content 5 <br />', 5);
  dataSource3.addTab('', 'content 6 <br />', 6);
  dataSource3.addTab('', 'content 7 <br />', 7);
  dataSource3.addTab('', 'content 8 <br />', 8);
  dataSource3.addTab('', 'content 9 <br />', 9);
  
  this.tabStrip3 = new sim.component.TabStrip(dataSource3);
  
  this.tabStrip3.setOptions(
      {
          width : 500, 
          
      }
  );
  
  
  var dataSource4 = new sim.component.TabStripDataSource
        ('TabStripTitle', '', 'tabStrip4');
     
  dataSource4.setIcon("images/tabs/optionsBtn_grid_25.png", 25, 25);
      
  dataSource4.addTab('', 'content 1', 1);
  dataSource4.addTab('', 'content 2', 2);
  dataSource4.addTab('', 'content 3', 3);
  dataSource4.addTab('', 'content 4', 4);
  dataSource4.addTab('', 'content 5', 5);
  dataSource4.addTab('', 'content 6', 6);

  
  this.tabStrip4 = new sim.component.TabStrip(dataSource4);
  
  this.tabStrip4.setOptions(
      {
          width : 500, 
          
      }
  );
  
  
  
  var dataSource5 = new sim.component.TabStripDataSource
        ('TabStripTitle', '', 'tabStrip5');
     

  dataSource5.addTab('OUTPUT', 'content 1', 1);
  dataSource5.addTab('SHORT-TERM SIM', 'content 2', 2);
  dataSource5.addTab('LONG-TERM SIM', 'content 3', 3);

  
  this.tabStrip5 = new sim.component.TabStrip(dataSource5);
  
  this.tabStrip5.setOptions(
      {
          width : 500, 
          
      }
  );
  
  
  
  return;
};



/**
 * @return {string} The Css to be injected into the DOM.
 */
sim.view.InputView.prototype.getCss = function() {

  var css = this.tabStripViewParent.getCss();
    
  return css;
};


sim.view.InputView.prototype.getHtml = function() {
    
  var el = this.getElement();
  return el[0].outerHTML;
  
};



/**
 * @public
 */
sim.view.InputView.prototype.injectHtml = function() {

  this.tabStrip1.injectHtml();
  this.tabStrip2.injectHtml();
  this.tabStrip3.injectHtml();
  this.tabStrip4.injectHtml();
  this.tabStrip5.injectHtml();
  
};


/**
 * @public
 */
sim.view.InputView.prototype.injectCss = function() {

  this.tabStrip1.injectCss();
  this.tabStrip2.injectCss();
  this.tabStrip3.injectCss();
  this.tabStrip4.injectCss();
  this.tabStrip5.injectCss();
  
};



