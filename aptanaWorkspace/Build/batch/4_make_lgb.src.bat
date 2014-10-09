@echo off
echo compile-to-check-syntax.bat

set "SRCJS=..\..\LearnHPB\js"
set "DEST=..\temp"

..\closurebuilder\closurebuilder.py --root %SRCJS%\closure\goog ^
--root %SRCJS%\closure\third_party ^
--root %SRCJS%\lgb ^
--namespace="lgb.core.MainController" ^
--output_mode script ^
--compiler_flags=--warning_level=VERBOSE ^
--compiler_flags=--externs=%SRCJS%\externs\browser.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery1.6.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery-ui.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery-plugins.js ^
--compiler_flags=--externs=%SRCJS%\externs\tipped.js ^
--compiler_flags=--externs=%SRCJS%\externs\kendo.core.js ^
--compiler_flags=--externs=%SRCJS%\externs\kendo.data.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery-ui-raj.js ^
--compiler_flags=--externs=%SRCJS%\externs\tween.js ^
--compiler_flags=--js=%SRCJS%\lib\createjs\events\Event.js ^
--compiler_jar ..\compilers\compiler.jar ^
--output_file %DEST%\lgb.4.src.js

