/* Converted from: rooftopLowpoly7_29_11_raj10.blend
 *
 * File generated with Blender 2.58 Exporter
 * https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender/
 *
 * objects:    11
 * geometries: 11
 * materials:  23
 * textures:   0
 */

var scene = {

"type" : "scene",
"urlBaseType" : "relativeToScene",


"objects" :
{
    "Fan" : {
        "geometry"  : "geo_Layer 11",
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
        "geometry"  : "geo_Layer 10",
        "groups"    : [  ],
        "materials" : [ "Dark", "outer", "cyan", "blue" ],
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
        "geometry"  : "geo_Layer 9",
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
        "geometry"  : "geo_Layer 8",
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

    "TopDamper" : {
        "geometry"  : "geo_Layer 7",
        "groups"    : [  ],
        "materials" : [ "Default", "actuator", "damper", "damper-edges", "outer", "outer-trans" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "CenterDamper" : {
        "geometry"  : "geo_Layer 6",
        "groups"    : [  ],
        "materials" : [ "Default", "actuator", "damper", "damper-edges", "outer", "outer-trans" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "SideDucting" : {
        "geometry"  : "geo_Layer 4",
        "groups"    : [  ],
        "materials" : [ "outer" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "BackDucting" : {
        "geometry"  : "geo_Layer 3",
        "groups"    : [  ],
        "materials" : [ "outer" ],
        "position"  : [ 0.000000, 0.000000, 0.000000 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "CoolingCoilCenter" : {
        "geometry"  : "geo_Layer 2",
        "groups"    : [  ],
        "materials" : [ "Default" ],
        "position"  : [ 0.603250, -3.759200, 29.248100 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "RightDuct" : {
        "geometry"  : "geo_Layer 1",
        "groups"    : [  ],
        "materials" : [ "ductwork", "Ductwork", "outer" ],
        "position"  : [ 0.306053, -3.146090, 29.105400 ],
        "rotation"  : [ 0.000000, -0.000000, 0.000000 ],
        "quaternion": [ 1.000000, 0.000000, 0.000000, 0.000000 ],
        "scale"     : [ 1.000000, 1.000000, 1.000000 ],
        "visible"       : true,
        "castsShadow"   : false,
        "meshCollider"  : false,
        "trigger"       : "None"
    },

    "LeftDamper" : {
        "geometry"  : "geo_Layer 5",
        "groups"    : [  ],
        "materials" : [ "Default", "actuator", "damper", "damper-edges", "outer", "outer-trans" ],
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
    "geo_Layer 11" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 11"
    },

    "geo_Layer 10" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 10"
    },

    "geo_Layer 9" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 9"
    },

    "geo_Layer 8" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 8"
    },

    "geo_Layer 7" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 7"
    },

    "geo_Layer 6" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 6"
    },

    "geo_Layer 4" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 4"
    },

    "geo_Layer 3" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 3"
    },

    "geo_Layer 2" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 2"
    },

    "geo_Layer 1" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 1"
    },

    "geo_Layer 5" : {
        "type" : "embedded_mesh",
        "id"  : "emb_Layer 5"
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
        "parameters": { "color": 3947580, "opacity": 0.1 }
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


"cameras" :
{
    "Camera.001" : {
        "type"  : "perspective",
        "fov"   : 49.159264,
        "aspect": 1.333000,
        "near"  : 0.100000,
        "far"   : 100.000000,
        "position": [ -0.990734, -0.766227, 0.584239 ],
        "target"  : [ 0.000000, 0.000000, 0.000000 ]
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
    "camera"  : "Camera.001"
}

}

postMessage( scene );
close();
