#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Tool plug-in based on the LScript of the same name.
"""

import sys
import math
import lwsdk

from copy import deepcopy
from lwsdk import Vector

__author__     = "Bob Hood"
__date__       = "Oct 4th 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class PyBone:
    def __init__(self, id, parent, type, restlength):
        self.id = id
        self.parent = parent
        self.type = type
        self.restlength = restlength

    def __copy__(self):
        return PyBone(self.id, self.parent, self.type, self.restlength)

    def __deepcopy__(self, memo):
        return self.__copy__()

class split_bone(lwsdk.ILayoutTool):
    def __init__(self, context):
        super(split_bone, self).__init__()
        # context has no relevant value in a LayoutTool plug-in

        self._item_info      = lwsdk.LWItemInfo()
        self._bone_info      = lwsdk.LWBoneInfo()
        self._envelope_funcs = lwsdk.LWEnvelopeFuncs()
        self._channel_info   = lwsdk.LWChannelInfo()

        self._frac   = 0.5
        self._dirty  = False
        self._handle = -1
        self._moved  = False

        self._bones = None

    # Utility (locally defined functions) -----------------
    def set_chan_to_value(self, chan, value):
        envelope_id = self._channel_info.channelEnvelope(chan)
        key = self._envelope_funcs.nextKey(envelope_id, None)
        while key:
            if self._envelope_funcs.keySet(envelope_id, key, lwsdk.LWKEY_VALUE, value) == 0:
                pass    # this is a failure
            key = self._envelope_funcs.nextKey(envelope_id, key)

    def add_value_to_chan(self, chan, incval):
        envelope_id = self._channel_info.channelEnvelope(chan)
        key = self._envelope_funcs.nextKey(envelope_id, None)
        while key:
            result, value = self._envelope_funcs.keyGet(envelope_id, key, lwsdk.LWKEY_VALUE)
            if result == 0:
                pass    # this is a failure
            self._envelope_funcs.keySet(envelope_id, key, lwsdk.LWKEY_VALUE, incval + value)
            key = self._envelope_funcs.nextKey(envelope_id, key)

    def mul_value_to_chan(self, chan, mulval):
        envelope_id = self._channel_info.channelEnvelope(chan)
        key = self._envelope_funcs.nextKey(envelope_id, None)
        while key:
            result, value = self._envelope_funcs.keyGet(envelope_id, key, lwsdk.LWKEY_VALUE)
            if result == 0:
                pass    # this is a failure
            self._envelope_funcs.keySet(envelope_id, key, lwsdk.LWKEY_VALUE, mulval * value)
            key = self._envelope_funcs.nextKey(envelope_id, key)

    def get_vec_channels(self, item, chanidx):
        channel_group = self._item_info.chanGroup(item)
        xchan = self._channel_info.nextChannel(channel_group, None)
        for i in range(chanidx):
            xchan = self._channel_info.nextChannel(channel_group, xchan)
        ychan = self._channel_info.nextChannel(channel_group, xchan)
        zchan = self._channel_info.nextChannel(channel_group, ychan)

        return (xchan, ychan, zchan)

    def set_vec_chan_to_value(self, item, chanidx, val):
        xchan, ychan, zchan = self.get_vec_channels(item, chanidx)

        self.set_chan_to_value(xchan, val.x)
        self.set_chan_to_value(ychan, val.y)
        self.set_chan_to_value(zchan, val.z)

    def add_value_to_vec_chan(self, item, chanidx, incval):
        xchan, ychan, zchan = self.get_vec_channels(item, chanidx)

        self.add_value_to_chan(xchan, incval.x)
        self.add_value_to_chan(ychan, incval.y)
        self.add_value_to_chan(zchan, incval.z)

    def mul_value_to_vec_chan(self, item, chanidx, mulval):
        xchan, ychan, zchan = self.get_vec_channels(item, chanidx)

        self.mul_value_to_chan(xchan, mulval)
        self.mul_value_to_chan(ychan, mulval)
        self.mul_value_to_chan(zchan, mulval)

    def split_bone(self, bone, split):
        cur_time = lwsdk.LWTimeInfo().time;
        pos = self._item_info.param(bone.id, lwsdk.LWIP_W_POSITION, cur_time)
        rest_pos = Vector(self._bone_info.restParam(bone.id, lwsdk.LWIP_POSITION))
        rest_rot = Vector(self._bone_info.restParam(bone.id, lwsdk.LWIP_ROTATION))
        rest_rot *= math.pi / 180.0
        rest_len = bone.restlength

        # Clone the existing bone
        # Make the new bone the parent, existing bone the child

        lwsdk.command("SelectItem %s" % lwsdk.itemid_to_str(bone.id))
        lwsdk.command("Clone 1")

        selected_items = lwsdk.LWInterfaceInfo().selected_items()
        new_bone = PyBone(selected_items[0],
                        self._item_info.parent(selected_items[0]),
                        self._bone_info.type(selected_items[0]),
                        self._bone_info.restLength(selected_items[0]))

        # Make new bone child of original parent
        lwsdk.command("ParentItem %s" % lwsdk.itemid_to_str(bone.parent))

        # Motion options corrections:
        # - Don't copy over the goal
        lwsdk.command("GoalItem 0")

        if new_bone.type == lwsdk.LWBONETYPE_ZAXIS:
            temp_vector = Vector(0,0,1)
            split_pos = temp_vector * (rest_len * split)

            # Make new bone shorter to the split
            lwsdk.command("BoneRestLength %g" % (rest_len * split))

            # Make corrections to existing bone
            # - Parent it to the new bone
            # - Place at the split position
            # - Shorten it to the remainder of original length
            # - Reset scale and rotation (as those are now done by new bone)

            lwsdk.command("SelectItem %s" % lwsdk.itemid_to_str(bone.id))
            lwsdk.command("ParentItem %s" % lwsdk.itemid_to_str(new_bone.id))

            # Set positions
            self.set_vec_chan_to_value(bone.id, 0, split_pos)
            lwsdk.command("PivotPosition 0 0 0")
            lwsdk.command("BoneRestPosition %s" % str(split_pos))

            lwsdk.command("BoneRestLength %g" % (rest_len * (1-split)))

            # Set rotations
            self.set_vec_chan_to_value(bone.id, 3, Vector(0,0,0))
            lwsdk.command("PivotRotation 0 0 0")
            lwsdk.command("BoneRestRotation 0 0 0")

            # Set scales
            self.set_vec_chan_to_value(bone.id, 6, Vector(1,1,1));

            lwsdk.command("DirtyMotion")
            lwsdk.command("UpdateMotion")

            # Move children to take into account shortened bone
            child_id = self._item_info.firstChild(bone.id)
            while child_id:
                lwsdk.command("SelectItem %s" % lwsdk.itemid_to_str(child_id))
                self.add_value_to_vec_chan(child_id, 0, -split_pos);
                if self._item_info.type(child_id) == lwsdk.LWI_BONE:
                    child_pos = Vector(self._bone_info.restParam(child_id, lwsdk.LWIP_POSITION))
                    child_pos -= split_pos;
                    lwsdk.command("BoneRestPosition %s" % str(child_pos))

                lwsdk.command("DirtyMotion")
                lwsdk.command("UpdateMotion")

                child_id = self._item_info.nextChild(bone.id, child_id)
        else:
            axispos, axis = self.get_world_bone_axis(bone)

            # Move new bone to split position
            new_rest_pos = rest_pos * split
            lwsdk.command("BoneRestPosition %s" % str(new_rest_pos))
            # newPos = split * pos
            self.mul_value_to_vec_chan(new_bone.id, 0, split)
            lwsdk.command("BoneRestRotation 0 0 0")
            self.set_vec_chan_to_value(new_bone.id, 3, Vector(0,0,0))
            self.set_vec_chan_to_value(new_bone.id, 6, Vector(1,1,1))

            lwsdk.command("DirtyMotion")
            lwsdk.command("UpdateMotion")

            # Make corrections to existing bone
            # - Parent it to the new bone
            lwsdk.command("SelectItem %s" % lwsdk.itemid_to_str(bone.id))
            lwsdk.command("ParentItem %s" % lwsdk.itemid_to_str(new_bone.id))

            # - Correct place to account for new bone parent
            #   New bone parent has no rotation and unit scale,
            #   so only difference is a position offset
            new_rest_pos = rest_pos * (1.0 - split)
            lwsdk.command("BoneRestPosition %s" % str(new_rest_pos))
            # newPos = (1.0 - split) * pos
            self.mul_value_to_vec_chan(bone.id, 0, 1.0 - split)

            lwsdk.command("DirtyMotion")
            lwsdk.command("UpdateMotion")

        return new_bone

    def get_current_bones(self):
        selected_bones = []

        selection = lwsdk.LWInterfaceInfo().selected_items()
        if selection == None:
            return selected_bones

        for item in selection:
            if self._item_info.type(item) == lwsdk.LWI_BONE:
                bone_type = self._bone_info.type(item)
                parent = self._item_info.parent(item)
                if bone_type == lwsdk.LWBONETYPE_ZAXIS:
                    selected_bones.append(PyBone(item, parent, bone_type, self._bone_info.restLength(item)))
                else:
                    if parent != None:
                        if self._item_info.type(parent) == lwsdk.LWI_BONE:
                            bone_type = self._bone_info.type(parent)
                            if bone_type == lwsdk.LWBONETYPE_JOINT:
                                selected_bones.append(PyBone(item, parent, bone_type, self._bone_info.restLength(item)))

        return selected_bones

    def get_world_bone_axis(self, bone):
        cur_time = lwsdk.LWInterfaceInfo().curTime

        if bone.type == lwsdk.LWBONETYPE_ZAXIS:
            pos = self._item_info.param(bone.id, lwsdk.LWIP_W_POSITION, cur_time)
            forward = self._item_info.param(bone.id, lwsdk.LWIP_FORWARD, cur_time)

            return (pos, forward * bone.restlength)

        pos = self._item_info.param(bone.id, lwsdk.LWIP_W_POSITION, cur_time)
        ppos = self._item_info.param(bone.parent, lwsdk.LWIP_W_POSITION, cur_time)
        forward = pos - ppos

        return (ppos, forward)

    # LWLayoutTool ----------------------------------------
    def tool_draw(self, ca):
        self._bones = self.get_current_bones()
        cur_time = lwsdk.LWInterfaceInfo().curTime

        for bone in self._bones:
            if bone.type == lwsdk.LWBONETYPE_ZAXIS:
                len = bone.restlength;
                dir = Vector(0,0,1)

                ca.setCSysItem(ca.dispData, bone.id);

            else:

                pos = self._item_info.param(bone.id, lwsdk.LWIP_POSITION, cur_time)
                len = Vector.magnitude(pos)
                dir = pos / len;

                ca.setCSysItem(ca.dispData, bone.parent);

            ca.setDrawMode(ca.dispData, 8 + 4)

            q1 = Vector(-0.1,-0.1,0)
            q2 = Vector( 0.1,-0.1,0)
            q3 = Vector( 0.1, 0.1,0)
            q4 = Vector(-0.1, 0.1,0)

            q1 += dir * self._frac
            q1 *= len
            q2 += dir * self._frac
            q2 *= len
            q3 += dir * self._frac
            q3 *= len
            q4 += dir * self._frac
            q4 *= len

            # color can be a lwsdk.Vector, lwsdk.Color or a Python sequence
            ca.setColor(ca.dispData, [1.0, 0.3, 0.1, 1.0])

            ca.line(ca.dispData, q1, q2, lwsdk.LWCSYS_OBJECT)
            ca.line(ca.dispData, q2, q3, lwsdk.LWCSYS_OBJECT)
            ca.line(ca.dispData, q3, q4, lwsdk.LWCSYS_OBJECT)
            ca.line(ca.dispData, q4, q1, lwsdk.LWCSYS_OBJECT)
            ca.line(ca.dispData, q1, q3, lwsdk.LWCSYS_OBJECT)
            ca.line(ca.dispData, q2, q4, lwsdk.LWCSYS_OBJECT)

            ca.setColor(ca.dispData, [1.0, 0.3, 0.1, 0.2])
            ca.quad(ca.dispData, q1, q2, q3, q4, lwsdk.LWCSYS_OBJECT)

    def tool_down(self, event):
        self._handle = -1
        self._moved = False

        self._bones = self.get_current_bones()

        for i in range(len(self._bones)):
            bone = self._bones[i]

            pos, axis = self.get_world_bone_axis(bone)

            pos += axis * self._frac
            scale = Vector.magnitude(axis) / 10.0

            eventpos = Vector(event.posRaw[0], event.posRaw[1], event.posRaw[2])
            eventaxis = Vector(event.axis[0], event.axis[1], event.axis[2])

            # te.axis is normalized
            # d = |(x2-x1) x (x1-x0)| / |x2-x1|
            # x2 = eventpos, x1 = eventpos + axis, x0 = pos
            # (x2-x1) = -axis
            # (x1-x0) = eventpos+axis - pos
            # |(x2-x1)| = 1
            # (-axis) x (eventpos-pos+axis)
            d = Vector.magnitude(Vector.cross(-eventaxis, eventpos - pos + eventaxis))

            if d <= scale:
                self._handle = i
                return 1

        return 0

    def tool_move(self, event):
        if self._handle < 0:
            return

        # Nearest point on line A to line B:
        #   N = (Da x Db) x Db
        #   t = ((Pb - Pa) . N) / (Da . N)
        # A == bone
        # B == event
        # event axis (Db) is normalized, so t in units of |Da|

        pos, axis = self.get_world_bone_axis(self._bones[self._handle])

        eventpos = Vector(event.posRaw[0], event.posRaw[1], event.posRaw[2])
        eventaxis = Vector(event.axis[0], event.axis[1], event.axis[2])

        N = Vector.cross(Vector.cross(axis, eventaxis), eventaxis)
        DaN = Vector.dot(axis, N)
        Pba = eventpos - pos
        self._frac = Vector.dot(Pba, N) / DaN

        if self._frac < 0: self._frac = 0
        if self._frac > 1: self._frac = 1

        self._dirty = True
        self._moved = True

    def tool_up(self, event):
        if (self._handle >= 0) and self._moved:
            new_bones = deepcopy(self._bones)

            # Make sure ParentInPlace is OFF
            pip = ((lwsdk.LWInterfaceInfo().generalFlags & lwsdk.LWGENF_PARENTINPLACE) == lwsdk.LWGENF_PARENTINPLACE)
            if pip:
                lwsdk.command("ParentInPlace")

            for bone in self._bones:
                new_bones.append(self.split_bone(bone, self._frac))

            if pip:
                lwsdk.command("ParentInPlace")

            for i in range(len(new_bones)):
                if i == 0:
                    lwsdk.command("SelectItem %s" % lwsdk.itemid_to_str(new_bones[i].id))
                else:
                    lwsdk.command("AddToSelection %s" % lwsdk.itemid_to_str(new_bones[i].id))

        self._handle = -1

    def tool_dirty(self):
        if self._dirty:
            self._dirty = False
            return 1
        return 0

ServerTagInfo = [
                    ( "Python Split Bone", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Split Bone", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.LayoutToolFactory("LW_PySplitBone", split_bone) : ServerTagInfo }
