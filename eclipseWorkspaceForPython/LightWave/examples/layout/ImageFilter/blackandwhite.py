#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Image Filter. It desaturates a rendered frame.
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

class black_and_white(lwsdk.IImageFilter):
    def __init__(self, context):
        super(black_and_white, self).__init__()

        self._context_flags = context

        self._gamma = 0.0  # this would be modified by a GUI

        self._fast = True   # set to False to use the SDK functions directly

    # LWImageFilter ---------------------------------------
    def process(self, fa):
        mon = fa.monitor
        mon.init(mon.data, fa.height / 8)

        for row in range(fa.height):
            r = fa.getLine(lwsdk.LWBUF_RED, row)
            g = fa.getLine(lwsdk.LWBUF_GREEN, row)
            b = fa.getLine(lwsdk.LWBUF_BLUE, row)
            a = fa.getLine(lwsdk.LWBUF_ALPHA, row)

            for col in range(fa.width):
                average = (r[col] + g[col] + b[col]) / 3.0
                if self._gamma:
                    average += self._gamma
                if self._fast:
                    r[col] = g[col] = b[col] = average
                else:
                    out = [float(1.0) * average] * 3
                    fa.setRGB(col, row, out);
                    fa.setAlpha(col, row, a[row]);

            if self._fast:
                fa.process_rgb(row, r, g, b, a)

            # once every 8 lines, step the monitor and check for abort

            if ( row & 7 ) == 7:
                if mon.step(mon.data, 1):
                    return

        mon.done(mon.data)

    # LWInstanceFuncs -------------------------------------
    def inst_copy(self, source):
        self._gamma = source._gamma
        return None     # LWError

    def inst_descln(self):
        return "Black & White (Python)"

ServerTagInfo = [
                    ( "Python Black & White", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Black & White", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.ImageFilterFactory("LW_PyBlackAndWhite", black_and_white) : ServerTagInfo }
