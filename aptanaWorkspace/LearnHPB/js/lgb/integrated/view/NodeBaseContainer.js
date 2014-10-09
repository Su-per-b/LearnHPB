/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.NodeBaseContainer');


goog.require('lgb.integrated.view.NodeBase');

/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUIGUI}
 */
lgb.integrated.view.NodeBaseContainer = function(dataModel, debugFlag) {

  lgb.integrated.view.NodeBase.call(this, dataModel,debugFlag);
};
goog.inherits(lgb.integrated.view.NodeBaseContainer, lgb.integrated.view.NodeBase);




lgb.integrated.view.NodeBaseContainer.prototype.getLeafNodes = function() {
  
    var len = this.children_.length;
    var leafNodes = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.children_[j];
        
        if (undefined == child.getLeafNodes) {
            debugger;
        }
        
        var childleafNodes = child.getLeafNodes();
        
        if(null != childleafNodes) {
            leafNodes = childleafNodes.concat(leafNodes);
        }
    }
    
    if (0 == leafNodes.length ) {
        return null;
    } else {
        return leafNodes;
    }
    
};



  
lgb.integrated.view.NodeBase.prototype.makeChildren_ = function(parentElement) {
  
  this.each(this.dataModel.children_, this.appendChildTo_, parentElement);
  
};



lgb.integrated.view.NodeBase.prototype.appendChildTo_ = function(childNode, parentElement) {
  

  var childClassName = childNode.getClassName();
  
  var destChild = this.instantiateViewForModel(childNode);

  if ("description" == childClassName) {
    
    
  } else {

    var classConstructor = this.getClassConstructor();
    var childClassConstructor = classConstructor.childClassMap[childClassName];
    
    if(childClassConstructor) {
      var child = new childClassConstructor(childNode, this.debugFlag_);
      child.appendTo(parentElement);
      
    } else {
      debugger;
    }
  }
  
};

lgb.integrated.view.NodeBase.prototype.makeChildrenAndListen_ = function(parentElement) {
  
  var children = this.dataModel.getChildren();
  
  this.each(children, this.appendChildToAndListen_, parentElement);
  
};



lgb.integrated.view.NodeBase.prototype.appendChildToAndListen_ = function(childModel, parentElement) {
  
  var childView = this.instantiateViewForModel_(childModel);
     
  this.relayLocal(
    childView, 
    se.RequestModelicaVariableChange
    );
    

  childView.appendTo(parentElement);
  this.children_.push(childView);
  
};
