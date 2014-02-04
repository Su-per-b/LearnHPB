/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.simulation.TestSimulationController');

goog.require('goog.debug.Logger');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.BaseController');

goog.require('lgb.core.Config');

goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.simulation.events.WebSocketConnectionStateEvent');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.SimStateNative');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
test.simulation.TestSimulationController = function() {

  lgb.core.BaseController.call(this);
  
  lgb.globalEventBus = new lgb.core.EventBus();

  var delegate = jQuery.proxy(this.runAll, this);
  jQuery(document).ready(delegate);
  
};
goog.inherits(test.simulation.TestSimulationController , lgb.core.BaseController);




test.simulation.TestSimulationController .prototype.runAll = function() {
    
    test("testJquery() Test Jquery", this.testJquery);
    
    asyncTest("asyncTest()", this.asyncTest);
    asyncTest("testWebSocketConnect() Connect to WebSocket", this.testWebSocketOpen);
    asyncTest("testConnect() Connect to Simulation Server", this.testConnect);
    
    asyncTest("testStep() Connect to Simulation Server and step through", this.testConnect);
    
    
    
   // asyncTest("XML Parse", this.testXmlParse);
   // lgb.logInfo('runAll end');
    
};


test.simulation.TestSimulationController.prototype.testJquery = function() {
    expect(2);
    
    var jqueryVersion = $('').jquery;
    equal('1.8.2', jqueryVersion , 'jQuery Version');
    
    var pageTitle = $( 'title' ).text();
    equal("Test Simulation", pageTitle, "Web Page Title Correct");
    
};

test.simulation.TestSimulationController.prototype.asyncTest = function() {
   expect( 1 );
 
  setTimeout(function() {
    ok( true, "Passed and ready to resume!" );
    start();
  }, 1000);
  
   
};


test.simulation.TestSimulationController.prototype.testWebSocketOpen = function() {
    
  expect(5);
    
  that.mainController = new lgb.simulation.controller.MainController();
  ok( that.mainController, 'mainController instantiated');
  
  that.trigger(se.SetRemoteHost, "127.0.0.1");
  
  
  var dataModel = that.mainController.getDataModel();
  var state = dataModel.getSimStateNative();
  var state2 = that.mainController.getSimStateNative();
  
  
  equal(state,
      lgb.simulation.model.WebSocketConnectionState.uninitialized,
      'WebSocketConnectionState.uninitialized'
  );
  


    that.listenOnce (
        se.WebSocketChangeNotify,
        function(event) {
             
            var webSocketState = event.getPayload();              

            equal (
                event.type, 
                "lgb.simulation.events.WebSocketChangeNotify", 
                'Event.type: SimStateNativeNotify'
              );
                
            
              
            start();
        }
    );
    
    


    that.listenOnce (
        se.SimStateNativeNotify,
        function(event) {
             
            var theState = event.getPayload();              

            equal (
                event.type, 
                "lgb.simulation.events.SimStateNativeNotify", 
                'Event.type: SimStateNativeNotify'
              );
                
            
            equal (
                theState, 
                lgb.simulation.model.voNative.SimStateNative.simStateNative_0_uninitialized, 
                'SimStateNativeNotify: simStateNative_0_uninitialized:'
              );
              
            start();
        }
    );
    
    
    
    
    
  that.mainController.connect(true);

  
};



test.simulation.TestSimulationController.prototype.testConnect = function() {
    
  expect(3);  
    
  var webSocketConnectionState = that.mainController.getWebSocketConnectionState();
  
  equal (
      webSocketConnectionState, 
      lgb.simulation.model.WebSocketConnectionState.opened,
      'WebSocketConnectionState.opened'
  );
  
  
  
    that.listenOnce (
        se.SimStateNativeNotify,
        function(event) {
             
            var theState = event.getPayload();              

            equal (
                event.type, 
                "lgb.simulation.events.SimStateNativeNotify", 
                'Event.type: SimStateNativeNotify'
              );
                
            
            equal (
                theState, 
                lgb.simulation.model.voNative.SimStateNative.simStateNative_1_connect_completed, 
                'SimStateNativeNotify: simStateNative_1_connect_completed:'
              );
              
            start();
        }
    );
  

  that.mainController.requestSimStateChange (
      lgb.simulation.model.voNative.SimStateNative.simStateNative_1_connect_requested
  );
  
};


test.simulation.TestSimulationController.prototype.testWebSocketClose = function() {
    
  expect(3);  
    
  var webSocketConnectionState = that.mainController.getWebSocketConnectionState();
  
  equal (
      webSocketConnectionState, 
      lgb.simulation.model.WebSocketConnectionState.opened,
      'WebSocketConnectionState.opened'
  );
  
  
  
    that.listenOnce (
        se.SimStateNativeNotify,
        function(event) {
             
            var theState = event.getPayload();              

            equal (
                event.type, 
                "lgb.simulation.events.SimStateNativeNotify", 
                'Event.type: SimStateNativeNotify'
              );
                
            
            equal (
                theState, 
                lgb.simulation.model.voNative.SimStateNative.simStateNative_1_connect_completed, 
                'SimStateNativeNotify: simStateNative_1_connect_completed:'
              );
              
            start();
        }
    );
  

  that.mainController.requestSimStateChange (
      lgb.simulation.model.voNative.SimStateNative.simStateNative_1_connect_requested
  );
  
};

