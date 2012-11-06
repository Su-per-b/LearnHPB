#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
Sol: A LightWave Item Motion plug-in based on an unpublished LScript of the same name.

Simulates the orbital motions of all nine planets in the Sol solar system.  Each object
to which it is applied should have a name that matches one of the nine planets defined
below.
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

AU = 1.49e11
scale_choice = 6

planet_au = {
                "mercury" : 0.387,
                "venus"   : 0.723,
                "earth"   : 1.0,
                "mars"    : 1.524,
                "jupiter" : 5.203,
                "saturn"  : 9.539,
                "uranus"  : 19.19,
                "neptune" : 30.06,
                "pluto"   : 39.54
            }

planet_r = {
                "mercury"  : 2.44e6,
                "venus"    : 6.051e6,
                "earth"    : 6.378e6,
                "mars"     : 3.397e6,
                "jupiter"  : 7.1492e7,
                "saturn"   : 6.0268e7,
                "uranus"   : 2.5559e7,
                "neptune"  : 2.4764e7,
                "pluto"    : 1.16e6
           }

planet_tilt = {
                "mercury"  : 0.0,
                "venus"    : 177.4,
                "earth"    : 23.5,
                "mars"     : 23.98,
                "jupiter"  : 3.08,
                "saturn"   : 26.73,
                "uranus"   : 97.92,
                "neptune"  : 29.6,
                "pluto"    : 118.0
              }

planet_e = {
                "mercury"  : 0.206,
                "venus"    : 0.007,
                "earth"    : 0.017,
                "mars"     : 0.093,
                "jupiter"  : 0.048,
                "saturn"   : 0.056,
                "uranus"   : 0.046,
                "neptune"  : 0.010,
                "pluto"    : 0.248
           }

scaling_factors = [
                    1,                # fps = second
                    60,               # fps = minute
                    60,               # fps = hour
                    24,               # fps = day
                    (363 / 4.0),      # fps = quarterly
                    2,                # fps = semi-annual
                    2                 # fps = yearly
                  ]

scaling_factors_str = [
                        'Second',
                        'Minute',
                        'Hour',
                        'Day',
                        '3 Months',
                        '6 Months',
                        '12 Months'
                      ]

class sol(lwsdk.IItemMotion):
    def __init__(self, context):
        super(sol, self).__init__()
        self._itemid = context
        self._name = lwsdk.LWItemInfo().name(self._itemid)

        # pre-calculate some values for performance

        self._r = planet_au[self._name] * AU;
        self._s = (planet_r[self._name] * math.pow(10, 3)) / AU;
        self._b = planet_tilt[self._name];

        self.adjust_scaling()

        # this next calculation is Newton's version of Kepler's 3rd Law.
        # its result has units in seconds (where Kepler's original law was
        # in years), so the result is the number of seconds it takes the
        # object to traverse its orbit (2piR).

        self._p = math.sqrt((4 * math.pow(math.pi, 2) * math.pow(self._r, 3)) / (6.67e-11 * 1.99e30));

    def adjust_scaling(self):
        global scale_choice
        self._scale = 1;     # fps = 1 second
        for i in range(7):
            if scale_choice > i:
                self._scale *= scaling_factors[i]

    # LWInterfaceFuncs ------------------------------------
    def inter_ui(self):
        global scale_choice

        ui = lwsdk.LWPanels()
        panel = ui.create('Sol')
        panel.setw(200)

        scale_control = panel.wpopup_ctl('Per-slice scaling', scaling_factors_str, 75)
        scale_control.set_int(scale_choice)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL):
            scale_choice = scale_control.get_int()
            self.adjust_scaling()

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

    # LWItemMotion ----------------------------------------
    def evaluate(self, ma):
        a = ((ma.time * self._scale) / self._p) * (2 * math.pi)

        x = (self._r / AU) * math.cos(a)
        z = (self._r / AU) * math.sin(a)

        ma.setParam(lwsdk.LWIP_POSITION, [x, 0.0, z])
        ma.setParam(lwsdk.LWIP_SCALING,  [self._s] * 3)
        ma.setParam(lwsdk.LWIP_ROTATION, [0.0, 0.0, self._b])

    # LWInstanceFuncs -------------------------------------
    def inst_load(self, state):
        global scale_choice
        result, value = state.lwload_i4(1)
        if result == 0:
            return "Failed to reload state!"  # LWError
        scale_choice = value
        self.adjust_scaling()
        return None     # LWError

    def inst_save(self, state):
        global scale_choice
        state.lwsave_i4(scale_choice)
        return None     # LWError

    def inst_copy(self, source):
        self._scale     = source._scale
        self._itemid    = source._itemid
        self._name      = source._name
        self._r         = source._r
        self._s         = source._s
        self._b         = source._b
        self._p         = source._p

        self.adjust_scaling()

        return None     # LWError

    def inst_descln(self):
        return "Sol (%s)" % self._name

    # LWItemFuncs  ----------------------------------------
    def item_changeID(self, itemid_list):
        # 'itemid_list' is a tuple of LWItemID tuple pairs
        for before, after in itemid_list:
            if self._itemid == before:
                self._itemid = after

ServerTagInfo = [
                    ( "Python Sol", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Sol", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.ItemMotionFactory("LW_PySol", sol) : ServerTagInfo }
