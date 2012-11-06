#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Master plug-in.  It does nothing but display received
commands on the LightWave interface.
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Jul 27 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class master_test(lwsdk.IMaster):
    def __init__(self, context, count):
        super(master_test, self).__init__()
        # context has no relevant value in a Master plug-in
        self._instance_count = count

    # LWMaster --------------------------------------------
    def flags(self):
        return lwsdk.LWMAST_SCENE | lwsdk.LWMASTF_RECEIVE_NOTIFICATIONS

    def event(self, ma):
        if ma.eventCode == lwsdk.LWEVNT_COMMAND:
            msg = ma.data_as_string()
            print msg     # print a copy on the Python console
            ma.evaluate(ma.data, "StatusMsg [ %s ]" % msg)
        elif ma.eventCode == lwsdk.LWEVNT_TIME:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_SELECT:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_RENDER_DONE:
            pass

        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MOTION_UPDATE_STARTING:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MOTION_UPDATE_COMPLETE:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESH_REPLACED:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESH_UPDATE_STARTING:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESH_UPDATE_AFTERMORPHING:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESH_UPDATE_AFTERBONES:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESH_UPDATE_AFTERLOCALDISPLACEMENTS:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESH_UPDATE_AFTERMOTION:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESH_UPDATE_COMPLETE:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_RENDER_FRAME_STARTING:
            event_time = ma.data_as_time()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_RENDER_STARTING:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_RENDER_ABORTED:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_RENDER_COMPLETE:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_SCENE_CLEAR_STARTING:
            scene_name = ma.data_as_string()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_SCENE_CLEAR_COMPLETE:
            scene_name = ma.data_as_string()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_SCENE_LOAD_STARTING:
            scene_name = ma.data_as_string()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_SCENE_LOAD_COMPLETE:
            scene_name = ma.data_as_string()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_SCENE_SAVE_STARTING:
            scene_name = ma.data_as_string()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_SCENE_SAVE_COMPLETE:
            scene_name = ma.data_as_string()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_ITEM_ADDED:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_ITEM_REMOVING:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_ITEM_REPARENTED:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_SURFACE_ALTERED:
            surf_id = ma.data_as_surfid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_MESHPOINTS_ALTERED:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_PLUGIN_CHANGED:
            change_struct = ma.data_as_change()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_PLUGIN_CHANGED:
            change_struct = ma.data_as_change()
            if change_struct.pluginevent == lwsdk.LWEVNT_PLUGIN_UPDATED:
                pass
            elif change_struct.pluginevent == lwsdk.LWEVNT_PLUGIN_CREATED:
                pass
            elif change_struct.pluginevent == lwsdk.LWEVNT_PLUGIN_DESTROYED:
                pass
            elif change_struct.pluginevent == lwsdk.LWEVNT_PLUGIN_ENABLED:
                pass
            elif change_struct.pluginevent == lwsdk.LWEVNT_PLUGIN_DISABLED:
                pass
            elif change_struct.pluginevent == lwsdk.LWEVNT_PLUGIN_DESTROYING:
                pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_TEXTURE_REMOVING:
            text_id = ma.data_as_textid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_TEXTURE_ALTERED:
            text_id = ma.data_as_textid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_IMAGE_REMOVING:
            image_id = ma.data_as_imageid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_IMAGE_ALTERED:
            image_id = ma.data_as_imageid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_LIST_UPDATE_OBJECTS:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_LIST_UPDATE_LIGHTS:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_LIST_UPDATE_CAMERAS:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_LIST_UPDATE_BONES:
            pass
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_OBJECT_SAVE_STARTING:
            item_id = ma.data_as_itemid()
        elif ma.eventCode == lwsdk.LWEVNT_NOTIFY_OBJECT_SAVE_COMPLETE:
            item_id = ma.data_as_itemid()

        return 0.0

    # LWInstanceFuncs -------------------------------------
    def inst_copy(self, source):
        self._instance_count = source._instance_count
        return None     # LWError

    def inst_descln(self):
        return "Python Master Test - %d" % self._instance_count

# subclass the default lwsdk.MasterFactory, and add some
# customizations of our own...

class master_test_factory(lwsdk.MasterFactory):
    def __init__(self, name, klass):
        super(master_test_factory, self).__init__(name, klass)
        self._instance_count = 1

    def create(self, context):
        # we completely replace the create() function here
        instance = None
        try:
            instance = self._klass(context, self._instance_count)
            self._instance_count = self._instance_count + 1
            self._instances.append(instance)
            print >>sys.stderr, 'Currently managing %d instances.' % len(self._instances)
        except:
            instance = None
            print >>sys.stderr, "Failed to generate instance of master_test class!"
        return instance

    def destroy(self, instance):
        # invoke the base class function
        super(master_test_factory, self).destroy(instance)
        # print a message onto the console, and highlight it
        print >>sys.stderr, 'Removing instance: %d instances remain.' % len(self._instances)

ServerTagInfo = [
                    ( "Python Master Test", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Master Test", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { master_test_factory("LW_PyMasterTest", master_test) : ServerTagInfo }
