/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.simulation.controller.MainController');

goog.require('se.Event');

goog.require('lgb.core.BaseController');
goog.require('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.model.MainModel');
goog.require('lgb.simulation.events.WebSocketConnectionStateEvent');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.simulation.model.WebSocketConnectionStateRequest');
goog.require('lgb.simulation.events.ScalarValueChangeRequest');
goog.require('lgb.simulation.model.voNative.ScalarValueRealStruct');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');

lgb.simulation.controller.MainController = function() {
    lgb.core.BaseController.call(this);
    this.init_();
};
goog.inherits(lgb.simulation.controller.MainController, lgb.core.BaseController);

/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.controller.MainController.prototype.init_ = function(event) {

    this.jsonController_ = new lgb.simulation.controller.JsonController();
    this.dataModel = new lgb.simulation.model.MainModel();

    this.webSocketConnectionState_ = lgb.simulation.model.WebSocketConnectionState.uninitialized;

    this.delayedMessages = [];

    this.bind_();

};


lgb.simulation.controller.MainController.prototype.bind_ = function() {
  
    this.listenTo (
        this,
        se.SimStateNativeNotify,
        this.onSimStateNativeNotify_
    );
    
    this.listenTo (
        this,
        se.ConfigChangeNotify,
        this.onConfigChangeNotify_
    );
    
    this.listenTo (
        this,
        se.XMLparsedEvent,
        this.onXMLparsedEvent_
    );
    
    this.listenTo (
        this,
        se.ResultEvent,
        this.onResultEvent_
    );
    
    
    this.listenTo (
        this,
        se.MessageEvent,
        this.onMessageEvent_
    );
    
    this.listen (
        se.RequestModelicaVariableChange,
        this.onRequestModelicaVariableChange_
    );
    
    

    
};


lgb.simulation.controller.MainController.prototype.onRequestModelicaVariableChange_ = function(event) {
  
  var theVar = this.dataModel.getIdxFromModelicaName(event.payload.modName);
  
  var floatValue = event.payload.value;
  var idx = theVar.idx_;
  
  var scalarValueReal = new lgb.simulation.model.voManaged.ScalarValueReal(idx, floatValue);
  var collection = new lgb.simulation.model.voManaged.ScalarValueCollection([scalarValueReal], []);
  
  var event = new lgb.simulation.events.ScalarValueChangeRequest(collection);
  
  this.serializeAndSend(event);

  
};


    
lgb.simulation.controller.MainController.prototype.onSimStateNativeNotify_ = function(event) {
  this.dataModel.changePropertyEx('simStateNative', event.getPayload());
  this.dispatch(event);
};

lgb.simulation.controller.MainController.prototype.onConfigChangeNotify_ = function(event) {
 // this.dataModel.changePropertyEx('simStateNative', event.getPayload());
   this.dispatch(event);
};

lgb.simulation.controller.MainController.prototype.onXMLparsedEvent_ = function(event) {
  
  this.dataModel.setXmlParseInfo(event.getPayload());
  this.dispatch(event);
};

lgb.simulation.controller.MainController.prototype.onResultEvent_ = function(event) {
  this.dataModel.changePropertyEx('scalarValueResults', event.getPayload());
  this.dispatch(event);
};

lgb.simulation.controller.MainController.prototype.onMessageEvent_ = function(event) {
  this.dataModel.changePropertyEx('messageStruct', event.getPayload());
  this.dispatch(event);
};





lgb.simulation.controller.MainController.prototype.getState = function() {
    return this.dataModel.getState();
};

lgb.simulation.controller.MainController.prototype.getDataModel = function() {
    return this.dataModel;
};


lgb.simulation.controller.MainController.prototype.requestSimStateChange = function(state) {

  this.dataModel.changePropertyEx('simStateNative', state);
  
  var event = new lgb.simulation.events.SimStateNativeRequest(state);
  this.serializeAndSend(event);

};


lgb.simulation.controller.MainController.prototype.requestWebSocketStateChange = function(state) {

  switch (state) {
    
    case  lgb.simulation.model.WebSocketConnectionStateRequest.open : {
       this.connect(true);
      break;
    }
    case  lgb.simulation.model.WebSocketConnectionStateRequest.close : {
       this.connect(false);
      break;
    }
    
    default:
  }
  
  
};



lgb.simulation.controller.MainController.prototype.connect = function(connectFlag) {


    if (connectFlag) {
      
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
      
    } else {
      
      this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.closed);
    }

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
 * Handler used for websocket communication
 * @private
 */
lgb.simulation.controller.MainController.prototype.onOpen_ = function(event) {
    
    this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.opened);

    while(msg = this.delayedMessages.shift()) {
        this.ws_.send(msg);
    }


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
        
       // setInterval(this.d(this.dispatchLocal), 1000, event);
       
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
