/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.view.TestView2');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.core.BaseClass');




/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {test.world.model.EnvelopeModel} dataModel The model to display.
 */
test.world.view.TestView2 = function(dataModel) {
    


};
goog.inherits(test.world.view.TestView2, lgb.core.BaseClass);



test.world.view.TestView2.prototype.init = function() {

  var loader = new THREE.SceneLoader();
  loader.addGeometryHandler( "binary", THREE.BinaryLoader );

  var path =  lgb.core.Config.ASSETS_BASE_PATH + 'test/world2.json';
  loader.load( path, this.d(this.onLoaded) );

};


test.world.view.TestView2.prototype.onLoaded = function(event) {
  
  this.triggerLocal(e.AddToWorldRequest, event.objects.TaskLight);
  
};











