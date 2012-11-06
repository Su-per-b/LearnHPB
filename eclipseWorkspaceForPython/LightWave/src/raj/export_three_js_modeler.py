'''
Created on Nov 3, 2012

@author: raj
'''


#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Command Sequence plug-in (Modeler) that creates
a ball and a box, each in a separate layer.
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Aug 15 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class export_three_js_modeler(lwsdk.ICommandSequence):
    
    def __init__(self, context):
        super(export_three_js_modeler, self).__init__()
        

    def get_commands(self, mod_command):
        command_list = {}
        for command in ["SaveObject",
                        "MAKEBALL",
                        "MAKETESBALL"]:
            command_list[command] = mod_command.lookup(mod_command.data, command)
        return command_list
    
    # LWCommandSequence -----------------------------------
    def process(self, mod_command):
        
        #cs_options = lwsdk.marshall_dynavalues('1')
        #cs_export_obj = mod_command.lookup(mod_command.data, "ExportOBJ")
        
        #result, dyna_value = mod_command.execute(mod_command.data, cs_export_obj, cs_options, lwsdk.OPSEL_USER)
        print "ExportThreeJS.process()"
        return lwsdk.AFUNC_OK
        #mod_command("SaveObject " + "E:/3Dstuff/Packaged Scenes/FirstAlphaConstruct10-19-12/Scenes/fivechairs.lwo")

        cs_dict = self.get_commands(mod_command)
        
        cs_options = lwsdk.marshall_dynavalues(("filename.obj",))
        
        result, dyna_value = mod_command.execute(mod_command.data, cs_dict["SaveObject"], cs_options, lwsdk.OPSEL_USER)
        
        print "ExportThreeJS.process() - end"
        return lwsdk.AFUNC_OK


ServerTagInfo = [
                    ( "Export Three.js Modeler", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Export Three.js Modeler", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.CommandSequenceFactory("LW_PyExportThreeJS", export_three_js_modeler) : ServerTagInfo }