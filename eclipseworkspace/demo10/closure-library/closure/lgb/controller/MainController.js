goog.provide('lgb.controller.MainController');

goog.require ("lgb.controller.ControllerBase");


console.log("loaded MainController");

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building envelope
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.MainController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		this.camera = null;  //THREE.Camera
		this.scene = null;	 //THREE.Scene
		this.projector = null;	//THREE.Projector
		this.renderer = null;  //THREE.WebGLRenderer
		this.info = null;
		this.mouse = { x: 0, y: 0 };
		
		this.sun = null;
		this.loader = null;
		this.stats = null;

		
		this.meshes = [];
		this.theta = 0;
		this.camdist = 500;
		
		this.totalFaces = 0;
		this.totalColliders = 0;

	};
	
	goog.inherits(lgb.controller.MainController, lgb.controller.ControllerBase);
	
	
	lgb.controller.MainController.prototype.init = function() {
			//this.loaderController = new lgb.controller.LoaderController();
			//this.loaderController.load();
			
			this.load();
			//this.events();	
	};
	
	
	lgb.controller.MainController.prototype.load = function() {
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
			
			this.loadMesh("damper-solo.obj_ascii.js");
			
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
		
			container.onmousemove = this.d(this.onDocumentMouseMove);
			this.animate();
	};
	
	
	
	lgb.controller.MainController.prototype.loadMesh = function(fileName) {


			fileName = "3d-assets/" + fileName;
			
			this.loader.load ( 
				{ 
					model: fileName, 
					callback: this.d(this.onGeometryLoaded)
				} 
			);
			
			
			
			//this.loader.load( { model: "3d-assets/damper-solo.obj.js.js", callback: delegate } );
			//this.loader.load( { model: "3d-assets/damper/horizontal_bar.js", callback: delegate } );
			//this.loader.load( { model: "3d-assets/damper2/horizontal_bar.js", callback: delegate } );
	};
	
	lgb.controller.MainController.prototype.onGeometryLoaded = function(geometry) {
		this.addOneMesh( new THREE.Vector3(	0,	0,	0), geometry );
	};
	
	lgb.controller.MainController.prototype.addOneMesh = function(p, g) {
		this.totalFaces += g.faces.length;
		this.totalColliders++;
	
		var mesh = new THREE.Mesh( g, new THREE.MeshPhongMaterial( { color: 0x003300 } ) );
		
		mesh.position = p;
		this.scene.addObject( mesh );
		
		var mc = THREE.CollisionUtils.MeshColliderWBox(mesh);
		THREE.Collisions.colliders.push( mc );
		this.meshes.push( mesh );
	};
	
	lgb.controller.MainController.prototype.onError = function(msg) {
			alert(msg);
	};
	
	lgb.controller.MainController.prototype.animate = function() {

			var delegate = $.proxy(this.animate, this);
			
			requestAnimationFrame( delegate );
		
			var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5 );
			this.projector.unprojectVector( vector, this.camera );
		
			var ray = new THREE.Ray( this.camera.position, vector.subSelf( this.camera.position ).normalize() );
			
			if (this.meshes.length === 0) {
				return;
			}
			
			var i, l = this.meshes.length;
			
			for ( i = 0; i < l; i++ ) {
				this.meshes[ i ].materials[ 0 ].color.setHex( 0x003300 );
			}
			
			this.info.innerHTML = "";
		
		
			var c = THREE.Collisions.rayCastNearest( ray );
			
			if( c ) {
			
				this.info.innerHTML += "<br />Found @ normal " + this.vts(c.normal);
				
				var poi = ray.origin.clone().addSelf( ray.direction.clone().multiplyScalar(c.distance) );
				line.geometry.vertices[0].position = poi;
				line.geometry.vertices[1].position = poi.clone().addSelf(c.normal.multiplyScalar(100));
				line.geometry.__dirtyVertices = true; 
				line.geometry.__dirtyElements = true;
				
				c.mesh.materials[ 0 ].color.setHex( 0xbb0000 );
		
			} else {
			
				this.info.innerHTML += "<br />No intersection";
		
			}
		
			this.camera.position.x = this.camdist * Math.cos( this.theta );
			this.camera.position.z = this.camdist * Math.sin( this.theta );
			this.camera.position.y = this.camdist/2 * Math.sin( this.theta * 2) ;
		
			this.sun.position.copy( this.camera.position );
			this.sun.position.normalize();
		
			this.theta += 0.005;		
		
			this.renderer.render( this.scene, this.camera );
			
			this.stats.update();
	};
	
	lgb.controller.MainController.prototype.onDocumentMouseMove = function(event) {
				event.preventDefault();	
				this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	};
	
	lgb.controller.MainController.prototype.vts = function(v) {
			if (!v) {
				return "undefined<br>";
			}
			else {
				return v.x.toFixed(2) + " , " + v.y.toFixed(2) + " , " + v.z.toFixed(2) + "<br>";
			}
	};
	
	

		
	return lgb;
	
})(lgb || {});




console.log("parsed MainController");



