goog.provide('lgb.view.ParticlePath');

goog.require ("lgb.view.ViewBase");




/**
 * MVC View 
 * @constructor
 * @extends lgb.view.ViewBase
 */
lgb.view.ParticlePath = function(curve) {
	lgb.view.ViewBase.call(this);
	
	this.curve = curve;
	this.frameToPositionMap = [];
	this.vertices = [];
	this.currentFrameNumber = 0;
	this.visibleLine = null;
};



goog.inherits(lgb.view.ParticlePath, lgb.view.ViewBase);




lgb.view.ParticlePath.prototype.addPoint = function(point) {

	this.frameToPositionMap.push(point);
	
};

lgb.view.ParticlePath.prototype.assignVertex = function(vertex) {

	this.vertices.push(vertex);
	
};
lgb.view.ParticlePath.prototype.show = function(vertex) {


		var lineBasicMaterial = new THREE.LineBasicMaterial( 
			{ color: 0xff0000, opacity: 1, linewidth: 3 } 
		);
	

    	var vertices = []
    	
    	var i = this.frameToPositionMap.length;
		while(i--) {
		 	var position = this.frameToPositionMap[i];

		 	var vector3 = new THREE.Vector3(position[0], position[1], position[2]);
		 	var vertex = new THREE.Vertex(vector3);
		 	
		 	vertices.push(vertex);
		}
		
		 var geometry = new THREE.Geometry();
    	 geometry.vertices = vertices;
    	 
    	 this.visibleLine = new THREE.Line(geometry, lineBasicMaterial);
    	 
		var event = new lgb.event.MeshLoadedEvent(this.visibleLine);
		this.dispatch(event);
	
};

/*

lgb.view.ParticlePath.prototype.goToFrame = function(frameNumber) {
	
	var pos = this.frameToPositionMap[frameNumber];
	this.vertices[0].position.x = pos[0];
	this.vertices[0].position.y = pos[1];
	this.vertices[0].position.z = pos[2];
	
	
};
*/
lgb.view.ParticlePath.prototype.init = function() {
	
	this.framesBetweenLaunches = this.frameToPositionMap.length / this.vertices.length;
	
}

lgb.view.ParticlePath.prototype.nextFrame = function() {
	
	var pos = this.frameToPositionMap[this.currentFrameNumber];
	
	
	this.vertices[0].position.x = pos[0];
	this.vertices[0].position.y = pos[1];
	this.vertices[0].position.z = pos[2];
	
	this.currentFrameNumber++;
	if (this.currentFrameNumber > this.frameToPositionMap.length-1) {
		this.currentFrameNumber = 0;
	}
	
};

	
	






