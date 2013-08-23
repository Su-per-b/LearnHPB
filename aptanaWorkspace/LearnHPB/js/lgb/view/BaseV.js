goog.provide('lgb.view.BaseV');

goog.require('lgb.BaseClass');
goog.require('lgb.utils');


/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseClass}
 * @param {lgb.model.BaseModel=} dataModel that the view with display.
 */
lgb.view.BaseV = function(dataModel, htmlID, parentHtmlID) {
  lgb.BaseClass.call(this);

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

  this.setIds_(htmlID, parentHtmlID);

};
goog.inherits(lgb.view.BaseV, lgb.BaseClass);



lgb.view.BaseV.prototype.listenForChangeTargetInit_ = function(eventTarget) {
    this.listenHelper_(eventTarget, e.DataModelChangedEx, this, this.onChangeEx_);
};


lgb.view.BaseV.prototype.listenForChange_ = function(changedPropertyString, eventTargetArg) {
    
    if (this.changeMap_ === undefined) {
      this.changeMap_ = {};
      this.listenerMap_ = {};
      this.listenForChangeTargetInit_(this.dataModel);
    }
    
    var eventTarget;
    
    if (null == eventTargetArg) {
       eventTarget = this.dataModel;
    } else {
       eventTarget = eventTargetArg;
    }
    
    this.listenForOneChange_(changedPropertyString);
};




lgb.view.BaseV.prototype.listenForOneChange_ = function(changedPropertyString, eventTarget) {
  
    var handlerName = 'onChange_' + changedPropertyString + '_';
    var func = this[handlerName];

    if (func && func instanceof Function) {
      var delegate = this.d(func);
      this.changeMap_[changedPropertyString] = delegate;
    } else {
      debugger;
    }
};


lgb.view.BaseV.prototype.onChangeEx_ = function(event) {
  
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
lgb.view.BaseV.prototype.append = function(html) {

  var el = this.getMainElement();

  if (!el) {
    debugger;
    return;
  }
  el.append(html);

};


lgb.view.BaseV.prototype.inject = function(parentElement) {

  var el = this.getMainElement();


  if (null != parentElement) {
    this.parentElement_ = parentElement;
  }

  this.jqParent().append(el);
};


lgb.view.BaseV.prototype.makeDiv = function(id) {
  
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
lgb.view.BaseV.prototype.makeID = function(id) {
  lgb.assert(this.htmlID);
  var newID = '{0}-{1}'.format(this.htmlID, id);
  return newID;
};


lgb.view.BaseV.prototype.setMainElement = function(el) {

  this.mainElement_ = el;

  return;
};


lgb.view.BaseV.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    this.mainElement_ = this.makeDiv(this.htmlID);
  }

  return this.mainElement_;
};


lgb.view.BaseV.prototype.setIds_ = function(htmlID, parentHtmlID) {

  this.parentHtmlID = parentHtmlID || 'theBody';
  
  if (null == htmlID) {
    this.generateHTMLid_();
  } else {
    
    if (lgb.view.BaseV.HTML_IDS.hasOwnProperty(htmlID)) {
      debugger;
    } else {
      
      lgb.view.BaseV.HTML_IDS[htmlID] = true;
      
      if (lgb.view.BaseV.HTML_IDS_COUNT.hasOwnProperty(htmlID)) {
        debugger;
      } else {
        lgb.view.BaseV.HTML_IDS_COUNT[htmlID] = 0;
      }
    }
    
    this.htmlID = htmlID;
  }
  


};


lgb.view.BaseV.prototype.generateHTMLid_ = function(id) {
  
    var fullName = this.getFullClassName();
    var fullNameDashes = name.split('.').join('-');
    
    if (lgb.view.BaseV.HTML_IDS_COUNT.hasOwnProperty(fullNameDashes)) {
      lgb.view.BaseV.HTML_IDS_COUNT[fullNameDashes]++;
    } else {
      lgb.view.BaseV.HTML_IDS_COUNT[fullNameDashes] = 0;
    }
    
    var count = lgb.view.BaseV.HTML_IDS_COUNT[fullNameDashes];
    
    this.htmlID = fullNameDashes + '-' + String(count);  
    
};


/**
 * converts and id into a Jquery element
 * @param {string=} id The css id.
 * @return {jQuery} Element.
 */
lgb.view.BaseV.prototype.jq = function(id) {

  if (undefined == id) {
    lgb.assert(this.htmlID);
    id = this.htmlID;
  }

  var cssID = id;
  var selector = '#{0}'.format(cssID);
  var jqElement = $(selector);

  return jqElement;
};


/**
 * converts an id into a Jquery object
 * refers to the parent in the DOM
 * @return {jQuery} Jquery object.
 */
lgb.view.BaseV.prototype.jqParent = function() {

  if (undefined == this.parentElement_) {
    this.parentElement_ = $('#{0}'.format(this.parentHtmlID));
  }

  return this.parentElement_;
};


lgb.view.BaseV.prototype.requestDataModelChange = function(property, newValue) {
  var payload = {property:property, newValue:newValue};
  this.triggerLocal(e.RequestDataModelChange, payload);
};




lgb.view.BaseV.prototype.getTitle = function() {
  
  var title = this._TITLE || this.getClassName();
  
  return title;
};


lgb.view.BaseV.HTML_IDS_COUNT = {};

lgb.view.BaseV.HTML_IDS = {};

