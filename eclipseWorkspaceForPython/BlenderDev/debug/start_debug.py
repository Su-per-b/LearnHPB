import shutil
import os.path
import os

from fileinput import close

# sec: parameters

debug_file = "sample.py"
blender_x64 = r"C:\Program Files\Blender Foundation\Blender2.6.3x64\blender.exe"
blender_32 = r"C:\Program Files (x86)\Blender Foundation\Blender2.6.3x32\blender.exe"

#import sys
#sys.path.append(r"C:\Program Files\plugins\org.python.pydev_2.7.1.2012100913\pysrc")

#import pydevd

# sec: debug snippet

#import sys
#sys.path.append(r"C:\Users\fg\Mine\MyDLSoft\(IDE) eclipse-cpp-helios-SR1-win32\plugins\org.python.pydev.debug_1.6.4.2011010200\pysrc")
#import pydevd
#pydevd.settrace() # breakpoint

# sec: copy .py and launch .exe

argument = " -w -P \"%s\""
sourcePath = ".\\src\\" + debug_file
destPath = ".\\debug\\__copied.py"
shutil.copy(sourcePath, destPath)


# above: this will copy file, but Eclipse CANNOT open the
# copied file because the link has been broken. So you have 
# to refresh Eclipse.
print("Select Menu -> File -> Refresh to show __copied.py")
scriptToStart = os.path.abspath(destPath)


#subprocess.call([blender_exe_x64, abs_copied])

#startCommand = ("start \"Blender\" \"%s\"" % blender_exe_x64)
#startCommandWithArg = ("start \"Blender\" \"%s\"" % blender_exe_x64)

#retvalue = os.system(startCommand)
startCommand = ("start \"\" \"%s\"" % blender_x64) + (argument % scriptToStart)

os.system(startCommand)

#import subprocess
#subprocess.call([blender_32, "-w", "-P", scriptToStart])