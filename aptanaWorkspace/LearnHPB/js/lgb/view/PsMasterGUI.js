/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.PsMasterGUI');

goog.require('lgb.view.BaseView');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.events.RequestDataModelChange');

/**
 * @constructor
 * @extends {lgb.view.BaseView}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.PsMasterGUI = function(dataModel) {

  this._NAME = 'lgb.view.PsMasterGUI';

  lgb.view.BaseView.call(this, dataModel, 'PsMasterGUI', 'leftpanel-tabStrip-2');
};
goog.inherits(lgb.view.PsMasterGUI, lgb.view.BaseView);

/**
 * Initializes the View
 */
lgb.view.PsMasterGUI.prototype.init = function() {
  this.injectHtml();
  this.bind_();
};

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.PsMasterGUI.prototype.bind_ = function() {

  this.kendoTreeViewActive_.dataSource.bind("change", this.d(this.onChangeActive_));
  this.kendoTreeViewBoxes_.dataSource.bind("change", this.d(this.onChangeBoxes_));
  this.kendoTreeViewCurves_.dataSource.bind("change", this.d(this.onChangeCurves_));

};

lgb.view.PsMasterGUI.prototype.onChangeActive_ = function(event) {

  if (event.field == "checked") {

    checkedNodes = this.checkedNodeIds_(event);
    
    var e = new lgb.events.RequestDataModelChange({
      isStartedArray : checkedNodes
    });

    this.dispatchLocal(e);

  }

};


lgb.view.PsMasterGUI.prototype.getCheckedNodeIds_ = function(event) {


    var checkedNodes = [];
    
    //if the tree is unexpanded
    if (event.node) {

      console.log("parent", event.node.text);
      var node = event.node;

      for (var i = 0; i < node.items.length; i++) {

        var theItem = node.items[i];

        if (theItem.checked) {
          var idx = parseInt (theItem.id);

          checkedNodes.push(idx);
        }
      }
    //if the tree is expanded
    } else {
      var topNode = event.items[0];
      var items = topNode.children.options.data.items;
      var len = items.length;
      for (var i = 0; i < len; i++) {

        var theItem = items[i];

        if (topNode.checked) {
          var idx = parseInt (theItem.id);
          checkedNodes.push(idx);
        }
      }
    }

    return checkedNodes;
};

lgb.view.PsMasterGUI.prototype.checkedNodeValues_ = function(nodes, checkedNodes) {

  for (var i = 0; i < nodes.length; i++) {

    var theNode = nodes[i];

    if (theNode.checked) {
      checkedNodes.push(nodes[i].value);
    }

    if (theNode.hasChildren) {
      var v = theNode.children.view();
      //var kk = this.kendoTreeViewActive_.checkboxes(theNode);

      if (v == null) {
        //theNode.
      }
      this.checkedNodeValues_(v, checkedNodes);
    }
  }
};

lgb.view.PsMasterGUI.prototype.checkedNodeIds_ = function(nodes, checkedNodes) {

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedNodes.push(nodes[i].id);
    }

    if (nodes[i].hasChildren) {
      this.checkedNodeIds_(nodes[i].children.view(), checkedNodes);
    }
  }
};

lgb.view.PsMasterGUI.prototype.onChangeBoxes_ = function(event) {

  var checkedNodes = [];
  var v = this.kendoTreeViewBoxes_.dataSource.view();
  this.checkedNodeValues_(v, checkedNodes);

  var e = new lgb.events.RequestDataModelChange({
    showBoxesArray : checkedNodes
  });

  this.dispatchLocal(e);

};

lgb.view.PsMasterGUI.prototype.onChangeCurves_ = function(event) {

  var checkedNodes = [];
  var v = this.kendoTreeViewCurves_.dataSource.view();
  this.checkedNodeValues_(v, checkedNodes);

  var e = new lgb.events.RequestDataModelChange({
    showCurvesArray : checkedNodes
  });

  this.dispatchLocal(e);

};

/**
 * injects the html into the DOM
 */
lgb.view.PsMasterGUI.prototype.injectHtml = function() {

  var mainDiv = this.makeMainDiv();
  this.append(mainDiv);

  var div1 = $('<div>');
  mainDiv.append(div1);

  this.kendoTreeViewActive_ = div1.kendoTreeView({
    expanded : true,
    checkboxes : {
      checkChildren : true
    },
    dataSource : this.dataModel.kendoDSactive

  }).data("kendoTreeView");


 this.kendoTreeViewActive_._NAME_EXT='kendo.TreeView-ext';



  var div2 = $('<div>');
  mainDiv.append(div2);

  this.kendoTreeViewBoxes_ = div2.kendoTreeView({
    checkboxes : {
      checkChildren : true
    },
    dataSource : this.dataModel.kendoDSboxes

  }).data("kendoTreeView");

  this.append(div2);

  var div3 = $('<div>');
  mainDiv.append(div3);

  this.kendoTreeViewCurves_ = div3.kendoTreeView({
    checkboxes : {
      checkChildren : true
    },
    dataSource : this.dataModel.kendoDScurves

  }).data("kendoTreeView");

  this.append(div3);

};

