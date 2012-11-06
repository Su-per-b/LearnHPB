#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that prompts the user to
select a file based on the current application settings, and
displays a series of messages that include the selection.
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

# Each class instance created must inherit from one (and only one) of the
# available SDK plug-in interfaces.  This example plug-in implements the
# IGeneric class interface, from which Generic-type plug-in instances will
# be created by the Factory.  An IGeneric plug-in performs its processing in
# the process() method, and receives a LWLayoutGeneric access interface.

class display_output(lwsdk.IGeneric):
    def __init__(self, context):
        super(display_output, self).__init__()
        # context has no relevant value in a Generic plug-in

    # LWGeneric -------------------------------------------
    def process(self, generic_access):
        # All this particular plug-in does is display some messages
        # to various outputs...

        # have the user select an image file...

        image_path = lwsdk.LWDirInfoFunc(lwsdk.LWFTYPE_IMAGE)
        image_pattern = lwsdk.LWFileTypeFunc(lwsdk.LWFTYPE_IMAGE)

        # returns tuple(result, file name, file path, full path)
        result = lwsdk.LWFileReqFunc("Select an image file", image_pattern, image_path)

        if (type(result) is tuple) and (result[0] == 1):
            # output the value to the PCore console as a regular message
            print result[3]
            # handle as an error on the PCore console ('errors' automatically open the console)
            print >>sys.stderr, result[3]

            # this will appear on the LightWave GUI
            lwsdk.LWMessageFuncs().info('Python v%s' % sys.version.split()[0], result[3])

        return lwsdk.AFUNC_OK

    # LWInstanceFuncs -------------------------------------
    def inst_load(self, loadstate):
        # optional
        return None     # LWError

    def inst_save(self, savestate):
        # optional
        return None     # LWError

    def inst_descln(self):
        # optional
        return "Python Display Output"

    def inst_copy(self, source):
        return None     # LWError


# ServerTagInfo is a list (or tuple) of one or more lists (or tuples) that
# define the plug-in's ServerTagInfo values.  Please see the LightWave SDK
# documentation for more information about the values found in a
# ServerTagInfo entry.

ServerTagInfo = [
                    ( "Python Display Output", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Display Output", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

# Every Python plug-in must define a global "ServerRecord" instance.
# This is a dictionary that mimics the LWSDK ServerRecord format.  For
# Python plug-ins, the dictionary key is an instance of a Factory that
# is responsible for generating Handler plug-ins of its "species", and
# the key value is a list of one or more ServerTagInfo settings (see above).
#
# Each plug-in type defines both a Handler and a Factory.  The Factory
# serves the role that LWInstanceFuncs does in the native-code SDK
# (that of creating and destroying instances).  In the Python case, the Factory
# implements the create() and destroy() methods of the LWInstanceFuncs, with
# load(), save(), copy() and descln() being more properly assigned to the Handler.
#
# It is the responsibilty of the Factory to generate instances of the Handler,
# initializing them with any provided context information.  It is important that
# Factories maintain a local link to the Handler instances they return to LightWave
# so that the instance is not reclaimed by Python's garbage collector until it
# is of no further use to LightWave (indicated by a call to the destroy() method).
# This can be accomplished in any way you choose; the pre-defined Factories for each
# plug-in type simply maintain lists of instances.
#
# When LightWave is done with the instance, it will call the Factory's destroy()
# method for any final disposal.

ServerRecord = { lwsdk.GenericFactory("LW_PyDisplayOutput", display_output) : ServerTagInfo }
