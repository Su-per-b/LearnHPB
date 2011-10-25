@echo off
echo make-min-kendo.bat

set "SRC=..\..\js\kend"
set "DEST=..\..\bin\bin-normal"

java -jar ..\compiler.jar --js %SRC%\kendo.core.js ^
--js %SRC%\kendo.popup.js ^
--js %SRC%\kendo.data.js ^
--js %SRC%\kendo.list.js ^
--js %SRC%\kendo.dropdownlist.js ^
--js %SRC%\kendo.fx.js ^
--js %SRC%\kendo.tabstrip.js ^
--js %SRC%\kendo.grid.js ^
--js %SRC%\kendo.window.js ^
--js_output_file script > .\temp\kendo.min.js