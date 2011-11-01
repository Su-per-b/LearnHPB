/* Converted from: ductwork102611.blend
 *
 * File generated with Blender 2.58 Exporter
 * https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender/
 *
 * objects:    1
 * geometries: 1
 * materials:  19
 * textures:   0
 */

var scene = {

"type" : "scene",
"urlBaseType" : "relativeToScene",


"objects" :
{
    "ductwork102611" : {
        "geometry"  : "geo_ductwork102611",
        "groups"    : [  ],
        "materials" : [ "Default", "DefaultVent", "Ductwork", "VAVCoilFins", "VAVControlBox", "VAVDiffuser", "VAVDiffuserCut", "VAVHeatingCoils", "VAVHydraulic", "VAVLever", "VAVLink", "VAVLinkHinge", "VAVPaddle", "VAVPaddleAxle", "VAVPiston", "VAVPistonHinge", "VAVWireGold", "VAVWireGreen", "VAVWireRed" ],
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
    "geo_ductwork102611" : {
        "type" : "ascii_mesh",
        "url"  : "ductwork102611.scene2.ductwork102611.js"
    }
},


"materials" :
{
    "Default" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13158600, "opacity": 1 }
    },

    "DefaultVent" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13158600, "opacity": 1 }
    },

    "Ductwork" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3289650, "opacity": 1 }
    },

    "VAVCoilFins" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 16751466, "opacity": 0.2 }
    },

    "VAVControlBox" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 9945724, "opacity": 1 }
    },

    "VAVDiffuser" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 12767964, "opacity": 1 }
    },

    "VAVDiffuserCut" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 14739949, "opacity": 1 }
    },

    "VAVHeatingCoils" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 16711680, "opacity": 1 }
    },

    "VAVHydraulic" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13020243, "opacity": 1 }
    },

    "VAVLever" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 11251650, "opacity": 1 }
    },

    "VAVLink" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 11251650, "opacity": 1 }
    },

    "VAVLinkHinge" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 27551, "opacity": 1 }
    },

    "VAVPaddle" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13602416, "opacity": 1 }
    },

    "VAVPaddleAxle" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 27551, "opacity": 1 }
    },

    "VAVPiston" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 6779021, "opacity": 1 }
    },

    "VAVPistonHinge" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 27551, "opacity": 1 }
    },

    "VAVWireGold" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 12555072, "opacity": 1 }
    },

    "VAVWireGreen" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 2719273, "opacity": 1 }
    },

    "VAVWireRed" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 7743301, "opacity": 1 }
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
