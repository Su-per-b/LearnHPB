

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


    
    var documentClass = function(idx, fullName) {

      var ary = fullName.split('.');
      var className = ary.pop();
      
      var nameSpace = ary.join('.');
      var prefix = ary.join('_');
      
      var msg = "Documenting Class : {nameSpace}.{className}";
      msg = format(msg, {className:className, nameSpace:nameSpace});
      
      console.log( '[kendo.debug] - ' + msg);
      
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
        
        var msg = "FAILED - Documenting Class - kendo.{class}";
        msg = format(code, {class:className});
        console.log( 'kendo.debug: ' + msg);
        
      }

    };
  
    var classList1 = [ 'kendo.Class', 'kendo.Observable', 'kendo.TapCapture', 'kendo.UserEvents', 'kendo.jQuery']
    $.each(classList1, documentClass); 
    
    var classList2 =     ['kendo.ui.Draggable', 'kendo.ui.DropDownList','kendo.ui.DropTarget', 'kendo.ui.DropTargetArea',
    'kendo.ui.Grid', 'kendo.ui.List','kendo.ui.Movable', 'kendo.ui.Pane',
    'kendo.ui.PaneDimensions', 'kendo.ui.Popup','kendo.ui.RangeSlider', 'kendo.ui.Resizable',
    'kendo.ui.Select', 'kendo.ui.Slider','kendo.ui.Splitter', 'kendo.ui.TabStrip','kendo.ui.TreeView',
    'kendo.ui.VirtualScrollable', 'kendo.ui.Widget', 'kendo.ui.Window' ];
    $.each(classList2, documentClass);
    
    
    var classList3 = [ 'window.jQuery']
    $.each(classList3, documentClass); 
    
    
    var classList4 = ['kendo.data.Cache', 'kendo.data.DataSource',
    'kendo.data.HierarchicalDataSource', 'kendo.data.LocalTransport',
    'kendo.data.Model', 'kendo.data.Node','kendo.data.ObservableArray', 'kendo.data.ObservableObject',
    'kendo.data.Query', 'kendo.data.RemoteTransport'];
    
    $.each(classList4, documentClass);
    
    
    var classList5 = ['kendo.fx.Animation', 'kendo.fx.Element',
    'kendo.fx.Transition'];
    
    $.each(classList5, documentClass);
    
    return;
    
})(jQuery);
