import bpy
#import bpy.context

import sys
sys.path.append(r"C:\Program Files\eclipse-4.x-java-juno-x64\plugins\org.python.pydev_2.7.1.2012100913\pysrc")



import pydevd

def test():
    print("Hello World!")
    pydevd.settrace() # breakpoint
    
    theContext = bpy.context
    obj = theContext.object
    
    print ("Name:", obj.name)
    
def main():
    print("Hello World!")
    pydevd.settrace() # breakpoint
    
    theContext = bpy.context
    obj = theContext.object
    
    print ("Name:", obj.name)
    print ("Loc:", obj.location)
     
    
if __name__ == '__main__':
    main()
