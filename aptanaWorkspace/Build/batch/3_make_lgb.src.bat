@echo off
echo compile-to-check-syntax.bat

set "SRCJS=..\..\LearnHPB\js"
set "DEST=..\temp"

..\closurebuilder\closurebuilder.py --root %SRCJS%\closure\goog ^
--root %SRCJS%\closure\third_party ^
--root %SRCJS%\lgb ^
--namespace="lgb.core.MainController" ^
--compiler_flags=--externs=%SRCJS%\externs\browser.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery1.6.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery-ui.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery-plugins.js ^
--compiler_flags=--externs=%SRCJS%\externs\tipped.js ^
--compiler_flags=--externs=%SRCJS%\externs\kendo.core.js ^
--compiler_flags=--externs=%SRCJS%\externs\kendo.data.js ^
--compiler_flags=--externs=%SRCJS%\externs\jquery-ui-raj.js ^
--compiler_flags=--externs=%SRCJS%\externs\tween.js ^
--output_mode script ^
--compiler_flags=--js=%SRCJS%\lib\createjs\events\Event.js ^
--compiler_flags=--js=%SRCJS%\lib\createjs\events\EventDispatcher.js ^
--compiler_flags=--js=%SRCJS%\lib\tweenjs\Tween.js ^
--compiler_flags=--js=%SRCJS%\lib\tweenjs\CSSPlugin.js ^
--compiler_flags=--js=%SRCJS%\lib\tweenjs\Ease.js ^
--compiler_flags=--js=%SRCJS%\lib\tweenjs\Timeline.js ^
--compiler_flags=--js=%SRCJS%\lib\tweenjs\version.js ^
--compiler_flags=--js=%SRCJS%\lib\purl.js ^
--compiler_flags=--js=%SRCJS%\lib\jquery-plugins.js ^
--compiler_flags=--js=%SRCJS%\lib\tipped.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.window.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.userevents.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.binder.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.draganddrop.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.popup.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.data.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.list.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.fx.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.tabstrip.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.pager.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.editable.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.filtermenu.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.columnmenu.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.groupable.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.selectable.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.sortable.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.reorderable.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.grid.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.slider.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.splitter.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.resizable.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.treeview.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.combobox.js ^
--compiler_flags=--js=%SRCJS%\kendo\src\kendo.menu.js ^
--compiler_flags=--warning_level=VERBOSE ^
--compiler_jar ..\compilers\compiler.jar ^
--output_file %DEST%\lgb.3.src.js

