/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.Category');

goog.require('goog.asserts');
goog.require('lgb.integrated.view.NodeBaseContainer');
goog.require('lgb.integrated.view.VariableNumber');
goog.require('lgb.integrated.view.SecondsAfter2000');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.Category = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBaseContainer.call(this, dataModel, debugFlag);
};

goog.inherits(lgb.integrated.view.Category, lgb.integrated.view.NodeBaseContainer);




lgb.integrated.view.Category.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);  
  this.appendTitle_();
  //this.append('<br />');
  
  this.makeChildren_(parentElement);
  
};



lgb.integrated.view.Category.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
      
    if ("NONE" == this.dataModel.name) {
      this.mainElement_ = $('<div>');
    } else {
      this.mainElement_ = $('<h3>');
    }
  

    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }

  }

  return this.mainElement_;
};

lgb.integrated.view.Category.prototype.appendTitle_ = function() {
  
  var html = this.dataModel.name;
  
  if (this.debugFlag_) {
    html += " ({0})".format(this.dataModel.name);
  }
    
    if ("NONE" == this.dataModel.name) {
      //this.append(html);
    } else {
      this.append(html);
    }

};


  
lgb.integrated.view.Category.prototype.makeChildren_ = function(parentElement) {
  
  this.ul_ = $('<ul>');
  this.ul_.appendTo(parentElement);
  
  var children = this.dataModel.getChildren();
  
  if (undefined != children && children.length > 0) {
    this.each(children, this.appendChildToAndListen_, this.ul_);
  }
  
};



// lgb.integrated.view.Category.prototype.makeChild_ = function(childModel) {
//     
//     
    // if (!childModel instanceof lgb.integrated.model.VariableBase) {
        // lgb.logSevere('expecting variable');
    // }
//     
    // var unit = childModel.getUnit();
//     
    // var fullClassName = unit.getFullClassName();  
    // var map = this.getModelViewClassMap_ForVariablesDefinedUnit();
//     
    // var classReference;
//     
    // if ( map.hasOwnProperty(fullClassName)  ) {
        // classReference = map[fullClassName];
//         
        // if (null == classReference) {
            // debugger;
            // return null;
        // } else {
            // goog.asserts.assertFunction(classReference);
//             
            // var destObj = new classReference(childModel);
            // return destObj;
        // }
// 
    // } else {
        // lgb.logSevere('no view for model: ' + fullClassName);
    // }
//     
//  
// };



//for children
lgb.integrated.view.Category.prototype.getModelViewClassMap_ = function() {
  
    return {
        "lgb.integrated.model.VariableReal" : lgb.integrated.view.VariableNumber,
        "lgb.integrated.model.VariableInteger" : lgb.integrated.view.VariableNumber,
        "lgb.integrated.model.SecondsAfter2000" : lgb.integrated.view.SecondsAfter2000
    };
};


// 
// lgb.integrated.view.Category.prototype.getModelViewClassMap_ForVariablesDefinedUnit = function() {
//   
    // return {
        // "lgb.integrated.model.unit.None" : lgb.integrated.view.VariableNumber,
        // "lgb.integrated.model.unit.Temperature" : lgb.integrated.view.VariableNumber,
        // "lgb.integrated.model.unit.SecondsAfter2000" : lgb.integrated.view.SecondsAfter2000
    // };
// };



