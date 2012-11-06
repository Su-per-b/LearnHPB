#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Command Sequence plug-in (Modeler) that creates a gear.
"""

import sys
import math
import lwsdk

__author__     = "Bob Hood"
__date__       = "Aug 17th 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class gears(lwsdk.ICommandSequence):
    X, Y, Z = range(0, 3)
    ANGULAR, SMOOTH = range(0, 2)

    def __init__(self, context):
        super(gears, self).__init__()

        self._teeth = 15
        self._axis = gears.Z
        self._rad_inner = .7
        self._rad_outer = 1.0
        self._thickness = .5
        self._geartype = gears.ANGULAR

        self._center = [0.0, 0.0, 0.0]

    def get_commands(self, mod_command):
        command_list = {}
        for command in ["SETLAYER",
                        "SETBLAYER",
                        "FREEZECURVES",
                        "EXTRUDE",
                        "MAKEDISC",
                        "BOOLEAN",
                        "DELETE",
                        "MERGEPOINTS",
                        "ALIGNPOLS",
                        "FLIP",
                        "ROTATE"]:
            command_list[command] = mod_command.lookup(mod_command.data, command)
        return command_list

    # LWCommandSequence -----------------------------------
    def process(self, mod_command):
        ui = lwsdk.LWPanels()
        panel = ui.create('Gears')

        c1 = panel.hchoice_ctl('Axis', ['X', 'Y', 'Z'])
        c2 = panel.int_ctl('Number of Teeth')
        c3 = panel.dist_ctl('Inner Radius')
        c4 = panel.dist_ctl('Outer Radius')
        c5 = panel.dist_ctl('Thickness')
        c6 = panel.hchoice_ctl('Gear Type', ['Angular','Smooth'])
        c7 = panel.fvec_ctl('Center')

        panel.align_controls_vertical([c1, c2, c3, c4, c5, c6, c7])
        panel.size_to_layout(5, 5)

        c1.set_int(self._axis)
        c2.set_int(self._teeth)
        c3.set_float(self._rad_inner)
        c4.set_float(self._rad_outer)
        c5.set_float(self._thickness)
        c6.set_int(self._geartype)
        c7.setv_fvec(self._center)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        self._axis      = c1.get_int()
        self._teeth     = c2.get_int()
        self._rad_inner = c3.get_float()
        self._rad_outer = c4.get_float()
        self._thickness = c5.get_float()
        self._geartype  = c6.get_int()
        self._center    = c7.getv_fvec()

        ui.destroy(panel)

        cs_dict = self.get_commands(mod_command)

        cx = self._center[0]
        cy = self._center[1]
        cz = self._center[2] - (self._thickness / 2)

        t_ang = 360 / self._teeth / 57.2957794

        # figure out the layers we need to use and those that are
        # available for our temporary work

        fg_layers = lwsdk.LWStateQueryFuncs().layerList(lwsdk.OPLYR_FG, None)
        fg_layers_list = fg_layers.split()
        empty_layers = lwsdk.LWStateQueryFuncs().layerList(lwsdk.OPLYR_EMPTY, None)
        empty_layers_list = empty_layers.split()

        cs_options = lwsdk.marshall_dynavalues(fg_layers_list[0])
        result = mod_command.execute(mod_command.data, cs_dict["SETLAYER"], cs_options, lwsdk.OPSEL_USER)

        x = 0
        empty_layer = empty_layers_list[x]
        while x < len(empty_layers_list) and (empty_layer in fg_layers_list):
            x += 1
            empty_layer = empty_layers_list[x]

        # only punch a hole if we can get an empty layer to work in

        if x == len(empty_layers_list):
            print >>sys.stderr, "Cannot locate an empty background layer!"
            return lwsdk.AFUNC_OK

        mesh_edit_op = mod_command.editBegin(0, 0, lwsdk.OPSEL_USER)
        if not mesh_edit_op:
            print >>sys.stderr, 'Failed to engage mesh edit operations!'
            return lwsdk.AFUNC_OK

        monitor_funcs = lwsdk.DynaMonitorFuncs()
        dyna_monitor = monitor_funcs.create("Gears", "Generating gear...")
        if dyna_monitor:
            dyna_monitor.init(dyna_monitor.data, self._teeth)

        edit_op_result = lwsdk.EDERR_NONE
        ptID = []

        cancelled = False

        # catch exceptions to make sure Modeler ends up on a sane state
        try:
            tooth = 0
            for tooth in range(self._teeth):
                a1 = t_ang * tooth
                a2 = a1 + (t_ang * 3 / 6)
                a3 = a1 + (t_ang * 4 / 6)
                a4 = a1 + (t_ang * 5 / 6)

                pt = [ (self._rad_inner * math.sin(a1) + cx), (self._rad_inner * math.cos(a1) + cy), cz ]
                ptID.append(mesh_edit_op.addPoint(mesh_edit_op.state, pt))

                pt = [ (self._rad_inner * math.sin(a2) + cx), (self._rad_inner * math.cos(a2) + cy), cz ]
                ptID.append(mesh_edit_op.addPoint(mesh_edit_op.state, pt))

                pt = [ (self._rad_outer * math.sin(a3) + cx), (self._rad_outer * math.cos(a3) + cy), cz ]
                ptID.append(mesh_edit_op.addPoint(mesh_edit_op.state, pt))

                pt = [ (self._rad_outer * math.sin(a4) + cx), (self._rad_outer * math.cos(a4) + cy), cz ]
                ptID.append(mesh_edit_op.addPoint(mesh_edit_op.state, pt))

                if dyna_monitor:
                    result = dyna_monitor.step(dyna_monitor.data, 1)
                    if result:
                        cancelled = True
                        break

            if cancelled:
                edit_op_result = lwsdk.EDERR_USERABORT
            else:
                if self._geartype == gears.ANGULAR:
                    mesh_edit_op.addPoly(mesh_edit_op.state, lwsdk.LWPOLTYPE_FACE, None, "Gear", ptID)
                else:       # Smooth
                    ptID.append(ptID[0])    # close the loop
                    mesh_edit_op.addCurve(mesh_edit_op.state, None, ptID, 0)
        except:
            edit_op_result = lwsdk.EDERR_USERABORT
            raise
        finally:
            mesh_edit_op.done(mesh_edit_op.state, edit_op_result, 0)

        if dyna_monitor:
            dyna_monitor.done(dyna_monitor.data)
            monitor_funcs.destroy(dyna_monitor)

        if cancelled:
            return lwsdk.AFUNC_OK

        if self._geartype == gears.SMOOTH:
            result = mod_command.execute(mod_command.data,
                                         cs_dict["FREEZECURVES"],
                                         None,
                                         lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(('Z', self._thickness))
        result = mod_command.execute(mod_command.data, cs_dict["EXTRUDE"], cs_options, lwsdk.OPSEL_USER)

        # make hole with a diameter 25% of the gear's radius

        cs_options = lwsdk.marshall_dynavalues(empty_layer)
        result = mod_command.execute(mod_command.data, cs_dict["SETLAYER"], cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(([self._rad_outer * 0.25,    # radius
                                                 self._rad_outer * 0.25,
                                                 self._rad_outer * 0.25],
                                                -0.5,                       # top
                                                self._thickness + 1,        # bottom
                                                'Z',                        # axis
                                                32,                         # number of sides
                                                1,                          # number of segments
                                                [cx, cy, cz]                # center
                                               ))
        result = mod_command.execute(mod_command.data, cs_dict["MAKEDISC"], cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(fg_layers_list[0])
        result = mod_command.execute(mod_command.data, cs_dict["SETLAYER"], cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(empty_layer)
        result = mod_command.execute(mod_command.data, cs_dict["SETBLAYER"], cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues('SUBTRACT')
        result = mod_command.execute(mod_command.data, cs_dict["BOOLEAN"], cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(empty_layer)
        result = mod_command.execute(mod_command.data, cs_dict["SETLAYER"], cs_options, lwsdk.OPSEL_USER)

        result = mod_command.execute(mod_command.data, cs_dict["DELETE"], None, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(fg_layers_list[0])
        result = mod_command.execute(mod_command.data, cs_dict["SETLAYER"], cs_options, lwsdk.OPSEL_USER)

        result = mod_command.execute(mod_command.data, cs_dict["MERGEPOINTS"], None, lwsdk.OPSEL_USER)

        result = mod_command.execute(mod_command.data, cs_dict["ALIGNPOLS"], None, lwsdk.OPSEL_USER)

        if self._geartype == gears.SMOOTH:
            result = mod_command.execute(mod_command.data, cs_dict["FLIP"], None, lwsdk.OPSEL_USER)

        if self._axis != gears.Z:
            angle = 90.0
            if self._axis == gears.X:
                cs_options = lwsdk.marshall_dynavalues((angle, 'Y'))
            elif self._axis == gears.Y:
                cs_options = lwsdk.marshall_dynavalues((angle, 'X'))

            result = mod_command.execute(mod_command.data, cs_dict["ROTATE"], cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(fg_layers)
        result = mod_command.execute(mod_command.data, cs_dict["SETLAYER"], cs_options, lwsdk.OPSEL_USER)

        return lwsdk.AFUNC_OK


ServerTagInfo = [
                    ( "Python Gears", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Gears", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.CommandSequenceFactory("LW_PyGears", gears) : ServerTagInfo }
