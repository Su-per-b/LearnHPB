#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Command Sequence plug-in (Modeler) that creates
a ball and a box, each in a separate layer.
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Aug 15 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class make_test(lwsdk.ICommandSequence):
    def __init__(self, context):
        super(make_test, self).__init__()

        self._radius = lwsdk.Vector(0.5, 0.5, 0.5)
        self._nsides = 24
        self._nsegments = 12
        self._center = lwsdk.Vector(0.0, 0.0, 0.0)

    # LWCommandSequence -----------------------------------
    def process(self, mod_command):
        cs_options = lwsdk.marshall_dynavalues((self._radius, self._nsides, self._nsegments, self._center))
        cs_makeball = mod_command.lookup(mod_command.data, "MAKEBALL")
        result, dyna_value = mod_command.execute(mod_command.data, cs_makeball, cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues('2')
        cs_setlayer = mod_command.lookup(mod_command.data, "SETLAYER")
        result, dyna_value = mod_command.execute(mod_command.data, cs_setlayer, cs_options,lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues(([-0.5, -0.5, -0.5], [0.5, 0.5, 0.5], None))
        cs_makebox = mod_command.lookup(mod_command.data, "MAKEBOX")
        result, dyna_value = mod_command.execute(mod_command.data, cs_makebox, cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues('1')
        result, dyna_value = mod_command.execute(mod_command.data, cs_setlayer, cs_options, lwsdk.OPSEL_USER)

        cs_options = lwsdk.marshall_dynavalues('2')
        cs_setblayer = mod_command.lookup(mod_command.data, "SETBLAYER")
        result, dyna_value = mod_command.execute(mod_command.data, cs_setblayer, cs_options, lwsdk.OPSEL_USER)

        return lwsdk.AFUNC_OK


ServerTagInfo = [
                    ( "Python Make Test", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Make Test", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.CommandSequenceFactory("LW_PyMakeTest", make_test) : ServerTagInfo }
