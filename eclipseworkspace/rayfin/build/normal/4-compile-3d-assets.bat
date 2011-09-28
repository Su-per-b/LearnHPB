@echo off
echo 4-compile-3d-assets.bat

set "SRC=..\..\3d-assets"
set "DEST=..\..\bin\bin-normal\3d-assets"

call:compileCopy rooftop-joined.b

goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:compileCopy
echo compile %~1
java -jar ..\compiler.jar ^
--js %SRC%\%~1.js ^
--js_output_file %DEST%\%~1.js
copy %SRC%\%~1.bin %DEST%\%~1.bin
goto:eof