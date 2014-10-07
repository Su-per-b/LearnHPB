goog.provide('lgb.gui.view.BuildingGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStripH');
goog.require('lgb.component.TabStripDataSourceH');


 /**
 * @constructor
 */
lgb.gui.view.BuildingGUI = function(dataModel) {

  this._TITLE = 'Building';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);


};
goog.inherits(lgb.gui.view.BuildingGUI, lgb.gui.view.BaseGUI);




lgb.gui.view.BuildingGUI.prototype.init = function() {
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSourceH('BuildingGUI-tabStrip');
  
  
  var path = lgb.core.Config.WEBROOT + "images/icons-building-all.png";
  
  this.dataSource.setIcon(path, 28, 30);
  
  this.dataSource.setOffsets([
    {x:76, y:0},
    {x:0, y:-18},
    {x:0, y:-12},
    {x:-2, y:15},
    {x:-30, y:50}
  ]);

  
  this.tabStrip_ = new lgb.component.TabStripH(this.dataSource);
  

  
}; 



lgb.gui.view.BuildingGUI.prototype.init2 = function() {
  this.tabStrip_.select(0);
  
};


lgb.gui.view.BuildingGUI.prototype.loadNew = function(dataModel) {
  this.dataModel = dataModel;
};


lgb.gui.view.BuildingGUI.prototype.clear = function() {
  
    this.tabTitleMap_ = {};
  
    this.dataSource.removeAllTabs();
    
    
};


lgb.gui.view.BuildingGUI.prototype.add = function(gui) {


  var title = gui.getTitle();

  if (undefined === title) {
    debugger;
  }

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title];
  } else {
    this.dataSource.addTab('', ' ');
    
    contentElement = this.tabStrip_.getContentElement();
    contentElement.css("padding", "0 0 0 0");
    
    this.tabTitleMap_[title] = contentElement;
  }
  
  
  gui.injectInto(contentElement);
  
};


/**
 * @public
 */
lgb.gui.view.BuildingGUI.prototype.injectInto = function(parentElement) {
  
   var el = this.getMainElement();
   el.addClass("input-controls");
   
    
   this.tabStrip_.injectInto(el);
   this.tabStrip_.injectCss();
  
   var tabEl = this.tabStrip_.getMainElement();
   tabEl.addClass("building-icons");
   
   
   tabEl.css("padding","0 0 0 0");
   tabEl.css("background","transparent");
   tabEl.css("width","100%");
   tabEl.css("min-height","100%");
   
   
    var buildingLevelUl = $('<ul>')
    .addClass("building-level");
    
    var li1 = $('<li>')
    .append('<a href="#">Roof</a>');
    buildingLevelUl.append(li1);
    
    var li2 = $('<li>')
    .append('<a href="#">Floor</a>');
    buildingLevelUl.append(li2);
    
    
    var li3 = $('<li>')
    .append('<a href="#">Site</a>');
    buildingLevelUl.append(li3);
    
    
    
   this.append(buildingLevelUl);
   
   
    var miniMap = $('<div>')
    .addClass("mini-map");
    
    miniMap.append('<a href="#" class="mini-map-zone top-left"></a>');
    miniMap.append('<a href="#" class="mini-map-zone top-center"></a>');
    
    miniMap.append('<a href="#" class="mini-map-zone top-right"></a>');
    miniMap.append('<a href="#" class="mini-map-zone middle-left"></a>');
    
    miniMap.append('<a href="#" class="mini-map-zone middle-center"></a>');
    miniMap.append('<a href="#" class="mini-map-zone bottom-left"></a>');
    miniMap.append('<a href="#" class="mini-map-zone bottom-center"></a>');
    miniMap.append('<a href="#" class="mini-map-zone bottom-right"></a>');
    
   
   el.append(miniMap);
   
   parentElement.append(el);
    
    
    
    
    
    return;

    

  
  

};

