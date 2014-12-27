/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.vo.BaseVo');


/**
 * @constructor
 * @extends lgb.world.model.vo.BaseVo
 */
lgb.world.model.vo.BaseVo = function() {

};



/**
 * loop though the array and
 * supply each element as an argument
 *  to the handler
 * @param {Array} ary The array to loop though.
 * @param {Function} handler The handler to call.
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * @protected
 */
lgb.world.model.vo.BaseVo.prototype.each = function(ary, handler) {
  var additionalArgs = null;
  var allArguments = Array.prototype.slice.call(arguments);
  var len = allArguments.length;
  if (len > 2) {
    additionalArgs = allArguments.slice(2, len);
  }
  
  var l = ary.length;
  for (var i = 0; i < l; i++) {
    var arrayElement = ary[i];
    
    var argList = [arrayElement];
    
    if(additionalArgs) {
      argList = argList.concat(additionalArgs);
    }
    
    handler.apply(this, argList);
  }
};


/**
 * loop though the array and
 * supply each element as an argument
 *  to the handler
 * @param {Array} ary The array to loop though.
 * @param {Function} handler The handler to call.
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * @protected
 */
lgb.world.model.vo.BaseVo.prototype.eachIdx = function(ary, handler) {
  var additionalArgs = null;
  var allArguments = Array.prototype.slice.call(arguments);
  var len = allArguments.length;
  if (len > 2) {
    additionalArgs = allArguments.slice(2, len);
  }
  
  var l = ary.length;
  for (var i = 0; i < l; i++) {
    var arrayElement = ary[i];
    
    var argList = [arrayElement];
    
    argList.push(i);
    
    
    if(additionalArgs) {
      argList = argList.concat(additionalArgs);
    }
    
    handler.apply(this, argList);
  }
};


