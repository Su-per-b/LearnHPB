/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.SysVar');
goog.require('lgb.model.ModelBase');

/**
 * @constructor
 * @extends lgb.model.ModelBase
 * @param {Node} node  Used to construct this object.
 */
lgb.model.scenario.SysVar = function(node) {

   /**@const */
  this._NAME = 'lgb.model.scenario.SysVar';

  lgb.model.ModelBase.call(this);
  this.name = '';
  this.displayName = '';
  this.description = '';
  this.index = 0;
  this.lowValue = 0;
  this.highValue = 0;
  this.initialValue = 0;
  this.ioType = '';
  this.viewType = '';
  this.unitSI = '';
  this.SItoIP = '';
  this.unitIP = '';
  this.disabled = false;
  this.isFault = false;
  this.faultWidgetType = 'SLIDER';
  this.faultIsActive = false;
  this.leftLabel = '';
  this.rightLabel = '';
  this.zonePosition = '';
  this.isPercentage = true;


  this.parse(node);

  /** @type {number} */
  this.idx = 0;


};
goog.inherits(lgb.model.scenario.SysVar, lgb.model.ModelBase);


/**
 * @param {Node} node Used to construct this object.
 */
lgb.model.scenario.SysVar.prototype.parse = function(node) {


  //  var childNodes = xmlParser.currentNode.childNodes;

    var y = node.childNodes.length;

    while (y--) {
    var child = node.childNodes[y];

    if (child.nodeType != 1) continue;

    var type = child.getAttribute('type'),
    name = child.nodeName,
    content = child.textContent;



      this.setValue(name, type, content);
    }
};


/**
 * Converts an xml to a value in a JS variable
 * does casting
 * populates the properties of this object
 * @param {string} name The name of the node <tag name="{name}">.
 * @param {string} type The data type.
 * @param {string} content The inner content of the tag.
 */
lgb.model.scenario.SysVar.prototype.setValue = function(name, type, content) {
    //throw ("Test");
    var theValue; // = content;

    switch (type) {
      case 'Integer' : {
        theValue = parseInt(content, 10);
        break;
      }
      case 'Boolean' : {
        content = content.toLowerCase();

        if (content === 'true') {
          theValue = true;
        } else if (content === 'false') {
          theValue = false;
        } else {
          throw Error('Boolean conversion failed when parsing ' +
          'xml: string value "{0}" could not be converted'.format(content));
        }
        break;
      }
      case 'Float' : {
        theValue = parseFloat(content);
        break;
      }
      case 'String' : {
        theValue = String(content);
        break;
      }
    }

    this[name] = theValue;
};
