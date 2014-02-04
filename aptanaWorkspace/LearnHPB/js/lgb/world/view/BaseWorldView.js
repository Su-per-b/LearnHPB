/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.world.view.BaseWorldView');

goog.require('lgb.core.BaseClass');
goog.require('lgb.utils');
goog.require('lgb.core.Config');



/**
 * MVC View base class
 * @constructor
 * @extends {lgb.world.view.BaseV}
 * @param {lgb.world.model.BaseModel=} dataModel that the view with display.
 */
lgb.world.view.BaseWorldView = function(dataModel) {
  lgb.core.BaseClass.call(this);


  this.dataModel = dataModel;
  
  this.masterGroup_ = new THREE.Object3D();
  this.masterGroup_.name = this._TITLE;
  this.masterGroup_.name = this.masterGroup_.name || this._ASSETS_FOLDER;

  this.filename = this.filename || 'scene.json';

};
goog.inherits(lgb.world.view.BaseWorldView, lgb.core.BaseClass);




lgb.world.view.BaseWorldView.prototype.listenForChange_ = function(changedPropertyString) {
    
    if (this.changeMap_ === undefined) {
      this.changeMap_ = {};
      this.listenHelper_(this.dataModel, e.DataModelChangedEx, this, this.onChangeEx_);
    }

    this.listenForOneChange_(changedPropertyString);
};


lgb.world.view.BaseWorldView.prototype.listenForOneChange_ = function(changedPropertyString) {
  
    var handlerName = 'onChange_' + changedPropertyString + '_';
    var func = this[handlerName];

    if (func && func instanceof Function) {
      var delegate = this.d(func);
      this.changeMap_[changedPropertyString] = delegate;
    } else {
      debugger;
    }
};


lgb.world.view.BaseWorldView.prototype.onChangeEx_ = function(event) {
  
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
lgb.world.view.BaseWorldView.prototype.init = function() {

  if (undefined === this._ASSETS_FOLDER) {
    throw ("You must define this._ASSETS_FOLDER");
  }

  this.loadSceneFromFolder_(this._ASSETS_FOLDER);
};

/**
 * Initiates the loading of the scene
 * @param {string} the folder name form which to load the 'scene.json' file
 * @protected
 */
lgb.world.view.BaseWorldView.prototype.loadSceneFromFolder_ = function(folderName) {

  var path = lgb.core.Config.ASSETS_BASE_PATH + folderName + '/' + this.filename;
  this.loader_ = new THREE.SceneLoaderEx();
  this.loader_.addGeometryHandler( "binary", THREE.BinaryLoader );
  this.loader_.load(path, this.d(this.onSceneLoadedBase_));
};


/**
 * Event handler called when the the scene is loaded.
 * @param {Object} result From the THREE.js lib.
 * @private
 */
lgb.world.view.BaseWorldView.prototype.onSceneLoadedBase_ = function(result) {

  this.scene_ = result.scene;
  this.groups_ = result.groups;
  this.cameras_ = result.cameras;
  this.appData_ = result.appData;
  this.containers_ = result.containers;
  this.geometries_ = result.geometries;
  this.objects_ = result.objects;
  this.meshes_ = {};
  this.object3ds_ = {};
  
  this.masterGroup_.position = this.scene_.position;
  this.masterGroup_.rotation = this.scene_.rotation;
  this.masterGroup_.scale = this.scene_.scale;
  this.masterGroup_.viewpoint = "defaultScene";
  
  this.objectTypeMap_ = {
    Mesh : this.meshes_,
    Object3D : this.object3ds_,
    PerspectiveCamera : this.cameras_,
    Camera : this.cameras_,
    OrthographicCamera : this.cameras_
  };
  

  
  if ( !COMPILED  && lgb.core.Config.DEBUG_3D) {
    this.eachProperty(this.geometries_, this.analyzeOneGeometry_);
  }
 
  this.eachPropertyName(this.objects_, this.processOneObject_);
  
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



//this add the object to  this.objects_,  this.meshes_ or this.cameras_
lgb.world.view.BaseWorldView.prototype.processOneObject_ = function(object, name) {
  

  var className = object.getClassName();
  
  if ('' == object.name) {
    object.name = name;
  }


  if (!this.objectTypeMap_.hasOwnProperty(className)) {
    this.objectTypeMap_[className] = {};
  }

  this.objectTypeMap_[className][name] = object;


  if (undefined !== object.groups) {
    
    for (var i = 0; i < object.groups.length; i++) {
      var groupID = object.groups[i];
  
      if (this.groups_[groupID] === undefined) {
        this.groups_[groupID] = [];
      }
      
      this.groups_[groupID].push(object);
    }
  }
};




lgb.world.view.BaseWorldView.prototype.analyzeOneGeometry_ = function(geometry) {

  var result = geometry.analyze();
  
  
  if (!result.isCentered) {

    var msg = "geometry:{0} - Geometry is not centered. offset: {1}".format(geometry.name, result.v3Offset.toString());

    lgb.logWarning(msg, this._TITLE);
  }
  

  if (result.duplicateVerticesCount > 0) {
    var msg = "geometry:{0} - Duplicate vertices found. duplicate count:{1} ".format(geometry.name, result.duplicateVerticesCount);

    lgb.logWarning(msg, this._TITLE);
  }
  
};




lgb.world.view.BaseWorldView.prototype.addAlltoMasterGroup_ = function() {

/*
   for(var mesh in this.meshes_) {
       this.masterGroup_.add(mesh); 
   }
   for(var object3d in this.object3ds_) {
       this.masterGroup_.add(object3d); 
   }*/

  var len = this.scene_.children.length;
  
  for (var i = 0; i < len; i++) {

    var child = this.scene_.children.pop();
    var className = child.getClassName();
    
    if (className == 'Mesh' || className == 'Object3d') {
       this.masterGroup_.add(child); 
    }
    
  }

  


};


lgb.world.view.BaseWorldView.prototype.placeContainers_ = function() {
    
    for(var containerName in this.containers_) {
      var containerObject = this.containers_[containerName];
      
      
      if (undefined !== containerObject.position ) {
          containerObject.position = new THREE.Vector3().fromArray(containerObject.position);
      } else {
          containerObject.position = new THREE.Vector3();
      }
      
      
      if (undefined !== containerObject.rotation ) {
          containerObject.rotation = new THREE.Euler().fromArray(containerObject.rotation);
      } else {
          containerObject.rotation = new THREE.Euler();
      }
      
      
      if (undefined !== containerObject.scale ) {
          containerObject.scale = new THREE.Vector3().fromArray(containerObject.scale);
      } else {
          containerObject.scale = new THREE.Vector3(1,1,1);
      }

      
      this.placeOneContainer_(containerName, containerObject);
    }

};



lgb.world.view.BaseWorldView.prototype.chromeBlinkingFix_ = function(mesh) {
  
    mesh.material.opacity = 1;
    
    if (mesh.geometry && mesh.geometry.materials) {
      var l = mesh.geometry.materials.length;

      for (var i = 0; i < l; i++) {
        mesh.geometry.materials[i].opacity = 1;
      }

    }
    
    
};


lgb.world.view.BaseWorldView.prototype.placeOneContainer_ = function(containerName, containerObject) {
    
    if (containerObject.type == "group") {
        
        var groupName = containerObject.groupName;
        var obj3D = new THREE.Object3D();
        obj3D.name = containerName;
        
        var ary = this.groups_[groupName];
        
        lgb.assert(ary);
        
        if (goog.userAgent.WEBKIT) {
          this.each(ary, this.chromeBlinkingFix_);
        }
        
        obj3D.cloneArray(ary);
          
        obj3D.position = containerObject.position;
        obj3D.rotation = containerObject.rotation;
        obj3D.scale = containerObject.scale;
        
        
        if (containerObject.viewpoint == null) {
           obj3D.viewpoint = "default";
        } else {
           obj3D.viewpoint = containerObject.viewpoint;
        }
        
        
        this.masterGroup_.add(obj3D);
        
    }
  
};



lgb.world.view.BaseWorldView.prototype.requestDataModelChange = function(propertyName, propertyValue) {
  
  var payload = {name:propertyName, value:propertyValue};
  this.triggerLocal(e.RequestDataModelChange, payload);
  
};


/**
 * @protected
 */
lgb.world.view.BaseWorldView.prototype.moveGroupToObject3D_ = function(groupName) {
  
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
lgb.world.view.BaseWorldView.prototype.requestAddToWorld = function(object3D) {

  object3D.name = object3D.name || this._TITLE;
  object3D.name = object3D.name || this._NAME;

  this.triggerLocal(e.AddToWorldRequest, object3D);
};




