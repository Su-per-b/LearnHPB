@echo off
echo compile-to-check-syntax.bat

set "SRC=..\..\LearnHPB"
set "DEST=..\..\bin\bin-normal"

..\closurebuilder\closurebuilder.py --root %SRC%\js\closure\goog ^
--root %SRC%\js\closure\third_party ^
--root %SRC%\js\lgb ^
--input %SRC%\js\lib\createjs\events\Event.js ^
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
--compiler_flag=--externs=%SRC%\js\externs\jquery-ui-raj.js ^
--compiler_flag=--externs=%SRC%\js\externs\tween.js ^
--compiler_jar ..\compilers\compiler.jar ^
--output_file ..\temp\lgb.src.js

