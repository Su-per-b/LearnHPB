/* Converted from: RecessedFlourescentGrid1.blend
 *
 * File generated with Blender 2.58 Exporter
 * https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender/
 *
 * objects:    1
 * geometries: 1
 * materials:  4
 * textures:   0
 */

var scene = {

"type" : "scene",
"urlBaseType" : "relativeToScene",


"objects" :
{
    "RecessedFlourescentGr" : {
        "geometry"  : "geo_RecessedFlourescentGr",
        "groups"    : [  ],
        "materials" : [ "Default", "Interior", "Interior Body", "black" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
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
    "geo_RecessedFlourescentGr" : {
        "type" : "ascii_mesh",
        "url"  : "RecessedFlourescentGrid1.RecessedFlourescentGr.js"
    }
},


"materials" :
{
    "black" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 0, "opacity": 1 }
    },

    "Default" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13158600, "opacity": 1 }
    },

    "Interior" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 14342623, "opacity": 1 }
    },

    "Interior Body" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 14023418, "opacity": 1 }
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
