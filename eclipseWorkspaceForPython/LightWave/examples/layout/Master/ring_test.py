#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a test of the LWComRing global.  It works with the ComRingTest binary
plug-in found in the LWSDK samples.
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Dec 22 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class ring_test(lwsdk.IMaster):
    def __init__(self, context):  # context has no relevant value in a Master plug-in
        super(ring_test, self).__init__()

        self._item_info = lwsdk.LWItemInfo()

        self._ui = lwsdk.LWPanels()
        self._panel = None

        self._comring = lwsdk.LWComRing()

        self._selected_camera = None
        self._selected_camera_name = None
        self._camera_active = {}
        self._camera_radii = {}
        self._camera_target = {}

        self._target_object = None

        # connect to the channel
        self._comring.ringAttach("ringtest_channel", self, self.ring_event);

    def __del__(self):
        # disconnect from the channel
        self._comring.ringDetach("ringtest_channel", self);

        self.release_panel()

    def release_panel(self, call_close=True):
        if self._panel:
            if call_close:
                self._panel.close()
            self._ui.destroy(self._panel)
            self._panel = None
            self._ui = None
            self._controls = None

    # ComRing ---------------------------------------------

    def ring_event(self, client_data, port_data, event_code, event_data):
        """
        we'll get a message from the ringtest.p plug-in as
        soon as we activate it on a camera.  the data transmitted
        to us is just for testing purposes.
        """

        if event_code == 1000:
            # decodeData() will return a tuple, even if only a single
            # data item is being decoded.  if there is an error in
            # arguments, None will be returned.
            #
            # in format cases where more than a single item is specified
            # (e.g., "f#5"), that element within the main return tuple
            # will be a sub-tuple of items.

            data = self._comring.decodeData(('s:100#3', 'i', 'd', 'f#5'), event_data)
            if data:
                # 'data' is ((s, s, s), i, d, (f, f, f, f, f))
                # show the tuple of strings
                print "RingTest: '%s'" % data[0][0]
                print "RingTest: '%s'" % data[0][1]
                print "RingTest: '%s'" % data[0][2]

                # the integer and double values
                print "RingTest:", data[1]
                print "RingTest:", data[2]

                # and the tuple of float values (Python only has doubles)
                print "RingTest:", data[3]
            else:
                print >>sys.stderr, "An error exists in the lwsdk.chunk_decode() arguments!"

    # LWInstanceFuncs -------------------------------------
    def inst_copy(self, source):
        return None     # LWError

    def inst_descln(self):
        return "Python Ring Test"

    # LWMaster --------------------------------------------
    def flags(self):
        return lwsdk.LWMAST_SCENE

    def event(self, ma):
        return 0.0

    # LWInterfaceFuncs ------------------------------------
    def inter_ui(self):
        if self._panel:
            self.release_panel()
        else:
            if not self._ui:
                self._ui = lwsdk.LWPanels()
            self._panel = self._ui.create('Ring Test')

            target_obj_ctl = self._panel.item_ctl('Target', lwsdk.LWI_ANY)
            target_obj_ctl.set_event(self.effector_change)

            camera_obj_ctl = self._panel.item_ctl('Camera', lwsdk.LWI_CAMERA)
            camera_obj_ctl.set_event(self.camera_change)

            camera_active_ctl = self._panel.bool_ctl('Active')
            camera_active_ctl.set_event(self.active_change)
            camera_active_ctl.set_int(0)
            camera_active_ctl.ghost()

            target_active_ctl = self._panel.bool_ctl('Target object')
            target_active_ctl.set_event(self.target_change)
            target_active_ctl.set_int(0)
            target_active_ctl.ghost()

            radius_ctl = self._panel.percent_ctl('Radius')
            radius_ctl.set_event(self.radius_change)
            radius_ctl.set_float(100.0)
            radius_ctl.ghost()

            self._controls = [target_obj_ctl, camera_obj_ctl, camera_active_ctl, target_active_ctl, radius_ctl]
            self._panel.align_controls_vertical(self._controls)
            self._panel.size_to_layout(5, 5)

            self._panel.set_close_callback(self.panel_close)

            self._panel.open(lwsdk.PANF_NOBUTT)

        return lwsdk.AFUNC_OK

    def panel_close(self, panel, data):
        if self._panel:
            self.release_panel(False)

    def effector_change(self, control, data):
        self._target_object = control.get_addr()

        if self._target_object:
            # tell the ringtest.p plug-in it has a new target object

            ring_data = self._comring.encodeData('k', (self._target_object,))
            if ring_data:
                self._comring.ringMessage("ringtest_channel", 1, ring_data)
                self._comring.releaseData(ring_data)

            if len(self._camera_target):
                for i in self._camera_target.keys():
                    if self._camera_target[i]:
                        lwsdk.command("SelectItemByName %s" % i)
                        lwsdk.command("TargetItem %s" % lwsdk.itemid_to_str(self._target_object))

                lwsdk.command("RefreshNow")
        else:
            # tell the ringtest.p plug-in it has no target object

            ring_data = self._comring.encodeData('k', (0,))
            if ring_data:
                self._comring.ringMessage("ringtest_channel", 1, ring_data)
                self._comring.releaseData(ring_data)

    def camera_change(self, control, data):
        self._selected_camera = control.get_addr()

        if self._selected_camera:
            self._selected_camera_name = self._item_info.name(self._selected_camera)
            lwsdk.command("SelectItem %s" % lwsdk.itemid_to_str(self._selected_camera))
            self._controls[2].unghost()

            if (not len(self._camera_active)) or (self._selected_camera_name not in self._camera_active):
                self._controls[2].set_int(0)
                self._controls[3].ghost()
                self._controls[4].ghost()

            else:
                if (not len(self._camera_radii)) or (self._selected_camera_name not in self._camera_radii):
                    self._camera_radii[self._selected_camera_name] = 100.0

                if (not len(self._camera_target)) or (self._selected_camera_name not in self._camera_target):
                    self._camera_target[self._selected_camera_name] = False

                self._controls[2].set_int(1 if self._camera_active[self._selected_camera_name] else 0)

                if self._camera_active[self._selected_camera_name]:
                    self._controls[3].unghost()
                    self._controls[4].unghost()

                    if len(self._camera_target) and (self._selected_camera_name in self._camera_target):
                        self._controls[3].set_int(1 if self._camera_target[self._selected_camera_name] else 0)
                    if len(self._camera_radii) and (self._selected_camera_name in self._camera_radii):
                        self._controls[4].set_float(self._camera_radii[self._selected_camera_name])
        else:
            self._controls[2].ghost()
            self._controls[3].ghost()
            self._controls[4].ghost()

    def active_change(self, control, data):
        if not self._selected_camera:
            return

        self._camera_active[self._selected_camera_name] = (True if control.get_int() else False)

        # add/remove the RingTest plug-in

        if self._camera_active[self._selected_camera_name]:
            lwsdk.command("ApplyServer CustomObjHandler ComRingTest")
            self._controls[3].unghost()
            self._controls[4].unghost()
        else:
            lwsdk.command("RemoveServer CustomObjHandler 1")
            self._controls[3].ghost()
            self._controls[4].ghost()

    def target_change(self, control, data):
        if not self._selected_camera:
            return

        self._camera_target[self._selected_camera_name] = (True if control.get_int() else False)

        if self._target_object:
            lwsdk.command("SelectItem %s" % lwsdk.itemid_to_str(self._selected_camera))

            if self._camera_target[self._selected_camera_name]:
                lwsdk.command("TargetItem %s" % lwsdk.itemid_to_str(self._target_object))
            else:
                lwsdk.command("TargetItem 0")

        # send some sample data to the ringtest.p plug-in
        # each time the target is changed.  this is just
        # dummy data

        strings = ("Falicitations!", "Salutations!", "Greetings!")
        floats = (6.6666, 7.7777, 8.8888, 9.9999, 0.0000)

        ring_data = self._comring.encodeData(('s:100#3', 'i', 'd', 'f#5'), (strings, 67832, 34.8765, floats))
        if ring_data:
            self._comring.ringMessage("ringtest_channel", 2, ring_data)
            self._comring.releaseData(ring_data)

    def radius_change(self, control, data):
        if not self._selected_camera:
            return

        self._camera_radii[self._selected_camera_name] = control.get_float()

        if self._camera_active[self._selected_camera_name]:
            # tell the ringtest.p plug-in to alter its radius

            ring_data = self._comring.encodeData('d', (self._camera_radii[self._selected_camera_name] / 100.0,))
            if ring_data:
                ring_code = int(lwsdk.itemid_to_str(self._selected_camera), 16)
                self._comring.ringMessage("ringtest_channel", ring_code, ring_data)
                self._comring.releaseData(ring_data)
                lwsdk.command("RefreshNow")

ServerTagInfo = [
                    ( "Python Ring Test", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Ring Test", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.MasterFactory("LW_PyRingTest", ring_test) : ServerTagInfo }
