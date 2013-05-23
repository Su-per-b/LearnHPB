/**
 * @author Raj Dye - raj@rajdye.com
 * Almost all classes in the 'lgb' namespace inherit
 * from this class. It is primarily concerned with Event listening
 * and dispatching.
 */
goog.provide('lgb.DebugLGB');

/**
 * MVC base class
 * @constructor
 * @extends {goog.events.EventTarget}
 */
lgb.DebugLGB = function() {

};

lgb.DebugLGB.prototype.init = function(packageName) {
  
  this.tagClasses(['lgb','model']);
  this.tagClasses(['lgb','model', 'scenario']);
  this.tagClasses(['lgb','events']);
  this.tagClasses(['lgb','controller']);
  this.tagClasses(['lgb','view']);
  this.tagClasses(['lgb','component']);
  this.tagClasses(['lgb','utils']);
  
  
}


/**
 * fires an event
 * "this" is the event target
 * @param {goog.events.Event} event The event object to dispatch.
 */
lgb.DebugLGB.prototype.tagClasses = function(packageAry) {

  var thePackageString = packageAry.join('.');
  var thePackage = eval(thePackageString);

 // var functionList = [];

  for (var className in thePackage) {

    if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {

      var newFunctionName = "_CLASS_{0}_{1}".format(packageAry.join('_'), className);
      
      var code = "{0}.{1}.prototype.{2}".format(thePackageString, className, newFunctionName);
      code += "=function() {};";
      eval(code);

    }

  };

  return;
};

