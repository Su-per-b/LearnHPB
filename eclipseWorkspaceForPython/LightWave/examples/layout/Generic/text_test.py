#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that has the sole purpose
of testing the lwsdk.Panels 'text_ctl' mechanics.
"""

__author__     = "Bob Hood"
__date__       = "Dec 1 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

import lwsdk

class test_panels_text(lwsdk.IGeneric):
    def __init__(self, context):
        super(test_panels_text, self).__init__()

    # LWGeneric -------------------------------------------
    def process(self, generic_access):
        ui = lwsdk.LWPanels()
        panel = ui.create('Test Text')

        c1 = panel.text_ctl('Text', [ 'Static text 1', 'Static text 1', 'Static text 1' ])

        panel.align_controls_vertical([c1])
        panel.size_to_layout(5, 5)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_RESIZE) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

ServerTagInfo = [
                    ( "Python Text Test", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Text Test", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyTextTest", test_panels_text) : ServerTagInfo }
