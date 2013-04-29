@echo off
echo 3-compile.bat

set "SRC=..\LearnHPB"
set "EXT=externs"
set "DEST=..\LearnHPB\bin\normal"

copy /Y templates/lgb_license.txt temp\min\lgb.min.js  

compilers\calcdeps.py ^
-i %SRC%\inc.js ^
-i %SRC%\main.src.js ^
-i %SRC%\js\lib\jquery-plugins.js ^
-i %SRC%\js\lib\jquery.checkbox.src.js ^
-i %SRC%\js\kendo\kendo.core.js ^
-i %SRC%\js\kendo\kendo.window.js ^
-i %SRC%\js\kendo\kendo.popup.js ^
-i %SRC%\js\kendo\kendo.data.js ^
-i %SRC%\js\kendo\kendo.list.js ^
-i %SRC%\js\kendo\kendo.dropdownlist.js ^
-i %SRC%\js\kendo\kendo.fx.js ^
-i %SRC%\js\kendo\kendo.tabstrip.js ^
-i %SRC%\js\kendo\kendo.grid.js ^
-i %SRC%\js\kendo\kendo.slider.js ^
-i %SRC%\js\kendo\kendo.splitter.js ^
-i %SRC%\js\kendo\kendo.userevents.js ^
-i %SRC%\js\kendo\kendo.draganddrop.js ^
-i %SRC%\js\kendo\kendo.resizable.js ^
-i %SRC%\js\kendo\kendo.treeview.js ^
-i %SRC%\js\lib\tipped.js ^
-i %SRC%\js\lib\tweenjs\Tween.js ^
-i %SRC%\js\lib\tweenjs\Ease.js ^
-p %SRC%\js\closure ^
-p %SRC%\js\lgb ^
--compiler_flag=--externs=%EXT%\browser.js ^
--compiler_flag=--externs=%EXT%\jquery1.6.js ^
--compiler_flag=--externs=%EXT%\jquery-ui.js ^
--compiler_flag=--externs=%EXT%\jquery-plugins.js ^
--compiler_flag=--externs=%EXT%\tipped.js ^
--compiler_flag=--externs=%EXT%\kendo.core.js ^
--compiler_flag=--externs=%EXT%\kendo.data.js ^
--compiler_flag=--externs=%EXT%\three.cameras.js ^
--compiler_flag=--externs=%EXT%\three.core.js ^
--compiler_flag=--externs=%EXT%\three.extras.animation.js ^
--compiler_flag=--externs=%EXT%\three.extras.controls.js ^
--compiler_flag=--externs=%EXT%\three.extras.geometries.js ^
--compiler_flag=--externs=%EXT%\three.extras.io.loaders.js ^
--compiler_flag=--externs=%EXT%\three.extras.physics.js ^
--compiler_flag=--externs=%EXT%\three.extras.js ^
--compiler_flag=--externs=%EXT%\three.lights.js ^
--compiler_flag=--externs=%EXT%\three.materials.js ^
--compiler_flag=--externs=%EXT%\three.objects.js ^
--compiler_flag=--externs=%EXT%\three.renderers.js ^
--compiler_flag=--externs=%EXT%\three.scenes.js ^
--compiler_flag=--externs=%EXT%\jquery-ui-raj.js ^
--compiler_flag=--externs=%EXT%\tween.js ^
--output_mode compiled ^
--compiler_jar compilers\compiler.jar ^
--output_file temp\src\lgb.src.js

type temp\src\lgb.src.js >> temp\min\lgb.min.js

