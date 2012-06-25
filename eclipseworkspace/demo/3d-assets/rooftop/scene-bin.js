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
"name" : "rooftop",
"type" : "scene",
"urlBaseType" : "relativeToScene",


"objects" :
{
    "TopDamper" : {
        "geometry"  : "geo_DamperGeom",
        "groups"    : [ "Group.001" ],
        "materials" : [ "Default", "actuator", "damper", "damper-edges", "outer", "outer-trans" ],
        "position"  : [ 0, 3.066000, 0.171000 ],
        "rotation"  : [ 1.570794, 0.000000, 0.000000 ],
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
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0, 0.000000, 0.000000 ],
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
        "position"  : [ 0.000000, 2.838000, 0.000000 ],
        "rotation"  : [ 0.000000, 0.000000, 0.000000 ],
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
        "type" : "bin_mesh",
        "url"  : "damper.obj.js"
    },

    "geo_FanGeom" : {
        "type" : "bin_mesh",
        "url"  : "fan.obj.js"
    },

    "geo_CoolingCoilGeom" : {
        "type" : "bin_mesh",
        "url"  : "cooling-coil.obj.js"
    },

    "geo_HeatingCoilGeom" : {
        "type" : "bin_mesh",
        "url"  : "heating-coil.obj.js"
    },

    "geo_FilterGeom" : {
        "type" : "bin_mesh",
        "url"  : "filter.obj.js"
    },

    "geo_DuctingGeom" : {
        "type" : "bin_mesh",
        "url"  : "ducting.obj.js"
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
},

"cameras" :
{
    "Camera" : {
        "type"  : "perspective",
        "fov"   : 49.159264,
        "aspect": 1.333000,
        "near"  : 0.100000,
        "far"   : 100.000000,
        "position": [ -3.294478, 27.905968, -1.312176 ],
        "target"  : [ 0.000000, 0.000000, 0.000000 ]
    }
}


}

postMessage( scene );
close();
