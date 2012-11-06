#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic plug-in that has the sole purpose
of testing the lwsdk.Panels 'tree_ctl' mechanics, with all of
its callbacks.
"""

import sys
import lwsdk

__author__     = "Bob Hood"
__date__       = "Oct 13 2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Bob Hood"
__email__      = "bob_hood@newtek.com"
__status__     = "Example"
__lwver__      = "11"

class TreeNode(object):
    def __init__(self, name):
        self.name = name
        self.flags = 0
        self.children = []

class test_panels_tree(lwsdk.IGeneric):
    def __init__(self, context):
        super(test_panels_tree, self).__init__()

    # Tree callbacks --------------------------------------

    # 'user_data' will be None here for tree_event_func(), because we did
    # not provide any when set_event() was called...

    def tree_event_func(self, id, user_data, selected_node):
        # print a message to the PCore Console
        print 'You selected: %s (%d children)' % (selected_node.name, len(selected_node.children))

    # if you have not called Panel.set_user_data(), then 'user_data' in
    # these next three methods will be None...

    def tree_info_func(self, id, user_data, node, flags):
        if node == None:
            node = self.tree_root
        if flags != 0:
            node.flags = flags
        return (node.name, node.flags)

    def tree_count_func(self, id, user_data, node):
        if node == None:
            node = self.tree_root
        return len(node.children)

    def tree_node_func(self, id, user_data, node, index):
        if node == None:
            node = self.tree_root
        try:
            child = node.children[index]
        except:
            child = None
        return child

    # LWGeneric -------------------------------------------
    def process(self, generic_access):
        self.tree_root = TreeNode("root")
        self.tree_root.children.append(TreeNode("Item 1"))
        self.tree_root.children[-1].children.append(TreeNode("Child 1-1"))
        self.tree_root.children[-1].children[-1].children.append(TreeNode("Child 1-1-1"))
        self.tree_root.children[-1].children[-1].children.append(TreeNode("Child 1-1-2"))
        self.tree_root.children[-1].children[-1].children[-1].children.append(TreeNode("Child 1-1-2-1"))
        self.tree_root.children.append(TreeNode("Item 2"))
        self.tree_root.children.append(TreeNode("Item 3"))
        self.tree_root.children[-1].children.append(TreeNode("Child 3-1"))

        ui = lwsdk.LWPanels()
        panel = ui.create('Test Tree')

        c1 = panel.tree_ctl('Tree', 200, 200, self.tree_info_func, self.tree_count_func, self.tree_node_func)
        c1.set_event(self.tree_event_func)  # note: no event data

        panel.align_controls_vertical([c1])
        panel.size_to_layout(5, 5)

        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        ui.destroy(panel)

        return lwsdk.AFUNC_OK

ServerTagInfo = [
                    ( "Python Tree Test", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Tree Test", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyTreeTest", test_panels_tree) : ServerTagInfo }
