goog.provide('lgb.view.ParticleWrapper');

goog.require ("lgb.view.ViewBase");




/**
 * MVC View 
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.ParticleWrapper = function(vertex) {
	
	/*
	 * type: THREE.Vertex
	 */
	this.vertex = vertex;
	

};



goog.inherits(lgb.view.ParticleWrapper, lgb.view.ViewBase);





