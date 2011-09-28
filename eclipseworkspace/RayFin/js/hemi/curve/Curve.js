goog.provide('hemi.curve.Curve');
goog.require('hemi.curve');
goog.require('hemi.utils');


/**
 * @class A Curve is used to represent and calculate different curves
 * including: linear, bezier, cardinal, and cubic hermite.
 * 
 * @param {number[][]} points List of xyz waypoints 
 * @param {number} opt_type Curve type
 * @param {hemi.config} opt_config Configuration object specific to this curve
 */
hemi.curve.Curve = function(points,opt_type,opt_config) {
	this.count = 0;
	this.tension = 0;
	this.type = opt_type;
	this.weights = [];
	this.xpts = [];
	this.xtans = [];
	this.ypts = [];
	this.ytans = [];
	this.zpts = [];
	this.ztans = [];
	
	if (points) {
		opt_config = opt_config || {};
		opt_config.points = points;
		this.loadConfig(opt_config);
	}
};

hemi.curve.Curve.prototype = {
		
	toOctane : function() {
		var names = ['count', 'tension', 'weights', 'xpts', 'xtans', 'ypts',
				'ytans', 'zpts', 'ztans'],
			octane = {
				type: 'hemi.curve.Curve',
				props: []
			};
		
		for (var ndx = 0, len = names.length; ndx < len; ndx++) {
			var name = names[ndx];
			
			octane.props.push({
				name: name,
				val: this[name]
			});
		}
		
		octane.props.push({
			name: 'setType',
			arg: [this.type]
		});
		
		return octane;
	},
	
	loadConfig : function(cfg) {
		var points = cfg.points,
			type = cfg.type || this.type || hemi.curve.curveType.Linear;
		
		this.setType(type);
		
		if (points) {
			this.count = points.length;
			
			for (var i = 0; i < this.count; i++) {
				this.xpts[i] = points[i][0];
				this.ypts[i] = points[i][1];
				this.zpts[i] = points[i][2];
				this.xtans[i] = 0;
				this.ytans[i] = 0;
				this.ztans[i] = 0;
				this.weights[i] = 1;
			}
		}
		
		if (cfg.weights) {
			for (var i = 0; i < this.count; i++) {
				this.weights[i] = (cfg.weights[i] != null) ? cfg.weights[i] : 1;
			}
		}
		
		if (cfg.tangents) {
			for (var i = 0; i < this.count; i++) {
				if(cfg.tangents[i]) {
					this.xtans[i] = cfg.tangents[i][0] || 0;
					this.ytans[i] = cfg.tangents[i][1] || 0;
					this.ztans[i] = cfg.tangents[i][2] || 0;
				}	
			}
		}
		
		if(cfg.tension) {
			this.tension = cfg.tension;
		}
		
		this.setTangents();
	},
	
	/**
	 * Base interpolation function for this curve. Usually overwritten.
	 *
	 * @param {number} t Time, usually between 0 and 1
	 * @return {number[]} The position interpolated from the time input
	 */
	interpolate : function(t) {
		return [t,t,t];
	},

	/**
	 * The linear interpolation moves on a straight line between waypoints.
	 *
	 * @param {number} t Time, usually between 0 and 1
	 * @return {number[]} The position linearly interpolated from the time input
	 */
	linear : function(t) {
		var n = this.count - 1;
		var ndx = Math.floor(t*n);
		if (ndx >= n) ndx = n-1;
		var tt = (t-ndx/n)/((ndx+1)/n-ndx/n);
		var x = (1-tt)*this.xpts[ndx] + tt*this.xpts[ndx+1];
		var y = (1-tt)*this.ypts[ndx] + tt*this.ypts[ndx+1];
		var z = (1-tt)*this.zpts[ndx] + tt*this.zpts[ndx+1];
		return [x,y,z];
	},

	/**
	 * The bezier interpolation starts at the first waypoint, and ends at the
	 *		last waypoint, and 'bends' toward the intermediate points. These
	 *		points can be weighted for more bending.
	 *
	 * @param {number} t Time, usually between 0 and 1
	 * @return {number[]} The position interpolated from the time input by a
	 *		a bezier function.
	 */
	bezier : function(t) {
		var x = 0;
		var y = 0;
		var z = 0;
		var w = 0;
		var n = this.count;
		for(var i = 0; i < n; i++) {
			var fac = this.weights[i]*
			          hemi.utils.choose(n-1,i)*
				      Math.pow(t,i)*
					  Math.pow((1-t),(n-1-i));
			x += fac*this.xpts[i];
			y += fac*this.ypts[i];
			z += fac*this.zpts[i];
			w += fac; 
		}
		return [x/w,y/w,z/w];
	},

	/**
	 * The cubic hermite function interpolates along a line that runs through the Curve
	 *		object's waypoints, at a predefined tangent slope through each one.
	 *
	 * @param {number} t Time, usually between 0 and 1
	 * @return {number[]} The position interpolated from the time input by the cubic 
	 *		hermite function.
	 */		
	cubicHermite : function(t) {
		var n = this.count - 1;
		var ndx = Math.floor(t*n);
		if (ndx >= n) ndx = n-1;
		var tt = (t-ndx/n)/((ndx+1)/n-ndx/n);
		var x = hemi.utils.cubicHermite(tt,this.xpts[ndx],this.xtans[ndx],this.xpts[ndx+1],this.xtans[ndx+1]);
		var y = hemi.utils.cubicHermite(tt,this.ypts[ndx],this.ytans[ndx],this.ypts[ndx+1],this.ytans[ndx+1]);
		var z = hemi.utils.cubicHermite(tt,this.zpts[ndx],this.ztans[ndx],this.zpts[ndx+1],this.ztans[ndx+1]);
		return [x,y,z];
	},
	
	
	
	/**
	 * The normalized linear interpolation moves on a straight line between waypoints,
	 *		at a constant velocity.
	 *
	 * @param {number} t Time, usually between 0 and 1
	 * @return {number[]} The position linearly interpolated from the time input, normalized
	 * 		to keep the velocity constant
	 */
	linearNorm : function(t) {
		var d = 0;
		var dpts = [];
		dpts[0] = 0;
		for(var i = 1; i < this.count; i++) {
			d += hemi.core.math.distance([this.xpts[i-1],this.ypts[i-1],this.zpts[i-1]],
										 [this.xpts[i],this.ypts[i],this.zpts[i]]);
			dpts[i] = d;
		}
		var tt = t*d;
		var ndx = 0;
		for(var i = 0; i < this.count; i++) {
			if(dpts[i] < tt) ndx = i; 
		}
		var lt = (tt - dpts[ndx])/(dpts[ndx+1] - dpts[ndx]);
		var x = (1-lt)*this.xpts[ndx] + lt*this.xpts[ndx+1];
		var y = (1-lt)*this.ypts[ndx] + lt*this.ypts[ndx+1];
		var z = (1-lt)*this.zpts[ndx] + lt*this.zpts[ndx+1];			
		return [x,y,z];
	},
	
	/**
	 * Calculate the tangents for a cardinal curve, which is a cubic hermite curve
	 * 		where the tangents are defined by a single 'tension' factor.
	 */
	setTangents : function() {
		if (this.type == hemi.curve.curveType.Cardinal) {
			var xpts = hemi.utils.clone(this.xpts),
				ypts = hemi.utils.clone(this.ypts),
				zpts = hemi.utils.clone(this.zpts);
			
			// Copy the first and last points in order to calculate tangents
			xpts.unshift(xpts[0]);
			xpts.push(xpts[xpts.length - 1]);
			ypts.unshift(ypts[0]);
			ypts.push(ypts[ypts.length - 1]);
			zpts.unshift(zpts[0]);
			zpts.push(zpts[zpts.length - 1]);
			
			for (var i = 0; i < this.count; i++) {
				this.xtans[i] = (1-this.tension)*(xpts[i+2]-xpts[i])/2;
				this.ytans[i] = (1-this.tension)*(ypts[i+2]-ypts[i])/2;
				this.ztans[i] = (1-this.tension)*(zpts[i+2]-zpts[i])/2;
			}
		}
	},
	
	setType : function(type) {
		this.type = type;
		
		switch (type) {
			case hemi.curve.curveType.Linear:
				this.interpolate = this.linear;
				break;
			case hemi.curve.curveType.Bezier:
				this.interpolate = this.bezier;
				break;
			case hemi.curve.curveType.CubicHermite:
			case hemi.curve.curveType.Cardinal:
				this.interpolate = this.cubicHermite;
				break;
			case hemi.curve.curveType.LinearNorm:
				this.interpolate = this.linearNorm;
				break;
			case hemi.curve.curveType.Custom:
			default:
				break;
		}
	},
	
	getStart : function() {
		return [this.xpts[0],this.ypts[0],this.zpts[0]];
	},
	
	getEnd : function() {
		var end = this.count - 1;
		return [this.xpts[end],this.ypts[end],this.zpts[end]];
	},
	
	draw : function(samples, config) {
		var points = [];
		for (var i = 0; i < samples+2; i++) {
			points[i] = this.interpolate(i/(samples+1));
		}
		hemi.curve.drawCurve(points,config);
		}
		
};