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





lgb.core.DebugLGB.prototype.filterPackages3 = function(packages) {

  var filtered = [];
  var filteredAry = [];

  var len = packages.length;

  for (var i = 0; i < len; i++) {
    
    var packageName = packages[i];
    var packageAry = packageName.split('.');

    var isValid = (window.hasOwnProperty(packageAry[0]));

    if (isValid) {

      var level1 = window[packageAry[0]];
      if (packageAry.length < 2) {
        filtered.push(packageName);
        filteredAry.push(packageAry);
      } else {

        isValid = (level1.hasOwnProperty(packageAry[1]));

        if (isValid) {

          var level2 = level1[packageAry[1]];

          if (packageAry.length < 3) {
            filtered.push(packageName);
            filteredAry.push(packageAry);
          } else {
            isValid = (level2.hasOwnProperty(packageAry[2]));

            if (isValid) {
              var level3 = level2[packageAry[2]];
              
              if (packageAry.length < 4) {
                filtered.push(packageName);
                filteredAry.push(packageAry);
              } else { 
                isValid = (level3.hasOwnProperty(packageAry[3]));
                
                if (isValid) {
                  var level4 = level3[packageAry[3]];
                  if (packageAry.length < 5) {
                    filtered.push(packageName);
                    filteredAry.push(packageAry);
                  } else {
                    debugger;
                  } 
                  
                  
                }
                
              }
            }

          }

        }

      }
    }

  }

  return filteredAry;

}; 


lgb.core.DebugLGB.prototype.getPackages3 = function() {
  
  var packages = [
    'lgb',
    'lgb.component',
    'lgb.core',
    'lgb.gui',
    'lgb.gui.controller',
    'lgb.gui.model',
    'lgb.gui.view',
    
    'lgb.scenario.controller',
    'lgb.scenario.model',
    'lgb.scenario.view',
    
    'lgb.simulation.controller',
    'lgb.simulation.events',
    'lgb.simulation.model',
    'lgb.simulation.model.voManaged',
    'lgb.simulation.model.voNative',
    
    'lgb.utils',
    
    'lgb.chart',
    'lgb.chart.controller',
    'lgb.chart.view',

    'lgb.world',
    'lgb.world.controller',
    'lgb.world.model',
    'lgb.world.view',
    'THREE'
  ];
  

  return packages;
};




lgb.core.DebugLGB.prototype.filterPackages = function(packageAry) {
  
  var filteredPackages = []
  this.filteredPackages_.push(packageAry);
  
  var thePackageString = packageAry.join('.');
    
  topLevelPackage =  eval(thePackageString);
  
  
  for (var propertyName in topLevelPackage) {
    
      var obj = topLevelPackage[propertyName];
      if (obj instanceof Object) {
        
        var newPackageAry = packageAry.concat([propertyName]);
        this.getPackages2(newPackageAry);
      }
      
      
      var x = 0;    
        
        
  }
        
        
  
  // var len = packages.length;
  // for (var i=0; i < len; i++) {
    // var pk = packages[i];
//     
//     
    // var top = eval(pk[0]);
//     
    // var depth = pk.length;
//     
    // if ()
//     
    // if (top.hasOwnProperty(pk[1])) {
//       
    // }
//     
//     
    // var x = 0;
  // };
  
};



  
  
  



lgb.core.DebugLGB.prototype.tag = function() {
  
  var classes = this.getClasses();
  
  var packages = this.getPackages3();
  packages = this.filterPackages3(packages);
   
  
  
  
  this.each(classes, this.setCountClassName_);
  this.each(packages, this.setCountPackageAry_);
  
  this.each(classes, this.tagClassName_);
  this.each(packages, this.tagPackageAry_);
  
  return;
};


lgb.core.DebugLGB.prototype.tagEx = function() {
  
  var classes = this.getClasses();
  
  var packages = this.getPackages3();
  packages = this.filterPackages3(packages);
  
  this.each(classes, this.tagExClassName_);
  this.each(packages, this.tagExPackageAry_);
  
  return;
};





lgb.core.DebugLGB.prototype.tagExPackageAry_ = function(packageAry) {
  
  
  var thePackageString = packageAry.join('.');
  
  
  try
    { 
      var thePackage = eval(thePackageString);
    }
  catch(err)
    {
      console.log(err.message);
    }
    
    if (null != thePackage) {
      for (var className in thePackage) {
    
        if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
          
          var classConstructor = thePackage[className];
          
          
          var fullClassName = thePackageString + '.' + className;
          this.tagExClassName_(fullClassName);
        }
    
      };
    }
    
    

  
};


lgb.core.DebugLGB.prototype.tagExClassName_ = function(fullClassName) {
  
  var classConstructor = eval(fullClassName);
  var functionExists1 = classConstructor.prototype.hasOwnProperty('getFullClassName');  
  
  if(functionExists1) {
    
    console.log("DebugLGB.tagClassName_() - skipping class: " + fullClassName + " - already tagged");
    
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
  
  
  var functionExists3 = classConstructor.prototype.hasOwnProperty('getClassName');  
  if(!functionExists3) {
    
    classConstructor.prototype.getClassName = lgb.core.BaseClass.prototype.getClassName;
  } 
  
  

  return;
    
};

lgb.core.DebugLGB.prototype.tagPackageAry_ = function(packageAry) {

  var thePackageString = packageAry.join('.');
  
  
  try
    { 
      var thePackage = eval(thePackageString);
    }
  catch(err)
    {
      console.log(err.message);
    }
    
    
    
    if (null != thePackage) {
      for (var className in thePackage) {
    
        if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
          
          var fullClassName = thePackageString + '.' + className;
          this.tagClassName_(fullClassName);
        }
    
      };
    }


  
};

lgb.core.DebugLGB.prototype.tagClassName_ = function(fullClassName) {

  var classConstructor = eval(fullClassName);
  
  if (null == classConstructor) {
    
    console.log("DebugLGB.tagClassName_() - skipping class: " + fullClassName);
    
  } else {
    var fullClassName2 = fullClassName.split('.').join('_');
    var countStr = String(classConstructor.SUPERCLASS_COUNT_);
    
    var newFunctionName = "_CLASS_{0}_{1}".format(countStr, fullClassName2);
    
    var code = "{0}.prototype.{1}".format(fullClassName, newFunctionName);
    code += "=function() {};";
    eval(code);
  }

      
      
  return;
};


lgb.core.DebugLGB.prototype.setCountPackageAry_ = function(packageAry) {

  var thePackageString = packageAry.join('.');
  
  try
    { 
      var thePackage = eval(thePackageString);
    }
  catch(err)
    {
      console.log(err.message);
    }
    
    
    if (null != thePackage) {
      for (var className in thePackage) {
    
        if (thePackage.hasOwnProperty(className) && typeof thePackage[className] === 'function') {
          
          var fullClassName = thePackageString + '.' + className;
          this.setCountClassName_(fullClassName);
        }
    
      };
    }

  






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

