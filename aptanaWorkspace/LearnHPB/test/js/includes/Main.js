var test = (undefined == test) ?  {} : test;

test.includes = (undefined == test.includes) ?  {} : test.includes;


test.includes.Main = function() {

};

test.includes.Main.addScripts = function(path, ary) {
  
  var len = ary.length;
  
  for (var i=0; i < len; i++) {
    test.includes.Main.addOneScript(path, ary[i]);
  };
  
};


test.includes.Main.addOneScript = function(path, name) {
  
  var newPath = path + name + '.js';
  var code = '<script src="' + newPath + '"></script>';
  document.writeln(code);
  
};