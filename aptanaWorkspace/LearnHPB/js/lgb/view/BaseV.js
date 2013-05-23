goog.provide('lgb.view.BaseV');

goog.require('lgb.BaseClass');
goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.RequestDataModelChange');
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
    
    if (this.onChange && this.dataModel) {
      this.listenHelper_(
        this.dataModel, 
        lgb.events.DataModelChanged.TYPE, 
        this,
        this.onChange);
    }

  }
 
  this.setIds_(htmlID, parentHtmlID);
    
  this.parentElement_ = undefined;
  this.mainElement_ = undefined;
};
goog.inherits(lgb.view.BaseV, lgb.BaseClass);

/**
 * injects html into the DOM
 * @param {string} html the HTML string to append.
 * @protected
 */
lgb.view.BaseV.prototype.append = function(html) {
  
  if (undefined == this.mainElement_) {
    this.mainElement_ = $("<div>").attr("id", this.htmlID);
    this.mainElement_.append(html);
    this.jqParent().append( this.mainElement_);
  } else {
    
    this.mainElement_.append(html);
  }
  

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


lgb.view.BaseV.prototype.makeMainElement_ = function() {
  
    lgb.assert(this.htmlID);
    
    this.mainElement_ = $("<div>").attr("id", this.htmlID);
    this.jqParent().append(this.mainElement_);
    
};



lgb.view.BaseV.prototype.setIds_ = function(htmlID, parentHtmlID) {
    

  this.htmlID = htmlID;
  
  this.parentHtmlID = parentHtmlID || 'theBody';
  
};

lgb.view.BaseV.prototype.generateHtmlID = function() {
    
      
      
      var ary=this._NAME.split(".");
      var len = ary.length;
      var id = ary[len-1];
      
      return id;
}



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






lgb.view.BaseV.prototype.requestDataModelChange = function(propertyName, propertyValue) {
  
  var e = new lgb.events.RequestDataModelChange(
    {name:propertyName, value:propertyValue}
  );

  this.dispatchLocal(e);
  
};



