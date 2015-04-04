goog.provide('lgb.integrated.model.unit.UnitBase');




 /**
 * @constructor
 */
lgb.integrated.model.unit.UnitBase = function(  ) {
    
  this.displayUnitSystem_ = lgb.integrated.model.DisplayUnitSystem.getInstance();
};




lgb.integrated.model.unit.UnitBase.prototype.getUnitDisplaySymbol = function() {
  
  var unitVo =  this.getUnitVo();
  return unitVo.symbol;
  
};


lgb.integrated.model.unit.UnitBase.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    this.displayUnitSystem_ = displayUnitSystem;
};



lgb.integrated.model.unit.UnitBase.prototype.convertDisplayToInternalValue = function(internalValue) {
  
    debugger;//must override
  
};


lgb.integrated.model.unit.UnitBase.prototype.convertInternalToDisplayValue = function(internalValue) {
  
    return internalValue;
    //debugger; //must override
};



lgb.integrated.model.unit.UnitBase.prototype.getPropertyDefaults = function() {
    
    debugger; //must override
};


lgb.integrated.model.unit.UnitBase.prototype.getUnitVo = function() {
 
  var intValue = this.displayUnitSystem_.getIntValue();
  var unitList = this.getUnitList_();
  var unitVo =  unitList[intValue];
  
  if (undefined == unitVo) {
      debugger;
  }
  
  return unitVo;
  
};


lgb.integrated.model.unit.UnitBase.prototype.getUnitList_ = function() {
 
    debugger;
  
};

lgb.integrated.model.unit.UnitBase.QUANTITY =  {
    
       LENGTH: {
           name: 'length',
           symbol: 'L',
           description:'In geometric measurements, length is the longest dimension of an object. In the International System of Quantities, length is any quantity with dimension distance.',
           url:'http://en.wikipedia.org/wiki/Length',
           base: true
       },
       MASS: {
           name: 'mass',
           symbol: 'M',
           description:"In physics, mass is a property of a physical body which determines the body's resistance to being accelerated by a force and the strength of its mutual gravitational attraction with other bodies. The SI unit of mass is the kilogram (kg).",
           url:'http://en.wikipedia.org/wiki/Mass',
           base: true
       },
       TIME: {
           name: 'time',
           symbol: 'T',
           description:"Time is the fourth dimension and a measure in which events can be ordered from the past through the present into the future, and also the measure of durations of events and the intervals between them.",
           url:'http://en.wikipedia.org/wiki/Time',
           base: true
       },
       ELECTRIC_CURRENT: {
           name: 'electric current',
           symbol: 'l',
           description:"An electric current is a flow of electric charge. In electric circuits this charge is often carried by moving electrons in a wire. It can also be carried by ions in an electrolyte, or by both ions and electrons such as in a plasma.",
           url:'http://en.wikipedia.org/wiki/Electric_current',
           base: true
       },
       THERMODYNAMIC_TEMPERATURE: {
           name: 'thermodynamic temperature',
           symbol: '&#952;',
           description:"Thermodynamic temperature is the absolute measure of temperature and it is one of the principal parameters of thermodynamics.",
           url:'http://en.wikipedia.org/wiki/Thermodynamic_temperature',
           base: true
       },
       AMOUNT_OF_SUBSTANCE: {
           name: 'amount of substance',
           symbol: 'N',
           description:"Amount of substance is a standards-defined quantity that measures the size of an ensemble of elementary entities, such as atoms, molecules, electrons, and other particles. It is a macroscopic property and it is sometimes referred to as chemical amount. The amount of substance is proportional to the number of elementary entities present.",
           url:'http://en.wikipedia.org/wiki/Amount_of_substance',
           base: true
       },
       LUMINOUS_INTENSITY: {
           name: 'luminous intensity',
           symbol: 'J',
           description:"In photometry, luminous intensity is a measure of the wavelength-weighted power emitted by a light source in a particular direction per unit solid angle, based on the luminosity function, a standardized model of the sensitivity of the human eye.",
           url:'http://en.wikipedia.org/wiki/Luminous_intensity',
           base: true
       },
       
       LUMINOUS_FLUX: {
           name: 'luminous flux',
           symbol: '&#934;v',
           description:'In photometry, luminous flux or luminous power is the measure of the perceived power of light.',
           url:'http://en.wikipedia.org/wiki/Luminous_flux',
           base: false
       },
       POWER: {
           name: 'power',
           symbol: '&#119875;',
           description:'In physics, power is the rate of doing work. It is equivalent to an amount of energy consumed per unit time. In the MKS system, the unit of power is the joule per second (J/s), known as the watt in honor of James Watt, the eighteenth-century developer of the steam engine.',
           url:'http://en.wikipedia.org/wiki/Power_(physics)',
           base: false
       },
       MASS_FLOW_RATE: {
           name: 'mass flow rate',
           symbol: '&#7745;',
           description:'In physics and engineering, mass flow rate is the mass of a substance which passes per unit of time. Its unit is kilogram per second in SI units, and slug per second or pound per second in US customary units.',
           url:'http://en.wikipedia.org/wiki/Mass_flow_rate',
           base: false
       },
       VOLUMETRIC_FLOW_RATE: {
           name: 'volumetric flow rate',
           symbol: '&#119876;',
           description:'In physics and engineering, in particular fluid dynamics and hydrometry, the volumetric flow rate, (also known as volume flow rate, rate of fluid flow or volume velocity) is the volume of fluid which passes per unit time.In physics and engineering, in particular fluid dynamics and hydrometry, the volumetric flow rate, (also known as volume flow rate, rate of fluid flow or volume velocity) is the volume of fluid which passes per unit time.',
           url:'http://en.wikipedia.org/wiki/Volumetric_flow_rate',
           base: false      
       },
       POWER_DENSITY: {
           name: 'power density',
           symbol: 'Pd',
           description:'In physics and engineering, surface power density or sometimes simply specific power is power per unit area.',
           url:'http://en.wikipedia.org/wiki/Surface_power_density',
           base: false
       },
       LIGHTING_POWER_DENSITY: {
           name: 'lighting power density',
           symbol: 'LPD',
           description:'Lighting Power Density (LPD) is a lighting power requirement defined in North America by the American National Standards Institute (ANSI), American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE), and the Illuminating Engineering Society of North America (IESNA) Lighting subcommittee. Lighting Power Density technically represents the load of any lighting equipment in any defined area, or the watts per square foot of the lighting equipment.',
           url:'http://en.wikipedia.org/wiki/Lighting_power_density',
           base: false
       },
       PRESSURE: {
           name: 'pressure',
           symbol: '&#119901;',
           description:'In physics and engineering, surface power density or sometimes simply specific power is power per unit area.',
           url:'http://en.wikipedia.org/wiki/Surface_power_density',
           base: false
       },
       THERMAL_CONDUCTIVITY: {
           name: 'thermal conductivity',
           symbol: '&#119901;',
           description:'In physics and engineering, surface power density or sometimes simply specific power is power per unit area.',
           url:'http://en.wikipedia.org/wiki/Surface_power_density',
           base: false
       },
       NONE: {
           name: 'no quantity',
           symbol: '',
           description:'',
           url:'',
           base: false
       }
    
};


lgb.integrated.model.unit.UnitBase.UNIT =  {
    
    
   SI : {

       WATT: {
           name: 'watt',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.THERMODYNAMIC_TEMPERATURE,
           symbol:'w',
           description:'The watt is a derived unit of power in the International System of Units (SI), named after the Scottish engineer James Watt (1736–1819). The unit is defined as joule per second and can be used to express the rate of energy conversion or transfer with respect to time.',
           url:'http://en.wikipedia.org/wiki/Watt',
           base: false
       },
       KILOGRAMS_PER_SECOND: {
           name: 'kilograms per second',
           symbol:'kg&#8725;s',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.MASS_FLOW_RATE,
           description:''
       },
       CUBIC_METRE_PER_SECOND: {
           name: 'cubic metre per second',
           symbol:'m&#179;&#8725;s',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.VOLUMETRIC_FLOW_RATE,
           description:'(also known as volume flow rate, rate of fluid flow or volume velocity)'
       },
       LUMEN: {
           name: 'lumen',
           symbol:'lm',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.LUMINOUS_FLUX,
           description:''
       },
       WATT_PER_SQUARE_METRE: {
           name: 'watt per square metre',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.SURFACE_POWER_DENSITY,
           symbol:'W&#8725;m&#178;',
           description:''
       },
       METRE: {
           name: 'metre',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.LENGTH,
           symbol:'m',
           description:''
       },
       PASCAL: {
           name: 'pascal',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.PRESSURE,
           symbol:'Pa',
           description:''
       },
       CELSIUS: {
           name: 'celsius',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.THERMODYNAMIC_TEMPERATURE,
           symbol:'&#176;C',
           description:'Celsius, also known as centigrade, is a scale and unit of measurement for temperature. It is named after the Swedish astronomer Anders Celsius (1701–1744), who developed a similar temperature scale. '
       },
       SECOND: {
           name: 'second',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.TIME,
           symbol:'s',
           description:'The second (symbol: s) is the base unit of time in the International System of Units (SI)and is also a unit of time in other systems of measurement (abbreviated s or sec)'
       },
       KELVIN: {
           name: 'kelvin',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.THERMODYNAMIC_TEMPERATURE,
           symbol:'K',
           description:'The kelvin is a unit of measurement for temperature. It is one of the seven base units in the International System of Units (SI)'
       },
       WATT_PER_METER_KELVIN: {
           name: 'watt per meter kelvin',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.THERMAL_CONDUCTIVITY,
           symbol:'W&#8725;&#40;m&#183;K&#41;',
           description:'Watt Per Meter Per Kelvin is a unit in the category of Thermal conductivity. It is also known as watts per meter per kelvin, watt per metre per kelvin, watts per metre per kelvin.'
       }

   },
   IP : {
       FAHRENHEIT: {
           name: 'fahrenheit',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.THERMODYNAMIC_TEMPERATURE,
           symbol:'&#176;F',
           description:'Fahrenheit is a temperature scale based on one proposed in 1724 by the German physicist Daniel Gabriel Fahrenheit (1686–1736), after whom the scale is named.',

           base: false
       },
       FOOT: {
           name: 'foot',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.LENGTH,
           symbol:'ft',
           description:'a unit of length. Since 1960 the term has usually referred to the international foot, defined as being one third of a yard, making it 0.3048 meters exactly. It is an integral part of both the imperial and United States customary systems of units. The foot is subdivided into 12 inches.',
           base: false
       },
       WATT_PER_SQUARE_FOOT: {
           name: 'watt per square foot',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.LIGHTING_POWER_DENSITY,
           symbol:'W&#8725;ft&#178;',
           description:'',
           url:'',
           base: false
       },
       CUBIC_FEET_PER_MINUTE: {
           name: 'cubic feet per minute',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.VOLUMETRIC_FLOW_RATE,
           symbol:'CFM',
           description:'cubic feet per minute is the volumetric flow rate of a gas.',
           url:'http://en.wikipedia.org/wiki/Standard_cubic_feet_per_minute',
           base: false
       }
   },
   MATH : {
       PERCENT_SIGN: {
           name: 'percent sign',
           quantity:lgb.integrated.model.unit.UnitBase.QUANTITY.NONE,
           symbol:'&#37;',
           description:'The percent sign is the symbol used to indicate a percentage, a number or ratio as a fraction of 100.',
           url:'http://en.wikipedia.org/wiki/Percent_sign',
           base: false
       }
   }
    
};


