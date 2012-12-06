/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.TestSimulationController');

goog.require('goog.debug.Logger');
goog.require('lgb.events.EventBus');
goog.require('lgb.controller.ControllerBase');

goog.require('lgb.Config');

goog.require('lgb.simulation.controller.MainController'
);
goog.require('lgb.simulation.events.WebSocketConnectionStateEvent');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.SimStateNative');
/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
test.TestSimulationController = function() {

  lgb.controller.ControllerBase.call(this);
  
  lgb.globalEventBus = new lgb.events.EventBus();

  var delegate = jQuery.proxy(this.runAll, this);
  jQuery(document).ready(delegate);
  
};
goog.inherits(test.TestSimulationController, lgb.controller.ControllerBase);




test.TestSimulationController.prototype.runAll = function() {
    
    test("testJquery() Test Jquery", this.testJquery);

    
    asyncTest("testMessages() Connect to Simulation Server", this.testMessages);
   // asyncTest("XML Parse", this.testXmlParse);
    
   // lgb.logInfo('runAll end');
    
};


test.TestSimulationController.prototype.testJquery = function() {
    expect(2);
    equal('1.8.2', $('').jquery, 'jQuery Version');
    equal("Learn Grean Buildings - Demo - v0.11.03", lgb.Config.getTitle(), "Web Page Title Correct")
    
}

test.TestSimulationController.prototype.testMessages = function() {
    
  //expect(8);
    
  that.mainController = new lgb.simulation.controller.MainController();
  ok( that.mainController, 'mainController instantiated');
  
  
  equal(
      that.mainController.getsetSimStateNative(), 
      lgb.simulation.model.WebSocketConnectionState.uninitialized,
      'WebSocketConnectionState.uninitialized'
  );
  
  var expectedMessages = ["Logger::registerMessageCallback\n", "MainController::staticLogger\n"];
  
  
  //var expectedState = lgb.simulation.model.WebSocketConnectionState.connected;
  
  /*
    that.listen (
        lgb.simulation.events.WebSocketConnectionStateEvent.TYPE,
        
            function(event) {

                
                var actualState = event.getPayload();
                lgb.logInfo('WebSocketConnectionStateEvent ' + actualState);
                
               
                 start();        
                ok(event, 'onWebSocketConnectionStateEvent_');
                ok(event.type, "lgb.simulation.events.WebSocketConnectionStateEvent");
                equal(expectedState, actualState, 'expected state: ' + actualState);
                
                if (actualState == lgb.simulation.model.WebSocketConnectionState.opened) {
                     start();
                } else {
                    expectedState = lgb.simulation.model.WebSocketConnectionState.opened;
                }
              
            }
       
    );
    
    */
   
   var msgIdx = 0;
   
   
    that.listen (
        lgb.simulation.events.MessageEvent.TYPE,
        
            function(event) {
                
                start();
                    
                var messageStruct = event.getPayload();              
                ok(
                    messageStruct,  
                    'Event.payload not nmull'
                  );

                
                equal(
                    event.type, 
                    'lgb.simulation.events.MessageEvent', 
                    'Event.type: MessageEvent'
                    )
                    
                
                equal(
                    messageStruct._NAME, 
                    'lgb.simulation.model.voNative.MessageStruct', 
                    'Event.payload.type: MessageStruct: '
                    )
                       
                       
                var expectedText = expectedMessages[msgIdx];
                
                equal(
                    expectedText, 
                    event.getPayload().msgText, 
                    'Event.payload.msgText: ' + messageStruct.msgText
                    )
                    
                
                
                msgIdx++;

                

            }
       
    );
    
    
    
  that.mainController.connect();
  stop();
  
}



test.TestSimulationController.prototype.testXmlParse = function() {
    
  expect(2);  
    
  equal(
      that.mainController.getState(), 
      lgb.simulation.model.WebSocketConnectionState.opened,
      'WebSocketConnectionState.opened'
  );
  

  that.mainController.requestStateChange(
      lgb.simulation.model.voNative.SimStateNative.simStateNative_2_xmlParse_requested
  )
    
  //var expectedState = lgb.simulation.model.WebSocketConnectionState.connected;
  
  //that.mainController
  
  
  
}


