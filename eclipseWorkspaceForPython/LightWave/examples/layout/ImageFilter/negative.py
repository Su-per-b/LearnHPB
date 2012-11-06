#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Image Filter.  It inverts a rendered frame
to produce a 'negative' effect.
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

class negative(lwsdk.IImageFilter):
    def __init__(self, context):
        super(negative, self).__init__()

        self._context_flags = context

        self._fast = True   # set to False to use the SDK functions directly

    # LWImageFilter ---------------------------------------
    def flags(self):
        # See the LWSDK Documentation for Image Filter regarding the
        # format of this list.
        return [4, lwsdk.LWBUF_RED, lwsdk.LWBUF_GREEN, lwsdk.LWBUF_BLUE, lwsdk.LWBUF_ALPHA ]

    def process(self, fa):
        mon = fa.monitor
        mon.init(mon.data, fa.height / 8)

        for row in range(fa.height):
            r = fa.getLine(lwsdk.LWBUF_RED, row)
            g = fa.getLine(lwsdk.LWBUF_GREEN, row)
            b = fa.getLine(lwsdk.LWBUF_BLUE, row)
            a = fa.getLine(lwsdk.LWBUF_ALPHA, row)

            for col in range(fa.width):
                if self._fast:
                    r[col] = 1.0 - r[col]
                    g[col] = 1.0 - g[col]
                    b[col] = 1.0 - b[col]
                else:
                    out = [float(1.0) - r[col], float(1.0) - g[col], float(1.0) - b[col]]
                    fa.setRGB(col, row, out);
                    fa.setAlpha(col, row, a[col]);

            if self._fast:
                fa.process_rgb(row, r, g, b, a)

            # once every 8 lines, step the monitor and check for abort

            if ( row & 7 ) == 7:
                if mon.step(mon.data, 1):
                    return

        mon.done(mon.data)

    # LWInstanceFuncs -------------------------------------
    def inst_copy(self, source):
        return None     # LWError

    def inst_descln(self):
        return "Negative (Python)"

ServerTagInfo = [
                    ( "Python Negative", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Negative", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.ImageFilterFactory("LW_PyNegative", negative) : ServerTagInfo }
