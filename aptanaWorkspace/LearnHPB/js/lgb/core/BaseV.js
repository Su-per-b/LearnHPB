goog.provide('lgb.world.view.BaseV');

goog.require('lgb.core.BaseClass');
goog.require('lgb.utils');


/**
 * MVC View base class
 * @constructor
 * @extends {lgb.core.BaseClass}
 * @param {lgb.core.BaseModel=} dataModel that the view with display.
 */
lgb.world.view.BaseV = function(dataModel, htmlID, parentHtmlID) {
  lgb.core.BaseClass.call(this);


  if (null !== dataModel && undefined !== dataModel) {
    this.dataModel = dataModel;

    //this.changeMap_ = {};

    if (this.onChange && this.dataModel) {
      this.listenHelper_(this.dataModel, e.DataModelChanged, this, this.onChange);
    }

    if (this.onDataModelChanged && this.dataModel) {
      this.listenHelper_(this.dataModel, e.DataModelChanged, this, this.onDataModelChanged);
    }

  }

  if (null == this.disableIDs_ || false == this.disableIDs_) {
    this.setIds_(htmlID, parentHtmlID);
  }


};
goog.inherits(lgb.world.view.BaseV, lgb.core.BaseClass);



lgb.world.view.BaseV.prototype.listenForChangeTargetInit_ = function(eventTarget) {
    this.listenHelper_(eventTarget, e.DataModelChangedEx, this, this.onChangeEx_);
};


lgb.world.view.BaseV.prototype.listenForChange_ = function(changedPropertyString, eventTargetArg) {
    
    
    var eventTarget;
    
    if (null == eventTargetArg) {
       eventTarget = this.dataModel;
    } else {
       eventTarget = eventTargetArg;
    }
    
    
    if (this.changeMap_ === undefined) {
      this.changeMap_ = {};
      this.listenerMap_ = {};
      
      this.listenForChangeTargetInit_(eventTarget);

    }
    

    
    this.listenForOneChange_(changedPropertyString);
};






lgb.world.view.BaseV.prototype.listenForOneChange_ = function(changedPropertyString, eventTarget) {
  
    var handlerName = 'onChange_' + changedPropertyString + '_';
    var func = this[handlerName];

    if (func && func instanceof Function) {
      var delegate = this.d(func);
      this.changeMap_[changedPropertyString] = delegate;
    } else {
      debugger;
    }
};


lgb.world.view.BaseV.prototype.onChangeEx_ = function(event) {
  
   var whatIsDirty = event.payload;
  
    //loop through all the dirty properties and fire their event listeners
   for (var prop in whatIsDirty) {
      
      if(prop !== undefined || prop !== null) {
        
        if(whatIsDirty.hasOwnProperty(prop)){
          
          var delegate = this.changeMap_[prop];
          var arg = whatIsDirty[prop];
          
          if (delegate) {
            delegate(arg);
          }
        }
      }
   }
};






/**
 * appends html to the main element
 * @param {string} html the HTML string to append.
 * @protected
 */
lgb.world.view.BaseV.prototype.append = function(content) {

  var el = this.getMainElement();

  if (!el) {
    debugger;
  }
  
  el.append(content);

};



lgb.world.view.BaseV.prototype.injectInto = function(parentElement) {
  
  if (null == parentElement) {
    debugger;
  } else {
    this.parentElement_ = parentElement;
  }
  
  this.inject();
};



lgb.world.view.BaseV.prototype.inject = function() {

  this.inject_();
};


lgb.world.view.BaseV.prototype.inject_ = function() {

  var el = this.getMainElement();
  
  var parentElement = this.getParentElement();
  
  if (null == parentElement) {
    debugger;
  }
  
  parentElement.append(el);
};



lgb.world.view.BaseV.prototype.makeDiv = function(id) {
  
  var div = $('<div>');
  
  if (id) {
    div.attr('id', id);
  }

  return div;
};


/**
 * makes a unique css ID for a child element
 * @param {!string} id The last part of the CSS ID.
 * @return {string} The generated ID.
 */
lgb.world.view.BaseV.prototype.makeID = function(id) {
  lgb.assert(this.htmlID);
  var newID = '{0}-{1}'.format(this.htmlID, id);
  return newID;
};


lgb.world.view.BaseV.prototype.setMainElement = function(el) {
  this.mainElement_ = el;
};

lgb.world.view.BaseV.prototype.setParentElement = function(parentElement) {
  this.parentElement_ = parentElement;
};


lgb.world.view.BaseV.prototype.setIds_ = function(htmlID, parentHtmlID) {

  this.parentHtmlID = parentHtmlID || 'theBody';
  
  var id;
  if (null == htmlID) {
    id = this.generateHTMLid_();
  }  else {
    id = htmlID;
  }
  
  if (lgb.world.view.BaseV.HTML_IDS.hasOwnProperty(id)) {
    debugger;
  } else {
    lgb.world.view.BaseV.HTML_IDS[id] = true;
    this.htmlID = id;
  }


};


lgb.world.view.BaseV.prototype.generateHTMLid_ = function(id) {
  
    var fullName = this.getFullClassName();
    var fullNameDashes = fullName.split('.').join('-');
    
    if (lgb.world.view.BaseV.HTML_IDS_COUNT.hasOwnProperty(fullNameDashes)) {
      lgb.world.view.BaseV.HTML_IDS_COUNT[fullNameDashes]++;
    } else {
      lgb.world.view.BaseV.HTML_IDS_COUNT[fullNameDashes] = 0;
    }
    
    var count = lgb.world.view.BaseV.HTML_IDS_COUNT[fullNameDashes];
    var htmlID = fullNameDashes + '-' + String(count);  
    
    if (lgb.world.view.BaseV.HTML_IDS.hasOwnProperty(htmlID)) {
      debugger;
    }
    
    return htmlID;  
    
};




lgb.world.view.BaseV.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    this.mainElement_ = $('<div>');
    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }
    
    if (undefined != this.cssClassName_) {
      this.mainElement_.addClass(this.cssClassName_);
    }
  }

  return this.mainElement_;
};


/**
 * converts an id into a Jquery object
 * refers to the parent in the DOM
 * @return {jQuery} Jquery object.
 */
lgb.world.view.BaseV.prototype.getParentElement = function() {

  if (undefined == this.parentElement_) {
    this.parentElement_ = $('#{0}'.format(this.parentHtmlID));
  }

  return this.parentElement_;
};



lgb.world.view.BaseV.prototype.requestDataModelChange = function(property, newValue) {
  var payload = {property:property, newValue:newValue};
  this.triggerLocal(e.RequestDataModelChange, payload);
};



lgb.world.view.BaseV.prototype.getTitle = function() {
  
  var title = this._TITLE || this.getClassName();
  return title;
};


lgb.world.view.BaseV.prototype.getViewPoint = function() {
  
  return null;
};



lgb.world.view.BaseV.HTML_IDS_COUNT = {};
lgb.world.view.BaseV.HTML_IDS_BASE = {};
lgb.world.view.BaseV.HTML_IDS = {};

