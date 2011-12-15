@echo on
echo 1.5-compile_three.js.bat
cd ..\..\js\three\utils\
call build-custom.bat
cd ..\..\..\build\normal
copy /Y three_license.txt temp\Three.js  
type ..\..\js\three\build\Three.js >> temp\Three.js
copy /Y three_license.txt temp\ThreeExtras.js  
type ..\..\js\three\build\custom\ThreeExtras.js >> temp\ThreeExtras.js