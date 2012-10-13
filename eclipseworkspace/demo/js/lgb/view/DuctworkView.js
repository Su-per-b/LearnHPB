/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.DuctworkView');

goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.DuctworkModel} dataModel The model to display.
 */
lgb.view.DuctworkView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this.dataModel = dataModel;
  this._NAME = 'lgb.view.DuctworkView';
  this._ASSETS_FOLDER = 'hvac';
  
};
goog.inherits(lgb.view.DuctworkView, lgb.view.ViewBase);




/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.DuctworkView.prototype.onSceneLoaded_ = function(result) {

  var len = this.scene_.children.length;
  for (var i = 0; i < len; i++) {
    
      var mesh = this.scene_.children.pop();
    
      if (mesh != null) {
        
        //TODO:RAJ target selectable meshes with "groups"
        if (mesh.name != 'ductingObject') {
          var event = new lgb.events.SelectableLoaded(mesh);
          this.dispatchLocal(event);
        }
        
        this.masterGroup_.add(mesh);
      } else {
        
        //console.log ("test");
        throw ('Mesh is null');
      }
  }

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
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateVisible_ = function() {
  var m = this.masterGroup_.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup_.children[i].visible = this.dataModel.isVisible;
  }
};
