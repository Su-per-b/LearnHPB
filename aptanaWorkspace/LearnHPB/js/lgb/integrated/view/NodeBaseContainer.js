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



// lgb.integrated.view.System.prototype.calcIntegratedVariableList_ = function() {
// 
    // this.view_integratedVariableList_ = [];
    // this.each(this.children_, this.calcOnePartIntegratedVariableList_);
// };
// 
// 
// 
// lgb.integrated.view.System.prototype.calcOnePartIntegratedVariableList_ = function(child) {
// 
    // var list = child.getIntegratedVariableList();
    // this.view_integratedVariableList_ = this.view_integratedVariableList_.concat(list.slice(0));
// };


lgb.integrated.view.NodeBaseContainer.prototype.getLeafNodes = function() {
  
    var len = this.children_.length;
    var leafNodes = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.children_[j];
        
        var childleafNodes;
        
        if (undefined == child.getLeafNodes) {
            //debugger;
            //is leaf
            leafNodes.push(child);
        } else {
            
            childleafNodes = child.getLeafNodes();
            if(null != childleafNodes) {
                leafNodes = childleafNodes.concat(leafNodes);
            }
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
  if (undefined != children) {
    this.each(children, this.appendChildToAndListen_, parentElement);
  }

  
};


lgb.integrated.view.NodeBase.prototype.appendChildToAndListen_ = function(childModel, parentElement) {
  
  var childView = this.makeChild_(childModel);
     
  if (undefined == childView) {
      lgb.logSevere ('childView is null');
  }
  
  this.relayLocal(
    childView, 
    se.RequestSimulationVariableChange
    );
    

  childView.appendTo(parentElement);
  this.children_.push(childView);
  
};


lgb.integrated.view.NodeBase.prototype.makeChild_ = function(childModel) {
    
    var fullClassName = childModel.getFullClassName();  
    var map = this.getModelViewClassMap_();
    
    var classReference;
    
    if ( map.hasOwnProperty(fullClassName)  ) {
        classReference = map[fullClassName];
        
        if (null == classReference) {
            debugger;
            return null;
        } else {
            goog.asserts.assertFunction(classReference);
            
            var destObj = new classReference(childModel);
            return destObj;
        }

    } else {
        lgb.logSevere('no view for model: ' + fullClassName);
    }
    
 
};
