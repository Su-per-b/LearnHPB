/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.core.Event');
goog.provide('e.Event');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {string} type of event
 * @param {Object} payload
 * @extends {goog.events.Event}
 */
lgb.core.Event = function(type, payload) {

  goog.events.Event.call(this, type);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = payload;
  
};
goog.inherits(lgb.core.Event, goog.events.Event);

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
e.Activate = 'e.Activate';


e.OpenDropDown = 'e.OpenDropDown';
e.CloseDropDown = 'e.CloseDropDown';

e.AddToWorldRequest = 'e.AddToWorldRequest';

e.ViewClosed = 'e.ViewClosed';
e.WindowResize = 'e.WindowResize';

e.VisibilityNodesLoaded = 'e.VisibilityNodesLoaded';
e.ViewpointNodesLoaded = 'e.ViewpointNodesLoaded';

e.ScenarioParsed = 'e.ScenarioParsed';
e.ScenarioDataModelLoaded = 'e.ScenarioDataModelLoaded';
e.ScenarioControllerLoaded = 'e.ScenarioControllerLoaded';



e.DataModelChangedEx = 'e.DataModelChangedEx';

e.BuildingHeightChanged = 'e.BuildingHeightChanged';

e.SetFocus = 'e.SetFocus';
e.RemoveFocus = 'e.RemoveFocus';
e.EnvelopeModelChanged = 'e.EnvelopeModelChanged';

e.RequestLayoutVisibilityChange = 'e.RequestLayoutVisibilityChange';
e.RequestAddToMainInput = 'e.RequestAddToMainInput';
e.RequestAddToTestingInput = 'e.RequestAddToTestingInput';
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
e.SimulationEngineLoaded = 'e.SimulationEngineLoaded';

e.GuiValueChanged = 'e.GuiValueChanged';
e.SplitterResize = 'e.SplitterResize';
e.RequestLoadScenario = 'e.RequestLoadScenario';
e.SimulationInitialized = 'e.SimulationInitialized';

e.DisplayUnitSystemChangeRequest = 'e.DisplayUnitSystemChangeRequest';
e.DisplayUnitSystemChangeNotify = 'e.DisplayUnitSystemChangeNotify';

e.IntegratedDataModelScenarioInitialized = 'e.IntegratedDataModelScenarioInitialized';
e.IntegratedDataModelSimulationInitialized = 'e.IntegratedDataModelSimulationInitialized';
e.IntegratedDataModelVariablesUpdated = 'e.IntegratedDataModelVariablesUpdated';
e.IntegratedDataModelValuesUpdated = 'e.IntegratedDataModelValuesUpdated';

e.RequestIntegratedVariableChange = 'e.RequestIntegratedVariableChange';


//e.IntegratedDataModelOutputVariablesUpdated = 'e.IntegratedDataModelOutputVariablesUpdated';
//e.IntegratedDataModelInputVariablesUpdated = 'e.IntegratedDataModelInputVariablesUpdated';

