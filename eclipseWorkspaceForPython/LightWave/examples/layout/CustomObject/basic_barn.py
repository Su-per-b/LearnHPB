#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Custom Object plug-in based on the LWSDK sample.
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Sep 12 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

# instance globals (shared by all instances)

vert = [ [0.0,  0.0,  0.0],
         [1.0,  0.0,  0.0],
         [1.0,  1.0,  0.0],
         [0.5,  1.5,  0.0],
         [0.0,  1.0,  0.0],
         [0.0,  0.0, -1.0],
         [1.0,  0.0, -1.0],
         [1.0,  1.0, -1.0],
         [0.5,  1.5, -1.0],
         [0.0,  1.0, -1.0] ]

edge = [ [0, 1],
         [1, 2],
         [2, 3],
         [3, 4],
         [4, 0],
         [5, 6],
         [6, 7],
         [7, 8],
         [8, 9],
         [9, 5],
         [0, 5],
         [1, 6],
         [2, 7],
         [3, 8],
         [4, 9],
         [1, 4],
         [0, 2] ]

class basic_barn(lwsdk.ICustomObj):
    def __init__(self, context):
        super(basic_barn, self).__init__()

        self._itemid = context

    # LWCustomObjHandler ----------------------------------
    def evaluate(self, ca):
        global vert, edge
        for i in range(0, 15):
            ca.line(ca.dispData,
                    vert[edge[i][0]],
                    vert[edge[i][1]],
                    lwsdk.LWCSYS_OBJECT)

        ca.setPattern(ca.dispData, lwsdk.LWLPAT_DOT)

        for i in range(15, 17):
            ca.line(ca.dispData,
                    vert[edge[i][0]],
                    vert[edge[i][1]],
                    lwsdk.LWCSYS_OBJECT)

    # LWInstanceFuncs -------------------------------------
    def inst_descln(self):
        return "Python Basic Barn"

ServerTagInfo = [
                    ( "Python Basic Barn", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Basic Barn", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.CustomObjFactory("LW_PyBasicBarn", basic_barn) : ServerTagInfo }
