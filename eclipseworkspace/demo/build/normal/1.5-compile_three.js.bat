@echo on
echo 1.5-compile_three.js.bat
cd ..\..\js\three\utils\
call build-custom.bat
cd ..\..\..\build\normal
copy /Y three_license.txt temp\three.min.js  
type ..\..\js\three\build\three.min.js >> temp\three.min.js
