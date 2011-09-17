/* File API HTML5 *******************************/
var fileAPI = function(){
	//Hidden canvas
	var hiddenCanvas = document.getElementById("hidden");
	var hiddenContext = hiddenCanvas.getContext('2d');
	
	//Three.js vars
	var stats, drop;
	
	//Scene vars
	var camera, scene, renderer;
	
	//Screen details
	var threeWidth = 500;
	var threeHeight = 500;
	
	//Half screen details
	var halfThreeWidth = threeWidth / 2;
	var halfThreeHeight = threeHeight / 2;
	
	//Mouse position
	var mouseX = mouseY = 0;
	
	//Particles
	var particles, particle, r, g, b, avg, hex;
	
	//Camera adjust
	var cam;
	
	return {
		init: function(){
			//Add events
			this.events();
			
			//Init particle array 
			particles = [];
			
			//(Field of vision, Aspect ratio, nearest point, farest point) 
			camera = new THREE.Camera(75, threeWidth / threeHeight, 1, 10000);
			
			//Set the cameras position
			camera.position.x = 20;
			camera.position.y = 0;
			camera.position.z = 0;
			
			//User adjust camer position?
			cam = {
				camX: false,
				camZ: false
			}
			
			//Create a new scene
			scene = new THREE.Scene();
			
			//Create a new renderer
			renderer = new THREE.CanvasRenderer();
			//Set the render size to size of the browser
			renderer.setSize(threeWidth, threeHeight);
			renderer.domElement.id = "render";
			
			//Add the rendered view to the body
			document.body.appendChild(renderer.domElement);
			
			//Log the stats
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.id = 'stats';
			stats.domElement.style.top = '0';
			stats.domElement.style.right = '16px';
			document.body.appendChild(stats.domElement);
		},
		events: function(){
			drop = document.getElementById('render');
			document.body.addEventListener("dragenter", this.dragEnter, false);
			document.body.addEventListener("dragexit", this.dragExit, false);
			document.body.addEventListener("dragover", this.dragOver, false);
			document.body.addEventListener("drop", this.drop, false);
			
			document.addEventListener('mousemove', this.mousemove, false);
		},
		mousemove: function(e){
			//X position = current mouse - half width
			mouseX = e.clientX - halfThreeWidth;
			mouseY = e.clientY - halfThreeHeight;
		},
		//Just to stop default action
		dragEnter: function(e){e.stopPropagation(); e.preventDefault();},
		dragExit: function(e){e.stopPropagation(); e.preventDefault();},
		dragOver: function(e){e.stopPropagation(); e.preventDefault();},
		drop: function(e){
			var file = e.dataTransfer.files;
			var filelength = file.length;
			
			//Only do something if exactly 1 file has been dropped
			if(filelength === 1){
				fileAPI.fileData(file);
			} else {
				//Incorrect message here
			}
			
			e.stopPropagation();
			e.preventDefault();
		},
		fileData: function(filedata){
			//console.info("fileData");
			var file = filedata[0];
			
			//New File API
			var reader = new FileReader();
			//Attach load end events
			reader.onloadend = this.readerLoadEnd;
			//Read the file
			reader.readAsDataURL(file);
		},
		readerLoadEnd: function(e){
			var filedata = e.target.result;
			
			var img = new Image();
			img.src = filedata;
			
			//Make sure image is loaded before doing anything with it (nasty JS errors)
			img.onload = function(){
				hiddenCanvas.width = this.width;
				hiddenCanvas.height = this.height;
				hiddenContext.drawImage(img, 0, 0);
				var canvasImageData = hiddenContext.getImageData(0, 0, this.width, this.height);
				fileAPI.imageArray(canvasImageData, this.width, this.height);
			}
		},
		imageArray: function(pixelData, width, height){
			var raw = pixelData.data;
			var halfHeight = height/2;
			var halfWidth = width/2;
			
			//Top to bottom
			for(var j = 0; j < height; j++){
				//Left to right
				for(var i = 0; i < width; i++){
				//Look for our individual pixel info (Times 4 due to RGBA)
					if(i%2){continue;}
					var index = (j * 4) * width + (i * 4);
					r = raw[index];
					g = raw[index+1];
					b = raw[index+2];
					avg = ((r + g + b)/3) * 0.2;
					hex = "0x" + fileAPI.toHex(r, g, b);
					
					particle = particles[i] = new THREE.Particle(new THREE.ParticleCircleMaterial( hex, 1 ));
					particle.position.x = j - halfHeight;
					particle.position.y = avg;
					particle.position.z = i - halfWidth;
				
					particle.scale.x = particle.scale.y = 0.8;
					scene.addObject(particle);
				}
			}
		},
		toHex: function(r, g, b){
			var hex = "";
			for(var i = 0; i < arguments.length; i++){
				var arg = arguments[i];
				if (arg === null){hex += "00";}
				arg = parseInt(arg);
				if (arg === 0 || isNaN(arg)){hex += "00";}
				//Restrict the range and round
				arg = Math.round(Math.max(0, Math.min(arg, 255)));
				hex += "0123456789ABCDEF".charAt((arg - arg%16)/16) + "0123456789ABCDEF".charAt(arg%16);
			}
			return hex;
		},
		cameraAdjust: function(axis){
			switch(axis){
				case "x":
					cam.camX = cam.camX ? false : true;
					break;
				case "z":
					cam.camZ = cam.camZ ? false : true;
					break;
			}
		},
		loop: function(){
			var time = new Date().getTime() * 0.0009;
			
			//Auto rotate the y-axis
			camera.position.y = Math.sin( 0.3 * time) *  150;
			
			//Set camera position depending on the mouse position
			if(cam.camX){camera.position.x += (mouseX - camera.position.x) * 0.05;}
			if(cam.camZ){camera.position.z += (-mouseY - camera.position.z) * 0.05;}
			
			//Render the scene with the scene and camera
			renderer.render(scene, camera);
			//Update the stats
			stats.update();
		}
	}
}();

fileAPI.init();
setInterval(fileAPI.loop, 1000 / 40);

jQuery(function($){
	$("#xdir").click(function(e){
		if($(this).is(":checked")){
			fileAPI.cameraAdjust("x");
		} else {
			fileAPI.cameraAdjust("x");
		}
	});
	
	$("#zdir").click(function(e){
		if($(this).is(":checked")){
			fileAPI.cameraAdjust("z");
		} else {
			fileAPI.cameraAdjust("z");
		}
	});
});