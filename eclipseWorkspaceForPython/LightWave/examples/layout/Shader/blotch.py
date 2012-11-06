#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Shader based on the SDK example.
"""

import sys
import math
import lwsdk

__author__     = "Bob Hood"
__date__       = "Sep 12th 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

# values shared by all instances (these should be per-instance,
# and modifiable by a GUI)

color    = lwsdk.Vector(0.0, 1.0, 0.0)
center   = lwsdk.Vector(0.0, 0.0, 0.0)
radius   = 1.5;
softness = 0.5;

class blotch(lwsdk.IShader):
    def __init__(self, context):
        super(blotch, self).__init__()
        self._surface = context     # LWSurfaceID

        self._r2      = radius * radius;
        self._piOverR = math.pi / radius;

    # LWShader --------------------------------------------
    def flags(self):
        return lwsdk.LWSHF_COLOR

    def evaluate(self, sa):
        r2 = 0.0

        # the wrapper layer copies whole arrays at once, even if you reference
        # only a single element (if you reference multiple elements, the array
        # is copied in whole each time!).  so, it is more efficient to pull it
        # all down once and then work with it locally.

        v_oPos = lwsdk.Vector(sa.oPos)
        v_color = lwsdk.Vector(sa.color)

        for i in range(3):
            d = v_oPos[i] - center[i]
            d *= d
            if d > self._r2:
                return

            r2 += d

        if r2 > self._r2:
            return

        d = math.sqrt(r2)
        d = math.cos(d * self._piOverR) * softness
        if d > 1.0:
            d = 1.0
        a = 1.0 - d

        colors = v_color * a + color * d

        # copy the whole array back at once for efficiency.
        sa.color = colors

    # LWRenderFuncs ---------------------------------------
    def rend_init(self, mode):
        pass

    def rend_cleanup(self):
        pass

    def rend_newTime(self, frame, time):
        pass

    # LWInstanceFuncs -------------------------------------
    def inst_copy(self, source):
        self._surface = source._surface
        return None     # LWError

    def inst_descln(self):
        return "Blotch (Python)"

ServerTagInfo = [
                    ( "Python Blotch", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Blotch", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.ShaderFactory("LW_PyBlotch", blotch) : ServerTagInfo }
