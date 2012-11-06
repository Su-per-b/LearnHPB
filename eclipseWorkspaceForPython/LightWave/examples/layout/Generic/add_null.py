#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that adds a new Null object
and positions it at <0, 1, 0>.
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Oct 17 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class add_null(lwsdk.IGeneric):
    def __init__(self, context):
        super(add_null, self).__init__()

    # LWGeneric -------------------------------------------
    def process(self, ga):
        result = ga.evaluate(ga.data, "AddNull Null")
        result = ga.evaluate(ga.data, "Position 0 1 0")

        # if 'autokey' is not turned on, we need to explicitly
        # create keys for the object at the current time offset

        interface_info = lwsdk.LWInterfaceInfo()
        if not (interface_info.generalFlags & lwsdk.LWGENF_AUTOKEY):
            ga.evaluate(ga.data, "CreateKey %f" % interface_info.curTime)

        return lwsdk.AFUNC_OK

ServerTagInfo = [
                    ( "Python Create Null", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Create Null", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyAddNull", add_null) : ServerTagInfo }
