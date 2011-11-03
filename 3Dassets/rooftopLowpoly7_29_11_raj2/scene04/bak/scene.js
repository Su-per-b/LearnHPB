/* Converted from: rooftop_cleaned_condensed.blend
 *
 * File generated with Blender 2.58 Exporter
 * https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender/
 *
 * objects:    8
 * geometries: 6
 * materials:  23
 * textures:   0
 */

var scene = {

"type" : "scene",
"urlBaseType" : "relativeToScene",


"objects" :
{
    "TopDamper" : {
        "geometry"  : "geo_DamperGeom",
        "groups"    : [ "Group.001" ],
        "materials" : [ "Default", "actuator", "damper", "damper-edges", "outer", "outer-trans" ],
        "position"  : [ -0.171000, 1.391000, 3.066000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "CenterDamper" : {
        "geometry"  : "geo_DamperGeom",
        "groups"    : [ "Group.001" ],
        "materials" : [ "Default", "actuator", "damper", "damper-edges", "outer", "outer-trans" ],
        "position"  : [ -0.171000, 2.838000, 1.759000 ],
        "rotation"  : [ -1.570794, 0.000000, 0.000000 ],
        "quaternion": [ 0.707107, -0.707106, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "LeftDamper" : {
        "geometry"  : "geo_DamperGeom",
        "groups"    : [ "Group.001" ],
        "materials" : [ "Default", "actuator", "damper", "damper-edges", "outer", "outer-trans" ],
        "position"  : [ -0.171000, 5.505000, 1.759000 ],
        "rotation"  : [ -1.570794, 0.000000, 0.000000 ],
        "quaternion": [ 0.707107, -0.707106, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "Fan" : {
        "geometry"  : "geo_FanGeom",
        "groups"    : [  ],
        "materials" : [ "FanAxle", "FanAxleWheel", "FanBelt", "FanBlades", "FanChassis", "FanMotorWheel", "FanRibs", "ductwork", "fanengine", "metalwork" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "CoolingCoil" : {
        "geometry"  : "geo_CoolingCoilGeom",
        "groups"    : [  ],
        "materials" : [ "Dark", "outer", "cyan", "blue", "Default" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "HeatingCoil" : {
        "geometry"  : "geo_HeatingCoilGeom",
        "groups"    : [  ],
        "materials" : [ "red", "Dark", "Default", "outer", "pink" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "Filter" : {
        "geometry"  : "geo_FilterGeom",
        "groups"    : [  ],
        "materials" : [ "filter", "outer" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "Ducting" : {
        "geometry"  : "geo_DuctingGeom",
        "groups"    : [  ],
        "materials" : [ "outer", "ductwork", "Ductwork" ],
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
    "geo_DamperGeom" : {
        "type" : "ascii_mesh",
        "url"  : "scene.DamperGeom.js"
    },

    "geo_FanGeom" : {
        "type" : "ascii_mesh",
        "url"  : "scene.FanGeom.js"
    },

    "geo_CoolingCoilGeom" : {
        "type" : "ascii_mesh",
        "url"  : "scene.CoolingCoilGeom.js"
    },

    "geo_HeatingCoilGeom" : {
        "type" : "ascii_mesh",
        "url"  : "scene.HeatingCoilGeom.js"
    },

    "geo_FilterGeom" : {
        "type" : "ascii_mesh",
        "url"  : "scene.FilterGeom.js"
    },

    "geo_DuctingGeom" : {
        "type" : "ascii_mesh",
        "url"  : "scene.DuctingGeom.js"
    }
},


"materials" :
{
    "actuator" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 16549688, "opacity": 1 }
    },

    "blue" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 2830709, "opacity": 1 }
    },

    "cyan" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 8162993, "opacity": 1 }
    },

    "damper" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13158600, "opacity": 1 }
    },

    "damper-edges" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 15634833, "opacity": 1 }
    },

    "Dark" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 2830709, "opacity": 1 }
    },

    "Default" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13158600, "opacity": 1 }
    },

    "Ductwork" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3289650, "opacity": 1 }
    },

    "ductwork" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3355443, "opacity": 1 }
    },

    "FanAxle" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3103601, "opacity": 1 }
    },

    "FanAxleWheel" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3103601, "opacity": 1 }
    },

    "FanBelt" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 2891073, "opacity": 1 }
    },

    "FanBlades" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 14995363, "opacity": 1 }
    },

    "FanChassis" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 6201021, "opacity": 1 }
    },

    "fanengine" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3355443, "opacity": 1 }
    },

    "FanMotorWheel" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3103601, "opacity": 1 }
    },

    "FanRibs" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 7952744, "opacity": 1 }
    },

    "filter" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 15724431, "opacity": 1 }
    },

    "metalwork" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3683896, "opacity": 1 }
    },

    "outer" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3947580, "opacity": 1 }
    },

    "outer-trans" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 3947580, "opacity": 1 }
    },

    "pink" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 11765639, "opacity": 1 }
    },

    "red" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 8861495, "opacity": 1 }
    }
},


"transform" :
{
    "position"  : [ 0.000000, 0.000000, 0.000000 ],
    "rotation"  : [ -1.570796, 0.000000, 1.570796 ],
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
