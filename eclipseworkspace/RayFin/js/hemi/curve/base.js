goog.provide('hemi.curve');


/**
 * Generate a random point within a bounding box
 *
 * @param {number[]} min Minimum point of the bounding box
 * @param {number[]} max Maximum point of the bounding box
 * @return {number[]} Randomly generated point
 */
hemi.curve.randomPoint = function(min,max) {
	var xi = Math.random();
	var yi = Math.random();
	var zi = Math.random();
	var x = xi*min[0] + (1-xi)*max[0];
	var y = yi*min[1] + (1-yi)*max[1];
	var z = zi*min[2] + (1-zi)*max[2];
	return [x,y,z];
};
	
	

/**
	 * Enum for different curve types, described below.
	 * <ul><pre>
	 * <li>hemi.curve.curveType.Linear
	 * <li>hemi.curve.curveType.Bezier
	 * <li>hemi.curve.curveType.CubicHermite
	 * <li>hemi.curve.curveType.LinearNorm
	 * <li>hemi.curve.curveType.Cardinal
	 * <li>hemi.curve.curveType.Custom
	 * </ul></pre>
	 */
hemi.curve.curveType = {
	Linear : 0,
	Bezier : 1,
	CubicHermite : 2,
	LinearNorm : 3,
	Cardinal : 4,
	Custom : 5
};

/**
 * Predefined values for common shapes.
 * <ul><pre>
 * <li>hemi.curve.ShapeType.CUBE
 * <li>hemi.curve.ShapeType.SPHERE
 * <li>hemi.curve.ShapeType.ARROW
 * </ul></pre>
 */
hemi.curve.ShapeType = {
	CUBE : 'cube',
	SPHERE : 'sphere',
	ARROW : 'arrow'
};


