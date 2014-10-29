/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.simulation.controller.MainController');

goog.require('se.Event');

goog.require('lgb.core.BaseController');
goog.require('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.model.MainModel');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.model.WebSocketConnectionStateRequest');
goog.require('lgb.simulation.model.voNative.ScalarValueRealStruct');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.model.voManaged.SessionControl');

goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.ScalarValueChangeRequest');
goog.require('lgb.simulation.events.ResultEventList');
goog.require('lgb.simulation.events.ResultEvent');
goog.require('lgb.simulation.events.SessionControlEvent');
goog.require('lgb.simulation.model.DisplayUnitSystem');




/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgb.simulation.controller.MainController = function() {
    
    lgb.core.BaseController.call(this);


};
goog.inherits(lgb.simulation.controller.MainController, lgb.core.BaseController);


/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.controller.MainController.prototype.init = function() {


    this.jsonController_ = lgb.simulation.controller.JsonController.getInstance();
    
    //var test = new lgb.simulation.controller.JsonController();
    
    this.dataModel = new lgb.simulation.model.MainModel();


    this.delayedMessages = [];
    this.resultEventQueue_ = [];
    this.resultEventQueueIsDirty_ = false;
    this.resultEventQueueIntervalMS_ = 1000; //ms
    this.clearResultEventQueueDelegate_ = this.d(this.clearResultEventqueue_),
    this.resultEventQueueIntervalHandle_ = null;
    
    this.bind_();
    this.setRemoteHost_();

};

lgb.simulation.controller.MainController.prototype.setRemoteHost_ = function() {
  
  var url = $.url(); // parse the current page URL
  var server = url.param('server');
  
  if (server) {
    
    this.socketServerHost = server;
    
  } else {
    
    switch(lgb.core.Config.SOCKET_SERVER_HOST) {
      
      case lgb.core.Config.SOCKET_SERVER.AutoConfig :
      
        url = String (window.location);
        console.log('window.location: '+ url);
        
        var hostname = url.split('/')[2];
        console.log('hostname: '+ hostname);
        
        this.socketServerHost = hostname.split(':')[0];
        console.log('this.socketServerHost: '+ this.socketServerHost);
        break;
        
      case lgb.core.Config.SOCKET_SERVER.Pfalco :
        this.socketServerHost = 'learnhpb.straylightsim.com';
        break;
        
      case lgb.core.Config.SOCKET_SERVER.PfalcoLocal :
        this.socketServerHost = '192.168.0.15';
        break;
        
      case lgb.core.Config.SOCKET_SERVER.LocalHost :
        this.socketServerHost = '127.0.0.1';
        break;
        
      case lgb.core.Config.SOCKET_SERVER.Cube :
        this.socketServerHost = 'cube.straylightsim.com';
        break;
    }
    
  }
  

    this.trigger(se.SetRemoteHost, this.socketServerHost);

    this.trigger(e.SimulationEngineLoaded, this);
  
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
    
    this.listen (
        se.SetRemoteHost,
        this.onSetRemoteHost_
    );


    this.listen (
        se.WebSocketChangeRequest,
        this.onWebSocketChangeRequest_
    );
    
    this.listen (
        se.SimStateNativeRequest,
        this.onSimStateNativeRequest_
    );
    
    
    this.listen (
        e.DisplayUnitSystemChangeRequest,
        this.onDisplayUnitSystemChangeRequest_
    );
    

    
   // this.listenForChange_('scalarValueResults');



    
    
};



lgb.simulation.controller.MainController.prototype.onDisplayUnitSystemChangeRequest_ = function(event) {
  
    this.dataModel.updateDisplayUnitSystem(event.payload);
    
};



// lgb.simulation.controller.MainController.prototype.onChange_scalarValueResults_ = function(scalarValueResults) {
//   
  // this.xmlParsedInfo = xmlParsedInfo;
//   
// };



lgb.simulation.controller.MainController.prototype.onWebSocketChangeRequest_ = function(event) {
  
  this.requestWebSocketStateChange(event.payload);
  
};



lgb.simulation.controller.MainController.prototype.onSimStateNativeRequest_ = function(event) {
  
  var simStateNative = event.getPayload();
  this.requestSimStateChange(simStateNative);
  
};





lgb.simulation.controller.MainController.prototype.attachToSession = function(sessionID) {
  
  var payload = new lgb.simulation.model.voManaged.SessionControl(0,sessionID);
  var event = new lgb.simulation.events.SessionControlEvent(payload);
  
  this.serializeAndSend(event);
  
  
};

lgb.simulation.controller.MainController.prototype.getInfo = function() {
  
  var payload = new lgb.simulation.model.voManaged.SessionControl(1, 0);
  var event = new lgb.simulation.events.SessionControlEvent(payload);
  
  this.serializeAndSend(event);
  
  
};




lgb.simulation.controller.MainController.prototype.onSetRemoteHost_ = function(event) {
  
  this.dataModel.init(event.payload);
  
};


lgb.simulation.controller.MainController.prototype.getDataModel = function() {
  return this.dataModel;
};




lgb.simulation.controller.MainController.prototype.onRequestModelicaVariableChange_ = function(event) {
  
  if (undefined === event.payload.modName) {
    debugger;
  }
  
  
  var theVar = this.dataModel.getIdxFromModelicaName(event.payload.modName);
  
  if (undefined === theVar) {
    //debugger;
  } else {
    
    var floatValue = event.payload.value;
    var idx = theVar.idx;
    
    var scalarValueReal = new lgb.simulation.model.voManaged.ScalarValueReal(idx, floatValue);
    var collection = new lgb.simulation.model.voManaged.ScalarValueCollection([scalarValueReal], []);
    
    var event = new lgb.simulation.events.ScalarValueChangeRequest(collection);
    this.serializeAndSend(event);
  
  }
 
};


    
lgb.simulation.controller.MainController.prototype.onSimStateNativeNotify_ = function(event) {
  
  var simStateNativeWrapper = event.getPayload();
  
  this.dataModel.changePropertyEx('simStateNative', simStateNativeWrapper);
  this.dispatch(event);
  
  var theInt = simStateNativeWrapper.getIntValue();
  var theString = simStateNativeWrapper.getString();
  
  //fix for init_completed not reported
  if (theInt ==  9) { //init_completed
    
   // var x= 0;
    
    this.trigger(e.SimulationInitialized, simStateNativeWrapper);
    // return;
  }
  
  
  return;
  
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

  this.resultEventQueue_.push(event);
  
  if (null == this.resultEventQueueIntervalHandle_) {
      this.resultEventQueueIntervalHandle_ = setInterval(
        this.clearResultEventQueueDelegate_,this.resultEventQueueInterval_);
  }

};


lgb.simulation.controller.MainController.prototype.clearResultEventqueue_ = function() {
  
  var eventCount = this.resultEventQueue_.length;
  
  if (0 == eventCount) {
    
    window.clearInterval(this.resultEventQueueIntervalHandle_);
    this.resultEventQueueIntervalHandle_ = null;
    
  } else {
    
    var resultEventList = new lgb.simulation.events.ResultEventList(this.resultEventQueue_);
    var p = resultEventList.getPayload();
    
    var mostRecent_ResultEvent = this.resultEventQueue_[eventCount-1];
    var mostRecent_ScalarValueResults = mostRecent_ResultEvent.getPayload();
    this.resultEventQueue_ = [];
    
    //this.dataModel.setScalarValueResults(mostRecent_ScalarValueResults);
    this.dispatch(resultEventList);
  }
        
             
};




lgb.simulation.controller.MainController.prototype.onMessageEvent_ = function(event) {
  this.dataModel.changePropertyEx('messageStruct', event.getPayload());
  this.dispatch(event);
};



lgb.simulation.controller.MainController.prototype.getWebSocketConnectionState = function() {
    return this.dataModel.getWebSocketConnectionState();
};


lgb.simulation.controller.MainController.prototype.getSimStateNative = function() {
    return this.dataModel.getSimStateNative();
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
      
      if (window.MozWebSocket) {
          this.ws_ = new window.MozWebSocket(this.dataModel.socketServerURL);
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
      
      this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.open_requested);
      
    } else {
      
      this.ws_.close();
      this.dataModel.setWebSocketConnectionState(lgb.simulation.model.WebSocketConnectionState.closed);
    }

};

lgb.simulation.controller.MainController.prototype.serializeAndSend = function(event) {


    var jsonString = lgb.simulation.controller.JsonController.serialize(event);
      
      
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

    //while(msg = this.delayedMessages.shift()) {
   //   //  this.ws_.send(msg);
    //}


};

/**
 * Handler used for websocket communication
 * @private
 */
lgb.simulation.controller.MainController.prototype.onMessage_ = function(event) {

    if (event.data) {
        var jsonString = event.data;
        //console.log("SimulationController.onMessage_() - " + jsonString);

        var event = this.jsonController_.deserialize(jsonString);
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
