#! /usr/bin/env python
# -*- Mode: Python -*-
# -*- coding: ascii -*-

"""
This is a LightWave Generic Plugin that aids in collecting and
moving LightWave content files.
"""

import sys, os, shutil, tempfile
import math
import lwsdk

__author__     = "Jarrod Davis"
__date__       = "3/23/2011"
__copyright__  = "Copyright (C) 2011 NewTek, Inc."
__version__    = "1.0"
__maintainer__ = "Jarrod Davis"
__status__     = "Utility"
__lwver__      = "11"

class package_scene(lwsdk.IGeneric):
    def __init__(self, context):
        super(package_scene, self).__init__()

        self.content_dir = lwsdk.LWDirInfoFunc('Content')
        self.scene = lwsdk.LWSceneInfo()
        self.images = lwsdk.LWImageList()

        self.comring = lwsdk.LWComRing()
        self.RINGNAME = "NT_Package_Scene"

        self.imageMasterList = []
        self.imageMasterList.append( self.images.first() )
        while self.images.next( self.imageMasterList[ (len(self.imageMasterList) - 1) ] ):
            self.imageMasterList.append( self.images.next( self.imageMasterList[ (len(self.imageMasterList) - 1) ] ) )

    def consolidate_active(self, control, userdata):
        if self.consolidate_check.get_int() == True:
            self.target_folder.ghost()
            self.preserve_check.ghost()
            self.asset_string.ghost()
            self.imseq_check.ghost()
            self.imsub_choice.ghost()
            self.sc_string.ghost()
            self.ob_string.ghost()
            self.im_string.ghost()
            self.dyn_string.ghost()
            self.ies_string.ghost()
            self.rad_string.ghost()
            self.vert_string.ghost()
            self.radsave_check.ghost()
            self.reload_check.ghost()

        elif self.consolidate_check.get_int() == False:
            self.target_folder.unghost()
            self.preserve_check.unghost()
            self.asset_string.unghost()
            self.imseq_check.unghost()
            self.imsub_choice.unghost()
            self.sc_string.unghost()
            self.ob_string.unghost()
            self.im_string.unghost()
            self.dyn_string.unghost()
            self.ies_string.unghost()
            self.rad_string.unghost()
            self.vert_string.unghost()
            self.radsave_check.unghost()
            self.reload_check.unghost()

    def imseq_active(self, control, userdata):
        if self.imseq_check.get_int() == True:
            self.imsub_choice.unghost()
        elif self.imseq_check.get_int() == False:
            self.imsub_choice.ghost()

    def radcache_active(self, control, userdata):
        if self.radsave_check.get_int() == True:
            self.rad_string.unghost()
        elif self.radsave_check.get_int() == False:
            self.rad_string.ghost()

    def consol_string(self, diritem):
        return os.path.join(self.target_dir,diritem,self.asset_str)

    def refresh_items(self, control, userdata):
        self.ob_string.set_str( os.path.join( self.target_folder.get_str(),"Objects",self.asset_string.get_str() ) )
        self.sc_string.set_str( os.path.join( self.target_folder.get_str(),"Scenes",self.asset_string.get_str() ) )
        self.im_string.set_str( os.path.join( self.target_folder.get_str(),"Images",self.asset_string.get_str() ) )
        self.dyn_string.set_str( os.path.join( self.target_folder.get_str(),"Dynamics",self.asset_string.get_str() ) )
        self.ies_string.set_str( os.path.join( self.target_folder.get_str(),"Lights",self.asset_string.get_str() ) )
        self.rad_string.set_str( os.path.join( self.target_folder.get_str(),"Radiosity",self.asset_string.get_str() ) )
        self.vert_string.set_str( os.path.join( self.target_folder.get_str(),"VertCache",self.asset_string.get_str() ) )

    def make_content_target(self, source, dest):
        newdest = os.path.join(dest,os.path.basename(source) )
        return newdest

    def matchfiles(self, path, pattern):
        ''' Mimics the LScript matchfiles command, I hope '''

        dlist = os.listdir(path)
        if dlist:
            olist = []
            for f in dlist:
                if f.endswith(pattern) == True:
                    olist.append(f)
            return olist

    def copy_sequence(self, source, sourcename, dest, mode):
        ''' Mode 0 is copy the sequence to the root directory
            Mode 1 is copy the sequence to a named subdirectory '''

        if source != None:
            seqbase = os.path.splitext(os.path.basename(sourcename.replace('(sequence)','') ) )[0]
            ext = os.path.splitext(source)[1]
            flist = self.matchfiles(os.path.dirname(source),ext)
            subbase = os.path.split(source)[0]

            numimgs = float(len(flist))
            curimg = 0.0
            for f in flist:
                seq1 = f[len(seqbase)-1:]
                seqnum = seq1[:4]
                if mode == 1:
                    newdest = os.path.join(dest, seqbase[:-2], seqbase.strip() + seqnum + ext)
                else:
                    newdest = dest + seqbase.strip() + seqnum + ext
                self.psCopy( os.path.join(os.path.dirname(source),f) , newdest)
                lwsdk.command("StatusMsg {%.2f}Copying sequence ..." % (curimg / numimgs))
                curimg += 1.0
            if mode == 1:
                seq1 = flist[0][len(seqbase)-1:]
                seqnum = seq1[:4]
                lwsdk.command("StatusMsg Done copying sequences.")
                return os.path.join(dest, seqbase[:-2], seqbase.strip() + seqnum + ext)
            else:
                seq1 = flist[0][len(seqbase)-1:]
                seqnum = seq1[:4]
                lwsdk.command("StatusMsg Done copying sequences.")
                return dest + seqbase.strip() + seqnum + ext
        else:
            return -1

    def copy_mc_sequence(self, source, dest):
        ''' Mode 0 is copy the sequence to the root directory
            Mode 1 is copy the sequence to a named subdirectory '''

        if source != None:
            ext = ".mc"
            flist = self.matchfiles(os.path.dirname(source + "Frame"),ext)
            seqbase = os.path.splitext(source)[0]
            subbase = os.path.split(source)[0]
            nummc = float(len(flist))
            curmc = 0.0
            for f in flist:
                seq1 = f[len(seqbase)-1:]
                seqnum = seq1[:4]

                newdest = os.path.join(os.path.dirname(dest), f)
                self.psCopy( os.path.join(os.path.dirname(source),f) , newdest)
                lwsdk.command("StatusMsg {%.2f}Copying sequence ..." % (curmc / nummc))
                curmc += 1.0

                seq1 = flist[0][len(seqbase)-1:]
                seqnum = seq1[:4]
                lwsdk.command("StatusMsg Done copying sequences.")
            return dest + seqbase.strip() + seqnum + ext
            ftest.close()
        else:
            return -1

    def psCopy(self, source, dest):
        dsplit = os.path.split(dest)
        try:
            os.makedirs( dsplit[0] )
        except:
            try:
                os.makedirs( dsplit[0] + os.sep )
            except:
                newd = os.path.join(os.path.splitdrive(dsplit[0])[0] + os.sep, os.path.splitdrive(dsplit[0])[1])
                try:
                    os.makedirs(newd)
                except:
                    myerr = sys.exc_value
        if os.path.lexists( dest ) == False:
            try:
                shutil.copy2(source, dest)
            except:
                psource = os.path.join(os.path.splitdrive(source)[0] + os.sep, os.path.splitdrive(source)[1]).replace('\\','/')
                pdest = os.path.join(os.path.splitdrive(dest)[0] + os.sep, os.path.splitdrive(dest)[1]).replace('\\','/')
                try:
                    shutil.copy2(psource, pdest)
                except:
                    myerr = sys.exc_value

    def strip_first_slash(self, inline):
        indrive = os.path.splitdrive(inline)[0]
        inpath = os.path.dirname(os.path.splitdrive(inline)[1])
        infile = os.path.basename(inline)

        if inpath[:1] == os.sep or inpath[:1] == '\\' or inpath[:1] == '/':
            inpath = inpath[1:]

        outpath = os.path.join(indrive + inpath, infile).replace('\\','/')
        return outpath

    def comring_event(self, client_data, port_data, event_code, event_data):
        pass

    def process(self, generic_access):
        #launch interface

        ui = lwsdk.LWPanels()
        panel = ui.create('Package Scene')
        panel.setw(750)

        # The consolidate option doesn't move anything, but grabs all assets and puts them in the content structure
        # you're currently using

        self.consolidate_check = panel.bool_ctl("Consolidate files only")
        self.consolidate_check.move(150, self.consolidate_check.y() )
        self.consolidate_check.set_event(self.consolidate_active )

        # The panel.dir_ctl() call creates a requester in which you'll choose the destination folder

        self.target_folder = panel.dir_ctl("Destination folder:", 98)
        self.target_folder.set_event(self.refresh_items)
        self.preserve_check = panel.bool_ctl("Preserve Existing Structure")

        # Subfolders are folders that go below the Objects, Scenes, and Images folders, should they be needed.

        self.asset_string = panel.str_ctl("Subfolder:", 72)
        self.asset_string.set_event(self.refresh_items)

        # This gives the user the option of whether to copy complete image sequences or not.
        # If the user opts not to copy the sequences, only the first image of the sequence will be copied

        self.imseq_check = panel.bool_ctl("Copy Image Sequences")
        self.imseq_check.set_event(self.imseq_active)

        # This selection box gives the user the option to either consolidate all images (including sequences)
        # into the target Images directory, or to have subfolders created for image sequences to keep
        # them neat and tidy

        self.imsub_list = []
        self.imsub_list.append("Root Images folder")
        self.imsub_list.append("Sequence-named subfolder")
        self.imsub_choice = panel.hchoice_ctl("Image sequence destination:", self.imsub_list)
        self.imseq_active(self, self.imseq_active)

        # This displays the eventual path destinations for the individual asset types

        self.sc_string = panel.dir_ctl("Scenes path:", 98)
        self.ob_string = panel.dir_ctl("Objects path:", 98)
        self.im_string = panel.dir_ctl("Images path:", 98)
        self.dyn_string = panel.dir_ctl("Dynamics path:", 98)
        self.ies_string = panel.dir_ctl("Photometric lights path:",98)
        self.rad_string = panel.dir_ctl("Radiosity Cache path:",98)
        self.vert_string = panel.dir_ctl("Vertex Cache path:",98)

        self.radsave_check = panel.bool_ctl("Copy Radiosity cache file")
        self.radsave_check.set_event(self.radcache_active)
        self.radcache_active(self, self.radcache_active)
        self.radsave_check.set_int(1)
        self.rad_string.unghost()
        self.reload_check = panel.bool_ctl("Reload Original Scene")

        panel.align_controls_vertical([self.consolidate_check,
                                       self.target_folder,
                                       self.preserve_check,
                                       self.asset_string,
                                       self.imseq_check,
                                       self.imsub_choice,
                                       self.sc_string,
                                       self.ob_string,
                                       self.im_string,
                                       self.dyn_string,
                                       self.ies_string,
                                       self.rad_string,
                                       self.vert_string,
                                       self.radsave_check,
                                       self.reload_check])

        self.target_folder.set_str(self.content_dir)
        self.refresh_items(None,None)
        if panel.open(lwsdk.PANF_BLOCKING | lwsdk.PANF_CANCEL) == 0:
            ui.destroy(panel)
            return lwsdk.AFUNC_OK

        #end interface ------------------------------------------------------------------------

        #getting values ------------------------------------------------------------------------

        self.consolidate = self.consolidate_check.get_int()

        self.target_dir = self.target_folder.get_str()
        self.preserve = self.preserve_check.get_int()
        self.asset_str = self.asset_string.get_str()

        self.imseq = self.imseq_check.get_int()
        self.imsub = self.imsub_choice.get_int()

        self.ob_dir = self.ob_string.get_str()
        self.sc_dir = self.sc_string.get_str()
        self.im_dir = self.im_string.get_str()
        self.dyn_dir = self.dyn_string.get_str()
        self.ies_dir = self.ies_string.get_str()
        self.rad_dir = self.rad_string.get_str()
        self.vert_dir = self.vert_string.get_str()
        self.radsave = self.radsave_check.get_int()

        self.reload = self.reload_check.get_int()
        
        #end getting values ------------------------------------------------------------------------

        self.comring.ringAttach(self.RINGNAME,self,self.comring_event)
        data = self.comring.encodeData("s:512#2",(self.content_dir, self.target_dir));
        self.comring.ringMessage(self.RINGNAME,1,data); # event #1 would be "copy to new content"
        #self.comring.ringDetatch(self.RINGNAME)

        #begin image processing ------------------------------------------------------------------------
        if self.images.first() != None:  # there are images to be worked on
            if self.consolidate == True:
                asset_str = ""

                self.target_dir = self.content_dir
                self.ob_dir = self.consol_string("Objects")
                self.sc_dir = self.consol_string("Scenes")
                self.im_dir = self.consol_string("Images")
                self.dyn_dir = self.consol_string("Dynamics")
                self.ies_dir = self.consol_string("Lights")
                self.rad_dir = self.consol_string("Radiosity")
                self.vert_dir = self.consol_string("VertCache")

            for currentImage in self.imageMasterList:            
                #construct new path
                currentfile = self.images.filename(currentImage,0)  #current filename from the big list
                currentname = self.images.name(currentImage)
                if self.content_dir in currentfile:
                    validContent = True
                else:
                    validContent = False
# sequence section ----
                if '(sequence)' in currentname and self.imseq == True:              #is a sequence and wants to copy it
                    if validContent == True and self.preserve == 1:                 #wants to preserve, and has a chance
                        #target is the destination content + original directory
                        image_target = os.path.join(self.target_dir,os.path.dirname(currentfile).replace(self.content_dir,'').strip('\\/') )   
                    else:                                                           #don't want to preserve or can't
                        image_target = self.im_dir                                  #not valid content directory, can't preserve
                    
                    first_image = self.copy_sequence(currentfile, currentname, image_target, self.imsub)    # process and copy sequence
                    self.images.replace(currentImage, first_image)

# image section ----------
                else:                                                               #not a sequence
                    if validContent == True and self.preserve == 1:                 #wants to preserve, and has a chance
                        #target is the destination content + original directory
                        image_target = os.path.join(self.target_dir,os.path.dirname(currentfile).replace(self.content_dir,'').strip('\\/') )
                    else:
                        image_target = self.make_content_target(currentfile,self.im_dir)    #get the destination target path
                        self.psCopy(currentfile, image_target)                          #copy, making directories if necessary
                        self.images.replace(currentImage, image_target)                 #replace old image with new
        else:  # no images loaded
            pass # "No Images to copy"

# end image processing -----------------------------

        lwsdk.command("ContentDirectory " + self.target_dir)

# begin object processing ---------------------------------------------

#get object list

        item_info = lwsdk.LWItemInfo()
        obj_info = lwsdk.LWObjectInfo()

        objlist = []
        myobj = item_info.first( lwsdk.LWI_OBJECT, lwsdk.LWITEM_NULL )
        if myobj != lwsdk.LWITEM_NULL:
            objlist.append( myobj )
            while myobj != lwsdk.LWITEM_NULL:
                myobj = item_info.next( myobj )
                if myobj != lwsdk.LWITEM_NULL:
                    objlist.append( myobj )
#get destination path

            for obj in objlist:
                #if item_info.name( obj ) != obj_info.filename( obj ):   # probably isn't a null object
                if obj_info.numPoints( obj ) != 1 and obj_info.numPolygons( obj ) != 0:
                    if self.preserve == True and os.path.dirname(obj_info.filename( obj )) != self.content_dir and self.content_dir in obj_info.filename( obj ):   # valid and can preserve
                        ob_path = obj_info.filename( obj ).replace(self.content_dir,'')
                        new_path = os.path.join(self.ob_dir, ob_path)
                    else:
                        new_path = os.path.join(self.ob_dir, os.path.basename(obj_info.filename( obj )))
                    try:
                        os.makedirs( os.path.dirname(new_path) )
                    except:
                        try:
                            os.makedirs( os.path.dirname(new_path) + os.sep )
                        except:
                            myerr = sys.exc_value
#save object to new path
                    if os.path.lexists( os.path.dirname(new_path) ) == True:
                        lwsdk.command("SelectByName " + item_info.name( obj ))
                        lwsdk.command("SaveObject " + new_path)
                else:
                    pass # "Must be null"

# end object processing ------------------

# begin scene processing -----------------
        if self.preserve == 1 and self.content_dir in self.scene.filename and os.path.dirname(self.scene.filename) != self.content_dir:
            sc_sub = self.scene.filename.replace(self.content_dir,'')
            new_scene = os.path.join(self.sc_dir, sc_sub, self.scene.name)
        else:
            new_scene = os.path.join(self.sc_dir, self.scene.name)

        try:
            os.makedirs( os.path.dirname(new_scene) )
        except:
            try:
                os.makedirs( os.path.dirname(new_scene) + os.sep )
            except:
                myerr = sys.exc_value

        if os.path.lexists( os.path.dirname(new_scene) ) == True:
            tempdir = tempfile.mkdtemp()
            tempscene = os.path.join(tempdir, self.scene.name)
            lwsdk.command("SaveSceneCopy " + tempscene)

        infile = open(tempscene, "r")
        lines = infile.readlines()
        infile.close()

        outfile = open(new_scene, 'w')

        photo_on = False
        bdd_on = False
        mdd_on = False
        vert_on = False
        mddnode_on = False
        flock_on = False

        # scan scene for ancillary files
        for l in lines:
            l = l.replace('\n','')  # strip newline

            # 1. Get path
            # 2. Find old item
            # 3. Prepare new path
            # 4. Copy old item to new path
            # 5. Write new path to Scene file

            #process bdd files

            #if ".bdd" in l:  # l is the line out of the Scene file
            if "FX_Break" in l:     # l is the line out of the Scene file
                bdd_on = True   # Switch this on, since we've found a BDD line
                outfile.write(l + "\n")

            elif ".bdd" in l and bdd_on == True:
                bddunc = False  # Start out assuming it is NOT a UNC path
                if l.startswith("\\\\"):
                    bddunc = True       # If the line starts with at double-backslash, fair bet it's a UNC path
                ls = l.replace('\\','/')
                oldbddpath = os.path.join(self.content_dir, ls )
                if self.preserve == True:
                    if content_dir in oldbddpath:
                        preserve = True
                    else:
                        preserve = False
                if preserve == True and self.preserve == True:
                    newbddpath = os.path.join(self.target_dir, os.path.dirname(ls), os.path.basename(ls) )
                else:
                    newbddpath = os.path.join(self.dyn_dir, os.path.basename(ls) )
                self.psCopy(oldbddpath.replace('\\','/'), newbddpath.replace('\\','/') )
                if bddunc == True:
                    outfile.write( newbddpath + "\n")
                else:
                    outfile.write( l + "\n")

            elif "EndPlugin" in l and bdd_on == True:
                outfile.write(l + "\n")
                outfile.write("\n")
                bdd_on = False

            elif "FX_MotionDrive" in l:
                mdd_on = True
                outfile.write(l + "\n")
            elif ".mdd" in l and mdd_on == True:
                mdd_on = False
                l = l.replace('\\','/')
                oldmddpath = os.path.join(self.content_dir, l)
                if self.preserve == True:
                    newmddpath = os.path.join(self.target_dir, l)
                else:
                    newmddpath = os.path.join( self.dyn_dir, os.path.basename(l) )
                self.psCopy(oldmddpath, newmddpath)
                outfile.write( l + "\n" )

            elif "MD_Plug" in l:
                vert_on = True
                outfile.write( l + "\n" )

            elif ".mdd" in l and vert_on == True and mddnode_on == False:
                vertunc = False
                oldvertpath = os.path.join( self.content_dir, l.strip().replace('\"','') )
                if oldvertpath.startswith("\\\\"):
                    vertunc = True
                ls = l.strip().replace('\"','').split('\\/')
                newvertpath = os.path.join( self.vert_dir, os.path.basename(l.strip().replace('\"','') )  )
                if vertunc == True:
                    oldvertnorm = os.path.normpath(oldvertpath)
                    oldvertnorm = oldvertnorm.replace(r'\\\\',r'\\')
                    self.psCopy(oldvertnorm, newvertpath)
                else:
                    self.psCopy(oldvertpath, newvertpath)
                outline = '    \"' + self.strip_first_slash(newvertpath[len(self.target_dir):]) + '\"\n'
                outfile.write(outline)
                vert_on = False

            elif ".xml" in l and vert_on == True and mddnode_on == False:
                xmlunc = False
                oldvertpath = os.path.join( self.content_dir, l.strip().replace('\"','') )
                oldmc = os.path.splitext(oldvertpath)[0] + ".mc"
                if oldvertpath.startswith("\\\\"):
                    xmlunc = True
                ls = l.strip().replace('\"','').split('\\/')
                newvertpath = os.path.join( self.vert_dir, os.path.basename(l.strip().replace('\"','') )  )
                newmc = os.path.splitext(newvertpath)[0] + ".mc"
                if xmlunc == True:
                    oldvertnorm = os.path.normpath(oldvertpath)
                    oldvertnorm = oldvertnorm.replace(r'\\\\',r'\\')
                    oldmcnorm = os.path.normpath(oldmc)
                    oldmcnorm = oldmcnorm.replace(r'\\\\',r'\\')
                    self.psCopy(oldvertnorm, newvertpath)
                    self.psCopy(oldmcnorm, newmc)
                    self.copy_mc_sequence(oldmcnorm, newmc)
                else:
                    self.psCopy(oldvertpath, newvertpath)
                    self.psCopy(oldmc, newmc)
                    self.copy_mc_sequence(oldmc, newmc)
                outline = '    \"' + self.strip_first_slash(newvertpath[len(self.target_dir):]) + '\"\n'
                outfile.write(outline)
                vert_on = False

            elif "{ MDReader" in l:
                outfile.write( l + "\n" )

            elif "MDD_Node" in l:
                mddnode_on = True
                outfile.write( l + "\n")

            elif ".mdd" in l and mddnode_on == True and vert_on == False:
                mddnode_on = False
                l = l.replace('\\','/')
                oldvertpath = os.path.join( self.content_dir, l.strip().replace('\"','') )
                ls = l.strip().replace('\"','').split('\\/')
                newvertpath = os.path.join( self.vert_dir, os.path.basename(l.strip().replace('\"','') )  )
                self.psCopy(oldvertpath, newvertpath)
                outline = '\"' + self.strip_first_slash(newvertpath[len(self.target_dir):]) + '\"\n'
                outfile.write('        Filename ' + outline )

            # Process Particle FX files
            elif ".pfx" in l:
                pfxunc = False
                lsplit = l.split(None,5)
                ls = os.path.normpath(lsplit[5])
                if ls.startswith("\\\\"):    #UNC path
                    pfxunc = True
                if '\\' in ls or '/' in ls:  # this section is for the Mac, if it's having trouble
                    lsp = ls.split('\\')     # dealing with backslashes
                    ls = lsp[-1]
                oldpfxpath = os.path.join( self.content_dir,lsplit[5] )

                if self.content_dir in oldpfxpath:
                    preserve = True
                else:
                    preserve = False

                if preserve == 1 and self.preserve == 1:
                    newpfxpath = os.path.join(self.target_dir,lsplit[5])
                else:
                    newpfxpath = os.path.join(self.dyn_dir, os.path.basename(ls) )
                psCopySource = oldpfxpath.replace('\\','/')
                psCopyDest = newpfxpath.replace('\\','/')
                self.psCopy(psCopySource, psCopyDest)

                lsplit[5] = newpfxpath

                outline = ' '.join(lsplit)
                outfile.write(" " + outline + "\n")

            # Process IES Lights
            elif "Plugin LightHandler" in l and "PhotometricLight" in l:
                outfile.write("Plugin LightHandler 1 PhotometricLight\n")
                photo_on = True

            elif photo_on == True and "File \"" in l:
                oldiespath = l[8:-1]
                if oldiespath[:1] == ":":
                    oldiespath = os.sep + oldiespath[1:]
                newiespath = os.path.join(self.ies_dir, os.path.basename(oldiespath))
                if newiespath[:1] == ":":
                    newiespath = os.sep + newiespath[1:] 
                outfile.write('  File \"' + self.strip_first_slash(newiespath) + '\"\n')
                self.psCopy(oldiespath, newiespath)
                photo_on = False

            # Process Radiosity Cache files
            elif "RadiosityCacheFilePath" in l and self.radsave == True:
                l = l.split(None,1)[1]
                oldradpath_drive = os.path.splitdrive(l)[0]
                oldradpath_path = os.path.dirname(os.path.splitdrive(l)[1])
                oldradpath_file = os.path.basename(l)
                if oldradpath_drive != None:
                    oldradpath = os.path.join(oldradpath_drive, oldradpath_path, oldradpath_file).replace('\\','/')
                    if oldradpath[:1] == ":":
                        oldradpath = os.sep + oldradpath[1:]
                else:
                    oldradpath = os.path.join(self.content_dir, l)
                newradpath = os.path.join(self.rad_dir, oldradpath_file).replace('\\','/')
                if newradpath[:1] == ":":
                    newradpath = os.sep + newradpath[1:]
                self.psCopy(oldradpath, newradpath )
                outfile.write('RadiosityCacheFilePath ' + self.strip_first_slash(newradpath) + "\n")

            #Copy flocking cache data
            elif "FlockMaster" in l:
                outfile.write(l + "\n")
                flock_on = True
                flock_count = 1

            elif flock_on == True and flock_count == 1:
                outfile.write(l + "\n")
                flock_count = flock_count + 1

            elif flock_on == True and flock_count == 2:
                flock_count = flock_count + 1
                flockunc = False
                lsplit = l.replace("\"",'')
                ls = os.path.normpath(lsplit)
                if ls.startswith("\\\\"):
                    flockunc = True
                if '\\' in ls or '/' in ls:
                    lsp = ls.split('\\')
                    ls = lsp[-1]
                oldflockpath = os.path.join( self.content_dir, lsplit)
                if self.preserve == True:
                    if self.content_dir in oldflockpath:
                        preserve = True
                    else:
                        preserve = False
                if self.preserve == True and preserve == True:
                    newflockpath = os.path.join(self.dyn_dir, ls)
                else:
                    newflockpath = os.path.join(self.dyn_dir, os.path.basename(ls))
                psCopySource = os.path.normpath(oldflockpath)
                psCopyDest = os.path.normpath(newflockpath)
                self.psCopy(psCopySource, psCopyDest)
                newflockwrite = '\"' + newflockpath.replace('\\','\\\\') + '\"'

            elif flock_on == True and "EndPlugin" in l:
                flock_on = False
                outfile.write(l + "\n")

            else:   #if nothing matched, just pass the line right through to the new scene
                outfile.write( l + "\n")

        # copy over Bullet dynamics cache file
        if os.path.lexists(os.path.join( self.content_dir, "Dynamics") ):
            dynasource = os.path.join( self.content_dir, "Dynamics", self.scene.name[:-4]) + ".dynacache"
            dynadest = os.path.join( self.dyn_dir, os.path.basename( dynasource ) )
            self.psCopy(dynasource, dynadest)

        outfile.close()

        self.psCopy(tempscene, new_scene)
        if self.reload == True:
            lwsdk.command("LoadScene " + self.scene.filename)
        else:
            lwsdk.command("LoadScene " + new_scene)

        os.remove(tempscene)
        os.rmdir(tempdir)

        return lwsdk.AFUNC_OK


ServerTagInfo = [
                    ( "Package Scene", lwsdk.SRVTAG_USERNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Package Scene", lwsdk.SRVTAG_BUTTONNAME | lwsdk.LANGID_USENGLISH ),
                    ( "Utilities/Python", lwsdk.SRVTAG_MENU | lwsdk.LANGID_USENGLISH )
                ]

ServerRecord = { lwsdk.GenericFactory("LW_PyPackageScene", package_scene) : ServerTagInfo }
