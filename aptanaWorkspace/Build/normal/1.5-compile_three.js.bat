@echo on
echo 1.5-compile_three.js.bat
cd ..\..\LearnHPB\js\three\utils\
call build-custom.bat
cd ..\..\..\..\Build\normal
copy /Y three_license.txt temp\three.min.js  
type ..\..\LearnHPB\js\three\build\three.min.js >> temp\three.min.js
