@echo off
echo css.bat

set "SRC=..\..\css"


call:cssStart jquery-ui.css
call:css tipped.css
call:css kendo.common.css
call:css kendo.lgb.css
call:css lgb.css

goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:css
echo compile %~1
java -jar ..\yuicompressor-2.4.2.jar ^
--charset utf-8 ^
--type css ^
%SRC%\%~1 >> %SRC%\lgb.min.css


goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:cssStart
echo compile %~1
java -jar ..\yuicompressor-2.4.2.jar ^
--charset utf-8 ^
--type css ^
%SRC%\%~1 > %SRC%\lgb.min.css


goto:eof