#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that has the sole purpose
of testing the lwsdk.Panels 'multilist_ctl' mechanics, with all of
its callbacks.
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

# The LW Panels system does not make copies of control text elements.  Therefore,
# when returning text elements to the wrapper layer from callbacks, they must have
# anchorage within Python to retain their reference counts.  Returning text
# directly will cause reclamation to occcur, and garbage will be displayed on the
# interface (best case) or the application may crash (worst case).

multi_text = [ ["first", "text"], ["second", "text"], ["third", "text"] ]

class test_panels_multilist(lwsdk.IGeneric):
    def __init__(self, context):
        super(test_panels_multilist, self).__init__()

    # Callbacks --------------------------------------
    def name_2d(self, control, userdata, row, column):
        return multi_text[row][column]

    def count_2d(self, control, userdata):
        return len(multi_text)

    def column_width(self, control, userdata, row):
        if row >= len(multi_text[0]):
            return 0
        return 50

    def multi_select_event_func(self, control, user_data, row, selecting):
        if row < 0:
            return  # list selections are being cleared

        action = 'deselected'
        if selecting:
            action = action[2:]

        print 'You %s: %s' % (action, ' '.join(multi_text[row]))

    # LWGeneric -------------------------------------------
    def process(self, generic_access):
        ui = lwsdk.LWPanels()
        panel = ui.create('Test Multilist')

        c1 = panel.multilist_ctl('Multilist', 200, 10, self.name_2d, self.count_2d, self.column_width)
        c1.set_select(self.multi_select_event_func)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_RESIZE) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

ServerTagInfo = [
                    ( "Python Multilist Test", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Multilist Test", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyMultilistTest", test_panels_multilist) : ServerTagInfo }
