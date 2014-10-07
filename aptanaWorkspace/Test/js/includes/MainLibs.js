
if (!"LGB_WEBROOT" in window || undefined === LGB_WEBROOT) {
  var LGB_WEBROOT = "";
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
  var code = '<script charset="utf-8" src="' + newPath + '"></script>';
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


test.includes.MainLibs.includeCharting = function() {
  
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


test.includes.MainLibs.includeStandAloneWithCharting = function() {
  
   test.includes.MainLibs.addScripts(
    "js/lib/", 
      [
        "jquery.src",
        "purl",
        "tipped"
      ]
    );

  
    test.includes.MainLibs.includeKendo();
    test.includes.MainLibs.includeCharting();


};


test.includes.MainLibs.includeJquery = function() {
  
   test.includes.MainLibs.addOneScript("js/lib/", "jquery.src");
  
};




test.includes.MainLibs.includeBaseLibs = function() {
  
   test.includes.MainLibs.addScripts(
    "js/lib/", 
      [
        "jquery.src",
        "purl"
      ]
    );
    
  test.includes.MainLibs.includeCreateJS();
  test.includes.MainLibs.includeTweenJS();

};



test.includes.MainLibs.includeInfoCSS = function() {
  
   test.includes.MainLibs.addOneCssScript("css/", "info");
   test.includes.MainLibs.addOneCssScript("css/", "normalize");
   
};



test.includes.MainLibs.includeCSS = function() {
  
   test.includes.MainLibs.addOneCssScript("css/", "tipped");
   test.includes.MainLibs.addOneCssScript("css/", "normalize");
   
   test.includes.MainLibs.addOneCssScript("css/", "kendo.common");
   test.includes.MainLibs.addOneCssScript("css/", "kendo.lgb");

   test.includes.MainLibs.addOneCssScript("css/", "panels");
   test.includes.MainLibs.addOneCssScript("css/", "lhpb");
};

test.includes.MainLibs.includeKendo = function() {
  
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




test.includes.MainLibs.includeClosure = function() {
  
   test.includes.MainLibs.addOneScript("js/closure/", "base-nodeps");
   test.includes.MainLibs.addOneScript("../Test/js/closure/", "deps");
   
};


test.includes.MainLibs.includeTweenJS = function() {
  
   test.includes.MainLibs.addScripts(
    "js/lib/tweenjs/", 
      [
        "Tween",
        "CSSPlugin",
        "Ease",
        "Timeline",
        "version"
      ]
    );
   
};


test.includes.MainLibs.includeCreateJS = function() {
  
   test.includes.MainLibs.addScripts(
    "js/lib/createjs/events/", 
      [
        "Event",
        "EventDispatcher"
      ]
    );
   
};


test.includes.MainLibs.includeMetaTags = function() {
  
  document.writeln('<meta name="author" content="Joseph Deringer"><!-- Project Leader -->');
  document.writeln('    <!--');
  document.writeln('    Learn Green Buildings (http://su-per-b.org/projects_lgb.html)');
  document.writeln('    by Institute For Superior Performance of Buildings (http://su-per-b.org)');
  document.writeln('    for California Energy Commission (http://www.energy.ca.gov/)');
  document.writeln('    -->');
  document.writeln('    <meta name="author" content="Joseph Deringer"><!-- Project Leader -->');
  document.writeln('    <meta name="author" content="Raj Dye"><!-- Software Development (raj@pcdigi.com) -->');
  document.writeln('    <meta name="author" content="Andrew Scully"><!-- 3D Modeling and Animation -->');
  document.writeln('    <meta name="author" content="Elliot Nahman"><!-- Information Architecture -->');
  document.writeln('    <meta name="author" content="Laura Strong"><!-- Design &  Information Architecture -->');
  document.writeln('');
  document.writeln('    <meta name = "description" content = "Learn Green Buildings: Commercial building energy use simulation" />');
  document.writeln('    <meta name = "revised" content = "August 8, 2014" />');
  document.writeln('    <meta name="Copyright" content="Copyright 2014, Institute For Superior Performance of Buildings">');
  document.writeln('    <meta charset="UTF-8" />');

};









