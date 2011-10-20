@echo off
echo 3-compile.bat

set "SRC=..\.."
set "DEST=..\..\bin\bin-normal"

..\closure_builder\calcdeps.py ^
-i  %SRC%\js\lib\jquery.src.js ^
-i  %SRC%\js\lib\jquery-plugins.js ^
-i  %SRC%\js\jquery-ui\jquery-ui.js ^
-i  %SRC%\js\three.js\Three.src.js ^
-i  %SRC%\inc.js ^
-i  %SRC%\main.src.js ^
-i  %SRC%\js\lib\tipped.js ^
-i  %SRC%\js\kendo\kendo.core.js ^
-i  %SRC%\js\kendo\kendo.popup.js ^
-i  %SRC%\js\kendo\kendo.data.js ^
-i  %SRC%\js\kendo\kendo.list.js ^
-i  %SRC%\js\kendo\kendo.dropdownlist.js ^
-i  %SRC%\js\kendo\kendo.fx.js ^
-i  %SRC%\js\kendo\kendo.tabstrip.js ^
-i  %SRC%\js\kendo\kendo.grid.js ^
-i  %SRC%\js\kendo\kendo.window.js ^
-p %SRC%\js\closure ^
-p %SRC%\js\hemi ^
-p %SRC%\js\lgb ^
-p %SRC%\js\o3djs ^
--compiler_flag=--warning_level=VERBOSE ^
--output_mode compiled ^
--compiler_jar ..\compiler.jar ^
--output_file %DEST%\lgb.js



