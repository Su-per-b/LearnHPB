/* Converted from: envelopeAllFloors7.blend
 *
 * File generated with Blender 2.58 Exporter
 * https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender/
 *
 * objects:    15
 * geometries: 4
 * materials:  12
 * textures:   0
 */

var scene = {

"type" : "scene",
"urlBaseType" : "relativeToScene",


"objects" :
{
    "13ft" : {
        "groups"    : [  ],
        "position"  : [ 0.000000, 0.040000, -0.300000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "trigger"   : "None"
    },

    "BackLeft.13ft" : {
        "geometry"  : "geo_FrontRight.13ft",
        "groups"    : [ "13ft" ],
        "materials" : [ "Default", "Mullion", "clearglass", "tintglass" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, 3.141591 ],
        "quaternion": [ 0.000000, 0.000000, 0.000000, 1.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000041 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "FrontRight.13ft" : {
        "geometry"  : "geo_FrontRight.13ft",
        "groups"    : [ "13ft" ],
        "materials" : [ "Default", "Mullion", "clearglass", "tintglass" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "Ceiling" : {
        "geometry"  : "geo_floorCeilingGeom",
        "groups"    : [ "13ft" ],
        "materials" : [ "Default.004" ],
        "position"  : [ -19.049999, -12.154000, 1.998000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "Floor" : {
        "geometry"  : "geo_floorCeilingGeom",
        "groups"    : [ "13ft" ],
        "materials" : [ "Default" ],
        "position"  : [ -19.049999, -12.154000, -2.878999 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "9ft" : {
        "groups"    : [  ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "trigger"   : "None"
    },

    "BackLeft.09ft" : {
        "geometry"  : "geo_FrontRight.09ft",
        "groups"    : [ "9ft" ],
        "materials" : [ "Default", "Mullion", "clearglass", "tintglass" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, -3.141591 ],
        "quaternion": [ -0.000000, 0.000000, 0.000000, 1.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "ceiling" : {
        "geometry"  : "geo_floorCeilingGeom",
        "groups"    : [ "9ft" ],
        "materials" : [ "Default" ],
        "position"  : [ -19.049999, -12.154000, 1.979000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "floor" : {
        "geometry"  : "geo_floorCeilingGeom",
        "groups"    : [ "9ft" ],
        "materials" : [ "Default" ],
        "position"  : [ -19.049999, -12.144000, -1.669000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "FrontRight.09ft" : {
        "geometry"  : "geo_FrontRight.09ft",
        "groups"    : [ "9ft" ],
        "materials" : [ "Default", "Mullion", "clearglass", "tintglass" ],
        "position"  :[ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },


    "floor.11ft" : {
        "geometry"  : "geo_floorCeilingGeom",
        "groups"    : [ "11ft" ],
        "materials" : [ "Default" ],
        "position"  : [ -19.049999, -12.154000, -2.420000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "ceiling.11ft" : {
        "geometry"  : "geo_floorCeilingGeom",
        "groups"    : [ "11ft" ],
        "materials" : [ "Default" ],
        "position"  : [ -19.049999, -12.154000, 1.989000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "BackLeft.11ft" : {
        "geometry"  : "geo_FrontRight.11ft",
        "groups"    : [ "11ft" ],
        "materials" : [ "Default", "Mullion", "clearglass", "tintglass" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "FrontRight.11ft" : {
        "geometry"  : "geo_FrontRight.11ft",
        "groups"    : [ "11ft" ],
        "materials" : [ "Default", "Mullion", "clearglass", "tintglass" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, 3.141591 ],
        "quaternion": [ 0.000000, 0.000000, 0.000000, 1.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    }
},


"geometries" :
{
    "geo_FrontRight.13ft" : {
        "type" : "bin_mesh",
        "url"  : "FrontRight13ft.obj.js"
    },

    "geo_floorCeilingGeom" : {
        "type" : "ascii_mesh",
        "url"  : "scene.floorCeilingGeom.js"
    },

    "geo_FrontRight.09ft" : {
        "type" : "bin_mesh",
        "url"  : "FrontRight9ft.obj.js"
    },

    "geo_FrontRight.11ft" : {
        "type" : "bin_mesh",
        "url"  : "FrontRight11ft.obj.js"
    }
},


"materials" :
{
    "clearglass" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 0, "opacity": 0.05 }
    },

    "Default" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13158600, "opacity": 1, map: "texture_minecraft" }
    },

    "Mullion" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 2829099, "opacity": 1 }
    },

    "tintglass" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 0, "opacity": 0.52 }
    },
},


"transform" :
{
    "position"  : [ 0.000000, -2.100000, 0.000000 ],
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
