
if (undefined == LGB_WEBROOT) {
  LGB_WEBROOT = "";
}



var test = (undefined == test) ?  {} : test;
test.includes = (undefined == test.includes) ?  {} : test.includes;


test.includes.MainLibs= function() {};
var test = (undefined == test) ?  {} : test;

test.includes = (undefined == test.includes) ?  {} : test.includes;


test.includes.MainLibs = function() {

};

test.includes.MainLibs.addScripts = function(path, ary) {
  
  var len = ary.length;
  
  for (var i=0; i < len; i++) {
    test.includes.MainLibs.addOneScript(path, ary[i]);
  };
  
};


test.includes.MainLibs.addOneScript = function(path, name) {

  var newPath = LGB_WEBROOT + path + name + '.js' ;
  var code = '<script src="' + newPath + '"></script>';
  document.writeln(code);
  
};



test.includes.MainLibs.addCssScripts = function(path, ary) {
  
  var len = ary.length;
  
  for (var i=0; i < len; i++) {
    test.includes.MainLibs.addOneCssScript(path, ary[i]);
  };
  
};


test.includes.MainLibs.addOneCssScript = function(path, name) {

  var newPath = LGB_WEBROOT + path + name + '.css' ;
  var code = ' <link type="text/css" href="' + newPath + '" rel="stylesheet" />';
  document.writeln(code);
  
};



test.includes.MainLibs.chartIframeJs = function() {
  
    
   test.includes.MainLibs.standAlone();
   
    test.includes.MainLibs.addScripts(
      "js/lib/", 
      [
      "d3.v3",
      "crossfilter",
      "dc",
      "colorbrewer"
      ]
      );  
    
};

test.includes.MainLibs.chartIframeCss = function() {
  
   test.includes.MainLibs.addOneCssScript("css/", "tipped");
   test.includes.MainLibs.addOneCssScript("css/", "normalize");
   
   test.includes.MainLibs.addOneCssScript("css/", "kendo.common");
   test.includes.MainLibs.addOneCssScript("css/", "kendo.lgb");

   test.includes.MainLibs.addOneCssScript("css/", "panels");
   test.includes.MainLibs.addOneCssScript("css/", "lhpb");
   test.includes.MainLibs.addOneCssScript("css/", "chartIframe");


};



test.includes.MainLibs.standAlone = function() {
  
    
   test.includes.MainLibs.addScripts(
    "js/lib/", 
      [
        "jquery.src",
        "purl",
        "tipped"
      ]
    );
    
    
   test.includes.MainLibs.initKendo();
   test.includes.MainLibs.addOneScript("js/closure/core/goog/", "base");

      
};



test.includes.MainLibs.initKendo = function() {
  
 
   test.includes.MainLibs.addOneScript("js/kendo/custom-src/", "kendo.core");
  
   test.includes.MainLibs.addScripts(
    "js/kendo/src/", 
      [
        "kendo.window",
        "kendo.userevents",
        "kendo.binder",
        "kendo.draganddrop",
        "kendo.popup",
        "kendo.data",
        "kendo.list",
        "kendo.dropdownlist",
        "kendo.fx",
        "kendo.tabstrip",
        "kendo.pager",
        "kendo.editable",
        "kendo.filtermenu",
        "kendo.columnmenu",
        "kendo.groupable",
        "kendo.selectable",
        "kendo.sortable",
        "kendo.reorderable",
        "kendo.grid",
        "kendo.slider",
        "kendo.splitter",
        "kendo.resizable",
        "kendo.treeview",
        "kendo.combobox",
        "kendo.menu"
      ]
    );
    

  

};





