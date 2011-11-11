goog.provide('lgb.view.DuctworkView');

goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.DuctworkView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this.dataModel = dataModel;
  this._NAME = 'lgb.view.DuctworkView';
};
goog.inherits(lgb.view.DuctworkView, lgb.view.ViewBase);



/**
 * Initializes the View
 * loads the geometry
 * @public
 */
lgb.view.DuctworkView.prototype.init = function() {
  //this.loader_ = new lgb.Loader();
  //this.loader_.loadFile('ductwork102611.b.js', this.d(this.onGeometryLoaded));
  this.loadScene_();
};

lgb.view.DuctworkView.prototype.loadScene_ = function() {

  var path = lgb.Config.ASSETS_BASE_PATH + 'ductwork/scene-bin.js';
  this.loader_ = new THREE.SceneLoaderEx();

  this.loader_.load(path, this.d(this.onSceneLoaded_));
};


/**
 * @private
 */
lgb.view.DuctworkView.prototype.onSceneLoaded_ = function(result) {
  /**@type THREE.Scene */
  var scene = result['scene'];

  lgb.logInfo('DuctworkView.onSceneLoaded_');
  this.masterGroup = new THREE.Object3D();

  for (var i = scene.objects.length - 1; i >= 0; i--) {
      var mesh = scene.objects[i];

      if (mesh.name == 'DuctWork') {
        mesh.doubleSided = true;
      } else {
      var event = new lgb.events.SelectableLoaded(mesh);
      this.dispatchLocal(event);
      }
      this.masterGroup.add(mesh);
  }

  this.masterGroup.position = scene.position;
  this.masterGroup.rotation = scene.rotation;
  this.masterGroup.scale = scene.scale;

  this.requestAddToWorld(this.masterGroup);

  delete this.loader_;

};


/**
 * @override
 * @param {lgb.events.DataModelChanged } event The event.
 * @protected
 */
lgb.view.DuctworkView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
};



/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility state of the MVC model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateVisible_ = function() {
  var m = this.masterGroup.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup.children[i].visible = this.dataModel.isVisible;
  }
};



