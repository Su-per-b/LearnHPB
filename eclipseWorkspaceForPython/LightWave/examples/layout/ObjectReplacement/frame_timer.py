#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Object Replacement plug-in.
"""

import os
import lwsdk
import types

__author__     = "Bob Hood"
__date__       = "Sep 12th 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

# instance global (shared by all instances; set this once, and all instances will have it)

object_path = ''

class frame_timer(lwsdk.IObjReplacement):
    def __init__(self, context):
        super(frame_timer, self).__init__()

        self._itemid = context
        self._name = lwsdk.LWItemInfo().name(self._itemid)

    # LWInterfaceFuncs ------------------------------------
    def inter_ui(self):
        global object_path

        ui = lwsdk.LWPanels()
        panel = ui.create('Frame Timer')
        panel.setw(300)

        # 'width' for dir_ctl() is in characters, not pixels!
        self._path_control = panel.dir_ctl('Object path', 50)
        if len(object_path):
            self._path_control.set_str(object_path)
        self._path_control.set_event(self, self.path_callback)

        panel.size_to_layout(5, 5)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL):
            path = self._path_control.get_str()
            if not os.path.exists(path):
                lwsdk.LWMessageFuncs().error('The provided path', 'is invalid!')
            else:
                object_path = path

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

    def path_callback(self, id, data):
        global object_path
        path = self._path_control.get_str()
        if len(path) and (not os.path.exists(path)):
            lwsdk.LWMessageFuncs().error('The provided path', 'is invalid!')
            self._path_control.set_str(object_path)

    # LWObjReplacement ------------------------------------
    def evaluate(self, ra):
        global object_path

        if len(object_path) == 0:
            return

        # ra.newTime is in seconds
        seconds = ra.newTime

        hours = int(seconds / 3600.0)
        seconds -= hours * 3600

        minutes = int(seconds / 60.0)
        seconds -= minutes * 60

        hours_str = '%02d' % hours
        mins_str = '%02d' % minutes
        secs_str = '%02d' % seconds

        object_digit = ''
        if self._name == 'hours_tens':
            object_digit = hours_str[0]
        elif self._name == 'hours_ones':
            object_digit = hours_str[1]
        elif self._name == 'minutes_tens':
            object_digit = mins_str[0]
        elif self._name == 'minutes_ones':
            object_digit = mins_str[1]
        elif self._name == 'seconds_tens':
            object_digit = secs_str[0]
        elif self._name == 'seconds_ones':
            object_digit = secs_str[1]

        ra.newFilename = os.path.join(object_path, '%s.lwo' % object_digit)

    # LWInstanceFuncs -------------------------------------
    def inst_load(self, state):
        result, value = state.lwload_str()
        if result == 0:
            return "Failed to reload state!"  # LWError
        object_path = value

        return None     # LWError

    def inst_save(self, state):
        state.lwsave_str(object_path)
        return None     # LWError

    def inst_copy(self, source):
        self._itemid = source._itemid
        return None     # LWError

    def inst_descln(self):
        return "Frame Timer (Python)"

    # LWItemFuncs  ----------------------------------------
    def item_changeID(self, itemid_list):
        # 'itemid_list' is a tuple of LWItemID tuple pairs
        for before, after in itemid_list:
            if self._itemid == before:
                self._itemid = after

ServerTagInfo = [
                    ( "Python Frame Timer", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Frame Timer", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.ObjReplacementFactory("LW_PyFrameTimer", frame_timer) : ServerTagInfo }
