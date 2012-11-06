#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Command Sequence plug-in (Modeler) that distributes
particles in Modeler space.

Based on the LScript of the same name
  ...which is based on the plug-in written by Mathew Sorrels
  ...which was itself based on PointSpread.lwm (Amiga)
"""

import sys
import math
import lwsdk
import random

__author__     = "Bob Hood"
__date__       = "Aug 23rd 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class ptspread(lwsdk.ICommandSequence):
    ROUND, SQUARE = range(0, 2)
    CENTER, EDGES  = range(0, 2)
    LINEAR, EXPONENTIAL, CONSTANT = range(0, 3)

    def __init__(self, context):
        super(ptspread, self).__init__()

        self._num_points = 100
        self._radius = [1.0, 1.0, 1.0]
        self._shape = ptspread.ROUND
        self._falloff = ptspread.EDGES
        self._steepness = 1
        self._density = ptspread.LINEAR
        self._surface = "Points"

    def point_prob(self, type, r, rmax, rate):
        if r >= rmax:
            p = 0
        elif type == 0:
            p = r / rmax
        elif type == 1:
            p = math.exp(-rate * (r - rmax) / rmax)
        elif type == 2:
            p = (rmax - r) / rmax
        elif type == 3:
            p = math.exp(-rate * r / rmax)
        elif type == 4:
            p = 1
        return p

    # LWCommandSequence -----------------------------------
    def process(self, mod_command):
        ui = lwsdk.LWPanels()
        panel = ui.create('Random Point Distribution')

        c1 = panel.int_ctl('Number of points')
        c2 = panel.fvec_ctl('Radius')
        c3 = panel.hchoice_ctl('Shape', ['Round', 'Square'])
        c4 = panel.hchoice_ctl('Falloff towards', ['Center', 'Edges'])
        c5 = panel.int_ctl('Steepness')
        c6 = panel.hchoice_ctl('Density distribution', ['Linear', 'Exponential', 'Constant'])
        c7 = panel.str_ctl('Surface', 50)

        panel.align_controls_vertical([c1, c2, c3, c4, c5, c6, c7])
        panel.size_to_layout(5, 5)

        c1.set_int(self._num_points)
        c2.setv_fvec(self._radius)
        c3.set_int(self._shape)
        c4.set_int(self._falloff)
        c5.set_int(self._steepness)
        c6.set_int(self._density)
        c7.set_str(self._surface)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        self._num_points = c1.get_int()
        self._radius     = c2.getv_fvec()
        self._shape      = c3.get_int()
        self._falloff    = c4.get_int()
        self._steepness  = c5.get_int()
        self._density    = c6.get_int()
        self._surface    = c7.get_str()

        ui.destroy(panel)

        rmax = (self._radius[0] + self._radius[1] + self._radius[2]) / 3.0

        mesh_edit_op = mod_command.editBegin(0, 0, lwsdk.OPSEL_USER)
        if not mesh_edit_op:
            print >>sys.stderr, 'Failed to engage mesh edit operations!'
            return lwsdk.AFUNC_OK

        monitor_funcs = lwsdk.DynaMonitorFuncs()
        dyna_monitor = monitor_funcs.create("Random Point Distribution", "Generating points...")
        if dyna_monitor:
            dyna_monitor.init(dyna_monitor.data, self._num_points)

        edit_op_result = lwsdk.EDERR_NONE

        random.seed()

        # catch exceptions to make sure Modeler ends up on a sane state
        try:
            i = 0
            while i < self._num_points:
                if self._shape == ptspread.ROUND:
                    point = lwsdk.Vector( (2.0 * random.random() - 1.0) * self._radius[0],
                                          (2.0 * random.random() - 1.0) * self._radius[1],
                                          (2.0 * random.random() - 1.0) * self._radius[2] )

                    r = abs(lwsdk.Vector.magnitude(point))

                    p = self.point_prob(self._density + self._falloff, r, rmax, self._steepness)

                    if random.random() < p:
                        pid = mesh_edit_op.addPoint(mesh_edit_op.state, point)
                        mesh_edit_op.addPoly(mesh_edit_op.state, lwsdk.LWPOLTYPE_FACE, None, self._surface, [pid])

                        i += 1

                        if dyna_monitor:
                            if dyna_monitor.step(dyna_monitor.data, 1):
                                edit_op_result = lwsdk.EDERR_USERABORT
                                break

                else:   # SQUARE

                    point = lwsdk.Vector()
                    point.x = (2.0 * random.random() - 1.0) * self._radius[0]
                    p = self.point_prob(self._density + self._falloff, point.x, rmax, self._steepness)

                    point.y = (2.0 * random.random() - 1.0) * self._radius[1]
                    p += self.point_prob(self._density + self._falloff, point.y, rmax, self._steepness)

                    point.z = (2.0 * random.random() - 1.0) * self._radius[2]
                    p += self.point_prob(self._density + self._falloff, point.z, rmax, self._steepness)

                    p /= 3.0

                    if random.random() < p:
                        pid = mesh_edit_op.addPoint(mesh_edit_op.state, point)
                        mesh_edit_op.addPoly(mesh_edit_op.state, lwsdk.LWPOLTYPE_FACE, None, self._surface, [pid])

                        i += 1

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

        return lwsdk.AFUNC_OK


ServerTagInfo = [
                    ( "Python Point Spread", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Point Spread", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.CommandSequenceFactory("LW_PyPointSpread", ptspread) : ServerTagInfo }
