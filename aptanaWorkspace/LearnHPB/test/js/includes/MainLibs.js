
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



test.includes.MainLibs.init();




