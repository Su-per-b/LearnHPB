
   


function documentLgbClass() {
  
  
  
}


(function($) {
  
    var kendo = window.kendo = window.kendo || {};

    var format = function (str, col) {
        col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
    
        return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") { return "{"; }
            if (m == "}}") { return "}"; }
            return col[n];
        });
    };


    
    
    var tagClasses = function(packageAry) {
    
      var thePackageString = packageAry.join('.');
      var thePackage = eval(thePackageString);
    
    
      for (var className in thePackage) {
    
        if (thePackage.hasOwnProperty (className) && typeof thePackage[className] === 'function') {
    

          
          var fullClassCode = "{0}.{1}";
          fullClassCode = format(fullClassCode, [packageAry.join('.'), className]);
          
          var theFullClass = eval(fullClassCode);
          
          
          if (theFullClass.hasOwnProperty ('extend')) {

              var msg = "Documenting Class : {nameSpace}.{className}";
              msg = format(msg, {className:className, nameSpace:packageAry.join('.')});
              
              console.log( '[kendo.debug] - ' + msg);
      
      
            var newFunctionName = "_CLASS_{0}_{1}";
            newFunctionName = format(newFunctionName, [packageAry.join('_'), className]);
          
              var code = "{0}.{1}.prototype.{2}";
              code = format(code, thePackageString, className, newFunctionName);
              
    
              code += "=function() {};";
              eval(code);
          };

        }
    
      };
    
      return;
    };
    
    /*
    var documentClass = function(idx, fullName) {

      var ary = fullName.split('.');
      var className = ary.pop();
      
      var nameSpace = ary.join('.');
      var prefix = ary.join('_');
      
      var msg = "Documenting Class : {nameSpace}.{className}";
      msg = format(msg, {className:className, nameSpace:nameSpace});
      
      console.log( '[kendo.debug] - ' + msg);
      
      
      
      var codeToMakeInstance = "new {nameSpace}.{className}()";
      
      codeToMakeInstance = format(codeToMakeInstance, 
          {
           className:className,
           nameSpace:nameSpace
          }
       );
      
      
      
      var codeForPrototype = "{nameSpace}.{className}.prototype";
      codeForPrototype = format(codeForPrototype, 
          {
           className:className,
           nameSpace:nameSpace
          }
       );
      
      
      try {
        var proto = eval(codeForPrototype);
      } catch (e){
        
        var msg = "FAILED - Documenting Class - kendo.{className}";
        msg = format(code, {className:className});
        console.log( 'kendo.debug: ' + msg);
        
      }
      
      
      
      var code = "{nameSpace}.{className}.prototype._CLASS_{prefix}_{className} = function() {};";
      code = format(code, 
          {
           className:className,
           nameSpace:nameSpace,
           prefix:prefix
          }
       );
      

      try {
        eval(code);
      } catch (e){
        
        var msg = "FAILED - Documenting Class - kendo.{className}";
        msg = format(code, {className:className});
        console.log( 'kendo.debug: ' + msg);
        
      }
      
      //make instance of class
     // try {
        //var instance = eval(codeToMakeInstance);
      //} catch (e){
        
      //  var msg = "FAILED - Documenting Class - kendo.{className}";
      //  msg = format(code, {className:className});
      //  console.log( 'kendo.debug: ' + msg);
        
     // }
      
       
       return;
    };
  
  */
 

   tagClasses(['kendo']);
    
   tagClasses(['kendo','ui']);
   tagClasses(['kendo','data']);
   tagClasses(['kendo','fx']);
   tagClasses(['kendo','fx', 'Effects']);

    
    /*

    var classList1 = [ 'kendo.Class', 'kendo.Observable', 'kendo.TapCapture', 'kendo.UserEvents', 
    'kendo.jQuery'];
    
    $.each(classList1, documentClass); 
    
    var classList3 = [ 'window.jQuery']
    $.each(classList3, documentClass); 
    
    
    var classList2 =     ['kendo.ui.Draggable', 'kendo.ui.DropDownList','kendo.ui.DropTarget', 'kendo.ui.DropTargetArea',
    'kendo.ui.Grid', 'kendo.ui.List','kendo.ui.Movable', 'kendo.ui.Pane',
    'kendo.ui.PaneDimensions', 'kendo.ui.Popup','kendo.ui.RangeSlider', 'kendo.ui.Resizable',
    'kendo.ui.Select', 'kendo.ui.Slider','kendo.ui.Splitter', 'kendo.ui.TabStrip','kendo.ui.TreeView',
    'kendo.ui.VirtualScrollable', 'kendo.ui.Widget', 'kendo.ui.Window' , 'kendo.ui.ComboBox' , 'kendo.ui.Menu' ];
    $.each(classList2, documentClass);
    
    

    
    
    var classList4 = ['kendo.data.Cache', 'kendo.data.DataSource',
    'kendo.data.HierarchicalDataSource', 'kendo.data.LocalTransport',
    'kendo.data.Model', 'kendo.data.Node','kendo.data.ObservableArray', 'kendo.data.ObservableObject',
    'kendo.data.Query', 'kendo.data.RemoteTransport'];
    
    $.each(classList4, documentClass);
    
    
    var classList5 = ['kendo.fx.Animation', 'kendo.fx.Element',
    'kendo.fx.Transition'];
    
    $.each(classList5, documentClass);
    
  */

    return;
    
    
    
    
})(jQuery);
