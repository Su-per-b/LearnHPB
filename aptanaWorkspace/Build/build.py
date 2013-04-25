'''
Created on Apr 25, 2013

@author: raj
'''
import os

def main(argv=None):



    path = "normal"
    #cmd = 'cd %s' % (path)
    #result = os.system(cmd)
    
    result = os.chdir(path)
    
    os.system('1-clean.bat')
    os.system('1.5-compile_three.js.bat')
    os.system('1.7-compile_kendo.js.bat')
    os.system('2-css.bat')
    os.system('3-compile.bat')
    os.system('5-copy.bat')


if __name__ == "__main__":
  main()