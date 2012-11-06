#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Command Sequence plug-in (Modeler) that generates
random "bubbles" based on points found in the current layer.

Based on the LScript of the same name.
"""

import sys
import math
import lwsdk
import random

__author__     = "Bob Hood"
__date__       = "Sep 29th 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class bubbles(lwsdk.ICommandSequence):
    GLOBE, TESSELATED = range(0, 2)

    def __init__(self, context):
        super(bubbles, self).__init__()

        self._sphereType = bubbles.TESSELATED
        self._tessLevel = 2
        self._maxRadius = 5.0
        self._minRadius = 1.0
        self._globeSides = 16
        self._globeSegments = 8
        self._surface = "Bubble"

    def get_commands(self, mod_command):
        command_list = {}
        for command in ["SURFACE",
                        "MAKEBALL",
                        "MAKETESBALL"]:
            command_list[command] = mod_command.lookup(mod_command.data, command)
        return command_list

    def fast_point_scan(self, point_list, point_id):
        point_list.append(point_id)
        return lwsdk.EDERR_NONE

    # LWCommandSequence -----------------------------------
    def process(self, mod_command):
        ui = lwsdk.LWPanels()
        panel = ui.create('Bubbles')

        c1 = panel.hchoice_ctl('Sphere Type', ['Globe', 'Tesselated'])
        c2 = panel.int_ctl('Tesselation Level')
        c3 = panel.dist_ctl('Maximum Radius')
        c4 = panel.dist_ctl('Minimum Radius')
        c5 = panel.int_ctl('Globe Sides')
        c6 = panel.int_ctl('Globe Segments')
        c7 = panel.str_ctl('Surface', 50)

        panel.align_controls_vertical([c1, c2, c3, c4, c5, c6, c7])
        panel.size_to_layout(5, 5)

        c1.set_int(self._sphereType)
        c2.set_int(self._tessLevel)
        c3.set_float(self._maxRadius)
        c4.set_float(self._minRadius)
        c5.set_int(self._globeSides)
        c6.set_int(self._globeSegments)
        c7.set_str(self._surface)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        self._sphereType    = c1.get_int()
        self._tessLevel     = c2.get_int()
        self._maxRadius     = c3.get_float()
        self._minRadius     = c4.get_float()
        self._globeSides    = c5.get_int()
        self._globeSegments = c6.get_int()
        self._surface       = c7.get_str()

        ui.destroy(panel)

        cs_dict = self.get_commands(mod_command)

        random.seed()

        cs_options = lwsdk.marshall_dynavalues((self._surface,))
        result, dyna_value = mod_command.execute(mod_command.data, cs_dict["SURFACE"], cs_options, lwsdk.OPSEL_USER)

        mesh_edit_op = mod_command.editBegin(0, 0, lwsdk.OPSEL_USER)
        if not mesh_edit_op:
            print >>sys.stderr, 'Failed to engage mesh edit operations!'
            return lwsdk.AFUNC_OK

        # gather up the point ids

        points = []

        # NOTE: we will be passing in a sequence (list or tuple) as the argument to the callback.
        # internally, Python expects a sequence as an argument to the function, so it MUST be encased
        # in another sequence, or it will be mistaken for a sequence containing the arguments
        # (instead of an argument itself).

        edit_op_result = mesh_edit_op.fastPointScan(mesh_edit_op.state, self.fast_point_scan, (points,), lwsdk.OPLYR_FG, 1)
        if edit_op_result != lwsdk.EDERR_NONE:
            mesh_edit_op.done(mesh_edit_op.state, edit_op_result, 0)
            return lwsdk.AFUNC_OK

        point_count = len(points)

        # print some info to the PCore console
        print '%d points found for lwsdk.OPLYR_FG' % point_count

        edit_op_result = lwsdk.EDERR_NONE

        monitor_funcs = lwsdk.DynaMonitorFuncs()
        dyna_monitor = monitor_funcs.create("Bubbles", "Removing points...")
        if dyna_monitor:
            dyna_monitor.init(dyna_monitor.data, point_count)

        positions = []
        # catch exceptions to make sure Modeler ends up on a sane state
        try:
            for point in points:
                print type(point)
                positions.append(lwsdk.Vector(mesh_edit_op.pointPos(mesh_edit_op.state, point)))
                mesh_edit_op.remPoint(mesh_edit_op.state, point)

                if dyna_monitor:
                    if dyna_monitor.step(dyna_monitor.data, 1):
                        edit_op_result = lwsdk.EDERR_USERABORT
                        break
        except:
            edit_op_result = lwsdk.EDERR_USERABORT
            raise
        finally:
            mesh_edit_op.done(mesh_edit_op.state, edit_op_result, 0)

        if dyna_monitor:
            dyna_monitor.done(dyna_monitor.data)
            monitor_funcs.destroy(dyna_monitor)

        dyna_monitor = monitor_funcs.create("Bubbles", "Creating bubbles...")
        if dyna_monitor:
            dyna_monitor.init(dyna_monitor.data, point_count)

        for position in positions:
            percent = random.random()
            radius = lwsdk.Vector(self._minRadius + ((self._maxRadius - self._minRadius) * percent))

            if self._sphereType == bubbles.GLOBE:
                cs_options = lwsdk.marshall_dynavalues((radius, self._globeSides, self._globeSegments, position))
                result, dyna_value = mod_command.execute(mod_command.data, cs_dict["MAKEBALL"], cs_options, lwsdk.OPSEL_USER)
            else:
                cs_options = lwsdk.marshall_dynavalues((radius, self._tessLevel, position))
                result, dyna_value = mod_command.execute(mod_command.data, cs_dict["MAKETESBALL"], cs_options, lwsdk.OPSEL_USER)

            if dyna_monitor:
                if dyna_monitor.step(dyna_monitor.data, 1):
                    edit_op_result = lwsdk.EDERR_USERABORT
                    break

        if dyna_monitor:
            dyna_monitor.done(dyna_monitor.data)
            monitor_funcs.destroy(dyna_monitor)

        return lwsdk.AFUNC_OK


ServerTagInfo = [
                    ( "Python Bubbles", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Bubbles", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.CommandSequenceFactory("LW_PyBubbles", bubbles) : ServerTagInfo }
