/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.Event');
goog.provide('e.Event');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {string} type of event
 * @param {Object} payload
 * @extends {goog.events.Event}
 */
lgb.events.Event = function(type, payload) {

  goog.events.Event.call(this, type);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = payload;
  
};
goog.inherits(lgb.events.Event, goog.events.Event);

e.Event = function() {};


e.Resize = 'e.Resize';
e.LayoutChange = 'e.LayoutChange';
e.ViewInitialized = 'e.ViewInitialized';
e.DataModelInitialized = 'e.DataModelInitialized';
e.RenderNotify = 'e.RenderNotify';
e.MouseClick = 'e.MouseClick';
e.MouseOut = 'e.MouseOut';
e.MouseOver = 'e.MouseOver';
e.Select = 'e.Select';
e.AddToWorldRequest = 'e.AddToWorldRequest';

e.ViewClosed = 'e.ViewClosed';
e.WindowResize = 'e.WindowResize';

e.VisibilityNodesLoaded = 'e.VisibilityNodesLoaded';
e.ViewpointNodesLoaded = 'e.ViewpointNodesLoaded';
e.ScenarioParsed = 'e.ScenarioParsed';
e.ScenarioParsed2 = 'e.ScenarioParsed2';

e.DataModelChanged = 'e.DataModelChanged';
e.DataModelChangedEx = 'e.DataModelChangedEx';

e.BuildingHeightChanged = 'e.BuildingHeightChanged';

e.SetFocus = 'e.SetFocus';
e.RemoveFocus = 'e.RemoveFocus';
e.EnvelopeModelChanged = 'e.EnvelopeModelChanged';

e.RequestLayoutVisibilityChange = 'e.RequestLayoutVisibilityChange';
e.RequestAddToMainInput = 'e.RequestAddToMainInput';
e.RequestAddToTestingInput = 'e.RequestAddToTestingInput';
e.RequestAddToLayout = 'e.RequestAddToLayout';
e.RequestRemoveFromLayout = 'e.RequestRemoveFromLayout';

e.RequestAddToParentGUI = 'e.RequestAddToParentGUI';

e.RequestChangeVisibility = 'e.RequestChangeVisibility';
e.RequestGoToViewpointNode = 'e.RequestGoToViewpointNode';
e.RequestShowViewpoint = 'e.RequestShowViewpoint';

e.RequestActivateView = 'e.RequestActivateView';
e.RequestDataModelChange = 'e.RequestDataModelChange';

e.SelectableLoaded = 'e.SelectableLoaded';
e.Object3DSelected = 'e.Object3DSelected';

e.RequestSelectSystemNode = 'e.RequestSelectSystemNode';

