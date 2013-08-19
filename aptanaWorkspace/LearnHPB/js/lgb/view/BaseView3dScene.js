/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.BaseView3dScene');

goog.require('lgb.BaseClass');


goog.require('lgb.utils');

/**
 * MVC View base class
 * @constructor
 * @extends {lgb.view.BaseV}
 * @param {lgb.model.BaseModel=} dataModel that the view with display.
 */
lgb.view.BaseView3dScene = function(dataModel) {
  lgb.BaseClass.call(this);


  this.dataModel = dataModel;
  
  this.masterGroup_ = new THREE.Object3D();
  this.masterGroup_.name = this._TITLE;
  this.masterGroup_.name = this.masterGroup_.name || this._ASSETS_FOLDER;

  this.filename = this.filename || 'scene.json';

};
goog.inherits(lgb.view.BaseView3dScene, lgb.BaseClass);




lgb.view.BaseView3dScene.prototype.listenForChange_ = function(changedPropertyString) {
    
    
    if (this.changeMap_ === undefined) {
      this.changeMap_ = {};
      this.listenHelper_(this.dataModel, e.DataModelChangedEx, this, this.onChangeEx_);
    }

    this.listenForOneChange_(changedPropertyString);
};


lgb.view.BaseView3dScene.prototype.listenForOneChange_ = function(changedPropertyString) {
  
    var handlerName = 'onChange_' + changedPropertyString + '_';
    var func = this[handlerName];

    if (func && func instanceof Function) {
      var delegate = this.d(func);
      this.changeMap_[changedPropertyString] = delegate;
    } else {
      debugger;
    }
};


lgb.view.BaseView3dScene.prototype.onChangeEx_ = function(event) {
  
   var whatIsDirty = event.payload;
  
    //loop through all the dirty properties and fire their event listeners
   for (var prop in whatIsDirty) {
      
      if(prop !== undefined || prop !== null) {
        
        if(whatIsDirty.hasOwnProperty(prop)){
          
          var delegate = this.changeMap_[prop];
          var arg = whatIsDirty[prop];
          
          if (delegate) {
            delegate(arg);
          }
        }
      }
   }
};


/**
 * Initializes the View
 * and loads the meshes from remote files
 * @protected
 */
lgb.view.BaseView3dScene.prototype.init = function() {

  if (undefined === this._ASSETS_FOLDER) {
    throw ("You must define this._ASSETS_FOLDER")
  }

  this.loadSceneFromFolder_(this._ASSETS_FOLDER);
};

/**
 * Initiates the loading of the scene
 * @param {string} the folder name form which to load the 'scene.json' file
 * @protected
 */
lgb.view.BaseView3dScene.prototype.loadSceneFromFolder_ = function(folderName) {

  var path = lgb.Config.ASSETS_BASE_PATH + folderName + '/' + this.filename;
  this.loader_ = new THREE.SceneLoaderEx();
  this.loader_.load(path, this.d(this.onSceneLoadedBase_));
};


/**
 * Event handler called when the the scene is loaded.
 * @param {Object} result From the THREE.js lib.
 * @private
 */
lgb.view.BaseView3dScene.prototype.onSceneLoadedBase_ = function(result) {

  this.scene_ = result['scene'];
  this.groups_ = result['groups'];
  this.cameras_ = result['cameras'];
  this.appData_ = result['appData'];
  this.containers_ = result['containers'];
  
  this.masterGroup_.position = this.scene_.position;
  this.masterGroup_.rotation = this.scene_.rotation;
  this.masterGroup_.scale = this.scene_.scale;
  this.masterGroup_.viewpoint = "defaultScene";

  var c = this.containers_; 
  if (this.containers_ != null) {
    this.placeContainers_();
  }
  
  if (this.onSceneLoaded_ !== undefined) {
    this.onSceneLoaded_();
  }
  
  this.requestAddToWorld(this.masterGroup_);
  delete this.loader_;
  
  this.triggerLocal(e.ViewInitialized);

};



lgb.view.BaseView3dScene.prototype.placeContainers_ = function() {
    

  //  var count = 0;
    for(var containerName in this.containers_) {
      var containerObject = this.containers_[containerName];
      this.placeOneContainer_(containerName, containerObject);
      
     // count++;
    }

};



lgb.view.BaseView3dScene.prototype.chromeBlinkingFix_ = function(mesh) {
  
    mesh.material.opacity = 1;
    
    if (mesh.geometry && mesh.geometry.materials) {
      var l = mesh.geometry.materials.length;

      for (var i = 0; i < l; i++) {
        mesh.geometry.materials[i].opacity = 1;
      }

    }
    
    
}


lgb.view.BaseView3dScene.prototype.placeOneContainer_ = function(containerName, containerObject) {
    
    if (containerObject.type == "group") {
        
        var groupName = containerObject.groupName;
        var obj3D = new THREE.Object3D();
        obj3D.name = containerName;
        
        var ary = this.groups_[groupName];
        
        if (goog.userAgent.WEBKIT) {
          this.each(ary, this.chromeBlinkingFix_);
        }
        
        obj3D.cloneArray(ary);
          
          
          
  
        if (containerObject.position != null) {
            obj3D.position = new THREE.Vector3(
                containerObject.position[0],
                containerObject.position[1],
                containerObject.position[2]
            );
        }
        
        if (containerObject.rotation != null) {
            obj3D.rotation = new THREE.Vector3(
                containerObject.rotation[0],
                containerObject.rotation[1],
                containerObject.rotation[2]
            );
        }
        
        if (containerObject.scale != null) {
            obj3D.scale = new THREE.Vector3(
                containerObject.scale[0],
                containerObject.scale[1],
                containerObject.scale[2]
            );
        }
        
        if (containerObject.viewpoint == null) {
           obj3D.viewpoint = "default";
        } else {
           obj3D.viewpoint = containerObject.viewpoint;
        }
        
        
        this.masterGroup_.add(obj3D);
        
    }
  
};



lgb.view.BaseView3dScene.prototype.requestDataModelChange = function(propertyName, propertyValue) {
  
  var payload = {name:propertyName, value:propertyValue};
  this.triggerLocal(e.RequestDataModelChange, payload);
  
};


/**
 * @protected
 */
lgb.view.BaseView3dScene.prototype.moveGroupToObject3D_ = function(groupName) {
  
  var obj3D = new THREE.Object3D();
  
  obj3D.name = this._NAME + "_GROUP_" + groupName;
  obj3D.addArray(this.groups_[groupName]);
  
  return obj3D;
};




/**
 * @param {THREE.Object3D|THREE.Mesh} object3D the object we would like
 * added to the world.
 * @protected
 */
lgb.view.BaseView3dScene.prototype.requestAddToWorld = function(object3D) {

  object3D.name = object3D.name || this._TITLE;
  object3D.name = object3D.name || this._NAME;

  this.triggerLocal(e.AddToWorldRequest, object3D);
};




