#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic Plugin that aids in collecting and
moving LightWave content files.
"""

import sys, os, shutil, tempfile
import math
import lwsdk

__author__     = "Jarrod Davis"
__date__       = "3/23/2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Jarrod Davis"
__status__     = "Utility"
__lwver__      = "11"

class export_three_layout(lwsdk.IGeneric):
    def __init__(self, context):
        super(export_three_layout, self).__init__()


    
    #http://home.comcast.net/~erniew/lwsdk/docs/commands/layout.html
    def process(self, generic_access):
        #launch interface
        
        print("export_three_layout process()")
        
        lwsdk.command("StatusMsg export_three_layout")
        
        #lwsdk.command("LoadScene " + "E:/3Dstuff/Packaged Scenes/FirstAlphaConstruct10-19-12/Scenes/fivechairs.lws")
        
        mesh = lwsdk.LWMeshInfo()
        
        
        #lwsdk.command("SaveObject " + "E:/3Dstuff/Packaged Scenes/FirstAlphaConstruct10-19-12/Scenes/fivechairs.lwo")
         
        #item_info = lwsdk.LWItemInfo()
        #obj_info = lwsdk.LWObjectInfo()
           

        return lwsdk.AFUNC_OK


ServerTagInfo = [
                    ( "Export Three Layout", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Export Three Layout", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyExportThreeLayout", export_three_layout) : ServerTagInfo }
