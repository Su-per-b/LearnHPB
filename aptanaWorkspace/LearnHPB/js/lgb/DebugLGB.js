/**
 * @author Raj Dye - raj@rajdye.com
 * Almost all classes in the 'lgb' namespace inherit
 * from this class. It is primarily concerned with Event listening
 * and dispatching.
 */
goog.provide('lgb.DebugLGB');

goog.require('lgb.BaseClass');


lgb.DebugLGB = function() {
  lgb.BaseClass.call(this);
};
goog.inherits(lgb.DebugLGB, lgb.BaseClass);



lgb.DebugLGB.prototype.getClasses = function() {
    var classes = [
    "goog.Disposable",
    "goog.events.EventTarget"
  ];
  
  return classes;
};


lgb.DebugLGB.prototype.getPackages = function() {
  
  var packages = [
    ['lgb'],
    ['lgb','component'],
    ['lgb','model'],
    ['lgb','model', 'input'],
    ['lgb','model', 'scenario'],
    ['lgb','model', 'vo'],
    ['lgb','events'],
    ['lgb','controller'],
    ['lgb','controller','input'],
    ['lgb','simulation','controller'],
    ['lgb','simulation','events'],
    ['lgb','simulation','model'],
    ['lgb','simulation','model','voManaged'],
    ['lgb','simulation','model','voNative'],
    ['lgb','utils'],
    ['lgb','view'],
    ['lgb','view','input'],
    ['lgb','view','scenario'],
    ['THREE']
  ];
  
  return packages;
};




lgb.DebugLGB.prototype.tag = function() {
  
  var classes = this.getClasses();
  var packages = this.getPackages();
  
  this.each(classes, this.setCountClassName_);
  this.each(packages, this.setCountPackageAry_);
  
  this.each(classes, this.tagClassName_);
  this.each(packages, this.tagPackageAry_);
  
  return;
};


lgb.DebugLGB.prototype.tagEx = function() {
  
  var classes = this.getClasses();
  var packages = this.getPackages();
  
  this.each(classes, this.tagExClassName_);
  this.each(packages, this.tagExPackageAry_);
  
  return;
};





lgb.DebugLGB.prototype.tagExPackageAry_ = function(packageAry) {
  
  
  var thePackageString = packageAry.join('.');
  var thePackage = eval(thePackageString);

  for (var className in thePackage) {

    if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
      
      var classConstructor = thePackage[className];
      
      
      var fullClassName = thePackageString + '.' + className;
      this.tagExClassName_(fullClassName);
    }

  };
  
};


lgb.DebugLGB.prototype.tagExClassName_ = function(fullClassName) {
  
  var classConstructor = eval(fullClassName);
  var functionExists1 = classConstructor.prototype.hasOwnProperty('getFullClassName');  
  
  if(functionExists1) {
    debugger;
  } else {
    var code = "{0}.prototype.getFullClassName".format(fullClassName);
    code += "=function() { return '{0}'};".format(fullClassName);
    eval(code);
  }

  //test
  var functionExists2 = classConstructor.prototype.hasOwnProperty('getFullClassName');  
  
  if(!functionExists2) {
    debugger;
  } 
  
  
/*
  var code2 = "new " + fullClassName + "()";
  var instance = eval(code2);
  var fullClassNameResult = instance.getFullClassName();
  
  if (fullClassName != fullClassNameResult) {
    debugger;
  }
  */

  return;
    
};

lgb.DebugLGB.prototype.tagPackageAry_ = function(packageAry) {

  var thePackageString = packageAry.join('.');
  var thePackage = eval(thePackageString);

  for (var className in thePackage) {

    if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
      
      var fullClassName = thePackageString + '.' + className;
      this.tagClassName_(fullClassName);
    }

  };
  
};

lgb.DebugLGB.prototype.tagClassName_ = function(fullClassName) {

  var classConstructor = eval(fullClassName);
  var fullClassName2 = fullClassName.split('.').join('_');
  var countStr = String(classConstructor.SUPERCLASS_COUNT_);
  
  var newFunctionName = "_CLASS_{0}_{1}".format(countStr, fullClassName2);
  
  var code = "{0}.prototype.{1}".format(fullClassName, newFunctionName);
  code += "=function() {};";
  eval(code);
      
      
  return;
};


lgb.DebugLGB.prototype.setCountPackageAry_ = function(packageAry) {

  var thePackageString = packageAry.join('.');
  var thePackage = eval(thePackageString);

  for (var className in thePackage) {

    if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
      
      var fullClassName = thePackageString + '.' + className;
      this.setCountClassName_(fullClassName);
    }

  };

};



lgb.DebugLGB.prototype.setCountClassName_ = function(fullClassName) {

  // var theClassString = classAry.join('.');
  var classConstructor = eval(fullClassName);
  
  if (typeof classConstructor === 'function') {

    this.setSuperClassCount_(classConstructor);

  } else {
    debugger;
  }

};


lgb.DebugLGB.prototype.setSuperClassCount_ = function(classConstructor) {
 
      if (classConstructor.superClass_ && classConstructor.superClass_.constructor) {
        var superClassConstructor = classConstructor.superClass_.constructor;
        
        if (superClassConstructor.SUPERCLASS_COUNT_) {
          classConstructor.SUPERCLASS_COUNT_ = superClassConstructor.SUPERCLASS_COUNT_ + 1;
        } else {
          this.setSuperClassCount_ (superClassConstructor)
          classConstructor.SUPERCLASS_COUNT_ = superClassConstructor.SUPERCLASS_COUNT_ + 1;
        }
        
      } else {
        //no superclass therefore level 0
        classConstructor.SUPERCLASS_COUNT_ = 0;
      }
};





/**
 * fires an event
 * "this" is the event target
 * @param {goog.events.Event} event The event object to dispatch.
 */
lgb.DebugLGB.prototype.tagClasses = function(packageAry) {

  var thePackageString = packageAry.join('.');
  var thePackage = eval(thePackageString);


  for (var className in thePackage) {

    if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {

      var classConstructor = thePackage[className];
      var str = classConstructor.toString();
      
      
      var newFunctionName = "_CLASS_{0}_{1}".format(packageAry.join('_'), className);
      
      var code = "{0}.{1}.prototype.{2}".format(thePackageString, className, newFunctionName);
      code += "=function() {};";
      eval(code);

    }

  };

};

