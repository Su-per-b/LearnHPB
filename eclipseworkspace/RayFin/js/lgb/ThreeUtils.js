goog.provide('lgb.ThreeUtils');

/**
 * @namespace
 */
//console.log("loaded Config");

	lgb.ThreeUtils = function() {

	};


	lgb.ThreeUtils.convertGroupHashToMeshHash = function(groupHash) {
		var meshHash = {};
		
		for (key in groupHash) {
			var theGroup = groupHash[key];
			var mesh = lgb.ThreeUtils.convertGroupToOneMesh (theGroup);
			//meshList.append(mesh);
			meshHash[key] = mesh;
			mesh.geometry.computeBoundingBox();
		}
		
	
		
		return meshHash;
	};
	
	lgb.ThreeUtils.convertGroupToOneMesh = function(group) {
		
		var geom = new THREE.Geometry();

		
		var l = group.length;
		for (var i=0; i < l; i++) {
		//	group[i].bakeTransformsIntoGeometry();
			THREE.GeometryUtils.merge(geom, group[i]);
		};
		
		var newMesh = new THREE.Mesh(geom, new THREE.MeshFaceMaterial());
		return newMesh;
	};
	
	
	lgb.ThreeUtils.convertGroupContainer = function(group) {
		
		var container = new THREE.Object3D();
		
		var l = group.length;
		for (var i=0; i < l; i++) {
			container.add(group[i]);
		};
		
		return container;
		
		
	};







