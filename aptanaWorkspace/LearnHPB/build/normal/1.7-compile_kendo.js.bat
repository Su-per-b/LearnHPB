@echo off
echo 1.7-compile_kendo.bat

set "SRC=..\..\js\kendo"
set "DEST=..\..\bin\bin-normal"

call:jsStart kendo.core.js
call:js kendo.window.js
call:js kendo.popup.js
call:js kendo.data.js
call:js kendo.list.js
call:js kendo.dropdownlist.js
call:js kendo.fx.js
call:js kendo.tabstrip.js
call:js kendo.grid.js
call:js kendo.slider.js
call:js kendo.splitter.js
call:js kendo.userevents.js
call:js kendo.draganddrop.js
call:js kendo.resizable.js
call:js kendo.treeview.js

copy /Y kendo_license.txt temp\kendo.min.js  
type temp\kendo_raw.min.js >> temp\kendo.min.js
del temp\kendo_raw.min.js
goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:js
echo compile %~1
java -jar ..\yuicompressor-2.4.2.jar ^
--charset utf-8 ^
--type js ^
%SRC%\%~1 >> temp\kendo_raw.min.js


goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:jsStart
echo compile %~1
java -jar ..\yuicompressor-2.4.2.jar ^
--charset utf-8 ^
--type js ^
%SRC%\%~1 > temp\kendo_raw.min.js


goto:eof