#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Displacement plug-in, based on the LScript of the same name.
"""

import sys
import math
import lwsdk

__author__     = "Bob Hood"
__date__       = "Jul 27 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

def drag_standalone(inst):
    """ Example callback as a stand-alone function """
    assert isinstance(inst, lazy_points)
    inst._drag_accumulate += inst._controls[1].get_int()
    new_rate = inst._lag_rate + inst._drag_accumulate * 0.05
    if new_rate >= 0.0:
        inst._controls[0].set_float(new_rate)

class lazy_points(lwsdk.IDisplacement):
    def __init__(self, context):
        super(lazy_points, self).__init__()
        self._itemid = context
        self._lag_rate = .25;
        self._controls = []

    # LWInterfaceFuncs ------------------------------------
    def inter_ui(self):
        ui = lwsdk.LWPanels()
        panel = ui.create('Lazy Points')
        panel.setw(200)

        lag_control = panel.float_ctl('Lag rate')
        lag_control.set_float(self._lag_rate)

        spin_control = panel.hdragbut_ctl('')

        # The second 'data' argument is optional, and will be set to None if omitted.
        spin_control.set_event(self.drag_callback)

        # instead of calling a class method, you can use a stand-alone function
        #  spin_control.set_event(drag_standalone, self)

        self._controls = [lag_control, spin_control]
        panel.align_controls_horizontal(self._controls)

        self._drag_accumulate = 0

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL):
            self._lag_rate = lag_control.get_float()

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

    def drag_callback(self, id, data):
        drag_standalone(self)

    # LWRenderFuncs ---------------------------------------
    def rend_newTime(self, frame, time):
        self._frame = frame;
        self._time = time;

    # LWDisplacement --------------------------------------
    def flags(self):
        return lwsdk.LWDMF_WORLD

    def evaluate(self, da):
        item_info = lwsdk.LWItemInfo()

        pivot = item_info.param(self._itemid, lwsdk.LWIP_PIVOT, self._time)
        oPos = lwsdk.Vector(da.oPos)
        original = oPos - pivot
        magnitude = lwsdk.Vector.magnitude(oPos, pivot)
        lag_time = self._time - self._lag_rate * magnitude

        xax = item_info.param(self._itemid, lwsdk.LWIP_RIGHT, lag_time)
        yax = item_info.param(self._itemid, lwsdk.LWIP_UP, lag_time)
        zax = item_info.param(self._itemid, lwsdk.LWIP_FORWARD, lag_time)
        pos = item_info.param(self._itemid, lwsdk.LWIP_W_POSITION, lag_time)

        da.source = [
                    pos.x + original.x * \
                    xax.x + original.y * \
                    yax.x + original.z * zax.x,

                    pos.y + original.x * \
                    xax.y + original.y * \
                    yax.y + original.z * zax.y,

                    pos.z + original.x * \
                    xax.z + original.y * \
                    yax.z + original.z * zax.z
                    ]

    # LWInstanceFuncs -------------------------------------
    def inst_load(self, state):
        result, value = state.lwload_fp(1)
        if result == 0:
            return "Failed to reload state!"  # LWError
        self._lag_rate = value
        return None     # LWError

    def inst_save(self, state):
        state.lwsave_fp(self._lag_rate)
        return None     # LWError

    def inst_copy(self, source):
        self._itemid = source._itemid
        self._lag_rate = source._lag_rate
        self._controls = []

        return None     # LWError

    def inst_descln(self):
        return "Lazy Points"

    # LWItemFuncs  ----------------------------------------
    def item_changeID(self, itemid_list):
        # 'itemid_list' is a tuple of LWItemID tuple pairs
        for before, after in itemid_list:
            if self._itemid == before:
                self._itemid = after

ServerTagInfo = [
                    ( "Python Lazy Points", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Lazy Points", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.DisplacementFactory("LW_PyLazyPoints", lazy_points) : ServerTagInfo }
