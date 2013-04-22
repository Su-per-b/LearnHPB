/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ViewPointGUIView');

goog.require('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');
goog.require('lgb.events.MouseClick');
goog.require('lgb.events.MouseOut');
goog.require('lgb.events.MouseOver');
goog.require('lgb.events.RequestGoToViewPoint');

goog.require('lgb.model.ViewPointModel');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.ViewBase}
 */
lgb.view.ViewPointGUIView = function(dataModel, parentHtmlID) {

  this.parentHtmlID = parentHtmlID;
  this._NAME = 'lgb.view.ViewPointGUIView';
  this.htmlID = 'ViewPointGUIView';
  
  lgb.view.ViewBase.call(this, dataModel);
};
goog.inherits(lgb.view.ViewPointGUIView, lgb.view.ViewBase);


/**
 * Initializes the View
 */
lgb.view.ViewPointGUIView.prototype.init = function() {
  this.injectHtml();
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.ViewPointGUIView.prototype.bind_ = function() {
    
   // this.kendoTreeView_.bind("select", this.d(this.onSelect_))
};


/**
 * event handler
 * @private
 * @param {lgb.events.MouseClick} event The Event.
 */
lgb.view.ViewPointGUIView.prototype.onMouseClick_ = function(event) {

  var idx = event.target.ds.data;
  var node = this.dataModel.viewPointNodeList[idx];

  this.dispatchLocal(new lgb.events.RequestGoToViewPoint(node));

};


lgb.view.ViewPointGUIView.prototype.onSelect_ = function(event) {

  //var e = event;
  // var selectedNode = this.kendoTreeView_ .select();
  var selectedNode = event.node;
 // var textContent = event.node.textContent;
 
  var dataItem = this.kendoTreeView_.dataItem(selectedNode);
  var viewPointNode = this.dataModel.getViewPoint(dataItem.value);
  
  
  if (null != viewPointNode) {
    this.dispatchLocal(new lgb.events.RequestGoToViewPoint(viewPointNode));
  }


};



/**
 * event handler
 * @protected
 * @override
 * @param {lgb.events.DataModelChanged} event The Event.
 */
lgb.view.ViewPointGUIView.prototype.onChange = function(event) {

    var whatIsDirty = event.payload;
    
    if (whatIsDirty.viewPointCollection) {
       // var d = whatIsDirty.viewPointCollection.getTreeData();
       
       // this.ds.add(d);
    }
    

    return;
/*
    
    var d = this.ds.data();
    

    
    if (whatIsDirty.viewPointNodeList) {
        
        var k = this.kendoTreeView_;
        
        var newData = {
            data: [
                { text: "ffff", items: [
                    { text: "tttt & Chairs" },
                    { text: "Sofas" },
                    { text: "Occasional Furniture" }
                ] },
                { text: "Decor", items: [
                    { text: "Bed Linen" },
                    { text: "Curtains & Blinds" },
                    { text: "Carpets" }
                ] }
            ]
        };
        
        
         var d2 = { text: "ffff", items: [
                    { text: "tttt & Chairs" },
                    { text: "Sofas" },
                    { text: "Occasional Furniture" }
                ] };
                
               
        
       this.ds.add(d2);
        
    }*/


    
};



/**
 * injects the html into the DOM
 */
lgb.view.ViewPointGUIView.prototype.injectHtml = function() {


/*

        var newData = {
            data: [
                { text: "Heading 1", items: [
                    { text: "tttt & Chairs" },
                    { text: "Sofas" },
                    { text: "Occasional Furniture" }
                ] }
            ]
        };
        
        */

        
   // this.ds = {};


    //this.ds = new kendo.data.HierarchicalDataSource({});

    var mainDiv = this.makeMainDiv();
    this.append(mainDiv);
    
    this.kendoTreeView_ =        
        mainDiv.kendoTreeView({
            dataSource: this.dataModel.kendoDS,
            
            select: this.d(this.onSelect_),
        }).data("kendoTreeView");
        
     
        
        
};
