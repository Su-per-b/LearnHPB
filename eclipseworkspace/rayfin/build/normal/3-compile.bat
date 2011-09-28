@echo off
echo 3-compile.bat

set "SRC=..\.."
set "DEST=..\..\bin\bin-normal"

java -jar ..\compiler.jar ^
--js %SRC%\js\lib\jquery.dev.js ^
--js %SRC%\js\three.js\Three.dev.js ^
--js .\temp\main.single.js ^
--js_output_file %DEST%\lgb.js