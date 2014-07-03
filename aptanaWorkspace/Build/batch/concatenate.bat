@echo off
echo compile-to-check-syntax.bat

set "SRC=..\..\LearnHPB"
set "DEST=..\..\bin\bin-normal"

..\closurebuilder\closurebuilder.py --root %SRC%\js\closure ^
--root %SRC%\js\lgb ^
--namespace="lgb.core.MainController" ^
--output_mode script ^
--compiler_flag=--warning_level=VERBOSE ^
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
--compiler_flag=--externs=%SRC%\js\externs\three.custom.js ^
--compiler_flag=--externs=%SRC%\js\externs\jquery-ui-raj.js ^
--compiler_flag=--externs=%SRC%\js\externs\tween.js ^
--compiler_jar ..\compilers\compiler.jar ^
--output_file concatinated_script.js

