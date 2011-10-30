goog.provide('lgb');

goog.require('goog.debug.Console');
goog.require('goog.debug.LogRecord');
goog.require('goog.debug.Logger.Level');


lgb.init = function() {
	lgb.console = new goog.debug.Console();
};


/**
 * @param {string} msg
 * @param {string=} loggerName
 */
lgb.logInfo = function(msg, loggerName) {
	lgb.logHelper_(msg, loggerName, goog.debug.Logger.Level.INFO);
};


/**
 * @param {string} msg
 * @param {string=} loggerName
 */
lgb.logWarning = function(msg, loggerName) {
	lgb.logHelper_(msg, loggerName, goog.debug.Logger.Level.WARNING);
};

/**
 * @param {string} msg
 * @param {string=} loggerName
 */
lgb.logSevere = function(msg, loggerName) {
	lgb.logHelper_(msg, loggerName, goog.debug.Logger.Level.SEVERE);
};


/**
 * @param {string} msg
 * @param {string|undefined} loggerName
 * @param {goog.debug.Logger.Level} level
 */
lgb.logHelper_ = function(msg, loggerName, level) {

	if (loggerName === undefined) {
		loggerName = 'lgb';
	}

	var logRecord = new goog.debug.LogRecord(level, msg, loggerName);

	 lgb.console.addLogRecord(logRecord);
};

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
