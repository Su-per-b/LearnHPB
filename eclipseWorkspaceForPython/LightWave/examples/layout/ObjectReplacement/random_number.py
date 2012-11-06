#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Object Replacement plug-in.
"""

import os
import lwsdk
import random
import types

__author__     = "Bob Hood"
__date__       = "Sep 9th 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class random_number(lwsdk.IObjReplacement):
    def __init__(self, context):
        super(random_number, self).__init__()

        self._itemid = context

        self._change_interval = 1.0;    # 1 second of video
        self._last_interval = -1;       # what was the last interval when we changed the object?
        self._object_path = ''

        random.seed()

    # LWInterfaceFuncs ------------------------------------
    def inter_ui(self):
        ui = lwsdk.LWPanels()
        panel = ui.create('Random Number')
        panel.setw(300)

        interval_control = panel.float_ctl('Change interval (seconds)')
        interval_control.set_float(self._change_interval)

        # 'width' for dir_ctl() is in characters, not pixels!
        path_control = panel.dir_ctl('Object path', 50)
        if len(self._object_path):
            path_control.set_str(self._object_path)
        path_control.set_event(self, self.path_callback)

        self._controls = [interval_control, path_control]

        panel.align_controls_vertical(self._controls)
        panel.size_to_layout(5, 5)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL):
            self._change_interval = interval_control.get_float()
            path = path_control.get_str()
            if not os.path.exists(path):
                lwsdk.LWMessageFuncs().error('The provided path', 'is invalid!')
            else:
                self._object_path = path

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

    def path_callback(self, id, data):
        path = self._controls[1].get_str()
        if len(path) and (not os.path.exists(path)):
            lwsdk.LWMessageFuncs().error('The provided path', 'is invalid!')
            self._controls[1].set_str(self._object_path)

    # LWObjReplacement ------------------------------------
    def evaluate(self, ra):
        if len(self._object_path) == 0:
            return

        current_interval = int(ra.newTime / self._change_interval)
        if current_interval != self._last_interval:
            obj = random.randint(0, 9)
            ra.newFilename = os.path.join(self._object_path, '%d.lwo' % obj)
            self._last_interval = current_interval

    # LWInstanceFuncs -------------------------------------
    def inst_load(self, state):
        result, value = state.lwload_fp(1)
        if result == 0:
            return "Failed to reload state!"  # LWError
        self._change_interval = value

        result, value = state.lwload_str()
        if result == 0:
            return "Failed to reload state!"  # LWError
        self._object_path = value

        return None     # LWError

    def inst_save(self, state):
        state.lwsave_fp(self._change_interval)
        state.lwsave_str(self._object_path)
        return None     # LWError

    def inst_copy(self, source):
        self._itemid = source._itemid
        self._change_interval = source._change_interval
        self._object_path = source._object_path
        return None     # LWError

    def inst_descln(self):
        return "Random Number (Python)"

    # LWItemFuncs  ----------------------------------------
    def item_changeID(self, itemid_list):
        # 'itemid_list' is a tuple of LWItemID tuple pairs
        for before, after in itemid_list:
            if self._itemid == before:
                self._itemid = after

ServerTagInfo = [
                    ( "Python Random Number", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Random Number", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.ObjReplacementFactory("LW_PyRandomNumber", random_number) : ServerTagInfo }
