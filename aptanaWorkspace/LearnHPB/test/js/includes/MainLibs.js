
var test = (undefined == test) ?  {} : test;
test.includes = (undefined == test.includes) ?  {} : test.includes;


test.includes.MainLibs= function() {};


test.includes.MainLibs.init = function() {
  
 
  test.includes.Main.addOneScript("js/lib/", "jquery.src");  
  test.includes.Main.addOneScript("js/lib/", "jquery.easing.1.3");
  test.includes.Main.addOneScript("js/lib/", "purl");
    

  test.includes.Main.addScripts(
    "js/lib/tweenjs/", 
    ["CSSPlugin", "Ease", "Timeline", "Tween"]
    );  


  test.includes.Main.addOneScript("js/closure/core/goog/", "base");
  

};



test.includes.MainLibs.initChart = function() {
  
    
   test.includes.Main.addScripts(
    "js/lib/", 
      [
        "jquery.src",
        "purl",
      ]
    );
    
    
   test.includes.MainLibs.initKendo();
   test.includes.Main.addOneScript("js/closure/core/goog/", "base");
   test.includes.MainLibs.initGraph();
      
};

test.includes.MainLibs.initChart2 = function() {
  
    
   test.includes.Main.addScripts(
    "js/lib/", 
      [
        "jquery.src",
        "purl",
      ]
    );
    
    
   test.includes.MainLibs.initKendo();
   test.includes.Main.addOneScript("js/closure/core/goog/", "base");
   test.includes.MainLibs.initGraph2();
      
};

test.includes.MainLibs.initGraph2 = function() {
  
  test.includes.Main.addScripts(
    "js/lib/", 
    ["d3.v3"]
    );  
    
};



test.includes.MainLibs.initGraph = function() {
  
  test.includes.Main.addScripts(
    "js/lib/", 
    ["d3", "crossfilter", "dc", "colorbrewer"]
    );  
    
};


test.includes.MainLibs.initKendo = function() {
  
 
   test.includes.Main.addOneScript("js/kendo/custom-src/", "kendo.core");
  
   test.includes.Main.addScripts(
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





