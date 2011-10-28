@echo off
echo converting file %1 to outputFolder\scene.json
@echo on

set inputFileName=%1
set "outputFileName=%inputFileName:~0,-3%b.js"


python convert_obj_three.py -i %inputFileName% -o %outputFileName% -t binary 

::C:\o3dconverter\o3dConverter.exe --no-archive --no-binary --up-axis=0,1,0 --pretty-print %1 ou
@echo off
pause