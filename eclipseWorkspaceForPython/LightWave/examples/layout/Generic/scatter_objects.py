#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that will randomly scatter
all of the selected objects within a specified radius of the origin,
on all selected axes.
"""

import sys
import lwsdk
from random import random, seed

__author__     = "Bob Hood"
__date__       = "Nov 6 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class scatter_objects(lwsdk.IGeneric):
    def __init__(self, context):
        super(scatter_objects, self).__init__()

        vp_info = lwsdk.LWViewportInfo()
        self._radius = vp_info.gridSize(0) * (vp_info.gridType(0) * 10)
        if self._radius == 0.0:
            self._radius = 1.0

        self._include_x = True
        self._include_y = True
        self._include_z = True

        seed()

    # LWGeneric -------------------------------------------
    def process(self, ga):
        ui = lwsdk.LWPanels()
        panel = ui.create('Scatter Objects')

        c1 = panel.dist_ctl('Radius')
        c2 = panel.bool_ctl('X')
        c3 = panel.bool_ctl('Y')
        c4 = panel.bool_ctl('Z')

        c1.set_float(self._radius)
        c2.set_int(1 if self._include_x else 0)
        c3.set_int(1 if self._include_y else 0)
        c4.set_int(1 if self._include_z else 0)

        panel.align_controls_vertical([c1, c2, c3, c4])
        panel.size_to_layout(5, 5)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        self._radius = c1.get_float()
        self._include_x = (c2.get_int() == 1)
        self._include_y = (c3.get_int() == 1)
        self._include_z = (c4.get_int() == 1)

        ui.destroy(panel)

        item_info = lwsdk.LWItemInfo()

        interface_info = lwsdk.LWInterfaceInfo()
        current_time = interface_info.curTime
        autokey_is_on = ((interface_info.generalFlags & lwsdk.LWGENF_AUTOKEY) != 0)
        selected_items = interface_info.selected_items()

        for obj in selected_items:
            r = random()
            x_invert = -1 if r < 0.5 else 1
            x_value = 0.0
            if self._include_x:
                x_value = random() * self._radius * x_invert

            r = random()
            y_invert = -1 if r < 0.5 else 1
            y_value = 0.0
            if self._include_y:
                y_value = random() * self._radius * y_invert

            r = random()
            z_invert = -1 if r < 0.5 else 1
            z_value = 0.0
            if self._include_z:
                z_value = random() * self._radius * z_invert

            ga.evaluate(ga.data, "SelectItem %s" % lwsdk.itemid_to_str(obj))
            ga.evaluate(ga.data, "Position %f %f %f" % (x_value, y_value, z_value))

            if not autokey_is_on:
                ga.evaluate(ga.data, "CreateKey %f" % current_time)

        return lwsdk.AFUNC_OK

ServerTagInfo = [
                    ( "Python Scatter Objects", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Scatter Objs", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyScatterObjects", scatter_objects) : ServerTagInfo }
