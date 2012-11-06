#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that will 'bake' the instances of
the selected Mesh object.
"""

import sys
import lwsdk
from lwsdk import Vector

__author__     = "Bob Hood"
__date__       = "Nov 7 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class bake_instance(lwsdk.IGeneric):
    def __init__(self, context):
        super(bake_instance, self).__init__()

    # LWGeneric -------------------------------------------
    def process(self, ga):
        item_info = lwsdk.LWItemInfo()
        object_info = lwsdk.LWObjectInfo()
        instancer_funcs = lwsdk.LWItemInstancerFuncs()
        instance_info = lwsdk.LWItemInstanceInfo()
        interface_info = lwsdk.LWInterfaceInfo()

        current_time = interface_info.curTime
        autokey_is_on = ((interface_info.generalFlags & lwsdk.LWGENF_AUTOKEY) != 0)

        selected_item = interface_info.selected_items()[0]
        selected_item_id = lwsdk.itemid_to_str(selected_item)

        # find the Instancer that owns the selected object
        found_instancer = None
        obj = item_info.first(lwsdk.LWI_OBJECT, None)
        while obj and (not found_instancer):
            instancer = object_info.instancer(obj)
            if instancer:
                instance = instancer_funcs.first(instancer)
                while instance and (not found_instancer):
                    if instance_info.item(instance) == selected_item:
                        # found it!
                        found_instancer = instancer
                        break
                    instance = instancer_funcs.next(instancer, instance)
            obj = item_info.next(obj)

        if not found_instancer:
            print >>sys.stderr, 'Object "%s" is NOT instanced!' % item_info.name(selected_item)
            return lwsdk.AFUNC_OK

        instances = []
        instance = instancer_funcs.first(found_instancer)
        while instance:
            if instance_info.item(instance) == selected_item:
                instances.append(instance)
            instance = instancer_funcs.next(found_instancer, instance)

        # values used for progress
        current_index = 1.0
        target_index = len(instances) * 1.0

        for instance in instances:
            pos = instance_info.pos(instance, 0)
            # Note: InstanceInfo.rotation() returns radians!
            rot = instance_info.rotation(instance, 0)
            scl = instance_info.scale(instance, 0)

            lwsdk.command("SelectItem %s" % selected_item_id)
            lwsdk.command("Clone 1")

            lwsdk.command("Position %s" % str(pos))
            # Note: Rotation expects degrees!
            lwsdk.command("Rotation %s" % str(Vector.to_degrees(rot)))
            lwsdk.command("Scale %s" % str(scl))
            if not autokey_is_on:
                lwsdk.command("CreateKey %f" % current_time)

            lwsdk.command("StatusMsg {%f}Baking instances..." % (current_index / target_index))
            current_index += 1.0

        lwsdk.command("SelectItem %s" % selected_item_id)

        lwsdk.command("StatusMsg Baking complete.")

        return lwsdk.AFUNC_OK

ServerTagInfo = [
                    ( "Python Bake Instance", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Bake Instance", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyBakeInstance", bake_instance) : ServerTagInfo }
