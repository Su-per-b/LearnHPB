@echo off
echo make-single.bat

set "DEST..\..\bin\bin-normal"
set "SRC=..\..\js\kendo"

..\closure_builder\calcdeps.py ^
--js %SRC%\kendo.core.js ^
--js %SRC%\kendo.popup.js ^
--js %SRC%\kendo.data.js ^
--js %SRC%\kendo.list.js ^
--js %SRC%\kendo.dropdownlist.js ^
--js %SRC%\kendo.fx.js ^
--js %SRC%\kendo.tabstrip.js ^
--js %SRC%\kendo.grid.js ^
--js %SRC%\kendo.window.js ^
--js_output_file script > .\temp\kendo.min.js



java -jar ..\compiler.jar ^
--js %SRC%\js\lib\jquery.src.js ^
--js %SRC%\js\three.js\Three.src.js ^
--js .\temp\main.single.js ^
--js_output_file %DEST%\lgb.js