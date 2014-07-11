goog.provide('lgb.simulation.model.voNative.TypeSpecReal');

goog.require('lgb.simulation.model.BaseModel');


 /**
 * @constructor
 */
lgb.simulation.model.voNative.TypeSpecReal = function() {

  this.start = 0.0;
  this.nominal = 0.0;
  this.min = 0.0;
  this.max = 0.0;

  this.startValueStatus = 1;
  this.nominalValueStatus = 1;
  this.minValueStatus = 1;
  this.maxValueStatus = 1;
  
  this.unit = "";
  this.unitValueStatus = 1;
  lgb.simulation.model.BaseModel.call(this);
};
goog.inherits(lgb.simulation.model.voNative.TypeSpecReal, lgb.simulation.model.BaseModel);



lgb.simulation.model.voNative.TypeSpecReal.fieldPrimitivesEx_ = {
   start: "start",
   nominal: "nominal",
   min: "min",
   max: "max",
   unit: "unit"
};


