#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Channel Filter plug-in based on the LWSDK sample.
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

class noisy_channel(lwsdk.IChannel):
    def __init__(self, context):
        super(noisy_channel, self).__init__()

        self._channelid = context

        self._offset = 0.0
        self._speed = 1.0
        self._scale = 1.0
        self._phase = 0.0

    # LWInterfaceFuncs ------------------------------------
    def inter_ui(self):
        ui = lwsdk.LWPanels()
        panel = ui.create('Noisy Channel')
        panel.setw(150)

        offset_control = panel.float_ctl('Offset')
        offset_control.set_float(self._offset)

        speed_control = panel.float_ctl('Speed')
        speed_control.set_float(self._speed)

        scale_control = panel.float_ctl('Scale')
        scale_control.set_float(self._scale)

        phase_control = panel.float_ctl('Phase')
        phase_control.set_float(self._phase)

        self._controls = [offset_control, speed_control, scale_control, phase_control]
        panel.align_controls_vertical(self._controls)
        #panel.size_to_layout(5, 5)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL):
            self._offset = offset_control.get_float()
            self._speed = speed_control.get_float()
            self._scale = scale_control.get_float()
            self._phase = phase_control.get_float()

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

    # LWChannel -------------------------------------------
    def flags(self):
        return 0

    def evaluate(self, ca):
        t = ca.time * self._speed

        V = lwsdk.Vector()
        V.x = 10 * t
        V.y = self._phase
        V.z = 20

        # LWTextureFuncs is a complex mess, and is not completely exported for
        # Python usage.  Only simple function calls and data members can be
        # accessed successfully. at this time.

        val = lwsdk.LWTextureFuncs().noise(V)
        val *= self._scale
        val += self._offset
        val += ca.value

        ca.setChannel(ca.chan, val)

    # LWInstanceFuncs -------------------------------------
    def inst_load(self, state):
        result, value = state.lwload_fp(1)
        self._offset = value

        result, value = state.lwload_fp(1)
        self._speed = value

        result, value = state.lwload_fp(1)
        self._scale = value

        result, value = state.lwload_fp(1)
        self._phase = value

        return None     # LWError

    def inst_save(self, state):
        state.lwsave_fp(self._offset)
        state.lwsave_fp(self._speed)
        state.lwsave_fp(self._scale)
        state.lwsave_fp(self._phase)

        return None     # LWError

    def inst_copy(self, source):
        self._offset = source._offset
        self._speed = source._speed
        self._scale = source._scale
        self._phase = source._phase

        return None     # LWError

    def inst_descln(self):
        return "Noisy Channel (Scale: %.2f Speed %2f)" % (self._scale, self._speed)

    # LWItemFuncs  ----------------------------------------
    def item_changeID(self, itemid_list):
        # 'itemid_list' is a tuple of LWItemID tuple pairs
        for before, after in itemid_list:
            if self._itemid == before:
                self._itemid = after

ServerTagInfo = [
                    ( "Python Noisy Channel", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Noisy Channel", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.ChannelFactory("LW_PyNoisyChannel", noisy_channel) : ServerTagInfo }
