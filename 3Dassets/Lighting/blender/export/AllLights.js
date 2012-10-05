{

"metadata" :
{
    "formatVersion" : 3.1,
    "sourceFile"    : "AllLights.blend",
    "generatedBy"   : "Blender 2.63 Exporter",
    "objects"       : 2,
    "geometries"    : 2,
    "materials"     : 7,
    "textures"      : 0
},

"type" : "scene",
"urlBaseType" : "relativeToScene",


"objects" :
{
    "PendentLight" : {
        "geometry"  : "geo_Geom_PendentLight",
        "groups"    : [  ],
        "materials" : [ "grey", "white", "center" ],
        "position"  : [ 0, 0, 0 ],
        "rotation"  : [ 0, -0, 0 ],
        "quaternion": [ 1, 0, 0, 0 ],
        "scale"     : [ 1, 1, 1 ],
        "visible"       : true,
        "castShadow"    : false,
        "receiveShadow" : false,
        "doubleSided"   : false
    },

    "RecessedLight" : {
        "geometry"  : "geo_Geom_RecessedLight",
        "groups"    : [  ],
        "materials" : [ "Default", "Interior", "Interior Body", "black" ],
        "position"  : [ 0, 0.747872, 0 ],
        "rotation"  : [ 0, -0, 0 ],
        "quaternion": [ 1, 0, 0, 0 ],
        "scale"     : [ 1, 1, 1 ],
        "visible"       : true,
        "castShadow"    : false,
        "receiveShadow" : false,
        "doubleSided"   : false
    }
},


"geometries" :
{
    "geo_Geom_PendentLight" : {
        "type" : "ascii",
        "url"  : "AllLights.Geom_PendentLight.js"
    },

    "geo_Geom_RecessedLight" : {
        "type" : "ascii",
        "url"  : "AllLights.Geom_RecessedLight.js"
    }
},


"materials" :
{
    "black" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 0, "opacity": 1, "blending": "NormalBlending" }
    },

    "center" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 16777215, "opacity": 1, "blending": "NormalBlending" }
    },

    "Default" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 13158600, "opacity": 1, "blending": "NormalBlending" }
    },

    "grey" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 11841715, "opacity": 1, "blending": "NormalBlending" }
    },

    "Interior" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 14342623, "opacity": 1, "blending": "NormalBlending" }
    },

    "Interior Body" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 14023418, "opacity": 1, "blending": "NormalBlending" }
    },

    "white" : {
        "type": "MeshLambertMaterial",
        "parameters": { "color": 16775933, "opacity": 1, "blending": "NormalBlending" }
    }
},


"transform" :
{
    "position"  : [ 0, 0, 0 ],
    "rotation"  : [ -1.5708, 0, 0 ],
    "scale"     : [ 1, 1, 1 ]
},

"defaults" :
{
    "bgcolor" : [ 0, 0, 0 ],
    "bgalpha" : 1.000000,
    "camera"  : ""
}

}
