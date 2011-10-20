@echo off
echo 2-make-single.bat

set "DEST=..\..\bin\bin-normal"
set "SRC=..\.."


..\closure_builder\calcdeps.py ^
-i %SRC%\inc.js ^
-i %SRC%\main.src.js ^
-i  %SRC%\js\lib\jquery-plugins.js ^
-i  %SRC%\js\jquery-ui\jquery-ui.js ^
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
warning_level=VERBOSE ^
-o script > .\temp\main.single.js