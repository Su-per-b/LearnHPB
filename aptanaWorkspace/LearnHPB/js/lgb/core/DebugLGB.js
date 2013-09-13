/**
 * @author Raj Dye - raj@rajdye.com
 * Almost all classes in the 'lgb' namespace inherit
 * from this class. It is primarily concerned with Event listening
 * and dispatching.
 */
goog.provide('lgb.core.DebugLGB');

goog.require('lgb.core.BaseClass');


lgb.core.DebugLGB = function() {
  lgb.core.BaseClass.call(this);
};
goog.inherits(lgb.core.DebugLGB, lgb.core.BaseClass);



lgb.core.DebugLGB.prototype.getClasses = function() {
    var classes = [
    "goog.Disposable",
    "goog.events.EventTarget"
  ];
  
  return classes;
};


lgb.core.DebugLGB.prototype.getPackages = function() {
  
  var packages = [
    ['lgb'],
    ['lgb','component'],
    
    ['lgb','core'],
    
    ['lgb','gui'],
    ['lgb','gui','controller'],
    ['lgb','gui','model'],
    ['lgb','gui','view'],
    
    ['lgb','scenario','controller'],
    ['lgb','scenario','model'],
    ['lgb','scenario','view'],
    
    ['lgb','simulation','controller'],
    ['lgb','simulation','events'],
    ['lgb','simulation','model'],
    
    ['lgb','utils'],
    
    ['lgb','world'],
    ['lgb','world', 'controller'],
    ['lgb','world', 'model'],
    ['lgb','world', 'view'],
    
    ['THREE']
  ];
  
  return packages;
};




lgb.core.DebugLGB.prototype.tag = function() {
  
  var classes = this.getClasses();
  var packages = this.getPackages();
  
  this.each(classes, this.setCountClassName_);
  this.each(packages, this.setCountPackageAry_);
  
  this.each(classes, this.tagClassName_);
  this.each(packages, this.tagPackageAry_);
  
  return;
};


lgb.core.DebugLGB.prototype.tagEx = function() {
  
  var classes = this.getClasses();
  var packages = this.getPackages();
  
  this.each(classes, this.tagExClassName_);
  this.each(packages, this.tagExPackageAry_);
  
  return;
};





lgb.core.DebugLGB.prototype.tagExPackageAry_ = function(packageAry) {
  
  
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


lgb.core.DebugLGB.prototype.tagExClassName_ = function(fullClassName) {
  
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

lgb.core.DebugLGB.prototype.tagPackageAry_ = function(packageAry) {

  var thePackageString = packageAry.join('.');
  var thePackage = eval(thePackageString);

  for (var className in thePackage) {

    if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
      
      var fullClassName = thePackageString + '.' + className;
      this.tagClassName_(fullClassName);
    }

  };
  
};

lgb.core.DebugLGB.prototype.tagClassName_ = function(fullClassName) {

  var classConstructor = eval(fullClassName);
  var fullClassName2 = fullClassName.split('.').join('_');
  var countStr = String(classConstructor.SUPERCLASS_COUNT_);
  
  var newFunctionName = "_CLASS_{0}_{1}".format(countStr, fullClassName2);
  
  var code = "{0}.prototype.{1}".format(fullClassName, newFunctionName);
  code += "=function() {};";
  eval(code);
      
      
  return;
};


lgb.core.DebugLGB.prototype.setCountPackageAry_ = function(packageAry) {

  var thePackageString = packageAry.join('.');
  var thePackage = eval(thePackageString);

  for (var className in thePackage) {

    if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
      
      var fullClassName = thePackageString + '.' + className;
      this.setCountClassName_(fullClassName);
    }

  };

};



lgb.core.DebugLGB.prototype.setCountClassName_ = function(fullClassName) {

  // var theClassString = classAry.join('.');
  var classConstructor = eval(fullClassName);
  
  if (typeof classConstructor === 'function') {

    this.setSuperClassCount_(classConstructor);

  } else {
    debugger;
  }

};


lgb.core.DebugLGB.prototype.setSuperClassCount_ = function(classConstructor) {
 
      if (classConstructor.superClass_ && classConstructor.superClass_.constructor) {
        var superClassConstructor = classConstructor.superClass_.constructor;
        
        if (superClassConstructor.SUPERCLASS_COUNT_) {
          classConstructor.SUPERCLASS_COUNT_ = superClassConstructor.SUPERCLASS_COUNT_ + 1;
        } else {
          this.setSuperClassCount_ (superClassConstructor);
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
lgb.core.DebugLGB.prototype.tagClasses = function(packageAry) {

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

