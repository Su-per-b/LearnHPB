/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.ViewBase');

goog.require('lgb.BaseClass');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.utils');

/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseClass}
 * @param {lgb.model.ModelBase=} dataModel that the view with display.
 */
lgb.view.ViewBase = function(dataModel) {
  lgb.BaseClass.call(this);

  if (null !== dataModel && undefined !== dataModel) {
    this.dataModel = dataModel;
    this.listenForChange_();
  }

  this.parentHTMLid = 'theBody';
  this.htmlID = '';
  this.filename = 'scene.json';
  
  //this._NAME = 'lgb.view.ViewBase';

};
goog.inherits(lgb.view.ViewBase, lgb.BaseClass);

/**
 * injects html into the DOM
 * @param {string} html the HTML string to append.
 * @protected
 */
lgb.view.ViewBase.prototype.append = function(html) {
  this.jqParent().append(html);
};

/**
 * makes a unique css ID for a child element
 * @param {!string} id The last part of the CSS ID.
 * @return {string} The generated ID.
 */
lgb.view.ViewBase.prototype.makeID = function(id) {
  var newID = '{0}-{1}'.format(this.htmlID, id);
  return newID;
};

/**
 * converts and id into a Jquery object
 * @param {string=} id The css id.
 * @return {jQuery} Object.
 */
lgb.view.ViewBase.prototype.jq = function(id) {

  var str = '';
  if (undefined === id) {
    str = this.htmlID;
  } else {
    str = id;
  }

  var selector = '#{0}'.format(str);

  var jq = $(selector);
  return jq;
};

/**
 * converts an id into a Jquery object
 * refers to the parent in the DOM
 * @return {jQuery} Jquery object.
 */
lgb.view.ViewBase.prototype.jqParent = function() {
  var selector = $('#{0}'.format(this.parentHTMLid));
  return selector;
};

/**
 * Initializes the View
 * and loads the meshes from remote files
 * @protected
 */
lgb.view.ViewBase.prototype.init = function() {

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
lgb.view.ViewBase.prototype.loadSceneFromFolder_ = function(folderName) {

  var path = lgb.Config.ASSETS_BASE_PATH + folderName + '/' + this.filename;
  this.loader_ = new THREE.SceneLoaderEx();
  this.loader_.load(path, this.d(this.onSceneLoadedBase_));
};

/**
 * Event handler called when the the scene is loaded.
 * @param {Object} result From the THREE.js lib.
 * @private
 */
lgb.view.ViewBase.prototype.onSceneLoadedBase_ = function(result) {

  this.scene_ = result['scene'];
  this.groups_ = result['groups'];
  this.cameras_ = result['cameras'];
  this.appData_ = result['appData'];
  

  this.masterGroup_ = new THREE.Object3D();
  this.masterGroup_.name = this._NAME;

  this.masterGroup_.position = this.scene_.position;
  this.masterGroup_.rotation = this.scene_.rotation;
  this.masterGroup_.scale = this.scene_.scale;

  if (this.onSceneLoaded_ !== undefined) {
    this.onSceneLoaded_();
  }

  this.requestAddToWorld(this.masterGroup_);
  delete this.loader_;
  this.dispatchLocal(new lgb.events.ViewInitialized());

};



/**
 * Event Handler that fires when the data model changes
 * @param {lgb.events.DataModelChanged} event The event.
 * @protected
 */
lgb.view.ViewBase.prototype.onChange = function(event) {
  throw ('this should be overriden Class name: ' + this._NAME);
};


/**
 * @protected
 */
lgb.view.ViewBase.prototype.moveGroupToObject3D_ = function(groupName) {
  
  var obj3D = new THREE.Object3D();
  
  obj3D.name = this._NAME + "_GROUP_" + groupName;
  obj3D.addArray(this.groups_[groupName]);
  
  return obj3D;
};

/**
 * Binds an event listener to handle when the MVC data model changes.
 * @private
 */
lgb.view.ViewBase.prototype.listenForChange_ = function() {

  this.listenHelper_(this.dataModel, lgb.events.DataModelChanged.TYPE, this, this.onChange);

};

/**
 * @param {THREE.Object3D|THREE.Mesh} object3D the object we would like
 * added to the world.
 * @protected
 */
lgb.view.ViewBase.prototype.requestAddToWorld = function(object3D) {

  if (undefined === object3D.name || "" == object3D.name ) {
    object3D.name = this._NAME;
  }

  var event = new lgb.events.Object3DLoaded(object3D);
  this.dispatchLocal(event);
};
