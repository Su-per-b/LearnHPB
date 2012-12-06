/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.simulation.controller.MainController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.model.MainModel');
goog.require('lgb.simulation.events.WebSocketConnectionStateEvent');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.model.voNative.SimStateNative');

lgb.simulation.controller.MainController = function() {
    lgb.controller.ControllerBase.call(this);
    this.init_();
};
goog.inherits(lgb.simulation.controller.MainController, lgb.controller.ControllerBase);

/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.controller.MainController.prototype.init_ = function(event) {

    this.jsonController_ = new lgb.simulation.controller.JsonController();
    this.dataModel = new lgb.simulation.model.MainModel();

    this.webSocketConnectionState_ = lgb.simulation.model.WebSocketConnectionState.uninitialized;

    this.delayedMessages = [];

    //this.state_ = lgb.simulation.model.WebSocketConnectionState.uninitialized;

    // this.dataModel.setSimStateNative(lgb.simulation.model.WebSocketConnectionState.uninitialized);

    // this.view = new lgb.view.DuctworkView(this.dataModel);
    // this.bind_();
    //this.view.init();

    //this.isInitialized_ = true;

};

lgb.simulation.controller.MainController.prototype.getState = function() {
    return this.dataModel.getState();
}

lgb.simulation.controller.MainController.prototype.getDataModel = function() {
    return this.dataModel;
}

lgb.simulation.controller.MainController.prototype.connect = function(event) {

    this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.open_requested);

    if (window.MozWebSocket) {
        this.ws_ = new MozWebSocket(this.dataModel.socketServerURL);
    } else if (window.WebSocket) {
        this.ws_ = new WebSocket(this.dataModel.socketServerURL);
    } else {
        // this.ws_ = new MozWebSocket(this.dataModel.socketServerURL);
        alert("This web Browser does not support Web Sockets");
    }

    this.ws_.onopen = this.d(this.onOpen_);
    this.ws_.onmessage = this.d(this.onMessage_);
    this.ws_.onclose = this.d(this.onClose_);
    this.ws_.onerror = this.d(this.onError_);

};

lgb.simulation.controller.MainController.prototype.serializeAndSend = function(event) {

    var jsonString = event.toJson();
    var state = this.dataModel.getWebSocketConnectionState();

    if (state == lgb.simulation.model.WebSocketConnectionState.uninitialized) {
        this.connect();
        this.delayedMessages.push(jsonString);
    } else {

        if (undefined === this.ws_ || this.ws_.readyState !== this.ws_.OPEN) {
            this.delayedMessages.push(jsonString);
        } else {
            this.ws_.send(jsonString);
        }

    }

};



/**
 lgb.simulation.controller.MainController.prototype.setState_ = function(state) {

 this.state_ = state;
 var event = new lgb.simulation.events.WebSocketConnectionStateEvent(state);
 this.dispatch(event);

 };

 * Handler used for websocket communication
 * @private
 */
lgb.simulation.controller.MainController.prototype.onOpen_ = function(event) {
    
    this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.opened);

    while(msg = this.delayedMessages.shift()) {
        this.ws_.send(msg);
    }

/*
    var len = this.delayedMessages.length;

    for (var i = 0; i < len; i++) {
        var message = this.delayedMessages[i];

    };
*/

   // this.delayedMessages = [];
};

/**
 * Handler used for websocket communication
 * @private
 */
lgb.simulation.controller.MainController.prototype.onMessage_ = function(event) {

    if (event.data) {
        var jsonString = event.data;
        console.log("SimulationController.onMessage_() - " + jsonString);

        var event = this.jsonController_.deSerialize(jsonString);

        this.dispatchLocal(event);
    }
};

/**
 * Handler used for websocket communication
 * @private
 */
lgb.simulation.controller.MainController.prototype.onClose_ = function(event) {

    this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.closed);
};

/**
 * Handler used for websocket communication
 * @private
 */
lgb.simulation.controller.MainController.prototype.onError_ = function(event) {

    this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.error);

};
