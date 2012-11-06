#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that sets the play mode in Layout.
If no argument provided, the play mode is toggled between pause and play forward
Argument provided: 0:pause; 1:play forward; -1:play backward
"""

import sys
import lwsdk

__author__     = "Dave Vrba"
__date__       = "Nov 03 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Dave Vrba"
__email__      = "davev@vrbatech.com"
__status__     = "ControlBoothBehavior"
__lwver__      = "11"

import os

class set_play_mode(lwsdk.IGeneric):

    def __init__(self, context):
        super(set_play_mode, self).__init__()
        if 'LAYOUT_PLAY_MODE' not in os.environ:
            os.environ['LAYOUT_PLAY_MODE'] = 'PAUSED'

    def process(self, ga):
        if (os.environ['LAYOUT_PLAY_MODE'] == 'PAUSED'):
            result = ga.evaluate(ga.data, "PlayForward")
            os.environ['LAYOUT_PLAY_MODE'] = 'PlayForward'
        else:
            result = ga.evaluate(ga.data, "Pause")
            os.environ['LAYOUT_PLAY_MODE'] = 'PAUSED'

        return lwsdk.AFUNC_OK

ServerTagInfo = [ ( "SetPlayMode", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ) ]

ServerRecord = { lwsdk.GenericFactory("LW_PySetPlayMode", set_play_mode) : ServerTagInfo }
