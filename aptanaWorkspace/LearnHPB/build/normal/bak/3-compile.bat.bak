@echo off
echo 3-compile.bat

set "SRC=..\.."
set "DEST=..\..\bin\bin-normal"

copy /Y lgb_license.txt temp\lgb.js  

..\closure_builder\calcdeps.py ^
-i %SRC%\inc.js ^
-i %SRC%\main.src.js ^
-i %SRC%\js\lib\jquery-plugins.js ^
-i %SRC%\js\lib\jquery.checkbox.src.js ^
-i %SRC%\js\kendo\kendo.core.js ^
-i %SRC%\js\kendo\kendo.popup.js ^
-i %SRC%\js\kendo\kendo.data.js ^
-i %SRC%\js\kendo\kendo.list.js ^
-i %SRC%\js\kendo\kendo.dropdownlist.js ^
-i %SRC%\js\kendo\kendo.fx.js ^
-i %SRC%\js\kendo\kendo.tabstrip.js ^
-i %SRC%\js\kendo\kendo.grid.js ^
-i %SRC%\js\kendo\kendo.window.js ^
-i %SRC%\js\kendo\kendo.draganddrop.js ^
-i %SRC%\js\kendo\kendo.slider.js ^
-i %SRC%\js\lib\tipped.js ^
-i %SRC%\js\lib\Tween.js ^
-i %SRC%\js\lib\Ease.js ^
-p %SRC%\js\closure ^
-p %SRC%\js\lgb ^
--compiler_flag=--externs=%SRC%\js\externs\browser.js ^
--compiler_flag=--externs=%SRC%\js\externs\jquery1.6.js ^
--compiler_flag=--externs=%SRC%\js\externs\jquery-ui.js ^
--compiler_flag=--externs=%SRC%\js\externs\jquery-plugins.js ^
--compiler_flag=--externs=%SRC%\js\externs\tipped.js ^
--compiler_flag=--externs=%SRC%\js\externs\kendo.core.js ^
--compiler_flag=--externs=%SRC%\js\externs\kendo.data.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.cameras.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.core.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.extras.animation.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.extras.controls.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.extras.geometries.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.extras.io.loaders.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.extras.physics.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.extras.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.lights.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.materials.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.objects.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.renderers.js ^
--compiler_flag=--externs=%SRC%\js\externs\three.scenes.js ^
--compiler_flag=--externs=%SRC%\js\externs\jquery-ui-raj.js ^
--compiler_flag=--externs=%SRC%\js\externs\tween.js ^
--output_mode compiled ^
--compiler_jar ..\compiler.jar ^
--output_file temp\lgb_raw.js

type temp\lgb_raw.js >> temp\lgb.js

%DEST%\lgb.js