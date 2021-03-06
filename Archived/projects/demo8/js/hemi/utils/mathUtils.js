/* 
 * Kuda includes a library and editor for authoring interactive 3D content for the web.
 * Copyright (C) 2011 SRI International.
 *
 * This program is free software; you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation; either 
 * version 2 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program; 
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, 
 * Boston, MA 02110-1301 USA.
 */

var hemi = (function(hemi) {
	hemi.utils = hemi.utils || {};
	
	/** 
	 * General function to convert from cartesian to spherical coordinates.
	 *
	 * @param {float[3]} coords XYZ cartesian coordinates
	 * @return {float[3]} Radius, Theta, Phi
	 */
	hemi.utils.cartesianToSpherical = function(coords) {
		var x = coords[0];
		var y = coords[1];
		var z = coords[2];
		var r = Math.sqrt(x*x + y*y + z*z);
		var theta = Math.acos(y/r);
		var phi = Math.atan2(x,z);
		return [r,theta,phi];	
	};
	
	/** 
	 * A choose function (also called the binomial coefficient).
	 *
	 * @param {number} n top input of choose
	 * @param {number} m bottom input of choose
	 * @return {number} choose output, (n!)/(m!*(n-m)!)
	 */
	hemi.utils.choose = function(n, m) {
		return hemi.utils.factorial(n, (n-m)+1) / hemi.utils.factorial(m);
	};
	
	/** 
	 * Clamp the given value between the given min and max.
	 *
	 * @param {number} val value to clamp
	 * @param {number} min minimum for value
	 * @param {number} max maximum for value
	 * @return {number} the clamped value
	 */
	hemi.utils.clamp = function(val, min, max) {
		return Math.min(max, Math.max(min, val));
	};

	/**
	 * Calculate the cubic hermite interpolation between two points with
	 * associated tangents.
	 *
	 * @param {float} t time (between 0 and 1)
	 * @param {float[3]} p0 the first waypoint
	 * @param {float[3]} m0 the tangent through the first waypoint
	 * @param {float[3]} p1 the second waypoint
	 * @param {float[3]} m1 the tangent through the second waypoint
	 * @return {float[3]} the interpolated point
	 */
	hemi.utils.cubicHermite = function(t,p0,m0,p1,m1) {;
		var t2 = t*t,
			t3 = t2*t,
			tp0 = 2*t3 - 3*t2 + 1,
			tm0 = t3 - 2*t2 + t,
			tp1 = -2*t3 + 3*t2,
			tm1 = t3 - t2;
		
		return tp0*p0 + tm0*m0 + tp1*p1 + tm1*m1;
	};
	
	/**
	 * Calculate the factorial of the given number.
	 *
	 * @param {number} num number to factorialize
	 * @param {number} opt_stop optional number to stop the factorial at (if it
	 *     should be stopped before 1
	 * @return {number} (num!) or (num! - opt_stop!)
	 */
	hemi.utils.factorial = function(num, opt_stop) {
		var f = 1,
			x = opt_stop ? opt_stop : 2;
		
		while (x <= num) {
			f *= x++;
		}
		
		return f;
	};
	
	/**
	 * Calculate the intersection between a ray and a plane.
	 * 
	 * @param {o3d.Ray} ray Ray described by a near xyz point and a far xyz point
	 * @param {float[][]} plane Array of 3 xyz coordinates defining a plane
	 * @return {float[]} Array [t: Time value on ray, u: U-coordinate on plane,
	 *		v: V-coordinate on plane} of intersection point
	 */
	hemi.utils.intersect = function(ray, plane) {
		var P = plane,
			R = [ray.near,ray.far],
			A = hemi.core.math.inverse(
			[[R[0][0]-R[1][0],P[1][0]-P[0][0],P[2][0]-P[0][0]],
			 [R[0][1]-R[1][1],P[1][1]-P[0][1],P[2][1]-P[0][1]],
			 [R[0][2]-R[1][2],P[1][2]-P[0][2],P[2][2]-P[0][2]]]),
			B = [R[0][0]-P[0][0],R[0][1]-P[0][1],R[0][2]-P[0][2]],
			t = A[0][0]*B[0] + A[0][1]*B[1] + A[0][2]*B[2],
			u = A[1][0]*B[0] + A[1][1]*B[1] + A[1][2]*B[2],
			v = A[2][0]*B[0] + A[2][1]*B[1] + A[2][2]*B[2];
		
		return [t,u,v];
	};
	
	/**
	 * Convert the given linear interpolated value to a sinusoidal interpolated
	 * value.
	 * 
	 * @param {number} val the linear value
	 * @return {number} the sinusoidal value
	 */
	hemi.utils.linearToSine = function(val) {
		return (Math.sin(Math.PI * val - Math.PI / 2) + 1) / 2;
	};
	
	/**
	 * Convert the given linear interpolated value to a parabolic interpolated
	 * value.
	 * 
	 * @param {number} val the linear value
	 * @return {number} the parabolic value
	 */
	hemi.utils.linearToParabolic = function(val) {
		return val * val;
	};
	
	/**
	 * Convert the given linear interpolated value to a inverse parabolic
	 * interpolated value.
	 * 
	 * @param {number} val the linear value
	 * @return {number} the inverse parabolic value
	 */
	hemi.utils.linearToParabolicInverse = function(val) {
		return 1 - (1 - val) * (1 - val);
	};
	
	/**
	 * Convert the given linear interpolated value to an exponential
	 * interpolated value.
	 * 
	 * @param {number} val the linear value
	 * @param {number} x the exponent to use
	 * @return {number} the exponential value
	 */
	hemi.utils.linearToExponential = function(val, x) {
		return (Math.pow(x, val) - 1) / (x - 1);
	};
	
	/**
	 * Convert the given linear interpolated value to an inverse exponential
	 * interpolated value.
	 * 
	 * @param {number} val the linear value
	 * @param {number} x the exponent to use
	 * @return {number} the inverse exponential value
	 */
	hemi.utils.linearToExponentialInverse = function(val, x) {
		return 1 - hemi.utils.linearToExponential(1 - val, x);
	};
	
	/**
	 * A container for all the common penner easing equations - 
	 * 		linear
	 *		quadratic 
	 *		cubic
	 *		quartic
	 *		quintic
	 *		exponential
	 *		sinusoidal
	 *		circular
	 */
	hemi.utils.penner = {
	
		linearTween : function (t, b, c, d) {
			return c*t/d + b;
		},
		
		easeInQuad : function (t, b, c, d) {
			t /= d;
			return c*t*t + b;
		},
		
		easeOutQuad : function (t, b, c, d) {
			t /= d;
			return -c * t*(t-2) + b;
		},
		
		easeInOutQuad : function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		},
	
		easeInCubic : function (t, b, c, d) {
			t /= d;
			return c*t*t*t + b;
		},
		
		easeOutCubic : function (t, b, c, d) {
			t /= d;
			t--;
			return c*(t*t*t + 1) + b;
		},
		
		easeInOutCubic : function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t*t + b;
			t -= 2;
			return c/2*(t*t*t + 2) + b;
		},
		
		easeInQuart : function (t, b, c, d) {
			t /= d;
			return c*t*t*t*t + b;
		},
		
		easeOutQuart : function (t, b, c, d) {
			t /= d;
			t--;
			return -c * (t*t*t*t - 1) + b;
		},
		
		easeInOutQuart : function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t*t*t + b;
			t -= 2;
			return -c/2 * (t*t*t*t - 2) + b;
		},
		
		easeInQuint : function (t, b, c, d) {
			t /= d;
			return c*t*t*t*t*t + b;
		},
		
		easeOutQuint : function (t, b, c, d) {
			t /= d;
			t--;
			return c*(t*t*t*t*t + 1) + b;
		},
		
		easeInOutQuint : function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t*t*t*t + b;
			t -= 2;
			return c/2*(t*t*t*t*t + 2) + b;
		},
		
		easeInSine : function (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		
		easeOutSine : function (t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		
		easeInOutSine : function (t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		
		easeInExpo : function (t, b, c, d) {
			return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
		},
		
		easeOutExpo : function (t, b, c, d) {
			return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
		},
		
		easeInOutExpo : function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
			t--;
			return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
		},
		
		easeInCirc : function (t, b, c, d) {
			t /= d;
			return -c * (Math.sqrt(1 - t*t) - 1) + b;
		},
		
		easeOutCirc : function (t, b, c, d) {
			t /= d;
			t--;
			return c * Math.sqrt(1 - t*t) + b;
		},
		
		easeInOutCirc : function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			t -= 2;
			return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
		}

	};
	
	hemi.utils.sphericalToCartesian = function(coords) {
		var r = coords[0];
		var t = coords[1];
		var p = coords[2];
		return [r*Math.sin(t)*Math.cos(p),	// x
				r*Math.sin(t)*Math.sin(p),  // y
				r*Math.cos(t)];				// z
	};
	
	/**
	 * Convert the given UV coordinates for the given plane into XYZ coordinates
	 * in 3D space.
	 * 
	 * @param {number[]} uv uv coordinates on a plane
	 * @param {number[][]} plane array of 3 xyz coordinates defining the plane
	 * @return {number[]} xyz coordinates of the uv location on the plane
	 */
	hemi.utils.uvToXYZ = function(uv, plane) {
		var hMath = hemi.core.math,
			uf = hMath.mulScalarVector(uv[0], hMath.subVector(plane[1], plane[0])),
			vf = hMath.mulScalarVector(uv[1], hMath.subVector(plane[2], plane[0]));
			pos = hMath.addVector(plane[0], hMath.addVector(uf, vf));
		return pos;
	};
	
	/**
	 * Calculate the screen coordinates from a 3d position in the world.
	 * @param {float[3]} p XYZ point to calculate from
	 * @return {float[2]} XY screen position of point
	 */
	hemi.utils.worldToScreen = function(p0) {
		var VM = hemi.view.viewInfo.drawContext.view,
			PM = hemi.view.viewInfo.drawContext.projection,
			w = hemi.view.clientSize.width,
			h = hemi.view.clientSize.height,
			m4 = hemi.core.math.matrix4,
			v = m4.transformPoint(VM,p0),
			z = v[2],
			p = m4.transformPoint(PM, v);
		
		if (z > 0) {
			p[0] = -p[0];
			p[1] = -p[1];
		}
		var x = (p[0]+1.0)*0.5*w;
		var y = (-p[1]+1.0)*0.5*h;
		return [Math.round(x),Math.round(y)];
	};
	
	/**
	 * Calculate the screen coordinates from a 3d position in the world.
	 * @param {float[3]} p XYZ point to calculate from
	 * @return {float[3]} XY screen position of point, plus z-distance,
	 *		where 0.0 = near clip and 1.0 = flar clip
	 */
	hemi.utils.worldToScreenFloat = function(p0) {
		var VM = hemi.view.viewInfo.drawContext.view,
			PM = hemi.view.viewInfo.drawContext.projection,
			w = hemi.view.clientSize.width,
			h = hemi.view.clientSize.height,
			m4 = hemi.core.math.matrix4,
			v = m4.transformPoint(VM,p0),
			z = v[2],
			p = m4.transformPoint(PM, v);
		
		if (z > 0) {
			p[0] = -p[0];
			p[1] = -p[1];
		}
		var x = (p[0]+1.0)*0.5*w;
		var y = (-p[1]+1.0)*0.5*h;
		return [x,y,p[2]];
	};
	
	return hemi;
})(hemi || {});
