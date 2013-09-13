/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 * Rather than create global functions, I put functions in here.
 * Then you can call them like this - lgb.init();
 * simple. no global namespace conflict then.
 */

goog.provide('lgb');

goog.require('goog.debug.Console');
goog.require('goog.debug.LogRecord');
goog.require('goog.debug.Logger.Level');
goog.require('lgb.core.DebugLGB');


/**
 *
 * You need to call this before you can use the logging
 * functions
 */
lgb.init = function() {
  lgb.console = new goog.debug.Console();
  
  var debug = new lgb.core.DebugLGB();
    
  if ( !COMPILED ) {
    debug.tag();
  }
  
  debug.tagEx();
  
  return;
};

lgb.assert = function(obj) {
    
  if (obj === undefined  ) {
    debugger;
    throw "lgb.assert Failed";

  }
};

lgb.selectNone = function(msg, loggerName) {
  
  if (window.getSelection) {
    if (window.getSelection().empty) {  // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {  // Firefox
      window.getSelection().removeAllRanges();
    }
  }
};



  
  
/**
 * @param {string} msg The message that you want to appear in the console.
 * @param {string=} loggerName This will display as a kind of label.
 */
lgb.logInfo = function(msg, loggerName) {
  lgb.logHelper_(msg, loggerName, goog.debug.Logger.Level.INFO);
};


/**
 * @param {string} msg The message that you want to appear in the console.
 * @param {string=} loggerName This will display as a kind of label.
 */
lgb.logWarning = function(msg, loggerName) {
  lgb.logHelper_(msg, loggerName, goog.debug.Logger.Level.WARNING);
};

/**
 * @param {string} msg The message that you want to appear in the console.
 * @param {string=} loggerName This will display as a kind of label.
 */
lgb.logSevere = function(msg, loggerName) {
  lgb.logHelper_(msg, loggerName, goog.debug.Logger.Level.SEVERE);
};


/**
 * @param {string} msg The message that you want to appear in the console.
 * @param {string|undefined} loggerName This will display as a kind of label.
 * @param {goog.debug.Logger.Level} level INFO, WARNING, or SEVERE.
 * @private
 */
lgb.logHelper_ = function(msg, loggerName, level) {

  if (loggerName === undefined) {
  loggerName = 'lgb';
  }

  var logRecord = new goog.debug.LogRecord(level, msg, loggerName);

   lgb.console.addLogRecord(logRecord);
};


/**
 * You can run this to test and see
 * how the goog logging works
 * //TODO (Raj) put this in another test file.
 */
lgb.testDebug = function() {
  var debugConsole;
  var mockConsole;
  var loggerName1;
  var logRecord1;
  var loggerName2;
  var logRecord2;
  var loggerName3;
  var logRecord3;

  debugConsole = new goog.debug.Console();


  // Set up a recorder for mockConsole.log
  //mockConsole = { log: goog.testing.recordFunction() };
  //goog.debug.Console.console_ = mockConsole;

  // Test logger 1.
  loggerName1 = 'this.is.a.logger';
  logRecord1 = new goog.debug.LogRecord(goog.debug.Logger.Level.INFO,
      'this is a statement', loggerName1);

  // Test logger 2.
  loggerName2 = 'name.of.logger';
  logRecord2 = new goog.debug.LogRecord(goog.debug.Logger.Level.WARNING,
      'hey, this is a warning', loggerName2);

  // Test logger 3.
  loggerName3 = 'third.logger';
  logRecord3 = new goog.debug.LogRecord(goog.debug.Logger.Level.SEVERE,
      'seriously, this statement is serious', loggerName3);

  debugConsole.addLogRecord(logRecord1);
  debugConsole.addLogRecord(logRecord2);
  debugConsole.addLogRecord(logRecord3);
  //assertEquals(1, mockConsole.log.getCallCount());
};


/**
 * @param {number} feet The number of feet.
 * @return {number} the number of meters.
 */
lgb.convertFeetToMeters = function(feet) {
  return feet / 3.2808399;
};




