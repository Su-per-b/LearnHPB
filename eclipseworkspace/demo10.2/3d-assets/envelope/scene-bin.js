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
"name" : "envelope",
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
    }
},

"cameras" :
{
    "zone.001" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -17.736758861844255, -2.103782371790505, -12.359320363436613 ],
        "target"  : [ -14.408997149694187, -0.5482581496934937, -8.722004234365837 ]
    },
    "zone.002" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 0.5554276468054848, -1.8580422354352422, -18.225426042086806 ],
        "target"  : [ 0.5790028503050137, -0.5482581496950945, -8.721999336363927 ]
    },
    "zone.003" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 9.980603501880033, -0.9987331081562969, -13.59220594284394 ],
        "target"  : [ 15.592058846310128, -0.548264153690785, -8.709772430175807 ]
    },
    "zone.004" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -23.084678160750265, -2.021081527826453, 4.001478773063004 ],
        "target"  : [ -15.864447067111103, -0.5484080671103331,0.2053592899525195 ]
    },
    "zone.005" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 2.1827903221029605, 1.9020276728860048, 4.634164795554119],
        "target"  : [ 5.949994182435505, -0.5462518175648904, -0.5582555804948395]
    },
    "zone.006" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 24.23888764261718, 1.255097150466217, 0.3473611679116225],
        "target"  : [ 17.327627973610674, -0.5484040263903318, 0.08075513695455554 ]
    },
    "zone.007" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -4.504620938051179, -1.1293787984122539, 13.292019523488374 ],
        "target"  : [ -14.23104401762826, -0.5484070176275769, 9.234010823741606 ]
    },
    "zone.008" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 0.21718822247453673, 1.0318386604621295, 16.731706163602766],
        "target"  : [ 0.6657429823683307, -0.5484360176317822, 9.234023691926097 ]
    },
    "zone.009" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 16.261001093360495, 0.9700627041750031, 16.061731898618817 ],
        "target"  : [15.70193098237014, -0.5484070176307736, 9.234020605685075 ]
    },
    "front.001" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 2.4295818068273727, 16, 127.75784731173314 ],
        "target"  : [0, 0, 0 ]
    },
    "front.002" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 2.4295818068273727, 12.170129621205593, 55 ],
        "target"  : [0, 0, 0 ]
    },
    "top" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 0, 71, 1] ,
        "rotation": [ 0, 0, 0 ] ,
        "target"  : [0, 0, 0 ]
    },
    "Mixing Box" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [-6.342770262645919, 2.3225849158639638, 13.956860051513917],
        "rotation": [ 0, 0, 0 ],
        "target"  : [ -2.8289652903420492, 1.7875001589911974, -0.4135598367482745 ]
    },
    "Filter" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -3.674286869492321, 1.3560880615340443, 14.675572255721281 ],
        "rotation": [ 0, 0, 0 ],
        "target"  : [ 0.04896068186480556, 1.8265637511850266, -0.5638453642754039 ]
    },
    "Heating Coil" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -2.3557238847304287, 1.1177096387299201, 14.98917198332423 ],
        "rotation": [ 0, 0, 0 ],
        "target"  : [ 1.4046146291593131, 1.5417076665260228, -0.5526760426863729 ]
    },
    "Cooling Coil" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -0.8040575249192106, 1.0298555194523522, 15.366325881638788 ],
        "rotation": [ 0, 0, 0 ],
        "target"  : [ 2.9866957092561353, 1.5370332026755409, -0.55455399738036 ]
    },
    "Fan" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 1.1884263430133375, 0.9282498525782807, 15.851098543558425 ],
        "rotation": [ 0, 0, 0 ],
        "target"  : [ 4.81478179126347, 1.7190982463889293, -0.7486968704546264 ]
    },
    
    "Eye Level.001" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -14.233769507746628, -2, -12.432009181431404 ],
        "target"  : [ -14.23104401762826, -2, 9.2]
    },
    
    "Eye Level.002" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 0.5, -2, -12.432009181431404 ],
        "target"  : [ 0.5, -2, 9.2 ]
    },
    "Eye Level.003" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 10, -2, -12.432009181431404 ],
        "target"  : [ 10, -2, 9.2 ]
    },
    "Eye Level.004" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -19.4, -2, 0],
        "target"  : [ 0, -2, 0 ]
    },
    "Eye Level.005" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 0.5, -2, 9.4 ],
        "target"  : [ 0.5, -2, -9.2 ]
    },
    "Eye Level.006" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 18, -2, 0],
        "target"  : [ 0, -2, 0 ]
    },
    "Eye Level.007" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ -14, -2, 0],
        "target"  : [ -14, -2, 12.4 ]
    },
    
    "Eye Level.008" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 0.5, -2, 0],
        "target"  : [ 0.5, -2, 12.4 ]
    },
    "Eye Level.009" : {
        "type"  : "perspective",
        "fov"   : 30.000000,
        "aspect": 1.333000,
        "near"  : 1.000000,
        "far"   : 10000.000000,
        "position": [ 14, -2, 0],
        "target"  : [ 14, -2, 12.4 ]
    }
    


    
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
