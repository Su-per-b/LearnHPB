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
	
	o3djs.require('hemi.core');
	o3djs.require('o3djs.util');


	var unit11 = unit11 || {};
	var unitTest11 = unitTest11 || {};

	
	unit11.start = function(onUnitCompleteCallback) {
		unit11.onUnitCompleteCallback = onUnitCompleteCallback;
		unitTest11.callBack = unit11.step_2;
		
		var desc = 'Loads a model and then clones it 4 times.  It then translates the location of 4 of the boxes' +
		' we end up with 5 boxes lined up next to each other.  The cloning that I implemented here ' +
		'has a lot of problems with it.  It receives the JSON file from the browser cache ' +
		're-parses it creating all the materials, shapes and transforms all over again. ' +
		'this results in significant inefficiencies in memory and CPU usage';
		
		jqUnit.module('UNIT 11', desc); 

		jqUnit.test("Load model", unitTest11.init);
		jqUnit.stop();
	};
	
	unit11.step_2 = function() {
		jqUnit.start();
		unitTest11.callBack = unit11.end;
		jqUnit.test("Clone Model", unitTest11.start);
		jqUnit.stop();
	};
	
	unit11.end = function() {
		jqUnit.start();
		//hemi.view.removeRenderListener(unitTest11);
		unit11.onUnitCompleteCallback.call();
	};
	
	unit11.cleanup = function() {
		unitTest11.model1.cleanup();
	};
	

	unitTest11.init = function()   {
		jqUnit.expect(1);
		
		unitTest11.model1 = new hemi.model.Model();				// Create a new Model
		jqMock.assertThat(unitTest11.model1 , is.instanceOf(hemi.model.Model));
		
		unitTest11.model1.setFileName('Box_from_rhino/scene.json'); // Set the model file
		
		var subscription = unitTest11.model1.subscribe (
			hemi.msg.load,
			function() {
				unitTest11.model1.unsubscribe(subscription, hemi.msg.load);
				unitTest11.callBack.call();
			}
		);
		
		hemi.world.ready();   // Indicate that we are ready to start our script
	};
	
	unitTest11.onCloneComplete = function(){
		
		//unitTest11.model2 = theModel;
		//unitTest11.model1.transform.translate(500,0,0);
		unitTest11.numberOfClonesCreated++;
		
		if (unitTest11.numberOfClonesCreated > 3) {
		
			unitTest11.model2.root.translate(5,0,0);
			unitTest11.model3.root.translate(10,0,0);
			unitTest11.model4.root.translate(15,0,0);
			unitTest11.model5.root.translate(20,0,0);
			
			unitTest11.callBack.call();
		}

	};
	
	
	unitTest11.start = function() {
		
		hemi.model.Model.prototype.clone = function(onCloneComplete) {
			
			var newModel = new hemi.model.Model();
			newModel.fileName = this.fileName;

			var subscription = newModel.subscribe (
				hemi.msg.load,
				function() {
					newModel.unsubscribe(subscription, hemi.msg.load);
					onCloneComplete.call();
				}
			);	
			
			newModel.load();
			

			return newModel;
		};
		
		
		

		unitTest11.numberOfClonesCreated = 0;
		
		unitTest11.model2 = unitTest11.model1.clone(unitTest11.onCloneComplete);
		unitTest11.model3 = unitTest11.model1.clone(unitTest11.onCloneComplete);
		unitTest11.model4 = unitTest11.model1.clone(unitTest11.onCloneComplete);
		unitTest11.model5 = unitTest11.model1.clone(unitTest11.onCloneComplete);
		
		
		hemi.world.camera.enableControl();	// Enable camera mouse control


		var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
		vp.eye = [10,10,20];					// Set viewpoint eye
		vp.target = [10,0,0];					// Set viewpoint target
		
		hemi.world.camera.moveToView(vp,30);
		//unitTest11.callBack.call();
	};
	






	
	
