goog.provide('lgb.gui.view.BuildingSimpleGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStripH');
goog.require('lgb.component.TabStripDataSourceH');

lgb.gui.view.BuildingSimpleGUI = function(dataModel) {

  this._TITLE = 'Building';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);


};
goog.inherits(lgb.gui.view.BuildingSimpleGUI, lgb.gui.view.BaseGUI);




lgb.gui.view.BuildingSimpleGUI.prototype.init = function() {
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSourceH('BuildingSimpleGUI-tabStrip');
  this.dataSource.setIcon("images/laura/icons-building-all.png", 28, 30);
  
  this.dataSource.setOffsets([
    {x:76, y:0},
    {x:0, y:-18},
    {x:0, y:-12},
    {x:-2, y:15},
    {x:-30, y:50}
  ]);

  
  this.tabStrip_ = new lgb.component.TabStripH(this.dataSource);
  
  this.bind_();
  
};

lgb.gui.view.BuildingSimpleGUI.prototype.bind_ = function() {
  
  
  this.listenTo(
    this.tabStrip_,
    e.Activate,
    this.onActivate_
  );
  
  
};


lgb.gui.view.BuildingSimpleGUI.prototype.onActivate_ = function(event) {
  
  //this.calculateLayout();
  
};


lgb.gui.view.BuildingSimpleGUI.prototype.calculateLayout = function() {

  var h = window.innerHeight;
  var height2 = (h-210);
  
  this.tabStrip_.setContentHeight(height2);

};


lgb.gui.view.BuildingSimpleGUI.prototype.add = function(gui) {


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
  
  
  gui.injectTo(contentElement);
  
};


/**
 * @public
 */
lgb.gui.view.BuildingSimpleGUI.prototype.injectTo = function(parentElement) {
  
   var el = this.getMainElement();
   el.addClass("input-controls");
   
    
   this.tabStrip_.injectTo(el);
   this.tabStrip_.injectCss();
  
   var tabEl = this.tabStrip_.getMainElement();
   tabEl.addClass("building-icons");
   
   
   tabEl.css("padding","0 0 0 0");
   tabEl.css("background","transparent");
   tabEl.css("width","100%");
   tabEl.css("min-height","100%");
   
   
   
   
    var buildingLevelUl = $('<ul>')
    .addClass("building-level");
    
    buildingLevelUl.append('<li>')
    .append('<a href="#">Roof</a>');
    
    buildingLevelUl.append('<li>')
    .append('<a href="#">Floor</a>');
    
    buildingLevelUl.append('<li>')
    .append('<a href="#">Site</a>');
    
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
    
   
   this.append(miniMap);
   
   parentElement.append(el);
    
    
    
    
    
    return;

    

  
  

};

