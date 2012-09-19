/* Converted from: RecessedFlourescentGrid3.blend
 *
 * File generated with Blender 2.58 Exporter
 * https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender/
 *
 * objects: 2
 * geometries: 2
 * materials:  0
 * textures:   0
 */

var scene = {

"type" : "scene",
"urlBaseType" : "relativeToScene",

"appData" :
{
  
      "gridRecessed" : {
        "position"  : [ 0, 0, 0 ],
        "columnCount"  : 12,
        "rowCount" : 8,
        "width":38.10004729626849,
        "depth" : 23.75
        
      },
      "gridPendant" : {
        "position"  : [ 0, -.4, 0 ],
        "columnCount"  : 10,
        "rowCount" : 5,
        "width": 38.10004729626849,
        "depth" : 24.0
      }
},

"objects" :
{
  
    "recessed" : {
        "geometry"  : "geomRecessed",
        "groups"    : [ "recessed" ],
        "materials" : [ "Default", "Interior", "Interior_Body", "black" ],
        "position"  : [ 0, 0, 0 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "pendant" : {
        "geometry"  : "geomPendant",
        "groups"    : ["pendant" ],
        "materials" : [ "grey", "white", "center"],
        "position"  : [ 0, 0, 0 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    }
    
    
},


"geometries" :
{
    "geomRecessed" : {
        "type" : "bin_mesh",
        "url"  : "RecessedLight.obj.js"
    },
    
    "geomPendant" : {
        "type" : "bin_mesh",
        "url"  : "PendantLight.obj.js"
    }
    
},


"transform" :
{
    "position"  : [ 0.000000, 0.000000, 0.000000 ],
    "rotation"  : [ -1.570796, 0.000000, 0.000000 ],
    "scale"     : [ 1.000000, 1.000000, 1.000000 ]
},

"defaults" :
{
    "bgcolor" : [ 0.000000, 0.000000, 0.000000 ],
    "bgalpha" : 1.000000,
    "camera"  : ""
}

}

postMessage( scene );
close();
