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

/**
 * This is a simple hello world, showing how to set up a simple world, 
 *		load a model, and set the camera to a viewpoint once the model
 *		has loaded.
 */

 
var progressbar = new Progressbar();

		

o3djs.require('o3djs.util');

function init(clientElements) {
	

			
	hext.utils.debug.init();
	
	progressbar.init("Loading Geometry");
	progressbar.show();
			
	/**
	 * It is possible to have multiple clients (i.e. multiple frames
	 * 		rendering 3d content) on one page that would have to be
	 * 		initialized. In this case, we only want to initialize the
	 *		first one.
	 */
	hemi.core.init(clientElements[0]);
			
	/**
	 * Set the background color to a light-bluish. The parameter is in
	 * 		the form [red,blue,green,alpha], with each value on a 
	 *		scale of 0-1.
	 */
	hemi.view.setBGColor([0.7, 0.8, 1, 1]);
	
	/**
	 * Set a prefix for the loader that will allow us to load assets as if
	 * the helloWorld.html file was in the root directory.
	 */
	hemi.loader.loadPath = '../../';
	
	createWorld();
}

function createWorld() {


	this.subscriberOnLoad = hemi.world.subscribe (
	  hemi.msg.progress,
	  onProgress
	);
	
	var delegate = jQuery.proxy( this.onProgress2, this );
	o3djs.io.loadTextFileProgressCallback = delegate;
	
	/**
	 * When we call the world's 'ready' function, it will wait for the model
	 *		to finish loading and then it will send out a Ready message.
	 *		Here we register a handler, setupScene(), to be run when the
	 *		message is sent.
	 */
	hemi.world.subscribe(hemi.msg.ready,
		function(msg) {
			setupScene();
		});
	
	
	/**
	 * hemi.world is the default world created to manage all of our models,
	 *		cameras, effects, etc. When we set the model's file name, it
	 *		will begin loading that file.
	 */
	var house = new hemi.model.Model();				// Create a new Model
	house.setFileName('assets/LightingHouse_v082/scene.json'); // Set the model file
	
	
	
	hemi.world.ready();   // Indicate that we are ready to start our script
}

function onProgress (event) {


};

function onProgress2 (event) {
	var percent = event.loaded / event.total * 100;
	
	progressbar.onProgress(percent);
	console.log('onProgress event.data.percent: ' + percent);

};



function setupScene() {
	
	progressbar.hide();
	
	var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
	vp.eye = [-4,507,1435];					// Set viewpoint eye
	vp.target = [5,154,26];					// Set viewpoint target

	/**
	 * Move the camera from it's default position (eye : [0,0,-1],
	 *		target : [0,0,0]} to the new viewpoint, and take 120
	 *		render cycles (~2 seconds) to do so.
	 */
	hemi.world.camera.moveToView(vp,120);
	hemi.world.camera.enableControl();	// Enable camera mouse control
}

jQuery(window).load(function() {
	o3djs.webgl.makeClients(init);
});

jQuery(window).unload(function() {
	if (hemi.core.client) {
		hemi.core.client.cleanup();
	}
});


/**
* this hack overwrites the function defined in the file io.js
 */
o3djs.io.loadTextFile = function(url, callback) {
  o3djs.BROWSER_ONLY = true;

  var error = 'loadTextFile failed to load url "' + url + '"';
  var request;
  if (!o3djs.base.IsMSIE() && window.XMLHttpRequest) {
    request = new XMLHttpRequest();
    if (request.overrideMimeType) {
      request.overrideMimeType('text/plain');
    }
  } else if (window.ActiveXObject) {
    request = new ActiveXObject('MSXML2.XMLHTTP.3.0');
  } else {
    throw 'XMLHttpRequest is disabled';
  }
  
  var loadInfo = o3djs.io.createLoadInfo(request, false);
  request.open('GET', url, true);
  var finish = function() {
  //	var rdy = request.readyState;
	//console.log ('request.readyState ' + request.readyState);
	
	//request.readyState
	//0 = open has not yet been called
	//1 = send has not yet been called but open has been called
	//2 = send has been called but no response from server
	//3 = data is in the process of being received from the server
	//4 = response from server has arrived

    if (request.readyState == 4) {
      var text = '';
      // HTTP reports success with a 200 status. The file protocol reports
      // success with zero. HTTP does not use zero as a status code (they
      // start at 100).
      // https://developer.mozilla.org/En/Using_XMLHttpRequest
      var success = request.status == 200 || request.status == 0;
      if (success) {
        text = request.responseText;
      }
      loadInfo.finish();
      callback(text, success ? null : 'could not load: ' + url);
    } else if (request.readyState == 3) {
		//request.
		var r = request;
		
	}
  };
  
  
 //  TODO:(raj dye)  this is an event handler that I added which actual gets updates
 // but is not yet fully integrated into the framework
//  var progress  = function (event) {
//  	//var r = event;
//	var percent = event.loaded / event.total
//	this.loadTextFileProgressCallback.call(percent);
//	
//	console.log ('loaded: ' + event.loaded + ' / total:'+ event.total);
//  };
  
  request.onreadystatechange = finish;
  request.onprogress  = this.loadTextFileProgressCallback;
  request.send(null);
  return loadInfo;
};



