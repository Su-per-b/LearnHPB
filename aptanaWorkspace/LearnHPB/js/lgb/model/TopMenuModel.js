/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.TopMenuModel');

goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.TopMenuModel = function() {

  this._TITLE = 'TopMenu';
  this.init_();

};
goog.inherits(lgb.model.TopMenuModel, lgb.model.BaseModel);


/**
 * Sets default properties.
 * @private
 */
lgb.model.TopMenuModel.prototype.init_ = function() {

 
  this.ds = 
  [
                        {
                            text: "Profiles",
                            items: []
                        },
                        {
                            text: "View",
                            encoded: false,
                            items: [
                                { text: "Sub Item 1" },
                                { text: "Sub Item 2" },
                                { text: "Sub Item 3" },
                                { text: "Sub Item 4" }
                            ]
                        }
                    ];
                    
                    
                    
};

