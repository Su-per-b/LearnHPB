goog.provide('lgb.controller.ControllerBase');

goog.require ("lgb.Base");

console.log("loaded ControllerBase");

var lgb = (function(lgb) {


	lgb.controller = lgb.controller || {};
	
	lgb.controller.ControllerBase = function() {
		//lgb.Base.call(this);
	};
	
	//goog.inherits(lgb.controller.ControllerBase, lgb.Base);


	lgb.controller.ControllerBase.prototype.d = function(theFunction) {
				var delegate = $.proxy(theFunction, this);
				return delegate;
	}

		/*
	lgb.controller.ControllerBase.prototype = {
		
	
		loadxx : function() {

			var container = document.createElement( 'div' );
			document.body.appendChild( container );
			
			this.info = document.getElementById("info");
			
			this.camera = new THREE.Camera( 2, window.innerWidth / window.innerHeight, 1, 10000 );
			this.camera.position.z = this.camdist;
			
			this.loader = new THREE.JSONLoader(  );
			this.scene = new THREE.Scene();
			this.projector = new THREE.Projector();
		
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			
			container.appendChild( this.renderer.domElement );
			
			var ambientLight = new THREE.AmbientLight( 0x606060 );
			this.scene.addLight( ambientLight );
		
			this.sun = new THREE.DirectionalLight( 0xffffff );
			this.sun.position = this.camera.position.clone();
			this.scene.addLight( this.sun );
			
			this.loadMesh();
			
			var lineMat = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1, linewidth: 3 } );
			
			var geom = new THREE.Geometry();
			geom.vertices.push( new THREE.Vertex( new THREE.Vector3(-100, 0, 0) ) );
			geom.vertices.push( new THREE.Vertex( new THREE.Vector3( 100, 0, 0) ) );
			
			line = new THREE.Line(geom, lineMat);
			this.scene.addObject( line );
		
			this.stats = new Stats();
			this.stats.domElement.style.position = 'absolute';
			this.stats.domElement.style.top = '0px';
			container.appendChild( this.stats.domElement );
		
			var delegate2 = $.proxy(this.onDocumentMouseMove, this);
		
			container.onmousemove = delegate2;
			this.animate();
	
		}
		
	};
	


		*/
		
	return lgb;
	
})(lgb || {});



console.log("parsed ControllerBase");

