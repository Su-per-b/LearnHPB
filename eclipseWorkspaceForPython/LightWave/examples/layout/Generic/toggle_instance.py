#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that will toggle the active state
of the first Instancer applied to a Null object named "InstanceNull"
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Nov 5 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class toggle_instance(lwsdk.IGeneric):
    def __init__(self, context):
        super(toggle_instance, self).__init__()

    # LWGeneric -------------------------------------------
    def process(self, ga):
        self._item_info = lwsdk.LWItemInfo()

        instance_null = lwsdk.find_object_by_name("InstanceNull", self._item_info)
        if not instance_null:
            return lwsdk.AFUNC_OK

        instance_null_id = lwsdk.itemid_to_str(instance_null)
        lwsdk.command("SelectItem %s" % instance_null_id)

        server_name = self._item_info.server(instance_null, "InstancerHandler", 1);
        if not server_name:
            print >>sys.stderr, 'No Instancer server found for object "InstanceNull"!'
            return lwsdk.AFUNC_OK

        server_flags = self._item_info.serverFlags(instance_null, "InstancerHandler", 1);
        if (server_flags & lwsdk.LWSRVF_DISABLED):
            lwsdk.command("EnableServer InstancerHandler 0 1")
        else:
            lwsdk.command("EnableServer InstancerHandler 0 0")

        return lwsdk.AFUNC_OK

ServerTagInfo = [
                    ( "Python Toggle Instance", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Toggle Instance", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyToggleInstance", toggle_instance) : ServerTagInfo }
