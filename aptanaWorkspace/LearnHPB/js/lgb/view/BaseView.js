goog.provide('lgb.view.BaseView');

goog.require('lgb.BaseClass');


goog.require('lgb.utils');

/**
 * MVC View base class
 * @constructor
 * @extends {lgb.BaseClass}
 * @param {lgb.model.BaseModel=} dataModel that the view with display.
 */
lgb.view.BaseView = function(dataModel, htmlID, parentHtmlID) {
  lgb.BaseClass.call(this);

  if (null !== dataModel && undefined !== dataModel) {
    this.dataModel = dataModel;
    this.listenForChange_();
  }
 
  this.setIds_(htmlID, parentHtmlID);
    
  this.parentElement_ = undefined;
  this.mainElement_ = undefined;
};
goog.inherits(lgb.view.BaseView, lgb.BaseClass);

/**
 * injects html into the DOM
 * @param {string} html the HTML string to append.
 * @protected
 */
lgb.view.BaseView.prototype.append = function(html) {
  this.jqParent().append(html);
};

/**
 * makes a unique css ID for a child element
 * @param {!string} id The last part of the CSS ID.
 * @return {string} The generated ID.
 */
lgb.view.BaseView.prototype.makeID = function(id) {
  var newID = '{0}-{1}'.format(this.htmlID, id);
  return newID;
};


lgb.view.BaseView.prototype.makeMainDiv = function() {
    
    var mainDiv = $("<div>")
                        .attr("id", this.htmlID);
                        
    this.jqParent().append(mainDiv);
    
    return mainDiv;

};



lgb.view.BaseView.prototype.setIds_ = function(htmlID, parentHtmlID) {
    

  this.htmlID = htmlID || 'undefined-BaseView'
  this.parentHtmlID = parentHtmlID || 'theBody';
  
};



/**
 * converts and id into a Jquery element
 * @param {string=} id The css id.
 * @return {jQuery} Element.
 */
lgb.view.BaseView.prototype.jq = function(id) {

  var cssID = id || this.htmlID;
  
  var selector = '#{0}'.format(cssID);
  var jqElement = $(selector);

  return jqElement;
};


lgb.view.BaseView.prototype.jqMain = function() {
  
  if (undefined == this.mainElement_) {
    this.mainElement_ = $('#{0}'.format(this.mainElement_));
  }
  
  return this.mainElement_;
  
};


/**
 * converts an id into a Jquery object
 * refers to the parent in the DOM
 * @return {jQuery} Jquery object.
 */
lgb.view.BaseView.prototype.jqParent = function() {
    
  if (undefined == this.parentElement_) {
    this.parentElement_ = $('#{0}'.format(this.parentHtmlID));
  }
  
  return this.parentElement_;
};




lgb.view.BaseView.prototype.requestDataModelChange = function(propertyName, propertyValue) {
  


  var payload = {name:propertyName, value:propertyValue};
  
  this.triggerLocal(e.RequestDataModelChange, payload);
  

};



/**
 * Binds an event listener to handle when the MVC data model changes.
 * @protected
 */
lgb.view.BaseView.prototype.listenForChange_ = function() {

  this.listenHelper_(this.dataModel, e.DataModelChanged, this, this.onChange);

};

